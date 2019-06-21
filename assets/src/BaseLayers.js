import Util from './Util.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM'; // TODO : Lazy load ?
import Stamen from 'ol/source/Stamen.js'; // TODO : Lazy load ?

// TODO ajouter Bing, IGN, Blank layer

class BaseLayers {

    constructor(OLmap, config, selectElementId) {

        const startupBaselayersReplacement = {
            'osm-mapnik': 'osm',
            'osm-stamen-toner': 'osm-toner',
            'osm-cyclemap': 'osm-cycle',
            'bing-road': 'bmap',
            'bing-aerial': 'baerial',
            'bing-hybrid': 'bhybrid',
            'ign-scan': 'ignmap',
            'ign-plan': 'ignplan',
            'ign-photo': 'ignphoto',
            'ign-cadastral': 'igncadastral',
            'empty': 'emptyBaselayer'
        };

        const baseLayersSelect = document.getElementById(selectElementId);
        let baseLayersOptions = '';
        let startupBaselayer = '';

        // Display startup base layer
        if (config.options.hasOwnProperty('startupBaselayer')) {
            startupBaselayer = config.options['startupBaselayer'];
            if (startupBaselayersReplacement.hasOwnProperty(startupBaselayer)) {
                startupBaselayer = startupBaselayersReplacement[startupBaselayer];
            }// <TODO LATER else if (config.layers.hasOwnProperty(startupBaselayer)) {
            //    startupBaselayer = Util.cleanName(startupBaselayer);
            // TODO LATER>}
        }

        // Configure base layers
        if (config.options.hasOwnProperty('osmMapnik') && config.options.osmMapnik === 'True') {
            const selected = startupBaselayer === 'osm' ? 'selected' : '';

            const baseLayer = new TileLayer({
                source: new OSM(),
                visible: startupBaselayer === 'osm',
                'baseLayer': true
            });

            baseLayersOptions += '<option value="osm" data-ol_uid="' + baseLayer.ol_uid + '" ' + selected + '>OpenStreetMap</option>';

            OLmap.addLayer(baseLayer);
        }

        if (config.options.hasOwnProperty('osmStamenToner') && config.options.osmStamenToner === 'True') {
            const selected = startupBaselayer === 'osm-toner' ? 'selected' : '';

            const baseLayer = new TileLayer({
                source: new Stamen({
                    layer: 'toner'
                }),
                visible: startupBaselayer === 'osm-toner',
                'baseLayer': true
            });

            baseLayersOptions += '<option value="osm-toner" data-ol_uid="' + baseLayer.ol_uid + '" ' + selected + '>OSM Stamen Toner</option>';

            OLmap.addLayer(baseLayer);
        }

        // Add options to select
        baseLayersSelect.innerHTML = baseLayersOptions;

        // Handle base layer selection change
        $(baseLayersSelect).change(function() {
            const baseLayerUID = $(this).find(":selected").data('ol_uid');

            OLmap.getLayers().forEach(function(layer) {
                if (layer.getProperties().baseLayer) {
                    layer.setVisible(layer.ol_uid == baseLayerUID);
                }
            });

            // Trigger event
            // <TODO LATER
            // lizMap.events.triggerEvent("lizmapbaselayerchanged", { 'layer': blName });
            // TODO LATER>

        });
    }
}

export default BaseLayers;