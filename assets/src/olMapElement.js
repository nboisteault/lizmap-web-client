import 'ol/ol.css';

import OLMap from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

import { mainEventDispatcher, mainLizmapMap } from "./lizmapGlobals";

export default class olMapElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._olMap = new OLMap({
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            target: this,
            view: new View({
                center: [431716.34, 5405473.69],
                zoom: 13
            })
        });

        // Detect zoom changes
        this._olMap.on('moveend', this.onMoveEnd.bind(this));

        mainEventDispatcher.addListener(this.setZoom.bind(this),
            { type: 'map-zoom-change' });

    }

    disconnectedCallback() {

    }

    onMoveEnd(event) {
        mainLizmapMap.zoom = this._olMap.getView().getZoom();
    }

    setZoom(event) {
        this._olMap.getView().setZoom(event.zoom);
    }
}
