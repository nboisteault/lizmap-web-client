import Graticule from 'ol/layer/Graticule';

import Point from 'ol/geom/Point.js';
import LineString from 'ol/geom/LineString';
import Feature from 'ol/Feature.js';

import {
    applyTransform,
    containsCoordinate,
    containsExtent,
    getWidth,
    equals,
    getCenter,
    isEmpty,
    getIntersection,
    intersects,
    wrapX as wrapExtentX,
} from 'ol/extent.js';

import {
    equivalent as equivalentProjection, transform, transformExtent,
  } from 'ol/proj.js';

import { clamp } from 'ol/math.js';

import { forward, toPoint } from 'mgrs';
class MGRS extends Graticule {

    /**
   * @param {Options} [options] Options.
   */
    constructor(options) {
        super(options);

        /**
         * @type {Array<LineString>}
         * @private
         */
        this.lines_ = [];
    }

    latLabelFormatter_ = () => {
        return '';
    };

    lonLabelFormatter_ = () => {
        return '';
    };

    /**
     * @param {number} lon Longitude.
     * @param {number} minLat Minimal latitude.
     * @param {number} maxLat Maximal latitude.
     * @param {number} squaredTolerance Squared tolerance.
     * @param {import("../extent.js").Extent} extent Extent.
     * @param {number} index Index.
     * @return {number} Index.
     * @private
     */
    addMeridian_(lon, minLat, maxLat, squaredTolerance, extent, index) {
        const lineString = this.getMeridian_(
            lon,
            minLat,
            maxLat,
            squaredTolerance,
            index
        );
        if (intersects(lineString.getExtent(), extent)) {
            if (this.meridiansLabels_) {
                const mgrsLabel = forward([lon, minLat]);
                let text;

                // Handle single digit GZD
                if (lon <= -132) {
                    text = mgrsLabel.slice(0, 4);
                } else {
                    text = mgrsLabel.slice(0, 5);
                }
                if (index in this.meridiansLabels_) {
                    this.meridiansLabels_[index].text = text;
                } else {
                    this.meridiansLabels_[index] = {
                        geom: new Point([]),
                        text: text,
                    };
                }
            }
            this.meridians_[index++] = lineString;
        }
        return index;
    }

    addLine_(coords1, coords2, extent, index){
        const lineString = new LineString([
            transform(coords1, 'EPSG:4326', this.projection_),
            transform(coords2, 'EPSG:4326', this.projection_)
        ]);

        if (intersects(lineString.getExtent(), extent)) {
            this.lines_[index++] = lineString;
        }
        return index;
    }

    /**
   * Update geometries in the source based on current view
   * @param {import("../extent").Extent} extent Extent
   * @param {number} resolution Resolution
   * @param {import("../proj/Projection.js").default} projection Projection
   */
    loaderFunction(extent, resolution, projection) {
        this.loadedExtent_ = extent;
        const source = this.getSource();

        // only consider the intersection between our own extent & the requested one
        const layerExtent = this.getExtent() || [
            -Infinity,
            -Infinity,
            Infinity,
            Infinity,
        ];
        const renderExtent = getIntersection(layerExtent, extent);

        if (
            this.renderedExtent_ &&
            equals(this.renderedExtent_, renderExtent) &&
            this.renderedResolution_ === resolution
        ) {
            return;
        }
        this.renderedExtent_ = renderExtent;
        this.renderedResolution_ = resolution;

        // bail out if nothing to render
        if (isEmpty(renderExtent)) {
            return;
        }

        // update projection info
        const center = getCenter(renderExtent);
        const squaredTolerance = (resolution * resolution) / 4;

        const updateProjectionInfo =
            !this.projection_ || !equivalentProjection(this.projection_, projection);

        if (updateProjectionInfo) {
            this.updateProjectionInfo_(projection);
        }

        this.createGraticule_(renderExtent, center, resolution, squaredTolerance);

        // first make sure we have enough features in the pool
        let featureCount = this.meridians_.length + this.parallels_.length + this.lines_.length;
        if (this.meridiansLabels_) {
            featureCount += this.meridians_.length;
        }
        if (this.parallelsLabels_) {
            featureCount += this.parallels_.length;
        }

        let feature;
        while (featureCount > this.featurePool_.length) {
            feature = new Feature();
            this.featurePool_.push(feature);
        }

        const featuresColl = source.getFeaturesCollection();
        featuresColl.clear();
        let poolIndex = 0;

        // add features for the lines & labels
        let i, l;
        for (i = 0, l = this.meridians_.length; i < l; ++i) {
            feature = this.featurePool_[poolIndex++];
            feature.setGeometry(this.meridians_[i]);
            feature.setStyle(this.lineStyle_);
            featuresColl.push(feature);
        }
        for (i = 0, l = this.parallels_.length; i < l; ++i) {
            feature = this.featurePool_[poolIndex++];
            feature.setGeometry(this.parallels_[i]);
            feature.setStyle(this.lineStyle_);
            featuresColl.push(feature);
        }

        // 100km
        for (i = 0, l = this.lines_.length; i < l; ++i) {
            feature = this.featurePool_[poolIndex++];
            feature.setGeometry(this.lines_[i]);
            // feature.setStyle(this.lineStyle_);
            featuresColl.push(feature);
        }
    }

    /**
    * @param {import("../extent.js").Extent} extent Extent.
    * @param {import("../coordinate.js").Coordinate} center Center.
    * @param {number} resolution Resolution.
    * @param {number} squaredTolerance Squared tolerance.
    * @private
    */
    createGraticule_(extent, center, resolution, squaredTolerance) {

        // Force minLat and maxLat for MGRS
        this.maxLat_ = 72;
        this.minLat_ = -80;

        let lat, lon;

        // Get code inside grid
        const delta = 0.01;

        const lonInterval = 6;
        let latInterval = 8;

        let idxParallels = 0;
        let idxMeridians = 0;
        let idxLines = 0;

        for (lon = this.minLon_; lon <= this.maxLon_; lon += lonInterval) {
            for (lat = this.minLat_; lat <= this.maxLat_; lat += latInterval) {

                // The northmost latitude band, X, is 12° high
                if (lat == 72) {
                    latInterval = 12
                } else {
                    latInterval = 8;
                }

                idxParallels = this.addParallel_(
                    lat,
                    lon,
                    lon + lonInterval,
                    squaredTolerance,
                    extent,
                    idxParallels
                );

                // Special cases
                // Norway
                if (lat === 56 && lon === 6) {
                    continue;
                }

                // Svalbard
                if (lat === 72 && lon >= 6 && lon <= 36) {
                    continue;
                }

                idxMeridians = this.addMeridian_(
                    lon,
                    lat,
                    lat + latInterval,
                    squaredTolerance,
                    extent,
                    idxMeridians
                );

                // 100KM grid
                if (resolution < 2000 && lon == -180 && lat >= 0) {
                    const leftBottom = forward([lon, lat], 5).substring(0, 4);
                    const rightTop = forward([lon + lonInterval - delta, lat + latInterval - delta], 5).substring(0, 4);

                    let columnLetter = leftBottom.charCodeAt(2) - 1;
                    while ((columnLetter += 1) <= rightTop.charCodeAt(2)) {

                        // Discard I and O
                        if (columnLetter === 73 || columnLetter === 79) {
                            continue;
                        }

                        let rowLetter = leftBottom.charCodeAt(3) - 1;
                        while ((rowLetter += 1) != rightTop.charCodeAt(3)) {

                            // Row letter stops at 'V' => after we go back to 'A'
                            if (rowLetter === 87) {
                                rowLetter = 65;
                            }

                            // Discard I and O
                            if (rowLetter === 73 || rowLetter === 79) {
                                continue;
                            }

                            // Next letters
                            let columnLetterNext = columnLetter + 1;

                            if (columnLetterNext === 73 || columnLetterNext === 79) {
                                columnLetterNext++;
                            }

                            let rowLetterNext = rowLetter + 1;

                            // Row letter stops at 'V' => after we go back to 'A'
                            if (rowLetterNext === 87) {
                                rowLetterNext = 65;
                            }

                            // Discard I and O
                            if (rowLetterNext === 73 || rowLetterNext === 79) {
                                rowLetterNext++;
                            }

                            let leftBottomCoords = toPoint(leftBottom.slice(0, 2) + String.fromCharCode(columnLetter) + String.fromCharCode(rowLetter));
                            let rightBottomCoords = toPoint(leftBottom.slice(0, 2) + String.fromCharCode(columnLetterNext) + String.fromCharCode(rowLetter));
                            let leftTopCoords = toPoint(leftBottom.slice(0, 2) + String.fromCharCode(columnLetter) + String.fromCharCode(rowLetterNext));

                            idxLines = this.addLine_(
                                leftBottomCoords,
                                rightBottomCoords,
                                extent,
                                idxLines
                            );

                            idxLines = this.addLine_(
                                leftBottomCoords,
                                leftTopCoords,
                                extent,
                                idxLines
                            );
                        }
                    }
                }
            }
        }

        // Special cases
        // Norway
        idxMeridians = this.addMeridian_(
            3,
            56,
            64,
            squaredTolerance,
            extent,
            idxMeridians
        );

        // Svalbard
        for (const lon of [9, 21, 33]) {
            idxMeridians = this.addMeridian_(
                lon,
                72,
                84,
                squaredTolerance,
                extent,
                idxMeridians
            );
        }

        this.parallels_.length = idxParallels;
        if (this.parallelsLabels_) {
            this.parallelsLabels_.length = idxParallels;
        }

        this.meridians_.length = idxMeridians;
        if (this.meridiansLabels_) {
            this.meridiansLabels_.length = idxMeridians;
        }

        this.lines_.length = idxLines;
    }
}

export default MGRS;