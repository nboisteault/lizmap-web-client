import { mainLizmap, mainEventDispatcher } from '../modules/Globals.js';
import olGeolocation from 'ol/Geolocation.js';
import {transform} from 'ol/proj';

export default class Geolocation {

    constructor() {
        this._firstGeolocation = true;
        this._isBind = false;
        this._hasEditionLinked = false;

        this._geolocation = new olGeolocation({
            // enableHighAccuracy must be set to true to have the heading value.
            trackingOptions: {
                enableHighAccuracy: true
            },
            projection: mainLizmap.projection
        });

        this._geolocation.on('change:position', () => {
            const coordinates = this._geolocation.getPosition();
            this.moveGeolocationPointAndCircle(coordinates);

            if (this._isBind) {
                this.center();
            }

            mainEventDispatcher.dispatch('geolocation.position');
        });

        this._geolocation.on('change:accuracyGeometry', () => {
            // Zoom on accuracy geometry extent when geolocation is activated for the first time
            if (this._firstGeolocation) {
                mainLizmap.extent = this._geolocation.getAccuracyGeometry();
                this.center();
                this._firstGeolocation = false;
            }
        });
    }

    center() {
        mainLizmap.center = this._geolocation.getPosition();
    };

    toggleBind(){
        this.isBind = !this._isBind;
    }

    toggleTracking(){
        this.isTracking = !this._geolocation.getTracking();
    }

    toggleEditionLinked() {
        this.hasEditionLinked = !this._hasEditionLinked;
    }

    // Get position in GPS coordinates (ESPG:4326)
    get position() {
        const position = this._geolocation.getPosition();
        if (position){
            return transform(position, mainLizmap.projection, 'EPSG:4326');
        }
        return undefined;
    }

    get isTracking(){
        return this._geolocation.getTracking();
    }

    /**
     * @param {boolean} isTracking
     */
    set isTracking(isTracking){
        this._geolocation.setTracking(isTracking);

        // FIXME : later we'll need an object listening to 'geolocation.isTracking' event and setting visibility accordingly
        const geolocationLayer = mainLizmap._lizmap3.map.getLayersByName('newGeolocation')[0];
        if(geolocationLayer){
            geolocationLayer.setVisibility(isTracking);
        }

        mainEventDispatcher.dispatch('geolocation.isTracking');
    }

    get isBind (){
        return this._isBind;
    }

    /**
     * @param {boolean} isBind
     */
    set isBind(isBind) {
        this._isBind = isBind;

        mainEventDispatcher.dispatch('geolocation.isBind');
    }

    get hasEditionLinked(){
        return this._hasEditionLinked;
    }

    /**
    * @param {boolean} hasEditionLinked
    */
    set hasEditionLinked(hasEditionLinked) {
        this._hasEditionLinked = hasEditionLinked;

        mainEventDispatcher.dispatch('geolocation.hasEditionLinked');
    }

    moveGeolocationPointAndCircle(coordinates) {
        // TODO : change newGeolocation to geolocation after old code removed
        let geolocationLayer = mainLizmap._lizmap3.map.getLayersByName('newGeolocation')[0];
        const circleStyle = {
            fillColor: '#0395D6',
            fillOpacity: 0.1,
            strokeColor: '#0395D6',
            strokeWidth: 1
        };

        // Create layer if it does not exist
        if (geolocationLayer === undefined) {
            geolocationLayer = new OpenLayers.Layer.Vector('newGeolocation');

            geolocationLayer.addFeatures([
                new OpenLayers.Feature.Vector(
                    // Point
                    new OpenLayers.Geometry.Point(coordinates[0], coordinates[1]),
                    {},
                    {
                        graphicName: 'circle',
                        strokeColor: '#0395D6',
                        strokeWidth: 1,
                        fillOpacity: 1,
                        fillColor: '#0395D6',
                        pointRadius: 3
                    }
                ),
                // circle
                new OpenLayers.Feature.Vector(
                    OpenLayers.Geometry.Polygon.createRegularPolygon(
                        new OpenLayers.Geometry.Point(coordinates[0], coordinates[1]),
                        this._geolocation.getAccuracy() / 2,
                        40,
                        0
                    ),
                    {},
                    circleStyle
                )
            ]);
            mainLizmap._lizmap3.map.addLayer(geolocationLayer);
        } else {
            const geolocationPoint = geolocationLayer.features[0];

            geolocationPoint.geometry.x = coordinates[0];
            geolocationPoint.geometry.y = coordinates[1];
            geolocationPoint.geometry.clearBounds();
            geolocationLayer.drawFeature(geolocationPoint);

            let geolocationCircle = geolocationLayer.features[1];
            geolocationLayer.destroyFeatures([geolocationCircle]);
            geolocationCircle = new OpenLayers.Feature.Vector(
                OpenLayers.Geometry.Polygon.createRegularPolygon(
                    new OpenLayers.Geometry.Point(coordinates[0], coordinates[1]),
                    this._geolocation.getAccuracy() / 2,
                    40,
                    0
                ),
                {},
                circleStyle
            );
            geolocationLayer.addFeatures([geolocationCircle]);
        }
    }
}
