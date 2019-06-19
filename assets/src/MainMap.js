import Map from 'ol/Map.js';
import View from 'ol/View.js';
import {defaults as defaultControls, ZoomSlider} from 'ol/control.js';
import {Tile as TileLayer} from 'ol/layer.js';
import OSM from 'ol/source/OSM';

class MainMap {

	constructor(options) {
	    this.map = new Map({
	      layers: [
	        new TileLayer({
	          source: new OSM()
	        })
	      ],
	      controls: defaultControls({
            zoomOptions: {
              zoomInTipLabel: lizDict['zoom.zoomin'],
              zoomOutTipLabel: lizDict['zoom.zoomout']
            }
          }).extend([
		      new ZoomSlider()
		    ]),
	      target: 'map',
	      view: new View({
	        center: [0, 0],
	        zoom: 2
	      })
	    });

	    if(options.hasOwnProperty('initialExtent')){
	    	// TODO : handle other projection
	    	this.map.getView().fit(options.initialExtent);
	    }
	  }
}

export default MainMap;