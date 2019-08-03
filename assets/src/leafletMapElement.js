import 'leaflet/dist/leaflet.css';
import L from 'leaflet/dist/leaflet.js';

// /* This code is needed to properly load the images in the Leaflet CSS */
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//   iconUrl: require('leaflet/dist/images/marker-icon.png'),
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
// });

export default class leafletMapElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        window.addEventListener('load', function (event) {
            var mymap = L.map('leafletmap').setView([51.505, -0.09], 13);

            L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
                attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
                maxZoom: 18,
                id: 'mapbox.streets',
                accessToken: 'pk.eyJ1IjoibmJvaXN0ZWF1bHQiLCJhIjoiY2p5dnlqbWc5MHM5dzNtcGdpMTZkbHBxeiJ9.sRtVrxKz-1uRxlIKUudYwQ'
            }).addTo(mymap);
        }, false);
    }

    disconnectedCallback() {

    }
}