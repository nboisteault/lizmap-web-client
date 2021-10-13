import Map from './Map.js';
import Edition from './Edition.js';
import Geolocation from './Geolocation.js';
import GeolocationSurvey from './GeolocationSurvey.js';
import SelectionTool from './SelectionTool.js';
import Digitizing from './Digitizing.js';
import Snapping from './Snapping.js';
import Draw from './interaction/Draw.js';
import Layers from './Layers.js';

import { transform as transformOL, get as getProjection } from 'ol/proj';
import { register } from 'ol/proj/proj4';

import proj4 from 'proj4';

import { jsPDF } from "jspdf";

export default class Lizmap {

    constructor() {
        lizMap.events.on({
            uicreated: () => {
                this._lizmap3 = lizMap;

                // Register projections if unknown
                if (!getProjection(this.projection)) {
                    const proj = this.config.options.projection;
                    proj4.defs(proj.ref, proj.proj4);
                }

                if (!getProjection(this.config.options.qgisProjectProjection.ref)) {
                    const proj = this.config.options.qgisProjectProjection;
                    proj4.defs(proj.ref, proj.proj4);
                }
                register(proj4);

                // Override getPointResolution method to always return resolution
                // without taking care of geodesic adjustment as it can be confusing for user to not have rounded scales
                (getProjection(this.projection)).setGetPointResolution((resolution) => resolution);
                (getProjection(this.config.options.qgisProjectProjection.ref)).setGetPointResolution((resolution) => resolution);

                // Create Lizmap modules
                this.map = new Map();
                this.edition = new Edition();
                this.geolocation = new Geolocation();
                this.geolocationSurvey = new GeolocationSurvey();
                this.selectionTool = new SelectionTool();
                this.digitizing = new Digitizing();
                this.snapping = new Snapping();
                this.draw = new Draw();
                this.layers = new Layers();

                // Add vector for print test
                const geojsonparser = new OpenLayers.Format.GeoJSON();

                const vectorFeatures = geojsonparser.read(`{
"type": "FeatureCollection",
"name": "print",
"crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:EPSG::2154" } },
"features": [
{ "type": "Feature", "properties": { "id": 1 }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 768955.705124986940064, 6281513.548335827887058 ], [ 767446.735110709327273, 6279336.320172369480133 ], [ 769591.628202432533726, 6278032.138945744372904 ], [ 771876.639938338776119, 6278032.138945744372904 ], [ 772372.444371601333842, 6279595.000746245495975 ], [ 768955.705124986940064, 6281513.548335827887058 ] ] ] } }
]
}`);
                const vectorLayer = new OpenLayers.Layer.Vector("printLayer");
                vectorLayer.addFeatures(vectorFeatures);
                this._lizmap3.map.addLayer(vectorLayer);
            }
        });
    }

    /**
     * @param {Boolean} mode - switch new OL map on top of OL2 one
     */
    set newOlMap(mode){
        this.map._newOlMap = mode;
        document.getElementById('newOlMap').style.zIndex = mode ? 750 : 'auto';
    }

    get lizmap3() {
        return this._lizmap3;
    }

    get config() {
        return this._lizmap3.config;
    }

    get projection() {
        return this._lizmap3.map.getProjection();
    }

    get qgisProjectProjection(){
        return this.config.options.qgisProjectProjection.ref;
    }

    get vectorLayerFeatureTypes() {
        return this._lizmap3.getVectorLayerFeatureTypes();
    }

    get vectorLayerResultFormat() {
        return this._lizmap3.getVectorLayerResultFormat();
    }

    get serviceURL() {
        return lizUrls.wms + '?' + (new URLSearchParams(lizUrls.params).toString());
    }

    get hasOverview() {
        return this._lizmap3.config.layers.hasOwnProperty('Overview');
    }

    /**
     * @param {Array} lonlat - lonlat to center to.
     */
    set center(lonlat) {
        this._lizmap3.map.setCenter(lonlat);
    }

    /**
     * @param {Array} bounds - Left, bottom, right, top
     */
    set extent(bounds) {
        this._lizmap3.map.zoomToExtent(bounds);
    }

    getNameByTypeName(typeName) {
        return this._lizmap3.getNameByTypeName(typeName);
    }

    getLayerNameByCleanName(cleanName) {
        return this._lizmap3.getLayerNameByCleanName(cleanName);
    }

    // Display message on screen for users
    displayMessage(message, type, close) {
        this._lizmap3.addMessage(message, type, close);
    }

    /**
     * Expose OpenLayers transform method for external JS.
     * Transforms a coordinate from source projection to destination projection.
     * This returns a new coordinate (and does not modify the original).
     *
     * See {@link module:ol/proj.transformExtent} for extent transformation.
     * See the transform method of {@link module:ol/geom/Geometry~Geometry} and its
     * subclasses for geometry transforms.
     *
     * @param {import("./coordinate.js").Coordinate} coordinate Coordinate.
     * @param {ProjectionLike} source Source projection-like.
     * @param {ProjectionLike} destination Destination projection-like.
     * @return {import("./coordinate.js").Coordinate} Coordinate.
     */
    transform(coordinate, source, destination) {
        return transformOL(coordinate, source, destination);
    }

    print(){
        const mapCanvas = document.createElement('canvas');
        mapCanvas.width = 297 * 72 /25.4;
        mapCanvas.height = 210 * 72 / 25.4;
        const mapContext = mapCanvas.getContext('2d');
        const pdf = new jsPDF('landscape', undefined, 'a4');

        Array.prototype.forEach.call(
            // document.querySelectorAll('.olLayerDiv canvas'),
            // document.querySelectorAll('.olTileImage'),
            document.querySelectorAll('.olLayerDiv canvas, .olLayerDiv .olTileImage'),
            function (canvasOrImg) {
                if (canvasOrImg.width > 0) {
                    // const opacity = canvas.parentNode.style.opacity;
                    // mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);
                    // const transform = canvas.style.transform;
                    // // Get the transform parameters from the style's transform matrix
                    // const matrix = transform
                    //     .match(/^matrix\(([^\(]*)\)$/)[1]
                    //     .split(',')
                    //     .map(Number);
                    // // Apply the transform to the export map context
                    // CanvasRenderingContext2D.prototype.setTransform.apply(
                    //     mapContext,
                    //     matrix
                    // );
                    // mapContext.drawImage(canvas, 0, 0);

                    pdf.addImage(
                        canvasOrImg,
                        'PNG',
                        0,
                        0,
                        297,
                        210
                    );
                }
            }
        );

        pdf.save('map.pdf');
        // Reset original map size
        // map.setSize(size);
        // map.getView().setResolution(viewResolution);
        // exportButton.disabled = false;
        // document.body.style.cursor = 'auto';
    }
}
