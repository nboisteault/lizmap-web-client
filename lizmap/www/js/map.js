/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/map.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/map.js":
/*!********************!*\
  !*** ./src/map.js ***!
  \********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ "./src/util.js");
/**
* Class: lizMap
* @package   lizmap
* @subpackage view
* @author    3liz
* @copyright 2011 3liz
* @link      http://3liz.com
* @license    Mozilla Public License : http://www.mozilla.org/MPL/
*/




var lizMap = function() {
  /**
   * PRIVATE Property: config
   * {object} The map config
   */
  var config = null;
  /**
   * PRIVATE Property: capabilities
   * {object} The wms capabilities
   */
  var capabilities = null;
  /**
   * PRIVATE Property: wmtsCapabilities
   * {object} The wmts capabilities
   */
  var wmtsCapabilities = null;
  /**
   * PRIVATE Property: wfsCapabilities
   * {object} The wfs capabilities
   */
  var wfsCapabilities = null;
  /**
   * PRIVATE Property: map
   * {<OpenLayers.Map>} The map
   */
  var map = null;
  /**
   * PRIVATE Property: baselayers
   * {Array(<OpenLayers.Layer>)} Ordered list of base layers
   */
  var baselayers = [];
  /**
   * PRIVATE Property: layers
   * {Array(<OpenLayers.Layer>)} Ordered list of layers
   */
  var layers = [];
  /**
   * PRIVATE Property: controls
   * {Object({key:<OpenLayers.Control>})} Dictionary of controls
   */
  var controls = {};
  /**
   * PRIVATE Property: printCapabilities
   * {Object({scales:[Float],layouts:[Object]})} Print capabilities
   */
  var printCapabilities = {scales:[],layouts:[]};
  /**
   * PRIVATE Property: tree
   * {object} The layer's tree
   */
  var tree = {config:{type:'group'}};

  /**
   * PRIVATE Property: getFeatureInfoVendorParams
   * {object} Additionnal QGIS Server parameter for click tolerance in pixels
   */
  var defaultGetFeatureInfoTolerances = {
    'FI_POINT_TOLERANCE': 25,
    'FI_LINE_TOLERANCE': 10,
    'FI_POLYGON_TOLERANCE': 5
  };

  /**
   * PRIVATE Property: externalBaselayersReplacement
   *
   */
  var externalBaselayersReplacement = {
    'osm': 'osm-mapnik',
    'osm-toner': 'osm-stamen-toner',
    'osm-cycle': 'osm-cyclemap',
    'gsat': 'google-satellite',
    'ghyb': 'google-hybrid',
    'gphy': 'google-terrain',
    'gmap': 'google-street',
    'bmap': 'bing-road',
    'baerial': 'bing-aerial',
    'bhybrid': 'bing-hybrid',
    'ignmap': 'ign-scan',
    'ignplan': 'ign-plan',
    'ignphoto': 'ign-photo',
    'igncadastral': 'ign-cadastral'
  };

  /**
   * PRIVATE Property: externalBaselayersReplacement
   *
   */
  var startupBaselayersReplacement = {
    'osm-mapnik': 'osm',
    'osm-stamen-toner': 'osm-toner',
    'osm-cyclemap': 'osm-cycle',
    'google-satellite': 'gsat',
    'google-hybrid': 'ghyb',
    'google-terrain': 'gphy',
    'google-street': 'gmap',
    'bing-road': 'bmap',
    'bing-aerial': 'baerial',
    'bing-hybrid': 'bhybrid',
    'ign-scan': 'ignmap',
    'ign-plan': 'ignplan',
    'ign-photo': 'ignphoto',
    'ign-cadastral': 'igncadastral',
    'empty': 'emptyBaselayer'
  };

  /**
   * PRIVATE Property: cleanNameMap
   *
   */
  var cleanNameMap = {
  };

  /**
   * PRIVATE Property: layerIdMap
   *
   */
  var layerIdMap = {
  };
  /**
   * PRIVATE Property: shortNameMap
   *
   */
  var shortNameMap = {
  };
  /**
   * PRIVATE Property: typeNameMap
   *
   */
  var typeNameMap = {
  };

  /**
   * Permalink args
   */
  var permalinkArgs = null;

  /**
   * PRIVATE Property: layerCleanNames
   *
   */
  var layerCleanNames = {};

  /**
   * PRIVATE Property: lizmapLayerFilterActive. Contains layer name if filter is active
   *
   */
  var lizmapLayerFilterActive = null;

  /**
   * PRIVATE Property: editionPending. True when an edition form has already been displayed. Used to prevent double-click on launchEdition button
   *
   */
  var editionPending = false;

  function performCleanName(aName) {
    var accentMap = {
        "à": "a",    "á": "a",    "â": "a",    "ã": "a",    "ä": "a",    "ç": "c",    "è": "e",    "é": "e",    "ê": "e",    "ë": "e",    "ì": "i",    "í": "i",    "î": "i",    "ï": "i",    "ñ": "n",    "ò": "o",    "ó": "o",    "ô": "o",    "õ": "o",    "ö": "o",    "ù": "u",    "ú": "u",    "û": "u",    "ü": "u",    "ý": "y",    "ÿ": "y",
        "À": "A",    "Á": "A",    "Â": "A",    "Ã": "A",    "Ä": "A",    "Ç": "C",    "È": "E",    "É": "E",    "Ê": "E",    "Ë": "E",    "Ì": "I",    "Í": "I",    "Î": "I",    "Ï": "I",    "Ñ": "N",    "Ò": "O",    "Ó": "O",    "Ô": "O",    "Õ": "O",    "Ö": "O",    "Ù": "U",    "Ú": "U",    "Û": "U",    "Ü": "U",    "Ý": "Y",
        "-":" ", "'": " ", "(": " ", ")": " "};
    var normalize = function( term ) {
        var ret = "";
        for ( var i = 0; i < term.length; i++ ) {
            ret += accentMap[ term.charAt(i) ] || term.charAt(i);
        }
        return ret;
    };
    var theCleanName = normalize(aName);
    var reg = new RegExp('\\W', 'g');
    return theCleanName.replace(reg, '_');
  }

  /**
   * PRIVATE function: cleanName
   * cleaning layerName for class and layer
   */
  function cleanName(aName){
    if ( aName in cleanNameMap )
        return aName;

    theCleanName = performCleanName( aName );
    if ( (theCleanName in cleanNameMap) && cleanNameMap[theCleanName] != aName ){
        i = 1;
        nCleanName = theCleanName+i;
        while( (nCleanName in cleanNameMap) && cleanNameMap[nCleanName] != aName ){
          i += 1;
          nCleanName = theCleanName+i;
        }
        theCleanName = nCleanName;
    }
    cleanNameMap[theCleanName] = aName;
    return theCleanName;
  }

  function getNameByCleanName( cleanName ){
    var name = null;
    if( cleanName in cleanNameMap )
      name = cleanNameMap[cleanName];
    return name;
  }

  function getNameByShortName( shortName ){
    var name = null;
    if( shortName in shortNameMap )
      name = shortNameMap[shortName];
    return name;
  }

  function getNameByTypeName( typeName ){
    var name = null;
    if( typeName in typeNameMap )
      name = typeNameMap[typeName];
    return name;
  }

  function getLayerNameByCleanName( cleanName ){
    var layerName = null;
    if( cleanName in layerCleanNames )
      layerName = layerCleanNames[cleanName];
    if ( layerName == null && cleanName in cleanNameMap ) {
      layerName = cleanNameMap[cleanName];
      layerCleanNames[cleanName] = layerName;
    }
    return layerName;
  }


  /**
   * PRIVATE function: updateMobile
   * Determine if we should display the mobile version.
   */
  function updateMobile(){
    var isMobile = mCheckMobile();
    var contentIsMobile = $('#content').hasClass('mobile');
    if (isMobile == contentIsMobile)
      return;

    if (isMobile) {
      // Add mobile class to content
      $('#content, #headermenu').addClass('mobile');

      // hide overview map
      if (config.options.hasOverview){
        $('#overview-toggle').hide();
        $('#overview-map').hide().removeClass('active');
      }

      // Hide switcher
      if( $('#button-switcher').parent().hasClass('active') )
        $('#button-switcher').click();

      // Hide tooltip-layer
      if( $('#button-tooltip-layer').parent().hasClass('active') )
        $('#button-tooltip-layer').click();

      if( $('#menu').is(':visible'))
        $('#menu').hide();

      $('#map-content').append($('#toolbar'));

      $('#toggleLegend')
        .attr('data-original-title',$('#toggleLegendOn').attr('value'))
        .parent().attr('class','legend');

      // autocompletion items for locatebylayer feature
      $('div.locate-layer select').show();
      $('span.custom-combobox').hide();
    }
    else
    {
      // Remove mobile class to content
      $('#content, #headermenu').removeClass('mobile');

      // Display overview map
      if (config.options.hasOverview){
        $('#overview-map').show();
        $('#overview-toggle').show().addClass('active');
      }
      // Show switcher
      if( !( $('#button-switcher').parent().hasClass('active') ) )
        $('#button-switcher').click();

      if( !$('#menu').is(':visible'))
        $('#content span.ui-icon-open-menu').click();
      else
        $('#map-content').show();

      $('#toolbar').insertBefore($('#switcher-menu'));

      $('#toggleLegend')
        .attr('data-original-title',$('#toggleMapOnlyOn').attr('value'))
        .parent().attr('class','map');

      // autocompletion items for locatebylayer feature
      $('div.locate-layer select').hide();
      $('span.custom-combobox').show();
    }

  }


  /**
   * PRIVATE function: updateContentSize
   * update the content size
   */
  function updateContentSize(){

    updateMobile();

    // calculate height height
    var h = $(window).innerHeight();
    h = h - $('#header').height();
    $('#map').height(h);

    // Update body padding top by summing up header+headermenu
    $('body').css('padding-top', $('#header').outerHeight() );

    // calculate map width depending on theme configuration
    // (fullscreen map or not, mobile or not)
    var w = $('body').parent()[0].offsetWidth;
    w -= parseInt($('#map-content').css('margin-left'));
    w -= parseInt($('#map-content').css('margin-right'));
    if ($('#menu').is(':hidden') || $('#map-content').hasClass('fullscreen')) {
      $('#map-content').css('margin-left','auto');
    } else {
      w -= $('#menu').width();
      $('#map-content').css('margin-left', $('#menu').width());
    }
    $('#map').width(w);

    // Set the tab-content max-height
    if ( $('#dock-tabs').is(':visible') )
        $('#dock-content').css( 'max-height', $('#dock').height() - $('#dock-tabs').height() );

    $('#dock').css('overflow-y', 'hidden');

    if(map)
      updateMapSize();

  }


  /**
   * PRIVATE function: updateMapSize
   * query OpenLayers to update the map size
   */
 function updateMapSize(){
    //manage WMS max width and height
    var wmsMaxWidth = 3000;
    var wmsMaxHeight = 3000;
    if( ('wmsMaxWidth' in config.options) && config.options.wmsMaxWidth )
        wmsMaxWidth = Number(config.options.wmsMaxWidth);
    if( ('wmsMaxHeight' in config.options) && config.options.wmsMaxHeight )
        wmsMaxHeight = Number(config.options.wmsMaxHeight);
    var removeSingleTile = false;
    var newMapSize = map.getCurrentSize();
    var replaceSingleTileSize = newMapSize.clone();
    if( newMapSize.w > wmsMaxWidth || newMapSize.h > wmsMaxHeight ){
        removeSingleTile = true;
        var wmsMaxMax = Math.max(wmsMaxWidth, wmsMaxHeight);
        var wmsMinMax = Math.min(wmsMaxWidth, wmsMaxHeight);
        var mapMax = Math.max(newMapSize.w, newMapSize.h);
        var mapMin = Math.min(newMapSize.w, newMapSize.h);
        if( mapMax/2 > mapMin )
          replaceSingleTileSize = new OpenLayers.Size(Math.round(mapMax/2), Math.round(mapMax/2));
        else if( wmsMaxMax/2 > mapMin )
          replaceSingleTileSize = new OpenLayers.Size(Math.round(wmsMaxMax/2), Math.round(wmsMaxMax/2));
        else
          replaceSingleTileSize = new OpenLayers.Size(Math.round(wmsMinMax/2), Math.round(wmsMinMax/2));
    }
    // Update singleTile layers
    for(var i=0, len=map.layers.length; i<len; ++i) {
        var layer = map.layers[i];
        if( !(layer instanceof OpenLayers.Layer.WMS) )
            continue;
        var qgisName = null;
        if ( layer.name in cleanNameMap )
            qgisName = getLayerNameByCleanName(layer.name);
        var configLayer = null;
        if ( qgisName )
            configLayer = config.layers[qgisName];
        if ( !configLayer )
            configLayer = config.layers[layer.params['LAYERS']];
        if ( !configLayer )
            configLayer = config.layers[layer.name];
        if ( !configLayer )
            continue;
        if( configLayer.singleTile != "True" )
            continue;
        if( removeSingleTile && layer.singleTile) {
          layer.addOptions({singleTile:false, tileSize: replaceSingleTileSize});
        } else if( !removeSingleTile && !layer.singleTile) {
          replaceSingleTileSize.h = parseInt(replaceSingleTileSize.h * layer.ratio, 10);
          replaceSingleTileSize.w = parseInt(replaceSingleTileSize.w * layer.ratio, 10);
          layer.addOptions({singleTile:true, tileSize: replaceSingleTileSize});
        }
    }

    var center = map.getCenter();
    map.updateSize();
    map.setCenter(center);
    map.baseLayer.redraw();

    var slider = $('#navbar .slider');
    if ( slider.is(':visible') && ($('#navbar').height()+150 > $('#map').height() || mCheckMobile()) )
      slider.hide();
    else if ( !slider.is(':visible') && $('#navbar').height()+200 < $('#map').height() && !mCheckMobile() )
      slider.show();

    updateSwitcherSize();

    updateMiniDockSize();
  }

  /**
   * PRIVATE function: updateSwitcherSize
   * update the switcher size
   */
  function updateSwitcherSize(){

    // Set the switcher content a max-height
    $('#switcher-layers-container').css( 'height', 'auto' );
    var mh = $('#dock').height() - ($('#dock-tabs').height()+1) - $('#switcher-layers-container h3').height() - ($('#switcher-layers-actions').height()+1);
    mh -= parseInt($('#switcher-layers-container .menu-content').css( 'padding-top' ));
    mh -= parseInt($('#switcher-layers-container .menu-content').css( 'padding-bottom' ));
    if ( $('#switcher-baselayer').is(':visible') )
        mh -= $('#switcher-baselayer').height();
    $('#switcher-layers-container .menu-content').css( 'max-height', mh ).css('overflow-x', 'hidden').css('overflow-y', 'auto');

    // calculate switcher height
    // based on map height
    h = $('#map').height();
    // depending on element in #menu div
    if ($('#close-menu').is(':visible'))
      h -= $('#close-menu').outerHeight(true);

    if ( $('#menu #toolbar').length != 0 ) {
      $('#toolbar').children().each(function(){
        var self = $(this);
        if ( self.is(':visible') ) {
          var children = self.children();
          h -= children.first().outerHeight(true);
          if ( children.length > 1 )
            h -= children.last().outerHeight(true);
        }
      });
    }
    if ($('#switcher-baselayer').is(':visible')) {
      h -= $('#switcher-baselayer').children().first().outerHeight(true);
      h -= $('#switcher-baselayer').children().last().outerHeight(true);
    }
    h -= $('#switcher-menu').children().first().outerHeight(true);

    var sw = $('#switcher');
    // depending on it's own css box parameters
    h -= (parseInt(sw.css('margin-top')) ? parseInt(sw.css('margin-top')) : 0 ) ;
    h -= (parseInt(sw.css('margin-bottom')) ? parseInt(sw.css('margin-bottom')) : 0 ) ;
    h -= (parseInt(sw.css('padding-top')) ? parseInt(sw.css('padding-top')) : 0 ) ;
    h -= (parseInt(sw.css('padding-bottom')) ? parseInt(sw.css('padding-bottom')) : 0 ) ;
    h -= (parseInt(sw.css('border-top-width')) ? parseInt(sw.css('border-top-width')) : 0 ) ;
    h -= (parseInt(sw.css('border-bottom-width')) ? parseInt(sw.css('border-bottom-width')) : 0 ) ;

    //depending on it's parent padding
    var swp = sw.parent();
    h -= (parseInt(swp.css('padding-top')) ? parseInt(swp.css('padding-top')) : 0 ) ;
    h -= (parseInt(swp.css('padding-bottom')) ? parseInt(swp.css('padding-bottom')) : 0 ) ;

    // If map if fullscreen, get #menu position : bottom or top
    h -= 2 * (parseInt($('#menu').css('bottom')) ? parseInt($('#menu').css('bottom')) : 0 ) ;

  }

  /**
   * PRIVATE function: updateMiniDockSize
   * update the minidock size
   */
  function updateMiniDockSize() {
      if ( $('#mini-dock .tab-pane:visible').length == 0 )
        return 0;
      // the mini-dock menu-content visible
      var mdmcv = $('#mini-dock .tab-pane:visible h3 ~ .menu-content:first');
      mdmcv.css( 'max-height', '100%' )
      var h = $('#mini-dock').height();
      h -= $('#mini-dock .tab-pane:visible h3').height();
      h -= (parseInt(mdmcv.css('margin-top')) ? parseInt(mdmcv.css('margin-top')) : 0 ) ;
      h -= (parseInt(mdmcv.css('margin-bottom')) ? parseInt(mdmcv.css('margin-bottom')) : 0 ) ;
      h -= (parseInt(mdmcv.css('padding-top')) ? parseInt(mdmcv.css('padding-top')) : 0 ) ;
      h -= (parseInt(mdmcv.css('padding-bottom')) ? parseInt(mdmcv.css('padding-bottom')) : 0 ) ;

      mdmcv.css( 'max-height', h ).css('overflow-x', 'hidden').css('overflow-y', 'auto');
  }

  /**
   * PRIVATE function: getDockRightPosition
   * Calculate the position on the right side of the dock
   */
  function getDockRightPosition() {
    var right = $('#mapmenu').width();
    if( $('#content').hasClass('embed') )
        right+= 11;
    else if( $('#dock').css('display') != 'none' && !lizMap.checkMobile() )
        right+= $('#dock').width() + 11;
    return right;
  }


  /**
   * PRIVATE function: getLayerLegendGraphicUrl
   * get the layer legend graphic
   *
   * Parameters:
   * name - {text} the layer name
   * withScale - {boolean} url with scale parameter
   *
   * Dependencies:
   * lizUrls.wms
   *
   * Returns:
   * {text} the url
   */
  function getLayerLegendGraphicUrl(name, withScale) {
    var layer = null
    $.each(layers,function(i,l) {
      if (layer == null && l.name == name)
        layer = l;
    });
    if (layer == null )
      return null;
    var qgisName = null;
    if ( name in cleanNameMap )
        qgisName = getLayerNameByCleanName(name);
    var layerConfig = null;
    if ( qgisName )
        layerConfig = config.layers[qgisName];
    if ( !layerConfig )
        layerConfig = config.layers[layer.params['LAYERS']];
    if ( !layerConfig )
        layerConfig = config.layers[layer.name];
    if ( !layerConfig )
        return null;
    if ( 'externalWmsToggle' in layerConfig && layerConfig.externalWmsToggle == 'True'
      && 'externalAccess' in layerConfig && layerConfig.externalAccess
      && 'layers' in layerConfig.externalAccess && 'url' in layerConfig.externalAccess) {
        var externalAccess = layerConfig.externalAccess;
        var legendParams = {SERVICE: "WMS",
                      VERSION: "1.3.0",
                      REQUEST: "GetLegendGraphic",
                      LAYER: externalAccess.layers,
                      STYLE: externalAccess.styles,
                      SLD_VERSION: "1.1.0",
                      EXCEPTIONS: "application/vnd.ogc.se_inimage",
                      FORMAT: "image/png",
                      TRANSPARENT: "TRUE",
                      WIDTH: 150,
                      DPI: 96};

        var legendParamsString = OpenLayers.Util.getParameterString(
             legendParams
            );
        return OpenLayers.Util.urlAppend(externalAccess.url, legendParamsString);
    }
    var legendParams = {SERVICE: "WMS",
                  VERSION: "1.3.0",
                  REQUEST: "GetLegendGraphic",
                  LAYER: layer.params['LAYERS'],
                  STYLE: layer.params['STYLES'],
                  EXCEPTIONS: "application/vnd.ogc.se_inimage",
                  FORMAT: "image/png",
                  TRANSPARENT: "TRUE",
                  WIDTH: 150,
                  LAYERFONTSIZE: 9,
                  ITEMFONTSIZE: 9,
                  SYMBOLSPACE: 1,
                  ICONLABELSPACE: 2,
                  DPI: 96};
    if (layerConfig.id==layerConfig.name)
      legendParams['LAYERFONTBOLD'] = "TRUE";
    else {
      legendParams['LAYERFONTSIZE'] = 0;
      legendParams['LAYERSPACE'] = 0;
      legendParams['LAYERFONTBOLD'] = "FALSE";
      legendParams['LAYERTITLE'] = "FALSE";
    }
    if (withScale)
      legendParams['SCALE'] = map.getScale();
    var legendParamsString = OpenLayers.Util.getParameterString(
         legendParams
        );
    var service = OpenLayers.Util.urlAppend(lizUrls.wms
        ,OpenLayers.Util.getParameterString(lizUrls.params)
    );
    return OpenLayers.Util.urlAppend(service, legendParamsString);
  }

  /**
   * PRIVATE function: getLayerScale
   * get the layer scales based on children layer
   *
   * Parameters:
   * nested - {Object} a capability layer
   * minScale - {Float} the nested min scale
   * maxScale - {Float} the nested max scale
   *
   * Dependencies:
   * config
   *
   * Returns:
   * {Object} the min and max scales
   */
  function getLayerScale(nested,minScale,maxScale) {
    for (var i = 0, len = nested.nestedLayers.length; i<len; i++) {
      var layer = nested.nestedLayers[i];
      var qgisLayerName = layer.name;
      if ( 'useLayerIDs' in config.options && config.options.useLayerIDs == 'True' )
        qgisLayerName = layerIdMap[layer.name];
      else if ( layer.name in shortNameMap )
        qgisLayerName = shortNameMap[layer.name];
      var layerConfig = config.layers[qgisLayerName];
      if (layer.nestedLayers.length != 0)
         return getLayerScale(layer,minScale,maxScale);
      if (layerConfig) {
        if (minScale == null)
          minScale=layerConfig.minScale;
        else if (layerConfig.minScale<minScale)
          minScale=layerConfig.minScale;
        if (maxScale == null)
          maxScale=layerConfig.maxScale;
        else if (layerConfig.maxScale>maxScale)
          maxScale=layerConfig.maxScale;
      }
    }
    if ( minScale < 1 )
      minScale = 1;
    return {minScale:minScale,maxScale:maxScale};
  }

  /**
   * PRIVATE function: getLayerOrder
   * get the layer order and calculate it if it's a QGIS group
   *
   * Parameters:
   * nested - {Object} a capability layer
   *
   * Dependencies:
   * config
   *
   * Returns:
   * {Integer} the layer's order
   */
  function getLayerOrder(nested) {
    // there is no layersOrder in the project
    if (!('layersOrder' in config))
      return -1;

    // the nested is a layer and not a group
    if (nested.nestedLayers.length == 0) {
      var qgisLayerName = nested.name;
      if ( 'useLayerIDs' in config.options && config.options.useLayerIDs == 'True' )
        qgisLayerName = layerIdMap[nested.name];
      else if ( nested.name in shortNameMap )
        qgisLayerName = shortNameMap[nested.name];
      if (qgisLayerName in config.layersOrder)
        return config.layersOrder[nested.name];
      else
        return -1;
    }

    // the nested is a group
    var order = -1;
    for (var i = 0, len = nested.nestedLayers.length; i<len; i++) {
      var layer = nested.nestedLayers[i];
      var qgisLayerName = layer.name;
      if ( 'useLayerIDs' in config.options && config.options.useLayerIDs == 'True' )
        qgisLayerName = layerIdMap[layer.name];
      else if ( layer.name in shortNameMap )
        qgisLayerName = shortNameMap[layer.name];
      var lOrder = -1;
      if (layer.nestedLayers.length != 0)
        lOrder = getLayerScale(layer);
      else if (qgisLayerName in config.layersOrder)
        lOrder = config.layersOrder[qgisLayerName];
      else
        lOrder = -1;
      if (lOrder != -1) {
        if (order == -1 || lOrder < order)
          order = lOrder;
      }
    }
    return order;
  }

  function beforeLayerTreeCreated() {
     if (
       (('osmMapnik' in config.options)
        && config.options.osmMapnik == 'True') ||
       (('osmStamenToner' in config.options)
        && config.options.osmStamenToner == 'True') ||
       (('osmCyclemap' in config.options)
        && config.options.osmCyclemap == 'True'
        && ('OCMKey' in config.options)) ||
       (('googleStreets' in config.options)
        && config.options.googleStreets == 'True') ||
       (('googleSatellite' in config.options)
        && config.options.googleSatellite == 'True') ||
       (('googleHybrid' in config.options)
        && config.options.googleHybrid == 'True') ||
       (('googleTerrain' in config.options)
        && config.options.googleTerrain == 'True') ||
       (('bingStreets' in config.options)
        && config.options.bingStreets == 'True'
        && ('bingKey' in config.options)) ||
       (('bingSatellite' in config.options)
        && config.options.bingSatellite == 'True'
        && ('bingKey' in config.options)) ||
       (('bingHybrid' in config.options)
        && config.options.bingHybrid == 'True'
        && ('bingKey' in config.options)) ||
       (('ignTerrain' in config.options)
        && config.options.ignTerrain == 'True'
        && ('ignKey' in config.options)) ||
       (('ignStreets' in config.options)
        && config.options.ignStreets == 'True'
        && ('ignKey' in config.options)) ||
       (('ignSatellite' in config.options)
        && config.options.ignSatellite == 'True'
        && ('ignKey' in config.options)) ||
       (('ignCadastral' in config.options)
        && config.options.ignCadastral == 'True'
        && ('ignKey' in config.options))
       ) {
         Proj4js.defs['EPSG:3857'] = Proj4js.defs['EPSG:900913'];
         var proj = config.options.projection;
         if ( !(proj.ref in Proj4js.defs) )
           Proj4js.defs[proj.ref]=proj.proj4;
         var projection = new OpenLayers.Projection(proj.ref);
         var projOSM = new OpenLayers.Projection('EPSG:3857');
         proj.ref = 'EPSG:3857';
         proj.proj4 = Proj4js.defs['EPSG:3857'];

         // Transform the bbox
         var bbox = config.options.bbox;
         var extent = new OpenLayers.Bounds(Number(bbox[0]),Number(bbox[1]),Number(bbox[2]),Number(bbox[3]));
         extent = extent.transform(projection,projOSM);
         bbox = extent.toArray();

         var scales = [];
         if ('mapScales' in config.options)
           scales = config.options.mapScales;
         if ( scales.length == 0 )
           scales = [config.options.maxScale,config.options.minScale];

         config.options.projection = proj;
         config.options.bbox = bbox;
         config.options.zoomLevelNumber = 16;

         // Transform the initial bbox
         if ( 'initialExtent' in config.options && config.options.initialExtent.length == 4 ) {
           var initBbox = config.options.initialExtent;
           var initialExtent = new OpenLayers.Bounds(Number(initBbox[0]),Number(initBbox[1]),Number(initBbox[2]),Number(initBbox[3]));
           initialExtent = initialExtent.transform(projection,projOSM);
           config.options.initialExtent = initialExtent.toArray();
         }

         // Specify zoom level number
         if (
             (('osmMapnik' in config.options) && config.options.osmMapnik == 'True') ||
             (('osmStamenToner' in config.options) && config.options.osmStamenToner == 'True') ||
             (('osmCyclemap' in config.options) && config.options.osmCyclemap == 'True' && ('OCMKey' in config.options)) ||
             (('bingStreets' in config.options) && config.options.bingStreets == 'True' && ('bingKey' in config.options)) ||
             (('bingSatellite' in config.options) && config.options.bingSatellite == 'True' && ('bingKey' in config.options)) ||
             (('bingHybrid' in config.options) && config.options.bingHybrid == 'True' && ('bingKey' in config.options)) ||
             (('ignTerrain' in config.options) && config.options.ignTerrain == 'True' && ('ignKey' in config.options)) ||
             (('ignStreets' in config.options) && config.options.ignStreets == 'True') && ('ignKey' in config.options)) {
           config.options.zoomLevelNumber = 19;
         }
         if ((('googleStreets' in config.options) && config.options.googleStreets == 'True') ||
             (('googleHybrid' in config.options) && config.options.googleHybrid == 'True') ||
             (('ignCadastral' in config.options) && config.options.ignCadastral == 'True' && ('ignKey' in config.options))) {
           config.options.zoomLevelNumber = 20;
         }
         if ( 'googleSatellite' in config.options && config.options.googleSatellite == 'True'){
           config.options.zoomLevelNumber = 21;
         }
         if ( 'ignSatellite' in config.options && config.options.ignSatellite == 'True' && 'ignKey' in config.options ) {
           config.options.zoomLevelNumber = 22;
         }
         config.options.maxScale = 591659030.3224756;
         config.options.minScale = 2257.0000851534865;
         var hasBaselayers = (('emptyBaselayer' in config.options) && config.options.emptyBaselayer == "True");
         if ( !hasBaselayers ) {
           for ( var l in config.layers ) {
             if ( config.layers[l]["baseLayer"] == "True" ) {
               hasBaselayers = true;
               break;
             }
           }
         }
         // for minRes evaluating to scale 100
         // zoomLevelNumber is equal to 24
         if ( hasBaselayers ) {
           config.options.zoomLevelNumber = 24;
         }

         var resolutions = [];
         if (scales.length != 0 ) {
           scales.sort(function(a, b) {
             return Number(b) - Number(a);
           });
           var maxScale = scales[0];
           var maxRes = OpenLayers.Util.getResolutionFromScale(maxScale, projOSM.proj.units);
           var minScale = scales[scales.length-1];
           var minRes = OpenLayers.Util.getResolutionFromScale(minScale, projOSM.proj.units);
           var res = 156543.03390625;
           var n = 1;
           while ( res > minRes && n < config.options.zoomLevelNumber) {
             if ( res < maxRes ) {
               //Add extra scale
               resolutions.push(res);
             }
             res = res/2;
             n++;
           }
           maxRes = resolutions[0];
           minRes = resolutions[resolutions.length-1];
           //Add extra scale
           var maxScale = OpenLayers.Util.getScaleFromResolution(maxRes, projOSM.proj.units);
           var minScale = OpenLayers.Util.getScaleFromResolution(minRes, projOSM.proj.units);
         }
         config.options['resolutions'] = resolutions;

         if (resolutions.length != 0 ) {
           config.options.zoomLevelNumber = resolutions.length;
           config.options.maxScale = maxScale;
           config.options.minScale = minScale;
         }
         return true;
      }
      return false;
  }

  /**
   * PRIVATE function: getLayerTree
   * get the layer tree
   * create OpenLayers WMS base or not layer {<OpenLayers.Layer.WMS>}
   * push these layers in layers or baselayers
   *
   * Parameters:
   * nested - {Object} a capability layer
   * pNode - {Object} the nested tree node
   *
   * Dependencies:
   * config
   * layers
   * baselayers
   */
  function getLayerTree(nested,pNode) {
    pNode.children = [];

    var service = OpenLayers.Util.urlAppend(lizUrls.wms
      ,OpenLayers.Util.getParameterString(lizUrls.params)
    );
    if (lizUrls.publicUrlList && lizUrls.publicUrlList.length > 1 ) {
        service = [];
        for (var j=0, jlen=lizUrls.publicUrlList.length; j<jlen; j++) {
          service.push(
            OpenLayers.Util.urlAppend(
              lizUrls.publicUrlList[j],
              OpenLayers.Util.getParameterString(lizUrls.params)
            )
          );
        }
    }

    var wmtsFormat = new OpenLayers.Format.WMTSCapabilities({});

    for (var i = 0, len = nested.nestedLayers.length; i<len; i++) {
      var serviceUrl = service
      var layer = nested.nestedLayers[i];
      var qgisLayerName = layer.name;
      if ( ('useLayerIDs' in config.options) && config.options.useLayerIDs == 'True' )
        qgisLayerName = layerIdMap[layer.name];
      else if ( layer.name in shortNameMap )
        qgisLayerName = shortNameMap[layer.name];
      var layerConfig = config.layers[qgisLayerName];
      var layerName = cleanName(qgisLayerName);
      layerCleanNames[layerName] = qgisLayerName;

      if ( qgisLayerName.toLowerCase() == 'hidden' )
        continue;
      if ( qgisLayerName == 'Overview' ) {
        config.options.hasOverview = true;
        continue;
      }
      if ( !layerConfig )
        continue;

      if ( layerConfig.groupAsLayer == 'True' )
        layerConfig.type = 'layer';

      var wmsStyles = $.map(layer.styles, function( s, i ){
          return s.name;
      });
      if ( wmsStyles.length != 0 ) {
          layerConfig.styles = wmsStyles;
      } else if ( 'qgisServerVersion' in config.options && config.options.qgisServerVersion.startsWith('3.') ) {
          layerConfig.styles = [''];
      } else {
          layerConfig.styles = ['default'];
      }
      // if the layer is not the Overview and had a config
      // creating the {<OpenLayers.Layer.WMS>} and the tree node
      var node = {name:layerName,config:layerConfig,parent:pNode};
      var styles = ('styles' in layerConfig) ? layerConfig.styles[0] : 'default' ;
      if( !( typeof lizLayerStyles === 'undefined' )
        && layerName in lizLayerStyles
        && lizLayerStyles[ layerName ]
      ){
        styles = lizLayerStyles[ layerName ];
      }
      var layerWmsParams = {
          layers:layer.name
          ,styles: styles
          ,version:'1.3.0'
          ,exceptions:'application/vnd.ogc.se_inimage'
          ,format:(layerConfig.imageFormat) ? layerConfig.imageFormat : 'image/png'
          ,dpi:96
      };
      if (layerWmsParams.format != 'image/jpeg')
          layerWmsParams['transparent'] = true;

      //Manage attribution
      if (typeof layer.attribution == "object") {
          // Update href if needed
          if ( 'href' in layer.attribution &&
               layer.attribution.href != '' &&
               layer.attribution.href.indexOf('://') == -1) {
            layer.attribution.href = 'http://'+layer.attribution.href;
          }
          // Update attribution
          if ( !('title' in layer.attribution) || layer.attribution.title == '' ) {
              layer.attribution.title = layer.attribution.href.split('://')[1];
          } else
          if ( !('href' in layer.attribution) || layer.attribution.href == '' ) {
              layer.attribution = layer.attribution.title;
          }
      }

      var wmtsLayer = null;
      if ( layerConfig.cached == 'True' && wmtsCapabilities ) {
          $.each(wmtsCapabilities.contents.layers, function(i, l) {
            if ( l.identifier != layer.name)
              return true;
            var wmtsOptions = {
                layer: layer.name,
                matrixSet: config.options.projection.ref,
                name: layerName,
                params: layerWmsParams,
                attribution:layer.attribution,
                isBaseLayer: (layerConfig.baseLayer == 'True'),
                alwaysInRange: false,
                url: serviceUrl
            };
            if ( $.inArray( config.options.projection.ref.toUpperCase(), ['EPSG:3857','EPSG:900913'] ) != -1
              && ('resolutions' in config.options)
              && config.options.resolutions.length != 0 ) {
                var resolutions = config.options.resolutions;
                var maxRes = resolutions[0];
                var numZoomLevels = resolutions.length;
                var zoomOffset = 0;
                var res = 156543.03390625;
                while ( res > maxRes ) {
                    zoomOffset += 1;
                    res = 156543.03390625 / Math.pow(2, zoomOffset);
                }
                wmtsOptions['zoomOffset'] = zoomOffset;
                wmtsOptions['maxResolution'] = maxRes;
                wmtsOptions['numZoomLevels'] = numZoomLevels;
                wmtsOptions['minZoomLevel'] = zoomOffset;
                wmtsOptions['resolutions'] = resolutions;
            }
            wmtsLayer = wmtsFormat.createLayer(wmtsCapabilities, wmtsOptions);
            wmtsLayer.yx = {};
            wmtsLayer.reverseAxisOrder = function() {
                var projCode = this.projection.getCode();
                return parseFloat('1.3.0') >= 1.3 &&
                    !!(this.yx[projCode] || (OpenLayers.Projection.defaults[projCode] &&
                    OpenLayers.Projection.defaults[projCode].yx));
            };
            return false;
          });
      }

      // Override WMS url if external WMS server
      if ('externalAccess' in layerConfig && layerConfig.externalAccess
       && 'layers' in layerConfig.externalAccess && 'url' in layerConfig.externalAccess ) {
          var extConfig = layerConfig.externalAccess;
          extConfig.layers = decodeURI(extConfig.layers);
          serviceUrl = extConfig.url;
          layerWmsParams = {
            layers: extConfig.layers
            ,styles:(extConfig.styles) ? extConfig.styles : ''
            ,crs:(extConfig.crs) ? extConfig.crs : 'EPSG:3857'
            ,format:(extConfig.format) ? extConfig.format : 'image/png'
            ,transparent:(extConfig.transparent) ? extConfig.transparent : 'true'
            ,exceptions:'application/vnd.ogc.se_inimage'
          }
      }

        // Add optionnal filter at start
        if( !( typeof lizLayerFilter === 'undefined' )
          && qgisLayerName in lizLayerFilter
          && lizLayerFilter[ qgisLayerName ]
        ){
          layerWmsParams['FILTER'] = qgisLayerName+':'+lizLayerFilter[ qgisLayerName ];
        }

      if (layerConfig.baseLayer == 'True' && wmtsLayer != null) {
          // creating the base layer
          baselayers.push( wmtsLayer );
      }
      else if (layerConfig.type == 'layer' && wmtsLayer != null) {
          wmtsLayer.options.minScale = layerConfig.maxScale;
          wmtsLayer.options.maxScale =(layerConfig.minScale != null && layerConfig.minScale < 1) ? 1 : layerConfig.minScale;
          if ( layer.nestedLayers.length != 0 ) {
              var scales = getLayerScale(layer,null,null);
              wmtsLayer.options.minScale = scales.maxScale;
              wmtsLayer.options.maxScale = scales.minScale;
          }
          wmtsLayer.isVisible = (layerConfig.toggled=='True');
          wmtsLayer.visibility = false;
          wmtsLayer.transitionEffect = null;
          wmtsLayer.removeBackBufferDelay = 250;
          wmtsLayer.order = getLayerOrder(layer);
          layers.push( wmtsLayer );
      }
      else if (layerConfig.baseLayer == 'True') {
        // creating the base layer
          baselayers.push(new OpenLayers.Layer.WMS(layerName,serviceUrl
              ,layerWmsParams
              ,{isBaseLayer:true
               ,gutter:(layerConfig.cached == 'True') ? 0 : 5
               ,buffer:0
               ,singleTile:(layerConfig.singleTile == 'True')
               ,ratio:1
               ,attribution:layer.attribution
              }));
      }
      else if (layerConfig.type == 'layer') {
          var wmsLayer = new OpenLayers.Layer.WMS(layerName,serviceUrl
              ,layerWmsParams
              ,{isBaseLayer:false
               ,minScale:layerConfig.maxScale
               ,maxScale:(layerConfig.minScale != null && layerConfig.minScale < 1) ? 1 : layerConfig.minScale
               ,isVisible:(layerConfig.toggled=='True')
               ,visibility:false
               ,gutter:(layerConfig.cached == 'True') ? 0 : 5
               ,buffer:0
               ,transitionEffect:(layerConfig.singleTile == 'True')?'resize':null
               ,removeBackBufferDelay:250
               ,singleTile:(layerConfig.singleTile == 'True' || (layerConfig.cached == 'True' && !wmtsCapabilities))
               ,ratio:1
               ,order:getLayerOrder(layer)
               ,attribution:layer.attribution
              });
          if ( layer.nestedLayers.length != 0 ) {
              var scales = getLayerScale(layer,null,null);
              wmsLayer.minScale = scales.maxScale;
              wmsLayer.options.minScale = scales.maxScale;
              wmsLayer.maxScale = scales.minScale;
              wmsLayer.options.maxScale = scales.minScale;
          }
          layers.push( wmsLayer );
      }
      // creating the layer tree because it's a group, has children and is not a base layer
      if (layerConfig.type == 'group' && layer.nestedLayers.length != 0 && layerConfig.baseLayer == 'False')
          getLayerTree(layer,node);
      if (layerConfig.baseLayer != 'True')
          pNode.children.push(node);

      // Add bbox from WMS data into lizmap configuration (used by switcher-layers-actions
      layerConfig.bbox = layer.bbox;

    }
  }

  /**
   * PRIVATE function: analyseNode
   * analyse Node Config
   * define if the node has to be a child of his parent node
   *
   * Parameters:
   * aNode - {Object} a node config
   *
   * Returns:
   * {Boolean} maintains the node in the tree
   */
  function analyseNode(aNode) {
    var nodeConfig = aNode.config;
    if (nodeConfig.type == 'layer' && nodeConfig.baseLayer != 'True')
      return true;
    else if (nodeConfig.type == 'layer')
      return false;

    if (!('children' in aNode))
      return false;
    var children = aNode.children;
    var result = false;
    var removeIdx = [];
    for (var i=0, len=children.length; i<len; i++) {
      var child = children[i];
      var analyse = analyseNode(child);
      if (!analyse)
        removeIdx.push(i);
      result = (result || analyse);
    }
    removeIdx.reverse();
    for (var i=0, len=removeIdx.length; i<len; i++) {
      children.splice(removeIdx[i],1);
    }
    return result;
  }

  /**
   * PRIVATE function: getSwitcherLine
   * get the html table line <tr> of a config node for the switcher
   *
   * Parameters:
   * aNode - {Object} a config node
   *
   * Returns:
   * {String} the <tr> html corresponding to the node
   */
  function getSwitcherLine(aNode, aParent) {
    var html = '';
    var nodeConfig = aNode.config;
    var parentConfig = null;

    if( aParent ){
      parentConfig = aParent.config;
    }

    if( 'geometryType' in nodeConfig &&
        ( nodeConfig.geometryType == "none" || nodeConfig.geometryType == "unknown" || nodeConfig.geometryType == "" )
    ){
      nodeConfig.displayInLegend = 'False';
    }

    html += '<tr id="'+nodeConfig.type+'-'+aNode.name+'"';
    html += ' class="liz-'+nodeConfig.type;
    if (aParent){
      html += ' child-of-group-'+aParent.name;
    }
    if (('children' in aNode) && aNode['children'].length!=0){
      html += ' expanded parent';
    }
    if (('displayInLegend' in nodeConfig && nodeConfig.displayInLegend == 'False') ||
        (parentConfig && 'displayInLegend' in parentConfig && parentConfig.displayInLegend == 'False')){
      html += ' liz-hidden';
    }
    if ( parentConfig && 'mutuallyExclusive' in parentConfig && parentConfig.mutuallyExclusive == 'True' ){
      html += ' mutually-exclusive';
    }

    html += '">';

    function truncateWithEllipsis(str,n){
      return (str.length > n) ? str.substr(0,n-1)+'&hellip;' : str;
    };

    html += '<td><button class="btn checkbox" name="'+nodeConfig.type+'" value="'+aNode.name+'" title="'+lizDict['tree.button.checkbox']+'"></button>';
    html += '<span class="label" title="'+truncateWithEllipsis($('<div>'+nodeConfig.abstract+'</div>').text(),50)+'">'+nodeConfig.title+'</span>';
    html += '</td>';

    html += '<td>';
    if (nodeConfig.type == 'layer'){
      html += '<span class="loading">&nbsp;</span>';
    }
    html += '</td>';

    var legendLink = '';
    if (nodeConfig.link){
      legendLink = nodeConfig.link;
    }
    if (legendLink != '' ){
      html += '<td><button class="btn link" name="link" title="'+lizDict['tree.button.link']+'" value="'+legendLink+'"/></td>';
    }
    else{
      html += '<td></td>';
    }

    var removeCache = '';
    if (nodeConfig.cached && nodeConfig.cached == 'True' && nodeConfig.type == 'layer' && ('removeCache' in config.options)){
      html += '<td><button class="btn removeCache" name="removeCache" title="'+lizDict['tree.button.removeCache']+'" value="'+aNode.name+'"/></td>';
    }
    else{
      html += '<td></td>';
    }

    html += '</tr>';

    if (nodeConfig.type == 'layer'
    && (!nodeConfig.noLegendImage || nodeConfig.noLegendImage != 'True')
    && ('displayInLegend' in nodeConfig && nodeConfig.displayInLegend == 'True')) {
      var url = getLayerLegendGraphicUrl(aNode.name, false);
      if ( url != null && url != '' ) {
        html += '<tr id="legend-'+aNode.name+'" class="child-of-layer-'+aNode.name+' legendGraphics">';
        html += '<td colspan="2"><div class="legendGraphics">';
        html += '<img data-src="'+url+'" src="'+lizUrls.basepath + 'css/images/download_layer.gif' + '"/>';
        html += '</div></td>';
        html += '</tr>';
      }
    }

    return html;
  }

  /**
   * PRIVATE function: getSwitcherNode
   * get the html of a config node for the switcher
   *
   * Parameters:
   * aNode - {Object} a config node
   *
   * Returns:
   * {String} the html corresponding to the node
   */
  function getSwitcherNode(aNode,aLevel) {
    var html = '';
    if (aLevel == 0) {
      html += '<div class="without-blocks no-group">';
      html += '<table class="tree">';
    }

    var children = aNode.children;
    for (var i=0, len=children.length; i<len; i++) {
      var child = children[i];
      if (aLevel == 0)
        html += getSwitcherLine(child);
      else
        html += getSwitcherLine(child,aNode);

      if (('children' in child) && child['children'].length!=0)
        html += getSwitcherNode(child, aLevel+1);
    }

    if (aLevel == 0) {
      html += '</table>';
      html += '</div>';
    }
    return html;
  }

  function initProjections(firstLayer) {
    // Insert or update projection liste
    if ( lizProj4 ) {
        for( var ref in lizProj4 ) {
            if ( !(ref in Proj4js.defs) ) {
              Proj4js.defs[ref]=lizProj4[ref];
          }
        }
    }

    // get and define projection
    var proj = config.options.projection;
    if ( !(proj.ref in Proj4js.defs) )
      Proj4js.defs[proj.ref]=proj.proj4;
    var projection = new OpenLayers.Projection(proj.ref);

    if ( !(proj.ref in OpenLayers.Projection.defaults) ) {
        OpenLayers.Projection.defaults[proj.ref] = projection;

        // test extent for inverted axis
        if ( proj.ref in firstLayer.bbox ) {
            var wmsBbox = firstLayer.bbox[proj.ref].bbox;
            var wmsBounds = OpenLayers.Bounds.fromArray( wmsBbox );
            var initBounds = OpenLayers.Bounds.fromArray( config.options.initialExtent );
            if ( !initBounds.intersectsBounds( wmsBounds ) )
                OpenLayers.Projection.defaults[proj.ref].yx = true;
        }
    }
  }

  /**
   * PRIVATE function: createMap
   * creating the map {<OpenLayers.Map>}
   */
  function createMap() {
    // get projection
    var proj = config.options.projection;
    var projection = new OpenLayers.Projection(proj.ref);

    // get and define the max extent
    var bbox = config.options.bbox;
    var extent = new OpenLayers.Bounds(Number(bbox[0]),Number(bbox[1]),Number(bbox[2]),Number(bbox[3]));

    var restrictedExtent = extent.scale(3);
    var initialExtent = extent.clone();
    if ( 'initialExtent' in config.options && config.options.initialExtent.length == 4 ) {
      var initBbox = config.options.initialExtent;
      initialExtent = new OpenLayers.Bounds(Number(initBbox[0]),Number(initBbox[1]),Number(initBbox[2]),Number(initBbox[3]));
    }

    // calculate the map height
    var mapHeight = $('body').parent()[0].clientHeight;
    if(!mapHeight)
        mapHeight = $('window').innerHeight();
    mapHeight = mapHeight - $('#header').height();
    mapHeight = mapHeight - $('#headermenu').height();
    $('#map').height(mapHeight);

    // Make sure interface divs size are updated before creating the map
    // This avoid the request of each singlettile layer 2 times on startup
    updateContentSize();

    var res = extent.getHeight()/$('#map').height();

    var scales = [];
    var resolutions = [];
    if ('resolutions' in config.options)
      resolutions = config.options.resolutions;
    else if ('mapScales' in config.options)
      scales = config.options.mapScales;
    scales.sort(function(a, b) {
      return Number(b) - Number(a);
    });
    // remove duplicate scales
    nScales = [];
    while (scales.length != 0){
      var scale = scales.pop(0);
      if ($.inArray( scale, nScales ) == -1 )
        nScales.push( scale );
    }
    scales = nScales;


    // creating the map
    OpenLayers.Util.IMAGE_RELOAD_ATTEMPTS = 3; // Avoid some issues with tiles not displayed
    OpenLayers.IMAGE_RELOAD_ATTEMPTS = 3;
    OpenLayers.Util.DEFAULT_PRECISION=20; // default is 14 : change needed to avoid rounding problem with cache

    map = new OpenLayers.Map('map'
      ,{
        controls:[
          new OpenLayers.Control.Navigation({mouseWheelOptions: {interval: 100}})
        ]
        ,tileManager: null // prevent bug with OL 2.13 : white tiles on panning back
        ,eventListeners:{
         zoomend: function(evt){
  // private treeTable
  var options = {
    childPrefix : "child-of-"
  };

  function childrenOf(node) {
    return $(node).siblings("tr." + options.childPrefix + node[0].id);
  };

  function descendantsOf(node) {
    var descendants = [];
    var children = [];
    if (node && node[0])
      children = childrenOf(node);
    for (var i=0, len=children.length; i<len; i++) {
      descendants.push(children[i]);
      descendants = descendants.concat(descendantsOf([children[i]]));
    }
    return descendants;
  };

  function parentOf(node) {
    if (node.length == 0 )
      return null;

    var classNames = node[0].className.split(' ');

    for(var key=0; key<classNames.length; key++) {
      if(classNames[key].match(options.childPrefix)) {
        return $(node).siblings("#" + classNames[key].substring(options.childPrefix.length));
      }
    }

    return null;
  };

  function ancestorsOf(node) {
    var ancestors = [];
    while(node = parentOf(node)) {
      ancestors[ancestors.length] = node[0];
    }
    return ancestors;
  };
           //layer visibility
           for (var i=0,len=layers.length; i<len; i++) {
             var layer = layers[i];
             var b = $('#switcher button[name="layer"][value="'+layer.name+'"]').first();

             if (layer.inRange && b.hasClass('disabled')) {
               var tr = b.parents('tr').first();
               tr.removeClass('disabled').find('button').removeClass('disabled');
               var ancestors = ancestorsOf(tr);
               $.each(ancestors,function(i,a) {
                 $(a).removeClass('disabled').find('button').removeClass('disabled');
               });
               if (tr.find('button[name="layer"]').hasClass('checked'))
                 layer.setVisibility(true);
             } else if (!layer.inRange && !b.hasClass('disabled')) {
               var tr = b.parents('tr').first();
               tr.addClass('disabled').find('button').addClass('disabled');
               if (tr.hasClass('liz-layer'))
                 tr.collapse();
               var ancestors = ancestorsOf(tr);
               $.each(ancestors,function(i,a) {
                    a = $(a);
                    var count = 0;
                    var checked = 0;
                    var aDesc = childrenOf(a);
                    $.each(aDesc,function(j,trd) {
                      $(trd).find('button.checkbox').each(function(i,b){
                        if ($(b).hasClass('disabled'))
                          checked++;
                        count++;
                      });
                    });
                 if (count == checked)
                   a.addClass('disabled').find('button').addClass('disabled');
                 else
                   a.removeClass('disabled').find('button').removeClass('disabled');
               });
             }
           }

           //pan button
           $('#navbar button.pan').click();
         }
        }

       ,maxExtent:extent
       ,restrictedExtent: restrictedExtent
       ,initialExtent:initialExtent
       ,maxScale: scales.length == 0 ? config.options.minScale : "auto"
       ,minScale: scales.length == 0 ? config.options.maxScale : "auto"
       ,numZoomLevels: scales.length == 0 ? config.options.zoomLevelNumber : scales.length
       ,scales: scales.length == 0 ? null : scales
       ,resolutions: resolutions.length == 0 ? null : resolutions
       ,projection:projection
       ,units:projection.proj.units
       ,allOverlays:(baselayers.length == 0)
    });
    map.addControl(new OpenLayers.Control.Attribution({div:document.getElementById('attribution')}));

    // add handler to update the map size
    $(window).resize(function() {
      updateContentSize();
    });
  }

  /**
   * Get features for locate by layer tool
   */
  function updateLocateFeatureList(aName, aJoinField, aJoinValue) {
    var locate = config.locateByLayer[aName];
    // clone features reference
    var features = {};
    for ( var fid in locate.features ) {
        features[fid] = locate.features[fid];
    }
    // filter by filter field name
    if ('filterFieldName' in locate) {
        var filterValue = $('#locate-layer-'+cleanName(aName)+'-'+locate.filterFieldName).val();
        if ( filterValue != '-1' ) {
          for (var fid in features) {
            var feat = features[fid];
            if (feat.properties[locate.filterFieldName] != filterValue)
              delete features[fid];
          }
        } else
          features = {}
    }
    // filter by vector joins
    if ( 'vectorjoins' in locate && locate.vectorjoins.length != 0 ) {
        var vectorjoins = locate.vectorjoins;
        for ( i=0, len =vectorjoins.length; i< len; i++) {
            vectorjoin = vectorjoins[i];
            var jName = vectorjoin.joinLayer;
            if ( jName in config.locateByLayer ) {
                var jLocate = config.locateByLayer[jName];
                var jVal = $('#locate-layer-'+cleanName(jName)).val();
                if ( jVal == '-1' ) continue;
                var jFeat = jLocate.features[jVal];
                for (var fid in features) {
                  var feat = features[fid];
                  if ( feat.properties[vectorjoin.targetFieldName] != jFeat.properties[vectorjoin.joinFieldName] )
                    delete features[fid];
                }
            }
        }
    }
    // create the option list
    var options = '<option value="-1"></option>';
    for (var fid in features) {
      var feat = features[fid];
      options += '<option value="'+feat.id+'">'+feat.properties[locate.fieldName]+'</option>';
    }
    // add option list
    $('#locate-layer-'+cleanName(aName)).html(options);
  }


  /**
   * Zoom to locate feature
   */
  function zoomToLocateFeature(aName) {
    // clean locate layer
    var layer = map.getLayersByName('locatelayer');
    if ( layer.length == 0 )
      return;
    layer = layer[0];
    layer.destroyFeatures();

    // get locate by layer val
    var locate = config.locateByLayer[aName];
    var layerName = cleanName(aName);
    var proj = new OpenLayers.Projection(locate.crs);
    var val = $('#locate-layer-'+layerName).val();
    if (val == '-1') {

      // Trigger event
      lizMap.events.triggerEvent('lizmaplocatefeaturecanceled',
        {
          'featureType': aName
        }
      );
    } else {
      // zoom to val
      var feat = locate.features[val];
      var format = new OpenLayers.Format.GeoJSON();
      feat = format.read(feat)[0];

      if( feat.geometry != null){
        feat.geometry.transform(proj, map.getProjection());
        // Show geometry if asked
        if (locate.displayGeom == 'True') {
            var getFeatureUrlData = getVectorLayerWfsUrl( aName, null, null, null );
            getFeatureUrlData['options']['PROPERTYNAME'] = ['geometry',locate.fieldName].join(',');
            getFeatureUrlData['options']['FEATUREID'] = val;
            // Get data
            $.post( getFeatureUrlData['url'], getFeatureUrlData['options'], function(data) {
              if ( !data.features )
                data = JSON.parse(data);
              if( data.features.length != 0) {
                feat = format.read(data.features[0])[0];
                feat.geometry.transform(proj, map.getProjection());
              }
              layer.addFeatures([feat]);
            }).fail(function(){
              layer.addFeatures([feat]);
            });
        }
        //zoom to extent
        map.zoomToExtent(feat.geometry.getBounds());

      }

      var fid = val.split('.')[1];

      // Trigger event
      lizMap.events.triggerEvent('lizmaplocatefeaturechanged',
        {
          'featureType': aName,
          'featureId': fid
        }
      );
    }
  }

  /**
   * Get features for locate by layer tool
   */
  function getLocateFeature(aName) {
    var locate = config.locateByLayer[aName];

    // get fields to retrieve
    var fields = ['geometry',locate.fieldName];
    // if a filter field is defined
    if ('filterFieldName' in locate)
      fields.push( locate.filterFieldName );
    // check for join fields
    if ( 'filterjoins' in locate ) {
      var filterjoins = locate.filterjoins;
      for ( var i=0, len=filterjoins.length; i<len; i++) {
          var filterjoin = filterjoins[i];
          fields.push( filterjoin.targetFieldName );
      }
    }
    if ( 'vectorjoins' in locate ) {
      var vectorjoins = locate.vectorjoins;
      for ( var i=0, len=vectorjoins.length; i<len; i++) {
          var vectorjoin = vectorjoins[i];
          fields.push( vectorjoin.targetFieldName );
      }
    }

    // Get WFS url and options
    var getFeatureUrlData = getVectorLayerWfsUrl( aName, null, null, 'extent' );
    getFeatureUrlData['options']['PROPERTYNAME'] = fields.join(',');

    var layerName = cleanName(aName);

    // Get data
    $.post( getFeatureUrlData['url'], getFeatureUrlData['options'], function(data) {
      var lConfig = config.layers[aName];
      locate['features'] = {};
      if ( !data.features )
        data = JSON.parse(data);
      var features = data.features;
      if( locate.crs != 'EPSG:4326' && features.length != 0) {
          // load projection to be sure to have the definition
          loadProjDefinition( locate.crs, function( aProj ) {
              // in QGIS server > 2.14 GeoJSON is in EPSG:4326
              if ( 'qgisServerVersion' in config.options && config.options.qgisServerVersion != '2.14' )
                locate.crs = 'EPSG:4326';
          });
      }

      if ('filterFieldName' in locate) {
        // create filter combobox for the layer
        features.sort(function(a, b) {
            var aProperty = a.properties[locate.filterFieldName];
            var bProperty = b.properties[locate.filterFieldName];
            if (isNaN(aProperty)) {
                if (isNaN(bProperty)) {  // a and b are strings
                    return aProperty.localeCompare(bProperty);
                } else {         // a string and b number
                    return 1;  // a > b
                }
            } else {
                if (isNaN(bProperty)) {  // a number and b string
                    return -1;  // a < b
                } else {         // a and b are numbers
                    return parseFloat(aProperty) - parseFloat(bProperty);
                }
            }
        });
        var filterPlaceHolder = '';
        if ( 'filterFieldAlias' in locate && locate.filterFieldAlias!='')
          filterPlaceHolder += locate.filterFieldAlias+' ';
        else
          filterPlaceHolder += locate.filterFieldName;
        filterPlaceHolder +=' ('+ lConfig.title + ')';
        var fOptions = '<option value="-1"></option>';
        var fValue = '-1';
        for (var i=0, len=features.length; i<len; i++) {
          var feat = features[i];
          if ( fValue != feat.properties[locate.filterFieldName] ) {
            fValue = feat.properties[locate.filterFieldName];
            fOptions += '<option value="'+fValue+'">'+fValue+'</option>';
          }
        }


        // add filter values list
        $('#locate-layer-'+layerName).parent().before('<div class="locate-layer"><select id="locate-layer-'+layerName+'-'+locate.filterFieldName+'">'+fOptions+'</select></div><br/>');
        // listen to filter select changes
        $('#locate-layer-'+layerName+'-'+locate.filterFieldName).change(function(){
          var filterValue = $(this).children(':selected').val();
          updateLocateFeatureList( aName );
          if (filterValue == '-1')
            $('#locate-layer-'+layerName+'-'+locate.filterFieldName+' ~ span > input').val('');
          $('#locate-layer-'+layerName+' ~ span > input').val('');
          $('#locate-layer-'+layerName).val('-1');
          zoomToLocateFeature(aName);
        });
        // add combobox to the filter select
        $('#locate-layer-'+layerName+'-'+locate.filterFieldName).combobox({
          position: { my : "right top", at: "right bottom" },
          "selected": function(evt, ui){
            if ( ui.item ) {
              var self = $(this);
              var uiItem = $(ui.item);
              window.setTimeout(function(){
                self.val(uiItem.val()).change();
              }, 1);
            }
          }
        });

        // add place holder to the filter combobox input
        $('#locate-layer-'+layerName+'-'+locate.filterFieldName+' ~ span > input').attr('placeholder', filterPlaceHolder).val('');
        $('#locate-layer-'+layerName+'-'+locate.filterFieldName+' ~ span > input').autocomplete('close');
        updateSwitcherSize();
        updateMiniDockSize();
      }

      // create combobox for the layer
      features.sort(function(a, b) {
            var aProperty = a.properties[locate.fieldName];
            var bProperty = b.properties[locate.fieldName];
            if (isNaN(aProperty)) {
                if (isNaN(bProperty)) {  // a and b are strings
                    return aProperty.localeCompare(bProperty);
                } else {         // a string and b number
                    return 1;  // a > b
                }
            } else {
                if (isNaN(bProperty)) {  // a number and b string
                    return -1;  // a < b
                } else {         // a and b are numbers
                    return parseFloat(aProperty) - parseFloat(bProperty);
                }
            }
      });
      var placeHolder = '';
      if ( 'fieldAlias' in locate && locate.fieldAlias!='' )
        placeHolder += locate.fieldAlias+' ';
      else
        placeHolder += locate.fieldName+' ';
      placeHolder += '('+lConfig.title+')';
      var options = '<option value="-1"></option>';
      for (var i=0, len=features.length; i<len; i++) {
        var feat = features[i];
        locate.features[feat.id.toString()] = feat;
        if ( !('filterFieldName' in locate) )
          options += '<option value="'+feat.id+'">'+feat.properties[locate.fieldName]+'</option>';
      }
      // listen to select changes
      $('#locate-layer-'+layerName).html(options).change(function() {
        var val = $(this).children(':selected').val();
        if (val == '-1') {
          $('#locate-layer-'+layerName+' ~ span > input').val('');
          // update to join layer
          if ( 'filterjoins' in locate && locate.filterjoins.length != 0 ) {
              var filterjoins = locate.filterjoins;
              for (var i=0, len=filterjoins.length; i<len; i++) {
                  var filterjoin = filterjoins[i];
                  var jName = filterjoin.joinLayer;
                  if ( jName in config.locateByLayer ) {
                      // update joined select options
                      var oldVal = $('#locate-layer-'+cleanName(jName)).val();
                      updateLocateFeatureList( jName );
                      $('#locate-layer-'+cleanName(jName)).val( oldVal );
                      return;
                  }
              }
          }
          // zoom to parent selection
          if ( 'vectorjoins' in locate && locate.vectorjoins.length == 1 ) {
              var jName = locate.vectorjoins[0].joinLayer;
              if ( jName in config.locateByLayer ) {
                zoomToLocateFeature( jName );
                return;
              }
          }
          // clear the map
          zoomToLocateFeature( aName );
        } else {
          // zoom to val
          zoomToLocateFeature( aName );
          // update joined layer
          if ( 'filterjoins' in locate && locate.filterjoins.length != 0 ) {
              var filterjoins = locate.filterjoins;
              for (var i=0, len=filterjoins.length; i<len; i++) {
                  var filterjoin = filterjoins[i];
                  var jName = filterjoin.joinLayer;
                  if ( jName in config.locateByLayer ) {
                      // update joined select options
                      updateLocateFeatureList( jName );
                      $('#locate-layer-'+cleanName(jName)).val('-1');
                      $('#locate-layer-'+cleanName(jName)+' ~ span > input').val('');
                  }
              }
          }
        }
        $(this).blur();
        return;
      });
      $('#locate-layer-'+layerName).combobox({
    "minLength": ('minLength' in locate) ? locate.minLength : 0,
        "position": { my : "right top", at: "right bottom" },
        "selected": function(evt, ui){
          if ( ui.item ) {
            var self = $(this);
            var uiItem = $(ui.item);
            window.setTimeout(function(){
              self.val(uiItem.val()).change();
            }, 1);
          }
        }
      });
      $('#locate-layer-'+layerName+' ~ span > input').attr('placeholder', placeHolder).val('');
      $('#locate-layer-'+layerName+' ~ span > input').autocomplete('close');
      if ( ('minLength' in locate) && locate.minLength > 0 )
        $('#locate-layer-'+layerName).parent().addClass('no-toggle');
      if(mCheckMobile()){
        // autocompletion items for locatebylayer feature
        $('div.locate-layer select').show();
        $('span.custom-combobox').hide();
      }
    },'json');
  }

  /**
   * create the layer switcher
   */
  function getSwitcherLi(aNode, aLevel) {
    var nodeConfig = aNode.config;
    var html = '<li id="'+nodeConfig.type+'-'+aNode.name+'">';

    // add checkbox to display children or legend image
    html += '<input type="checkbox" id="open'+nodeConfig.type+aNode.name+'" name="open'+nodeConfig.type+aNode.name+'" checked="checked"></input><label for="open'+nodeConfig.type+aNode.name+'">&nbsp;</label>';
    // add button to manage visibility
    html += '<button class="checkbox" name="'+nodeConfig.type+'-'+aNode.name+'-visibility" value="0" title="'+lizDict['tree.button.checkbox']+'"></button>';
    // add layer title
    html += '<span class="label" title="'+nodeConfig.abstract+'">'+nodeConfig.title+'</span>';

    if (('children' in aNode) && aNode['children'].length!=0) {
      html += getSwitcherUl(aNode, aLevel+1);
    } else if (nodeConfig.type == 'layer'
           && (!nodeConfig.noLegendImage || nodeConfig.noLegendImage != 'True')) {
      var url = getLayerLegendGraphicUrl(aNode.name, false);
      if ( url != null && url != '' ) {
          html += '<ul id="legend-layer-'+aNode.name+'">';
          html += '<li><div><img data-src="'+url+'" src="'+lizUrls.basepath + 'css/images/download_layer.gif' + '"/></div></li>';
          html += '</ul>';
      }
    }
    html += '</li>';
    return html;
  }

  function getSwitcherUl(aNode, aLevel) {
    var html = '<ul class="level'+aLevel+'">';
    var children = aNode.children;
    for (var i=0, len=children.length; i<len; i++) {
      var child = children[i];
      html += getSwitcherLi(child,aLevel);
    }
    html += '</ul>';
    return html;
  }

  function createSwitcherNew() {
    $('#switcher-layers').html(getSwitcherUl(tree,0));

    lizMap.events.on({
        dockopened: function(e) {
            // Set the tab-content max-height
            if ( $('#dock-tabs').is(':visible') )
                $('#dock-content').css( 'max-height', $('#dock').height() - $('#dock-tabs').height() );
            if ( e.id == 'switcher' ) {
                updateSwitcherSize();
            }
        }
    });

    var projection = map.projection;

    // get the baselayer select content
    // and adding baselayers to the map
    var select = [];
    baselayers.reverse();
    for (var i=0,len=baselayers.length; i<len; i++) {
      var baselayer = baselayers[i]
      baselayer.units = projection.proj.units;
      try{ // because google maps layer can be created but not added
          map.addLayer(baselayer);
          var qgisName = baselayer.name;
          if ( baselayer.name in cleanNameMap )
              qgisName = getLayerNameByCleanName(baselayer.name);
          var blConfig = config.layers[qgisName];
          if (blConfig)
            select += '<option value="'+blConfig.name+'">'+blConfig.title+'</option>';
          else
            select += '<option value="'+baselayer.name+'">'+baselayer.name+'</option>';

      } catch(e) {
          var qgisName = baselayer.name;
          if ( baselayer.name in cleanNameMap )
              qgisName = getLayerNameByCleanName(baselayer.name);
          console.log(qgisName+" can't be added to the map!");
      }
    }

    if (baselayers.length!=0) {
      // active the select element for baselayers
      $('#switcher-baselayer-select').append(select);
      $('#switcher-baselayer-select')
        .change(function() {
          var val = $(this).val();
          var blName = map.getLayersByName(val)[0];
          map.setBaseLayer( blName );

          // Trigger event
          lizMap.events.triggerEvent("lizmapbaselayerchanged",
            { 'layer': blName}
          );

          $(this).blur();
        });
      // Hide switcher-baselayer if only one base layer inside
      if (baselayers.length==1)
        $('#switcher-baselayer').hide();
    } else {
      // hide elements for baselayers
      $('#switcher-baselayer').hide();
      map.addLayer(new OpenLayers.Layer.Vector('baselayer',{
        maxExtent:map.maxExtent
       ,maxScale: map.maxScale
       ,minScale: map.minScale
       ,numZoomLevels: map.numZoomLevels
       ,scales: map.scales
       ,projection: map.projection
       ,units: map.projection.proj.units
      }));
    }

    // adding layers to the map
    layers.sort(function(a, b) {
      if (a.order == b.order)
        return 0;
      return a.order > b.order ? 1 : -1;
    });
    layers.reverse();
    for (var i=0,len=layers.length; i<len; i++) {
      var l = layers[i];
      l.units = projection.proj.units;

      // Add only layers with geometry
      var qgisName = null;
      if ( l.name in cleanNameMap )
          qgisName = getLayerNameByCleanName(l.name);
      var aConfig = null;
      if ( qgisName )
          aConfig = config.layers[qgisName];
      if ( !aConfig )
          aConfig = config.layers[l.params['LAYERS']];
      if ( !aConfig )
          aConfig = config.layers[l.name];
      if ( !aConfig )
          continue;
      if( 'geometryType' in aConfig &&
        ( aConfig.geometryType == "none" || aConfig.geometryType == "unknown" || aConfig.geometryType == "" )
      ){
        continue;
      }
      map.addLayer(l);
    }

    // Add Locate by layer
    if ('locateByLayer' in config) {
      var locateContent = [];
      for (var lname in config.locateByLayer) {
        var lConfig = config.layers[lname];
        var html = '<div class="locate-layer">';
        html += '<select id="locate-layer-'+cleanName(lname)+'" class="label">';
        html += '<option>'+lConfig.title+'...</option>';
        html += '</select>';
        html += '</div>';
        //constructing the select
        locateContent.push(html);
      }
      $('#locate .menu-content').html(locateContent.join('<br/>'));
      map.addLayer(new OpenLayers.Layer.Vector('locatelayer',{
        styleMap: new OpenLayers.StyleMap({
          pointRadius: 6,
          fill: false,
          stroke: true,
          strokeWidth: 3,
          strokeColor: 'yellow',
          strokeOpacity: 0.8
        })
      }));

        // Lizmap URL
        var service = OpenLayers.Util.urlAppend(lizUrls.wms
                ,OpenLayers.Util.getParameterString(lizUrls.params)
        );

        var featureTypes = getVectorLayerFeatureTypes();
        if (featureTypes.length == 0 ){
          config.locateByLayer = {};
          $('#button-locate').parent().remove();
          $('#locate-menu').remove();
          updateSwitcherSize();
        } else {
          featureTypes.each( function(){
            var self = $(this);
            var typeName = self.find('Name').text();
            var lname = lizMap.getNameByTypeName( typeName );
            if ( !lname ) {
                if (typeName in config.locateByLayer)
                    lname = typeName
                else if ( (typeName in shortNameMap) && (shortNameMap[typeName] in config.locateByLayer))
                    lname = shortNameMap[typeName];
                else {
                    for (lbl in config.locateByLayer) {
                        if (lbl.split(' ').join('_') == typeName) {
                            lname = lbl;
                            break;
                        }
                    }
                }
            }

            if ( !(lname in config.locateByLayer) )
                return;

            var locate = config.locateByLayer[lname];
            locate['crs'] = self.find('SRS').text();
            loadProjDefinition( locate.crs, function( aProj ) {
                  new OpenLayers.Projection(locate.crs);
            });
            var bbox = self.find('LatLongBoundingBox');
            locate['bbox'] = [
                parseFloat(bbox.attr('minx'))
               ,parseFloat(bbox.attr('miny'))
               ,parseFloat(bbox.attr('maxx'))
               ,parseFloat(bbox.attr('maxy'))
            ];
          } );

          // get joins
          for (var lName in config.locateByLayer) {
            var locate = config.locateByLayer[lName];
            if ('vectorjoins' in locate) {
              var vectorjoins = locate['vectorjoins'];
              locate['joinFieldName'] = vectorjoins['targetFieldName'];
              for (var jName in config.locateByLayer) {
                var jLocate = config.locateByLayer[jName];
                if (jLocate.layerId == vectorjoins.joinLayerId) {
                  locate['joinLayer'] = jName;
                  jLocate['joinFieldName'] = vectorjoins['joinFieldName'];
                  jLocate['joinLayer'] = lName;
                }
              }
            }
          }

          // get features
          for (var lname in config.locateByLayer) {
            getLocateFeature(lname);
          }
          $('.btn-locate-clear').click(function() {
            var layer = map.getLayersByName('locatelayer')[0];
            layer.destroyFeatures();
            $('#locate select').val('-1');
            $('div.locate-layer span > input').val('');

            if( lizMap.lizmapLayerFilterActive ){
                lizMap.events.triggerEvent('lizmaplocatefeaturecanceled',
                  {'featureType': lizMap.lizmapLayerFilterActive}
                );
            }

            return false;

          });
          $('#locate-close').click(function() {
            $('.btn-locate-clear').click(); // deactivate locate feature and filter
            $('#button-locate').click();
            return false;
          });
        }
    }

    $('#switcher span.label').tooltip({
      viewport: '#dock'
    });
  }

  function createSwitcher() {
    // set the switcher content
    $('#switcher-layers').html(getSwitcherNode(tree,0));
    $('#switcher table.tree').treeTable({
      stringExpand: lizDict['tree.button.expand'],
      stringCollapse: lizDict['tree.button.collapse'],
      onNodeShow: function() {
        var self = $(this);
        self.addClass('visible');
        if (self.find('div.legendGraphics').length != 0) {
          var name = self.attr('id').replace('legend-','');
          var url = getLayerLegendGraphicUrl(name, true);
          if ( url != null && url != '' ) {
              var limg = self.find('div.legendGraphics img');
              limg.attr('data-src', url );
              limg.attr('src', limg.attr('data-src') );
          }
        }
      },
      onNodeHide: function() {
        var self = $(this);
        self.removeClass('visible');
      }
    });
    $("#switcher table.tree tbody").on("mousedown", "tr td span", function(event) {
      // Only act on left button click
      if(event.which === 1){
        var wasSelected = $(this).parents('tr:first').hasClass('selected');
        var isSelected = !wasSelected;
        $("#switcher table.tree tbody tr").removeClass('selected');
        $(this).parents('tr:first').toggleClass("selected", isSelected);
        $('#switcher-layers-actions').toggleClass('active', isSelected);

        // Trigger event
        var id = $(this).parents('tr:first').attr('id');
        var itemType = id.split('-')[0];
        var itemName = id.split('-')[1];
        lizMap.events.triggerEvent("lizmapswitcheritemselected",
          { 'name': itemName, 'type': itemType, 'selected': isSelected}
        );
      }
    });

    lizMap.events.on({
        dockopened: function(e) {
            // Set the tab-content max-height
            if ( $('#dock-tabs').is(':visible') )
                $('#dock-content').css( 'max-height', $('#dock').height() - $('#dock-tabs').height() );
            if ( e.id == 'switcher' ) {
                updateSwitcherSize();
            }
        }
    });


  // === Private functions
  var options = {
    childPrefix : "child-of-"
  };

  function childrenOf(node) {
    return $(node).siblings("tr." + options.childPrefix + node[0].id);
  };

  function descendantsOf(node) {
    var descendants = [];
    var children = [];
    if (node && node[0])
      children = childrenOf(node);
    for (var i=0, len=children.length; i<len; i++) {
      descendants.push(children[i]);
      descendants = descendants.concat(descendantsOf([children[i]]));
    }
    return descendants;
  };

  function parentOf(node) {
    if (node.length == 0 )
      return null;

    var classNames = node[0].className.split(' ');

    for(var key=0; key<classNames.length; key++) {
      if(classNames[key].match(options.childPrefix)) {
        return $(node).siblings("#" + classNames[key].substring(options.childPrefix.length));
      }
    }

    return null;
  };

  function ancestorsOf(node) {
    var ancestors = [];
    while(node = parentOf(node)) {
      ancestors[ancestors.length] = node[0];
    }
    return ancestors;
  };

    // activate checkbox buttons
    $('#switcher button.checkbox')
    .click(function(){
      var self = $(this);
      if (self.hasClass('disabled'))
        return false;
      // get tr of the button
      var selfTr = self.parents('tr').first();
      // get the parent of the tr of the button
      var parentTr = parentOf( selfTr );
      // get the siblings of the tr of the button
      var siblingsTr = [];
      if ( parentTr && parentTr.length != 0) {
        for (var c=0, childrenParentTr=childrenOf(parentTr); c<childrenParentTr.length; c++){
            var siblingTr = $(childrenParentTr[c]);
            if( siblingTr.attr('id') != selfTr.attr('id') )
              siblingsTr.push( siblingTr );
        }
      }
      var ancestors = [];
      if( selfTr.hasClass('liz-layer') ) {
          // manage the button layer
          if( !self.hasClass('checked') ) {
              self.removeClass('partial').addClass('checked');
              selfTr.find('button.checkbox[name="layer"]').each(function(i,b){
                var name = $(b).val();
                var layer = map.getLayersByName(name)[0];
                if( typeof layer !== 'undefined' )
                  layer.setVisibility(true);
              });
          } else {
              self.removeClass('partial').removeClass('checked');
              selfTr.find('button.checkbox[name="layer"]').each(function(i,b){
                var name = $(b).val();
                var layer = map.getLayersByName(name)[0];
                if( typeof layer !== 'undefined' )
                  layer.setVisibility(false);
              });
          }
          if( selfTr.hasClass('mutually-exclusive') ){
              if( self.hasClass('checked') ) {
                  for(var s=0, slen=siblingsTr.length; s<slen; s++) {
                      var siblingTr = $(siblingsTr[s]);
                      var siblingButt = siblingTr.find('button.checkbox');
                      if( siblingButt.hasClass('checked') ){
                        siblingButt.removeClass('partial').removeClass('checked');
                        if( siblingButt.attr('name') == 'layer') {
                            var name = $(siblingButt).val();
                            var layer = map.getLayersByName(name)[0];
                            if( typeof layer !== 'undefined' )
                              layer.setVisibility(false);
                        }
                      }
                  }
                  if ( parentTr && parentTr.length != 0) {
                      var parentButt = parentTr.find('button.checkbox');
                      parentButt.removeClass('partial').addClass('checked');
                  }
              } else if ( parentTr && parentTr.length != 0) {
                  var parentButt = parentTr.find('button.checkbox');
                  parentButt.removeClass('partial').removeClass('checked');
              }
              ancestors = ancestorsOf(parentTr);
          } else {
            ancestors = ancestorsOf(selfTr);
          }
      } else {
          // manage the button group
          var descendants = descendantsOf(selfTr);
          var mutuallyExclusiveGroups = [];
          $.each(descendants,function(i,tr) {
            tr = $(tr);
            var butt = tr.find('button.checkbox');
            if( !self.hasClass('checked') ) {
                butt.removeClass('partial').addClass('checked');
                if( tr.hasClass('liz-layer') && butt.attr('name') == 'layer') {
                    if( tr.hasClass('mutually-exclusive') ){
                        var pTr = parentOf(tr);
                        var pId = pTr.attr('id');
                        if( mutuallyExclusiveGroups.indexOf(pId) != -1 ) {
                            butt.removeClass('partial').removeClass('checked');
                            return;
                        }
                        mutuallyExclusiveGroups.push(pId);
                    }
                    var name = $(butt).val();
                    var layer = map.getLayersByName(name)[0];
                    if( typeof layer !== 'undefined' )
                      layer.setVisibility(true);
                }
            } else {
                butt.removeClass('partial').removeClass('checked');
                if( tr.hasClass('liz-layer') && butt.attr('name') == 'layer') {
                    var name = $(butt).val();
                    var layer = map.getLayersByName(name)[0];
                    if( typeof layer !== 'undefined' )
                      layer.setVisibility(false);
                }
            }
          });
          if( !self.hasClass('checked') )
              self.removeClass('partial').addClass('checked');
          else
              self.removeClass('partial').removeClass('checked');
          ancestors = ancestorsOf(selfTr);
      }
      // manage ancestors
      $.each(ancestors,function(i,tr) {
        tr = $(tr);
        var count = 0;
        var checked = 0;
        var pchecked = 0;
        var trDesc = childrenOf(tr);
        $.each(trDesc,function(j,trd) {
          $(trd).find('button.checkbox').each(function(i,b){
            b = $(b);
            if ( b.hasClass('checked') )
              checked++;
            else if ( b.hasClass('partial')&& b.hasClass('checked') )
              pchecked++;
            count++;
          });
        });
        var trButt = tr.find('button.checkbox');
        if (count==checked)
          trButt.removeClass('partial').addClass('checked');
        else if (checked==0 && pchecked==0)
          trButt.removeClass('partial').removeClass('checked');
        else
          trButt.addClass('partial').addClass('checked');
      });
    });

    // activate link buttons
    $('#switcher button.link')
    .click(function(){
      var self = $(this);
      if (self.hasClass('disabled'))
        return false;
      var windowLink = self.val();
      // Test if the link is internal
      var mediaRegex = /^(\/)?media\//;
      if(mediaRegex.test(windowLink)){
        var mediaLink = OpenLayers.Util.urlAppend(lizUrls.media
          ,OpenLayers.Util.getParameterString(lizUrls.params)
        )
        windowLink = mediaLink+'&path=/'+windowLink;
      }
      // Open link in a new window
      window.open(windowLink);
    });

    // Activate removeCache button
    $('#switcher button.removeCache')
    .click(function(){
      var self = $(this);
      if (self.hasClass('disabled'))
        return false;
      var removeCacheServerUrl = OpenLayers.Util.urlAppend(
         lizUrls.removeCache
        ,OpenLayers.Util.getParameterString(lizUrls.params)
      );
      var windowLink = removeCacheServerUrl + '&layer=' + self.val();
      // Open link in a new window
      if (confirm(lizDict['tree.button.removeCache'] + ' ?'))
        window.open(windowLink);
    });

    var projection = map.projection;

    //manage WMS max width and height
    var wmsMaxWidth = 3000;
    var wmsMaxHeight = 3000;
    if( ('wmsMaxWidth' in config.options) && config.options.wmsMaxWidth )
        wmsMaxWidth = Number(config.options.wmsMaxWidth);
    if( ('wmsMaxHeight' in config.options) && config.options.wmsMaxHeight )
        wmsMaxHeight = Number(config.options.wmsMaxHeight);
    var removeSingleTile = false;
    var mapSize = map.size;
    var replaceSingleTileSize = new OpenLayers.Size(wmsMaxWidth, wmsMaxHeight);
    if( mapSize.w > wmsMaxWidth || mapSize.h > wmsMaxHeight ){
        removeSingleTile = true;
        var wmsMaxMax = Math.max(wmsMaxWidth, wmsMaxHeight);
        var wmsMinMax = Math.min(wmsMaxWidth, wmsMaxHeight);
        var mapMax = Math.max(mapSize.w, mapSize.h);
        var mapMin = Math.min(mapSize.w, mapSize.h);
        if( mapMax/2 > mapMin )
          replaceSingleTileSize = new OpenLayers.Size(Math.round(mapMax/2), Math.round(mapMax/2));
        else if( wmsMaxMax/2 > mapMin )
          replaceSingleTileSize = new OpenLayers.Size(Math.round(wmsMaxMax/2), Math.round(wmsMaxMax/2));
        else
          replaceSingleTileSize = new OpenLayers.Size(Math.round(wmsMinMax/2), Math.round(wmsMinMax/2));
    }

    // get the baselayer select content
    // and adding baselayers to the map
    var select = [];
    baselayers.reverse();
    for (var i=0,len=baselayers.length; i<len; i++) {
      var baselayer = baselayers[i]
      baselayer.units = projection.proj.units;
      // Update singleTile layers
      if( removeSingleTile && (baselayer instanceof OpenLayers.Layer.WMS) && baselayer.singleTile ) {
          baselayer.addOptions({singleTile:false, tileSize: replaceSingleTileSize});
      }
      try{ // because google maps layer can be created but not added
          map.addLayer(baselayer);
          var qgisName = baselayer.name;
          if ( baselayer.name in cleanNameMap )
              qgisName = getLayerNameByCleanName(baselayer.name);
          var blConfig = config.layers[qgisName];
          if (blConfig)
            select += '<option value="'+baselayer.name+'">'+blConfig.title+'</option>';
          else
            select += '<option value="'+baselayer.name+'">'+baselayer.name+'</option>';

      } catch(e) {
          var qgisName = baselayer.name;
          if ( baselayer.name in cleanNameMap )
              qgisName = getLayerNameByCleanName(baselayer.name);
          console.log(qgisName+" can't be added to the map!");
      }
    }

    if (baselayers.length!=0) {
      // active the select element for baselayers
      $('#switcher-baselayer-select').append(select);
      $('#switcher-baselayer-select')
        .change(function() {
          var val = $(this).val();
          var blName = map.getLayersByName(val)[0];
          map.setBaseLayer( blName );

          // Trigger event
          lizMap.events.triggerEvent("lizmapbaselayerchanged",
            { 'layer': blName}
          );

          $(this).blur();
        });
      // Hide switcher-baselayer if only one base layer inside
      if (baselayers.length==1){
        $('#switcher-baselayer').hide();
      }
      else if ( 'startupBaselayer' in config.options ) {
          var startupBaselayer = config.options['startupBaselayer'];
          if ( startupBaselayer in startupBaselayersReplacement )
            startupBaselayer = startupBaselayersReplacement[startupBaselayer];
          else if ( startupBaselayer in config.layers )
            startupBaselayer = cleanName(startupBaselayer);

          if ( $('#switcher-baselayer-select option[value="'+startupBaselayer+'"]').length != 0)
            $('#switcher-baselayer-select').val(startupBaselayer).change();
      }
    } else {
      // hide elements for baselayers
      $('#switcher-baselayer').hide();
      map.addLayer(new OpenLayers.Layer.Vector('baselayer',{
        maxExtent:map.maxExtent
       ,maxScale: map.maxScale
       ,minScale: map.minScale
       ,numZoomLevels: map.numZoomLevels
       ,scales: map.scales
       ,projection: map.projection
       ,units: map.projection.proj.units
      }));
    }

    // adding layers to the map
    layers.sort(function(a, b) {
      if (a.order == b.order)
        return 0;
      return a.order > b.order ? 1 : -1;
    });
    layers.reverse();
    for (var i=0,len=layers.length; i<len; i++) {
      var l = layers[i];
      l.units = projection.proj.units;
      l.events.on({
        loadstart: function(evt) {
          $('#layer-'+evt.object.name+' span.loading').addClass('loadstart');
        },
        loadend: function(evt) {
          $('#layer-'+evt.object.name+' span.loading').removeClass('loadstart');
        }
      });
      // Add only layers with geometry
      var qgisName = null;
      if ( l.name in cleanNameMap )
          qgisName = getLayerNameByCleanName(l.name);
      var aConfig = null;
      if ( qgisName )
          aConfig = config.layers[qgisName];
      if ( !aConfig )
          aConfig = config.layers[l.params['LAYERS']];
      if ( !aConfig )
          aConfig = config.layers[l.name];
      if ( !aConfig )
          continue;
      if( 'geometryType' in aConfig &&
        ( aConfig.geometryType == "none" || aConfig.geometryType == "unknown" || aConfig.geometryType == "" )
      ){
        continue;
      }
      // Update singleTile layers
      if( removeSingleTile && (l instanceof OpenLayers.Layer.WMS) && l.singleTile ) {
          l.addOptions({singleTile:false, tileSize: replaceSingleTileSize});
      }
      map.addLayer(l);

    }

    // Add Locate by layer
    if ('locateByLayer' in config) {
      var locateByLayerList = [];
      for (var lname in config.locateByLayer) {
        if ( 'order' in config.locateByLayer[lname] )
          locateByLayerList[ config.locateByLayer[lname].order ] = lname;
        else
          locateByLayerList.push( lname );
      }
      var locateContent = [];
      for (var l in locateByLayerList) {
        var lname = locateByLayerList[l];
        var lConfig = config.layers[lname];
        var html = '<div class="locate-layer">';
        html += '<select id="locate-layer-'+cleanName(lname)+'" class="label">';
        html += '<option>'+lConfig.title+'...</option>';
        html += '</select>';
        html += '</div>';
        //constructing the select
        locateContent.push(html);
      }
      $('#locate .menu-content').html(locateContent.join('<hr/>'));
      map.addLayer(new OpenLayers.Layer.Vector('locatelayer',{
        styleMap: new OpenLayers.StyleMap({
          pointRadius: 6,
          fill: false,
          stroke: true,
          strokeWidth: 3,
          strokeColor: 'yellow',
          strokeOpacity: 0.8
        })
      }));

        // Lizmap URL
        var service = OpenLayers.Util.urlAppend(lizUrls.wms
                ,OpenLayers.Util.getParameterString(lizUrls.params)
        );

        var featureTypes = getVectorLayerFeatureTypes();
        if (featureTypes.length == 0 ){
          config.locateByLayer = {};
          $('#button-locate').parent().remove();
          $('#locate-menu').remove();
          updateSwitcherSize();
        } else {
          featureTypes.each( function(){
            var self = $(this);
            var typeName = self.find('Name').text();
            var lname = lizMap.getNameByTypeName( typeName );
            if ( !lname ) {
                if (typeName in config.locateByLayer)
                    lname = typeName
                else if ( (typeName in shortNameMap) && (shortNameMap[typeName] in config.locateByLayer))
                    lname = shortNameMap[typeName];
                else {
                    for (lbl in config.locateByLayer) {
                        if (lbl.split(' ').join('_') == typeName) {
                            lname = lbl;
                            break;
                        }
                    }
                }
            }

            if ( !(lname in config.locateByLayer) )
                return;

            var locate = config.locateByLayer[lname];
            locate['crs'] = self.find('SRS').text();
            loadProjDefinition( locate.crs, function( aProj ) {
                new OpenLayers.Projection(locate.crs);
            });
            var bbox = self.find('LatLongBoundingBox');
            locate['bbox'] = [
                parseFloat(bbox.attr('minx'))
               ,parseFloat(bbox.attr('miny'))
               ,parseFloat(bbox.attr('maxx'))
               ,parseFloat(bbox.attr('maxy'))
            ];
          } );

          // get joins
          for (var lName in config.locateByLayer) {
            var locate = config.locateByLayer[lName];
            if ('vectorjoins' in locate && locate['vectorjoins'].length != 0) {
              var vectorjoin = locate['vectorjoins'][0];
              locate['joinFieldName'] = vectorjoin['targetFieldName'];
              for (var jName in config.locateByLayer) {
                var jLocate = config.locateByLayer[jName];
                if (jLocate.layerId == vectorjoin.joinLayerId) {
                  vectorjoin['joinLayer'] = jName;
                  locate['joinLayer'] = jName;
                  jLocate['joinFieldName'] = vectorjoin['joinFieldName'];
                  jLocate['joinLayer'] = lName;
                  jLocate['filterjoins'] = [{
                      'targetFieldName': vectorjoin['joinFieldName'],
                      'joinFieldName': vectorjoin['targetFieldName'],
                      'joinLayerId': locate.layerId,
                      'joinLayer': lName
                  }];
                }
              }
            }
          }

          // get locate by layers features
          for (var lname in config.locateByLayer) {
            getLocateFeature(lname);
          }
          $('.btn-locate-clear').click(function() {
            console.log("test locate clear");
            var layer = map.getLayersByName('locatelayer')[0];
            layer.destroyFeatures();
            $('#locate select').val('-1');
            $('div.locate-layer span > input').val('');

            if( lizMap.lizmapLayerFilterActive ){
                lizMap.events.triggerEvent('lizmaplocatefeaturecanceled',
                  {'featureType': lizMap.lizmapLayerFilterActive}
                );
            }
            return false;

          });
          $('#locate-close').click(function() {
            $('.btn-locate-clear').click(); // deactivate locate and filter
            $('#button-locate').click();
            return false;
          });
        }
    }

    $('#switcher span.label').tooltip({
      viewport: '#dock'
    });

  }

  /**
   * PRIVATE function: createOverview
   * create the overview
   */
  function createOverview() {
    var service = OpenLayers.Util.urlAppend(lizUrls.wms
        ,OpenLayers.Util.getParameterString(lizUrls.params)
    );
    var ovLayer = new OpenLayers.Layer.WMS('overview'
        ,service
        ,{
          layers:'Overview'
         ,version:'1.3.0'
         ,exceptions:'application/vnd.ogc.se_inimage'
         ,format:'image/png'
         ,transparent:true
         ,dpi:96
        },{
          isBaseLayer:true
         ,gutter:5
         ,buffer:0
         ,singleTile:true
        });

    if (config.options.hasOverview) {
      // get and define the max extent
      var bbox = config.options.bbox;
      var extent = new OpenLayers.Bounds(Number(bbox[0]),Number(bbox[1]),Number(bbox[2]),Number(bbox[3]));
      var res = extent.getHeight()/90;
      var resW = extent.getWidth()/180;
      if (res <= resW)
        res = resW;

      map.addControl(new OpenLayers.Control.OverviewMap(
        {div: document.getElementById("overview-map"),
         size : new OpenLayers.Size(220, 110),
         mapOptions:{maxExtent:map.maxExtent
                  ,maxResolution:"auto"
                  ,minResolution:"auto"
                  ,scales: [OpenLayers.Util.getScaleFromResolution(res, map.projection.proj.units)]
                  ,projection:map.projection
                  ,units:map.projection.proj.units
                  ,layers:[ovLayer]
                  ,singleTile:true
                  ,ratio:1
                  }
        }
      ));
    } else {
      $('#overview-map').hide();
      $('#overview-toggle').hide().removeClass('active');
    }

    $('#overview-toggle')
    .click(function(){
      var self = $(this);
      if ( self.hasClass('active') )
        self.removeClass('active');
      else
        self.addClass('active');

      $('#overview-map').toggle();
      return false;
    });

    map.addControl(new OpenLayers.Control.Scale(document.getElementById('scaletext')));
    map.addControl(new OpenLayers.Control.ScaleLine({div:document.getElementById('scaleline')}));

    var mpUnitSelect = $('#mouseposition-bar > select');
    var mapUnits = map.projection.getUnits();
    if ( mapUnits == 'degrees' ) {
      mpUnitSelect.find('option[value="m"]').remove();
      mpUnitSelect.find('option[value="f"]').remove();
    } else if ( mapUnits == 'm' ) {
      mpUnitSelect.find('option[value="f"]').remove();
    } else {
      mpUnitSelect.find('option[value="m"]').remove();
    }
    var mousePosition = new OpenLayers.Control.lizmapMousePosition({
        displayUnit:mpUnitSelect.val(),
        numDigits: 0,
        prefix: '',
        emptyString:$('#mouseposition').attr('title'),
        div:document.getElementById('mouseposition')
        });
    map.addControl( mousePosition );
    mpUnitSelect.change(function() {
        var mpSelectVal = $(this).val();
        if (mpSelectVal == 'm')
          mousePosition.numDigits = 0;
        else
          mousePosition.numDigits = 5;
        mousePosition.displayUnit = mpSelectVal;
    });

    if (config.options.hasOverview)
      if(!mCheckMobile()) {
        $('#overview-map').show();
        $('#overview-toggle').show().addClass('active');
      }
  }

  /**
   * PRIVATE function: createNavbar
   * create the navigation bar (zoom, scales, etc)
   */
  function createNavbar() {
    $('#navbar div.slider').height(Math.max(50,map.numZoomLevels*5)).slider({
      orientation:'vertical',
      min: 0,
      max: map.numZoomLevels-1,
      change: function(evt,ui) {
        if (ui.value > map.baseLayer.numZoomLevels-1) {
          $('#navbar div.slider').slider('value',map.getZoom())
          $('#zoom-in-max-msg').show('slow', function() {
            window.setTimeout(function(){$('#zoom-in-max-msg').hide('slow')},1000)
          });
        } else if ( ui.value != map.zoom )
          map.zoomTo(ui.value);
      }
    });
    $('#navbar button.pan').click(function(){
      var self = $(this);
      if (self.hasClass('active'))
        return false;
      $('#navbar button.zoom').removeClass('active');
      self.addClass('active');
      var navCtrl = map.getControlsByClass('OpenLayers.Control.Navigation')[0];
      navCtrl.zoomBox.keyMask = navCtrl.zoomBoxKeyMask;
      navCtrl.zoomBox.handler.keyMask = navCtrl.zoomBoxKeyMask;
      navCtrl.zoomBox.handler.dragHandler.keyMask = navCtrl.zoomBoxKeyMask;
      navCtrl.handlers.wheel.activate();
      if ( ( !('edition' in controls) || !controls.edition.active )
           && ('featureInfo' in controls) && controls.featureInfo !== null )
          controls.featureInfo.activate();
    });
    $('#navbar button.zoom').click(function(){
      var self = $(this);
      if (self.hasClass('active'))
        return false;
      $('#navbar button.pan').removeClass('active');
      self.addClass('active');
      if ( ('featureInfo' in controls) && controls.featureInfo !== null )
            controls.featureInfo.deactivate();
      var navCtrl = map.getControlsByClass('OpenLayers.Control.Navigation')[0];
      navCtrl.handlers.wheel.deactivate();
      navCtrl.zoomBox.keyMask = null;
      navCtrl.zoomBox.handler.keyMask = null;
      navCtrl.zoomBox.handler.dragHandler.keyMask = null;
    });
    $('#navbar button.zoom-extent')
    .click(function(){
      var url_params = getUrlParameters();
      if( 'layers' in url_params ){
        runPermalink( url_params );
      }
      else{
        map.zoomToExtent(map.initialExtent);
      }
    });
    $('#navbar button.zoom-in')
    .click(function(){
      if (map.getZoom() == map.baseLayer.numZoomLevels-1)
          $('#zoom-in-max-msg').show('slow', function() {
            window.setTimeout(function(){$('#zoom-in-max-msg').hide('slow')},1000)
          });
      else
        map.zoomIn();
    });
    $('#navbar button.zoom-out')
    .click(function(){
      map.zoomOut();
    });
    if ( ('zoomHistory' in config.options)
        && config.options['zoomHistory'] == "True") {
      var hCtrl =  new OpenLayers.Control.NavigationHistory();
      map.addControls([hCtrl]);
      $('#navbar button.previous').click(function(){
        var ctrl = map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0];
        if (ctrl && ctrl.previousStack.length != 0)
          ctrl.previousTrigger();
        if (ctrl && ctrl.previous.active)
          $(this).removeClass('disabled');
        else
          $(this).addClass('disabled');
        if (ctrl && ctrl.next.active)
          $('#navbar button.next').removeClass('disabled');
        else
          $('#navbar button.next').addClass('disabled');
      });
      $('#navbar button.next').click(function(){
        var ctrl = map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0];
        if (ctrl && ctrl.nextStack.length != 0)
          ctrl.nextTrigger();
        if (ctrl && ctrl.next.active)
          $(this).removeClass('disabled');
        else
          $(this).addClass('disabled');
        if (ctrl && ctrl.previous.active)
          $('#navbar button.previous').removeClass('disabled');
        else
          $('#navbar button.previous').addClass('disabled');
      });
      map.events.on({
        moveend : function() {
          var ctrl = map.getControlsByClass('OpenLayers.Control.NavigationHistory')[0];
          if (ctrl && ctrl.previousStack.length != 0)
            $('#navbar button.previous').removeClass('disabled');
          else
            $('#navbar button.previous').addClass('disabled');
          if (ctrl && ctrl.nextStack.length != 0)
            $('#navbar button.next').removeClass('disabled');
          else
            $('#navbar button.next').addClass('disabled');
        }
      });
    } else {
      $('#navbar > .history').remove();
    }
  }

  /**
   * PRIVATE function: createToolbar
   * create the tool bar (collapse overview and switcher, etc)
   */
  function createToolbar() {
    var configOptions = config.options;

    var info = addFeatureInfo();
    controls['featureInfo'] = info;

    if ( ('print' in configOptions)
        && configOptions['print'] == 'True')
      addPrintControl();
    else
      $('#button-print').parent().remove();

    if ( config['tooltipLayers'] && config.tooltipLayers.length != 0)
        addTooltipControl();
    else
      $('#button-tooltip-layer').parent().remove();

    if ( ('geolocation' in configOptions)
        && configOptions['geolocation'] == 'True')
      addGeolocationControl();
    else
      $('#button-geolocation').parent().remove();

    if ( ('measure' in configOptions)
        && configOptions['measure'] == 'True')
      addMeasureControls();
    else {
      $('#measure').parent().remove();
      $('#measure-length-menu').remove();
      $('#measure-area-menu').remove();
      $('#measure-perimeter-menu').remove();
    }
  }

  /**
   * PRIVATE function: deactivateToolControls
   * Deactivate Openlayers controls
   */
  function deactivateToolControls( evt ) {
    for (var id in controls) {
      var ctrl = controls[id];
      if(ctrl){
        if (evt && ('object' in evt) && ctrl == evt.object){
          continue;
        }
        if (ctrl.type == OpenLayers.Control.TYPE_TOOL){
          ctrl.deactivate();
        }
      }
    }
    return true;
  }


  /**
   * PRIVATE function: createPermalink
   * create the permalink tool
   */
  function createPermalink() {
      if ( $('#permalink').length == 0 )
        return;

    var configOptions = config.options;

    var pLink = new OpenLayers.Control.Permalink(
      'permalink',
      null,
      {
        "createParams": createPermalinkArgs
      }
    );
    map.addControl( pLink );

    var eLink = new OpenLayers.Control.Permalink(
      'permalink-embed',
      $('#permalink-embed').attr('href'),
      {
        "createParams": createPermalinkArgs
      }
    );
    map.addControl( eLink );
    map.events.on({
        "changebaselayer": function() {
            $('#switcher-baselayer-select').val( map.baseLayer.name ).change();
        },
        'moveend': updatePermalinkInputs,
        'changelayer': updatePermalinkInputs,
        'changebaselayer': updatePermalinkInputs
    });
    $('#select-embed-permalink').change(function(){
        if ( $(this).val() == 'p') {
            $('#span-embed-personalized-permalink').show();
        } else {
            $('#span-embed-personalized-permalink').hide();
        }
        updatePermalinkInputs();
    });
    $('#span-embed-personalized-permalink input').change(updatePermalinkInputs);

    $('.btn-permalink-clear').click(function(){
      $('#button-permaLink').click();
      return false;
    });

    bindGeobookmarkEvents();

    $('#permalink-box ul.permalink-tabs a[data-toggle="tab"]').on('shown', function(e){
        if($(e.target).attr('href') == '#tab-embed-permalink')
            updateMiniDockSize();
    });

    $('#geobookmark-form').submit(function(){
      var bname = $('#geobookmark-form input[name="bname"]').val();
      if( bname == '' ){
        mAddMessage(lizDict['geobookmark.name.required'],'error',true);
        return false;
      }
      var gburl = lizUrls.geobookmark;
      var gbparams = JSON.parse(JSON.stringify(permalinkArgs));
      gbparams['name'] = bname;
      gbparams['q'] = 'add';
      if( lizMap.lizmapLayerFilterActive ) {
        var afilter = lizMap.lizmapLayerFilterActive + ':' + config.layers[lizMap.lizmapLayerFilterActive]['filteredFeatures'].join();
        gbparams['filter'] =  afilter;
      }
      $.post(gburl,
        gbparams,
        function(data) {
          setGeobookmarkContent(data);
        }
        ,'text'
      );

      return false;
    });

    lizMap.events.on({
        minidockopened: function(e) {
            if ( e.id == 'permaLink' ) {
                updatePermalinkInputs();
            }
        }
    });

  }


  function createPermalinkArgs(){

    var args = OpenLayers.Control.Permalink.prototype.createParams.apply(
        this, arguments
    );

    // Replace zoom, lat, lon by bbox
    delete args['zoom'];
    delete args['lat'];
    delete args['lon'];
    args['bbox'] = map.getExtent().toBBOX();
    args['crs'] = map.projection.projCode;

    // Add layer filter and style if needed
    var filter = [];
    var style = [];
    var opacity = [];
    for ( var  lName in config.layers ) {

      var lConfig = config.layers[lName];
      if ( !('request_params' in lConfig)
        || lConfig['request_params'] == null )
          continue;
      var requestParams = lConfig['request_params'];
      if ( ('filter' in lConfig['request_params'])
        && lConfig['request_params']['filter'] != null
        && lConfig['request_params']['filter'] != "" ) {
          filter.push( lConfig['request_params']['filter'] );
      }

    }
    if ( filter.length > 0 )
      args['filter'] = filter.join(';');

    // Layers style
    for (var i=0,len=layers.length; i<len; i++) {
      var layer = layers[i];
      if( layer.isVisible &&
         (layer.params['STYLES'] != 'default' || layer.params['STYLES'] != '') ){
        style.push( layer.name + ':' + layer.params['STYLES'] );
      }
      if( layer.opacity && layer.opacity != 1 ){
        opacity.push( layer.name + ':' + layer.opacity );
      }
    }
    if ( style.length > 0 )
      args['layerStyles'] = style.join(';');
    if ( opacity.length > 0 ) {
      args['layerOpacities'] = opacity.join(';');
    }

    // Add permalink args to Lizmap global variable
    permalinkArgs = args;

    return args;

  }

  function getUrlParameters(){
    var oParametre = {};

    if (window.location.search.length > 1) {
      for (var aItKey, nKeyId = 0, aCouples = window.location.search.substr(1).split("&"); nKeyId < aCouples.length; nKeyId++) {
        aItKey = aCouples[nKeyId].split("=");
        oParametre[unescape(aItKey[0])] = aItKey.length > 1 ? unescape(aItKey[1]) : "";
      }
    }
    return oParametre;
  }

  function updatePermalinkInputs() {
    if ( !$('#permaLink').hasClass('active') )
        return;

    var pHref = $('#permalink').attr('href');

    $('#input-share-permalink').val(pHref);

    var iframeSize = $('#select-embed-permalink').val();
    pHref = $('#permalink-embed').attr('href');
    var pIframe = '';
    if ( iframeSize == 's' ) {
        pIframe = '<iframe width="400" height="300" frameborder="0" style="border:0" src="'+pHref+'" allowfullscreen></iframe>';
    } else if ( iframeSize == 'm' ) {
        pIframe = '<iframe width="600" height="450" frameborder="0" style="border:0" src="'+pHref+'" allowfullscreen></iframe>';
    }else if ( iframeSize == 'l' ) {
        pIframe = '<iframe width="800" height="600" frameborder="0" style="border:0" src="'+pHref+'" allowfullscreen></iframe>';
    }else if ( iframeSize == 'p' ) {
        var w = $('#input-embed-width-permalink').val();
        var h = $('#input-embed-height-permalink').val();
        pIframe = '<iframe width="'+w+'" height="'+h+'" frameborder="0" style="border:0" src="'+pHref+'" allowfullscreen></iframe>';
    }
    $('#input-embed-permalink').val(pIframe);
  }

  function bindGeobookmarkEvents(){

    $('.btn-geobookmark-del').click(function(){
      if (confirm(lizDict['geobookmark.confirm.delete'] )){
        var gbid = $(this).val();
        removeGeoBookmark(gbid);
      }
      return false;
    });
    $('.btn-geobookmark-run').click(function(){
      var id = $(this).val();
      runGeoBookmark( id );

      return false;
    });
  }

  function setGeobookmarkContent( gbData ){
    // set content
    $('div#geobookmark-container').html(gbData);
    // unbind previous click events
    $('div#geobookmark-container button').unbind('click');
    // Bind events
    bindGeobookmarkEvents();
    // Remove bname val
    $('#geobookmark-form input[name="bname"]').val('').blur();
  }

  // Set the map accordingly to
  function runPermalink( pparams ){

    // Activate layers
    var players = pparams.layers;

    // Get styles and tranform into obj
    var slist = {};
    if( 'layerStyles' in pparams && pparams.layerStyles != ''){
      var lstyles = pparams.layerStyles.split(';');
      for(var i in lstyles){
        var a = lstyles[i];
        var b = a.split(':');
        if( b.length == 2)
          slist[b[0]] = b[1];
      }
    }

    // Get opacities and tranform into obj
    var olist = {};
    if( 'layerOpacities' in pparams && pparams.layerOpacities != ''){
      var lopacities = pparams.layerOpacities.split(';');
      for(var i in lopacities){
        var a = lopacities[i];
        var b = a.split(':');
        if( b.length == 2)
          olist[b[0]] = parseFloat(b[1]);
      }
    }

    for( var i=0; i < map.layers.length; i++){

      // Activate and deactivate layers
      var l = map.layers[i];
      var lbase = l.isBaseLayer;
      if( lbase ){
        if( players[i] == 'B' )
          $('#switcher-baselayer-select').val( l.name ).change();
      }else{
        var btn = $('#switcher button.checkbox[name="layer"][value="'+l.name+'"]');
        if ( ( (players[i] == 'T') != btn.hasClass('checked') ) )
          $('#switcher button.checkbox[name="layer"][value="'+l.name+'"]').click();
      }

      // Set style
      if( l.name in slist ){
        l.params['STYLES'] = slist[l.name];
        l.redraw( true );
        lizMap.events.triggerEvent("layerstylechanged",
            { 'featureType': l.name}
        );
      }

      // Set opacity
      if( l.name in olist ){
        l.setOpacity(olist[l.name]);
      }
    }

    // Filter
    if( 'filter' in pparams && pparams.filter != '' ){
        var sp = pparams.filter.split(':');
        if( sp.length == 2 ){
          var flayer = sp[0];
          var ffids = sp[1].split();

          // Select feature
          lizMap.events.triggerEvent('layerfeatureselected',
              {'featureType': flayer, 'fid': ffids, 'updateDrawing': false}
          );
          // Filter selected feature
          lizMap.events.triggerEvent('layerfeaturefilterselected',
              {'featureType': flayer}
          );
        }
    }else{
      if( lizMap.lizmapLayerFilterActive ){
        lizMap.events.triggerEvent('layerfeatureremovefilter',
            {'featureType': lizMap.lizmapLayerFilterActive}
        );
      }
    }

    // Zoom to bbox
    var bbox = OpenLayers.Bounds.fromString( pparams.bbox );
    map.zoomToExtent( bbox, true );

  }

  function runGeoBookmark( id ){
    var gburl = lizUrls.geobookmark;
    var gbparams = {
      id: id,
      q: 'get'
    };
    $.get(gburl,
      gbparams,
      function(geoparams) {
        runPermalink(geoparams);
      }
      ,'json'
    );
  }

  function removeGeoBookmark( id ){
    var gburl = lizUrls.geobookmark;
    var gbparams = {
      id: id,
      q: 'del',
      repository: lizUrls.params.repository,
      project: lizUrls.params.project
    };
    $.get(gburl,
      gbparams,
      function(data) {
        setGeobookmarkContent(data);
      }
      ,'text'
    );
  }

  function addGeometryFeatureInfo( popup, containerId ) {
      // clean locate layer
      var layer = map.getLayersByName('locatelayer');
      if ( layer.length == 0 )
        return;
      layer = layer[0];
      layer.destroyFeatures();
      // build selector
      var selector = 'div.lizmapPopupContent > div.lizmapPopupDiv > input.lizmap-popup-layer-feature-geometry';
      if ( containerId )
        selector = '#'+ containerId +' '+ selector;
      // get geometries and crs
      var geometries = [];
      $(selector).each(function(){
        var self = $(this);
        var val = self.val();
        if ( val == '' )
            return;
        var crs = self.parent().find('input.lizmap-popup-layer-feature-crs').val();
        if ( crs == '' )
            return;
        var fid = self.parent().find('input.lizmap-popup-layer-feature-id').val();
        var minx = self.parent().find('input.lizmap-popup-layer-feature-bbox-minx').val();
        var miny = self.parent().find('input.lizmap-popup-layer-feature-bbox-miny').val();
        var maxx = self.parent().find('input.lizmap-popup-layer-feature-bbox-maxx').val();
        var maxy = self.parent().find('input.lizmap-popup-layer-feature-bbox-maxy').val();
        geometries.push( { fid: fid, geom: val, crs: crs, bbox:[minx,miny,maxx,maxy] } );
      });
      // load proj and build features from popup
      var projLoaded = [];
      for ( var i=0, len=geometries.length; i<len; i++ ) {
          loadProjDefinition(geometries[i].crs, function( aProj ) {
              projLoaded.push( aProj );
              if ( projLoaded.length == geometries.length ) {
                  var features = [];
                  for ( var j=0, len=geometries.length; j<len; j++ ) {
                      var geomInfo = geometries[j];
                      var geometry = OpenLayers.Geometry.fromWKT( geomInfo.geom );
                      geometry.transform(geomInfo.crs, map.getProjection());
                      features.push( new OpenLayers.Feature.Vector( geometry ) );

                      var fidInput = $('div.lizmapPopupContent input.lizmap-popup-layer-feature-id[value="'+geomInfo.fid+'"]');
                      if ( !fidInput )
                        continue;

                      var bounds = OpenLayers.Bounds.fromArray(geomInfo.bbox);
                      bounds.transform(geomInfo.crs, map.getProjection());
                      var eHtml = '';
                      eHtml+= '<button class="btn btn-mini popup-layer-feature-bbox-zoom" value="';
                      eHtml+= bounds.toString();
                      eHtml+= '" title="' + lizDict['attributeLayers.btn.zoom.title'] + '"><i class="icon-zoom-in"></i>&nbsp;</button>';
                      var popupButtonBar = fidInput.next('span.popupButtonBar');
                      if ( popupButtonBar.length != 0 ) {
                          if ( popupButtonBar.find('button.popup-layer-feature-bbox-zoom').length == 0 )
                              popupButtonBar.append(eHtml);
                      } else {
                          eHtml = '<span class="popupButtonBar">' + eHtml + '</span></br>';
                          fidInput.after(eHtml);
                      }
                      fidInput.find('button.btn').tooltip( {
                          placement: 'bottom'
                      } );
                  }
                 layer.addFeatures( features );

                  // Zoom
                  $('div.lizmapPopupContent button.popup-layer-feature-bbox-zoom')
                  .unbind('click')
                  .click(function(){
                      var bbox = OpenLayers.Bounds.fromString($(this).val());
                      map.zoomToExtent(bbox);
                      return false;
                  })
                  .hover(
                      function(){ $(this).addClass('btn-primary'); },
                      function(){ $(this).removeClass('btn-primary'); }
                  );
              }
          } );
      }
  }

  function addChildrenDatavizFilteredByPopupFeature(popup, containerId) {
      // build selector
      var selector = 'div.lizmapPopupContent > div.lizmapPopupDiv';
      if ( containerId )
        selector = '#'+ containerId +' '+ selector;

     $(selector).each(function(){
        var mydiv = $(this);

        // Do not add plots if already present
        if( $(this).find('div.lizdataviz').length > 0 )
            return true;

        var getLayerId = $(this).find('input.lizmap-popup-layer-feature-id:first').val().split('.');
        var popupId = getLayerId[0] + '_' + getLayerId[1];
        var layerId = getLayerId[0];
        var fid = getLayerId[1];
        var layerName=getLayerId[0].split(/[0-9]/)[0];

        var getLayerConfig = lizMap.getLayerConfigById( layerId );

        // verifiying  related children objects
        if ( !getLayerConfig )
            return true;
        var layerConfig = getLayerConfig[1];
        var featureType = getLayerConfig[0];

        // We do not want to deactivate the display of filtered children dataviz
        // when children popup are not displayed : comment the 2 following lines
        if ( !('relations' in lizMap.config) || !(layerId in lizMap.config.relations) )
            return true;

        //If dataviz exists, get config
        if( !('datavizLayers' in lizMap.config ))
            return true;

        lizMap.getLayerFeature(featureType, fid, function(feat) {
            // Where there is all plots
            var plotLayers = lizMap.config.datavizLayers.layers;
            var lrelations = lizMap.config.relations[layerId];
            nbPlotByLayer = 1;
            for(var x in lrelations){
                var rel = lrelations[x];
                // Id of the layer which is the child of layerId
                var getChildrenId = rel.referencingLayer;

                // Filter of the plot
                var filter = '"' + rel.referencingField + '" IN (\''+feat.properties[rel.referencedField]+'\')';
                for ( var i in plotLayers) {
                    if(plotLayers[i].layer_id==getChildrenId)
                    {
                        plot_config=plotLayers[i];
                        if('popup_display_child_plot' in plot_config
                          && plot_config.popup_display_child_plot == "True"
                        ){
                          plot_id=plotLayers[i].plot_id;
                          popupId = getLayerId[0] + '_' + getLayerId[1] + '_' + String(nbPlotByLayer);
                          // Be sure the id is unique ( popup can be displayed in atlas tool too)
                          popupId+= '_' + new Date().valueOf()+btoa(Math.random()).substring(0,12);
                          var phtml = lizDataviz.buildPlotContainerHtml(
                              plot_config.title,
                              plot_config.abstract,
                              popupId,
                              false
                          );
                          html = '<div class="lizmapPopupChildren lizdataviz">';
                          html+= '<h4>'+ plot_config.title+'</h4>';
                          html+= phtml
                          html+= '</div>';
                          var haspc = $(mydiv).find('div.lizmapPopupChildren:first');
                          if( haspc.length > 0 )
                              $(haspc).before(html);
                          else
                              $(mydiv).append(html);
                          lizDataviz.getPlot(plot_id, filter, popupId);
                          nbPlotByLayer++;
                        }
                    }
                }
            }
        });
    });
  }

  function getChildrenFeatureInfo( rConfigLayer, wmsOptions, parentDiv, aCallback ) {
        if ( rConfigLayer.popup != 'True' )
            return false;
        // Query the server
        var service = OpenLayers.Util.urlAppend(lizUrls.wms
            ,OpenLayers.Util.getParameterString(lizUrls.params)
        );
        $.post(service, wmsOptions, function(data) {
            var hasPopupContent = (!(!data || data == null || data == ''))
            if ( hasPopupContent ) {
                var popupReg = new RegExp('lizmapPopupTable', 'g');
                data = data.replace(popupReg, 'table table-condensed table-striped lizmapPopupTable');

                var clname = rConfigLayer.cleanname;
                if ( clname === undefined ) {
                    clname = cleanName(configLayer.name);
                    rConfigLayer.cleanname = clname;
                }
                var childPopup = $('<div class="lizmapPopupChildren '+clname+'">'+data+'</div>');

                //Manage if the user choose to create a table for children
                if( rConfigLayer.popupSource == 'qgis' &&
                    childPopup.find('.lizmap_merged').length != 0 )
                {
                    // save inputs
                    childPopup.find(".lizmapPopupDiv").each(function(i,e){
                        var popupDiv = $(e);
                        if ( popupDiv.find(".lizmapPopupHeader").prop("tagName") == 'TR' ) {
                            popupDiv.find(".lizmapPopupHeader").prepend("<th></th>");
                            popupDiv.find(".lizmapPopupHeader").next().prepend("<td></td>");
                        } else {
                            popupDiv.find(".lizmapPopupHeader").next().prepend("<span></span>");
                        }
                        popupDiv.find(".lizmapPopupHeader").next().children().first().append(popupDiv.find("input"));
                    });

                    childPopup.find("h4").each(function(i,e){
                        if(i != 0 )
                            $(e).remove();
                    });

                    childPopup.find(".lizmapPopupHeader").each(function(i,e){
                        if(i != 0 )
                            $(e).remove();
                    });

                    childPopup.find(".lizmapPopupDiv").contents().unwrap();
                    childPopup.find(".lizmap_merged").contents().unwrap();
                    childPopup.find(".lizmapPopupDiv").remove();
                    childPopup.find(".lizmap_merged").remove();

                    childPopup.find(".lizmapPopupHidden").hide();

                    var tChildPopup = $("<table class='lizmap_merged'></table>");
                    childPopup.append(tChildPopup);
                    childPopup.find('tr').appendTo(tChildPopup);

                    childPopup.children('tbody').remove();
                }

                var oldPopupChild = parentDiv.find('div.lizmapPopupChildren.'+clname);
                if ( oldPopupChild.length != 0 )
                    oldPopupChild.remove();
                parentDiv.append(childPopup);

                if ( aCallback )
                    aCallback( childPopup );
            }
        });
  }

  function addChildrenFeatureInfo( popup, containerId ) {
      var selector = 'div.lizmapPopupContent input.lizmap-popup-layer-feature-id';
      if ( containerId )
        selector = '#'+ containerId +' '+ selector;
      $(selector).each(function(){
        var self = $(this);
        var val = self.val();
        var eHtml = '';
        var fid = val.split('.').pop();
        var layerId = val.replace( '.' + fid, '' );

        var getLayerConfig = getLayerConfigById( layerId );

        // verifiying  related children objects
        if ( !getLayerConfig )
            return true;
        var layerConfig = getLayerConfig[1];
        var featureType = getLayerConfig[0];
        if ( !('popupDisplayChildren' in layerConfig) || layerConfig.popupDisplayChildren != 'True')
            return true;
        if ( !('relations' in config) || !(layerId in config.relations) )
            return true;

        // Display related children objects
        var relations = config.relations[layerId];
        var featureId = featureType + '.' + fid;
        var popupMaxFeatures = 10;
        if ( 'popupMaxFeatures' in layerConfig && !isNaN(parseInt(layerConfig.popupMaxFeatures)) )
            popupMaxFeatures = parseInt(layerConfig.popupMaxFeatures);
        popupMaxFeatures == 0 ? 10 : popupMaxFeatures;
        getLayerFeature(featureType, fid, function(feat) {
            for ( var i=0, len=relations.length; i<len; i++ ){
                var r = relations[i];
                var rLayerId = r.referencingLayer;
                var rGetLayerConfig = getLayerConfigById( rLayerId );
                if ( rGetLayerConfig ) {
                    var rConfigLayer = rGetLayerConfig[1];
                    var clname = rConfigLayer.cleanname;
                    if ( clname === undefined ) {
                        clname = cleanName(configLayer.name);
                        rConfigLayer.cleanname = clname;
                    }
                    if ( rConfigLayer.popup == 'True' && self.parent().find('div.lizmapPopupChildren.'+clname).length == 0) {
                        var wmsOptions = {
                             'LAYERS': rConfigLayer.name
                            ,'QUERY_LAYERS': rConfigLayer.name
                            ,'STYLES': ''
                            ,'SERVICE': 'WMS'
                            ,'VERSION': '1.3.0'
                            ,'CRS': (('crs' in rConfigLayer) && rConfigLayer.crs != '') ? rConfigLayer.crs : 'EPSG:4326'
                            ,'REQUEST': 'GetFeatureInfo'
                            ,'EXCEPTIONS': 'application/vnd.ogc.se_inimage'
                            ,'FEATURE_COUNT': popupMaxFeatures
                            ,'INFO_FORMAT': 'text/html'
                        };

                        if ( 'popupMaxFeatures' in rConfigLayer && !isNaN(parseInt(rConfigLayer.popupMaxFeatures)) )
                            wmsOptions['FEATURE_COUNT'] = parseInt(rConfigLayer.popupMaxFeatures);
                        if ( wmsOptions['FEATURE_COUNT'] == 0 )
                            wmsOptions['FEATURE_COUNT'] = popupMaxFeatures;
                        if ( rConfigLayer.request_params && rConfigLayer.request_params.filter &&
                             rConfigLayer.request_params.filter !== '' )
                            wmsOptions['FILTER'] = rConfigLayer.request_params.filter+' AND "'+r.referencingField+'" = \''+feat.properties[r.referencedField]+'\'';
                        else
                            wmsOptions['FILTER'] = rConfigLayer.name+':"'+r.referencingField+'" = \''+feat.properties[r.referencedField]+'\'';
                        getChildrenFeatureInfo( rConfigLayer, wmsOptions, self.parent(), function(childPopup){
                            if ( popup && typeof popup.verifySize === "function" )
                                popup.verifySize();

                            // Trigger event
                            lizMap.events.triggerEvent(
                                "lizmappopupchildrendisplayed",
                                {'html': childPopup.html()}
                            );
                        });
                    }
                }
            }
        });
      });
  }

  function addFeatureInfo() {
      // Verifying layers
      var popupsAvailable = false;
      for ( var l in config.layers ) {
          var configLayer = config.layers[l];
          var editionLayer = null;
          if ( ('editionLayers' in config) && (l in config.editionLayers) )
              editionLayer = config.editionLayers[l];
          if( (configLayer && configLayer.popup && configLayer.popup == 'True')
           || (editionLayer && ( editionLayer.capabilities.modifyGeometry == 'True'
                              || editionLayer.capabilities.modifyAttribute == 'True'
                              || editionLayer.capabilities.deleteFeature == 'True') ) ){
              popupsAvailable = true;
              break;
          }
      }
      if ( !popupsAvailable )
        return null;

      // Create the dock if needed
      if( 'popupLocation' in config.options &&
          config.options.popupLocation != 'map' &&
          !$('#mapmenu .nav-list > li.popupcontent > a').length ) {
          // Verifying the message
          if ( !('popup.msg.start' in lizDict) )
            lizDict['popup.msg.start'] = 'Click to the map to get informations.';
          // Initialize dock
          var popupContainerId = 'popupcontent';
          var pcontent = '<div class="lizmapPopupContent"><h4>'+lizDict['popup.msg.start']+'</h4></div>';
          addDock(popupContainerId, 'Popup', config.options.popupLocation, pcontent, 'icon-comment');
          $('#button-popupcontent').click(function(){
              if($(this).parent().hasClass('active')) {
                  // clean locate layer
                  var locatelayer = map.getLayersByName('locatelayer');
                  if ( locatelayer.length == 0 )
                      return;
                  locatelayer = locatelayer[0];
                  locatelayer.destroyFeatures();
                  // remove information
                  $('#popupcontent div.menu-content').html('<div class="lizmapPopupContent"><h4>'+lizDict['popup.msg.start']+'</h4></div>');
              }
          });

      }

      var fiurl = OpenLayers.Util.urlAppend(
        lizUrls.wms,
        OpenLayers.Util.getParameterString(lizUrls.params)
      )
      var lastLonLatInfo = null;
      var info = new OpenLayers.Control.WMSGetFeatureInfo({
            url: fiurl,
            title: 'Identify features by clicking',
            type:OpenLayers.Control.TYPE_TOGGLE,
            queryVisible: true,
            infoFormat: 'text/html',
            vendorParams: getFeatureInfoTolerances(),
            eventListeners: {
                getfeatureinfo: function(event) {
                    var eventLonLatInfo = map.getLonLatFromPixel(event.xy);
                    var text = event.text;

                    if (map.popups.length != 0)
                        map.removePopup(map.popups[0]);

                    var popup = null;
                    var popupContainerId = null;
                    if( 'popupLocation' in config.options && config.options.popupLocation != 'map' ){
                      popupContainerId = 'popupcontent';

                      // create content
                      var popupReg = new RegExp('lizmapPopupTable', 'g');
                      text = text.replace( popupReg, 'table table-condensed table-striped table-bordered lizmapPopupTable');
                      var pcontent = '<div class="lizmapPopupContent">'+text+'</div>';
                      var hasPopupContent = (!(!text || text == null || text == ''));
                      $('#popupcontent div.menu-content').html(pcontent);
                      if ( !$('#mapmenu .nav-list > li.popupcontent').is(':visible') )
                        $('#mapmenu .nav-list > li.popupcontent').show();

                      // Warn user no data has been found
                      if( !hasPopupContent ){
                        pcontent = '<div class="lizmapPopupContent"><h4>'+lizDict['popup.msg.no.result']+'</h4></div>';
                        $('#popupcontent div.menu-content').html(pcontent);
                        window.setTimeout(function(){
                            if ( $('#mapmenu .nav-list > li.popupcontent').hasClass('active') && config.options.popupLocation != 'right-dock')
                                $('#button-popupcontent').click();
                        },2000);
                      }

                      // Display dock if needed
                      if(
                        !$('#mapmenu .nav-list > li.popupcontent').hasClass('active')
                         && (!mCheckMobile() || ( mCheckMobile() && hasPopupContent ) )
                         && (lastLonLatInfo == null || eventLonLatInfo.lon != lastLonLatInfo.lon || eventLonLatInfo.lat != lastLonLatInfo.lat)
                      ){
                          $('#button-popupcontent').click();
                      }
                      else if(
                        $('#mapmenu .nav-list > li.popupcontent').hasClass('active')
                         && ( mCheckMobile() && hasPopupContent )
                      ){
                          $('#button-popupcontent').click();
                      }
                      // Resize minidock if displayed
                      if ( $('#mapmenu .nav-list > li.popupcontent').hasClass('active') && config.options.popupLocation == 'minidock' )
                          updateMiniDockSize();

                    }
                    else{
                      if (!text || text == null || text == '')
                          return false;
                      // Use openlayers map popup anchored
                      popupContainerId = "liz_layer_popup";
                      popup = new OpenLayers.Popup.LizmapAnchored(
                          popupContainerId,
                          eventLonLatInfo,
                          null,
                          text,
                          null,
                          true,
                          function() {
                            map.removePopup(this);
                            if(mCheckMobile()){
                              $('#navbar').show();
                              $('#overview-box').show();
                            }

                            // clean locate layer
                            var locatelayer = map.getLayersByName('locatelayer');
                            if ( locatelayer.length == 0 )
                                return;
                            locatelayer = locatelayer[0];
                            locatelayer.destroyFeatures();
                            return false;
                          }
                      );
                      popup.panMapIfOutOfView = true;
                      map.addPopup(popup);

                      popup.verifySize();
                      // Hide navbar and overview in mobile mode
                      if(mCheckMobile()){
                          $('#navbar').hide();
                          $('#overview-box').hide();
                      }
                    }
                    lastLonLatInfo = eventLonLatInfo;

                    // Display related children objects
                    addChildrenFeatureInfo( popup, popupContainerId );
                    // Display geometries
                    addGeometryFeatureInfo( popup, popupContainerId );
                    // Display the plots of the children layers features filtered by popup item
                    addChildrenDatavizFilteredByPopupFeature( popup, popupContainerId );

                    // Trigger event
                    lizMap.events.triggerEvent("lizmappopupdisplayed",
                        {'popup': popup, 'containerId': popupContainerId}
                    );
                }
            }
     });
     if (lizUrls.publicUrlList && lizUrls.publicUrlList.length != 0 ) {
        var layerUrls = [];
        for (var j=0, jlen=lizUrls.publicUrlList.length; j<jlen; j++) {
          layerUrls.push(
            OpenLayers.Util.urlAppend(
              lizUrls.publicUrlList[j],
              OpenLayers.Util.getParameterString(lizUrls.params)
            )
          );
        }
        info.layerUrls = layerUrls;
     }
     info.findLayers = function() {
        var candidates = this.layers || this.map.layers;
        var layers = [];
        var maxFeatures = 0;
        var layer, url;
        for(var i=0, len=candidates.length; i<len; ++i) {
            layer = candidates[i];
            if( (layer instanceof OpenLayers.Layer.WMS || layer instanceof OpenLayers.Layer.WMTS)
             && (!this.queryVisible || (layer.getVisibility() && layer.calculateInRange())) ) {
                var qgisName = null;
                if ( layer.name in cleanNameMap )
                    qgisName = getLayerNameByCleanName(layer.name);
                var configLayer = null;
                if ( qgisName )
                    configLayer = config.layers[qgisName];
                if ( !configLayer )
                    configLayer = config.layers[layer.params['LAYERS']];
                if ( !configLayer )
                    configLayer = config.layers[layer.name];
                 var editionLayer = null;
                 if( 'editionLayers' in config ) {
                     editionLayer = config.editionLayers[qgisName];
                     if ( !editionLayer )
                        editionLayer = config.editionLayers[layer.params['LAYERS']];
                     if ( !editionLayer )
                        editionLayer = config.editionLayers[layer.name];
                 }
                 if( (configLayer && configLayer.popup && configLayer.popup == 'True')
                  || (editionLayer && ( editionLayer.capabilities.modifyGeometry == 'True'
                                     || editionLayer.capabilities.modifyAttribute == 'True'
                                     || editionLayer.capabilities.deleteFeature == 'True') ) ){
                    url = OpenLayers.Util.isArray(layer.url) ? layer.url[0] : layer.url;
                    // if the control was not configured with a url, set it
                    // to the first layer url
                    if(this.drillDown === false && !this.url) {
                        this.url = url;
                    }

                    layers.push(layer);
                    if ( 'popupMaxFeatures' in configLayer && !isNaN(parseInt(configLayer.popupMaxFeatures)) )
                        maxFeatures += parseInt(configLayer.popupMaxFeatures);
                    else
                        maxFeatures += 10;
                 }
            }
        }
        this.maxFeatures = maxFeatures == 0 ? 10 : maxFeatures;
        return layers;
     };
     function refreshGetFeatureInfo( evt ) {
         if ( !evt.updateDrawing )
            return;
        if ( lastLonLatInfo == null )
            return true;
        var lastPx = map.getPixelFromLonLat(lastLonLatInfo);
        if ( $('#liz_layer_popup  div.lizmapPopupContent').length < 1
          && $('#popupcontent div.menu-content div.lizmapPopupContent').length < 1)
            return;

        var popupContainerId = "liz_layer_popup";
        if ( $('#'+popupContainerId+' div.lizmapPopupContent input.lizmap-popup-layer-feature-id').length == 0 )
            popupContainerId = 'popupcontent';

        // Refresh if needed
        var refreshInfo = false;
        $('#'+popupContainerId+' div.lizmapPopupContent input.lizmap-popup-layer-feature-id').each(function(){
            var self = $(this);
            var val = self.val();
            var eHtml = '';
            var fid = val.split('.').pop();
            var layerId = val.replace( '.' + fid, '' );
            var aConfig = lizMap.getLayerConfigById( layerId );
            if ( aConfig && aConfig[0] == evt.featureType ) {
                refreshInfo = true;
                return false;
            }
        });
        if ( refreshInfo  ) {
            //lastLonLatInfo = null;
            $('#'+popupContainerId+' div.lizmapPopupContent input.lizmap-popup-layer-feature-id[value="'+evt.layerId+'.'+evt.featureId+'"]').parent().remove();
            info.request( lastPx, {} );
        }
        return;
     }
     lizMap.events.on({
        "layerFilterParamChanged": function( evt ) {
            var filter = [];
            for ( var  lName in config.layers ) {
                var lConfig = config.layers[lName];
                if ( lConfig.popup != 'True' )
                    continue;
                if ( !('request_params' in lConfig)
                  || lConfig['request_params'] == null )
                    continue;
                var requestParams = lConfig['request_params'];
                if ( ('filter' in lConfig['request_params'])
                  && lConfig['request_params']['filter'] != null
                  && lConfig['request_params']['filter'] != "" ) {

                    // Get filter token
                    var surl = OpenLayers.Util.urlAppend(lizUrls.wms
                        ,OpenLayers.Util.getParameterString(lizUrls.params)
                    );
                    var sdata = {
                        service: 'WMS',
                        request: 'GETFILTERTOKEN',
                        typename: lName,
                        filter: lConfig['request_params']['filter']
                    };
                    $.post(surl, sdata, function(result){
                        filter.push(result.token);
                        info.vendorParams['filtertoken'] = filter.join(';');
                        info.vendorParams['filter'] = null;
                        refreshGetFeatureInfo(evt);
                    });
                }else{
                      info.vendorParams['filtertoken'] = requestParams['filtertoken'];
                      info.vendorParams['filter'] = requestParams['filter'];
                }
            }
        },
        "layerSelectionChanged": function( evt ) {
            refreshGetFeatureInfo(evt);
        },
        "lizmapeditionfeaturedeleted": function( evt ) {
            if ( $('div.lizmapPopupContent input.lizmap-popup-layer-feature-id').length > 1 ) {
                refreshGetFeatureInfo(evt);
            } else {
                if (map.popups.length != 0)
                    map.removePopup(map.popups[0]);

                if( 'popupLocation' in config.options && config.options.popupLocation != 'map' ){
                    var pcontent = '<div class="lizmapPopupContent"><h4>'+lizDict['popup.msg.no.result']+'</h4></div>';
                    $('#popupcontent div.menu-content').html(pcontent);
                    if ( $('#mapmenu .nav-list > li.popupcontent').hasClass('active') )
                        $('#button-popupcontent').click();
                    if ( !$('#mapmenu .nav-list > li.popupcontent').hasClass('active') )
                        $('#mapmenu .nav-list > li.popupcontent').hide();
                }
            }
        }
     });
     map.addControl(info);
     info.activate();
     return info;
  }

  function getPrintScale( aScales ) {
      var newScales = [];
      for ( var i=0, len = aScales.length; i<len; i++ ) {
          newScales.push( parseFloat(aScales[i]) );
      }
      newScales.sort(function(a,b){return b-a;});
    var scale = map.getScale();
  var scaleIdx = $.inArray( scale, newScales );
    if ( scaleIdx == -1 ) {
    var s=0, slen=newScales.length;
    while ( scaleIdx == -1 && s<slen ) {
      if ( scale > newScales[s] )
        scaleIdx = s;
      else
       s++;
    }
    if( s == slen ) {
      scale = newScales[slen-1];
    } else {
      scale = newScales[scaleIdx];
    }
    }
    return scale;
  }

  function drawPrintBox( aLayout, aLayer, aScale ) {
    var size = aLayout.size;
    var units = map.getUnits();
    var unitsRatio = OpenLayers.INCHES_PER_UNIT[units];
    var w = size.width / 72 / unitsRatio * aScale / 2;
    var h = size.height / 72 / unitsRatio * aScale / 2;
    if ( aLayer.features.length == 0 ) {
        var center = map.getCenter();
        var bounds = new OpenLayers.Bounds(center.lon - w, center.lat - h,
            center.lon + w, center.lat + h);
        var geom = bounds.toGeometry();
        aLayer.addFeatures([
            new OpenLayers.Feature.Vector( geom )
        ]);
    } else {
        var feat = aLayer.features[0];
        var center = feat.geometry.getBounds().getCenterLonLat();
        var bounds = new OpenLayers.Bounds(center.lon - w, center.lat - h,
            center.lon + w, center.lat + h);
        var geom = bounds.toGeometry();
        geom.id = feat.geometry.id;
        feat.geometry = geom;
        aLayer.drawFeature(feat);
    }
    return true;
  }

  function getPrintGridInterval( aLayout, aScale, aScales ) {
    var size = aLayout.size;
    var units = map.getUnits();
    var unitsRatio = OpenLayers.INCHES_PER_UNIT[units];
    var w = size.width / 72 / unitsRatio * aScale;
    var h = size.height / 72 / unitsRatio * aScale;

      var refScale = w > h ? w : h;
      var newScales = [];
      for ( var i=0, len = aScales.length; i<len; i++ ) {
          newScales.push( parseFloat(aScales[i]) );
      }
      newScales.sort(function(a,b){return b-a;});
      var theScale = newScales[0];
      for ( var i=0, len=newScales.length; i<len; i++ ) {
          var s = newScales[i];
          if ( s > refScale )
            theScale = s;
          if ( s < refScale )
            break;
      }
      return theScale/10;
  }
  function addPrintControl() {
    if ( !config['printTemplates'] || config.printTemplates.length == 0 ) {
      $('#button-print').parent().remove();
      return false;
    }

    // Filtering print templates by removing atlas ones
    var pTemplates = [];
    for( var i=0, len=config.printTemplates.length; i<len; i++ ){
        var pTemplate = config.printTemplates[i];
        if('atlas' in pTemplate
          && 'enabled' in pTemplate.atlas
          && (pTemplate.atlas.enabled === '1' || pTemplate.atlas.enabled === 'true'))
            continue;
        pTemplates.push(pTemplate);
    }
    // remove print tool if only atlas print configured
    if ( pTemplates.length == 0 ) {
      $('#button-print').parent().remove();
      return false;
    }

    var ptTomm = 0.35277; //conversion pt to mm

    var scales = map.scales;
    if ( config.options.mapScales.length > 2 )
      scales = config.options.mapScales;
    if ( scales == null && map.resolutions != null ) {
      scales = [];
      for( var i=0, len=map.resolutions.length; i<len; i++ ){
        var units = map.getUnits();
        var res = map.resolutions[i];
        var scale = OpenLayers.Util.getScaleFromResolution(res, units);
        scales.push(scale);
      }
    }
    if ( scales == null ) {
      $('#button-print').parent().remove();
      return false;
    }
    if ( scales[0] < scales[scales.length-1] )
      scales.reverse();

    var scaleOptions = '';
    for( var i=0, len=scales.length; i<len; i++ ){
        var scale = scales[i];
        printCapabilities.scales.push(scale);
        var scaleText = scale;
        if (scaleText > 10)
            scaleText = Math.round(scaleText)
        else
            scaleText = Math.round(scaleText*100)/100
        scaleText = scaleText.toLocaleString()
        scaleOptions += '<option value="'+scale+'">'+scaleText+'</option>';
    }
    $('#print-scale').html(scaleOptions);

    // creating printCapabilities layouts
    for( var i=0, len=pTemplates.length; i<len; i++ ){
      var pTemplate = pTemplates[i];
      var pMap = null;
      var pMapIdx = 0;
      var pOverview = null;
      while( pMap == null && pMapIdx < pTemplate.maps.length) {
        pMap = pTemplate.maps[pMapIdx];
        if( pMap['overviewMap'] ) {
          pOverview = pTemplate.maps[pMapIdx];
          pMap = null;
          pMapIdx += 1;
        }
      }
      if ( pMap == null )
        continue;
      var mapWidth = Number(pMap.width) / ptTomm;
      var mapHeight = Number(pMap.height) / ptTomm;
      //for some strange reason we need to provide a "map" and a "size" object with identical content
      printCapabilities.layouts.push({
        "name": pTemplate.title,
        "map": {
          "width": mapWidth,
          "height": mapHeight
        },
        "size": {
          "width": mapWidth,
          "height": mapHeight
        },
        "rotation": false,
        "template": pTemplate,
        "mapId": pMap.id,
        "overviewId": pOverview != null ? pOverview.id : null,
        "grid": (('grid' in pMap) && pMap.grid == "True")
      });
    }

    // if no printCapabilities layouts removed print
    if( printCapabilities.layouts.length == 0 ) {
      $('#button-print').parent().remove();
      return false;
    }

    // creating the print layer
    var layer = map.getLayersByName('Print');
    if ( layer.length == 0 ) {
      layer = new OpenLayers.Layer.Vector('Print',{
        styleMap: new OpenLayers.StyleMap({
          "default": new OpenLayers.Style({
            fillColor: "#D43B19",
            fillOpacity: 0.2,
            strokeColor: "#CE1F2D",
            strokeWidth: 1
          })
        })
      });
      map.addLayer(layer);
      layer.setVisibility(false);
    } else
      layer = layer[0];

    // creating print menu
    for( var i=0, len= printCapabilities.layouts.length; i<len; i++ ){
      var layout = printCapabilities.layouts[i];
      $('#print-template').append('<option value="'+i+'">'+layout.name+'</option>');
    }

    var dragCtrl = new OpenLayers.Control.DragFeature(layer,{
      geometryTypes: ['OpenLayers.Geometry.Polygon'],
      type:OpenLayers.Control.TYPE_TOOL,
      layout: null,
      eventListeners: {
        "activate": function(evt) {
          if (this.layout == null)
            return false;

          deactivateToolControls(evt);

          var layout = this.layout;
          // get print scale
          var scale = getPrintScale( printCapabilities.scales );
          // update the select
          $('#print-scale').val(scale);
          // draw print box
          drawPrintBox( layout, layer, scale );

          mAddMessage(lizDict['print.activate'],'info',true).addClass('print');
          layer.setVisibility(true);
        },
        "deactivate": function(evt) {
          layer.setVisibility(false);
          $('#message .print').remove();
          this.layout = null;
          layer.destroyFeatures();
        }
      }
    });
    map.addControls([dragCtrl]);
    controls['printDrag'] = dragCtrl;

    // set event listener to button-print
    $('#print-template').change(function() {
      var self = $(this);
      var layout = printCapabilities.layouts[parseInt( self.val() )];
      if ( layout.template.labels.length != 0 ) {
        var labels = '';
        for (var i=0, len=layout.template.labels.length; i<len; i++){
          var tLabel = layout.template.labels[i];
          var label = '';
          if (tLabel.htmlState == 0) {
            label = '<input type="text" name="'+tLabel.id+'" class="print-label" placeholder="'+tLabel.text+'" value="'+tLabel.text+'"><br>'
          } else {
            label = '<textarea name="'+tLabel.id+'" class="print-label" placeholder="'+tLabel.text+'">'+tLabel.text+'</textarea><br>'
          }
          labels += label;
        }
        $('#print .print-labels').html(labels);
        $('#print .print-labels').show();
      } else {
        $('#print .print-labels').html('');
        $('#print .print-labels').hide();
      }
      updateMiniDockSize();
      if (dragCtrl.active) {
        dragCtrl.deactivate();
        dragCtrl.layout = layout;
        dragCtrl.activate();
      } else {
        dragCtrl.layout = layout;
        dragCtrl.activate();
      }
      return false;
    });

    $('#print button.btn-print-clear').click(function() {
      $('#button-print').click();
      return false;
    });
    $('#print-scale').change(function() {
      if ( dragCtrl.active && layer.getVisibility() ) {
        var self = $(this);
        var scale = parseFloat(self.val());
        // draw print box
        drawPrintBox( dragCtrl.layout, layer, scale );
      }
    });
    $('#print-launch').click(function() {
      var pTemplate = dragCtrl.layout.template;
      var pTableVectorLayers = [];
      if( 'tables' in pTemplate )
          pTableVectorLayers = $.map( pTemplate.tables, function( t ){
              if( t.composerMap == -1 || ('map'+t.composerMap) == dragCtrl.layout.mapId )
                return t.vectorLayer;
          });
      // Print Extent
      var extent = dragCtrl.layer.features[0].geometry.getBounds();

      // Projection code and reverseAxisOrder
      var projCode = map.projection.getCode();
      var reverseAxisOrder = (OpenLayers.Projection.defaults[projCode] && OpenLayers.Projection.defaults[projCode].yx);

      // Build URL
      var url = OpenLayers.Util.urlAppend(lizUrls.wms
          ,OpenLayers.Util.getParameterString(lizUrls.params)
          );
      url += '&SERVICE=WMS';
      url += '&VERSION=1.3.0&REQUEST=GetPrint';
      url += '&FORMAT='+$('#print-format').val();
      url += '&EXCEPTIONS=application/vnd.ogc.se_inimage&TRANSPARENT=true';
      url += '&SRS='+projCode;
      url += '&DPI='+$('#print-dpi').val();
      url += '&TEMPLATE='+pTemplate.title;
      url += '&'+dragCtrl.layout.mapId+':extent='+extent.toBBOX(null, reverseAxisOrder);
      var scale = $('#print-scale').val();
      url += '&'+dragCtrl.layout.mapId+':scale='+scale;
      if ( 'grid' in dragCtrl.layout && dragCtrl.layout.grid ) {
          var gridInterval = getPrintGridInterval( dragCtrl.layout, parseFloat(scale), printCapabilities.scales );
          url += '&'+dragCtrl.layout.mapId+':grid_interval_x='+gridInterval;
          url += '&'+dragCtrl.layout.mapId+':grid_interval_y='+gridInterval;
      }
      var printLayers = [];
      var styleLayers = [];
      var opacityLayers = [];
      $.each(map.layers, function(i, l) {
        if (
            l instanceof OpenLayers.Layer.WMS
            || ( l instanceof OpenLayers.Layer.WMTS && !(l.name.lastIndexOf('ign', 0) === 0 ) )
        ){
            if( l.getVisibility() ) {
              // Add layer to the list of printed layers
              printLayers.push(l.params['LAYERS']);
              // Optionnaly add layer style if needed (same order as layers )
              var lst = 'default';
              if ( 'qgisServerVersion' in config.options && config.options.qgisServerVersion.startsWith('3.') ) {
                  lst = '';
              }
              if( 'STYLES' in l.params && l.params['STYLES'].length > 0 )
                lst = l.params['STYLES'];
              styleLayers.push( lst );
              opacityLayers.push(parseInt(255*l.opacity));
            }
        }
      });

      printLayers.reverse();
      styleLayers.reverse();
      opacityLayers.reverse();

      // Get active baselayer, and add the corresponding QGIS layer if needed
      var activeBaseLayerName = map.baseLayer.name;
      if ( activeBaseLayerName in externalBaselayersReplacement ) {
        var exbl = externalBaselayersReplacement[activeBaseLayerName];
        if( exbl in config.layers ) {
            var activeBaseLayerConfig = config.layers[exbl];
            if ( 'id' in activeBaseLayerConfig && 'useLayerIDs' in config.options && config.options.useLayerIDs == 'True' ){
                printLayers.push(activeBaseLayerConfig.id);
            }
            else{
                printLayers.push(exbl);
            }
            if ( 'qgisServerVersion' in config.options && config.options.qgisServerVersion.startsWith('3.') ) {
                styleLayers.push('');
            } else {
                styleLayers.push('default');
            }
            opacityLayers.push(255);
        }
      }

      // Add table vector layer without geom
      if( pTableVectorLayers.length > 0 ) {
          $.each( pTableVectorLayers, function( i, layerId ){
              var aConfig = getLayerConfigById( layerId );
              if( aConfig ) {
                  var layerName = aConfig[0];
                  var layerConfig = aConfig[1];
                  if( ( layerConfig.geometryType == "none" || layerConfig.geometryType == "unknown" || layerConfig.geometryType == "" ) ) {
                      if ( 'shortname' in layerConfig && layerConfig.shortname != '' )
                          printLayers.push(layerConfig.shortname);
                      else
                          printLayers.push(layerConfig.name);
                      if ( 'qgisServerVersion' in config.options &&
                           config.options.qgisServerVersion.startsWith('3.') ) {
                        styleLayers.push('');
                      } else {
                        styleLayers.push('default');
                      }
                      opacityLayers.push(255);
                  }
              }
          });
      }

      if ( 'qgisServerVersion' in config.options && config.options.qgisServerVersion != '2.14' ) {
        printLayers.reverse();
        styleLayers.reverse();
        opacityLayers.reverse();
      }

      url += '&'+dragCtrl.layout.mapId+':LAYERS='+printLayers.join(',');
      url += '&'+dragCtrl.layout.mapId+':STYLES='+styleLayers.join(',');

      if ( dragCtrl.layout.overviewId != null
          && config.options.hasOverview ) {
        var bbox = config.options.bbox;
        var oExtent = new OpenLayers.Bounds(Number(bbox[0]),Number(bbox[1]),Number(bbox[2]),Number(bbox[3]));
        url += '&'+dragCtrl.layout.overviewId+':extent='+oExtent;
        url += '&'+dragCtrl.layout.overviewId+':LAYERS=Overview';
        if ( 'qgisServerVersion' in config.options && config.options.qgisServerVersion != '2.14' ) {
            printLayers.push('Overview');
            if ( config.options.qgisServerVersion.startsWith('3.') ) {
                styleLayers.push('');
            } else {
                styleLayers.push('default');
            }
            opacityLayers.push(255);
        } else {
            printLayers.unshift('Overview');
            styleLayers.unshift('default');
            opacityLayers.unshift(255);
        }
      }
      url += '&LAYERS='+printLayers.join(',');
      url += '&STYLES='+styleLayers.join(',');
      url += '&OPACITIES='+opacityLayers.join(',');
      var labels = $('#print .print-labels').find('input.print-label, textarea.print-label').serialize();
      if ( labels != "" )
        url += '&'+labels;
      var filter = [];
      var selection = [];
      for ( var  lName in config.layers ) {
          var lConfig = config.layers[lName];
          if ( !('request_params' in lConfig)
            || lConfig['request_params'] == null )
              continue;
          var requestParams = lConfig['request_params'];
            if ( ('filtertoken' in lConfig['request_params'])
            && lConfig['request_params']['filtertoken'] != null
            && lConfig['request_params']['filtertoken'] != "" ) {
              filter.push( lConfig['request_params']['filtertoken'] );
          }
          if ( ('selectiontoken' in lConfig['request_params'])
            && lConfig['request_params']['selectiontoken'] != null
            && lConfig['request_params']['selectiontoken'] != "" ) {
              selection.push( lConfig['request_params']['selectiontoken'] );
          }
      }
      if ( filter.length !=0 ){
        url += '&FILTERTOKEN='+ filter.join(';');
      }
      if ( selection.length !=0 )
        url += '&SELECTIONTOKEN='+ selection.join(';');
      window.open(url);
      return false;
    });
    map.events.on({
      "zoomend": function() {
        if ( dragCtrl.active && layer.getVisibility() ) {
            // get scale
            var scale = getPrintScale( printCapabilities.scales );
            // update the select
            $('#print-scale').val(scale);
            // draw print box
            drawPrintBox( dragCtrl.layout, layer, scale );
        }
      }
    });
    lizMap.events.on({
        minidockopened: function(e) {
            if ( e.id == 'print' ) {
                $('#print-template').change();
            }
        },
        minidockclosed: function(e) {
            if ( e.id == 'print' ) {
                dragCtrl.deactivate();
            }
        }
    });
  }

  function addTooltipControl() {
    if ( !config['tooltipLayers'] || config.tooltipLayers.length == 0 ) {
      $('#button-tooltip-layer').parent().remove();
      return false;
    }

    // Verifying WFS layers
    var featureTypes = getVectorLayerFeatureTypes();
    if (featureTypes.length == 0 ) {
      $('#button-tooltip-layer').parent().remove();
      return false;
    }
    var tooltipLayersDic = {};
    for (var lname in config.tooltipLayers) {
        tooltipLayersDic[lizMap.cleanName(lname)] = lname;
    }

    var tooltipLayersSorted = [];

    featureTypes.each( function(){
        var self = $(this);
        var typeName = self.find('Name').text();
        var lname = lizMap.getNameByTypeName( typeName );
        if ( !lname ) {
            if (typeName in config.locateByLayer)
                lname = typeName
            else if ( (typeName in shortNameMap) && (shortNameMap[typeName] in config.locateByLayer))
                lname = shortNameMap[typeName];
            else {
                for (ttl in config.tooltipLayers) {
                    if (ttl.split(' ').join('_') == typeName) {
                        lname = ttl;
                        break;
                    }
                }
            }
        }

        if ( !(lname in config.tooltipLayers) )
            return;

        if ( (lname in config.tooltipLayers) && (lname in config.layers) ) {
            var lConfig = config.layers[lname];
            tooltipLayersSorted[config.tooltipLayers[lname].order] = '<option value="'+lname+'">'+lConfig.title+'</option>';
        }
    });

    // Display layers order as declared in plugin
    for (var i = 0; i < tooltipLayersSorted.length; i++) {
      $('#tooltip-layer-list').append(tooltipLayersSorted[i]);
    }

    if ( $('#tooltip-layer-list').find('option').length == 1 ) {
      $('#button-tooltip-layer').parent().remove();
      return false;
    }

OpenLayers.Control.HighlightFeature = OpenLayers.Class(OpenLayers.Control, {
    /**
     * Constant: EVENT_TYPES
     * {Array(String)} Supported application event types.  Register a listener
     *     for a particular event with the following syntax:
     * (code)
     * control.events.register(type, obj, listener);
     * (end)
     *
     *  - *featureset* Triggered when the mouse is hover a new feature,
     *      i.e. not a previously hover feature.
     *  - *featurereset* Triggered when the mouse becomes no longer hover
     *      a feature.
     */
    EVENT_TYPES: ["featureset","featurereset"],

    /**
     * Property: feature
     * {OpenLayers.Feature} The current highlighted feature the mouse.  Will
     *                      be set to null as soon as the mouse is not hover
     *                      a feature.
     */
    feature: null,

    /**
     * Property: style
     * {OpenLayers.Style}   The style applied to an hover feature
     */
    style: null,

    /**
     * Property: displayPopup
     * {boolean}  Display a popup with all the feature attributes if this
     *            is set to true.  Default true.
     */
    displayPopup: true,

    defaultHandlerOptions: {
        'delay': 0,
        'pixelTolerance': null,
        'stopMove': false
    },

    defaultStyle: {
        'strokeColor' : "red",
        'strokeWidth' : 7
    },

    popupOffset: {
        'left': 45,
        'right': 0,
        'top': 5
    },

    popupTitle: null,

    popupSize: null,

    defaultPopupSize: new OpenLayers.Size(200,325),

    /**
     * Constructor: OpenLayers.Control.HighlightFeature
     * Create a new HighlightFeature feature control.
     *
     * Parameters:
     * layer - {<OpenLayers.Layer.Vector>} Layer that contains features.
     * options - {Object} Optional object whose properties will be set on the
     *     control.
     */
    initialize: function(layers, options) {
        // concatenate events specific to this control with those from the base
        this.EVENT_TYPES =
            OpenLayers.Control.HighlightFeature.prototype.EVENT_TYPES.concat(
            OpenLayers.Control.prototype.EVENT_TYPES
        );
        this.handlerOptions = OpenLayers.Util.extend(
            {}, this.defaultHandlerOptions
        );
        this.style = OpenLayers.Util.extend( {}, this.defaultStyle);
        this.popupSize = OpenLayers.Util.extend( {}, this.defaultPopupSize);

        OpenLayers.Control.prototype.initialize.apply(this, [options]);

        if(this.scope === null) {
            this.scope = this;
        }
        this.initLayer(layers);

        this.handler = new OpenLayers.Handler.Hover(
            this, {
                'move': this.onMove
            },
            this.handlerOptions
        );

        if (!this.popupOffset){
            this.popupOffset = {
                'left': 0,
                'right': 0,
                'top': 0
            };
        } else {
            if (!this.popupOffset.left){
                this.popupOffset.left = 0;
            }
            if (!this.popupOffset.right){
                this.popupOffset.right = 0;
            }
            if (!this.popupOffset.top){
                this.popupOffset.top = 0;
            }
        }
    },

    /**
     * Method: setMap
     * Set the map property for the control. This is done through an accessor
     * so that subclasses can override this and take special action once
     * they have their map variable set.
     *
     * Parameters:
     * map - {<OpenLayers.Map>}
     */
    setMap: function(map) {
        this.map = map;
        if (this.handler) {
            this.handler.setMap(map);
        }
        this.map.events.register("zoomend", this, this.onZoom);
    },

    /**
     * Method: initLayer
     * Assign the layer property. If layers is an array, we need to use
     *     a RootContainer.
     *
     * Parameters:
     * layers - {<OpenLayers.Layer.Vector>}, or an array of vector layers.
     */
    initLayer: function(layers) {
        if(OpenLayers.Util.isArray(layers)) {
            this.layers = layers;
            this.layer = new OpenLayers.Layer.Vector.RootContainer(
                this.id + "_container", {
                    layers: layers
                }
            );
        } else {
            this.layer = layers;
        }
    },

    /**
     * APIMethod: setLayer
     * Attach a new layer to the control, overriding any existing layers.
     *
     * Parameters:
     * layers - Array of {<OpenLayers.Layer.Vector>} or a single
     *     {<OpenLayers.Layer.Vector>}
     */
    setLayer: function(layers) {
        var isActive = this.active;
        this.deactivate();
        if(this.layers) {
            this.layer.destroy();
            this.layers = null;
        }
        this.initLayer(layers);
        if (isActive) {
            this.activate();
        }
    },

    /**
    * Method: onMove
    * While this control is active, on mouse move, check if the mouse is
    * over a feature or was over a feature and is not anymore.
    *
    * Parameters:
    * evt
    */
    onMove: function(evt){
        if (evt.type != "mousemove") {
            return;
        }

        var oFeature = this.layer.getFeatureFromEvent(evt);

        if (this.feature){ // last hover feature exist
            if (oFeature){ // mouse is over a feature
                if (this.feature.fid != oFeature.fid){//are they differents
                    this.resetFeature();
                    this.setFeature(oFeature, evt);
                }
            } else {// mouse is not over a feature, but last hover feature exist
                this.resetFeature();
            }
        } else if (oFeature){ // no last feature and mouse over a feature
            this.setFeature(oFeature, evt);
        }
    },

    /**
    * Method: onZoom
    * If a feature was hover the mouse before a zoom event, the same feature
    * should be set as hover.  The main purpose of this function is to make
    * sure the style is applied after the layer has loaded its features and
    * the popups and events are correctly displayed/triggered.
    *
    * Parameters:
    * evt
    */
    onZoom: function(evt){
        if(this.feature){
            var oFeature = this.feature;
            this.resetFeature();
            // Make sure the hover feature is still among the layer.features
            // before setting it hover again
            if (OpenLayers.Util.indexOf(this.layer.features, oFeature) != -1){
                this.setFeature(oFeature, evt);
            }
        }
    },

    /**
    * Method: setFeature
    * Change the color of current feature over the mouse.  Can display a popup
    * At the same time.  The feature becomes the current feature.
    *
    * Parameters:
    * evt
    */
    setFeature: function(feature, evt){
        var layer = feature.layer;
        layer.drawFeature( feature, this.style );
        if(this.displayPopup){
            this.addInfoPopup(feature, evt);
        }
        var event = {feature: feature};
        this.events.triggerEvent("featureset", event);
        this.feature = feature;
    },

    /**
    * Method: resetFeature
    * Draw this.feature to its original color.  If there was a popup, it's
    * also removed.  this.feature becomes null.
    *
    */
    resetFeature: function(){
        var layer = this.feature.layer;
        if (OpenLayers.Util.indexOf(layer.features,
                                    this.feature) != -1){
            layer.drawFeature(this.feature);
        }
        if(this.displayPopup){
            this.removeInfoPopup(this.feature);
        }
        var event = {feature: this.feature};
        this.events.triggerEvent("featurereset", event);
        this.feature = null;
    },

    /**
     * Method: addInfoPopup
     * Called when a the mouse is over a feature but not selected.  It creates
     * a popup with all feature attributes and is displayed at the left or right
     * of the map depending where the mouse is.  That is why evt is needed.
     *
     * Parameters:
     * feature - {OpenLayers.Feature}
     *
     * evt
     */
    addInfoPopup: function(feature, evt) {
        var szHTML, oPopupPos, oMapExtent, nReso, oPopup, bLeft;

        // feature attributes parsing in html
        szHTML = "<div style='font-size:.8em'><h1>"+this.popupTitle+"</h1>";
        if (!feature.cluster){
            aszAttributes = feature.attributes;
            for(var key in aszAttributes){
                szHTML += key + " : " + aszAttributes[key] + "<br />";
            }
        }
        szHTML +="</div>";

        oMapExtent = this.layer.map.getExtent();
        nReso = this.layer.map.getResolution();

        // calculate where (left or right) the popup will appear
        if(evt.xy){ // if we know the mouse position
            var nMapWidth = this.layer.map.getSize().w;
            var nMouseXPos = evt.xy.x;
            bLeft = nMouseXPos >= (nMapWidth/2);
        } else { // use feature and map center pixel to compare
            var nMapXCenter = this.map.getExtent().getCenterPixel().x;
            var nFeatureXPos = feature.geometry.getBounds().getCenterPixel().x;
            bLeft = nFeatureXPos >= nMapXCenter;
        }

        if(bLeft){ // popup appears top-left position
            oPopupPos = new OpenLayers.LonLat(oMapExtent.left,oMapExtent.top);
            oPopupPos.lon += this.popupOffset.left * nReso;
        } else { // popup appears top-right position
            oPopupPos = new OpenLayers.LonLat(oMapExtent.right,oMapExtent.top);
            oPopupPos.lon -= this.popupOffset.right * nReso;
        }
        oPopupPos.lat -= this.popupOffset.top * nReso;

        oPopup = new OpenLayers.Popup.Anchored(
            "chicken",
            oPopupPos,
            this.popupSize,
            szHTML,
            null, null, null);
        feature.popup = oPopup;
        this.map.addPopup(oPopup);
    },

    /**
     * Method: removeInfoPopup
     * Remove the popup of feature when the mouse is no longer hover it.
     *
     * Parameters:
     * feature - {OpenLayers.Feature}
     */
    removeInfoPopup: function(feature) {
        this.map.removePopup(feature.popup);
        feature.popup.destroy();
        feature.popup = null;
    },

    /**
     * Method: activate
     * Activates the control.
     *
     * Returns:
     * {Boolean} The control was effectively activated.
     */
    activate: function () {
        if (!this.active) {
            if(this.layers) {
                this.map.addLayer(this.layer);
            }
        }
        return OpenLayers.Control.prototype.activate.apply(
            this, arguments
        );
    },

    /**
     * Method: deactivate
     * Deactivates a control and it's associated handler if any.  The exact
     * effect of this depends on the control itself.
     *
     * Returns:
     * {Boolean} True if the control was effectively deactivated or false
     *           if the control was already inactive.
     */
    deactivate: function () {
        if (this.active) {
            if (this.handler) {
                this.handler.deactivate();
            }
            this.active = false;
            if(this.feature){
                this.resetFeature();
            }
            this.events.triggerEvent("deactivate");
            return true;
        }
        return false;
    },
    CLASS_NAME: "OpenLayers.Control.HighlightFeature"
});

    // Define vector layer for tooltip
    var tooltipStyleMap = new OpenLayers.StyleMap({
        'default': new OpenLayers.Style({
            pointRadius: 1,
            strokeColor: "blue",
            strokeWidth: 10,
            strokeOpacity: 0,
            fillOpacity: 0,
            cursor: 'pointer'
        }),
        'selected': new OpenLayers.Style({
            pointRadius: 1,
            strokeColor: "yellow",
            strokeWidth: 10,
            strokeOpacity: 0,
            fillOpacity: 0,
            cursor: 'pointer'
        }),
        'temporary': new OpenLayers.Style({
            pointRadius: 1,
            strokeColor: 'red',
            strokeWidth: 10,
            strokeOpacity: 0,
            fillOpacity: 0,
            cursor: 'pointer'
        })
    });
    var tlayer = new OpenLayers.Layer.Vector('tooltipLayer', {
        styleMap: tooltipStyleMap
    });
    lizMap.map.addLayer(tlayer);
    tlayer.setVisibility(true);

    var tooltipControl = new OpenLayers.Control.HighlightFeature([tlayer],{
        displayPopup: true,
        popupOffset: {
            'left': 45,
            'right': 0,
            'top': 5
        },
        popupTitle: "State information",
        popupSize: new OpenLayers.Size(200,375),
        style:{
            pointRadius: 6,
            strokeColor: "cyan",
            strokeWidth: 3,
            strokeOpacity: 1,
            fillOpacity: 0.2,
            fillColor: "transparent"
        }
    });
    tooltipControl.addInfoPopup = function(feature, evt) {
        var lname = $('#tooltip-layer-list').val();//feature.layer.name.split("@")[1];
        var lconfig = lizMap.config.layers[lname];
        if( !(lname in lizMap.config.layers) )
          return;
        var tconfig = lizMap.config.tooltipLayers[lname];
        var tf = tconfig['fields'].trim();
        var tooltipFields = tf.split(/[\s,]+/);
        var hiddenFields = [];
        if ( 'attributeLayers' in lizMap.config && lname in lizMap.config.attributeLayers ) {
            var attconfig = lizMap.config.attributeLayers[lname];
            var hf = attconfig['hiddenFields'].trim();
            var hiddenFields = hf.split(/[\s,]+/);
        }
        var cAliases = lconfig['alias'];
        var html = '<div id="tooltipPopupContent">';
        html+= '<table class="lizmapPopupTable">';
        for (a in feature.attributes){
            // Do no show hiddenfields
            if( ($.inArray(a, hiddenFields) > -1) )
                continue;
            // show only tootlip fields if some fields given
            if( tf != '' && !($.inArray(a, tooltipFields) > -1) )
                continue;
            html+= '<tr><th>' + cAliases[a] + '</th><td>' + feature.attributes[a] + '</td></tr>';
        }
        html+= '</table>';
        html+= '</div>';

        var oMapExtent = this.layer.map.getExtent();
        var nReso = this.layer.map.getResolution();

        var oPopupPos = new OpenLayers.LonLat(oMapExtent.left,oMapExtent.top);
        oPopupPos.lon += ( $('#dock').width() + this.popupOffset.left ) * nReso;
        var tpopup = new OpenLayers.Popup.Anchored('tooltipPopup',
            oPopupPos,
            null,//new OpenLayers.Size(250,300),
            html,
            {size: {w: 14, h: 14}, offset: {x: -7, y: -7}},
            false
        );
        tpopup.autoSize = true;
        tpopup.backgroundColor = 'transparent';

        feature.popup = tpopup;
        lizMap.map.addPopup( tpopup );
    };

    lizMap.map.addControl(tooltipControl);
    controls['tooltip-layer'] = tooltipControl;

    $('#tooltip-layer button.btn-tooltip-layer-clear').click(function() {
        $('#button-tooltip-layer').click();
        return false;
    });
    $('#tooltip-cancel').click(function() {
      $('#tooltip-layer-list').val('').change();
      return false;
    });
    $('#tooltip-layer-list').change( function() {
        var aName = $(this).val();
        tooltipControl.deactivate();
        tlayer.destroyFeatures();
        if ( aName == '' )
            return;
        $('#tooltip-layer-list').addClass('loading').attr('disabled','');

        // Get selected features
        var selectionLayer = getLayerNameByCleanName( aName );

        if( !selectionLayer )
            selectionLayer = aName;
        var featureid = getVectorLayerSelectionFeatureIdsString( selectionLayer );

        getFeatureData( aName, null, featureid, null, false, null, null,
            function(fName, fFilter, fFeatures, fAliases ){
              // get layer name for config
              if ( !(fName in config.layers) ) {
                  var qgisName = lizMap.getNameByCleanName(aName);
                  if ( qgisName && (qgisName in config.layers)) {
                      fName = qgisName;
                  } else {
                      console.log('getFeatureData: "'+fName+'" and "'+qgisName+'" not found in config');
                      return false;
                  }
              }

              var lConfig = config.layers[fName];
              var tconfig = config.tooltipLayers[fName];

              var gFormat = new OpenLayers.Format.GeoJSON({
                  externalProjection: lConfig['featureCrs'],
                  internalProjection: lizMap.map.getProjection()
              });
              var tfeatures = gFormat.read( {
                  type: 'FeatureCollection',
                  features: fFeatures
              } );
              tlayer.addFeatures( tfeatures );

              if ( ('displayGeom' in tconfig) && tconfig.displayGeom == 'True' )
                  if ( ('colorGeom' in tconfig) && tconfig.colorGeom != '' )
                      tooltipControl.style.strokeColor = tconfig.colorGeom;
                  else
                      tooltipControl.style.strokeColor = 'cyan';
              else
                  tooltipControl.style.strokeColor = 'transparent';
              if ( tfeatures.length != 0 && tfeatures[0].geometry.id.startsWith('OpenLayers_Geometry_LineString') )
                  tooltipControl.style.strokeWidth = 10;
              else
                  tooltipControl.style.strokeWidth = 3;
              tooltipControl.activate();
              $('#tooltip-layer-list').removeClass('loading').removeAttr('disabled');

        });
    });
    $('#tooltip-layer-list').removeClass('loading').removeAttr('disabled');

    lizMap.events.on({
        minidockopened: function(e) {
            if ( e.id == 'tooltip-layer' ) {
              // Load first layer automatically
                $('#tooltip-layer-list').val($("#tooltip-layer-list option:nth-child(2)").val()).change();
            }
        },
        minidockclosed: function(e) {
            if ( e.id == 'tooltip-layer' ) {
              // deactivate tooltip on close
              $('#tooltip-layer-list').val('').change();
              return false;
            }
        }
    });

  }

  function getLayerConfigById( aLayerId, aConfObjet, aIdAttribute ) {
    // Set function parameters if not given
    aConfObjet = typeof aConfObjet !== 'undefined' ?  aConfObjet : config.layers;
    aIdAttribute = typeof aIdAttribute !== 'undefined' ?  aIdAttribute : 'id';

    // Loop through layers to get the one by id
    for ( var lx in aConfObjet ) {
        if ( aConfObjet[lx][aIdAttribute] == aLayerId )
            return [lx, aConfObjet[lx] ];
    }
    return null;
  }


  function addMeasureControls() {
    // style the sketch fancy
    var sketchSymbolizers = {
      "Point": {
        pointRadius: 4,
        graphicName: "square",
        fillColor: "white",
        fillOpacity: 1,
        strokeWidth: 1,
        strokeOpacity: 1,
        strokeColor: "#333333"
      },
      "Line": {
        strokeWidth: 3,
        strokeOpacity: 1,
        strokeColor: "#666666",
        strokeDashstyle: "dash"
      },
      "Polygon": {
        strokeWidth: 2,
        strokeOpacity: 1,
        strokeColor: "#666666",
        strokeDashstyle: "dash",
        fillColor: "white",
        fillOpacity: 0.3
      }
    };
    var style = new OpenLayers.Style();
    style.addRules([
        new OpenLayers.Rule({symbolizer: sketchSymbolizers})
        ]);
    var styleMap = new OpenLayers.StyleMap({"default": style});

    var measureControls = {
      length: new OpenLayers.Control.Measure(
        OpenLayers.Handler.Path, {
          persist: true,
          geodesic: true,
          immediate: true,
          handlerOptions: {
            layerOptions: {
              styleMap: styleMap
            }
          },
          type:OpenLayers.Control.TYPE_TOOL
        }
      ),
      area: new OpenLayers.Control.Measure(
        OpenLayers.Handler.Polygon, {
          persist: true,
          geodesic: true,
          immediate: true,
          handlerOptions: {
            layerOptions: {
              styleMap: styleMap
            }
          },
          type:OpenLayers.Control.TYPE_TOOL
        }
      ),
      perimeter: new OpenLayers.Control.Measure(
        OpenLayers.Handler.Polygon, {
          persist: true,
          geodesic: true,
          immediate: true,
          handlerOptions: {
            layerOptions: {
              styleMap: styleMap
            }
          },
          type:OpenLayers.Control.TYPE_TOOL
        }
      )
    };
    measureControls.length.events.on({
      activate: function(evt) {
        mAddMessage(lizDict['measure.activate.length'],'info',true).attr('id','lizmap-measure-message');
      },
      deactivate: function(evt) {
        $('#lizmap-measure-message').remove();
      }
    });
    measureControls.area.events.on({
      activate: function(evt) {
        mAddMessage(lizDict['measure.activate.area'],'info',true).attr('id','lizmap-measure-message');
      },
      deactivate: function(evt) {
        $('#lizmap-measure-message').remove();
      }
    });
    measureControls.perimeter.measure = function(geometry, eventType) {
        var stat, order;
        if( OpenLayers.Util.indexOf( geometry.CLASS_NAME, 'LineString' ) > -1) {
            stat = this.getBestLength(geometry);
            order = 1;
        } else {
            stat = this.getBestLength(geometry.components[0]);
            order = 1;
        }
        this.events.triggerEvent(eventType, {
            measure: stat[0],
            units: stat[1],
            order: order,
            geometry: geometry
        });
    };
    measureControls.perimeter.events.on({
      activate: function(evt) {
        mAddMessage(lizDict['measure.activate.perimeter'],'info',true).attr('id','lizmap-measure-message');
      },
      deactivate: function(evt) {
        $('#lizmap-measure-message').remove();
      }
    });

    function handleMeasurements(evt) {
      var geometry = evt.geometry;
      var units = evt.units;
      var order = evt.order;
      var measure = evt.measure;
      var out = "";
      if(order == 1) {
        out += lizDict['measure.handle']+" " + measure.toFixed(3) + " " + units;
      } else {
        out += lizDict['measure.handle']+" " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
      }
      var element = $('#lizmap-measure-message');
      if ( element.length == 0 ) {
        element = mAddMessage(out);
        element.attr('id','lizmap-measure-message');
      } else {
        element.html('<p>'+out+'</p>');
      }
    }
    for(var key in measureControls) {
      var control = measureControls[key];
      control.events.on({
        "measure": handleMeasurements,
        "measurepartial": handleMeasurements,
        "activate": function(evt) {
        }
      });
      map.addControl(control);
      controls[key+'Measure'] = control;
    }
    $('#measure-type').change(function() {
        var self = $(this);
        self.find('option').each(function() {
            var val = $( this ).attr('value');
            if ( val in measureControls && measureControls[val].active )
              measureControls[val].deactivate();
        });
        measureControls[self.val()].activate();
    });
    lizMap.events.on({
        minidockopened: function(e) {
            if ( e.id == 'measure' ) {
                $('#measure-type').change();
            }
        },
        minidockclosed: function(e) {
            if ( e.id == 'measure' ) {
                var activeCtrl = '';
                $('#measure-type option').each(function() {
                    var val = $( this ).attr('value');
                    if ( val in measureControls && measureControls[val].active )
                        activeCtrl = val;
                });
                if ( activeCtrl != '' )
                    measureControls[activeCtrl].deactivate();
            }
        }
    });


    $('#measure-stop').click(function(){
      $('#button-measure').click();
    });

    return measureControls;
  }

  function addGeolocationControl() {
    var style = {
      fillColor: '#0395D6',
      fillOpacity: 0.1,
      strokeColor: '#0395D6',
      strokeWidth: 1
    };
    var vector = new OpenLayers.Layer.Vector('geolocation');
    map.addLayer(vector);
    var geolocate = new OpenLayers.Control.Geolocate({
      type: OpenLayers.Control.TYPE_TOGGLE,
      bind: false,
      watch: true,
      layer: vector,
      geolocationOptions: {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 30000
      }
    });
    map.addControl(geolocate);
    var firstGeolocation = true;
    geolocate.events.on({
      "locationupdated": function(evt) {
        if ( this.layer.features.length == 0 ) {
            var circle = new OpenLayers.Feature.Vector(
              OpenLayers.Geometry.Polygon.createRegularPolygon(
                evt.point.clone(),
                evt.position.coords.accuracy/2,
                40,
                0
              ),
              {},
              style
            );
            this.layer.addFeatures([
              new OpenLayers.Feature.Vector(
                evt.point,
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
              circle
            ]);
        } else {
            var point = this.layer.features[0];
            point.geometry.x = evt.point.x;
            point.geometry.y = evt.point.y;
            point.geometry.clearBounds();
            this.layer.drawFeature(point);
            var circle = this.layer.features[1];
            this.layer.destroyFeatures([circle]);
            circle = new OpenLayers.Feature.Vector(
              OpenLayers.Geometry.Polygon.createRegularPolygon(
                evt.point.clone(),
                evt.position.coords.accuracy/2,
                40,
                0
              ),
              {},
              style
            );
            this.layer.addFeatures([circle]);
        }
        if (firstGeolocation) {
          map.zoomToExtent(vector.getDataExtent());
          firstGeolocation = false;
          if ( $('#geolocate-menu-bind').hasClass('active') )
            this.bind = true;
        }
        $('#geolocation .button-bar button').removeAttr('disabled');
      },
      "locationfailed": function(evt) {
        if ( this.layer.features.length == 0 && $('#geolocation-locationfailed').length != 0)
          mAddMessage('<span id="geolocation-locationfailed">'+lizDict['geolocation.failed']+'</span>','error',true);
      },
      "activate": function(evt) {
          $('#geolocation-stop').removeAttr('disabled');
      },
      "deactivate": function(evt) {
        firstGeolocation = true;
        this.bind = false;
        $('#geolocation .button-bar button').attr('disabled','disabled').removeClass('active');
        this.layer.destroyFeatures();
      }
    });
    controls['geolocation'] = geolocate;
    lizMap.events.on({
        minidockopened: function(e) {
            if ( e.id == 'geolocation' ) {
                if (!geolocate.active)
                    geolocate.activate();
            }
        },

        minidockclosed: function(e) {
            if ( e.id == 'geolocation' ) {
                if (geolocate.active && vector.features.length == 0 )
                    geolocate.deactivate();
            }
        }
    });
    $('#geolocation-center').click(function(){
      if ( !geolocate.active )
        return false;

      if (vector.features.length != 0 )
        map.setCenter(vector.getDataExtent().getCenterLonLat());
      return false;
    });
    $('#geolocation-bind').click(function(){
      if ( !geolocate.active )
        return false;
      var self = $(this);
      if ( self.hasClass('active') ) {
        $('#geolocation-center').removeAttr('disabled');
        self.removeClass('active');
        geolocate.bind = false;
      } else {
        self.addClass('active');
        $('#geolocation-center').attr('disabled','disabled');
        geolocate.bind = true;
      }
      return false;
    });
    function stopGeolocation(){
      if ( geolocate.active )
        geolocate.deactivate();
      $('#button-geolocation').click();
      return false;
    }
    $('#geolocation-stop').click(function(){
      stopGeolocation();
      return false;
    });
    $('#geolocation button.btn-geolocation-close').click(function(){
      $('#button-geolocation').click();
      return false;
    });
  }

  /**
   * PRIVATE function: parseData
   * parsing capability
   *
   * Parameters:
   * aData - {String} the WMS capabilities
   *
   * Returns:
   * {Boolean} the capability is OK
   */
  function parseData(aData) {
    var format =  new OpenLayers.Format.WMSCapabilities({version:'1.3.0'});
    var html = "";
    capabilities = format.read(aData);

    var format = new OpenLayers.Format.XML();
    composers = format.read(aData).getElementsByTagName('ComposerTemplate');

    var capability = capabilities.capability;
    if (!capability) {
      $('#map').html('SERVICE NON DISPONIBLE!');
      return false;
    }
    return true;
  }

  /**
   * PRIVATE function: loadProjDefinition
   * load CRS definition and activate it
   *
   * Parameters:
   * aCRS - {String}
   * aCallbalck - {function ( proj )}
   *
   */
  function loadProjDefinition( aCRS, aCallback ) {
    var proj = aCRS.replace(/^\s+|\s+$/g, ''); // trim();
    if ( proj in Proj4js.defs ) {
      aCallback( proj );
    } else {
      $.get( OpenLayers.Util.urlAppend(
          lizUrls.wms
          ,OpenLayers.Util.getParameterString(lizUrls.params)
        ), {
          'REQUEST':'GetProj4'
         ,'authid': proj
        }, function ( aText ) {
          Proj4js.defs[proj] = aText;
          new OpenLayers.Projection(proj);
          aCallback( proj );
        }
      );
    }
  }

  /**
   * PRIVATE function: mCheckMobile
   * Check wether in mobile context.
   *
   *
   * Returns:
   * {Boolean} True if in mobile context.
   */
  function mCheckMobile() {
    var minMapSize = 450;
    var w = $('body').parent()[0].offsetWidth;
    var leftW = w - minMapSize;
    if(leftW < minMapSize || w < minMapSize)
      return true;
    return false;
  }

  /**
   * PRIVATE function: mAddMessage
   * Write message to the UI
   *
   *
   * Returns:
   * {jQuery Object} The message added.
   */
  function mAddMessage( aMessage, aType, aClose ) {
    var mType = 'info';
    var mTypeList = ['info', 'error', 'success'];
    var mClose = false;

    if ( $.inArray(aType, mTypeList) != -1 )
      mType = aType;

    if ( aClose )
      mClose = true;

    var html = '<div class="alert alert-block alert-'+mType+' fade in" data-alert="alert">';
    if ( mClose )
      html += '<a class="close" data-dismiss="alert" href="#">×</a>';
    html += '<p>'+aMessage+'</p>';
    html += '</div>';

    var elt = $(html);
    $('#message').append(elt);
    return elt;
  }

  /**
   * PRIVATE function: exportVectorLayer
   * Write message to the UI
   *
   *
   * Returns:
   * {jQuery Object} The message added.
   */
  function exportVectorLayer( aName, eformat, restrictToMapExtent ) {

      restrictToMapExtent = typeof restrictToMapExtent !== 'undefined' ?  restrictToMapExtent : null;

      // right not set
      if ( !('exportLayers' in lizMap.config.options) || lizMap.config.options.exportLayers != 'True' ) {
        mAddMessage(lizDict['layer.export.right.required'],'error',true);
        return false;
      }

      // Set function parameters if not given
      eformat = typeof eformat !== 'undefined' ?  eformat : 'GeoJSON';

      // Get selected features
      var cleanName = lizMap.cleanName( aName );
      var selectionLayer = getLayerNameByCleanName( cleanName );

      if( !selectionLayer )
        selectionLayer = aName;

      var featureid = getVectorLayerSelectionFeatureIdsString( selectionLayer );

      // Get WFS url and options
      var getFeatureUrlData = getVectorLayerWfsUrl( aName, null, featureid, null, restrictToMapExtent );

      // Force download
      getFeatureUrlData['options']['dl'] = 1;

      // Set export format
      getFeatureUrlData['options']['OUTPUTFORMAT'] = eformat;

      // Build WFS url
      var exportUrl = OpenLayers.Util.urlAppend(
          getFeatureUrlData['url'],
          OpenLayers.Util.getParameterString( getFeatureUrlData['options'] )
      );

      // Open in new window
      window.open( exportUrl );
      return false;
  }

  function getVectorLayerSelectionFeatureIdsString( aName ) {
      var featureidParameter = '';
      if( aName in config.layers && config.layers[aName]['selectedFeatures'] ){
          var fids = [];

          // Get WFS typename
          var configLayer = config.layers[aName];
          var typeName = aName.split(' ').join('_');
          if ( 'shortname' in configLayer && configLayer.shortname != '' )
              typeName = configLayer.shortname;

          for( var id in configLayer['selectedFeatures'] ) {
              fids.push( typeName + '.' + configLayer['selectedFeatures'][id] );
          }
          if( fids.length )
              featureidParameter = fids.join();
      }

      return featureidParameter;
  }

  function getVectorLayerWfsUrl( aName, aFilter, aFeatureId, geometryName, restrictToMapExtent, startIndex, maxFeatures ) {
      var getFeatureUrlData = {};

      // Set function parameters if not given
      aFilter = typeof aFilter !== 'undefined' ?  aFilter : null;
      aFeatureId = typeof aFeatureId !== 'undefined' ?  aFeatureId : null;
      geometryName = typeof geometryName !== 'undefined' ?  geometryName : null;
      restrictToMapExtent = typeof restrictToMapExtent !== 'undefined' ?  restrictToMapExtent : false;
      startIndex = typeof startIndex !== 'undefined' ?  startIndex : null;
      maxFeatures = typeof maxFeatures !== 'undefined' ?  maxFeatures : null;

      // Build WFS request parameters
      if ( !(aName in config.layers) ) {
          var qgisName = lizMap.getNameByCleanName(aName);
          if ( !qgisName || !(qgisName in config.layers))
            qgisName = lizMap.getNameByShortName(aName);
          if ( !qgisName || !(qgisName in config.layers))
            qgisName = lizMap.getNameByTypeName(aName);
          if ( qgisName && (qgisName in config.layers)) {
              aName = qgisName;
          } else {
              console.log('getVectorLayerWfsUrl: "'+aName+'" and "'+qgisName+'" not found in config');
              return false;
          }
      }
      var configLayer = config.layers[aName];
      var typeName = aName.split(' ').join('_');
      if ( 'shortname' in configLayer && configLayer.shortname != '' )
        typeName = configLayer.shortname;
      else if ( 'typename' in configLayer && configLayer.typename != '' )
          typeName = configLayer.typename;
      var layerName = cleanName(aName);

      var wfsOptions = {
          'SERVICE':'WFS'
          ,'VERSION':'1.0.0'
          ,'REQUEST':'GetFeature'
          ,'TYPENAME':typeName
          ,'OUTPUTFORMAT':'GeoJSON'
      };

      if( startIndex )
          wfsOptions['STARTINDEX'] = startIndex;

      if( maxFeatures )
          wfsOptions['MAXFEATURES'] = maxFeatures;

      var filterParam = [];

      if( aFilter ){
          // Remove layerName followed by :
          aFilter = aFilter.replace( aName + ':', '');
          if ( aFilter != '' )
            filterParam.push( aFilter );
      }else{
          // If not filter passed, check if a filter does not exists for the layer
          if( 'request_params' in config.layers[aName] && 'filter' in config.layers[aName]['request_params'] ){
            var aFilter = config.layers[aName]['request_params']['filter'];
            if( aFilter ){
                aFilter = aFilter.replace( aName + ':', '');
                filterParam.push( aFilter );
            }
          }
      }

      // optionnal parameter filterid or EXP_FILTER
      if( aFeatureId )
          wfsOptions['FEATUREID'] = aFeatureId.replace(new RegExp(aName, 'g'), typeName);
      else if( filterParam.length )
          wfsOptions['EXP_FILTER'] = filterParam.join( ' AND ' );


      // Calculate bbox from map extent if needed
      if( restrictToMapExtent ) {
          var extent = map.getExtent().clone();
          var projFeat = new OpenLayers.Projection(config.layers[aName].crs);
          extent = extent.transform( map.getProjection(), projFeat );
          var bbox = extent.toBBOX();
          wfsOptions['BBOX'] = bbox;
      }

      // Optionnal parameter geometryname
      if( geometryName
        && $.inArray( geometryName.toLowerCase(), ['none', 'extent', 'centroid'] ) != -1
      ){
          wfsOptions['GEOMETRYNAME'] = geometryName;
      }

      getFeatureUrlData['url'] = OpenLayers.Util.urlAppend(lizUrls.wms
              ,OpenLayers.Util.getParameterString(lizUrls.params)
      );
      getFeatureUrlData['options'] = wfsOptions;

      return getFeatureUrlData;
  }

    /**
     * storage for callbacks given to getFeatureData
     *
     * used to avoid multiple request for the same feature
     * @type {{}}
     */
  var featureDataPool = {};

  function callFeatureDataCallBacks(poolId, features) {
      var callbacksData = featureDataPool[poolId];
      delete featureDataPool[poolId];
      callbacksData.callbacks.forEach(function(callback) {
          if (callback) {
              callback(callbacksData.layerName, callbacksData.filter, features, callbacksData.alias);
          }
      });
  }

  function getFeatureData(aName, aFilter, aFeatureID, aGeometryName, restrictToMapExtent, startIndex, maxFeatures, aCallBack) {
      // Set function parameters if not given
      aFilter = typeof aFilter !== 'undefined' ?  aFilter : null;
      aFeatureId = typeof aFeatureId !== 'undefined' ?  aFeatureId : null;
      geometryName = typeof geometryName !== 'undefined' ?  geometryName : null;
      restrictToMapExtent = typeof restrictToMapExtent !== 'undefined' ?  restrictToMapExtent : false;
      startIndex = typeof startIndex !== 'undefined' ?  startIndex : null;
      maxFeatures = typeof maxFeatures !== 'undefined' ?  maxFeatures : null;

      // get layer configs
      if ( !(aName in config.layers) ) {
          var qgisName = lizMap.getNameByCleanName(aName);
          if ( !qgisName || !(qgisName in config.layers))
            qgisName = lizMap.getNameByShortName(aName);
          if ( !qgisName || !(qgisName in config.layers))
            qgisName = lizMap.getNameByTypeName(aName);
          if ( qgisName && (qgisName in config.layers)) {
              aName = qgisName;
          } else {
              console.log('getFeatureData: "'+aName+'" and "'+qgisName+'" not found in config');
              return false;
          }
      }
      var aConfig = config.layers[aName];

      $('body').css('cursor', 'wait');

      var getFeatureUrlData = lizMap.getVectorLayerWfsUrl( aName, aFilter, aFeatureID, aGeometryName, restrictToMapExtent, startIndex, maxFeatures );

      // see if a request for the same feature is not already made
      var poolId = getFeatureUrlData['url'] + "|" + JSON.stringify(getFeatureUrlData['options']);
      if (poolId in featureDataPool) {
          // there is already a request, let's store our callback and wait...
          if (aCallBack) {
              featureDataPool[poolId].callbacks.push(aCallBack);
          }
          return;
      }
      // no request yet, let's do it and store the callback and its parameters
      featureDataPool[poolId] = {
          callbacks: [ aCallBack ],
          layerName: aName,
          filter: aFilter,
          alias: aConfig['alias']
      };

      $.post( getFeatureUrlData['url'], getFeatureUrlData['options'], function(data) {

          if( !('featureCrs' in aConfig) )
              aConfig['featureCrs'] = null;
          if( aConfig.crs == 'EPSG:4326' )
              aConfig['featureCrs'] = 'EPSG:4326';

          // verifying the feature CRS
          if( !aConfig.featureCrs && data.features.length != 0) {
              // load projection to be sure to have the definition
              lizMap.loadProjDefinition( aConfig.crs, function( aProj ) {
                  // in QGIS server > 2.14 GeoJSON is in EPSG:4326
                  if ( 'qgisServerVersion' in config.options && config.options.qgisServerVersion != '2.14' )
                      aConfig['featureCrs'] = 'EPSG:4326';
                  else if ( !aConfig.featureCrs )
                      aConfig['featureCrs'] = aConfig.crs;

              });
          }

          if ('alias' in aConfig && aConfig['alias']) {
              callFeatureDataCallBacks(poolId, data.features);
              $('body').css('cursor', 'auto');
          } else {
              var service = OpenLayers.Util.urlAppend(lizUrls.wms
                    ,OpenLayers.Util.getParameterString(lizUrls.params)
              );
              $.post(service, {
                  'SERVICE':'WFS'
                 ,'VERSION':'1.0.0'
                 ,'REQUEST':'DescribeFeatureType'
                 ,'TYPENAME': ('typename' in aConfig) ? aConfig.typename : aName
                 ,'OUTPUTFORMAT':'JSON'
              }, function(describe) {

                  aConfig['alias'] = describe.aliases;
                  if ('types' in describe)
                      aConfig['types'] = describe.types;

                  callFeatureDataCallBacks(poolId, data.features);

                  $('body').css('cursor', 'auto');

              },'json');
           }

      },'json');

      return true;
  }

  function translateWfsFieldValues(aName, fieldName, fieldValue, translation_dict){
    translation_dict = typeof translation_dict !== 'undefined' ?  translation_dict : null;
    return fieldValue;
  }

  function zoomToOlFeature( feature, proj, zoomAction ){
      zoomAction = typeof zoomAction !== 'undefined' ?  zoomAction : 'zoom';
      var format = new OpenLayers.Format.GeoJSON();
      var feat = format.read(feature)[0];
      if( feat && 'geometry' in feat ){
          feat.geometry.transform( proj, lizMap.map.getProjection() );

          // Zoom or center to selected feature
          if( zoomAction == 'zoom' )
              map.zoomToExtent(feat.geometry.getBounds());
          if( zoomAction == 'center' ){
              var lonlat = feat.geometry.getBounds().getCenterLonLat()
              map.setCenter(lonlat);
          }
      }
  }

  function zoomToFeature( featureType, fid, zoomAction ){
      zoomAction = typeof zoomAction !== 'undefined' ?  zoomAction : 'zoom';

      var layerConfig = config.layers[featureType];
      var featureId = featureType + '.' + fid;

      var proj = new OpenLayers.Projection(config.layers[featureType].crs);
      if( config.layers[featureType].featureCrs )
          proj = new OpenLayers.Projection(config.layers[featureType].featureCrs);
      getLayerFeature(featureType, fid, function(feat) {
          zoomToOlFeature( feat, proj, zoomAction );
      });
  }

  function getLayerFeature( featureType, fid, aCallback, aCallbackNotfound, forceToLoad ){
      if ( !aCallback )
          return;
      if ( !(featureType in config.layers) )
          return;

      var layerConfig = config.layers[featureType];
      var featureId = featureType + '.' + fid;

      // Use already retrieved feature
      if(!forceToLoad && layerConfig['features'] && fid in layerConfig['features'] ){
          aCallback(layerConfig['features'][fid]);
      }
      // Or get the feature via WFS in needed
      else{
          getFeatureData(featureType, null, featureId, 'extent', false, null, null,
              function( aName, aFilter, cFeatures, cAliases ){

              if (cFeatures.length == 1) {
                  var feat = cFeatures[0];
                  if( !layerConfig['features'] ) {
                      layerConfig['features'] = {};
                  }
                  layerConfig['features'][fid] = feat;
                  aCallback(feat);
              }
              else if(aCallbackNotfound) {
                  aCallbackNotfound(featureType, fid);
              }
          });
      }
  }

  function getVectorLayerFeatureTypes() {
      if ( wfsCapabilities == null )
          return [];
      return wfsCapabilities.find('FeatureType');
  }

  function getVectorLayerResultFormat() {
      if ( wfsCapabilities == null )
          return [];
      return wfsCapabilities.find('Capability > Request > GetFeature > ResultFormat > *');
  }


  function getFeaturePopupContent( aName, feat, aCallback) {
      // Only use this functino with callback
      if ( !aCallback )
          return;

      // Only use when feat is set
      if( !feat )
          return false;

      // Remove map popup to avoid confusion
      if (lizMap.map.popups.length != 0)
          lizMap.map.removePopup( lizMap.map.popups[0] );

      // Get popup content by FILTER and not with virtual click on map
      var filter = '';
      var qgisName = aName;
      if( lizMap.getLayerNameByCleanName(aName) ){
          qgisName = lizMap.getLayerNameByCleanName(aName);
      }

      var pkey = null;
      // Get primary key with attributelayer options
      if( (qgisName in lizMap.config.attributeLayers) ){
          pkey = lizMap.config.attributeLayers[qgisName]['primaryKey'];
      }

      // Test if primary key is set in the atlas tool
      if( !pkey && 'atlasLayer' in lizMap.config.options && 'atlasPrimaryKey' in lizMap.config.options ){
        var layerConfig = lizMap.config.layers[qgisName];
        if( layerConfig.id == lizMap.config.options['atlasLayer'] && lizMap.config.options['atlasPrimaryKey'] != '' ){
          pkey = lizMap.config.options['atlasPrimaryKey'];
        }
      }
      if( !pkey )
          return false;

      var pkVal = feat.properties[pkey];
      filter = qgisName + ':"' + pkey + '" = ' + "'" + pkVal + "'" ;

      var crs = 'EPSG:4326';
      if(('crs' in lizMap.config.layers[qgisName]) && lizMap.config.layers[qgisName].crs != ''){
          crs = lizMap.config.layers[qgisName].crs;
      }

      var wmsOptions = {
           'LAYERS': aName
          ,'QUERY_LAYERS': aName
          ,'STYLES': ''
          ,'SERVICE': 'WMS'
          ,'VERSION': '1.3.0'
          ,'CRS': crs
          ,'REQUEST': 'GetFeatureInfo'
          ,'EXCEPTIONS': 'application/vnd.ogc.se_inimage'
          ,'INFO_FORMAT': 'text/html'
          ,'FEATURE_COUNT': 1
          ,'FILTER': filter
      };

      // Query the server
      var service = OpenLayers.Util.urlAppend(lizUrls.wms
          ,OpenLayers.Util.getParameterString(lizUrls.params)
      );
      $.post(service, wmsOptions, function(data) {
          aCallback(data);
      });

  }

  // Get the popup content for a layer given a feature
  function getFeaturePopupContentByFeatureIntersection(aName, feat, aCallback) {

    // Calculate fake bbox around the feature
    var units = lizMap.map.getUnits();
    var lConfig = lizMap.config.layers[aName];
    if( lizMap.map.maxScale == 'auto' )
      var scale = lConfig.minScale;
    else
      var scale = Math.max( lizMap.map.maxScale, lConfig.minScale );
    scale = scale * 2;
    var res = OpenLayers.Util.getResolutionFromScale(scale, units);

    var geomType = feat.geometry.CLASS_NAME;
    if (
      geomType == 'OpenLayers.Geometry.Polygon'
      || geomType == 'OpenLayers.Geometry.MultiPolygon'
      || geomType == 'OpenLayers.Geometry.Point'
    ) {
      var lonlat = feat.geometry.getBounds().getCenterLonLat()
    }
    else {
      var vert = feat.geometry.getVertices();
      var middlePoint = vert[Math.floor(vert.length/2)];
      var lonlat = new OpenLayers.LonLat(middlePoint.x, middlePoint.y);
    }

    // Calculate fake bbox
    var bbox = new OpenLayers.Bounds(
      lonlat.lon - 5 * res,
      lonlat.lat - 5 * res,
      lonlat.lon + 5 * res,
      lonlat.lat + 5 * res
    );

    var gfiCrs = lizMap.map.getProjectionObject().toString();
    if ( gfiCrs == 'EPSG:900913' )
      gfiCrs = 'EPSG:3857';

    var wmsOptions = {
       'LAYERS': aName
      ,'QUERY_LAYERS': aName
      ,'STYLES': ''
      ,'SERVICE': 'WMS'
      ,'VERSION': '1.3.0'
      ,'REQUEST': 'GetFeatureInfo'
      ,'EXCEPTIONS': 'application/vnd.ogc.se_inimage'
      ,'BBOX': bbox.toBBOX()
      ,'FEATURE_COUNT': 10
      ,'HEIGHT': 100
      ,'WIDTH': 100
      ,'INFO_FORMAT': 'text/html'
      ,'CRS': gfiCrs
      ,'I': 50
      ,'J': 50
    };

    // Query the server
    var service = OpenLayers.Util.urlAppend(lizUrls.wms
      ,OpenLayers.Util.getParameterString(lizUrls.params)
    );
    $.post(service, wmsOptions, function(data) {
      if(aCallback){
        aCallback(service, wmsOptions, data);
      }
    });
  }

  // Create new dock or minidock
  // Example : lizMap.addDock('mydock', 'My dock title', 'dock', 'Some content', 'icon-pencil');
  // see icon list here : http://getbootstrap.com/2.3.2/base-css.html#icons
  function addDock( dname, dlabel, dtype, dcontent, dicon){
      // First check if this dname already exists
      if( $('#mapmenu .nav-list > li.'+dname+' > a').length ){
          console.log(dname + ' menu item already exists');
          return;
      }

      // Create menu icon for activating dock
      var dockli = '';
      dockli+='<li class="'+dname+' nav-'+dtype+'">';
      dockli+='   <a id="button-'+dname+'" rel="tooltip" data-original-title="'+dlabel+'" data-placement="right" href="#'+dname+'" data-container="#content">';
      dockli+='       <span class="icon"><i class="'+dicon+' icon-white"></i></span>';
      dockli+='   </a>';
      dockli+='</li>';
      $('#mapmenu div ul li.nav-'+dtype+':last').after(dockli);
      if ( $('#mapmenu div ul li.nav-'+dtype+'.'+dname).length == 0 )
        $('#mapmenu div ul li:last').after(dockli);

      //  Remove native lizmap icon
      $('#mapmenu .nav-list > li.'+dname+' > a .icon').css('background-image','none');
      $('#mapmenu .nav-list > li.'+dname+' > a .icon >i ').css('margin-left', '4px');

      // Add tooltip
      $('#mapmenu .nav-list > li.'+dname+' > a').tooltip();

      // Create dock tab content
      var docktab = '';
      docktab+='<div class="tab-pane" id="'+dname+'">';
      if( dtype == 'minidock'){
          docktab+='<div class="mini-dock-close" title="close" style="padding:7px;float:right;cursor:pointer;"><i class="icon-remove icon-white"></i></div>';
          docktab+='    <div class="'+dname+'">';
          docktab+='        <h3>';
          docktab+='            <span class="title">';
          docktab+='              <i class="'+dicon+' icon-white"></i>';
          docktab+='              <span class="text">&nbsp;'+dlabel+'&nbsp;</span>';
          docktab+='            </span>';
          docktab+='        </h3>';
      }
      docktab+='        <div class="menu-content">';
      docktab+= dcontent;
      docktab+='        </div>';
      docktab+='    </div>';
      docktab+='</div>';
      if( dtype == 'minidock'){
          $('#mini-dock-content').append(docktab);
          $('#'+dname+' div.mini-dock-close').click(function(){
            if( $('#mapmenu .nav-list > li.'+dname).hasClass('active') ){
                $('#button-'+dname).click();
            }
          });
      }
      else if( dtype == 'right-dock' )
          $('#right-dock-content').append(docktab);
      else if( dtype == 'dock' )
          $('#dock-content').append(docktab);
      else if( dtype == 'bottomdock' )
          $('#bottom-dock-content').append(docktab);

      // Create dock tab li
      var docktabli = '';
      docktabli+= '<li id="nav-tab-'+dname+'"><a href="#'+dname+'" data-toggle="tab">'+dlabel+'</a></li>';
      if( dtype == 'minidock')
          $('#mini-dock-tabs').append(docktabli);
      else if( dtype == 'right-dock' )
          $('#right-dock-tabs').append(docktabli);
      else if( dtype == 'dock' )
          $('#dock-tabs').append(docktabli);
      else if( dtype == 'bottomdock' )
          $('#bottom-dock-tabs').append(docktabli);

  }

  /**
   * PRIVATE function: getFeatureInfoTolerances
   * Get tolerances for point, line and polygon
   * as configured with lizmap plugin, or default
   * if no configuration found.
   * Returns:
   * {Object} The tolerances for point, line and polygon
   */
  function getFeatureInfoTolerances(){

    var tolerances = defaultGetFeatureInfoTolerances;
    if( 'pointTolerance' in config.options
        && 'lineTolerance' in config.options
        && 'polygonTolerance' in config.options
    ){
      tolerances = {
        'FI_POINT_TOLERANCE': config.options.pointTolerance,
        'FI_LINE_TOLERANCE': config.options.lineTolerance,
        'FI_POLYGON_TOLERANCE': config.options.polygonTolerance
      };
    }
    return tolerances;

  }

  /* PRIVATE function: isHighDensity
   * Return True when the screen is of high density
   * Returns:
   * Boolean
   */
  function isHighDensity(){
    return ((window.matchMedia && (window.matchMedia('only screen and (min-resolution: 124dpi), only screen and (min-resolution: 1.3dppx), only screen and (min-resolution: 48.8dpcm)').matches || window.matchMedia('only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (min-device-pixel-ratio: 1.3)').matches)) || (window.devicePixelRatio && window.devicePixelRatio > 1.3));
  }

  // creating the lizMap object
  var obj = {
    /**
     * Property: map
     * {<OpenLayers.Map>} The map
     */
    map: null,
    /**
     * Property: layers
     * {Array(<OpenLayers.Layer>)} The layers
     */
    layers: null,
    /**
     * Property: baselayers
     * {Array(<OpenLayers.Layer>)} The base layers
     */
    baselayers: null,
    /**
     * Property: events
     * {<OpenLayers.Events>} An events object that handles all
     *                       events on the lizmap
     */
    events: null,
    /**
     * Property: config
     * {Object} The map config
     */
    config: null,
    /**
     * Property: dictionnary
     * {Object} The map dictionnary
     */
    dictionary: null,
    /**
     * Property: tree
     * {Object} The map tree
     */
    tree: null,
    /**
     * Property: lizmapLayerFilterActive
     * {Object} Contains main filtered layer if filter is active
     */
    lizmapLayerFilterActive: null,

    /**
     * Method: checkMobile
     */
    checkMobile: function() {
      return mCheckMobile();
    },

    /**
     * Method: cleanName
     */
    cleanName: function( aName ) {
      return cleanName( aName );
    },

    /**
     * Method: getNameByCleanName
     */
    getNameByCleanName: function( cleanName ) {
      return getNameByCleanName( cleanName );
    },

    /**
     * Method: getNameByShortName
     */
    getNameByShortName: function( shortName ) {
      return getNameByShortName( shortName );
    },

    /**
     * Method: getNameByTypeName
     */
    getNameByTypeName: function( typeName ) {
      return getNameByTypeName( typeName );
    },

    /**
     * Method: getLayerNameByCleanName
     */
    getLayerNameByCleanName: function( cleanName ) {
      return getLayerNameByCleanName( cleanName );
    },

    /**
     * Method: getDockRightPosition
     */
    getDockRightPosition: function( ) {
      return getDockRightPosition( );
    },

    /**
     * Method: addMessage
     */
    addMessage: function( aMessage, aType, aClose ) {
      return mAddMessage( aMessage, aType, aClose );
    },

    /**
     * Method: updateSwitcherSize
     */
    updateSwitcherSize: function() {
      return updateSwitcherSize();
    },

    /**
     * Method: updateMiniDockSize
     */
    updateMiniDockSize: function() {
      return updateMiniDockSize();
    },

    /**
     * Method: transformBounds
     */
    loadProjDefinition: function( aCRS, aCallback ) {
      return loadProjDefinition( aCRS, aCallback );
    },


    /**
     * Method: updateContentSize
     */
    updateContentSize: function() {
      return updateContentSize();
    },


    /**
     * Method: getLayerFeature
     */
    getLayerFeature: function( featureType, fid, aCallback, aCallbackNotfound, forceToLoad ) {
      getLayerFeature( featureType, fid, aCallback, aCallbackNotfound, forceToLoad );
    },

    /**
     * Method: getFeatureData
     */
    getFeatureData: function(aName, aFilter, aFeatureID, aGeometryName, restrictToMapExtent, startIndex, maxFeatures, aCallBack) {
      getFeatureData(aName, aFilter, aFeatureID, aGeometryName, restrictToMapExtent, startIndex, maxFeatures, aCallBack);
    },

    /**
     * Method: translateWfsFieldValues
     */
    translateWfsFieldValues: function(aName, fieldName, fieldValue, translation_dict) {
      return translateWfsFieldValues(aName, fieldName, fieldValue, translation_dict);
    },

    /**
     * Method: zoomToFeature
     */
    zoomToFeature: function( featureType, fid, zoomAction ) {
      zoomToFeature( featureType, fid, zoomAction );
    },


    /**
     * Method: getPrintGridInterval
     */
    getPrintGridInterval: function(aLayout, aScale, aScales) {
      return getPrintGridInterval(aLayout, aScale, aScales);
    },


    /**
     * Method: getPrintCapabilities
     */
    getPrintCapabilities: function() {
      return printCapabilities;
    },


    /**
     * Method: getExternalBaselayersReplacement
     */
    getExternalBaselayersReplacement: function() {
      return externalBaselayersReplacement;
    },

    /**
     * Method: launchTooltipLayer
     */
    launchTooltipLayer: function( aLayerName ) {
        var tlOptions = $('#tooltip-layer-list option[value="'+aLayerName+'"]');
        if ( tlOptions.length == 1 && $('#tooltip-layer-list').val() != aLayerName)
            $('#tooltip-layer-list').val( aLayerName ).change();
        else if ( tlOptions.length != 1 && $('#tooltip-layer-list').val() != '' )
            $('#tooltip-layer-list').val('').change();
        return ($('#tooltip-layer-list').val() == aLayerName);
    },


    launchEdition: function( aLayerId, aFid) {
        return false;
    },

    deleteEditionFeature: function( aLayerId, aFid, aMessage, aCallback ){
        return false;
    },

    deactivateToolControls: function( evt ) {
      return deactivateToolControls( evt );
    },

    /**
     * Method: exportVectorLayer
     */
    exportVectorLayer: function( aName, eformat, restrictToMapExtent ) {
      return exportVectorLayer( aName, eformat, restrictToMapExtent );
    },

    /**
     * Method: getVectorLayerWfsUrl
     */
    getVectorLayerWfsUrl: function( aName, aFilter, aFeatureId, geometryName, restrictToMapExtent ) {
      return getVectorLayerWfsUrl( aName, aFilter, aFeatureId, geometryName, restrictToMapExtent );
    },

    /**
     * Method: getVectorLayerFeatureType
     */
    getVectorLayerFeatureTypes: function() {
      return getVectorLayerFeatureTypes();
    },

    /**
     * Method: getVectorLayerResultFormat
     */
    getVectorLayerResultFormat: function() {
      return getVectorLayerResultFormat();
    },

    /**
     * Method: getLayerConfigById
     */
    getLayerConfigById: function( aLayerId, aConfObjet, aIdAttribute ) {
      return getLayerConfigById( aLayerId, aConfObjet, aIdAttribute );
    },

    /**
     * Method: getFeaturePopupContent
     */
    getFeaturePopupContent: function( aName, feat, aCallback) {
      return getFeaturePopupContent(aName, feat, aCallback);
    },

    /**
     * Method: getFeaturePopupContentByFeatureIntersection
     */
    getFeaturePopupContentByFeatureIntersection: function( aName, feat, aCallback) {
      return getFeaturePopupContentByFeatureIntersection(aName, feat, aCallback);
    },

    /**
     * Method: addGeometryFeatureInfo
     */
    addGeometryFeatureInfo: function(popup, containerId){
      return addGeometryFeatureInfo(popup, containerId);
    },

    /**
     * Method: addChildrenFeatureInfo
     */
    addChildrenFeatureInfo: function(popup, containerId){
      return addChildrenFeatureInfo(popup, containerId);
    },

    /**
     * Method: addChildrenDatavizFilteredByPopupFeature
     */
    addChildrenDatavizFilteredByPopupFeature: function(popup, containerId){
      return addChildrenDatavizFilteredByPopupFeature(popup, containerId);
    },

    /**
     * Method: addDock
     */
    addDock: function( dname, dlabel, dtype, dcontent, dicon){
      return addDock(dname, dlabel, dtype, dcontent, dicon);
    },

    /**
     * Method: init
     */
    init: function() {
      var self = this;
      //get config
      $.getJSON(lizUrls.config,lizUrls.params,function(cfgData) {
        config = cfgData;
        config.options.hasOverview = false;

        // store layerIDs
        if ( 'useLayerIDs' in config.options && config.options.useLayerIDs == 'True' ) {
            for ( var layerName in config.layers ) {
                var configLayer = config.layers[layerName];
                layerIdMap[configLayer.id] = layerName;
            }
        }
        // store shortnames and shortnames
        for ( var layerName in config.layers ) {
            var configLayer = config.layers[layerName];
            if ( 'shortname' in configLayer && configLayer.shortname != '' )
                shortNameMap[configLayer.shortname] = layerName;
            configLayer.cleanname = cleanName(layerName);
        }

         //get capabilities
        var service = _util_js__WEBPACK_IMPORTED_MODULE_0__["default"].urlAppend(lizUrls.wms
          ,_util_js__WEBPACK_IMPORTED_MODULE_0__["default"].getParameterString(lizUrls.params)
        );
        $.get(service
          ,{SERVICE:'WMS',REQUEST:'GetCapabilities',VERSION:'1.3.0'}
          ,function(data) {
        $.get(service
          ,{SERVICE:'WMTS',REQUEST:'GetCapabilities',VERSION:'1.0.0'}
          ,function(wmtsCapaData) {
        $.get(service
          ,{SERVICE:'WFS',REQUEST:'GetCapabilities',VERSION:'1.0.0'}
          ,function(wfsCapaData) {

            //parse capabilities
            if (!parseData(data))
                return true;

            var wmtsFormat = new OpenLayers.Format.WMTSCapabilities({});
            wmtsCapabilities = wmtsFormat.read( wmtsCapaData );
            if ( 'exceptionReport' in wmtsCapabilities ) {
                wmtsElem = $('#metadata-wmts-getcapabilities-url');
                if ( wmtsElem.length != 0 ) {
                    wmtsElem.before('<i title="'+wmtsCapabilities.exceptionReport.exceptions[0].texts[0]+'" class="icon-warning-sign"></i>&nbsp;');
                }
                wmtsCapabilities = null;
            }

            wfsCapabilities = $(wfsCapaData);
            var featureTypes = getVectorLayerFeatureTypes();
            featureTypes.each( function(){
                var typeName = $(this).find('Name').text();
                var layerName = lizMap.getNameByTypeName( typeName );
                if ( !layerName ) {
                    if (typeName in config.layers)
                      layerName = typeName
                    else if ( (typeName in shortNameMap) && (shortNameMap[typeName] in config.layers))
                      layerName = shortNameMap[typeName];
                    else {
                      for (l in config.layers) {
                        if (l.split(' ').join('_') == typeName) {
                          layerName = l;
                          break;
                        }
                      }
                    }
                }

                if ( !(layerName in config.layers) )
                    return;

                var configLayer = config.layers[layerName];
                configLayer.typename = typeName;
                typeNameMap[typeName] = layerName;
            } );

          //set title and abstract coming from capabilities
          $('#abstract').html(capabilities.abstract ? capabilities.abstract : '');

          // get and analyse tree
          var capability = capabilities.capability;
          beforeLayerTreeCreated();
          var firstLayer = capability.nestedLayers[0];
          getLayerTree(firstLayer,tree);
          analyseNode(tree);
          self.config = config;
          self.tree = tree;
          self.events.triggerEvent("treecreated", self);

          // create the map
          initProjections(firstLayer);
          createMap();
          self.map = map;
          self.layers = layers;
          self.baselayers = baselayers;
          self.controls = controls;
          self.events.triggerEvent("mapcreated", self);

          // create the switcher
          createSwitcher();
          self.events.triggerEvent("layersadded", self);


          // Verifying z-index
          var lastLayerZIndex = map.layers[map.layers.length-1].getZIndex();
          if ( lastLayerZIndex > map.Z_INDEX_BASE['Feature'] - 100 ) {
            map.Z_INDEX_BASE['Feature'] = lastLayerZIndex + 100;
            map.Z_INDEX_BASE['Popup'] = map.Z_INDEX_BASE['Feature'] + 25;
            if ( map.Z_INDEX_BASE['Popup'] > map.Z_INDEX_BASE['Control'] - 25 )
                map.Z_INDEX_BASE['Control'] = map.Z_INDEX_BASE['Popup'] + 25;
          }

          // initialize the map
          // Set map extent depending on options
          var verifyingVisibility = true;
          var hrefParam = OpenLayers.Util.getParameters(window.location.href);
          if (!map.getCenter()) {
            if ( hrefParam.bbox || hrefParam.BBOX ) {
                var hrefBbox = null;
                if ( hrefParam.bbox )
                  hrefBbox = OpenLayers.Bounds.fromArray( hrefParam.bbox );
                if ( hrefParam.BBOX )
                  hrefBbox = OpenLayers.Bounds.fromArray( hrefParam.BBOX );

                if ( hrefParam.crs && hrefParam.crs != map.getProjection() )
                  hrefBbox.transform( hrefParam.crs, map.getProjection() )
                if ( hrefParam.CRS && hrefParam.CRS != map.getProjection() )
                  hrefBbox.transform( hrefParam.CRS, map.getProjection() )
                if( map.restrictedExtent.containsBounds( hrefBbox ) )
                  map.zoomToExtent( hrefBbox, true );
                else {
                  var projBbox = $('#metadata .bbox').text();
                  projBbox = OpenLayers.Bounds.fromString(projBbox);
                  if( projBbox.containsBounds( hrefBbox ) ) {
                      var projProj = $('#metadata .proj').text();
                      loadProjDefinition( projProj, function( aProj ) {
                          hrefBbox.transform( aProj, map.getProjection() );
                          map.zoomToExtent( hrefBbox, true );
                      });
                  } else {
                    map.zoomToExtent(map.initialExtent);
                  }
                }
            } else {
              map.zoomToExtent(map.initialExtent);
            }
            verifyingVisibility = false;
          }

          updateContentSize();
          map.events.triggerEvent("zoomend",{"zoomChanged": true});

          // create overview if 'Overview' layer
          createOverview();

          // create navigation and toolbar
          createNavbar();
          createToolbar();
          self.events.triggerEvent("toolbarcreated", self);

          // create permalink
          createPermalink();

          // Toggle OpenLayers visibility to true for legend checkboxes
          // 1/ Check permalink is used or not
          var layersHaveBeenActivatedByPermalink = false;
          var uparams = getUrlParameters();
          if( 'layers' in uparams ) {
            var players = uparams.layers;
            for( var i=0; i < map.layers.length; i++){
              var l = map.layers[i];
              var lbase = l.isBaseLayer;
              if( !lbase ){
                if ( players[i] == 'T' ){
                  layersHaveBeenActivatedByPermalink = true;
                  l.setVisibility(true);
                }
              }
            }
            runPermalink( uparams );
          }

          // 2/ Toggle checkboxes
          $('#switcher button.checkbox[name="layer"]').each(function(){
            var cb = $(this);
            var cleanName = cb.val();
            var oLayer = map.getLayersByName(cleanName)[0];
            if( oLayer ){
              // toggle checked class for permalink layers
              // because OL has already drawn them in map
              cb.toggleClass('checked', oLayer.visibility);

              // Check layers wich are not yet checked but need to ( for normal behaviour outside permalink )
              // This will trigger layers to be drawn
              if( !cb.hasClass('checked') && oLayer.isVisible && !layersHaveBeenActivatedByPermalink){
                cb.click();
              }
            }

          });

          // verifying the layer visibility for permalink
          if (verifyingVisibility) {
            map.getControlsByClass('OpenLayers.Control.ArgParser')[0].configureLayers();
            for (var i=0,len=layers.length; i<len; i++) {
              var l = layers[i];
              var btn = $('#switcher button.checkbox[name="layer"][value="'+l.name+'"]');
              if ( (hrefParam.layers && l.getVisibility() != btn.hasClass('checked') ) )
                $('#switcher button.checkbox[name="layer"][value="'+l.name+'"]').click();
            }
          }

          // checked all toggled layer
          $('#switcher button.checkbox.disabled[name="layer"]:not(.checked)').each(function(){
            var cb = $(this);
            var cleanName = cb.val();
            var name = cleanName;
            if ( cleanName in cleanNameMap )
                name = getLayerNameByCleanName(cleanName);
            if ( name in config.layers ) {
                var layerConfig = config.layers[name];
                if ( layerConfig.toggled == "True" )
                    cb.addClass('checked');
            }
          });

          // finalize slider
          $('#navbar div.slider').slider("value",map.getZoom());
          map.events.on({
            zoomend : function() {
              // Update legends
              $('#switcher table.tree tr.legendGraphics.initialized').each(function() {
                var self = $(this);
                var name = self.attr('id').replace('legend-','');
                var url = getLayerLegendGraphicUrl(name, true);
                if ( url != null && url != '' ) {
                    // Change image attribute data-src
                    self.find('div.legendGraphics img').attr( 'data-src', url );
                    // Only change image attribute src if legend is displayed
                    if( self.hasClass('visible') ){
                        self.find('div.legendGraphics img').attr( 'src', url );
                    }
                }
              });
              // update slider position
              $('#navbar div.slider').slider("value", this.getZoom());
            }
          });

          // Connect signal/slot when layer style is changed
          lizMap.events.on({
            'layerstylechanged': function(evt){

              // Change legend data-src and legend src if legend is visible
              var name = evt.featureType;
              var url = getLayerLegendGraphicUrl(name, true);
              if ( url != null && url != '' ) {
                  var lSel = '#switcher table.tree tr#legend-' + name + ' div.legendGraphics img' ;
                  $(lSel).attr('data-src',url);
                  if( $('#switcher table.tree tr#legend-' + name).hasClass('visible') )
                      $(lSel).attr('src',url);
              }
            }
          });

          // Toggle locate
          $('#mapmenu ul').on('click', 'li.nav-minidock > a', function(){
            var self = $(this);
            var parent = self.parent();
            var id = self.attr('href').substr(1);
            var tab = $('#nav-tab-'+id);
            if ( parent.hasClass('active') ) {
                $('#'+id).removeClass('active');
                tab.removeClass('active');
                parent.removeClass('active');
                lizMap.events.triggerEvent( "minidockclosed", {'id':id} );
            } else {
                var oldActive = $('#mapmenu li.nav-minidock.active');
                if ( oldActive.length != 0 ) {
                    oldActive.removeClass('active');
                    lizMap.events.triggerEvent( "minidockclosed", {'id': oldActive.children('a').first().attr('href').substr(1) } );
                }
                tab.children('a').first().click();
                parent.addClass('active');
                lizMap.events.triggerEvent( "minidockopened", {'id':id} );
                updateMiniDockSize();
            }
            self.blur();

            return false;
          });

          // Show locate by layer
          if ( !('locateByLayer' in config) )
            $('#button-locate').parent().hide();
          else
            $('#button-locate').click();

          // hide mini-dock if no tool is active
          if ( $('#mapmenu ul li.nav-minidock.active').length == 0 ) {
              $('#mini-dock-content > .tab-pane.active').removeClass('active');
              $('#mini-dock-tabs li.active').removeClass('active');
          }

          $('#mapmenu ul').on('click', 'li.nav-dock > a', function(){
            var self = $(this);
            var parent = self.parent();
            var id = self.attr('href').substr(1);
            var tab = $('#nav-tab-'+id);
            var lizmapEvent = '';
            if ( parent.hasClass('active') ) {
                $('#'+id).removeClass('active');
                tab.removeClass('active');
                parent.removeClass('active');
                lizmapEvent = 'dockclosed';
            } else {
                var oldActive = $('#mapmenu li.nav-dock.active');
                if ( oldActive.length != 0 ) {
                    oldActive.removeClass('active');
                    lizMap.events.triggerEvent( "dockclosed", {'id': oldActive.children('a').first().attr('href').substr(1) } );
                }
                tab.show();
                tab.children('a').first().click();
                parent.addClass('active');
                lizmapEvent = 'dockopened';
            }
            self.blur();

            var dock = $('#dock');
            if ( $('#dock-tabs .active').length == 0 )
              dock.hide();
            else if ( !dock.is(':visible') )
              dock.show();

            // trigger event
            if ( lizmapEvent != '' )
                lizMap.events.triggerEvent( lizmapEvent, {'id':id} );

            return false;
          });

          $('#mapmenu ul').on('click', 'li.nav-right-dock > a', function(){
            var self = $(this);
            var parent = self.parent();
            var id = self.attr('href').substr(1);
            var tab = $('#nav-tab-'+id);
            var lizmapEvent = '';
            if ( parent.hasClass('active') ) {
                $('#'+id).removeClass('active');
                tab.removeClass('active');
                parent.removeClass('active');
                var lizmapEvent = 'rightdockclosed';
            } else {
                var oldActive = $('#mapmenu li.nav-right-dock.active');
                if ( oldActive.length != 0 ) {
                    oldActive.removeClass('active');
                    lizMap.events.triggerEvent( "rightdockclosed", {'id': oldActive.children('a').first().attr('href').substr(1) } );
                }
                tab.show();
                tab.children('a').first().click();
                parent.addClass('active');
                var lizmapEvent = 'rightdockopened';
            }
            self.blur();

            var dock = $('#right-dock');
            if ( $('#right-dock-tabs .active').length == 0 ) {
              dock.hide();
              $('#content').removeClass('right-dock-visible');
              updateContentSize();
            } else if ( !dock.is(':visible') ) {
              $('#content').addClass('right-dock-visible');
              dock.show();
              updateContentSize();
            }

            // trigger event
            if ( lizmapEvent != '' )
                lizMap.events.triggerEvent( lizmapEvent, {'id':id} );
            return false;
          });
          // Show layer switcher
          $('#button-switcher').click();
          updateContentSize();

          $('#headermenu .navbar-inner .nav a[rel="tooltip"]').tooltip();
          $('#mapmenu .nav a[rel="tooltip"]').tooltip();
          self.events.triggerEvent("uicreated", self);

          $('body').css('cursor', 'auto');
          $('#loading').dialog('close');
        }, "text");
        }, "text");
        }, "text");
      });
    }
  };
  // initializing the lizMap events
  // <TODO LATER
  // obj.events = new OpenLayers.Events(
  //     obj, null,
  //     ['treecreated','mapcreated','layersadded','uicreated',
  //      'dockopened','dockclosed'],
  //     true,
  //     {includeXY: true}
  //   );
  // TODO LATER>
  return obj;
}();
/*
 * it's possible to add event listener
 * before the document is ready
 * but after this file
 */
 // <TODO LATER
// lizMap.events.on({
//     'treecreated':function(evt){
//     }
//     ,'mapcreated':function(evt){
//       // Add empty baselayer to the map
//       if ( ('emptyBaselayer' in evt.config.options)
//          && evt.config.options.emptyBaselayer == 'True') {
//         // creating the empty base layer
//         layerConfig = {};
//         layerConfig.title = lizDict['baselayer.empty.title'];
//         layerConfig.name = 'emptyBaselayer';
//         evt.config.layers['emptyBaselayer'] = layerConfig;

//         evt.baselayers.push(new OpenLayers.Layer.Vector('emptyBaselayer',{
//           isBaseLayer: true
//          ,maxExtent: evt.map.maxExtent
//          ,maxScale: evt.map.maxScale
//          ,minScale: evt.map.minScale
//          ,numZoomLevels: evt.map.numZoomLevels
//          ,scales: evt.map.scales
//          ,projection: evt.map.projection
//          ,units: evt.map.projection.proj.units
//         }));
//         evt.map.allOverlays = false;
//       }

//       // Add OpenStreetMap, Google Maps, Bing Maps, IGN Geoportail
//       // baselayers to the map
//       if (
//     (('osmMapnik' in evt.config.options)
//     && evt.config.options.osmMapnik == 'True') ||
//     (('osmStamenToner' in evt.config.options)
//      && evt.config.options.osmStamenToner == 'True') ||
//     (('osmCyclemap' in evt.config.options)
//      && evt.config.options.osmCyclemap == 'True'
//      && ('OCMKey' in evt.config.options)) ||
//     (('googleStreets' in evt.config.options)
//      && evt.config.options.googleStreets == 'True') ||
//     (('googleSatellite' in evt.config.options)
//      && evt.config.options.googleSatellite == 'True') ||
//     (('googleHybrid' in evt.config.options)
//      && evt.config.options.googleHybrid == 'True') ||
//     (('googleTerrain' in evt.config.options)
//      && evt.config.options.googleTerrain == 'True') ||
//     (('bingStreets' in evt.config.options)
//      && evt.config.options.bingStreets == 'True'
//      && ('bingKey' in evt.config.options)) ||
//     (('bingSatellite' in evt.config.options)
//      && evt.config.options.bingSatellite == 'True'
//      && ('bingKey' in evt.config.options)) ||
//     (('bingHybrid' in evt.config.options)
//      && evt.config.options.bingHybrid == 'True'
//      && ('bingKey' in evt.config.options)) ||
//     (('ignTerrain' in evt.config.options)
//      && evt.config.options.ignTerrain == 'True'
//      && ('ignKey' in evt.config.options)) ||
//     (('ignStreets' in evt.config.options)
//      && evt.config.options.ignStreets == 'True'
//      && ('ignKey' in evt.config.options)) ||
//     (('ignSatellite' in evt.config.options)
//      && evt.config.options.ignSatellite == 'True'
//      && ('ignKey' in evt.config.options)) ||
//     (('ignCadastral' in evt.config.options)
//      && evt.config.options.ignCadastral == 'True'
//      && ('ignKey' in evt.config.options))
//     ) {
//       //adding baselayers
//       var maxExtent = null;
//       if ( OpenLayers.Projection.defaults['EPSG:900913'].maxExtent )
//         maxExtent = new OpenLayers.Bounds(OpenLayers.Projection.defaults['EPSG:900913'].maxExtent);
//       else if ( OpenLayers.Projection.defaults['EPSG:3857'].maxExtent )
//         maxExtent = new OpenLayers.Bounds(OpenLayers.Projection.defaults['EPSG:3857'].maxExtent);

//       var lOptions = {zoomOffset:0,maxResolution:156543.03390625};
//       if (('resolutions' in evt.config.options)
//           && evt.config.options.resolutions.length != 0 ){
//         var resolutions = evt.config.options.resolutions;
//         var maxRes = resolutions[0];
//         var numZoomLevels = resolutions.length;
//         var zoomOffset = 0;
//         var res = 156543.03390625;
//         while ( res > maxRes ) {
//           zoomOffset += 1;
//           res = 156543.03390625 / Math.pow(2, zoomOffset);
//         }
//         lOptions['zoomOffset'] = zoomOffset;
//         lOptions['maxResolution'] = maxRes;
//         lOptions['numZoomLevels'] = numZoomLevels;
//       }

//       if (('osmMapnik' in evt.config.options) && evt.config.options.osmMapnik == 'True') {
//         evt.map.allOverlays = false;
//         var options = {
//           zoomOffset: 0,
//           maxResolution:156543.03390625,
//           numZoomLevels:19
//         };
//         if (lOptions.zoomOffset != 0) {
//           options.zoomOffset = lOptions.zoomOffset;
//           options.maxResolution = lOptions.maxResolution;
//         }
//         if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//           options.numZoomLevels = lOptions.numZoomLevels;
//         else
//           options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//         var osm = new OpenLayers.Layer.OSM('osm',
//             [
//             "https://a.tile.openstreetmap.org/${z}/${x}/${y}.png",
//             "https://b.tile.openstreetmap.org/${z}/${x}/${y}.png",
//             "https://c.tile.openstreetmap.org/${z}/${x}/${y}.png"
//             ]
//             ,options
//             );
//         osm.maxExtent = maxExtent;
//         var osmCfg = {
//              "name":"osm"
//             ,"title":"OpenStreetMap"
//             ,"type":"baselayer"
//         };
//         evt.config.layers['osm'] = osmCfg;
//         evt.baselayers.push(osm);
//       }

//       if (('osmStamenToner' in evt.config.options) && evt.config.options.osmStamenToner == 'True') {
//         evt.map.allOverlays = false;
//         var options = {
//           zoomOffset: 0,
//           maxResolution:156543.03390625,
//           numZoomLevels:19
//         };
//         if (lOptions.zoomOffset != 0) {
//           options.zoomOffset = lOptions.zoomOffset;
//           options.maxResolution = lOptions.maxResolution;
//         }
//         if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//           options.numZoomLevels = lOptions.numZoomLevels;
//         else
//           options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//         var stamenToner = new OpenLayers.Layer.OSM('osm-toner',
//             ["https://stamen-tiles-a.a.ssl.fastly.net/toner-lite/${z}/${x}/${y}.png",
//             "https://stamen-tiles-b.a.ssl.fastly.net/toner-lite/${z}/${x}/${y}.png",
//             "https://stamen-tiles-c.a.ssl.fastly.net/toner-lite/${z}/${x}/${y}.png",
//             "https://stamen-tiles-d.a.ssl.fastly.net/toner-lite/${z}/${x}/${y}.png"]
//             ,options
//             );
//         stamenToner.maxExtent = maxExtent;
//         var stamenTonerCfg = {
//           "name":"osm-toner"
//             ,"title":"OSM Stamen Toner"
//             ,"type":"baselayer"
//         };
//         evt.config.layers['osm-toner'] = stamenTonerCfg;
//         evt.baselayers.push(stamenToner);
//       }

//       if (('osmCyclemap' in evt.config.options) && evt.config.options.osmCyclemap == 'True' && ('OCMKey' in evt.config.options)) {
//         evt.map.allOverlays = false;
//         var options = {
//           zoomOffset: 0,
//           maxResolution:156543.03390625,
//           numZoomLevels:19
//         };
//         if (lOptions.zoomOffset != 0) {
//           options.zoomOffset = lOptions.zoomOffset;
//           options.maxResolution = lOptions.maxResolution;
//         }
//         if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//           options.numZoomLevels = lOptions.numZoomLevels;
//         else
//           options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//         var cyclemap = new OpenLayers.Layer.OSM('osm-cyclemap','https://tile.thunderforest.com/cycle/${z}/${x}/${y}.png?apiKey='+evt.config.options.OCMKey,options);
//         cyclemap.maxExtent = maxExtent;
//         var cyclemapCfg = {
//              "name":"osm-cycle"
//             ,"title":"OSM CycleMap"
//             ,"type":"baselayer"
//         };
//         evt.config.layers['osm-cycle'] = cyclemapCfg;
//         evt.baselayers.push(cyclemap);
//       }
//       try {
//         if (('googleSatellite' in evt.config.options) && evt.config.options.googleSatellite == 'True') {
//           var options = {
//             zoomOffset: 0,
//             maxResolution:156543.03390625,
//             numZoomLevels:21
//           };
//           if (lOptions.zoomOffset != 0) {
//             options.zoomOffset = lOptions.zoomOffset;
//             options.maxResolution = lOptions.maxResolution;
//           }
//           if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//             options.numZoomLevels = lOptions.numZoomLevels;
//           else
//             options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//           var gsat = new OpenLayers.Layer.Google(
//               "gsat",
//               {type: google.maps.MapTypeId.SATELLITE
//                 , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset}
//               );
//           gsat.maxExtent = maxExtent;
//           var gsatCfg = {
//                "name":"gsat"
//               ,"title":"Google Satellite"
//             ,"type":"baselayer"
//           };
//           evt.config.layers['gsat'] = gsatCfg;
//           evt.baselayers.push(gsat);
//           evt.map.allOverlays = false;
//           evt.map.zoomDuration = 0;
//         }
//         if (('googleHybrid' in evt.config.options) && evt.config.options.googleHybrid == 'True') {
//           var options = {
//             zoomOffset: 0,
//             maxResolution:156543.03390625,
//             numZoomLevels:20
//           };
//           if (lOptions.zoomOffset != 0) {
//             options.zoomOffset = lOptions.zoomOffset;
//             options.maxResolution = lOptions.maxResolution;
//           }
//           if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//             options.numZoomLevels = lOptions.numZoomLevels;
//           else
//             options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//           var ghyb = new OpenLayers.Layer.Google(
//               "ghyb",
//               {type: google.maps.MapTypeId.HYBRID
//                 , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset}
//               );
//           ghyb.maxExtent = maxExtent;
//           var ghybCfg = {
//                "name":"ghyb"
//               ,"title":"Google Hybrid"
//             ,"type":"baselayer"
//           };
//           evt.config.layers['ghyb'] = ghybCfg;
//           evt.baselayers.push(ghyb);
//           evt.map.allOverlays = false;
//           evt.map.zoomDuration = 0;
//         }
//         if (('googleTerrain' in evt.config.options) && evt.config.options.googleTerrain == 'True') {
//           var options = {
//             zoomOffset: 0,
//             maxResolution:156543.03390625,
//             numZoomLevels:16
//           };
//           if (lOptions.zoomOffset != 0) {
//             options.zoomOffset = lOptions.zoomOffset;
//             options.maxResolution = lOptions.maxResolution;
//           }
//           if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//             options.numZoomLevels = lOptions.numZoomLevels;
//           else
//             options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//           var gphy = new OpenLayers.Layer.Google(
//               "gphy",
//               {type: google.maps.MapTypeId.TERRAIN
//               , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset}
//               );
//           gphy.maxExtent = maxExtent;
//           var gphyCfg = {
//                "name":"gphy"
//               ,"title":"Google Terrain"
//             ,"type":"baselayer"
//           };
//           evt.config.layers['gphy'] = gphyCfg;
//           evt.baselayers.push(gphy);
//           evt.map.allOverlays = false;
//           evt.map.zoomDuration = 0;
//        }
//        if (('googleStreets' in evt.config.options) && evt.config.options.googleStreets == 'True') {
//           var options = {
//             zoomOffset: 0,
//             maxResolution:156543.03390625,
//             numZoomLevels:20
//           };
//           if (lOptions.zoomOffset != 0) {
//             options.zoomOffset = lOptions.zoomOffset;
//             options.maxResolution = lOptions.maxResolution;
//           }
//           if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//             options.numZoomLevels = lOptions.numZoomLevels;
//           else
//             options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//          var gmap = new OpenLayers.Layer.Google(
//              "gmap", // the default
//              {numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset}
//              );
//          gmap.maxExtent = maxExtent;
//          var gmapCfg = {
//               "name":"gmap"
//              ,"title":"Google Streets"
//              ,"type":"baselayer"
//          };
//          evt.config.layers['gmap'] = gmapCfg;
//          evt.baselayers.push(gmap);
//          evt.map.allOverlays = false;
//          evt.map.zoomDuration = 0;
//        }
//        if (('bingStreets' in evt.config.options) && evt.config.options.bingStreets == 'True' && ('bingKey' in evt.config.options))  {
//           var options = {
//             zoomOffset: 0,
//             maxResolution:156543.03390625,
//             numZoomLevels:19
//           };
//           if (lOptions.zoomOffset != 0) {
//             options.zoomOffset = lOptions.zoomOffset;
//             options.maxResolution = lOptions.maxResolution;
//           }
//           if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//             options.numZoomLevels = lOptions.numZoomLevels;
//           else
//             options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//           var bmap = new OpenLayers.Layer.Bing({
//              key: evt.config.options.bingKey,
//              type: "Road",
//              name: "Bing Road", // the default
//              numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset
//           });
//           bmap.maxExtent = maxExtent;
//           var bmapCfg = {
//              "name":"bmap"
//             ,"title":"Bing Road"
//             ,"type":"baselayer"
//           };
//           evt.config.layers['bmap'] = bmapCfg;
//           evt.baselayers.push(bmap);
//           evt.map.allOverlays = false;
//        }
//        if (('bingSatellite' in evt.config.options) && evt.config.options.bingSatellite == 'True' && ('bingKey' in evt.config.options))  {
//           var options = {
//             zoomOffset: 0,
//             maxResolution:156543.03390625,
//             numZoomLevels:19
//           };
//           if (lOptions.zoomOffset != 0) {
//             options.zoomOffset = lOptions.zoomOffset;
//             options.maxResolution = lOptions.maxResolution;
//           }
//           if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//             options.numZoomLevels = lOptions.numZoomLevels;
//           else
//             options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//           var baerial = new OpenLayers.Layer.Bing({
//              key: evt.config.options.bingKey,
//              type: "Aerial",
//              name: "Bing Aerial", // the default
//              numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset
//           });
//           baerial.maxExtent = maxExtent;
//           var baerialCfg = {
//              "name":"baerial"
//             ,"title":"Bing Aerial"
//             ,"type":"baselayer"
//           };
//           evt.config.layers['baerial'] = baerialCfg;
//           evt.baselayers.push(baerial);
//           evt.map.allOverlays = false;
//        }
//        if (('bingHybrid' in evt.config.options) && evt.config.options.bingHybrid == 'True' && ('bingKey' in evt.config.options))  {
//           var options = {
//             zoomOffset: 0,
//             maxResolution:156543.03390625,
//             numZoomLevels:19
//           };
//           if (lOptions.zoomOffset != 0) {
//             options.zoomOffset = lOptions.zoomOffset;
//             options.maxResolution = lOptions.maxResolution;
//           }
//           if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//             options.numZoomLevels = lOptions.numZoomLevels;
//           else
//             options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//           var bhybrid = new OpenLayers.Layer.Bing({
//              key: evt.config.options.bingKey,
//              type: "AerialWithLabels",
//              name: "Bing Hybrid", // the default
//              numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset
//           });
//           bhybrid.maxExtent = maxExtent;
//           var bhybridCfg = {
//              "name":"bhybrid"
//             ,"title":"Bing Hybrid"
//             ,"type":"baselayer"
//           };
//           evt.config.layers['bhybrid'] = bhybridCfg;
//           evt.baselayers.push(bhybrid);
//           evt.map.allOverlays = false;
//        }
//        if (('ignTerrain' in evt.config.options) && evt.config.options.ignTerrain == 'True' && ('ignKey' in evt.config.options)) {
//           var options = {
//             zoomOffset: 0,
//             maxResolution:156543.03390625,
//             numZoomLevels:18
//           };
//           if (lOptions.zoomOffset != 0) {
//             options.zoomOffset = lOptions.zoomOffset;
//             options.maxResolution = lOptions.maxResolution;
//           }
//           if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//             options.numZoomLevels = lOptions.numZoomLevels;
//           else
//             options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//           var ignmap = new OpenLayers.Layer.WMTS({
//             name: "ignmap",
//             url: "https://wxs.ign.fr/"+evt.config.options.ignKey+"/wmts",
//             layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
//             matrixSet: "PM",
//             style: "normal",
//             projection: new OpenLayers.Projection("EPSG:3857"),
//             attribution: 'Fond&nbsp;: &copy;IGN <a href="http://www.geoportail.fr/" target="_blank"><img src="https://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a> <a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf" alt="TOS" title="TOS" target="_blank">Conditions d\'utilisation</a>'
//             , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset
//             ,zoomOffset: options.zoomOffset

//           });
//           ignmap.maxExtent = maxExtent;
//           var ignmapCfg = {
//              "name":"ignmap"
//             ,"title":"IGN Scan"
//             ,"type":"baselayer"
//           };
//           evt.config.layers['ignmap'] = ignmapCfg;
//           evt.baselayers.push(ignmap);
//           evt.map.allOverlays = false;
//        }
//        if (('ignStreets' in evt.config.options) && evt.config.options.ignStreets == 'True' && ('ignKey' in evt.config.options)) {
//           var options = {
//             zoomOffset: 0,
//             maxResolution:156543.03390625,
//             numZoomLevels:18
//           };
//           if (lOptions.zoomOffset != 0) {
//             options.zoomOffset = lOptions.zoomOffset;
//             options.maxResolution = lOptions.maxResolution;
//           }
//           if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//             options.numZoomLevels = lOptions.numZoomLevels;
//           else
//             options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//           var ignplan = new OpenLayers.Layer.WMTS({
//             name: "ignplan",
//             url: "https://wxs.ign.fr/"+evt.config.options.ignKey+"/wmts",
//             layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGN",
//             matrixSet: "PM",
//             style: "normal",
//             projection: new OpenLayers.Projection("EPSG:3857"),
//             attribution: 'Fond&nbsp;: &copy;IGN <a href="http://www.geoportail.fr/" target="_blank"><img src="https://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a> <a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf" alt="TOS" title="TOS" target="_blank">Conditions d\'utilisation</a>'
//             , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset
//             ,zoomOffset: options.zoomOffset

//           });
//           ignplan.maxExtent = maxExtent;
//           var ignplanCfg = {
//              "name":"ignplan"
//             ,"title":"IGN Plan"
//             ,"type":"baselayer"
//           };
//           evt.config.layers['ignplan'] = ignplanCfg;
//           evt.baselayers.push(ignplan);
//           evt.map.allOverlays = false;
//        }
//        if (('ignSatellite' in evt.config.options) && evt.config.options.ignSatellite == 'True' && ('ignKey' in evt.config.options)) {
//           var options = {
//             zoomOffset: 0,
//             maxResolution:156543.03390625,
//             numZoomLevels:22
//           };
//           if (lOptions.zoomOffset != 0) {
//             options.zoomOffset = lOptions.zoomOffset;
//             options.maxResolution = lOptions.maxResolution;
//           }
//           if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//             options.numZoomLevels = lOptions.numZoomLevels;
//           else
//             options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//           var ignphoto = new OpenLayers.Layer.WMTS({
//             name: "ignphoto",
//             url: "https://wxs.ign.fr/"+evt.config.options.ignKey+"/wmts",
//             layer: "ORTHOIMAGERY.ORTHOPHOTOS",
//             matrixSet: "PM",
//             style: "normal",
//             projection: new OpenLayers.Projection("EPSG:3857"),
//             attribution: 'Fond&nbsp;: &copy;IGN <a href="http://www.geoportail.fr/" target="_blank"><img src="https://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a> <a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf" alt="TOS" title="TOS" target="_blank">Conditions d\'utilisation</a>'
//             , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset
//             ,zoomOffset: options.zoomOffset

//           });
//           ignphoto.maxExtent = maxExtent;
//           var ignphotoCfg = {
//              "name":"ignphoto"
//             ,"title":"IGN Photos"
//             ,"type":"baselayer"
//           };
//           evt.config.layers['ignphoto'] = ignphotoCfg;
//           evt.baselayers.push(ignphoto);
//           evt.map.allOverlays = false;
//        }
//        if (('ignCadastral' in evt.config.options) && evt.config.options.ignCadastral == 'True' && ('ignKey' in evt.config.options)) {
//           var options = {
//             zoomOffset: 0,
//             maxResolution:156543.03390625,
//             numZoomLevels:20
//           };
//           if (lOptions.zoomOffset != 0) {
//             options.zoomOffset = lOptions.zoomOffset;
//             options.maxResolution = lOptions.maxResolution;
//           }
//           if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
//             options.numZoomLevels = lOptions.numZoomLevels;
//           else
//             options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
//           var igncadastral = new OpenLayers.Layer.WMTS({
//             name: "igncadastral",
//             url: "https://wxs.ign.fr/"+evt.config.options.ignKey+"/wmts",
//             layer: "CADASTRALPARCELS.PARCELS",
//             matrixSet: "PM",
//             style: "normal",
//             format: "image/png",
//             projection: new OpenLayers.Projection("EPSG:3857"),
//             attribution: 'Fond&nbsp;: &copy;IGN <a href="http://www.geoportail.fr/" target="_blank"><img src="https://api.ign.fr/geoportail/api/js/2.0.0beta/theme/geoportal/img/logo_gp.gif"></a> <a href="http://www.geoportail.gouv.fr/depot/api/cgu/licAPI_CGUF.pdf" alt="TOS" title="TOS" target="_blank">Conditions d\'utilisation</a>'
//             , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset
//             ,zoomOffset: options.zoomOffset

//           });
//           igncadastral.maxExtent = maxExtent;
//           var igncadastralCfg = {
//              "name":"igncadastral"
//             ,"title":"IGN Cadastre"
//             ,"type":"baselayer"
//           };
//           evt.config.layers['igncadastral'] = igncadastralCfg;
//           evt.baselayers.push(igncadastral);
//           evt.map.allOverlays = false;
//        }
//       } catch(e) {
//          //problems with google
//          var myError = e;
//        }
//      }

//       if('lizmapExternalBaselayers' in evt.config){

//         var externalService = OpenLayers.Util.urlAppend(lizUrls.wms
//           ,OpenLayers.Util.getParameterString(lizUrls.params)
//         );
//         if (lizUrls.publicUrlList && lizUrls.publicUrlList.length > 1 ) {
//             externalService = [];
//             for (var j=0, jlen=lizUrls.publicUrlList.length; j<jlen; j++) {
//               externalService.push(
//                 OpenLayers.Util.urlAppend(
//                   lizUrls.publicUrlList[j],
//                   OpenLayers.Util.getParameterString(lizUrls.params)
//                 )
//               );
//             }
//         }

//         // Add lizmap external baselayers
//         for (id in evt.config['lizmapExternalBaselayers']) {

//           var layerConfig = evt.config['lizmapExternalBaselayers'][id];

//           if (!('repository' in layerConfig) || !('project' in layerConfig))
//             continue;

//           var layerName = evt.cleanName(layerConfig.layerName);

//           var layerWmsParams = {
//             layers:layerConfig.layerName
//             ,version:'1.3.0'
//             ,exceptions:'application/vnd.ogc.se_inimage'
//             ,format:(layerConfig.layerImageFormat) ? 'image/'+layerConfig.layerImageFormat : 'image/png'
//             ,dpi:96
//           };
//           if (layerWmsParams.format != 'image/jpeg')
//             layerWmsParams['transparent'] = true;

//           // Change repository and project in service URL
//           var reg = new RegExp('repository\=(.+)&project\=(.+)', 'g');
//           if (! (externalService instanceof Array) )
//             var url = externalService.replace(reg, 'repository='+layerConfig.repository+'&project='+layerConfig.project);
//           else
//             var url = jQuery.map(externalService, function(element) { return element.replace(reg, 'repository='+layerConfig.repository+'&project='+layerConfig.project) });

//           // creating the base layer
//           layerConfig.title = layerConfig.layerTitle
//           layerConfig.name = layerConfig.layerName
//           layerConfig.baselayer = true;
//           layerConfig.singleTile = "False";
//           evt.config.layers[layerName] = layerConfig;
//           evt.baselayers.push(new OpenLayers.Layer.WMS(layerName,url
//             ,layerWmsParams
//             ,{isBaseLayer:true
//             ,gutter:(layerConfig.cached == 'True') ? 0 : 5
//             ,buffer:0
//             ,singleTile:(layerConfig.singleTile == 'True')
//             ,ratio:1
//           }));
//           evt.map.allOverlays = false;

//         }
//       }

//     }
//    ,
//    'uicreated': function(evt){
//      var map = evt.map;
//      if ( map.id in OpenLayers.Layer.Google.cache ) {
//         google.maps.event.addListenerOnce(OpenLayers.Layer.Google.cache[map.id].mapObject, 'tilesloaded', function() {
//             var olLayers = map.layers;
//             var gVisibility = false;
//             for (var i=olLayers.length-1; i>=0; --i) {
//                 var layer = olLayers[i];
//                 if (layer instanceof OpenLayers.Layer.Google &&
//                             layer.visibility === true && layer.inRange === true) {
//                     layer.redraw(true);
//                     gVisibility = true;
//                     break;
//                 }
//             }
//             if (!gVisibility) {
//                 for (var i=olLayers.length-1; i>=0; --i) {
//                     var layer = olLayers[i];
//                     if (layer instanceof OpenLayers.Layer.Google) {
//                         layer.display(false);
//                         break;
//                     }
//                 }
//             }
//         });
//      }

//       // Make subdock always be at the left
//       $('#sub-dock').hover(function(){
//         var sLeft = lizMap.getDockRightPosition();
//         $(this).css( 'left', sLeft );
//       });

//       // Update legend if mobile
//       if( lizMap.checkMobile() ){
//         if( $('#button-switcher').parent().hasClass('active') )
//           $('#button-switcher').click();
//       }

//         var ovCtrl = lizMap.map.getControlsByClass('OpenLayers.Control.OverviewMap');
//         if ( ovCtrl.length != 0 ) {
//             ovCtrl = ovCtrl[0];
//             if ( ovCtrl.ovmap.layers.length > 1 ) {
//                 for ( var i=0, len=ovCtrl.ovmap.layers.length; i<len; i++ ){
//                     var l = ovCtrl.ovmap.layers[i];
//                     if( l.name.toLowerCase() != 'overview' )
//                         l.destroy();
//                 }
//             }
//         }

//       // Connect dock close button
//       $('#dock-close').click(function(){ $('#mapmenu .nav-list > li.active.nav-dock > a').click(); });
//       $('#right-dock-close').click(function(){ $('#mapmenu .nav-list > li.active.nav-right-dock > a').click(); });
//    }

// });
// TODO LATER>

$(document).ready(function () {
  // start waiting
  $('body').css('cursor', 'wait');
  $('#loading').dialog({
    modal: true
    , draggable: false
    , resizable: false
    , closeOnEscape: false
    , dialogClass: 'liz-dialog-wait'
    , minHeight: 128
  })
  .parent().removeClass('ui-corner-all')
  .children('.ui-dialog-titlebar').removeClass('ui-corner-all');
  // initialize LizMap
  lizMap.init();
  $( "#loading" ).css('min-height','128px');
});

/*! ES6 String.prototype.startsWith polyfill */
/*! https://mths.be/startswith v0.2.0 by @mathias */
if (!String.prototype.startsWith) {
    (function() {
        'use strict'; // needed to support `apply`/`call` with `undefined`/`null`
        var defineProperty = (function() {
            // IE 8 only supports `Object.defineProperty` on DOM elements
            try {
                var object = {};
                var $defineProperty = Object.defineProperty;
                var result = $defineProperty(object, object, object) && $defineProperty;
            } catch(error) {}
            return result;
        }());
        var toString = {}.toString;
        var startsWith = function(search) {
            if (this == null) {
                throw TypeError();
            }
            var string = String(this);
            if (search && toString.call(search) == '[object RegExp]') {
                throw TypeError();
            }
            var stringLength = string.length;
            var searchString = String(search);
            var searchLength = searchString.length;
            var position = arguments.length > 1 ? arguments[1] : undefined;
            // `ToInteger`
            var pos = position ? Number(position) : 0;
            if (pos != pos) { // better `isNaN`
                pos = 0;
            }
            var start = Math.min(Math.max(pos, 0), stringLength);
            // Avoid the `indexOf` call if no match is possible
            if (searchLength + start > stringLength) {
                return false;
            }
            var index = -1;
            while (++index < searchLength) {
                if (string.charCodeAt(start + index) != searchString.charCodeAt(index)) {
                    return false;
                }
            }
            return true;
        };
        if (defineProperty) {
            defineProperty(String.prototype, 'startsWith', {
                'value': startsWith,
                'configurable': true,
                'writable': true
            });
        } else {
            String.prototype.startsWith = startsWith;
        }
    }());
}


/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
class Util {

 	static urlAppend(url, paramStr) {
      var newUrl = url;
      if(paramStr) {
          var parts = (url + " ").split(/[?&]/);
          newUrl += (parts.pop() === " " ?
              paramStr :
              parts.length ? "&" + paramStr : "?" + paramStr);
      }
      return newUrl;
 	}

 	static getParameterString(params) {
		var paramsArray = [];

		for (var key in params) {
		  var value = params[key];
		  if ((value != null) && (typeof value != 'function')) {
		    var encodedValue;
		    if (typeof value == 'object' && value.constructor == Array) {
		      /* value is an array; encode items and separate with "," */
		      var encodedItemArray = [];
		      var item;
		      for (var itemIndex=0, len=value.length; itemIndex<len; itemIndex++) {
		        item = value[itemIndex];
		        encodedItemArray.push(encodeURIComponent(
		            (item === null || item === undefined) ? "" : item)
		        );
		      }
		      encodedValue = encodedItemArray.join(",");
		    }
		    else {
		      /* value is a string; simply encode */
		      encodedValue = encodeURIComponent(value);
		    }
		    paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
		  }
		}

		return paramsArray.join("&");
	}
}

/* harmony default export */ __webpack_exports__["default"] = (Util);

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvdXRpbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRTZCOzs7QUFHN0I7QUFDQTtBQUNBO0FBQ0EsTUFBTSxPQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLE9BQU87QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sT0FBTztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxPQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGlCQUFpQjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sMEJBQTBCO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSwwQkFBMEI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVEseUJBQXlCLEVBQUU7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVEsZ0NBQWdDLEVBQUU7QUFDaEQ7QUFDQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLE1BQU0sT0FBTztBQUNiO0FBQ0EsY0FBYyxRQUFROztBQUV0QjtBQUNBO0FBQ0EsTUFBTSxPQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixrREFBa0Q7QUFDOUUsU0FBUztBQUNUO0FBQ0E7QUFDQSw0QkFBNEIsaURBQWlEO0FBQzdFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhLEtBQUs7QUFDbEIsa0JBQWtCLFFBQVE7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sS0FBSztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QjtBQUN4QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCLGlCQUFpQixNQUFNO0FBQ3ZCLGlCQUFpQixNQUFNO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLE9BQU87QUFDYjtBQUNBO0FBQ0EscURBQXFELE9BQU87QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxRQUFRO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFEQUFxRCxPQUFPO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdEQUF3RCxRQUFRO0FBQ2hFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsOERBQThEOztBQUU5RCxxREFBcUQsT0FBTztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLHVCQUF1Qix1QkFBdUI7QUFDOUMsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQSxNQUFNLFFBQVE7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU87QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQSxNQUFNLE9BQU87QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLDJEQUEyRDtBQUMzRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDJDQUEyQztBQUMzQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBLE1BQU0sT0FBTztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0NBQXNDLE9BQU87QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQSx5Q0FBeUM7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QyxvQkFBb0IsZUFBZTtBQUNoRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLE9BQU87QUFDN0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsa0JBQWtCLHVCQUF1QjtBQUN6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZ0I7QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLHVEQUF1RCwyQ0FBMkM7O0FBRWxHO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLFFBQVE7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLE9BQU87QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLE9BQU87QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBLGlCQUFpQixPQUFPO0FBQ3hCLDZCQUE2QjtBQUM3QjtBQUNBLGFBQWE7QUFDYix1Q0FBdUM7QUFDdkMsOEJBQThCO0FBQzlCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxxQkFBcUIsdUNBQXVDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QztBQUN2QztBQUNBLGlCQUFpQixPQUFPO0FBQ3hCLDZCQUE2QjtBQUM3QjtBQUNBLGFBQWE7QUFDYix1Q0FBdUM7QUFDdkMsOEJBQThCO0FBQzlCLGlCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdDQUF3QyxPQUFPO0FBQy9DO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELE9BQU87QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsT0FBTztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EscUJBQXFCLHVDQUF1QztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc01BQXNNO0FBQ3RNO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7O0FBRUE7O0FBRUEsV0FBVztBQUNYO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxrQkFBa0IsdUJBQXVCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0REFBNEQsMkJBQTJCO0FBQ3ZGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZixXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRCxRQUFRO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1AsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0Msa0RBQWtEO0FBQ2xGO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0Isa0RBQWtEO0FBQzFFO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULE9BQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EscURBQXFELHlDQUF5Qzs7QUFFOUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QyxtQ0FBbUM7QUFDNUUsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLG1DQUFtQztBQUM1RSxXQUFXO0FBQ1g7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOzs7QUFHQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHFDQUFxQzs7QUFFckM7QUFDQSxtQ0FBbUMsT0FBTztBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBLDhDQUE4QztBQUM5Qzs7QUFFQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSwwRkFBMEYsMEJBQTBCO0FBQ3BIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNEQUFzRDtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsdUJBQXVCOztBQUV4QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiw0REFBNEQ7QUFDdEYsT0FBTztBQUNQO0FBQ0E7QUFDQSwyQ0FBMkMsT0FBTztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxPQUFPO0FBQzlEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkhBQTZIO0FBQzdIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBLGlDQUFpQyxpQ0FBaUMsRUFBRTtBQUNwRSxpQ0FBaUMsb0NBQW9DO0FBQ3JFO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNULEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxPQUFPO0FBQ3ZEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQztBQUNqQztBQUNBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0Esd0RBQXdELFFBQVE7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlFQUF5RTtBQUN6RTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0EsbUNBQW1DLFlBQVk7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMENBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBLG1DQUFtQyxZQUFZO0FBQy9DO0FBQ0EsMENBQTBDLE9BQU87QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1EQUFtRCxPQUFPO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSx5QkFBeUI7O0FBRXpCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0MsT0FBTztBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBb0MsT0FBTztBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0NBQXdDLE9BQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWCxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQSx3REFBd0QsT0FBTztBQUMvRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELE9BQU87QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUM7QUFDQTtBQUNBLG9EQUFvRDtBQUNwRDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsbUJBQW1CLGdDQUFnQztBQUNuRDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsY0FBYztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLG1CQUFtQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxpQkFBaUI7QUFDekI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxRQUFRO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQiwwQkFBMEI7QUFDMUMsa0JBQWtCLE9BQU87QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0EsK0NBQStDO0FBQy9DLG1EQUFtRDs7QUFFbkQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLDBCQUEwQjtBQUMzQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQiwwQkFBMEI7QUFDcEQsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0EsU0FBUyxvQkFBb0I7QUFDN0I7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQSxTQUFTLE9BQU87QUFDaEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxRQUFRO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLFFBQVE7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxtREFBbUQ7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsT0FBTyxhQUFhLFdBQVcsY0FBYztBQUMxRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLDhCQUE4QjtBQUMzRDtBQUNBLDRDQUE0QyxpQkFBaUI7O0FBRTdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0EsTUFBTSxRQUFRO0FBQ2Q7QUFDQTtBQUNBLHlEQUF5RCxnQkFBZ0I7QUFDekU7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVE7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxjQUFjO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxjQUFjO0FBQ3BCO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGVBQWU7QUFDZjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTs7QUFFZjtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsZUFBZTtBQUNmOztBQUVBLE9BQU87O0FBRVA7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTzs7QUFFUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtGQUFrRixZQUFZLGVBQWU7QUFDN0c7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyREFBMkQsZ0JBQWdCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLE9BQU87QUFDYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxpQkFBaUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLDBCQUEwQjtBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMEJBQTBCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxvQkFBb0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsT0FBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxPQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLE9BQU87QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsT0FBTztBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLGdEQUFJO0FBQzFCLFdBQVcsZ0RBQUk7QUFDZjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsc0VBQXNFO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0pBQWdKO0FBQ2hKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw2Q0FBNkMsb0JBQW9COztBQUVqRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUJBQXlCLHVCQUF1QjtBQUNoRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsT0FBTztBQUNsRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxRQUFRO0FBQ3ZFLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxtRUFBbUUsOERBQThEO0FBQ2pJO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCxRQUFRO0FBQ3ZFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsK0RBQStELDhEQUE4RDtBQUM3SDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwREFBMEQsUUFBUTs7QUFFbEU7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLDhEQUE4RDtBQUNsSTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwREFBMEQsUUFBUTtBQUNsRTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsU0FBUztBQUNULFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbURBQW1ELEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUMvRCxtREFBbUQsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQy9ELG1EQUFtRCxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDL0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0VBQXNFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNsRixxRUFBcUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ2pGLHFFQUFxRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDakYscUVBQXFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBHQUEwRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDdEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBOztBQUVBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxRQUFRO0FBQy9DO0FBQ0E7O0FBRUEsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFFBQVE7QUFDL0M7QUFDQTs7QUFFQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxRQUFRO0FBQy9DO0FBQ0E7O0FBRUEsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsUUFBUTtBQUN2RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RSxvR0FBb0c7O0FBRTVLO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTRDLE1BQU07QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELE1BQU07QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVOztBQUVWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpRUFBaUUsT0FBTztBQUN4RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwyQ0FBMkMsMERBQTBELEVBQUU7QUFDdkcsaURBQWlELGdFQUFnRSxFQUFFO0FBQ25IOztBQUVBLElBQUk7QUFDSjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxTQUFTO0FBQ1QseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDs7Ozs7Ozs7Ozs7OztBQ3B6T0E7QUFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBLCtDQUErQyxlQUFlO0FBQzlEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRWUsbUVBQUksRSIsImZpbGUiOiIuLi8uLi9saXptYXAvd3d3L2pzL21hcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL21hcC5qc1wiKTtcbiIsIi8qKlxuKiBDbGFzczogbGl6TWFwXG4qIEBwYWNrYWdlICAgbGl6bWFwXG4qIEBzdWJwYWNrYWdlIHZpZXdcbiogQGF1dGhvciAgICAzbGl6XG4qIEBjb3B5cmlnaHQgMjAxMSAzbGl6XG4qIEBsaW5rICAgICAgaHR0cDovLzNsaXouY29tXG4qIEBsaWNlbnNlICAgIE1vemlsbGEgUHVibGljIExpY2Vuc2UgOiBodHRwOi8vd3d3Lm1vemlsbGEub3JnL01QTC9cbiovXG5cbmltcG9ydCBVdGlsIGZyb20gJy4vdXRpbC5qcyc7XG5cblxudmFyIGxpek1hcCA9IGZ1bmN0aW9uKCkge1xuICAvKipcbiAgICogUFJJVkFURSBQcm9wZXJ0eTogY29uZmlnXG4gICAqIHtvYmplY3R9IFRoZSBtYXAgY29uZmlnXG4gICAqL1xuICB2YXIgY29uZmlnID0gbnVsbDtcbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IGNhcGFiaWxpdGllc1xuICAgKiB7b2JqZWN0fSBUaGUgd21zIGNhcGFiaWxpdGllc1xuICAgKi9cbiAgdmFyIGNhcGFiaWxpdGllcyA9IG51bGw7XG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiB3bXRzQ2FwYWJpbGl0aWVzXG4gICAqIHtvYmplY3R9IFRoZSB3bXRzIGNhcGFiaWxpdGllc1xuICAgKi9cbiAgdmFyIHdtdHNDYXBhYmlsaXRpZXMgPSBudWxsO1xuICAvKipcbiAgICogUFJJVkFURSBQcm9wZXJ0eTogd2ZzQ2FwYWJpbGl0aWVzXG4gICAqIHtvYmplY3R9IFRoZSB3ZnMgY2FwYWJpbGl0aWVzXG4gICAqL1xuICB2YXIgd2ZzQ2FwYWJpbGl0aWVzID0gbnVsbDtcbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IG1hcFxuICAgKiB7PE9wZW5MYXllcnMuTWFwPn0gVGhlIG1hcFxuICAgKi9cbiAgdmFyIG1hcCA9IG51bGw7XG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBiYXNlbGF5ZXJzXG4gICAqIHtBcnJheSg8T3BlbkxheWVycy5MYXllcj4pfSBPcmRlcmVkIGxpc3Qgb2YgYmFzZSBsYXllcnNcbiAgICovXG4gIHZhciBiYXNlbGF5ZXJzID0gW107XG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBsYXllcnNcbiAgICoge0FycmF5KDxPcGVuTGF5ZXJzLkxheWVyPil9IE9yZGVyZWQgbGlzdCBvZiBsYXllcnNcbiAgICovXG4gIHZhciBsYXllcnMgPSBbXTtcbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IGNvbnRyb2xzXG4gICAqIHtPYmplY3Qoe2tleTo8T3BlbkxheWVycy5Db250cm9sPn0pfSBEaWN0aW9uYXJ5IG9mIGNvbnRyb2xzXG4gICAqL1xuICB2YXIgY29udHJvbHMgPSB7fTtcbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IHByaW50Q2FwYWJpbGl0aWVzXG4gICAqIHtPYmplY3Qoe3NjYWxlczpbRmxvYXRdLGxheW91dHM6W09iamVjdF19KX0gUHJpbnQgY2FwYWJpbGl0aWVzXG4gICAqL1xuICB2YXIgcHJpbnRDYXBhYmlsaXRpZXMgPSB7c2NhbGVzOltdLGxheW91dHM6W119O1xuICAvKipcbiAgICogUFJJVkFURSBQcm9wZXJ0eTogdHJlZVxuICAgKiB7b2JqZWN0fSBUaGUgbGF5ZXIncyB0cmVlXG4gICAqL1xuICB2YXIgdHJlZSA9IHtjb25maWc6e3R5cGU6J2dyb3VwJ319O1xuXG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBnZXRGZWF0dXJlSW5mb1ZlbmRvclBhcmFtc1xuICAgKiB7b2JqZWN0fSBBZGRpdGlvbm5hbCBRR0lTIFNlcnZlciBwYXJhbWV0ZXIgZm9yIGNsaWNrIHRvbGVyYW5jZSBpbiBwaXhlbHNcbiAgICovXG4gIHZhciBkZWZhdWx0R2V0RmVhdHVyZUluZm9Ub2xlcmFuY2VzID0ge1xuICAgICdGSV9QT0lOVF9UT0xFUkFOQ0UnOiAyNSxcbiAgICAnRklfTElORV9UT0xFUkFOQ0UnOiAxMCxcbiAgICAnRklfUE9MWUdPTl9UT0xFUkFOQ0UnOiA1XG4gIH07XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IGV4dGVybmFsQmFzZWxheWVyc1JlcGxhY2VtZW50XG4gICAqXG4gICAqL1xuICB2YXIgZXh0ZXJuYWxCYXNlbGF5ZXJzUmVwbGFjZW1lbnQgPSB7XG4gICAgJ29zbSc6ICdvc20tbWFwbmlrJyxcbiAgICAnb3NtLXRvbmVyJzogJ29zbS1zdGFtZW4tdG9uZXInLFxuICAgICdvc20tY3ljbGUnOiAnb3NtLWN5Y2xlbWFwJyxcbiAgICAnZ3NhdCc6ICdnb29nbGUtc2F0ZWxsaXRlJyxcbiAgICAnZ2h5Yic6ICdnb29nbGUtaHlicmlkJyxcbiAgICAnZ3BoeSc6ICdnb29nbGUtdGVycmFpbicsXG4gICAgJ2dtYXAnOiAnZ29vZ2xlLXN0cmVldCcsXG4gICAgJ2JtYXAnOiAnYmluZy1yb2FkJyxcbiAgICAnYmFlcmlhbCc6ICdiaW5nLWFlcmlhbCcsXG4gICAgJ2JoeWJyaWQnOiAnYmluZy1oeWJyaWQnLFxuICAgICdpZ25tYXAnOiAnaWduLXNjYW4nLFxuICAgICdpZ25wbGFuJzogJ2lnbi1wbGFuJyxcbiAgICAnaWducGhvdG8nOiAnaWduLXBob3RvJyxcbiAgICAnaWduY2FkYXN0cmFsJzogJ2lnbi1jYWRhc3RyYWwnXG4gIH07XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IGV4dGVybmFsQmFzZWxheWVyc1JlcGxhY2VtZW50XG4gICAqXG4gICAqL1xuICB2YXIgc3RhcnR1cEJhc2VsYXllcnNSZXBsYWNlbWVudCA9IHtcbiAgICAnb3NtLW1hcG5payc6ICdvc20nLFxuICAgICdvc20tc3RhbWVuLXRvbmVyJzogJ29zbS10b25lcicsXG4gICAgJ29zbS1jeWNsZW1hcCc6ICdvc20tY3ljbGUnLFxuICAgICdnb29nbGUtc2F0ZWxsaXRlJzogJ2dzYXQnLFxuICAgICdnb29nbGUtaHlicmlkJzogJ2doeWInLFxuICAgICdnb29nbGUtdGVycmFpbic6ICdncGh5JyxcbiAgICAnZ29vZ2xlLXN0cmVldCc6ICdnbWFwJyxcbiAgICAnYmluZy1yb2FkJzogJ2JtYXAnLFxuICAgICdiaW5nLWFlcmlhbCc6ICdiYWVyaWFsJyxcbiAgICAnYmluZy1oeWJyaWQnOiAnYmh5YnJpZCcsXG4gICAgJ2lnbi1zY2FuJzogJ2lnbm1hcCcsXG4gICAgJ2lnbi1wbGFuJzogJ2lnbnBsYW4nLFxuICAgICdpZ24tcGhvdG8nOiAnaWducGhvdG8nLFxuICAgICdpZ24tY2FkYXN0cmFsJzogJ2lnbmNhZGFzdHJhbCcsXG4gICAgJ2VtcHR5JzogJ2VtcHR5QmFzZWxheWVyJ1xuICB9O1xuXG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBjbGVhbk5hbWVNYXBcbiAgICpcbiAgICovXG4gIHZhciBjbGVhbk5hbWVNYXAgPSB7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IGxheWVySWRNYXBcbiAgICpcbiAgICovXG4gIHZhciBsYXllcklkTWFwID0ge1xuICB9O1xuICAvKipcbiAgICogUFJJVkFURSBQcm9wZXJ0eTogc2hvcnROYW1lTWFwXG4gICAqXG4gICAqL1xuICB2YXIgc2hvcnROYW1lTWFwID0ge1xuICB9O1xuICAvKipcbiAgICogUFJJVkFURSBQcm9wZXJ0eTogdHlwZU5hbWVNYXBcbiAgICpcbiAgICovXG4gIHZhciB0eXBlTmFtZU1hcCA9IHtcbiAgfTtcblxuICAvKipcbiAgICogUGVybWFsaW5rIGFyZ3NcbiAgICovXG4gIHZhciBwZXJtYWxpbmtBcmdzID0gbnVsbDtcblxuICAvKipcbiAgICogUFJJVkFURSBQcm9wZXJ0eTogbGF5ZXJDbGVhbk5hbWVzXG4gICAqXG4gICAqL1xuICB2YXIgbGF5ZXJDbGVhbk5hbWVzID0ge307XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IGxpem1hcExheWVyRmlsdGVyQWN0aXZlLiBDb250YWlucyBsYXllciBuYW1lIGlmIGZpbHRlciBpcyBhY3RpdmVcbiAgICpcbiAgICovXG4gIHZhciBsaXptYXBMYXllckZpbHRlckFjdGl2ZSA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IGVkaXRpb25QZW5kaW5nLiBUcnVlIHdoZW4gYW4gZWRpdGlvbiBmb3JtIGhhcyBhbHJlYWR5IGJlZW4gZGlzcGxheWVkLiBVc2VkIHRvIHByZXZlbnQgZG91YmxlLWNsaWNrIG9uIGxhdW5jaEVkaXRpb24gYnV0dG9uXG4gICAqXG4gICAqL1xuICB2YXIgZWRpdGlvblBlbmRpbmcgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBwZXJmb3JtQ2xlYW5OYW1lKGFOYW1lKSB7XG4gICAgdmFyIGFjY2VudE1hcCA9IHtcbiAgICAgICAgXCLDoFwiOiBcImFcIiwgICAgXCLDoVwiOiBcImFcIiwgICAgXCLDolwiOiBcImFcIiwgICAgXCLDo1wiOiBcImFcIiwgICAgXCLDpFwiOiBcImFcIiwgICAgXCLDp1wiOiBcImNcIiwgICAgXCLDqFwiOiBcImVcIiwgICAgXCLDqVwiOiBcImVcIiwgICAgXCLDqlwiOiBcImVcIiwgICAgXCLDq1wiOiBcImVcIiwgICAgXCLDrFwiOiBcImlcIiwgICAgXCLDrVwiOiBcImlcIiwgICAgXCLDrlwiOiBcImlcIiwgICAgXCLDr1wiOiBcImlcIiwgICAgXCLDsVwiOiBcIm5cIiwgICAgXCLDslwiOiBcIm9cIiwgICAgXCLDs1wiOiBcIm9cIiwgICAgXCLDtFwiOiBcIm9cIiwgICAgXCLDtVwiOiBcIm9cIiwgICAgXCLDtlwiOiBcIm9cIiwgICAgXCLDuVwiOiBcInVcIiwgICAgXCLDulwiOiBcInVcIiwgICAgXCLDu1wiOiBcInVcIiwgICAgXCLDvFwiOiBcInVcIiwgICAgXCLDvVwiOiBcInlcIiwgICAgXCLDv1wiOiBcInlcIixcbiAgICAgICAgXCLDgFwiOiBcIkFcIiwgICAgXCLDgVwiOiBcIkFcIiwgICAgXCLDglwiOiBcIkFcIiwgICAgXCLDg1wiOiBcIkFcIiwgICAgXCLDhFwiOiBcIkFcIiwgICAgXCLDh1wiOiBcIkNcIiwgICAgXCLDiFwiOiBcIkVcIiwgICAgXCLDiVwiOiBcIkVcIiwgICAgXCLDilwiOiBcIkVcIiwgICAgXCLDi1wiOiBcIkVcIiwgICAgXCLDjFwiOiBcIklcIiwgICAgXCLDjVwiOiBcIklcIiwgICAgXCLDjlwiOiBcIklcIiwgICAgXCLDj1wiOiBcIklcIiwgICAgXCLDkVwiOiBcIk5cIiwgICAgXCLDklwiOiBcIk9cIiwgICAgXCLDk1wiOiBcIk9cIiwgICAgXCLDlFwiOiBcIk9cIiwgICAgXCLDlVwiOiBcIk9cIiwgICAgXCLDllwiOiBcIk9cIiwgICAgXCLDmVwiOiBcIlVcIiwgICAgXCLDmlwiOiBcIlVcIiwgICAgXCLDm1wiOiBcIlVcIiwgICAgXCLDnFwiOiBcIlVcIiwgICAgXCLDnVwiOiBcIllcIixcbiAgICAgICAgXCItXCI6XCIgXCIsIFwiJ1wiOiBcIiBcIiwgXCIoXCI6IFwiIFwiLCBcIilcIjogXCIgXCJ9O1xuICAgIHZhciBub3JtYWxpemUgPSBmdW5jdGlvbiggdGVybSApIHtcbiAgICAgICAgdmFyIHJldCA9IFwiXCI7XG4gICAgICAgIGZvciAoIHZhciBpID0gMDsgaSA8IHRlcm0ubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICByZXQgKz0gYWNjZW50TWFwWyB0ZXJtLmNoYXJBdChpKSBdIHx8IHRlcm0uY2hhckF0KGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgfTtcbiAgICB2YXIgdGhlQ2xlYW5OYW1lID0gbm9ybWFsaXplKGFOYW1lKTtcbiAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cCgnXFxcXFcnLCAnZycpO1xuICAgIHJldHVybiB0aGVDbGVhbk5hbWUucmVwbGFjZShyZWcsICdfJyk7XG4gIH1cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogY2xlYW5OYW1lXG4gICAqIGNsZWFuaW5nIGxheWVyTmFtZSBmb3IgY2xhc3MgYW5kIGxheWVyXG4gICAqL1xuICBmdW5jdGlvbiBjbGVhbk5hbWUoYU5hbWUpe1xuICAgIGlmICggYU5hbWUgaW4gY2xlYW5OYW1lTWFwIClcbiAgICAgICAgcmV0dXJuIGFOYW1lO1xuXG4gICAgdGhlQ2xlYW5OYW1lID0gcGVyZm9ybUNsZWFuTmFtZSggYU5hbWUgKTtcbiAgICBpZiAoICh0aGVDbGVhbk5hbWUgaW4gY2xlYW5OYW1lTWFwKSAmJiBjbGVhbk5hbWVNYXBbdGhlQ2xlYW5OYW1lXSAhPSBhTmFtZSApe1xuICAgICAgICBpID0gMTtcbiAgICAgICAgbkNsZWFuTmFtZSA9IHRoZUNsZWFuTmFtZStpO1xuICAgICAgICB3aGlsZSggKG5DbGVhbk5hbWUgaW4gY2xlYW5OYW1lTWFwKSAmJiBjbGVhbk5hbWVNYXBbbkNsZWFuTmFtZV0gIT0gYU5hbWUgKXtcbiAgICAgICAgICBpICs9IDE7XG4gICAgICAgICAgbkNsZWFuTmFtZSA9IHRoZUNsZWFuTmFtZStpO1xuICAgICAgICB9XG4gICAgICAgIHRoZUNsZWFuTmFtZSA9IG5DbGVhbk5hbWU7XG4gICAgfVxuICAgIGNsZWFuTmFtZU1hcFt0aGVDbGVhbk5hbWVdID0gYU5hbWU7XG4gICAgcmV0dXJuIHRoZUNsZWFuTmFtZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE5hbWVCeUNsZWFuTmFtZSggY2xlYW5OYW1lICl7XG4gICAgdmFyIG5hbWUgPSBudWxsO1xuICAgIGlmKCBjbGVhbk5hbWUgaW4gY2xlYW5OYW1lTWFwIClcbiAgICAgIG5hbWUgPSBjbGVhbk5hbWVNYXBbY2xlYW5OYW1lXTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE5hbWVCeVNob3J0TmFtZSggc2hvcnROYW1lICl7XG4gICAgdmFyIG5hbWUgPSBudWxsO1xuICAgIGlmKCBzaG9ydE5hbWUgaW4gc2hvcnROYW1lTWFwIClcbiAgICAgIG5hbWUgPSBzaG9ydE5hbWVNYXBbc2hvcnROYW1lXTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldE5hbWVCeVR5cGVOYW1lKCB0eXBlTmFtZSApe1xuICAgIHZhciBuYW1lID0gbnVsbDtcbiAgICBpZiggdHlwZU5hbWUgaW4gdHlwZU5hbWVNYXAgKVxuICAgICAgbmFtZSA9IHR5cGVOYW1lTWFwW3R5cGVOYW1lXTtcbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExheWVyTmFtZUJ5Q2xlYW5OYW1lKCBjbGVhbk5hbWUgKXtcbiAgICB2YXIgbGF5ZXJOYW1lID0gbnVsbDtcbiAgICBpZiggY2xlYW5OYW1lIGluIGxheWVyQ2xlYW5OYW1lcyApXG4gICAgICBsYXllck5hbWUgPSBsYXllckNsZWFuTmFtZXNbY2xlYW5OYW1lXTtcbiAgICBpZiAoIGxheWVyTmFtZSA9PSBudWxsICYmIGNsZWFuTmFtZSBpbiBjbGVhbk5hbWVNYXAgKSB7XG4gICAgICBsYXllck5hbWUgPSBjbGVhbk5hbWVNYXBbY2xlYW5OYW1lXTtcbiAgICAgIGxheWVyQ2xlYW5OYW1lc1tjbGVhbk5hbWVdID0gbGF5ZXJOYW1lO1xuICAgIH1cbiAgICByZXR1cm4gbGF5ZXJOYW1lO1xuICB9XG5cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogdXBkYXRlTW9iaWxlXG4gICAqIERldGVybWluZSBpZiB3ZSBzaG91bGQgZGlzcGxheSB0aGUgbW9iaWxlIHZlcnNpb24uXG4gICAqL1xuICBmdW5jdGlvbiB1cGRhdGVNb2JpbGUoKXtcbiAgICB2YXIgaXNNb2JpbGUgPSBtQ2hlY2tNb2JpbGUoKTtcbiAgICB2YXIgY29udGVudElzTW9iaWxlID0gJCgnI2NvbnRlbnQnKS5oYXNDbGFzcygnbW9iaWxlJyk7XG4gICAgaWYgKGlzTW9iaWxlID09IGNvbnRlbnRJc01vYmlsZSlcbiAgICAgIHJldHVybjtcblxuICAgIGlmIChpc01vYmlsZSkge1xuICAgICAgLy8gQWRkIG1vYmlsZSBjbGFzcyB0byBjb250ZW50XG4gICAgICAkKCcjY29udGVudCwgI2hlYWRlcm1lbnUnKS5hZGRDbGFzcygnbW9iaWxlJyk7XG5cbiAgICAgIC8vIGhpZGUgb3ZlcnZpZXcgbWFwXG4gICAgICBpZiAoY29uZmlnLm9wdGlvbnMuaGFzT3ZlcnZpZXcpe1xuICAgICAgICAkKCcjb3ZlcnZpZXctdG9nZ2xlJykuaGlkZSgpO1xuICAgICAgICAkKCcjb3ZlcnZpZXctbWFwJykuaGlkZSgpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cblxuICAgICAgLy8gSGlkZSBzd2l0Y2hlclxuICAgICAgaWYoICQoJyNidXR0b24tc3dpdGNoZXInKS5wYXJlbnQoKS5oYXNDbGFzcygnYWN0aXZlJykgKVxuICAgICAgICAkKCcjYnV0dG9uLXN3aXRjaGVyJykuY2xpY2soKTtcblxuICAgICAgLy8gSGlkZSB0b29sdGlwLWxheWVyXG4gICAgICBpZiggJCgnI2J1dHRvbi10b29sdGlwLWxheWVyJykucGFyZW50KCkuaGFzQ2xhc3MoJ2FjdGl2ZScpIClcbiAgICAgICAgJCgnI2J1dHRvbi10b29sdGlwLWxheWVyJykuY2xpY2soKTtcblxuICAgICAgaWYoICQoJyNtZW51JykuaXMoJzp2aXNpYmxlJykpXG4gICAgICAgICQoJyNtZW51JykuaGlkZSgpO1xuXG4gICAgICAkKCcjbWFwLWNvbnRlbnQnKS5hcHBlbmQoJCgnI3Rvb2xiYXInKSk7XG5cbiAgICAgICQoJyN0b2dnbGVMZWdlbmQnKVxuICAgICAgICAuYXR0cignZGF0YS1vcmlnaW5hbC10aXRsZScsJCgnI3RvZ2dsZUxlZ2VuZE9uJykuYXR0cigndmFsdWUnKSlcbiAgICAgICAgLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywnbGVnZW5kJyk7XG5cbiAgICAgIC8vIGF1dG9jb21wbGV0aW9uIGl0ZW1zIGZvciBsb2NhdGVieWxheWVyIGZlYXR1cmVcbiAgICAgICQoJ2Rpdi5sb2NhdGUtbGF5ZXIgc2VsZWN0Jykuc2hvdygpO1xuICAgICAgJCgnc3Bhbi5jdXN0b20tY29tYm9ib3gnKS5oaWRlKCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICB7XG4gICAgICAvLyBSZW1vdmUgbW9iaWxlIGNsYXNzIHRvIGNvbnRlbnRcbiAgICAgICQoJyNjb250ZW50LCAjaGVhZGVybWVudScpLnJlbW92ZUNsYXNzKCdtb2JpbGUnKTtcblxuICAgICAgLy8gRGlzcGxheSBvdmVydmlldyBtYXBcbiAgICAgIGlmIChjb25maWcub3B0aW9ucy5oYXNPdmVydmlldyl7XG4gICAgICAgICQoJyNvdmVydmlldy1tYXAnKS5zaG93KCk7XG4gICAgICAgICQoJyNvdmVydmlldy10b2dnbGUnKS5zaG93KCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfVxuICAgICAgLy8gU2hvdyBzd2l0Y2hlclxuICAgICAgaWYoICEoICQoJyNidXR0b24tc3dpdGNoZXInKS5wYXJlbnQoKS5oYXNDbGFzcygnYWN0aXZlJykgKSApXG4gICAgICAgICQoJyNidXR0b24tc3dpdGNoZXInKS5jbGljaygpO1xuXG4gICAgICBpZiggISQoJyNtZW51JykuaXMoJzp2aXNpYmxlJykpXG4gICAgICAgICQoJyNjb250ZW50IHNwYW4udWktaWNvbi1vcGVuLW1lbnUnKS5jbGljaygpO1xuICAgICAgZWxzZVxuICAgICAgICAkKCcjbWFwLWNvbnRlbnQnKS5zaG93KCk7XG5cbiAgICAgICQoJyN0b29sYmFyJykuaW5zZXJ0QmVmb3JlKCQoJyNzd2l0Y2hlci1tZW51JykpO1xuXG4gICAgICAkKCcjdG9nZ2xlTGVnZW5kJylcbiAgICAgICAgLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLCQoJyN0b2dnbGVNYXBPbmx5T24nKS5hdHRyKCd2YWx1ZScpKVxuICAgICAgICAucGFyZW50KCkuYXR0cignY2xhc3MnLCdtYXAnKTtcblxuICAgICAgLy8gYXV0b2NvbXBsZXRpb24gaXRlbXMgZm9yIGxvY2F0ZWJ5bGF5ZXIgZmVhdHVyZVxuICAgICAgJCgnZGl2LmxvY2F0ZS1sYXllciBzZWxlY3QnKS5oaWRlKCk7XG4gICAgICAkKCdzcGFuLmN1c3RvbS1jb21ib2JveCcpLnNob3coKTtcbiAgICB9XG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IHVwZGF0ZUNvbnRlbnRTaXplXG4gICAqIHVwZGF0ZSB0aGUgY29udGVudCBzaXplXG4gICAqL1xuICBmdW5jdGlvbiB1cGRhdGVDb250ZW50U2l6ZSgpe1xuXG4gICAgdXBkYXRlTW9iaWxlKCk7XG5cbiAgICAvLyBjYWxjdWxhdGUgaGVpZ2h0IGhlaWdodFxuICAgIHZhciBoID0gJCh3aW5kb3cpLmlubmVySGVpZ2h0KCk7XG4gICAgaCA9IGggLSAkKCcjaGVhZGVyJykuaGVpZ2h0KCk7XG4gICAgJCgnI21hcCcpLmhlaWdodChoKTtcblxuICAgIC8vIFVwZGF0ZSBib2R5IHBhZGRpbmcgdG9wIGJ5IHN1bW1pbmcgdXAgaGVhZGVyK2hlYWRlcm1lbnVcbiAgICAkKCdib2R5JykuY3NzKCdwYWRkaW5nLXRvcCcsICQoJyNoZWFkZXInKS5vdXRlckhlaWdodCgpICk7XG5cbiAgICAvLyBjYWxjdWxhdGUgbWFwIHdpZHRoIGRlcGVuZGluZyBvbiB0aGVtZSBjb25maWd1cmF0aW9uXG4gICAgLy8gKGZ1bGxzY3JlZW4gbWFwIG9yIG5vdCwgbW9iaWxlIG9yIG5vdClcbiAgICB2YXIgdyA9ICQoJ2JvZHknKS5wYXJlbnQoKVswXS5vZmZzZXRXaWR0aDtcbiAgICB3IC09IHBhcnNlSW50KCQoJyNtYXAtY29udGVudCcpLmNzcygnbWFyZ2luLWxlZnQnKSk7XG4gICAgdyAtPSBwYXJzZUludCgkKCcjbWFwLWNvbnRlbnQnKS5jc3MoJ21hcmdpbi1yaWdodCcpKTtcbiAgICBpZiAoJCgnI21lbnUnKS5pcygnOmhpZGRlbicpIHx8ICQoJyNtYXAtY29udGVudCcpLmhhc0NsYXNzKCdmdWxsc2NyZWVuJykpIHtcbiAgICAgICQoJyNtYXAtY29udGVudCcpLmNzcygnbWFyZ2luLWxlZnQnLCdhdXRvJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHcgLT0gJCgnI21lbnUnKS53aWR0aCgpO1xuICAgICAgJCgnI21hcC1jb250ZW50JykuY3NzKCdtYXJnaW4tbGVmdCcsICQoJyNtZW51Jykud2lkdGgoKSk7XG4gICAgfVxuICAgICQoJyNtYXAnKS53aWR0aCh3KTtcblxuICAgIC8vIFNldCB0aGUgdGFiLWNvbnRlbnQgbWF4LWhlaWdodFxuICAgIGlmICggJCgnI2RvY2stdGFicycpLmlzKCc6dmlzaWJsZScpIClcbiAgICAgICAgJCgnI2RvY2stY29udGVudCcpLmNzcyggJ21heC1oZWlnaHQnLCAkKCcjZG9jaycpLmhlaWdodCgpIC0gJCgnI2RvY2stdGFicycpLmhlaWdodCgpICk7XG5cbiAgICAkKCcjZG9jaycpLmNzcygnb3ZlcmZsb3cteScsICdoaWRkZW4nKTtcblxuICAgIGlmKG1hcClcbiAgICAgIHVwZGF0ZU1hcFNpemUoKTtcblxuICB9XG5cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogdXBkYXRlTWFwU2l6ZVxuICAgKiBxdWVyeSBPcGVuTGF5ZXJzIHRvIHVwZGF0ZSB0aGUgbWFwIHNpemVcbiAgICovXG4gZnVuY3Rpb24gdXBkYXRlTWFwU2l6ZSgpe1xuICAgIC8vbWFuYWdlIFdNUyBtYXggd2lkdGggYW5kIGhlaWdodFxuICAgIHZhciB3bXNNYXhXaWR0aCA9IDMwMDA7XG4gICAgdmFyIHdtc01heEhlaWdodCA9IDMwMDA7XG4gICAgaWYoICgnd21zTWF4V2lkdGgnIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy53bXNNYXhXaWR0aCApXG4gICAgICAgIHdtc01heFdpZHRoID0gTnVtYmVyKGNvbmZpZy5vcHRpb25zLndtc01heFdpZHRoKTtcbiAgICBpZiggKCd3bXNNYXhIZWlnaHQnIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy53bXNNYXhIZWlnaHQgKVxuICAgICAgICB3bXNNYXhIZWlnaHQgPSBOdW1iZXIoY29uZmlnLm9wdGlvbnMud21zTWF4SGVpZ2h0KTtcbiAgICB2YXIgcmVtb3ZlU2luZ2xlVGlsZSA9IGZhbHNlO1xuICAgIHZhciBuZXdNYXBTaXplID0gbWFwLmdldEN1cnJlbnRTaXplKCk7XG4gICAgdmFyIHJlcGxhY2VTaW5nbGVUaWxlU2l6ZSA9IG5ld01hcFNpemUuY2xvbmUoKTtcbiAgICBpZiggbmV3TWFwU2l6ZS53ID4gd21zTWF4V2lkdGggfHwgbmV3TWFwU2l6ZS5oID4gd21zTWF4SGVpZ2h0ICl7XG4gICAgICAgIHJlbW92ZVNpbmdsZVRpbGUgPSB0cnVlO1xuICAgICAgICB2YXIgd21zTWF4TWF4ID0gTWF0aC5tYXgod21zTWF4V2lkdGgsIHdtc01heEhlaWdodCk7XG4gICAgICAgIHZhciB3bXNNaW5NYXggPSBNYXRoLm1pbih3bXNNYXhXaWR0aCwgd21zTWF4SGVpZ2h0KTtcbiAgICAgICAgdmFyIG1hcE1heCA9IE1hdGgubWF4KG5ld01hcFNpemUudywgbmV3TWFwU2l6ZS5oKTtcbiAgICAgICAgdmFyIG1hcE1pbiA9IE1hdGgubWluKG5ld01hcFNpemUudywgbmV3TWFwU2l6ZS5oKTtcbiAgICAgICAgaWYoIG1hcE1heC8yID4gbWFwTWluIClcbiAgICAgICAgICByZXBsYWNlU2luZ2xlVGlsZVNpemUgPSBuZXcgT3BlbkxheWVycy5TaXplKE1hdGgucm91bmQobWFwTWF4LzIpLCBNYXRoLnJvdW5kKG1hcE1heC8yKSk7XG4gICAgICAgIGVsc2UgaWYoIHdtc01heE1heC8yID4gbWFwTWluIClcbiAgICAgICAgICByZXBsYWNlU2luZ2xlVGlsZVNpemUgPSBuZXcgT3BlbkxheWVycy5TaXplKE1hdGgucm91bmQod21zTWF4TWF4LzIpLCBNYXRoLnJvdW5kKHdtc01heE1heC8yKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXBsYWNlU2luZ2xlVGlsZVNpemUgPSBuZXcgT3BlbkxheWVycy5TaXplKE1hdGgucm91bmQod21zTWluTWF4LzIpLCBNYXRoLnJvdW5kKHdtc01pbk1heC8yKSk7XG4gICAgfVxuICAgIC8vIFVwZGF0ZSBzaW5nbGVUaWxlIGxheWVyc1xuICAgIGZvcih2YXIgaT0wLCBsZW49bWFwLmxheWVycy5sZW5ndGg7IGk8bGVuOyArK2kpIHtcbiAgICAgICAgdmFyIGxheWVyID0gbWFwLmxheWVyc1tpXTtcbiAgICAgICAgaWYoICEobGF5ZXIgaW5zdGFuY2VvZiBPcGVuTGF5ZXJzLkxheWVyLldNUykgKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIHZhciBxZ2lzTmFtZSA9IG51bGw7XG4gICAgICAgIGlmICggbGF5ZXIubmFtZSBpbiBjbGVhbk5hbWVNYXAgKVxuICAgICAgICAgICAgcWdpc05hbWUgPSBnZXRMYXllck5hbWVCeUNsZWFuTmFtZShsYXllci5uYW1lKTtcbiAgICAgICAgdmFyIGNvbmZpZ0xheWVyID0gbnVsbDtcbiAgICAgICAgaWYgKCBxZ2lzTmFtZSApXG4gICAgICAgICAgICBjb25maWdMYXllciA9IGNvbmZpZy5sYXllcnNbcWdpc05hbWVdO1xuICAgICAgICBpZiAoICFjb25maWdMYXllciApXG4gICAgICAgICAgICBjb25maWdMYXllciA9IGNvbmZpZy5sYXllcnNbbGF5ZXIucGFyYW1zWydMQVlFUlMnXV07XG4gICAgICAgIGlmICggIWNvbmZpZ0xheWVyIClcbiAgICAgICAgICAgIGNvbmZpZ0xheWVyID0gY29uZmlnLmxheWVyc1tsYXllci5uYW1lXTtcbiAgICAgICAgaWYgKCAhY29uZmlnTGF5ZXIgKVxuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIGlmKCBjb25maWdMYXllci5zaW5nbGVUaWxlICE9IFwiVHJ1ZVwiIClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBpZiggcmVtb3ZlU2luZ2xlVGlsZSAmJiBsYXllci5zaW5nbGVUaWxlKSB7XG4gICAgICAgICAgbGF5ZXIuYWRkT3B0aW9ucyh7c2luZ2xlVGlsZTpmYWxzZSwgdGlsZVNpemU6IHJlcGxhY2VTaW5nbGVUaWxlU2l6ZX0pO1xuICAgICAgICB9IGVsc2UgaWYoICFyZW1vdmVTaW5nbGVUaWxlICYmICFsYXllci5zaW5nbGVUaWxlKSB7XG4gICAgICAgICAgcmVwbGFjZVNpbmdsZVRpbGVTaXplLmggPSBwYXJzZUludChyZXBsYWNlU2luZ2xlVGlsZVNpemUuaCAqIGxheWVyLnJhdGlvLCAxMCk7XG4gICAgICAgICAgcmVwbGFjZVNpbmdsZVRpbGVTaXplLncgPSBwYXJzZUludChyZXBsYWNlU2luZ2xlVGlsZVNpemUudyAqIGxheWVyLnJhdGlvLCAxMCk7XG4gICAgICAgICAgbGF5ZXIuYWRkT3B0aW9ucyh7c2luZ2xlVGlsZTp0cnVlLCB0aWxlU2l6ZTogcmVwbGFjZVNpbmdsZVRpbGVTaXplfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB2YXIgY2VudGVyID0gbWFwLmdldENlbnRlcigpO1xuICAgIG1hcC51cGRhdGVTaXplKCk7XG4gICAgbWFwLnNldENlbnRlcihjZW50ZXIpO1xuICAgIG1hcC5iYXNlTGF5ZXIucmVkcmF3KCk7XG5cbiAgICB2YXIgc2xpZGVyID0gJCgnI25hdmJhciAuc2xpZGVyJyk7XG4gICAgaWYgKCBzbGlkZXIuaXMoJzp2aXNpYmxlJykgJiYgKCQoJyNuYXZiYXInKS5oZWlnaHQoKSsxNTAgPiAkKCcjbWFwJykuaGVpZ2h0KCkgfHwgbUNoZWNrTW9iaWxlKCkpIClcbiAgICAgIHNsaWRlci5oaWRlKCk7XG4gICAgZWxzZSBpZiAoICFzbGlkZXIuaXMoJzp2aXNpYmxlJykgJiYgJCgnI25hdmJhcicpLmhlaWdodCgpKzIwMCA8ICQoJyNtYXAnKS5oZWlnaHQoKSAmJiAhbUNoZWNrTW9iaWxlKCkgKVxuICAgICAgc2xpZGVyLnNob3coKTtcblxuICAgIHVwZGF0ZVN3aXRjaGVyU2l6ZSgpO1xuXG4gICAgdXBkYXRlTWluaURvY2tTaXplKCk7XG4gIH1cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogdXBkYXRlU3dpdGNoZXJTaXplXG4gICAqIHVwZGF0ZSB0aGUgc3dpdGNoZXIgc2l6ZVxuICAgKi9cbiAgZnVuY3Rpb24gdXBkYXRlU3dpdGNoZXJTaXplKCl7XG5cbiAgICAvLyBTZXQgdGhlIHN3aXRjaGVyIGNvbnRlbnQgYSBtYXgtaGVpZ2h0XG4gICAgJCgnI3N3aXRjaGVyLWxheWVycy1jb250YWluZXInKS5jc3MoICdoZWlnaHQnLCAnYXV0bycgKTtcbiAgICB2YXIgbWggPSAkKCcjZG9jaycpLmhlaWdodCgpIC0gKCQoJyNkb2NrLXRhYnMnKS5oZWlnaHQoKSsxKSAtICQoJyNzd2l0Y2hlci1sYXllcnMtY29udGFpbmVyIGgzJykuaGVpZ2h0KCkgLSAoJCgnI3N3aXRjaGVyLWxheWVycy1hY3Rpb25zJykuaGVpZ2h0KCkrMSk7XG4gICAgbWggLT0gcGFyc2VJbnQoJCgnI3N3aXRjaGVyLWxheWVycy1jb250YWluZXIgLm1lbnUtY29udGVudCcpLmNzcyggJ3BhZGRpbmctdG9wJyApKTtcbiAgICBtaCAtPSBwYXJzZUludCgkKCcjc3dpdGNoZXItbGF5ZXJzLWNvbnRhaW5lciAubWVudS1jb250ZW50JykuY3NzKCAncGFkZGluZy1ib3R0b20nICkpO1xuICAgIGlmICggJCgnI3N3aXRjaGVyLWJhc2VsYXllcicpLmlzKCc6dmlzaWJsZScpIClcbiAgICAgICAgbWggLT0gJCgnI3N3aXRjaGVyLWJhc2VsYXllcicpLmhlaWdodCgpO1xuICAgICQoJyNzd2l0Y2hlci1sYXllcnMtY29udGFpbmVyIC5tZW51LWNvbnRlbnQnKS5jc3MoICdtYXgtaGVpZ2h0JywgbWggKS5jc3MoJ292ZXJmbG93LXgnLCAnaGlkZGVuJykuY3NzKCdvdmVyZmxvdy15JywgJ2F1dG8nKTtcblxuICAgIC8vIGNhbGN1bGF0ZSBzd2l0Y2hlciBoZWlnaHRcbiAgICAvLyBiYXNlZCBvbiBtYXAgaGVpZ2h0XG4gICAgaCA9ICQoJyNtYXAnKS5oZWlnaHQoKTtcbiAgICAvLyBkZXBlbmRpbmcgb24gZWxlbWVudCBpbiAjbWVudSBkaXZcbiAgICBpZiAoJCgnI2Nsb3NlLW1lbnUnKS5pcygnOnZpc2libGUnKSlcbiAgICAgIGggLT0gJCgnI2Nsb3NlLW1lbnUnKS5vdXRlckhlaWdodCh0cnVlKTtcblxuICAgIGlmICggJCgnI21lbnUgI3Rvb2xiYXInKS5sZW5ndGggIT0gMCApIHtcbiAgICAgICQoJyN0b29sYmFyJykuY2hpbGRyZW4oKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgaWYgKCBzZWxmLmlzKCc6dmlzaWJsZScpICkge1xuICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHNlbGYuY2hpbGRyZW4oKTtcbiAgICAgICAgICBoIC09IGNoaWxkcmVuLmZpcnN0KCkub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgICAgICAgaWYgKCBjaGlsZHJlbi5sZW5ndGggPiAxIClcbiAgICAgICAgICAgIGggLT0gY2hpbGRyZW4ubGFzdCgpLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKCQoJyNzd2l0Y2hlci1iYXNlbGF5ZXInKS5pcygnOnZpc2libGUnKSkge1xuICAgICAgaCAtPSAkKCcjc3dpdGNoZXItYmFzZWxheWVyJykuY2hpbGRyZW4oKS5maXJzdCgpLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgaCAtPSAkKCcjc3dpdGNoZXItYmFzZWxheWVyJykuY2hpbGRyZW4oKS5sYXN0KCkub3V0ZXJIZWlnaHQodHJ1ZSk7XG4gICAgfVxuICAgIGggLT0gJCgnI3N3aXRjaGVyLW1lbnUnKS5jaGlsZHJlbigpLmZpcnN0KCkub3V0ZXJIZWlnaHQodHJ1ZSk7XG5cbiAgICB2YXIgc3cgPSAkKCcjc3dpdGNoZXInKTtcbiAgICAvLyBkZXBlbmRpbmcgb24gaXQncyBvd24gY3NzIGJveCBwYXJhbWV0ZXJzXG4gICAgaCAtPSAocGFyc2VJbnQoc3cuY3NzKCdtYXJnaW4tdG9wJykpID8gcGFyc2VJbnQoc3cuY3NzKCdtYXJnaW4tdG9wJykpIDogMCApIDtcbiAgICBoIC09IChwYXJzZUludChzdy5jc3MoJ21hcmdpbi1ib3R0b20nKSkgPyBwYXJzZUludChzdy5jc3MoJ21hcmdpbi1ib3R0b20nKSkgOiAwICkgO1xuICAgIGggLT0gKHBhcnNlSW50KHN3LmNzcygncGFkZGluZy10b3AnKSkgPyBwYXJzZUludChzdy5jc3MoJ3BhZGRpbmctdG9wJykpIDogMCApIDtcbiAgICBoIC09IChwYXJzZUludChzdy5jc3MoJ3BhZGRpbmctYm90dG9tJykpID8gcGFyc2VJbnQoc3cuY3NzKCdwYWRkaW5nLWJvdHRvbScpKSA6IDAgKSA7XG4gICAgaCAtPSAocGFyc2VJbnQoc3cuY3NzKCdib3JkZXItdG9wLXdpZHRoJykpID8gcGFyc2VJbnQoc3cuY3NzKCdib3JkZXItdG9wLXdpZHRoJykpIDogMCApIDtcbiAgICBoIC09IChwYXJzZUludChzdy5jc3MoJ2JvcmRlci1ib3R0b20td2lkdGgnKSkgPyBwYXJzZUludChzdy5jc3MoJ2JvcmRlci1ib3R0b20td2lkdGgnKSkgOiAwICkgO1xuXG4gICAgLy9kZXBlbmRpbmcgb24gaXQncyBwYXJlbnQgcGFkZGluZ1xuICAgIHZhciBzd3AgPSBzdy5wYXJlbnQoKTtcbiAgICBoIC09IChwYXJzZUludChzd3AuY3NzKCdwYWRkaW5nLXRvcCcpKSA/IHBhcnNlSW50KHN3cC5jc3MoJ3BhZGRpbmctdG9wJykpIDogMCApIDtcbiAgICBoIC09IChwYXJzZUludChzd3AuY3NzKCdwYWRkaW5nLWJvdHRvbScpKSA/IHBhcnNlSW50KHN3cC5jc3MoJ3BhZGRpbmctYm90dG9tJykpIDogMCApIDtcblxuICAgIC8vIElmIG1hcCBpZiBmdWxsc2NyZWVuLCBnZXQgI21lbnUgcG9zaXRpb24gOiBib3R0b20gb3IgdG9wXG4gICAgaCAtPSAyICogKHBhcnNlSW50KCQoJyNtZW51JykuY3NzKCdib3R0b20nKSkgPyBwYXJzZUludCgkKCcjbWVudScpLmNzcygnYm90dG9tJykpIDogMCApIDtcblxuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IHVwZGF0ZU1pbmlEb2NrU2l6ZVxuICAgKiB1cGRhdGUgdGhlIG1pbmlkb2NrIHNpemVcbiAgICovXG4gIGZ1bmN0aW9uIHVwZGF0ZU1pbmlEb2NrU2l6ZSgpIHtcbiAgICAgIGlmICggJCgnI21pbmktZG9jayAudGFiLXBhbmU6dmlzaWJsZScpLmxlbmd0aCA9PSAwIClcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICAvLyB0aGUgbWluaS1kb2NrIG1lbnUtY29udGVudCB2aXNpYmxlXG4gICAgICB2YXIgbWRtY3YgPSAkKCcjbWluaS1kb2NrIC50YWItcGFuZTp2aXNpYmxlIGgzIH4gLm1lbnUtY29udGVudDpmaXJzdCcpO1xuICAgICAgbWRtY3YuY3NzKCAnbWF4LWhlaWdodCcsICcxMDAlJyApXG4gICAgICB2YXIgaCA9ICQoJyNtaW5pLWRvY2snKS5oZWlnaHQoKTtcbiAgICAgIGggLT0gJCgnI21pbmktZG9jayAudGFiLXBhbmU6dmlzaWJsZSBoMycpLmhlaWdodCgpO1xuICAgICAgaCAtPSAocGFyc2VJbnQobWRtY3YuY3NzKCdtYXJnaW4tdG9wJykpID8gcGFyc2VJbnQobWRtY3YuY3NzKCdtYXJnaW4tdG9wJykpIDogMCApIDtcbiAgICAgIGggLT0gKHBhcnNlSW50KG1kbWN2LmNzcygnbWFyZ2luLWJvdHRvbScpKSA/IHBhcnNlSW50KG1kbWN2LmNzcygnbWFyZ2luLWJvdHRvbScpKSA6IDAgKSA7XG4gICAgICBoIC09IChwYXJzZUludChtZG1jdi5jc3MoJ3BhZGRpbmctdG9wJykpID8gcGFyc2VJbnQobWRtY3YuY3NzKCdwYWRkaW5nLXRvcCcpKSA6IDAgKSA7XG4gICAgICBoIC09IChwYXJzZUludChtZG1jdi5jc3MoJ3BhZGRpbmctYm90dG9tJykpID8gcGFyc2VJbnQobWRtY3YuY3NzKCdwYWRkaW5nLWJvdHRvbScpKSA6IDAgKSA7XG5cbiAgICAgIG1kbWN2LmNzcyggJ21heC1oZWlnaHQnLCBoICkuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpLmNzcygnb3ZlcmZsb3cteScsICdhdXRvJyk7XG4gIH1cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogZ2V0RG9ja1JpZ2h0UG9zaXRpb25cbiAgICogQ2FsY3VsYXRlIHRoZSBwb3NpdGlvbiBvbiB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgZG9ja1xuICAgKi9cbiAgZnVuY3Rpb24gZ2V0RG9ja1JpZ2h0UG9zaXRpb24oKSB7XG4gICAgdmFyIHJpZ2h0ID0gJCgnI21hcG1lbnUnKS53aWR0aCgpO1xuICAgIGlmKCAkKCcjY29udGVudCcpLmhhc0NsYXNzKCdlbWJlZCcpIClcbiAgICAgICAgcmlnaHQrPSAxMTtcbiAgICBlbHNlIGlmKCAkKCcjZG9jaycpLmNzcygnZGlzcGxheScpICE9ICdub25lJyAmJiAhbGl6TWFwLmNoZWNrTW9iaWxlKCkgKVxuICAgICAgICByaWdodCs9ICQoJyNkb2NrJykud2lkdGgoKSArIDExO1xuICAgIHJldHVybiByaWdodDtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGdldExheWVyTGVnZW5kR3JhcGhpY1VybFxuICAgKiBnZXQgdGhlIGxheWVyIGxlZ2VuZCBncmFwaGljXG4gICAqXG4gICAqIFBhcmFtZXRlcnM6XG4gICAqIG5hbWUgLSB7dGV4dH0gdGhlIGxheWVyIG5hbWVcbiAgICogd2l0aFNjYWxlIC0ge2Jvb2xlYW59IHVybCB3aXRoIHNjYWxlIHBhcmFtZXRlclxuICAgKlxuICAgKiBEZXBlbmRlbmNpZXM6XG4gICAqIGxpelVybHMud21zXG4gICAqXG4gICAqIFJldHVybnM6XG4gICAqIHt0ZXh0fSB0aGUgdXJsXG4gICAqL1xuICBmdW5jdGlvbiBnZXRMYXllckxlZ2VuZEdyYXBoaWNVcmwobmFtZSwgd2l0aFNjYWxlKSB7XG4gICAgdmFyIGxheWVyID0gbnVsbFxuICAgICQuZWFjaChsYXllcnMsZnVuY3Rpb24oaSxsKSB7XG4gICAgICBpZiAobGF5ZXIgPT0gbnVsbCAmJiBsLm5hbWUgPT0gbmFtZSlcbiAgICAgICAgbGF5ZXIgPSBsO1xuICAgIH0pO1xuICAgIGlmIChsYXllciA9PSBudWxsIClcbiAgICAgIHJldHVybiBudWxsO1xuICAgIHZhciBxZ2lzTmFtZSA9IG51bGw7XG4gICAgaWYgKCBuYW1lIGluIGNsZWFuTmFtZU1hcCApXG4gICAgICAgIHFnaXNOYW1lID0gZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUobmFtZSk7XG4gICAgdmFyIGxheWVyQ29uZmlnID0gbnVsbDtcbiAgICBpZiAoIHFnaXNOYW1lIClcbiAgICAgICAgbGF5ZXJDb25maWcgPSBjb25maWcubGF5ZXJzW3FnaXNOYW1lXTtcbiAgICBpZiAoICFsYXllckNvbmZpZyApXG4gICAgICAgIGxheWVyQ29uZmlnID0gY29uZmlnLmxheWVyc1tsYXllci5wYXJhbXNbJ0xBWUVSUyddXTtcbiAgICBpZiAoICFsYXllckNvbmZpZyApXG4gICAgICAgIGxheWVyQ29uZmlnID0gY29uZmlnLmxheWVyc1tsYXllci5uYW1lXTtcbiAgICBpZiAoICFsYXllckNvbmZpZyApXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIGlmICggJ2V4dGVybmFsV21zVG9nZ2xlJyBpbiBsYXllckNvbmZpZyAmJiBsYXllckNvbmZpZy5leHRlcm5hbFdtc1RvZ2dsZSA9PSAnVHJ1ZSdcbiAgICAgICYmICdleHRlcm5hbEFjY2VzcycgaW4gbGF5ZXJDb25maWcgJiYgbGF5ZXJDb25maWcuZXh0ZXJuYWxBY2Nlc3NcbiAgICAgICYmICdsYXllcnMnIGluIGxheWVyQ29uZmlnLmV4dGVybmFsQWNjZXNzICYmICd1cmwnIGluIGxheWVyQ29uZmlnLmV4dGVybmFsQWNjZXNzKSB7XG4gICAgICAgIHZhciBleHRlcm5hbEFjY2VzcyA9IGxheWVyQ29uZmlnLmV4dGVybmFsQWNjZXNzO1xuICAgICAgICB2YXIgbGVnZW5kUGFyYW1zID0ge1NFUlZJQ0U6IFwiV01TXCIsXG4gICAgICAgICAgICAgICAgICAgICAgVkVSU0lPTjogXCIxLjMuMFwiLFxuICAgICAgICAgICAgICAgICAgICAgIFJFUVVFU1Q6IFwiR2V0TGVnZW5kR3JhcGhpY1wiLFxuICAgICAgICAgICAgICAgICAgICAgIExBWUVSOiBleHRlcm5hbEFjY2Vzcy5sYXllcnMsXG4gICAgICAgICAgICAgICAgICAgICAgU1RZTEU6IGV4dGVybmFsQWNjZXNzLnN0eWxlcyxcbiAgICAgICAgICAgICAgICAgICAgICBTTERfVkVSU0lPTjogXCIxLjEuMFwiLFxuICAgICAgICAgICAgICAgICAgICAgIEVYQ0VQVElPTlM6IFwiYXBwbGljYXRpb24vdm5kLm9nYy5zZV9pbmltYWdlXCIsXG4gICAgICAgICAgICAgICAgICAgICAgRk9STUFUOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgICAgICAgICAgIFRSQU5TUEFSRU5UOiBcIlRSVUVcIixcbiAgICAgICAgICAgICAgICAgICAgICBXSURUSDogMTUwLFxuICAgICAgICAgICAgICAgICAgICAgIERQSTogOTZ9O1xuXG4gICAgICAgIHZhciBsZWdlbmRQYXJhbXNTdHJpbmcgPSBPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVyU3RyaW5nKFxuICAgICAgICAgICAgIGxlZ2VuZFBhcmFtc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQoZXh0ZXJuYWxBY2Nlc3MudXJsLCBsZWdlbmRQYXJhbXNTdHJpbmcpO1xuICAgIH1cbiAgICB2YXIgbGVnZW5kUGFyYW1zID0ge1NFUlZJQ0U6IFwiV01TXCIsXG4gICAgICAgICAgICAgICAgICBWRVJTSU9OOiBcIjEuMy4wXCIsXG4gICAgICAgICAgICAgICAgICBSRVFVRVNUOiBcIkdldExlZ2VuZEdyYXBoaWNcIixcbiAgICAgICAgICAgICAgICAgIExBWUVSOiBsYXllci5wYXJhbXNbJ0xBWUVSUyddLFxuICAgICAgICAgICAgICAgICAgU1RZTEU6IGxheWVyLnBhcmFtc1snU1RZTEVTJ10sXG4gICAgICAgICAgICAgICAgICBFWENFUFRJT05TOiBcImFwcGxpY2F0aW9uL3ZuZC5vZ2Muc2VfaW5pbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgRk9STUFUOiBcImltYWdlL3BuZ1wiLFxuICAgICAgICAgICAgICAgICAgVFJBTlNQQVJFTlQ6IFwiVFJVRVwiLFxuICAgICAgICAgICAgICAgICAgV0lEVEg6IDE1MCxcbiAgICAgICAgICAgICAgICAgIExBWUVSRk9OVFNJWkU6IDksXG4gICAgICAgICAgICAgICAgICBJVEVNRk9OVFNJWkU6IDksXG4gICAgICAgICAgICAgICAgICBTWU1CT0xTUEFDRTogMSxcbiAgICAgICAgICAgICAgICAgIElDT05MQUJFTFNQQUNFOiAyLFxuICAgICAgICAgICAgICAgICAgRFBJOiA5Nn07XG4gICAgaWYgKGxheWVyQ29uZmlnLmlkPT1sYXllckNvbmZpZy5uYW1lKVxuICAgICAgbGVnZW5kUGFyYW1zWydMQVlFUkZPTlRCT0xEJ10gPSBcIlRSVUVcIjtcbiAgICBlbHNlIHtcbiAgICAgIGxlZ2VuZFBhcmFtc1snTEFZRVJGT05UU0laRSddID0gMDtcbiAgICAgIGxlZ2VuZFBhcmFtc1snTEFZRVJTUEFDRSddID0gMDtcbiAgICAgIGxlZ2VuZFBhcmFtc1snTEFZRVJGT05UQk9MRCddID0gXCJGQUxTRVwiO1xuICAgICAgbGVnZW5kUGFyYW1zWydMQVlFUlRJVExFJ10gPSBcIkZBTFNFXCI7XG4gICAgfVxuICAgIGlmICh3aXRoU2NhbGUpXG4gICAgICBsZWdlbmRQYXJhbXNbJ1NDQUxFJ10gPSBtYXAuZ2V0U2NhbGUoKTtcbiAgICB2YXIgbGVnZW5kUGFyYW1zU3RyaW5nID0gT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhcbiAgICAgICAgIGxlZ2VuZFBhcmFtc1xuICAgICAgICApO1xuICAgIHZhciBzZXJ2aWNlID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChsaXpVcmxzLndtc1xuICAgICAgICAsT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICApO1xuICAgIHJldHVybiBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKHNlcnZpY2UsIGxlZ2VuZFBhcmFtc1N0cmluZyk7XG4gIH1cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogZ2V0TGF5ZXJTY2FsZVxuICAgKiBnZXQgdGhlIGxheWVyIHNjYWxlcyBiYXNlZCBvbiBjaGlsZHJlbiBsYXllclxuICAgKlxuICAgKiBQYXJhbWV0ZXJzOlxuICAgKiBuZXN0ZWQgLSB7T2JqZWN0fSBhIGNhcGFiaWxpdHkgbGF5ZXJcbiAgICogbWluU2NhbGUgLSB7RmxvYXR9IHRoZSBuZXN0ZWQgbWluIHNjYWxlXG4gICAqIG1heFNjYWxlIC0ge0Zsb2F0fSB0aGUgbmVzdGVkIG1heCBzY2FsZVxuICAgKlxuICAgKiBEZXBlbmRlbmNpZXM6XG4gICAqIGNvbmZpZ1xuICAgKlxuICAgKiBSZXR1cm5zOlxuICAgKiB7T2JqZWN0fSB0aGUgbWluIGFuZCBtYXggc2NhbGVzXG4gICAqL1xuICBmdW5jdGlvbiBnZXRMYXllclNjYWxlKG5lc3RlZCxtaW5TY2FsZSxtYXhTY2FsZSkge1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBuZXN0ZWQubmVzdGVkTGF5ZXJzLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgdmFyIGxheWVyID0gbmVzdGVkLm5lc3RlZExheWVyc1tpXTtcbiAgICAgIHZhciBxZ2lzTGF5ZXJOYW1lID0gbGF5ZXIubmFtZTtcbiAgICAgIGlmICggJ3VzZUxheWVySURzJyBpbiBjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy51c2VMYXllcklEcyA9PSAnVHJ1ZScgKVxuICAgICAgICBxZ2lzTGF5ZXJOYW1lID0gbGF5ZXJJZE1hcFtsYXllci5uYW1lXTtcbiAgICAgIGVsc2UgaWYgKCBsYXllci5uYW1lIGluIHNob3J0TmFtZU1hcCApXG4gICAgICAgIHFnaXNMYXllck5hbWUgPSBzaG9ydE5hbWVNYXBbbGF5ZXIubmFtZV07XG4gICAgICB2YXIgbGF5ZXJDb25maWcgPSBjb25maWcubGF5ZXJzW3FnaXNMYXllck5hbWVdO1xuICAgICAgaWYgKGxheWVyLm5lc3RlZExheWVycy5sZW5ndGggIT0gMClcbiAgICAgICAgIHJldHVybiBnZXRMYXllclNjYWxlKGxheWVyLG1pblNjYWxlLG1heFNjYWxlKTtcbiAgICAgIGlmIChsYXllckNvbmZpZykge1xuICAgICAgICBpZiAobWluU2NhbGUgPT0gbnVsbClcbiAgICAgICAgICBtaW5TY2FsZT1sYXllckNvbmZpZy5taW5TY2FsZTtcbiAgICAgICAgZWxzZSBpZiAobGF5ZXJDb25maWcubWluU2NhbGU8bWluU2NhbGUpXG4gICAgICAgICAgbWluU2NhbGU9bGF5ZXJDb25maWcubWluU2NhbGU7XG4gICAgICAgIGlmIChtYXhTY2FsZSA9PSBudWxsKVxuICAgICAgICAgIG1heFNjYWxlPWxheWVyQ29uZmlnLm1heFNjYWxlO1xuICAgICAgICBlbHNlIGlmIChsYXllckNvbmZpZy5tYXhTY2FsZT5tYXhTY2FsZSlcbiAgICAgICAgICBtYXhTY2FsZT1sYXllckNvbmZpZy5tYXhTY2FsZTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCBtaW5TY2FsZSA8IDEgKVxuICAgICAgbWluU2NhbGUgPSAxO1xuICAgIHJldHVybiB7bWluU2NhbGU6bWluU2NhbGUsbWF4U2NhbGU6bWF4U2NhbGV9O1xuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGdldExheWVyT3JkZXJcbiAgICogZ2V0IHRoZSBsYXllciBvcmRlciBhbmQgY2FsY3VsYXRlIGl0IGlmIGl0J3MgYSBRR0lTIGdyb3VwXG4gICAqXG4gICAqIFBhcmFtZXRlcnM6XG4gICAqIG5lc3RlZCAtIHtPYmplY3R9IGEgY2FwYWJpbGl0eSBsYXllclxuICAgKlxuICAgKiBEZXBlbmRlbmNpZXM6XG4gICAqIGNvbmZpZ1xuICAgKlxuICAgKiBSZXR1cm5zOlxuICAgKiB7SW50ZWdlcn0gdGhlIGxheWVyJ3Mgb3JkZXJcbiAgICovXG4gIGZ1bmN0aW9uIGdldExheWVyT3JkZXIobmVzdGVkKSB7XG4gICAgLy8gdGhlcmUgaXMgbm8gbGF5ZXJzT3JkZXIgaW4gdGhlIHByb2plY3RcbiAgICBpZiAoISgnbGF5ZXJzT3JkZXInIGluIGNvbmZpZykpXG4gICAgICByZXR1cm4gLTE7XG5cbiAgICAvLyB0aGUgbmVzdGVkIGlzIGEgbGF5ZXIgYW5kIG5vdCBhIGdyb3VwXG4gICAgaWYgKG5lc3RlZC5uZXN0ZWRMYXllcnMubGVuZ3RoID09IDApIHtcbiAgICAgIHZhciBxZ2lzTGF5ZXJOYW1lID0gbmVzdGVkLm5hbWU7XG4gICAgICBpZiAoICd1c2VMYXllcklEcycgaW4gY29uZmlnLm9wdGlvbnMgJiYgY29uZmlnLm9wdGlvbnMudXNlTGF5ZXJJRHMgPT0gJ1RydWUnIClcbiAgICAgICAgcWdpc0xheWVyTmFtZSA9IGxheWVySWRNYXBbbmVzdGVkLm5hbWVdO1xuICAgICAgZWxzZSBpZiAoIG5lc3RlZC5uYW1lIGluIHNob3J0TmFtZU1hcCApXG4gICAgICAgIHFnaXNMYXllck5hbWUgPSBzaG9ydE5hbWVNYXBbbmVzdGVkLm5hbWVdO1xuICAgICAgaWYgKHFnaXNMYXllck5hbWUgaW4gY29uZmlnLmxheWVyc09yZGVyKVxuICAgICAgICByZXR1cm4gY29uZmlnLmxheWVyc09yZGVyW25lc3RlZC5uYW1lXTtcbiAgICAgIGVsc2VcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIC8vIHRoZSBuZXN0ZWQgaXMgYSBncm91cFxuICAgIHZhciBvcmRlciA9IC0xO1xuICAgIGZvciAodmFyIGkgPSAwLCBsZW4gPSBuZXN0ZWQubmVzdGVkTGF5ZXJzLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgdmFyIGxheWVyID0gbmVzdGVkLm5lc3RlZExheWVyc1tpXTtcbiAgICAgIHZhciBxZ2lzTGF5ZXJOYW1lID0gbGF5ZXIubmFtZTtcbiAgICAgIGlmICggJ3VzZUxheWVySURzJyBpbiBjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy51c2VMYXllcklEcyA9PSAnVHJ1ZScgKVxuICAgICAgICBxZ2lzTGF5ZXJOYW1lID0gbGF5ZXJJZE1hcFtsYXllci5uYW1lXTtcbiAgICAgIGVsc2UgaWYgKCBsYXllci5uYW1lIGluIHNob3J0TmFtZU1hcCApXG4gICAgICAgIHFnaXNMYXllck5hbWUgPSBzaG9ydE5hbWVNYXBbbGF5ZXIubmFtZV07XG4gICAgICB2YXIgbE9yZGVyID0gLTE7XG4gICAgICBpZiAobGF5ZXIubmVzdGVkTGF5ZXJzLmxlbmd0aCAhPSAwKVxuICAgICAgICBsT3JkZXIgPSBnZXRMYXllclNjYWxlKGxheWVyKTtcbiAgICAgIGVsc2UgaWYgKHFnaXNMYXllck5hbWUgaW4gY29uZmlnLmxheWVyc09yZGVyKVxuICAgICAgICBsT3JkZXIgPSBjb25maWcubGF5ZXJzT3JkZXJbcWdpc0xheWVyTmFtZV07XG4gICAgICBlbHNlXG4gICAgICAgIGxPcmRlciA9IC0xO1xuICAgICAgaWYgKGxPcmRlciAhPSAtMSkge1xuICAgICAgICBpZiAob3JkZXIgPT0gLTEgfHwgbE9yZGVyIDwgb3JkZXIpXG4gICAgICAgICAgb3JkZXIgPSBsT3JkZXI7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBvcmRlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJlZm9yZUxheWVyVHJlZUNyZWF0ZWQoKSB7XG4gICAgIGlmIChcbiAgICAgICAoKCdvc21NYXBuaWsnIGluIGNvbmZpZy5vcHRpb25zKVxuICAgICAgICAmJiBjb25maWcub3B0aW9ucy5vc21NYXBuaWsgPT0gJ1RydWUnKSB8fFxuICAgICAgICgoJ29zbVN0YW1lblRvbmVyJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnLm9wdGlvbnMub3NtU3RhbWVuVG9uZXIgPT0gJ1RydWUnKSB8fFxuICAgICAgICgoJ29zbUN5Y2xlbWFwJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnLm9wdGlvbnMub3NtQ3ljbGVtYXAgPT0gJ1RydWUnXG4gICAgICAgICYmICgnT0NNS2V5JyBpbiBjb25maWcub3B0aW9ucykpIHx8XG4gICAgICAgKCgnZ29vZ2xlU3RyZWV0cycgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICYmIGNvbmZpZy5vcHRpb25zLmdvb2dsZVN0cmVldHMgPT0gJ1RydWUnKSB8fFxuICAgICAgICgoJ2dvb2dsZVNhdGVsbGl0ZScgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICYmIGNvbmZpZy5vcHRpb25zLmdvb2dsZVNhdGVsbGl0ZSA9PSAnVHJ1ZScpIHx8XG4gICAgICAgKCgnZ29vZ2xlSHlicmlkJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnLm9wdGlvbnMuZ29vZ2xlSHlicmlkID09ICdUcnVlJykgfHxcbiAgICAgICAoKCdnb29nbGVUZXJyYWluJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnLm9wdGlvbnMuZ29vZ2xlVGVycmFpbiA9PSAnVHJ1ZScpIHx8XG4gICAgICAgKCgnYmluZ1N0cmVldHMnIGluIGNvbmZpZy5vcHRpb25zKVxuICAgICAgICAmJiBjb25maWcub3B0aW9ucy5iaW5nU3RyZWV0cyA9PSAnVHJ1ZSdcbiAgICAgICAgJiYgKCdiaW5nS2V5JyBpbiBjb25maWcub3B0aW9ucykpIHx8XG4gICAgICAgKCgnYmluZ1NhdGVsbGl0ZScgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICYmIGNvbmZpZy5vcHRpb25zLmJpbmdTYXRlbGxpdGUgPT0gJ1RydWUnXG4gICAgICAgICYmICgnYmluZ0tleScgaW4gY29uZmlnLm9wdGlvbnMpKSB8fFxuICAgICAgICgoJ2JpbmdIeWJyaWQnIGluIGNvbmZpZy5vcHRpb25zKVxuICAgICAgICAmJiBjb25maWcub3B0aW9ucy5iaW5nSHlicmlkID09ICdUcnVlJ1xuICAgICAgICAmJiAoJ2JpbmdLZXknIGluIGNvbmZpZy5vcHRpb25zKSkgfHxcbiAgICAgICAoKCdpZ25UZXJyYWluJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnLm9wdGlvbnMuaWduVGVycmFpbiA9PSAnVHJ1ZSdcbiAgICAgICAgJiYgKCdpZ25LZXknIGluIGNvbmZpZy5vcHRpb25zKSkgfHxcbiAgICAgICAoKCdpZ25TdHJlZXRzJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnLm9wdGlvbnMuaWduU3RyZWV0cyA9PSAnVHJ1ZSdcbiAgICAgICAgJiYgKCdpZ25LZXknIGluIGNvbmZpZy5vcHRpb25zKSkgfHxcbiAgICAgICAoKCdpZ25TYXRlbGxpdGUnIGluIGNvbmZpZy5vcHRpb25zKVxuICAgICAgICAmJiBjb25maWcub3B0aW9ucy5pZ25TYXRlbGxpdGUgPT0gJ1RydWUnXG4gICAgICAgICYmICgnaWduS2V5JyBpbiBjb25maWcub3B0aW9ucykpIHx8XG4gICAgICAgKCgnaWduQ2FkYXN0cmFsJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnLm9wdGlvbnMuaWduQ2FkYXN0cmFsID09ICdUcnVlJ1xuICAgICAgICAmJiAoJ2lnbktleScgaW4gY29uZmlnLm9wdGlvbnMpKVxuICAgICAgICkge1xuICAgICAgICAgUHJvajRqcy5kZWZzWydFUFNHOjM4NTcnXSA9IFByb2o0anMuZGVmc1snRVBTRzo5MDA5MTMnXTtcbiAgICAgICAgIHZhciBwcm9qID0gY29uZmlnLm9wdGlvbnMucHJvamVjdGlvbjtcbiAgICAgICAgIGlmICggIShwcm9qLnJlZiBpbiBQcm9qNGpzLmRlZnMpIClcbiAgICAgICAgICAgUHJvajRqcy5kZWZzW3Byb2oucmVmXT1wcm9qLnByb2o0O1xuICAgICAgICAgdmFyIHByb2plY3Rpb24gPSBuZXcgT3BlbkxheWVycy5Qcm9qZWN0aW9uKHByb2oucmVmKTtcbiAgICAgICAgIHZhciBwcm9qT1NNID0gbmV3IE9wZW5MYXllcnMuUHJvamVjdGlvbignRVBTRzozODU3Jyk7XG4gICAgICAgICBwcm9qLnJlZiA9ICdFUFNHOjM4NTcnO1xuICAgICAgICAgcHJvai5wcm9qNCA9IFByb2o0anMuZGVmc1snRVBTRzozODU3J107XG5cbiAgICAgICAgIC8vIFRyYW5zZm9ybSB0aGUgYmJveFxuICAgICAgICAgdmFyIGJib3ggPSBjb25maWcub3B0aW9ucy5iYm94O1xuICAgICAgICAgdmFyIGV4dGVudCA9IG5ldyBPcGVuTGF5ZXJzLkJvdW5kcyhOdW1iZXIoYmJveFswXSksTnVtYmVyKGJib3hbMV0pLE51bWJlcihiYm94WzJdKSxOdW1iZXIoYmJveFszXSkpO1xuICAgICAgICAgZXh0ZW50ID0gZXh0ZW50LnRyYW5zZm9ybShwcm9qZWN0aW9uLHByb2pPU00pO1xuICAgICAgICAgYmJveCA9IGV4dGVudC50b0FycmF5KCk7XG5cbiAgICAgICAgIHZhciBzY2FsZXMgPSBbXTtcbiAgICAgICAgIGlmICgnbWFwU2NhbGVzJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgICAgc2NhbGVzID0gY29uZmlnLm9wdGlvbnMubWFwU2NhbGVzO1xuICAgICAgICAgaWYgKCBzY2FsZXMubGVuZ3RoID09IDAgKVxuICAgICAgICAgICBzY2FsZXMgPSBbY29uZmlnLm9wdGlvbnMubWF4U2NhbGUsY29uZmlnLm9wdGlvbnMubWluU2NhbGVdO1xuXG4gICAgICAgICBjb25maWcub3B0aW9ucy5wcm9qZWN0aW9uID0gcHJvajtcbiAgICAgICAgIGNvbmZpZy5vcHRpb25zLmJib3ggPSBiYm94O1xuICAgICAgICAgY29uZmlnLm9wdGlvbnMuem9vbUxldmVsTnVtYmVyID0gMTY7XG5cbiAgICAgICAgIC8vIFRyYW5zZm9ybSB0aGUgaW5pdGlhbCBiYm94XG4gICAgICAgICBpZiAoICdpbml0aWFsRXh0ZW50JyBpbiBjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy5pbml0aWFsRXh0ZW50Lmxlbmd0aCA9PSA0ICkge1xuICAgICAgICAgICB2YXIgaW5pdEJib3ggPSBjb25maWcub3B0aW9ucy5pbml0aWFsRXh0ZW50O1xuICAgICAgICAgICB2YXIgaW5pdGlhbEV4dGVudCA9IG5ldyBPcGVuTGF5ZXJzLkJvdW5kcyhOdW1iZXIoaW5pdEJib3hbMF0pLE51bWJlcihpbml0QmJveFsxXSksTnVtYmVyKGluaXRCYm94WzJdKSxOdW1iZXIoaW5pdEJib3hbM10pKTtcbiAgICAgICAgICAgaW5pdGlhbEV4dGVudCA9IGluaXRpYWxFeHRlbnQudHJhbnNmb3JtKHByb2plY3Rpb24scHJvak9TTSk7XG4gICAgICAgICAgIGNvbmZpZy5vcHRpb25zLmluaXRpYWxFeHRlbnQgPSBpbml0aWFsRXh0ZW50LnRvQXJyYXkoKTtcbiAgICAgICAgIH1cblxuICAgICAgICAgLy8gU3BlY2lmeSB6b29tIGxldmVsIG51bWJlclxuICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICgoJ29zbU1hcG5paycgaW4gY29uZmlnLm9wdGlvbnMpICYmIGNvbmZpZy5vcHRpb25zLm9zbU1hcG5payA9PSAnVHJ1ZScpIHx8XG4gICAgICAgICAgICAgKCgnb3NtU3RhbWVuVG9uZXInIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy5vc21TdGFtZW5Ub25lciA9PSAnVHJ1ZScpIHx8XG4gICAgICAgICAgICAgKCgnb3NtQ3ljbGVtYXAnIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy5vc21DeWNsZW1hcCA9PSAnVHJ1ZScgJiYgKCdPQ01LZXknIGluIGNvbmZpZy5vcHRpb25zKSkgfHxcbiAgICAgICAgICAgICAoKCdiaW5nU3RyZWV0cycgaW4gY29uZmlnLm9wdGlvbnMpICYmIGNvbmZpZy5vcHRpb25zLmJpbmdTdHJlZXRzID09ICdUcnVlJyAmJiAoJ2JpbmdLZXknIGluIGNvbmZpZy5vcHRpb25zKSkgfHxcbiAgICAgICAgICAgICAoKCdiaW5nU2F0ZWxsaXRlJyBpbiBjb25maWcub3B0aW9ucykgJiYgY29uZmlnLm9wdGlvbnMuYmluZ1NhdGVsbGl0ZSA9PSAnVHJ1ZScgJiYgKCdiaW5nS2V5JyBpbiBjb25maWcub3B0aW9ucykpIHx8XG4gICAgICAgICAgICAgKCgnYmluZ0h5YnJpZCcgaW4gY29uZmlnLm9wdGlvbnMpICYmIGNvbmZpZy5vcHRpb25zLmJpbmdIeWJyaWQgPT0gJ1RydWUnICYmICgnYmluZ0tleScgaW4gY29uZmlnLm9wdGlvbnMpKSB8fFxuICAgICAgICAgICAgICgoJ2lnblRlcnJhaW4nIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy5pZ25UZXJyYWluID09ICdUcnVlJyAmJiAoJ2lnbktleScgaW4gY29uZmlnLm9wdGlvbnMpKSB8fFxuICAgICAgICAgICAgICgoJ2lnblN0cmVldHMnIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy5pZ25TdHJlZXRzID09ICdUcnVlJykgJiYgKCdpZ25LZXknIGluIGNvbmZpZy5vcHRpb25zKSkge1xuICAgICAgICAgICBjb25maWcub3B0aW9ucy56b29tTGV2ZWxOdW1iZXIgPSAxOTtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmICgoKCdnb29nbGVTdHJlZXRzJyBpbiBjb25maWcub3B0aW9ucykgJiYgY29uZmlnLm9wdGlvbnMuZ29vZ2xlU3RyZWV0cyA9PSAnVHJ1ZScpIHx8XG4gICAgICAgICAgICAgKCgnZ29vZ2xlSHlicmlkJyBpbiBjb25maWcub3B0aW9ucykgJiYgY29uZmlnLm9wdGlvbnMuZ29vZ2xlSHlicmlkID09ICdUcnVlJykgfHxcbiAgICAgICAgICAgICAoKCdpZ25DYWRhc3RyYWwnIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy5pZ25DYWRhc3RyYWwgPT0gJ1RydWUnICYmICgnaWduS2V5JyBpbiBjb25maWcub3B0aW9ucykpKSB7XG4gICAgICAgICAgIGNvbmZpZy5vcHRpb25zLnpvb21MZXZlbE51bWJlciA9IDIwO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKCAnZ29vZ2xlU2F0ZWxsaXRlJyBpbiBjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy5nb29nbGVTYXRlbGxpdGUgPT0gJ1RydWUnKXtcbiAgICAgICAgICAgY29uZmlnLm9wdGlvbnMuem9vbUxldmVsTnVtYmVyID0gMjE7XG4gICAgICAgICB9XG4gICAgICAgICBpZiAoICdpZ25TYXRlbGxpdGUnIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLmlnblNhdGVsbGl0ZSA9PSAnVHJ1ZScgJiYgJ2lnbktleScgaW4gY29uZmlnLm9wdGlvbnMgKSB7XG4gICAgICAgICAgIGNvbmZpZy5vcHRpb25zLnpvb21MZXZlbE51bWJlciA9IDIyO1xuICAgICAgICAgfVxuICAgICAgICAgY29uZmlnLm9wdGlvbnMubWF4U2NhbGUgPSA1OTE2NTkwMzAuMzIyNDc1NjtcbiAgICAgICAgIGNvbmZpZy5vcHRpb25zLm1pblNjYWxlID0gMjI1Ny4wMDAwODUxNTM0ODY1O1xuICAgICAgICAgdmFyIGhhc0Jhc2VsYXllcnMgPSAoKCdlbXB0eUJhc2VsYXllcicgaW4gY29uZmlnLm9wdGlvbnMpICYmIGNvbmZpZy5vcHRpb25zLmVtcHR5QmFzZWxheWVyID09IFwiVHJ1ZVwiKTtcbiAgICAgICAgIGlmICggIWhhc0Jhc2VsYXllcnMgKSB7XG4gICAgICAgICAgIGZvciAoIHZhciBsIGluIGNvbmZpZy5sYXllcnMgKSB7XG4gICAgICAgICAgICAgaWYgKCBjb25maWcubGF5ZXJzW2xdW1wiYmFzZUxheWVyXCJdID09IFwiVHJ1ZVwiICkge1xuICAgICAgICAgICAgICAgaGFzQmFzZWxheWVycyA9IHRydWU7XG4gICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cbiAgICAgICAgIH1cbiAgICAgICAgIC8vIGZvciBtaW5SZXMgZXZhbHVhdGluZyB0byBzY2FsZSAxMDBcbiAgICAgICAgIC8vIHpvb21MZXZlbE51bWJlciBpcyBlcXVhbCB0byAyNFxuICAgICAgICAgaWYgKCBoYXNCYXNlbGF5ZXJzICkge1xuICAgICAgICAgICBjb25maWcub3B0aW9ucy56b29tTGV2ZWxOdW1iZXIgPSAyNDtcbiAgICAgICAgIH1cblxuICAgICAgICAgdmFyIHJlc29sdXRpb25zID0gW107XG4gICAgICAgICBpZiAoc2NhbGVzLmxlbmd0aCAhPSAwICkge1xuICAgICAgICAgICBzY2FsZXMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICAgcmV0dXJuIE51bWJlcihiKSAtIE51bWJlcihhKTtcbiAgICAgICAgICAgfSk7XG4gICAgICAgICAgIHZhciBtYXhTY2FsZSA9IHNjYWxlc1swXTtcbiAgICAgICAgICAgdmFyIG1heFJlcyA9IE9wZW5MYXllcnMuVXRpbC5nZXRSZXNvbHV0aW9uRnJvbVNjYWxlKG1heFNjYWxlLCBwcm9qT1NNLnByb2oudW5pdHMpO1xuICAgICAgICAgICB2YXIgbWluU2NhbGUgPSBzY2FsZXNbc2NhbGVzLmxlbmd0aC0xXTtcbiAgICAgICAgICAgdmFyIG1pblJlcyA9IE9wZW5MYXllcnMuVXRpbC5nZXRSZXNvbHV0aW9uRnJvbVNjYWxlKG1pblNjYWxlLCBwcm9qT1NNLnByb2oudW5pdHMpO1xuICAgICAgICAgICB2YXIgcmVzID0gMTU2NTQzLjAzMzkwNjI1O1xuICAgICAgICAgICB2YXIgbiA9IDE7XG4gICAgICAgICAgIHdoaWxlICggcmVzID4gbWluUmVzICYmIG4gPCBjb25maWcub3B0aW9ucy56b29tTGV2ZWxOdW1iZXIpIHtcbiAgICAgICAgICAgICBpZiAoIHJlcyA8IG1heFJlcyApIHtcbiAgICAgICAgICAgICAgIC8vQWRkIGV4dHJhIHNjYWxlXG4gICAgICAgICAgICAgICByZXNvbHV0aW9ucy5wdXNoKHJlcyk7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICAgIHJlcyA9IHJlcy8yO1xuICAgICAgICAgICAgIG4rKztcbiAgICAgICAgICAgfVxuICAgICAgICAgICBtYXhSZXMgPSByZXNvbHV0aW9uc1swXTtcbiAgICAgICAgICAgbWluUmVzID0gcmVzb2x1dGlvbnNbcmVzb2x1dGlvbnMubGVuZ3RoLTFdO1xuICAgICAgICAgICAvL0FkZCBleHRyYSBzY2FsZVxuICAgICAgICAgICB2YXIgbWF4U2NhbGUgPSBPcGVuTGF5ZXJzLlV0aWwuZ2V0U2NhbGVGcm9tUmVzb2x1dGlvbihtYXhSZXMsIHByb2pPU00ucHJvai51bml0cyk7XG4gICAgICAgICAgIHZhciBtaW5TY2FsZSA9IE9wZW5MYXllcnMuVXRpbC5nZXRTY2FsZUZyb21SZXNvbHV0aW9uKG1pblJlcywgcHJvak9TTS5wcm9qLnVuaXRzKTtcbiAgICAgICAgIH1cbiAgICAgICAgIGNvbmZpZy5vcHRpb25zWydyZXNvbHV0aW9ucyddID0gcmVzb2x1dGlvbnM7XG5cbiAgICAgICAgIGlmIChyZXNvbHV0aW9ucy5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgICAgY29uZmlnLm9wdGlvbnMuem9vbUxldmVsTnVtYmVyID0gcmVzb2x1dGlvbnMubGVuZ3RoO1xuICAgICAgICAgICBjb25maWcub3B0aW9ucy5tYXhTY2FsZSA9IG1heFNjYWxlO1xuICAgICAgICAgICBjb25maWcub3B0aW9ucy5taW5TY2FsZSA9IG1pblNjYWxlO1xuICAgICAgICAgfVxuICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogZ2V0TGF5ZXJUcmVlXG4gICAqIGdldCB0aGUgbGF5ZXIgdHJlZVxuICAgKiBjcmVhdGUgT3BlbkxheWVycyBXTVMgYmFzZSBvciBub3QgbGF5ZXIgezxPcGVuTGF5ZXJzLkxheWVyLldNUz59XG4gICAqIHB1c2ggdGhlc2UgbGF5ZXJzIGluIGxheWVycyBvciBiYXNlbGF5ZXJzXG4gICAqXG4gICAqIFBhcmFtZXRlcnM6XG4gICAqIG5lc3RlZCAtIHtPYmplY3R9IGEgY2FwYWJpbGl0eSBsYXllclxuICAgKiBwTm9kZSAtIHtPYmplY3R9IHRoZSBuZXN0ZWQgdHJlZSBub2RlXG4gICAqXG4gICAqIERlcGVuZGVuY2llczpcbiAgICogY29uZmlnXG4gICAqIGxheWVyc1xuICAgKiBiYXNlbGF5ZXJzXG4gICAqL1xuICBmdW5jdGlvbiBnZXRMYXllclRyZWUobmVzdGVkLHBOb2RlKSB7XG4gICAgcE5vZGUuY2hpbGRyZW4gPSBbXTtcblxuICAgIHZhciBzZXJ2aWNlID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChsaXpVcmxzLndtc1xuICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgKTtcbiAgICBpZiAobGl6VXJscy5wdWJsaWNVcmxMaXN0ICYmIGxpelVybHMucHVibGljVXJsTGlzdC5sZW5ndGggPiAxICkge1xuICAgICAgICBzZXJ2aWNlID0gW107XG4gICAgICAgIGZvciAodmFyIGo9MCwgamxlbj1saXpVcmxzLnB1YmxpY1VybExpc3QubGVuZ3RoOyBqPGpsZW47IGorKykge1xuICAgICAgICAgIHNlcnZpY2UucHVzaChcbiAgICAgICAgICAgIE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQoXG4gICAgICAgICAgICAgIGxpelVybHMucHVibGljVXJsTGlzdFtqXSxcbiAgICAgICAgICAgICAgT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIHdtdHNGb3JtYXQgPSBuZXcgT3BlbkxheWVycy5Gb3JtYXQuV01UU0NhcGFiaWxpdGllcyh7fSk7XG5cbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbmVzdGVkLm5lc3RlZExheWVycy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgIHZhciBzZXJ2aWNlVXJsID0gc2VydmljZVxuICAgICAgdmFyIGxheWVyID0gbmVzdGVkLm5lc3RlZExheWVyc1tpXTtcbiAgICAgIHZhciBxZ2lzTGF5ZXJOYW1lID0gbGF5ZXIubmFtZTtcbiAgICAgIGlmICggKCd1c2VMYXllcklEcycgaW4gY29uZmlnLm9wdGlvbnMpICYmIGNvbmZpZy5vcHRpb25zLnVzZUxheWVySURzID09ICdUcnVlJyApXG4gICAgICAgIHFnaXNMYXllck5hbWUgPSBsYXllcklkTWFwW2xheWVyLm5hbWVdO1xuICAgICAgZWxzZSBpZiAoIGxheWVyLm5hbWUgaW4gc2hvcnROYW1lTWFwIClcbiAgICAgICAgcWdpc0xheWVyTmFtZSA9IHNob3J0TmFtZU1hcFtsYXllci5uYW1lXTtcbiAgICAgIHZhciBsYXllckNvbmZpZyA9IGNvbmZpZy5sYXllcnNbcWdpc0xheWVyTmFtZV07XG4gICAgICB2YXIgbGF5ZXJOYW1lID0gY2xlYW5OYW1lKHFnaXNMYXllck5hbWUpO1xuICAgICAgbGF5ZXJDbGVhbk5hbWVzW2xheWVyTmFtZV0gPSBxZ2lzTGF5ZXJOYW1lO1xuXG4gICAgICBpZiAoIHFnaXNMYXllck5hbWUudG9Mb3dlckNhc2UoKSA9PSAnaGlkZGVuJyApXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgaWYgKCBxZ2lzTGF5ZXJOYW1lID09ICdPdmVydmlldycgKSB7XG4gICAgICAgIGNvbmZpZy5vcHRpb25zLmhhc092ZXJ2aWV3ID0gdHJ1ZTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAoICFsYXllckNvbmZpZyApXG4gICAgICAgIGNvbnRpbnVlO1xuXG4gICAgICBpZiAoIGxheWVyQ29uZmlnLmdyb3VwQXNMYXllciA9PSAnVHJ1ZScgKVxuICAgICAgICBsYXllckNvbmZpZy50eXBlID0gJ2xheWVyJztcblxuICAgICAgdmFyIHdtc1N0eWxlcyA9ICQubWFwKGxheWVyLnN0eWxlcywgZnVuY3Rpb24oIHMsIGkgKXtcbiAgICAgICAgICByZXR1cm4gcy5uYW1lO1xuICAgICAgfSk7XG4gICAgICBpZiAoIHdtc1N0eWxlcy5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgICBsYXllckNvbmZpZy5zdHlsZXMgPSB3bXNTdHlsZXM7XG4gICAgICB9IGVsc2UgaWYgKCAncWdpc1NlcnZlclZlcnNpb24nIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnFnaXNTZXJ2ZXJWZXJzaW9uLnN0YXJ0c1dpdGgoJzMuJykgKSB7XG4gICAgICAgICAgbGF5ZXJDb25maWcuc3R5bGVzID0gWycnXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbGF5ZXJDb25maWcuc3R5bGVzID0gWydkZWZhdWx0J107XG4gICAgICB9XG4gICAgICAvLyBpZiB0aGUgbGF5ZXIgaXMgbm90IHRoZSBPdmVydmlldyBhbmQgaGFkIGEgY29uZmlnXG4gICAgICAvLyBjcmVhdGluZyB0aGUgezxPcGVuTGF5ZXJzLkxheWVyLldNUz59IGFuZCB0aGUgdHJlZSBub2RlXG4gICAgICB2YXIgbm9kZSA9IHtuYW1lOmxheWVyTmFtZSxjb25maWc6bGF5ZXJDb25maWcscGFyZW50OnBOb2RlfTtcbiAgICAgIHZhciBzdHlsZXMgPSAoJ3N0eWxlcycgaW4gbGF5ZXJDb25maWcpID8gbGF5ZXJDb25maWcuc3R5bGVzWzBdIDogJ2RlZmF1bHQnIDtcbiAgICAgIGlmKCAhKCB0eXBlb2YgbGl6TGF5ZXJTdHlsZXMgPT09ICd1bmRlZmluZWQnIClcbiAgICAgICAgJiYgbGF5ZXJOYW1lIGluIGxpekxheWVyU3R5bGVzXG4gICAgICAgICYmIGxpekxheWVyU3R5bGVzWyBsYXllck5hbWUgXVxuICAgICAgKXtcbiAgICAgICAgc3R5bGVzID0gbGl6TGF5ZXJTdHlsZXNbIGxheWVyTmFtZSBdO1xuICAgICAgfVxuICAgICAgdmFyIGxheWVyV21zUGFyYW1zID0ge1xuICAgICAgICAgIGxheWVyczpsYXllci5uYW1lXG4gICAgICAgICAgLHN0eWxlczogc3R5bGVzXG4gICAgICAgICAgLHZlcnNpb246JzEuMy4wJ1xuICAgICAgICAgICxleGNlcHRpb25zOidhcHBsaWNhdGlvbi92bmQub2djLnNlX2luaW1hZ2UnXG4gICAgICAgICAgLGZvcm1hdDoobGF5ZXJDb25maWcuaW1hZ2VGb3JtYXQpID8gbGF5ZXJDb25maWcuaW1hZ2VGb3JtYXQgOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAgICxkcGk6OTZcbiAgICAgIH07XG4gICAgICBpZiAobGF5ZXJXbXNQYXJhbXMuZm9ybWF0ICE9ICdpbWFnZS9qcGVnJylcbiAgICAgICAgICBsYXllcldtc1BhcmFtc1sndHJhbnNwYXJlbnQnXSA9IHRydWU7XG5cbiAgICAgIC8vTWFuYWdlIGF0dHJpYnV0aW9uXG4gICAgICBpZiAodHlwZW9mIGxheWVyLmF0dHJpYnV0aW9uID09IFwib2JqZWN0XCIpIHtcbiAgICAgICAgICAvLyBVcGRhdGUgaHJlZiBpZiBuZWVkZWRcbiAgICAgICAgICBpZiAoICdocmVmJyBpbiBsYXllci5hdHRyaWJ1dGlvbiAmJlxuICAgICAgICAgICAgICAgbGF5ZXIuYXR0cmlidXRpb24uaHJlZiAhPSAnJyAmJlxuICAgICAgICAgICAgICAgbGF5ZXIuYXR0cmlidXRpb24uaHJlZi5pbmRleE9mKCc6Ly8nKSA9PSAtMSkge1xuICAgICAgICAgICAgbGF5ZXIuYXR0cmlidXRpb24uaHJlZiA9ICdodHRwOi8vJytsYXllci5hdHRyaWJ1dGlvbi5ocmVmO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBVcGRhdGUgYXR0cmlidXRpb25cbiAgICAgICAgICBpZiAoICEoJ3RpdGxlJyBpbiBsYXllci5hdHRyaWJ1dGlvbikgfHwgbGF5ZXIuYXR0cmlidXRpb24udGl0bGUgPT0gJycgKSB7XG4gICAgICAgICAgICAgIGxheWVyLmF0dHJpYnV0aW9uLnRpdGxlID0gbGF5ZXIuYXR0cmlidXRpb24uaHJlZi5zcGxpdCgnOi8vJylbMV07XG4gICAgICAgICAgfSBlbHNlXG4gICAgICAgICAgaWYgKCAhKCdocmVmJyBpbiBsYXllci5hdHRyaWJ1dGlvbikgfHwgbGF5ZXIuYXR0cmlidXRpb24uaHJlZiA9PSAnJyApIHtcbiAgICAgICAgICAgICAgbGF5ZXIuYXR0cmlidXRpb24gPSBsYXllci5hdHRyaWJ1dGlvbi50aXRsZTtcbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHZhciB3bXRzTGF5ZXIgPSBudWxsO1xuICAgICAgaWYgKCBsYXllckNvbmZpZy5jYWNoZWQgPT0gJ1RydWUnICYmIHdtdHNDYXBhYmlsaXRpZXMgKSB7XG4gICAgICAgICAgJC5lYWNoKHdtdHNDYXBhYmlsaXRpZXMuY29udGVudHMubGF5ZXJzLCBmdW5jdGlvbihpLCBsKSB7XG4gICAgICAgICAgICBpZiAoIGwuaWRlbnRpZmllciAhPSBsYXllci5uYW1lKVxuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIHZhciB3bXRzT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICBsYXllcjogbGF5ZXIubmFtZSxcbiAgICAgICAgICAgICAgICBtYXRyaXhTZXQ6IGNvbmZpZy5vcHRpb25zLnByb2plY3Rpb24ucmVmLFxuICAgICAgICAgICAgICAgIG5hbWU6IGxheWVyTmFtZSxcbiAgICAgICAgICAgICAgICBwYXJhbXM6IGxheWVyV21zUGFyYW1zLFxuICAgICAgICAgICAgICAgIGF0dHJpYnV0aW9uOmxheWVyLmF0dHJpYnV0aW9uLFxuICAgICAgICAgICAgICAgIGlzQmFzZUxheWVyOiAobGF5ZXJDb25maWcuYmFzZUxheWVyID09ICdUcnVlJyksXG4gICAgICAgICAgICAgICAgYWx3YXlzSW5SYW5nZTogZmFsc2UsXG4gICAgICAgICAgICAgICAgdXJsOiBzZXJ2aWNlVXJsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKCAkLmluQXJyYXkoIGNvbmZpZy5vcHRpb25zLnByb2plY3Rpb24ucmVmLnRvVXBwZXJDYXNlKCksIFsnRVBTRzozODU3JywnRVBTRzo5MDA5MTMnXSApICE9IC0xXG4gICAgICAgICAgICAgICYmICgncmVzb2x1dGlvbnMnIGluIGNvbmZpZy5vcHRpb25zKVxuICAgICAgICAgICAgICAmJiBjb25maWcub3B0aW9ucy5yZXNvbHV0aW9ucy5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVzb2x1dGlvbnMgPSBjb25maWcub3B0aW9ucy5yZXNvbHV0aW9ucztcbiAgICAgICAgICAgICAgICB2YXIgbWF4UmVzID0gcmVzb2x1dGlvbnNbMF07XG4gICAgICAgICAgICAgICAgdmFyIG51bVpvb21MZXZlbHMgPSByZXNvbHV0aW9ucy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIHpvb21PZmZzZXQgPSAwO1xuICAgICAgICAgICAgICAgIHZhciByZXMgPSAxNTY1NDMuMDMzOTA2MjU7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCByZXMgPiBtYXhSZXMgKSB7XG4gICAgICAgICAgICAgICAgICAgIHpvb21PZmZzZXQgKz0gMTtcbiAgICAgICAgICAgICAgICAgICAgcmVzID0gMTU2NTQzLjAzMzkwNjI1IC8gTWF0aC5wb3coMiwgem9vbU9mZnNldCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHdtdHNPcHRpb25zWyd6b29tT2Zmc2V0J10gPSB6b29tT2Zmc2V0O1xuICAgICAgICAgICAgICAgIHdtdHNPcHRpb25zWydtYXhSZXNvbHV0aW9uJ10gPSBtYXhSZXM7XG4gICAgICAgICAgICAgICAgd210c09wdGlvbnNbJ251bVpvb21MZXZlbHMnXSA9IG51bVpvb21MZXZlbHM7XG4gICAgICAgICAgICAgICAgd210c09wdGlvbnNbJ21pblpvb21MZXZlbCddID0gem9vbU9mZnNldDtcbiAgICAgICAgICAgICAgICB3bXRzT3B0aW9uc1sncmVzb2x1dGlvbnMnXSA9IHJlc29sdXRpb25zO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd210c0xheWVyID0gd210c0Zvcm1hdC5jcmVhdGVMYXllcih3bXRzQ2FwYWJpbGl0aWVzLCB3bXRzT3B0aW9ucyk7XG4gICAgICAgICAgICB3bXRzTGF5ZXIueXggPSB7fTtcbiAgICAgICAgICAgIHdtdHNMYXllci5yZXZlcnNlQXhpc09yZGVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb2pDb2RlID0gdGhpcy5wcm9qZWN0aW9uLmdldENvZGUoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdCgnMS4zLjAnKSA+PSAxLjMgJiZcbiAgICAgICAgICAgICAgICAgICAgISEodGhpcy55eFtwcm9qQ29kZV0gfHwgKE9wZW5MYXllcnMuUHJvamVjdGlvbi5kZWZhdWx0c1twcm9qQ29kZV0gJiZcbiAgICAgICAgICAgICAgICAgICAgT3BlbkxheWVycy5Qcm9qZWN0aW9uLmRlZmF1bHRzW3Byb2pDb2RlXS55eCkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gT3ZlcnJpZGUgV01TIHVybCBpZiBleHRlcm5hbCBXTVMgc2VydmVyXG4gICAgICBpZiAoJ2V4dGVybmFsQWNjZXNzJyBpbiBsYXllckNvbmZpZyAmJiBsYXllckNvbmZpZy5leHRlcm5hbEFjY2Vzc1xuICAgICAgICYmICdsYXllcnMnIGluIGxheWVyQ29uZmlnLmV4dGVybmFsQWNjZXNzICYmICd1cmwnIGluIGxheWVyQ29uZmlnLmV4dGVybmFsQWNjZXNzICkge1xuICAgICAgICAgIHZhciBleHRDb25maWcgPSBsYXllckNvbmZpZy5leHRlcm5hbEFjY2VzcztcbiAgICAgICAgICBleHRDb25maWcubGF5ZXJzID0gZGVjb2RlVVJJKGV4dENvbmZpZy5sYXllcnMpO1xuICAgICAgICAgIHNlcnZpY2VVcmwgPSBleHRDb25maWcudXJsO1xuICAgICAgICAgIGxheWVyV21zUGFyYW1zID0ge1xuICAgICAgICAgICAgbGF5ZXJzOiBleHRDb25maWcubGF5ZXJzXG4gICAgICAgICAgICAsc3R5bGVzOihleHRDb25maWcuc3R5bGVzKSA/IGV4dENvbmZpZy5zdHlsZXMgOiAnJ1xuICAgICAgICAgICAgLGNyczooZXh0Q29uZmlnLmNycykgPyBleHRDb25maWcuY3JzIDogJ0VQU0c6Mzg1NydcbiAgICAgICAgICAgICxmb3JtYXQ6KGV4dENvbmZpZy5mb3JtYXQpID8gZXh0Q29uZmlnLmZvcm1hdCA6ICdpbWFnZS9wbmcnXG4gICAgICAgICAgICAsdHJhbnNwYXJlbnQ6KGV4dENvbmZpZy50cmFuc3BhcmVudCkgPyBleHRDb25maWcudHJhbnNwYXJlbnQgOiAndHJ1ZSdcbiAgICAgICAgICAgICxleGNlcHRpb25zOidhcHBsaWNhdGlvbi92bmQub2djLnNlX2luaW1hZ2UnXG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAgIC8vIEFkZCBvcHRpb25uYWwgZmlsdGVyIGF0IHN0YXJ0XG4gICAgICAgIGlmKCAhKCB0eXBlb2YgbGl6TGF5ZXJGaWx0ZXIgPT09ICd1bmRlZmluZWQnIClcbiAgICAgICAgICAmJiBxZ2lzTGF5ZXJOYW1lIGluIGxpekxheWVyRmlsdGVyXG4gICAgICAgICAgJiYgbGl6TGF5ZXJGaWx0ZXJbIHFnaXNMYXllck5hbWUgXVxuICAgICAgICApe1xuICAgICAgICAgIGxheWVyV21zUGFyYW1zWydGSUxURVInXSA9IHFnaXNMYXllck5hbWUrJzonK2xpekxheWVyRmlsdGVyWyBxZ2lzTGF5ZXJOYW1lIF07XG4gICAgICAgIH1cblxuICAgICAgaWYgKGxheWVyQ29uZmlnLmJhc2VMYXllciA9PSAnVHJ1ZScgJiYgd210c0xheWVyICE9IG51bGwpIHtcbiAgICAgICAgICAvLyBjcmVhdGluZyB0aGUgYmFzZSBsYXllclxuICAgICAgICAgIGJhc2VsYXllcnMucHVzaCggd210c0xheWVyICk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChsYXllckNvbmZpZy50eXBlID09ICdsYXllcicgJiYgd210c0xheWVyICE9IG51bGwpIHtcbiAgICAgICAgICB3bXRzTGF5ZXIub3B0aW9ucy5taW5TY2FsZSA9IGxheWVyQ29uZmlnLm1heFNjYWxlO1xuICAgICAgICAgIHdtdHNMYXllci5vcHRpb25zLm1heFNjYWxlID0obGF5ZXJDb25maWcubWluU2NhbGUgIT0gbnVsbCAmJiBsYXllckNvbmZpZy5taW5TY2FsZSA8IDEpID8gMSA6IGxheWVyQ29uZmlnLm1pblNjYWxlO1xuICAgICAgICAgIGlmICggbGF5ZXIubmVzdGVkTGF5ZXJzLmxlbmd0aCAhPSAwICkge1xuICAgICAgICAgICAgICB2YXIgc2NhbGVzID0gZ2V0TGF5ZXJTY2FsZShsYXllcixudWxsLG51bGwpO1xuICAgICAgICAgICAgICB3bXRzTGF5ZXIub3B0aW9ucy5taW5TY2FsZSA9IHNjYWxlcy5tYXhTY2FsZTtcbiAgICAgICAgICAgICAgd210c0xheWVyLm9wdGlvbnMubWF4U2NhbGUgPSBzY2FsZXMubWluU2NhbGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIHdtdHNMYXllci5pc1Zpc2libGUgPSAobGF5ZXJDb25maWcudG9nZ2xlZD09J1RydWUnKTtcbiAgICAgICAgICB3bXRzTGF5ZXIudmlzaWJpbGl0eSA9IGZhbHNlO1xuICAgICAgICAgIHdtdHNMYXllci50cmFuc2l0aW9uRWZmZWN0ID0gbnVsbDtcbiAgICAgICAgICB3bXRzTGF5ZXIucmVtb3ZlQmFja0J1ZmZlckRlbGF5ID0gMjUwO1xuICAgICAgICAgIHdtdHNMYXllci5vcmRlciA9IGdldExheWVyT3JkZXIobGF5ZXIpO1xuICAgICAgICAgIGxheWVycy5wdXNoKCB3bXRzTGF5ZXIgKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKGxheWVyQ29uZmlnLmJhc2VMYXllciA9PSAnVHJ1ZScpIHtcbiAgICAgICAgLy8gY3JlYXRpbmcgdGhlIGJhc2UgbGF5ZXJcbiAgICAgICAgICBiYXNlbGF5ZXJzLnB1c2gobmV3IE9wZW5MYXllcnMuTGF5ZXIuV01TKGxheWVyTmFtZSxzZXJ2aWNlVXJsXG4gICAgICAgICAgICAgICxsYXllcldtc1BhcmFtc1xuICAgICAgICAgICAgICAse2lzQmFzZUxheWVyOnRydWVcbiAgICAgICAgICAgICAgICxndXR0ZXI6KGxheWVyQ29uZmlnLmNhY2hlZCA9PSAnVHJ1ZScpID8gMCA6IDVcbiAgICAgICAgICAgICAgICxidWZmZXI6MFxuICAgICAgICAgICAgICAgLHNpbmdsZVRpbGU6KGxheWVyQ29uZmlnLnNpbmdsZVRpbGUgPT0gJ1RydWUnKVxuICAgICAgICAgICAgICAgLHJhdGlvOjFcbiAgICAgICAgICAgICAgICxhdHRyaWJ1dGlvbjpsYXllci5hdHRyaWJ1dGlvblxuICAgICAgICAgICAgICB9KSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChsYXllckNvbmZpZy50eXBlID09ICdsYXllcicpIHtcbiAgICAgICAgICB2YXIgd21zTGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5XTVMobGF5ZXJOYW1lLHNlcnZpY2VVcmxcbiAgICAgICAgICAgICAgLGxheWVyV21zUGFyYW1zXG4gICAgICAgICAgICAgICx7aXNCYXNlTGF5ZXI6ZmFsc2VcbiAgICAgICAgICAgICAgICxtaW5TY2FsZTpsYXllckNvbmZpZy5tYXhTY2FsZVxuICAgICAgICAgICAgICAgLG1heFNjYWxlOihsYXllckNvbmZpZy5taW5TY2FsZSAhPSBudWxsICYmIGxheWVyQ29uZmlnLm1pblNjYWxlIDwgMSkgPyAxIDogbGF5ZXJDb25maWcubWluU2NhbGVcbiAgICAgICAgICAgICAgICxpc1Zpc2libGU6KGxheWVyQ29uZmlnLnRvZ2dsZWQ9PSdUcnVlJylcbiAgICAgICAgICAgICAgICx2aXNpYmlsaXR5OmZhbHNlXG4gICAgICAgICAgICAgICAsZ3V0dGVyOihsYXllckNvbmZpZy5jYWNoZWQgPT0gJ1RydWUnKSA/IDAgOiA1XG4gICAgICAgICAgICAgICAsYnVmZmVyOjBcbiAgICAgICAgICAgICAgICx0cmFuc2l0aW9uRWZmZWN0OihsYXllckNvbmZpZy5zaW5nbGVUaWxlID09ICdUcnVlJyk/J3Jlc2l6ZSc6bnVsbFxuICAgICAgICAgICAgICAgLHJlbW92ZUJhY2tCdWZmZXJEZWxheToyNTBcbiAgICAgICAgICAgICAgICxzaW5nbGVUaWxlOihsYXllckNvbmZpZy5zaW5nbGVUaWxlID09ICdUcnVlJyB8fCAobGF5ZXJDb25maWcuY2FjaGVkID09ICdUcnVlJyAmJiAhd210c0NhcGFiaWxpdGllcykpXG4gICAgICAgICAgICAgICAscmF0aW86MVxuICAgICAgICAgICAgICAgLG9yZGVyOmdldExheWVyT3JkZXIobGF5ZXIpXG4gICAgICAgICAgICAgICAsYXR0cmlidXRpb246bGF5ZXIuYXR0cmlidXRpb25cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgaWYgKCBsYXllci5uZXN0ZWRMYXllcnMubGVuZ3RoICE9IDAgKSB7XG4gICAgICAgICAgICAgIHZhciBzY2FsZXMgPSBnZXRMYXllclNjYWxlKGxheWVyLG51bGwsbnVsbCk7XG4gICAgICAgICAgICAgIHdtc0xheWVyLm1pblNjYWxlID0gc2NhbGVzLm1heFNjYWxlO1xuICAgICAgICAgICAgICB3bXNMYXllci5vcHRpb25zLm1pblNjYWxlID0gc2NhbGVzLm1heFNjYWxlO1xuICAgICAgICAgICAgICB3bXNMYXllci5tYXhTY2FsZSA9IHNjYWxlcy5taW5TY2FsZTtcbiAgICAgICAgICAgICAgd21zTGF5ZXIub3B0aW9ucy5tYXhTY2FsZSA9IHNjYWxlcy5taW5TY2FsZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGF5ZXJzLnB1c2goIHdtc0xheWVyICk7XG4gICAgICB9XG4gICAgICAvLyBjcmVhdGluZyB0aGUgbGF5ZXIgdHJlZSBiZWNhdXNlIGl0J3MgYSBncm91cCwgaGFzIGNoaWxkcmVuIGFuZCBpcyBub3QgYSBiYXNlIGxheWVyXG4gICAgICBpZiAobGF5ZXJDb25maWcudHlwZSA9PSAnZ3JvdXAnICYmIGxheWVyLm5lc3RlZExheWVycy5sZW5ndGggIT0gMCAmJiBsYXllckNvbmZpZy5iYXNlTGF5ZXIgPT0gJ0ZhbHNlJylcbiAgICAgICAgICBnZXRMYXllclRyZWUobGF5ZXIsbm9kZSk7XG4gICAgICBpZiAobGF5ZXJDb25maWcuYmFzZUxheWVyICE9ICdUcnVlJylcbiAgICAgICAgICBwTm9kZS5jaGlsZHJlbi5wdXNoKG5vZGUpO1xuXG4gICAgICAvLyBBZGQgYmJveCBmcm9tIFdNUyBkYXRhIGludG8gbGl6bWFwIGNvbmZpZ3VyYXRpb24gKHVzZWQgYnkgc3dpdGNoZXItbGF5ZXJzLWFjdGlvbnNcbiAgICAgIGxheWVyQ29uZmlnLmJib3ggPSBsYXllci5iYm94O1xuXG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGFuYWx5c2VOb2RlXG4gICAqIGFuYWx5c2UgTm9kZSBDb25maWdcbiAgICogZGVmaW5lIGlmIHRoZSBub2RlIGhhcyB0byBiZSBhIGNoaWxkIG9mIGhpcyBwYXJlbnQgbm9kZVxuICAgKlxuICAgKiBQYXJhbWV0ZXJzOlxuICAgKiBhTm9kZSAtIHtPYmplY3R9IGEgbm9kZSBjb25maWdcbiAgICpcbiAgICogUmV0dXJuczpcbiAgICoge0Jvb2xlYW59IG1haW50YWlucyB0aGUgbm9kZSBpbiB0aGUgdHJlZVxuICAgKi9cbiAgZnVuY3Rpb24gYW5hbHlzZU5vZGUoYU5vZGUpIHtcbiAgICB2YXIgbm9kZUNvbmZpZyA9IGFOb2RlLmNvbmZpZztcbiAgICBpZiAobm9kZUNvbmZpZy50eXBlID09ICdsYXllcicgJiYgbm9kZUNvbmZpZy5iYXNlTGF5ZXIgIT0gJ1RydWUnKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgZWxzZSBpZiAobm9kZUNvbmZpZy50eXBlID09ICdsYXllcicpXG4gICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICBpZiAoISgnY2hpbGRyZW4nIGluIGFOb2RlKSlcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB2YXIgY2hpbGRyZW4gPSBhTm9kZS5jaGlsZHJlbjtcbiAgICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gICAgdmFyIHJlbW92ZUlkeCA9IFtdO1xuICAgIGZvciAodmFyIGk9MCwgbGVuPWNoaWxkcmVuLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICB2YXIgYW5hbHlzZSA9IGFuYWx5c2VOb2RlKGNoaWxkKTtcbiAgICAgIGlmICghYW5hbHlzZSlcbiAgICAgICAgcmVtb3ZlSWR4LnB1c2goaSk7XG4gICAgICByZXN1bHQgPSAocmVzdWx0IHx8IGFuYWx5c2UpO1xuICAgIH1cbiAgICByZW1vdmVJZHgucmV2ZXJzZSgpO1xuICAgIGZvciAodmFyIGk9MCwgbGVuPXJlbW92ZUlkeC5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgIGNoaWxkcmVuLnNwbGljZShyZW1vdmVJZHhbaV0sMSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogZ2V0U3dpdGNoZXJMaW5lXG4gICAqIGdldCB0aGUgaHRtbCB0YWJsZSBsaW5lIDx0cj4gb2YgYSBjb25maWcgbm9kZSBmb3IgdGhlIHN3aXRjaGVyXG4gICAqXG4gICAqIFBhcmFtZXRlcnM6XG4gICAqIGFOb2RlIC0ge09iamVjdH0gYSBjb25maWcgbm9kZVxuICAgKlxuICAgKiBSZXR1cm5zOlxuICAgKiB7U3RyaW5nfSB0aGUgPHRyPiBodG1sIGNvcnJlc3BvbmRpbmcgdG8gdGhlIG5vZGVcbiAgICovXG4gIGZ1bmN0aW9uIGdldFN3aXRjaGVyTGluZShhTm9kZSwgYVBhcmVudCkge1xuICAgIHZhciBodG1sID0gJyc7XG4gICAgdmFyIG5vZGVDb25maWcgPSBhTm9kZS5jb25maWc7XG4gICAgdmFyIHBhcmVudENvbmZpZyA9IG51bGw7XG5cbiAgICBpZiggYVBhcmVudCApe1xuICAgICAgcGFyZW50Q29uZmlnID0gYVBhcmVudC5jb25maWc7XG4gICAgfVxuXG4gICAgaWYoICdnZW9tZXRyeVR5cGUnIGluIG5vZGVDb25maWcgJiZcbiAgICAgICAgKCBub2RlQ29uZmlnLmdlb21ldHJ5VHlwZSA9PSBcIm5vbmVcIiB8fCBub2RlQ29uZmlnLmdlb21ldHJ5VHlwZSA9PSBcInVua25vd25cIiB8fCBub2RlQ29uZmlnLmdlb21ldHJ5VHlwZSA9PSBcIlwiIClcbiAgICApe1xuICAgICAgbm9kZUNvbmZpZy5kaXNwbGF5SW5MZWdlbmQgPSAnRmFsc2UnO1xuICAgIH1cblxuICAgIGh0bWwgKz0gJzx0ciBpZD1cIicrbm9kZUNvbmZpZy50eXBlKyctJythTm9kZS5uYW1lKydcIic7XG4gICAgaHRtbCArPSAnIGNsYXNzPVwibGl6LScrbm9kZUNvbmZpZy50eXBlO1xuICAgIGlmIChhUGFyZW50KXtcbiAgICAgIGh0bWwgKz0gJyBjaGlsZC1vZi1ncm91cC0nK2FQYXJlbnQubmFtZTtcbiAgICB9XG4gICAgaWYgKCgnY2hpbGRyZW4nIGluIGFOb2RlKSAmJiBhTm9kZVsnY2hpbGRyZW4nXS5sZW5ndGghPTApe1xuICAgICAgaHRtbCArPSAnIGV4cGFuZGVkIHBhcmVudCc7XG4gICAgfVxuICAgIGlmICgoJ2Rpc3BsYXlJbkxlZ2VuZCcgaW4gbm9kZUNvbmZpZyAmJiBub2RlQ29uZmlnLmRpc3BsYXlJbkxlZ2VuZCA9PSAnRmFsc2UnKSB8fFxuICAgICAgICAocGFyZW50Q29uZmlnICYmICdkaXNwbGF5SW5MZWdlbmQnIGluIHBhcmVudENvbmZpZyAmJiBwYXJlbnRDb25maWcuZGlzcGxheUluTGVnZW5kID09ICdGYWxzZScpKXtcbiAgICAgIGh0bWwgKz0gJyBsaXotaGlkZGVuJztcbiAgICB9XG4gICAgaWYgKCBwYXJlbnRDb25maWcgJiYgJ211dHVhbGx5RXhjbHVzaXZlJyBpbiBwYXJlbnRDb25maWcgJiYgcGFyZW50Q29uZmlnLm11dHVhbGx5RXhjbHVzaXZlID09ICdUcnVlJyApe1xuICAgICAgaHRtbCArPSAnIG11dHVhbGx5LWV4Y2x1c2l2ZSc7XG4gICAgfVxuXG4gICAgaHRtbCArPSAnXCI+JztcblxuICAgIGZ1bmN0aW9uIHRydW5jYXRlV2l0aEVsbGlwc2lzKHN0cixuKXtcbiAgICAgIHJldHVybiAoc3RyLmxlbmd0aCA+IG4pID8gc3RyLnN1YnN0cigwLG4tMSkrJyZoZWxsaXA7JyA6IHN0cjtcbiAgICB9O1xuXG4gICAgaHRtbCArPSAnPHRkPjxidXR0b24gY2xhc3M9XCJidG4gY2hlY2tib3hcIiBuYW1lPVwiJytub2RlQ29uZmlnLnR5cGUrJ1wiIHZhbHVlPVwiJythTm9kZS5uYW1lKydcIiB0aXRsZT1cIicrbGl6RGljdFsndHJlZS5idXR0b24uY2hlY2tib3gnXSsnXCI+PC9idXR0b24+JztcbiAgICBodG1sICs9ICc8c3BhbiBjbGFzcz1cImxhYmVsXCIgdGl0bGU9XCInK3RydW5jYXRlV2l0aEVsbGlwc2lzKCQoJzxkaXY+Jytub2RlQ29uZmlnLmFic3RyYWN0Kyc8L2Rpdj4nKS50ZXh0KCksNTApKydcIj4nK25vZGVDb25maWcudGl0bGUrJzwvc3Bhbj4nO1xuICAgIGh0bWwgKz0gJzwvdGQ+JztcblxuICAgIGh0bWwgKz0gJzx0ZD4nO1xuICAgIGlmIChub2RlQ29uZmlnLnR5cGUgPT0gJ2xheWVyJyl7XG4gICAgICBodG1sICs9ICc8c3BhbiBjbGFzcz1cImxvYWRpbmdcIj4mbmJzcDs8L3NwYW4+JztcbiAgICB9XG4gICAgaHRtbCArPSAnPC90ZD4nO1xuXG4gICAgdmFyIGxlZ2VuZExpbmsgPSAnJztcbiAgICBpZiAobm9kZUNvbmZpZy5saW5rKXtcbiAgICAgIGxlZ2VuZExpbmsgPSBub2RlQ29uZmlnLmxpbms7XG4gICAgfVxuICAgIGlmIChsZWdlbmRMaW5rICE9ICcnICl7XG4gICAgICBodG1sICs9ICc8dGQ+PGJ1dHRvbiBjbGFzcz1cImJ0biBsaW5rXCIgbmFtZT1cImxpbmtcIiB0aXRsZT1cIicrbGl6RGljdFsndHJlZS5idXR0b24ubGluayddKydcIiB2YWx1ZT1cIicrbGVnZW5kTGluaysnXCIvPjwvdGQ+JztcbiAgICB9XG4gICAgZWxzZXtcbiAgICAgIGh0bWwgKz0gJzx0ZD48L3RkPic7XG4gICAgfVxuXG4gICAgdmFyIHJlbW92ZUNhY2hlID0gJyc7XG4gICAgaWYgKG5vZGVDb25maWcuY2FjaGVkICYmIG5vZGVDb25maWcuY2FjaGVkID09ICdUcnVlJyAmJiBub2RlQ29uZmlnLnR5cGUgPT0gJ2xheWVyJyAmJiAoJ3JlbW92ZUNhY2hlJyBpbiBjb25maWcub3B0aW9ucykpe1xuICAgICAgaHRtbCArPSAnPHRkPjxidXR0b24gY2xhc3M9XCJidG4gcmVtb3ZlQ2FjaGVcIiBuYW1lPVwicmVtb3ZlQ2FjaGVcIiB0aXRsZT1cIicrbGl6RGljdFsndHJlZS5idXR0b24ucmVtb3ZlQ2FjaGUnXSsnXCIgdmFsdWU9XCInK2FOb2RlLm5hbWUrJ1wiLz48L3RkPic7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBodG1sICs9ICc8dGQ+PC90ZD4nO1xuICAgIH1cblxuICAgIGh0bWwgKz0gJzwvdHI+JztcblxuICAgIGlmIChub2RlQ29uZmlnLnR5cGUgPT0gJ2xheWVyJ1xuICAgICYmICghbm9kZUNvbmZpZy5ub0xlZ2VuZEltYWdlIHx8IG5vZGVDb25maWcubm9MZWdlbmRJbWFnZSAhPSAnVHJ1ZScpXG4gICAgJiYgKCdkaXNwbGF5SW5MZWdlbmQnIGluIG5vZGVDb25maWcgJiYgbm9kZUNvbmZpZy5kaXNwbGF5SW5MZWdlbmQgPT0gJ1RydWUnKSkge1xuICAgICAgdmFyIHVybCA9IGdldExheWVyTGVnZW5kR3JhcGhpY1VybChhTm9kZS5uYW1lLCBmYWxzZSk7XG4gICAgICBpZiAoIHVybCAhPSBudWxsICYmIHVybCAhPSAnJyApIHtcbiAgICAgICAgaHRtbCArPSAnPHRyIGlkPVwibGVnZW5kLScrYU5vZGUubmFtZSsnXCIgY2xhc3M9XCJjaGlsZC1vZi1sYXllci0nK2FOb2RlLm5hbWUrJyBsZWdlbmRHcmFwaGljc1wiPic7XG4gICAgICAgIGh0bWwgKz0gJzx0ZCBjb2xzcGFuPVwiMlwiPjxkaXYgY2xhc3M9XCJsZWdlbmRHcmFwaGljc1wiPic7XG4gICAgICAgIGh0bWwgKz0gJzxpbWcgZGF0YS1zcmM9XCInK3VybCsnXCIgc3JjPVwiJytsaXpVcmxzLmJhc2VwYXRoICsgJ2Nzcy9pbWFnZXMvZG93bmxvYWRfbGF5ZXIuZ2lmJyArICdcIi8+JztcbiAgICAgICAgaHRtbCArPSAnPC9kaXY+PC90ZD4nO1xuICAgICAgICBodG1sICs9ICc8L3RyPic7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGh0bWw7XG4gIH1cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogZ2V0U3dpdGNoZXJOb2RlXG4gICAqIGdldCB0aGUgaHRtbCBvZiBhIGNvbmZpZyBub2RlIGZvciB0aGUgc3dpdGNoZXJcbiAgICpcbiAgICogUGFyYW1ldGVyczpcbiAgICogYU5vZGUgLSB7T2JqZWN0fSBhIGNvbmZpZyBub2RlXG4gICAqXG4gICAqIFJldHVybnM6XG4gICAqIHtTdHJpbmd9IHRoZSBodG1sIGNvcnJlc3BvbmRpbmcgdG8gdGhlIG5vZGVcbiAgICovXG4gIGZ1bmN0aW9uIGdldFN3aXRjaGVyTm9kZShhTm9kZSxhTGV2ZWwpIHtcbiAgICB2YXIgaHRtbCA9ICcnO1xuICAgIGlmIChhTGV2ZWwgPT0gMCkge1xuICAgICAgaHRtbCArPSAnPGRpdiBjbGFzcz1cIndpdGhvdXQtYmxvY2tzIG5vLWdyb3VwXCI+JztcbiAgICAgIGh0bWwgKz0gJzx0YWJsZSBjbGFzcz1cInRyZWVcIj4nO1xuICAgIH1cblxuICAgIHZhciBjaGlsZHJlbiA9IGFOb2RlLmNoaWxkcmVuO1xuICAgIGZvciAodmFyIGk9MCwgbGVuPWNoaWxkcmVuLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBpZiAoYUxldmVsID09IDApXG4gICAgICAgIGh0bWwgKz0gZ2V0U3dpdGNoZXJMaW5lKGNoaWxkKTtcbiAgICAgIGVsc2VcbiAgICAgICAgaHRtbCArPSBnZXRTd2l0Y2hlckxpbmUoY2hpbGQsYU5vZGUpO1xuXG4gICAgICBpZiAoKCdjaGlsZHJlbicgaW4gY2hpbGQpICYmIGNoaWxkWydjaGlsZHJlbiddLmxlbmd0aCE9MClcbiAgICAgICAgaHRtbCArPSBnZXRTd2l0Y2hlck5vZGUoY2hpbGQsIGFMZXZlbCsxKTtcbiAgICB9XG5cbiAgICBpZiAoYUxldmVsID09IDApIHtcbiAgICAgIGh0bWwgKz0gJzwvdGFibGU+JztcbiAgICAgIGh0bWwgKz0gJzwvZGl2Pic7XG4gICAgfVxuICAgIHJldHVybiBodG1sO1xuICB9XG5cbiAgZnVuY3Rpb24gaW5pdFByb2plY3Rpb25zKGZpcnN0TGF5ZXIpIHtcbiAgICAvLyBJbnNlcnQgb3IgdXBkYXRlIHByb2plY3Rpb24gbGlzdGVcbiAgICBpZiAoIGxpelByb2o0ICkge1xuICAgICAgICBmb3IoIHZhciByZWYgaW4gbGl6UHJvajQgKSB7XG4gICAgICAgICAgICBpZiAoICEocmVmIGluIFByb2o0anMuZGVmcykgKSB7XG4gICAgICAgICAgICAgIFByb2o0anMuZGVmc1tyZWZdPWxpelByb2o0W3JlZl07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gZ2V0IGFuZCBkZWZpbmUgcHJvamVjdGlvblxuICAgIHZhciBwcm9qID0gY29uZmlnLm9wdGlvbnMucHJvamVjdGlvbjtcbiAgICBpZiAoICEocHJvai5yZWYgaW4gUHJvajRqcy5kZWZzKSApXG4gICAgICBQcm9qNGpzLmRlZnNbcHJvai5yZWZdPXByb2oucHJvajQ7XG4gICAgdmFyIHByb2plY3Rpb24gPSBuZXcgT3BlbkxheWVycy5Qcm9qZWN0aW9uKHByb2oucmVmKTtcblxuICAgIGlmICggIShwcm9qLnJlZiBpbiBPcGVuTGF5ZXJzLlByb2plY3Rpb24uZGVmYXVsdHMpICkge1xuICAgICAgICBPcGVuTGF5ZXJzLlByb2plY3Rpb24uZGVmYXVsdHNbcHJvai5yZWZdID0gcHJvamVjdGlvbjtcblxuICAgICAgICAvLyB0ZXN0IGV4dGVudCBmb3IgaW52ZXJ0ZWQgYXhpc1xuICAgICAgICBpZiAoIHByb2oucmVmIGluIGZpcnN0TGF5ZXIuYmJveCApIHtcbiAgICAgICAgICAgIHZhciB3bXNCYm94ID0gZmlyc3RMYXllci5iYm94W3Byb2oucmVmXS5iYm94O1xuICAgICAgICAgICAgdmFyIHdtc0JvdW5kcyA9IE9wZW5MYXllcnMuQm91bmRzLmZyb21BcnJheSggd21zQmJveCApO1xuICAgICAgICAgICAgdmFyIGluaXRCb3VuZHMgPSBPcGVuTGF5ZXJzLkJvdW5kcy5mcm9tQXJyYXkoIGNvbmZpZy5vcHRpb25zLmluaXRpYWxFeHRlbnQgKTtcbiAgICAgICAgICAgIGlmICggIWluaXRCb3VuZHMuaW50ZXJzZWN0c0JvdW5kcyggd21zQm91bmRzICkgKVxuICAgICAgICAgICAgICAgIE9wZW5MYXllcnMuUHJvamVjdGlvbi5kZWZhdWx0c1twcm9qLnJlZl0ueXggPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGNyZWF0ZU1hcFxuICAgKiBjcmVhdGluZyB0aGUgbWFwIHs8T3BlbkxheWVycy5NYXA+fVxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlTWFwKCkge1xuICAgIC8vIGdldCBwcm9qZWN0aW9uXG4gICAgdmFyIHByb2ogPSBjb25maWcub3B0aW9ucy5wcm9qZWN0aW9uO1xuICAgIHZhciBwcm9qZWN0aW9uID0gbmV3IE9wZW5MYXllcnMuUHJvamVjdGlvbihwcm9qLnJlZik7XG5cbiAgICAvLyBnZXQgYW5kIGRlZmluZSB0aGUgbWF4IGV4dGVudFxuICAgIHZhciBiYm94ID0gY29uZmlnLm9wdGlvbnMuYmJveDtcbiAgICB2YXIgZXh0ZW50ID0gbmV3IE9wZW5MYXllcnMuQm91bmRzKE51bWJlcihiYm94WzBdKSxOdW1iZXIoYmJveFsxXSksTnVtYmVyKGJib3hbMl0pLE51bWJlcihiYm94WzNdKSk7XG5cbiAgICB2YXIgcmVzdHJpY3RlZEV4dGVudCA9IGV4dGVudC5zY2FsZSgzKTtcbiAgICB2YXIgaW5pdGlhbEV4dGVudCA9IGV4dGVudC5jbG9uZSgpO1xuICAgIGlmICggJ2luaXRpYWxFeHRlbnQnIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLmluaXRpYWxFeHRlbnQubGVuZ3RoID09IDQgKSB7XG4gICAgICB2YXIgaW5pdEJib3ggPSBjb25maWcub3B0aW9ucy5pbml0aWFsRXh0ZW50O1xuICAgICAgaW5pdGlhbEV4dGVudCA9IG5ldyBPcGVuTGF5ZXJzLkJvdW5kcyhOdW1iZXIoaW5pdEJib3hbMF0pLE51bWJlcihpbml0QmJveFsxXSksTnVtYmVyKGluaXRCYm94WzJdKSxOdW1iZXIoaW5pdEJib3hbM10pKTtcbiAgICB9XG5cbiAgICAvLyBjYWxjdWxhdGUgdGhlIG1hcCBoZWlnaHRcbiAgICB2YXIgbWFwSGVpZ2h0ID0gJCgnYm9keScpLnBhcmVudCgpWzBdLmNsaWVudEhlaWdodDtcbiAgICBpZighbWFwSGVpZ2h0KVxuICAgICAgICBtYXBIZWlnaHQgPSAkKCd3aW5kb3cnKS5pbm5lckhlaWdodCgpO1xuICAgIG1hcEhlaWdodCA9IG1hcEhlaWdodCAtICQoJyNoZWFkZXInKS5oZWlnaHQoKTtcbiAgICBtYXBIZWlnaHQgPSBtYXBIZWlnaHQgLSAkKCcjaGVhZGVybWVudScpLmhlaWdodCgpO1xuICAgICQoJyNtYXAnKS5oZWlnaHQobWFwSGVpZ2h0KTtcblxuICAgIC8vIE1ha2Ugc3VyZSBpbnRlcmZhY2UgZGl2cyBzaXplIGFyZSB1cGRhdGVkIGJlZm9yZSBjcmVhdGluZyB0aGUgbWFwXG4gICAgLy8gVGhpcyBhdm9pZCB0aGUgcmVxdWVzdCBvZiBlYWNoIHNpbmdsZXR0aWxlIGxheWVyIDIgdGltZXMgb24gc3RhcnR1cFxuICAgIHVwZGF0ZUNvbnRlbnRTaXplKCk7XG5cbiAgICB2YXIgcmVzID0gZXh0ZW50LmdldEhlaWdodCgpLyQoJyNtYXAnKS5oZWlnaHQoKTtcblxuICAgIHZhciBzY2FsZXMgPSBbXTtcbiAgICB2YXIgcmVzb2x1dGlvbnMgPSBbXTtcbiAgICBpZiAoJ3Jlc29sdXRpb25zJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgIHJlc29sdXRpb25zID0gY29uZmlnLm9wdGlvbnMucmVzb2x1dGlvbnM7XG4gICAgZWxzZSBpZiAoJ21hcFNjYWxlcycgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICBzY2FsZXMgPSBjb25maWcub3B0aW9ucy5tYXBTY2FsZXM7XG4gICAgc2NhbGVzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgcmV0dXJuIE51bWJlcihiKSAtIE51bWJlcihhKTtcbiAgICB9KTtcbiAgICAvLyByZW1vdmUgZHVwbGljYXRlIHNjYWxlc1xuICAgIG5TY2FsZXMgPSBbXTtcbiAgICB3aGlsZSAoc2NhbGVzLmxlbmd0aCAhPSAwKXtcbiAgICAgIHZhciBzY2FsZSA9IHNjYWxlcy5wb3AoMCk7XG4gICAgICBpZiAoJC5pbkFycmF5KCBzY2FsZSwgblNjYWxlcyApID09IC0xIClcbiAgICAgICAgblNjYWxlcy5wdXNoKCBzY2FsZSApO1xuICAgIH1cbiAgICBzY2FsZXMgPSBuU2NhbGVzO1xuXG5cbiAgICAvLyBjcmVhdGluZyB0aGUgbWFwXG4gICAgT3BlbkxheWVycy5VdGlsLklNQUdFX1JFTE9BRF9BVFRFTVBUUyA9IDM7IC8vIEF2b2lkIHNvbWUgaXNzdWVzIHdpdGggdGlsZXMgbm90IGRpc3BsYXllZFxuICAgIE9wZW5MYXllcnMuSU1BR0VfUkVMT0FEX0FUVEVNUFRTID0gMztcbiAgICBPcGVuTGF5ZXJzLlV0aWwuREVGQVVMVF9QUkVDSVNJT049MjA7IC8vIGRlZmF1bHQgaXMgMTQgOiBjaGFuZ2UgbmVlZGVkIHRvIGF2b2lkIHJvdW5kaW5nIHByb2JsZW0gd2l0aCBjYWNoZVxuXG4gICAgbWFwID0gbmV3IE9wZW5MYXllcnMuTWFwKCdtYXAnXG4gICAgICAse1xuICAgICAgICBjb250cm9sczpbXG4gICAgICAgICAgbmV3IE9wZW5MYXllcnMuQ29udHJvbC5OYXZpZ2F0aW9uKHttb3VzZVdoZWVsT3B0aW9uczoge2ludGVydmFsOiAxMDB9fSlcbiAgICAgICAgXVxuICAgICAgICAsdGlsZU1hbmFnZXI6IG51bGwgLy8gcHJldmVudCBidWcgd2l0aCBPTCAyLjEzIDogd2hpdGUgdGlsZXMgb24gcGFubmluZyBiYWNrXG4gICAgICAgICxldmVudExpc3RlbmVyczp7XG4gICAgICAgICB6b29tZW5kOiBmdW5jdGlvbihldnQpe1xuICAvLyBwcml2YXRlIHRyZWVUYWJsZVxuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBjaGlsZFByZWZpeCA6IFwiY2hpbGQtb2YtXCJcbiAgfTtcblxuICBmdW5jdGlvbiBjaGlsZHJlbk9mKG5vZGUpIHtcbiAgICByZXR1cm4gJChub2RlKS5zaWJsaW5ncyhcInRyLlwiICsgb3B0aW9ucy5jaGlsZFByZWZpeCArIG5vZGVbMF0uaWQpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGRlc2NlbmRhbnRzT2Yobm9kZSkge1xuICAgIHZhciBkZXNjZW5kYW50cyA9IFtdO1xuICAgIHZhciBjaGlsZHJlbiA9IFtdO1xuICAgIGlmIChub2RlICYmIG5vZGVbMF0pXG4gICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuT2Yobm9kZSk7XG4gICAgZm9yICh2YXIgaT0wLCBsZW49Y2hpbGRyZW4ubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICBkZXNjZW5kYW50cy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgIGRlc2NlbmRhbnRzID0gZGVzY2VuZGFudHMuY29uY2F0KGRlc2NlbmRhbnRzT2YoW2NoaWxkcmVuW2ldXSkpO1xuICAgIH1cbiAgICByZXR1cm4gZGVzY2VuZGFudHM7XG4gIH07XG5cbiAgZnVuY3Rpb24gcGFyZW50T2Yobm9kZSkge1xuICAgIGlmIChub2RlLmxlbmd0aCA9PSAwIClcbiAgICAgIHJldHVybiBudWxsO1xuXG4gICAgdmFyIGNsYXNzTmFtZXMgPSBub2RlWzBdLmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuXG4gICAgZm9yKHZhciBrZXk9MDsga2V5PGNsYXNzTmFtZXMubGVuZ3RoOyBrZXkrKykge1xuICAgICAgaWYoY2xhc3NOYW1lc1trZXldLm1hdGNoKG9wdGlvbnMuY2hpbGRQcmVmaXgpKSB7XG4gICAgICAgIHJldHVybiAkKG5vZGUpLnNpYmxpbmdzKFwiI1wiICsgY2xhc3NOYW1lc1trZXldLnN1YnN0cmluZyhvcHRpb25zLmNoaWxkUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGFuY2VzdG9yc09mKG5vZGUpIHtcbiAgICB2YXIgYW5jZXN0b3JzID0gW107XG4gICAgd2hpbGUobm9kZSA9IHBhcmVudE9mKG5vZGUpKSB7XG4gICAgICBhbmNlc3RvcnNbYW5jZXN0b3JzLmxlbmd0aF0gPSBub2RlWzBdO1xuICAgIH1cbiAgICByZXR1cm4gYW5jZXN0b3JzO1xuICB9O1xuICAgICAgICAgICAvL2xheWVyIHZpc2liaWxpdHlcbiAgICAgICAgICAgZm9yICh2YXIgaT0wLGxlbj1sYXllcnMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgdmFyIGxheWVyID0gbGF5ZXJzW2ldO1xuICAgICAgICAgICAgIHZhciBiID0gJCgnI3N3aXRjaGVyIGJ1dHRvbltuYW1lPVwibGF5ZXJcIl1bdmFsdWU9XCInK2xheWVyLm5hbWUrJ1wiXScpLmZpcnN0KCk7XG5cbiAgICAgICAgICAgICBpZiAobGF5ZXIuaW5SYW5nZSAmJiBiLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICB2YXIgdHIgPSBiLnBhcmVudHMoJ3RyJykuZmlyc3QoKTtcbiAgICAgICAgICAgICAgIHRyLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpLmZpbmQoJ2J1dHRvbicpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgdmFyIGFuY2VzdG9ycyA9IGFuY2VzdG9yc09mKHRyKTtcbiAgICAgICAgICAgICAgICQuZWFjaChhbmNlc3RvcnMsZnVuY3Rpb24oaSxhKSB7XG4gICAgICAgICAgICAgICAgICQoYSkucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJykuZmluZCgnYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgIGlmICh0ci5maW5kKCdidXR0b25bbmFtZT1cImxheWVyXCJdJykuaGFzQ2xhc3MoJ2NoZWNrZWQnKSlcbiAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0VmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgICAgICB9IGVsc2UgaWYgKCFsYXllci5pblJhbmdlICYmICFiLmhhc0NsYXNzKCdkaXNhYmxlZCcpKSB7XG4gICAgICAgICAgICAgICB2YXIgdHIgPSBiLnBhcmVudHMoJ3RyJykuZmlyc3QoKTtcbiAgICAgICAgICAgICAgIHRyLmFkZENsYXNzKCdkaXNhYmxlZCcpLmZpbmQoJ2J1dHRvbicpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgaWYgKHRyLmhhc0NsYXNzKCdsaXotbGF5ZXInKSlcbiAgICAgICAgICAgICAgICAgdHIuY29sbGFwc2UoKTtcbiAgICAgICAgICAgICAgIHZhciBhbmNlc3RvcnMgPSBhbmNlc3RvcnNPZih0cik7XG4gICAgICAgICAgICAgICAkLmVhY2goYW5jZXN0b3JzLGZ1bmN0aW9uKGksYSkge1xuICAgICAgICAgICAgICAgICAgICBhID0gJChhKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGNoZWNrZWQgPSAwO1xuICAgICAgICAgICAgICAgICAgICB2YXIgYURlc2MgPSBjaGlsZHJlbk9mKGEpO1xuICAgICAgICAgICAgICAgICAgICAkLmVhY2goYURlc2MsZnVuY3Rpb24oaix0cmQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAkKHRyZCkuZmluZCgnYnV0dG9uLmNoZWNrYm94JykuZWFjaChmdW5jdGlvbihpLGIpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCQoYikuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrZWQrKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICBpZiAoY291bnQgPT0gY2hlY2tlZClcbiAgICAgICAgICAgICAgICAgICBhLmFkZENsYXNzKCdkaXNhYmxlZCcpLmZpbmQoJ2J1dHRvbicpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgYS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKS5maW5kKCdidXR0b24nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgfVxuXG4gICAgICAgICAgIC8vcGFuIGJ1dHRvblxuICAgICAgICAgICAkKCcjbmF2YmFyIGJ1dHRvbi5wYW4nKS5jbGljaygpO1xuICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAsbWF4RXh0ZW50OmV4dGVudFxuICAgICAgICxyZXN0cmljdGVkRXh0ZW50OiByZXN0cmljdGVkRXh0ZW50XG4gICAgICAgLGluaXRpYWxFeHRlbnQ6aW5pdGlhbEV4dGVudFxuICAgICAgICxtYXhTY2FsZTogc2NhbGVzLmxlbmd0aCA9PSAwID8gY29uZmlnLm9wdGlvbnMubWluU2NhbGUgOiBcImF1dG9cIlxuICAgICAgICxtaW5TY2FsZTogc2NhbGVzLmxlbmd0aCA9PSAwID8gY29uZmlnLm9wdGlvbnMubWF4U2NhbGUgOiBcImF1dG9cIlxuICAgICAgICxudW1ab29tTGV2ZWxzOiBzY2FsZXMubGVuZ3RoID09IDAgPyBjb25maWcub3B0aW9ucy56b29tTGV2ZWxOdW1iZXIgOiBzY2FsZXMubGVuZ3RoXG4gICAgICAgLHNjYWxlczogc2NhbGVzLmxlbmd0aCA9PSAwID8gbnVsbCA6IHNjYWxlc1xuICAgICAgICxyZXNvbHV0aW9uczogcmVzb2x1dGlvbnMubGVuZ3RoID09IDAgPyBudWxsIDogcmVzb2x1dGlvbnNcbiAgICAgICAscHJvamVjdGlvbjpwcm9qZWN0aW9uXG4gICAgICAgLHVuaXRzOnByb2plY3Rpb24ucHJvai51bml0c1xuICAgICAgICxhbGxPdmVybGF5czooYmFzZWxheWVycy5sZW5ndGggPT0gMClcbiAgICB9KTtcbiAgICBtYXAuYWRkQ29udHJvbChuZXcgT3BlbkxheWVycy5Db250cm9sLkF0dHJpYnV0aW9uKHtkaXY6ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2F0dHJpYnV0aW9uJyl9KSk7XG5cbiAgICAvLyBhZGQgaGFuZGxlciB0byB1cGRhdGUgdGhlIG1hcCBzaXplXG4gICAgJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcbiAgICAgIHVwZGF0ZUNvbnRlbnRTaXplKCk7XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IGZlYXR1cmVzIGZvciBsb2NhdGUgYnkgbGF5ZXIgdG9vbFxuICAgKi9cbiAgZnVuY3Rpb24gdXBkYXRlTG9jYXRlRmVhdHVyZUxpc3QoYU5hbWUsIGFKb2luRmllbGQsIGFKb2luVmFsdWUpIHtcbiAgICB2YXIgbG9jYXRlID0gY29uZmlnLmxvY2F0ZUJ5TGF5ZXJbYU5hbWVdO1xuICAgIC8vIGNsb25lIGZlYXR1cmVzIHJlZmVyZW5jZVxuICAgIHZhciBmZWF0dXJlcyA9IHt9O1xuICAgIGZvciAoIHZhciBmaWQgaW4gbG9jYXRlLmZlYXR1cmVzICkge1xuICAgICAgICBmZWF0dXJlc1tmaWRdID0gbG9jYXRlLmZlYXR1cmVzW2ZpZF07XG4gICAgfVxuICAgIC8vIGZpbHRlciBieSBmaWx0ZXIgZmllbGQgbmFtZVxuICAgIGlmICgnZmlsdGVyRmllbGROYW1lJyBpbiBsb2NhdGUpIHtcbiAgICAgICAgdmFyIGZpbHRlclZhbHVlID0gJCgnI2xvY2F0ZS1sYXllci0nK2NsZWFuTmFtZShhTmFtZSkrJy0nK2xvY2F0ZS5maWx0ZXJGaWVsZE5hbWUpLnZhbCgpO1xuICAgICAgICBpZiAoIGZpbHRlclZhbHVlICE9ICctMScgKSB7XG4gICAgICAgICAgZm9yICh2YXIgZmlkIGluIGZlYXR1cmVzKSB7XG4gICAgICAgICAgICB2YXIgZmVhdCA9IGZlYXR1cmVzW2ZpZF07XG4gICAgICAgICAgICBpZiAoZmVhdC5wcm9wZXJ0aWVzW2xvY2F0ZS5maWx0ZXJGaWVsZE5hbWVdICE9IGZpbHRlclZhbHVlKVxuICAgICAgICAgICAgICBkZWxldGUgZmVhdHVyZXNbZmlkXTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZVxuICAgICAgICAgIGZlYXR1cmVzID0ge31cbiAgICB9XG4gICAgLy8gZmlsdGVyIGJ5IHZlY3RvciBqb2luc1xuICAgIGlmICggJ3ZlY3RvcmpvaW5zJyBpbiBsb2NhdGUgJiYgbG9jYXRlLnZlY3RvcmpvaW5zLmxlbmd0aCAhPSAwICkge1xuICAgICAgICB2YXIgdmVjdG9yam9pbnMgPSBsb2NhdGUudmVjdG9yam9pbnM7XG4gICAgICAgIGZvciAoIGk9MCwgbGVuID12ZWN0b3Jqb2lucy5sZW5ndGg7IGk8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgICB2ZWN0b3Jqb2luID0gdmVjdG9yam9pbnNbaV07XG4gICAgICAgICAgICB2YXIgak5hbWUgPSB2ZWN0b3Jqb2luLmpvaW5MYXllcjtcbiAgICAgICAgICAgIGlmICggak5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIgKSB7XG4gICAgICAgICAgICAgICAgdmFyIGpMb2NhdGUgPSBjb25maWcubG9jYXRlQnlMYXllcltqTmFtZV07XG4gICAgICAgICAgICAgICAgdmFyIGpWYWwgPSAkKCcjbG9jYXRlLWxheWVyLScrY2xlYW5OYW1lKGpOYW1lKSkudmFsKCk7XG4gICAgICAgICAgICAgICAgaWYgKCBqVmFsID09ICctMScgKSBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB2YXIgakZlYXQgPSBqTG9jYXRlLmZlYXR1cmVzW2pWYWxdO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIGZpZCBpbiBmZWF0dXJlcykge1xuICAgICAgICAgICAgICAgICAgdmFyIGZlYXQgPSBmZWF0dXJlc1tmaWRdO1xuICAgICAgICAgICAgICAgICAgaWYgKCBmZWF0LnByb3BlcnRpZXNbdmVjdG9yam9pbi50YXJnZXRGaWVsZE5hbWVdICE9IGpGZWF0LnByb3BlcnRpZXNbdmVjdG9yam9pbi5qb2luRmllbGROYW1lXSApXG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBmZWF0dXJlc1tmaWRdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICAvLyBjcmVhdGUgdGhlIG9wdGlvbiBsaXN0XG4gICAgdmFyIG9wdGlvbnMgPSAnPG9wdGlvbiB2YWx1ZT1cIi0xXCI+PC9vcHRpb24+JztcbiAgICBmb3IgKHZhciBmaWQgaW4gZmVhdHVyZXMpIHtcbiAgICAgIHZhciBmZWF0ID0gZmVhdHVyZXNbZmlkXTtcbiAgICAgIG9wdGlvbnMgKz0gJzxvcHRpb24gdmFsdWU9XCInK2ZlYXQuaWQrJ1wiPicrZmVhdC5wcm9wZXJ0aWVzW2xvY2F0ZS5maWVsZE5hbWVdKyc8L29wdGlvbj4nO1xuICAgIH1cbiAgICAvLyBhZGQgb3B0aW9uIGxpc3RcbiAgICAkKCcjbG9jYXRlLWxheWVyLScrY2xlYW5OYW1lKGFOYW1lKSkuaHRtbChvcHRpb25zKTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFpvb20gdG8gbG9jYXRlIGZlYXR1cmVcbiAgICovXG4gIGZ1bmN0aW9uIHpvb21Ub0xvY2F0ZUZlYXR1cmUoYU5hbWUpIHtcbiAgICAvLyBjbGVhbiBsb2NhdGUgbGF5ZXJcbiAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKCdsb2NhdGVsYXllcicpO1xuICAgIGlmICggbGF5ZXIubGVuZ3RoID09IDAgKVxuICAgICAgcmV0dXJuO1xuICAgIGxheWVyID0gbGF5ZXJbMF07XG4gICAgbGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG5cbiAgICAvLyBnZXQgbG9jYXRlIGJ5IGxheWVyIHZhbFxuICAgIHZhciBsb2NhdGUgPSBjb25maWcubG9jYXRlQnlMYXllclthTmFtZV07XG4gICAgdmFyIGxheWVyTmFtZSA9IGNsZWFuTmFtZShhTmFtZSk7XG4gICAgdmFyIHByb2ogPSBuZXcgT3BlbkxheWVycy5Qcm9qZWN0aW9uKGxvY2F0ZS5jcnMpO1xuICAgIHZhciB2YWwgPSAkKCcjbG9jYXRlLWxheWVyLScrbGF5ZXJOYW1lKS52YWwoKTtcbiAgICBpZiAodmFsID09ICctMScpIHtcblxuICAgICAgLy8gVHJpZ2dlciBldmVudFxuICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoJ2xpem1hcGxvY2F0ZWZlYXR1cmVjYW5jZWxlZCcsXG4gICAgICAgIHtcbiAgICAgICAgICAnZmVhdHVyZVR5cGUnOiBhTmFtZVxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyB6b29tIHRvIHZhbFxuICAgICAgdmFyIGZlYXQgPSBsb2NhdGUuZmVhdHVyZXNbdmFsXTtcbiAgICAgIHZhciBmb3JtYXQgPSBuZXcgT3BlbkxheWVycy5Gb3JtYXQuR2VvSlNPTigpO1xuICAgICAgZmVhdCA9IGZvcm1hdC5yZWFkKGZlYXQpWzBdO1xuXG4gICAgICBpZiggZmVhdC5nZW9tZXRyeSAhPSBudWxsKXtcbiAgICAgICAgZmVhdC5nZW9tZXRyeS50cmFuc2Zvcm0ocHJvaiwgbWFwLmdldFByb2plY3Rpb24oKSk7XG4gICAgICAgIC8vIFNob3cgZ2VvbWV0cnkgaWYgYXNrZWRcbiAgICAgICAgaWYgKGxvY2F0ZS5kaXNwbGF5R2VvbSA9PSAnVHJ1ZScpIHtcbiAgICAgICAgICAgIHZhciBnZXRGZWF0dXJlVXJsRGF0YSA9IGdldFZlY3RvckxheWVyV2ZzVXJsKCBhTmFtZSwgbnVsbCwgbnVsbCwgbnVsbCApO1xuICAgICAgICAgICAgZ2V0RmVhdHVyZVVybERhdGFbJ29wdGlvbnMnXVsnUFJPUEVSVFlOQU1FJ10gPSBbJ2dlb21ldHJ5Jyxsb2NhdGUuZmllbGROYW1lXS5qb2luKCcsJyk7XG4gICAgICAgICAgICBnZXRGZWF0dXJlVXJsRGF0YVsnb3B0aW9ucyddWydGRUFUVVJFSUQnXSA9IHZhbDtcbiAgICAgICAgICAgIC8vIEdldCBkYXRhXG4gICAgICAgICAgICAkLnBvc3QoIGdldEZlYXR1cmVVcmxEYXRhWyd1cmwnXSwgZ2V0RmVhdHVyZVVybERhdGFbJ29wdGlvbnMnXSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICBpZiAoICFkYXRhLmZlYXR1cmVzIClcbiAgICAgICAgICAgICAgICBkYXRhID0gSlNPTi5wYXJzZShkYXRhKTtcbiAgICAgICAgICAgICAgaWYoIGRhdGEuZmVhdHVyZXMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgICBmZWF0ID0gZm9ybWF0LnJlYWQoZGF0YS5mZWF0dXJlc1swXSlbMF07XG4gICAgICAgICAgICAgICAgZmVhdC5nZW9tZXRyeS50cmFuc2Zvcm0ocHJvaiwgbWFwLmdldFByb2plY3Rpb24oKSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbGF5ZXIuYWRkRmVhdHVyZXMoW2ZlYXRdKTtcbiAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgbGF5ZXIuYWRkRmVhdHVyZXMoW2ZlYXRdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIC8vem9vbSB0byBleHRlbnRcbiAgICAgICAgbWFwLnpvb21Ub0V4dGVudChmZWF0Lmdlb21ldHJ5LmdldEJvdW5kcygpKTtcblxuICAgICAgfVxuXG4gICAgICB2YXIgZmlkID0gdmFsLnNwbGl0KCcuJylbMV07XG5cbiAgICAgIC8vIFRyaWdnZXIgZXZlbnRcbiAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KCdsaXptYXBsb2NhdGVmZWF0dXJlY2hhbmdlZCcsXG4gICAgICAgIHtcbiAgICAgICAgICAnZmVhdHVyZVR5cGUnOiBhTmFtZSxcbiAgICAgICAgICAnZmVhdHVyZUlkJzogZmlkXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmZWF0dXJlcyBmb3IgbG9jYXRlIGJ5IGxheWVyIHRvb2xcbiAgICovXG4gIGZ1bmN0aW9uIGdldExvY2F0ZUZlYXR1cmUoYU5hbWUpIHtcbiAgICB2YXIgbG9jYXRlID0gY29uZmlnLmxvY2F0ZUJ5TGF5ZXJbYU5hbWVdO1xuXG4gICAgLy8gZ2V0IGZpZWxkcyB0byByZXRyaWV2ZVxuICAgIHZhciBmaWVsZHMgPSBbJ2dlb21ldHJ5Jyxsb2NhdGUuZmllbGROYW1lXTtcbiAgICAvLyBpZiBhIGZpbHRlciBmaWVsZCBpcyBkZWZpbmVkXG4gICAgaWYgKCdmaWx0ZXJGaWVsZE5hbWUnIGluIGxvY2F0ZSlcbiAgICAgIGZpZWxkcy5wdXNoKCBsb2NhdGUuZmlsdGVyRmllbGROYW1lICk7XG4gICAgLy8gY2hlY2sgZm9yIGpvaW4gZmllbGRzXG4gICAgaWYgKCAnZmlsdGVyam9pbnMnIGluIGxvY2F0ZSApIHtcbiAgICAgIHZhciBmaWx0ZXJqb2lucyA9IGxvY2F0ZS5maWx0ZXJqb2lucztcbiAgICAgIGZvciAoIHZhciBpPTAsIGxlbj1maWx0ZXJqb2lucy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICB2YXIgZmlsdGVyam9pbiA9IGZpbHRlcmpvaW5zW2ldO1xuICAgICAgICAgIGZpZWxkcy5wdXNoKCBmaWx0ZXJqb2luLnRhcmdldEZpZWxkTmFtZSApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoICd2ZWN0b3Jqb2lucycgaW4gbG9jYXRlICkge1xuICAgICAgdmFyIHZlY3RvcmpvaW5zID0gbG9jYXRlLnZlY3RvcmpvaW5zO1xuICAgICAgZm9yICggdmFyIGk9MCwgbGVuPXZlY3RvcmpvaW5zLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgICAgIHZhciB2ZWN0b3Jqb2luID0gdmVjdG9yam9pbnNbaV07XG4gICAgICAgICAgZmllbGRzLnB1c2goIHZlY3RvcmpvaW4udGFyZ2V0RmllbGROYW1lICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2V0IFdGUyB1cmwgYW5kIG9wdGlvbnNcbiAgICB2YXIgZ2V0RmVhdHVyZVVybERhdGEgPSBnZXRWZWN0b3JMYXllcldmc1VybCggYU5hbWUsIG51bGwsIG51bGwsICdleHRlbnQnICk7XG4gICAgZ2V0RmVhdHVyZVVybERhdGFbJ29wdGlvbnMnXVsnUFJPUEVSVFlOQU1FJ10gPSBmaWVsZHMuam9pbignLCcpO1xuXG4gICAgdmFyIGxheWVyTmFtZSA9IGNsZWFuTmFtZShhTmFtZSk7XG5cbiAgICAvLyBHZXQgZGF0YVxuICAgICQucG9zdCggZ2V0RmVhdHVyZVVybERhdGFbJ3VybCddLCBnZXRGZWF0dXJlVXJsRGF0YVsnb3B0aW9ucyddLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICB2YXIgbENvbmZpZyA9IGNvbmZpZy5sYXllcnNbYU5hbWVdO1xuICAgICAgbG9jYXRlWydmZWF0dXJlcyddID0ge307XG4gICAgICBpZiAoICFkYXRhLmZlYXR1cmVzIClcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB2YXIgZmVhdHVyZXMgPSBkYXRhLmZlYXR1cmVzO1xuICAgICAgaWYoIGxvY2F0ZS5jcnMgIT0gJ0VQU0c6NDMyNicgJiYgZmVhdHVyZXMubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAvLyBsb2FkIHByb2plY3Rpb24gdG8gYmUgc3VyZSB0byBoYXZlIHRoZSBkZWZpbml0aW9uXG4gICAgICAgICAgbG9hZFByb2pEZWZpbml0aW9uKCBsb2NhdGUuY3JzLCBmdW5jdGlvbiggYVByb2ogKSB7XG4gICAgICAgICAgICAgIC8vIGluIFFHSVMgc2VydmVyID4gMi4xNCBHZW9KU09OIGlzIGluIEVQU0c6NDMyNlxuICAgICAgICAgICAgICBpZiAoICdxZ2lzU2VydmVyVmVyc2lvbicgaW4gY29uZmlnLm9wdGlvbnMgJiYgY29uZmlnLm9wdGlvbnMucWdpc1NlcnZlclZlcnNpb24gIT0gJzIuMTQnIClcbiAgICAgICAgICAgICAgICBsb2NhdGUuY3JzID0gJ0VQU0c6NDMyNic7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgnZmlsdGVyRmllbGROYW1lJyBpbiBsb2NhdGUpIHtcbiAgICAgICAgLy8gY3JlYXRlIGZpbHRlciBjb21ib2JveCBmb3IgdGhlIGxheWVyXG4gICAgICAgIGZlYXR1cmVzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgdmFyIGFQcm9wZXJ0eSA9IGEucHJvcGVydGllc1tsb2NhdGUuZmlsdGVyRmllbGROYW1lXTtcbiAgICAgICAgICAgIHZhciBiUHJvcGVydHkgPSBiLnByb3BlcnRpZXNbbG9jYXRlLmZpbHRlckZpZWxkTmFtZV07XG4gICAgICAgICAgICBpZiAoaXNOYU4oYVByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihiUHJvcGVydHkpKSB7ICAvLyBhIGFuZCBiIGFyZSBzdHJpbmdzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhUHJvcGVydHkubG9jYWxlQ29tcGFyZShiUHJvcGVydHkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgLy8gYSBzdHJpbmcgYW5kIGIgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxOyAgLy8gYSA+IGJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihiUHJvcGVydHkpKSB7ICAvLyBhIG51bWJlciBhbmQgYiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xOyAgLy8gYSA8IGJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAgICAgICAgIC8vIGEgYW5kIGIgYXJlIG51bWJlcnNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoYVByb3BlcnR5KSAtIHBhcnNlRmxvYXQoYlByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgZmlsdGVyUGxhY2VIb2xkZXIgPSAnJztcbiAgICAgICAgaWYgKCAnZmlsdGVyRmllbGRBbGlhcycgaW4gbG9jYXRlICYmIGxvY2F0ZS5maWx0ZXJGaWVsZEFsaWFzIT0nJylcbiAgICAgICAgICBmaWx0ZXJQbGFjZUhvbGRlciArPSBsb2NhdGUuZmlsdGVyRmllbGRBbGlhcysnICc7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBmaWx0ZXJQbGFjZUhvbGRlciArPSBsb2NhdGUuZmlsdGVyRmllbGROYW1lO1xuICAgICAgICBmaWx0ZXJQbGFjZUhvbGRlciArPScgKCcrIGxDb25maWcudGl0bGUgKyAnKSc7XG4gICAgICAgIHZhciBmT3B0aW9ucyA9ICc8b3B0aW9uIHZhbHVlPVwiLTFcIj48L29wdGlvbj4nO1xuICAgICAgICB2YXIgZlZhbHVlID0gJy0xJztcbiAgICAgICAgZm9yICh2YXIgaT0wLCBsZW49ZmVhdHVyZXMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZlYXQgPSBmZWF0dXJlc1tpXTtcbiAgICAgICAgICBpZiAoIGZWYWx1ZSAhPSBmZWF0LnByb3BlcnRpZXNbbG9jYXRlLmZpbHRlckZpZWxkTmFtZV0gKSB7XG4gICAgICAgICAgICBmVmFsdWUgPSBmZWF0LnByb3BlcnRpZXNbbG9jYXRlLmZpbHRlckZpZWxkTmFtZV07XG4gICAgICAgICAgICBmT3B0aW9ucyArPSAnPG9wdGlvbiB2YWx1ZT1cIicrZlZhbHVlKydcIj4nK2ZWYWx1ZSsnPC9vcHRpb24+JztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIGFkZCBmaWx0ZXIgdmFsdWVzIGxpc3RcbiAgICAgICAgJCgnI2xvY2F0ZS1sYXllci0nK2xheWVyTmFtZSkucGFyZW50KCkuYmVmb3JlKCc8ZGl2IGNsYXNzPVwibG9jYXRlLWxheWVyXCI+PHNlbGVjdCBpZD1cImxvY2F0ZS1sYXllci0nK2xheWVyTmFtZSsnLScrbG9jYXRlLmZpbHRlckZpZWxkTmFtZSsnXCI+JytmT3B0aW9ucysnPC9zZWxlY3Q+PC9kaXY+PGJyLz4nKTtcbiAgICAgICAgLy8gbGlzdGVuIHRvIGZpbHRlciBzZWxlY3QgY2hhbmdlc1xuICAgICAgICAkKCcjbG9jYXRlLWxheWVyLScrbGF5ZXJOYW1lKyctJytsb2NhdGUuZmlsdGVyRmllbGROYW1lKS5jaGFuZ2UoZnVuY3Rpb24oKXtcbiAgICAgICAgICB2YXIgZmlsdGVyVmFsdWUgPSAkKHRoaXMpLmNoaWxkcmVuKCc6c2VsZWN0ZWQnKS52YWwoKTtcbiAgICAgICAgICB1cGRhdGVMb2NhdGVGZWF0dXJlTGlzdCggYU5hbWUgKTtcbiAgICAgICAgICBpZiAoZmlsdGVyVmFsdWUgPT0gJy0xJylcbiAgICAgICAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytsYXllck5hbWUrJy0nK2xvY2F0ZS5maWx0ZXJGaWVsZE5hbWUrJyB+IHNwYW4gPiBpbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgJCgnI2xvY2F0ZS1sYXllci0nK2xheWVyTmFtZSsnIH4gc3BhbiA+IGlucHV0JykudmFsKCcnKTtcbiAgICAgICAgICAkKCcjbG9jYXRlLWxheWVyLScrbGF5ZXJOYW1lKS52YWwoJy0xJyk7XG4gICAgICAgICAgem9vbVRvTG9jYXRlRmVhdHVyZShhTmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICAvLyBhZGQgY29tYm9ib3ggdG8gdGhlIGZpbHRlciBzZWxlY3RcbiAgICAgICAgJCgnI2xvY2F0ZS1sYXllci0nK2xheWVyTmFtZSsnLScrbG9jYXRlLmZpbHRlckZpZWxkTmFtZSkuY29tYm9ib3goe1xuICAgICAgICAgIHBvc2l0aW9uOiB7IG15IDogXCJyaWdodCB0b3BcIiwgYXQ6IFwicmlnaHQgYm90dG9tXCIgfSxcbiAgICAgICAgICBcInNlbGVjdGVkXCI6IGZ1bmN0aW9uKGV2dCwgdWkpe1xuICAgICAgICAgICAgaWYgKCB1aS5pdGVtICkge1xuICAgICAgICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICAgIHZhciB1aUl0ZW0gPSAkKHVpLml0ZW0pO1xuICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHNlbGYudmFsKHVpSXRlbS52YWwoKSkuY2hhbmdlKCk7XG4gICAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gYWRkIHBsYWNlIGhvbGRlciB0byB0aGUgZmlsdGVyIGNvbWJvYm94IGlucHV0XG4gICAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytsYXllck5hbWUrJy0nK2xvY2F0ZS5maWx0ZXJGaWVsZE5hbWUrJyB+IHNwYW4gPiBpbnB1dCcpLmF0dHIoJ3BsYWNlaG9sZGVyJywgZmlsdGVyUGxhY2VIb2xkZXIpLnZhbCgnJyk7XG4gICAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytsYXllck5hbWUrJy0nK2xvY2F0ZS5maWx0ZXJGaWVsZE5hbWUrJyB+IHNwYW4gPiBpbnB1dCcpLmF1dG9jb21wbGV0ZSgnY2xvc2UnKTtcbiAgICAgICAgdXBkYXRlU3dpdGNoZXJTaXplKCk7XG4gICAgICAgIHVwZGF0ZU1pbmlEb2NrU2l6ZSgpO1xuICAgICAgfVxuXG4gICAgICAvLyBjcmVhdGUgY29tYm9ib3ggZm9yIHRoZSBsYXllclxuICAgICAgZmVhdHVyZXMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICAgICAgICB2YXIgYVByb3BlcnR5ID0gYS5wcm9wZXJ0aWVzW2xvY2F0ZS5maWVsZE5hbWVdO1xuICAgICAgICAgICAgdmFyIGJQcm9wZXJ0eSA9IGIucHJvcGVydGllc1tsb2NhdGUuZmllbGROYW1lXTtcbiAgICAgICAgICAgIGlmIChpc05hTihhUHJvcGVydHkpKSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKGJQcm9wZXJ0eSkpIHsgIC8vIGEgYW5kIGIgYXJlIHN0cmluZ3NcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGFQcm9wZXJ0eS5sb2NhbGVDb21wYXJlKGJQcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgICAgICAvLyBhIHN0cmluZyBhbmQgYiBudW1iZXJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDE7ICAvLyBhID4gYlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKGlzTmFOKGJQcm9wZXJ0eSkpIHsgIC8vIGEgbnVtYmVyIGFuZCBiIHN0cmluZ1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gLTE7ICAvLyBhIDwgYlxuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgLy8gYSBhbmQgYiBhcmUgbnVtYmVyc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcGFyc2VGbG9hdChhUHJvcGVydHkpIC0gcGFyc2VGbG9hdChiUHJvcGVydHkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgdmFyIHBsYWNlSG9sZGVyID0gJyc7XG4gICAgICBpZiAoICdmaWVsZEFsaWFzJyBpbiBsb2NhdGUgJiYgbG9jYXRlLmZpZWxkQWxpYXMhPScnIClcbiAgICAgICAgcGxhY2VIb2xkZXIgKz0gbG9jYXRlLmZpZWxkQWxpYXMrJyAnO1xuICAgICAgZWxzZVxuICAgICAgICBwbGFjZUhvbGRlciArPSBsb2NhdGUuZmllbGROYW1lKycgJztcbiAgICAgIHBsYWNlSG9sZGVyICs9ICcoJytsQ29uZmlnLnRpdGxlKycpJztcbiAgICAgIHZhciBvcHRpb25zID0gJzxvcHRpb24gdmFsdWU9XCItMVwiPjwvb3B0aW9uPic7XG4gICAgICBmb3IgKHZhciBpPTAsIGxlbj1mZWF0dXJlcy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgdmFyIGZlYXQgPSBmZWF0dXJlc1tpXTtcbiAgICAgICAgbG9jYXRlLmZlYXR1cmVzW2ZlYXQuaWQudG9TdHJpbmcoKV0gPSBmZWF0O1xuICAgICAgICBpZiAoICEoJ2ZpbHRlckZpZWxkTmFtZScgaW4gbG9jYXRlKSApXG4gICAgICAgICAgb3B0aW9ucyArPSAnPG9wdGlvbiB2YWx1ZT1cIicrZmVhdC5pZCsnXCI+JytmZWF0LnByb3BlcnRpZXNbbG9jYXRlLmZpZWxkTmFtZV0rJzwvb3B0aW9uPic7XG4gICAgICB9XG4gICAgICAvLyBsaXN0ZW4gdG8gc2VsZWN0IGNoYW5nZXNcbiAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytsYXllck5hbWUpLmh0bWwob3B0aW9ucykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS5jaGlsZHJlbignOnNlbGVjdGVkJykudmFsKCk7XG4gICAgICAgIGlmICh2YWwgPT0gJy0xJykge1xuICAgICAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytsYXllck5hbWUrJyB+IHNwYW4gPiBpbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgLy8gdXBkYXRlIHRvIGpvaW4gbGF5ZXJcbiAgICAgICAgICBpZiAoICdmaWx0ZXJqb2lucycgaW4gbG9jYXRlICYmIGxvY2F0ZS5maWx0ZXJqb2lucy5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgICAgICAgdmFyIGZpbHRlcmpvaW5zID0gbG9jYXRlLmZpbHRlcmpvaW5zO1xuICAgICAgICAgICAgICBmb3IgKHZhciBpPTAsIGxlbj1maWx0ZXJqb2lucy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIHZhciBmaWx0ZXJqb2luID0gZmlsdGVyam9pbnNbaV07XG4gICAgICAgICAgICAgICAgICB2YXIgak5hbWUgPSBmaWx0ZXJqb2luLmpvaW5MYXllcjtcbiAgICAgICAgICAgICAgICAgIGlmICggak5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gdXBkYXRlIGpvaW5lZCBzZWxlY3Qgb3B0aW9uc1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBvbGRWYWwgPSAkKCcjbG9jYXRlLWxheWVyLScrY2xlYW5OYW1lKGpOYW1lKSkudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTG9jYXRlRmVhdHVyZUxpc3QoIGpOYW1lICk7XG4gICAgICAgICAgICAgICAgICAgICAgJCgnI2xvY2F0ZS1sYXllci0nK2NsZWFuTmFtZShqTmFtZSkpLnZhbCggb2xkVmFsICk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIHpvb20gdG8gcGFyZW50IHNlbGVjdGlvblxuICAgICAgICAgIGlmICggJ3ZlY3RvcmpvaW5zJyBpbiBsb2NhdGUgJiYgbG9jYXRlLnZlY3RvcmpvaW5zLmxlbmd0aCA9PSAxICkge1xuICAgICAgICAgICAgICB2YXIgak5hbWUgPSBsb2NhdGUudmVjdG9yam9pbnNbMF0uam9pbkxheWVyO1xuICAgICAgICAgICAgICBpZiAoIGpOYW1lIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyICkge1xuICAgICAgICAgICAgICAgIHpvb21Ub0xvY2F0ZUZlYXR1cmUoIGpOYW1lICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIGNsZWFyIHRoZSBtYXBcbiAgICAgICAgICB6b29tVG9Mb2NhdGVGZWF0dXJlKCBhTmFtZSApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHpvb20gdG8gdmFsXG4gICAgICAgICAgem9vbVRvTG9jYXRlRmVhdHVyZSggYU5hbWUgKTtcbiAgICAgICAgICAvLyB1cGRhdGUgam9pbmVkIGxheWVyXG4gICAgICAgICAgaWYgKCAnZmlsdGVyam9pbnMnIGluIGxvY2F0ZSAmJiBsb2NhdGUuZmlsdGVyam9pbnMubGVuZ3RoICE9IDAgKSB7XG4gICAgICAgICAgICAgIHZhciBmaWx0ZXJqb2lucyA9IGxvY2F0ZS5maWx0ZXJqb2lucztcbiAgICAgICAgICAgICAgZm9yICh2YXIgaT0wLCBsZW49ZmlsdGVyam9pbnMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyam9pbiA9IGZpbHRlcmpvaW5zW2ldO1xuICAgICAgICAgICAgICAgICAgdmFyIGpOYW1lID0gZmlsdGVyam9pbi5qb2luTGF5ZXI7XG4gICAgICAgICAgICAgICAgICBpZiAoIGpOYW1lIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyICkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBqb2luZWQgc2VsZWN0IG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVMb2NhdGVGZWF0dXJlTGlzdCggak5hbWUgKTtcbiAgICAgICAgICAgICAgICAgICAgICAkKCcjbG9jYXRlLWxheWVyLScrY2xlYW5OYW1lKGpOYW1lKSkudmFsKCctMScpO1xuICAgICAgICAgICAgICAgICAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytjbGVhbk5hbWUoak5hbWUpKycgfiBzcGFuID4gaW5wdXQnKS52YWwoJycpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9KTtcbiAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytsYXllck5hbWUpLmNvbWJvYm94KHtcbiAgICBcIm1pbkxlbmd0aFwiOiAoJ21pbkxlbmd0aCcgaW4gbG9jYXRlKSA/IGxvY2F0ZS5taW5MZW5ndGggOiAwLFxuICAgICAgICBcInBvc2l0aW9uXCI6IHsgbXkgOiBcInJpZ2h0IHRvcFwiLCBhdDogXCJyaWdodCBib3R0b21cIiB9LFxuICAgICAgICBcInNlbGVjdGVkXCI6IGZ1bmN0aW9uKGV2dCwgdWkpe1xuICAgICAgICAgIGlmICggdWkuaXRlbSApIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciB1aUl0ZW0gPSAkKHVpLml0ZW0pO1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgc2VsZi52YWwodWlJdGVtLnZhbCgpKS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH0sIDEpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAkKCcjbG9jYXRlLWxheWVyLScrbGF5ZXJOYW1lKycgfiBzcGFuID4gaW5wdXQnKS5hdHRyKCdwbGFjZWhvbGRlcicsIHBsYWNlSG9sZGVyKS52YWwoJycpO1xuICAgICAgJCgnI2xvY2F0ZS1sYXllci0nK2xheWVyTmFtZSsnIH4gc3BhbiA+IGlucHV0JykuYXV0b2NvbXBsZXRlKCdjbG9zZScpO1xuICAgICAgaWYgKCAoJ21pbkxlbmd0aCcgaW4gbG9jYXRlKSAmJiBsb2NhdGUubWluTGVuZ3RoID4gMCApXG4gICAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytsYXllck5hbWUpLnBhcmVudCgpLmFkZENsYXNzKCduby10b2dnbGUnKTtcbiAgICAgIGlmKG1DaGVja01vYmlsZSgpKXtcbiAgICAgICAgLy8gYXV0b2NvbXBsZXRpb24gaXRlbXMgZm9yIGxvY2F0ZWJ5bGF5ZXIgZmVhdHVyZVxuICAgICAgICAkKCdkaXYubG9jYXRlLWxheWVyIHNlbGVjdCcpLnNob3coKTtcbiAgICAgICAgJCgnc3Bhbi5jdXN0b20tY29tYm9ib3gnKS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSwnanNvbicpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNyZWF0ZSB0aGUgbGF5ZXIgc3dpdGNoZXJcbiAgICovXG4gIGZ1bmN0aW9uIGdldFN3aXRjaGVyTGkoYU5vZGUsIGFMZXZlbCkge1xuICAgIHZhciBub2RlQ29uZmlnID0gYU5vZGUuY29uZmlnO1xuICAgIHZhciBodG1sID0gJzxsaSBpZD1cIicrbm9kZUNvbmZpZy50eXBlKyctJythTm9kZS5uYW1lKydcIj4nO1xuXG4gICAgLy8gYWRkIGNoZWNrYm94IHRvIGRpc3BsYXkgY2hpbGRyZW4gb3IgbGVnZW5kIGltYWdlXG4gICAgaHRtbCArPSAnPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGlkPVwib3Blbicrbm9kZUNvbmZpZy50eXBlK2FOb2RlLm5hbWUrJ1wiIG5hbWU9XCJvcGVuJytub2RlQ29uZmlnLnR5cGUrYU5vZGUubmFtZSsnXCIgY2hlY2tlZD1cImNoZWNrZWRcIj48L2lucHV0PjxsYWJlbCBmb3I9XCJvcGVuJytub2RlQ29uZmlnLnR5cGUrYU5vZGUubmFtZSsnXCI+Jm5ic3A7PC9sYWJlbD4nO1xuICAgIC8vIGFkZCBidXR0b24gdG8gbWFuYWdlIHZpc2liaWxpdHlcbiAgICBodG1sICs9ICc8YnV0dG9uIGNsYXNzPVwiY2hlY2tib3hcIiBuYW1lPVwiJytub2RlQ29uZmlnLnR5cGUrJy0nK2FOb2RlLm5hbWUrJy12aXNpYmlsaXR5XCIgdmFsdWU9XCIwXCIgdGl0bGU9XCInK2xpekRpY3RbJ3RyZWUuYnV0dG9uLmNoZWNrYm94J10rJ1wiPjwvYnV0dG9uPic7XG4gICAgLy8gYWRkIGxheWVyIHRpdGxlXG4gICAgaHRtbCArPSAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiIHRpdGxlPVwiJytub2RlQ29uZmlnLmFic3RyYWN0KydcIj4nK25vZGVDb25maWcudGl0bGUrJzwvc3Bhbj4nO1xuXG4gICAgaWYgKCgnY2hpbGRyZW4nIGluIGFOb2RlKSAmJiBhTm9kZVsnY2hpbGRyZW4nXS5sZW5ndGghPTApIHtcbiAgICAgIGh0bWwgKz0gZ2V0U3dpdGNoZXJVbChhTm9kZSwgYUxldmVsKzEpO1xuICAgIH0gZWxzZSBpZiAobm9kZUNvbmZpZy50eXBlID09ICdsYXllcidcbiAgICAgICAgICAgJiYgKCFub2RlQ29uZmlnLm5vTGVnZW5kSW1hZ2UgfHwgbm9kZUNvbmZpZy5ub0xlZ2VuZEltYWdlICE9ICdUcnVlJykpIHtcbiAgICAgIHZhciB1cmwgPSBnZXRMYXllckxlZ2VuZEdyYXBoaWNVcmwoYU5vZGUubmFtZSwgZmFsc2UpO1xuICAgICAgaWYgKCB1cmwgIT0gbnVsbCAmJiB1cmwgIT0gJycgKSB7XG4gICAgICAgICAgaHRtbCArPSAnPHVsIGlkPVwibGVnZW5kLWxheWVyLScrYU5vZGUubmFtZSsnXCI+JztcbiAgICAgICAgICBodG1sICs9ICc8bGk+PGRpdj48aW1nIGRhdGEtc3JjPVwiJyt1cmwrJ1wiIHNyYz1cIicrbGl6VXJscy5iYXNlcGF0aCArICdjc3MvaW1hZ2VzL2Rvd25sb2FkX2xheWVyLmdpZicgKyAnXCIvPjwvZGl2PjwvbGk+JztcbiAgICAgICAgICBodG1sICs9ICc8L3VsPic7XG4gICAgICB9XG4gICAgfVxuICAgIGh0bWwgKz0gJzwvbGk+JztcbiAgICByZXR1cm4gaHRtbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFN3aXRjaGVyVWwoYU5vZGUsIGFMZXZlbCkge1xuICAgIHZhciBodG1sID0gJzx1bCBjbGFzcz1cImxldmVsJythTGV2ZWwrJ1wiPic7XG4gICAgdmFyIGNoaWxkcmVuID0gYU5vZGUuY2hpbGRyZW47XG4gICAgZm9yICh2YXIgaT0wLCBsZW49Y2hpbGRyZW4ubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICB2YXIgY2hpbGQgPSBjaGlsZHJlbltpXTtcbiAgICAgIGh0bWwgKz0gZ2V0U3dpdGNoZXJMaShjaGlsZCxhTGV2ZWwpO1xuICAgIH1cbiAgICBodG1sICs9ICc8L3VsPic7XG4gICAgcmV0dXJuIGh0bWw7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTd2l0Y2hlck5ldygpIHtcbiAgICAkKCcjc3dpdGNoZXItbGF5ZXJzJykuaHRtbChnZXRTd2l0Y2hlclVsKHRyZWUsMCkpO1xuXG4gICAgbGl6TWFwLmV2ZW50cy5vbih7XG4gICAgICAgIGRvY2tvcGVuZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vIFNldCB0aGUgdGFiLWNvbnRlbnQgbWF4LWhlaWdodFxuICAgICAgICAgICAgaWYgKCAkKCcjZG9jay10YWJzJykuaXMoJzp2aXNpYmxlJykgKVxuICAgICAgICAgICAgICAgICQoJyNkb2NrLWNvbnRlbnQnKS5jc3MoICdtYXgtaGVpZ2h0JywgJCgnI2RvY2snKS5oZWlnaHQoKSAtICQoJyNkb2NrLXRhYnMnKS5oZWlnaHQoKSApO1xuICAgICAgICAgICAgaWYgKCBlLmlkID09ICdzd2l0Y2hlcicgKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlU3dpdGNoZXJTaXplKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHZhciBwcm9qZWN0aW9uID0gbWFwLnByb2plY3Rpb247XG5cbiAgICAvLyBnZXQgdGhlIGJhc2VsYXllciBzZWxlY3QgY29udGVudFxuICAgIC8vIGFuZCBhZGRpbmcgYmFzZWxheWVycyB0byB0aGUgbWFwXG4gICAgdmFyIHNlbGVjdCA9IFtdO1xuICAgIGJhc2VsYXllcnMucmV2ZXJzZSgpO1xuICAgIGZvciAodmFyIGk9MCxsZW49YmFzZWxheWVycy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgIHZhciBiYXNlbGF5ZXIgPSBiYXNlbGF5ZXJzW2ldXG4gICAgICBiYXNlbGF5ZXIudW5pdHMgPSBwcm9qZWN0aW9uLnByb2oudW5pdHM7XG4gICAgICB0cnl7IC8vIGJlY2F1c2UgZ29vZ2xlIG1hcHMgbGF5ZXIgY2FuIGJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZFxuICAgICAgICAgIG1hcC5hZGRMYXllcihiYXNlbGF5ZXIpO1xuICAgICAgICAgIHZhciBxZ2lzTmFtZSA9IGJhc2VsYXllci5uYW1lO1xuICAgICAgICAgIGlmICggYmFzZWxheWVyLm5hbWUgaW4gY2xlYW5OYW1lTWFwIClcbiAgICAgICAgICAgICAgcWdpc05hbWUgPSBnZXRMYXllck5hbWVCeUNsZWFuTmFtZShiYXNlbGF5ZXIubmFtZSk7XG4gICAgICAgICAgdmFyIGJsQ29uZmlnID0gY29uZmlnLmxheWVyc1txZ2lzTmFtZV07XG4gICAgICAgICAgaWYgKGJsQ29uZmlnKVxuICAgICAgICAgICAgc2VsZWN0ICs9ICc8b3B0aW9uIHZhbHVlPVwiJytibENvbmZpZy5uYW1lKydcIj4nK2JsQ29uZmlnLnRpdGxlKyc8L29wdGlvbj4nO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgIHNlbGVjdCArPSAnPG9wdGlvbiB2YWx1ZT1cIicrYmFzZWxheWVyLm5hbWUrJ1wiPicrYmFzZWxheWVyLm5hbWUrJzwvb3B0aW9uPic7XG5cbiAgICAgIH0gY2F0Y2goZSkge1xuICAgICAgICAgIHZhciBxZ2lzTmFtZSA9IGJhc2VsYXllci5uYW1lO1xuICAgICAgICAgIGlmICggYmFzZWxheWVyLm5hbWUgaW4gY2xlYW5OYW1lTWFwIClcbiAgICAgICAgICAgICAgcWdpc05hbWUgPSBnZXRMYXllck5hbWVCeUNsZWFuTmFtZShiYXNlbGF5ZXIubmFtZSk7XG4gICAgICAgICAgY29uc29sZS5sb2cocWdpc05hbWUrXCIgY2FuJ3QgYmUgYWRkZWQgdG8gdGhlIG1hcCFcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGJhc2VsYXllcnMubGVuZ3RoIT0wKSB7XG4gICAgICAvLyBhY3RpdmUgdGhlIHNlbGVjdCBlbGVtZW50IGZvciBiYXNlbGF5ZXJzXG4gICAgICAkKCcjc3dpdGNoZXItYmFzZWxheWVyLXNlbGVjdCcpLmFwcGVuZChzZWxlY3QpO1xuICAgICAgJCgnI3N3aXRjaGVyLWJhc2VsYXllci1zZWxlY3QnKVxuICAgICAgICAuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciB2YWwgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgIHZhciBibE5hbWUgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKHZhbClbMF07XG4gICAgICAgICAgbWFwLnNldEJhc2VMYXllciggYmxOYW1lICk7XG5cbiAgICAgICAgICAvLyBUcmlnZ2VyIGV2ZW50XG4gICAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoXCJsaXptYXBiYXNlbGF5ZXJjaGFuZ2VkXCIsXG4gICAgICAgICAgICB7ICdsYXllcic6IGJsTmFtZX1cbiAgICAgICAgICApO1xuXG4gICAgICAgICAgJCh0aGlzKS5ibHVyKCk7XG4gICAgICAgIH0pO1xuICAgICAgLy8gSGlkZSBzd2l0Y2hlci1iYXNlbGF5ZXIgaWYgb25seSBvbmUgYmFzZSBsYXllciBpbnNpZGVcbiAgICAgIGlmIChiYXNlbGF5ZXJzLmxlbmd0aD09MSlcbiAgICAgICAgJCgnI3N3aXRjaGVyLWJhc2VsYXllcicpLmhpZGUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gaGlkZSBlbGVtZW50cyBmb3IgYmFzZWxheWVyc1xuICAgICAgJCgnI3N3aXRjaGVyLWJhc2VsYXllcicpLmhpZGUoKTtcbiAgICAgIG1hcC5hZGRMYXllcihuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoJ2Jhc2VsYXllcicse1xuICAgICAgICBtYXhFeHRlbnQ6bWFwLm1heEV4dGVudFxuICAgICAgICxtYXhTY2FsZTogbWFwLm1heFNjYWxlXG4gICAgICAgLG1pblNjYWxlOiBtYXAubWluU2NhbGVcbiAgICAgICAsbnVtWm9vbUxldmVsczogbWFwLm51bVpvb21MZXZlbHNcbiAgICAgICAsc2NhbGVzOiBtYXAuc2NhbGVzXG4gICAgICAgLHByb2plY3Rpb246IG1hcC5wcm9qZWN0aW9uXG4gICAgICAgLHVuaXRzOiBtYXAucHJvamVjdGlvbi5wcm9qLnVuaXRzXG4gICAgICB9KSk7XG4gICAgfVxuXG4gICAgLy8gYWRkaW5nIGxheWVycyB0byB0aGUgbWFwXG4gICAgbGF5ZXJzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgaWYgKGEub3JkZXIgPT0gYi5vcmRlcilcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgICByZXR1cm4gYS5vcmRlciA+IGIub3JkZXIgPyAxIDogLTE7XG4gICAgfSk7XG4gICAgbGF5ZXJzLnJldmVyc2UoKTtcbiAgICBmb3IgKHZhciBpPTAsbGVuPWxheWVycy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgIHZhciBsID0gbGF5ZXJzW2ldO1xuICAgICAgbC51bml0cyA9IHByb2plY3Rpb24ucHJvai51bml0cztcblxuICAgICAgLy8gQWRkIG9ubHkgbGF5ZXJzIHdpdGggZ2VvbWV0cnlcbiAgICAgIHZhciBxZ2lzTmFtZSA9IG51bGw7XG4gICAgICBpZiAoIGwubmFtZSBpbiBjbGVhbk5hbWVNYXAgKVxuICAgICAgICAgIHFnaXNOYW1lID0gZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUobC5uYW1lKTtcbiAgICAgIHZhciBhQ29uZmlnID0gbnVsbDtcbiAgICAgIGlmICggcWdpc05hbWUgKVxuICAgICAgICAgIGFDb25maWcgPSBjb25maWcubGF5ZXJzW3FnaXNOYW1lXTtcbiAgICAgIGlmICggIWFDb25maWcgKVxuICAgICAgICAgIGFDb25maWcgPSBjb25maWcubGF5ZXJzW2wucGFyYW1zWydMQVlFUlMnXV07XG4gICAgICBpZiAoICFhQ29uZmlnIClcbiAgICAgICAgICBhQ29uZmlnID0gY29uZmlnLmxheWVyc1tsLm5hbWVdO1xuICAgICAgaWYgKCAhYUNvbmZpZyApXG4gICAgICAgICAgY29udGludWU7XG4gICAgICBpZiggJ2dlb21ldHJ5VHlwZScgaW4gYUNvbmZpZyAmJlxuICAgICAgICAoIGFDb25maWcuZ2VvbWV0cnlUeXBlID09IFwibm9uZVwiIHx8IGFDb25maWcuZ2VvbWV0cnlUeXBlID09IFwidW5rbm93blwiIHx8IGFDb25maWcuZ2VvbWV0cnlUeXBlID09IFwiXCIgKVxuICAgICAgKXtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBtYXAuYWRkTGF5ZXIobCk7XG4gICAgfVxuXG4gICAgLy8gQWRkIExvY2F0ZSBieSBsYXllclxuICAgIGlmICgnbG9jYXRlQnlMYXllcicgaW4gY29uZmlnKSB7XG4gICAgICB2YXIgbG9jYXRlQ29udGVudCA9IFtdO1xuICAgICAgZm9yICh2YXIgbG5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpIHtcbiAgICAgICAgdmFyIGxDb25maWcgPSBjb25maWcubGF5ZXJzW2xuYW1lXTtcbiAgICAgICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cImxvY2F0ZS1sYXllclwiPic7XG4gICAgICAgIGh0bWwgKz0gJzxzZWxlY3QgaWQ9XCJsb2NhdGUtbGF5ZXItJytjbGVhbk5hbWUobG5hbWUpKydcIiBjbGFzcz1cImxhYmVsXCI+JztcbiAgICAgICAgaHRtbCArPSAnPG9wdGlvbj4nK2xDb25maWcudGl0bGUrJy4uLjwvb3B0aW9uPic7XG4gICAgICAgIGh0bWwgKz0gJzwvc2VsZWN0Pic7XG4gICAgICAgIGh0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgIC8vY29uc3RydWN0aW5nIHRoZSBzZWxlY3RcbiAgICAgICAgbG9jYXRlQ29udGVudC5wdXNoKGh0bWwpO1xuICAgICAgfVxuICAgICAgJCgnI2xvY2F0ZSAubWVudS1jb250ZW50JykuaHRtbChsb2NhdGVDb250ZW50LmpvaW4oJzxici8+JykpO1xuICAgICAgbWFwLmFkZExheWVyKG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcignbG9jYXRlbGF5ZXInLHtcbiAgICAgICAgc3R5bGVNYXA6IG5ldyBPcGVuTGF5ZXJzLlN0eWxlTWFwKHtcbiAgICAgICAgICBwb2ludFJhZGl1czogNixcbiAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICBzdHJva2U6IHRydWUsXG4gICAgICAgICAgc3Ryb2tlV2lkdGg6IDMsXG4gICAgICAgICAgc3Ryb2tlQ29sb3I6ICd5ZWxsb3cnLFxuICAgICAgICAgIHN0cm9rZU9wYWNpdHk6IDAuOFxuICAgICAgICB9KVxuICAgICAgfSkpO1xuXG4gICAgICAgIC8vIExpem1hcCBVUkxcbiAgICAgICAgdmFyIHNlcnZpY2UgPSBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKGxpelVybHMud21zXG4gICAgICAgICAgICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGZlYXR1cmVUeXBlcyA9IGdldFZlY3RvckxheWVyRmVhdHVyZVR5cGVzKCk7XG4gICAgICAgIGlmIChmZWF0dXJlVHlwZXMubGVuZ3RoID09IDAgKXtcbiAgICAgICAgICBjb25maWcubG9jYXRlQnlMYXllciA9IHt9O1xuICAgICAgICAgICQoJyNidXR0b24tbG9jYXRlJykucGFyZW50KCkucmVtb3ZlKCk7XG4gICAgICAgICAgJCgnI2xvY2F0ZS1tZW51JykucmVtb3ZlKCk7XG4gICAgICAgICAgdXBkYXRlU3dpdGNoZXJTaXplKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmVhdHVyZVR5cGVzLmVhY2goIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICB2YXIgdHlwZU5hbWUgPSBzZWxmLmZpbmQoJ05hbWUnKS50ZXh0KCk7XG4gICAgICAgICAgICB2YXIgbG5hbWUgPSBsaXpNYXAuZ2V0TmFtZUJ5VHlwZU5hbWUoIHR5cGVOYW1lICk7XG4gICAgICAgICAgICBpZiAoICFsbmFtZSApIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZU5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpXG4gICAgICAgICAgICAgICAgICAgIGxuYW1lID0gdHlwZU5hbWVcbiAgICAgICAgICAgICAgICBlbHNlIGlmICggKHR5cGVOYW1lIGluIHNob3J0TmFtZU1hcCkgJiYgKHNob3J0TmFtZU1hcFt0eXBlTmFtZV0gaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpKVxuICAgICAgICAgICAgICAgICAgICBsbmFtZSA9IHNob3J0TmFtZU1hcFt0eXBlTmFtZV07XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGJsIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGJsLnNwbGl0KCcgJykuam9pbignXycpID09IHR5cGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG5hbWUgPSBsYmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggIShsbmFtZSBpbiBjb25maWcubG9jYXRlQnlMYXllcikgKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGxvY2F0ZSA9IGNvbmZpZy5sb2NhdGVCeUxheWVyW2xuYW1lXTtcbiAgICAgICAgICAgIGxvY2F0ZVsnY3JzJ10gPSBzZWxmLmZpbmQoJ1NSUycpLnRleHQoKTtcbiAgICAgICAgICAgIGxvYWRQcm9qRGVmaW5pdGlvbiggbG9jYXRlLmNycywgZnVuY3Rpb24oIGFQcm9qICkge1xuICAgICAgICAgICAgICAgICAgbmV3IE9wZW5MYXllcnMuUHJvamVjdGlvbihsb2NhdGUuY3JzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdmFyIGJib3ggPSBzZWxmLmZpbmQoJ0xhdExvbmdCb3VuZGluZ0JveCcpO1xuICAgICAgICAgICAgbG9jYXRlWydiYm94J10gPSBbXG4gICAgICAgICAgICAgICAgcGFyc2VGbG9hdChiYm94LmF0dHIoJ21pbngnKSlcbiAgICAgICAgICAgICAgICxwYXJzZUZsb2F0KGJib3guYXR0cignbWlueScpKVxuICAgICAgICAgICAgICAgLHBhcnNlRmxvYXQoYmJveC5hdHRyKCdtYXh4JykpXG4gICAgICAgICAgICAgICAscGFyc2VGbG9hdChiYm94LmF0dHIoJ21heHknKSlcbiAgICAgICAgICAgIF07XG4gICAgICAgICAgfSApO1xuXG4gICAgICAgICAgLy8gZ2V0IGpvaW5zXG4gICAgICAgICAgZm9yICh2YXIgbE5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpIHtcbiAgICAgICAgICAgIHZhciBsb2NhdGUgPSBjb25maWcubG9jYXRlQnlMYXllcltsTmFtZV07XG4gICAgICAgICAgICBpZiAoJ3ZlY3RvcmpvaW5zJyBpbiBsb2NhdGUpIHtcbiAgICAgICAgICAgICAgdmFyIHZlY3RvcmpvaW5zID0gbG9jYXRlWyd2ZWN0b3Jqb2lucyddO1xuICAgICAgICAgICAgICBsb2NhdGVbJ2pvaW5GaWVsZE5hbWUnXSA9IHZlY3RvcmpvaW5zWyd0YXJnZXRGaWVsZE5hbWUnXTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgak5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgakxvY2F0ZSA9IGNvbmZpZy5sb2NhdGVCeUxheWVyW2pOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAoakxvY2F0ZS5sYXllcklkID09IHZlY3RvcmpvaW5zLmpvaW5MYXllcklkKSB7XG4gICAgICAgICAgICAgICAgICBsb2NhdGVbJ2pvaW5MYXllciddID0gak5hbWU7XG4gICAgICAgICAgICAgICAgICBqTG9jYXRlWydqb2luRmllbGROYW1lJ10gPSB2ZWN0b3Jqb2luc1snam9pbkZpZWxkTmFtZSddO1xuICAgICAgICAgICAgICAgICAgakxvY2F0ZVsnam9pbkxheWVyJ10gPSBsTmFtZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBnZXQgZmVhdHVyZXNcbiAgICAgICAgICBmb3IgKHZhciBsbmFtZSBpbiBjb25maWcubG9jYXRlQnlMYXllcikge1xuICAgICAgICAgICAgZ2V0TG9jYXRlRmVhdHVyZShsbmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5idG4tbG9jYXRlLWNsZWFyJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKCdsb2NhdGVsYXllcicpWzBdO1xuICAgICAgICAgICAgbGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgICAgICAkKCcjbG9jYXRlIHNlbGVjdCcpLnZhbCgnLTEnKTtcbiAgICAgICAgICAgICQoJ2Rpdi5sb2NhdGUtbGF5ZXIgc3BhbiA+IGlucHV0JykudmFsKCcnKTtcblxuICAgICAgICAgICAgaWYoIGxpek1hcC5saXptYXBMYXllckZpbHRlckFjdGl2ZSApe1xuICAgICAgICAgICAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KCdsaXptYXBsb2NhdGVmZWF0dXJlY2FuY2VsZWQnLFxuICAgICAgICAgICAgICAgICAgeydmZWF0dXJlVHlwZSc6IGxpek1hcC5saXptYXBMYXllckZpbHRlckFjdGl2ZX1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkKCcjbG9jYXRlLWNsb3NlJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCcuYnRuLWxvY2F0ZS1jbGVhcicpLmNsaWNrKCk7IC8vIGRlYWN0aXZhdGUgbG9jYXRlIGZlYXR1cmUgYW5kIGZpbHRlclxuICAgICAgICAgICAgJCgnI2J1dHRvbi1sb2NhdGUnKS5jbGljaygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJCgnI3N3aXRjaGVyIHNwYW4ubGFiZWwnKS50b29sdGlwKHtcbiAgICAgIHZpZXdwb3J0OiAnI2RvY2snXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBjcmVhdGVTd2l0Y2hlcigpIHtcbiAgICAvLyBzZXQgdGhlIHN3aXRjaGVyIGNvbnRlbnRcbiAgICAkKCcjc3dpdGNoZXItbGF5ZXJzJykuaHRtbChnZXRTd2l0Y2hlck5vZGUodHJlZSwwKSk7XG4gICAgJCgnI3N3aXRjaGVyIHRhYmxlLnRyZWUnKS50cmVlVGFibGUoe1xuICAgICAgc3RyaW5nRXhwYW5kOiBsaXpEaWN0Wyd0cmVlLmJ1dHRvbi5leHBhbmQnXSxcbiAgICAgIHN0cmluZ0NvbGxhcHNlOiBsaXpEaWN0Wyd0cmVlLmJ1dHRvbi5jb2xsYXBzZSddLFxuICAgICAgb25Ob2RlU2hvdzogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZi5hZGRDbGFzcygndmlzaWJsZScpO1xuICAgICAgICBpZiAoc2VsZi5maW5kKCdkaXYubGVnZW5kR3JhcGhpY3MnKS5sZW5ndGggIT0gMCkge1xuICAgICAgICAgIHZhciBuYW1lID0gc2VsZi5hdHRyKCdpZCcpLnJlcGxhY2UoJ2xlZ2VuZC0nLCcnKTtcbiAgICAgICAgICB2YXIgdXJsID0gZ2V0TGF5ZXJMZWdlbmRHcmFwaGljVXJsKG5hbWUsIHRydWUpO1xuICAgICAgICAgIGlmICggdXJsICE9IG51bGwgJiYgdXJsICE9ICcnICkge1xuICAgICAgICAgICAgICB2YXIgbGltZyA9IHNlbGYuZmluZCgnZGl2LmxlZ2VuZEdyYXBoaWNzIGltZycpO1xuICAgICAgICAgICAgICBsaW1nLmF0dHIoJ2RhdGEtc3JjJywgdXJsICk7XG4gICAgICAgICAgICAgIGxpbWcuYXR0cignc3JjJywgbGltZy5hdHRyKCdkYXRhLXNyYycpICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgb25Ob2RlSGlkZTogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICQoXCIjc3dpdGNoZXIgdGFibGUudHJlZSB0Ym9keVwiKS5vbihcIm1vdXNlZG93blwiLCBcInRyIHRkIHNwYW5cIiwgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgIC8vIE9ubHkgYWN0IG9uIGxlZnQgYnV0dG9uIGNsaWNrXG4gICAgICBpZihldmVudC53aGljaCA9PT0gMSl7XG4gICAgICAgIHZhciB3YXNTZWxlY3RlZCA9ICQodGhpcykucGFyZW50cygndHI6Zmlyc3QnKS5oYXNDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgdmFyIGlzU2VsZWN0ZWQgPSAhd2FzU2VsZWN0ZWQ7XG4gICAgICAgICQoXCIjc3dpdGNoZXIgdGFibGUudHJlZSB0Ym9keSB0clwiKS5yZW1vdmVDbGFzcygnc2VsZWN0ZWQnKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnRzKCd0cjpmaXJzdCcpLnRvZ2dsZUNsYXNzKFwic2VsZWN0ZWRcIiwgaXNTZWxlY3RlZCk7XG4gICAgICAgICQoJyNzd2l0Y2hlci1sYXllcnMtYWN0aW9ucycpLnRvZ2dsZUNsYXNzKCdhY3RpdmUnLCBpc1NlbGVjdGVkKTtcblxuICAgICAgICAvLyBUcmlnZ2VyIGV2ZW50XG4gICAgICAgIHZhciBpZCA9ICQodGhpcykucGFyZW50cygndHI6Zmlyc3QnKS5hdHRyKCdpZCcpO1xuICAgICAgICB2YXIgaXRlbVR5cGUgPSBpZC5zcGxpdCgnLScpWzBdO1xuICAgICAgICB2YXIgaXRlbU5hbWUgPSBpZC5zcGxpdCgnLScpWzFdO1xuICAgICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudChcImxpem1hcHN3aXRjaGVyaXRlbXNlbGVjdGVkXCIsXG4gICAgICAgICAgeyAnbmFtZSc6IGl0ZW1OYW1lLCAndHlwZSc6IGl0ZW1UeXBlLCAnc2VsZWN0ZWQnOiBpc1NlbGVjdGVkfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgbGl6TWFwLmV2ZW50cy5vbih7XG4gICAgICAgIGRvY2tvcGVuZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIC8vIFNldCB0aGUgdGFiLWNvbnRlbnQgbWF4LWhlaWdodFxuICAgICAgICAgICAgaWYgKCAkKCcjZG9jay10YWJzJykuaXMoJzp2aXNpYmxlJykgKVxuICAgICAgICAgICAgICAgICQoJyNkb2NrLWNvbnRlbnQnKS5jc3MoICdtYXgtaGVpZ2h0JywgJCgnI2RvY2snKS5oZWlnaHQoKSAtICQoJyNkb2NrLXRhYnMnKS5oZWlnaHQoKSApO1xuICAgICAgICAgICAgaWYgKCBlLmlkID09ICdzd2l0Y2hlcicgKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlU3dpdGNoZXJTaXplKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuXG4gIC8vID09PSBQcml2YXRlIGZ1bmN0aW9uc1xuICB2YXIgb3B0aW9ucyA9IHtcbiAgICBjaGlsZFByZWZpeCA6IFwiY2hpbGQtb2YtXCJcbiAgfTtcblxuICBmdW5jdGlvbiBjaGlsZHJlbk9mKG5vZGUpIHtcbiAgICByZXR1cm4gJChub2RlKS5zaWJsaW5ncyhcInRyLlwiICsgb3B0aW9ucy5jaGlsZFByZWZpeCArIG5vZGVbMF0uaWQpO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGRlc2NlbmRhbnRzT2Yobm9kZSkge1xuICAgIHZhciBkZXNjZW5kYW50cyA9IFtdO1xuICAgIHZhciBjaGlsZHJlbiA9IFtdO1xuICAgIGlmIChub2RlICYmIG5vZGVbMF0pXG4gICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuT2Yobm9kZSk7XG4gICAgZm9yICh2YXIgaT0wLCBsZW49Y2hpbGRyZW4ubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICBkZXNjZW5kYW50cy5wdXNoKGNoaWxkcmVuW2ldKTtcbiAgICAgIGRlc2NlbmRhbnRzID0gZGVzY2VuZGFudHMuY29uY2F0KGRlc2NlbmRhbnRzT2YoW2NoaWxkcmVuW2ldXSkpO1xuICAgIH1cbiAgICByZXR1cm4gZGVzY2VuZGFudHM7XG4gIH07XG5cbiAgZnVuY3Rpb24gcGFyZW50T2Yobm9kZSkge1xuICAgIGlmIChub2RlLmxlbmd0aCA9PSAwIClcbiAgICAgIHJldHVybiBudWxsO1xuXG4gICAgdmFyIGNsYXNzTmFtZXMgPSBub2RlWzBdLmNsYXNzTmFtZS5zcGxpdCgnICcpO1xuXG4gICAgZm9yKHZhciBrZXk9MDsga2V5PGNsYXNzTmFtZXMubGVuZ3RoOyBrZXkrKykge1xuICAgICAgaWYoY2xhc3NOYW1lc1trZXldLm1hdGNoKG9wdGlvbnMuY2hpbGRQcmVmaXgpKSB7XG4gICAgICAgIHJldHVybiAkKG5vZGUpLnNpYmxpbmdzKFwiI1wiICsgY2xhc3NOYW1lc1trZXldLnN1YnN0cmluZyhvcHRpb25zLmNoaWxkUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9O1xuXG4gIGZ1bmN0aW9uIGFuY2VzdG9yc09mKG5vZGUpIHtcbiAgICB2YXIgYW5jZXN0b3JzID0gW107XG4gICAgd2hpbGUobm9kZSA9IHBhcmVudE9mKG5vZGUpKSB7XG4gICAgICBhbmNlc3RvcnNbYW5jZXN0b3JzLmxlbmd0aF0gPSBub2RlWzBdO1xuICAgIH1cbiAgICByZXR1cm4gYW5jZXN0b3JzO1xuICB9O1xuXG4gICAgLy8gYWN0aXZhdGUgY2hlY2tib3ggYnV0dG9uc1xuICAgICQoJyNzd2l0Y2hlciBidXR0b24uY2hlY2tib3gnKVxuICAgIC5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgaWYgKHNlbGYuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIC8vIGdldCB0ciBvZiB0aGUgYnV0dG9uXG4gICAgICB2YXIgc2VsZlRyID0gc2VsZi5wYXJlbnRzKCd0cicpLmZpcnN0KCk7XG4gICAgICAvLyBnZXQgdGhlIHBhcmVudCBvZiB0aGUgdHIgb2YgdGhlIGJ1dHRvblxuICAgICAgdmFyIHBhcmVudFRyID0gcGFyZW50T2YoIHNlbGZUciApO1xuICAgICAgLy8gZ2V0IHRoZSBzaWJsaW5ncyBvZiB0aGUgdHIgb2YgdGhlIGJ1dHRvblxuICAgICAgdmFyIHNpYmxpbmdzVHIgPSBbXTtcbiAgICAgIGlmICggcGFyZW50VHIgJiYgcGFyZW50VHIubGVuZ3RoICE9IDApIHtcbiAgICAgICAgZm9yICh2YXIgYz0wLCBjaGlsZHJlblBhcmVudFRyPWNoaWxkcmVuT2YocGFyZW50VHIpOyBjPGNoaWxkcmVuUGFyZW50VHIubGVuZ3RoOyBjKyspe1xuICAgICAgICAgICAgdmFyIHNpYmxpbmdUciA9ICQoY2hpbGRyZW5QYXJlbnRUcltjXSk7XG4gICAgICAgICAgICBpZiggc2libGluZ1RyLmF0dHIoJ2lkJykgIT0gc2VsZlRyLmF0dHIoJ2lkJykgKVxuICAgICAgICAgICAgICBzaWJsaW5nc1RyLnB1c2goIHNpYmxpbmdUciApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgYW5jZXN0b3JzID0gW107XG4gICAgICBpZiggc2VsZlRyLmhhc0NsYXNzKCdsaXotbGF5ZXInKSApIHtcbiAgICAgICAgICAvLyBtYW5hZ2UgdGhlIGJ1dHRvbiBsYXllclxuICAgICAgICAgIGlmKCAhc2VsZi5oYXNDbGFzcygnY2hlY2tlZCcpICkge1xuICAgICAgICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdwYXJ0aWFsJykuYWRkQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgc2VsZlRyLmZpbmQoJ2J1dHRvbi5jaGVja2JveFtuYW1lPVwibGF5ZXJcIl0nKS5lYWNoKGZ1bmN0aW9uKGksYil7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSAkKGIpLnZhbCgpO1xuICAgICAgICAgICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUobmFtZSlbMF07XG4gICAgICAgICAgICAgICAgaWYoIHR5cGVvZiBsYXllciAhPT0gJ3VuZGVmaW5lZCcgKVxuICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0VmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygncGFydGlhbCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAgICAgICAgIHNlbGZUci5maW5kKCdidXR0b24uY2hlY2tib3hbbmFtZT1cImxheWVyXCJdJykuZWFjaChmdW5jdGlvbihpLGIpe1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJChiKS52YWwoKTtcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKG5hbWUpWzBdO1xuICAgICAgICAgICAgICAgIGlmKCB0eXBlb2YgbGF5ZXIgIT09ICd1bmRlZmluZWQnIClcbiAgICAgICAgICAgICAgICAgIGxheWVyLnNldFZpc2liaWxpdHkoZmFsc2UpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYoIHNlbGZUci5oYXNDbGFzcygnbXV0dWFsbHktZXhjbHVzaXZlJykgKXtcbiAgICAgICAgICAgICAgaWYoIHNlbGYuaGFzQ2xhc3MoJ2NoZWNrZWQnKSApIHtcbiAgICAgICAgICAgICAgICAgIGZvcih2YXIgcz0wLCBzbGVuPXNpYmxpbmdzVHIubGVuZ3RoOyBzPHNsZW47IHMrKykge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBzaWJsaW5nVHIgPSAkKHNpYmxpbmdzVHJbc10pO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBzaWJsaW5nQnV0dCA9IHNpYmxpbmdUci5maW5kKCdidXR0b24uY2hlY2tib3gnKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiggc2libGluZ0J1dHQuaGFzQ2xhc3MoJ2NoZWNrZWQnKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2libGluZ0J1dHQucmVtb3ZlQ2xhc3MoJ3BhcnRpYWwnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIHNpYmxpbmdCdXR0LmF0dHIoJ25hbWUnKSA9PSAnbGF5ZXInKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSAkKHNpYmxpbmdCdXR0KS52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKG5hbWUpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCB0eXBlb2YgbGF5ZXIgIT09ICd1bmRlZmluZWQnIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLnNldFZpc2liaWxpdHkoZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmICggcGFyZW50VHIgJiYgcGFyZW50VHIubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcGFyZW50QnV0dCA9IHBhcmVudFRyLmZpbmQoJ2J1dHRvbi5jaGVja2JveCcpO1xuICAgICAgICAgICAgICAgICAgICAgIHBhcmVudEJ1dHQucmVtb3ZlQ2xhc3MoJ3BhcnRpYWwnKS5hZGRDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBwYXJlbnRUciAmJiBwYXJlbnRUci5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudEJ1dHQgPSBwYXJlbnRUci5maW5kKCdidXR0b24uY2hlY2tib3gnKTtcbiAgICAgICAgICAgICAgICAgIHBhcmVudEJ1dHQucmVtb3ZlQ2xhc3MoJ3BhcnRpYWwnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGFuY2VzdG9ycyA9IGFuY2VzdG9yc09mKHBhcmVudFRyKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYW5jZXN0b3JzID0gYW5jZXN0b3JzT2Yoc2VsZlRyKTtcbiAgICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIG1hbmFnZSB0aGUgYnV0dG9uIGdyb3VwXG4gICAgICAgICAgdmFyIGRlc2NlbmRhbnRzID0gZGVzY2VuZGFudHNPZihzZWxmVHIpO1xuICAgICAgICAgIHZhciBtdXR1YWxseUV4Y2x1c2l2ZUdyb3VwcyA9IFtdO1xuICAgICAgICAgICQuZWFjaChkZXNjZW5kYW50cyxmdW5jdGlvbihpLHRyKSB7XG4gICAgICAgICAgICB0ciA9ICQodHIpO1xuICAgICAgICAgICAgdmFyIGJ1dHQgPSB0ci5maW5kKCdidXR0b24uY2hlY2tib3gnKTtcbiAgICAgICAgICAgIGlmKCAhc2VsZi5oYXNDbGFzcygnY2hlY2tlZCcpICkge1xuICAgICAgICAgICAgICAgIGJ1dHQucmVtb3ZlQ2xhc3MoJ3BhcnRpYWwnKS5hZGRDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgIGlmKCB0ci5oYXNDbGFzcygnbGl6LWxheWVyJykgJiYgYnV0dC5hdHRyKCduYW1lJykgPT0gJ2xheWVyJykge1xuICAgICAgICAgICAgICAgICAgICBpZiggdHIuaGFzQ2xhc3MoJ211dHVhbGx5LWV4Y2x1c2l2ZScpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcFRyID0gcGFyZW50T2YodHIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBJZCA9IHBUci5hdHRyKCdpZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoIG11dHVhbGx5RXhjbHVzaXZlR3JvdXBzLmluZGV4T2YocElkKSAhPSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBidXR0LnJlbW92ZUNsYXNzKCdwYXJ0aWFsJykucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBtdXR1YWxseUV4Y2x1c2l2ZUdyb3Vwcy5wdXNoKHBJZCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSAkKGJ1dHQpLnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKG5hbWUpWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiggdHlwZW9mIGxheWVyICE9PSAndW5kZWZpbmVkJyApXG4gICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0VmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGJ1dHQucmVtb3ZlQ2xhc3MoJ3BhcnRpYWwnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgICAgICAgICAgIGlmKCB0ci5oYXNDbGFzcygnbGl6LWxheWVyJykgJiYgYnV0dC5hdHRyKCduYW1lJykgPT0gJ2xheWVyJykge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbmFtZSA9ICQoYnV0dCkudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUobmFtZSlbMF07XG4gICAgICAgICAgICAgICAgICAgIGlmKCB0eXBlb2YgbGF5ZXIgIT09ICd1bmRlZmluZWQnIClcbiAgICAgICAgICAgICAgICAgICAgICBsYXllci5zZXRWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgaWYoICFzZWxmLmhhc0NsYXNzKCdjaGVja2VkJykgKVxuICAgICAgICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdwYXJ0aWFsJykuYWRkQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ3BhcnRpYWwnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgICAgIGFuY2VzdG9ycyA9IGFuY2VzdG9yc09mKHNlbGZUcik7XG4gICAgICB9XG4gICAgICAvLyBtYW5hZ2UgYW5jZXN0b3JzXG4gICAgICAkLmVhY2goYW5jZXN0b3JzLGZ1bmN0aW9uKGksdHIpIHtcbiAgICAgICAgdHIgPSAkKHRyKTtcbiAgICAgICAgdmFyIGNvdW50ID0gMDtcbiAgICAgICAgdmFyIGNoZWNrZWQgPSAwO1xuICAgICAgICB2YXIgcGNoZWNrZWQgPSAwO1xuICAgICAgICB2YXIgdHJEZXNjID0gY2hpbGRyZW5PZih0cik7XG4gICAgICAgICQuZWFjaCh0ckRlc2MsZnVuY3Rpb24oaix0cmQpIHtcbiAgICAgICAgICAkKHRyZCkuZmluZCgnYnV0dG9uLmNoZWNrYm94JykuZWFjaChmdW5jdGlvbihpLGIpe1xuICAgICAgICAgICAgYiA9ICQoYik7XG4gICAgICAgICAgICBpZiAoIGIuaGFzQ2xhc3MoJ2NoZWNrZWQnKSApXG4gICAgICAgICAgICAgIGNoZWNrZWQrKztcbiAgICAgICAgICAgIGVsc2UgaWYgKCBiLmhhc0NsYXNzKCdwYXJ0aWFsJykmJiBiLmhhc0NsYXNzKCdjaGVja2VkJykgKVxuICAgICAgICAgICAgICBwY2hlY2tlZCsrO1xuICAgICAgICAgICAgY291bnQrKztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciB0ckJ1dHQgPSB0ci5maW5kKCdidXR0b24uY2hlY2tib3gnKTtcbiAgICAgICAgaWYgKGNvdW50PT1jaGVja2VkKVxuICAgICAgICAgIHRyQnV0dC5yZW1vdmVDbGFzcygncGFydGlhbCcpLmFkZENsYXNzKCdjaGVja2VkJyk7XG4gICAgICAgIGVsc2UgaWYgKGNoZWNrZWQ9PTAgJiYgcGNoZWNrZWQ9PTApXG4gICAgICAgICAgdHJCdXR0LnJlbW92ZUNsYXNzKCdwYXJ0aWFsJykucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIHRyQnV0dC5hZGRDbGFzcygncGFydGlhbCcpLmFkZENsYXNzKCdjaGVja2VkJyk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8vIGFjdGl2YXRlIGxpbmsgYnV0dG9uc1xuICAgICQoJyNzd2l0Y2hlciBidXR0b24ubGluaycpXG4gICAgLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICBpZiAoc2VsZi5oYXNDbGFzcygnZGlzYWJsZWQnKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgdmFyIHdpbmRvd0xpbmsgPSBzZWxmLnZhbCgpO1xuICAgICAgLy8gVGVzdCBpZiB0aGUgbGluayBpcyBpbnRlcm5hbFxuICAgICAgdmFyIG1lZGlhUmVnZXggPSAvXihcXC8pP21lZGlhXFwvLztcbiAgICAgIGlmKG1lZGlhUmVnZXgudGVzdCh3aW5kb3dMaW5rKSl7XG4gICAgICAgIHZhciBtZWRpYUxpbmsgPSBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKGxpelVybHMubWVkaWFcbiAgICAgICAgICAsT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICAgICAgKVxuICAgICAgICB3aW5kb3dMaW5rID0gbWVkaWFMaW5rKycmcGF0aD0vJyt3aW5kb3dMaW5rO1xuICAgICAgfVxuICAgICAgLy8gT3BlbiBsaW5rIGluIGEgbmV3IHdpbmRvd1xuICAgICAgd2luZG93Lm9wZW4od2luZG93TGluayk7XG4gICAgfSk7XG5cbiAgICAvLyBBY3RpdmF0ZSByZW1vdmVDYWNoZSBidXR0b25cbiAgICAkKCcjc3dpdGNoZXIgYnV0dG9uLnJlbW92ZUNhY2hlJylcbiAgICAuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgIGlmIChzZWxmLmhhc0NsYXNzKCdkaXNhYmxlZCcpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB2YXIgcmVtb3ZlQ2FjaGVTZXJ2ZXJVcmwgPSBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKFxuICAgICAgICAgbGl6VXJscy5yZW1vdmVDYWNoZVxuICAgICAgICAsT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICAgICk7XG4gICAgICB2YXIgd2luZG93TGluayA9IHJlbW92ZUNhY2hlU2VydmVyVXJsICsgJyZsYXllcj0nICsgc2VsZi52YWwoKTtcbiAgICAgIC8vIE9wZW4gbGluayBpbiBhIG5ldyB3aW5kb3dcbiAgICAgIGlmIChjb25maXJtKGxpekRpY3RbJ3RyZWUuYnV0dG9uLnJlbW92ZUNhY2hlJ10gKyAnID8nKSlcbiAgICAgICAgd2luZG93Lm9wZW4od2luZG93TGluayk7XG4gICAgfSk7XG5cbiAgICB2YXIgcHJvamVjdGlvbiA9IG1hcC5wcm9qZWN0aW9uO1xuXG4gICAgLy9tYW5hZ2UgV01TIG1heCB3aWR0aCBhbmQgaGVpZ2h0XG4gICAgdmFyIHdtc01heFdpZHRoID0gMzAwMDtcbiAgICB2YXIgd21zTWF4SGVpZ2h0ID0gMzAwMDtcbiAgICBpZiggKCd3bXNNYXhXaWR0aCcgaW4gY29uZmlnLm9wdGlvbnMpICYmIGNvbmZpZy5vcHRpb25zLndtc01heFdpZHRoIClcbiAgICAgICAgd21zTWF4V2lkdGggPSBOdW1iZXIoY29uZmlnLm9wdGlvbnMud21zTWF4V2lkdGgpO1xuICAgIGlmKCAoJ3dtc01heEhlaWdodCcgaW4gY29uZmlnLm9wdGlvbnMpICYmIGNvbmZpZy5vcHRpb25zLndtc01heEhlaWdodCApXG4gICAgICAgIHdtc01heEhlaWdodCA9IE51bWJlcihjb25maWcub3B0aW9ucy53bXNNYXhIZWlnaHQpO1xuICAgIHZhciByZW1vdmVTaW5nbGVUaWxlID0gZmFsc2U7XG4gICAgdmFyIG1hcFNpemUgPSBtYXAuc2l6ZTtcbiAgICB2YXIgcmVwbGFjZVNpbmdsZVRpbGVTaXplID0gbmV3IE9wZW5MYXllcnMuU2l6ZSh3bXNNYXhXaWR0aCwgd21zTWF4SGVpZ2h0KTtcbiAgICBpZiggbWFwU2l6ZS53ID4gd21zTWF4V2lkdGggfHwgbWFwU2l6ZS5oID4gd21zTWF4SGVpZ2h0ICl7XG4gICAgICAgIHJlbW92ZVNpbmdsZVRpbGUgPSB0cnVlO1xuICAgICAgICB2YXIgd21zTWF4TWF4ID0gTWF0aC5tYXgod21zTWF4V2lkdGgsIHdtc01heEhlaWdodCk7XG4gICAgICAgIHZhciB3bXNNaW5NYXggPSBNYXRoLm1pbih3bXNNYXhXaWR0aCwgd21zTWF4SGVpZ2h0KTtcbiAgICAgICAgdmFyIG1hcE1heCA9IE1hdGgubWF4KG1hcFNpemUudywgbWFwU2l6ZS5oKTtcbiAgICAgICAgdmFyIG1hcE1pbiA9IE1hdGgubWluKG1hcFNpemUudywgbWFwU2l6ZS5oKTtcbiAgICAgICAgaWYoIG1hcE1heC8yID4gbWFwTWluIClcbiAgICAgICAgICByZXBsYWNlU2luZ2xlVGlsZVNpemUgPSBuZXcgT3BlbkxheWVycy5TaXplKE1hdGgucm91bmQobWFwTWF4LzIpLCBNYXRoLnJvdW5kKG1hcE1heC8yKSk7XG4gICAgICAgIGVsc2UgaWYoIHdtc01heE1heC8yID4gbWFwTWluIClcbiAgICAgICAgICByZXBsYWNlU2luZ2xlVGlsZVNpemUgPSBuZXcgT3BlbkxheWVycy5TaXplKE1hdGgucm91bmQod21zTWF4TWF4LzIpLCBNYXRoLnJvdW5kKHdtc01heE1heC8yKSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICByZXBsYWNlU2luZ2xlVGlsZVNpemUgPSBuZXcgT3BlbkxheWVycy5TaXplKE1hdGgucm91bmQod21zTWluTWF4LzIpLCBNYXRoLnJvdW5kKHdtc01pbk1heC8yKSk7XG4gICAgfVxuXG4gICAgLy8gZ2V0IHRoZSBiYXNlbGF5ZXIgc2VsZWN0IGNvbnRlbnRcbiAgICAvLyBhbmQgYWRkaW5nIGJhc2VsYXllcnMgdG8gdGhlIG1hcFxuICAgIHZhciBzZWxlY3QgPSBbXTtcbiAgICBiYXNlbGF5ZXJzLnJldmVyc2UoKTtcbiAgICBmb3IgKHZhciBpPTAsbGVuPWJhc2VsYXllcnMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICB2YXIgYmFzZWxheWVyID0gYmFzZWxheWVyc1tpXVxuICAgICAgYmFzZWxheWVyLnVuaXRzID0gcHJvamVjdGlvbi5wcm9qLnVuaXRzO1xuICAgICAgLy8gVXBkYXRlIHNpbmdsZVRpbGUgbGF5ZXJzXG4gICAgICBpZiggcmVtb3ZlU2luZ2xlVGlsZSAmJiAoYmFzZWxheWVyIGluc3RhbmNlb2YgT3BlbkxheWVycy5MYXllci5XTVMpICYmIGJhc2VsYXllci5zaW5nbGVUaWxlICkge1xuICAgICAgICAgIGJhc2VsYXllci5hZGRPcHRpb25zKHtzaW5nbGVUaWxlOmZhbHNlLCB0aWxlU2l6ZTogcmVwbGFjZVNpbmdsZVRpbGVTaXplfSk7XG4gICAgICB9XG4gICAgICB0cnl7IC8vIGJlY2F1c2UgZ29vZ2xlIG1hcHMgbGF5ZXIgY2FuIGJlIGNyZWF0ZWQgYnV0IG5vdCBhZGRlZFxuICAgICAgICAgIG1hcC5hZGRMYXllcihiYXNlbGF5ZXIpO1xuICAgICAgICAgIHZhciBxZ2lzTmFtZSA9IGJhc2VsYXllci5uYW1lO1xuICAgICAgICAgIGlmICggYmFzZWxheWVyLm5hbWUgaW4gY2xlYW5OYW1lTWFwIClcbiAgICAgICAgICAgICAgcWdpc05hbWUgPSBnZXRMYXllck5hbWVCeUNsZWFuTmFtZShiYXNlbGF5ZXIubmFtZSk7XG4gICAgICAgICAgdmFyIGJsQ29uZmlnID0gY29uZmlnLmxheWVyc1txZ2lzTmFtZV07XG4gICAgICAgICAgaWYgKGJsQ29uZmlnKVxuICAgICAgICAgICAgc2VsZWN0ICs9ICc8b3B0aW9uIHZhbHVlPVwiJytiYXNlbGF5ZXIubmFtZSsnXCI+JytibENvbmZpZy50aXRsZSsnPC9vcHRpb24+JztcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBzZWxlY3QgKz0gJzxvcHRpb24gdmFsdWU9XCInK2Jhc2VsYXllci5uYW1lKydcIj4nK2Jhc2VsYXllci5uYW1lKyc8L29wdGlvbj4nO1xuXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICB2YXIgcWdpc05hbWUgPSBiYXNlbGF5ZXIubmFtZTtcbiAgICAgICAgICBpZiAoIGJhc2VsYXllci5uYW1lIGluIGNsZWFuTmFtZU1hcCApXG4gICAgICAgICAgICAgIHFnaXNOYW1lID0gZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUoYmFzZWxheWVyLm5hbWUpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHFnaXNOYW1lK1wiIGNhbid0IGJlIGFkZGVkIHRvIHRoZSBtYXAhXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChiYXNlbGF5ZXJzLmxlbmd0aCE9MCkge1xuICAgICAgLy8gYWN0aXZlIHRoZSBzZWxlY3QgZWxlbWVudCBmb3IgYmFzZWxheWVyc1xuICAgICAgJCgnI3N3aXRjaGVyLWJhc2VsYXllci1zZWxlY3QnKS5hcHBlbmQoc2VsZWN0KTtcbiAgICAgICQoJyNzd2l0Y2hlci1iYXNlbGF5ZXItc2VsZWN0JylcbiAgICAgICAgLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICB2YXIgYmxOYW1lID0gbWFwLmdldExheWVyc0J5TmFtZSh2YWwpWzBdO1xuICAgICAgICAgIG1hcC5zZXRCYXNlTGF5ZXIoIGJsTmFtZSApO1xuXG4gICAgICAgICAgLy8gVHJpZ2dlciBldmVudFxuICAgICAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KFwibGl6bWFwYmFzZWxheWVyY2hhbmdlZFwiLFxuICAgICAgICAgICAgeyAnbGF5ZXInOiBibE5hbWV9XG4gICAgICAgICAgKTtcblxuICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICB9KTtcbiAgICAgIC8vIEhpZGUgc3dpdGNoZXItYmFzZWxheWVyIGlmIG9ubHkgb25lIGJhc2UgbGF5ZXIgaW5zaWRlXG4gICAgICBpZiAoYmFzZWxheWVycy5sZW5ndGg9PTEpe1xuICAgICAgICAkKCcjc3dpdGNoZXItYmFzZWxheWVyJykuaGlkZSgpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAoICdzdGFydHVwQmFzZWxheWVyJyBpbiBjb25maWcub3B0aW9ucyApIHtcbiAgICAgICAgICB2YXIgc3RhcnR1cEJhc2VsYXllciA9IGNvbmZpZy5vcHRpb25zWydzdGFydHVwQmFzZWxheWVyJ107XG4gICAgICAgICAgaWYgKCBzdGFydHVwQmFzZWxheWVyIGluIHN0YXJ0dXBCYXNlbGF5ZXJzUmVwbGFjZW1lbnQgKVxuICAgICAgICAgICAgc3RhcnR1cEJhc2VsYXllciA9IHN0YXJ0dXBCYXNlbGF5ZXJzUmVwbGFjZW1lbnRbc3RhcnR1cEJhc2VsYXllcl07XG4gICAgICAgICAgZWxzZSBpZiAoIHN0YXJ0dXBCYXNlbGF5ZXIgaW4gY29uZmlnLmxheWVycyApXG4gICAgICAgICAgICBzdGFydHVwQmFzZWxheWVyID0gY2xlYW5OYW1lKHN0YXJ0dXBCYXNlbGF5ZXIpO1xuXG4gICAgICAgICAgaWYgKCAkKCcjc3dpdGNoZXItYmFzZWxheWVyLXNlbGVjdCBvcHRpb25bdmFsdWU9XCInK3N0YXJ0dXBCYXNlbGF5ZXIrJ1wiXScpLmxlbmd0aCAhPSAwKVxuICAgICAgICAgICAgJCgnI3N3aXRjaGVyLWJhc2VsYXllci1zZWxlY3QnKS52YWwoc3RhcnR1cEJhc2VsYXllcikuY2hhbmdlKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhpZGUgZWxlbWVudHMgZm9yIGJhc2VsYXllcnNcbiAgICAgICQoJyNzd2l0Y2hlci1iYXNlbGF5ZXInKS5oaWRlKCk7XG4gICAgICBtYXAuYWRkTGF5ZXIobmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKCdiYXNlbGF5ZXInLHtcbiAgICAgICAgbWF4RXh0ZW50Om1hcC5tYXhFeHRlbnRcbiAgICAgICAsbWF4U2NhbGU6IG1hcC5tYXhTY2FsZVxuICAgICAgICxtaW5TY2FsZTogbWFwLm1pblNjYWxlXG4gICAgICAgLG51bVpvb21MZXZlbHM6IG1hcC5udW1ab29tTGV2ZWxzXG4gICAgICAgLHNjYWxlczogbWFwLnNjYWxlc1xuICAgICAgICxwcm9qZWN0aW9uOiBtYXAucHJvamVjdGlvblxuICAgICAgICx1bml0czogbWFwLnByb2plY3Rpb24ucHJvai51bml0c1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8vIGFkZGluZyBsYXllcnMgdG8gdGhlIG1hcFxuICAgIGxheWVycy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIGlmIChhLm9yZGVyID09IGIub3JkZXIpXG4gICAgICAgIHJldHVybiAwO1xuICAgICAgcmV0dXJuIGEub3JkZXIgPiBiLm9yZGVyID8gMSA6IC0xO1xuICAgIH0pO1xuICAgIGxheWVycy5yZXZlcnNlKCk7XG4gICAgZm9yICh2YXIgaT0wLGxlbj1sYXllcnMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICB2YXIgbCA9IGxheWVyc1tpXTtcbiAgICAgIGwudW5pdHMgPSBwcm9qZWN0aW9uLnByb2oudW5pdHM7XG4gICAgICBsLmV2ZW50cy5vbih7XG4gICAgICAgIGxvYWRzdGFydDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgJCgnI2xheWVyLScrZXZ0Lm9iamVjdC5uYW1lKycgc3Bhbi5sb2FkaW5nJykuYWRkQ2xhc3MoJ2xvYWRzdGFydCcpO1xuICAgICAgICB9LFxuICAgICAgICBsb2FkZW5kOiBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAkKCcjbGF5ZXItJytldnQub2JqZWN0Lm5hbWUrJyBzcGFuLmxvYWRpbmcnKS5yZW1vdmVDbGFzcygnbG9hZHN0YXJ0Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gQWRkIG9ubHkgbGF5ZXJzIHdpdGggZ2VvbWV0cnlcbiAgICAgIHZhciBxZ2lzTmFtZSA9IG51bGw7XG4gICAgICBpZiAoIGwubmFtZSBpbiBjbGVhbk5hbWVNYXAgKVxuICAgICAgICAgIHFnaXNOYW1lID0gZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUobC5uYW1lKTtcbiAgICAgIHZhciBhQ29uZmlnID0gbnVsbDtcbiAgICAgIGlmICggcWdpc05hbWUgKVxuICAgICAgICAgIGFDb25maWcgPSBjb25maWcubGF5ZXJzW3FnaXNOYW1lXTtcbiAgICAgIGlmICggIWFDb25maWcgKVxuICAgICAgICAgIGFDb25maWcgPSBjb25maWcubGF5ZXJzW2wucGFyYW1zWydMQVlFUlMnXV07XG4gICAgICBpZiAoICFhQ29uZmlnIClcbiAgICAgICAgICBhQ29uZmlnID0gY29uZmlnLmxheWVyc1tsLm5hbWVdO1xuICAgICAgaWYgKCAhYUNvbmZpZyApXG4gICAgICAgICAgY29udGludWU7XG4gICAgICBpZiggJ2dlb21ldHJ5VHlwZScgaW4gYUNvbmZpZyAmJlxuICAgICAgICAoIGFDb25maWcuZ2VvbWV0cnlUeXBlID09IFwibm9uZVwiIHx8IGFDb25maWcuZ2VvbWV0cnlUeXBlID09IFwidW5rbm93blwiIHx8IGFDb25maWcuZ2VvbWV0cnlUeXBlID09IFwiXCIgKVxuICAgICAgKXtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICAvLyBVcGRhdGUgc2luZ2xlVGlsZSBsYXllcnNcbiAgICAgIGlmKCByZW1vdmVTaW5nbGVUaWxlICYmIChsIGluc3RhbmNlb2YgT3BlbkxheWVycy5MYXllci5XTVMpICYmIGwuc2luZ2xlVGlsZSApIHtcbiAgICAgICAgICBsLmFkZE9wdGlvbnMoe3NpbmdsZVRpbGU6ZmFsc2UsIHRpbGVTaXplOiByZXBsYWNlU2luZ2xlVGlsZVNpemV9KTtcbiAgICAgIH1cbiAgICAgIG1hcC5hZGRMYXllcihsKTtcblxuICAgIH1cblxuICAgIC8vIEFkZCBMb2NhdGUgYnkgbGF5ZXJcbiAgICBpZiAoJ2xvY2F0ZUJ5TGF5ZXInIGluIGNvbmZpZykge1xuICAgICAgdmFyIGxvY2F0ZUJ5TGF5ZXJMaXN0ID0gW107XG4gICAgICBmb3IgKHZhciBsbmFtZSBpbiBjb25maWcubG9jYXRlQnlMYXllcikge1xuICAgICAgICBpZiAoICdvcmRlcicgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXJbbG5hbWVdIClcbiAgICAgICAgICBsb2NhdGVCeUxheWVyTGlzdFsgY29uZmlnLmxvY2F0ZUJ5TGF5ZXJbbG5hbWVdLm9yZGVyIF0gPSBsbmFtZTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgIGxvY2F0ZUJ5TGF5ZXJMaXN0LnB1c2goIGxuYW1lICk7XG4gICAgICB9XG4gICAgICB2YXIgbG9jYXRlQ29udGVudCA9IFtdO1xuICAgICAgZm9yICh2YXIgbCBpbiBsb2NhdGVCeUxheWVyTGlzdCkge1xuICAgICAgICB2YXIgbG5hbWUgPSBsb2NhdGVCeUxheWVyTGlzdFtsXTtcbiAgICAgICAgdmFyIGxDb25maWcgPSBjb25maWcubGF5ZXJzW2xuYW1lXTtcbiAgICAgICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cImxvY2F0ZS1sYXllclwiPic7XG4gICAgICAgIGh0bWwgKz0gJzxzZWxlY3QgaWQ9XCJsb2NhdGUtbGF5ZXItJytjbGVhbk5hbWUobG5hbWUpKydcIiBjbGFzcz1cImxhYmVsXCI+JztcbiAgICAgICAgaHRtbCArPSAnPG9wdGlvbj4nK2xDb25maWcudGl0bGUrJy4uLjwvb3B0aW9uPic7XG4gICAgICAgIGh0bWwgKz0gJzwvc2VsZWN0Pic7XG4gICAgICAgIGh0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgIC8vY29uc3RydWN0aW5nIHRoZSBzZWxlY3RcbiAgICAgICAgbG9jYXRlQ29udGVudC5wdXNoKGh0bWwpO1xuICAgICAgfVxuICAgICAgJCgnI2xvY2F0ZSAubWVudS1jb250ZW50JykuaHRtbChsb2NhdGVDb250ZW50LmpvaW4oJzxoci8+JykpO1xuICAgICAgbWFwLmFkZExheWVyKG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcignbG9jYXRlbGF5ZXInLHtcbiAgICAgICAgc3R5bGVNYXA6IG5ldyBPcGVuTGF5ZXJzLlN0eWxlTWFwKHtcbiAgICAgICAgICBwb2ludFJhZGl1czogNixcbiAgICAgICAgICBmaWxsOiBmYWxzZSxcbiAgICAgICAgICBzdHJva2U6IHRydWUsXG4gICAgICAgICAgc3Ryb2tlV2lkdGg6IDMsXG4gICAgICAgICAgc3Ryb2tlQ29sb3I6ICd5ZWxsb3cnLFxuICAgICAgICAgIHN0cm9rZU9wYWNpdHk6IDAuOFxuICAgICAgICB9KVxuICAgICAgfSkpO1xuXG4gICAgICAgIC8vIExpem1hcCBVUkxcbiAgICAgICAgdmFyIHNlcnZpY2UgPSBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKGxpelVybHMud21zXG4gICAgICAgICAgICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgICAgICk7XG5cbiAgICAgICAgdmFyIGZlYXR1cmVUeXBlcyA9IGdldFZlY3RvckxheWVyRmVhdHVyZVR5cGVzKCk7XG4gICAgICAgIGlmIChmZWF0dXJlVHlwZXMubGVuZ3RoID09IDAgKXtcbiAgICAgICAgICBjb25maWcubG9jYXRlQnlMYXllciA9IHt9O1xuICAgICAgICAgICQoJyNidXR0b24tbG9jYXRlJykucGFyZW50KCkucmVtb3ZlKCk7XG4gICAgICAgICAgJCgnI2xvY2F0ZS1tZW51JykucmVtb3ZlKCk7XG4gICAgICAgICAgdXBkYXRlU3dpdGNoZXJTaXplKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZmVhdHVyZVR5cGVzLmVhY2goIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICB2YXIgdHlwZU5hbWUgPSBzZWxmLmZpbmQoJ05hbWUnKS50ZXh0KCk7XG4gICAgICAgICAgICB2YXIgbG5hbWUgPSBsaXpNYXAuZ2V0TmFtZUJ5VHlwZU5hbWUoIHR5cGVOYW1lICk7XG4gICAgICAgICAgICBpZiAoICFsbmFtZSApIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZU5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpXG4gICAgICAgICAgICAgICAgICAgIGxuYW1lID0gdHlwZU5hbWVcbiAgICAgICAgICAgICAgICBlbHNlIGlmICggKHR5cGVOYW1lIGluIHNob3J0TmFtZU1hcCkgJiYgKHNob3J0TmFtZU1hcFt0eXBlTmFtZV0gaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpKVxuICAgICAgICAgICAgICAgICAgICBsbmFtZSA9IHNob3J0TmFtZU1hcFt0eXBlTmFtZV07XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGJsIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobGJsLnNwbGl0KCcgJykuam9pbignXycpID09IHR5cGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG5hbWUgPSBsYmw7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggIShsbmFtZSBpbiBjb25maWcubG9jYXRlQnlMYXllcikgKVxuICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgdmFyIGxvY2F0ZSA9IGNvbmZpZy5sb2NhdGVCeUxheWVyW2xuYW1lXTtcbiAgICAgICAgICAgIGxvY2F0ZVsnY3JzJ10gPSBzZWxmLmZpbmQoJ1NSUycpLnRleHQoKTtcbiAgICAgICAgICAgIGxvYWRQcm9qRGVmaW5pdGlvbiggbG9jYXRlLmNycywgZnVuY3Rpb24oIGFQcm9qICkge1xuICAgICAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLlByb2plY3Rpb24obG9jYXRlLmNycyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBiYm94ID0gc2VsZi5maW5kKCdMYXRMb25nQm91bmRpbmdCb3gnKTtcbiAgICAgICAgICAgIGxvY2F0ZVsnYmJveCddID0gW1xuICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoYmJveC5hdHRyKCdtaW54JykpXG4gICAgICAgICAgICAgICAscGFyc2VGbG9hdChiYm94LmF0dHIoJ21pbnknKSlcbiAgICAgICAgICAgICAgICxwYXJzZUZsb2F0KGJib3guYXR0cignbWF4eCcpKVxuICAgICAgICAgICAgICAgLHBhcnNlRmxvYXQoYmJveC5hdHRyKCdtYXh5JykpXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH0gKTtcblxuICAgICAgICAgIC8vIGdldCBqb2luc1xuICAgICAgICAgIGZvciAodmFyIGxOYW1lIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyKSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRlID0gY29uZmlnLmxvY2F0ZUJ5TGF5ZXJbbE5hbWVdO1xuICAgICAgICAgICAgaWYgKCd2ZWN0b3Jqb2lucycgaW4gbG9jYXRlICYmIGxvY2F0ZVsndmVjdG9yam9pbnMnXS5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICB2YXIgdmVjdG9yam9pbiA9IGxvY2F0ZVsndmVjdG9yam9pbnMnXVswXTtcbiAgICAgICAgICAgICAgbG9jYXRlWydqb2luRmllbGROYW1lJ10gPSB2ZWN0b3Jqb2luWyd0YXJnZXRGaWVsZE5hbWUnXTtcbiAgICAgICAgICAgICAgZm9yICh2YXIgak5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpIHtcbiAgICAgICAgICAgICAgICB2YXIgakxvY2F0ZSA9IGNvbmZpZy5sb2NhdGVCeUxheWVyW2pOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAoakxvY2F0ZS5sYXllcklkID09IHZlY3RvcmpvaW4uam9pbkxheWVySWQpIHtcbiAgICAgICAgICAgICAgICAgIHZlY3RvcmpvaW5bJ2pvaW5MYXllciddID0gak5hbWU7XG4gICAgICAgICAgICAgICAgICBsb2NhdGVbJ2pvaW5MYXllciddID0gak5hbWU7XG4gICAgICAgICAgICAgICAgICBqTG9jYXRlWydqb2luRmllbGROYW1lJ10gPSB2ZWN0b3Jqb2luWydqb2luRmllbGROYW1lJ107XG4gICAgICAgICAgICAgICAgICBqTG9jYXRlWydqb2luTGF5ZXInXSA9IGxOYW1lO1xuICAgICAgICAgICAgICAgICAgakxvY2F0ZVsnZmlsdGVyam9pbnMnXSA9IFt7XG4gICAgICAgICAgICAgICAgICAgICAgJ3RhcmdldEZpZWxkTmFtZSc6IHZlY3RvcmpvaW5bJ2pvaW5GaWVsZE5hbWUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAnam9pbkZpZWxkTmFtZSc6IHZlY3RvcmpvaW5bJ3RhcmdldEZpZWxkTmFtZSddLFxuICAgICAgICAgICAgICAgICAgICAgICdqb2luTGF5ZXJJZCc6IGxvY2F0ZS5sYXllcklkLFxuICAgICAgICAgICAgICAgICAgICAgICdqb2luTGF5ZXInOiBsTmFtZVxuICAgICAgICAgICAgICAgICAgfV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZ2V0IGxvY2F0ZSBieSBsYXllcnMgZmVhdHVyZXNcbiAgICAgICAgICBmb3IgKHZhciBsbmFtZSBpbiBjb25maWcubG9jYXRlQnlMYXllcikge1xuICAgICAgICAgICAgZ2V0TG9jYXRlRmVhdHVyZShsbmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5idG4tbG9jYXRlLWNsZWFyJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInRlc3QgbG9jYXRlIGNsZWFyXCIpO1xuICAgICAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZSgnbG9jYXRlbGF5ZXInKVswXTtcbiAgICAgICAgICAgIGxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICAgICAgJCgnI2xvY2F0ZSBzZWxlY3QnKS52YWwoJy0xJyk7XG4gICAgICAgICAgICAkKCdkaXYubG9jYXRlLWxheWVyIHNwYW4gPiBpbnB1dCcpLnZhbCgnJyk7XG5cbiAgICAgICAgICAgIGlmKCBsaXpNYXAubGl6bWFwTGF5ZXJGaWx0ZXJBY3RpdmUgKXtcbiAgICAgICAgICAgICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudCgnbGl6bWFwbG9jYXRlZmVhdHVyZWNhbmNlbGVkJyxcbiAgICAgICAgICAgICAgICAgIHsnZmVhdHVyZVR5cGUnOiBsaXpNYXAubGl6bWFwTGF5ZXJGaWx0ZXJBY3RpdmV9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgIH0pO1xuICAgICAgICAgICQoJyNsb2NhdGUtY2xvc2UnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoJy5idG4tbG9jYXRlLWNsZWFyJykuY2xpY2soKTsgLy8gZGVhY3RpdmF0ZSBsb2NhdGUgYW5kIGZpbHRlclxuICAgICAgICAgICAgJCgnI2J1dHRvbi1sb2NhdGUnKS5jbGljaygpO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgJCgnI3N3aXRjaGVyIHNwYW4ubGFiZWwnKS50b29sdGlwKHtcbiAgICAgIHZpZXdwb3J0OiAnI2RvY2snXG4gICAgfSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBjcmVhdGVPdmVydmlld1xuICAgKiBjcmVhdGUgdGhlIG92ZXJ2aWV3XG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVPdmVydmlldygpIHtcbiAgICB2YXIgc2VydmljZSA9IE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQobGl6VXJscy53bXNcbiAgICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgKTtcbiAgICB2YXIgb3ZMYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLldNUygnb3ZlcnZpZXcnXG4gICAgICAgICxzZXJ2aWNlXG4gICAgICAgICx7XG4gICAgICAgICAgbGF5ZXJzOidPdmVydmlldydcbiAgICAgICAgICx2ZXJzaW9uOicxLjMuMCdcbiAgICAgICAgICxleGNlcHRpb25zOidhcHBsaWNhdGlvbi92bmQub2djLnNlX2luaW1hZ2UnXG4gICAgICAgICAsZm9ybWF0OidpbWFnZS9wbmcnXG4gICAgICAgICAsdHJhbnNwYXJlbnQ6dHJ1ZVxuICAgICAgICAgLGRwaTo5NlxuICAgICAgICB9LHtcbiAgICAgICAgICBpc0Jhc2VMYXllcjp0cnVlXG4gICAgICAgICAsZ3V0dGVyOjVcbiAgICAgICAgICxidWZmZXI6MFxuICAgICAgICAgLHNpbmdsZVRpbGU6dHJ1ZVxuICAgICAgICB9KTtcblxuICAgIGlmIChjb25maWcub3B0aW9ucy5oYXNPdmVydmlldykge1xuICAgICAgLy8gZ2V0IGFuZCBkZWZpbmUgdGhlIG1heCBleHRlbnRcbiAgICAgIHZhciBiYm94ID0gY29uZmlnLm9wdGlvbnMuYmJveDtcbiAgICAgIHZhciBleHRlbnQgPSBuZXcgT3BlbkxheWVycy5Cb3VuZHMoTnVtYmVyKGJib3hbMF0pLE51bWJlcihiYm94WzFdKSxOdW1iZXIoYmJveFsyXSksTnVtYmVyKGJib3hbM10pKTtcbiAgICAgIHZhciByZXMgPSBleHRlbnQuZ2V0SGVpZ2h0KCkvOTA7XG4gICAgICB2YXIgcmVzVyA9IGV4dGVudC5nZXRXaWR0aCgpLzE4MDtcbiAgICAgIGlmIChyZXMgPD0gcmVzVylcbiAgICAgICAgcmVzID0gcmVzVztcblxuICAgICAgbWFwLmFkZENvbnRyb2wobmV3IE9wZW5MYXllcnMuQ29udHJvbC5PdmVydmlld01hcChcbiAgICAgICAge2RpdjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvdmVydmlldy1tYXBcIiksXG4gICAgICAgICBzaXplIDogbmV3IE9wZW5MYXllcnMuU2l6ZSgyMjAsIDExMCksXG4gICAgICAgICBtYXBPcHRpb25zOnttYXhFeHRlbnQ6bWFwLm1heEV4dGVudFxuICAgICAgICAgICAgICAgICAgLG1heFJlc29sdXRpb246XCJhdXRvXCJcbiAgICAgICAgICAgICAgICAgICxtaW5SZXNvbHV0aW9uOlwiYXV0b1wiXG4gICAgICAgICAgICAgICAgICAsc2NhbGVzOiBbT3BlbkxheWVycy5VdGlsLmdldFNjYWxlRnJvbVJlc29sdXRpb24ocmVzLCBtYXAucHJvamVjdGlvbi5wcm9qLnVuaXRzKV1cbiAgICAgICAgICAgICAgICAgICxwcm9qZWN0aW9uOm1hcC5wcm9qZWN0aW9uXG4gICAgICAgICAgICAgICAgICAsdW5pdHM6bWFwLnByb2plY3Rpb24ucHJvai51bml0c1xuICAgICAgICAgICAgICAgICAgLGxheWVyczpbb3ZMYXllcl1cbiAgICAgICAgICAgICAgICAgICxzaW5nbGVUaWxlOnRydWVcbiAgICAgICAgICAgICAgICAgICxyYXRpbzoxXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcjb3ZlcnZpZXctbWFwJykuaGlkZSgpO1xuICAgICAgJCgnI292ZXJ2aWV3LXRvZ2dsZScpLmhpZGUoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgJCgnI292ZXJ2aWV3LXRvZ2dsZScpXG4gICAgLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICBpZiAoIHNlbGYuaGFzQ2xhc3MoJ2FjdGl2ZScpIClcbiAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICBlbHNlXG4gICAgICAgIHNlbGYuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgICAkKCcjb3ZlcnZpZXctbWFwJykudG9nZ2xlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICBtYXAuYWRkQ29udHJvbChuZXcgT3BlbkxheWVycy5Db250cm9sLlNjYWxlKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY2FsZXRleHQnKSkpO1xuICAgIG1hcC5hZGRDb250cm9sKG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuU2NhbGVMaW5lKHtkaXY6ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NjYWxlbGluZScpfSkpO1xuXG4gICAgdmFyIG1wVW5pdFNlbGVjdCA9ICQoJyNtb3VzZXBvc2l0aW9uLWJhciA+IHNlbGVjdCcpO1xuICAgIHZhciBtYXBVbml0cyA9IG1hcC5wcm9qZWN0aW9uLmdldFVuaXRzKCk7XG4gICAgaWYgKCBtYXBVbml0cyA9PSAnZGVncmVlcycgKSB7XG4gICAgICBtcFVuaXRTZWxlY3QuZmluZCgnb3B0aW9uW3ZhbHVlPVwibVwiXScpLnJlbW92ZSgpO1xuICAgICAgbXBVbml0U2VsZWN0LmZpbmQoJ29wdGlvblt2YWx1ZT1cImZcIl0nKS5yZW1vdmUoKTtcbiAgICB9IGVsc2UgaWYgKCBtYXBVbml0cyA9PSAnbScgKSB7XG4gICAgICBtcFVuaXRTZWxlY3QuZmluZCgnb3B0aW9uW3ZhbHVlPVwiZlwiXScpLnJlbW92ZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtcFVuaXRTZWxlY3QuZmluZCgnb3B0aW9uW3ZhbHVlPVwibVwiXScpLnJlbW92ZSgpO1xuICAgIH1cbiAgICB2YXIgbW91c2VQb3NpdGlvbiA9IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wubGl6bWFwTW91c2VQb3NpdGlvbih7XG4gICAgICAgIGRpc3BsYXlVbml0Om1wVW5pdFNlbGVjdC52YWwoKSxcbiAgICAgICAgbnVtRGlnaXRzOiAwLFxuICAgICAgICBwcmVmaXg6ICcnLFxuICAgICAgICBlbXB0eVN0cmluZzokKCcjbW91c2Vwb3NpdGlvbicpLmF0dHIoJ3RpdGxlJyksXG4gICAgICAgIGRpdjpkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbW91c2Vwb3NpdGlvbicpXG4gICAgICAgIH0pO1xuICAgIG1hcC5hZGRDb250cm9sKCBtb3VzZVBvc2l0aW9uICk7XG4gICAgbXBVbml0U2VsZWN0LmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIG1wU2VsZWN0VmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgaWYgKG1wU2VsZWN0VmFsID09ICdtJylcbiAgICAgICAgICBtb3VzZVBvc2l0aW9uLm51bURpZ2l0cyA9IDA7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBtb3VzZVBvc2l0aW9uLm51bURpZ2l0cyA9IDU7XG4gICAgICAgIG1vdXNlUG9zaXRpb24uZGlzcGxheVVuaXQgPSBtcFNlbGVjdFZhbDtcbiAgICB9KTtcblxuICAgIGlmIChjb25maWcub3B0aW9ucy5oYXNPdmVydmlldylcbiAgICAgIGlmKCFtQ2hlY2tNb2JpbGUoKSkge1xuICAgICAgICAkKCcjb3ZlcnZpZXctbWFwJykuc2hvdygpO1xuICAgICAgICAkKCcjb3ZlcnZpZXctdG9nZ2xlJykuc2hvdygpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBjcmVhdGVOYXZiYXJcbiAgICogY3JlYXRlIHRoZSBuYXZpZ2F0aW9uIGJhciAoem9vbSwgc2NhbGVzLCBldGMpXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVOYXZiYXIoKSB7XG4gICAgJCgnI25hdmJhciBkaXYuc2xpZGVyJykuaGVpZ2h0KE1hdGgubWF4KDUwLG1hcC5udW1ab29tTGV2ZWxzKjUpKS5zbGlkZXIoe1xuICAgICAgb3JpZW50YXRpb246J3ZlcnRpY2FsJyxcbiAgICAgIG1pbjogMCxcbiAgICAgIG1heDogbWFwLm51bVpvb21MZXZlbHMtMSxcbiAgICAgIGNoYW5nZTogZnVuY3Rpb24oZXZ0LHVpKSB7XG4gICAgICAgIGlmICh1aS52YWx1ZSA+IG1hcC5iYXNlTGF5ZXIubnVtWm9vbUxldmVscy0xKSB7XG4gICAgICAgICAgJCgnI25hdmJhciBkaXYuc2xpZGVyJykuc2xpZGVyKCd2YWx1ZScsbWFwLmdldFpvb20oKSlcbiAgICAgICAgICAkKCcjem9vbS1pbi1tYXgtbXNnJykuc2hvdygnc2xvdycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXskKCcjem9vbS1pbi1tYXgtbXNnJykuaGlkZSgnc2xvdycpfSwxMDAwKVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCB1aS52YWx1ZSAhPSBtYXAuem9vbSApXG4gICAgICAgICAgbWFwLnpvb21Ubyh1aS52YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgJCgnI25hdmJhciBidXR0b24ucGFuJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgIGlmIChzZWxmLmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgJCgnI25hdmJhciBidXR0b24uem9vbScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgIHNlbGYuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgdmFyIG5hdkN0cmwgPSBtYXAuZ2V0Q29udHJvbHNCeUNsYXNzKCdPcGVuTGF5ZXJzLkNvbnRyb2wuTmF2aWdhdGlvbicpWzBdO1xuICAgICAgbmF2Q3RybC56b29tQm94LmtleU1hc2sgPSBuYXZDdHJsLnpvb21Cb3hLZXlNYXNrO1xuICAgICAgbmF2Q3RybC56b29tQm94LmhhbmRsZXIua2V5TWFzayA9IG5hdkN0cmwuem9vbUJveEtleU1hc2s7XG4gICAgICBuYXZDdHJsLnpvb21Cb3guaGFuZGxlci5kcmFnSGFuZGxlci5rZXlNYXNrID0gbmF2Q3RybC56b29tQm94S2V5TWFzaztcbiAgICAgIG5hdkN0cmwuaGFuZGxlcnMud2hlZWwuYWN0aXZhdGUoKTtcbiAgICAgIGlmICggKCAhKCdlZGl0aW9uJyBpbiBjb250cm9scykgfHwgIWNvbnRyb2xzLmVkaXRpb24uYWN0aXZlIClcbiAgICAgICAgICAgJiYgKCdmZWF0dXJlSW5mbycgaW4gY29udHJvbHMpICYmIGNvbnRyb2xzLmZlYXR1cmVJbmZvICE9PSBudWxsIClcbiAgICAgICAgICBjb250cm9scy5mZWF0dXJlSW5mby5hY3RpdmF0ZSgpO1xuICAgIH0pO1xuICAgICQoJyNuYXZiYXIgYnV0dG9uLnpvb20nKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgaWYgKHNlbGYuaGFzQ2xhc3MoJ2FjdGl2ZScpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAkKCcjbmF2YmFyIGJ1dHRvbi5wYW4nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICBzZWxmLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIGlmICggKCdmZWF0dXJlSW5mbycgaW4gY29udHJvbHMpICYmIGNvbnRyb2xzLmZlYXR1cmVJbmZvICE9PSBudWxsIClcbiAgICAgICAgICAgIGNvbnRyb2xzLmZlYXR1cmVJbmZvLmRlYWN0aXZhdGUoKTtcbiAgICAgIHZhciBuYXZDdHJsID0gbWFwLmdldENvbnRyb2xzQnlDbGFzcygnT3BlbkxheWVycy5Db250cm9sLk5hdmlnYXRpb24nKVswXTtcbiAgICAgIG5hdkN0cmwuaGFuZGxlcnMud2hlZWwuZGVhY3RpdmF0ZSgpO1xuICAgICAgbmF2Q3RybC56b29tQm94LmtleU1hc2sgPSBudWxsO1xuICAgICAgbmF2Q3RybC56b29tQm94LmhhbmRsZXIua2V5TWFzayA9IG51bGw7XG4gICAgICBuYXZDdHJsLnpvb21Cb3guaGFuZGxlci5kcmFnSGFuZGxlci5rZXlNYXNrID0gbnVsbDtcbiAgICB9KTtcbiAgICAkKCcjbmF2YmFyIGJ1dHRvbi56b29tLWV4dGVudCcpXG4gICAgLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgdXJsX3BhcmFtcyA9IGdldFVybFBhcmFtZXRlcnMoKTtcbiAgICAgIGlmKCAnbGF5ZXJzJyBpbiB1cmxfcGFyYW1zICl7XG4gICAgICAgIHJ1blBlcm1hbGluayggdXJsX3BhcmFtcyApO1xuICAgICAgfVxuICAgICAgZWxzZXtcbiAgICAgICAgbWFwLnpvb21Ub0V4dGVudChtYXAuaW5pdGlhbEV4dGVudCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgJCgnI25hdmJhciBidXR0b24uem9vbS1pbicpXG4gICAgLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICBpZiAobWFwLmdldFpvb20oKSA9PSBtYXAuYmFzZUxheWVyLm51bVpvb21MZXZlbHMtMSlcbiAgICAgICAgICAkKCcjem9vbS1pbi1tYXgtbXNnJykuc2hvdygnc2xvdycsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXskKCcjem9vbS1pbi1tYXgtbXNnJykuaGlkZSgnc2xvdycpfSwxMDAwKVxuICAgICAgICAgIH0pO1xuICAgICAgZWxzZVxuICAgICAgICBtYXAuem9vbUluKCk7XG4gICAgfSk7XG4gICAgJCgnI25hdmJhciBidXR0b24uem9vbS1vdXQnKVxuICAgIC5jbGljayhmdW5jdGlvbigpe1xuICAgICAgbWFwLnpvb21PdXQoKTtcbiAgICB9KTtcbiAgICBpZiAoICgnem9vbUhpc3RvcnknIGluIGNvbmZpZy5vcHRpb25zKVxuICAgICAgICAmJiBjb25maWcub3B0aW9uc1snem9vbUhpc3RvcnknXSA9PSBcIlRydWVcIikge1xuICAgICAgdmFyIGhDdHJsID0gIG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTmF2aWdhdGlvbkhpc3RvcnkoKTtcbiAgICAgIG1hcC5hZGRDb250cm9scyhbaEN0cmxdKTtcbiAgICAgICQoJyNuYXZiYXIgYnV0dG9uLnByZXZpb3VzJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGN0cmwgPSBtYXAuZ2V0Q29udHJvbHNCeUNsYXNzKCdPcGVuTGF5ZXJzLkNvbnRyb2wuTmF2aWdhdGlvbkhpc3RvcnknKVswXTtcbiAgICAgICAgaWYgKGN0cmwgJiYgY3RybC5wcmV2aW91c1N0YWNrLmxlbmd0aCAhPSAwKVxuICAgICAgICAgIGN0cmwucHJldmlvdXNUcmlnZ2VyKCk7XG4gICAgICAgIGlmIChjdHJsICYmIGN0cmwucHJldmlvdXMuYWN0aXZlKVxuICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICBpZiAoY3RybCAmJiBjdHJsLm5leHQuYWN0aXZlKVxuICAgICAgICAgICQoJyNuYXZiYXIgYnV0dG9uLm5leHQnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICQoJyNuYXZiYXIgYnV0dG9uLm5leHQnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgIH0pO1xuICAgICAgJCgnI25hdmJhciBidXR0b24ubmV4dCcpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBjdHJsID0gbWFwLmdldENvbnRyb2xzQnlDbGFzcygnT3BlbkxheWVycy5Db250cm9sLk5hdmlnYXRpb25IaXN0b3J5JylbMF07XG4gICAgICAgIGlmIChjdHJsICYmIGN0cmwubmV4dFN0YWNrLmxlbmd0aCAhPSAwKVxuICAgICAgICAgIGN0cmwubmV4dFRyaWdnZXIoKTtcbiAgICAgICAgaWYgKGN0cmwgJiYgY3RybC5uZXh0LmFjdGl2ZSlcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgaWYgKGN0cmwgJiYgY3RybC5wcmV2aW91cy5hY3RpdmUpXG4gICAgICAgICAgJCgnI25hdmJhciBidXR0b24ucHJldmlvdXMnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICQoJyNuYXZiYXIgYnV0dG9uLnByZXZpb3VzJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICB9KTtcbiAgICAgIG1hcC5ldmVudHMub24oe1xuICAgICAgICBtb3ZlZW5kIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIGN0cmwgPSBtYXAuZ2V0Q29udHJvbHNCeUNsYXNzKCdPcGVuTGF5ZXJzLkNvbnRyb2wuTmF2aWdhdGlvbkhpc3RvcnknKVswXTtcbiAgICAgICAgICBpZiAoY3RybCAmJiBjdHJsLnByZXZpb3VzU3RhY2subGVuZ3RoICE9IDApXG4gICAgICAgICAgICAkKCcjbmF2YmFyIGJ1dHRvbi5wcmV2aW91cycpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICQoJyNuYXZiYXIgYnV0dG9uLnByZXZpb3VzJykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgaWYgKGN0cmwgJiYgY3RybC5uZXh0U3RhY2subGVuZ3RoICE9IDApXG4gICAgICAgICAgICAkKCcjbmF2YmFyIGJ1dHRvbi5uZXh0JykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgJCgnI25hdmJhciBidXR0b24ubmV4dCcpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI25hdmJhciA+IC5oaXN0b3J5JykucmVtb3ZlKCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGNyZWF0ZVRvb2xiYXJcbiAgICogY3JlYXRlIHRoZSB0b29sIGJhciAoY29sbGFwc2Ugb3ZlcnZpZXcgYW5kIHN3aXRjaGVyLCBldGMpXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVUb29sYmFyKCkge1xuICAgIHZhciBjb25maWdPcHRpb25zID0gY29uZmlnLm9wdGlvbnM7XG5cbiAgICB2YXIgaW5mbyA9IGFkZEZlYXR1cmVJbmZvKCk7XG4gICAgY29udHJvbHNbJ2ZlYXR1cmVJbmZvJ10gPSBpbmZvO1xuXG4gICAgaWYgKCAoJ3ByaW50JyBpbiBjb25maWdPcHRpb25zKVxuICAgICAgICAmJiBjb25maWdPcHRpb25zWydwcmludCddID09ICdUcnVlJylcbiAgICAgIGFkZFByaW50Q29udHJvbCgpO1xuICAgIGVsc2VcbiAgICAgICQoJyNidXR0b24tcHJpbnQnKS5wYXJlbnQoKS5yZW1vdmUoKTtcblxuICAgIGlmICggY29uZmlnWyd0b29sdGlwTGF5ZXJzJ10gJiYgY29uZmlnLnRvb2x0aXBMYXllcnMubGVuZ3RoICE9IDApXG4gICAgICAgIGFkZFRvb2x0aXBDb250cm9sKCk7XG4gICAgZWxzZVxuICAgICAgJCgnI2J1dHRvbi10b29sdGlwLWxheWVyJykucGFyZW50KCkucmVtb3ZlKCk7XG5cbiAgICBpZiAoICgnZ2VvbG9jYXRpb24nIGluIGNvbmZpZ09wdGlvbnMpXG4gICAgICAgICYmIGNvbmZpZ09wdGlvbnNbJ2dlb2xvY2F0aW9uJ10gPT0gJ1RydWUnKVxuICAgICAgYWRkR2VvbG9jYXRpb25Db250cm9sKCk7XG4gICAgZWxzZVxuICAgICAgJCgnI2J1dHRvbi1nZW9sb2NhdGlvbicpLnBhcmVudCgpLnJlbW92ZSgpO1xuXG4gICAgaWYgKCAoJ21lYXN1cmUnIGluIGNvbmZpZ09wdGlvbnMpXG4gICAgICAgICYmIGNvbmZpZ09wdGlvbnNbJ21lYXN1cmUnXSA9PSAnVHJ1ZScpXG4gICAgICBhZGRNZWFzdXJlQ29udHJvbHMoKTtcbiAgICBlbHNlIHtcbiAgICAgICQoJyNtZWFzdXJlJykucGFyZW50KCkucmVtb3ZlKCk7XG4gICAgICAkKCcjbWVhc3VyZS1sZW5ndGgtbWVudScpLnJlbW92ZSgpO1xuICAgICAgJCgnI21lYXN1cmUtYXJlYS1tZW51JykucmVtb3ZlKCk7XG4gICAgICAkKCcjbWVhc3VyZS1wZXJpbWV0ZXItbWVudScpLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBkZWFjdGl2YXRlVG9vbENvbnRyb2xzXG4gICAqIERlYWN0aXZhdGUgT3BlbmxheWVycyBjb250cm9sc1xuICAgKi9cbiAgZnVuY3Rpb24gZGVhY3RpdmF0ZVRvb2xDb250cm9scyggZXZ0ICkge1xuICAgIGZvciAodmFyIGlkIGluIGNvbnRyb2xzKSB7XG4gICAgICB2YXIgY3RybCA9IGNvbnRyb2xzW2lkXTtcbiAgICAgIGlmKGN0cmwpe1xuICAgICAgICBpZiAoZXZ0ICYmICgnb2JqZWN0JyBpbiBldnQpICYmIGN0cmwgPT0gZXZ0Lm9iamVjdCl7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGN0cmwudHlwZSA9PSBPcGVuTGF5ZXJzLkNvbnRyb2wuVFlQRV9UT09MKXtcbiAgICAgICAgICBjdHJsLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGNyZWF0ZVBlcm1hbGlua1xuICAgKiBjcmVhdGUgdGhlIHBlcm1hbGluayB0b29sXG4gICAqL1xuICBmdW5jdGlvbiBjcmVhdGVQZXJtYWxpbmsoKSB7XG4gICAgICBpZiAoICQoJyNwZXJtYWxpbmsnKS5sZW5ndGggPT0gMCApXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciBjb25maWdPcHRpb25zID0gY29uZmlnLm9wdGlvbnM7XG5cbiAgICB2YXIgcExpbmsgPSBuZXcgT3BlbkxheWVycy5Db250cm9sLlBlcm1hbGluayhcbiAgICAgICdwZXJtYWxpbmsnLFxuICAgICAgbnVsbCxcbiAgICAgIHtcbiAgICAgICAgXCJjcmVhdGVQYXJhbXNcIjogY3JlYXRlUGVybWFsaW5rQXJnc1xuICAgICAgfVxuICAgICk7XG4gICAgbWFwLmFkZENvbnRyb2woIHBMaW5rICk7XG5cbiAgICB2YXIgZUxpbmsgPSBuZXcgT3BlbkxheWVycy5Db250cm9sLlBlcm1hbGluayhcbiAgICAgICdwZXJtYWxpbmstZW1iZWQnLFxuICAgICAgJCgnI3Blcm1hbGluay1lbWJlZCcpLmF0dHIoJ2hyZWYnKSxcbiAgICAgIHtcbiAgICAgICAgXCJjcmVhdGVQYXJhbXNcIjogY3JlYXRlUGVybWFsaW5rQXJnc1xuICAgICAgfVxuICAgICk7XG4gICAgbWFwLmFkZENvbnRyb2woIGVMaW5rICk7XG4gICAgbWFwLmV2ZW50cy5vbih7XG4gICAgICAgIFwiY2hhbmdlYmFzZWxheWVyXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnI3N3aXRjaGVyLWJhc2VsYXllci1zZWxlY3QnKS52YWwoIG1hcC5iYXNlTGF5ZXIubmFtZSApLmNoYW5nZSgpO1xuICAgICAgICB9LFxuICAgICAgICAnbW92ZWVuZCc6IHVwZGF0ZVBlcm1hbGlua0lucHV0cyxcbiAgICAgICAgJ2NoYW5nZWxheWVyJzogdXBkYXRlUGVybWFsaW5rSW5wdXRzLFxuICAgICAgICAnY2hhbmdlYmFzZWxheWVyJzogdXBkYXRlUGVybWFsaW5rSW5wdXRzXG4gICAgfSk7XG4gICAgJCgnI3NlbGVjdC1lbWJlZC1wZXJtYWxpbmsnKS5jaGFuZ2UoZnVuY3Rpb24oKXtcbiAgICAgICAgaWYgKCAkKHRoaXMpLnZhbCgpID09ICdwJykge1xuICAgICAgICAgICAgJCgnI3NwYW4tZW1iZWQtcGVyc29uYWxpemVkLXBlcm1hbGluaycpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyNzcGFuLWVtYmVkLXBlcnNvbmFsaXplZC1wZXJtYWxpbmsnKS5oaWRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlUGVybWFsaW5rSW5wdXRzKCk7XG4gICAgfSk7XG4gICAgJCgnI3NwYW4tZW1iZWQtcGVyc29uYWxpemVkLXBlcm1hbGluayBpbnB1dCcpLmNoYW5nZSh1cGRhdGVQZXJtYWxpbmtJbnB1dHMpO1xuXG4gICAgJCgnLmJ0bi1wZXJtYWxpbmstY2xlYXInKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgJCgnI2J1dHRvbi1wZXJtYUxpbmsnKS5jbGljaygpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgYmluZEdlb2Jvb2ttYXJrRXZlbnRzKCk7XG5cbiAgICAkKCcjcGVybWFsaW5rLWJveCB1bC5wZXJtYWxpbmstdGFicyBhW2RhdGEtdG9nZ2xlPVwidGFiXCJdJykub24oJ3Nob3duJywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGlmKCQoZS50YXJnZXQpLmF0dHIoJ2hyZWYnKSA9PSAnI3RhYi1lbWJlZC1wZXJtYWxpbmsnKVxuICAgICAgICAgICAgdXBkYXRlTWluaURvY2tTaXplKCk7XG4gICAgfSk7XG5cbiAgICAkKCcjZ2VvYm9va21hcmstZm9ybScpLnN1Ym1pdChmdW5jdGlvbigpe1xuICAgICAgdmFyIGJuYW1lID0gJCgnI2dlb2Jvb2ttYXJrLWZvcm0gaW5wdXRbbmFtZT1cImJuYW1lXCJdJykudmFsKCk7XG4gICAgICBpZiggYm5hbWUgPT0gJycgKXtcbiAgICAgICAgbUFkZE1lc3NhZ2UobGl6RGljdFsnZ2VvYm9va21hcmsubmFtZS5yZXF1aXJlZCddLCdlcnJvcicsdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHZhciBnYnVybCA9IGxpelVybHMuZ2VvYm9va21hcms7XG4gICAgICB2YXIgZ2JwYXJhbXMgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHBlcm1hbGlua0FyZ3MpKTtcbiAgICAgIGdicGFyYW1zWyduYW1lJ10gPSBibmFtZTtcbiAgICAgIGdicGFyYW1zWydxJ10gPSAnYWRkJztcbiAgICAgIGlmKCBsaXpNYXAubGl6bWFwTGF5ZXJGaWx0ZXJBY3RpdmUgKSB7XG4gICAgICAgIHZhciBhZmlsdGVyID0gbGl6TWFwLmxpem1hcExheWVyRmlsdGVyQWN0aXZlICsgJzonICsgY29uZmlnLmxheWVyc1tsaXpNYXAubGl6bWFwTGF5ZXJGaWx0ZXJBY3RpdmVdWydmaWx0ZXJlZEZlYXR1cmVzJ10uam9pbigpO1xuICAgICAgICBnYnBhcmFtc1snZmlsdGVyJ10gPSAgYWZpbHRlcjtcbiAgICAgIH1cbiAgICAgICQucG9zdChnYnVybCxcbiAgICAgICAgZ2JwYXJhbXMsXG4gICAgICAgIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBzZXRHZW9ib29rbWFya0NvbnRlbnQoZGF0YSk7XG4gICAgICAgIH1cbiAgICAgICAgLCd0ZXh0J1xuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgbGl6TWFwLmV2ZW50cy5vbih7XG4gICAgICAgIG1pbmlkb2Nrb3BlbmVkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoIGUuaWQgPT0gJ3Blcm1hTGluaycgKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlUGVybWFsaW5rSW5wdXRzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cblxuICBmdW5jdGlvbiBjcmVhdGVQZXJtYWxpbmtBcmdzKCl7XG5cbiAgICB2YXIgYXJncyA9IE9wZW5MYXllcnMuQ29udHJvbC5QZXJtYWxpbmsucHJvdG90eXBlLmNyZWF0ZVBhcmFtcy5hcHBseShcbiAgICAgICAgdGhpcywgYXJndW1lbnRzXG4gICAgKTtcblxuICAgIC8vIFJlcGxhY2Ugem9vbSwgbGF0LCBsb24gYnkgYmJveFxuICAgIGRlbGV0ZSBhcmdzWyd6b29tJ107XG4gICAgZGVsZXRlIGFyZ3NbJ2xhdCddO1xuICAgIGRlbGV0ZSBhcmdzWydsb24nXTtcbiAgICBhcmdzWydiYm94J10gPSBtYXAuZ2V0RXh0ZW50KCkudG9CQk9YKCk7XG4gICAgYXJnc1snY3JzJ10gPSBtYXAucHJvamVjdGlvbi5wcm9qQ29kZTtcblxuICAgIC8vIEFkZCBsYXllciBmaWx0ZXIgYW5kIHN0eWxlIGlmIG5lZWRlZFxuICAgIHZhciBmaWx0ZXIgPSBbXTtcbiAgICB2YXIgc3R5bGUgPSBbXTtcbiAgICB2YXIgb3BhY2l0eSA9IFtdO1xuICAgIGZvciAoIHZhciAgbE5hbWUgaW4gY29uZmlnLmxheWVycyApIHtcblxuICAgICAgdmFyIGxDb25maWcgPSBjb25maWcubGF5ZXJzW2xOYW1lXTtcbiAgICAgIGlmICggISgncmVxdWVzdF9wYXJhbXMnIGluIGxDb25maWcpXG4gICAgICAgIHx8IGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ10gPT0gbnVsbCApXG4gICAgICAgICAgY29udGludWU7XG4gICAgICB2YXIgcmVxdWVzdFBhcmFtcyA9IGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ107XG4gICAgICBpZiAoICgnZmlsdGVyJyBpbiBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddKVxuICAgICAgICAmJiBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddWydmaWx0ZXInXSAhPSBudWxsXG4gICAgICAgICYmIGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ11bJ2ZpbHRlciddICE9IFwiXCIgKSB7XG4gICAgICAgICAgZmlsdGVyLnB1c2goIGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ11bJ2ZpbHRlciddICk7XG4gICAgICB9XG5cbiAgICB9XG4gICAgaWYgKCBmaWx0ZXIubGVuZ3RoID4gMCApXG4gICAgICBhcmdzWydmaWx0ZXInXSA9IGZpbHRlci5qb2luKCc7Jyk7XG5cbiAgICAvLyBMYXllcnMgc3R5bGVcbiAgICBmb3IgKHZhciBpPTAsbGVuPWxheWVycy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgIHZhciBsYXllciA9IGxheWVyc1tpXTtcbiAgICAgIGlmKCBsYXllci5pc1Zpc2libGUgJiZcbiAgICAgICAgIChsYXllci5wYXJhbXNbJ1NUWUxFUyddICE9ICdkZWZhdWx0JyB8fCBsYXllci5wYXJhbXNbJ1NUWUxFUyddICE9ICcnKSApe1xuICAgICAgICBzdHlsZS5wdXNoKCBsYXllci5uYW1lICsgJzonICsgbGF5ZXIucGFyYW1zWydTVFlMRVMnXSApO1xuICAgICAgfVxuICAgICAgaWYoIGxheWVyLm9wYWNpdHkgJiYgbGF5ZXIub3BhY2l0eSAhPSAxICl7XG4gICAgICAgIG9wYWNpdHkucHVzaCggbGF5ZXIubmFtZSArICc6JyArIGxheWVyLm9wYWNpdHkgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCBzdHlsZS5sZW5ndGggPiAwIClcbiAgICAgIGFyZ3NbJ2xheWVyU3R5bGVzJ10gPSBzdHlsZS5qb2luKCc7Jyk7XG4gICAgaWYgKCBvcGFjaXR5Lmxlbmd0aCA+IDAgKSB7XG4gICAgICBhcmdzWydsYXllck9wYWNpdGllcyddID0gb3BhY2l0eS5qb2luKCc7Jyk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHBlcm1hbGluayBhcmdzIHRvIExpem1hcCBnbG9iYWwgdmFyaWFibGVcbiAgICBwZXJtYWxpbmtBcmdzID0gYXJncztcblxuICAgIHJldHVybiBhcmdzO1xuXG4gIH1cblxuICBmdW5jdGlvbiBnZXRVcmxQYXJhbWV0ZXJzKCl7XG4gICAgdmFyIG9QYXJhbWV0cmUgPSB7fTtcblxuICAgIGlmICh3aW5kb3cubG9jYXRpb24uc2VhcmNoLmxlbmd0aCA+IDEpIHtcbiAgICAgIGZvciAodmFyIGFJdEtleSwgbktleUlkID0gMCwgYUNvdXBsZXMgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5zcGxpdChcIiZcIik7IG5LZXlJZCA8IGFDb3VwbGVzLmxlbmd0aDsgbktleUlkKyspIHtcbiAgICAgICAgYUl0S2V5ID0gYUNvdXBsZXNbbktleUlkXS5zcGxpdChcIj1cIik7XG4gICAgICAgIG9QYXJhbWV0cmVbdW5lc2NhcGUoYUl0S2V5WzBdKV0gPSBhSXRLZXkubGVuZ3RoID4gMSA/IHVuZXNjYXBlKGFJdEtleVsxXSkgOiBcIlwiO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb1BhcmFtZXRyZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHVwZGF0ZVBlcm1hbGlua0lucHV0cygpIHtcbiAgICBpZiAoICEkKCcjcGVybWFMaW5rJykuaGFzQ2xhc3MoJ2FjdGl2ZScpIClcbiAgICAgICAgcmV0dXJuO1xuXG4gICAgdmFyIHBIcmVmID0gJCgnI3Blcm1hbGluaycpLmF0dHIoJ2hyZWYnKTtcblxuICAgICQoJyNpbnB1dC1zaGFyZS1wZXJtYWxpbmsnKS52YWwocEhyZWYpO1xuXG4gICAgdmFyIGlmcmFtZVNpemUgPSAkKCcjc2VsZWN0LWVtYmVkLXBlcm1hbGluaycpLnZhbCgpO1xuICAgIHBIcmVmID0gJCgnI3Blcm1hbGluay1lbWJlZCcpLmF0dHIoJ2hyZWYnKTtcbiAgICB2YXIgcElmcmFtZSA9ICcnO1xuICAgIGlmICggaWZyYW1lU2l6ZSA9PSAncycgKSB7XG4gICAgICAgIHBJZnJhbWUgPSAnPGlmcmFtZSB3aWR0aD1cIjQwMFwiIGhlaWdodD1cIjMwMFwiIGZyYW1lYm9yZGVyPVwiMFwiIHN0eWxlPVwiYm9yZGVyOjBcIiBzcmM9XCInK3BIcmVmKydcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+JztcbiAgICB9IGVsc2UgaWYgKCBpZnJhbWVTaXplID09ICdtJyApIHtcbiAgICAgICAgcElmcmFtZSA9ICc8aWZyYW1lIHdpZHRoPVwiNjAwXCIgaGVpZ2h0PVwiNDUwXCIgZnJhbWVib3JkZXI9XCIwXCIgc3R5bGU9XCJib3JkZXI6MFwiIHNyYz1cIicrcEhyZWYrJ1wiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT4nO1xuICAgIH1lbHNlIGlmICggaWZyYW1lU2l6ZSA9PSAnbCcgKSB7XG4gICAgICAgIHBJZnJhbWUgPSAnPGlmcmFtZSB3aWR0aD1cIjgwMFwiIGhlaWdodD1cIjYwMFwiIGZyYW1lYm9yZGVyPVwiMFwiIHN0eWxlPVwiYm9yZGVyOjBcIiBzcmM9XCInK3BIcmVmKydcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+JztcbiAgICB9ZWxzZSBpZiAoIGlmcmFtZVNpemUgPT0gJ3AnICkge1xuICAgICAgICB2YXIgdyA9ICQoJyNpbnB1dC1lbWJlZC13aWR0aC1wZXJtYWxpbmsnKS52YWwoKTtcbiAgICAgICAgdmFyIGggPSAkKCcjaW5wdXQtZW1iZWQtaGVpZ2h0LXBlcm1hbGluaycpLnZhbCgpO1xuICAgICAgICBwSWZyYW1lID0gJzxpZnJhbWUgd2lkdGg9XCInK3crJ1wiIGhlaWdodD1cIicraCsnXCIgZnJhbWVib3JkZXI9XCIwXCIgc3R5bGU9XCJib3JkZXI6MFwiIHNyYz1cIicrcEhyZWYrJ1wiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT4nO1xuICAgIH1cbiAgICAkKCcjaW5wdXQtZW1iZWQtcGVybWFsaW5rJykudmFsKHBJZnJhbWUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYmluZEdlb2Jvb2ttYXJrRXZlbnRzKCl7XG5cbiAgICAkKCcuYnRuLWdlb2Jvb2ttYXJrLWRlbCcpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICBpZiAoY29uZmlybShsaXpEaWN0WydnZW9ib29rbWFyay5jb25maXJtLmRlbGV0ZSddICkpe1xuICAgICAgICB2YXIgZ2JpZCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIHJlbW92ZUdlb0Jvb2ttYXJrKGdiaWQpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJy5idG4tZ2VvYm9va21hcmstcnVuJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgIHZhciBpZCA9ICQodGhpcykudmFsKCk7XG4gICAgICBydW5HZW9Cb29rbWFyayggaWQgKTtcblxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gc2V0R2VvYm9va21hcmtDb250ZW50KCBnYkRhdGEgKXtcbiAgICAvLyBzZXQgY29udGVudFxuICAgICQoJ2RpdiNnZW9ib29rbWFyay1jb250YWluZXInKS5odG1sKGdiRGF0YSk7XG4gICAgLy8gdW5iaW5kIHByZXZpb3VzIGNsaWNrIGV2ZW50c1xuICAgICQoJ2RpdiNnZW9ib29rbWFyay1jb250YWluZXIgYnV0dG9uJykudW5iaW5kKCdjbGljaycpO1xuICAgIC8vIEJpbmQgZXZlbnRzXG4gICAgYmluZEdlb2Jvb2ttYXJrRXZlbnRzKCk7XG4gICAgLy8gUmVtb3ZlIGJuYW1lIHZhbFxuICAgICQoJyNnZW9ib29rbWFyay1mb3JtIGlucHV0W25hbWU9XCJibmFtZVwiXScpLnZhbCgnJykuYmx1cigpO1xuICB9XG5cbiAgLy8gU2V0IHRoZSBtYXAgYWNjb3JkaW5nbHkgdG9cbiAgZnVuY3Rpb24gcnVuUGVybWFsaW5rKCBwcGFyYW1zICl7XG5cbiAgICAvLyBBY3RpdmF0ZSBsYXllcnNcbiAgICB2YXIgcGxheWVycyA9IHBwYXJhbXMubGF5ZXJzO1xuXG4gICAgLy8gR2V0IHN0eWxlcyBhbmQgdHJhbmZvcm0gaW50byBvYmpcbiAgICB2YXIgc2xpc3QgPSB7fTtcbiAgICBpZiggJ2xheWVyU3R5bGVzJyBpbiBwcGFyYW1zICYmIHBwYXJhbXMubGF5ZXJTdHlsZXMgIT0gJycpe1xuICAgICAgdmFyIGxzdHlsZXMgPSBwcGFyYW1zLmxheWVyU3R5bGVzLnNwbGl0KCc7Jyk7XG4gICAgICBmb3IodmFyIGkgaW4gbHN0eWxlcyl7XG4gICAgICAgIHZhciBhID0gbHN0eWxlc1tpXTtcbiAgICAgICAgdmFyIGIgPSBhLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmKCBiLmxlbmd0aCA9PSAyKVxuICAgICAgICAgIHNsaXN0W2JbMF1dID0gYlsxXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBHZXQgb3BhY2l0aWVzIGFuZCB0cmFuZm9ybSBpbnRvIG9ialxuICAgIHZhciBvbGlzdCA9IHt9O1xuICAgIGlmKCAnbGF5ZXJPcGFjaXRpZXMnIGluIHBwYXJhbXMgJiYgcHBhcmFtcy5sYXllck9wYWNpdGllcyAhPSAnJyl7XG4gICAgICB2YXIgbG9wYWNpdGllcyA9IHBwYXJhbXMubGF5ZXJPcGFjaXRpZXMuc3BsaXQoJzsnKTtcbiAgICAgIGZvcih2YXIgaSBpbiBsb3BhY2l0aWVzKXtcbiAgICAgICAgdmFyIGEgPSBsb3BhY2l0aWVzW2ldO1xuICAgICAgICB2YXIgYiA9IGEuc3BsaXQoJzonKTtcbiAgICAgICAgaWYoIGIubGVuZ3RoID09IDIpXG4gICAgICAgICAgb2xpc3RbYlswXV0gPSBwYXJzZUZsb2F0KGJbMV0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZvciggdmFyIGk9MDsgaSA8IG1hcC5sYXllcnMubGVuZ3RoOyBpKyspe1xuXG4gICAgICAvLyBBY3RpdmF0ZSBhbmQgZGVhY3RpdmF0ZSBsYXllcnNcbiAgICAgIHZhciBsID0gbWFwLmxheWVyc1tpXTtcbiAgICAgIHZhciBsYmFzZSA9IGwuaXNCYXNlTGF5ZXI7XG4gICAgICBpZiggbGJhc2UgKXtcbiAgICAgICAgaWYoIHBsYXllcnNbaV0gPT0gJ0InIClcbiAgICAgICAgICAkKCcjc3dpdGNoZXItYmFzZWxheWVyLXNlbGVjdCcpLnZhbCggbC5uYW1lICkuY2hhbmdlKCk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgdmFyIGJ0biA9ICQoJyNzd2l0Y2hlciBidXR0b24uY2hlY2tib3hbbmFtZT1cImxheWVyXCJdW3ZhbHVlPVwiJytsLm5hbWUrJ1wiXScpO1xuICAgICAgICBpZiAoICggKHBsYXllcnNbaV0gPT0gJ1QnKSAhPSBidG4uaGFzQ2xhc3MoJ2NoZWNrZWQnKSApIClcbiAgICAgICAgICAkKCcjc3dpdGNoZXIgYnV0dG9uLmNoZWNrYm94W25hbWU9XCJsYXllclwiXVt2YWx1ZT1cIicrbC5uYW1lKydcIl0nKS5jbGljaygpO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgc3R5bGVcbiAgICAgIGlmKCBsLm5hbWUgaW4gc2xpc3QgKXtcbiAgICAgICAgbC5wYXJhbXNbJ1NUWUxFUyddID0gc2xpc3RbbC5uYW1lXTtcbiAgICAgICAgbC5yZWRyYXcoIHRydWUgKTtcbiAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoXCJsYXllcnN0eWxlY2hhbmdlZFwiLFxuICAgICAgICAgICAgeyAnZmVhdHVyZVR5cGUnOiBsLm5hbWV9XG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBvcGFjaXR5XG4gICAgICBpZiggbC5uYW1lIGluIG9saXN0ICl7XG4gICAgICAgIGwuc2V0T3BhY2l0eShvbGlzdFtsLm5hbWVdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBGaWx0ZXJcbiAgICBpZiggJ2ZpbHRlcicgaW4gcHBhcmFtcyAmJiBwcGFyYW1zLmZpbHRlciAhPSAnJyApe1xuICAgICAgICB2YXIgc3AgPSBwcGFyYW1zLmZpbHRlci5zcGxpdCgnOicpO1xuICAgICAgICBpZiggc3AubGVuZ3RoID09IDIgKXtcbiAgICAgICAgICB2YXIgZmxheWVyID0gc3BbMF07XG4gICAgICAgICAgdmFyIGZmaWRzID0gc3BbMV0uc3BsaXQoKTtcblxuICAgICAgICAgIC8vIFNlbGVjdCBmZWF0dXJlXG4gICAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoJ2xheWVyZmVhdHVyZXNlbGVjdGVkJyxcbiAgICAgICAgICAgICAgeydmZWF0dXJlVHlwZSc6IGZsYXllciwgJ2ZpZCc6IGZmaWRzLCAndXBkYXRlRHJhd2luZyc6IGZhbHNlfVxuICAgICAgICAgICk7XG4gICAgICAgICAgLy8gRmlsdGVyIHNlbGVjdGVkIGZlYXR1cmVcbiAgICAgICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudCgnbGF5ZXJmZWF0dXJlZmlsdGVyc2VsZWN0ZWQnLFxuICAgICAgICAgICAgICB7J2ZlYXR1cmVUeXBlJzogZmxheWVyfVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICB9ZWxzZXtcbiAgICAgIGlmKCBsaXpNYXAubGl6bWFwTGF5ZXJGaWx0ZXJBY3RpdmUgKXtcbiAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoJ2xheWVyZmVhdHVyZXJlbW92ZWZpbHRlcicsXG4gICAgICAgICAgICB7J2ZlYXR1cmVUeXBlJzogbGl6TWFwLmxpem1hcExheWVyRmlsdGVyQWN0aXZlfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFpvb20gdG8gYmJveFxuICAgIHZhciBiYm94ID0gT3BlbkxheWVycy5Cb3VuZHMuZnJvbVN0cmluZyggcHBhcmFtcy5iYm94ICk7XG4gICAgbWFwLnpvb21Ub0V4dGVudCggYmJveCwgdHJ1ZSApO1xuXG4gIH1cblxuICBmdW5jdGlvbiBydW5HZW9Cb29rbWFyayggaWQgKXtcbiAgICB2YXIgZ2J1cmwgPSBsaXpVcmxzLmdlb2Jvb2ttYXJrO1xuICAgIHZhciBnYnBhcmFtcyA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIHE6ICdnZXQnXG4gICAgfTtcbiAgICAkLmdldChnYnVybCxcbiAgICAgIGdicGFyYW1zLFxuICAgICAgZnVuY3Rpb24oZ2VvcGFyYW1zKSB7XG4gICAgICAgIHJ1blBlcm1hbGluayhnZW9wYXJhbXMpO1xuICAgICAgfVxuICAgICAgLCdqc29uJ1xuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVHZW9Cb29rbWFyayggaWQgKXtcbiAgICB2YXIgZ2J1cmwgPSBsaXpVcmxzLmdlb2Jvb2ttYXJrO1xuICAgIHZhciBnYnBhcmFtcyA9IHtcbiAgICAgIGlkOiBpZCxcbiAgICAgIHE6ICdkZWwnLFxuICAgICAgcmVwb3NpdG9yeTogbGl6VXJscy5wYXJhbXMucmVwb3NpdG9yeSxcbiAgICAgIHByb2plY3Q6IGxpelVybHMucGFyYW1zLnByb2plY3RcbiAgICB9O1xuICAgICQuZ2V0KGdidXJsLFxuICAgICAgZ2JwYXJhbXMsXG4gICAgICBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHNldEdlb2Jvb2ttYXJrQ29udGVudChkYXRhKTtcbiAgICAgIH1cbiAgICAgICwndGV4dCdcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkR2VvbWV0cnlGZWF0dXJlSW5mbyggcG9wdXAsIGNvbnRhaW5lcklkICkge1xuICAgICAgLy8gY2xlYW4gbG9jYXRlIGxheWVyXG4gICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKCdsb2NhdGVsYXllcicpO1xuICAgICAgaWYgKCBsYXllci5sZW5ndGggPT0gMCApXG4gICAgICAgIHJldHVybjtcbiAgICAgIGxheWVyID0gbGF5ZXJbMF07XG4gICAgICBsYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgIC8vIGJ1aWxkIHNlbGVjdG9yXG4gICAgICB2YXIgc2VsZWN0b3IgPSAnZGl2Lmxpem1hcFBvcHVwQ29udGVudCA+IGRpdi5saXptYXBQb3B1cERpdiA+IGlucHV0Lmxpem1hcC1wb3B1cC1sYXllci1mZWF0dXJlLWdlb21ldHJ5JztcbiAgICAgIGlmICggY29udGFpbmVySWQgKVxuICAgICAgICBzZWxlY3RvciA9ICcjJysgY29udGFpbmVySWQgKycgJysgc2VsZWN0b3I7XG4gICAgICAvLyBnZXQgZ2VvbWV0cmllcyBhbmQgY3JzXG4gICAgICB2YXIgZ2VvbWV0cmllcyA9IFtdO1xuICAgICAgJChzZWxlY3RvcikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciB2YWwgPSBzZWxmLnZhbCgpO1xuICAgICAgICBpZiAoIHZhbCA9PSAnJyApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBjcnMgPSBzZWxmLnBhcmVudCgpLmZpbmQoJ2lucHV0Lmxpem1hcC1wb3B1cC1sYXllci1mZWF0dXJlLWNycycpLnZhbCgpO1xuICAgICAgICBpZiAoIGNycyA9PSAnJyApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHZhciBmaWQgPSBzZWxmLnBhcmVudCgpLmZpbmQoJ2lucHV0Lmxpem1hcC1wb3B1cC1sYXllci1mZWF0dXJlLWlkJykudmFsKCk7XG4gICAgICAgIHZhciBtaW54ID0gc2VsZi5wYXJlbnQoKS5maW5kKCdpbnB1dC5saXptYXAtcG9wdXAtbGF5ZXItZmVhdHVyZS1iYm94LW1pbngnKS52YWwoKTtcbiAgICAgICAgdmFyIG1pbnkgPSBzZWxmLnBhcmVudCgpLmZpbmQoJ2lucHV0Lmxpem1hcC1wb3B1cC1sYXllci1mZWF0dXJlLWJib3gtbWlueScpLnZhbCgpO1xuICAgICAgICB2YXIgbWF4eCA9IHNlbGYucGFyZW50KCkuZmluZCgnaW5wdXQubGl6bWFwLXBvcHVwLWxheWVyLWZlYXR1cmUtYmJveC1tYXh4JykudmFsKCk7XG4gICAgICAgIHZhciBtYXh5ID0gc2VsZi5wYXJlbnQoKS5maW5kKCdpbnB1dC5saXptYXAtcG9wdXAtbGF5ZXItZmVhdHVyZS1iYm94LW1heHknKS52YWwoKTtcbiAgICAgICAgZ2VvbWV0cmllcy5wdXNoKCB7IGZpZDogZmlkLCBnZW9tOiB2YWwsIGNyczogY3JzLCBiYm94OlttaW54LG1pbnksbWF4eCxtYXh5XSB9ICk7XG4gICAgICB9KTtcbiAgICAgIC8vIGxvYWQgcHJvaiBhbmQgYnVpbGQgZmVhdHVyZXMgZnJvbSBwb3B1cFxuICAgICAgdmFyIHByb2pMb2FkZWQgPSBbXTtcbiAgICAgIGZvciAoIHZhciBpPTAsIGxlbj1nZW9tZXRyaWVzLmxlbmd0aDsgaTxsZW47IGkrKyApIHtcbiAgICAgICAgICBsb2FkUHJvakRlZmluaXRpb24oZ2VvbWV0cmllc1tpXS5jcnMsIGZ1bmN0aW9uKCBhUHJvaiApIHtcbiAgICAgICAgICAgICAgcHJvakxvYWRlZC5wdXNoKCBhUHJvaiApO1xuICAgICAgICAgICAgICBpZiAoIHByb2pMb2FkZWQubGVuZ3RoID09IGdlb21ldHJpZXMubGVuZ3RoICkge1xuICAgICAgICAgICAgICAgICAgdmFyIGZlYXR1cmVzID0gW107XG4gICAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaj0wLCBsZW49Z2VvbWV0cmllcy5sZW5ndGg7IGo8bGVuOyBqKysgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGdlb21JbmZvID0gZ2VvbWV0cmllc1tqXTtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgZ2VvbWV0cnkgPSBPcGVuTGF5ZXJzLkdlb21ldHJ5LmZyb21XS1QoIGdlb21JbmZvLmdlb20gKTtcbiAgICAgICAgICAgICAgICAgICAgICBnZW9tZXRyeS50cmFuc2Zvcm0oZ2VvbUluZm8uY3JzLCBtYXAuZ2V0UHJvamVjdGlvbigpKTtcbiAgICAgICAgICAgICAgICAgICAgICBmZWF0dXJlcy5wdXNoKCBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvciggZ2VvbWV0cnkgKSApO1xuXG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGZpZElucHV0ID0gJCgnZGl2Lmxpem1hcFBvcHVwQ29udGVudCBpbnB1dC5saXptYXAtcG9wdXAtbGF5ZXItZmVhdHVyZS1pZFt2YWx1ZT1cIicrZ2VvbUluZm8uZmlkKydcIl0nKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoICFmaWRJbnB1dCApXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcblxuICAgICAgICAgICAgICAgICAgICAgIHZhciBib3VuZHMgPSBPcGVuTGF5ZXJzLkJvdW5kcy5mcm9tQXJyYXkoZ2VvbUluZm8uYmJveCk7XG4gICAgICAgICAgICAgICAgICAgICAgYm91bmRzLnRyYW5zZm9ybShnZW9tSW5mby5jcnMsIG1hcC5nZXRQcm9qZWN0aW9uKCkpO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBlSHRtbCA9ICcnO1xuICAgICAgICAgICAgICAgICAgICAgIGVIdG1sKz0gJzxidXR0b24gY2xhc3M9XCJidG4gYnRuLW1pbmkgcG9wdXAtbGF5ZXItZmVhdHVyZS1iYm94LXpvb21cIiB2YWx1ZT1cIic7XG4gICAgICAgICAgICAgICAgICAgICAgZUh0bWwrPSBib3VuZHMudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICBlSHRtbCs9ICdcIiB0aXRsZT1cIicgKyBsaXpEaWN0WydhdHRyaWJ1dGVMYXllcnMuYnRuLnpvb20udGl0bGUnXSArICdcIj48aSBjbGFzcz1cImljb24tem9vbS1pblwiPjwvaT4mbmJzcDs8L2J1dHRvbj4nO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3B1cEJ1dHRvbkJhciA9IGZpZElucHV0Lm5leHQoJ3NwYW4ucG9wdXBCdXR0b25CYXInKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoIHBvcHVwQnV0dG9uQmFyLmxlbmd0aCAhPSAwICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHBvcHVwQnV0dG9uQmFyLmZpbmQoJ2J1dHRvbi5wb3B1cC1sYXllci1mZWF0dXJlLWJib3gtem9vbScpLmxlbmd0aCA9PSAwIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwQnV0dG9uQmFyLmFwcGVuZChlSHRtbCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZUh0bWwgPSAnPHNwYW4gY2xhc3M9XCJwb3B1cEJ1dHRvbkJhclwiPicgKyBlSHRtbCArICc8L3NwYW4+PC9icj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBmaWRJbnB1dC5hZnRlcihlSHRtbCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGZpZElucHV0LmZpbmQoJ2J1dHRvbi5idG4nKS50b29sdGlwKCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlbWVudDogJ2JvdHRvbSdcbiAgICAgICAgICAgICAgICAgICAgICB9ICk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgIGxheWVyLmFkZEZlYXR1cmVzKCBmZWF0dXJlcyApO1xuXG4gICAgICAgICAgICAgICAgICAvLyBab29tXG4gICAgICAgICAgICAgICAgICAkKCdkaXYubGl6bWFwUG9wdXBDb250ZW50IGJ1dHRvbi5wb3B1cC1sYXllci1mZWF0dXJlLWJib3gtem9vbScpXG4gICAgICAgICAgICAgICAgICAudW5iaW5kKCdjbGljaycpXG4gICAgICAgICAgICAgICAgICAuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgYmJveCA9IE9wZW5MYXllcnMuQm91bmRzLmZyb21TdHJpbmcoJCh0aGlzKS52YWwoKSk7XG4gICAgICAgICAgICAgICAgICAgICAgbWFwLnpvb21Ub0V4dGVudChiYm94KTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgLmhvdmVyKFxuICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCl7ICQodGhpcykuYWRkQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7IH0sXG4gICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKXsgJCh0aGlzKS5yZW1vdmVDbGFzcygnYnRuLXByaW1hcnknKTsgfVxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0gKTtcbiAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENoaWxkcmVuRGF0YXZpekZpbHRlcmVkQnlQb3B1cEZlYXR1cmUocG9wdXAsIGNvbnRhaW5lcklkKSB7XG4gICAgICAvLyBidWlsZCBzZWxlY3RvclxuICAgICAgdmFyIHNlbGVjdG9yID0gJ2Rpdi5saXptYXBQb3B1cENvbnRlbnQgPiBkaXYubGl6bWFwUG9wdXBEaXYnO1xuICAgICAgaWYgKCBjb250YWluZXJJZCApXG4gICAgICAgIHNlbGVjdG9yID0gJyMnKyBjb250YWluZXJJZCArJyAnKyBzZWxlY3RvcjtcblxuICAgICAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBteWRpdiA9ICQodGhpcyk7XG5cbiAgICAgICAgLy8gRG8gbm90IGFkZCBwbG90cyBpZiBhbHJlYWR5IHByZXNlbnRcbiAgICAgICAgaWYoICQodGhpcykuZmluZCgnZGl2LmxpemRhdGF2aXonKS5sZW5ndGggPiAwIClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIHZhciBnZXRMYXllcklkID0gJCh0aGlzKS5maW5kKCdpbnB1dC5saXptYXAtcG9wdXAtbGF5ZXItZmVhdHVyZS1pZDpmaXJzdCcpLnZhbCgpLnNwbGl0KCcuJyk7XG4gICAgICAgIHZhciBwb3B1cElkID0gZ2V0TGF5ZXJJZFswXSArICdfJyArIGdldExheWVySWRbMV07XG4gICAgICAgIHZhciBsYXllcklkID0gZ2V0TGF5ZXJJZFswXTtcbiAgICAgICAgdmFyIGZpZCA9IGdldExheWVySWRbMV07XG4gICAgICAgIHZhciBsYXllck5hbWU9Z2V0TGF5ZXJJZFswXS5zcGxpdCgvWzAtOV0vKVswXTtcblxuICAgICAgICB2YXIgZ2V0TGF5ZXJDb25maWcgPSBsaXpNYXAuZ2V0TGF5ZXJDb25maWdCeUlkKCBsYXllcklkICk7XG5cbiAgICAgICAgLy8gdmVyaWZpeWluZyAgcmVsYXRlZCBjaGlsZHJlbiBvYmplY3RzXG4gICAgICAgIGlmICggIWdldExheWVyQ29uZmlnIClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB2YXIgbGF5ZXJDb25maWcgPSBnZXRMYXllckNvbmZpZ1sxXTtcbiAgICAgICAgdmFyIGZlYXR1cmVUeXBlID0gZ2V0TGF5ZXJDb25maWdbMF07XG5cbiAgICAgICAgLy8gV2UgZG8gbm90IHdhbnQgdG8gZGVhY3RpdmF0ZSB0aGUgZGlzcGxheSBvZiBmaWx0ZXJlZCBjaGlsZHJlbiBkYXRhdml6XG4gICAgICAgIC8vIHdoZW4gY2hpbGRyZW4gcG9wdXAgYXJlIG5vdCBkaXNwbGF5ZWQgOiBjb21tZW50IHRoZSAyIGZvbGxvd2luZyBsaW5lc1xuICAgICAgICBpZiAoICEoJ3JlbGF0aW9ucycgaW4gbGl6TWFwLmNvbmZpZykgfHwgIShsYXllcklkIGluIGxpek1hcC5jb25maWcucmVsYXRpb25zKSApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAvL0lmIGRhdGF2aXogZXhpc3RzLCBnZXQgY29uZmlnXG4gICAgICAgIGlmKCAhKCdkYXRhdml6TGF5ZXJzJyBpbiBsaXpNYXAuY29uZmlnICkpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICBsaXpNYXAuZ2V0TGF5ZXJGZWF0dXJlKGZlYXR1cmVUeXBlLCBmaWQsIGZ1bmN0aW9uKGZlYXQpIHtcbiAgICAgICAgICAgIC8vIFdoZXJlIHRoZXJlIGlzIGFsbCBwbG90c1xuICAgICAgICAgICAgdmFyIHBsb3RMYXllcnMgPSBsaXpNYXAuY29uZmlnLmRhdGF2aXpMYXllcnMubGF5ZXJzO1xuICAgICAgICAgICAgdmFyIGxyZWxhdGlvbnMgPSBsaXpNYXAuY29uZmlnLnJlbGF0aW9uc1tsYXllcklkXTtcbiAgICAgICAgICAgIG5iUGxvdEJ5TGF5ZXIgPSAxO1xuICAgICAgICAgICAgZm9yKHZhciB4IGluIGxyZWxhdGlvbnMpe1xuICAgICAgICAgICAgICAgIHZhciByZWwgPSBscmVsYXRpb25zW3hdO1xuICAgICAgICAgICAgICAgIC8vIElkIG9mIHRoZSBsYXllciB3aGljaCBpcyB0aGUgY2hpbGQgb2YgbGF5ZXJJZFxuICAgICAgICAgICAgICAgIHZhciBnZXRDaGlsZHJlbklkID0gcmVsLnJlZmVyZW5jaW5nTGF5ZXI7XG5cbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgb2YgdGhlIHBsb3RcbiAgICAgICAgICAgICAgICB2YXIgZmlsdGVyID0gJ1wiJyArIHJlbC5yZWZlcmVuY2luZ0ZpZWxkICsgJ1wiIElOIChcXCcnK2ZlYXQucHJvcGVydGllc1tyZWwucmVmZXJlbmNlZEZpZWxkXSsnXFwnKSc7XG4gICAgICAgICAgICAgICAgZm9yICggdmFyIGkgaW4gcGxvdExheWVycykge1xuICAgICAgICAgICAgICAgICAgICBpZihwbG90TGF5ZXJzW2ldLmxheWVyX2lkPT1nZXRDaGlsZHJlbklkKVxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwbG90X2NvbmZpZz1wbG90TGF5ZXJzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoJ3BvcHVwX2Rpc3BsYXlfY2hpbGRfcGxvdCcgaW4gcGxvdF9jb25maWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJiYgcGxvdF9jb25maWcucG9wdXBfZGlzcGxheV9jaGlsZF9wbG90ID09IFwiVHJ1ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwbG90X2lkPXBsb3RMYXllcnNbaV0ucGxvdF9pZDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBJZCA9IGdldExheWVySWRbMF0gKyAnXycgKyBnZXRMYXllcklkWzFdICsgJ18nICsgU3RyaW5nKG5iUGxvdEJ5TGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCZSBzdXJlIHRoZSBpZCBpcyB1bmlxdWUgKCBwb3B1cCBjYW4gYmUgZGlzcGxheWVkIGluIGF0bGFzIHRvb2wgdG9vKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBwb3B1cElkKz0gJ18nICsgbmV3IERhdGUoKS52YWx1ZU9mKCkrYnRvYShNYXRoLnJhbmRvbSgpKS5zdWJzdHJpbmcoMCwxMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwaHRtbCA9IGxpekRhdGF2aXouYnVpbGRQbG90Q29udGFpbmVySHRtbChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsb3RfY29uZmlnLnRpdGxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxvdF9jb25maWcuYWJzdHJhY3QsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3B1cElkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCA9ICc8ZGl2IGNsYXNzPVwibGl6bWFwUG9wdXBDaGlsZHJlbiBsaXpkYXRhdml6XCI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCs9ICc8aDQ+JysgcGxvdF9jb25maWcudGl0bGUrJzwvaDQ+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaHRtbCs9IHBodG1sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwrPSAnPC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGhhc3BjID0gJChteWRpdikuZmluZCgnZGl2Lmxpem1hcFBvcHVwQ2hpbGRyZW46Zmlyc3QnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYoIGhhc3BjLmxlbmd0aCA+IDAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChoYXNwYykuYmVmb3JlKGh0bWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKG15ZGl2KS5hcHBlbmQoaHRtbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGxpekRhdGF2aXouZ2V0UGxvdChwbG90X2lkLCBmaWx0ZXIsIHBvcHVwSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBuYlBsb3RCeUxheWVyKys7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Q2hpbGRyZW5GZWF0dXJlSW5mbyggckNvbmZpZ0xheWVyLCB3bXNPcHRpb25zLCBwYXJlbnREaXYsIGFDYWxsYmFjayApIHtcbiAgICAgICAgaWYgKCByQ29uZmlnTGF5ZXIucG9wdXAgIT0gJ1RydWUnIClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgLy8gUXVlcnkgdGhlIHNlcnZlclxuICAgICAgICB2YXIgc2VydmljZSA9IE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQobGl6VXJscy53bXNcbiAgICAgICAgICAgICxPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVyU3RyaW5nKGxpelVybHMucGFyYW1zKVxuICAgICAgICApO1xuICAgICAgICAkLnBvc3Qoc2VydmljZSwgd21zT3B0aW9ucywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgdmFyIGhhc1BvcHVwQ29udGVudCA9ICghKCFkYXRhIHx8IGRhdGEgPT0gbnVsbCB8fCBkYXRhID09ICcnKSlcbiAgICAgICAgICAgIGlmICggaGFzUG9wdXBDb250ZW50ICkge1xuICAgICAgICAgICAgICAgIHZhciBwb3B1cFJlZyA9IG5ldyBSZWdFeHAoJ2xpem1hcFBvcHVwVGFibGUnLCAnZycpO1xuICAgICAgICAgICAgICAgIGRhdGEgPSBkYXRhLnJlcGxhY2UocG9wdXBSZWcsICd0YWJsZSB0YWJsZS1jb25kZW5zZWQgdGFibGUtc3RyaXBlZCBsaXptYXBQb3B1cFRhYmxlJyk7XG5cbiAgICAgICAgICAgICAgICB2YXIgY2xuYW1lID0gckNvbmZpZ0xheWVyLmNsZWFubmFtZTtcbiAgICAgICAgICAgICAgICBpZiAoIGNsbmFtZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICAgICBjbG5hbWUgPSBjbGVhbk5hbWUoY29uZmlnTGF5ZXIubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgIHJDb25maWdMYXllci5jbGVhbm5hbWUgPSBjbG5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHZhciBjaGlsZFBvcHVwID0gJCgnPGRpdiBjbGFzcz1cImxpem1hcFBvcHVwQ2hpbGRyZW4gJytjbG5hbWUrJ1wiPicrZGF0YSsnPC9kaXY+Jyk7XG5cbiAgICAgICAgICAgICAgICAvL01hbmFnZSBpZiB0aGUgdXNlciBjaG9vc2UgdG8gY3JlYXRlIGEgdGFibGUgZm9yIGNoaWxkcmVuXG4gICAgICAgICAgICAgICAgaWYoIHJDb25maWdMYXllci5wb3B1cFNvdXJjZSA9PSAncWdpcycgJiZcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRQb3B1cC5maW5kKCcubGl6bWFwX21lcmdlZCcpLmxlbmd0aCAhPSAwIClcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC8vIHNhdmUgaW5wdXRzXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUG9wdXAuZmluZChcIi5saXptYXBQb3B1cERpdlwiKS5lYWNoKGZ1bmN0aW9uKGksZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9wdXBEaXYgPSAkKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBwb3B1cERpdi5maW5kKFwiLmxpem1hcFBvcHVwSGVhZGVyXCIpLnByb3AoXCJ0YWdOYW1lXCIpID09ICdUUicgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBEaXYuZmluZChcIi5saXptYXBQb3B1cEhlYWRlclwiKS5wcmVwZW5kKFwiPHRoPjwvdGg+XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwRGl2LmZpbmQoXCIubGl6bWFwUG9wdXBIZWFkZXJcIikubmV4dCgpLnByZXBlbmQoXCI8dGQ+PC90ZD5cIik7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwRGl2LmZpbmQoXCIubGl6bWFwUG9wdXBIZWFkZXJcIikubmV4dCgpLnByZXBlbmQoXCI8c3Bhbj48L3NwYW4+XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBEaXYuZmluZChcIi5saXptYXBQb3B1cEhlYWRlclwiKS5uZXh0KCkuY2hpbGRyZW4oKS5maXJzdCgpLmFwcGVuZChwb3B1cERpdi5maW5kKFwiaW5wdXRcIikpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjaGlsZFBvcHVwLmZpbmQoXCJoNFwiKS5lYWNoKGZ1bmN0aW9uKGksZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpICE9IDAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUG9wdXAuZmluZChcIi5saXptYXBQb3B1cEhlYWRlclwiKS5lYWNoKGZ1bmN0aW9uKGksZSl7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZihpICE9IDAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoZSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUG9wdXAuZmluZChcIi5saXptYXBQb3B1cERpdlwiKS5jb250ZW50cygpLnVud3JhcCgpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZFBvcHVwLmZpbmQoXCIubGl6bWFwX21lcmdlZFwiKS5jb250ZW50cygpLnVud3JhcCgpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZFBvcHVwLmZpbmQoXCIubGl6bWFwUG9wdXBEaXZcIikucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUG9wdXAuZmluZChcIi5saXptYXBfbWVyZ2VkXCIpLnJlbW92ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUG9wdXAuZmluZChcIi5saXptYXBQb3B1cEhpZGRlblwiKS5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHRDaGlsZFBvcHVwID0gJChcIjx0YWJsZSBjbGFzcz0nbGl6bWFwX21lcmdlZCc+PC90YWJsZT5cIik7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUG9wdXAuYXBwZW5kKHRDaGlsZFBvcHVwKTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRQb3B1cC5maW5kKCd0cicpLmFwcGVuZFRvKHRDaGlsZFBvcHVwKTtcblxuICAgICAgICAgICAgICAgICAgICBjaGlsZFBvcHVwLmNoaWxkcmVuKCd0Ym9keScpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHZhciBvbGRQb3B1cENoaWxkID0gcGFyZW50RGl2LmZpbmQoJ2Rpdi5saXptYXBQb3B1cENoaWxkcmVuLicrY2xuYW1lKTtcbiAgICAgICAgICAgICAgICBpZiAoIG9sZFBvcHVwQ2hpbGQubGVuZ3RoICE9IDAgKVxuICAgICAgICAgICAgICAgICAgICBvbGRQb3B1cENoaWxkLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgIHBhcmVudERpdi5hcHBlbmQoY2hpbGRQb3B1cCk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGFDYWxsYmFjayApXG4gICAgICAgICAgICAgICAgICAgIGFDYWxsYmFjayggY2hpbGRQb3B1cCApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZENoaWxkcmVuRmVhdHVyZUluZm8oIHBvcHVwLCBjb250YWluZXJJZCApIHtcbiAgICAgIHZhciBzZWxlY3RvciA9ICdkaXYubGl6bWFwUG9wdXBDb250ZW50IGlucHV0Lmxpem1hcC1wb3B1cC1sYXllci1mZWF0dXJlLWlkJztcbiAgICAgIGlmICggY29udGFpbmVySWQgKVxuICAgICAgICBzZWxlY3RvciA9ICcjJysgY29udGFpbmVySWQgKycgJysgc2VsZWN0b3I7XG4gICAgICAkKHNlbGVjdG9yKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgdmFyIHZhbCA9IHNlbGYudmFsKCk7XG4gICAgICAgIHZhciBlSHRtbCA9ICcnO1xuICAgICAgICB2YXIgZmlkID0gdmFsLnNwbGl0KCcuJykucG9wKCk7XG4gICAgICAgIHZhciBsYXllcklkID0gdmFsLnJlcGxhY2UoICcuJyArIGZpZCwgJycgKTtcblxuICAgICAgICB2YXIgZ2V0TGF5ZXJDb25maWcgPSBnZXRMYXllckNvbmZpZ0J5SWQoIGxheWVySWQgKTtcblxuICAgICAgICAvLyB2ZXJpZml5aW5nICByZWxhdGVkIGNoaWxkcmVuIG9iamVjdHNcbiAgICAgICAgaWYgKCAhZ2V0TGF5ZXJDb25maWcgKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHZhciBsYXllckNvbmZpZyA9IGdldExheWVyQ29uZmlnWzFdO1xuICAgICAgICB2YXIgZmVhdHVyZVR5cGUgPSBnZXRMYXllckNvbmZpZ1swXTtcbiAgICAgICAgaWYgKCAhKCdwb3B1cERpc3BsYXlDaGlsZHJlbicgaW4gbGF5ZXJDb25maWcpIHx8IGxheWVyQ29uZmlnLnBvcHVwRGlzcGxheUNoaWxkcmVuICE9ICdUcnVlJylcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICBpZiAoICEoJ3JlbGF0aW9ucycgaW4gY29uZmlnKSB8fCAhKGxheWVySWQgaW4gY29uZmlnLnJlbGF0aW9ucykgKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgLy8gRGlzcGxheSByZWxhdGVkIGNoaWxkcmVuIG9iamVjdHNcbiAgICAgICAgdmFyIHJlbGF0aW9ucyA9IGNvbmZpZy5yZWxhdGlvbnNbbGF5ZXJJZF07XG4gICAgICAgIHZhciBmZWF0dXJlSWQgPSBmZWF0dXJlVHlwZSArICcuJyArIGZpZDtcbiAgICAgICAgdmFyIHBvcHVwTWF4RmVhdHVyZXMgPSAxMDtcbiAgICAgICAgaWYgKCAncG9wdXBNYXhGZWF0dXJlcycgaW4gbGF5ZXJDb25maWcgJiYgIWlzTmFOKHBhcnNlSW50KGxheWVyQ29uZmlnLnBvcHVwTWF4RmVhdHVyZXMpKSApXG4gICAgICAgICAgICBwb3B1cE1heEZlYXR1cmVzID0gcGFyc2VJbnQobGF5ZXJDb25maWcucG9wdXBNYXhGZWF0dXJlcyk7XG4gICAgICAgIHBvcHVwTWF4RmVhdHVyZXMgPT0gMCA/IDEwIDogcG9wdXBNYXhGZWF0dXJlcztcbiAgICAgICAgZ2V0TGF5ZXJGZWF0dXJlKGZlYXR1cmVUeXBlLCBmaWQsIGZ1bmN0aW9uKGZlYXQpIHtcbiAgICAgICAgICAgIGZvciAoIHZhciBpPTAsIGxlbj1yZWxhdGlvbnMubGVuZ3RoOyBpPGxlbjsgaSsrICl7XG4gICAgICAgICAgICAgICAgdmFyIHIgPSByZWxhdGlvbnNbaV07XG4gICAgICAgICAgICAgICAgdmFyIHJMYXllcklkID0gci5yZWZlcmVuY2luZ0xheWVyO1xuICAgICAgICAgICAgICAgIHZhciByR2V0TGF5ZXJDb25maWcgPSBnZXRMYXllckNvbmZpZ0J5SWQoIHJMYXllcklkICk7XG4gICAgICAgICAgICAgICAgaWYgKCByR2V0TGF5ZXJDb25maWcgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByQ29uZmlnTGF5ZXIgPSByR2V0TGF5ZXJDb25maWdbMV07XG4gICAgICAgICAgICAgICAgICAgIHZhciBjbG5hbWUgPSByQ29uZmlnTGF5ZXIuY2xlYW5uYW1lO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIGNsbmFtZSA9PT0gdW5kZWZpbmVkICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2xuYW1lID0gY2xlYW5OYW1lKGNvbmZpZ0xheWVyLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgckNvbmZpZ0xheWVyLmNsZWFubmFtZSA9IGNsbmFtZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoIHJDb25maWdMYXllci5wb3B1cCA9PSAnVHJ1ZScgJiYgc2VsZi5wYXJlbnQoKS5maW5kKCdkaXYubGl6bWFwUG9wdXBDaGlsZHJlbi4nK2NsbmFtZSkubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciB3bXNPcHRpb25zID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnTEFZRVJTJzogckNvbmZpZ0xheWVyLm5hbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsJ1FVRVJZX0xBWUVSUyc6IHJDb25maWdMYXllci5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCdTVFlMRVMnOiAnJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwnU0VSVklDRSc6ICdXTVMnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCdWRVJTSU9OJzogJzEuMy4wJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwnQ1JTJzogKCgnY3JzJyBpbiByQ29uZmlnTGF5ZXIpICYmIHJDb25maWdMYXllci5jcnMgIT0gJycpID8gckNvbmZpZ0xheWVyLmNycyA6ICdFUFNHOjQzMjYnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCdSRVFVRVNUJzogJ0dldEZlYXR1cmVJbmZvJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwnRVhDRVBUSU9OUyc6ICdhcHBsaWNhdGlvbi92bmQub2djLnNlX2luaW1hZ2UnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCdGRUFUVVJFX0NPVU5UJzogcG9wdXBNYXhGZWF0dXJlc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwnSU5GT19GT1JNQVQnOiAndGV4dC9odG1sJ1xuICAgICAgICAgICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCAncG9wdXBNYXhGZWF0dXJlcycgaW4gckNvbmZpZ0xheWVyICYmICFpc05hTihwYXJzZUludChyQ29uZmlnTGF5ZXIucG9wdXBNYXhGZWF0dXJlcykpIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3bXNPcHRpb25zWydGRUFUVVJFX0NPVU5UJ10gPSBwYXJzZUludChyQ29uZmlnTGF5ZXIucG9wdXBNYXhGZWF0dXJlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIHdtc09wdGlvbnNbJ0ZFQVRVUkVfQ09VTlQnXSA9PSAwIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3bXNPcHRpb25zWydGRUFUVVJFX0NPVU5UJ10gPSBwb3B1cE1heEZlYXR1cmVzO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCByQ29uZmlnTGF5ZXIucmVxdWVzdF9wYXJhbXMgJiYgckNvbmZpZ0xheWVyLnJlcXVlc3RfcGFyYW1zLmZpbHRlciAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICByQ29uZmlnTGF5ZXIucmVxdWVzdF9wYXJhbXMuZmlsdGVyICE9PSAnJyApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd21zT3B0aW9uc1snRklMVEVSJ10gPSByQ29uZmlnTGF5ZXIucmVxdWVzdF9wYXJhbXMuZmlsdGVyKycgQU5EIFwiJytyLnJlZmVyZW5jaW5nRmllbGQrJ1wiID0gXFwnJytmZWF0LnByb3BlcnRpZXNbci5yZWZlcmVuY2VkRmllbGRdKydcXCcnO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdtc09wdGlvbnNbJ0ZJTFRFUiddID0gckNvbmZpZ0xheWVyLm5hbWUrJzpcIicrci5yZWZlcmVuY2luZ0ZpZWxkKydcIiA9IFxcJycrZmVhdC5wcm9wZXJ0aWVzW3IucmVmZXJlbmNlZEZpZWxkXSsnXFwnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGdldENoaWxkcmVuRmVhdHVyZUluZm8oIHJDb25maWdMYXllciwgd21zT3B0aW9ucywgc2VsZi5wYXJlbnQoKSwgZnVuY3Rpb24oY2hpbGRQb3B1cCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBwb3B1cCAmJiB0eXBlb2YgcG9wdXAudmVyaWZ5U2l6ZSA9PT0gXCJmdW5jdGlvblwiIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXAudmVyaWZ5U2l6ZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBldmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcImxpem1hcHBvcHVwY2hpbGRyZW5kaXNwbGF5ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgeydodG1sJzogY2hpbGRQb3B1cC5odG1sKCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkRmVhdHVyZUluZm8oKSB7XG4gICAgICAvLyBWZXJpZnlpbmcgbGF5ZXJzXG4gICAgICB2YXIgcG9wdXBzQXZhaWxhYmxlID0gZmFsc2U7XG4gICAgICBmb3IgKCB2YXIgbCBpbiBjb25maWcubGF5ZXJzICkge1xuICAgICAgICAgIHZhciBjb25maWdMYXllciA9IGNvbmZpZy5sYXllcnNbbF07XG4gICAgICAgICAgdmFyIGVkaXRpb25MYXllciA9IG51bGw7XG4gICAgICAgICAgaWYgKCAoJ2VkaXRpb25MYXllcnMnIGluIGNvbmZpZykgJiYgKGwgaW4gY29uZmlnLmVkaXRpb25MYXllcnMpIClcbiAgICAgICAgICAgICAgZWRpdGlvbkxheWVyID0gY29uZmlnLmVkaXRpb25MYXllcnNbbF07XG4gICAgICAgICAgaWYoIChjb25maWdMYXllciAmJiBjb25maWdMYXllci5wb3B1cCAmJiBjb25maWdMYXllci5wb3B1cCA9PSAnVHJ1ZScpXG4gICAgICAgICAgIHx8IChlZGl0aW9uTGF5ZXIgJiYgKCBlZGl0aW9uTGF5ZXIuY2FwYWJpbGl0aWVzLm1vZGlmeUdlb21ldHJ5ID09ICdUcnVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgZWRpdGlvbkxheWVyLmNhcGFiaWxpdGllcy5tb2RpZnlBdHRyaWJ1dGUgPT0gJ1RydWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBlZGl0aW9uTGF5ZXIuY2FwYWJpbGl0aWVzLmRlbGV0ZUZlYXR1cmUgPT0gJ1RydWUnKSApICl7XG4gICAgICAgICAgICAgIHBvcHVwc0F2YWlsYWJsZSA9IHRydWU7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICggIXBvcHVwc0F2YWlsYWJsZSApXG4gICAgICAgIHJldHVybiBudWxsO1xuXG4gICAgICAvLyBDcmVhdGUgdGhlIGRvY2sgaWYgbmVlZGVkXG4gICAgICBpZiggJ3BvcHVwTG9jYXRpb24nIGluIGNvbmZpZy5vcHRpb25zICYmXG4gICAgICAgICAgY29uZmlnLm9wdGlvbnMucG9wdXBMb2NhdGlvbiAhPSAnbWFwJyAmJlxuICAgICAgICAgICEkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS5wb3B1cGNvbnRlbnQgPiBhJykubGVuZ3RoICkge1xuICAgICAgICAgIC8vIFZlcmlmeWluZyB0aGUgbWVzc2FnZVxuICAgICAgICAgIGlmICggISgncG9wdXAubXNnLnN0YXJ0JyBpbiBsaXpEaWN0KSApXG4gICAgICAgICAgICBsaXpEaWN0Wydwb3B1cC5tc2cuc3RhcnQnXSA9ICdDbGljayB0byB0aGUgbWFwIHRvIGdldCBpbmZvcm1hdGlvbnMuJztcbiAgICAgICAgICAvLyBJbml0aWFsaXplIGRvY2tcbiAgICAgICAgICB2YXIgcG9wdXBDb250YWluZXJJZCA9ICdwb3B1cGNvbnRlbnQnO1xuICAgICAgICAgIHZhciBwY29udGVudCA9ICc8ZGl2IGNsYXNzPVwibGl6bWFwUG9wdXBDb250ZW50XCI+PGg0PicrbGl6RGljdFsncG9wdXAubXNnLnN0YXJ0J10rJzwvaDQ+PC9kaXY+JztcbiAgICAgICAgICBhZGREb2NrKHBvcHVwQ29udGFpbmVySWQsICdQb3B1cCcsIGNvbmZpZy5vcHRpb25zLnBvcHVwTG9jYXRpb24sIHBjb250ZW50LCAnaWNvbi1jb21tZW50Jyk7XG4gICAgICAgICAgJCgnI2J1dHRvbi1wb3B1cGNvbnRlbnQnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICAgICAgICBpZigkKHRoaXMpLnBhcmVudCgpLmhhc0NsYXNzKCdhY3RpdmUnKSkge1xuICAgICAgICAgICAgICAgICAgLy8gY2xlYW4gbG9jYXRlIGxheWVyXG4gICAgICAgICAgICAgICAgICB2YXIgbG9jYXRlbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKCdsb2NhdGVsYXllcicpO1xuICAgICAgICAgICAgICAgICAgaWYgKCBsb2NhdGVsYXllci5sZW5ndGggPT0gMCApXG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgbG9jYXRlbGF5ZXIgPSBsb2NhdGVsYXllclswXTtcbiAgICAgICAgICAgICAgICAgIGxvY2F0ZWxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGluZm9ybWF0aW9uXG4gICAgICAgICAgICAgICAgICAkKCcjcG9wdXBjb250ZW50IGRpdi5tZW51LWNvbnRlbnQnKS5odG1sKCc8ZGl2IGNsYXNzPVwibGl6bWFwUG9wdXBDb250ZW50XCI+PGg0PicrbGl6RGljdFsncG9wdXAubXNnLnN0YXJ0J10rJzwvaDQ+PC9kaXY+Jyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgfVxuXG4gICAgICB2YXIgZml1cmwgPSBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKFxuICAgICAgICBsaXpVcmxzLndtcyxcbiAgICAgICAgT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICAgIClcbiAgICAgIHZhciBsYXN0TG9uTGF0SW5mbyA9IG51bGw7XG4gICAgICB2YXIgaW5mbyA9IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuV01TR2V0RmVhdHVyZUluZm8oe1xuICAgICAgICAgICAgdXJsOiBmaXVybCxcbiAgICAgICAgICAgIHRpdGxlOiAnSWRlbnRpZnkgZmVhdHVyZXMgYnkgY2xpY2tpbmcnLFxuICAgICAgICAgICAgdHlwZTpPcGVuTGF5ZXJzLkNvbnRyb2wuVFlQRV9UT0dHTEUsXG4gICAgICAgICAgICBxdWVyeVZpc2libGU6IHRydWUsXG4gICAgICAgICAgICBpbmZvRm9ybWF0OiAndGV4dC9odG1sJyxcbiAgICAgICAgICAgIHZlbmRvclBhcmFtczogZ2V0RmVhdHVyZUluZm9Ub2xlcmFuY2VzKCksXG4gICAgICAgICAgICBldmVudExpc3RlbmVyczoge1xuICAgICAgICAgICAgICAgIGdldGZlYXR1cmVpbmZvOiBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgZXZlbnRMb25MYXRJbmZvID0gbWFwLmdldExvbkxhdEZyb21QaXhlbChldmVudC54eSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0ZXh0ID0gZXZlbnQudGV4dDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAobWFwLnBvcHVwcy5sZW5ndGggIT0gMClcbiAgICAgICAgICAgICAgICAgICAgICAgIG1hcC5yZW1vdmVQb3B1cChtYXAucG9wdXBzWzBdKTtcblxuICAgICAgICAgICAgICAgICAgICB2YXIgcG9wdXAgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICB2YXIgcG9wdXBDb250YWluZXJJZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIGlmKCAncG9wdXBMb2NhdGlvbicgaW4gY29uZmlnLm9wdGlvbnMgJiYgY29uZmlnLm9wdGlvbnMucG9wdXBMb2NhdGlvbiAhPSAnbWFwJyApe1xuICAgICAgICAgICAgICAgICAgICAgIHBvcHVwQ29udGFpbmVySWQgPSAncG9wdXBjb250ZW50JztcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIGNyZWF0ZSBjb250ZW50XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBvcHVwUmVnID0gbmV3IFJlZ0V4cCgnbGl6bWFwUG9wdXBUYWJsZScsICdnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgdGV4dCA9IHRleHQucmVwbGFjZSggcG9wdXBSZWcsICd0YWJsZSB0YWJsZS1jb25kZW5zZWQgdGFibGUtc3RyaXBlZCB0YWJsZS1ib3JkZXJlZCBsaXptYXBQb3B1cFRhYmxlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBjb250ZW50ID0gJzxkaXYgY2xhc3M9XCJsaXptYXBQb3B1cENvbnRlbnRcIj4nK3RleHQrJzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGhhc1BvcHVwQ29udGVudCA9ICghKCF0ZXh0IHx8IHRleHQgPT0gbnVsbCB8fCB0ZXh0ID09ICcnKSk7XG4gICAgICAgICAgICAgICAgICAgICAgJCgnI3BvcHVwY29udGVudCBkaXYubWVudS1jb250ZW50JykuaHRtbChwY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCAhJCgnI21hcG1lbnUgLm5hdi1saXN0ID4gbGkucG9wdXBjb250ZW50JykuaXMoJzp2aXNpYmxlJykgKVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI21hcG1lbnUgLm5hdi1saXN0ID4gbGkucG9wdXBjb250ZW50Jykuc2hvdygpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgLy8gV2FybiB1c2VyIG5vIGRhdGEgaGFzIGJlZW4gZm91bmRcbiAgICAgICAgICAgICAgICAgICAgICBpZiggIWhhc1BvcHVwQ29udGVudCApe1xuICAgICAgICAgICAgICAgICAgICAgICAgcGNvbnRlbnQgPSAnPGRpdiBjbGFzcz1cImxpem1hcFBvcHVwQ29udGVudFwiPjxoND4nK2xpekRpY3RbJ3BvcHVwLm1zZy5uby5yZXN1bHQnXSsnPC9oND48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI3BvcHVwY29udGVudCBkaXYubWVudS1jb250ZW50JykuaHRtbChwY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggJCgnI21hcG1lbnUgLm5hdi1saXN0ID4gbGkucG9wdXBjb250ZW50JykuaGFzQ2xhc3MoJ2FjdGl2ZScpICYmIGNvbmZpZy5vcHRpb25zLnBvcHVwTG9jYXRpb24gIT0gJ3JpZ2h0LWRvY2snKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjYnV0dG9uLXBvcHVwY29udGVudCcpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9LDIwMDApO1xuICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgIC8vIERpc3BsYXkgZG9jayBpZiBuZWVkZWRcbiAgICAgICAgICAgICAgICAgICAgICBpZihcbiAgICAgICAgICAgICAgICAgICAgICAgICEkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS5wb3B1cGNvbnRlbnQnKS5oYXNDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAmJiAoIW1DaGVja01vYmlsZSgpIHx8ICggbUNoZWNrTW9iaWxlKCkgJiYgaGFzUG9wdXBDb250ZW50ICkgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICYmIChsYXN0TG9uTGF0SW5mbyA9PSBudWxsIHx8IGV2ZW50TG9uTGF0SW5mby5sb24gIT0gbGFzdExvbkxhdEluZm8ubG9uIHx8IGV2ZW50TG9uTGF0SW5mby5sYXQgIT0gbGFzdExvbkxhdEluZm8ubGF0KVxuICAgICAgICAgICAgICAgICAgICAgICl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNidXR0b24tcG9wdXBjb250ZW50JykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZihcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNtYXBtZW51IC5uYXYtbGlzdCA+IGxpLnBvcHVwY29udGVudCcpLmhhc0NsYXNzKCdhY3RpdmUnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICYmICggbUNoZWNrTW9iaWxlKCkgJiYgaGFzUG9wdXBDb250ZW50IClcbiAgICAgICAgICAgICAgICAgICAgICApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjYnV0dG9uLXBvcHVwY29udGVudCcpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIC8vIFJlc2l6ZSBtaW5pZG9jayBpZiBkaXNwbGF5ZWRcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoICQoJyNtYXBtZW51IC5uYXYtbGlzdCA+IGxpLnBvcHVwY29udGVudCcpLmhhc0NsYXNzKCdhY3RpdmUnKSAmJiBjb25maWcub3B0aW9ucy5wb3B1cExvY2F0aW9uID09ICdtaW5pZG9jaycgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVNaW5pRG9ja1NpemUoKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCF0ZXh0IHx8IHRleHQgPT0gbnVsbCB8fCB0ZXh0ID09ICcnKVxuICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gVXNlIG9wZW5sYXllcnMgbWFwIHBvcHVwIGFuY2hvcmVkXG4gICAgICAgICAgICAgICAgICAgICAgcG9wdXBDb250YWluZXJJZCA9IFwibGl6X2xheWVyX3BvcHVwXCI7XG4gICAgICAgICAgICAgICAgICAgICAgcG9wdXAgPSBuZXcgT3BlbkxheWVycy5Qb3B1cC5MaXptYXBBbmNob3JlZChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBDb250YWluZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRMb25MYXRJbmZvLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0ZXh0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAucmVtb3ZlUG9wdXAodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYobUNoZWNrTW9iaWxlKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI25hdmJhcicpLnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNvdmVydmlldy1ib3gnKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gY2xlYW4gbG9jYXRlIGxheWVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxvY2F0ZWxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZSgnbG9jYXRlbGF5ZXInKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGxvY2F0ZWxheWVyLmxlbmd0aCA9PSAwIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0ZWxheWVyID0gbG9jYXRlbGF5ZXJbMF07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYXRlbGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICBwb3B1cC5wYW5NYXBJZk91dE9mVmlldyA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgbWFwLmFkZFBvcHVwKHBvcHVwKTtcblxuICAgICAgICAgICAgICAgICAgICAgIHBvcHVwLnZlcmlmeVNpemUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBIaWRlIG5hdmJhciBhbmQgb3ZlcnZpZXcgaW4gbW9iaWxlIG1vZGVcbiAgICAgICAgICAgICAgICAgICAgICBpZihtQ2hlY2tNb2JpbGUoKSl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNuYXZiYXInKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNvdmVydmlldy1ib3gnKS5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGxhc3RMb25MYXRJbmZvID0gZXZlbnRMb25MYXRJbmZvO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIERpc3BsYXkgcmVsYXRlZCBjaGlsZHJlbiBvYmplY3RzXG4gICAgICAgICAgICAgICAgICAgIGFkZENoaWxkcmVuRmVhdHVyZUluZm8oIHBvcHVwLCBwb3B1cENvbnRhaW5lcklkICk7XG4gICAgICAgICAgICAgICAgICAgIC8vIERpc3BsYXkgZ2VvbWV0cmllc1xuICAgICAgICAgICAgICAgICAgICBhZGRHZW9tZXRyeUZlYXR1cmVJbmZvKCBwb3B1cCwgcG9wdXBDb250YWluZXJJZCApO1xuICAgICAgICAgICAgICAgICAgICAvLyBEaXNwbGF5IHRoZSBwbG90cyBvZiB0aGUgY2hpbGRyZW4gbGF5ZXJzIGZlYXR1cmVzIGZpbHRlcmVkIGJ5IHBvcHVwIGl0ZW1cbiAgICAgICAgICAgICAgICAgICAgYWRkQ2hpbGRyZW5EYXRhdml6RmlsdGVyZWRCeVBvcHVwRmVhdHVyZSggcG9wdXAsIHBvcHVwQ29udGFpbmVySWQgKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBUcmlnZ2VyIGV2ZW50XG4gICAgICAgICAgICAgICAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KFwibGl6bWFwcG9wdXBkaXNwbGF5ZWRcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIHsncG9wdXAnOiBwb3B1cCwgJ2NvbnRhaW5lcklkJzogcG9wdXBDb250YWluZXJJZH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgIH0pO1xuICAgICBpZiAobGl6VXJscy5wdWJsaWNVcmxMaXN0ICYmIGxpelVybHMucHVibGljVXJsTGlzdC5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgdmFyIGxheWVyVXJscyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqPTAsIGpsZW49bGl6VXJscy5wdWJsaWNVcmxMaXN0Lmxlbmd0aDsgajxqbGVuOyBqKyspIHtcbiAgICAgICAgICBsYXllclVybHMucHVzaChcbiAgICAgICAgICAgIE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQoXG4gICAgICAgICAgICAgIGxpelVybHMucHVibGljVXJsTGlzdFtqXSxcbiAgICAgICAgICAgICAgT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGluZm8ubGF5ZXJVcmxzID0gbGF5ZXJVcmxzO1xuICAgICB9XG4gICAgIGluZm8uZmluZExheWVycyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgY2FuZGlkYXRlcyA9IHRoaXMubGF5ZXJzIHx8IHRoaXMubWFwLmxheWVycztcbiAgICAgICAgdmFyIGxheWVycyA9IFtdO1xuICAgICAgICB2YXIgbWF4RmVhdHVyZXMgPSAwO1xuICAgICAgICB2YXIgbGF5ZXIsIHVybDtcbiAgICAgICAgZm9yKHZhciBpPTAsIGxlbj1jYW5kaWRhdGVzLmxlbmd0aDsgaTxsZW47ICsraSkge1xuICAgICAgICAgICAgbGF5ZXIgPSBjYW5kaWRhdGVzW2ldO1xuICAgICAgICAgICAgaWYoIChsYXllciBpbnN0YW5jZW9mIE9wZW5MYXllcnMuTGF5ZXIuV01TIHx8IGxheWVyIGluc3RhbmNlb2YgT3BlbkxheWVycy5MYXllci5XTVRTKVxuICAgICAgICAgICAgICYmICghdGhpcy5xdWVyeVZpc2libGUgfHwgKGxheWVyLmdldFZpc2liaWxpdHkoKSAmJiBsYXllci5jYWxjdWxhdGVJblJhbmdlKCkpKSApIHtcbiAgICAgICAgICAgICAgICB2YXIgcWdpc05hbWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICggbGF5ZXIubmFtZSBpbiBjbGVhbk5hbWVNYXAgKVxuICAgICAgICAgICAgICAgICAgICBxZ2lzTmFtZSA9IGdldExheWVyTmFtZUJ5Q2xlYW5OYW1lKGxheWVyLm5hbWUpO1xuICAgICAgICAgICAgICAgIHZhciBjb25maWdMYXllciA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKCBxZ2lzTmFtZSApXG4gICAgICAgICAgICAgICAgICAgIGNvbmZpZ0xheWVyID0gY29uZmlnLmxheWVyc1txZ2lzTmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKCAhY29uZmlnTGF5ZXIgKVxuICAgICAgICAgICAgICAgICAgICBjb25maWdMYXllciA9IGNvbmZpZy5sYXllcnNbbGF5ZXIucGFyYW1zWydMQVlFUlMnXV07XG4gICAgICAgICAgICAgICAgaWYgKCAhY29uZmlnTGF5ZXIgKVxuICAgICAgICAgICAgICAgICAgICBjb25maWdMYXllciA9IGNvbmZpZy5sYXllcnNbbGF5ZXIubmFtZV07XG4gICAgICAgICAgICAgICAgIHZhciBlZGl0aW9uTGF5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgICBpZiggJ2VkaXRpb25MYXllcnMnIGluIGNvbmZpZyApIHtcbiAgICAgICAgICAgICAgICAgICAgIGVkaXRpb25MYXllciA9IGNvbmZpZy5lZGl0aW9uTGF5ZXJzW3FnaXNOYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgIGlmICggIWVkaXRpb25MYXllciApXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0aW9uTGF5ZXIgPSBjb25maWcuZWRpdGlvbkxheWVyc1tsYXllci5wYXJhbXNbJ0xBWUVSUyddXTtcbiAgICAgICAgICAgICAgICAgICAgIGlmICggIWVkaXRpb25MYXllciApXG4gICAgICAgICAgICAgICAgICAgICAgICBlZGl0aW9uTGF5ZXIgPSBjb25maWcuZWRpdGlvbkxheWVyc1tsYXllci5uYW1lXTtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBpZiggKGNvbmZpZ0xheWVyICYmIGNvbmZpZ0xheWVyLnBvcHVwICYmIGNvbmZpZ0xheWVyLnBvcHVwID09ICdUcnVlJylcbiAgICAgICAgICAgICAgICAgIHx8IChlZGl0aW9uTGF5ZXIgJiYgKCBlZGl0aW9uTGF5ZXIuY2FwYWJpbGl0aWVzLm1vZGlmeUdlb21ldHJ5ID09ICdUcnVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGVkaXRpb25MYXllci5jYXBhYmlsaXRpZXMubW9kaWZ5QXR0cmlidXRlID09ICdUcnVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGVkaXRpb25MYXllci5jYXBhYmlsaXRpZXMuZGVsZXRlRmVhdHVyZSA9PSAnVHJ1ZScpICkgKXtcbiAgICAgICAgICAgICAgICAgICAgdXJsID0gT3BlbkxheWVycy5VdGlsLmlzQXJyYXkobGF5ZXIudXJsKSA/IGxheWVyLnVybFswXSA6IGxheWVyLnVybDtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgdGhlIGNvbnRyb2wgd2FzIG5vdCBjb25maWd1cmVkIHdpdGggYSB1cmwsIHNldCBpdFxuICAgICAgICAgICAgICAgICAgICAvLyB0byB0aGUgZmlyc3QgbGF5ZXIgdXJsXG4gICAgICAgICAgICAgICAgICAgIGlmKHRoaXMuZHJpbGxEb3duID09PSBmYWxzZSAmJiAhdGhpcy51cmwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXJsID0gdXJsO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzLnB1c2gobGF5ZXIpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoICdwb3B1cE1heEZlYXR1cmVzJyBpbiBjb25maWdMYXllciAmJiAhaXNOYU4ocGFyc2VJbnQoY29uZmlnTGF5ZXIucG9wdXBNYXhGZWF0dXJlcykpIClcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEZlYXR1cmVzICs9IHBhcnNlSW50KGNvbmZpZ0xheWVyLnBvcHVwTWF4RmVhdHVyZXMpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhGZWF0dXJlcyArPSAxMDtcbiAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMubWF4RmVhdHVyZXMgPSBtYXhGZWF0dXJlcyA9PSAwID8gMTAgOiBtYXhGZWF0dXJlcztcbiAgICAgICAgcmV0dXJuIGxheWVycztcbiAgICAgfTtcbiAgICAgZnVuY3Rpb24gcmVmcmVzaEdldEZlYXR1cmVJbmZvKCBldnQgKSB7XG4gICAgICAgICBpZiAoICFldnQudXBkYXRlRHJhd2luZyApXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIGlmICggbGFzdExvbkxhdEluZm8gPT0gbnVsbCApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgdmFyIGxhc3RQeCA9IG1hcC5nZXRQaXhlbEZyb21Mb25MYXQobGFzdExvbkxhdEluZm8pO1xuICAgICAgICBpZiAoICQoJyNsaXpfbGF5ZXJfcG9wdXAgIGRpdi5saXptYXBQb3B1cENvbnRlbnQnKS5sZW5ndGggPCAxXG4gICAgICAgICAgJiYgJCgnI3BvcHVwY29udGVudCBkaXYubWVudS1jb250ZW50IGRpdi5saXptYXBQb3B1cENvbnRlbnQnKS5sZW5ndGggPCAxKVxuICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgIHZhciBwb3B1cENvbnRhaW5lcklkID0gXCJsaXpfbGF5ZXJfcG9wdXBcIjtcbiAgICAgICAgaWYgKCAkKCcjJytwb3B1cENvbnRhaW5lcklkKycgZGl2Lmxpem1hcFBvcHVwQ29udGVudCBpbnB1dC5saXptYXAtcG9wdXAtbGF5ZXItZmVhdHVyZS1pZCcpLmxlbmd0aCA9PSAwIClcbiAgICAgICAgICAgIHBvcHVwQ29udGFpbmVySWQgPSAncG9wdXBjb250ZW50JztcblxuICAgICAgICAvLyBSZWZyZXNoIGlmIG5lZWRlZFxuICAgICAgICB2YXIgcmVmcmVzaEluZm8gPSBmYWxzZTtcbiAgICAgICAgJCgnIycrcG9wdXBDb250YWluZXJJZCsnIGRpdi5saXptYXBQb3B1cENvbnRlbnQgaW5wdXQubGl6bWFwLXBvcHVwLWxheWVyLWZlYXR1cmUtaWQnKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICB2YXIgdmFsID0gc2VsZi52YWwoKTtcbiAgICAgICAgICAgIHZhciBlSHRtbCA9ICcnO1xuICAgICAgICAgICAgdmFyIGZpZCA9IHZhbC5zcGxpdCgnLicpLnBvcCgpO1xuICAgICAgICAgICAgdmFyIGxheWVySWQgPSB2YWwucmVwbGFjZSggJy4nICsgZmlkLCAnJyApO1xuICAgICAgICAgICAgdmFyIGFDb25maWcgPSBsaXpNYXAuZ2V0TGF5ZXJDb25maWdCeUlkKCBsYXllcklkICk7XG4gICAgICAgICAgICBpZiAoIGFDb25maWcgJiYgYUNvbmZpZ1swXSA9PSBldnQuZmVhdHVyZVR5cGUgKSB7XG4gICAgICAgICAgICAgICAgcmVmcmVzaEluZm8gPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICggcmVmcmVzaEluZm8gICkge1xuICAgICAgICAgICAgLy9sYXN0TG9uTGF0SW5mbyA9IG51bGw7XG4gICAgICAgICAgICAkKCcjJytwb3B1cENvbnRhaW5lcklkKycgZGl2Lmxpem1hcFBvcHVwQ29udGVudCBpbnB1dC5saXptYXAtcG9wdXAtbGF5ZXItZmVhdHVyZS1pZFt2YWx1ZT1cIicrZXZ0LmxheWVySWQrJy4nK2V2dC5mZWF0dXJlSWQrJ1wiXScpLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgICAgICAgaW5mby5yZXF1ZXN0KCBsYXN0UHgsIHt9ICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuO1xuICAgICB9XG4gICAgIGxpek1hcC5ldmVudHMub24oe1xuICAgICAgICBcImxheWVyRmlsdGVyUGFyYW1DaGFuZ2VkXCI6IGZ1bmN0aW9uKCBldnQgKSB7XG4gICAgICAgICAgICB2YXIgZmlsdGVyID0gW107XG4gICAgICAgICAgICBmb3IgKCB2YXIgIGxOYW1lIGluIGNvbmZpZy5sYXllcnMgKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxDb25maWcgPSBjb25maWcubGF5ZXJzW2xOYW1lXTtcbiAgICAgICAgICAgICAgICBpZiAoIGxDb25maWcucG9wdXAgIT0gJ1RydWUnIClcbiAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAgICAgaWYgKCAhKCdyZXF1ZXN0X3BhcmFtcycgaW4gbENvbmZpZylcbiAgICAgICAgICAgICAgICAgIHx8IGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ10gPT0gbnVsbCApXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIHZhciByZXF1ZXN0UGFyYW1zID0gbENvbmZpZ1sncmVxdWVzdF9wYXJhbXMnXTtcbiAgICAgICAgICAgICAgICBpZiAoICgnZmlsdGVyJyBpbiBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddKVxuICAgICAgICAgICAgICAgICAgJiYgbENvbmZpZ1sncmVxdWVzdF9wYXJhbXMnXVsnZmlsdGVyJ10gIT0gbnVsbFxuICAgICAgICAgICAgICAgICAgJiYgbENvbmZpZ1sncmVxdWVzdF9wYXJhbXMnXVsnZmlsdGVyJ10gIT0gXCJcIiApIHtcblxuICAgICAgICAgICAgICAgICAgICAvLyBHZXQgZmlsdGVyIHRva2VuXG4gICAgICAgICAgICAgICAgICAgIHZhciBzdXJsID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChsaXpVcmxzLndtc1xuICAgICAgICAgICAgICAgICAgICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBzZGF0YSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlcnZpY2U6ICdXTVMnLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVxdWVzdDogJ0dFVEZJTFRFUlRPS0VOJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVuYW1lOiBsTmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcjogbENvbmZpZ1sncmVxdWVzdF9wYXJhbXMnXVsnZmlsdGVyJ11cbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgJC5wb3N0KHN1cmwsIHNkYXRhLCBmdW5jdGlvbihyZXN1bHQpe1xuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnB1c2gocmVzdWx0LnRva2VuKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8udmVuZG9yUGFyYW1zWydmaWx0ZXJ0b2tlbiddID0gZmlsdGVyLmpvaW4oJzsnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGluZm8udmVuZG9yUGFyYW1zWydmaWx0ZXInXSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZyZXNoR2V0RmVhdHVyZUluZm8oZXZ0KTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgaW5mby52ZW5kb3JQYXJhbXNbJ2ZpbHRlcnRva2VuJ10gPSByZXF1ZXN0UGFyYW1zWydmaWx0ZXJ0b2tlbiddO1xuICAgICAgICAgICAgICAgICAgICAgIGluZm8udmVuZG9yUGFyYW1zWydmaWx0ZXInXSA9IHJlcXVlc3RQYXJhbXNbJ2ZpbHRlciddO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgXCJsYXllclNlbGVjdGlvbkNoYW5nZWRcIjogZnVuY3Rpb24oIGV2dCApIHtcbiAgICAgICAgICAgIHJlZnJlc2hHZXRGZWF0dXJlSW5mbyhldnQpO1xuICAgICAgICB9LFxuICAgICAgICBcImxpem1hcGVkaXRpb25mZWF0dXJlZGVsZXRlZFwiOiBmdW5jdGlvbiggZXZ0ICkge1xuICAgICAgICAgICAgaWYgKCAkKCdkaXYubGl6bWFwUG9wdXBDb250ZW50IGlucHV0Lmxpem1hcC1wb3B1cC1sYXllci1mZWF0dXJlLWlkJykubGVuZ3RoID4gMSApIHtcbiAgICAgICAgICAgICAgICByZWZyZXNoR2V0RmVhdHVyZUluZm8oZXZ0KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG1hcC5wb3B1cHMubGVuZ3RoICE9IDApXG4gICAgICAgICAgICAgICAgICAgIG1hcC5yZW1vdmVQb3B1cChtYXAucG9wdXBzWzBdKTtcblxuICAgICAgICAgICAgICAgIGlmKCAncG9wdXBMb2NhdGlvbicgaW4gY29uZmlnLm9wdGlvbnMgJiYgY29uZmlnLm9wdGlvbnMucG9wdXBMb2NhdGlvbiAhPSAnbWFwJyApe1xuICAgICAgICAgICAgICAgICAgICB2YXIgcGNvbnRlbnQgPSAnPGRpdiBjbGFzcz1cImxpem1hcFBvcHVwQ29udGVudFwiPjxoND4nK2xpekRpY3RbJ3BvcHVwLm1zZy5uby5yZXN1bHQnXSsnPC9oND48L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAkKCcjcG9wdXBjb250ZW50IGRpdi5tZW51LWNvbnRlbnQnKS5odG1sKHBjb250ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS5wb3B1cGNvbnRlbnQnKS5oYXNDbGFzcygnYWN0aXZlJykgKVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2J1dHRvbi1wb3B1cGNvbnRlbnQnKS5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoICEkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS5wb3B1cGNvbnRlbnQnKS5oYXNDbGFzcygnYWN0aXZlJykgKVxuICAgICAgICAgICAgICAgICAgICAgICAgJCgnI21hcG1lbnUgLm5hdi1saXN0ID4gbGkucG9wdXBjb250ZW50JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICB9KTtcbiAgICAgbWFwLmFkZENvbnRyb2woaW5mbyk7XG4gICAgIGluZm8uYWN0aXZhdGUoKTtcbiAgICAgcmV0dXJuIGluZm87XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQcmludFNjYWxlKCBhU2NhbGVzICkge1xuICAgICAgdmFyIG5ld1NjYWxlcyA9IFtdO1xuICAgICAgZm9yICggdmFyIGk9MCwgbGVuID0gYVNjYWxlcy5sZW5ndGg7IGk8bGVuOyBpKysgKSB7XG4gICAgICAgICAgbmV3U2NhbGVzLnB1c2goIHBhcnNlRmxvYXQoYVNjYWxlc1tpXSkgKTtcbiAgICAgIH1cbiAgICAgIG5ld1NjYWxlcy5zb3J0KGZ1bmN0aW9uKGEsYil7cmV0dXJuIGItYTt9KTtcbiAgICB2YXIgc2NhbGUgPSBtYXAuZ2V0U2NhbGUoKTtcbiAgdmFyIHNjYWxlSWR4ID0gJC5pbkFycmF5KCBzY2FsZSwgbmV3U2NhbGVzICk7XG4gICAgaWYgKCBzY2FsZUlkeCA9PSAtMSApIHtcbiAgICB2YXIgcz0wLCBzbGVuPW5ld1NjYWxlcy5sZW5ndGg7XG4gICAgd2hpbGUgKCBzY2FsZUlkeCA9PSAtMSAmJiBzPHNsZW4gKSB7XG4gICAgICBpZiAoIHNjYWxlID4gbmV3U2NhbGVzW3NdIClcbiAgICAgICAgc2NhbGVJZHggPSBzO1xuICAgICAgZWxzZVxuICAgICAgIHMrKztcbiAgICB9XG4gICAgaWYoIHMgPT0gc2xlbiApIHtcbiAgICAgIHNjYWxlID0gbmV3U2NhbGVzW3NsZW4tMV07XG4gICAgfSBlbHNlIHtcbiAgICAgIHNjYWxlID0gbmV3U2NhbGVzW3NjYWxlSWR4XTtcbiAgICB9XG4gICAgfVxuICAgIHJldHVybiBzY2FsZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdQcmludEJveCggYUxheW91dCwgYUxheWVyLCBhU2NhbGUgKSB7XG4gICAgdmFyIHNpemUgPSBhTGF5b3V0LnNpemU7XG4gICAgdmFyIHVuaXRzID0gbWFwLmdldFVuaXRzKCk7XG4gICAgdmFyIHVuaXRzUmF0aW8gPSBPcGVuTGF5ZXJzLklOQ0hFU19QRVJfVU5JVFt1bml0c107XG4gICAgdmFyIHcgPSBzaXplLndpZHRoIC8gNzIgLyB1bml0c1JhdGlvICogYVNjYWxlIC8gMjtcbiAgICB2YXIgaCA9IHNpemUuaGVpZ2h0IC8gNzIgLyB1bml0c1JhdGlvICogYVNjYWxlIC8gMjtcbiAgICBpZiAoIGFMYXllci5mZWF0dXJlcy5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgdmFyIGNlbnRlciA9IG1hcC5nZXRDZW50ZXIoKTtcbiAgICAgICAgdmFyIGJvdW5kcyA9IG5ldyBPcGVuTGF5ZXJzLkJvdW5kcyhjZW50ZXIubG9uIC0gdywgY2VudGVyLmxhdCAtIGgsXG4gICAgICAgICAgICBjZW50ZXIubG9uICsgdywgY2VudGVyLmxhdCArIGgpO1xuICAgICAgICB2YXIgZ2VvbSA9IGJvdW5kcy50b0dlb21ldHJ5KCk7XG4gICAgICAgIGFMYXllci5hZGRGZWF0dXJlcyhbXG4gICAgICAgICAgICBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvciggZ2VvbSApXG4gICAgICAgIF0pO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBmZWF0ID0gYUxheWVyLmZlYXR1cmVzWzBdO1xuICAgICAgICB2YXIgY2VudGVyID0gZmVhdC5nZW9tZXRyeS5nZXRCb3VuZHMoKS5nZXRDZW50ZXJMb25MYXQoKTtcbiAgICAgICAgdmFyIGJvdW5kcyA9IG5ldyBPcGVuTGF5ZXJzLkJvdW5kcyhjZW50ZXIubG9uIC0gdywgY2VudGVyLmxhdCAtIGgsXG4gICAgICAgICAgICBjZW50ZXIubG9uICsgdywgY2VudGVyLmxhdCArIGgpO1xuICAgICAgICB2YXIgZ2VvbSA9IGJvdW5kcy50b0dlb21ldHJ5KCk7XG4gICAgICAgIGdlb20uaWQgPSBmZWF0Lmdlb21ldHJ5LmlkO1xuICAgICAgICBmZWF0Lmdlb21ldHJ5ID0gZ2VvbTtcbiAgICAgICAgYUxheWVyLmRyYXdGZWF0dXJlKGZlYXQpO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFByaW50R3JpZEludGVydmFsKCBhTGF5b3V0LCBhU2NhbGUsIGFTY2FsZXMgKSB7XG4gICAgdmFyIHNpemUgPSBhTGF5b3V0LnNpemU7XG4gICAgdmFyIHVuaXRzID0gbWFwLmdldFVuaXRzKCk7XG4gICAgdmFyIHVuaXRzUmF0aW8gPSBPcGVuTGF5ZXJzLklOQ0hFU19QRVJfVU5JVFt1bml0c107XG4gICAgdmFyIHcgPSBzaXplLndpZHRoIC8gNzIgLyB1bml0c1JhdGlvICogYVNjYWxlO1xuICAgIHZhciBoID0gc2l6ZS5oZWlnaHQgLyA3MiAvIHVuaXRzUmF0aW8gKiBhU2NhbGU7XG5cbiAgICAgIHZhciByZWZTY2FsZSA9IHcgPiBoID8gdyA6IGg7XG4gICAgICB2YXIgbmV3U2NhbGVzID0gW107XG4gICAgICBmb3IgKCB2YXIgaT0wLCBsZW4gPSBhU2NhbGVzLmxlbmd0aDsgaTxsZW47IGkrKyApIHtcbiAgICAgICAgICBuZXdTY2FsZXMucHVzaCggcGFyc2VGbG9hdChhU2NhbGVzW2ldKSApO1xuICAgICAgfVxuICAgICAgbmV3U2NhbGVzLnNvcnQoZnVuY3Rpb24oYSxiKXtyZXR1cm4gYi1hO30pO1xuICAgICAgdmFyIHRoZVNjYWxlID0gbmV3U2NhbGVzWzBdO1xuICAgICAgZm9yICggdmFyIGk9MCwgbGVuPW5ld1NjYWxlcy5sZW5ndGg7IGk8bGVuOyBpKysgKSB7XG4gICAgICAgICAgdmFyIHMgPSBuZXdTY2FsZXNbaV07XG4gICAgICAgICAgaWYgKCBzID4gcmVmU2NhbGUgKVxuICAgICAgICAgICAgdGhlU2NhbGUgPSBzO1xuICAgICAgICAgIGlmICggcyA8IHJlZlNjYWxlIClcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRoZVNjYWxlLzEwO1xuICB9XG4gIGZ1bmN0aW9uIGFkZFByaW50Q29udHJvbCgpIHtcbiAgICBpZiAoICFjb25maWdbJ3ByaW50VGVtcGxhdGVzJ10gfHwgY29uZmlnLnByaW50VGVtcGxhdGVzLmxlbmd0aCA9PSAwICkge1xuICAgICAgJCgnI2J1dHRvbi1wcmludCcpLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIEZpbHRlcmluZyBwcmludCB0ZW1wbGF0ZXMgYnkgcmVtb3ZpbmcgYXRsYXMgb25lc1xuICAgIHZhciBwVGVtcGxhdGVzID0gW107XG4gICAgZm9yKCB2YXIgaT0wLCBsZW49Y29uZmlnLnByaW50VGVtcGxhdGVzLmxlbmd0aDsgaTxsZW47IGkrKyApe1xuICAgICAgICB2YXIgcFRlbXBsYXRlID0gY29uZmlnLnByaW50VGVtcGxhdGVzW2ldO1xuICAgICAgICBpZignYXRsYXMnIGluIHBUZW1wbGF0ZVxuICAgICAgICAgICYmICdlbmFibGVkJyBpbiBwVGVtcGxhdGUuYXRsYXNcbiAgICAgICAgICAmJiAocFRlbXBsYXRlLmF0bGFzLmVuYWJsZWQgPT09ICcxJyB8fCBwVGVtcGxhdGUuYXRsYXMuZW5hYmxlZCA9PT0gJ3RydWUnKSlcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBwVGVtcGxhdGVzLnB1c2gocFRlbXBsYXRlKTtcbiAgICB9XG4gICAgLy8gcmVtb3ZlIHByaW50IHRvb2wgaWYgb25seSBhdGxhcyBwcmludCBjb25maWd1cmVkXG4gICAgaWYgKCBwVGVtcGxhdGVzLmxlbmd0aCA9PSAwICkge1xuICAgICAgJCgnI2J1dHRvbi1wcmludCcpLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHZhciBwdFRvbW0gPSAwLjM1Mjc3OyAvL2NvbnZlcnNpb24gcHQgdG8gbW1cblxuICAgIHZhciBzY2FsZXMgPSBtYXAuc2NhbGVzO1xuICAgIGlmICggY29uZmlnLm9wdGlvbnMubWFwU2NhbGVzLmxlbmd0aCA+IDIgKVxuICAgICAgc2NhbGVzID0gY29uZmlnLm9wdGlvbnMubWFwU2NhbGVzO1xuICAgIGlmICggc2NhbGVzID09IG51bGwgJiYgbWFwLnJlc29sdXRpb25zICE9IG51bGwgKSB7XG4gICAgICBzY2FsZXMgPSBbXTtcbiAgICAgIGZvciggdmFyIGk9MCwgbGVuPW1hcC5yZXNvbHV0aW9ucy5sZW5ndGg7IGk8bGVuOyBpKysgKXtcbiAgICAgICAgdmFyIHVuaXRzID0gbWFwLmdldFVuaXRzKCk7XG4gICAgICAgIHZhciByZXMgPSBtYXAucmVzb2x1dGlvbnNbaV07XG4gICAgICAgIHZhciBzY2FsZSA9IE9wZW5MYXllcnMuVXRpbC5nZXRTY2FsZUZyb21SZXNvbHV0aW9uKHJlcywgdW5pdHMpO1xuICAgICAgICBzY2FsZXMucHVzaChzY2FsZSk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICggc2NhbGVzID09IG51bGwgKSB7XG4gICAgICAkKCcjYnV0dG9uLXByaW50JykucGFyZW50KCkucmVtb3ZlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICggc2NhbGVzWzBdIDwgc2NhbGVzW3NjYWxlcy5sZW5ndGgtMV0gKVxuICAgICAgc2NhbGVzLnJldmVyc2UoKTtcblxuICAgIHZhciBzY2FsZU9wdGlvbnMgPSAnJztcbiAgICBmb3IoIHZhciBpPTAsIGxlbj1zY2FsZXMubGVuZ3RoOyBpPGxlbjsgaSsrICl7XG4gICAgICAgIHZhciBzY2FsZSA9IHNjYWxlc1tpXTtcbiAgICAgICAgcHJpbnRDYXBhYmlsaXRpZXMuc2NhbGVzLnB1c2goc2NhbGUpO1xuICAgICAgICB2YXIgc2NhbGVUZXh0ID0gc2NhbGU7XG4gICAgICAgIGlmIChzY2FsZVRleHQgPiAxMClcbiAgICAgICAgICAgIHNjYWxlVGV4dCA9IE1hdGgucm91bmQoc2NhbGVUZXh0KVxuICAgICAgICBlbHNlXG4gICAgICAgICAgICBzY2FsZVRleHQgPSBNYXRoLnJvdW5kKHNjYWxlVGV4dCoxMDApLzEwMFxuICAgICAgICBzY2FsZVRleHQgPSBzY2FsZVRleHQudG9Mb2NhbGVTdHJpbmcoKVxuICAgICAgICBzY2FsZU9wdGlvbnMgKz0gJzxvcHRpb24gdmFsdWU9XCInK3NjYWxlKydcIj4nK3NjYWxlVGV4dCsnPC9vcHRpb24+JztcbiAgICB9XG4gICAgJCgnI3ByaW50LXNjYWxlJykuaHRtbChzY2FsZU9wdGlvbnMpO1xuXG4gICAgLy8gY3JlYXRpbmcgcHJpbnRDYXBhYmlsaXRpZXMgbGF5b3V0c1xuICAgIGZvciggdmFyIGk9MCwgbGVuPXBUZW1wbGF0ZXMubGVuZ3RoOyBpPGxlbjsgaSsrICl7XG4gICAgICB2YXIgcFRlbXBsYXRlID0gcFRlbXBsYXRlc1tpXTtcbiAgICAgIHZhciBwTWFwID0gbnVsbDtcbiAgICAgIHZhciBwTWFwSWR4ID0gMDtcbiAgICAgIHZhciBwT3ZlcnZpZXcgPSBudWxsO1xuICAgICAgd2hpbGUoIHBNYXAgPT0gbnVsbCAmJiBwTWFwSWR4IDwgcFRlbXBsYXRlLm1hcHMubGVuZ3RoKSB7XG4gICAgICAgIHBNYXAgPSBwVGVtcGxhdGUubWFwc1twTWFwSWR4XTtcbiAgICAgICAgaWYoIHBNYXBbJ292ZXJ2aWV3TWFwJ10gKSB7XG4gICAgICAgICAgcE92ZXJ2aWV3ID0gcFRlbXBsYXRlLm1hcHNbcE1hcElkeF07XG4gICAgICAgICAgcE1hcCA9IG51bGw7XG4gICAgICAgICAgcE1hcElkeCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIHBNYXAgPT0gbnVsbCApXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgdmFyIG1hcFdpZHRoID0gTnVtYmVyKHBNYXAud2lkdGgpIC8gcHRUb21tO1xuICAgICAgdmFyIG1hcEhlaWdodCA9IE51bWJlcihwTWFwLmhlaWdodCkgLyBwdFRvbW07XG4gICAgICAvL2ZvciBzb21lIHN0cmFuZ2UgcmVhc29uIHdlIG5lZWQgdG8gcHJvdmlkZSBhIFwibWFwXCIgYW5kIGEgXCJzaXplXCIgb2JqZWN0IHdpdGggaWRlbnRpY2FsIGNvbnRlbnRcbiAgICAgIHByaW50Q2FwYWJpbGl0aWVzLmxheW91dHMucHVzaCh7XG4gICAgICAgIFwibmFtZVwiOiBwVGVtcGxhdGUudGl0bGUsXG4gICAgICAgIFwibWFwXCI6IHtcbiAgICAgICAgICBcIndpZHRoXCI6IG1hcFdpZHRoLFxuICAgICAgICAgIFwiaGVpZ2h0XCI6IG1hcEhlaWdodFxuICAgICAgICB9LFxuICAgICAgICBcInNpemVcIjoge1xuICAgICAgICAgIFwid2lkdGhcIjogbWFwV2lkdGgsXG4gICAgICAgICAgXCJoZWlnaHRcIjogbWFwSGVpZ2h0XG4gICAgICAgIH0sXG4gICAgICAgIFwicm90YXRpb25cIjogZmFsc2UsXG4gICAgICAgIFwidGVtcGxhdGVcIjogcFRlbXBsYXRlLFxuICAgICAgICBcIm1hcElkXCI6IHBNYXAuaWQsXG4gICAgICAgIFwib3ZlcnZpZXdJZFwiOiBwT3ZlcnZpZXcgIT0gbnVsbCA/IHBPdmVydmlldy5pZCA6IG51bGwsXG4gICAgICAgIFwiZ3JpZFwiOiAoKCdncmlkJyBpbiBwTWFwKSAmJiBwTWFwLmdyaWQgPT0gXCJUcnVlXCIpXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBpZiBubyBwcmludENhcGFiaWxpdGllcyBsYXlvdXRzIHJlbW92ZWQgcHJpbnRcbiAgICBpZiggcHJpbnRDYXBhYmlsaXRpZXMubGF5b3V0cy5sZW5ndGggPT0gMCApIHtcbiAgICAgICQoJyNidXR0b24tcHJpbnQnKS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBjcmVhdGluZyB0aGUgcHJpbnQgbGF5ZXJcbiAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKCdQcmludCcpO1xuICAgIGlmICggbGF5ZXIubGVuZ3RoID09IDAgKSB7XG4gICAgICBsYXllciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcignUHJpbnQnLHtcbiAgICAgICAgc3R5bGVNYXA6IG5ldyBPcGVuTGF5ZXJzLlN0eWxlTWFwKHtcbiAgICAgICAgICBcImRlZmF1bHRcIjogbmV3IE9wZW5MYXllcnMuU3R5bGUoe1xuICAgICAgICAgICAgZmlsbENvbG9yOiBcIiNENDNCMTlcIixcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAwLjIsXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogXCIjQ0UxRjJEXCIsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMVxuICAgICAgICAgIH0pXG4gICAgICAgIH0pXG4gICAgICB9KTtcbiAgICAgIG1hcC5hZGRMYXllcihsYXllcik7XG4gICAgICBsYXllci5zZXRWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICB9IGVsc2VcbiAgICAgIGxheWVyID0gbGF5ZXJbMF07XG5cbiAgICAvLyBjcmVhdGluZyBwcmludCBtZW51XG4gICAgZm9yKCB2YXIgaT0wLCBsZW49IHByaW50Q2FwYWJpbGl0aWVzLmxheW91dHMubGVuZ3RoOyBpPGxlbjsgaSsrICl7XG4gICAgICB2YXIgbGF5b3V0ID0gcHJpbnRDYXBhYmlsaXRpZXMubGF5b3V0c1tpXTtcbiAgICAgICQoJyNwcmludC10ZW1wbGF0ZScpLmFwcGVuZCgnPG9wdGlvbiB2YWx1ZT1cIicraSsnXCI+JytsYXlvdXQubmFtZSsnPC9vcHRpb24+Jyk7XG4gICAgfVxuXG4gICAgdmFyIGRyYWdDdHJsID0gbmV3IE9wZW5MYXllcnMuQ29udHJvbC5EcmFnRmVhdHVyZShsYXllcix7XG4gICAgICBnZW9tZXRyeVR5cGVzOiBbJ09wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbiddLFxuICAgICAgdHlwZTpPcGVuTGF5ZXJzLkNvbnRyb2wuVFlQRV9UT09MLFxuICAgICAgbGF5b3V0OiBudWxsLFxuICAgICAgZXZlbnRMaXN0ZW5lcnM6IHtcbiAgICAgICAgXCJhY3RpdmF0ZVwiOiBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICBpZiAodGhpcy5sYXlvdXQgPT0gbnVsbClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgICAgIGRlYWN0aXZhdGVUb29sQ29udHJvbHMoZXZ0KTtcblxuICAgICAgICAgIHZhciBsYXlvdXQgPSB0aGlzLmxheW91dDtcbiAgICAgICAgICAvLyBnZXQgcHJpbnQgc2NhbGVcbiAgICAgICAgICB2YXIgc2NhbGUgPSBnZXRQcmludFNjYWxlKCBwcmludENhcGFiaWxpdGllcy5zY2FsZXMgKTtcbiAgICAgICAgICAvLyB1cGRhdGUgdGhlIHNlbGVjdFxuICAgICAgICAgICQoJyNwcmludC1zY2FsZScpLnZhbChzY2FsZSk7XG4gICAgICAgICAgLy8gZHJhdyBwcmludCBib3hcbiAgICAgICAgICBkcmF3UHJpbnRCb3goIGxheW91dCwgbGF5ZXIsIHNjYWxlICk7XG5cbiAgICAgICAgICBtQWRkTWVzc2FnZShsaXpEaWN0WydwcmludC5hY3RpdmF0ZSddLCdpbmZvJyx0cnVlKS5hZGRDbGFzcygncHJpbnQnKTtcbiAgICAgICAgICBsYXllci5zZXRWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgICB9LFxuICAgICAgICBcImRlYWN0aXZhdGVcIjogZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgbGF5ZXIuc2V0VmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICAgICAgJCgnI21lc3NhZ2UgLnByaW50JykucmVtb3ZlKCk7XG4gICAgICAgICAgdGhpcy5sYXlvdXQgPSBudWxsO1xuICAgICAgICAgIGxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgbWFwLmFkZENvbnRyb2xzKFtkcmFnQ3RybF0pO1xuICAgIGNvbnRyb2xzWydwcmludERyYWcnXSA9IGRyYWdDdHJsO1xuXG4gICAgLy8gc2V0IGV2ZW50IGxpc3RlbmVyIHRvIGJ1dHRvbi1wcmludFxuICAgICQoJyNwcmludC10ZW1wbGF0ZScpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgIHZhciBsYXlvdXQgPSBwcmludENhcGFiaWxpdGllcy5sYXlvdXRzW3BhcnNlSW50KCBzZWxmLnZhbCgpICldO1xuICAgICAgaWYgKCBsYXlvdXQudGVtcGxhdGUubGFiZWxzLmxlbmd0aCAhPSAwICkge1xuICAgICAgICB2YXIgbGFiZWxzID0gJyc7XG4gICAgICAgIGZvciAodmFyIGk9MCwgbGVuPWxheW91dC50ZW1wbGF0ZS5sYWJlbHMubGVuZ3RoOyBpPGxlbjsgaSsrKXtcbiAgICAgICAgICB2YXIgdExhYmVsID0gbGF5b3V0LnRlbXBsYXRlLmxhYmVsc1tpXTtcbiAgICAgICAgICB2YXIgbGFiZWwgPSAnJztcbiAgICAgICAgICBpZiAodExhYmVsLmh0bWxTdGF0ZSA9PSAwKSB7XG4gICAgICAgICAgICBsYWJlbCA9ICc8aW5wdXQgdHlwZT1cInRleHRcIiBuYW1lPVwiJyt0TGFiZWwuaWQrJ1wiIGNsYXNzPVwicHJpbnQtbGFiZWxcIiBwbGFjZWhvbGRlcj1cIicrdExhYmVsLnRleHQrJ1wiIHZhbHVlPVwiJyt0TGFiZWwudGV4dCsnXCI+PGJyPidcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFiZWwgPSAnPHRleHRhcmVhIG5hbWU9XCInK3RMYWJlbC5pZCsnXCIgY2xhc3M9XCJwcmludC1sYWJlbFwiIHBsYWNlaG9sZGVyPVwiJyt0TGFiZWwudGV4dCsnXCI+Jyt0TGFiZWwudGV4dCsnPC90ZXh0YXJlYT48YnI+J1xuICAgICAgICAgIH1cbiAgICAgICAgICBsYWJlbHMgKz0gbGFiZWw7XG4gICAgICAgIH1cbiAgICAgICAgJCgnI3ByaW50IC5wcmludC1sYWJlbHMnKS5odG1sKGxhYmVscyk7XG4gICAgICAgICQoJyNwcmludCAucHJpbnQtbGFiZWxzJykuc2hvdygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnI3ByaW50IC5wcmludC1sYWJlbHMnKS5odG1sKCcnKTtcbiAgICAgICAgJCgnI3ByaW50IC5wcmludC1sYWJlbHMnKS5oaWRlKCk7XG4gICAgICB9XG4gICAgICB1cGRhdGVNaW5pRG9ja1NpemUoKTtcbiAgICAgIGlmIChkcmFnQ3RybC5hY3RpdmUpIHtcbiAgICAgICAgZHJhZ0N0cmwuZGVhY3RpdmF0ZSgpO1xuICAgICAgICBkcmFnQ3RybC5sYXlvdXQgPSBsYXlvdXQ7XG4gICAgICAgIGRyYWdDdHJsLmFjdGl2YXRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkcmFnQ3RybC5sYXlvdXQgPSBsYXlvdXQ7XG4gICAgICAgIGRyYWdDdHJsLmFjdGl2YXRlKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG5cbiAgICAkKCcjcHJpbnQgYnV0dG9uLmJ0bi1wcmludC1jbGVhcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgJCgnI2J1dHRvbi1wcmludCcpLmNsaWNrKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnI3ByaW50LXNjYWxlJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKCBkcmFnQ3RybC5hY3RpdmUgJiYgbGF5ZXIuZ2V0VmlzaWJpbGl0eSgpICkge1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciBzY2FsZSA9IHBhcnNlRmxvYXQoc2VsZi52YWwoKSk7XG4gICAgICAgIC8vIGRyYXcgcHJpbnQgYm94XG4gICAgICAgIGRyYXdQcmludEJveCggZHJhZ0N0cmwubGF5b3V0LCBsYXllciwgc2NhbGUgKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAkKCcjcHJpbnQtbGF1bmNoJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgcFRlbXBsYXRlID0gZHJhZ0N0cmwubGF5b3V0LnRlbXBsYXRlO1xuICAgICAgdmFyIHBUYWJsZVZlY3RvckxheWVycyA9IFtdO1xuICAgICAgaWYoICd0YWJsZXMnIGluIHBUZW1wbGF0ZSApXG4gICAgICAgICAgcFRhYmxlVmVjdG9yTGF5ZXJzID0gJC5tYXAoIHBUZW1wbGF0ZS50YWJsZXMsIGZ1bmN0aW9uKCB0ICl7XG4gICAgICAgICAgICAgIGlmKCB0LmNvbXBvc2VyTWFwID09IC0xIHx8ICgnbWFwJyt0LmNvbXBvc2VyTWFwKSA9PSBkcmFnQ3RybC5sYXlvdXQubWFwSWQgKVxuICAgICAgICAgICAgICAgIHJldHVybiB0LnZlY3RvckxheWVyO1xuICAgICAgICAgIH0pO1xuICAgICAgLy8gUHJpbnQgRXh0ZW50XG4gICAgICB2YXIgZXh0ZW50ID0gZHJhZ0N0cmwubGF5ZXIuZmVhdHVyZXNbMF0uZ2VvbWV0cnkuZ2V0Qm91bmRzKCk7XG5cbiAgICAgIC8vIFByb2plY3Rpb24gY29kZSBhbmQgcmV2ZXJzZUF4aXNPcmRlclxuICAgICAgdmFyIHByb2pDb2RlID0gbWFwLnByb2plY3Rpb24uZ2V0Q29kZSgpO1xuICAgICAgdmFyIHJldmVyc2VBeGlzT3JkZXIgPSAoT3BlbkxheWVycy5Qcm9qZWN0aW9uLmRlZmF1bHRzW3Byb2pDb2RlXSAmJiBPcGVuTGF5ZXJzLlByb2plY3Rpb24uZGVmYXVsdHNbcHJvakNvZGVdLnl4KTtcblxuICAgICAgLy8gQnVpbGQgVVJMXG4gICAgICB2YXIgdXJsID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChsaXpVcmxzLndtc1xuICAgICAgICAgICxPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVyU3RyaW5nKGxpelVybHMucGFyYW1zKVxuICAgICAgICAgICk7XG4gICAgICB1cmwgKz0gJyZTRVJWSUNFPVdNUyc7XG4gICAgICB1cmwgKz0gJyZWRVJTSU9OPTEuMy4wJlJFUVVFU1Q9R2V0UHJpbnQnO1xuICAgICAgdXJsICs9ICcmRk9STUFUPScrJCgnI3ByaW50LWZvcm1hdCcpLnZhbCgpO1xuICAgICAgdXJsICs9ICcmRVhDRVBUSU9OUz1hcHBsaWNhdGlvbi92bmQub2djLnNlX2luaW1hZ2UmVFJBTlNQQVJFTlQ9dHJ1ZSc7XG4gICAgICB1cmwgKz0gJyZTUlM9Jytwcm9qQ29kZTtcbiAgICAgIHVybCArPSAnJkRQST0nKyQoJyNwcmludC1kcGknKS52YWwoKTtcbiAgICAgIHVybCArPSAnJlRFTVBMQVRFPScrcFRlbXBsYXRlLnRpdGxlO1xuICAgICAgdXJsICs9ICcmJytkcmFnQ3RybC5sYXlvdXQubWFwSWQrJzpleHRlbnQ9JytleHRlbnQudG9CQk9YKG51bGwsIHJldmVyc2VBeGlzT3JkZXIpO1xuICAgICAgdmFyIHNjYWxlID0gJCgnI3ByaW50LXNjYWxlJykudmFsKCk7XG4gICAgICB1cmwgKz0gJyYnK2RyYWdDdHJsLmxheW91dC5tYXBJZCsnOnNjYWxlPScrc2NhbGU7XG4gICAgICBpZiAoICdncmlkJyBpbiBkcmFnQ3RybC5sYXlvdXQgJiYgZHJhZ0N0cmwubGF5b3V0LmdyaWQgKSB7XG4gICAgICAgICAgdmFyIGdyaWRJbnRlcnZhbCA9IGdldFByaW50R3JpZEludGVydmFsKCBkcmFnQ3RybC5sYXlvdXQsIHBhcnNlRmxvYXQoc2NhbGUpLCBwcmludENhcGFiaWxpdGllcy5zY2FsZXMgKTtcbiAgICAgICAgICB1cmwgKz0gJyYnK2RyYWdDdHJsLmxheW91dC5tYXBJZCsnOmdyaWRfaW50ZXJ2YWxfeD0nK2dyaWRJbnRlcnZhbDtcbiAgICAgICAgICB1cmwgKz0gJyYnK2RyYWdDdHJsLmxheW91dC5tYXBJZCsnOmdyaWRfaW50ZXJ2YWxfeT0nK2dyaWRJbnRlcnZhbDtcbiAgICAgIH1cbiAgICAgIHZhciBwcmludExheWVycyA9IFtdO1xuICAgICAgdmFyIHN0eWxlTGF5ZXJzID0gW107XG4gICAgICB2YXIgb3BhY2l0eUxheWVycyA9IFtdO1xuICAgICAgJC5lYWNoKG1hcC5sYXllcnMsIGZ1bmN0aW9uKGksIGwpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgbCBpbnN0YW5jZW9mIE9wZW5MYXllcnMuTGF5ZXIuV01TXG4gICAgICAgICAgICB8fCAoIGwgaW5zdGFuY2VvZiBPcGVuTGF5ZXJzLkxheWVyLldNVFMgJiYgIShsLm5hbWUubGFzdEluZGV4T2YoJ2lnbicsIDApID09PSAwICkgKVxuICAgICAgICApe1xuICAgICAgICAgICAgaWYoIGwuZ2V0VmlzaWJpbGl0eSgpICkge1xuICAgICAgICAgICAgICAvLyBBZGQgbGF5ZXIgdG8gdGhlIGxpc3Qgb2YgcHJpbnRlZCBsYXllcnNcbiAgICAgICAgICAgICAgcHJpbnRMYXllcnMucHVzaChsLnBhcmFtc1snTEFZRVJTJ10pO1xuICAgICAgICAgICAgICAvLyBPcHRpb25uYWx5IGFkZCBsYXllciBzdHlsZSBpZiBuZWVkZWQgKHNhbWUgb3JkZXIgYXMgbGF5ZXJzIClcbiAgICAgICAgICAgICAgdmFyIGxzdCA9ICdkZWZhdWx0JztcbiAgICAgICAgICAgICAgaWYgKCAncWdpc1NlcnZlclZlcnNpb24nIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnFnaXNTZXJ2ZXJWZXJzaW9uLnN0YXJ0c1dpdGgoJzMuJykgKSB7XG4gICAgICAgICAgICAgICAgICBsc3QgPSAnJztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpZiggJ1NUWUxFUycgaW4gbC5wYXJhbXMgJiYgbC5wYXJhbXNbJ1NUWUxFUyddLmxlbmd0aCA+IDAgKVxuICAgICAgICAgICAgICAgIGxzdCA9IGwucGFyYW1zWydTVFlMRVMnXTtcbiAgICAgICAgICAgICAgc3R5bGVMYXllcnMucHVzaCggbHN0ICk7XG4gICAgICAgICAgICAgIG9wYWNpdHlMYXllcnMucHVzaChwYXJzZUludCgyNTUqbC5vcGFjaXR5KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBwcmludExheWVycy5yZXZlcnNlKCk7XG4gICAgICBzdHlsZUxheWVycy5yZXZlcnNlKCk7XG4gICAgICBvcGFjaXR5TGF5ZXJzLnJldmVyc2UoKTtcblxuICAgICAgLy8gR2V0IGFjdGl2ZSBiYXNlbGF5ZXIsIGFuZCBhZGQgdGhlIGNvcnJlc3BvbmRpbmcgUUdJUyBsYXllciBpZiBuZWVkZWRcbiAgICAgIHZhciBhY3RpdmVCYXNlTGF5ZXJOYW1lID0gbWFwLmJhc2VMYXllci5uYW1lO1xuICAgICAgaWYgKCBhY3RpdmVCYXNlTGF5ZXJOYW1lIGluIGV4dGVybmFsQmFzZWxheWVyc1JlcGxhY2VtZW50ICkge1xuICAgICAgICB2YXIgZXhibCA9IGV4dGVybmFsQmFzZWxheWVyc1JlcGxhY2VtZW50W2FjdGl2ZUJhc2VMYXllck5hbWVdO1xuICAgICAgICBpZiggZXhibCBpbiBjb25maWcubGF5ZXJzICkge1xuICAgICAgICAgICAgdmFyIGFjdGl2ZUJhc2VMYXllckNvbmZpZyA9IGNvbmZpZy5sYXllcnNbZXhibF07XG4gICAgICAgICAgICBpZiAoICdpZCcgaW4gYWN0aXZlQmFzZUxheWVyQ29uZmlnICYmICd1c2VMYXllcklEcycgaW4gY29uZmlnLm9wdGlvbnMgJiYgY29uZmlnLm9wdGlvbnMudXNlTGF5ZXJJRHMgPT0gJ1RydWUnICl7XG4gICAgICAgICAgICAgICAgcHJpbnRMYXllcnMucHVzaChhY3RpdmVCYXNlTGF5ZXJDb25maWcuaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZXtcbiAgICAgICAgICAgICAgICBwcmludExheWVycy5wdXNoKGV4YmwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCAncWdpc1NlcnZlclZlcnNpb24nIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnFnaXNTZXJ2ZXJWZXJzaW9uLnN0YXJ0c1dpdGgoJzMuJykgKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVMYXllcnMucHVzaCgnJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0eWxlTGF5ZXJzLnB1c2goJ2RlZmF1bHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wYWNpdHlMYXllcnMucHVzaCgyNTUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCB0YWJsZSB2ZWN0b3IgbGF5ZXIgd2l0aG91dCBnZW9tXG4gICAgICBpZiggcFRhYmxlVmVjdG9yTGF5ZXJzLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgJC5lYWNoKCBwVGFibGVWZWN0b3JMYXllcnMsIGZ1bmN0aW9uKCBpLCBsYXllcklkICl7XG4gICAgICAgICAgICAgIHZhciBhQ29uZmlnID0gZ2V0TGF5ZXJDb25maWdCeUlkKCBsYXllcklkICk7XG4gICAgICAgICAgICAgIGlmKCBhQ29uZmlnICkge1xuICAgICAgICAgICAgICAgICAgdmFyIGxheWVyTmFtZSA9IGFDb25maWdbMF07XG4gICAgICAgICAgICAgICAgICB2YXIgbGF5ZXJDb25maWcgPSBhQ29uZmlnWzFdO1xuICAgICAgICAgICAgICAgICAgaWYoICggbGF5ZXJDb25maWcuZ2VvbWV0cnlUeXBlID09IFwibm9uZVwiIHx8IGxheWVyQ29uZmlnLmdlb21ldHJ5VHlwZSA9PSBcInVua25vd25cIiB8fCBsYXllckNvbmZpZy5nZW9tZXRyeVR5cGUgPT0gXCJcIiApICkge1xuICAgICAgICAgICAgICAgICAgICAgIGlmICggJ3Nob3J0bmFtZScgaW4gbGF5ZXJDb25maWcgJiYgbGF5ZXJDb25maWcuc2hvcnRuYW1lICE9ICcnIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnRMYXllcnMucHVzaChsYXllckNvbmZpZy5zaG9ydG5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcHJpbnRMYXllcnMucHVzaChsYXllckNvbmZpZy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoICdxZ2lzU2VydmVyVmVyc2lvbicgaW4gY29uZmlnLm9wdGlvbnMgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpZy5vcHRpb25zLnFnaXNTZXJ2ZXJWZXJzaW9uLnN0YXJ0c1dpdGgoJzMuJykgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZUxheWVycy5wdXNoKCcnKTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVMYXllcnMucHVzaCgnZGVmYXVsdCcpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5TGF5ZXJzLnB1c2goMjU1KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoICdxZ2lzU2VydmVyVmVyc2lvbicgaW4gY29uZmlnLm9wdGlvbnMgJiYgY29uZmlnLm9wdGlvbnMucWdpc1NlcnZlclZlcnNpb24gIT0gJzIuMTQnICkge1xuICAgICAgICBwcmludExheWVycy5yZXZlcnNlKCk7XG4gICAgICAgIHN0eWxlTGF5ZXJzLnJldmVyc2UoKTtcbiAgICAgICAgb3BhY2l0eUxheWVycy5yZXZlcnNlKCk7XG4gICAgICB9XG5cbiAgICAgIHVybCArPSAnJicrZHJhZ0N0cmwubGF5b3V0Lm1hcElkKyc6TEFZRVJTPScrcHJpbnRMYXllcnMuam9pbignLCcpO1xuICAgICAgdXJsICs9ICcmJytkcmFnQ3RybC5sYXlvdXQubWFwSWQrJzpTVFlMRVM9JytzdHlsZUxheWVycy5qb2luKCcsJyk7XG5cbiAgICAgIGlmICggZHJhZ0N0cmwubGF5b3V0Lm92ZXJ2aWV3SWQgIT0gbnVsbFxuICAgICAgICAgICYmIGNvbmZpZy5vcHRpb25zLmhhc092ZXJ2aWV3ICkge1xuICAgICAgICB2YXIgYmJveCA9IGNvbmZpZy5vcHRpb25zLmJib3g7XG4gICAgICAgIHZhciBvRXh0ZW50ID0gbmV3IE9wZW5MYXllcnMuQm91bmRzKE51bWJlcihiYm94WzBdKSxOdW1iZXIoYmJveFsxXSksTnVtYmVyKGJib3hbMl0pLE51bWJlcihiYm94WzNdKSk7XG4gICAgICAgIHVybCArPSAnJicrZHJhZ0N0cmwubGF5b3V0Lm92ZXJ2aWV3SWQrJzpleHRlbnQ9JytvRXh0ZW50O1xuICAgICAgICB1cmwgKz0gJyYnK2RyYWdDdHJsLmxheW91dC5vdmVydmlld0lkKyc6TEFZRVJTPU92ZXJ2aWV3JztcbiAgICAgICAgaWYgKCAncWdpc1NlcnZlclZlcnNpb24nIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnFnaXNTZXJ2ZXJWZXJzaW9uICE9ICcyLjE0JyApIHtcbiAgICAgICAgICAgIHByaW50TGF5ZXJzLnB1c2goJ092ZXJ2aWV3Jyk7XG4gICAgICAgICAgICBpZiAoIGNvbmZpZy5vcHRpb25zLnFnaXNTZXJ2ZXJWZXJzaW9uLnN0YXJ0c1dpdGgoJzMuJykgKSB7XG4gICAgICAgICAgICAgICAgc3R5bGVMYXllcnMucHVzaCgnJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHN0eWxlTGF5ZXJzLnB1c2goJ2RlZmF1bHQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG9wYWNpdHlMYXllcnMucHVzaCgyNTUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcHJpbnRMYXllcnMudW5zaGlmdCgnT3ZlcnZpZXcnKTtcbiAgICAgICAgICAgIHN0eWxlTGF5ZXJzLnVuc2hpZnQoJ2RlZmF1bHQnKTtcbiAgICAgICAgICAgIG9wYWNpdHlMYXllcnMudW5zaGlmdCgyNTUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB1cmwgKz0gJyZMQVlFUlM9JytwcmludExheWVycy5qb2luKCcsJyk7XG4gICAgICB1cmwgKz0gJyZTVFlMRVM9JytzdHlsZUxheWVycy5qb2luKCcsJyk7XG4gICAgICB1cmwgKz0gJyZPUEFDSVRJRVM9JytvcGFjaXR5TGF5ZXJzLmpvaW4oJywnKTtcbiAgICAgIHZhciBsYWJlbHMgPSAkKCcjcHJpbnQgLnByaW50LWxhYmVscycpLmZpbmQoJ2lucHV0LnByaW50LWxhYmVsLCB0ZXh0YXJlYS5wcmludC1sYWJlbCcpLnNlcmlhbGl6ZSgpO1xuICAgICAgaWYgKCBsYWJlbHMgIT0gXCJcIiApXG4gICAgICAgIHVybCArPSAnJicrbGFiZWxzO1xuICAgICAgdmFyIGZpbHRlciA9IFtdO1xuICAgICAgdmFyIHNlbGVjdGlvbiA9IFtdO1xuICAgICAgZm9yICggdmFyICBsTmFtZSBpbiBjb25maWcubGF5ZXJzICkge1xuICAgICAgICAgIHZhciBsQ29uZmlnID0gY29uZmlnLmxheWVyc1tsTmFtZV07XG4gICAgICAgICAgaWYgKCAhKCdyZXF1ZXN0X3BhcmFtcycgaW4gbENvbmZpZylcbiAgICAgICAgICAgIHx8IGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ10gPT0gbnVsbCApXG4gICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIHZhciByZXF1ZXN0UGFyYW1zID0gbENvbmZpZ1sncmVxdWVzdF9wYXJhbXMnXTtcbiAgICAgICAgICAgIGlmICggKCdmaWx0ZXJ0b2tlbicgaW4gbENvbmZpZ1sncmVxdWVzdF9wYXJhbXMnXSlcbiAgICAgICAgICAgICYmIGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ11bJ2ZpbHRlcnRva2VuJ10gIT0gbnVsbFxuICAgICAgICAgICAgJiYgbENvbmZpZ1sncmVxdWVzdF9wYXJhbXMnXVsnZmlsdGVydG9rZW4nXSAhPSBcIlwiICkge1xuICAgICAgICAgICAgICBmaWx0ZXIucHVzaCggbENvbmZpZ1sncmVxdWVzdF9wYXJhbXMnXVsnZmlsdGVydG9rZW4nXSApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoICgnc2VsZWN0aW9udG9rZW4nIGluIGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ10pXG4gICAgICAgICAgICAmJiBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddWydzZWxlY3Rpb250b2tlbiddICE9IG51bGxcbiAgICAgICAgICAgICYmIGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ11bJ3NlbGVjdGlvbnRva2VuJ10gIT0gXCJcIiApIHtcbiAgICAgICAgICAgICAgc2VsZWN0aW9uLnB1c2goIGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ11bJ3NlbGVjdGlvbnRva2VuJ10gKTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoIGZpbHRlci5sZW5ndGggIT0wICl7XG4gICAgICAgIHVybCArPSAnJkZJTFRFUlRPS0VOPScrIGZpbHRlci5qb2luKCc7Jyk7XG4gICAgICB9XG4gICAgICBpZiAoIHNlbGVjdGlvbi5sZW5ndGggIT0wIClcbiAgICAgICAgdXJsICs9ICcmU0VMRUNUSU9OVE9LRU49Jysgc2VsZWN0aW9uLmpvaW4oJzsnKTtcbiAgICAgIHdpbmRvdy5vcGVuKHVybCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgbWFwLmV2ZW50cy5vbih7XG4gICAgICBcInpvb21lbmRcIjogZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICggZHJhZ0N0cmwuYWN0aXZlICYmIGxheWVyLmdldFZpc2liaWxpdHkoKSApIHtcbiAgICAgICAgICAgIC8vIGdldCBzY2FsZVxuICAgICAgICAgICAgdmFyIHNjYWxlID0gZ2V0UHJpbnRTY2FsZSggcHJpbnRDYXBhYmlsaXRpZXMuc2NhbGVzICk7XG4gICAgICAgICAgICAvLyB1cGRhdGUgdGhlIHNlbGVjdFxuICAgICAgICAgICAgJCgnI3ByaW50LXNjYWxlJykudmFsKHNjYWxlKTtcbiAgICAgICAgICAgIC8vIGRyYXcgcHJpbnQgYm94XG4gICAgICAgICAgICBkcmF3UHJpbnRCb3goIGRyYWdDdHJsLmxheW91dCwgbGF5ZXIsIHNjYWxlICk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgICBsaXpNYXAuZXZlbnRzLm9uKHtcbiAgICAgICAgbWluaWRvY2tvcGVuZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICggZS5pZCA9PSAncHJpbnQnICkge1xuICAgICAgICAgICAgICAgICQoJyNwcmludC10ZW1wbGF0ZScpLmNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtaW5pZG9ja2Nsb3NlZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCBlLmlkID09ICdwcmludCcgKSB7XG4gICAgICAgICAgICAgICAgZHJhZ0N0cmwuZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRUb29sdGlwQ29udHJvbCgpIHtcbiAgICBpZiAoICFjb25maWdbJ3Rvb2x0aXBMYXllcnMnXSB8fCBjb25maWcudG9vbHRpcExheWVycy5sZW5ndGggPT0gMCApIHtcbiAgICAgICQoJyNidXR0b24tdG9vbHRpcC1sYXllcicpLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIC8vIFZlcmlmeWluZyBXRlMgbGF5ZXJzXG4gICAgdmFyIGZlYXR1cmVUeXBlcyA9IGdldFZlY3RvckxheWVyRmVhdHVyZVR5cGVzKCk7XG4gICAgaWYgKGZlYXR1cmVUeXBlcy5sZW5ndGggPT0gMCApIHtcbiAgICAgICQoJyNidXR0b24tdG9vbHRpcC1sYXllcicpLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB2YXIgdG9vbHRpcExheWVyc0RpYyA9IHt9O1xuICAgIGZvciAodmFyIGxuYW1lIGluIGNvbmZpZy50b29sdGlwTGF5ZXJzKSB7XG4gICAgICAgIHRvb2x0aXBMYXllcnNEaWNbbGl6TWFwLmNsZWFuTmFtZShsbmFtZSldID0gbG5hbWU7XG4gICAgfVxuXG4gICAgdmFyIHRvb2x0aXBMYXllcnNTb3J0ZWQgPSBbXTtcblxuICAgIGZlYXR1cmVUeXBlcy5lYWNoKCBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciB0eXBlTmFtZSA9IHNlbGYuZmluZCgnTmFtZScpLnRleHQoKTtcbiAgICAgICAgdmFyIGxuYW1lID0gbGl6TWFwLmdldE5hbWVCeVR5cGVOYW1lKCB0eXBlTmFtZSApO1xuICAgICAgICBpZiAoICFsbmFtZSApIHtcbiAgICAgICAgICAgIGlmICh0eXBlTmFtZSBpbiBjb25maWcubG9jYXRlQnlMYXllcilcbiAgICAgICAgICAgICAgICBsbmFtZSA9IHR5cGVOYW1lXG4gICAgICAgICAgICBlbHNlIGlmICggKHR5cGVOYW1lIGluIHNob3J0TmFtZU1hcCkgJiYgKHNob3J0TmFtZU1hcFt0eXBlTmFtZV0gaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpKVxuICAgICAgICAgICAgICAgIGxuYW1lID0gc2hvcnROYW1lTWFwW3R5cGVOYW1lXTtcbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGZvciAodHRsIGluIGNvbmZpZy50b29sdGlwTGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0dGwuc3BsaXQoJyAnKS5qb2luKCdfJykgPT0gdHlwZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxuYW1lID0gdHRsO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoICEobG5hbWUgaW4gY29uZmlnLnRvb2x0aXBMYXllcnMpIClcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICBpZiAoIChsbmFtZSBpbiBjb25maWcudG9vbHRpcExheWVycykgJiYgKGxuYW1lIGluIGNvbmZpZy5sYXllcnMpICkge1xuICAgICAgICAgICAgdmFyIGxDb25maWcgPSBjb25maWcubGF5ZXJzW2xuYW1lXTtcbiAgICAgICAgICAgIHRvb2x0aXBMYXllcnNTb3J0ZWRbY29uZmlnLnRvb2x0aXBMYXllcnNbbG5hbWVdLm9yZGVyXSA9ICc8b3B0aW9uIHZhbHVlPVwiJytsbmFtZSsnXCI+JytsQ29uZmlnLnRpdGxlKyc8L29wdGlvbj4nO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBEaXNwbGF5IGxheWVycyBvcmRlciBhcyBkZWNsYXJlZCBpbiBwbHVnaW5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRvb2x0aXBMYXllcnNTb3J0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICQoJyN0b29sdGlwLWxheWVyLWxpc3QnKS5hcHBlbmQodG9vbHRpcExheWVyc1NvcnRlZFtpXSk7XG4gICAgfVxuXG4gICAgaWYgKCAkKCcjdG9vbHRpcC1sYXllci1saXN0JykuZmluZCgnb3B0aW9uJykubGVuZ3RoID09IDEgKSB7XG4gICAgICAkKCcjYnV0dG9uLXRvb2x0aXAtbGF5ZXInKS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbk9wZW5MYXllcnMuQ29udHJvbC5IaWdobGlnaHRGZWF0dXJlID0gT3BlbkxheWVycy5DbGFzcyhPcGVuTGF5ZXJzLkNvbnRyb2wsIHtcbiAgICAvKipcbiAgICAgKiBDb25zdGFudDogRVZFTlRfVFlQRVNcbiAgICAgKiB7QXJyYXkoU3RyaW5nKX0gU3VwcG9ydGVkIGFwcGxpY2F0aW9uIGV2ZW50IHR5cGVzLiAgUmVnaXN0ZXIgYSBsaXN0ZW5lclxuICAgICAqICAgICBmb3IgYSBwYXJ0aWN1bGFyIGV2ZW50IHdpdGggdGhlIGZvbGxvd2luZyBzeW50YXg6XG4gICAgICogKGNvZGUpXG4gICAgICogY29udHJvbC5ldmVudHMucmVnaXN0ZXIodHlwZSwgb2JqLCBsaXN0ZW5lcik7XG4gICAgICogKGVuZClcbiAgICAgKlxuICAgICAqICAtICpmZWF0dXJlc2V0KiBUcmlnZ2VyZWQgd2hlbiB0aGUgbW91c2UgaXMgaG92ZXIgYSBuZXcgZmVhdHVyZSxcbiAgICAgKiAgICAgIGkuZS4gbm90IGEgcHJldmlvdXNseSBob3ZlciBmZWF0dXJlLlxuICAgICAqICAtICpmZWF0dXJlcmVzZXQqIFRyaWdnZXJlZCB3aGVuIHRoZSBtb3VzZSBiZWNvbWVzIG5vIGxvbmdlciBob3ZlclxuICAgICAqICAgICAgYSBmZWF0dXJlLlxuICAgICAqL1xuICAgIEVWRU5UX1RZUEVTOiBbXCJmZWF0dXJlc2V0XCIsXCJmZWF0dXJlcmVzZXRcIl0sXG5cbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0eTogZmVhdHVyZVxuICAgICAqIHtPcGVuTGF5ZXJzLkZlYXR1cmV9IFRoZSBjdXJyZW50IGhpZ2hsaWdodGVkIGZlYXR1cmUgdGhlIG1vdXNlLiAgV2lsbFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIGJlIHNldCB0byBudWxsIGFzIHNvb24gYXMgdGhlIG1vdXNlIGlzIG5vdCBob3ZlclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIGEgZmVhdHVyZS5cbiAgICAgKi9cbiAgICBmZWF0dXJlOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogUHJvcGVydHk6IHN0eWxlXG4gICAgICoge09wZW5MYXllcnMuU3R5bGV9ICAgVGhlIHN0eWxlIGFwcGxpZWQgdG8gYW4gaG92ZXIgZmVhdHVyZVxuICAgICAqL1xuICAgIHN0eWxlOiBudWxsLFxuXG4gICAgLyoqXG4gICAgICogUHJvcGVydHk6IGRpc3BsYXlQb3B1cFxuICAgICAqIHtib29sZWFufSAgRGlzcGxheSBhIHBvcHVwIHdpdGggYWxsIHRoZSBmZWF0dXJlIGF0dHJpYnV0ZXMgaWYgdGhpc1xuICAgICAqICAgICAgICAgICAgaXMgc2V0IHRvIHRydWUuICBEZWZhdWx0IHRydWUuXG4gICAgICovXG4gICAgZGlzcGxheVBvcHVwOiB0cnVlLFxuXG4gICAgZGVmYXVsdEhhbmRsZXJPcHRpb25zOiB7XG4gICAgICAgICdkZWxheSc6IDAsXG4gICAgICAgICdwaXhlbFRvbGVyYW5jZSc6IG51bGwsXG4gICAgICAgICdzdG9wTW92ZSc6IGZhbHNlXG4gICAgfSxcblxuICAgIGRlZmF1bHRTdHlsZToge1xuICAgICAgICAnc3Ryb2tlQ29sb3InIDogXCJyZWRcIixcbiAgICAgICAgJ3N0cm9rZVdpZHRoJyA6IDdcbiAgICB9LFxuXG4gICAgcG9wdXBPZmZzZXQ6IHtcbiAgICAgICAgJ2xlZnQnOiA0NSxcbiAgICAgICAgJ3JpZ2h0JzogMCxcbiAgICAgICAgJ3RvcCc6IDVcbiAgICB9LFxuXG4gICAgcG9wdXBUaXRsZTogbnVsbCxcblxuICAgIHBvcHVwU2l6ZTogbnVsbCxcblxuICAgIGRlZmF1bHRQb3B1cFNpemU6IG5ldyBPcGVuTGF5ZXJzLlNpemUoMjAwLDMyNSksXG5cbiAgICAvKipcbiAgICAgKiBDb25zdHJ1Y3RvcjogT3BlbkxheWVycy5Db250cm9sLkhpZ2hsaWdodEZlYXR1cmVcbiAgICAgKiBDcmVhdGUgYSBuZXcgSGlnaGxpZ2h0RmVhdHVyZSBmZWF0dXJlIGNvbnRyb2wuXG4gICAgICpcbiAgICAgKiBQYXJhbWV0ZXJzOlxuICAgICAqIGxheWVyIC0gezxPcGVuTGF5ZXJzLkxheWVyLlZlY3Rvcj59IExheWVyIHRoYXQgY29udGFpbnMgZmVhdHVyZXMuXG4gICAgICogb3B0aW9ucyAtIHtPYmplY3R9IE9wdGlvbmFsIG9iamVjdCB3aG9zZSBwcm9wZXJ0aWVzIHdpbGwgYmUgc2V0IG9uIHRoZVxuICAgICAqICAgICBjb250cm9sLlxuICAgICAqL1xuICAgIGluaXRpYWxpemU6IGZ1bmN0aW9uKGxheWVycywgb3B0aW9ucykge1xuICAgICAgICAvLyBjb25jYXRlbmF0ZSBldmVudHMgc3BlY2lmaWMgdG8gdGhpcyBjb250cm9sIHdpdGggdGhvc2UgZnJvbSB0aGUgYmFzZVxuICAgICAgICB0aGlzLkVWRU5UX1RZUEVTID1cbiAgICAgICAgICAgIE9wZW5MYXllcnMuQ29udHJvbC5IaWdobGlnaHRGZWF0dXJlLnByb3RvdHlwZS5FVkVOVF9UWVBFUy5jb25jYXQoXG4gICAgICAgICAgICBPcGVuTGF5ZXJzLkNvbnRyb2wucHJvdG90eXBlLkVWRU5UX1RZUEVTXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuaGFuZGxlck9wdGlvbnMgPSBPcGVuTGF5ZXJzLlV0aWwuZXh0ZW5kKFxuICAgICAgICAgICAge30sIHRoaXMuZGVmYXVsdEhhbmRsZXJPcHRpb25zXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc3R5bGUgPSBPcGVuTGF5ZXJzLlV0aWwuZXh0ZW5kKCB7fSwgdGhpcy5kZWZhdWx0U3R5bGUpO1xuICAgICAgICB0aGlzLnBvcHVwU2l6ZSA9IE9wZW5MYXllcnMuVXRpbC5leHRlbmQoIHt9LCB0aGlzLmRlZmF1bHRQb3B1cFNpemUpO1xuXG4gICAgICAgIE9wZW5MYXllcnMuQ29udHJvbC5wcm90b3R5cGUuaW5pdGlhbGl6ZS5hcHBseSh0aGlzLCBbb3B0aW9uc10pO1xuXG4gICAgICAgIGlmKHRoaXMuc2NvcGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2NvcGUgPSB0aGlzO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdExheWVyKGxheWVycyk7XG5cbiAgICAgICAgdGhpcy5oYW5kbGVyID0gbmV3IE9wZW5MYXllcnMuSGFuZGxlci5Ib3ZlcihcbiAgICAgICAgICAgIHRoaXMsIHtcbiAgICAgICAgICAgICAgICAnbW92ZSc6IHRoaXMub25Nb3ZlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdGhpcy5oYW5kbGVyT3B0aW9uc1xuICAgICAgICApO1xuXG4gICAgICAgIGlmICghdGhpcy5wb3B1cE9mZnNldCl7XG4gICAgICAgICAgICB0aGlzLnBvcHVwT2Zmc2V0ID0ge1xuICAgICAgICAgICAgICAgICdsZWZ0JzogMCxcbiAgICAgICAgICAgICAgICAncmlnaHQnOiAwLFxuICAgICAgICAgICAgICAgICd0b3AnOiAwXG4gICAgICAgICAgICB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBvcHVwT2Zmc2V0LmxlZnQpe1xuICAgICAgICAgICAgICAgIHRoaXMucG9wdXBPZmZzZXQubGVmdCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXRoaXMucG9wdXBPZmZzZXQucmlnaHQpe1xuICAgICAgICAgICAgICAgIHRoaXMucG9wdXBPZmZzZXQucmlnaHQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnBvcHVwT2Zmc2V0LnRvcCl7XG4gICAgICAgICAgICAgICAgdGhpcy5wb3B1cE9mZnNldC50b3AgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogc2V0TWFwXG4gICAgICogU2V0IHRoZSBtYXAgcHJvcGVydHkgZm9yIHRoZSBjb250cm9sLiBUaGlzIGlzIGRvbmUgdGhyb3VnaCBhbiBhY2Nlc3NvclxuICAgICAqIHNvIHRoYXQgc3ViY2xhc3NlcyBjYW4gb3ZlcnJpZGUgdGhpcyBhbmQgdGFrZSBzcGVjaWFsIGFjdGlvbiBvbmNlXG4gICAgICogdGhleSBoYXZlIHRoZWlyIG1hcCB2YXJpYWJsZSBzZXQuXG4gICAgICpcbiAgICAgKiBQYXJhbWV0ZXJzOlxuICAgICAqIG1hcCAtIHs8T3BlbkxheWVycy5NYXA+fVxuICAgICAqL1xuICAgIHNldE1hcDogZnVuY3Rpb24obWFwKSB7XG4gICAgICAgIHRoaXMubWFwID0gbWFwO1xuICAgICAgICBpZiAodGhpcy5oYW5kbGVyKSB7XG4gICAgICAgICAgICB0aGlzLmhhbmRsZXIuc2V0TWFwKG1hcCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5tYXAuZXZlbnRzLnJlZ2lzdGVyKFwiem9vbWVuZFwiLCB0aGlzLCB0aGlzLm9uWm9vbSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogaW5pdExheWVyXG4gICAgICogQXNzaWduIHRoZSBsYXllciBwcm9wZXJ0eS4gSWYgbGF5ZXJzIGlzIGFuIGFycmF5LCB3ZSBuZWVkIHRvIHVzZVxuICAgICAqICAgICBhIFJvb3RDb250YWluZXIuXG4gICAgICpcbiAgICAgKiBQYXJhbWV0ZXJzOlxuICAgICAqIGxheWVycyAtIHs8T3BlbkxheWVycy5MYXllci5WZWN0b3I+fSwgb3IgYW4gYXJyYXkgb2YgdmVjdG9yIGxheWVycy5cbiAgICAgKi9cbiAgICBpbml0TGF5ZXI6IGZ1bmN0aW9uKGxheWVycykge1xuICAgICAgICBpZihPcGVuTGF5ZXJzLlV0aWwuaXNBcnJheShsYXllcnMpKSB7XG4gICAgICAgICAgICB0aGlzLmxheWVycyA9IGxheWVycztcbiAgICAgICAgICAgIHRoaXMubGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IuUm9vdENvbnRhaW5lcihcbiAgICAgICAgICAgICAgICB0aGlzLmlkICsgXCJfY29udGFpbmVyXCIsIHtcbiAgICAgICAgICAgICAgICAgICAgbGF5ZXJzOiBsYXllcnNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sYXllciA9IGxheWVycztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBUElNZXRob2Q6IHNldExheWVyXG4gICAgICogQXR0YWNoIGEgbmV3IGxheWVyIHRvIHRoZSBjb250cm9sLCBvdmVycmlkaW5nIGFueSBleGlzdGluZyBsYXllcnMuXG4gICAgICpcbiAgICAgKiBQYXJhbWV0ZXJzOlxuICAgICAqIGxheWVycyAtIEFycmF5IG9mIHs8T3BlbkxheWVycy5MYXllci5WZWN0b3I+fSBvciBhIHNpbmdsZVxuICAgICAqICAgICB7PE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yPn1cbiAgICAgKi9cbiAgICBzZXRMYXllcjogZnVuY3Rpb24obGF5ZXJzKSB7XG4gICAgICAgIHZhciBpc0FjdGl2ZSA9IHRoaXMuYWN0aXZlO1xuICAgICAgICB0aGlzLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgaWYodGhpcy5sYXllcnMpIHtcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5sYXllcnMgPSBudWxsO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuaW5pdExheWVyKGxheWVycyk7XG4gICAgICAgIGlmIChpc0FjdGl2ZSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZSgpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogTWV0aG9kOiBvbk1vdmVcbiAgICAqIFdoaWxlIHRoaXMgY29udHJvbCBpcyBhY3RpdmUsIG9uIG1vdXNlIG1vdmUsIGNoZWNrIGlmIHRoZSBtb3VzZSBpc1xuICAgICogb3ZlciBhIGZlYXR1cmUgb3Igd2FzIG92ZXIgYSBmZWF0dXJlIGFuZCBpcyBub3QgYW55bW9yZS5cbiAgICAqXG4gICAgKiBQYXJhbWV0ZXJzOlxuICAgICogZXZ0XG4gICAgKi9cbiAgICBvbk1vdmU6IGZ1bmN0aW9uKGV2dCl7XG4gICAgICAgIGlmIChldnQudHlwZSAhPSBcIm1vdXNlbW92ZVwiKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgb0ZlYXR1cmUgPSB0aGlzLmxheWVyLmdldEZlYXR1cmVGcm9tRXZlbnQoZXZ0KTtcblxuICAgICAgICBpZiAodGhpcy5mZWF0dXJlKXsgLy8gbGFzdCBob3ZlciBmZWF0dXJlIGV4aXN0XG4gICAgICAgICAgICBpZiAob0ZlYXR1cmUpeyAvLyBtb3VzZSBpcyBvdmVyIGEgZmVhdHVyZVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZlYXR1cmUuZmlkICE9IG9GZWF0dXJlLmZpZCl7Ly9hcmUgdGhleSBkaWZmZXJlbnRzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzZXRGZWF0dXJlKCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0RmVhdHVyZShvRmVhdHVyZSwgZXZ0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Ugey8vIG1vdXNlIGlzIG5vdCBvdmVyIGEgZmVhdHVyZSwgYnV0IGxhc3QgaG92ZXIgZmVhdHVyZSBleGlzdFxuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRGZWF0dXJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAob0ZlYXR1cmUpeyAvLyBubyBsYXN0IGZlYXR1cmUgYW5kIG1vdXNlIG92ZXIgYSBmZWF0dXJlXG4gICAgICAgICAgICB0aGlzLnNldEZlYXR1cmUob0ZlYXR1cmUsIGV2dCk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBNZXRob2Q6IG9uWm9vbVxuICAgICogSWYgYSBmZWF0dXJlIHdhcyBob3ZlciB0aGUgbW91c2UgYmVmb3JlIGEgem9vbSBldmVudCwgdGhlIHNhbWUgZmVhdHVyZVxuICAgICogc2hvdWxkIGJlIHNldCBhcyBob3Zlci4gIFRoZSBtYWluIHB1cnBvc2Ugb2YgdGhpcyBmdW5jdGlvbiBpcyB0byBtYWtlXG4gICAgKiBzdXJlIHRoZSBzdHlsZSBpcyBhcHBsaWVkIGFmdGVyIHRoZSBsYXllciBoYXMgbG9hZGVkIGl0cyBmZWF0dXJlcyBhbmRcbiAgICAqIHRoZSBwb3B1cHMgYW5kIGV2ZW50cyBhcmUgY29ycmVjdGx5IGRpc3BsYXllZC90cmlnZ2VyZWQuXG4gICAgKlxuICAgICogUGFyYW1ldGVyczpcbiAgICAqIGV2dFxuICAgICovXG4gICAgb25ab29tOiBmdW5jdGlvbihldnQpe1xuICAgICAgICBpZih0aGlzLmZlYXR1cmUpe1xuICAgICAgICAgICAgdmFyIG9GZWF0dXJlID0gdGhpcy5mZWF0dXJlO1xuICAgICAgICAgICAgdGhpcy5yZXNldEZlYXR1cmUoKTtcbiAgICAgICAgICAgIC8vIE1ha2Ugc3VyZSB0aGUgaG92ZXIgZmVhdHVyZSBpcyBzdGlsbCBhbW9uZyB0aGUgbGF5ZXIuZmVhdHVyZXNcbiAgICAgICAgICAgIC8vIGJlZm9yZSBzZXR0aW5nIGl0IGhvdmVyIGFnYWluXG4gICAgICAgICAgICBpZiAoT3BlbkxheWVycy5VdGlsLmluZGV4T2YodGhpcy5sYXllci5mZWF0dXJlcywgb0ZlYXR1cmUpICE9IC0xKXtcbiAgICAgICAgICAgICAgICB0aGlzLnNldEZlYXR1cmUob0ZlYXR1cmUsIGV2dCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgKiBNZXRob2Q6IHNldEZlYXR1cmVcbiAgICAqIENoYW5nZSB0aGUgY29sb3Igb2YgY3VycmVudCBmZWF0dXJlIG92ZXIgdGhlIG1vdXNlLiAgQ2FuIGRpc3BsYXkgYSBwb3B1cFxuICAgICogQXQgdGhlIHNhbWUgdGltZS4gIFRoZSBmZWF0dXJlIGJlY29tZXMgdGhlIGN1cnJlbnQgZmVhdHVyZS5cbiAgICAqXG4gICAgKiBQYXJhbWV0ZXJzOlxuICAgICogZXZ0XG4gICAgKi9cbiAgICBzZXRGZWF0dXJlOiBmdW5jdGlvbihmZWF0dXJlLCBldnQpe1xuICAgICAgICB2YXIgbGF5ZXIgPSBmZWF0dXJlLmxheWVyO1xuICAgICAgICBsYXllci5kcmF3RmVhdHVyZSggZmVhdHVyZSwgdGhpcy5zdHlsZSApO1xuICAgICAgICBpZih0aGlzLmRpc3BsYXlQb3B1cCl7XG4gICAgICAgICAgICB0aGlzLmFkZEluZm9Qb3B1cChmZWF0dXJlLCBldnQpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBldmVudCA9IHtmZWF0dXJlOiBmZWF0dXJlfTtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlckV2ZW50KFwiZmVhdHVyZXNldFwiLCBldmVudCk7XG4gICAgICAgIHRoaXMuZmVhdHVyZSA9IGZlYXR1cmU7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogTWV0aG9kOiByZXNldEZlYXR1cmVcbiAgICAqIERyYXcgdGhpcy5mZWF0dXJlIHRvIGl0cyBvcmlnaW5hbCBjb2xvci4gIElmIHRoZXJlIHdhcyBhIHBvcHVwLCBpdCdzXG4gICAgKiBhbHNvIHJlbW92ZWQuICB0aGlzLmZlYXR1cmUgYmVjb21lcyBudWxsLlxuICAgICpcbiAgICAqL1xuICAgIHJlc2V0RmVhdHVyZTogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGxheWVyID0gdGhpcy5mZWF0dXJlLmxheWVyO1xuICAgICAgICBpZiAoT3BlbkxheWVycy5VdGlsLmluZGV4T2YobGF5ZXIuZmVhdHVyZXMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZlYXR1cmUpICE9IC0xKXtcbiAgICAgICAgICAgIGxheWVyLmRyYXdGZWF0dXJlKHRoaXMuZmVhdHVyZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYodGhpcy5kaXNwbGF5UG9wdXApe1xuICAgICAgICAgICAgdGhpcy5yZW1vdmVJbmZvUG9wdXAodGhpcy5mZWF0dXJlKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXZlbnQgPSB7ZmVhdHVyZTogdGhpcy5mZWF0dXJlfTtcbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlckV2ZW50KFwiZmVhdHVyZXJlc2V0XCIsIGV2ZW50KTtcbiAgICAgICAgdGhpcy5mZWF0dXJlID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBhZGRJbmZvUG9wdXBcbiAgICAgKiBDYWxsZWQgd2hlbiBhIHRoZSBtb3VzZSBpcyBvdmVyIGEgZmVhdHVyZSBidXQgbm90IHNlbGVjdGVkLiAgSXQgY3JlYXRlc1xuICAgICAqIGEgcG9wdXAgd2l0aCBhbGwgZmVhdHVyZSBhdHRyaWJ1dGVzIGFuZCBpcyBkaXNwbGF5ZWQgYXQgdGhlIGxlZnQgb3IgcmlnaHRcbiAgICAgKiBvZiB0aGUgbWFwIGRlcGVuZGluZyB3aGVyZSB0aGUgbW91c2UgaXMuICBUaGF0IGlzIHdoeSBldnQgaXMgbmVlZGVkLlxuICAgICAqXG4gICAgICogUGFyYW1ldGVyczpcbiAgICAgKiBmZWF0dXJlIC0ge09wZW5MYXllcnMuRmVhdHVyZX1cbiAgICAgKlxuICAgICAqIGV2dFxuICAgICAqL1xuICAgIGFkZEluZm9Qb3B1cDogZnVuY3Rpb24oZmVhdHVyZSwgZXZ0KSB7XG4gICAgICAgIHZhciBzekhUTUwsIG9Qb3B1cFBvcywgb01hcEV4dGVudCwgblJlc28sIG9Qb3B1cCwgYkxlZnQ7XG5cbiAgICAgICAgLy8gZmVhdHVyZSBhdHRyaWJ1dGVzIHBhcnNpbmcgaW4gaHRtbFxuICAgICAgICBzekhUTUwgPSBcIjxkaXYgc3R5bGU9J2ZvbnQtc2l6ZTouOGVtJz48aDE+XCIrdGhpcy5wb3B1cFRpdGxlK1wiPC9oMT5cIjtcbiAgICAgICAgaWYgKCFmZWF0dXJlLmNsdXN0ZXIpe1xuICAgICAgICAgICAgYXN6QXR0cmlidXRlcyA9IGZlYXR1cmUuYXR0cmlidXRlcztcbiAgICAgICAgICAgIGZvcih2YXIga2V5IGluIGFzekF0dHJpYnV0ZXMpe1xuICAgICAgICAgICAgICAgIHN6SFRNTCArPSBrZXkgKyBcIiA6IFwiICsgYXN6QXR0cmlidXRlc1trZXldICsgXCI8YnIgLz5cIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzekhUTUwgKz1cIjwvZGl2PlwiO1xuXG4gICAgICAgIG9NYXBFeHRlbnQgPSB0aGlzLmxheWVyLm1hcC5nZXRFeHRlbnQoKTtcbiAgICAgICAgblJlc28gPSB0aGlzLmxheWVyLm1hcC5nZXRSZXNvbHV0aW9uKCk7XG5cbiAgICAgICAgLy8gY2FsY3VsYXRlIHdoZXJlIChsZWZ0IG9yIHJpZ2h0KSB0aGUgcG9wdXAgd2lsbCBhcHBlYXJcbiAgICAgICAgaWYoZXZ0Lnh5KXsgLy8gaWYgd2Uga25vdyB0aGUgbW91c2UgcG9zaXRpb25cbiAgICAgICAgICAgIHZhciBuTWFwV2lkdGggPSB0aGlzLmxheWVyLm1hcC5nZXRTaXplKCkudztcbiAgICAgICAgICAgIHZhciBuTW91c2VYUG9zID0gZXZ0Lnh5Lng7XG4gICAgICAgICAgICBiTGVmdCA9IG5Nb3VzZVhQb3MgPj0gKG5NYXBXaWR0aC8yKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gdXNlIGZlYXR1cmUgYW5kIG1hcCBjZW50ZXIgcGl4ZWwgdG8gY29tcGFyZVxuICAgICAgICAgICAgdmFyIG5NYXBYQ2VudGVyID0gdGhpcy5tYXAuZ2V0RXh0ZW50KCkuZ2V0Q2VudGVyUGl4ZWwoKS54O1xuICAgICAgICAgICAgdmFyIG5GZWF0dXJlWFBvcyA9IGZlYXR1cmUuZ2VvbWV0cnkuZ2V0Qm91bmRzKCkuZ2V0Q2VudGVyUGl4ZWwoKS54O1xuICAgICAgICAgICAgYkxlZnQgPSBuRmVhdHVyZVhQb3MgPj0gbk1hcFhDZW50ZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZihiTGVmdCl7IC8vIHBvcHVwIGFwcGVhcnMgdG9wLWxlZnQgcG9zaXRpb25cbiAgICAgICAgICAgIG9Qb3B1cFBvcyA9IG5ldyBPcGVuTGF5ZXJzLkxvbkxhdChvTWFwRXh0ZW50LmxlZnQsb01hcEV4dGVudC50b3ApO1xuICAgICAgICAgICAgb1BvcHVwUG9zLmxvbiArPSB0aGlzLnBvcHVwT2Zmc2V0LmxlZnQgKiBuUmVzbztcbiAgICAgICAgfSBlbHNlIHsgLy8gcG9wdXAgYXBwZWFycyB0b3AtcmlnaHQgcG9zaXRpb25cbiAgICAgICAgICAgIG9Qb3B1cFBvcyA9IG5ldyBPcGVuTGF5ZXJzLkxvbkxhdChvTWFwRXh0ZW50LnJpZ2h0LG9NYXBFeHRlbnQudG9wKTtcbiAgICAgICAgICAgIG9Qb3B1cFBvcy5sb24gLT0gdGhpcy5wb3B1cE9mZnNldC5yaWdodCAqIG5SZXNvO1xuICAgICAgICB9XG4gICAgICAgIG9Qb3B1cFBvcy5sYXQgLT0gdGhpcy5wb3B1cE9mZnNldC50b3AgKiBuUmVzbztcblxuICAgICAgICBvUG9wdXAgPSBuZXcgT3BlbkxheWVycy5Qb3B1cC5BbmNob3JlZChcbiAgICAgICAgICAgIFwiY2hpY2tlblwiLFxuICAgICAgICAgICAgb1BvcHVwUG9zLFxuICAgICAgICAgICAgdGhpcy5wb3B1cFNpemUsXG4gICAgICAgICAgICBzekhUTUwsXG4gICAgICAgICAgICBudWxsLCBudWxsLCBudWxsKTtcbiAgICAgICAgZmVhdHVyZS5wb3B1cCA9IG9Qb3B1cDtcbiAgICAgICAgdGhpcy5tYXAuYWRkUG9wdXAob1BvcHVwKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiByZW1vdmVJbmZvUG9wdXBcbiAgICAgKiBSZW1vdmUgdGhlIHBvcHVwIG9mIGZlYXR1cmUgd2hlbiB0aGUgbW91c2UgaXMgbm8gbG9uZ2VyIGhvdmVyIGl0LlxuICAgICAqXG4gICAgICogUGFyYW1ldGVyczpcbiAgICAgKiBmZWF0dXJlIC0ge09wZW5MYXllcnMuRmVhdHVyZX1cbiAgICAgKi9cbiAgICByZW1vdmVJbmZvUG9wdXA6IGZ1bmN0aW9uKGZlYXR1cmUpIHtcbiAgICAgICAgdGhpcy5tYXAucmVtb3ZlUG9wdXAoZmVhdHVyZS5wb3B1cCk7XG4gICAgICAgIGZlYXR1cmUucG9wdXAuZGVzdHJveSgpO1xuICAgICAgICBmZWF0dXJlLnBvcHVwID0gbnVsbDtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBhY3RpdmF0ZVxuICAgICAqIEFjdGl2YXRlcyB0aGUgY29udHJvbC5cbiAgICAgKlxuICAgICAqIFJldHVybnM6XG4gICAgICoge0Jvb2xlYW59IFRoZSBjb250cm9sIHdhcyBlZmZlY3RpdmVseSBhY3RpdmF0ZWQuXG4gICAgICovXG4gICAgYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmFjdGl2ZSkge1xuICAgICAgICAgICAgaWYodGhpcy5sYXllcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcC5hZGRMYXllcih0aGlzLmxheWVyKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gT3BlbkxheWVycy5Db250cm9sLnByb3RvdHlwZS5hY3RpdmF0ZS5hcHBseShcbiAgICAgICAgICAgIHRoaXMsIGFyZ3VtZW50c1xuICAgICAgICApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGRlYWN0aXZhdGVcbiAgICAgKiBEZWFjdGl2YXRlcyBhIGNvbnRyb2wgYW5kIGl0J3MgYXNzb2NpYXRlZCBoYW5kbGVyIGlmIGFueS4gIFRoZSBleGFjdFxuICAgICAqIGVmZmVjdCBvZiB0aGlzIGRlcGVuZHMgb24gdGhlIGNvbnRyb2wgaXRzZWxmLlxuICAgICAqXG4gICAgICogUmV0dXJuczpcbiAgICAgKiB7Qm9vbGVhbn0gVHJ1ZSBpZiB0aGUgY29udHJvbCB3YXMgZWZmZWN0aXZlbHkgZGVhY3RpdmF0ZWQgb3IgZmFsc2VcbiAgICAgKiAgICAgICAgICAgaWYgdGhlIGNvbnRyb2wgd2FzIGFscmVhZHkgaW5hY3RpdmUuXG4gICAgICovXG4gICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhbmRsZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZXIuZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmKHRoaXMuZmVhdHVyZSl7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNldEZlYXR1cmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXJFdmVudChcImRlYWN0aXZhdGVcIik7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcbiAgICBDTEFTU19OQU1FOiBcIk9wZW5MYXllcnMuQ29udHJvbC5IaWdobGlnaHRGZWF0dXJlXCJcbn0pO1xuXG4gICAgLy8gRGVmaW5lIHZlY3RvciBsYXllciBmb3IgdG9vbHRpcFxuICAgIHZhciB0b29sdGlwU3R5bGVNYXAgPSBuZXcgT3BlbkxheWVycy5TdHlsZU1hcCh7XG4gICAgICAgICdkZWZhdWx0JzogbmV3IE9wZW5MYXllcnMuU3R5bGUoe1xuICAgICAgICAgICAgcG9pbnRSYWRpdXM6IDEsXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogXCJibHVlXCIsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMTAsXG4gICAgICAgICAgICBzdHJva2VPcGFjaXR5OiAwLFxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDAsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICB9KSxcbiAgICAgICAgJ3NlbGVjdGVkJzogbmV3IE9wZW5MYXllcnMuU3R5bGUoe1xuICAgICAgICAgICAgcG9pbnRSYWRpdXM6IDEsXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogXCJ5ZWxsb3dcIixcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAxMCxcbiAgICAgICAgICAgIHN0cm9rZU9wYWNpdHk6IDAsXG4gICAgICAgICAgICBmaWxsT3BhY2l0eTogMCxcbiAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInXG4gICAgICAgIH0pLFxuICAgICAgICAndGVtcG9yYXJ5JzogbmV3IE9wZW5MYXllcnMuU3R5bGUoe1xuICAgICAgICAgICAgcG9pbnRSYWRpdXM6IDEsXG4gICAgICAgICAgICBzdHJva2VDb2xvcjogJ3JlZCcsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMTAsXG4gICAgICAgICAgICBzdHJva2VPcGFjaXR5OiAwLFxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDAsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICB9KVxuICAgIH0pO1xuICAgIHZhciB0bGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoJ3Rvb2x0aXBMYXllcicsIHtcbiAgICAgICAgc3R5bGVNYXA6IHRvb2x0aXBTdHlsZU1hcFxuICAgIH0pO1xuICAgIGxpek1hcC5tYXAuYWRkTGF5ZXIodGxheWVyKTtcbiAgICB0bGF5ZXIuc2V0VmlzaWJpbGl0eSh0cnVlKTtcblxuICAgIHZhciB0b29sdGlwQ29udHJvbCA9IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuSGlnaGxpZ2h0RmVhdHVyZShbdGxheWVyXSx7XG4gICAgICAgIGRpc3BsYXlQb3B1cDogdHJ1ZSxcbiAgICAgICAgcG9wdXBPZmZzZXQ6IHtcbiAgICAgICAgICAgICdsZWZ0JzogNDUsXG4gICAgICAgICAgICAncmlnaHQnOiAwLFxuICAgICAgICAgICAgJ3RvcCc6IDVcbiAgICAgICAgfSxcbiAgICAgICAgcG9wdXBUaXRsZTogXCJTdGF0ZSBpbmZvcm1hdGlvblwiLFxuICAgICAgICBwb3B1cFNpemU6IG5ldyBPcGVuTGF5ZXJzLlNpemUoMjAwLDM3NSksXG4gICAgICAgIHN0eWxlOntcbiAgICAgICAgICAgIHBvaW50UmFkaXVzOiA2LFxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiY3lhblwiLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDMsXG4gICAgICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDAuMixcbiAgICAgICAgICAgIGZpbGxDb2xvcjogXCJ0cmFuc3BhcmVudFwiXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICB0b29sdGlwQ29udHJvbC5hZGRJbmZvUG9wdXAgPSBmdW5jdGlvbihmZWF0dXJlLCBldnQpIHtcbiAgICAgICAgdmFyIGxuYW1lID0gJCgnI3Rvb2x0aXAtbGF5ZXItbGlzdCcpLnZhbCgpOy8vZmVhdHVyZS5sYXllci5uYW1lLnNwbGl0KFwiQFwiKVsxXTtcbiAgICAgICAgdmFyIGxjb25maWcgPSBsaXpNYXAuY29uZmlnLmxheWVyc1tsbmFtZV07XG4gICAgICAgIGlmKCAhKGxuYW1lIGluIGxpek1hcC5jb25maWcubGF5ZXJzKSApXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgdGNvbmZpZyA9IGxpek1hcC5jb25maWcudG9vbHRpcExheWVyc1tsbmFtZV07XG4gICAgICAgIHZhciB0ZiA9IHRjb25maWdbJ2ZpZWxkcyddLnRyaW0oKTtcbiAgICAgICAgdmFyIHRvb2x0aXBGaWVsZHMgPSB0Zi5zcGxpdCgvW1xccyxdKy8pO1xuICAgICAgICB2YXIgaGlkZGVuRmllbGRzID0gW107XG4gICAgICAgIGlmICggJ2F0dHJpYnV0ZUxheWVycycgaW4gbGl6TWFwLmNvbmZpZyAmJiBsbmFtZSBpbiBsaXpNYXAuY29uZmlnLmF0dHJpYnV0ZUxheWVycyApIHtcbiAgICAgICAgICAgIHZhciBhdHRjb25maWcgPSBsaXpNYXAuY29uZmlnLmF0dHJpYnV0ZUxheWVyc1tsbmFtZV07XG4gICAgICAgICAgICB2YXIgaGYgPSBhdHRjb25maWdbJ2hpZGRlbkZpZWxkcyddLnRyaW0oKTtcbiAgICAgICAgICAgIHZhciBoaWRkZW5GaWVsZHMgPSBoZi5zcGxpdCgvW1xccyxdKy8pO1xuICAgICAgICB9XG4gICAgICAgIHZhciBjQWxpYXNlcyA9IGxjb25maWdbJ2FsaWFzJ107XG4gICAgICAgIHZhciBodG1sID0gJzxkaXYgaWQ9XCJ0b29sdGlwUG9wdXBDb250ZW50XCI+JztcbiAgICAgICAgaHRtbCs9ICc8dGFibGUgY2xhc3M9XCJsaXptYXBQb3B1cFRhYmxlXCI+JztcbiAgICAgICAgZm9yIChhIGluIGZlYXR1cmUuYXR0cmlidXRlcyl7XG4gICAgICAgICAgICAvLyBEbyBubyBzaG93IGhpZGRlbmZpZWxkc1xuICAgICAgICAgICAgaWYoICgkLmluQXJyYXkoYSwgaGlkZGVuRmllbGRzKSA+IC0xKSApXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICAvLyBzaG93IG9ubHkgdG9vdGxpcCBmaWVsZHMgaWYgc29tZSBmaWVsZHMgZ2l2ZW5cbiAgICAgICAgICAgIGlmKCB0ZiAhPSAnJyAmJiAhKCQuaW5BcnJheShhLCB0b29sdGlwRmllbGRzKSA+IC0xKSApXG4gICAgICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgICBodG1sKz0gJzx0cj48dGg+JyArIGNBbGlhc2VzW2FdICsgJzwvdGg+PHRkPicgKyBmZWF0dXJlLmF0dHJpYnV0ZXNbYV0gKyAnPC90ZD48L3RyPic7XG4gICAgICAgIH1cbiAgICAgICAgaHRtbCs9ICc8L3RhYmxlPic7XG4gICAgICAgIGh0bWwrPSAnPC9kaXY+JztcblxuICAgICAgICB2YXIgb01hcEV4dGVudCA9IHRoaXMubGF5ZXIubWFwLmdldEV4dGVudCgpO1xuICAgICAgICB2YXIgblJlc28gPSB0aGlzLmxheWVyLm1hcC5nZXRSZXNvbHV0aW9uKCk7XG5cbiAgICAgICAgdmFyIG9Qb3B1cFBvcyA9IG5ldyBPcGVuTGF5ZXJzLkxvbkxhdChvTWFwRXh0ZW50LmxlZnQsb01hcEV4dGVudC50b3ApO1xuICAgICAgICBvUG9wdXBQb3MubG9uICs9ICggJCgnI2RvY2snKS53aWR0aCgpICsgdGhpcy5wb3B1cE9mZnNldC5sZWZ0ICkgKiBuUmVzbztcbiAgICAgICAgdmFyIHRwb3B1cCA9IG5ldyBPcGVuTGF5ZXJzLlBvcHVwLkFuY2hvcmVkKCd0b29sdGlwUG9wdXAnLFxuICAgICAgICAgICAgb1BvcHVwUG9zLFxuICAgICAgICAgICAgbnVsbCwvL25ldyBPcGVuTGF5ZXJzLlNpemUoMjUwLDMwMCksXG4gICAgICAgICAgICBodG1sLFxuICAgICAgICAgICAge3NpemU6IHt3OiAxNCwgaDogMTR9LCBvZmZzZXQ6IHt4OiAtNywgeTogLTd9fSxcbiAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG4gICAgICAgIHRwb3B1cC5hdXRvU2l6ZSA9IHRydWU7XG4gICAgICAgIHRwb3B1cC5iYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuXG4gICAgICAgIGZlYXR1cmUucG9wdXAgPSB0cG9wdXA7XG4gICAgICAgIGxpek1hcC5tYXAuYWRkUG9wdXAoIHRwb3B1cCApO1xuICAgIH07XG5cbiAgICBsaXpNYXAubWFwLmFkZENvbnRyb2wodG9vbHRpcENvbnRyb2wpO1xuICAgIGNvbnRyb2xzWyd0b29sdGlwLWxheWVyJ10gPSB0b29sdGlwQ29udHJvbDtcblxuICAgICQoJyN0b29sdGlwLWxheWVyIGJ1dHRvbi5idG4tdG9vbHRpcC1sYXllci1jbGVhcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcjYnV0dG9uLXRvb2x0aXAtbGF5ZXInKS5jbGljaygpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnI3Rvb2x0aXAtY2FuY2VsJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAkKCcjdG9vbHRpcC1sYXllci1saXN0JykudmFsKCcnKS5jaGFuZ2UoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKCcjdG9vbHRpcC1sYXllci1saXN0JykuY2hhbmdlKCBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFOYW1lID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgdG9vbHRpcENvbnRyb2wuZGVhY3RpdmF0ZSgpO1xuICAgICAgICB0bGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAgIGlmICggYU5hbWUgPT0gJycgKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAkKCcjdG9vbHRpcC1sYXllci1saXN0JykuYWRkQ2xhc3MoJ2xvYWRpbmcnKS5hdHRyKCdkaXNhYmxlZCcsJycpO1xuXG4gICAgICAgIC8vIEdldCBzZWxlY3RlZCBmZWF0dXJlc1xuICAgICAgICB2YXIgc2VsZWN0aW9uTGF5ZXIgPSBnZXRMYXllck5hbWVCeUNsZWFuTmFtZSggYU5hbWUgKTtcblxuICAgICAgICBpZiggIXNlbGVjdGlvbkxheWVyIClcbiAgICAgICAgICAgIHNlbGVjdGlvbkxheWVyID0gYU5hbWU7XG4gICAgICAgIHZhciBmZWF0dXJlaWQgPSBnZXRWZWN0b3JMYXllclNlbGVjdGlvbkZlYXR1cmVJZHNTdHJpbmcoIHNlbGVjdGlvbkxheWVyICk7XG5cbiAgICAgICAgZ2V0RmVhdHVyZURhdGEoIGFOYW1lLCBudWxsLCBmZWF0dXJlaWQsIG51bGwsIGZhbHNlLCBudWxsLCBudWxsLFxuICAgICAgICAgICAgZnVuY3Rpb24oZk5hbWUsIGZGaWx0ZXIsIGZGZWF0dXJlcywgZkFsaWFzZXMgKXtcbiAgICAgICAgICAgICAgLy8gZ2V0IGxheWVyIG5hbWUgZm9yIGNvbmZpZ1xuICAgICAgICAgICAgICBpZiAoICEoZk5hbWUgaW4gY29uZmlnLmxheWVycykgKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgcWdpc05hbWUgPSBsaXpNYXAuZ2V0TmFtZUJ5Q2xlYW5OYW1lKGFOYW1lKTtcbiAgICAgICAgICAgICAgICAgIGlmICggcWdpc05hbWUgJiYgKHFnaXNOYW1lIGluIGNvbmZpZy5sYXllcnMpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgZk5hbWUgPSBxZ2lzTmFtZTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldEZlYXR1cmVEYXRhOiBcIicrZk5hbWUrJ1wiIGFuZCBcIicrcWdpc05hbWUrJ1wiIG5vdCBmb3VuZCBpbiBjb25maWcnKTtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB2YXIgbENvbmZpZyA9IGNvbmZpZy5sYXllcnNbZk5hbWVdO1xuICAgICAgICAgICAgICB2YXIgdGNvbmZpZyA9IGNvbmZpZy50b29sdGlwTGF5ZXJzW2ZOYW1lXTtcblxuICAgICAgICAgICAgICB2YXIgZ0Zvcm1hdCA9IG5ldyBPcGVuTGF5ZXJzLkZvcm1hdC5HZW9KU09OKHtcbiAgICAgICAgICAgICAgICAgIGV4dGVybmFsUHJvamVjdGlvbjogbENvbmZpZ1snZmVhdHVyZUNycyddLFxuICAgICAgICAgICAgICAgICAgaW50ZXJuYWxQcm9qZWN0aW9uOiBsaXpNYXAubWFwLmdldFByb2plY3Rpb24oKVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdmFyIHRmZWF0dXJlcyA9IGdGb3JtYXQucmVhZCgge1xuICAgICAgICAgICAgICAgICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICAgICAgICAgICAgICAgIGZlYXR1cmVzOiBmRmVhdHVyZXNcbiAgICAgICAgICAgICAgfSApO1xuICAgICAgICAgICAgICB0bGF5ZXIuYWRkRmVhdHVyZXMoIHRmZWF0dXJlcyApO1xuXG4gICAgICAgICAgICAgIGlmICggKCdkaXNwbGF5R2VvbScgaW4gdGNvbmZpZykgJiYgdGNvbmZpZy5kaXNwbGF5R2VvbSA9PSAnVHJ1ZScgKVxuICAgICAgICAgICAgICAgICAgaWYgKCAoJ2NvbG9yR2VvbScgaW4gdGNvbmZpZykgJiYgdGNvbmZpZy5jb2xvckdlb20gIT0gJycgKVxuICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBDb250cm9sLnN0eWxlLnN0cm9rZUNvbG9yID0gdGNvbmZpZy5jb2xvckdlb207XG4gICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgdG9vbHRpcENvbnRyb2wuc3R5bGUuc3Ryb2tlQ29sb3IgPSAnY3lhbic7XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgIHRvb2x0aXBDb250cm9sLnN0eWxlLnN0cm9rZUNvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgICAgICAgICAgICAgaWYgKCB0ZmVhdHVyZXMubGVuZ3RoICE9IDAgJiYgdGZlYXR1cmVzWzBdLmdlb21ldHJ5LmlkLnN0YXJ0c1dpdGgoJ09wZW5MYXllcnNfR2VvbWV0cnlfTGluZVN0cmluZycpIClcbiAgICAgICAgICAgICAgICAgIHRvb2x0aXBDb250cm9sLnN0eWxlLnN0cm9rZVdpZHRoID0gMTA7XG4gICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgIHRvb2x0aXBDb250cm9sLnN0eWxlLnN0cm9rZVdpZHRoID0gMztcbiAgICAgICAgICAgICAgdG9vbHRpcENvbnRyb2wuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgICAgJCgnI3Rvb2x0aXAtbGF5ZXItbGlzdCcpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAkKCcjdG9vbHRpcC1sYXllci1saXN0JykucmVtb3ZlQ2xhc3MoJ2xvYWRpbmcnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuXG4gICAgbGl6TWFwLmV2ZW50cy5vbih7XG4gICAgICAgIG1pbmlkb2Nrb3BlbmVkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoIGUuaWQgPT0gJ3Rvb2x0aXAtbGF5ZXInICkge1xuICAgICAgICAgICAgICAvLyBMb2FkIGZpcnN0IGxheWVyIGF1dG9tYXRpY2FsbHlcbiAgICAgICAgICAgICAgICAkKCcjdG9vbHRpcC1sYXllci1saXN0JykudmFsKCQoXCIjdG9vbHRpcC1sYXllci1saXN0IG9wdGlvbjpudGgtY2hpbGQoMilcIikudmFsKCkpLmNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtaW5pZG9ja2Nsb3NlZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCBlLmlkID09ICd0b29sdGlwLWxheWVyJyApIHtcbiAgICAgICAgICAgICAgLy8gZGVhY3RpdmF0ZSB0b29sdGlwIG9uIGNsb3NlXG4gICAgICAgICAgICAgICQoJyN0b29sdGlwLWxheWVyLWxpc3QnKS52YWwoJycpLmNoYW5nZSgpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGF5ZXJDb25maWdCeUlkKCBhTGF5ZXJJZCwgYUNvbmZPYmpldCwgYUlkQXR0cmlidXRlICkge1xuICAgIC8vIFNldCBmdW5jdGlvbiBwYXJhbWV0ZXJzIGlmIG5vdCBnaXZlblxuICAgIGFDb25mT2JqZXQgPSB0eXBlb2YgYUNvbmZPYmpldCAhPT0gJ3VuZGVmaW5lZCcgPyAgYUNvbmZPYmpldCA6IGNvbmZpZy5sYXllcnM7XG4gICAgYUlkQXR0cmlidXRlID0gdHlwZW9mIGFJZEF0dHJpYnV0ZSAhPT0gJ3VuZGVmaW5lZCcgPyAgYUlkQXR0cmlidXRlIDogJ2lkJztcblxuICAgIC8vIExvb3AgdGhyb3VnaCBsYXllcnMgdG8gZ2V0IHRoZSBvbmUgYnkgaWRcbiAgICBmb3IgKCB2YXIgbHggaW4gYUNvbmZPYmpldCApIHtcbiAgICAgICAgaWYgKCBhQ29uZk9iamV0W2x4XVthSWRBdHRyaWJ1dGVdID09IGFMYXllcklkIClcbiAgICAgICAgICAgIHJldHVybiBbbHgsIGFDb25mT2JqZXRbbHhdIF07XG4gICAgfVxuICAgIHJldHVybiBudWxsO1xuICB9XG5cblxuICBmdW5jdGlvbiBhZGRNZWFzdXJlQ29udHJvbHMoKSB7XG4gICAgLy8gc3R5bGUgdGhlIHNrZXRjaCBmYW5jeVxuICAgIHZhciBza2V0Y2hTeW1ib2xpemVycyA9IHtcbiAgICAgIFwiUG9pbnRcIjoge1xuICAgICAgICBwb2ludFJhZGl1czogNCxcbiAgICAgICAgZ3JhcGhpY05hbWU6IFwic3F1YXJlXCIsXG4gICAgICAgIGZpbGxDb2xvcjogXCJ3aGl0ZVwiLFxuICAgICAgICBmaWxsT3BhY2l0eTogMSxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDEsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiMzMzMzMzNcIlxuICAgICAgfSxcbiAgICAgIFwiTGluZVwiOiB7XG4gICAgICAgIHN0cm9rZVdpZHRoOiAzLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VDb2xvcjogXCIjNjY2NjY2XCIsXG4gICAgICAgIHN0cm9rZURhc2hzdHlsZTogXCJkYXNoXCJcbiAgICAgIH0sXG4gICAgICBcIlBvbHlnb25cIjoge1xuICAgICAgICBzdHJva2VXaWR0aDogMixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzY2NjY2NlwiLFxuICAgICAgICBzdHJva2VEYXNoc3R5bGU6IFwiZGFzaFwiLFxuICAgICAgICBmaWxsQ29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IDAuM1xuICAgICAgfVxuICAgIH07XG4gICAgdmFyIHN0eWxlID0gbmV3IE9wZW5MYXllcnMuU3R5bGUoKTtcbiAgICBzdHlsZS5hZGRSdWxlcyhbXG4gICAgICAgIG5ldyBPcGVuTGF5ZXJzLlJ1bGUoe3N5bWJvbGl6ZXI6IHNrZXRjaFN5bWJvbGl6ZXJzfSlcbiAgICAgICAgXSk7XG4gICAgdmFyIHN0eWxlTWFwID0gbmV3IE9wZW5MYXllcnMuU3R5bGVNYXAoe1wiZGVmYXVsdFwiOiBzdHlsZX0pO1xuXG4gICAgdmFyIG1lYXN1cmVDb250cm9scyA9IHtcbiAgICAgIGxlbmd0aDogbmV3IE9wZW5MYXllcnMuQ29udHJvbC5NZWFzdXJlKFxuICAgICAgICBPcGVuTGF5ZXJzLkhhbmRsZXIuUGF0aCwge1xuICAgICAgICAgIHBlcnNpc3Q6IHRydWUsXG4gICAgICAgICAgZ2VvZGVzaWM6IHRydWUsXG4gICAgICAgICAgaW1tZWRpYXRlOiB0cnVlLFxuICAgICAgICAgIGhhbmRsZXJPcHRpb25zOiB7XG4gICAgICAgICAgICBsYXllck9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgc3R5bGVNYXA6IHN0eWxlTWFwXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSxcbiAgICAgICAgICB0eXBlOk9wZW5MYXllcnMuQ29udHJvbC5UWVBFX1RPT0xcbiAgICAgICAgfVxuICAgICAgKSxcbiAgICAgIGFyZWE6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTWVhc3VyZShcbiAgICAgICAgT3BlbkxheWVycy5IYW5kbGVyLlBvbHlnb24sIHtcbiAgICAgICAgICBwZXJzaXN0OiB0cnVlLFxuICAgICAgICAgIGdlb2Rlc2ljOiB0cnVlLFxuICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcbiAgICAgICAgICBoYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgbGF5ZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgIHN0eWxlTWFwOiBzdHlsZU1hcFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHlwZTpPcGVuTGF5ZXJzLkNvbnRyb2wuVFlQRV9UT09MXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBwZXJpbWV0ZXI6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTWVhc3VyZShcbiAgICAgICAgT3BlbkxheWVycy5IYW5kbGVyLlBvbHlnb24sIHtcbiAgICAgICAgICBwZXJzaXN0OiB0cnVlLFxuICAgICAgICAgIGdlb2Rlc2ljOiB0cnVlLFxuICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcbiAgICAgICAgICBoYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgbGF5ZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgIHN0eWxlTWFwOiBzdHlsZU1hcFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHlwZTpPcGVuTGF5ZXJzLkNvbnRyb2wuVFlQRV9UT09MXG4gICAgICAgIH1cbiAgICAgIClcbiAgICB9O1xuICAgIG1lYXN1cmVDb250cm9scy5sZW5ndGguZXZlbnRzLm9uKHtcbiAgICAgIGFjdGl2YXRlOiBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgbUFkZE1lc3NhZ2UobGl6RGljdFsnbWVhc3VyZS5hY3RpdmF0ZS5sZW5ndGgnXSwnaW5mbycsdHJ1ZSkuYXR0cignaWQnLCdsaXptYXAtbWVhc3VyZS1tZXNzYWdlJyk7XG4gICAgICB9LFxuICAgICAgZGVhY3RpdmF0ZTogZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICQoJyNsaXptYXAtbWVhc3VyZS1tZXNzYWdlJykucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgbWVhc3VyZUNvbnRyb2xzLmFyZWEuZXZlbnRzLm9uKHtcbiAgICAgIGFjdGl2YXRlOiBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgbUFkZE1lc3NhZ2UobGl6RGljdFsnbWVhc3VyZS5hY3RpdmF0ZS5hcmVhJ10sJ2luZm8nLHRydWUpLmF0dHIoJ2lkJywnbGl6bWFwLW1lYXN1cmUtbWVzc2FnZScpO1xuICAgICAgfSxcbiAgICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAkKCcjbGl6bWFwLW1lYXN1cmUtbWVzc2FnZScpLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG1lYXN1cmVDb250cm9scy5wZXJpbWV0ZXIubWVhc3VyZSA9IGZ1bmN0aW9uKGdlb21ldHJ5LCBldmVudFR5cGUpIHtcbiAgICAgICAgdmFyIHN0YXQsIG9yZGVyO1xuICAgICAgICBpZiggT3BlbkxheWVycy5VdGlsLmluZGV4T2YoIGdlb21ldHJ5LkNMQVNTX05BTUUsICdMaW5lU3RyaW5nJyApID4gLTEpIHtcbiAgICAgICAgICAgIHN0YXQgPSB0aGlzLmdldEJlc3RMZW5ndGgoZ2VvbWV0cnkpO1xuICAgICAgICAgICAgb3JkZXIgPSAxO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RhdCA9IHRoaXMuZ2V0QmVzdExlbmd0aChnZW9tZXRyeS5jb21wb25lbnRzWzBdKTtcbiAgICAgICAgICAgIG9yZGVyID0gMTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyRXZlbnQoZXZlbnRUeXBlLCB7XG4gICAgICAgICAgICBtZWFzdXJlOiBzdGF0WzBdLFxuICAgICAgICAgICAgdW5pdHM6IHN0YXRbMV0sXG4gICAgICAgICAgICBvcmRlcjogb3JkZXIsXG4gICAgICAgICAgICBnZW9tZXRyeTogZ2VvbWV0cnlcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBtZWFzdXJlQ29udHJvbHMucGVyaW1ldGVyLmV2ZW50cy5vbih7XG4gICAgICBhY3RpdmF0ZTogZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIG1BZGRNZXNzYWdlKGxpekRpY3RbJ21lYXN1cmUuYWN0aXZhdGUucGVyaW1ldGVyJ10sJ2luZm8nLHRydWUpLmF0dHIoJ2lkJywnbGl6bWFwLW1lYXN1cmUtbWVzc2FnZScpO1xuICAgICAgfSxcbiAgICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAkKCcjbGl6bWFwLW1lYXN1cmUtbWVzc2FnZScpLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gaGFuZGxlTWVhc3VyZW1lbnRzKGV2dCkge1xuICAgICAgdmFyIGdlb21ldHJ5ID0gZXZ0Lmdlb21ldHJ5O1xuICAgICAgdmFyIHVuaXRzID0gZXZ0LnVuaXRzO1xuICAgICAgdmFyIG9yZGVyID0gZXZ0Lm9yZGVyO1xuICAgICAgdmFyIG1lYXN1cmUgPSBldnQubWVhc3VyZTtcbiAgICAgIHZhciBvdXQgPSBcIlwiO1xuICAgICAgaWYob3JkZXIgPT0gMSkge1xuICAgICAgICBvdXQgKz0gbGl6RGljdFsnbWVhc3VyZS5oYW5kbGUnXStcIiBcIiArIG1lYXN1cmUudG9GaXhlZCgzKSArIFwiIFwiICsgdW5pdHM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvdXQgKz0gbGl6RGljdFsnbWVhc3VyZS5oYW5kbGUnXStcIiBcIiArIG1lYXN1cmUudG9GaXhlZCgzKSArIFwiIFwiICsgdW5pdHMgKyBcIjxzdXA+MjwvXCIgKyBcInN1cD5cIjtcbiAgICAgIH1cbiAgICAgIHZhciBlbGVtZW50ID0gJCgnI2xpem1hcC1tZWFzdXJlLW1lc3NhZ2UnKTtcbiAgICAgIGlmICggZWxlbWVudC5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgZWxlbWVudCA9IG1BZGRNZXNzYWdlKG91dCk7XG4gICAgICAgIGVsZW1lbnQuYXR0cignaWQnLCdsaXptYXAtbWVhc3VyZS1tZXNzYWdlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbGVtZW50Lmh0bWwoJzxwPicrb3V0Kyc8L3A+Jyk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvcih2YXIga2V5IGluIG1lYXN1cmVDb250cm9scykge1xuICAgICAgdmFyIGNvbnRyb2wgPSBtZWFzdXJlQ29udHJvbHNba2V5XTtcbiAgICAgIGNvbnRyb2wuZXZlbnRzLm9uKHtcbiAgICAgICAgXCJtZWFzdXJlXCI6IGhhbmRsZU1lYXN1cmVtZW50cyxcbiAgICAgICAgXCJtZWFzdXJlcGFydGlhbFwiOiBoYW5kbGVNZWFzdXJlbWVudHMsXG4gICAgICAgIFwiYWN0aXZhdGVcIjogZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgbWFwLmFkZENvbnRyb2woY29udHJvbCk7XG4gICAgICBjb250cm9sc1trZXkrJ01lYXN1cmUnXSA9IGNvbnRyb2w7XG4gICAgfVxuICAgICQoJyNtZWFzdXJlLXR5cGUnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgc2VsZi5maW5kKCdvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIHZhbCA9ICQoIHRoaXMgKS5hdHRyKCd2YWx1ZScpO1xuICAgICAgICAgICAgaWYgKCB2YWwgaW4gbWVhc3VyZUNvbnRyb2xzICYmIG1lYXN1cmVDb250cm9sc1t2YWxdLmFjdGl2ZSApXG4gICAgICAgICAgICAgIG1lYXN1cmVDb250cm9sc1t2YWxdLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgfSk7XG4gICAgICAgIG1lYXN1cmVDb250cm9sc1tzZWxmLnZhbCgpXS5hY3RpdmF0ZSgpO1xuICAgIH0pO1xuICAgIGxpek1hcC5ldmVudHMub24oe1xuICAgICAgICBtaW5pZG9ja29wZW5lZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCBlLmlkID09ICdtZWFzdXJlJyApIHtcbiAgICAgICAgICAgICAgICAkKCcjbWVhc3VyZS10eXBlJykuY2hhbmdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1pbmlkb2NrY2xvc2VkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoIGUuaWQgPT0gJ21lYXN1cmUnICkge1xuICAgICAgICAgICAgICAgIHZhciBhY3RpdmVDdHJsID0gJyc7XG4gICAgICAgICAgICAgICAgJCgnI21lYXN1cmUtdHlwZSBvcHRpb24nKS5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdmFsID0gJCggdGhpcyApLmF0dHIoJ3ZhbHVlJyk7XG4gICAgICAgICAgICAgICAgICAgIGlmICggdmFsIGluIG1lYXN1cmVDb250cm9scyAmJiBtZWFzdXJlQ29udHJvbHNbdmFsXS5hY3RpdmUgKVxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlQ3RybCA9IHZhbDtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBpZiAoIGFjdGl2ZUN0cmwgIT0gJycgKVxuICAgICAgICAgICAgICAgICAgICBtZWFzdXJlQ29udHJvbHNbYWN0aXZlQ3RybF0uZGVhY3RpdmF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAgICQoJyNtZWFzdXJlLXN0b3AnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgJCgnI2J1dHRvbi1tZWFzdXJlJykuY2xpY2soKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBtZWFzdXJlQ29udHJvbHM7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRHZW9sb2NhdGlvbkNvbnRyb2woKSB7XG4gICAgdmFyIHN0eWxlID0ge1xuICAgICAgZmlsbENvbG9yOiAnIzAzOTVENicsXG4gICAgICBmaWxsT3BhY2l0eTogMC4xLFxuICAgICAgc3Ryb2tlQ29sb3I6ICcjMDM5NUQ2JyxcbiAgICAgIHN0cm9rZVdpZHRoOiAxXG4gICAgfTtcbiAgICB2YXIgdmVjdG9yID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKCdnZW9sb2NhdGlvbicpO1xuICAgIG1hcC5hZGRMYXllcih2ZWN0b3IpO1xuICAgIHZhciBnZW9sb2NhdGUgPSBuZXcgT3BlbkxheWVycy5Db250cm9sLkdlb2xvY2F0ZSh7XG4gICAgICB0eXBlOiBPcGVuTGF5ZXJzLkNvbnRyb2wuVFlQRV9UT0dHTEUsXG4gICAgICBiaW5kOiBmYWxzZSxcbiAgICAgIHdhdGNoOiB0cnVlLFxuICAgICAgbGF5ZXI6IHZlY3RvcixcbiAgICAgIGdlb2xvY2F0aW9uT3B0aW9uczoge1xuICAgICAgICBlbmFibGVIaWdoQWNjdXJhY3k6IHRydWUsXG4gICAgICAgIG1heGltdW1BZ2U6IDUwMDAsXG4gICAgICAgIHRpbWVvdXQ6IDMwMDAwXG4gICAgICB9XG4gICAgfSk7XG4gICAgbWFwLmFkZENvbnRyb2woZ2VvbG9jYXRlKTtcbiAgICB2YXIgZmlyc3RHZW9sb2NhdGlvbiA9IHRydWU7XG4gICAgZ2VvbG9jYXRlLmV2ZW50cy5vbih7XG4gICAgICBcImxvY2F0aW9udXBkYXRlZFwiOiBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgaWYgKCB0aGlzLmxheWVyLmZlYXR1cmVzLmxlbmd0aCA9PSAwICkge1xuICAgICAgICAgICAgdmFyIGNpcmNsZSA9IG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKFxuICAgICAgICAgICAgICBPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvbHlnb24uY3JlYXRlUmVndWxhclBvbHlnb24oXG4gICAgICAgICAgICAgICAgZXZ0LnBvaW50LmNsb25lKCksXG4gICAgICAgICAgICAgICAgZXZ0LnBvc2l0aW9uLmNvb3Jkcy5hY2N1cmFjeS8yLFxuICAgICAgICAgICAgICAgIDQwLFxuICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgIHN0eWxlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5sYXllci5hZGRGZWF0dXJlcyhbXG4gICAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLkZlYXR1cmUuVmVjdG9yKFxuICAgICAgICAgICAgICAgIGV2dC5wb2ludCxcbiAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBncmFwaGljTmFtZTogJ2NpcmNsZScsXG4gICAgICAgICAgICAgICAgICBzdHJva2VDb2xvcjogJyMwMzk1RDYnLFxuICAgICAgICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDEsXG4gICAgICAgICAgICAgICAgICBmaWxsT3BhY2l0eTogMSxcbiAgICAgICAgICAgICAgICAgIGZpbGxDb2xvcjogJyMwMzk1RDYnLFxuICAgICAgICAgICAgICAgICAgcG9pbnRSYWRpdXM6IDNcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIGNpcmNsZVxuICAgICAgICAgICAgXSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgcG9pbnQgPSB0aGlzLmxheWVyLmZlYXR1cmVzWzBdO1xuICAgICAgICAgICAgcG9pbnQuZ2VvbWV0cnkueCA9IGV2dC5wb2ludC54O1xuICAgICAgICAgICAgcG9pbnQuZ2VvbWV0cnkueSA9IGV2dC5wb2ludC55O1xuICAgICAgICAgICAgcG9pbnQuZ2VvbWV0cnkuY2xlYXJCb3VuZHMoKTtcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuZHJhd0ZlYXR1cmUocG9pbnQpO1xuICAgICAgICAgICAgdmFyIGNpcmNsZSA9IHRoaXMubGF5ZXIuZmVhdHVyZXNbMV07XG4gICAgICAgICAgICB0aGlzLmxheWVyLmRlc3Ryb3lGZWF0dXJlcyhbY2lyY2xlXSk7XG4gICAgICAgICAgICBjaXJjbGUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvcihcbiAgICAgICAgICAgICAgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2x5Z29uLmNyZWF0ZVJlZ3VsYXJQb2x5Z29uKFxuICAgICAgICAgICAgICAgIGV2dC5wb2ludC5jbG9uZSgpLFxuICAgICAgICAgICAgICAgIGV2dC5wb3NpdGlvbi5jb29yZHMuYWNjdXJhY3kvMixcbiAgICAgICAgICAgICAgICA0MCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICBzdHlsZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuYWRkRmVhdHVyZXMoW2NpcmNsZV0pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmaXJzdEdlb2xvY2F0aW9uKSB7XG4gICAgICAgICAgbWFwLnpvb21Ub0V4dGVudCh2ZWN0b3IuZ2V0RGF0YUV4dGVudCgpKTtcbiAgICAgICAgICBmaXJzdEdlb2xvY2F0aW9uID0gZmFsc2U7XG4gICAgICAgICAgaWYgKCAkKCcjZ2VvbG9jYXRlLW1lbnUtYmluZCcpLmhhc0NsYXNzKCdhY3RpdmUnKSApXG4gICAgICAgICAgICB0aGlzLmJpbmQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgICQoJyNnZW9sb2NhdGlvbiAuYnV0dG9uLWJhciBidXR0b24nKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgfSxcbiAgICAgIFwibG9jYXRpb25mYWlsZWRcIjogZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIGlmICggdGhpcy5sYXllci5mZWF0dXJlcy5sZW5ndGggPT0gMCAmJiAkKCcjZ2VvbG9jYXRpb24tbG9jYXRpb25mYWlsZWQnKS5sZW5ndGggIT0gMClcbiAgICAgICAgICBtQWRkTWVzc2FnZSgnPHNwYW4gaWQ9XCJnZW9sb2NhdGlvbi1sb2NhdGlvbmZhaWxlZFwiPicrbGl6RGljdFsnZ2VvbG9jYXRpb24uZmFpbGVkJ10rJzwvc3Bhbj4nLCdlcnJvcicsdHJ1ZSk7XG4gICAgICB9LFxuICAgICAgXCJhY3RpdmF0ZVwiOiBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgICAkKCcjZ2VvbG9jYXRpb24tc3RvcCcpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG4gICAgICB9LFxuICAgICAgXCJkZWFjdGl2YXRlXCI6IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICBmaXJzdEdlb2xvY2F0aW9uID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5iaW5kID0gZmFsc2U7XG4gICAgICAgICQoJyNnZW9sb2NhdGlvbiAuYnV0dG9uLWJhciBidXR0b24nKS5hdHRyKCdkaXNhYmxlZCcsJ2Rpc2FibGVkJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB0aGlzLmxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGNvbnRyb2xzWydnZW9sb2NhdGlvbiddID0gZ2VvbG9jYXRlO1xuICAgIGxpek1hcC5ldmVudHMub24oe1xuICAgICAgICBtaW5pZG9ja29wZW5lZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCBlLmlkID09ICdnZW9sb2NhdGlvbicgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFnZW9sb2NhdGUuYWN0aXZlKVxuICAgICAgICAgICAgICAgICAgICBnZW9sb2NhdGUuYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcblxuICAgICAgICBtaW5pZG9ja2Nsb3NlZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCBlLmlkID09ICdnZW9sb2NhdGlvbicgKSB7XG4gICAgICAgICAgICAgICAgaWYgKGdlb2xvY2F0ZS5hY3RpdmUgJiYgdmVjdG9yLmZlYXR1cmVzLmxlbmd0aCA9PSAwIClcbiAgICAgICAgICAgICAgICAgICAgZ2VvbG9jYXRlLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICAgICQoJyNnZW9sb2NhdGlvbi1jZW50ZXInKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgaWYgKCAhZ2VvbG9jYXRlLmFjdGl2ZSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgaWYgKHZlY3Rvci5mZWF0dXJlcy5sZW5ndGggIT0gMCApXG4gICAgICAgIG1hcC5zZXRDZW50ZXIodmVjdG9yLmdldERhdGFFeHRlbnQoKS5nZXRDZW50ZXJMb25MYXQoKSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnI2dlb2xvY2F0aW9uLWJpbmQnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgaWYgKCAhZ2VvbG9jYXRlLmFjdGl2ZSApXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgIGlmICggc2VsZi5oYXNDbGFzcygnYWN0aXZlJykgKSB7XG4gICAgICAgICQoJyNnZW9sb2NhdGlvbi1jZW50ZXInKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgZ2VvbG9jYXRlLmJpbmQgPSBmYWxzZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNlbGYuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAkKCcjZ2VvbG9jYXRpb24tY2VudGVyJykuYXR0cignZGlzYWJsZWQnLCdkaXNhYmxlZCcpO1xuICAgICAgICBnZW9sb2NhdGUuYmluZCA9IHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgZnVuY3Rpb24gc3RvcEdlb2xvY2F0aW9uKCl7XG4gICAgICBpZiAoIGdlb2xvY2F0ZS5hY3RpdmUgKVxuICAgICAgICBnZW9sb2NhdGUuZGVhY3RpdmF0ZSgpO1xuICAgICAgJCgnI2J1dHRvbi1nZW9sb2NhdGlvbicpLmNsaWNrKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgICQoJyNnZW9sb2NhdGlvbi1zdG9wJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgIHN0b3BHZW9sb2NhdGlvbigpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNnZW9sb2NhdGlvbiBidXR0b24uYnRuLWdlb2xvY2F0aW9uLWNsb3NlJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICQoJyNidXR0b24tZ2VvbG9jYXRpb24nKS5jbGljaygpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IHBhcnNlRGF0YVxuICAgKiBwYXJzaW5nIGNhcGFiaWxpdHlcbiAgICpcbiAgICogUGFyYW1ldGVyczpcbiAgICogYURhdGEgLSB7U3RyaW5nfSB0aGUgV01TIGNhcGFiaWxpdGllc1xuICAgKlxuICAgKiBSZXR1cm5zOlxuICAgKiB7Qm9vbGVhbn0gdGhlIGNhcGFiaWxpdHkgaXMgT0tcbiAgICovXG4gIGZ1bmN0aW9uIHBhcnNlRGF0YShhRGF0YSkge1xuICAgIHZhciBmb3JtYXQgPSAgbmV3IE9wZW5MYXllcnMuRm9ybWF0LldNU0NhcGFiaWxpdGllcyh7dmVyc2lvbjonMS4zLjAnfSk7XG4gICAgdmFyIGh0bWwgPSBcIlwiO1xuICAgIGNhcGFiaWxpdGllcyA9IGZvcm1hdC5yZWFkKGFEYXRhKTtcblxuICAgIHZhciBmb3JtYXQgPSBuZXcgT3BlbkxheWVycy5Gb3JtYXQuWE1MKCk7XG4gICAgY29tcG9zZXJzID0gZm9ybWF0LnJlYWQoYURhdGEpLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdDb21wb3NlclRlbXBsYXRlJyk7XG5cbiAgICB2YXIgY2FwYWJpbGl0eSA9IGNhcGFiaWxpdGllcy5jYXBhYmlsaXR5O1xuICAgIGlmICghY2FwYWJpbGl0eSkge1xuICAgICAgJCgnI21hcCcpLmh0bWwoJ1NFUlZJQ0UgTk9OIERJU1BPTklCTEUhJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGxvYWRQcm9qRGVmaW5pdGlvblxuICAgKiBsb2FkIENSUyBkZWZpbml0aW9uIGFuZCBhY3RpdmF0ZSBpdFxuICAgKlxuICAgKiBQYXJhbWV0ZXJzOlxuICAgKiBhQ1JTIC0ge1N0cmluZ31cbiAgICogYUNhbGxiYWxjayAtIHtmdW5jdGlvbiAoIHByb2ogKX1cbiAgICpcbiAgICovXG4gIGZ1bmN0aW9uIGxvYWRQcm9qRGVmaW5pdGlvbiggYUNSUywgYUNhbGxiYWNrICkge1xuICAgIHZhciBwcm9qID0gYUNSUy5yZXBsYWNlKC9eXFxzK3xcXHMrJC9nLCAnJyk7IC8vIHRyaW0oKTtcbiAgICBpZiAoIHByb2ogaW4gUHJvajRqcy5kZWZzICkge1xuICAgICAgYUNhbGxiYWNrKCBwcm9qICk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQuZ2V0KCBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKFxuICAgICAgICAgIGxpelVybHMud21zXG4gICAgICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgICAgICksIHtcbiAgICAgICAgICAnUkVRVUVTVCc6J0dldFByb2o0J1xuICAgICAgICAgLCdhdXRoaWQnOiBwcm9qXG4gICAgICAgIH0sIGZ1bmN0aW9uICggYVRleHQgKSB7XG4gICAgICAgICAgUHJvajRqcy5kZWZzW3Byb2pdID0gYVRleHQ7XG4gICAgICAgICAgbmV3IE9wZW5MYXllcnMuUHJvamVjdGlvbihwcm9qKTtcbiAgICAgICAgICBhQ2FsbGJhY2soIHByb2ogKTtcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogbUNoZWNrTW9iaWxlXG4gICAqIENoZWNrIHdldGhlciBpbiBtb2JpbGUgY29udGV4dC5cbiAgICpcbiAgICpcbiAgICogUmV0dXJuczpcbiAgICoge0Jvb2xlYW59IFRydWUgaWYgaW4gbW9iaWxlIGNvbnRleHQuXG4gICAqL1xuICBmdW5jdGlvbiBtQ2hlY2tNb2JpbGUoKSB7XG4gICAgdmFyIG1pbk1hcFNpemUgPSA0NTA7XG4gICAgdmFyIHcgPSAkKCdib2R5JykucGFyZW50KClbMF0ub2Zmc2V0V2lkdGg7XG4gICAgdmFyIGxlZnRXID0gdyAtIG1pbk1hcFNpemU7XG4gICAgaWYobGVmdFcgPCBtaW5NYXBTaXplIHx8IHcgPCBtaW5NYXBTaXplKVxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IG1BZGRNZXNzYWdlXG4gICAqIFdyaXRlIG1lc3NhZ2UgdG8gdGhlIFVJXG4gICAqXG4gICAqXG4gICAqIFJldHVybnM6XG4gICAqIHtqUXVlcnkgT2JqZWN0fSBUaGUgbWVzc2FnZSBhZGRlZC5cbiAgICovXG4gIGZ1bmN0aW9uIG1BZGRNZXNzYWdlKCBhTWVzc2FnZSwgYVR5cGUsIGFDbG9zZSApIHtcbiAgICB2YXIgbVR5cGUgPSAnaW5mbyc7XG4gICAgdmFyIG1UeXBlTGlzdCA9IFsnaW5mbycsICdlcnJvcicsICdzdWNjZXNzJ107XG4gICAgdmFyIG1DbG9zZSA9IGZhbHNlO1xuXG4gICAgaWYgKCAkLmluQXJyYXkoYVR5cGUsIG1UeXBlTGlzdCkgIT0gLTEgKVxuICAgICAgbVR5cGUgPSBhVHlwZTtcblxuICAgIGlmICggYUNsb3NlIClcbiAgICAgIG1DbG9zZSA9IHRydWU7XG5cbiAgICB2YXIgaHRtbCA9ICc8ZGl2IGNsYXNzPVwiYWxlcnQgYWxlcnQtYmxvY2sgYWxlcnQtJyttVHlwZSsnIGZhZGUgaW5cIiBkYXRhLWFsZXJ0PVwiYWxlcnRcIj4nO1xuICAgIGlmICggbUNsb3NlIClcbiAgICAgIGh0bWwgKz0gJzxhIGNsYXNzPVwiY2xvc2VcIiBkYXRhLWRpc21pc3M9XCJhbGVydFwiIGhyZWY9XCIjXCI+w5c8L2E+JztcbiAgICBodG1sICs9ICc8cD4nK2FNZXNzYWdlKyc8L3A+JztcbiAgICBodG1sICs9ICc8L2Rpdj4nO1xuXG4gICAgdmFyIGVsdCA9ICQoaHRtbCk7XG4gICAgJCgnI21lc3NhZ2UnKS5hcHBlbmQoZWx0KTtcbiAgICByZXR1cm4gZWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGV4cG9ydFZlY3RvckxheWVyXG4gICAqIFdyaXRlIG1lc3NhZ2UgdG8gdGhlIFVJXG4gICAqXG4gICAqXG4gICAqIFJldHVybnM6XG4gICAqIHtqUXVlcnkgT2JqZWN0fSBUaGUgbWVzc2FnZSBhZGRlZC5cbiAgICovXG4gIGZ1bmN0aW9uIGV4cG9ydFZlY3RvckxheWVyKCBhTmFtZSwgZWZvcm1hdCwgcmVzdHJpY3RUb01hcEV4dGVudCApIHtcblxuICAgICAgcmVzdHJpY3RUb01hcEV4dGVudCA9IHR5cGVvZiByZXN0cmljdFRvTWFwRXh0ZW50ICE9PSAndW5kZWZpbmVkJyA/ICByZXN0cmljdFRvTWFwRXh0ZW50IDogbnVsbDtcblxuICAgICAgLy8gcmlnaHQgbm90IHNldFxuICAgICAgaWYgKCAhKCdleHBvcnRMYXllcnMnIGluIGxpek1hcC5jb25maWcub3B0aW9ucykgfHwgbGl6TWFwLmNvbmZpZy5vcHRpb25zLmV4cG9ydExheWVycyAhPSAnVHJ1ZScgKSB7XG4gICAgICAgIG1BZGRNZXNzYWdlKGxpekRpY3RbJ2xheWVyLmV4cG9ydC5yaWdodC5yZXF1aXJlZCddLCdlcnJvcicsdHJ1ZSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IGZ1bmN0aW9uIHBhcmFtZXRlcnMgaWYgbm90IGdpdmVuXG4gICAgICBlZm9ybWF0ID0gdHlwZW9mIGVmb3JtYXQgIT09ICd1bmRlZmluZWQnID8gIGVmb3JtYXQgOiAnR2VvSlNPTic7XG5cbiAgICAgIC8vIEdldCBzZWxlY3RlZCBmZWF0dXJlc1xuICAgICAgdmFyIGNsZWFuTmFtZSA9IGxpek1hcC5jbGVhbk5hbWUoIGFOYW1lICk7XG4gICAgICB2YXIgc2VsZWN0aW9uTGF5ZXIgPSBnZXRMYXllck5hbWVCeUNsZWFuTmFtZSggY2xlYW5OYW1lICk7XG5cbiAgICAgIGlmKCAhc2VsZWN0aW9uTGF5ZXIgKVxuICAgICAgICBzZWxlY3Rpb25MYXllciA9IGFOYW1lO1xuXG4gICAgICB2YXIgZmVhdHVyZWlkID0gZ2V0VmVjdG9yTGF5ZXJTZWxlY3Rpb25GZWF0dXJlSWRzU3RyaW5nKCBzZWxlY3Rpb25MYXllciApO1xuXG4gICAgICAvLyBHZXQgV0ZTIHVybCBhbmQgb3B0aW9uc1xuICAgICAgdmFyIGdldEZlYXR1cmVVcmxEYXRhID0gZ2V0VmVjdG9yTGF5ZXJXZnNVcmwoIGFOYW1lLCBudWxsLCBmZWF0dXJlaWQsIG51bGwsIHJlc3RyaWN0VG9NYXBFeHRlbnQgKTtcblxuICAgICAgLy8gRm9yY2UgZG93bmxvYWRcbiAgICAgIGdldEZlYXR1cmVVcmxEYXRhWydvcHRpb25zJ11bJ2RsJ10gPSAxO1xuXG4gICAgICAvLyBTZXQgZXhwb3J0IGZvcm1hdFxuICAgICAgZ2V0RmVhdHVyZVVybERhdGFbJ29wdGlvbnMnXVsnT1VUUFVURk9STUFUJ10gPSBlZm9ybWF0O1xuXG4gICAgICAvLyBCdWlsZCBXRlMgdXJsXG4gICAgICB2YXIgZXhwb3J0VXJsID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChcbiAgICAgICAgICBnZXRGZWF0dXJlVXJsRGF0YVsndXJsJ10sXG4gICAgICAgICAgT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyggZ2V0RmVhdHVyZVVybERhdGFbJ29wdGlvbnMnXSApXG4gICAgICApO1xuXG4gICAgICAvLyBPcGVuIGluIG5ldyB3aW5kb3dcbiAgICAgIHdpbmRvdy5vcGVuKCBleHBvcnRVcmwgKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFZlY3RvckxheWVyU2VsZWN0aW9uRmVhdHVyZUlkc1N0cmluZyggYU5hbWUgKSB7XG4gICAgICB2YXIgZmVhdHVyZWlkUGFyYW1ldGVyID0gJyc7XG4gICAgICBpZiggYU5hbWUgaW4gY29uZmlnLmxheWVycyAmJiBjb25maWcubGF5ZXJzW2FOYW1lXVsnc2VsZWN0ZWRGZWF0dXJlcyddICl7XG4gICAgICAgICAgdmFyIGZpZHMgPSBbXTtcblxuICAgICAgICAgIC8vIEdldCBXRlMgdHlwZW5hbWVcbiAgICAgICAgICB2YXIgY29uZmlnTGF5ZXIgPSBjb25maWcubGF5ZXJzW2FOYW1lXTtcbiAgICAgICAgICB2YXIgdHlwZU5hbWUgPSBhTmFtZS5zcGxpdCgnICcpLmpvaW4oJ18nKTtcbiAgICAgICAgICBpZiAoICdzaG9ydG5hbWUnIGluIGNvbmZpZ0xheWVyICYmIGNvbmZpZ0xheWVyLnNob3J0bmFtZSAhPSAnJyApXG4gICAgICAgICAgICAgIHR5cGVOYW1lID0gY29uZmlnTGF5ZXIuc2hvcnRuYW1lO1xuXG4gICAgICAgICAgZm9yKCB2YXIgaWQgaW4gY29uZmlnTGF5ZXJbJ3NlbGVjdGVkRmVhdHVyZXMnXSApIHtcbiAgICAgICAgICAgICAgZmlkcy5wdXNoKCB0eXBlTmFtZSArICcuJyArIGNvbmZpZ0xheWVyWydzZWxlY3RlZEZlYXR1cmVzJ11baWRdICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKCBmaWRzLmxlbmd0aCApXG4gICAgICAgICAgICAgIGZlYXR1cmVpZFBhcmFtZXRlciA9IGZpZHMuam9pbigpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmVhdHVyZWlkUGFyYW1ldGVyO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VmVjdG9yTGF5ZXJXZnNVcmwoIGFOYW1lLCBhRmlsdGVyLCBhRmVhdHVyZUlkLCBnZW9tZXRyeU5hbWUsIHJlc3RyaWN0VG9NYXBFeHRlbnQsIHN0YXJ0SW5kZXgsIG1heEZlYXR1cmVzICkge1xuICAgICAgdmFyIGdldEZlYXR1cmVVcmxEYXRhID0ge307XG5cbiAgICAgIC8vIFNldCBmdW5jdGlvbiBwYXJhbWV0ZXJzIGlmIG5vdCBnaXZlblxuICAgICAgYUZpbHRlciA9IHR5cGVvZiBhRmlsdGVyICE9PSAndW5kZWZpbmVkJyA/ICBhRmlsdGVyIDogbnVsbDtcbiAgICAgIGFGZWF0dXJlSWQgPSB0eXBlb2YgYUZlYXR1cmVJZCAhPT0gJ3VuZGVmaW5lZCcgPyAgYUZlYXR1cmVJZCA6IG51bGw7XG4gICAgICBnZW9tZXRyeU5hbWUgPSB0eXBlb2YgZ2VvbWV0cnlOYW1lICE9PSAndW5kZWZpbmVkJyA/ICBnZW9tZXRyeU5hbWUgOiBudWxsO1xuICAgICAgcmVzdHJpY3RUb01hcEV4dGVudCA9IHR5cGVvZiByZXN0cmljdFRvTWFwRXh0ZW50ICE9PSAndW5kZWZpbmVkJyA/ICByZXN0cmljdFRvTWFwRXh0ZW50IDogZmFsc2U7XG4gICAgICBzdGFydEluZGV4ID0gdHlwZW9mIHN0YXJ0SW5kZXggIT09ICd1bmRlZmluZWQnID8gIHN0YXJ0SW5kZXggOiBudWxsO1xuICAgICAgbWF4RmVhdHVyZXMgPSB0eXBlb2YgbWF4RmVhdHVyZXMgIT09ICd1bmRlZmluZWQnID8gIG1heEZlYXR1cmVzIDogbnVsbDtcblxuICAgICAgLy8gQnVpbGQgV0ZTIHJlcXVlc3QgcGFyYW1ldGVyc1xuICAgICAgaWYgKCAhKGFOYW1lIGluIGNvbmZpZy5sYXllcnMpICkge1xuICAgICAgICAgIHZhciBxZ2lzTmFtZSA9IGxpek1hcC5nZXROYW1lQnlDbGVhbk5hbWUoYU5hbWUpO1xuICAgICAgICAgIGlmICggIXFnaXNOYW1lIHx8ICEocWdpc05hbWUgaW4gY29uZmlnLmxheWVycykpXG4gICAgICAgICAgICBxZ2lzTmFtZSA9IGxpek1hcC5nZXROYW1lQnlTaG9ydE5hbWUoYU5hbWUpO1xuICAgICAgICAgIGlmICggIXFnaXNOYW1lIHx8ICEocWdpc05hbWUgaW4gY29uZmlnLmxheWVycykpXG4gICAgICAgICAgICBxZ2lzTmFtZSA9IGxpek1hcC5nZXROYW1lQnlUeXBlTmFtZShhTmFtZSk7XG4gICAgICAgICAgaWYgKCBxZ2lzTmFtZSAmJiAocWdpc05hbWUgaW4gY29uZmlnLmxheWVycykpIHtcbiAgICAgICAgICAgICAgYU5hbWUgPSBxZ2lzTmFtZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBjb25zb2xlLmxvZygnZ2V0VmVjdG9yTGF5ZXJXZnNVcmw6IFwiJythTmFtZSsnXCIgYW5kIFwiJytxZ2lzTmFtZSsnXCIgbm90IGZvdW5kIGluIGNvbmZpZycpO1xuICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGNvbmZpZ0xheWVyID0gY29uZmlnLmxheWVyc1thTmFtZV07XG4gICAgICB2YXIgdHlwZU5hbWUgPSBhTmFtZS5zcGxpdCgnICcpLmpvaW4oJ18nKTtcbiAgICAgIGlmICggJ3Nob3J0bmFtZScgaW4gY29uZmlnTGF5ZXIgJiYgY29uZmlnTGF5ZXIuc2hvcnRuYW1lICE9ICcnIClcbiAgICAgICAgdHlwZU5hbWUgPSBjb25maWdMYXllci5zaG9ydG5hbWU7XG4gICAgICBlbHNlIGlmICggJ3R5cGVuYW1lJyBpbiBjb25maWdMYXllciAmJiBjb25maWdMYXllci50eXBlbmFtZSAhPSAnJyApXG4gICAgICAgICAgdHlwZU5hbWUgPSBjb25maWdMYXllci50eXBlbmFtZTtcbiAgICAgIHZhciBsYXllck5hbWUgPSBjbGVhbk5hbWUoYU5hbWUpO1xuXG4gICAgICB2YXIgd2ZzT3B0aW9ucyA9IHtcbiAgICAgICAgICAnU0VSVklDRSc6J1dGUydcbiAgICAgICAgICAsJ1ZFUlNJT04nOicxLjAuMCdcbiAgICAgICAgICAsJ1JFUVVFU1QnOidHZXRGZWF0dXJlJ1xuICAgICAgICAgICwnVFlQRU5BTUUnOnR5cGVOYW1lXG4gICAgICAgICAgLCdPVVRQVVRGT1JNQVQnOidHZW9KU09OJ1xuICAgICAgfTtcblxuICAgICAgaWYoIHN0YXJ0SW5kZXggKVxuICAgICAgICAgIHdmc09wdGlvbnNbJ1NUQVJUSU5ERVgnXSA9IHN0YXJ0SW5kZXg7XG5cbiAgICAgIGlmKCBtYXhGZWF0dXJlcyApXG4gICAgICAgICAgd2ZzT3B0aW9uc1snTUFYRkVBVFVSRVMnXSA9IG1heEZlYXR1cmVzO1xuXG4gICAgICB2YXIgZmlsdGVyUGFyYW0gPSBbXTtcblxuICAgICAgaWYoIGFGaWx0ZXIgKXtcbiAgICAgICAgICAvLyBSZW1vdmUgbGF5ZXJOYW1lIGZvbGxvd2VkIGJ5IDpcbiAgICAgICAgICBhRmlsdGVyID0gYUZpbHRlci5yZXBsYWNlKCBhTmFtZSArICc6JywgJycpO1xuICAgICAgICAgIGlmICggYUZpbHRlciAhPSAnJyApXG4gICAgICAgICAgICBmaWx0ZXJQYXJhbS5wdXNoKCBhRmlsdGVyICk7XG4gICAgICB9ZWxzZXtcbiAgICAgICAgICAvLyBJZiBub3QgZmlsdGVyIHBhc3NlZCwgY2hlY2sgaWYgYSBmaWx0ZXIgZG9lcyBub3QgZXhpc3RzIGZvciB0aGUgbGF5ZXJcbiAgICAgICAgICBpZiggJ3JlcXVlc3RfcGFyYW1zJyBpbiBjb25maWcubGF5ZXJzW2FOYW1lXSAmJiAnZmlsdGVyJyBpbiBjb25maWcubGF5ZXJzW2FOYW1lXVsncmVxdWVzdF9wYXJhbXMnXSApe1xuICAgICAgICAgICAgdmFyIGFGaWx0ZXIgPSBjb25maWcubGF5ZXJzW2FOYW1lXVsncmVxdWVzdF9wYXJhbXMnXVsnZmlsdGVyJ107XG4gICAgICAgICAgICBpZiggYUZpbHRlciApe1xuICAgICAgICAgICAgICAgIGFGaWx0ZXIgPSBhRmlsdGVyLnJlcGxhY2UoIGFOYW1lICsgJzonLCAnJyk7XG4gICAgICAgICAgICAgICAgZmlsdGVyUGFyYW0ucHVzaCggYUZpbHRlciApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gb3B0aW9ubmFsIHBhcmFtZXRlciBmaWx0ZXJpZCBvciBFWFBfRklMVEVSXG4gICAgICBpZiggYUZlYXR1cmVJZCApXG4gICAgICAgICAgd2ZzT3B0aW9uc1snRkVBVFVSRUlEJ10gPSBhRmVhdHVyZUlkLnJlcGxhY2UobmV3IFJlZ0V4cChhTmFtZSwgJ2cnKSwgdHlwZU5hbWUpO1xuICAgICAgZWxzZSBpZiggZmlsdGVyUGFyYW0ubGVuZ3RoIClcbiAgICAgICAgICB3ZnNPcHRpb25zWydFWFBfRklMVEVSJ10gPSBmaWx0ZXJQYXJhbS5qb2luKCAnIEFORCAnICk7XG5cblxuICAgICAgLy8gQ2FsY3VsYXRlIGJib3ggZnJvbSBtYXAgZXh0ZW50IGlmIG5lZWRlZFxuICAgICAgaWYoIHJlc3RyaWN0VG9NYXBFeHRlbnQgKSB7XG4gICAgICAgICAgdmFyIGV4dGVudCA9IG1hcC5nZXRFeHRlbnQoKS5jbG9uZSgpO1xuICAgICAgICAgIHZhciBwcm9qRmVhdCA9IG5ldyBPcGVuTGF5ZXJzLlByb2plY3Rpb24oY29uZmlnLmxheWVyc1thTmFtZV0uY3JzKTtcbiAgICAgICAgICBleHRlbnQgPSBleHRlbnQudHJhbnNmb3JtKCBtYXAuZ2V0UHJvamVjdGlvbigpLCBwcm9qRmVhdCApO1xuICAgICAgICAgIHZhciBiYm94ID0gZXh0ZW50LnRvQkJPWCgpO1xuICAgICAgICAgIHdmc09wdGlvbnNbJ0JCT1gnXSA9IGJib3g7XG4gICAgICB9XG5cbiAgICAgIC8vIE9wdGlvbm5hbCBwYXJhbWV0ZXIgZ2VvbWV0cnluYW1lXG4gICAgICBpZiggZ2VvbWV0cnlOYW1lXG4gICAgICAgICYmICQuaW5BcnJheSggZ2VvbWV0cnlOYW1lLnRvTG93ZXJDYXNlKCksIFsnbm9uZScsICdleHRlbnQnLCAnY2VudHJvaWQnXSApICE9IC0xXG4gICAgICApe1xuICAgICAgICAgIHdmc09wdGlvbnNbJ0dFT01FVFJZTkFNRSddID0gZ2VvbWV0cnlOYW1lO1xuICAgICAgfVxuXG4gICAgICBnZXRGZWF0dXJlVXJsRGF0YVsndXJsJ10gPSBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKGxpelVybHMud21zXG4gICAgICAgICAgICAgICxPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVyU3RyaW5nKGxpelVybHMucGFyYW1zKVxuICAgICAgKTtcbiAgICAgIGdldEZlYXR1cmVVcmxEYXRhWydvcHRpb25zJ10gPSB3ZnNPcHRpb25zO1xuXG4gICAgICByZXR1cm4gZ2V0RmVhdHVyZVVybERhdGE7XG4gIH1cblxuICAgIC8qKlxuICAgICAqIHN0b3JhZ2UgZm9yIGNhbGxiYWNrcyBnaXZlbiB0byBnZXRGZWF0dXJlRGF0YVxuICAgICAqXG4gICAgICogdXNlZCB0byBhdm9pZCBtdWx0aXBsZSByZXF1ZXN0IGZvciB0aGUgc2FtZSBmZWF0dXJlXG4gICAgICogQHR5cGUge3t9fVxuICAgICAqL1xuICB2YXIgZmVhdHVyZURhdGFQb29sID0ge307XG5cbiAgZnVuY3Rpb24gY2FsbEZlYXR1cmVEYXRhQ2FsbEJhY2tzKHBvb2xJZCwgZmVhdHVyZXMpIHtcbiAgICAgIHZhciBjYWxsYmFja3NEYXRhID0gZmVhdHVyZURhdGFQb29sW3Bvb2xJZF07XG4gICAgICBkZWxldGUgZmVhdHVyZURhdGFQb29sW3Bvb2xJZF07XG4gICAgICBjYWxsYmFja3NEYXRhLmNhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGNhbGxiYWNrKSB7XG4gICAgICAgICAgaWYgKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKGNhbGxiYWNrc0RhdGEubGF5ZXJOYW1lLCBjYWxsYmFja3NEYXRhLmZpbHRlciwgZmVhdHVyZXMsIGNhbGxiYWNrc0RhdGEuYWxpYXMpO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RmVhdHVyZURhdGEoYU5hbWUsIGFGaWx0ZXIsIGFGZWF0dXJlSUQsIGFHZW9tZXRyeU5hbWUsIHJlc3RyaWN0VG9NYXBFeHRlbnQsIHN0YXJ0SW5kZXgsIG1heEZlYXR1cmVzLCBhQ2FsbEJhY2spIHtcbiAgICAgIC8vIFNldCBmdW5jdGlvbiBwYXJhbWV0ZXJzIGlmIG5vdCBnaXZlblxuICAgICAgYUZpbHRlciA9IHR5cGVvZiBhRmlsdGVyICE9PSAndW5kZWZpbmVkJyA/ICBhRmlsdGVyIDogbnVsbDtcbiAgICAgIGFGZWF0dXJlSWQgPSB0eXBlb2YgYUZlYXR1cmVJZCAhPT0gJ3VuZGVmaW5lZCcgPyAgYUZlYXR1cmVJZCA6IG51bGw7XG4gICAgICBnZW9tZXRyeU5hbWUgPSB0eXBlb2YgZ2VvbWV0cnlOYW1lICE9PSAndW5kZWZpbmVkJyA/ICBnZW9tZXRyeU5hbWUgOiBudWxsO1xuICAgICAgcmVzdHJpY3RUb01hcEV4dGVudCA9IHR5cGVvZiByZXN0cmljdFRvTWFwRXh0ZW50ICE9PSAndW5kZWZpbmVkJyA/ICByZXN0cmljdFRvTWFwRXh0ZW50IDogZmFsc2U7XG4gICAgICBzdGFydEluZGV4ID0gdHlwZW9mIHN0YXJ0SW5kZXggIT09ICd1bmRlZmluZWQnID8gIHN0YXJ0SW5kZXggOiBudWxsO1xuICAgICAgbWF4RmVhdHVyZXMgPSB0eXBlb2YgbWF4RmVhdHVyZXMgIT09ICd1bmRlZmluZWQnID8gIG1heEZlYXR1cmVzIDogbnVsbDtcblxuICAgICAgLy8gZ2V0IGxheWVyIGNvbmZpZ3NcbiAgICAgIGlmICggIShhTmFtZSBpbiBjb25maWcubGF5ZXJzKSApIHtcbiAgICAgICAgICB2YXIgcWdpc05hbWUgPSBsaXpNYXAuZ2V0TmFtZUJ5Q2xlYW5OYW1lKGFOYW1lKTtcbiAgICAgICAgICBpZiAoICFxZ2lzTmFtZSB8fCAhKHFnaXNOYW1lIGluIGNvbmZpZy5sYXllcnMpKVxuICAgICAgICAgICAgcWdpc05hbWUgPSBsaXpNYXAuZ2V0TmFtZUJ5U2hvcnROYW1lKGFOYW1lKTtcbiAgICAgICAgICBpZiAoICFxZ2lzTmFtZSB8fCAhKHFnaXNOYW1lIGluIGNvbmZpZy5sYXllcnMpKVxuICAgICAgICAgICAgcWdpc05hbWUgPSBsaXpNYXAuZ2V0TmFtZUJ5VHlwZU5hbWUoYU5hbWUpO1xuICAgICAgICAgIGlmICggcWdpc05hbWUgJiYgKHFnaXNOYW1lIGluIGNvbmZpZy5sYXllcnMpKSB7XG4gICAgICAgICAgICAgIGFOYW1lID0gcWdpc05hbWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldEZlYXR1cmVEYXRhOiBcIicrYU5hbWUrJ1wiIGFuZCBcIicrcWdpc05hbWUrJ1wiIG5vdCBmb3VuZCBpbiBjb25maWcnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBhQ29uZmlnID0gY29uZmlnLmxheWVyc1thTmFtZV07XG5cbiAgICAgICQoJ2JvZHknKS5jc3MoJ2N1cnNvcicsICd3YWl0Jyk7XG5cbiAgICAgIHZhciBnZXRGZWF0dXJlVXJsRGF0YSA9IGxpek1hcC5nZXRWZWN0b3JMYXllcldmc1VybCggYU5hbWUsIGFGaWx0ZXIsIGFGZWF0dXJlSUQsIGFHZW9tZXRyeU5hbWUsIHJlc3RyaWN0VG9NYXBFeHRlbnQsIHN0YXJ0SW5kZXgsIG1heEZlYXR1cmVzICk7XG5cbiAgICAgIC8vIHNlZSBpZiBhIHJlcXVlc3QgZm9yIHRoZSBzYW1lIGZlYXR1cmUgaXMgbm90IGFscmVhZHkgbWFkZVxuICAgICAgdmFyIHBvb2xJZCA9IGdldEZlYXR1cmVVcmxEYXRhWyd1cmwnXSArIFwifFwiICsgSlNPTi5zdHJpbmdpZnkoZ2V0RmVhdHVyZVVybERhdGFbJ29wdGlvbnMnXSk7XG4gICAgICBpZiAocG9vbElkIGluIGZlYXR1cmVEYXRhUG9vbCkge1xuICAgICAgICAgIC8vIHRoZXJlIGlzIGFscmVhZHkgYSByZXF1ZXN0LCBsZXQncyBzdG9yZSBvdXIgY2FsbGJhY2sgYW5kIHdhaXQuLi5cbiAgICAgICAgICBpZiAoYUNhbGxCYWNrKSB7XG4gICAgICAgICAgICAgIGZlYXR1cmVEYXRhUG9vbFtwb29sSWRdLmNhbGxiYWNrcy5wdXNoKGFDYWxsQmFjayk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIC8vIG5vIHJlcXVlc3QgeWV0LCBsZXQncyBkbyBpdCBhbmQgc3RvcmUgdGhlIGNhbGxiYWNrIGFuZCBpdHMgcGFyYW1ldGVyc1xuICAgICAgZmVhdHVyZURhdGFQb29sW3Bvb2xJZF0gPSB7XG4gICAgICAgICAgY2FsbGJhY2tzOiBbIGFDYWxsQmFjayBdLFxuICAgICAgICAgIGxheWVyTmFtZTogYU5hbWUsXG4gICAgICAgICAgZmlsdGVyOiBhRmlsdGVyLFxuICAgICAgICAgIGFsaWFzOiBhQ29uZmlnWydhbGlhcyddXG4gICAgICB9O1xuXG4gICAgICAkLnBvc3QoIGdldEZlYXR1cmVVcmxEYXRhWyd1cmwnXSwgZ2V0RmVhdHVyZVVybERhdGFbJ29wdGlvbnMnXSwgZnVuY3Rpb24oZGF0YSkge1xuXG4gICAgICAgICAgaWYoICEoJ2ZlYXR1cmVDcnMnIGluIGFDb25maWcpIClcbiAgICAgICAgICAgICAgYUNvbmZpZ1snZmVhdHVyZUNycyddID0gbnVsbDtcbiAgICAgICAgICBpZiggYUNvbmZpZy5jcnMgPT0gJ0VQU0c6NDMyNicgKVxuICAgICAgICAgICAgICBhQ29uZmlnWydmZWF0dXJlQ3JzJ10gPSAnRVBTRzo0MzI2JztcblxuICAgICAgICAgIC8vIHZlcmlmeWluZyB0aGUgZmVhdHVyZSBDUlNcbiAgICAgICAgICBpZiggIWFDb25maWcuZmVhdHVyZUNycyAmJiBkYXRhLmZlYXR1cmVzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgIC8vIGxvYWQgcHJvamVjdGlvbiB0byBiZSBzdXJlIHRvIGhhdmUgdGhlIGRlZmluaXRpb25cbiAgICAgICAgICAgICAgbGl6TWFwLmxvYWRQcm9qRGVmaW5pdGlvbiggYUNvbmZpZy5jcnMsIGZ1bmN0aW9uKCBhUHJvaiApIHtcbiAgICAgICAgICAgICAgICAgIC8vIGluIFFHSVMgc2VydmVyID4gMi4xNCBHZW9KU09OIGlzIGluIEVQU0c6NDMyNlxuICAgICAgICAgICAgICAgICAgaWYgKCAncWdpc1NlcnZlclZlcnNpb24nIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnFnaXNTZXJ2ZXJWZXJzaW9uICE9ICcyLjE0JyApXG4gICAgICAgICAgICAgICAgICAgICAgYUNvbmZpZ1snZmVhdHVyZUNycyddID0gJ0VQU0c6NDMyNic7XG4gICAgICAgICAgICAgICAgICBlbHNlIGlmICggIWFDb25maWcuZmVhdHVyZUNycyApXG4gICAgICAgICAgICAgICAgICAgICAgYUNvbmZpZ1snZmVhdHVyZUNycyddID0gYUNvbmZpZy5jcnM7XG5cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCdhbGlhcycgaW4gYUNvbmZpZyAmJiBhQ29uZmlnWydhbGlhcyddKSB7XG4gICAgICAgICAgICAgIGNhbGxGZWF0dXJlRGF0YUNhbGxCYWNrcyhwb29sSWQsIGRhdGEuZmVhdHVyZXMpO1xuICAgICAgICAgICAgICAkKCdib2R5JykuY3NzKCdjdXJzb3InLCAnYXV0bycpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHZhciBzZXJ2aWNlID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChsaXpVcmxzLndtc1xuICAgICAgICAgICAgICAgICAgICAsT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgJC5wb3N0KHNlcnZpY2UsIHtcbiAgICAgICAgICAgICAgICAgICdTRVJWSUNFJzonV0ZTJ1xuICAgICAgICAgICAgICAgICAsJ1ZFUlNJT04nOicxLjAuMCdcbiAgICAgICAgICAgICAgICAgLCdSRVFVRVNUJzonRGVzY3JpYmVGZWF0dXJlVHlwZSdcbiAgICAgICAgICAgICAgICAgLCdUWVBFTkFNRSc6ICgndHlwZW5hbWUnIGluIGFDb25maWcpID8gYUNvbmZpZy50eXBlbmFtZSA6IGFOYW1lXG4gICAgICAgICAgICAgICAgICwnT1VUUFVURk9STUFUJzonSlNPTidcbiAgICAgICAgICAgICAgfSwgZnVuY3Rpb24oZGVzY3JpYmUpIHtcblxuICAgICAgICAgICAgICAgICAgYUNvbmZpZ1snYWxpYXMnXSA9IGRlc2NyaWJlLmFsaWFzZXM7XG4gICAgICAgICAgICAgICAgICBpZiAoJ3R5cGVzJyBpbiBkZXNjcmliZSlcbiAgICAgICAgICAgICAgICAgICAgICBhQ29uZmlnWyd0eXBlcyddID0gZGVzY3JpYmUudHlwZXM7XG5cbiAgICAgICAgICAgICAgICAgIGNhbGxGZWF0dXJlRGF0YUNhbGxCYWNrcyhwb29sSWQsIGRhdGEuZmVhdHVyZXMpO1xuXG4gICAgICAgICAgICAgICAgICAkKCdib2R5JykuY3NzKCdjdXJzb3InLCAnYXV0bycpO1xuXG4gICAgICAgICAgICAgIH0sJ2pzb24nKTtcbiAgICAgICAgICAgfVxuXG4gICAgICB9LCdqc29uJyk7XG5cbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlV2ZzRmllbGRWYWx1ZXMoYU5hbWUsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgdHJhbnNsYXRpb25fZGljdCl7XG4gICAgdHJhbnNsYXRpb25fZGljdCA9IHR5cGVvZiB0cmFuc2xhdGlvbl9kaWN0ICE9PSAndW5kZWZpbmVkJyA/ICB0cmFuc2xhdGlvbl9kaWN0IDogbnVsbDtcbiAgICByZXR1cm4gZmllbGRWYWx1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHpvb21Ub09sRmVhdHVyZSggZmVhdHVyZSwgcHJvaiwgem9vbUFjdGlvbiApe1xuICAgICAgem9vbUFjdGlvbiA9IHR5cGVvZiB6b29tQWN0aW9uICE9PSAndW5kZWZpbmVkJyA/ICB6b29tQWN0aW9uIDogJ3pvb20nO1xuICAgICAgdmFyIGZvcm1hdCA9IG5ldyBPcGVuTGF5ZXJzLkZvcm1hdC5HZW9KU09OKCk7XG4gICAgICB2YXIgZmVhdCA9IGZvcm1hdC5yZWFkKGZlYXR1cmUpWzBdO1xuICAgICAgaWYoIGZlYXQgJiYgJ2dlb21ldHJ5JyBpbiBmZWF0ICl7XG4gICAgICAgICAgZmVhdC5nZW9tZXRyeS50cmFuc2Zvcm0oIHByb2osIGxpek1hcC5tYXAuZ2V0UHJvamVjdGlvbigpICk7XG5cbiAgICAgICAgICAvLyBab29tIG9yIGNlbnRlciB0byBzZWxlY3RlZCBmZWF0dXJlXG4gICAgICAgICAgaWYoIHpvb21BY3Rpb24gPT0gJ3pvb20nIClcbiAgICAgICAgICAgICAgbWFwLnpvb21Ub0V4dGVudChmZWF0Lmdlb21ldHJ5LmdldEJvdW5kcygpKTtcbiAgICAgICAgICBpZiggem9vbUFjdGlvbiA9PSAnY2VudGVyJyApe1xuICAgICAgICAgICAgICB2YXIgbG9ubGF0ID0gZmVhdC5nZW9tZXRyeS5nZXRCb3VuZHMoKS5nZXRDZW50ZXJMb25MYXQoKVxuICAgICAgICAgICAgICBtYXAuc2V0Q2VudGVyKGxvbmxhdCk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gem9vbVRvRmVhdHVyZSggZmVhdHVyZVR5cGUsIGZpZCwgem9vbUFjdGlvbiApe1xuICAgICAgem9vbUFjdGlvbiA9IHR5cGVvZiB6b29tQWN0aW9uICE9PSAndW5kZWZpbmVkJyA/ICB6b29tQWN0aW9uIDogJ3pvb20nO1xuXG4gICAgICB2YXIgbGF5ZXJDb25maWcgPSBjb25maWcubGF5ZXJzW2ZlYXR1cmVUeXBlXTtcbiAgICAgIHZhciBmZWF0dXJlSWQgPSBmZWF0dXJlVHlwZSArICcuJyArIGZpZDtcblxuICAgICAgdmFyIHByb2ogPSBuZXcgT3BlbkxheWVycy5Qcm9qZWN0aW9uKGNvbmZpZy5sYXllcnNbZmVhdHVyZVR5cGVdLmNycyk7XG4gICAgICBpZiggY29uZmlnLmxheWVyc1tmZWF0dXJlVHlwZV0uZmVhdHVyZUNycyApXG4gICAgICAgICAgcHJvaiA9IG5ldyBPcGVuTGF5ZXJzLlByb2plY3Rpb24oY29uZmlnLmxheWVyc1tmZWF0dXJlVHlwZV0uZmVhdHVyZUNycyk7XG4gICAgICBnZXRMYXllckZlYXR1cmUoZmVhdHVyZVR5cGUsIGZpZCwgZnVuY3Rpb24oZmVhdCkge1xuICAgICAgICAgIHpvb21Ub09sRmVhdHVyZSggZmVhdCwgcHJvaiwgem9vbUFjdGlvbiApO1xuICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMYXllckZlYXR1cmUoIGZlYXR1cmVUeXBlLCBmaWQsIGFDYWxsYmFjaywgYUNhbGxiYWNrTm90Zm91bmQsIGZvcmNlVG9Mb2FkICl7XG4gICAgICBpZiAoICFhQ2FsbGJhY2sgKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgIGlmICggIShmZWF0dXJlVHlwZSBpbiBjb25maWcubGF5ZXJzKSApXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICB2YXIgbGF5ZXJDb25maWcgPSBjb25maWcubGF5ZXJzW2ZlYXR1cmVUeXBlXTtcbiAgICAgIHZhciBmZWF0dXJlSWQgPSBmZWF0dXJlVHlwZSArICcuJyArIGZpZDtcblxuICAgICAgLy8gVXNlIGFscmVhZHkgcmV0cmlldmVkIGZlYXR1cmVcbiAgICAgIGlmKCFmb3JjZVRvTG9hZCAmJiBsYXllckNvbmZpZ1snZmVhdHVyZXMnXSAmJiBmaWQgaW4gbGF5ZXJDb25maWdbJ2ZlYXR1cmVzJ10gKXtcbiAgICAgICAgICBhQ2FsbGJhY2sobGF5ZXJDb25maWdbJ2ZlYXR1cmVzJ11bZmlkXSk7XG4gICAgICB9XG4gICAgICAvLyBPciBnZXQgdGhlIGZlYXR1cmUgdmlhIFdGUyBpbiBuZWVkZWRcbiAgICAgIGVsc2V7XG4gICAgICAgICAgZ2V0RmVhdHVyZURhdGEoZmVhdHVyZVR5cGUsIG51bGwsIGZlYXR1cmVJZCwgJ2V4dGVudCcsIGZhbHNlLCBudWxsLCBudWxsLFxuICAgICAgICAgICAgICBmdW5jdGlvbiggYU5hbWUsIGFGaWx0ZXIsIGNGZWF0dXJlcywgY0FsaWFzZXMgKXtcblxuICAgICAgICAgICAgICBpZiAoY0ZlYXR1cmVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZmVhdCA9IGNGZWF0dXJlc1swXTtcbiAgICAgICAgICAgICAgICAgIGlmKCAhbGF5ZXJDb25maWdbJ2ZlYXR1cmVzJ10gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgbGF5ZXJDb25maWdbJ2ZlYXR1cmVzJ10gPSB7fTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGxheWVyQ29uZmlnWydmZWF0dXJlcyddW2ZpZF0gPSBmZWF0O1xuICAgICAgICAgICAgICAgICAgYUNhbGxiYWNrKGZlYXQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2UgaWYoYUNhbGxiYWNrTm90Zm91bmQpIHtcbiAgICAgICAgICAgICAgICAgIGFDYWxsYmFja05vdGZvdW5kKGZlYXR1cmVUeXBlLCBmaWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRWZWN0b3JMYXllckZlYXR1cmVUeXBlcygpIHtcbiAgICAgIGlmICggd2ZzQ2FwYWJpbGl0aWVzID09IG51bGwgKVxuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgIHJldHVybiB3ZnNDYXBhYmlsaXRpZXMuZmluZCgnRmVhdHVyZVR5cGUnKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFZlY3RvckxheWVyUmVzdWx0Rm9ybWF0KCkge1xuICAgICAgaWYgKCB3ZnNDYXBhYmlsaXRpZXMgPT0gbnVsbCApXG4gICAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgcmV0dXJuIHdmc0NhcGFiaWxpdGllcy5maW5kKCdDYXBhYmlsaXR5ID4gUmVxdWVzdCA+IEdldEZlYXR1cmUgPiBSZXN1bHRGb3JtYXQgPiAqJyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldEZlYXR1cmVQb3B1cENvbnRlbnQoIGFOYW1lLCBmZWF0LCBhQ2FsbGJhY2spIHtcbiAgICAgIC8vIE9ubHkgdXNlIHRoaXMgZnVuY3Rpbm8gd2l0aCBjYWxsYmFja1xuICAgICAgaWYgKCAhYUNhbGxiYWNrIClcbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgIC8vIE9ubHkgdXNlIHdoZW4gZmVhdCBpcyBzZXRcbiAgICAgIGlmKCAhZmVhdCApXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAvLyBSZW1vdmUgbWFwIHBvcHVwIHRvIGF2b2lkIGNvbmZ1c2lvblxuICAgICAgaWYgKGxpek1hcC5tYXAucG9wdXBzLmxlbmd0aCAhPSAwKVxuICAgICAgICAgIGxpek1hcC5tYXAucmVtb3ZlUG9wdXAoIGxpek1hcC5tYXAucG9wdXBzWzBdICk7XG5cbiAgICAgIC8vIEdldCBwb3B1cCBjb250ZW50IGJ5IEZJTFRFUiBhbmQgbm90IHdpdGggdmlydHVhbCBjbGljayBvbiBtYXBcbiAgICAgIHZhciBmaWx0ZXIgPSAnJztcbiAgICAgIHZhciBxZ2lzTmFtZSA9IGFOYW1lO1xuICAgICAgaWYoIGxpek1hcC5nZXRMYXllck5hbWVCeUNsZWFuTmFtZShhTmFtZSkgKXtcbiAgICAgICAgICBxZ2lzTmFtZSA9IGxpek1hcC5nZXRMYXllck5hbWVCeUNsZWFuTmFtZShhTmFtZSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBwa2V5ID0gbnVsbDtcbiAgICAgIC8vIEdldCBwcmltYXJ5IGtleSB3aXRoIGF0dHJpYnV0ZWxheWVyIG9wdGlvbnNcbiAgICAgIGlmKCAocWdpc05hbWUgaW4gbGl6TWFwLmNvbmZpZy5hdHRyaWJ1dGVMYXllcnMpICl7XG4gICAgICAgICAgcGtleSA9IGxpek1hcC5jb25maWcuYXR0cmlidXRlTGF5ZXJzW3FnaXNOYW1lXVsncHJpbWFyeUtleSddO1xuICAgICAgfVxuXG4gICAgICAvLyBUZXN0IGlmIHByaW1hcnkga2V5IGlzIHNldCBpbiB0aGUgYXRsYXMgdG9vbFxuICAgICAgaWYoICFwa2V5ICYmICdhdGxhc0xheWVyJyBpbiBsaXpNYXAuY29uZmlnLm9wdGlvbnMgJiYgJ2F0bGFzUHJpbWFyeUtleScgaW4gbGl6TWFwLmNvbmZpZy5vcHRpb25zICl7XG4gICAgICAgIHZhciBsYXllckNvbmZpZyA9IGxpek1hcC5jb25maWcubGF5ZXJzW3FnaXNOYW1lXTtcbiAgICAgICAgaWYoIGxheWVyQ29uZmlnLmlkID09IGxpek1hcC5jb25maWcub3B0aW9uc1snYXRsYXNMYXllciddICYmIGxpek1hcC5jb25maWcub3B0aW9uc1snYXRsYXNQcmltYXJ5S2V5J10gIT0gJycgKXtcbiAgICAgICAgICBwa2V5ID0gbGl6TWFwLmNvbmZpZy5vcHRpb25zWydhdGxhc1ByaW1hcnlLZXknXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYoICFwa2V5IClcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIHZhciBwa1ZhbCA9IGZlYXQucHJvcGVydGllc1twa2V5XTtcbiAgICAgIGZpbHRlciA9IHFnaXNOYW1lICsgJzpcIicgKyBwa2V5ICsgJ1wiID0gJyArIFwiJ1wiICsgcGtWYWwgKyBcIidcIiA7XG5cbiAgICAgIHZhciBjcnMgPSAnRVBTRzo0MzI2JztcbiAgICAgIGlmKCgnY3JzJyBpbiBsaXpNYXAuY29uZmlnLmxheWVyc1txZ2lzTmFtZV0pICYmIGxpek1hcC5jb25maWcubGF5ZXJzW3FnaXNOYW1lXS5jcnMgIT0gJycpe1xuICAgICAgICAgIGNycyA9IGxpek1hcC5jb25maWcubGF5ZXJzW3FnaXNOYW1lXS5jcnM7XG4gICAgICB9XG5cbiAgICAgIHZhciB3bXNPcHRpb25zID0ge1xuICAgICAgICAgICAnTEFZRVJTJzogYU5hbWVcbiAgICAgICAgICAsJ1FVRVJZX0xBWUVSUyc6IGFOYW1lXG4gICAgICAgICAgLCdTVFlMRVMnOiAnJ1xuICAgICAgICAgICwnU0VSVklDRSc6ICdXTVMnXG4gICAgICAgICAgLCdWRVJTSU9OJzogJzEuMy4wJ1xuICAgICAgICAgICwnQ1JTJzogY3JzXG4gICAgICAgICAgLCdSRVFVRVNUJzogJ0dldEZlYXR1cmVJbmZvJ1xuICAgICAgICAgICwnRVhDRVBUSU9OUyc6ICdhcHBsaWNhdGlvbi92bmQub2djLnNlX2luaW1hZ2UnXG4gICAgICAgICAgLCdJTkZPX0ZPUk1BVCc6ICd0ZXh0L2h0bWwnXG4gICAgICAgICAgLCdGRUFUVVJFX0NPVU5UJzogMVxuICAgICAgICAgICwnRklMVEVSJzogZmlsdGVyXG4gICAgICB9O1xuXG4gICAgICAvLyBRdWVyeSB0aGUgc2VydmVyXG4gICAgICB2YXIgc2VydmljZSA9IE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQobGl6VXJscy53bXNcbiAgICAgICAgICAsT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICAgICk7XG4gICAgICAkLnBvc3Qoc2VydmljZSwgd21zT3B0aW9ucywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgIGFDYWxsYmFjayhkYXRhKTtcbiAgICAgIH0pO1xuXG4gIH1cblxuICAvLyBHZXQgdGhlIHBvcHVwIGNvbnRlbnQgZm9yIGEgbGF5ZXIgZ2l2ZW4gYSBmZWF0dXJlXG4gIGZ1bmN0aW9uIGdldEZlYXR1cmVQb3B1cENvbnRlbnRCeUZlYXR1cmVJbnRlcnNlY3Rpb24oYU5hbWUsIGZlYXQsIGFDYWxsYmFjaykge1xuXG4gICAgLy8gQ2FsY3VsYXRlIGZha2UgYmJveCBhcm91bmQgdGhlIGZlYXR1cmVcbiAgICB2YXIgdW5pdHMgPSBsaXpNYXAubWFwLmdldFVuaXRzKCk7XG4gICAgdmFyIGxDb25maWcgPSBsaXpNYXAuY29uZmlnLmxheWVyc1thTmFtZV07XG4gICAgaWYoIGxpek1hcC5tYXAubWF4U2NhbGUgPT0gJ2F1dG8nIClcbiAgICAgIHZhciBzY2FsZSA9IGxDb25maWcubWluU2NhbGU7XG4gICAgZWxzZVxuICAgICAgdmFyIHNjYWxlID0gTWF0aC5tYXgoIGxpek1hcC5tYXAubWF4U2NhbGUsIGxDb25maWcubWluU2NhbGUgKTtcbiAgICBzY2FsZSA9IHNjYWxlICogMjtcbiAgICB2YXIgcmVzID0gT3BlbkxheWVycy5VdGlsLmdldFJlc29sdXRpb25Gcm9tU2NhbGUoc2NhbGUsIHVuaXRzKTtcblxuICAgIHZhciBnZW9tVHlwZSA9IGZlYXQuZ2VvbWV0cnkuQ0xBU1NfTkFNRTtcbiAgICBpZiAoXG4gICAgICBnZW9tVHlwZSA9PSAnT3BlbkxheWVycy5HZW9tZXRyeS5Qb2x5Z29uJ1xuICAgICAgfHwgZ2VvbVR5cGUgPT0gJ09wZW5MYXllcnMuR2VvbWV0cnkuTXVsdGlQb2x5Z29uJ1xuICAgICAgfHwgZ2VvbVR5cGUgPT0gJ09wZW5MYXllcnMuR2VvbWV0cnkuUG9pbnQnXG4gICAgKSB7XG4gICAgICB2YXIgbG9ubGF0ID0gZmVhdC5nZW9tZXRyeS5nZXRCb3VuZHMoKS5nZXRDZW50ZXJMb25MYXQoKVxuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHZhciB2ZXJ0ID0gZmVhdC5nZW9tZXRyeS5nZXRWZXJ0aWNlcygpO1xuICAgICAgdmFyIG1pZGRsZVBvaW50ID0gdmVydFtNYXRoLmZsb29yKHZlcnQubGVuZ3RoLzIpXTtcbiAgICAgIHZhciBsb25sYXQgPSBuZXcgT3BlbkxheWVycy5Mb25MYXQobWlkZGxlUG9pbnQueCwgbWlkZGxlUG9pbnQueSk7XG4gICAgfVxuXG4gICAgLy8gQ2FsY3VsYXRlIGZha2UgYmJveFxuICAgIHZhciBiYm94ID0gbmV3IE9wZW5MYXllcnMuQm91bmRzKFxuICAgICAgbG9ubGF0LmxvbiAtIDUgKiByZXMsXG4gICAgICBsb25sYXQubGF0IC0gNSAqIHJlcyxcbiAgICAgIGxvbmxhdC5sb24gKyA1ICogcmVzLFxuICAgICAgbG9ubGF0LmxhdCArIDUgKiByZXNcbiAgICApO1xuXG4gICAgdmFyIGdmaUNycyA9IGxpek1hcC5tYXAuZ2V0UHJvamVjdGlvbk9iamVjdCgpLnRvU3RyaW5nKCk7XG4gICAgaWYgKCBnZmlDcnMgPT0gJ0VQU0c6OTAwOTEzJyApXG4gICAgICBnZmlDcnMgPSAnRVBTRzozODU3JztcblxuICAgIHZhciB3bXNPcHRpb25zID0ge1xuICAgICAgICdMQVlFUlMnOiBhTmFtZVxuICAgICAgLCdRVUVSWV9MQVlFUlMnOiBhTmFtZVxuICAgICAgLCdTVFlMRVMnOiAnJ1xuICAgICAgLCdTRVJWSUNFJzogJ1dNUydcbiAgICAgICwnVkVSU0lPTic6ICcxLjMuMCdcbiAgICAgICwnUkVRVUVTVCc6ICdHZXRGZWF0dXJlSW5mbydcbiAgICAgICwnRVhDRVBUSU9OUyc6ICdhcHBsaWNhdGlvbi92bmQub2djLnNlX2luaW1hZ2UnXG4gICAgICAsJ0JCT1gnOiBiYm94LnRvQkJPWCgpXG4gICAgICAsJ0ZFQVRVUkVfQ09VTlQnOiAxMFxuICAgICAgLCdIRUlHSFQnOiAxMDBcbiAgICAgICwnV0lEVEgnOiAxMDBcbiAgICAgICwnSU5GT19GT1JNQVQnOiAndGV4dC9odG1sJ1xuICAgICAgLCdDUlMnOiBnZmlDcnNcbiAgICAgICwnSSc6IDUwXG4gICAgICAsJ0onOiA1MFxuICAgIH07XG5cbiAgICAvLyBRdWVyeSB0aGUgc2VydmVyXG4gICAgdmFyIHNlcnZpY2UgPSBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKGxpelVybHMud21zXG4gICAgICAsT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICApO1xuICAgICQucG9zdChzZXJ2aWNlLCB3bXNPcHRpb25zLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICBpZihhQ2FsbGJhY2spe1xuICAgICAgICBhQ2FsbGJhY2soc2VydmljZSwgd21zT3B0aW9ucywgZGF0YSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvLyBDcmVhdGUgbmV3IGRvY2sgb3IgbWluaWRvY2tcbiAgLy8gRXhhbXBsZSA6IGxpek1hcC5hZGREb2NrKCdteWRvY2snLCAnTXkgZG9jayB0aXRsZScsICdkb2NrJywgJ1NvbWUgY29udGVudCcsICdpY29uLXBlbmNpbCcpO1xuICAvLyBzZWUgaWNvbiBsaXN0IGhlcmUgOiBodHRwOi8vZ2V0Ym9vdHN0cmFwLmNvbS8yLjMuMi9iYXNlLWNzcy5odG1sI2ljb25zXG4gIGZ1bmN0aW9uIGFkZERvY2soIGRuYW1lLCBkbGFiZWwsIGR0eXBlLCBkY29udGVudCwgZGljb24pe1xuICAgICAgLy8gRmlyc3QgY2hlY2sgaWYgdGhpcyBkbmFtZSBhbHJlYWR5IGV4aXN0c1xuICAgICAgaWYoICQoJyNtYXBtZW51IC5uYXYtbGlzdCA+IGxpLicrZG5hbWUrJyA+IGEnKS5sZW5ndGggKXtcbiAgICAgICAgICBjb25zb2xlLmxvZyhkbmFtZSArICcgbWVudSBpdGVtIGFscmVhZHkgZXhpc3RzJyk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBDcmVhdGUgbWVudSBpY29uIGZvciBhY3RpdmF0aW5nIGRvY2tcbiAgICAgIHZhciBkb2NrbGkgPSAnJztcbiAgICAgIGRvY2tsaSs9JzxsaSBjbGFzcz1cIicrZG5hbWUrJyBuYXYtJytkdHlwZSsnXCI+JztcbiAgICAgIGRvY2tsaSs9JyAgIDxhIGlkPVwiYnV0dG9uLScrZG5hbWUrJ1wiIHJlbD1cInRvb2x0aXBcIiBkYXRhLW9yaWdpbmFsLXRpdGxlPVwiJytkbGFiZWwrJ1wiIGRhdGEtcGxhY2VtZW50PVwicmlnaHRcIiBocmVmPVwiIycrZG5hbWUrJ1wiIGRhdGEtY29udGFpbmVyPVwiI2NvbnRlbnRcIj4nO1xuICAgICAgZG9ja2xpKz0nICAgICAgIDxzcGFuIGNsYXNzPVwiaWNvblwiPjxpIGNsYXNzPVwiJytkaWNvbisnIGljb24td2hpdGVcIj48L2k+PC9zcGFuPic7XG4gICAgICBkb2NrbGkrPScgICA8L2E+JztcbiAgICAgIGRvY2tsaSs9JzwvbGk+JztcbiAgICAgICQoJyNtYXBtZW51IGRpdiB1bCBsaS5uYXYtJytkdHlwZSsnOmxhc3QnKS5hZnRlcihkb2NrbGkpO1xuICAgICAgaWYgKCAkKCcjbWFwbWVudSBkaXYgdWwgbGkubmF2LScrZHR5cGUrJy4nK2RuYW1lKS5sZW5ndGggPT0gMCApXG4gICAgICAgICQoJyNtYXBtZW51IGRpdiB1bCBsaTpsYXN0JykuYWZ0ZXIoZG9ja2xpKTtcblxuICAgICAgLy8gIFJlbW92ZSBuYXRpdmUgbGl6bWFwIGljb25cbiAgICAgICQoJyNtYXBtZW51IC5uYXYtbGlzdCA+IGxpLicrZG5hbWUrJyA+IGEgLmljb24nKS5jc3MoJ2JhY2tncm91bmQtaW1hZ2UnLCdub25lJyk7XG4gICAgICAkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS4nK2RuYW1lKycgPiBhIC5pY29uID5pICcpLmNzcygnbWFyZ2luLWxlZnQnLCAnNHB4Jyk7XG5cbiAgICAgIC8vIEFkZCB0b29sdGlwXG4gICAgICAkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS4nK2RuYW1lKycgPiBhJykudG9vbHRpcCgpO1xuXG4gICAgICAvLyBDcmVhdGUgZG9jayB0YWIgY29udGVudFxuICAgICAgdmFyIGRvY2t0YWIgPSAnJztcbiAgICAgIGRvY2t0YWIrPSc8ZGl2IGNsYXNzPVwidGFiLXBhbmVcIiBpZD1cIicrZG5hbWUrJ1wiPic7XG4gICAgICBpZiggZHR5cGUgPT0gJ21pbmlkb2NrJyl7XG4gICAgICAgICAgZG9ja3RhYis9JzxkaXYgY2xhc3M9XCJtaW5pLWRvY2stY2xvc2VcIiB0aXRsZT1cImNsb3NlXCIgc3R5bGU9XCJwYWRkaW5nOjdweDtmbG9hdDpyaWdodDtjdXJzb3I6cG9pbnRlcjtcIj48aSBjbGFzcz1cImljb24tcmVtb3ZlIGljb24td2hpdGVcIj48L2k+PC9kaXY+JztcbiAgICAgICAgICBkb2NrdGFiKz0nICAgIDxkaXYgY2xhc3M9XCInK2RuYW1lKydcIj4nO1xuICAgICAgICAgIGRvY2t0YWIrPScgICAgICAgIDxoMz4nO1xuICAgICAgICAgIGRvY2t0YWIrPScgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+JztcbiAgICAgICAgICBkb2NrdGFiKz0nICAgICAgICAgICAgICA8aSBjbGFzcz1cIicrZGljb24rJyBpY29uLXdoaXRlXCI+PC9pPic7XG4gICAgICAgICAgZG9ja3RhYis9JyAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0ZXh0XCI+Jm5ic3A7JytkbGFiZWwrJyZuYnNwOzwvc3Bhbj4nO1xuICAgICAgICAgIGRvY2t0YWIrPScgICAgICAgICAgICA8L3NwYW4+JztcbiAgICAgICAgICBkb2NrdGFiKz0nICAgICAgICA8L2gzPic7XG4gICAgICB9XG4gICAgICBkb2NrdGFiKz0nICAgICAgICA8ZGl2IGNsYXNzPVwibWVudS1jb250ZW50XCI+JztcbiAgICAgIGRvY2t0YWIrPSBkY29udGVudDtcbiAgICAgIGRvY2t0YWIrPScgICAgICAgIDwvZGl2Pic7XG4gICAgICBkb2NrdGFiKz0nICAgIDwvZGl2Pic7XG4gICAgICBkb2NrdGFiKz0nPC9kaXY+JztcbiAgICAgIGlmKCBkdHlwZSA9PSAnbWluaWRvY2snKXtcbiAgICAgICAgICAkKCcjbWluaS1kb2NrLWNvbnRlbnQnKS5hcHBlbmQoZG9ja3RhYik7XG4gICAgICAgICAgJCgnIycrZG5hbWUrJyBkaXYubWluaS1kb2NrLWNsb3NlJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmKCAkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS4nK2RuYW1lKS5oYXNDbGFzcygnYWN0aXZlJykgKXtcbiAgICAgICAgICAgICAgICAkKCcjYnV0dG9uLScrZG5hbWUpLmNsaWNrKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmKCBkdHlwZSA9PSAncmlnaHQtZG9jaycgKVxuICAgICAgICAgICQoJyNyaWdodC1kb2NrLWNvbnRlbnQnKS5hcHBlbmQoZG9ja3RhYik7XG4gICAgICBlbHNlIGlmKCBkdHlwZSA9PSAnZG9jaycgKVxuICAgICAgICAgICQoJyNkb2NrLWNvbnRlbnQnKS5hcHBlbmQoZG9ja3RhYik7XG4gICAgICBlbHNlIGlmKCBkdHlwZSA9PSAnYm90dG9tZG9jaycgKVxuICAgICAgICAgICQoJyNib3R0b20tZG9jay1jb250ZW50JykuYXBwZW5kKGRvY2t0YWIpO1xuXG4gICAgICAvLyBDcmVhdGUgZG9jayB0YWIgbGlcbiAgICAgIHZhciBkb2NrdGFibGkgPSAnJztcbiAgICAgIGRvY2t0YWJsaSs9ICc8bGkgaWQ9XCJuYXYtdGFiLScrZG5hbWUrJ1wiPjxhIGhyZWY9XCIjJytkbmFtZSsnXCIgZGF0YS10b2dnbGU9XCJ0YWJcIj4nK2RsYWJlbCsnPC9hPjwvbGk+JztcbiAgICAgIGlmKCBkdHlwZSA9PSAnbWluaWRvY2snKVxuICAgICAgICAgICQoJyNtaW5pLWRvY2stdGFicycpLmFwcGVuZChkb2NrdGFibGkpO1xuICAgICAgZWxzZSBpZiggZHR5cGUgPT0gJ3JpZ2h0LWRvY2snIClcbiAgICAgICAgICAkKCcjcmlnaHQtZG9jay10YWJzJykuYXBwZW5kKGRvY2t0YWJsaSk7XG4gICAgICBlbHNlIGlmKCBkdHlwZSA9PSAnZG9jaycgKVxuICAgICAgICAgICQoJyNkb2NrLXRhYnMnKS5hcHBlbmQoZG9ja3RhYmxpKTtcbiAgICAgIGVsc2UgaWYoIGR0eXBlID09ICdib3R0b21kb2NrJyApXG4gICAgICAgICAgJCgnI2JvdHRvbS1kb2NrLXRhYnMnKS5hcHBlbmQoZG9ja3RhYmxpKTtcblxuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGdldEZlYXR1cmVJbmZvVG9sZXJhbmNlc1xuICAgKiBHZXQgdG9sZXJhbmNlcyBmb3IgcG9pbnQsIGxpbmUgYW5kIHBvbHlnb25cbiAgICogYXMgY29uZmlndXJlZCB3aXRoIGxpem1hcCBwbHVnaW4sIG9yIGRlZmF1bHRcbiAgICogaWYgbm8gY29uZmlndXJhdGlvbiBmb3VuZC5cbiAgICogUmV0dXJuczpcbiAgICoge09iamVjdH0gVGhlIHRvbGVyYW5jZXMgZm9yIHBvaW50LCBsaW5lIGFuZCBwb2x5Z29uXG4gICAqL1xuICBmdW5jdGlvbiBnZXRGZWF0dXJlSW5mb1RvbGVyYW5jZXMoKXtcblxuICAgIHZhciB0b2xlcmFuY2VzID0gZGVmYXVsdEdldEZlYXR1cmVJbmZvVG9sZXJhbmNlcztcbiAgICBpZiggJ3BvaW50VG9sZXJhbmNlJyBpbiBjb25maWcub3B0aW9uc1xuICAgICAgICAmJiAnbGluZVRvbGVyYW5jZScgaW4gY29uZmlnLm9wdGlvbnNcbiAgICAgICAgJiYgJ3BvbHlnb25Ub2xlcmFuY2UnIGluIGNvbmZpZy5vcHRpb25zXG4gICAgKXtcbiAgICAgIHRvbGVyYW5jZXMgPSB7XG4gICAgICAgICdGSV9QT0lOVF9UT0xFUkFOQ0UnOiBjb25maWcub3B0aW9ucy5wb2ludFRvbGVyYW5jZSxcbiAgICAgICAgJ0ZJX0xJTkVfVE9MRVJBTkNFJzogY29uZmlnLm9wdGlvbnMubGluZVRvbGVyYW5jZSxcbiAgICAgICAgJ0ZJX1BPTFlHT05fVE9MRVJBTkNFJzogY29uZmlnLm9wdGlvbnMucG9seWdvblRvbGVyYW5jZVxuICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHRvbGVyYW5jZXM7XG5cbiAgfVxuXG4gIC8qIFBSSVZBVEUgZnVuY3Rpb246IGlzSGlnaERlbnNpdHlcbiAgICogUmV0dXJuIFRydWUgd2hlbiB0aGUgc2NyZWVuIGlzIG9mIGhpZ2ggZGVuc2l0eVxuICAgKiBSZXR1cm5zOlxuICAgKiBCb29sZWFuXG4gICAqL1xuICBmdW5jdGlvbiBpc0hpZ2hEZW5zaXR5KCl7XG4gICAgcmV0dXJuICgod2luZG93Lm1hdGNoTWVkaWEgJiYgKHdpbmRvdy5tYXRjaE1lZGlhKCdvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAxMjRkcGkpLCBvbmx5IHNjcmVlbiBhbmQgKG1pbi1yZXNvbHV0aW9uOiAxLjNkcHB4KSwgb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogNDguOGRwY20pJykubWF0Y2hlcyB8fCB3aW5kb3cubWF0Y2hNZWRpYSgnb25seSBzY3JlZW4gYW5kICgtd2Via2l0LW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMyksIG9ubHkgc2NyZWVuIGFuZCAoLW8tbWluLWRldmljZS1waXhlbC1yYXRpbzogMi42LzIpLCBvbmx5IHNjcmVlbiBhbmQgKG1pbi0tbW96LWRldmljZS1waXhlbC1yYXRpbzogMS4zKSwgb25seSBzY3JlZW4gYW5kIChtaW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjMpJykubWF0Y2hlcykpIHx8ICh3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyAmJiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyA+IDEuMykpO1xuICB9XG5cbiAgLy8gY3JlYXRpbmcgdGhlIGxpek1hcCBvYmplY3RcbiAgdmFyIG9iaiA9IHtcbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0eTogbWFwXG4gICAgICogezxPcGVuTGF5ZXJzLk1hcD59IFRoZSBtYXBcbiAgICAgKi9cbiAgICBtYXA6IG51bGwsXG4gICAgLyoqXG4gICAgICogUHJvcGVydHk6IGxheWVyc1xuICAgICAqIHtBcnJheSg8T3BlbkxheWVycy5MYXllcj4pfSBUaGUgbGF5ZXJzXG4gICAgICovXG4gICAgbGF5ZXJzOiBudWxsLFxuICAgIC8qKlxuICAgICAqIFByb3BlcnR5OiBiYXNlbGF5ZXJzXG4gICAgICoge0FycmF5KDxPcGVuTGF5ZXJzLkxheWVyPil9IFRoZSBiYXNlIGxheWVyc1xuICAgICAqL1xuICAgIGJhc2VsYXllcnM6IG51bGwsXG4gICAgLyoqXG4gICAgICogUHJvcGVydHk6IGV2ZW50c1xuICAgICAqIHs8T3BlbkxheWVycy5FdmVudHM+fSBBbiBldmVudHMgb2JqZWN0IHRoYXQgaGFuZGxlcyBhbGxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgZXZlbnRzIG9uIHRoZSBsaXptYXBcbiAgICAgKi9cbiAgICBldmVudHM6IG51bGwsXG4gICAgLyoqXG4gICAgICogUHJvcGVydHk6IGNvbmZpZ1xuICAgICAqIHtPYmplY3R9IFRoZSBtYXAgY29uZmlnXG4gICAgICovXG4gICAgY29uZmlnOiBudWxsLFxuICAgIC8qKlxuICAgICAqIFByb3BlcnR5OiBkaWN0aW9ubmFyeVxuICAgICAqIHtPYmplY3R9IFRoZSBtYXAgZGljdGlvbm5hcnlcbiAgICAgKi9cbiAgICBkaWN0aW9uYXJ5OiBudWxsLFxuICAgIC8qKlxuICAgICAqIFByb3BlcnR5OiB0cmVlXG4gICAgICoge09iamVjdH0gVGhlIG1hcCB0cmVlXG4gICAgICovXG4gICAgdHJlZTogbnVsbCxcbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0eTogbGl6bWFwTGF5ZXJGaWx0ZXJBY3RpdmVcbiAgICAgKiB7T2JqZWN0fSBDb250YWlucyBtYWluIGZpbHRlcmVkIGxheWVyIGlmIGZpbHRlciBpcyBhY3RpdmVcbiAgICAgKi9cbiAgICBsaXptYXBMYXllckZpbHRlckFjdGl2ZTogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogY2hlY2tNb2JpbGVcbiAgICAgKi9cbiAgICBjaGVja01vYmlsZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gbUNoZWNrTW9iaWxlKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogY2xlYW5OYW1lXG4gICAgICovXG4gICAgY2xlYW5OYW1lOiBmdW5jdGlvbiggYU5hbWUgKSB7XG4gICAgICByZXR1cm4gY2xlYW5OYW1lKCBhTmFtZSApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGdldE5hbWVCeUNsZWFuTmFtZVxuICAgICAqL1xuICAgIGdldE5hbWVCeUNsZWFuTmFtZTogZnVuY3Rpb24oIGNsZWFuTmFtZSApIHtcbiAgICAgIHJldHVybiBnZXROYW1lQnlDbGVhbk5hbWUoIGNsZWFuTmFtZSApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGdldE5hbWVCeVNob3J0TmFtZVxuICAgICAqL1xuICAgIGdldE5hbWVCeVNob3J0TmFtZTogZnVuY3Rpb24oIHNob3J0TmFtZSApIHtcbiAgICAgIHJldHVybiBnZXROYW1lQnlTaG9ydE5hbWUoIHNob3J0TmFtZSApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGdldE5hbWVCeVR5cGVOYW1lXG4gICAgICovXG4gICAgZ2V0TmFtZUJ5VHlwZU5hbWU6IGZ1bmN0aW9uKCB0eXBlTmFtZSApIHtcbiAgICAgIHJldHVybiBnZXROYW1lQnlUeXBlTmFtZSggdHlwZU5hbWUgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBnZXRMYXllck5hbWVCeUNsZWFuTmFtZVxuICAgICAqL1xuICAgIGdldExheWVyTmFtZUJ5Q2xlYW5OYW1lOiBmdW5jdGlvbiggY2xlYW5OYW1lICkge1xuICAgICAgcmV0dXJuIGdldExheWVyTmFtZUJ5Q2xlYW5OYW1lKCBjbGVhbk5hbWUgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBnZXREb2NrUmlnaHRQb3NpdGlvblxuICAgICAqL1xuICAgIGdldERvY2tSaWdodFBvc2l0aW9uOiBmdW5jdGlvbiggKSB7XG4gICAgICByZXR1cm4gZ2V0RG9ja1JpZ2h0UG9zaXRpb24oICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogYWRkTWVzc2FnZVxuICAgICAqL1xuICAgIGFkZE1lc3NhZ2U6IGZ1bmN0aW9uKCBhTWVzc2FnZSwgYVR5cGUsIGFDbG9zZSApIHtcbiAgICAgIHJldHVybiBtQWRkTWVzc2FnZSggYU1lc3NhZ2UsIGFUeXBlLCBhQ2xvc2UgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiB1cGRhdGVTd2l0Y2hlclNpemVcbiAgICAgKi9cbiAgICB1cGRhdGVTd2l0Y2hlclNpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHVwZGF0ZVN3aXRjaGVyU2l6ZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IHVwZGF0ZU1pbmlEb2NrU2l6ZVxuICAgICAqL1xuICAgIHVwZGF0ZU1pbmlEb2NrU2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdXBkYXRlTWluaURvY2tTaXplKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogdHJhbnNmb3JtQm91bmRzXG4gICAgICovXG4gICAgbG9hZFByb2pEZWZpbml0aW9uOiBmdW5jdGlvbiggYUNSUywgYUNhbGxiYWNrICkge1xuICAgICAgcmV0dXJuIGxvYWRQcm9qRGVmaW5pdGlvbiggYUNSUywgYUNhbGxiYWNrICk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiB1cGRhdGVDb250ZW50U2l6ZVxuICAgICAqL1xuICAgIHVwZGF0ZUNvbnRlbnRTaXplOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB1cGRhdGVDb250ZW50U2l6ZSgpO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogZ2V0TGF5ZXJGZWF0dXJlXG4gICAgICovXG4gICAgZ2V0TGF5ZXJGZWF0dXJlOiBmdW5jdGlvbiggZmVhdHVyZVR5cGUsIGZpZCwgYUNhbGxiYWNrLCBhQ2FsbGJhY2tOb3Rmb3VuZCwgZm9yY2VUb0xvYWQgKSB7XG4gICAgICBnZXRMYXllckZlYXR1cmUoIGZlYXR1cmVUeXBlLCBmaWQsIGFDYWxsYmFjaywgYUNhbGxiYWNrTm90Zm91bmQsIGZvcmNlVG9Mb2FkICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogZ2V0RmVhdHVyZURhdGFcbiAgICAgKi9cbiAgICBnZXRGZWF0dXJlRGF0YTogZnVuY3Rpb24oYU5hbWUsIGFGaWx0ZXIsIGFGZWF0dXJlSUQsIGFHZW9tZXRyeU5hbWUsIHJlc3RyaWN0VG9NYXBFeHRlbnQsIHN0YXJ0SW5kZXgsIG1heEZlYXR1cmVzLCBhQ2FsbEJhY2spIHtcbiAgICAgIGdldEZlYXR1cmVEYXRhKGFOYW1lLCBhRmlsdGVyLCBhRmVhdHVyZUlELCBhR2VvbWV0cnlOYW1lLCByZXN0cmljdFRvTWFwRXh0ZW50LCBzdGFydEluZGV4LCBtYXhGZWF0dXJlcywgYUNhbGxCYWNrKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiB0cmFuc2xhdGVXZnNGaWVsZFZhbHVlc1xuICAgICAqL1xuICAgIHRyYW5zbGF0ZVdmc0ZpZWxkVmFsdWVzOiBmdW5jdGlvbihhTmFtZSwgZmllbGROYW1lLCBmaWVsZFZhbHVlLCB0cmFuc2xhdGlvbl9kaWN0KSB7XG4gICAgICByZXR1cm4gdHJhbnNsYXRlV2ZzRmllbGRWYWx1ZXMoYU5hbWUsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgdHJhbnNsYXRpb25fZGljdCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogem9vbVRvRmVhdHVyZVxuICAgICAqL1xuICAgIHpvb21Ub0ZlYXR1cmU6IGZ1bmN0aW9uKCBmZWF0dXJlVHlwZSwgZmlkLCB6b29tQWN0aW9uICkge1xuICAgICAgem9vbVRvRmVhdHVyZSggZmVhdHVyZVR5cGUsIGZpZCwgem9vbUFjdGlvbiApO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogZ2V0UHJpbnRHcmlkSW50ZXJ2YWxcbiAgICAgKi9cbiAgICBnZXRQcmludEdyaWRJbnRlcnZhbDogZnVuY3Rpb24oYUxheW91dCwgYVNjYWxlLCBhU2NhbGVzKSB7XG4gICAgICByZXR1cm4gZ2V0UHJpbnRHcmlkSW50ZXJ2YWwoYUxheW91dCwgYVNjYWxlLCBhU2NhbGVzKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGdldFByaW50Q2FwYWJpbGl0aWVzXG4gICAgICovXG4gICAgZ2V0UHJpbnRDYXBhYmlsaXRpZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHByaW50Q2FwYWJpbGl0aWVzO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogZ2V0RXh0ZXJuYWxCYXNlbGF5ZXJzUmVwbGFjZW1lbnRcbiAgICAgKi9cbiAgICBnZXRFeHRlcm5hbEJhc2VsYXllcnNSZXBsYWNlbWVudDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZXh0ZXJuYWxCYXNlbGF5ZXJzUmVwbGFjZW1lbnQ7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogbGF1bmNoVG9vbHRpcExheWVyXG4gICAgICovXG4gICAgbGF1bmNoVG9vbHRpcExheWVyOiBmdW5jdGlvbiggYUxheWVyTmFtZSApIHtcbiAgICAgICAgdmFyIHRsT3B0aW9ucyA9ICQoJyN0b29sdGlwLWxheWVyLWxpc3Qgb3B0aW9uW3ZhbHVlPVwiJythTGF5ZXJOYW1lKydcIl0nKTtcbiAgICAgICAgaWYgKCB0bE9wdGlvbnMubGVuZ3RoID09IDEgJiYgJCgnI3Rvb2x0aXAtbGF5ZXItbGlzdCcpLnZhbCgpICE9IGFMYXllck5hbWUpXG4gICAgICAgICAgICAkKCcjdG9vbHRpcC1sYXllci1saXN0JykudmFsKCBhTGF5ZXJOYW1lICkuY2hhbmdlKCk7XG4gICAgICAgIGVsc2UgaWYgKCB0bE9wdGlvbnMubGVuZ3RoICE9IDEgJiYgJCgnI3Rvb2x0aXAtbGF5ZXItbGlzdCcpLnZhbCgpICE9ICcnIClcbiAgICAgICAgICAgICQoJyN0b29sdGlwLWxheWVyLWxpc3QnKS52YWwoJycpLmNoYW5nZSgpO1xuICAgICAgICByZXR1cm4gKCQoJyN0b29sdGlwLWxheWVyLWxpc3QnKS52YWwoKSA9PSBhTGF5ZXJOYW1lKTtcbiAgICB9LFxuXG5cbiAgICBsYXVuY2hFZGl0aW9uOiBmdW5jdGlvbiggYUxheWVySWQsIGFGaWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICBkZWxldGVFZGl0aW9uRmVhdHVyZTogZnVuY3Rpb24oIGFMYXllcklkLCBhRmlkLCBhTWVzc2FnZSwgYUNhbGxiYWNrICl7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgZGVhY3RpdmF0ZVRvb2xDb250cm9sczogZnVuY3Rpb24oIGV2dCApIHtcbiAgICAgIHJldHVybiBkZWFjdGl2YXRlVG9vbENvbnRyb2xzKCBldnQgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBleHBvcnRWZWN0b3JMYXllclxuICAgICAqL1xuICAgIGV4cG9ydFZlY3RvckxheWVyOiBmdW5jdGlvbiggYU5hbWUsIGVmb3JtYXQsIHJlc3RyaWN0VG9NYXBFeHRlbnQgKSB7XG4gICAgICByZXR1cm4gZXhwb3J0VmVjdG9yTGF5ZXIoIGFOYW1lLCBlZm9ybWF0LCByZXN0cmljdFRvTWFwRXh0ZW50ICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogZ2V0VmVjdG9yTGF5ZXJXZnNVcmxcbiAgICAgKi9cbiAgICBnZXRWZWN0b3JMYXllcldmc1VybDogZnVuY3Rpb24oIGFOYW1lLCBhRmlsdGVyLCBhRmVhdHVyZUlkLCBnZW9tZXRyeU5hbWUsIHJlc3RyaWN0VG9NYXBFeHRlbnQgKSB7XG4gICAgICByZXR1cm4gZ2V0VmVjdG9yTGF5ZXJXZnNVcmwoIGFOYW1lLCBhRmlsdGVyLCBhRmVhdHVyZUlkLCBnZW9tZXRyeU5hbWUsIHJlc3RyaWN0VG9NYXBFeHRlbnQgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBnZXRWZWN0b3JMYXllckZlYXR1cmVUeXBlXG4gICAgICovXG4gICAgZ2V0VmVjdG9yTGF5ZXJGZWF0dXJlVHlwZXM6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGdldFZlY3RvckxheWVyRmVhdHVyZVR5cGVzKCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogZ2V0VmVjdG9yTGF5ZXJSZXN1bHRGb3JtYXRcbiAgICAgKi9cbiAgICBnZXRWZWN0b3JMYXllclJlc3VsdEZvcm1hdDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gZ2V0VmVjdG9yTGF5ZXJSZXN1bHRGb3JtYXQoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBnZXRMYXllckNvbmZpZ0J5SWRcbiAgICAgKi9cbiAgICBnZXRMYXllckNvbmZpZ0J5SWQ6IGZ1bmN0aW9uKCBhTGF5ZXJJZCwgYUNvbmZPYmpldCwgYUlkQXR0cmlidXRlICkge1xuICAgICAgcmV0dXJuIGdldExheWVyQ29uZmlnQnlJZCggYUxheWVySWQsIGFDb25mT2JqZXQsIGFJZEF0dHJpYnV0ZSApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGdldEZlYXR1cmVQb3B1cENvbnRlbnRcbiAgICAgKi9cbiAgICBnZXRGZWF0dXJlUG9wdXBDb250ZW50OiBmdW5jdGlvbiggYU5hbWUsIGZlYXQsIGFDYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGdldEZlYXR1cmVQb3B1cENvbnRlbnQoYU5hbWUsIGZlYXQsIGFDYWxsYmFjayk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogZ2V0RmVhdHVyZVBvcHVwQ29udGVudEJ5RmVhdHVyZUludGVyc2VjdGlvblxuICAgICAqL1xuICAgIGdldEZlYXR1cmVQb3B1cENvbnRlbnRCeUZlYXR1cmVJbnRlcnNlY3Rpb246IGZ1bmN0aW9uKCBhTmFtZSwgZmVhdCwgYUNhbGxiYWNrKSB7XG4gICAgICByZXR1cm4gZ2V0RmVhdHVyZVBvcHVwQ29udGVudEJ5RmVhdHVyZUludGVyc2VjdGlvbihhTmFtZSwgZmVhdCwgYUNhbGxiYWNrKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBhZGRHZW9tZXRyeUZlYXR1cmVJbmZvXG4gICAgICovXG4gICAgYWRkR2VvbWV0cnlGZWF0dXJlSW5mbzogZnVuY3Rpb24ocG9wdXAsIGNvbnRhaW5lcklkKXtcbiAgICAgIHJldHVybiBhZGRHZW9tZXRyeUZlYXR1cmVJbmZvKHBvcHVwLCBjb250YWluZXJJZCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogYWRkQ2hpbGRyZW5GZWF0dXJlSW5mb1xuICAgICAqL1xuICAgIGFkZENoaWxkcmVuRmVhdHVyZUluZm86IGZ1bmN0aW9uKHBvcHVwLCBjb250YWluZXJJZCl7XG4gICAgICByZXR1cm4gYWRkQ2hpbGRyZW5GZWF0dXJlSW5mbyhwb3B1cCwgY29udGFpbmVySWQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGFkZENoaWxkcmVuRGF0YXZpekZpbHRlcmVkQnlQb3B1cEZlYXR1cmVcbiAgICAgKi9cbiAgICBhZGRDaGlsZHJlbkRhdGF2aXpGaWx0ZXJlZEJ5UG9wdXBGZWF0dXJlOiBmdW5jdGlvbihwb3B1cCwgY29udGFpbmVySWQpe1xuICAgICAgcmV0dXJuIGFkZENoaWxkcmVuRGF0YXZpekZpbHRlcmVkQnlQb3B1cEZlYXR1cmUocG9wdXAsIGNvbnRhaW5lcklkKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBhZGREb2NrXG4gICAgICovXG4gICAgYWRkRG9jazogZnVuY3Rpb24oIGRuYW1lLCBkbGFiZWwsIGR0eXBlLCBkY29udGVudCwgZGljb24pe1xuICAgICAgcmV0dXJuIGFkZERvY2soZG5hbWUsIGRsYWJlbCwgZHR5cGUsIGRjb250ZW50LCBkaWNvbik7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogaW5pdFxuICAgICAqL1xuICAgIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgLy9nZXQgY29uZmlnXG4gICAgICAkLmdldEpTT04obGl6VXJscy5jb25maWcsbGl6VXJscy5wYXJhbXMsZnVuY3Rpb24oY2ZnRGF0YSkge1xuICAgICAgICBjb25maWcgPSBjZmdEYXRhO1xuICAgICAgICBjb25maWcub3B0aW9ucy5oYXNPdmVydmlldyA9IGZhbHNlO1xuXG4gICAgICAgIC8vIHN0b3JlIGxheWVySURzXG4gICAgICAgIGlmICggJ3VzZUxheWVySURzJyBpbiBjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy51c2VMYXllcklEcyA9PSAnVHJ1ZScgKSB7XG4gICAgICAgICAgICBmb3IgKCB2YXIgbGF5ZXJOYW1lIGluIGNvbmZpZy5sYXllcnMgKSB7XG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ0xheWVyID0gY29uZmlnLmxheWVyc1tsYXllck5hbWVdO1xuICAgICAgICAgICAgICAgIGxheWVySWRNYXBbY29uZmlnTGF5ZXIuaWRdID0gbGF5ZXJOYW1lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIHN0b3JlIHNob3J0bmFtZXMgYW5kIHNob3J0bmFtZXNcbiAgICAgICAgZm9yICggdmFyIGxheWVyTmFtZSBpbiBjb25maWcubGF5ZXJzICkge1xuICAgICAgICAgICAgdmFyIGNvbmZpZ0xheWVyID0gY29uZmlnLmxheWVyc1tsYXllck5hbWVdO1xuICAgICAgICAgICAgaWYgKCAnc2hvcnRuYW1lJyBpbiBjb25maWdMYXllciAmJiBjb25maWdMYXllci5zaG9ydG5hbWUgIT0gJycgKVxuICAgICAgICAgICAgICAgIHNob3J0TmFtZU1hcFtjb25maWdMYXllci5zaG9ydG5hbWVdID0gbGF5ZXJOYW1lO1xuICAgICAgICAgICAgY29uZmlnTGF5ZXIuY2xlYW5uYW1lID0gY2xlYW5OYW1lKGxheWVyTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICAgLy9nZXQgY2FwYWJpbGl0aWVzXG4gICAgICAgIHZhciBzZXJ2aWNlID0gVXRpbC51cmxBcHBlbmQobGl6VXJscy53bXNcbiAgICAgICAgICAsVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgICAgICk7XG4gICAgICAgICQuZ2V0KHNlcnZpY2VcbiAgICAgICAgICAse1NFUlZJQ0U6J1dNUycsUkVRVUVTVDonR2V0Q2FwYWJpbGl0aWVzJyxWRVJTSU9OOicxLjMuMCd9XG4gICAgICAgICAgLGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgJC5nZXQoc2VydmljZVxuICAgICAgICAgICx7U0VSVklDRTonV01UUycsUkVRVUVTVDonR2V0Q2FwYWJpbGl0aWVzJyxWRVJTSU9OOicxLjAuMCd9XG4gICAgICAgICAgLGZ1bmN0aW9uKHdtdHNDYXBhRGF0YSkge1xuICAgICAgICAkLmdldChzZXJ2aWNlXG4gICAgICAgICAgLHtTRVJWSUNFOidXRlMnLFJFUVVFU1Q6J0dldENhcGFiaWxpdGllcycsVkVSU0lPTjonMS4wLjAnfVxuICAgICAgICAgICxmdW5jdGlvbih3ZnNDYXBhRGF0YSkge1xuXG4gICAgICAgICAgICAvL3BhcnNlIGNhcGFiaWxpdGllc1xuICAgICAgICAgICAgaWYgKCFwYXJzZURhdGEoZGF0YSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgICAgIHZhciB3bXRzRm9ybWF0ID0gbmV3IE9wZW5MYXllcnMuRm9ybWF0LldNVFNDYXBhYmlsaXRpZXMoe30pO1xuICAgICAgICAgICAgd210c0NhcGFiaWxpdGllcyA9IHdtdHNGb3JtYXQucmVhZCggd210c0NhcGFEYXRhICk7XG4gICAgICAgICAgICBpZiAoICdleGNlcHRpb25SZXBvcnQnIGluIHdtdHNDYXBhYmlsaXRpZXMgKSB7XG4gICAgICAgICAgICAgICAgd210c0VsZW0gPSAkKCcjbWV0YWRhdGEtd210cy1nZXRjYXBhYmlsaXRpZXMtdXJsJyk7XG4gICAgICAgICAgICAgICAgaWYgKCB3bXRzRWxlbS5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgd210c0VsZW0uYmVmb3JlKCc8aSB0aXRsZT1cIicrd210c0NhcGFiaWxpdGllcy5leGNlcHRpb25SZXBvcnQuZXhjZXB0aW9uc1swXS50ZXh0c1swXSsnXCIgY2xhc3M9XCJpY29uLXdhcm5pbmctc2lnblwiPjwvaT4mbmJzcDsnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgd210c0NhcGFiaWxpdGllcyA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHdmc0NhcGFiaWxpdGllcyA9ICQod2ZzQ2FwYURhdGEpO1xuICAgICAgICAgICAgdmFyIGZlYXR1cmVUeXBlcyA9IGdldFZlY3RvckxheWVyRmVhdHVyZVR5cGVzKCk7XG4gICAgICAgICAgICBmZWF0dXJlVHlwZXMuZWFjaCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICB2YXIgdHlwZU5hbWUgPSAkKHRoaXMpLmZpbmQoJ05hbWUnKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgdmFyIGxheWVyTmFtZSA9IGxpek1hcC5nZXROYW1lQnlUeXBlTmFtZSggdHlwZU5hbWUgKTtcbiAgICAgICAgICAgICAgICBpZiAoICFsYXllck5hbWUgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlTmFtZSBpbiBjb25maWcubGF5ZXJzKVxuICAgICAgICAgICAgICAgICAgICAgIGxheWVyTmFtZSA9IHR5cGVOYW1lXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKCAodHlwZU5hbWUgaW4gc2hvcnROYW1lTWFwKSAmJiAoc2hvcnROYW1lTWFwW3R5cGVOYW1lXSBpbiBjb25maWcubGF5ZXJzKSlcbiAgICAgICAgICAgICAgICAgICAgICBsYXllck5hbWUgPSBzaG9ydE5hbWVNYXBbdHlwZU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICBmb3IgKGwgaW4gY29uZmlnLmxheWVycykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGwuc3BsaXQoJyAnKS5qb2luKCdfJykgPT0gdHlwZU5hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXJOYW1lID0gbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKCAhKGxheWVyTmFtZSBpbiBjb25maWcubGF5ZXJzKSApXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICAgICAgICAgIHZhciBjb25maWdMYXllciA9IGNvbmZpZy5sYXllcnNbbGF5ZXJOYW1lXTtcbiAgICAgICAgICAgICAgICBjb25maWdMYXllci50eXBlbmFtZSA9IHR5cGVOYW1lO1xuICAgICAgICAgICAgICAgIHR5cGVOYW1lTWFwW3R5cGVOYW1lXSA9IGxheWVyTmFtZTtcbiAgICAgICAgICAgIH0gKTtcblxuICAgICAgICAgIC8vc2V0IHRpdGxlIGFuZCBhYnN0cmFjdCBjb21pbmcgZnJvbSBjYXBhYmlsaXRpZXNcbiAgICAgICAgICAkKCcjYWJzdHJhY3QnKS5odG1sKGNhcGFiaWxpdGllcy5hYnN0cmFjdCA/IGNhcGFiaWxpdGllcy5hYnN0cmFjdCA6ICcnKTtcblxuICAgICAgICAgIC8vIGdldCBhbmQgYW5hbHlzZSB0cmVlXG4gICAgICAgICAgdmFyIGNhcGFiaWxpdHkgPSBjYXBhYmlsaXRpZXMuY2FwYWJpbGl0eTtcbiAgICAgICAgICBiZWZvcmVMYXllclRyZWVDcmVhdGVkKCk7XG4gICAgICAgICAgdmFyIGZpcnN0TGF5ZXIgPSBjYXBhYmlsaXR5Lm5lc3RlZExheWVyc1swXTtcbiAgICAgICAgICBnZXRMYXllclRyZWUoZmlyc3RMYXllcix0cmVlKTtcbiAgICAgICAgICBhbmFseXNlTm9kZSh0cmVlKTtcbiAgICAgICAgICBzZWxmLmNvbmZpZyA9IGNvbmZpZztcbiAgICAgICAgICBzZWxmLnRyZWUgPSB0cmVlO1xuICAgICAgICAgIHNlbGYuZXZlbnRzLnRyaWdnZXJFdmVudChcInRyZWVjcmVhdGVkXCIsIHNlbGYpO1xuXG4gICAgICAgICAgLy8gY3JlYXRlIHRoZSBtYXBcbiAgICAgICAgICBpbml0UHJvamVjdGlvbnMoZmlyc3RMYXllcik7XG4gICAgICAgICAgY3JlYXRlTWFwKCk7XG4gICAgICAgICAgc2VsZi5tYXAgPSBtYXA7XG4gICAgICAgICAgc2VsZi5sYXllcnMgPSBsYXllcnM7XG4gICAgICAgICAgc2VsZi5iYXNlbGF5ZXJzID0gYmFzZWxheWVycztcbiAgICAgICAgICBzZWxmLmNvbnRyb2xzID0gY29udHJvbHM7XG4gICAgICAgICAgc2VsZi5ldmVudHMudHJpZ2dlckV2ZW50KFwibWFwY3JlYXRlZFwiLCBzZWxmKTtcblxuICAgICAgICAgIC8vIGNyZWF0ZSB0aGUgc3dpdGNoZXJcbiAgICAgICAgICBjcmVhdGVTd2l0Y2hlcigpO1xuICAgICAgICAgIHNlbGYuZXZlbnRzLnRyaWdnZXJFdmVudChcImxheWVyc2FkZGVkXCIsIHNlbGYpO1xuXG5cbiAgICAgICAgICAvLyBWZXJpZnlpbmcgei1pbmRleFxuICAgICAgICAgIHZhciBsYXN0TGF5ZXJaSW5kZXggPSBtYXAubGF5ZXJzW21hcC5sYXllcnMubGVuZ3RoLTFdLmdldFpJbmRleCgpO1xuICAgICAgICAgIGlmICggbGFzdExheWVyWkluZGV4ID4gbWFwLlpfSU5ERVhfQkFTRVsnRmVhdHVyZSddIC0gMTAwICkge1xuICAgICAgICAgICAgbWFwLlpfSU5ERVhfQkFTRVsnRmVhdHVyZSddID0gbGFzdExheWVyWkluZGV4ICsgMTAwO1xuICAgICAgICAgICAgbWFwLlpfSU5ERVhfQkFTRVsnUG9wdXAnXSA9IG1hcC5aX0lOREVYX0JBU0VbJ0ZlYXR1cmUnXSArIDI1O1xuICAgICAgICAgICAgaWYgKCBtYXAuWl9JTkRFWF9CQVNFWydQb3B1cCddID4gbWFwLlpfSU5ERVhfQkFTRVsnQ29udHJvbCddIC0gMjUgKVxuICAgICAgICAgICAgICAgIG1hcC5aX0lOREVYX0JBU0VbJ0NvbnRyb2wnXSA9IG1hcC5aX0lOREVYX0JBU0VbJ1BvcHVwJ10gKyAyNTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBpbml0aWFsaXplIHRoZSBtYXBcbiAgICAgICAgICAvLyBTZXQgbWFwIGV4dGVudCBkZXBlbmRpbmcgb24gb3B0aW9uc1xuICAgICAgICAgIHZhciB2ZXJpZnlpbmdWaXNpYmlsaXR5ID0gdHJ1ZTtcbiAgICAgICAgICB2YXIgaHJlZlBhcmFtID0gT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlcnMod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICAgIGlmICghbWFwLmdldENlbnRlcigpKSB7XG4gICAgICAgICAgICBpZiAoIGhyZWZQYXJhbS5iYm94IHx8IGhyZWZQYXJhbS5CQk9YICkge1xuICAgICAgICAgICAgICAgIHZhciBocmVmQmJveCA9IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKCBocmVmUGFyYW0uYmJveCApXG4gICAgICAgICAgICAgICAgICBocmVmQmJveCA9IE9wZW5MYXllcnMuQm91bmRzLmZyb21BcnJheSggaHJlZlBhcmFtLmJib3ggKTtcbiAgICAgICAgICAgICAgICBpZiAoIGhyZWZQYXJhbS5CQk9YIClcbiAgICAgICAgICAgICAgICAgIGhyZWZCYm94ID0gT3BlbkxheWVycy5Cb3VuZHMuZnJvbUFycmF5KCBocmVmUGFyYW0uQkJPWCApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBocmVmUGFyYW0uY3JzICYmIGhyZWZQYXJhbS5jcnMgIT0gbWFwLmdldFByb2plY3Rpb24oKSApXG4gICAgICAgICAgICAgICAgICBocmVmQmJveC50cmFuc2Zvcm0oIGhyZWZQYXJhbS5jcnMsIG1hcC5nZXRQcm9qZWN0aW9uKCkgKVxuICAgICAgICAgICAgICAgIGlmICggaHJlZlBhcmFtLkNSUyAmJiBocmVmUGFyYW0uQ1JTICE9IG1hcC5nZXRQcm9qZWN0aW9uKCkgKVxuICAgICAgICAgICAgICAgICAgaHJlZkJib3gudHJhbnNmb3JtKCBocmVmUGFyYW0uQ1JTLCBtYXAuZ2V0UHJvamVjdGlvbigpIClcbiAgICAgICAgICAgICAgICBpZiggbWFwLnJlc3RyaWN0ZWRFeHRlbnQuY29udGFpbnNCb3VuZHMoIGhyZWZCYm94ICkgKVxuICAgICAgICAgICAgICAgICAgbWFwLnpvb21Ub0V4dGVudCggaHJlZkJib3gsIHRydWUgKTtcbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIHZhciBwcm9qQmJveCA9ICQoJyNtZXRhZGF0YSAuYmJveCcpLnRleHQoKTtcbiAgICAgICAgICAgICAgICAgIHByb2pCYm94ID0gT3BlbkxheWVycy5Cb3VuZHMuZnJvbVN0cmluZyhwcm9qQmJveCk7XG4gICAgICAgICAgICAgICAgICBpZiggcHJvakJib3guY29udGFpbnNCb3VuZHMoIGhyZWZCYm94ICkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHByb2pQcm9qID0gJCgnI21ldGFkYXRhIC5wcm9qJykudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgICAgIGxvYWRQcm9qRGVmaW5pdGlvbiggcHJvalByb2osIGZ1bmN0aW9uKCBhUHJvaiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZkJib3gudHJhbnNmb3JtKCBhUHJvaiwgbWFwLmdldFByb2plY3Rpb24oKSApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBtYXAuem9vbVRvRXh0ZW50KCBocmVmQmJveCwgdHJ1ZSApO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwLnpvb21Ub0V4dGVudChtYXAuaW5pdGlhbEV4dGVudCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWFwLnpvb21Ub0V4dGVudChtYXAuaW5pdGlhbEV4dGVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2ZXJpZnlpbmdWaXNpYmlsaXR5ID0gZmFsc2U7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdXBkYXRlQ29udGVudFNpemUoKTtcbiAgICAgICAgICBtYXAuZXZlbnRzLnRyaWdnZXJFdmVudChcInpvb21lbmRcIix7XCJ6b29tQ2hhbmdlZFwiOiB0cnVlfSk7XG5cbiAgICAgICAgICAvLyBjcmVhdGUgb3ZlcnZpZXcgaWYgJ092ZXJ2aWV3JyBsYXllclxuICAgICAgICAgIGNyZWF0ZU92ZXJ2aWV3KCk7XG5cbiAgICAgICAgICAvLyBjcmVhdGUgbmF2aWdhdGlvbiBhbmQgdG9vbGJhclxuICAgICAgICAgIGNyZWF0ZU5hdmJhcigpO1xuICAgICAgICAgIGNyZWF0ZVRvb2xiYXIoKTtcbiAgICAgICAgICBzZWxmLmV2ZW50cy50cmlnZ2VyRXZlbnQoXCJ0b29sYmFyY3JlYXRlZFwiLCBzZWxmKTtcblxuICAgICAgICAgIC8vIGNyZWF0ZSBwZXJtYWxpbmtcbiAgICAgICAgICBjcmVhdGVQZXJtYWxpbmsoKTtcblxuICAgICAgICAgIC8vIFRvZ2dsZSBPcGVuTGF5ZXJzIHZpc2liaWxpdHkgdG8gdHJ1ZSBmb3IgbGVnZW5kIGNoZWNrYm94ZXNcbiAgICAgICAgICAvLyAxLyBDaGVjayBwZXJtYWxpbmsgaXMgdXNlZCBvciBub3RcbiAgICAgICAgICB2YXIgbGF5ZXJzSGF2ZUJlZW5BY3RpdmF0ZWRCeVBlcm1hbGluayA9IGZhbHNlO1xuICAgICAgICAgIHZhciB1cGFyYW1zID0gZ2V0VXJsUGFyYW1ldGVycygpO1xuICAgICAgICAgIGlmKCAnbGF5ZXJzJyBpbiB1cGFyYW1zICkge1xuICAgICAgICAgICAgdmFyIHBsYXllcnMgPSB1cGFyYW1zLmxheWVycztcbiAgICAgICAgICAgIGZvciggdmFyIGk9MDsgaSA8IG1hcC5sYXllcnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgICB2YXIgbCA9IG1hcC5sYXllcnNbaV07XG4gICAgICAgICAgICAgIHZhciBsYmFzZSA9IGwuaXNCYXNlTGF5ZXI7XG4gICAgICAgICAgICAgIGlmKCAhbGJhc2UgKXtcbiAgICAgICAgICAgICAgICBpZiAoIHBsYXllcnNbaV0gPT0gJ1QnICl7XG4gICAgICAgICAgICAgICAgICBsYXllcnNIYXZlQmVlbkFjdGl2YXRlZEJ5UGVybWFsaW5rID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgIGwuc2V0VmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJ1blBlcm1hbGluayggdXBhcmFtcyApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIDIvIFRvZ2dsZSBjaGVja2JveGVzXG4gICAgICAgICAgJCgnI3N3aXRjaGVyIGJ1dHRvbi5jaGVja2JveFtuYW1lPVwibGF5ZXJcIl0nKS5lYWNoKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgY2IgPSAkKHRoaXMpO1xuICAgICAgICAgICAgdmFyIGNsZWFuTmFtZSA9IGNiLnZhbCgpO1xuICAgICAgICAgICAgdmFyIG9MYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUoY2xlYW5OYW1lKVswXTtcbiAgICAgICAgICAgIGlmKCBvTGF5ZXIgKXtcbiAgICAgICAgICAgICAgLy8gdG9nZ2xlIGNoZWNrZWQgY2xhc3MgZm9yIHBlcm1hbGluayBsYXllcnNcbiAgICAgICAgICAgICAgLy8gYmVjYXVzZSBPTCBoYXMgYWxyZWFkeSBkcmF3biB0aGVtIGluIG1hcFxuICAgICAgICAgICAgICBjYi50b2dnbGVDbGFzcygnY2hlY2tlZCcsIG9MYXllci52aXNpYmlsaXR5KTtcblxuICAgICAgICAgICAgICAvLyBDaGVjayBsYXllcnMgd2ljaCBhcmUgbm90IHlldCBjaGVja2VkIGJ1dCBuZWVkIHRvICggZm9yIG5vcm1hbCBiZWhhdmlvdXIgb3V0c2lkZSBwZXJtYWxpbmsgKVxuICAgICAgICAgICAgICAvLyBUaGlzIHdpbGwgdHJpZ2dlciBsYXllcnMgdG8gYmUgZHJhd25cbiAgICAgICAgICAgICAgaWYoICFjYi5oYXNDbGFzcygnY2hlY2tlZCcpICYmIG9MYXllci5pc1Zpc2libGUgJiYgIWxheWVyc0hhdmVCZWVuQWN0aXZhdGVkQnlQZXJtYWxpbmspe1xuICAgICAgICAgICAgICAgIGNiLmNsaWNrKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gdmVyaWZ5aW5nIHRoZSBsYXllciB2aXNpYmlsaXR5IGZvciBwZXJtYWxpbmtcbiAgICAgICAgICBpZiAodmVyaWZ5aW5nVmlzaWJpbGl0eSkge1xuICAgICAgICAgICAgbWFwLmdldENvbnRyb2xzQnlDbGFzcygnT3BlbkxheWVycy5Db250cm9sLkFyZ1BhcnNlcicpWzBdLmNvbmZpZ3VyZUxheWVycygpO1xuICAgICAgICAgICAgZm9yICh2YXIgaT0wLGxlbj1sYXllcnMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgIHZhciBsID0gbGF5ZXJzW2ldO1xuICAgICAgICAgICAgICB2YXIgYnRuID0gJCgnI3N3aXRjaGVyIGJ1dHRvbi5jaGVja2JveFtuYW1lPVwibGF5ZXJcIl1bdmFsdWU9XCInK2wubmFtZSsnXCJdJyk7XG4gICAgICAgICAgICAgIGlmICggKGhyZWZQYXJhbS5sYXllcnMgJiYgbC5nZXRWaXNpYmlsaXR5KCkgIT0gYnRuLmhhc0NsYXNzKCdjaGVja2VkJykgKSApXG4gICAgICAgICAgICAgICAgJCgnI3N3aXRjaGVyIGJ1dHRvbi5jaGVja2JveFtuYW1lPVwibGF5ZXJcIl1bdmFsdWU9XCInK2wubmFtZSsnXCJdJykuY2xpY2soKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBjaGVja2VkIGFsbCB0b2dnbGVkIGxheWVyXG4gICAgICAgICAgJCgnI3N3aXRjaGVyIGJ1dHRvbi5jaGVja2JveC5kaXNhYmxlZFtuYW1lPVwibGF5ZXJcIl06bm90KC5jaGVja2VkKScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBjYiA9ICQodGhpcyk7XG4gICAgICAgICAgICB2YXIgY2xlYW5OYW1lID0gY2IudmFsKCk7XG4gICAgICAgICAgICB2YXIgbmFtZSA9IGNsZWFuTmFtZTtcbiAgICAgICAgICAgIGlmICggY2xlYW5OYW1lIGluIGNsZWFuTmFtZU1hcCApXG4gICAgICAgICAgICAgICAgbmFtZSA9IGdldExheWVyTmFtZUJ5Q2xlYW5OYW1lKGNsZWFuTmFtZSk7XG4gICAgICAgICAgICBpZiAoIG5hbWUgaW4gY29uZmlnLmxheWVycyApIHtcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXJDb25maWcgPSBjb25maWcubGF5ZXJzW25hbWVdO1xuICAgICAgICAgICAgICAgIGlmICggbGF5ZXJDb25maWcudG9nZ2xlZCA9PSBcIlRydWVcIiApXG4gICAgICAgICAgICAgICAgICAgIGNiLmFkZENsYXNzKCdjaGVja2VkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBmaW5hbGl6ZSBzbGlkZXJcbiAgICAgICAgICAkKCcjbmF2YmFyIGRpdi5zbGlkZXInKS5zbGlkZXIoXCJ2YWx1ZVwiLG1hcC5nZXRab29tKCkpO1xuICAgICAgICAgIG1hcC5ldmVudHMub24oe1xuICAgICAgICAgICAgem9vbWVuZCA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAvLyBVcGRhdGUgbGVnZW5kc1xuICAgICAgICAgICAgICAkKCcjc3dpdGNoZXIgdGFibGUudHJlZSB0ci5sZWdlbmRHcmFwaGljcy5pbml0aWFsaXplZCcpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gc2VsZi5hdHRyKCdpZCcpLnJlcGxhY2UoJ2xlZ2VuZC0nLCcnKTtcbiAgICAgICAgICAgICAgICB2YXIgdXJsID0gZ2V0TGF5ZXJMZWdlbmRHcmFwaGljVXJsKG5hbWUsIHRydWUpO1xuICAgICAgICAgICAgICAgIGlmICggdXJsICE9IG51bGwgJiYgdXJsICE9ICcnICkge1xuICAgICAgICAgICAgICAgICAgICAvLyBDaGFuZ2UgaW1hZ2UgYXR0cmlidXRlIGRhdGEtc3JjXG4gICAgICAgICAgICAgICAgICAgIHNlbGYuZmluZCgnZGl2LmxlZ2VuZEdyYXBoaWNzIGltZycpLmF0dHIoICdkYXRhLXNyYycsIHVybCApO1xuICAgICAgICAgICAgICAgICAgICAvLyBPbmx5IGNoYW5nZSBpbWFnZSBhdHRyaWJ1dGUgc3JjIGlmIGxlZ2VuZCBpcyBkaXNwbGF5ZWRcbiAgICAgICAgICAgICAgICAgICAgaWYoIHNlbGYuaGFzQ2xhc3MoJ3Zpc2libGUnKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZi5maW5kKCdkaXYubGVnZW5kR3JhcGhpY3MgaW1nJykuYXR0ciggJ3NyYycsIHVybCApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgLy8gdXBkYXRlIHNsaWRlciBwb3NpdGlvblxuICAgICAgICAgICAgICAkKCcjbmF2YmFyIGRpdi5zbGlkZXInKS5zbGlkZXIoXCJ2YWx1ZVwiLCB0aGlzLmdldFpvb20oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBDb25uZWN0IHNpZ25hbC9zbG90IHdoZW4gbGF5ZXIgc3R5bGUgaXMgY2hhbmdlZFxuICAgICAgICAgIGxpek1hcC5ldmVudHMub24oe1xuICAgICAgICAgICAgJ2xheWVyc3R5bGVjaGFuZ2VkJzogZnVuY3Rpb24oZXZ0KXtcblxuICAgICAgICAgICAgICAvLyBDaGFuZ2UgbGVnZW5kIGRhdGEtc3JjIGFuZCBsZWdlbmQgc3JjIGlmIGxlZ2VuZCBpcyB2aXNpYmxlXG4gICAgICAgICAgICAgIHZhciBuYW1lID0gZXZ0LmZlYXR1cmVUeXBlO1xuICAgICAgICAgICAgICB2YXIgdXJsID0gZ2V0TGF5ZXJMZWdlbmRHcmFwaGljVXJsKG5hbWUsIHRydWUpO1xuICAgICAgICAgICAgICBpZiAoIHVybCAhPSBudWxsICYmIHVybCAhPSAnJyApIHtcbiAgICAgICAgICAgICAgICAgIHZhciBsU2VsID0gJyNzd2l0Y2hlciB0YWJsZS50cmVlIHRyI2xlZ2VuZC0nICsgbmFtZSArICcgZGl2LmxlZ2VuZEdyYXBoaWNzIGltZycgO1xuICAgICAgICAgICAgICAgICAgJChsU2VsKS5hdHRyKCdkYXRhLXNyYycsdXJsKTtcbiAgICAgICAgICAgICAgICAgIGlmKCAkKCcjc3dpdGNoZXIgdGFibGUudHJlZSB0ciNsZWdlbmQtJyArIG5hbWUpLmhhc0NsYXNzKCd2aXNpYmxlJykgKVxuICAgICAgICAgICAgICAgICAgICAgICQobFNlbCkuYXR0cignc3JjJyx1cmwpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyBUb2dnbGUgbG9jYXRlXG4gICAgICAgICAgJCgnI21hcG1lbnUgdWwnKS5vbignY2xpY2snLCAnbGkubmF2LW1pbmlkb2NrID4gYScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gc2VsZi5wYXJlbnQoKTtcbiAgICAgICAgICAgIHZhciBpZCA9IHNlbGYuYXR0cignaHJlZicpLnN1YnN0cigxKTtcbiAgICAgICAgICAgIHZhciB0YWIgPSAkKCcjbmF2LXRhYi0nK2lkKTtcbiAgICAgICAgICAgIGlmICggcGFyZW50Lmhhc0NsYXNzKCdhY3RpdmUnKSApIHtcbiAgICAgICAgICAgICAgICAkKCcjJytpZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHRhYi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudCggXCJtaW5pZG9ja2Nsb3NlZFwiLCB7J2lkJzppZH0gKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZEFjdGl2ZSA9ICQoJyNtYXBtZW51IGxpLm5hdi1taW5pZG9jay5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBpZiAoIG9sZEFjdGl2ZS5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkQWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoIFwibWluaWRvY2tjbG9zZWRcIiwgeydpZCc6IG9sZEFjdGl2ZS5jaGlsZHJlbignYScpLmZpcnN0KCkuYXR0cignaHJlZicpLnN1YnN0cigxKSB9ICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhYi5jaGlsZHJlbignYScpLmZpcnN0KCkuY2xpY2soKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KCBcIm1pbmlkb2Nrb3BlbmVkXCIsIHsnaWQnOmlkfSApO1xuICAgICAgICAgICAgICAgIHVwZGF0ZU1pbmlEb2NrU2l6ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5ibHVyKCk7XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFNob3cgbG9jYXRlIGJ5IGxheWVyXG4gICAgICAgICAgaWYgKCAhKCdsb2NhdGVCeUxheWVyJyBpbiBjb25maWcpIClcbiAgICAgICAgICAgICQoJyNidXR0b24tbG9jYXRlJykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICQoJyNidXR0b24tbG9jYXRlJykuY2xpY2soKTtcblxuICAgICAgICAgIC8vIGhpZGUgbWluaS1kb2NrIGlmIG5vIHRvb2wgaXMgYWN0aXZlXG4gICAgICAgICAgaWYgKCAkKCcjbWFwbWVudSB1bCBsaS5uYXYtbWluaWRvY2suYWN0aXZlJykubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICAgICAgICQoJyNtaW5pLWRvY2stY29udGVudCA+IC50YWItcGFuZS5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICQoJyNtaW5pLWRvY2stdGFicyBsaS5hY3RpdmUnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJCgnI21hcG1lbnUgdWwnKS5vbignY2xpY2snLCAnbGkubmF2LWRvY2sgPiBhJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBzZWxmLnBhcmVudCgpO1xuICAgICAgICAgICAgdmFyIGlkID0gc2VsZi5hdHRyKCdocmVmJykuc3Vic3RyKDEpO1xuICAgICAgICAgICAgdmFyIHRhYiA9ICQoJyNuYXYtdGFiLScraWQpO1xuICAgICAgICAgICAgdmFyIGxpem1hcEV2ZW50ID0gJyc7XG4gICAgICAgICAgICBpZiAoIHBhcmVudC5oYXNDbGFzcygnYWN0aXZlJykgKSB7XG4gICAgICAgICAgICAgICAgJCgnIycraWQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB0YWIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbGl6bWFwRXZlbnQgPSAnZG9ja2Nsb3NlZCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBvbGRBY3RpdmUgPSAkKCcjbWFwbWVudSBsaS5uYXYtZG9jay5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBpZiAoIG9sZEFjdGl2ZS5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkQWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoIFwiZG9ja2Nsb3NlZFwiLCB7J2lkJzogb2xkQWN0aXZlLmNoaWxkcmVuKCdhJykuZmlyc3QoKS5hdHRyKCdocmVmJykuc3Vic3RyKDEpIH0gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGFiLnNob3coKTtcbiAgICAgICAgICAgICAgICB0YWIuY2hpbGRyZW4oJ2EnKS5maXJzdCgpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgcGFyZW50LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBsaXptYXBFdmVudCA9ICdkb2Nrb3BlbmVkJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNlbGYuYmx1cigpO1xuXG4gICAgICAgICAgICB2YXIgZG9jayA9ICQoJyNkb2NrJyk7XG4gICAgICAgICAgICBpZiAoICQoJyNkb2NrLXRhYnMgLmFjdGl2ZScpLmxlbmd0aCA9PSAwIClcbiAgICAgICAgICAgICAgZG9jay5oaWRlKCk7XG4gICAgICAgICAgICBlbHNlIGlmICggIWRvY2suaXMoJzp2aXNpYmxlJykgKVxuICAgICAgICAgICAgICBkb2NrLnNob3coKTtcblxuICAgICAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICAgICAgaWYgKCBsaXptYXBFdmVudCAhPSAnJyApXG4gICAgICAgICAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoIGxpem1hcEV2ZW50LCB7J2lkJzppZH0gKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgJCgnI21hcG1lbnUgdWwnKS5vbignY2xpY2snLCAnbGkubmF2LXJpZ2h0LWRvY2sgPiBhJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBzZWxmLnBhcmVudCgpO1xuICAgICAgICAgICAgdmFyIGlkID0gc2VsZi5hdHRyKCdocmVmJykuc3Vic3RyKDEpO1xuICAgICAgICAgICAgdmFyIHRhYiA9ICQoJyNuYXYtdGFiLScraWQpO1xuICAgICAgICAgICAgdmFyIGxpem1hcEV2ZW50ID0gJyc7XG4gICAgICAgICAgICBpZiAoIHBhcmVudC5oYXNDbGFzcygnYWN0aXZlJykgKSB7XG4gICAgICAgICAgICAgICAgJCgnIycraWQpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB0YWIucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHBhcmVudC5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgdmFyIGxpem1hcEV2ZW50ID0gJ3JpZ2h0ZG9ja2Nsb3NlZCc7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhciBvbGRBY3RpdmUgPSAkKCcjbWFwbWVudSBsaS5uYXYtcmlnaHQtZG9jay5hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBpZiAoIG9sZEFjdGl2ZS5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkQWN0aXZlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoIFwicmlnaHRkb2NrY2xvc2VkXCIsIHsnaWQnOiBvbGRBY3RpdmUuY2hpbGRyZW4oJ2EnKS5maXJzdCgpLmF0dHIoJ2hyZWYnKS5zdWJzdHIoMSkgfSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0YWIuc2hvdygpO1xuICAgICAgICAgICAgICAgIHRhYi5jaGlsZHJlbignYScpLmZpcnN0KCkuY2xpY2soKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHZhciBsaXptYXBFdmVudCA9ICdyaWdodGRvY2tvcGVuZWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5ibHVyKCk7XG5cbiAgICAgICAgICAgIHZhciBkb2NrID0gJCgnI3JpZ2h0LWRvY2snKTtcbiAgICAgICAgICAgIGlmICggJCgnI3JpZ2h0LWRvY2stdGFicyAuYWN0aXZlJykubGVuZ3RoID09IDAgKSB7XG4gICAgICAgICAgICAgIGRvY2suaGlkZSgpO1xuICAgICAgICAgICAgICAkKCcjY29udGVudCcpLnJlbW92ZUNsYXNzKCdyaWdodC1kb2NrLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgdXBkYXRlQ29udGVudFNpemUoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoICFkb2NrLmlzKCc6dmlzaWJsZScpICkge1xuICAgICAgICAgICAgICAkKCcjY29udGVudCcpLmFkZENsYXNzKCdyaWdodC1kb2NrLXZpc2libGUnKTtcbiAgICAgICAgICAgICAgZG9jay5zaG93KCk7XG4gICAgICAgICAgICAgIHVwZGF0ZUNvbnRlbnRTaXplKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHRyaWdnZXIgZXZlbnRcbiAgICAgICAgICAgIGlmICggbGl6bWFwRXZlbnQgIT0gJycgKVxuICAgICAgICAgICAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KCBsaXptYXBFdmVudCwgeydpZCc6aWR9ICk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgLy8gU2hvdyBsYXllciBzd2l0Y2hlclxuICAgICAgICAgICQoJyNidXR0b24tc3dpdGNoZXInKS5jbGljaygpO1xuICAgICAgICAgIHVwZGF0ZUNvbnRlbnRTaXplKCk7XG5cbiAgICAgICAgICAkKCcjaGVhZGVybWVudSAubmF2YmFyLWlubmVyIC5uYXYgYVtyZWw9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuICAgICAgICAgICQoJyNtYXBtZW51IC5uYXYgYVtyZWw9XCJ0b29sdGlwXCJdJykudG9vbHRpcCgpO1xuICAgICAgICAgIHNlbGYuZXZlbnRzLnRyaWdnZXJFdmVudChcInVpY3JlYXRlZFwiLCBzZWxmKTtcblxuICAgICAgICAgICQoJ2JvZHknKS5jc3MoJ2N1cnNvcicsICdhdXRvJyk7XG4gICAgICAgICAgJCgnI2xvYWRpbmcnKS5kaWFsb2coJ2Nsb3NlJyk7XG4gICAgICAgIH0sIFwidGV4dFwiKTtcbiAgICAgICAgfSwgXCJ0ZXh0XCIpO1xuICAgICAgICB9LCBcInRleHRcIik7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIC8vIGluaXRpYWxpemluZyB0aGUgbGl6TWFwIGV2ZW50c1xuICAvLyA8VE9ETyBMQVRFUlxuICAvLyBvYmouZXZlbnRzID0gbmV3IE9wZW5MYXllcnMuRXZlbnRzKFxuICAvLyAgICAgb2JqLCBudWxsLFxuICAvLyAgICAgWyd0cmVlY3JlYXRlZCcsJ21hcGNyZWF0ZWQnLCdsYXllcnNhZGRlZCcsJ3VpY3JlYXRlZCcsXG4gIC8vICAgICAgJ2RvY2tvcGVuZWQnLCdkb2NrY2xvc2VkJ10sXG4gIC8vICAgICB0cnVlLFxuICAvLyAgICAge2luY2x1ZGVYWTogdHJ1ZX1cbiAgLy8gICApO1xuICAvLyBUT0RPIExBVEVSPlxuICByZXR1cm4gb2JqO1xufSgpO1xuLypcbiAqIGl0J3MgcG9zc2libGUgdG8gYWRkIGV2ZW50IGxpc3RlbmVyXG4gKiBiZWZvcmUgdGhlIGRvY3VtZW50IGlzIHJlYWR5XG4gKiBidXQgYWZ0ZXIgdGhpcyBmaWxlXG4gKi9cbiAvLyA8VE9ETyBMQVRFUlxuLy8gbGl6TWFwLmV2ZW50cy5vbih7XG4vLyAgICAgJ3RyZWVjcmVhdGVkJzpmdW5jdGlvbihldnQpe1xuLy8gICAgIH1cbi8vICAgICAsJ21hcGNyZWF0ZWQnOmZ1bmN0aW9uKGV2dCl7XG4vLyAgICAgICAvLyBBZGQgZW1wdHkgYmFzZWxheWVyIHRvIHRoZSBtYXBcbi8vICAgICAgIGlmICggKCdlbXB0eUJhc2VsYXllcicgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKVxuLy8gICAgICAgICAgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLmVtcHR5QmFzZWxheWVyID09ICdUcnVlJykge1xuLy8gICAgICAgICAvLyBjcmVhdGluZyB0aGUgZW1wdHkgYmFzZSBsYXllclxuLy8gICAgICAgICBsYXllckNvbmZpZyA9IHt9O1xuLy8gICAgICAgICBsYXllckNvbmZpZy50aXRsZSA9IGxpekRpY3RbJ2Jhc2VsYXllci5lbXB0eS50aXRsZSddO1xuLy8gICAgICAgICBsYXllckNvbmZpZy5uYW1lID0gJ2VtcHR5QmFzZWxheWVyJztcbi8vICAgICAgICAgZXZ0LmNvbmZpZy5sYXllcnNbJ2VtcHR5QmFzZWxheWVyJ10gPSBsYXllckNvbmZpZztcblxuLy8gICAgICAgICBldnQuYmFzZWxheWVycy5wdXNoKG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcignZW1wdHlCYXNlbGF5ZXInLHtcbi8vICAgICAgICAgICBpc0Jhc2VMYXllcjogdHJ1ZVxuLy8gICAgICAgICAgLG1heEV4dGVudDogZXZ0Lm1hcC5tYXhFeHRlbnRcbi8vICAgICAgICAgICxtYXhTY2FsZTogZXZ0Lm1hcC5tYXhTY2FsZVxuLy8gICAgICAgICAgLG1pblNjYWxlOiBldnQubWFwLm1pblNjYWxlXG4vLyAgICAgICAgICAsbnVtWm9vbUxldmVsczogZXZ0Lm1hcC5udW1ab29tTGV2ZWxzXG4vLyAgICAgICAgICAsc2NhbGVzOiBldnQubWFwLnNjYWxlc1xuLy8gICAgICAgICAgLHByb2plY3Rpb246IGV2dC5tYXAucHJvamVjdGlvblxuLy8gICAgICAgICAgLHVuaXRzOiBldnQubWFwLnByb2plY3Rpb24ucHJvai51bml0c1xuLy8gICAgICAgICB9KSk7XG4vLyAgICAgICAgIGV2dC5tYXAuYWxsT3ZlcmxheXMgPSBmYWxzZTtcbi8vICAgICAgIH1cblxuLy8gICAgICAgLy8gQWRkIE9wZW5TdHJlZXRNYXAsIEdvb2dsZSBNYXBzLCBCaW5nIE1hcHMsIElHTiBHZW9wb3J0YWlsXG4vLyAgICAgICAvLyBiYXNlbGF5ZXJzIHRvIHRoZSBtYXBcbi8vICAgICAgIGlmIChcbi8vICAgICAoKCdvc21NYXBuaWsnIGluIGV2dC5jb25maWcub3B0aW9ucylcbi8vICAgICAmJiBldnQuY29uZmlnLm9wdGlvbnMub3NtTWFwbmlrID09ICdUcnVlJykgfHxcbi8vICAgICAoKCdvc21TdGFtZW5Ub25lcicgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKVxuLy8gICAgICAmJiBldnQuY29uZmlnLm9wdGlvbnMub3NtU3RhbWVuVG9uZXIgPT0gJ1RydWUnKSB8fFxuLy8gICAgICgoJ29zbUN5Y2xlbWFwJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpXG4vLyAgICAgICYmIGV2dC5jb25maWcub3B0aW9ucy5vc21DeWNsZW1hcCA9PSAnVHJ1ZSdcbi8vICAgICAgJiYgKCdPQ01LZXknIGluIGV2dC5jb25maWcub3B0aW9ucykpIHx8XG4vLyAgICAgKCgnZ29vZ2xlU3RyZWV0cycgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKVxuLy8gICAgICAmJiBldnQuY29uZmlnLm9wdGlvbnMuZ29vZ2xlU3RyZWV0cyA9PSAnVHJ1ZScpIHx8XG4vLyAgICAgKCgnZ29vZ2xlU2F0ZWxsaXRlJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpXG4vLyAgICAgICYmIGV2dC5jb25maWcub3B0aW9ucy5nb29nbGVTYXRlbGxpdGUgPT0gJ1RydWUnKSB8fFxuLy8gICAgICgoJ2dvb2dsZUh5YnJpZCcgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKVxuLy8gICAgICAmJiBldnQuY29uZmlnLm9wdGlvbnMuZ29vZ2xlSHlicmlkID09ICdUcnVlJykgfHxcbi8vICAgICAoKCdnb29nbGVUZXJyYWluJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpXG4vLyAgICAgICYmIGV2dC5jb25maWcub3B0aW9ucy5nb29nbGVUZXJyYWluID09ICdUcnVlJykgfHxcbi8vICAgICAoKCdiaW5nU3RyZWV0cycgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKVxuLy8gICAgICAmJiBldnQuY29uZmlnLm9wdGlvbnMuYmluZ1N0cmVldHMgPT0gJ1RydWUnXG4vLyAgICAgICYmICgnYmluZ0tleScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSkgfHxcbi8vICAgICAoKCdiaW5nU2F0ZWxsaXRlJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpXG4vLyAgICAgICYmIGV2dC5jb25maWcub3B0aW9ucy5iaW5nU2F0ZWxsaXRlID09ICdUcnVlJ1xuLy8gICAgICAmJiAoJ2JpbmdLZXknIGluIGV2dC5jb25maWcub3B0aW9ucykpIHx8XG4vLyAgICAgKCgnYmluZ0h5YnJpZCcgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKVxuLy8gICAgICAmJiBldnQuY29uZmlnLm9wdGlvbnMuYmluZ0h5YnJpZCA9PSAnVHJ1ZSdcbi8vICAgICAgJiYgKCdiaW5nS2V5JyBpbiBldnQuY29uZmlnLm9wdGlvbnMpKSB8fFxuLy8gICAgICgoJ2lnblRlcnJhaW4nIGluIGV2dC5jb25maWcub3B0aW9ucylcbi8vICAgICAgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLmlnblRlcnJhaW4gPT0gJ1RydWUnXG4vLyAgICAgICYmICgnaWduS2V5JyBpbiBldnQuY29uZmlnLm9wdGlvbnMpKSB8fFxuLy8gICAgICgoJ2lnblN0cmVldHMnIGluIGV2dC5jb25maWcub3B0aW9ucylcbi8vICAgICAgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLmlnblN0cmVldHMgPT0gJ1RydWUnXG4vLyAgICAgICYmICgnaWduS2V5JyBpbiBldnQuY29uZmlnLm9wdGlvbnMpKSB8fFxuLy8gICAgICgoJ2lnblNhdGVsbGl0ZScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKVxuLy8gICAgICAmJiBldnQuY29uZmlnLm9wdGlvbnMuaWduU2F0ZWxsaXRlID09ICdUcnVlJ1xuLy8gICAgICAmJiAoJ2lnbktleScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSkgfHxcbi8vICAgICAoKCdpZ25DYWRhc3RyYWwnIGluIGV2dC5jb25maWcub3B0aW9ucylcbi8vICAgICAgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLmlnbkNhZGFzdHJhbCA9PSAnVHJ1ZSdcbi8vICAgICAgJiYgKCdpZ25LZXknIGluIGV2dC5jb25maWcub3B0aW9ucykpXG4vLyAgICAgKSB7XG4vLyAgICAgICAvL2FkZGluZyBiYXNlbGF5ZXJzXG4vLyAgICAgICB2YXIgbWF4RXh0ZW50ID0gbnVsbDtcbi8vICAgICAgIGlmICggT3BlbkxheWVycy5Qcm9qZWN0aW9uLmRlZmF1bHRzWydFUFNHOjkwMDkxMyddLm1heEV4dGVudCApXG4vLyAgICAgICAgIG1heEV4dGVudCA9IG5ldyBPcGVuTGF5ZXJzLkJvdW5kcyhPcGVuTGF5ZXJzLlByb2plY3Rpb24uZGVmYXVsdHNbJ0VQU0c6OTAwOTEzJ10ubWF4RXh0ZW50KTtcbi8vICAgICAgIGVsc2UgaWYgKCBPcGVuTGF5ZXJzLlByb2plY3Rpb24uZGVmYXVsdHNbJ0VQU0c6Mzg1NyddLm1heEV4dGVudCApXG4vLyAgICAgICAgIG1heEV4dGVudCA9IG5ldyBPcGVuTGF5ZXJzLkJvdW5kcyhPcGVuTGF5ZXJzLlByb2plY3Rpb24uZGVmYXVsdHNbJ0VQU0c6Mzg1NyddLm1heEV4dGVudCk7XG5cbi8vICAgICAgIHZhciBsT3B0aW9ucyA9IHt6b29tT2Zmc2V0OjAsbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjV9O1xuLy8gICAgICAgaWYgKCgncmVzb2x1dGlvbnMnIGluIGV2dC5jb25maWcub3B0aW9ucylcbi8vICAgICAgICAgICAmJiBldnQuY29uZmlnLm9wdGlvbnMucmVzb2x1dGlvbnMubGVuZ3RoICE9IDAgKXtcbi8vICAgICAgICAgdmFyIHJlc29sdXRpb25zID0gZXZ0LmNvbmZpZy5vcHRpb25zLnJlc29sdXRpb25zO1xuLy8gICAgICAgICB2YXIgbWF4UmVzID0gcmVzb2x1dGlvbnNbMF07XG4vLyAgICAgICAgIHZhciBudW1ab29tTGV2ZWxzID0gcmVzb2x1dGlvbnMubGVuZ3RoO1xuLy8gICAgICAgICB2YXIgem9vbU9mZnNldCA9IDA7XG4vLyAgICAgICAgIHZhciByZXMgPSAxNTY1NDMuMDMzOTA2MjU7XG4vLyAgICAgICAgIHdoaWxlICggcmVzID4gbWF4UmVzICkge1xuLy8gICAgICAgICAgIHpvb21PZmZzZXQgKz0gMTtcbi8vICAgICAgICAgICByZXMgPSAxNTY1NDMuMDMzOTA2MjUgLyBNYXRoLnBvdygyLCB6b29tT2Zmc2V0KTtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBsT3B0aW9uc1snem9vbU9mZnNldCddID0gem9vbU9mZnNldDtcbi8vICAgICAgICAgbE9wdGlvbnNbJ21heFJlc29sdXRpb24nXSA9IG1heFJlcztcbi8vICAgICAgICAgbE9wdGlvbnNbJ251bVpvb21MZXZlbHMnXSA9IG51bVpvb21MZXZlbHM7XG4vLyAgICAgICB9XG5cbi8vICAgICAgIGlmICgoJ29zbU1hcG5paycgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSAmJiBldnQuY29uZmlnLm9wdGlvbnMub3NtTWFwbmlrID09ICdUcnVlJykge1xuLy8gICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICAgIHpvb21PZmZzZXQ6IDAsXG4vLyAgICAgICAgICAgbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjUsXG4vLyAgICAgICAgICAgbnVtWm9vbUxldmVsczoxOVxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCAhPSAwKSB7XG4vLyAgICAgICAgICAgb3B0aW9ucy56b29tT2Zmc2V0ID0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICBvcHRpb25zLm1heFJlc29sdXRpb24gPSBsT3B0aW9ucy5tYXhSZXNvbHV0aW9uO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0K2xPcHRpb25zLm51bVpvb21MZXZlbHMgPD0gb3B0aW9ucy5udW1ab29tTGV2ZWxzKVxuLy8gICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IGxPcHRpb25zLm51bVpvb21MZXZlbHM7XG4vLyAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBvcHRpb25zLm51bVpvb21MZXZlbHMgLSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICB2YXIgb3NtID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuT1NNKCdvc20nLFxuLy8gICAgICAgICAgICAgW1xuLy8gICAgICAgICAgICAgXCJodHRwczovL2EudGlsZS5vcGVuc3RyZWV0bWFwLm9yZy8ke3p9LyR7eH0vJHt5fS5wbmdcIixcbi8vICAgICAgICAgICAgIFwiaHR0cHM6Ly9iLnRpbGUub3BlbnN0cmVldG1hcC5vcmcvJHt6fS8ke3h9LyR7eX0ucG5nXCIsXG4vLyAgICAgICAgICAgICBcImh0dHBzOi8vYy50aWxlLm9wZW5zdHJlZXRtYXAub3JnLyR7en0vJHt4fS8ke3l9LnBuZ1wiXG4vLyAgICAgICAgICAgICBdXG4vLyAgICAgICAgICAgICAsb3B0aW9uc1xuLy8gICAgICAgICAgICAgKTtcbi8vICAgICAgICAgb3NtLm1heEV4dGVudCA9IG1heEV4dGVudDtcbi8vICAgICAgICAgdmFyIG9zbUNmZyA9IHtcbi8vICAgICAgICAgICAgICBcIm5hbWVcIjpcIm9zbVwiXG4vLyAgICAgICAgICAgICAsXCJ0aXRsZVwiOlwiT3BlblN0cmVldE1hcFwiXG4vLyAgICAgICAgICAgICAsXCJ0eXBlXCI6XCJiYXNlbGF5ZXJcIlxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICBldnQuY29uZmlnLmxheWVyc1snb3NtJ10gPSBvc21DZmc7XG4vLyAgICAgICAgIGV2dC5iYXNlbGF5ZXJzLnB1c2gob3NtKTtcbi8vICAgICAgIH1cblxuLy8gICAgICAgaWYgKCgnb3NtU3RhbWVuVG9uZXInIGluIGV2dC5jb25maWcub3B0aW9ucykgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLm9zbVN0YW1lblRvbmVyID09ICdUcnVlJykge1xuLy8gICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICAgIHpvb21PZmZzZXQ6IDAsXG4vLyAgICAgICAgICAgbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjUsXG4vLyAgICAgICAgICAgbnVtWm9vbUxldmVsczoxOVxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCAhPSAwKSB7XG4vLyAgICAgICAgICAgb3B0aW9ucy56b29tT2Zmc2V0ID0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICBvcHRpb25zLm1heFJlc29sdXRpb24gPSBsT3B0aW9ucy5tYXhSZXNvbHV0aW9uO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0K2xPcHRpb25zLm51bVpvb21MZXZlbHMgPD0gb3B0aW9ucy5udW1ab29tTGV2ZWxzKVxuLy8gICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IGxPcHRpb25zLm51bVpvb21MZXZlbHM7XG4vLyAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBvcHRpb25zLm51bVpvb21MZXZlbHMgLSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICB2YXIgc3RhbWVuVG9uZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5PU00oJ29zbS10b25lcicsXG4vLyAgICAgICAgICAgICBbXCJodHRwczovL3N0YW1lbi10aWxlcy1hLmEuc3NsLmZhc3RseS5uZXQvdG9uZXItbGl0ZS8ke3p9LyR7eH0vJHt5fS5wbmdcIixcbi8vICAgICAgICAgICAgIFwiaHR0cHM6Ly9zdGFtZW4tdGlsZXMtYi5hLnNzbC5mYXN0bHkubmV0L3RvbmVyLWxpdGUvJHt6fS8ke3h9LyR7eX0ucG5nXCIsXG4vLyAgICAgICAgICAgICBcImh0dHBzOi8vc3RhbWVuLXRpbGVzLWMuYS5zc2wuZmFzdGx5Lm5ldC90b25lci1saXRlLyR7en0vJHt4fS8ke3l9LnBuZ1wiLFxuLy8gICAgICAgICAgICAgXCJodHRwczovL3N0YW1lbi10aWxlcy1kLmEuc3NsLmZhc3RseS5uZXQvdG9uZXItbGl0ZS8ke3p9LyR7eH0vJHt5fS5wbmdcIl1cbi8vICAgICAgICAgICAgICxvcHRpb25zXG4vLyAgICAgICAgICAgICApO1xuLy8gICAgICAgICBzdGFtZW5Ub25lci5tYXhFeHRlbnQgPSBtYXhFeHRlbnQ7XG4vLyAgICAgICAgIHZhciBzdGFtZW5Ub25lckNmZyA9IHtcbi8vICAgICAgICAgICBcIm5hbWVcIjpcIm9zbS10b25lclwiXG4vLyAgICAgICAgICAgICAsXCJ0aXRsZVwiOlwiT1NNIFN0YW1lbiBUb25lclwiXG4vLyAgICAgICAgICAgICAsXCJ0eXBlXCI6XCJiYXNlbGF5ZXJcIlxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICBldnQuY29uZmlnLmxheWVyc1snb3NtLXRvbmVyJ10gPSBzdGFtZW5Ub25lckNmZztcbi8vICAgICAgICAgZXZ0LmJhc2VsYXllcnMucHVzaChzdGFtZW5Ub25lcik7XG4vLyAgICAgICB9XG5cbi8vICAgICAgIGlmICgoJ29zbUN5Y2xlbWFwJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5vc21DeWNsZW1hcCA9PSAnVHJ1ZScgJiYgKCdPQ01LZXknIGluIGV2dC5jb25maWcub3B0aW9ucykpIHtcbi8vICAgICAgICAgZXZ0Lm1hcC5hbGxPdmVybGF5cyA9IGZhbHNlO1xuLy8gICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbi8vICAgICAgICAgICB6b29tT2Zmc2V0OiAwLFxuLy8gICAgICAgICAgIG1heFJlc29sdXRpb246MTU2NTQzLjAzMzkwNjI1LFxuLy8gICAgICAgICAgIG51bVpvb21MZXZlbHM6MTlcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQgIT0gMCkge1xuLy8gICAgICAgICAgIG9wdGlvbnMuem9vbU9mZnNldCA9IGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgb3B0aW9ucy5tYXhSZXNvbHV0aW9uID0gbE9wdGlvbnMubWF4UmVzb2x1dGlvbjtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCtsT3B0aW9ucy5udW1ab29tTGV2ZWxzIDw9IG9wdGlvbnMubnVtWm9vbUxldmVscylcbi8vICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBsT3B0aW9ucy5udW1ab29tTGV2ZWxzO1xuLy8gICAgICAgICBlbHNlXG4vLyAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gb3B0aW9ucy5udW1ab29tTGV2ZWxzIC0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgdmFyIGN5Y2xlbWFwID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuT1NNKCdvc20tY3ljbGVtYXAnLCdodHRwczovL3RpbGUudGh1bmRlcmZvcmVzdC5jb20vY3ljbGUvJHt6fS8ke3h9LyR7eX0ucG5nP2FwaUtleT0nK2V2dC5jb25maWcub3B0aW9ucy5PQ01LZXksb3B0aW9ucyk7XG4vLyAgICAgICAgIGN5Y2xlbWFwLm1heEV4dGVudCA9IG1heEV4dGVudDtcbi8vICAgICAgICAgdmFyIGN5Y2xlbWFwQ2ZnID0ge1xuLy8gICAgICAgICAgICAgIFwibmFtZVwiOlwib3NtLWN5Y2xlXCJcbi8vICAgICAgICAgICAgICxcInRpdGxlXCI6XCJPU00gQ3ljbGVNYXBcIlxuLy8gICAgICAgICAgICAgLFwidHlwZVwiOlwiYmFzZWxheWVyXCJcbi8vICAgICAgICAgfTtcbi8vICAgICAgICAgZXZ0LmNvbmZpZy5sYXllcnNbJ29zbS1jeWNsZSddID0gY3ljbGVtYXBDZmc7XG4vLyAgICAgICAgIGV2dC5iYXNlbGF5ZXJzLnB1c2goY3ljbGVtYXApO1xuLy8gICAgICAgfVxuLy8gICAgICAgdHJ5IHtcbi8vICAgICAgICAgaWYgKCgnZ29vZ2xlU2F0ZWxsaXRlJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5nb29nbGVTYXRlbGxpdGUgPT0gJ1RydWUnKSB7XG4vLyAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4vLyAgICAgICAgICAgICB6b29tT2Zmc2V0OiAwLFxuLy8gICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjUsXG4vLyAgICAgICAgICAgICBudW1ab29tTGV2ZWxzOjIxXG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCAhPSAwKSB7XG4vLyAgICAgICAgICAgICBvcHRpb25zLnpvb21PZmZzZXQgPSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgICAgb3B0aW9ucy5tYXhSZXNvbHV0aW9uID0gbE9wdGlvbnMubWF4UmVzb2x1dGlvbjtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQrbE9wdGlvbnMubnVtWm9vbUxldmVscyA8PSBvcHRpb25zLm51bVpvb21MZXZlbHMpXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBsT3B0aW9ucy5udW1ab29tTGV2ZWxzO1xuLy8gICAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IG9wdGlvbnMubnVtWm9vbUxldmVscyAtIGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgdmFyIGdzYXQgPSBuZXcgT3BlbkxheWVycy5MYXllci5Hb29nbGUoXG4vLyAgICAgICAgICAgICAgIFwiZ3NhdFwiLFxuLy8gICAgICAgICAgICAgICB7dHlwZTogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlNBVEVMTElURVxuLy8gICAgICAgICAgICAgICAgICwgbnVtWm9vbUxldmVsczogb3B0aW9ucy5udW1ab29tTGV2ZWxzLCBtYXhSZXNvbHV0aW9uOiBvcHRpb25zLm1heFJlc29sdXRpb24sIG1pblpvb21MZXZlbDpvcHRpb25zLnpvb21PZmZzZXR9XG4vLyAgICAgICAgICAgICAgICk7XG4vLyAgICAgICAgICAgZ3NhdC5tYXhFeHRlbnQgPSBtYXhFeHRlbnQ7XG4vLyAgICAgICAgICAgdmFyIGdzYXRDZmcgPSB7XG4vLyAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImdzYXRcIlxuLy8gICAgICAgICAgICAgICAsXCJ0aXRsZVwiOlwiR29vZ2xlIFNhdGVsbGl0ZVwiXG4vLyAgICAgICAgICAgICAsXCJ0eXBlXCI6XCJiYXNlbGF5ZXJcIlxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgZXZ0LmNvbmZpZy5sYXllcnNbJ2dzYXQnXSA9IGdzYXRDZmc7XG4vLyAgICAgICAgICAgZXZ0LmJhc2VsYXllcnMucHVzaChnc2F0KTtcbi8vICAgICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgICAgZXZ0Lm1hcC56b29tRHVyYXRpb24gPSAwO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmICgoJ2dvb2dsZUh5YnJpZCcgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSAmJiBldnQuY29uZmlnLm9wdGlvbnMuZ29vZ2xlSHlicmlkID09ICdUcnVlJykge1xuLy8gICAgICAgICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICAgICAgem9vbU9mZnNldDogMCxcbi8vICAgICAgICAgICAgIG1heFJlc29sdXRpb246MTU2NTQzLjAzMzkwNjI1LFxuLy8gICAgICAgICAgICAgbnVtWm9vbUxldmVsczoyMFxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQgIT0gMCkge1xuLy8gICAgICAgICAgICAgb3B0aW9ucy56b29tT2Zmc2V0ID0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICAgIG9wdGlvbnMubWF4UmVzb2x1dGlvbiA9IGxPcHRpb25zLm1heFJlc29sdXRpb247XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0K2xPcHRpb25zLm51bVpvb21MZXZlbHMgPD0gb3B0aW9ucy5udW1ab29tTGV2ZWxzKVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gbE9wdGlvbnMubnVtWm9vbUxldmVscztcbi8vICAgICAgICAgICBlbHNlXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBvcHRpb25zLm51bVpvb21MZXZlbHMgLSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgIHZhciBnaHliID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuR29vZ2xlKFxuLy8gICAgICAgICAgICAgICBcImdoeWJcIixcbi8vICAgICAgICAgICAgICAge3R5cGU6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5IWUJSSURcbi8vICAgICAgICAgICAgICAgICAsIG51bVpvb21MZXZlbHM6IG9wdGlvbnMubnVtWm9vbUxldmVscywgbWF4UmVzb2x1dGlvbjogb3B0aW9ucy5tYXhSZXNvbHV0aW9uLCBtaW5ab29tTGV2ZWw6b3B0aW9ucy56b29tT2Zmc2V0fVxuLy8gICAgICAgICAgICAgICApO1xuLy8gICAgICAgICAgIGdoeWIubWF4RXh0ZW50ID0gbWF4RXh0ZW50O1xuLy8gICAgICAgICAgIHZhciBnaHliQ2ZnID0ge1xuLy8gICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJnaHliXCJcbi8vICAgICAgICAgICAgICAgLFwidGl0bGVcIjpcIkdvb2dsZSBIeWJyaWRcIlxuLy8gICAgICAgICAgICAgLFwidHlwZVwiOlwiYmFzZWxheWVyXCJcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICAgIGV2dC5jb25maWcubGF5ZXJzWydnaHliJ10gPSBnaHliQ2ZnO1xuLy8gICAgICAgICAgIGV2dC5iYXNlbGF5ZXJzLnB1c2goZ2h5Yik7XG4vLyAgICAgICAgICAgZXZ0Lm1hcC5hbGxPdmVybGF5cyA9IGZhbHNlO1xuLy8gICAgICAgICAgIGV2dC5tYXAuem9vbUR1cmF0aW9uID0gMDtcbi8vICAgICAgICAgfVxuLy8gICAgICAgICBpZiAoKCdnb29nbGVUZXJyYWluJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5nb29nbGVUZXJyYWluID09ICdUcnVlJykge1xuLy8gICAgICAgICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICAgICAgem9vbU9mZnNldDogMCxcbi8vICAgICAgICAgICAgIG1heFJlc29sdXRpb246MTU2NTQzLjAzMzkwNjI1LFxuLy8gICAgICAgICAgICAgbnVtWm9vbUxldmVsczoxNlxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQgIT0gMCkge1xuLy8gICAgICAgICAgICAgb3B0aW9ucy56b29tT2Zmc2V0ID0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICAgIG9wdGlvbnMubWF4UmVzb2x1dGlvbiA9IGxPcHRpb25zLm1heFJlc29sdXRpb247XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0K2xPcHRpb25zLm51bVpvb21MZXZlbHMgPD0gb3B0aW9ucy5udW1ab29tTGV2ZWxzKVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gbE9wdGlvbnMubnVtWm9vbUxldmVscztcbi8vICAgICAgICAgICBlbHNlXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBvcHRpb25zLm51bVpvb21MZXZlbHMgLSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgIHZhciBncGh5ID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuR29vZ2xlKFxuLy8gICAgICAgICAgICAgICBcImdwaHlcIixcbi8vICAgICAgICAgICAgICAge3R5cGU6IGdvb2dsZS5tYXBzLk1hcFR5cGVJZC5URVJSQUlOXG4vLyAgICAgICAgICAgICAgICwgbnVtWm9vbUxldmVsczogb3B0aW9ucy5udW1ab29tTGV2ZWxzLCBtYXhSZXNvbHV0aW9uOiBvcHRpb25zLm1heFJlc29sdXRpb24sIG1pblpvb21MZXZlbDpvcHRpb25zLnpvb21PZmZzZXR9XG4vLyAgICAgICAgICAgICAgICk7XG4vLyAgICAgICAgICAgZ3BoeS5tYXhFeHRlbnQgPSBtYXhFeHRlbnQ7XG4vLyAgICAgICAgICAgdmFyIGdwaHlDZmcgPSB7XG4vLyAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImdwaHlcIlxuLy8gICAgICAgICAgICAgICAsXCJ0aXRsZVwiOlwiR29vZ2xlIFRlcnJhaW5cIlxuLy8gICAgICAgICAgICAgLFwidHlwZVwiOlwiYmFzZWxheWVyXCJcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICAgIGV2dC5jb25maWcubGF5ZXJzWydncGh5J10gPSBncGh5Q2ZnO1xuLy8gICAgICAgICAgIGV2dC5iYXNlbGF5ZXJzLnB1c2goZ3BoeSk7XG4vLyAgICAgICAgICAgZXZ0Lm1hcC5hbGxPdmVybGF5cyA9IGZhbHNlO1xuLy8gICAgICAgICAgIGV2dC5tYXAuem9vbUR1cmF0aW9uID0gMDtcbi8vICAgICAgICB9XG4vLyAgICAgICAgaWYgKCgnZ29vZ2xlU3RyZWV0cycgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSAmJiBldnQuY29uZmlnLm9wdGlvbnMuZ29vZ2xlU3RyZWV0cyA9PSAnVHJ1ZScpIHtcbi8vICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbi8vICAgICAgICAgICAgIHpvb21PZmZzZXQ6IDAsXG4vLyAgICAgICAgICAgICBtYXhSZXNvbHV0aW9uOjE1NjU0My4wMzM5MDYyNSxcbi8vICAgICAgICAgICAgIG51bVpvb21MZXZlbHM6MjBcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0ICE9IDApIHtcbi8vICAgICAgICAgICAgIG9wdGlvbnMuem9vbU9mZnNldCA9IGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgICBvcHRpb25zLm1heFJlc29sdXRpb24gPSBsT3B0aW9ucy5tYXhSZXNvbHV0aW9uO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCtsT3B0aW9ucy5udW1ab29tTGV2ZWxzIDw9IG9wdGlvbnMubnVtWm9vbUxldmVscylcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IGxPcHRpb25zLm51bVpvb21MZXZlbHM7XG4vLyAgICAgICAgICAgZWxzZVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gb3B0aW9ucy5udW1ab29tTGV2ZWxzIC0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgIHZhciBnbWFwID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuR29vZ2xlKFxuLy8gICAgICAgICAgICAgIFwiZ21hcFwiLCAvLyB0aGUgZGVmYXVsdFxuLy8gICAgICAgICAgICAgIHtudW1ab29tTGV2ZWxzOiBvcHRpb25zLm51bVpvb21MZXZlbHMsIG1heFJlc29sdXRpb246IG9wdGlvbnMubWF4UmVzb2x1dGlvbiwgbWluWm9vbUxldmVsOm9wdGlvbnMuem9vbU9mZnNldH1cbi8vICAgICAgICAgICAgICApO1xuLy8gICAgICAgICAgZ21hcC5tYXhFeHRlbnQgPSBtYXhFeHRlbnQ7XG4vLyAgICAgICAgICB2YXIgZ21hcENmZyA9IHtcbi8vICAgICAgICAgICAgICAgXCJuYW1lXCI6XCJnbWFwXCJcbi8vICAgICAgICAgICAgICAsXCJ0aXRsZVwiOlwiR29vZ2xlIFN0cmVldHNcIlxuLy8gICAgICAgICAgICAgICxcInR5cGVcIjpcImJhc2VsYXllclwiXG4vLyAgICAgICAgICB9O1xuLy8gICAgICAgICAgZXZ0LmNvbmZpZy5sYXllcnNbJ2dtYXAnXSA9IGdtYXBDZmc7XG4vLyAgICAgICAgICBldnQuYmFzZWxheWVycy5wdXNoKGdtYXApO1xuLy8gICAgICAgICAgZXZ0Lm1hcC5hbGxPdmVybGF5cyA9IGZhbHNlO1xuLy8gICAgICAgICAgZXZ0Lm1hcC56b29tRHVyYXRpb24gPSAwO1xuLy8gICAgICAgIH1cbi8vICAgICAgICBpZiAoKCdiaW5nU3RyZWV0cycgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSAmJiBldnQuY29uZmlnLm9wdGlvbnMuYmluZ1N0cmVldHMgPT0gJ1RydWUnICYmICgnYmluZ0tleScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSkgIHtcbi8vICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbi8vICAgICAgICAgICAgIHpvb21PZmZzZXQ6IDAsXG4vLyAgICAgICAgICAgICBtYXhSZXNvbHV0aW9uOjE1NjU0My4wMzM5MDYyNSxcbi8vICAgICAgICAgICAgIG51bVpvb21MZXZlbHM6MTlcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0ICE9IDApIHtcbi8vICAgICAgICAgICAgIG9wdGlvbnMuem9vbU9mZnNldCA9IGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgICBvcHRpb25zLm1heFJlc29sdXRpb24gPSBsT3B0aW9ucy5tYXhSZXNvbHV0aW9uO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCtsT3B0aW9ucy5udW1ab29tTGV2ZWxzIDw9IG9wdGlvbnMubnVtWm9vbUxldmVscylcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IGxPcHRpb25zLm51bVpvb21MZXZlbHM7XG4vLyAgICAgICAgICAgZWxzZVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gb3B0aW9ucy5udW1ab29tTGV2ZWxzIC0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICB2YXIgYm1hcCA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLkJpbmcoe1xuLy8gICAgICAgICAgICAgIGtleTogZXZ0LmNvbmZpZy5vcHRpb25zLmJpbmdLZXksXG4vLyAgICAgICAgICAgICAgdHlwZTogXCJSb2FkXCIsXG4vLyAgICAgICAgICAgICAgbmFtZTogXCJCaW5nIFJvYWRcIiwgLy8gdGhlIGRlZmF1bHRcbi8vICAgICAgICAgICAgICBudW1ab29tTGV2ZWxzOiBvcHRpb25zLm51bVpvb21MZXZlbHMsIG1heFJlc29sdXRpb246IG9wdGlvbnMubWF4UmVzb2x1dGlvbiwgbWluWm9vbUxldmVsOm9wdGlvbnMuem9vbU9mZnNldFxuLy8gICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgIGJtYXAubWF4RXh0ZW50ID0gbWF4RXh0ZW50O1xuLy8gICAgICAgICAgIHZhciBibWFwQ2ZnID0ge1xuLy8gICAgICAgICAgICAgIFwibmFtZVwiOlwiYm1hcFwiXG4vLyAgICAgICAgICAgICAsXCJ0aXRsZVwiOlwiQmluZyBSb2FkXCJcbi8vICAgICAgICAgICAgICxcInR5cGVcIjpcImJhc2VsYXllclwiXG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBldnQuY29uZmlnLmxheWVyc1snYm1hcCddID0gYm1hcENmZztcbi8vICAgICAgICAgICBldnQuYmFzZWxheWVycy5wdXNoKGJtYXApO1xuLy8gICAgICAgICAgIGV2dC5tYXAuYWxsT3ZlcmxheXMgPSBmYWxzZTtcbi8vICAgICAgICB9XG4vLyAgICAgICAgaWYgKCgnYmluZ1NhdGVsbGl0ZScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSAmJiBldnQuY29uZmlnLm9wdGlvbnMuYmluZ1NhdGVsbGl0ZSA9PSAnVHJ1ZScgJiYgKCdiaW5nS2V5JyBpbiBldnQuY29uZmlnLm9wdGlvbnMpKSAge1xuLy8gICAgICAgICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICAgICAgem9vbU9mZnNldDogMCxcbi8vICAgICAgICAgICAgIG1heFJlc29sdXRpb246MTU2NTQzLjAzMzkwNjI1LFxuLy8gICAgICAgICAgICAgbnVtWm9vbUxldmVsczoxOVxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQgIT0gMCkge1xuLy8gICAgICAgICAgICAgb3B0aW9ucy56b29tT2Zmc2V0ID0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICAgIG9wdGlvbnMubWF4UmVzb2x1dGlvbiA9IGxPcHRpb25zLm1heFJlc29sdXRpb247XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0K2xPcHRpb25zLm51bVpvb21MZXZlbHMgPD0gb3B0aW9ucy5udW1ab29tTGV2ZWxzKVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gbE9wdGlvbnMubnVtWm9vbUxldmVscztcbi8vICAgICAgICAgICBlbHNlXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBvcHRpb25zLm51bVpvb21MZXZlbHMgLSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgIHZhciBiYWVyaWFsID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuQmluZyh7XG4vLyAgICAgICAgICAgICAga2V5OiBldnQuY29uZmlnLm9wdGlvbnMuYmluZ0tleSxcbi8vICAgICAgICAgICAgICB0eXBlOiBcIkFlcmlhbFwiLFxuLy8gICAgICAgICAgICAgIG5hbWU6IFwiQmluZyBBZXJpYWxcIiwgLy8gdGhlIGRlZmF1bHRcbi8vICAgICAgICAgICAgICBudW1ab29tTGV2ZWxzOiBvcHRpb25zLm51bVpvb21MZXZlbHMsIG1heFJlc29sdXRpb246IG9wdGlvbnMubWF4UmVzb2x1dGlvbiwgbWluWm9vbUxldmVsOm9wdGlvbnMuem9vbU9mZnNldFxuLy8gICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgIGJhZXJpYWwubWF4RXh0ZW50ID0gbWF4RXh0ZW50O1xuLy8gICAgICAgICAgIHZhciBiYWVyaWFsQ2ZnID0ge1xuLy8gICAgICAgICAgICAgIFwibmFtZVwiOlwiYmFlcmlhbFwiXG4vLyAgICAgICAgICAgICAsXCJ0aXRsZVwiOlwiQmluZyBBZXJpYWxcIlxuLy8gICAgICAgICAgICAgLFwidHlwZVwiOlwiYmFzZWxheWVyXCJcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICAgIGV2dC5jb25maWcubGF5ZXJzWydiYWVyaWFsJ10gPSBiYWVyaWFsQ2ZnO1xuLy8gICAgICAgICAgIGV2dC5iYXNlbGF5ZXJzLnB1c2goYmFlcmlhbCk7XG4vLyAgICAgICAgICAgZXZ0Lm1hcC5hbGxPdmVybGF5cyA9IGZhbHNlO1xuLy8gICAgICAgIH1cbi8vICAgICAgICBpZiAoKCdiaW5nSHlicmlkJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5iaW5nSHlicmlkID09ICdUcnVlJyAmJiAoJ2JpbmdLZXknIGluIGV2dC5jb25maWcub3B0aW9ucykpICB7XG4vLyAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4vLyAgICAgICAgICAgICB6b29tT2Zmc2V0OiAwLFxuLy8gICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjUsXG4vLyAgICAgICAgICAgICBudW1ab29tTGV2ZWxzOjE5XG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCAhPSAwKSB7XG4vLyAgICAgICAgICAgICBvcHRpb25zLnpvb21PZmZzZXQgPSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgICAgb3B0aW9ucy5tYXhSZXNvbHV0aW9uID0gbE9wdGlvbnMubWF4UmVzb2x1dGlvbjtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQrbE9wdGlvbnMubnVtWm9vbUxldmVscyA8PSBvcHRpb25zLm51bVpvb21MZXZlbHMpXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBsT3B0aW9ucy5udW1ab29tTGV2ZWxzO1xuLy8gICAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IG9wdGlvbnMubnVtWm9vbUxldmVscyAtIGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgdmFyIGJoeWJyaWQgPSBuZXcgT3BlbkxheWVycy5MYXllci5CaW5nKHtcbi8vICAgICAgICAgICAgICBrZXk6IGV2dC5jb25maWcub3B0aW9ucy5iaW5nS2V5LFxuLy8gICAgICAgICAgICAgIHR5cGU6IFwiQWVyaWFsV2l0aExhYmVsc1wiLFxuLy8gICAgICAgICAgICAgIG5hbWU6IFwiQmluZyBIeWJyaWRcIiwgLy8gdGhlIGRlZmF1bHRcbi8vICAgICAgICAgICAgICBudW1ab29tTGV2ZWxzOiBvcHRpb25zLm51bVpvb21MZXZlbHMsIG1heFJlc29sdXRpb246IG9wdGlvbnMubWF4UmVzb2x1dGlvbiwgbWluWm9vbUxldmVsOm9wdGlvbnMuem9vbU9mZnNldFxuLy8gICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgIGJoeWJyaWQubWF4RXh0ZW50ID0gbWF4RXh0ZW50O1xuLy8gICAgICAgICAgIHZhciBiaHlicmlkQ2ZnID0ge1xuLy8gICAgICAgICAgICAgIFwibmFtZVwiOlwiYmh5YnJpZFwiXG4vLyAgICAgICAgICAgICAsXCJ0aXRsZVwiOlwiQmluZyBIeWJyaWRcIlxuLy8gICAgICAgICAgICAgLFwidHlwZVwiOlwiYmFzZWxheWVyXCJcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICAgIGV2dC5jb25maWcubGF5ZXJzWydiaHlicmlkJ10gPSBiaHlicmlkQ2ZnO1xuLy8gICAgICAgICAgIGV2dC5iYXNlbGF5ZXJzLnB1c2goYmh5YnJpZCk7XG4vLyAgICAgICAgICAgZXZ0Lm1hcC5hbGxPdmVybGF5cyA9IGZhbHNlO1xuLy8gICAgICAgIH1cbi8vICAgICAgICBpZiAoKCdpZ25UZXJyYWluJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5pZ25UZXJyYWluID09ICdUcnVlJyAmJiAoJ2lnbktleScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSkge1xuLy8gICAgICAgICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICAgICAgem9vbU9mZnNldDogMCxcbi8vICAgICAgICAgICAgIG1heFJlc29sdXRpb246MTU2NTQzLjAzMzkwNjI1LFxuLy8gICAgICAgICAgICAgbnVtWm9vbUxldmVsczoxOFxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQgIT0gMCkge1xuLy8gICAgICAgICAgICAgb3B0aW9ucy56b29tT2Zmc2V0ID0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICAgIG9wdGlvbnMubWF4UmVzb2x1dGlvbiA9IGxPcHRpb25zLm1heFJlc29sdXRpb247XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0K2xPcHRpb25zLm51bVpvb21MZXZlbHMgPD0gb3B0aW9ucy5udW1ab29tTGV2ZWxzKVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gbE9wdGlvbnMubnVtWm9vbUxldmVscztcbi8vICAgICAgICAgICBlbHNlXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBvcHRpb25zLm51bVpvb21MZXZlbHMgLSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgIHZhciBpZ25tYXAgPSBuZXcgT3BlbkxheWVycy5MYXllci5XTVRTKHtcbi8vICAgICAgICAgICAgIG5hbWU6IFwiaWdubWFwXCIsXG4vLyAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly93eHMuaWduLmZyL1wiK2V2dC5jb25maWcub3B0aW9ucy5pZ25LZXkrXCIvd210c1wiLFxuLy8gICAgICAgICAgICAgbGF5ZXI6IFwiR0VPR1JBUEhJQ0FMR1JJRFNZU1RFTVMuTUFQU1wiLFxuLy8gICAgICAgICAgICAgbWF0cml4U2V0OiBcIlBNXCIsXG4vLyAgICAgICAgICAgICBzdHlsZTogXCJub3JtYWxcIixcbi8vICAgICAgICAgICAgIHByb2plY3Rpb246IG5ldyBPcGVuTGF5ZXJzLlByb2plY3Rpb24oXCJFUFNHOjM4NTdcIiksXG4vLyAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ZvbmQmbmJzcDs6ICZjb3B5O0lHTiA8YSBocmVmPVwiaHR0cDovL3d3dy5nZW9wb3J0YWlsLmZyL1wiIHRhcmdldD1cIl9ibGFua1wiPjxpbWcgc3JjPVwiaHR0cHM6Ly9hcGkuaWduLmZyL2dlb3BvcnRhaWwvYXBpL2pzLzIuMC4wYmV0YS90aGVtZS9nZW9wb3J0YWwvaW1nL2xvZ29fZ3AuZ2lmXCI+PC9hPiA8YSBocmVmPVwiaHR0cDovL3d3dy5nZW9wb3J0YWlsLmdvdXYuZnIvZGVwb3QvYXBpL2NndS9saWNBUElfQ0dVRi5wZGZcIiBhbHQ9XCJUT1NcIiB0aXRsZT1cIlRPU1wiIHRhcmdldD1cIl9ibGFua1wiPkNvbmRpdGlvbnMgZFxcJ3V0aWxpc2F0aW9uPC9hPidcbi8vICAgICAgICAgICAgICwgbnVtWm9vbUxldmVsczogb3B0aW9ucy5udW1ab29tTGV2ZWxzLCBtYXhSZXNvbHV0aW9uOiBvcHRpb25zLm1heFJlc29sdXRpb24sIG1pblpvb21MZXZlbDpvcHRpb25zLnpvb21PZmZzZXRcbi8vICAgICAgICAgICAgICx6b29tT2Zmc2V0OiBvcHRpb25zLnpvb21PZmZzZXRcblxuLy8gICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgIGlnbm1hcC5tYXhFeHRlbnQgPSBtYXhFeHRlbnQ7XG4vLyAgICAgICAgICAgdmFyIGlnbm1hcENmZyA9IHtcbi8vICAgICAgICAgICAgICBcIm5hbWVcIjpcImlnbm1hcFwiXG4vLyAgICAgICAgICAgICAsXCJ0aXRsZVwiOlwiSUdOIFNjYW5cIlxuLy8gICAgICAgICAgICAgLFwidHlwZVwiOlwiYmFzZWxheWVyXCJcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICAgIGV2dC5jb25maWcubGF5ZXJzWydpZ25tYXAnXSA9IGlnbm1hcENmZztcbi8vICAgICAgICAgICBldnQuYmFzZWxheWVycy5wdXNoKGlnbm1hcCk7XG4vLyAgICAgICAgICAgZXZ0Lm1hcC5hbGxPdmVybGF5cyA9IGZhbHNlO1xuLy8gICAgICAgIH1cbi8vICAgICAgICBpZiAoKCdpZ25TdHJlZXRzJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5pZ25TdHJlZXRzID09ICdUcnVlJyAmJiAoJ2lnbktleScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSkge1xuLy8gICAgICAgICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICAgICAgem9vbU9mZnNldDogMCxcbi8vICAgICAgICAgICAgIG1heFJlc29sdXRpb246MTU2NTQzLjAzMzkwNjI1LFxuLy8gICAgICAgICAgICAgbnVtWm9vbUxldmVsczoxOFxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQgIT0gMCkge1xuLy8gICAgICAgICAgICAgb3B0aW9ucy56b29tT2Zmc2V0ID0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICAgIG9wdGlvbnMubWF4UmVzb2x1dGlvbiA9IGxPcHRpb25zLm1heFJlc29sdXRpb247XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0K2xPcHRpb25zLm51bVpvb21MZXZlbHMgPD0gb3B0aW9ucy5udW1ab29tTGV2ZWxzKVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gbE9wdGlvbnMubnVtWm9vbUxldmVscztcbi8vICAgICAgICAgICBlbHNlXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBvcHRpb25zLm51bVpvb21MZXZlbHMgLSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgIHZhciBpZ25wbGFuID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuV01UUyh7XG4vLyAgICAgICAgICAgICBuYW1lOiBcImlnbnBsYW5cIixcbi8vICAgICAgICAgICAgIHVybDogXCJodHRwczovL3d4cy5pZ24uZnIvXCIrZXZ0LmNvbmZpZy5vcHRpb25zLmlnbktleStcIi93bXRzXCIsXG4vLyAgICAgICAgICAgICBsYXllcjogXCJHRU9HUkFQSElDQUxHUklEU1lTVEVNUy5QTEFOSUdOXCIsXG4vLyAgICAgICAgICAgICBtYXRyaXhTZXQ6IFwiUE1cIixcbi8vICAgICAgICAgICAgIHN0eWxlOiBcIm5vcm1hbFwiLFxuLy8gICAgICAgICAgICAgcHJvamVjdGlvbjogbmV3IE9wZW5MYXllcnMuUHJvamVjdGlvbihcIkVQU0c6Mzg1N1wiKSxcbi8vICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnRm9uZCZuYnNwOzogJmNvcHk7SUdOIDxhIGhyZWY9XCJodHRwOi8vd3d3Lmdlb3BvcnRhaWwuZnIvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGltZyBzcmM9XCJodHRwczovL2FwaS5pZ24uZnIvZ2VvcG9ydGFpbC9hcGkvanMvMi4wLjBiZXRhL3RoZW1lL2dlb3BvcnRhbC9pbWcvbG9nb19ncC5naWZcIj48L2E+IDxhIGhyZWY9XCJodHRwOi8vd3d3Lmdlb3BvcnRhaWwuZ291di5mci9kZXBvdC9hcGkvY2d1L2xpY0FQSV9DR1VGLnBkZlwiIGFsdD1cIlRPU1wiIHRpdGxlPVwiVE9TXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q29uZGl0aW9ucyBkXFwndXRpbGlzYXRpb248L2E+J1xuLy8gICAgICAgICAgICAgLCBudW1ab29tTGV2ZWxzOiBvcHRpb25zLm51bVpvb21MZXZlbHMsIG1heFJlc29sdXRpb246IG9wdGlvbnMubWF4UmVzb2x1dGlvbiwgbWluWm9vbUxldmVsOm9wdGlvbnMuem9vbU9mZnNldFxuLy8gICAgICAgICAgICAgLHpvb21PZmZzZXQ6IG9wdGlvbnMuem9vbU9mZnNldFxuXG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgaWducGxhbi5tYXhFeHRlbnQgPSBtYXhFeHRlbnQ7XG4vLyAgICAgICAgICAgdmFyIGlnbnBsYW5DZmcgPSB7XG4vLyAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZ25wbGFuXCJcbi8vICAgICAgICAgICAgICxcInRpdGxlXCI6XCJJR04gUGxhblwiXG4vLyAgICAgICAgICAgICAsXCJ0eXBlXCI6XCJiYXNlbGF5ZXJcIlxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgZXZ0LmNvbmZpZy5sYXllcnNbJ2lnbnBsYW4nXSA9IGlnbnBsYW5DZmc7XG4vLyAgICAgICAgICAgZXZ0LmJhc2VsYXllcnMucHVzaChpZ25wbGFuKTtcbi8vICAgICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgfVxuLy8gICAgICAgIGlmICgoJ2lnblNhdGVsbGl0ZScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSAmJiBldnQuY29uZmlnLm9wdGlvbnMuaWduU2F0ZWxsaXRlID09ICdUcnVlJyAmJiAoJ2lnbktleScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSkge1xuLy8gICAgICAgICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICAgICAgem9vbU9mZnNldDogMCxcbi8vICAgICAgICAgICAgIG1heFJlc29sdXRpb246MTU2NTQzLjAzMzkwNjI1LFxuLy8gICAgICAgICAgICAgbnVtWm9vbUxldmVsczoyMlxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQgIT0gMCkge1xuLy8gICAgICAgICAgICAgb3B0aW9ucy56b29tT2Zmc2V0ID0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICAgIG9wdGlvbnMubWF4UmVzb2x1dGlvbiA9IGxPcHRpb25zLm1heFJlc29sdXRpb247XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0K2xPcHRpb25zLm51bVpvb21MZXZlbHMgPD0gb3B0aW9ucy5udW1ab29tTGV2ZWxzKVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gbE9wdGlvbnMubnVtWm9vbUxldmVscztcbi8vICAgICAgICAgICBlbHNlXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBvcHRpb25zLm51bVpvb21MZXZlbHMgLSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgIHZhciBpZ25waG90byA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLldNVFMoe1xuLy8gICAgICAgICAgICAgbmFtZTogXCJpZ25waG90b1wiLFxuLy8gICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vd3hzLmlnbi5mci9cIitldnQuY29uZmlnLm9wdGlvbnMuaWduS2V5K1wiL3dtdHNcIixcbi8vICAgICAgICAgICAgIGxheWVyOiBcIk9SVEhPSU1BR0VSWS5PUlRIT1BIT1RPU1wiLFxuLy8gICAgICAgICAgICAgbWF0cml4U2V0OiBcIlBNXCIsXG4vLyAgICAgICAgICAgICBzdHlsZTogXCJub3JtYWxcIixcbi8vICAgICAgICAgICAgIHByb2plY3Rpb246IG5ldyBPcGVuTGF5ZXJzLlByb2plY3Rpb24oXCJFUFNHOjM4NTdcIiksXG4vLyAgICAgICAgICAgICBhdHRyaWJ1dGlvbjogJ0ZvbmQmbmJzcDs6ICZjb3B5O0lHTiA8YSBocmVmPVwiaHR0cDovL3d3dy5nZW9wb3J0YWlsLmZyL1wiIHRhcmdldD1cIl9ibGFua1wiPjxpbWcgc3JjPVwiaHR0cHM6Ly9hcGkuaWduLmZyL2dlb3BvcnRhaWwvYXBpL2pzLzIuMC4wYmV0YS90aGVtZS9nZW9wb3J0YWwvaW1nL2xvZ29fZ3AuZ2lmXCI+PC9hPiA8YSBocmVmPVwiaHR0cDovL3d3dy5nZW9wb3J0YWlsLmdvdXYuZnIvZGVwb3QvYXBpL2NndS9saWNBUElfQ0dVRi5wZGZcIiBhbHQ9XCJUT1NcIiB0aXRsZT1cIlRPU1wiIHRhcmdldD1cIl9ibGFua1wiPkNvbmRpdGlvbnMgZFxcJ3V0aWxpc2F0aW9uPC9hPidcbi8vICAgICAgICAgICAgICwgbnVtWm9vbUxldmVsczogb3B0aW9ucy5udW1ab29tTGV2ZWxzLCBtYXhSZXNvbHV0aW9uOiBvcHRpb25zLm1heFJlc29sdXRpb24sIG1pblpvb21MZXZlbDpvcHRpb25zLnpvb21PZmZzZXRcbi8vICAgICAgICAgICAgICx6b29tT2Zmc2V0OiBvcHRpb25zLnpvb21PZmZzZXRcblxuLy8gICAgICAgICAgIH0pO1xuLy8gICAgICAgICAgIGlnbnBob3RvLm1heEV4dGVudCA9IG1heEV4dGVudDtcbi8vICAgICAgICAgICB2YXIgaWducGhvdG9DZmcgPSB7XG4vLyAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZ25waG90b1wiXG4vLyAgICAgICAgICAgICAsXCJ0aXRsZVwiOlwiSUdOIFBob3Rvc1wiXG4vLyAgICAgICAgICAgICAsXCJ0eXBlXCI6XCJiYXNlbGF5ZXJcIlxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgZXZ0LmNvbmZpZy5sYXllcnNbJ2lnbnBob3RvJ10gPSBpZ25waG90b0NmZztcbi8vICAgICAgICAgICBldnQuYmFzZWxheWVycy5wdXNoKGlnbnBob3RvKTtcbi8vICAgICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgfVxuLy8gICAgICAgIGlmICgoJ2lnbkNhZGFzdHJhbCcgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSAmJiBldnQuY29uZmlnLm9wdGlvbnMuaWduQ2FkYXN0cmFsID09ICdUcnVlJyAmJiAoJ2lnbktleScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSkge1xuLy8gICAgICAgICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICAgICAgem9vbU9mZnNldDogMCxcbi8vICAgICAgICAgICAgIG1heFJlc29sdXRpb246MTU2NTQzLjAzMzkwNjI1LFxuLy8gICAgICAgICAgICAgbnVtWm9vbUxldmVsczoyMFxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQgIT0gMCkge1xuLy8gICAgICAgICAgICAgb3B0aW9ucy56b29tT2Zmc2V0ID0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICAgIG9wdGlvbnMubWF4UmVzb2x1dGlvbiA9IGxPcHRpb25zLm1heFJlc29sdXRpb247XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0K2xPcHRpb25zLm51bVpvb21MZXZlbHMgPD0gb3B0aW9ucy5udW1ab29tTGV2ZWxzKVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gbE9wdGlvbnMubnVtWm9vbUxldmVscztcbi8vICAgICAgICAgICBlbHNlXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBvcHRpb25zLm51bVpvb21MZXZlbHMgLSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgIHZhciBpZ25jYWRhc3RyYWwgPSBuZXcgT3BlbkxheWVycy5MYXllci5XTVRTKHtcbi8vICAgICAgICAgICAgIG5hbWU6IFwiaWduY2FkYXN0cmFsXCIsXG4vLyAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly93eHMuaWduLmZyL1wiK2V2dC5jb25maWcub3B0aW9ucy5pZ25LZXkrXCIvd210c1wiLFxuLy8gICAgICAgICAgICAgbGF5ZXI6IFwiQ0FEQVNUUkFMUEFSQ0VMUy5QQVJDRUxTXCIsXG4vLyAgICAgICAgICAgICBtYXRyaXhTZXQ6IFwiUE1cIixcbi8vICAgICAgICAgICAgIHN0eWxlOiBcIm5vcm1hbFwiLFxuLy8gICAgICAgICAgICAgZm9ybWF0OiBcImltYWdlL3BuZ1wiLFxuLy8gICAgICAgICAgICAgcHJvamVjdGlvbjogbmV3IE9wZW5MYXllcnMuUHJvamVjdGlvbihcIkVQU0c6Mzg1N1wiKSxcbi8vICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnRm9uZCZuYnNwOzogJmNvcHk7SUdOIDxhIGhyZWY9XCJodHRwOi8vd3d3Lmdlb3BvcnRhaWwuZnIvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGltZyBzcmM9XCJodHRwczovL2FwaS5pZ24uZnIvZ2VvcG9ydGFpbC9hcGkvanMvMi4wLjBiZXRhL3RoZW1lL2dlb3BvcnRhbC9pbWcvbG9nb19ncC5naWZcIj48L2E+IDxhIGhyZWY9XCJodHRwOi8vd3d3Lmdlb3BvcnRhaWwuZ291di5mci9kZXBvdC9hcGkvY2d1L2xpY0FQSV9DR1VGLnBkZlwiIGFsdD1cIlRPU1wiIHRpdGxlPVwiVE9TXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q29uZGl0aW9ucyBkXFwndXRpbGlzYXRpb248L2E+J1xuLy8gICAgICAgICAgICAgLCBudW1ab29tTGV2ZWxzOiBvcHRpb25zLm51bVpvb21MZXZlbHMsIG1heFJlc29sdXRpb246IG9wdGlvbnMubWF4UmVzb2x1dGlvbiwgbWluWm9vbUxldmVsOm9wdGlvbnMuem9vbU9mZnNldFxuLy8gICAgICAgICAgICAgLHpvb21PZmZzZXQ6IG9wdGlvbnMuem9vbU9mZnNldFxuXG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgaWduY2FkYXN0cmFsLm1heEV4dGVudCA9IG1heEV4dGVudDtcbi8vICAgICAgICAgICB2YXIgaWduY2FkYXN0cmFsQ2ZnID0ge1xuLy8gICAgICAgICAgICAgIFwibmFtZVwiOlwiaWduY2FkYXN0cmFsXCJcbi8vICAgICAgICAgICAgICxcInRpdGxlXCI6XCJJR04gQ2FkYXN0cmVcIlxuLy8gICAgICAgICAgICAgLFwidHlwZVwiOlwiYmFzZWxheWVyXCJcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICAgIGV2dC5jb25maWcubGF5ZXJzWydpZ25jYWRhc3RyYWwnXSA9IGlnbmNhZGFzdHJhbENmZztcbi8vICAgICAgICAgICBldnQuYmFzZWxheWVycy5wdXNoKGlnbmNhZGFzdHJhbCk7XG4vLyAgICAgICAgICAgZXZ0Lm1hcC5hbGxPdmVybGF5cyA9IGZhbHNlO1xuLy8gICAgICAgIH1cbi8vICAgICAgIH0gY2F0Y2goZSkge1xuLy8gICAgICAgICAgLy9wcm9ibGVtcyB3aXRoIGdvb2dsZVxuLy8gICAgICAgICAgdmFyIG15RXJyb3IgPSBlO1xuLy8gICAgICAgIH1cbi8vICAgICAgfVxuXG4vLyAgICAgICBpZignbGl6bWFwRXh0ZXJuYWxCYXNlbGF5ZXJzJyBpbiBldnQuY29uZmlnKXtcblxuLy8gICAgICAgICB2YXIgZXh0ZXJuYWxTZXJ2aWNlID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChsaXpVcmxzLndtc1xuLy8gICAgICAgICAgICxPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVyU3RyaW5nKGxpelVybHMucGFyYW1zKVxuLy8gICAgICAgICApO1xuLy8gICAgICAgICBpZiAobGl6VXJscy5wdWJsaWNVcmxMaXN0ICYmIGxpelVybHMucHVibGljVXJsTGlzdC5sZW5ndGggPiAxICkge1xuLy8gICAgICAgICAgICAgZXh0ZXJuYWxTZXJ2aWNlID0gW107XG4vLyAgICAgICAgICAgICBmb3IgKHZhciBqPTAsIGpsZW49bGl6VXJscy5wdWJsaWNVcmxMaXN0Lmxlbmd0aDsgajxqbGVuOyBqKyspIHtcbi8vICAgICAgICAgICAgICAgZXh0ZXJuYWxTZXJ2aWNlLnB1c2goXG4vLyAgICAgICAgICAgICAgICAgT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChcbi8vICAgICAgICAgICAgICAgICAgIGxpelVybHMucHVibGljVXJsTGlzdFtqXSxcbi8vICAgICAgICAgICAgICAgICAgIE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4vLyAgICAgICAgICAgICAgICAgKVxuLy8gICAgICAgICAgICAgICApO1xuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgICAgLy8gQWRkIGxpem1hcCBleHRlcm5hbCBiYXNlbGF5ZXJzXG4vLyAgICAgICAgIGZvciAoaWQgaW4gZXZ0LmNvbmZpZ1snbGl6bWFwRXh0ZXJuYWxCYXNlbGF5ZXJzJ10pIHtcblxuLy8gICAgICAgICAgIHZhciBsYXllckNvbmZpZyA9IGV2dC5jb25maWdbJ2xpem1hcEV4dGVybmFsQmFzZWxheWVycyddW2lkXTtcblxuLy8gICAgICAgICAgIGlmICghKCdyZXBvc2l0b3J5JyBpbiBsYXllckNvbmZpZykgfHwgISgncHJvamVjdCcgaW4gbGF5ZXJDb25maWcpKVxuLy8gICAgICAgICAgICAgY29udGludWU7XG5cbi8vICAgICAgICAgICB2YXIgbGF5ZXJOYW1lID0gZXZ0LmNsZWFuTmFtZShsYXllckNvbmZpZy5sYXllck5hbWUpO1xuXG4vLyAgICAgICAgICAgdmFyIGxheWVyV21zUGFyYW1zID0ge1xuLy8gICAgICAgICAgICAgbGF5ZXJzOmxheWVyQ29uZmlnLmxheWVyTmFtZVxuLy8gICAgICAgICAgICAgLHZlcnNpb246JzEuMy4wJ1xuLy8gICAgICAgICAgICAgLGV4Y2VwdGlvbnM6J2FwcGxpY2F0aW9uL3ZuZC5vZ2Muc2VfaW5pbWFnZSdcbi8vICAgICAgICAgICAgICxmb3JtYXQ6KGxheWVyQ29uZmlnLmxheWVySW1hZ2VGb3JtYXQpID8gJ2ltYWdlLycrbGF5ZXJDb25maWcubGF5ZXJJbWFnZUZvcm1hdCA6ICdpbWFnZS9wbmcnXG4vLyAgICAgICAgICAgICAsZHBpOjk2XG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBpZiAobGF5ZXJXbXNQYXJhbXMuZm9ybWF0ICE9ICdpbWFnZS9qcGVnJylcbi8vICAgICAgICAgICAgIGxheWVyV21zUGFyYW1zWyd0cmFuc3BhcmVudCddID0gdHJ1ZTtcblxuLy8gICAgICAgICAgIC8vIENoYW5nZSByZXBvc2l0b3J5IGFuZCBwcm9qZWN0IGluIHNlcnZpY2UgVVJMXG4vLyAgICAgICAgICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoJ3JlcG9zaXRvcnlcXD0oLispJnByb2plY3RcXD0oLispJywgJ2cnKTtcbi8vICAgICAgICAgICBpZiAoISAoZXh0ZXJuYWxTZXJ2aWNlIGluc3RhbmNlb2YgQXJyYXkpIClcbi8vICAgICAgICAgICAgIHZhciB1cmwgPSBleHRlcm5hbFNlcnZpY2UucmVwbGFjZShyZWcsICdyZXBvc2l0b3J5PScrbGF5ZXJDb25maWcucmVwb3NpdG9yeSsnJnByb2plY3Q9JytsYXllckNvbmZpZy5wcm9qZWN0KTtcbi8vICAgICAgICAgICBlbHNlXG4vLyAgICAgICAgICAgICB2YXIgdXJsID0galF1ZXJ5Lm1hcChleHRlcm5hbFNlcnZpY2UsIGZ1bmN0aW9uKGVsZW1lbnQpIHsgcmV0dXJuIGVsZW1lbnQucmVwbGFjZShyZWcsICdyZXBvc2l0b3J5PScrbGF5ZXJDb25maWcucmVwb3NpdG9yeSsnJnByb2plY3Q9JytsYXllckNvbmZpZy5wcm9qZWN0KSB9KTtcblxuLy8gICAgICAgICAgIC8vIGNyZWF0aW5nIHRoZSBiYXNlIGxheWVyXG4vLyAgICAgICAgICAgbGF5ZXJDb25maWcudGl0bGUgPSBsYXllckNvbmZpZy5sYXllclRpdGxlXG4vLyAgICAgICAgICAgbGF5ZXJDb25maWcubmFtZSA9IGxheWVyQ29uZmlnLmxheWVyTmFtZVxuLy8gICAgICAgICAgIGxheWVyQ29uZmlnLmJhc2VsYXllciA9IHRydWU7XG4vLyAgICAgICAgICAgbGF5ZXJDb25maWcuc2luZ2xlVGlsZSA9IFwiRmFsc2VcIjtcbi8vICAgICAgICAgICBldnQuY29uZmlnLmxheWVyc1tsYXllck5hbWVdID0gbGF5ZXJDb25maWc7XG4vLyAgICAgICAgICAgZXZ0LmJhc2VsYXllcnMucHVzaChuZXcgT3BlbkxheWVycy5MYXllci5XTVMobGF5ZXJOYW1lLHVybFxuLy8gICAgICAgICAgICAgLGxheWVyV21zUGFyYW1zXG4vLyAgICAgICAgICAgICAse2lzQmFzZUxheWVyOnRydWVcbi8vICAgICAgICAgICAgICxndXR0ZXI6KGxheWVyQ29uZmlnLmNhY2hlZCA9PSAnVHJ1ZScpID8gMCA6IDVcbi8vICAgICAgICAgICAgICxidWZmZXI6MFxuLy8gICAgICAgICAgICAgLHNpbmdsZVRpbGU6KGxheWVyQ29uZmlnLnNpbmdsZVRpbGUgPT0gJ1RydWUnKVxuLy8gICAgICAgICAgICAgLHJhdGlvOjFcbi8vICAgICAgICAgICB9KSk7XG4vLyAgICAgICAgICAgZXZ0Lm1hcC5hbGxPdmVybGF5cyA9IGZhbHNlO1xuXG4vLyAgICAgICAgIH1cbi8vICAgICAgIH1cblxuLy8gICAgIH1cbi8vICAgICxcbi8vICAgICd1aWNyZWF0ZWQnOiBmdW5jdGlvbihldnQpe1xuLy8gICAgICB2YXIgbWFwID0gZXZ0Lm1hcDtcbi8vICAgICAgaWYgKCBtYXAuaWQgaW4gT3BlbkxheWVycy5MYXllci5Hb29nbGUuY2FjaGUgKSB7XG4vLyAgICAgICAgIGdvb2dsZS5tYXBzLmV2ZW50LmFkZExpc3RlbmVyT25jZShPcGVuTGF5ZXJzLkxheWVyLkdvb2dsZS5jYWNoZVttYXAuaWRdLm1hcE9iamVjdCwgJ3RpbGVzbG9hZGVkJywgZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgICAgICB2YXIgb2xMYXllcnMgPSBtYXAubGF5ZXJzO1xuLy8gICAgICAgICAgICAgdmFyIGdWaXNpYmlsaXR5ID0gZmFsc2U7XG4vLyAgICAgICAgICAgICBmb3IgKHZhciBpPW9sTGF5ZXJzLmxlbmd0aC0xOyBpPj0wOyAtLWkpIHtcbi8vICAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSBvbExheWVyc1tpXTtcbi8vICAgICAgICAgICAgICAgICBpZiAobGF5ZXIgaW5zdGFuY2VvZiBPcGVuTGF5ZXJzLkxheWVyLkdvb2dsZSAmJlxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLnZpc2liaWxpdHkgPT09IHRydWUgJiYgbGF5ZXIuaW5SYW5nZSA9PT0gdHJ1ZSkge1xuLy8gICAgICAgICAgICAgICAgICAgICBsYXllci5yZWRyYXcodHJ1ZSk7XG4vLyAgICAgICAgICAgICAgICAgICAgIGdWaXNpYmlsaXR5ID0gdHJ1ZTtcbi8vICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgaWYgKCFnVmlzaWJpbGl0eSkge1xuLy8gICAgICAgICAgICAgICAgIGZvciAodmFyIGk9b2xMYXllcnMubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuLy8gICAgICAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSBvbExheWVyc1tpXTtcbi8vICAgICAgICAgICAgICAgICAgICAgaWYgKGxheWVyIGluc3RhbmNlb2YgT3BlbkxheWVycy5MYXllci5Hb29nbGUpIHtcbi8vICAgICAgICAgICAgICAgICAgICAgICAgIGxheWVyLmRpc3BsYXkoZmFsc2UpO1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4vLyAgICAgICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH0pO1xuLy8gICAgICB9XG5cbi8vICAgICAgIC8vIE1ha2Ugc3ViZG9jayBhbHdheXMgYmUgYXQgdGhlIGxlZnRcbi8vICAgICAgICQoJyNzdWItZG9jaycpLmhvdmVyKGZ1bmN0aW9uKCl7XG4vLyAgICAgICAgIHZhciBzTGVmdCA9IGxpek1hcC5nZXREb2NrUmlnaHRQb3NpdGlvbigpO1xuLy8gICAgICAgICAkKHRoaXMpLmNzcyggJ2xlZnQnLCBzTGVmdCApO1xuLy8gICAgICAgfSk7XG5cbi8vICAgICAgIC8vIFVwZGF0ZSBsZWdlbmQgaWYgbW9iaWxlXG4vLyAgICAgICBpZiggbGl6TWFwLmNoZWNrTW9iaWxlKCkgKXtcbi8vICAgICAgICAgaWYoICQoJyNidXR0b24tc3dpdGNoZXInKS5wYXJlbnQoKS5oYXNDbGFzcygnYWN0aXZlJykgKVxuLy8gICAgICAgICAgICQoJyNidXR0b24tc3dpdGNoZXInKS5jbGljaygpO1xuLy8gICAgICAgfVxuXG4vLyAgICAgICAgIHZhciBvdkN0cmwgPSBsaXpNYXAubWFwLmdldENvbnRyb2xzQnlDbGFzcygnT3BlbkxheWVycy5Db250cm9sLk92ZXJ2aWV3TWFwJyk7XG4vLyAgICAgICAgIGlmICggb3ZDdHJsLmxlbmd0aCAhPSAwICkge1xuLy8gICAgICAgICAgICAgb3ZDdHJsID0gb3ZDdHJsWzBdO1xuLy8gICAgICAgICAgICAgaWYgKCBvdkN0cmwub3ZtYXAubGF5ZXJzLmxlbmd0aCA+IDEgKSB7XG4vLyAgICAgICAgICAgICAgICAgZm9yICggdmFyIGk9MCwgbGVuPW92Q3RybC5vdm1hcC5sYXllcnMubGVuZ3RoOyBpPGxlbjsgaSsrICl7XG4vLyAgICAgICAgICAgICAgICAgICAgIHZhciBsID0gb3ZDdHJsLm92bWFwLmxheWVyc1tpXTtcbi8vICAgICAgICAgICAgICAgICAgICAgaWYoIGwubmFtZS50b0xvd2VyQ2FzZSgpICE9ICdvdmVydmlldycgKVxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbC5kZXN0cm95KCk7XG4vLyAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgfVxuLy8gICAgICAgICB9XG5cbi8vICAgICAgIC8vIENvbm5lY3QgZG9jayBjbG9zZSBidXR0b25cbi8vICAgICAgICQoJyNkb2NrLWNsb3NlJykuY2xpY2soZnVuY3Rpb24oKXsgJCgnI21hcG1lbnUgLm5hdi1saXN0ID4gbGkuYWN0aXZlLm5hdi1kb2NrID4gYScpLmNsaWNrKCk7IH0pO1xuLy8gICAgICAgJCgnI3JpZ2h0LWRvY2stY2xvc2UnKS5jbGljayhmdW5jdGlvbigpeyAkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS5hY3RpdmUubmF2LXJpZ2h0LWRvY2sgPiBhJykuY2xpY2soKTsgfSk7XG4vLyAgICB9XG5cbi8vIH0pO1xuLy8gVE9ETyBMQVRFUj5cblxuJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xuICAvLyBzdGFydCB3YWl0aW5nXG4gICQoJ2JvZHknKS5jc3MoJ2N1cnNvcicsICd3YWl0Jyk7XG4gICQoJyNsb2FkaW5nJykuZGlhbG9nKHtcbiAgICBtb2RhbDogdHJ1ZVxuICAgICwgZHJhZ2dhYmxlOiBmYWxzZVxuICAgICwgcmVzaXphYmxlOiBmYWxzZVxuICAgICwgY2xvc2VPbkVzY2FwZTogZmFsc2VcbiAgICAsIGRpYWxvZ0NsYXNzOiAnbGl6LWRpYWxvZy13YWl0J1xuICAgICwgbWluSGVpZ2h0OiAxMjhcbiAgfSlcbiAgLnBhcmVudCgpLnJlbW92ZUNsYXNzKCd1aS1jb3JuZXItYWxsJylcbiAgLmNoaWxkcmVuKCcudWktZGlhbG9nLXRpdGxlYmFyJykucmVtb3ZlQ2xhc3MoJ3VpLWNvcm5lci1hbGwnKTtcbiAgLy8gaW5pdGlhbGl6ZSBMaXpNYXBcbiAgbGl6TWFwLmluaXQoKTtcbiAgJCggXCIjbG9hZGluZ1wiICkuY3NzKCdtaW4taGVpZ2h0JywnMTI4cHgnKTtcbn0pO1xuXG4vKiEgRVM2IFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCBwb2x5ZmlsbCAqL1xuLyohIGh0dHBzOi8vbXRocy5iZS9zdGFydHN3aXRoIHYwLjIuMCBieSBAbWF0aGlhcyAqL1xuaWYgKCFTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGgpIHtcbiAgICAoZnVuY3Rpb24oKSB7XG4gICAgICAgICd1c2Ugc3RyaWN0JzsgLy8gbmVlZGVkIHRvIHN1cHBvcnQgYGFwcGx5YC9gY2FsbGAgd2l0aCBgdW5kZWZpbmVkYC9gbnVsbGBcbiAgICAgICAgdmFyIGRlZmluZVByb3BlcnR5ID0gKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gSUUgOCBvbmx5IHN1cHBvcnRzIGBPYmplY3QuZGVmaW5lUHJvcGVydHlgIG9uIERPTSBlbGVtZW50c1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICB2YXIgb2JqZWN0ID0ge307XG4gICAgICAgICAgICAgICAgdmFyICRkZWZpbmVQcm9wZXJ0eSA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gJGRlZmluZVByb3BlcnR5KG9iamVjdCwgb2JqZWN0LCBvYmplY3QpICYmICRkZWZpbmVQcm9wZXJ0eTtcbiAgICAgICAgICAgIH0gY2F0Y2goZXJyb3IpIHt9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9KCkpO1xuICAgICAgICB2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcbiAgICAgICAgdmFyIHN0YXJ0c1dpdGggPSBmdW5jdGlvbihzZWFyY2gpIHtcbiAgICAgICAgICAgIGlmICh0aGlzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBUeXBlRXJyb3IoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBzdHJpbmcgPSBTdHJpbmcodGhpcyk7XG4gICAgICAgICAgICBpZiAoc2VhcmNoICYmIHRvU3RyaW5nLmNhbGwoc2VhcmNoKSA9PSAnW29iamVjdCBSZWdFeHBdJykge1xuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0cmluZ0xlbmd0aCA9IHN0cmluZy5sZW5ndGg7XG4gICAgICAgICAgICB2YXIgc2VhcmNoU3RyaW5nID0gU3RyaW5nKHNlYXJjaCk7XG4gICAgICAgICAgICB2YXIgc2VhcmNoTGVuZ3RoID0gc2VhcmNoU3RyaW5nLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBwb3NpdGlvbiA9IGFyZ3VtZW50cy5sZW5ndGggPiAxID8gYXJndW1lbnRzWzFdIDogdW5kZWZpbmVkO1xuICAgICAgICAgICAgLy8gYFRvSW50ZWdlcmBcbiAgICAgICAgICAgIHZhciBwb3MgPSBwb3NpdGlvbiA/IE51bWJlcihwb3NpdGlvbikgOiAwO1xuICAgICAgICAgICAgaWYgKHBvcyAhPSBwb3MpIHsgLy8gYmV0dGVyIGBpc05hTmBcbiAgICAgICAgICAgICAgICBwb3MgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0YXJ0ID0gTWF0aC5taW4oTWF0aC5tYXgocG9zLCAwKSwgc3RyaW5nTGVuZ3RoKTtcbiAgICAgICAgICAgIC8vIEF2b2lkIHRoZSBgaW5kZXhPZmAgY2FsbCBpZiBubyBtYXRjaCBpcyBwb3NzaWJsZVxuICAgICAgICAgICAgaWYgKHNlYXJjaExlbmd0aCArIHN0YXJ0ID4gc3RyaW5nTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGluZGV4ID0gLTE7XG4gICAgICAgICAgICB3aGlsZSAoKytpbmRleCA8IHNlYXJjaExlbmd0aCkge1xuICAgICAgICAgICAgICAgIGlmIChzdHJpbmcuY2hhckNvZGVBdChzdGFydCArIGluZGV4KSAhPSBzZWFyY2hTdHJpbmcuY2hhckNvZGVBdChpbmRleCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBpZiAoZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgICAgIGRlZmluZVByb3BlcnR5KFN0cmluZy5wcm90b3R5cGUsICdzdGFydHNXaXRoJywge1xuICAgICAgICAgICAgICAgICd2YWx1ZSc6IHN0YXJ0c1dpdGgsXG4gICAgICAgICAgICAgICAgJ2NvbmZpZ3VyYWJsZSc6IHRydWUsXG4gICAgICAgICAgICAgICAgJ3dyaXRhYmxlJzogdHJ1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGggPSBzdGFydHNXaXRoO1xuICAgICAgICB9XG4gICAgfSgpKTtcbn1cbiIsImNsYXNzIFV0aWwge1xuXG4gXHRzdGF0aWMgdXJsQXBwZW5kKHVybCwgcGFyYW1TdHIpIHtcbiAgICAgIHZhciBuZXdVcmwgPSB1cmw7XG4gICAgICBpZihwYXJhbVN0cikge1xuICAgICAgICAgIHZhciBwYXJ0cyA9ICh1cmwgKyBcIiBcIikuc3BsaXQoL1s/Jl0vKTtcbiAgICAgICAgICBuZXdVcmwgKz0gKHBhcnRzLnBvcCgpID09PSBcIiBcIiA/XG4gICAgICAgICAgICAgIHBhcmFtU3RyIDpcbiAgICAgICAgICAgICAgcGFydHMubGVuZ3RoID8gXCImXCIgKyBwYXJhbVN0ciA6IFwiP1wiICsgcGFyYW1TdHIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ld1VybDtcbiBcdH1cblxuIFx0c3RhdGljIGdldFBhcmFtZXRlclN0cmluZyhwYXJhbXMpIHtcblx0XHR2YXIgcGFyYW1zQXJyYXkgPSBbXTtcblxuXHRcdGZvciAodmFyIGtleSBpbiBwYXJhbXMpIHtcblx0XHQgIHZhciB2YWx1ZSA9IHBhcmFtc1trZXldO1xuXHRcdCAgaWYgKCh2YWx1ZSAhPSBudWxsKSAmJiAodHlwZW9mIHZhbHVlICE9ICdmdW5jdGlvbicpKSB7XG5cdFx0ICAgIHZhciBlbmNvZGVkVmFsdWU7XG5cdFx0ICAgIGlmICh0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCcgJiYgdmFsdWUuY29uc3RydWN0b3IgPT0gQXJyYXkpIHtcblx0XHQgICAgICAvKiB2YWx1ZSBpcyBhbiBhcnJheTsgZW5jb2RlIGl0ZW1zIGFuZCBzZXBhcmF0ZSB3aXRoIFwiLFwiICovXG5cdFx0ICAgICAgdmFyIGVuY29kZWRJdGVtQXJyYXkgPSBbXTtcblx0XHQgICAgICB2YXIgaXRlbTtcblx0XHQgICAgICBmb3IgKHZhciBpdGVtSW5kZXg9MCwgbGVuPXZhbHVlLmxlbmd0aDsgaXRlbUluZGV4PGxlbjsgaXRlbUluZGV4KyspIHtcblx0XHQgICAgICAgIGl0ZW0gPSB2YWx1ZVtpdGVtSW5kZXhdO1xuXHRcdCAgICAgICAgZW5jb2RlZEl0ZW1BcnJheS5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChcblx0XHQgICAgICAgICAgICAoaXRlbSA9PT0gbnVsbCB8fCBpdGVtID09PSB1bmRlZmluZWQpID8gXCJcIiA6IGl0ZW0pXG5cdFx0ICAgICAgICApO1xuXHRcdCAgICAgIH1cblx0XHQgICAgICBlbmNvZGVkVmFsdWUgPSBlbmNvZGVkSXRlbUFycmF5LmpvaW4oXCIsXCIpO1xuXHRcdCAgICB9XG5cdFx0ICAgIGVsc2Uge1xuXHRcdCAgICAgIC8qIHZhbHVlIGlzIGEgc3RyaW5nOyBzaW1wbHkgZW5jb2RlICovXG5cdFx0ICAgICAgZW5jb2RlZFZhbHVlID0gZW5jb2RlVVJJQ29tcG9uZW50KHZhbHVlKTtcblx0XHQgICAgfVxuXHRcdCAgICBwYXJhbXNBcnJheS5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChrZXkpICsgXCI9XCIgKyBlbmNvZGVkVmFsdWUpO1xuXHRcdCAgfVxuXHRcdH1cblxuXHRcdHJldHVybiBwYXJhbXNBcnJheS5qb2luKFwiJlwiKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlsOyJdLCJzb3VyY2VSb290IjoiIn0=