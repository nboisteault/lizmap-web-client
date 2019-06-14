import 'ol/ol.css';

import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {Tile as TileLayer} from 'ol/layer.js';
import OSM from 'ol/source/OSM';

class MainMap {

	constructor() {
	    this.map = new Map({
	      layers: [
	        new TileLayer({
	          source: new OSM(),
	          baseLayer: true
	        })
	      ],
	      controls: [],
	      target: 'map',
	      view: new View({
	        center: [0, 0],
	        zoom: 2
	        // initialExtent: initialExtent
	      })
	    });
	  }
}

export default MainMap;