import 'leaflet/dist/leaflet.css';
import L from 'leaflet/dist/leaflet.js';
// https://github.com/btpschroeder/leaflet-webpack

import { mainEventDispatcher, mainLizmapMap  } from "./lizmapGlobals";

export default class leafletMapElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        window.addEventListener('load', function (event) {
            this._leafletMap = L.map('leafletmap').setView([43.611222, 3.878174], 13);

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoibmJvaXN0ZWF1bHQiLCJhIjoiY2p5dnlqbWc5MHM5dzNtcGdpMTZkbHBxeiJ9.sRtVrxKz-1uRxlIKUudYwQ'
            }).addTo(this._leafletMap);

            this._leafletMap.on('zoomend', this.onZoomeEnd.bind(this));

            mainEventDispatcher.addListener(this.setZoom.bind(this),
                { type: 'map-zoom-change' });
        }.bind(this), false);

    }

    disconnectedCallback() {

    }

    onZoomeEnd(event) {
        mainLizmapMap.zoom = this._leafletMap.getZoom();
    }

    setZoom(event) {
        this._leafletMap.setZoom(event.zoom);
    }
}