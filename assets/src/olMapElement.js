import 'ol/ol.css';

import OLMap from 'ol/Map.js';
import View from 'ol/View.js';
import TileLayer from 'ol/layer/Tile.js';
import OSM from 'ol/source/OSM.js';

export default class olMapElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this._OLMap = new OLMap({
            layers: [
                new TileLayer({
                    source: new OSM()
                })
            ],
            target: this,
            view: new View({
                center: [0, 0],
                zoom: 2
            })
        });
    }

    disconnectedCallback() {

    }
}
