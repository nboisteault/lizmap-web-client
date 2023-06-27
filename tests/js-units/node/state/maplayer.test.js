import { expect } from 'chai';

import { readFileSync } from 'fs';

import { ValidationError } from '../../../../assets/src/modules/Errors.js';
import { LayersConfig } from '../../../../assets/src/modules/config/Layer.js';
import { LayerGeographicBoundingBoxConfig, LayerBoundingBoxConfig, LayerTreeGroupConfig, buildLayerTreeConfig } from '../../../../assets/src/modules/config/LayerTree.js';
import { buildLayersOrder } from '../../../../assets/src/modules/config/LayersOrder.js';
import { LayerIconSymbology, LayerSymbolsSymbology, SymbolIconSymbology } from '../../../../assets/src/modules/state/Symbology.js';
import { LayerVectorState, LayersAndGroupsCollection } from '../../../../assets/src/modules/state/Layer.js';

import { MapGroupState, MapLayerState } from '../../../../assets/src/modules/state/MapLayer.js';

describe('MapGroupState', function () {
    it('Valid', function () {
        const capabilities = JSON.parse(readFileSync('./data/montpellier-capabilities.json', 'utf8'));
        expect(capabilities).to.not.be.undefined
        expect(capabilities.Capability).to.not.be.undefined
        const config = JSON.parse(readFileSync('./data/montpellier-config.json', 'utf8'));
        expect(config).to.not.be.undefined

        const layers = new LayersConfig(config.layers);

        const rootCfg = buildLayerTreeConfig(capabilities.Capability.Layer, layers);
        expect(rootCfg).to.be.instanceOf(LayerTreeGroupConfig)

        const layersOrder = buildLayersOrder(config, rootCfg);

        const collection = new LayersAndGroupsCollection(rootCfg, layersOrder);

        const root = new MapGroupState(collection.root);
        expect(root.name).to.be.eq('root')
        expect(root.type).to.be.eq('group')
        expect(root.level).to.be.eq(0)
        expect(root.wmsName).to.be.eq('Montpellier-Transports')
        expect(root.wmsGeographicBoundingBox).to.be.null
        expect(root.wmsBoundingBoxes).to.be.an('array').that.have.length(0)
        expect(root.wmsMinScaleDenominator).to.be.eq(-1)
        expect(root.wmsMaxScaleDenominator).to.be.eq(-1)
        expect(root.checked).to.be.true
        expect(root.visibility).to.be.true
        expect(root.layerConfig).to.be.null
        expect(root.mutuallyExclusive).to.be.false
        expect(root.childrenCount).to.be.eq(4)

        const edition = root.children[0];
        expect(edition).to.be.instanceOf(MapGroupState)
        expect(edition.name).to.be.eq('Edition')
        expect(edition.type).to.be.eq('group')
        expect(edition.level).to.be.eq(1)
        expect(edition.wmsName).to.be.eq('Edition')
        expect(edition.layerConfig).to.not.be.null
        expect(root.mutuallyExclusive).to.be.false
        expect(edition.childrenCount).to.be.eq(3)

        const transports = root.children[1];
        expect(transports).to.be.instanceOf(MapGroupState)
        expect(transports.wmsMinScaleDenominator).to.be.eq(-1)
        expect(transports.wmsMaxScaleDenominator).to.be.eq(-1)

        const bus = transports.children[0];
        expect(bus).to.be.instanceOf(MapGroupState)
        expect(bus.name).to.be.eq('Bus')
        expect(bus.type).to.be.eq('group')
        expect(bus.level).to.be.eq(2)
        expect(bus.wmsName).to.be.eq('Bus')
        expect(bus.wmsTitle).to.be.eq('Bus')
        expect(bus.layerConfig).to.not.be.null;
        expect(bus.childrenCount).to.be.eq(2)
        expect(bus.wmsMinScaleDenominator).to.be.eq(-1)
        expect(bus.wmsMaxScaleDenominator).to.be.eq(40001)

        const busStops = bus.children[0];
        expect(busStops).to.be.instanceOf(MapLayerState)
        expect(busStops.name).to.be.eq('bus_stops')
        expect(busStops.type).to.be.eq('layer')
        expect(busStops.level).to.be.eq(3)
        expect(busStops.layerType).to.be.eq('vector')
        expect(busStops.layerOrder).to.be.eq(3)
        expect(busStops.wmsName).to.be.eq('bus_stops')
        expect(busStops.wmsTitle).to.be.eq('bus_stops')
        expect(busStops.layerConfig).to.not.be.null
        expect(busStops.wmsMinScaleDenominator).to.be.eq(0)
        expect(busStops.wmsMaxScaleDenominator).to.be.eq(15000)

        const sousquartiers = root.children[2];
        expect(sousquartiers).to.be.instanceOf(MapLayerState)
        expect(sousquartiers.name).to.be.eq('SousQuartiers')
        expect(sousquartiers.type).to.be.eq('layer')
        expect(sousquartiers.level).to.be.eq(1)
        expect(sousquartiers.layerType).to.be.eq('vector')
        expect(sousquartiers.layerOrder).to.be.eq(8)
        expect(sousquartiers.wmsName).to.be.eq('SousQuartiers')
        expect(sousquartiers.layerConfig).to.not.be.null;
        expect(sousquartiers.wmsStyles).to.be.instanceOf(Array)
        expect(sousquartiers.wmsStyles).to.have.length(1)
        expect(sousquartiers.wmsStyles[0].wmsName).to.be.eq('default')
        expect(sousquartiers.wmsStyles[0].wmsTitle).to.be.eq('default')
        expect(sousquartiers.wmsSelectedStyleName).to.be.eq('default')
        expect(sousquartiers.wmsAttribution).to.be.null
        expect(sousquartiers.wmsParameters).to.be.an('object').that.deep.equal({
          'LAYERS': 'SousQuartiers',
          'STYLES': 'default',
          'FORMAT': 'image/png',
          'DPI': 96
        })

        const rootGetChildren = root.getChildren()
        expect(rootGetChildren.next().value).to.be.eq(edition)
        const child2 = rootGetChildren.next().value;
        expect(child2).to.be.instanceOf(MapGroupState)
        expect(child2.name).to.be.eq('datalayers')
        expect(rootGetChildren.next().value).to.be.eq(sousquartiers)
        const child4 = rootGetChildren.next().value;
        expect(child4).to.be.instanceOf(MapLayerState)
        expect(child4.name).to.be.eq('Quartiers')
    })

    it('Check && visibility', function () {
        const capabilities = JSON.parse(readFileSync('./data/montpellier-capabilities.json', 'utf8'));
        expect(capabilities).to.not.be.undefined
        expect(capabilities.Capability).to.not.be.undefined
        const config = JSON.parse(readFileSync('./data/montpellier-config.json', 'utf8'));
        expect(config).to.not.be.undefined

        const layers = new LayersConfig(config.layers);

        const rootCfg = buildLayerTreeConfig(capabilities.Capability.Layer, layers);
        expect(rootCfg).to.be.instanceOf(LayerTreeGroupConfig)

        const layersOrder = buildLayersOrder(config, rootCfg);

        const collection = new LayersAndGroupsCollection(rootCfg, layersOrder);

        const root = new MapGroupState(collection.root);
        expect(root).to.be.instanceOf(MapGroupState)

        expect(root.checked).to.be.true
        expect(root.visibility).to.be.true

        const edition = root.children[0];
        expect(edition).to.be.instanceOf(MapGroupState)

        expect(edition.checked).to.be.true
        expect(edition.visibility).to.be.true

        const poi = edition.children[0];
        expect(poi).to.be.instanceOf(MapLayerState)

        expect(poi.checked).to.be.false
        expect(poi.itemState.visibility).to.be.false
        expect(poi.visibility).to.be.false

        const rides = edition.children[1];
        expect(rides).to.be.instanceOf(MapLayerState)

        expect(rides.checked).to.be.true
        expect(rides.visibility).to.be.true

        const areas = edition.children[2];
        expect(areas).to.be.instanceOf(MapLayerState)

        expect(areas.checked).to.be.false
        expect(areas.visibility).to.be.false

        // Unchecked group Edition
        edition.checked = false;

        expect(edition.checked).to.be.false
        expect(edition.visibility).to.be.false

        expect(poi.checked).to.be.false
        expect(poi.visibility).to.be.false

        expect(rides.checked).to.be.true
        expect(rides.visibility).to.be.false

        expect(areas.checked).to.be.false
        expect(areas.visibility).to.be.false

        // Checked Point Of Interests
        poi.checked = true;

        expect(edition.checked).to.be.true
        expect(edition.visibility).to.be.true

        expect(poi.checked).to.be.true
        expect(poi.visibility).to.be.true

        expect(rides.checked).to.be.true
        expect(rides.visibility).to.be.true

        expect(areas.checked).to.be.false
        expect(areas.visibility).to.be.false
    })

    it('findMapLayerNames', function () {
        const capabilities = JSON.parse(readFileSync('./data/montpellier-capabilities.json', 'utf8'));
        expect(capabilities).to.not.be.undefined
        expect(capabilities.Capability).to.not.be.undefined
        const config = JSON.parse(readFileSync('./data/montpellier-config.json', 'utf8'));
        expect(config).to.not.be.undefined

        const layers = new LayersConfig(config.layers);

        const rootCfg = buildLayerTreeConfig(capabilities.Capability.Layer, layers);
        expect(rootCfg).to.be.instanceOf(LayerTreeGroupConfig)

        const layersOrder = buildLayersOrder(config, rootCfg);

        const collection = new LayersAndGroupsCollection(rootCfg, layersOrder);

        const root = new MapGroupState(collection.root);
        expect(root).to.be.instanceOf(MapGroupState)

        expect(root.findMapLayerNames()).to.have.ordered.members([
            "points_of_interest",
            "edition_line",
            "areas_of_interest",
            "bus_stops",
            "bus",
            //"tramway_ref",
            //"tramway_pivot",
            //"tram_stop_work",
            "tramstop",
            "tramway",
            "publicbuildings",
            //"publicbuildings_tramstop",
            //"donnes_sociodemo_sous_quartiers",
            "SousQuartiers",
            "Quartiers",
            // "VilleMTP_MTP_Quartiers_2011_4326",
            // "osm-mapnik",
            // "osm-stamen-toner"
        ])

        let names = []
        for (const layer of root.findMapLayers()) {
            names.push(layer.name)
        }
        expect(names).to.be.deep.equal(root.findMapLayerNames())

        const transports = root.children[1];
        expect(transports).to.be.instanceOf(MapGroupState)

        expect(transports.findMapLayerNames()).to.have.ordered.members([
            "bus_stops",
            "bus",
            "tramstop",
            "tramway",
            "publicbuildings",
        ])
    })

    it('getMapLayerByName', function () {
        const capabilities = JSON.parse(readFileSync('./data/montpellier-capabilities.json', 'utf8'));
        expect(capabilities).to.not.be.undefined
        expect(capabilities.Capability).to.not.be.undefined
        const config = JSON.parse(readFileSync('./data/montpellier-config.json', 'utf8'));
        expect(config).to.not.be.undefined

        const layers = new LayersConfig(config.layers);

        const rootCfg = buildLayerTreeConfig(capabilities.Capability.Layer, layers);
        expect(rootCfg).to.be.instanceOf(LayerTreeGroupConfig)

        const layersOrder = buildLayersOrder(config, rootCfg);

        const collection = new LayersAndGroupsCollection(rootCfg, layersOrder);

        const root = new MapGroupState(collection.root);
        expect(root).to.be.instanceOf(MapGroupState)

        const busStops = root.getMapLayerByName('bus_stops')
        expect(busStops).to.be.instanceOf(MapLayerState)
        expect(busStops.name).to.be.eq('bus_stops')
        expect(busStops.type).to.be.eq('layer')
        expect(busStops.level).to.be.eq(3)
        expect(busStops.wmsName).to.be.eq('bus_stops')
        expect(busStops.wmsTitle).to.be.eq('bus_stops')
        expect(busStops.layerConfig).to.not.be.null
        expect(busStops.wmsMinScaleDenominator).to.be.eq(0)
        expect(busStops.wmsMaxScaleDenominator).to.be.eq(15000)

        const sousquartiers = root.getMapLayerByName('SousQuartiers')
        expect(sousquartiers).to.be.instanceOf(MapLayerState)
        expect(sousquartiers.name).to.be.eq('SousQuartiers')
        expect(sousquartiers.type).to.be.eq('layer')
        expect(sousquartiers.level).to.be.eq(1)
        expect(sousquartiers.wmsName).to.be.eq('SousQuartiers')
        expect(sousquartiers.layerConfig).to.not.be.null;
        expect(sousquartiers.wmsStyles).to.be.instanceOf(Array)
        expect(sousquartiers.wmsStyles).to.have.length(1)
        expect(sousquartiers.wmsStyles[0].wmsName).to.be.eq('default')
        expect(sousquartiers.wmsStyles[0].wmsTitle).to.be.eq('default')
        expect(sousquartiers.wmsSelectedStyleName).to.be.eq('default')
        expect(sousquartiers.wmsAttribution).to.be.null
        expect(sousquartiers.wmsParameters).to.be.an('object').that.deep.equal({
          'LAYERS': 'SousQuartiers',
          'STYLES': 'default',
          'FORMAT': 'image/png',
          'DPI': 96
        })

        // Try get an unknown layer
        try {
            root.getMapLayerByName('sous-quartiers')
        } catch (error) {
            expect(error.name).to.be.eq('RangeError')
            expect(error.message).to.be.eq('The layer name `sous-quartiers` is unknown!')
            expect(error).to.be.instanceOf(RangeError)
        }

        const transports = root.children[1];
        expect(transports).to.be.instanceOf(MapGroupState)
        const busStops2 = root.getMapLayerByName('bus_stops')
        expect(busStops2).to.be.eq(busStops)
    })

    it('Checked & visibility', function () {
        const capabilities = JSON.parse(readFileSync('./data/montpellier-capabilities.json', 'utf8'));
        expect(capabilities).to.not.be.undefined
        expect(capabilities.Capability).to.not.be.undefined
        const config = JSON.parse(readFileSync('./data/montpellier-config.json', 'utf8'));
        expect(config).to.not.be.undefined

        const layers = new LayersConfig(config.layers);

        const rootCfg = buildLayerTreeConfig(capabilities.Capability.Layer, layers);
        expect(rootCfg).to.be.instanceOf(LayerTreeGroupConfig)

        const layersOrder = buildLayersOrder(config, rootCfg);

        const collection = new LayersAndGroupsCollection(rootCfg, layersOrder);

        const root = new MapGroupState(collection.root);
        expect(root).to.be.instanceOf(MapGroupState)

        let rootLayerVisibilityChangedEvt = null;
        let rootGroupVisibilityChangedEvt = null;
        root.addListener(evt => {
            rootLayerVisibilityChangedEvt = evt
        }, 'layer.visibility.changed');
        root.addListener(evt => {
            rootGroupVisibilityChangedEvt = evt
        }, 'group.visibility.changed');

        const sousquartiers = root.children[2];
        expect(sousquartiers).to.be.instanceOf(MapLayerState)

        expect(sousquartiers.checked).to.be.false
        expect(sousquartiers.visibility).to.be.false

        let sousquartiersVisibilityChangedEvt = null;
        sousquartiers.addListener(evt => {
            sousquartiersVisibilityChangedEvt = evt
        }, 'layer.visibility.changed');

        // Change value
        sousquartiers.checked = true;
        // Event dispatched
        expect(sousquartiersVisibilityChangedEvt).to.not.be.null
        expect(sousquartiersVisibilityChangedEvt.name).to.be.eq('SousQuartiers')
        expect(sousquartiersVisibilityChangedEvt.visibility).to.be.true
        // Values have changed
        expect(sousquartiers.checked).to.be.true
        expect(sousquartiers.visibility).to.be.true
        // Events dispatched at root level
        expect(rootLayerVisibilityChangedEvt).to.not.be.null
        expect(rootLayerVisibilityChangedEvt).to.be.deep.equal(sousquartiersVisibilityChangedEvt)
        expect(rootGroupVisibilityChangedEvt).to.be.null

        // Reset
        sousquartiersVisibilityChangedEvt = null;
        rootLayerVisibilityChangedEvt = null;
        // Set same value
        sousquartiers.checked = true;
        // Nothing changed
        expect(sousquartiersVisibilityChangedEvt).to.be.null
        expect(rootLayerVisibilityChangedEvt).to.be.null

        // Change value
        sousquartiers.checked = false;
        // Event dispatched
        expect(sousquartiersVisibilityChangedEvt).to.not.be.null
        expect(sousquartiersVisibilityChangedEvt.name).to.be.eq('SousQuartiers')
        expect(sousquartiersVisibilityChangedEvt.visibility).to.be.false
        // Values have changed
        expect(sousquartiers.checked).to.be.false
        expect(sousquartiers.visibility).to.be.false
        // Events dispatched at root level
        expect(rootLayerVisibilityChangedEvt).to.not.be.null
        expect(rootLayerVisibilityChangedEvt).to.be.deep.equal(sousquartiersVisibilityChangedEvt)
        expect(rootGroupVisibilityChangedEvt).to.be.null

        // Reset
        sousquartiersVisibilityChangedEvt = null;
        rootLayerVisibilityChangedEvt = null;

        const edition = root.children[0];
        expect(edition).to.be.instanceOf(MapGroupState)

        expect(edition.checked).to.be.true
        expect(edition.visibility).to.be.true

        const poi = edition.children[0];
        expect(poi).to.be.instanceOf(MapLayerState)

        expect(poi.checked).to.be.false
        expect(poi.visibility).to.be.false

        let editionVisibilityChangedEvt = null;
        edition.addListener(evt => {
            editionVisibilityChangedEvt = evt
        }, 'group.visibility.changed');

        let poiVisibilityChangedEvt = null;
        poi.addListener(evt => {
            poiVisibilityChangedEvt = evt
        }, 'layer.visibility.changed');

        // Change poi checked value
        poi.checked = true;
        // Poi event dispatched
        expect(poiVisibilityChangedEvt).to.not.be.null
        expect(poiVisibilityChangedEvt.name).to.be.eq('points_of_interest')
        expect(poiVisibilityChangedEvt.visibility).to.be.true
        // Poi values have changed
        expect(poi.checked).to.be.true
        expect(poi.visibility).to.be.true
        // Edition group event not dispatched
        expect(editionVisibilityChangedEvt).to.be.null
        // Edition group values have not changed
        expect(edition.checked).to.be.true
        expect(edition.visibility).to.be.true
        // Events dispatched at root level
        expect(rootLayerVisibilityChangedEvt).to.not.be.null
        expect(rootLayerVisibilityChangedEvt).to.be.deep.equal(poiVisibilityChangedEvt)
        expect(rootGroupVisibilityChangedEvt).to.be.null

        // Reset
        poiVisibilityChangedEvt = null;
        rootLayerVisibilityChangedEvt = null;
        // Change edition group checked value
        edition.checked = false;
        // edition group event dispatched
        expect(editionVisibilityChangedEvt).to.not.be.null
        expect(editionVisibilityChangedEvt.name).to.be.eq('Edition')
        expect(editionVisibilityChangedEvt.visibility).to.be.false
        // Edition group values have changed
        expect(edition.checked).to.be.false
        expect(edition.visibility).to.be.false
        // Poi event dispatched
        expect(poiVisibilityChangedEvt).to.not.be.null
        // Poi still checked but not visible
        expect(poi.checked).to.be.true
        expect(poi.visibility).to.be.false
        // Events dispatched at root level
        expect(rootLayerVisibilityChangedEvt).to.not.be.null
        expect(rootLayerVisibilityChangedEvt).to.be.deep.equal(poiVisibilityChangedEvt)
        expect(rootGroupVisibilityChangedEvt).to.not.be.null
        expect(rootGroupVisibilityChangedEvt).to.be.deep.equal(editionVisibilityChangedEvt)

        // Reset
        editionVisibilityChangedEvt = null;
        poiVisibilityChangedEvt = null;
        rootLayerVisibilityChangedEvt = null;
        rootGroupVisibilityChangedEvt = null;

        // Change poi checked value
        poi.checked = false;
        // No visibility events dispatched
        expect(editionVisibilityChangedEvt).to.be.null
        expect(poiVisibilityChangedEvt).to.be.null
        // Edition group values have not changed
        expect(edition.checked).to.be.false
        expect(edition.visibility).to.be.false
        // Poi checked changed
        expect(poi.checked).to.be.false
        expect(poi.visibility).to.be.false
        // Events not dispatched at root level
        expect(rootLayerVisibilityChangedEvt).to.be.null
        expect(rootGroupVisibilityChangedEvt).to.be.null

        // Change poi checked value
        poi.checked = true;
        // Visibility events dispatched
        expect(editionVisibilityChangedEvt).to.not.be.null
        expect(poiVisibilityChangedEvt).to.not.be.null
        // Edition group values have changed
        expect(edition.checked).to.be.true
        expect(edition.visibility).to.be.true
        // Poi values have changed
        expect(poi.checked).to.be.true
        expect(poi.visibility).to.be.true
        // Events dispatched at root level
        expect(rootLayerVisibilityChangedEvt).to.not.be.null
        expect(rootGroupVisibilityChangedEvt).to.not.be.null

        // Reset root
        //editionVisibilityChangedEvt = null;
        //poiVisibilityChangedEvt = null;
        rootLayerVisibilityChangedEvt = null;
        rootGroupVisibilityChangedEvt = null;
        // Do not dispatch already dispatched event
        edition.dispatch(poiVisibilityChangedEvt);
        expect(rootLayerVisibilityChangedEvt).to.be.null
        edition.dispatch(editionVisibilityChangedEvt);
        expect(rootGroupVisibilityChangedEvt).to.be.null
    })

    it('WMS selected styles', function () {
        const capabilities = JSON.parse(readFileSync('./data/montpellier-capabilities.json', 'utf8'));
        expect(capabilities).to.not.be.undefined
        expect(capabilities.Capability).to.not.be.undefined
        const config = JSON.parse(readFileSync('./data/montpellier-config.json', 'utf8'));
        expect(config).to.not.be.undefined

        const layers = new LayersConfig(config.layers);

        const rootCfg = buildLayerTreeConfig(capabilities.Capability.Layer, layers);
        expect(rootCfg).to.be.instanceOf(LayerTreeGroupConfig)

        const layersOrder = buildLayersOrder(config, rootCfg);

        const collection = new LayersAndGroupsCollection(rootCfg, layersOrder);

        const root = new MapGroupState(collection.root);
        expect(root).to.be.instanceOf(MapGroupState)

        const transports = root.children[1];
        expect(transports).to.be.instanceOf(MapGroupState)

        const tramway = transports.children[1];
        expect(tramway).to.be.instanceOf(MapGroupState)
        expect(tramway.name).to.be.eq('Tramway')

        const tram = tramway.children[1];
        expect(tram).to.be.instanceOf(MapLayerState)
        expect(tram.name).to.be.eq('tramway')
        expect(tram.wmsSelectedStyleName).to.be.eq('black')
        expect(tram.wmsStyles).to.be.an('array').that.be.lengthOf(2)
        expect(tram.wmsStyles[0].wmsName).to.be.eq('black')
        expect(tram.wmsStyles[1].wmsName).to.be.eq('colored')

        // Apply a known style name
        tram.wmsSelectedStyleName = 'colored'
        expect(tram.wmsSelectedStyleName).to.be.eq('colored')

        // listen to layer style change
        let tramStyleChangedEvt = null;
        let rootStyleChangedEvt = null;
        tram.addListener(evt => {
            tramStyleChangedEvt = evt
        }, 'layer.style.changed');
        root.addListener(evt => {
            rootStyleChangedEvt = evt
        }, 'layer.style.changed');

        // Apply a known style name
        tram.wmsSelectedStyleName = 'black'
        expect(tram.wmsSelectedStyleName).to.be.eq('black')
        // Event dispatched
        expect(tramStyleChangedEvt).to.not.be.null
        expect(tramStyleChangedEvt.name).to.be.eq('tramway')
        expect(tramStyleChangedEvt.style).to.be.eq('black')
        expect(rootStyleChangedEvt).to.not.be.null
        expect(rootStyleChangedEvt).to.be.deep.equal(tramStyleChangedEvt)

        //Reset
        tramStyleChangedEvt = null;
        rootStyleChangedEvt = null;

        // Apply same style
        tram.wmsSelectedStyleName = 'black'
        // No event dispatched
        expect(tramStyleChangedEvt).to.be.null
        expect(rootStyleChangedEvt).to.be.null

        // Try to apply an unknown style name
        try {
            tram.wmsSelectedStyleName = 'foobar'
        } catch (error) {
            expect(error.name).to.be.eq('TypeError')
            expect(error.message).to.be.eq('Cannot assign an unknown WMS style name! `foobar` is not in the layer `tramway` WMS styles!')
            expect(error).to.be.instanceOf(TypeError)
        }
        // No event dispatched
        expect(tramStyleChangedEvt).to.be.null
        expect(rootStyleChangedEvt).to.be.null
    })

    it('Legend on/off', function () {
        const capabilities = JSON.parse(readFileSync('./data/montpellier-capabilities.json', 'utf8'));
        expect(capabilities).to.not.be.undefined
        expect(capabilities.Capability).to.not.be.undefined
        const config = JSON.parse(readFileSync('./data/montpellier-config.json', 'utf8'));
        expect(config).to.not.be.undefined

        const layers = new LayersConfig(config.layers);

        const rootCfg = buildLayerTreeConfig(capabilities.Capability.Layer, layers);
        expect(rootCfg).to.be.instanceOf(LayerTreeGroupConfig)

        const layersOrder = buildLayersOrder(config, rootCfg);

        const collection = new LayersAndGroupsCollection(rootCfg, layersOrder);

        const root = new MapGroupState(collection.root);
        expect(root).to.be.instanceOf(MapGroupState)

        const legend = JSON.parse(readFileSync('./data/montpellier-legend.json', 'utf8'));
        expect(legend).to.not.be.undefined

        const sousquartiers = root.children[2];
        expect(sousquartiers).to.be.instanceOf(MapLayerState)
        expect(sousquartiers.name).to.be.eq('SousQuartiers')
        expect(sousquartiers.wmsSelectedStyleName).to.be.eq('default')
        expect(sousquartiers.wmsParameters).to.be.an('object').that.deep.equal({
          'LAYERS': 'SousQuartiers',
          'STYLES': 'default',
          'FORMAT': 'image/png',
          'DPI': 96
        })
        expect(sousquartiers.symbology).to.be.null
        sousquartiers.symbology = legend.nodes[1]
        expect(sousquartiers.symbology).to.be.instanceOf(LayerIconSymbology)

        const quartiers = root.children[3];
        expect(quartiers).to.be.instanceOf(MapLayerState)
        expect(quartiers.name).to.be.eq('Quartiers')
        expect(quartiers.wmsSelectedStyleName).to.be.eq('default')
        expect(quartiers.wmsParameters).to.be.an('object').that.deep.equal({
          'LAYERS': 'Quartiers',
          'STYLES': 'default',
          'FORMAT': 'image/png',
          'DPI': 96
        })
        expect(quartiers.symbology).to.be.null

        // Set symbologie
        quartiers.symbology = legend.nodes[0]
        // Check Symbologie
        expect(quartiers.symbology).to.be.instanceOf(LayerSymbolsSymbology)
        expect(quartiers.symbology.childrenCount).to.be.eq(8)
        expect(quartiers.symbology.children[0]).to.be.instanceOf(SymbolIconSymbology)
        expect(quartiers.symbology.children[0].checked).to.be.true
        expect(quartiers.symbology.children[0].ruleKey).to.be.eq('0')

        // Unchecked rules
        quartiers.symbology.children[0].checked = false;
        quartiers.symbology.children[2].checked = false;
        quartiers.symbology.children[4].checked = false;
        quartiers.symbology.children[6].checked = false;
        expect(quartiers.wmsParameters).to.be.an('object').that.deep.equal({
          'LAYERS': 'Quartiers',
          'STYLES': 'default',
          'FORMAT': 'image/png',
          'LEGEND_ON': 'Quartiers:1,3,5,7',
          'LEGEND_OFF': 'Quartiers:0,2,4,6',
          'DPI': 96
        })

        // Checked rules
        quartiers.symbology.children[0].checked = true;
        quartiers.symbology.children[2].checked = true;
        quartiers.symbology.children[4].checked = true;
        expect(quartiers.wmsParameters).to.be.an('object').that.deep.equal({
          'LAYERS': 'Quartiers',
          'STYLES': 'default',
          'FORMAT': 'image/png',
          'LEGEND_ON': 'Quartiers:0,1,2,3,4,5,7',
          'LEGEND_OFF': 'Quartiers:6',
          'DPI': 96
        })

        // Checked all rules and events
        let rootLayerSymbologyChangedEvt = null;
        let layerSymbologyChangedEvt = null;
        let symbologyChangedEvt = null;
        quartiers.symbology.children[6].addListener(evt => {
            symbologyChangedEvt = evt
        }, 'symbol.checked.changed');
        quartiers.addListener(evt => {
            layerSymbologyChangedEvt = evt
        }, 'layer.symbol.checked.changed');
        root.addListener(evt => {
            rootLayerSymbologyChangedEvt = evt
        }, 'layer.symbol.checked.changed');
        quartiers.symbology.children[6].checked = true;
        expect(quartiers.wmsParameters).to.be.an('object').that.deep.equal({
          'LAYERS': 'Quartiers',
          'STYLES': 'default',
          'FORMAT': 'image/png',
          'DPI': 96
        })
        expect(symbologyChangedEvt).to.not.be.null
        expect(symbologyChangedEvt.title).to.be.eq('PRES D\'ARENE')
        expect(symbologyChangedEvt.ruleKey).to.be.eq('6')
        expect(symbologyChangedEvt.checked).to.be.true
        expect(layerSymbologyChangedEvt).to.not.be.null
        expect(layerSymbologyChangedEvt.name).to.be.eq('Quartiers')
        expect(layerSymbologyChangedEvt.title).to.be.eq('PRES D\'ARENE')
        expect(layerSymbologyChangedEvt.ruleKey).to.be.eq('6')
        expect(layerSymbologyChangedEvt.checked).to.be.true
        expect(rootLayerSymbologyChangedEvt).to.not.be.null
        expect(rootLayerSymbologyChangedEvt).to.be.eq(layerSymbologyChangedEvt)
    })

    it('Selection & token', function () {
        const capabilities = JSON.parse(readFileSync('./data/montpellier-capabilities.json', 'utf8'));
        expect(capabilities).to.not.be.undefined
        expect(capabilities.Capability).to.not.be.undefined
        const config = JSON.parse(readFileSync('./data/montpellier-config.json', 'utf8'));
        expect(config).to.not.be.undefined

        const layers = new LayersConfig(config.layers);

        const rootCfg = buildLayerTreeConfig(capabilities.Capability.Layer, layers);
        expect(rootCfg).to.be.instanceOf(LayerTreeGroupConfig)

        const layersOrder = buildLayersOrder(config, rootCfg);

        const collection = new LayersAndGroupsCollection(rootCfg, layersOrder);

        const root = new MapGroupState(collection.root);
        expect(root).to.be.instanceOf(MapGroupState)

        const sousquartiers = root.children[2];
        expect(sousquartiers).to.be.instanceOf(MapLayerState)
        expect(sousquartiers.wmsParameters).to.be.an('object').that.deep.equal({
          'LAYERS': 'SousQuartiers',
          'STYLES': 'default',
          'FORMAT': 'image/png',
          'DPI': 96
        })
        expect(sousquartiers.symbology).to.be.null
        expect(sousquartiers.itemState).to.not.be.null
        expect(sousquartiers.itemState).to.be.instanceOf(LayerVectorState)
        expect(sousquartiers.itemState.selectedFeatures).to.be.an('array').that.have.length(0)
        expect(sousquartiers.itemState.selectionToken).to.be.null
        expect(sousquartiers.itemState.expressionFilter).to.be.null
        expect(sousquartiers.itemState.filterToken).to.be.null

        // Checked selection and events
        let rootSelectionChangedEvt = null;
        let rootSelectionTokenChangedEvt = null;
        let rootOrderedChangedEvt = [];
        let layerSelectionChangedEvt = null;
        let layerSelectionTokenChangedEvt = null;
        let layerOrderedChangedEvt = [];
        // Add event listener
        sousquartiers.addListener(evt => {
            layerSelectionChangedEvt = evt
            layerOrderedChangedEvt.push(evt)
        }, 'layer.selection.changed');
        sousquartiers.addListener(evt => {
            layerSelectionTokenChangedEvt = evt
            layerOrderedChangedEvt.push(evt)
        }, 'layer.selection.token.changed');
        root.addListener(evt => {
            rootSelectionChangedEvt = evt
            rootOrderedChangedEvt.push(evt)
        }, 'layer.selection.changed');
        root.addListener(evt => {
            rootSelectionTokenChangedEvt = evt
            rootOrderedChangedEvt.push(evt)
        }, 'layer.selection.token.changed');

        // Set selectedFeatures
        sousquartiers.itemState.selectedFeatures = ['1']
        expect(layerSelectionChangedEvt).to.not.be.null
        expect(layerSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(layerSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(layerSelectionTokenChangedEvt).to.be.null
        expect(layerOrderedChangedEvt).to.have.length(1)
        expect(rootSelectionChangedEvt).to.not.be.null
        expect(rootSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(rootSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(rootSelectionTokenChangedEvt).to.be.null
        expect(rootOrderedChangedEvt).to.have.length(1)
        expect(sousquartiers.wmsParameters).to.be.an('object').that.be.deep.eq({
            "LAYERS": "SousQuartiers",
            "STYLES": "default",
            "FORMAT": "image/png",
            "DPI": 96,
            "SELECTION": "SousQuartiers:1"
        })

        //Reset
        rootSelectionChangedEvt = null;
        rootSelectionTokenChangedEvt = null;
        rootOrderedChangedEvt = [];
        layerSelectionChangedEvt = null;
        layerSelectionTokenChangedEvt = null;
        layerOrderedChangedEvt = [];

        // Set selectedFeatures
        sousquartiers.itemState.selectedFeatures = ['1', '3']
        expect(layerSelectionChangedEvt).to.not.be.null
        expect(layerSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(layerSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(2)
        expect(layerSelectionTokenChangedEvt).to.be.null
        expect(layerOrderedChangedEvt).to.have.length(1)
        expect(rootSelectionChangedEvt).to.not.be.null
        expect(rootSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(rootSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(2)
        expect(rootSelectionTokenChangedEvt).to.be.null
        expect(rootOrderedChangedEvt).to.have.length(1)
        expect(sousquartiers.wmsParameters).to.be.an('object').that.be.deep.eq({
            "LAYERS": "SousQuartiers",
            "STYLES": "default",
            "FORMAT": "image/png",
            "DPI": 96,
            "SELECTION": "SousQuartiers:1,3"
        })

        //Reset
        rootSelectionChangedEvt = null;
        rootSelectionTokenChangedEvt = null;
        rootOrderedChangedEvt = [];
        layerSelectionChangedEvt = null;
        layerSelectionTokenChangedEvt = null;
        layerOrderedChangedEvt = [];

        // Reset selectedFeatures
        sousquartiers.itemState.selectedFeatures = null;
        expect(layerSelectionChangedEvt).to.not.be.null
        expect(layerSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(layerSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(0)
        expect(layerSelectionTokenChangedEvt).to.be.null
        expect(layerOrderedChangedEvt).to.have.length(1)
        expect(rootSelectionChangedEvt).to.not.be.null
        expect(rootSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(rootSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(0)
        expect(rootSelectionTokenChangedEvt).to.be.null
        expect(rootOrderedChangedEvt).to.have.length(1)
        expect(sousquartiers.wmsParameters).to.be.an('object').that.be.deep.eq({
            "LAYERS": "SousQuartiers",
            "STYLES": "default",
            "FORMAT": "image/png",
            "DPI": 96
        })

        //Reset
        rootSelectionChangedEvt = null;
        rootSelectionTokenChangedEvt = null;
        rootOrderedChangedEvt = [];
        layerSelectionChangedEvt = null;
        layerSelectionTokenChangedEvt = null;
        layerOrderedChangedEvt = [];

        // update selectedFeatures and selectionToken
        sousquartiers.itemState.selectedFeatures = ['1']
        sousquartiers.itemState.selectionToken = 'token-for-id-1'
        expect(layerSelectionChangedEvt).to.not.be.null
        expect(layerSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(layerSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(layerSelectionTokenChangedEvt).to.not.be.null
        expect(layerSelectionTokenChangedEvt.name).to.be.eq('SousQuartiers')
        expect(layerSelectionTokenChangedEvt.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(layerSelectionTokenChangedEvt.selectionToken).to.be.eq('token-for-id-1')
        expect(layerOrderedChangedEvt).to.have.length(2)
        expect(layerOrderedChangedEvt[0].type).to.be.eq('layer.selection.changed')
        expect(layerOrderedChangedEvt[1].type).to.be.eq('layer.selection.token.changed')
        expect(rootSelectionChangedEvt).to.not.be.null
        expect(rootSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(rootSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(rootSelectionTokenChangedEvt).to.not.be.null
        expect(rootSelectionTokenChangedEvt.name).to.be.eq('SousQuartiers')
        expect(rootSelectionTokenChangedEvt.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(rootSelectionTokenChangedEvt.selectionToken).to.be.eq('token-for-id-1')
        expect(rootOrderedChangedEvt).to.have.length(2)
        expect(rootOrderedChangedEvt[0].type).to.be.eq('layer.selection.changed')
        expect(rootOrderedChangedEvt[1].type).to.be.eq('layer.selection.token.changed')
        expect(sousquartiers.itemState.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(sousquartiers.wmsParameters).to.be.an('object').that.be.deep.eq({
            "LAYERS": "SousQuartiers",
            "STYLES": "default",
            "FORMAT": "image/png",
            "DPI": 96,
            "SELECTIONTOKEN": "token-for-id-1"
        })

        //Reset
        rootSelectionChangedEvt = null;
        rootSelectionTokenChangedEvt = null;
        rootOrderedChangedEvt = [];
        layerSelectionChangedEvt = null;
        layerSelectionTokenChangedEvt = null;
        layerOrderedChangedEvt = [];

        // Update selectionToken with an object
        sousquartiers.itemState.selectionToken = {
            selectedFeatures: ['1', '3'],
            token: 'token-for-id-1-3'
        }
        expect(layerSelectionChangedEvt).to.not.be.null
        expect(layerSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(layerSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(2)
        expect(layerSelectionTokenChangedEvt).to.not.be.null
        expect(layerSelectionTokenChangedEvt.name).to.be.eq('SousQuartiers')
        expect(layerSelectionTokenChangedEvt.selectedFeatures).to.be.an('array').that.have.length(2)
        expect(layerSelectionTokenChangedEvt.selectionToken).to.be.eq('token-for-id-1-3')
        expect(layerOrderedChangedEvt).to.have.length(2)
        expect(layerOrderedChangedEvt[0].type).to.be.eq('layer.selection.changed')
        expect(layerOrderedChangedEvt[1].type).to.be.eq('layer.selection.token.changed')
        expect(rootSelectionChangedEvt).to.not.be.null
        expect(rootSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(rootSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(2)
        expect(rootSelectionTokenChangedEvt).to.not.be.null
        expect(rootSelectionTokenChangedEvt.name).to.be.eq('SousQuartiers')
        expect(rootSelectionTokenChangedEvt.selectedFeatures).to.be.an('array').that.have.length(2)
        expect(rootSelectionTokenChangedEvt.selectionToken).to.be.eq('token-for-id-1-3')
        expect(rootOrderedChangedEvt).to.have.length(2)
        expect(rootOrderedChangedEvt[0].type).to.be.eq('layer.selection.changed')
        expect(rootOrderedChangedEvt[1].type).to.be.eq('layer.selection.token.changed')
        expect(sousquartiers.itemState.selectedFeatures).to.be.an('array').that.have.length(2)
        expect(sousquartiers.wmsParameters).to.be.an('object').that.be.deep.eq({
            "LAYERS": "SousQuartiers",
            "STYLES": "default",
            "FORMAT": "image/png",
            "DPI": 96,
            "SELECTIONTOKEN": "token-for-id-1-3"
        })

        //Reset
        rootSelectionChangedEvt = null;
        rootSelectionTokenChangedEvt = null;
        rootOrderedChangedEvt = [];
        layerSelectionChangedEvt = null;
        layerSelectionTokenChangedEvt = null;
        layerOrderedChangedEvt = [];

        // Set selectedFeatures
        sousquartiers.itemState.selectedFeatures = ['1']
        expect(layerSelectionChangedEvt).to.not.be.null
        expect(layerSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(layerSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(layerSelectionTokenChangedEvt).to.not.be.null
        expect(layerSelectionTokenChangedEvt.name).to.be.eq('SousQuartiers')
        expect(layerSelectionTokenChangedEvt.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(layerSelectionTokenChangedEvt.selectionToken).to.be.null
        expect(layerOrderedChangedEvt).to.have.length(2)
        expect(layerOrderedChangedEvt[0].type).to.be.eq('layer.selection.changed')
        expect(layerOrderedChangedEvt[1].type).to.be.eq('layer.selection.token.changed')
        expect(rootSelectionChangedEvt).to.not.be.null
        expect(rootSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(rootSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(rootSelectionTokenChangedEvt).to.not.be.null
        expect(rootSelectionTokenChangedEvt.name).to.be.eq('SousQuartiers')
        expect(rootSelectionTokenChangedEvt.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(rootSelectionTokenChangedEvt.selectionToken).to.be.null
        expect(rootOrderedChangedEvt).to.have.length(2)
        expect(rootOrderedChangedEvt[0].type).to.be.eq('layer.selection.changed')
        expect(rootOrderedChangedEvt[1].type).to.be.eq('layer.selection.token.changed')
        expect(sousquartiers.itemState.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(sousquartiers.wmsParameters).to.be.an('object').that.be.deep.eq({
            "LAYERS": "SousQuartiers",
            "STYLES": "default",
            "FORMAT": "image/png",
            "DPI": 96,
            "SELECTION": "SousQuartiers:1"
        })

        //Reset
        rootSelectionChangedEvt = null;
        rootSelectionTokenChangedEvt = null;
        rootOrderedChangedEvt = [];
        layerSelectionChangedEvt = null;
        layerSelectionTokenChangedEvt = null;
        layerOrderedChangedEvt = [];

        // Set selectionToken with an object contains the same selectedFeatures
        sousquartiers.itemState.selectionToken = {
            selectedFeatures: ['1'],
            token: 'token-for-id-1'
        }
        expect(layerSelectionChangedEvt).to.be.null
        expect(layerSelectionTokenChangedEvt).to.not.be.null
        expect(layerSelectionTokenChangedEvt.name).to.be.eq('SousQuartiers')
        expect(layerSelectionTokenChangedEvt.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(layerSelectionTokenChangedEvt.selectionToken).to.be.eq('token-for-id-1')
        expect(layerOrderedChangedEvt).to.have.length(1)
        expect(rootSelectionChangedEvt).to.be.null
        expect(rootSelectionTokenChangedEvt).to.not.be.null
        expect(rootSelectionTokenChangedEvt.name).to.be.eq('SousQuartiers')
        expect(rootSelectionTokenChangedEvt.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(rootSelectionTokenChangedEvt.selectionToken).to.be.eq('token-for-id-1')
        expect(rootOrderedChangedEvt).to.have.length(1)
        expect(sousquartiers.itemState.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(sousquartiers.wmsParameters).to.be.an('object').that.be.deep.eq({
            "LAYERS": "SousQuartiers",
            "STYLES": "default",
            "FORMAT": "image/png",
            "DPI": 96,
            "SELECTIONTOKEN": "token-for-id-1"
        })

        //Reset
        rootSelectionChangedEvt = null;
        rootSelectionTokenChangedEvt = null;
        rootOrderedChangedEvt = [];
        layerSelectionChangedEvt = null;
        layerSelectionTokenChangedEvt = null;
        layerOrderedChangedEvt = [];

        try {
            sousquartiers.itemState.selectionToken = 1
        } catch (error) {
            expect(error.name).to.be.eq('ValidationError')
            expect(error.message).to.be.eq('Selection token could only be null, a string or an object!')
            expect(error).to.be.instanceOf(ValidationError)
        }
        expect(layerSelectionChangedEvt).to.be.null
        expect(layerSelectionTokenChangedEvt).to.be.null
        expect(layerOrderedChangedEvt).to.have.length(0)
        expect(rootSelectionChangedEvt).to.be.null
        expect(rootSelectionTokenChangedEvt).to.be.null
        expect(rootOrderedChangedEvt).to.have.length(0)
        expect(sousquartiers.itemState.selectedFeatures).to.be.an('array').that.have.length(1)
        expect(sousquartiers.wmsParameters).to.be.an('object').that.be.deep.eq({
            "LAYERS": "SousQuartiers",
            "STYLES": "default",
            "FORMAT": "image/png",
            "DPI": 96,
            "SELECTIONTOKEN": "token-for-id-1"
        })

        // Set selectionToken with an object contains an empty selectedFeatures
        sousquartiers.itemState.selectionToken = {
            selectedFeatures: [],
            token: 'token-empty'
        }
        expect(layerSelectionChangedEvt).to.not.be.null
        expect(layerSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(layerSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(0)
        expect(layerSelectionTokenChangedEvt).to.not.be.null
        expect(layerSelectionTokenChangedEvt.name).to.be.eq('SousQuartiers')
        expect(layerSelectionTokenChangedEvt.selectedFeatures).to.be.an('array').that.have.length(0)
        expect(layerSelectionTokenChangedEvt.selectionToken).to.be.null
        expect(layerOrderedChangedEvt).to.have.length(2)
        expect(layerOrderedChangedEvt[0].type).to.be.eq('layer.selection.changed')
        expect(layerOrderedChangedEvt[1].type).to.be.eq('layer.selection.token.changed')
        expect(rootSelectionChangedEvt).to.not.be.null
        expect(rootSelectionChangedEvt.name).to.be.eq('SousQuartiers')
        expect(rootSelectionChangedEvt.selectedFeatures).to.be.an('array').that.have.length(0)
        expect(rootSelectionTokenChangedEvt).to.not.be.null
        expect(rootSelectionTokenChangedEvt.name).to.be.eq('SousQuartiers')
        expect(rootSelectionTokenChangedEvt.selectedFeatures).to.be.an('array').that.have.length(0)
        expect(rootSelectionTokenChangedEvt.selectionToken).to.be.null
        expect(rootOrderedChangedEvt).to.have.length(2)
        expect(rootOrderedChangedEvt[0].type).to.be.eq('layer.selection.changed')
        expect(rootOrderedChangedEvt[1].type).to.be.eq('layer.selection.token.changed')
        expect(sousquartiers.wmsParameters).to.be.an('object').that.be.deep.eq({
            "LAYERS": "SousQuartiers",
            "STYLES": "default",
            "FORMAT": "image/png",
            "DPI": 96
        })
    })
})
