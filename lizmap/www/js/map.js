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
/*! no static exports found */
/***/ (function(module, exports) {

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
        var service = OpenLayers.Util.urlAppend(lizUrls.wms
          ,OpenLayers.Util.getParameterString(lizUrls.params)
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


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL21hcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxrREFBMEMsZ0NBQWdDO0FBQzFFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0VBQXdELGtCQUFrQjtBQUMxRTtBQUNBLHlEQUFpRCxjQUFjO0FBQy9EOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBeUMsaUNBQWlDO0FBQzFFLHdIQUFnSCxtQkFBbUIsRUFBRTtBQUNySTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOzs7QUFHQTtBQUNBOzs7Ozs7Ozs7Ozs7QUNsRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLE9BQU87QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sT0FBTztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxPQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLE9BQU87QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0saUJBQWlCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSwwQkFBMEI7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLDBCQUEwQjtBQUNoQztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sUUFBUSx5QkFBeUIsRUFBRTtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sUUFBUSxnQ0FBZ0MsRUFBRTtBQUNoRDtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0EsTUFBTSxPQUFPO0FBQ2I7QUFDQSxjQUFjLFFBQVE7O0FBRXRCO0FBQ0E7QUFDQSxNQUFNLE9BQU87QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLE9BQU87QUFDOUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLGtEQUFrRDtBQUM5RSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLDRCQUE0QixpREFBaUQ7QUFDN0U7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsS0FBSztBQUNsQixrQkFBa0IsUUFBUTtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTSxLQUFLO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLE9BQU87QUFDdEIsaUJBQWlCLE1BQU07QUFDdkIsaUJBQWlCLE1BQU07QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sT0FBTztBQUNiO0FBQ0E7QUFDQSxxREFBcUQsT0FBTztBQUM1RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZSxPQUFPO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLFFBQVE7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscURBQXFELE9BQU87QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBLGVBQWUsT0FBTztBQUN0QixjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0RBQXdELFFBQVE7QUFDaEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4REFBOEQ7O0FBRTlELHFEQUFxRCxPQUFPO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHVCQUF1QjtBQUM5QyxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBLE1BQU0sUUFBUTtBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxPQUFPO0FBQzlDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckI7QUFDQTtBQUNBLE1BQU0sT0FBTztBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsMkRBQTJEO0FBQzNEOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMkNBQTJDO0FBQzNDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsT0FBTztBQUNyQjtBQUNBO0FBQ0EsTUFBTSxPQUFPO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBLHlDQUF5Qzs7QUFFekM7QUFDQTtBQUNBO0FBQ0EsNkNBQTZDLG9CQUFvQixlQUFlO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsT0FBTztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxrQkFBa0IsdUJBQXVCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBDQUEwQyxPQUFPO0FBQ2pEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQjtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsdURBQXVELDJDQUEyQzs7QUFFbEc7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQ0FBMkMsUUFBUTtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsT0FBTztBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0Q0FBNEMsT0FBTztBQUNuRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEIsNkJBQTZCO0FBQzdCO0FBQ0EsYUFBYTtBQUNiLHVDQUF1QztBQUN2Qyw4QkFBOEI7QUFDOUIsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHFCQUFxQix1Q0FBdUM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDO0FBQ3ZDO0FBQ0EsaUJBQWlCLE9BQU87QUFDeEIsNkJBQTZCO0FBQzdCO0FBQ0EsYUFBYTtBQUNiLHVDQUF1QztBQUN2Qyw4QkFBOEI7QUFDOUIsaUJBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDLE9BQU87QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtREFBbUQsT0FBTztBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxPQUFPO0FBQzFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxxQkFBcUIsdUNBQXVDO0FBQzVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzTUFBc007QUFDdE07QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxPQUFPO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTs7QUFFQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNDQUFzQyxPQUFPO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLGtCQUFrQix1QkFBdUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDREQUE0RCwyQkFBMkI7QUFDdkY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0Esc0RBQXNELFFBQVE7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQyxrREFBa0Q7QUFDbEY7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYTtBQUNiOztBQUVBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsbUNBQW1DLE9BQU87QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixrREFBa0Q7QUFDMUU7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQSwyQ0FBMkM7QUFDM0M7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTOztBQUVUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxxREFBcUQseUNBQXlDOztBQUU5RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDLG1DQUFtQztBQUM1RSxXQUFXO0FBQ1gsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsbUNBQW1DO0FBQzVFLFdBQVc7QUFDWDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7OztBQUdBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUNBQXFDOztBQUVyQztBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUNBQXlDO0FBQ3pDO0FBQ0EsOENBQThDO0FBQzlDOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLDBGQUEwRiwwQkFBMEI7QUFDcEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esc0RBQXNEO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQix1QkFBdUI7O0FBRXhDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDREQUE0RDtBQUN0RixPQUFPO0FBQ1A7QUFDQTtBQUNBLDJDQUEyQyxPQUFPO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2SEFBNkg7QUFDN0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUI7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0EsaUNBQWlDLGlDQUFpQyxFQUFFO0FBQ3BFLGlDQUFpQyxvQ0FBb0M7QUFDckU7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EscUJBQXFCOztBQUVyQjtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7O0FBRXJCO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjs7QUFFckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELE9BQU87QUFDdkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDO0FBQ2pDO0FBQ0EseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVzs7QUFFWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQSx3REFBd0QsUUFBUTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLE9BQU87QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseUVBQXlFO0FBQ3pFO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckIsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDBDQUEwQyxPQUFPO0FBQ2pEO0FBQ0E7QUFDQSxtQ0FBbUMsWUFBWTtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0EsbUNBQW1DLFlBQVk7QUFDL0M7QUFDQSwwQ0FBMEMsT0FBTztBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbURBQW1ELE9BQU87QUFDMUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCQUF5Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxPQUFPO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLG9DQUFvQyxPQUFPO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSx3Q0FBd0MsT0FBTztBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYLFNBQVM7QUFDVCxPQUFPO0FBQ1A7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBLHdEQUF3RCxPQUFPO0FBQy9EO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3REFBd0QsT0FBTztBQUMvRDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QztBQUM5QztBQUNBO0FBQ0Esb0RBQW9EO0FBQ3BEO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSxtQkFBbUIsZ0NBQWdDO0FBQ25EO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxjQUFjO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsbUJBQW1CO0FBQzNCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLGlCQUFpQjtBQUN6QjtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLFFBQVE7QUFDaEI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDBCQUEwQjtBQUMxQyxrQkFBa0IsT0FBTztBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQSwrQ0FBK0M7QUFDL0MsbURBQW1EOztBQUVuRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsMEJBQTBCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEJBQTBCLDBCQUEwQjtBQUNwRCxZQUFZO0FBQ1o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEsMEJBQTBCO0FBQzFCLDBCQUEwQjtBQUMxQixzREFBc0Q7QUFDdEQ7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsbUJBQW1CO0FBQ25CO0FBQ0E7QUFDQTtBQUNBLFNBQVMsT0FBTztBQUNoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBLFNBQVMsT0FBTztBQUNoQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLFFBQVE7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsUUFBUTtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLG1EQUFtRDtBQUNuRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxPQUFPLGFBQWEsV0FBVyxjQUFjO0FBQzFEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxlQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsZUFBZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsOEJBQThCO0FBQzNEO0FBQ0EsNENBQTRDLGlCQUFpQjs7QUFFN0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCO0FBQ0E7QUFDQSxNQUFNLFFBQVE7QUFDZDtBQUNBO0FBQ0EseURBQXlELGdCQUFnQjtBQUN6RTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYixtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sUUFBUTtBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGNBQWM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLGNBQWM7QUFDcEI7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsZUFBZTtBQUNmOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlOztBQUVmO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxlQUFlO0FBQ2Y7O0FBRUEsT0FBTzs7QUFFUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPOztBQUVQOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0ZBQWtGLFlBQVksZUFBZTtBQUM3RztBQUNBO0FBQ0E7QUFDQTtBQUNBLDJEQUEyRCxnQkFBZ0I7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU0sT0FBTztBQUNiO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlCQUFpQjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMEJBQTBCO0FBQ2xDO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSwwQkFBMEI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9CQUFvQjtBQUM1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxPQUFPO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLE9BQU87QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsT0FBTztBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSxPQUFPO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7O0FBR0w7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBO0FBQ0EsWUFBWTtBQUNaO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHNFQUFzRTtBQUN0RTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdKQUFnSjtBQUNoSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxhQUFhOztBQUViO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QjtBQUN2QixtQkFBbUI7QUFDbkI7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNkNBQTZDLG9CQUFvQjs7QUFFakU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlCQUF5Qix1QkFBdUI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0EsMkNBQTJDLE9BQU87QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGVBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7O0FBRVg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsUUFBUTtBQUN2RSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsbUVBQW1FLDhEQUE4RDtBQUNqSTtBQUNBO0FBQ0E7QUFDQSwrREFBK0QsUUFBUTtBQUN2RTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxXQUFXOztBQUVYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLCtEQUErRCw4REFBOEQ7QUFDN0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMERBQTBELFFBQVE7O0FBRWxFO0FBQ0EsV0FBVzs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSw4REFBOEQ7QUFDbEk7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsMERBQTBELFFBQVE7QUFDbEU7QUFDQSxXQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNULFNBQVM7QUFDVCxTQUFTO0FBQ1QsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1EQUFtRCxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDL0QsbURBQW1ELEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUMvRCxtREFBbUQsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQy9EO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFzRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDbEYscUVBQXFFLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUNqRixxRUFBcUUsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ2pGLHFFQUFxRSxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDakY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwR0FBMEcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3RIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQjtBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsdUNBQXVDLFFBQVE7QUFDL0M7QUFDQTs7QUFFQSxjQUFjO0FBQ2Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBOztBQUVBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxRQUFRO0FBQy9DO0FBQ0E7O0FBRUEsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1Q0FBdUMsUUFBUTtBQUMvQztBQUNBOztBQUVBLGNBQWM7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsK0RBQStELFFBQVE7QUFDdkU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3RUFBd0Usb0dBQW9HOztBQUU1SztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYztBQUNkOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QyxNQUFNO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEQUFnRCxNQUFNO0FBQ3REO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTs7QUFFVjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUVBQWlFLE9BQU87QUFDeEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMkNBQTJDLDBEQUEwRCxFQUFFO0FBQ3ZHLGlEQUFpRCxnRUFBZ0UsRUFBRTtBQUNuSDs7QUFFQSxJQUFJO0FBQ0o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0EsU0FBUztBQUNULHlCQUF5QjtBQUN6QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0wiLCJmaWxlIjoiLi4vLi4vbGl6bWFwL3d3dy9qcy9tYXAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9tYXAuanNcIik7XG4iLCIvKipcbiogQ2xhc3M6IGxpek1hcFxuKiBAcGFja2FnZSAgIGxpem1hcFxuKiBAc3VicGFja2FnZSB2aWV3XG4qIEBhdXRob3IgICAgM2xpelxuKiBAY29weXJpZ2h0IDIwMTEgM2xpelxuKiBAbGluayAgICAgIGh0dHA6Ly8zbGl6LmNvbVxuKiBAbGljZW5zZSAgICBNb3ppbGxhIFB1YmxpYyBMaWNlbnNlIDogaHR0cDovL3d3dy5tb3ppbGxhLm9yZy9NUEwvXG4qL1xuXG5cbnZhciBsaXpNYXAgPSBmdW5jdGlvbigpIHtcbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IGNvbmZpZ1xuICAgKiB7b2JqZWN0fSBUaGUgbWFwIGNvbmZpZ1xuICAgKi9cbiAgdmFyIGNvbmZpZyA9IG51bGw7XG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBjYXBhYmlsaXRpZXNcbiAgICoge29iamVjdH0gVGhlIHdtcyBjYXBhYmlsaXRpZXNcbiAgICovXG4gIHZhciBjYXBhYmlsaXRpZXMgPSBudWxsO1xuICAvKipcbiAgICogUFJJVkFURSBQcm9wZXJ0eTogd210c0NhcGFiaWxpdGllc1xuICAgKiB7b2JqZWN0fSBUaGUgd210cyBjYXBhYmlsaXRpZXNcbiAgICovXG4gIHZhciB3bXRzQ2FwYWJpbGl0aWVzID0gbnVsbDtcbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IHdmc0NhcGFiaWxpdGllc1xuICAgKiB7b2JqZWN0fSBUaGUgd2ZzIGNhcGFiaWxpdGllc1xuICAgKi9cbiAgdmFyIHdmc0NhcGFiaWxpdGllcyA9IG51bGw7XG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBtYXBcbiAgICogezxPcGVuTGF5ZXJzLk1hcD59IFRoZSBtYXBcbiAgICovXG4gIHZhciBtYXAgPSBudWxsO1xuICAvKipcbiAgICogUFJJVkFURSBQcm9wZXJ0eTogYmFzZWxheWVyc1xuICAgKiB7QXJyYXkoPE9wZW5MYXllcnMuTGF5ZXI+KX0gT3JkZXJlZCBsaXN0IG9mIGJhc2UgbGF5ZXJzXG4gICAqL1xuICB2YXIgYmFzZWxheWVycyA9IFtdO1xuICAvKipcbiAgICogUFJJVkFURSBQcm9wZXJ0eTogbGF5ZXJzXG4gICAqIHtBcnJheSg8T3BlbkxheWVycy5MYXllcj4pfSBPcmRlcmVkIGxpc3Qgb2YgbGF5ZXJzXG4gICAqL1xuICB2YXIgbGF5ZXJzID0gW107XG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBjb250cm9sc1xuICAgKiB7T2JqZWN0KHtrZXk6PE9wZW5MYXllcnMuQ29udHJvbD59KX0gRGljdGlvbmFyeSBvZiBjb250cm9sc1xuICAgKi9cbiAgdmFyIGNvbnRyb2xzID0ge307XG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBwcmludENhcGFiaWxpdGllc1xuICAgKiB7T2JqZWN0KHtzY2FsZXM6W0Zsb2F0XSxsYXlvdXRzOltPYmplY3RdfSl9IFByaW50IGNhcGFiaWxpdGllc1xuICAgKi9cbiAgdmFyIHByaW50Q2FwYWJpbGl0aWVzID0ge3NjYWxlczpbXSxsYXlvdXRzOltdfTtcbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IHRyZWVcbiAgICoge29iamVjdH0gVGhlIGxheWVyJ3MgdHJlZVxuICAgKi9cbiAgdmFyIHRyZWUgPSB7Y29uZmlnOnt0eXBlOidncm91cCd9fTtcblxuICAvKipcbiAgICogUFJJVkFURSBQcm9wZXJ0eTogZ2V0RmVhdHVyZUluZm9WZW5kb3JQYXJhbXNcbiAgICoge29iamVjdH0gQWRkaXRpb25uYWwgUUdJUyBTZXJ2ZXIgcGFyYW1ldGVyIGZvciBjbGljayB0b2xlcmFuY2UgaW4gcGl4ZWxzXG4gICAqL1xuICB2YXIgZGVmYXVsdEdldEZlYXR1cmVJbmZvVG9sZXJhbmNlcyA9IHtcbiAgICAnRklfUE9JTlRfVE9MRVJBTkNFJzogMjUsXG4gICAgJ0ZJX0xJTkVfVE9MRVJBTkNFJzogMTAsXG4gICAgJ0ZJX1BPTFlHT05fVE9MRVJBTkNFJzogNVxuICB9O1xuXG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBleHRlcm5hbEJhc2VsYXllcnNSZXBsYWNlbWVudFxuICAgKlxuICAgKi9cbiAgdmFyIGV4dGVybmFsQmFzZWxheWVyc1JlcGxhY2VtZW50ID0ge1xuICAgICdvc20nOiAnb3NtLW1hcG5paycsXG4gICAgJ29zbS10b25lcic6ICdvc20tc3RhbWVuLXRvbmVyJyxcbiAgICAnb3NtLWN5Y2xlJzogJ29zbS1jeWNsZW1hcCcsXG4gICAgJ2dzYXQnOiAnZ29vZ2xlLXNhdGVsbGl0ZScsXG4gICAgJ2doeWInOiAnZ29vZ2xlLWh5YnJpZCcsXG4gICAgJ2dwaHknOiAnZ29vZ2xlLXRlcnJhaW4nLFxuICAgICdnbWFwJzogJ2dvb2dsZS1zdHJlZXQnLFxuICAgICdibWFwJzogJ2Jpbmctcm9hZCcsXG4gICAgJ2JhZXJpYWwnOiAnYmluZy1hZXJpYWwnLFxuICAgICdiaHlicmlkJzogJ2JpbmctaHlicmlkJyxcbiAgICAnaWdubWFwJzogJ2lnbi1zY2FuJyxcbiAgICAnaWducGxhbic6ICdpZ24tcGxhbicsXG4gICAgJ2lnbnBob3RvJzogJ2lnbi1waG90bycsXG4gICAgJ2lnbmNhZGFzdHJhbCc6ICdpZ24tY2FkYXN0cmFsJ1xuICB9O1xuXG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBleHRlcm5hbEJhc2VsYXllcnNSZXBsYWNlbWVudFxuICAgKlxuICAgKi9cbiAgdmFyIHN0YXJ0dXBCYXNlbGF5ZXJzUmVwbGFjZW1lbnQgPSB7XG4gICAgJ29zbS1tYXBuaWsnOiAnb3NtJyxcbiAgICAnb3NtLXN0YW1lbi10b25lcic6ICdvc20tdG9uZXInLFxuICAgICdvc20tY3ljbGVtYXAnOiAnb3NtLWN5Y2xlJyxcbiAgICAnZ29vZ2xlLXNhdGVsbGl0ZSc6ICdnc2F0JyxcbiAgICAnZ29vZ2xlLWh5YnJpZCc6ICdnaHliJyxcbiAgICAnZ29vZ2xlLXRlcnJhaW4nOiAnZ3BoeScsXG4gICAgJ2dvb2dsZS1zdHJlZXQnOiAnZ21hcCcsXG4gICAgJ2Jpbmctcm9hZCc6ICdibWFwJyxcbiAgICAnYmluZy1hZXJpYWwnOiAnYmFlcmlhbCcsXG4gICAgJ2JpbmctaHlicmlkJzogJ2JoeWJyaWQnLFxuICAgICdpZ24tc2Nhbic6ICdpZ25tYXAnLFxuICAgICdpZ24tcGxhbic6ICdpZ25wbGFuJyxcbiAgICAnaWduLXBob3RvJzogJ2lnbnBob3RvJyxcbiAgICAnaWduLWNhZGFzdHJhbCc6ICdpZ25jYWRhc3RyYWwnLFxuICAgICdlbXB0eSc6ICdlbXB0eUJhc2VsYXllcidcbiAgfTtcblxuICAvKipcbiAgICogUFJJVkFURSBQcm9wZXJ0eTogY2xlYW5OYW1lTWFwXG4gICAqXG4gICAqL1xuICB2YXIgY2xlYW5OYW1lTWFwID0ge1xuICB9O1xuXG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBsYXllcklkTWFwXG4gICAqXG4gICAqL1xuICB2YXIgbGF5ZXJJZE1hcCA9IHtcbiAgfTtcbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IHNob3J0TmFtZU1hcFxuICAgKlxuICAgKi9cbiAgdmFyIHNob3J0TmFtZU1hcCA9IHtcbiAgfTtcbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IHR5cGVOYW1lTWFwXG4gICAqXG4gICAqL1xuICB2YXIgdHlwZU5hbWVNYXAgPSB7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBlcm1hbGluayBhcmdzXG4gICAqL1xuICB2YXIgcGVybWFsaW5rQXJncyA9IG51bGw7XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgUHJvcGVydHk6IGxheWVyQ2xlYW5OYW1lc1xuICAgKlxuICAgKi9cbiAgdmFyIGxheWVyQ2xlYW5OYW1lcyA9IHt9O1xuXG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBsaXptYXBMYXllckZpbHRlckFjdGl2ZS4gQ29udGFpbnMgbGF5ZXIgbmFtZSBpZiBmaWx0ZXIgaXMgYWN0aXZlXG4gICAqXG4gICAqL1xuICB2YXIgbGl6bWFwTGF5ZXJGaWx0ZXJBY3RpdmUgPSBudWxsO1xuXG4gIC8qKlxuICAgKiBQUklWQVRFIFByb3BlcnR5OiBlZGl0aW9uUGVuZGluZy4gVHJ1ZSB3aGVuIGFuIGVkaXRpb24gZm9ybSBoYXMgYWxyZWFkeSBiZWVuIGRpc3BsYXllZC4gVXNlZCB0byBwcmV2ZW50IGRvdWJsZS1jbGljayBvbiBsYXVuY2hFZGl0aW9uIGJ1dHRvblxuICAgKlxuICAgKi9cbiAgdmFyIGVkaXRpb25QZW5kaW5nID0gZmFsc2U7XG5cbiAgZnVuY3Rpb24gcGVyZm9ybUNsZWFuTmFtZShhTmFtZSkge1xuICAgIHZhciBhY2NlbnRNYXAgPSB7XG4gICAgICAgIFwiw6BcIjogXCJhXCIsICAgIFwiw6FcIjogXCJhXCIsICAgIFwiw6JcIjogXCJhXCIsICAgIFwiw6NcIjogXCJhXCIsICAgIFwiw6RcIjogXCJhXCIsICAgIFwiw6dcIjogXCJjXCIsICAgIFwiw6hcIjogXCJlXCIsICAgIFwiw6lcIjogXCJlXCIsICAgIFwiw6pcIjogXCJlXCIsICAgIFwiw6tcIjogXCJlXCIsICAgIFwiw6xcIjogXCJpXCIsICAgIFwiw61cIjogXCJpXCIsICAgIFwiw65cIjogXCJpXCIsICAgIFwiw69cIjogXCJpXCIsICAgIFwiw7FcIjogXCJuXCIsICAgIFwiw7JcIjogXCJvXCIsICAgIFwiw7NcIjogXCJvXCIsICAgIFwiw7RcIjogXCJvXCIsICAgIFwiw7VcIjogXCJvXCIsICAgIFwiw7ZcIjogXCJvXCIsICAgIFwiw7lcIjogXCJ1XCIsICAgIFwiw7pcIjogXCJ1XCIsICAgIFwiw7tcIjogXCJ1XCIsICAgIFwiw7xcIjogXCJ1XCIsICAgIFwiw71cIjogXCJ5XCIsICAgIFwiw79cIjogXCJ5XCIsXG4gICAgICAgIFwiw4BcIjogXCJBXCIsICAgIFwiw4FcIjogXCJBXCIsICAgIFwiw4JcIjogXCJBXCIsICAgIFwiw4NcIjogXCJBXCIsICAgIFwiw4RcIjogXCJBXCIsICAgIFwiw4dcIjogXCJDXCIsICAgIFwiw4hcIjogXCJFXCIsICAgIFwiw4lcIjogXCJFXCIsICAgIFwiw4pcIjogXCJFXCIsICAgIFwiw4tcIjogXCJFXCIsICAgIFwiw4xcIjogXCJJXCIsICAgIFwiw41cIjogXCJJXCIsICAgIFwiw45cIjogXCJJXCIsICAgIFwiw49cIjogXCJJXCIsICAgIFwiw5FcIjogXCJOXCIsICAgIFwiw5JcIjogXCJPXCIsICAgIFwiw5NcIjogXCJPXCIsICAgIFwiw5RcIjogXCJPXCIsICAgIFwiw5VcIjogXCJPXCIsICAgIFwiw5ZcIjogXCJPXCIsICAgIFwiw5lcIjogXCJVXCIsICAgIFwiw5pcIjogXCJVXCIsICAgIFwiw5tcIjogXCJVXCIsICAgIFwiw5xcIjogXCJVXCIsICAgIFwiw51cIjogXCJZXCIsXG4gICAgICAgIFwiLVwiOlwiIFwiLCBcIidcIjogXCIgXCIsIFwiKFwiOiBcIiBcIiwgXCIpXCI6IFwiIFwifTtcbiAgICB2YXIgbm9ybWFsaXplID0gZnVuY3Rpb24oIHRlcm0gKSB7XG4gICAgICAgIHZhciByZXQgPSBcIlwiO1xuICAgICAgICBmb3IgKCB2YXIgaSA9IDA7IGkgPCB0ZXJtLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgcmV0ICs9IGFjY2VudE1hcFsgdGVybS5jaGFyQXQoaSkgXSB8fCB0ZXJtLmNoYXJBdChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0O1xuICAgIH07XG4gICAgdmFyIHRoZUNsZWFuTmFtZSA9IG5vcm1hbGl6ZShhTmFtZSk7XG4gICAgdmFyIHJlZyA9IG5ldyBSZWdFeHAoJ1xcXFxXJywgJ2cnKTtcbiAgICByZXR1cm4gdGhlQ2xlYW5OYW1lLnJlcGxhY2UocmVnLCAnXycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGNsZWFuTmFtZVxuICAgKiBjbGVhbmluZyBsYXllck5hbWUgZm9yIGNsYXNzIGFuZCBsYXllclxuICAgKi9cbiAgZnVuY3Rpb24gY2xlYW5OYW1lKGFOYW1lKXtcbiAgICBpZiAoIGFOYW1lIGluIGNsZWFuTmFtZU1hcCApXG4gICAgICAgIHJldHVybiBhTmFtZTtcblxuICAgIHRoZUNsZWFuTmFtZSA9IHBlcmZvcm1DbGVhbk5hbWUoIGFOYW1lICk7XG4gICAgaWYgKCAodGhlQ2xlYW5OYW1lIGluIGNsZWFuTmFtZU1hcCkgJiYgY2xlYW5OYW1lTWFwW3RoZUNsZWFuTmFtZV0gIT0gYU5hbWUgKXtcbiAgICAgICAgaSA9IDE7XG4gICAgICAgIG5DbGVhbk5hbWUgPSB0aGVDbGVhbk5hbWUraTtcbiAgICAgICAgd2hpbGUoIChuQ2xlYW5OYW1lIGluIGNsZWFuTmFtZU1hcCkgJiYgY2xlYW5OYW1lTWFwW25DbGVhbk5hbWVdICE9IGFOYW1lICl7XG4gICAgICAgICAgaSArPSAxO1xuICAgICAgICAgIG5DbGVhbk5hbWUgPSB0aGVDbGVhbk5hbWUraTtcbiAgICAgICAgfVxuICAgICAgICB0aGVDbGVhbk5hbWUgPSBuQ2xlYW5OYW1lO1xuICAgIH1cbiAgICBjbGVhbk5hbWVNYXBbdGhlQ2xlYW5OYW1lXSA9IGFOYW1lO1xuICAgIHJldHVybiB0aGVDbGVhbk5hbWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXROYW1lQnlDbGVhbk5hbWUoIGNsZWFuTmFtZSApe1xuICAgIHZhciBuYW1lID0gbnVsbDtcbiAgICBpZiggY2xlYW5OYW1lIGluIGNsZWFuTmFtZU1hcCApXG4gICAgICBuYW1lID0gY2xlYW5OYW1lTWFwW2NsZWFuTmFtZV07XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXROYW1lQnlTaG9ydE5hbWUoIHNob3J0TmFtZSApe1xuICAgIHZhciBuYW1lID0gbnVsbDtcbiAgICBpZiggc2hvcnROYW1lIGluIHNob3J0TmFtZU1hcCApXG4gICAgICBuYW1lID0gc2hvcnROYW1lTWFwW3Nob3J0TmFtZV07XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXROYW1lQnlUeXBlTmFtZSggdHlwZU5hbWUgKXtcbiAgICB2YXIgbmFtZSA9IG51bGw7XG4gICAgaWYoIHR5cGVOYW1lIGluIHR5cGVOYW1lTWFwIClcbiAgICAgIG5hbWUgPSB0eXBlTmFtZU1hcFt0eXBlTmFtZV07XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRMYXllck5hbWVCeUNsZWFuTmFtZSggY2xlYW5OYW1lICl7XG4gICAgdmFyIGxheWVyTmFtZSA9IG51bGw7XG4gICAgaWYoIGNsZWFuTmFtZSBpbiBsYXllckNsZWFuTmFtZXMgKVxuICAgICAgbGF5ZXJOYW1lID0gbGF5ZXJDbGVhbk5hbWVzW2NsZWFuTmFtZV07XG4gICAgaWYgKCBsYXllck5hbWUgPT0gbnVsbCAmJiBjbGVhbk5hbWUgaW4gY2xlYW5OYW1lTWFwICkge1xuICAgICAgbGF5ZXJOYW1lID0gY2xlYW5OYW1lTWFwW2NsZWFuTmFtZV07XG4gICAgICBsYXllckNsZWFuTmFtZXNbY2xlYW5OYW1lXSA9IGxheWVyTmFtZTtcbiAgICB9XG4gICAgcmV0dXJuIGxheWVyTmFtZTtcbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IHVwZGF0ZU1vYmlsZVxuICAgKiBEZXRlcm1pbmUgaWYgd2Ugc2hvdWxkIGRpc3BsYXkgdGhlIG1vYmlsZSB2ZXJzaW9uLlxuICAgKi9cbiAgZnVuY3Rpb24gdXBkYXRlTW9iaWxlKCl7XG4gICAgdmFyIGlzTW9iaWxlID0gbUNoZWNrTW9iaWxlKCk7XG4gICAgdmFyIGNvbnRlbnRJc01vYmlsZSA9ICQoJyNjb250ZW50JykuaGFzQ2xhc3MoJ21vYmlsZScpO1xuICAgIGlmIChpc01vYmlsZSA9PSBjb250ZW50SXNNb2JpbGUpXG4gICAgICByZXR1cm47XG5cbiAgICBpZiAoaXNNb2JpbGUpIHtcbiAgICAgIC8vIEFkZCBtb2JpbGUgY2xhc3MgdG8gY29udGVudFxuICAgICAgJCgnI2NvbnRlbnQsICNoZWFkZXJtZW51JykuYWRkQ2xhc3MoJ21vYmlsZScpO1xuXG4gICAgICAvLyBoaWRlIG92ZXJ2aWV3IG1hcFxuICAgICAgaWYgKGNvbmZpZy5vcHRpb25zLmhhc092ZXJ2aWV3KXtcbiAgICAgICAgJCgnI292ZXJ2aWV3LXRvZ2dsZScpLmhpZGUoKTtcbiAgICAgICAgJCgnI292ZXJ2aWV3LW1hcCcpLmhpZGUoKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIEhpZGUgc3dpdGNoZXJcbiAgICAgIGlmKCAkKCcjYnV0dG9uLXN3aXRjaGVyJykucGFyZW50KCkuaGFzQ2xhc3MoJ2FjdGl2ZScpIClcbiAgICAgICAgJCgnI2J1dHRvbi1zd2l0Y2hlcicpLmNsaWNrKCk7XG5cbiAgICAgIC8vIEhpZGUgdG9vbHRpcC1sYXllclxuICAgICAgaWYoICQoJyNidXR0b24tdG9vbHRpcC1sYXllcicpLnBhcmVudCgpLmhhc0NsYXNzKCdhY3RpdmUnKSApXG4gICAgICAgICQoJyNidXR0b24tdG9vbHRpcC1sYXllcicpLmNsaWNrKCk7XG5cbiAgICAgIGlmKCAkKCcjbWVudScpLmlzKCc6dmlzaWJsZScpKVxuICAgICAgICAkKCcjbWVudScpLmhpZGUoKTtcblxuICAgICAgJCgnI21hcC1jb250ZW50JykuYXBwZW5kKCQoJyN0b29sYmFyJykpO1xuXG4gICAgICAkKCcjdG9nZ2xlTGVnZW5kJylcbiAgICAgICAgLmF0dHIoJ2RhdGEtb3JpZ2luYWwtdGl0bGUnLCQoJyN0b2dnbGVMZWdlbmRPbicpLmF0dHIoJ3ZhbHVlJykpXG4gICAgICAgIC5wYXJlbnQoKS5hdHRyKCdjbGFzcycsJ2xlZ2VuZCcpO1xuXG4gICAgICAvLyBhdXRvY29tcGxldGlvbiBpdGVtcyBmb3IgbG9jYXRlYnlsYXllciBmZWF0dXJlXG4gICAgICAkKCdkaXYubG9jYXRlLWxheWVyIHNlbGVjdCcpLnNob3coKTtcbiAgICAgICQoJ3NwYW4uY3VzdG9tLWNvbWJvYm94JykuaGlkZSgpO1xuICAgIH1cbiAgICBlbHNlXG4gICAge1xuICAgICAgLy8gUmVtb3ZlIG1vYmlsZSBjbGFzcyB0byBjb250ZW50XG4gICAgICAkKCcjY29udGVudCwgI2hlYWRlcm1lbnUnKS5yZW1vdmVDbGFzcygnbW9iaWxlJyk7XG5cbiAgICAgIC8vIERpc3BsYXkgb3ZlcnZpZXcgbWFwXG4gICAgICBpZiAoY29uZmlnLm9wdGlvbnMuaGFzT3ZlcnZpZXcpe1xuICAgICAgICAkKCcjb3ZlcnZpZXctbWFwJykuc2hvdygpO1xuICAgICAgICAkKCcjb3ZlcnZpZXctdG9nZ2xlJykuc2hvdygpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH1cbiAgICAgIC8vIFNob3cgc3dpdGNoZXJcbiAgICAgIGlmKCAhKCAkKCcjYnV0dG9uLXN3aXRjaGVyJykucGFyZW50KCkuaGFzQ2xhc3MoJ2FjdGl2ZScpICkgKVxuICAgICAgICAkKCcjYnV0dG9uLXN3aXRjaGVyJykuY2xpY2soKTtcblxuICAgICAgaWYoICEkKCcjbWVudScpLmlzKCc6dmlzaWJsZScpKVxuICAgICAgICAkKCcjY29udGVudCBzcGFuLnVpLWljb24tb3Blbi1tZW51JykuY2xpY2soKTtcbiAgICAgIGVsc2VcbiAgICAgICAgJCgnI21hcC1jb250ZW50Jykuc2hvdygpO1xuXG4gICAgICAkKCcjdG9vbGJhcicpLmluc2VydEJlZm9yZSgkKCcjc3dpdGNoZXItbWVudScpKTtcblxuICAgICAgJCgnI3RvZ2dsZUxlZ2VuZCcpXG4gICAgICAgIC5hdHRyKCdkYXRhLW9yaWdpbmFsLXRpdGxlJywkKCcjdG9nZ2xlTWFwT25seU9uJykuYXR0cigndmFsdWUnKSlcbiAgICAgICAgLnBhcmVudCgpLmF0dHIoJ2NsYXNzJywnbWFwJyk7XG5cbiAgICAgIC8vIGF1dG9jb21wbGV0aW9uIGl0ZW1zIGZvciBsb2NhdGVieWxheWVyIGZlYXR1cmVcbiAgICAgICQoJ2Rpdi5sb2NhdGUtbGF5ZXIgc2VsZWN0JykuaGlkZSgpO1xuICAgICAgJCgnc3Bhbi5jdXN0b20tY29tYm9ib3gnKS5zaG93KCk7XG4gICAgfVxuXG4gIH1cblxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiB1cGRhdGVDb250ZW50U2l6ZVxuICAgKiB1cGRhdGUgdGhlIGNvbnRlbnQgc2l6ZVxuICAgKi9cbiAgZnVuY3Rpb24gdXBkYXRlQ29udGVudFNpemUoKXtcblxuICAgIHVwZGF0ZU1vYmlsZSgpO1xuXG4gICAgLy8gY2FsY3VsYXRlIGhlaWdodCBoZWlnaHRcbiAgICB2YXIgaCA9ICQod2luZG93KS5pbm5lckhlaWdodCgpO1xuICAgIGggPSBoIC0gJCgnI2hlYWRlcicpLmhlaWdodCgpO1xuICAgICQoJyNtYXAnKS5oZWlnaHQoaCk7XG5cbiAgICAvLyBVcGRhdGUgYm9keSBwYWRkaW5nIHRvcCBieSBzdW1taW5nIHVwIGhlYWRlcitoZWFkZXJtZW51XG4gICAgJCgnYm9keScpLmNzcygncGFkZGluZy10b3AnLCAkKCcjaGVhZGVyJykub3V0ZXJIZWlnaHQoKSApO1xuXG4gICAgLy8gY2FsY3VsYXRlIG1hcCB3aWR0aCBkZXBlbmRpbmcgb24gdGhlbWUgY29uZmlndXJhdGlvblxuICAgIC8vIChmdWxsc2NyZWVuIG1hcCBvciBub3QsIG1vYmlsZSBvciBub3QpXG4gICAgdmFyIHcgPSAkKCdib2R5JykucGFyZW50KClbMF0ub2Zmc2V0V2lkdGg7XG4gICAgdyAtPSBwYXJzZUludCgkKCcjbWFwLWNvbnRlbnQnKS5jc3MoJ21hcmdpbi1sZWZ0JykpO1xuICAgIHcgLT0gcGFyc2VJbnQoJCgnI21hcC1jb250ZW50JykuY3NzKCdtYXJnaW4tcmlnaHQnKSk7XG4gICAgaWYgKCQoJyNtZW51JykuaXMoJzpoaWRkZW4nKSB8fCAkKCcjbWFwLWNvbnRlbnQnKS5oYXNDbGFzcygnZnVsbHNjcmVlbicpKSB7XG4gICAgICAkKCcjbWFwLWNvbnRlbnQnKS5jc3MoJ21hcmdpbi1sZWZ0JywnYXV0bycpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3IC09ICQoJyNtZW51Jykud2lkdGgoKTtcbiAgICAgICQoJyNtYXAtY29udGVudCcpLmNzcygnbWFyZ2luLWxlZnQnLCAkKCcjbWVudScpLndpZHRoKCkpO1xuICAgIH1cbiAgICAkKCcjbWFwJykud2lkdGgodyk7XG5cbiAgICAvLyBTZXQgdGhlIHRhYi1jb250ZW50IG1heC1oZWlnaHRcbiAgICBpZiAoICQoJyNkb2NrLXRhYnMnKS5pcygnOnZpc2libGUnKSApXG4gICAgICAgICQoJyNkb2NrLWNvbnRlbnQnKS5jc3MoICdtYXgtaGVpZ2h0JywgJCgnI2RvY2snKS5oZWlnaHQoKSAtICQoJyNkb2NrLXRhYnMnKS5oZWlnaHQoKSApO1xuXG4gICAgJCgnI2RvY2snKS5jc3MoJ292ZXJmbG93LXknLCAnaGlkZGVuJyk7XG5cbiAgICBpZihtYXApXG4gICAgICB1cGRhdGVNYXBTaXplKCk7XG5cbiAgfVxuXG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IHVwZGF0ZU1hcFNpemVcbiAgICogcXVlcnkgT3BlbkxheWVycyB0byB1cGRhdGUgdGhlIG1hcCBzaXplXG4gICAqL1xuIGZ1bmN0aW9uIHVwZGF0ZU1hcFNpemUoKXtcbiAgICAvL21hbmFnZSBXTVMgbWF4IHdpZHRoIGFuZCBoZWlnaHRcbiAgICB2YXIgd21zTWF4V2lkdGggPSAzMDAwO1xuICAgIHZhciB3bXNNYXhIZWlnaHQgPSAzMDAwO1xuICAgIGlmKCAoJ3dtc01heFdpZHRoJyBpbiBjb25maWcub3B0aW9ucykgJiYgY29uZmlnLm9wdGlvbnMud21zTWF4V2lkdGggKVxuICAgICAgICB3bXNNYXhXaWR0aCA9IE51bWJlcihjb25maWcub3B0aW9ucy53bXNNYXhXaWR0aCk7XG4gICAgaWYoICgnd21zTWF4SGVpZ2h0JyBpbiBjb25maWcub3B0aW9ucykgJiYgY29uZmlnLm9wdGlvbnMud21zTWF4SGVpZ2h0IClcbiAgICAgICAgd21zTWF4SGVpZ2h0ID0gTnVtYmVyKGNvbmZpZy5vcHRpb25zLndtc01heEhlaWdodCk7XG4gICAgdmFyIHJlbW92ZVNpbmdsZVRpbGUgPSBmYWxzZTtcbiAgICB2YXIgbmV3TWFwU2l6ZSA9IG1hcC5nZXRDdXJyZW50U2l6ZSgpO1xuICAgIHZhciByZXBsYWNlU2luZ2xlVGlsZVNpemUgPSBuZXdNYXBTaXplLmNsb25lKCk7XG4gICAgaWYoIG5ld01hcFNpemUudyA+IHdtc01heFdpZHRoIHx8IG5ld01hcFNpemUuaCA+IHdtc01heEhlaWdodCApe1xuICAgICAgICByZW1vdmVTaW5nbGVUaWxlID0gdHJ1ZTtcbiAgICAgICAgdmFyIHdtc01heE1heCA9IE1hdGgubWF4KHdtc01heFdpZHRoLCB3bXNNYXhIZWlnaHQpO1xuICAgICAgICB2YXIgd21zTWluTWF4ID0gTWF0aC5taW4od21zTWF4V2lkdGgsIHdtc01heEhlaWdodCk7XG4gICAgICAgIHZhciBtYXBNYXggPSBNYXRoLm1heChuZXdNYXBTaXplLncsIG5ld01hcFNpemUuaCk7XG4gICAgICAgIHZhciBtYXBNaW4gPSBNYXRoLm1pbihuZXdNYXBTaXplLncsIG5ld01hcFNpemUuaCk7XG4gICAgICAgIGlmKCBtYXBNYXgvMiA+IG1hcE1pbiApXG4gICAgICAgICAgcmVwbGFjZVNpbmdsZVRpbGVTaXplID0gbmV3IE9wZW5MYXllcnMuU2l6ZShNYXRoLnJvdW5kKG1hcE1heC8yKSwgTWF0aC5yb3VuZChtYXBNYXgvMikpO1xuICAgICAgICBlbHNlIGlmKCB3bXNNYXhNYXgvMiA+IG1hcE1pbiApXG4gICAgICAgICAgcmVwbGFjZVNpbmdsZVRpbGVTaXplID0gbmV3IE9wZW5MYXllcnMuU2l6ZShNYXRoLnJvdW5kKHdtc01heE1heC8yKSwgTWF0aC5yb3VuZCh3bXNNYXhNYXgvMikpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVwbGFjZVNpbmdsZVRpbGVTaXplID0gbmV3IE9wZW5MYXllcnMuU2l6ZShNYXRoLnJvdW5kKHdtc01pbk1heC8yKSwgTWF0aC5yb3VuZCh3bXNNaW5NYXgvMikpO1xuICAgIH1cbiAgICAvLyBVcGRhdGUgc2luZ2xlVGlsZSBsYXllcnNcbiAgICBmb3IodmFyIGk9MCwgbGVuPW1hcC5sYXllcnMubGVuZ3RoOyBpPGxlbjsgKytpKSB7XG4gICAgICAgIHZhciBsYXllciA9IG1hcC5sYXllcnNbaV07XG4gICAgICAgIGlmKCAhKGxheWVyIGluc3RhbmNlb2YgT3BlbkxheWVycy5MYXllci5XTVMpIClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB2YXIgcWdpc05hbWUgPSBudWxsO1xuICAgICAgICBpZiAoIGxheWVyLm5hbWUgaW4gY2xlYW5OYW1lTWFwIClcbiAgICAgICAgICAgIHFnaXNOYW1lID0gZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUobGF5ZXIubmFtZSk7XG4gICAgICAgIHZhciBjb25maWdMYXllciA9IG51bGw7XG4gICAgICAgIGlmICggcWdpc05hbWUgKVxuICAgICAgICAgICAgY29uZmlnTGF5ZXIgPSBjb25maWcubGF5ZXJzW3FnaXNOYW1lXTtcbiAgICAgICAgaWYgKCAhY29uZmlnTGF5ZXIgKVxuICAgICAgICAgICAgY29uZmlnTGF5ZXIgPSBjb25maWcubGF5ZXJzW2xheWVyLnBhcmFtc1snTEFZRVJTJ11dO1xuICAgICAgICBpZiAoICFjb25maWdMYXllciApXG4gICAgICAgICAgICBjb25maWdMYXllciA9IGNvbmZpZy5sYXllcnNbbGF5ZXIubmFtZV07XG4gICAgICAgIGlmICggIWNvbmZpZ0xheWVyIClcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICBpZiggY29uZmlnTGF5ZXIuc2luZ2xlVGlsZSAhPSBcIlRydWVcIiApXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgaWYoIHJlbW92ZVNpbmdsZVRpbGUgJiYgbGF5ZXIuc2luZ2xlVGlsZSkge1xuICAgICAgICAgIGxheWVyLmFkZE9wdGlvbnMoe3NpbmdsZVRpbGU6ZmFsc2UsIHRpbGVTaXplOiByZXBsYWNlU2luZ2xlVGlsZVNpemV9KTtcbiAgICAgICAgfSBlbHNlIGlmKCAhcmVtb3ZlU2luZ2xlVGlsZSAmJiAhbGF5ZXIuc2luZ2xlVGlsZSkge1xuICAgICAgICAgIHJlcGxhY2VTaW5nbGVUaWxlU2l6ZS5oID0gcGFyc2VJbnQocmVwbGFjZVNpbmdsZVRpbGVTaXplLmggKiBsYXllci5yYXRpbywgMTApO1xuICAgICAgICAgIHJlcGxhY2VTaW5nbGVUaWxlU2l6ZS53ID0gcGFyc2VJbnQocmVwbGFjZVNpbmdsZVRpbGVTaXplLncgKiBsYXllci5yYXRpbywgMTApO1xuICAgICAgICAgIGxheWVyLmFkZE9wdGlvbnMoe3NpbmdsZVRpbGU6dHJ1ZSwgdGlsZVNpemU6IHJlcGxhY2VTaW5nbGVUaWxlU2l6ZX0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFyIGNlbnRlciA9IG1hcC5nZXRDZW50ZXIoKTtcbiAgICBtYXAudXBkYXRlU2l6ZSgpO1xuICAgIG1hcC5zZXRDZW50ZXIoY2VudGVyKTtcbiAgICBtYXAuYmFzZUxheWVyLnJlZHJhdygpO1xuXG4gICAgdmFyIHNsaWRlciA9ICQoJyNuYXZiYXIgLnNsaWRlcicpO1xuICAgIGlmICggc2xpZGVyLmlzKCc6dmlzaWJsZScpICYmICgkKCcjbmF2YmFyJykuaGVpZ2h0KCkrMTUwID4gJCgnI21hcCcpLmhlaWdodCgpIHx8IG1DaGVja01vYmlsZSgpKSApXG4gICAgICBzbGlkZXIuaGlkZSgpO1xuICAgIGVsc2UgaWYgKCAhc2xpZGVyLmlzKCc6dmlzaWJsZScpICYmICQoJyNuYXZiYXInKS5oZWlnaHQoKSsyMDAgPCAkKCcjbWFwJykuaGVpZ2h0KCkgJiYgIW1DaGVja01vYmlsZSgpIClcbiAgICAgIHNsaWRlci5zaG93KCk7XG5cbiAgICB1cGRhdGVTd2l0Y2hlclNpemUoKTtcblxuICAgIHVwZGF0ZU1pbmlEb2NrU2l6ZSgpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IHVwZGF0ZVN3aXRjaGVyU2l6ZVxuICAgKiB1cGRhdGUgdGhlIHN3aXRjaGVyIHNpemVcbiAgICovXG4gIGZ1bmN0aW9uIHVwZGF0ZVN3aXRjaGVyU2l6ZSgpe1xuXG4gICAgLy8gU2V0IHRoZSBzd2l0Y2hlciBjb250ZW50IGEgbWF4LWhlaWdodFxuICAgICQoJyNzd2l0Y2hlci1sYXllcnMtY29udGFpbmVyJykuY3NzKCAnaGVpZ2h0JywgJ2F1dG8nICk7XG4gICAgdmFyIG1oID0gJCgnI2RvY2snKS5oZWlnaHQoKSAtICgkKCcjZG9jay10YWJzJykuaGVpZ2h0KCkrMSkgLSAkKCcjc3dpdGNoZXItbGF5ZXJzLWNvbnRhaW5lciBoMycpLmhlaWdodCgpIC0gKCQoJyNzd2l0Y2hlci1sYXllcnMtYWN0aW9ucycpLmhlaWdodCgpKzEpO1xuICAgIG1oIC09IHBhcnNlSW50KCQoJyNzd2l0Y2hlci1sYXllcnMtY29udGFpbmVyIC5tZW51LWNvbnRlbnQnKS5jc3MoICdwYWRkaW5nLXRvcCcgKSk7XG4gICAgbWggLT0gcGFyc2VJbnQoJCgnI3N3aXRjaGVyLWxheWVycy1jb250YWluZXIgLm1lbnUtY29udGVudCcpLmNzcyggJ3BhZGRpbmctYm90dG9tJyApKTtcbiAgICBpZiAoICQoJyNzd2l0Y2hlci1iYXNlbGF5ZXInKS5pcygnOnZpc2libGUnKSApXG4gICAgICAgIG1oIC09ICQoJyNzd2l0Y2hlci1iYXNlbGF5ZXInKS5oZWlnaHQoKTtcbiAgICAkKCcjc3dpdGNoZXItbGF5ZXJzLWNvbnRhaW5lciAubWVudS1jb250ZW50JykuY3NzKCAnbWF4LWhlaWdodCcsIG1oICkuY3NzKCdvdmVyZmxvdy14JywgJ2hpZGRlbicpLmNzcygnb3ZlcmZsb3cteScsICdhdXRvJyk7XG5cbiAgICAvLyBjYWxjdWxhdGUgc3dpdGNoZXIgaGVpZ2h0XG4gICAgLy8gYmFzZWQgb24gbWFwIGhlaWdodFxuICAgIGggPSAkKCcjbWFwJykuaGVpZ2h0KCk7XG4gICAgLy8gZGVwZW5kaW5nIG9uIGVsZW1lbnQgaW4gI21lbnUgZGl2XG4gICAgaWYgKCQoJyNjbG9zZS1tZW51JykuaXMoJzp2aXNpYmxlJykpXG4gICAgICBoIC09ICQoJyNjbG9zZS1tZW51Jykub3V0ZXJIZWlnaHQodHJ1ZSk7XG5cbiAgICBpZiAoICQoJyNtZW51ICN0b29sYmFyJykubGVuZ3RoICE9IDAgKSB7XG4gICAgICAkKCcjdG9vbGJhcicpLmNoaWxkcmVuKCkuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIGlmICggc2VsZi5pcygnOnZpc2libGUnKSApIHtcbiAgICAgICAgICB2YXIgY2hpbGRyZW4gPSBzZWxmLmNoaWxkcmVuKCk7XG4gICAgICAgICAgaCAtPSBjaGlsZHJlbi5maXJzdCgpLm91dGVySGVpZ2h0KHRydWUpO1xuICAgICAgICAgIGlmICggY2hpbGRyZW4ubGVuZ3RoID4gMSApXG4gICAgICAgICAgICBoIC09IGNoaWxkcmVuLmxhc3QoKS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlmICgkKCcjc3dpdGNoZXItYmFzZWxheWVyJykuaXMoJzp2aXNpYmxlJykpIHtcbiAgICAgIGggLT0gJCgnI3N3aXRjaGVyLWJhc2VsYXllcicpLmNoaWxkcmVuKCkuZmlyc3QoKS5vdXRlckhlaWdodCh0cnVlKTtcbiAgICAgIGggLT0gJCgnI3N3aXRjaGVyLWJhc2VsYXllcicpLmNoaWxkcmVuKCkubGFzdCgpLm91dGVySGVpZ2h0KHRydWUpO1xuICAgIH1cbiAgICBoIC09ICQoJyNzd2l0Y2hlci1tZW51JykuY2hpbGRyZW4oKS5maXJzdCgpLm91dGVySGVpZ2h0KHRydWUpO1xuXG4gICAgdmFyIHN3ID0gJCgnI3N3aXRjaGVyJyk7XG4gICAgLy8gZGVwZW5kaW5nIG9uIGl0J3Mgb3duIGNzcyBib3ggcGFyYW1ldGVyc1xuICAgIGggLT0gKHBhcnNlSW50KHN3LmNzcygnbWFyZ2luLXRvcCcpKSA/IHBhcnNlSW50KHN3LmNzcygnbWFyZ2luLXRvcCcpKSA6IDAgKSA7XG4gICAgaCAtPSAocGFyc2VJbnQoc3cuY3NzKCdtYXJnaW4tYm90dG9tJykpID8gcGFyc2VJbnQoc3cuY3NzKCdtYXJnaW4tYm90dG9tJykpIDogMCApIDtcbiAgICBoIC09IChwYXJzZUludChzdy5jc3MoJ3BhZGRpbmctdG9wJykpID8gcGFyc2VJbnQoc3cuY3NzKCdwYWRkaW5nLXRvcCcpKSA6IDAgKSA7XG4gICAgaCAtPSAocGFyc2VJbnQoc3cuY3NzKCdwYWRkaW5nLWJvdHRvbScpKSA/IHBhcnNlSW50KHN3LmNzcygncGFkZGluZy1ib3R0b20nKSkgOiAwICkgO1xuICAgIGggLT0gKHBhcnNlSW50KHN3LmNzcygnYm9yZGVyLXRvcC13aWR0aCcpKSA/IHBhcnNlSW50KHN3LmNzcygnYm9yZGVyLXRvcC13aWR0aCcpKSA6IDAgKSA7XG4gICAgaCAtPSAocGFyc2VJbnQoc3cuY3NzKCdib3JkZXItYm90dG9tLXdpZHRoJykpID8gcGFyc2VJbnQoc3cuY3NzKCdib3JkZXItYm90dG9tLXdpZHRoJykpIDogMCApIDtcblxuICAgIC8vZGVwZW5kaW5nIG9uIGl0J3MgcGFyZW50IHBhZGRpbmdcbiAgICB2YXIgc3dwID0gc3cucGFyZW50KCk7XG4gICAgaCAtPSAocGFyc2VJbnQoc3dwLmNzcygncGFkZGluZy10b3AnKSkgPyBwYXJzZUludChzd3AuY3NzKCdwYWRkaW5nLXRvcCcpKSA6IDAgKSA7XG4gICAgaCAtPSAocGFyc2VJbnQoc3dwLmNzcygncGFkZGluZy1ib3R0b20nKSkgPyBwYXJzZUludChzd3AuY3NzKCdwYWRkaW5nLWJvdHRvbScpKSA6IDAgKSA7XG5cbiAgICAvLyBJZiBtYXAgaWYgZnVsbHNjcmVlbiwgZ2V0ICNtZW51IHBvc2l0aW9uIDogYm90dG9tIG9yIHRvcFxuICAgIGggLT0gMiAqIChwYXJzZUludCgkKCcjbWVudScpLmNzcygnYm90dG9tJykpID8gcGFyc2VJbnQoJCgnI21lbnUnKS5jc3MoJ2JvdHRvbScpKSA6IDAgKSA7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiB1cGRhdGVNaW5pRG9ja1NpemVcbiAgICogdXBkYXRlIHRoZSBtaW5pZG9jayBzaXplXG4gICAqL1xuICBmdW5jdGlvbiB1cGRhdGVNaW5pRG9ja1NpemUoKSB7XG4gICAgICBpZiAoICQoJyNtaW5pLWRvY2sgLnRhYi1wYW5lOnZpc2libGUnKS5sZW5ndGggPT0gMCApXG4gICAgICAgIHJldHVybiAwO1xuICAgICAgLy8gdGhlIG1pbmktZG9jayBtZW51LWNvbnRlbnQgdmlzaWJsZVxuICAgICAgdmFyIG1kbWN2ID0gJCgnI21pbmktZG9jayAudGFiLXBhbmU6dmlzaWJsZSBoMyB+IC5tZW51LWNvbnRlbnQ6Zmlyc3QnKTtcbiAgICAgIG1kbWN2LmNzcyggJ21heC1oZWlnaHQnLCAnMTAwJScgKVxuICAgICAgdmFyIGggPSAkKCcjbWluaS1kb2NrJykuaGVpZ2h0KCk7XG4gICAgICBoIC09ICQoJyNtaW5pLWRvY2sgLnRhYi1wYW5lOnZpc2libGUgaDMnKS5oZWlnaHQoKTtcbiAgICAgIGggLT0gKHBhcnNlSW50KG1kbWN2LmNzcygnbWFyZ2luLXRvcCcpKSA/IHBhcnNlSW50KG1kbWN2LmNzcygnbWFyZ2luLXRvcCcpKSA6IDAgKSA7XG4gICAgICBoIC09IChwYXJzZUludChtZG1jdi5jc3MoJ21hcmdpbi1ib3R0b20nKSkgPyBwYXJzZUludChtZG1jdi5jc3MoJ21hcmdpbi1ib3R0b20nKSkgOiAwICkgO1xuICAgICAgaCAtPSAocGFyc2VJbnQobWRtY3YuY3NzKCdwYWRkaW5nLXRvcCcpKSA/IHBhcnNlSW50KG1kbWN2LmNzcygncGFkZGluZy10b3AnKSkgOiAwICkgO1xuICAgICAgaCAtPSAocGFyc2VJbnQobWRtY3YuY3NzKCdwYWRkaW5nLWJvdHRvbScpKSA/IHBhcnNlSW50KG1kbWN2LmNzcygncGFkZGluZy1ib3R0b20nKSkgOiAwICkgO1xuXG4gICAgICBtZG1jdi5jc3MoICdtYXgtaGVpZ2h0JywgaCApLmNzcygnb3ZlcmZsb3cteCcsICdoaWRkZW4nKS5jc3MoJ292ZXJmbG93LXknLCAnYXV0bycpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGdldERvY2tSaWdodFBvc2l0aW9uXG4gICAqIENhbGN1bGF0ZSB0aGUgcG9zaXRpb24gb24gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIGRvY2tcbiAgICovXG4gIGZ1bmN0aW9uIGdldERvY2tSaWdodFBvc2l0aW9uKCkge1xuICAgIHZhciByaWdodCA9ICQoJyNtYXBtZW51Jykud2lkdGgoKTtcbiAgICBpZiggJCgnI2NvbnRlbnQnKS5oYXNDbGFzcygnZW1iZWQnKSApXG4gICAgICAgIHJpZ2h0Kz0gMTE7XG4gICAgZWxzZSBpZiggJCgnI2RvY2snKS5jc3MoJ2Rpc3BsYXknKSAhPSAnbm9uZScgJiYgIWxpek1hcC5jaGVja01vYmlsZSgpIClcbiAgICAgICAgcmlnaHQrPSAkKCcjZG9jaycpLndpZHRoKCkgKyAxMTtcbiAgICByZXR1cm4gcmlnaHQ7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBnZXRMYXllckxlZ2VuZEdyYXBoaWNVcmxcbiAgICogZ2V0IHRoZSBsYXllciBsZWdlbmQgZ3JhcGhpY1xuICAgKlxuICAgKiBQYXJhbWV0ZXJzOlxuICAgKiBuYW1lIC0ge3RleHR9IHRoZSBsYXllciBuYW1lXG4gICAqIHdpdGhTY2FsZSAtIHtib29sZWFufSB1cmwgd2l0aCBzY2FsZSBwYXJhbWV0ZXJcbiAgICpcbiAgICogRGVwZW5kZW5jaWVzOlxuICAgKiBsaXpVcmxzLndtc1xuICAgKlxuICAgKiBSZXR1cm5zOlxuICAgKiB7dGV4dH0gdGhlIHVybFxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0TGF5ZXJMZWdlbmRHcmFwaGljVXJsKG5hbWUsIHdpdGhTY2FsZSkge1xuICAgIHZhciBsYXllciA9IG51bGxcbiAgICAkLmVhY2gobGF5ZXJzLGZ1bmN0aW9uKGksbCkge1xuICAgICAgaWYgKGxheWVyID09IG51bGwgJiYgbC5uYW1lID09IG5hbWUpXG4gICAgICAgIGxheWVyID0gbDtcbiAgICB9KTtcbiAgICBpZiAobGF5ZXIgPT0gbnVsbCApXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB2YXIgcWdpc05hbWUgPSBudWxsO1xuICAgIGlmICggbmFtZSBpbiBjbGVhbk5hbWVNYXAgKVxuICAgICAgICBxZ2lzTmFtZSA9IGdldExheWVyTmFtZUJ5Q2xlYW5OYW1lKG5hbWUpO1xuICAgIHZhciBsYXllckNvbmZpZyA9IG51bGw7XG4gICAgaWYgKCBxZ2lzTmFtZSApXG4gICAgICAgIGxheWVyQ29uZmlnID0gY29uZmlnLmxheWVyc1txZ2lzTmFtZV07XG4gICAgaWYgKCAhbGF5ZXJDb25maWcgKVxuICAgICAgICBsYXllckNvbmZpZyA9IGNvbmZpZy5sYXllcnNbbGF5ZXIucGFyYW1zWydMQVlFUlMnXV07XG4gICAgaWYgKCAhbGF5ZXJDb25maWcgKVxuICAgICAgICBsYXllckNvbmZpZyA9IGNvbmZpZy5sYXllcnNbbGF5ZXIubmFtZV07XG4gICAgaWYgKCAhbGF5ZXJDb25maWcgKVxuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICBpZiAoICdleHRlcm5hbFdtc1RvZ2dsZScgaW4gbGF5ZXJDb25maWcgJiYgbGF5ZXJDb25maWcuZXh0ZXJuYWxXbXNUb2dnbGUgPT0gJ1RydWUnXG4gICAgICAmJiAnZXh0ZXJuYWxBY2Nlc3MnIGluIGxheWVyQ29uZmlnICYmIGxheWVyQ29uZmlnLmV4dGVybmFsQWNjZXNzXG4gICAgICAmJiAnbGF5ZXJzJyBpbiBsYXllckNvbmZpZy5leHRlcm5hbEFjY2VzcyAmJiAndXJsJyBpbiBsYXllckNvbmZpZy5leHRlcm5hbEFjY2Vzcykge1xuICAgICAgICB2YXIgZXh0ZXJuYWxBY2Nlc3MgPSBsYXllckNvbmZpZy5leHRlcm5hbEFjY2VzcztcbiAgICAgICAgdmFyIGxlZ2VuZFBhcmFtcyA9IHtTRVJWSUNFOiBcIldNU1wiLFxuICAgICAgICAgICAgICAgICAgICAgIFZFUlNJT046IFwiMS4zLjBcIixcbiAgICAgICAgICAgICAgICAgICAgICBSRVFVRVNUOiBcIkdldExlZ2VuZEdyYXBoaWNcIixcbiAgICAgICAgICAgICAgICAgICAgICBMQVlFUjogZXh0ZXJuYWxBY2Nlc3MubGF5ZXJzLFxuICAgICAgICAgICAgICAgICAgICAgIFNUWUxFOiBleHRlcm5hbEFjY2Vzcy5zdHlsZXMsXG4gICAgICAgICAgICAgICAgICAgICAgU0xEX1ZFUlNJT046IFwiMS4xLjBcIixcbiAgICAgICAgICAgICAgICAgICAgICBFWENFUFRJT05TOiBcImFwcGxpY2F0aW9uL3ZuZC5vZ2Muc2VfaW5pbWFnZVwiLFxuICAgICAgICAgICAgICAgICAgICAgIEZPUk1BVDogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgICAgICAgICAgICBUUkFOU1BBUkVOVDogXCJUUlVFXCIsXG4gICAgICAgICAgICAgICAgICAgICAgV0lEVEg6IDE1MCxcbiAgICAgICAgICAgICAgICAgICAgICBEUEk6IDk2fTtcblxuICAgICAgICB2YXIgbGVnZW5kUGFyYW1zU3RyaW5nID0gT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhcbiAgICAgICAgICAgICBsZWdlbmRQYXJhbXNcbiAgICAgICAgICAgICk7XG4gICAgICAgIHJldHVybiBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKGV4dGVybmFsQWNjZXNzLnVybCwgbGVnZW5kUGFyYW1zU3RyaW5nKTtcbiAgICB9XG4gICAgdmFyIGxlZ2VuZFBhcmFtcyA9IHtTRVJWSUNFOiBcIldNU1wiLFxuICAgICAgICAgICAgICAgICAgVkVSU0lPTjogXCIxLjMuMFwiLFxuICAgICAgICAgICAgICAgICAgUkVRVUVTVDogXCJHZXRMZWdlbmRHcmFwaGljXCIsXG4gICAgICAgICAgICAgICAgICBMQVlFUjogbGF5ZXIucGFyYW1zWydMQVlFUlMnXSxcbiAgICAgICAgICAgICAgICAgIFNUWUxFOiBsYXllci5wYXJhbXNbJ1NUWUxFUyddLFxuICAgICAgICAgICAgICAgICAgRVhDRVBUSU9OUzogXCJhcHBsaWNhdGlvbi92bmQub2djLnNlX2luaW1hZ2VcIixcbiAgICAgICAgICAgICAgICAgIEZPUk1BVDogXCJpbWFnZS9wbmdcIixcbiAgICAgICAgICAgICAgICAgIFRSQU5TUEFSRU5UOiBcIlRSVUVcIixcbiAgICAgICAgICAgICAgICAgIFdJRFRIOiAxNTAsXG4gICAgICAgICAgICAgICAgICBMQVlFUkZPTlRTSVpFOiA5LFxuICAgICAgICAgICAgICAgICAgSVRFTUZPTlRTSVpFOiA5LFxuICAgICAgICAgICAgICAgICAgU1lNQk9MU1BBQ0U6IDEsXG4gICAgICAgICAgICAgICAgICBJQ09OTEFCRUxTUEFDRTogMixcbiAgICAgICAgICAgICAgICAgIERQSTogOTZ9O1xuICAgIGlmIChsYXllckNvbmZpZy5pZD09bGF5ZXJDb25maWcubmFtZSlcbiAgICAgIGxlZ2VuZFBhcmFtc1snTEFZRVJGT05UQk9MRCddID0gXCJUUlVFXCI7XG4gICAgZWxzZSB7XG4gICAgICBsZWdlbmRQYXJhbXNbJ0xBWUVSRk9OVFNJWkUnXSA9IDA7XG4gICAgICBsZWdlbmRQYXJhbXNbJ0xBWUVSU1BBQ0UnXSA9IDA7XG4gICAgICBsZWdlbmRQYXJhbXNbJ0xBWUVSRk9OVEJPTEQnXSA9IFwiRkFMU0VcIjtcbiAgICAgIGxlZ2VuZFBhcmFtc1snTEFZRVJUSVRMRSddID0gXCJGQUxTRVwiO1xuICAgIH1cbiAgICBpZiAod2l0aFNjYWxlKVxuICAgICAgbGVnZW5kUGFyYW1zWydTQ0FMRSddID0gbWFwLmdldFNjYWxlKCk7XG4gICAgdmFyIGxlZ2VuZFBhcmFtc1N0cmluZyA9IE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcoXG4gICAgICAgICBsZWdlbmRQYXJhbXNcbiAgICAgICAgKTtcbiAgICB2YXIgc2VydmljZSA9IE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQobGl6VXJscy53bXNcbiAgICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgKTtcbiAgICByZXR1cm4gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChzZXJ2aWNlLCBsZWdlbmRQYXJhbXNTdHJpbmcpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGdldExheWVyU2NhbGVcbiAgICogZ2V0IHRoZSBsYXllciBzY2FsZXMgYmFzZWQgb24gY2hpbGRyZW4gbGF5ZXJcbiAgICpcbiAgICogUGFyYW1ldGVyczpcbiAgICogbmVzdGVkIC0ge09iamVjdH0gYSBjYXBhYmlsaXR5IGxheWVyXG4gICAqIG1pblNjYWxlIC0ge0Zsb2F0fSB0aGUgbmVzdGVkIG1pbiBzY2FsZVxuICAgKiBtYXhTY2FsZSAtIHtGbG9hdH0gdGhlIG5lc3RlZCBtYXggc2NhbGVcbiAgICpcbiAgICogRGVwZW5kZW5jaWVzOlxuICAgKiBjb25maWdcbiAgICpcbiAgICogUmV0dXJuczpcbiAgICoge09iamVjdH0gdGhlIG1pbiBhbmQgbWF4IHNjYWxlc1xuICAgKi9cbiAgZnVuY3Rpb24gZ2V0TGF5ZXJTY2FsZShuZXN0ZWQsbWluU2NhbGUsbWF4U2NhbGUpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbmVzdGVkLm5lc3RlZExheWVycy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgIHZhciBsYXllciA9IG5lc3RlZC5uZXN0ZWRMYXllcnNbaV07XG4gICAgICB2YXIgcWdpc0xheWVyTmFtZSA9IGxheWVyLm5hbWU7XG4gICAgICBpZiAoICd1c2VMYXllcklEcycgaW4gY29uZmlnLm9wdGlvbnMgJiYgY29uZmlnLm9wdGlvbnMudXNlTGF5ZXJJRHMgPT0gJ1RydWUnIClcbiAgICAgICAgcWdpc0xheWVyTmFtZSA9IGxheWVySWRNYXBbbGF5ZXIubmFtZV07XG4gICAgICBlbHNlIGlmICggbGF5ZXIubmFtZSBpbiBzaG9ydE5hbWVNYXAgKVxuICAgICAgICBxZ2lzTGF5ZXJOYW1lID0gc2hvcnROYW1lTWFwW2xheWVyLm5hbWVdO1xuICAgICAgdmFyIGxheWVyQ29uZmlnID0gY29uZmlnLmxheWVyc1txZ2lzTGF5ZXJOYW1lXTtcbiAgICAgIGlmIChsYXllci5uZXN0ZWRMYXllcnMubGVuZ3RoICE9IDApXG4gICAgICAgICByZXR1cm4gZ2V0TGF5ZXJTY2FsZShsYXllcixtaW5TY2FsZSxtYXhTY2FsZSk7XG4gICAgICBpZiAobGF5ZXJDb25maWcpIHtcbiAgICAgICAgaWYgKG1pblNjYWxlID09IG51bGwpXG4gICAgICAgICAgbWluU2NhbGU9bGF5ZXJDb25maWcubWluU2NhbGU7XG4gICAgICAgIGVsc2UgaWYgKGxheWVyQ29uZmlnLm1pblNjYWxlPG1pblNjYWxlKVxuICAgICAgICAgIG1pblNjYWxlPWxheWVyQ29uZmlnLm1pblNjYWxlO1xuICAgICAgICBpZiAobWF4U2NhbGUgPT0gbnVsbClcbiAgICAgICAgICBtYXhTY2FsZT1sYXllckNvbmZpZy5tYXhTY2FsZTtcbiAgICAgICAgZWxzZSBpZiAobGF5ZXJDb25maWcubWF4U2NhbGU+bWF4U2NhbGUpXG4gICAgICAgICAgbWF4U2NhbGU9bGF5ZXJDb25maWcubWF4U2NhbGU7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICggbWluU2NhbGUgPCAxIClcbiAgICAgIG1pblNjYWxlID0gMTtcbiAgICByZXR1cm4ge21pblNjYWxlOm1pblNjYWxlLG1heFNjYWxlOm1heFNjYWxlfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBnZXRMYXllck9yZGVyXG4gICAqIGdldCB0aGUgbGF5ZXIgb3JkZXIgYW5kIGNhbGN1bGF0ZSBpdCBpZiBpdCdzIGEgUUdJUyBncm91cFxuICAgKlxuICAgKiBQYXJhbWV0ZXJzOlxuICAgKiBuZXN0ZWQgLSB7T2JqZWN0fSBhIGNhcGFiaWxpdHkgbGF5ZXJcbiAgICpcbiAgICogRGVwZW5kZW5jaWVzOlxuICAgKiBjb25maWdcbiAgICpcbiAgICogUmV0dXJuczpcbiAgICoge0ludGVnZXJ9IHRoZSBsYXllcidzIG9yZGVyXG4gICAqL1xuICBmdW5jdGlvbiBnZXRMYXllck9yZGVyKG5lc3RlZCkge1xuICAgIC8vIHRoZXJlIGlzIG5vIGxheWVyc09yZGVyIGluIHRoZSBwcm9qZWN0XG4gICAgaWYgKCEoJ2xheWVyc09yZGVyJyBpbiBjb25maWcpKVxuICAgICAgcmV0dXJuIC0xO1xuXG4gICAgLy8gdGhlIG5lc3RlZCBpcyBhIGxheWVyIGFuZCBub3QgYSBncm91cFxuICAgIGlmIChuZXN0ZWQubmVzdGVkTGF5ZXJzLmxlbmd0aCA9PSAwKSB7XG4gICAgICB2YXIgcWdpc0xheWVyTmFtZSA9IG5lc3RlZC5uYW1lO1xuICAgICAgaWYgKCAndXNlTGF5ZXJJRHMnIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnVzZUxheWVySURzID09ICdUcnVlJyApXG4gICAgICAgIHFnaXNMYXllck5hbWUgPSBsYXllcklkTWFwW25lc3RlZC5uYW1lXTtcbiAgICAgIGVsc2UgaWYgKCBuZXN0ZWQubmFtZSBpbiBzaG9ydE5hbWVNYXAgKVxuICAgICAgICBxZ2lzTGF5ZXJOYW1lID0gc2hvcnROYW1lTWFwW25lc3RlZC5uYW1lXTtcbiAgICAgIGlmIChxZ2lzTGF5ZXJOYW1lIGluIGNvbmZpZy5sYXllcnNPcmRlcilcbiAgICAgICAgcmV0dXJuIGNvbmZpZy5sYXllcnNPcmRlcltuZXN0ZWQubmFtZV07XG4gICAgICBlbHNlXG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICAvLyB0aGUgbmVzdGVkIGlzIGEgZ3JvdXBcbiAgICB2YXIgb3JkZXIgPSAtMTtcbiAgICBmb3IgKHZhciBpID0gMCwgbGVuID0gbmVzdGVkLm5lc3RlZExheWVycy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgIHZhciBsYXllciA9IG5lc3RlZC5uZXN0ZWRMYXllcnNbaV07XG4gICAgICB2YXIgcWdpc0xheWVyTmFtZSA9IGxheWVyLm5hbWU7XG4gICAgICBpZiAoICd1c2VMYXllcklEcycgaW4gY29uZmlnLm9wdGlvbnMgJiYgY29uZmlnLm9wdGlvbnMudXNlTGF5ZXJJRHMgPT0gJ1RydWUnIClcbiAgICAgICAgcWdpc0xheWVyTmFtZSA9IGxheWVySWRNYXBbbGF5ZXIubmFtZV07XG4gICAgICBlbHNlIGlmICggbGF5ZXIubmFtZSBpbiBzaG9ydE5hbWVNYXAgKVxuICAgICAgICBxZ2lzTGF5ZXJOYW1lID0gc2hvcnROYW1lTWFwW2xheWVyLm5hbWVdO1xuICAgICAgdmFyIGxPcmRlciA9IC0xO1xuICAgICAgaWYgKGxheWVyLm5lc3RlZExheWVycy5sZW5ndGggIT0gMClcbiAgICAgICAgbE9yZGVyID0gZ2V0TGF5ZXJTY2FsZShsYXllcik7XG4gICAgICBlbHNlIGlmIChxZ2lzTGF5ZXJOYW1lIGluIGNvbmZpZy5sYXllcnNPcmRlcilcbiAgICAgICAgbE9yZGVyID0gY29uZmlnLmxheWVyc09yZGVyW3FnaXNMYXllck5hbWVdO1xuICAgICAgZWxzZVxuICAgICAgICBsT3JkZXIgPSAtMTtcbiAgICAgIGlmIChsT3JkZXIgIT0gLTEpIHtcbiAgICAgICAgaWYgKG9yZGVyID09IC0xIHx8IGxPcmRlciA8IG9yZGVyKVxuICAgICAgICAgIG9yZGVyID0gbE9yZGVyO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb3JkZXI7XG4gIH1cblxuICBmdW5jdGlvbiBiZWZvcmVMYXllclRyZWVDcmVhdGVkKCkge1xuICAgICBpZiAoXG4gICAgICAgKCgnb3NtTWFwbmlrJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnLm9wdGlvbnMub3NtTWFwbmlrID09ICdUcnVlJykgfHxcbiAgICAgICAoKCdvc21TdGFtZW5Ub25lcicgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICYmIGNvbmZpZy5vcHRpb25zLm9zbVN0YW1lblRvbmVyID09ICdUcnVlJykgfHxcbiAgICAgICAoKCdvc21DeWNsZW1hcCcgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICYmIGNvbmZpZy5vcHRpb25zLm9zbUN5Y2xlbWFwID09ICdUcnVlJ1xuICAgICAgICAmJiAoJ09DTUtleScgaW4gY29uZmlnLm9wdGlvbnMpKSB8fFxuICAgICAgICgoJ2dvb2dsZVN0cmVldHMnIGluIGNvbmZpZy5vcHRpb25zKVxuICAgICAgICAmJiBjb25maWcub3B0aW9ucy5nb29nbGVTdHJlZXRzID09ICdUcnVlJykgfHxcbiAgICAgICAoKCdnb29nbGVTYXRlbGxpdGUnIGluIGNvbmZpZy5vcHRpb25zKVxuICAgICAgICAmJiBjb25maWcub3B0aW9ucy5nb29nbGVTYXRlbGxpdGUgPT0gJ1RydWUnKSB8fFxuICAgICAgICgoJ2dvb2dsZUh5YnJpZCcgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICYmIGNvbmZpZy5vcHRpb25zLmdvb2dsZUh5YnJpZCA9PSAnVHJ1ZScpIHx8XG4gICAgICAgKCgnZ29vZ2xlVGVycmFpbicgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICYmIGNvbmZpZy5vcHRpb25zLmdvb2dsZVRlcnJhaW4gPT0gJ1RydWUnKSB8fFxuICAgICAgICgoJ2JpbmdTdHJlZXRzJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnLm9wdGlvbnMuYmluZ1N0cmVldHMgPT0gJ1RydWUnXG4gICAgICAgICYmICgnYmluZ0tleScgaW4gY29uZmlnLm9wdGlvbnMpKSB8fFxuICAgICAgICgoJ2JpbmdTYXRlbGxpdGUnIGluIGNvbmZpZy5vcHRpb25zKVxuICAgICAgICAmJiBjb25maWcub3B0aW9ucy5iaW5nU2F0ZWxsaXRlID09ICdUcnVlJ1xuICAgICAgICAmJiAoJ2JpbmdLZXknIGluIGNvbmZpZy5vcHRpb25zKSkgfHxcbiAgICAgICAoKCdiaW5nSHlicmlkJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnLm9wdGlvbnMuYmluZ0h5YnJpZCA9PSAnVHJ1ZSdcbiAgICAgICAgJiYgKCdiaW5nS2V5JyBpbiBjb25maWcub3B0aW9ucykpIHx8XG4gICAgICAgKCgnaWduVGVycmFpbicgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICYmIGNvbmZpZy5vcHRpb25zLmlnblRlcnJhaW4gPT0gJ1RydWUnXG4gICAgICAgICYmICgnaWduS2V5JyBpbiBjb25maWcub3B0aW9ucykpIHx8XG4gICAgICAgKCgnaWduU3RyZWV0cycgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICYmIGNvbmZpZy5vcHRpb25zLmlnblN0cmVldHMgPT0gJ1RydWUnXG4gICAgICAgICYmICgnaWduS2V5JyBpbiBjb25maWcub3B0aW9ucykpIHx8XG4gICAgICAgKCgnaWduU2F0ZWxsaXRlJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnLm9wdGlvbnMuaWduU2F0ZWxsaXRlID09ICdUcnVlJ1xuICAgICAgICAmJiAoJ2lnbktleScgaW4gY29uZmlnLm9wdGlvbnMpKSB8fFxuICAgICAgICgoJ2lnbkNhZGFzdHJhbCcgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICYmIGNvbmZpZy5vcHRpb25zLmlnbkNhZGFzdHJhbCA9PSAnVHJ1ZSdcbiAgICAgICAgJiYgKCdpZ25LZXknIGluIGNvbmZpZy5vcHRpb25zKSlcbiAgICAgICApIHtcbiAgICAgICAgIFByb2o0anMuZGVmc1snRVBTRzozODU3J10gPSBQcm9qNGpzLmRlZnNbJ0VQU0c6OTAwOTEzJ107XG4gICAgICAgICB2YXIgcHJvaiA9IGNvbmZpZy5vcHRpb25zLnByb2plY3Rpb247XG4gICAgICAgICBpZiAoICEocHJvai5yZWYgaW4gUHJvajRqcy5kZWZzKSApXG4gICAgICAgICAgIFByb2o0anMuZGVmc1twcm9qLnJlZl09cHJvai5wcm9qNDtcbiAgICAgICAgIHZhciBwcm9qZWN0aW9uID0gbmV3IE9wZW5MYXllcnMuUHJvamVjdGlvbihwcm9qLnJlZik7XG4gICAgICAgICB2YXIgcHJvak9TTSA9IG5ldyBPcGVuTGF5ZXJzLlByb2plY3Rpb24oJ0VQU0c6Mzg1NycpO1xuICAgICAgICAgcHJvai5yZWYgPSAnRVBTRzozODU3JztcbiAgICAgICAgIHByb2oucHJvajQgPSBQcm9qNGpzLmRlZnNbJ0VQU0c6Mzg1NyddO1xuXG4gICAgICAgICAvLyBUcmFuc2Zvcm0gdGhlIGJib3hcbiAgICAgICAgIHZhciBiYm94ID0gY29uZmlnLm9wdGlvbnMuYmJveDtcbiAgICAgICAgIHZhciBleHRlbnQgPSBuZXcgT3BlbkxheWVycy5Cb3VuZHMoTnVtYmVyKGJib3hbMF0pLE51bWJlcihiYm94WzFdKSxOdW1iZXIoYmJveFsyXSksTnVtYmVyKGJib3hbM10pKTtcbiAgICAgICAgIGV4dGVudCA9IGV4dGVudC50cmFuc2Zvcm0ocHJvamVjdGlvbixwcm9qT1NNKTtcbiAgICAgICAgIGJib3ggPSBleHRlbnQudG9BcnJheSgpO1xuXG4gICAgICAgICB2YXIgc2NhbGVzID0gW107XG4gICAgICAgICBpZiAoJ21hcFNjYWxlcycgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICAgICAgIHNjYWxlcyA9IGNvbmZpZy5vcHRpb25zLm1hcFNjYWxlcztcbiAgICAgICAgIGlmICggc2NhbGVzLmxlbmd0aCA9PSAwIClcbiAgICAgICAgICAgc2NhbGVzID0gW2NvbmZpZy5vcHRpb25zLm1heFNjYWxlLGNvbmZpZy5vcHRpb25zLm1pblNjYWxlXTtcblxuICAgICAgICAgY29uZmlnLm9wdGlvbnMucHJvamVjdGlvbiA9IHByb2o7XG4gICAgICAgICBjb25maWcub3B0aW9ucy5iYm94ID0gYmJveDtcbiAgICAgICAgIGNvbmZpZy5vcHRpb25zLnpvb21MZXZlbE51bWJlciA9IDE2O1xuXG4gICAgICAgICAvLyBUcmFuc2Zvcm0gdGhlIGluaXRpYWwgYmJveFxuICAgICAgICAgaWYgKCAnaW5pdGlhbEV4dGVudCcgaW4gY29uZmlnLm9wdGlvbnMgJiYgY29uZmlnLm9wdGlvbnMuaW5pdGlhbEV4dGVudC5sZW5ndGggPT0gNCApIHtcbiAgICAgICAgICAgdmFyIGluaXRCYm94ID0gY29uZmlnLm9wdGlvbnMuaW5pdGlhbEV4dGVudDtcbiAgICAgICAgICAgdmFyIGluaXRpYWxFeHRlbnQgPSBuZXcgT3BlbkxheWVycy5Cb3VuZHMoTnVtYmVyKGluaXRCYm94WzBdKSxOdW1iZXIoaW5pdEJib3hbMV0pLE51bWJlcihpbml0QmJveFsyXSksTnVtYmVyKGluaXRCYm94WzNdKSk7XG4gICAgICAgICAgIGluaXRpYWxFeHRlbnQgPSBpbml0aWFsRXh0ZW50LnRyYW5zZm9ybShwcm9qZWN0aW9uLHByb2pPU00pO1xuICAgICAgICAgICBjb25maWcub3B0aW9ucy5pbml0aWFsRXh0ZW50ID0gaW5pdGlhbEV4dGVudC50b0FycmF5KCk7XG4gICAgICAgICB9XG5cbiAgICAgICAgIC8vIFNwZWNpZnkgem9vbSBsZXZlbCBudW1iZXJcbiAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAoKCdvc21NYXBuaWsnIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy5vc21NYXBuaWsgPT0gJ1RydWUnKSB8fFxuICAgICAgICAgICAgICgoJ29zbVN0YW1lblRvbmVyJyBpbiBjb25maWcub3B0aW9ucykgJiYgY29uZmlnLm9wdGlvbnMub3NtU3RhbWVuVG9uZXIgPT0gJ1RydWUnKSB8fFxuICAgICAgICAgICAgICgoJ29zbUN5Y2xlbWFwJyBpbiBjb25maWcub3B0aW9ucykgJiYgY29uZmlnLm9wdGlvbnMub3NtQ3ljbGVtYXAgPT0gJ1RydWUnICYmICgnT0NNS2V5JyBpbiBjb25maWcub3B0aW9ucykpIHx8XG4gICAgICAgICAgICAgKCgnYmluZ1N0cmVldHMnIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy5iaW5nU3RyZWV0cyA9PSAnVHJ1ZScgJiYgKCdiaW5nS2V5JyBpbiBjb25maWcub3B0aW9ucykpIHx8XG4gICAgICAgICAgICAgKCgnYmluZ1NhdGVsbGl0ZScgaW4gY29uZmlnLm9wdGlvbnMpICYmIGNvbmZpZy5vcHRpb25zLmJpbmdTYXRlbGxpdGUgPT0gJ1RydWUnICYmICgnYmluZ0tleScgaW4gY29uZmlnLm9wdGlvbnMpKSB8fFxuICAgICAgICAgICAgICgoJ2JpbmdIeWJyaWQnIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy5iaW5nSHlicmlkID09ICdUcnVlJyAmJiAoJ2JpbmdLZXknIGluIGNvbmZpZy5vcHRpb25zKSkgfHxcbiAgICAgICAgICAgICAoKCdpZ25UZXJyYWluJyBpbiBjb25maWcub3B0aW9ucykgJiYgY29uZmlnLm9wdGlvbnMuaWduVGVycmFpbiA9PSAnVHJ1ZScgJiYgKCdpZ25LZXknIGluIGNvbmZpZy5vcHRpb25zKSkgfHxcbiAgICAgICAgICAgICAoKCdpZ25TdHJlZXRzJyBpbiBjb25maWcub3B0aW9ucykgJiYgY29uZmlnLm9wdGlvbnMuaWduU3RyZWV0cyA9PSAnVHJ1ZScpICYmICgnaWduS2V5JyBpbiBjb25maWcub3B0aW9ucykpIHtcbiAgICAgICAgICAgY29uZmlnLm9wdGlvbnMuem9vbUxldmVsTnVtYmVyID0gMTk7XG4gICAgICAgICB9XG4gICAgICAgICBpZiAoKCgnZ29vZ2xlU3RyZWV0cycgaW4gY29uZmlnLm9wdGlvbnMpICYmIGNvbmZpZy5vcHRpb25zLmdvb2dsZVN0cmVldHMgPT0gJ1RydWUnKSB8fFxuICAgICAgICAgICAgICgoJ2dvb2dsZUh5YnJpZCcgaW4gY29uZmlnLm9wdGlvbnMpICYmIGNvbmZpZy5vcHRpb25zLmdvb2dsZUh5YnJpZCA9PSAnVHJ1ZScpIHx8XG4gICAgICAgICAgICAgKCgnaWduQ2FkYXN0cmFsJyBpbiBjb25maWcub3B0aW9ucykgJiYgY29uZmlnLm9wdGlvbnMuaWduQ2FkYXN0cmFsID09ICdUcnVlJyAmJiAoJ2lnbktleScgaW4gY29uZmlnLm9wdGlvbnMpKSkge1xuICAgICAgICAgICBjb25maWcub3B0aW9ucy56b29tTGV2ZWxOdW1iZXIgPSAyMDtcbiAgICAgICAgIH1cbiAgICAgICAgIGlmICggJ2dvb2dsZVNhdGVsbGl0ZScgaW4gY29uZmlnLm9wdGlvbnMgJiYgY29uZmlnLm9wdGlvbnMuZ29vZ2xlU2F0ZWxsaXRlID09ICdUcnVlJyl7XG4gICAgICAgICAgIGNvbmZpZy5vcHRpb25zLnpvb21MZXZlbE51bWJlciA9IDIxO1xuICAgICAgICAgfVxuICAgICAgICAgaWYgKCAnaWduU2F0ZWxsaXRlJyBpbiBjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy5pZ25TYXRlbGxpdGUgPT0gJ1RydWUnICYmICdpZ25LZXknIGluIGNvbmZpZy5vcHRpb25zICkge1xuICAgICAgICAgICBjb25maWcub3B0aW9ucy56b29tTGV2ZWxOdW1iZXIgPSAyMjtcbiAgICAgICAgIH1cbiAgICAgICAgIGNvbmZpZy5vcHRpb25zLm1heFNjYWxlID0gNTkxNjU5MDMwLjMyMjQ3NTY7XG4gICAgICAgICBjb25maWcub3B0aW9ucy5taW5TY2FsZSA9IDIyNTcuMDAwMDg1MTUzNDg2NTtcbiAgICAgICAgIHZhciBoYXNCYXNlbGF5ZXJzID0gKCgnZW1wdHlCYXNlbGF5ZXInIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy5lbXB0eUJhc2VsYXllciA9PSBcIlRydWVcIik7XG4gICAgICAgICBpZiAoICFoYXNCYXNlbGF5ZXJzICkge1xuICAgICAgICAgICBmb3IgKCB2YXIgbCBpbiBjb25maWcubGF5ZXJzICkge1xuICAgICAgICAgICAgIGlmICggY29uZmlnLmxheWVyc1tsXVtcImJhc2VMYXllclwiXSA9PSBcIlRydWVcIiApIHtcbiAgICAgICAgICAgICAgIGhhc0Jhc2VsYXllcnMgPSB0cnVlO1xuICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgfVxuICAgICAgICAgICB9XG4gICAgICAgICB9XG4gICAgICAgICAvLyBmb3IgbWluUmVzIGV2YWx1YXRpbmcgdG8gc2NhbGUgMTAwXG4gICAgICAgICAvLyB6b29tTGV2ZWxOdW1iZXIgaXMgZXF1YWwgdG8gMjRcbiAgICAgICAgIGlmICggaGFzQmFzZWxheWVycyApIHtcbiAgICAgICAgICAgY29uZmlnLm9wdGlvbnMuem9vbUxldmVsTnVtYmVyID0gMjQ7XG4gICAgICAgICB9XG5cbiAgICAgICAgIHZhciByZXNvbHV0aW9ucyA9IFtdO1xuICAgICAgICAgaWYgKHNjYWxlcy5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgICAgc2NhbGVzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgIHJldHVybiBOdW1iZXIoYikgLSBOdW1iZXIoYSk7XG4gICAgICAgICAgIH0pO1xuICAgICAgICAgICB2YXIgbWF4U2NhbGUgPSBzY2FsZXNbMF07XG4gICAgICAgICAgIHZhciBtYXhSZXMgPSBPcGVuTGF5ZXJzLlV0aWwuZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShtYXhTY2FsZSwgcHJvak9TTS5wcm9qLnVuaXRzKTtcbiAgICAgICAgICAgdmFyIG1pblNjYWxlID0gc2NhbGVzW3NjYWxlcy5sZW5ndGgtMV07XG4gICAgICAgICAgIHZhciBtaW5SZXMgPSBPcGVuTGF5ZXJzLlV0aWwuZ2V0UmVzb2x1dGlvbkZyb21TY2FsZShtaW5TY2FsZSwgcHJvak9TTS5wcm9qLnVuaXRzKTtcbiAgICAgICAgICAgdmFyIHJlcyA9IDE1NjU0My4wMzM5MDYyNTtcbiAgICAgICAgICAgdmFyIG4gPSAxO1xuICAgICAgICAgICB3aGlsZSAoIHJlcyA+IG1pblJlcyAmJiBuIDwgY29uZmlnLm9wdGlvbnMuem9vbUxldmVsTnVtYmVyKSB7XG4gICAgICAgICAgICAgaWYgKCByZXMgPCBtYXhSZXMgKSB7XG4gICAgICAgICAgICAgICAvL0FkZCBleHRyYSBzY2FsZVxuICAgICAgICAgICAgICAgcmVzb2x1dGlvbnMucHVzaChyZXMpO1xuICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICByZXMgPSByZXMvMjtcbiAgICAgICAgICAgICBuKys7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgbWF4UmVzID0gcmVzb2x1dGlvbnNbMF07XG4gICAgICAgICAgIG1pblJlcyA9IHJlc29sdXRpb25zW3Jlc29sdXRpb25zLmxlbmd0aC0xXTtcbiAgICAgICAgICAgLy9BZGQgZXh0cmEgc2NhbGVcbiAgICAgICAgICAgdmFyIG1heFNjYWxlID0gT3BlbkxheWVycy5VdGlsLmdldFNjYWxlRnJvbVJlc29sdXRpb24obWF4UmVzLCBwcm9qT1NNLnByb2oudW5pdHMpO1xuICAgICAgICAgICB2YXIgbWluU2NhbGUgPSBPcGVuTGF5ZXJzLlV0aWwuZ2V0U2NhbGVGcm9tUmVzb2x1dGlvbihtaW5SZXMsIHByb2pPU00ucHJvai51bml0cyk7XG4gICAgICAgICB9XG4gICAgICAgICBjb25maWcub3B0aW9uc1sncmVzb2x1dGlvbnMnXSA9IHJlc29sdXRpb25zO1xuXG4gICAgICAgICBpZiAocmVzb2x1dGlvbnMubGVuZ3RoICE9IDAgKSB7XG4gICAgICAgICAgIGNvbmZpZy5vcHRpb25zLnpvb21MZXZlbE51bWJlciA9IHJlc29sdXRpb25zLmxlbmd0aDtcbiAgICAgICAgICAgY29uZmlnLm9wdGlvbnMubWF4U2NhbGUgPSBtYXhTY2FsZTtcbiAgICAgICAgICAgY29uZmlnLm9wdGlvbnMubWluU2NhbGUgPSBtaW5TY2FsZTtcbiAgICAgICAgIH1cbiAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGdldExheWVyVHJlZVxuICAgKiBnZXQgdGhlIGxheWVyIHRyZWVcbiAgICogY3JlYXRlIE9wZW5MYXllcnMgV01TIGJhc2Ugb3Igbm90IGxheWVyIHs8T3BlbkxheWVycy5MYXllci5XTVM+fVxuICAgKiBwdXNoIHRoZXNlIGxheWVycyBpbiBsYXllcnMgb3IgYmFzZWxheWVyc1xuICAgKlxuICAgKiBQYXJhbWV0ZXJzOlxuICAgKiBuZXN0ZWQgLSB7T2JqZWN0fSBhIGNhcGFiaWxpdHkgbGF5ZXJcbiAgICogcE5vZGUgLSB7T2JqZWN0fSB0aGUgbmVzdGVkIHRyZWUgbm9kZVxuICAgKlxuICAgKiBEZXBlbmRlbmNpZXM6XG4gICAqIGNvbmZpZ1xuICAgKiBsYXllcnNcbiAgICogYmFzZWxheWVyc1xuICAgKi9cbiAgZnVuY3Rpb24gZ2V0TGF5ZXJUcmVlKG5lc3RlZCxwTm9kZSkge1xuICAgIHBOb2RlLmNoaWxkcmVuID0gW107XG5cbiAgICB2YXIgc2VydmljZSA9IE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQobGl6VXJscy53bXNcbiAgICAgICxPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVyU3RyaW5nKGxpelVybHMucGFyYW1zKVxuICAgICk7XG4gICAgaWYgKGxpelVybHMucHVibGljVXJsTGlzdCAmJiBsaXpVcmxzLnB1YmxpY1VybExpc3QubGVuZ3RoID4gMSApIHtcbiAgICAgICAgc2VydmljZSA9IFtdO1xuICAgICAgICBmb3IgKHZhciBqPTAsIGpsZW49bGl6VXJscy5wdWJsaWNVcmxMaXN0Lmxlbmd0aDsgajxqbGVuOyBqKyspIHtcbiAgICAgICAgICBzZXJ2aWNlLnB1c2goXG4gICAgICAgICAgICBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKFxuICAgICAgICAgICAgICBsaXpVcmxzLnB1YmxpY1VybExpc3Rbal0sXG4gICAgICAgICAgICAgIE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHZhciB3bXRzRm9ybWF0ID0gbmV3IE9wZW5MYXllcnMuRm9ybWF0LldNVFNDYXBhYmlsaXRpZXMoe30pO1xuXG4gICAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IG5lc3RlZC5uZXN0ZWRMYXllcnMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICB2YXIgc2VydmljZVVybCA9IHNlcnZpY2VcbiAgICAgIHZhciBsYXllciA9IG5lc3RlZC5uZXN0ZWRMYXllcnNbaV07XG4gICAgICB2YXIgcWdpc0xheWVyTmFtZSA9IGxheWVyLm5hbWU7XG4gICAgICBpZiAoICgndXNlTGF5ZXJJRHMnIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy51c2VMYXllcklEcyA9PSAnVHJ1ZScgKVxuICAgICAgICBxZ2lzTGF5ZXJOYW1lID0gbGF5ZXJJZE1hcFtsYXllci5uYW1lXTtcbiAgICAgIGVsc2UgaWYgKCBsYXllci5uYW1lIGluIHNob3J0TmFtZU1hcCApXG4gICAgICAgIHFnaXNMYXllck5hbWUgPSBzaG9ydE5hbWVNYXBbbGF5ZXIubmFtZV07XG4gICAgICB2YXIgbGF5ZXJDb25maWcgPSBjb25maWcubGF5ZXJzW3FnaXNMYXllck5hbWVdO1xuICAgICAgdmFyIGxheWVyTmFtZSA9IGNsZWFuTmFtZShxZ2lzTGF5ZXJOYW1lKTtcbiAgICAgIGxheWVyQ2xlYW5OYW1lc1tsYXllck5hbWVdID0gcWdpc0xheWVyTmFtZTtcblxuICAgICAgaWYgKCBxZ2lzTGF5ZXJOYW1lLnRvTG93ZXJDYXNlKCkgPT0gJ2hpZGRlbicgKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIGlmICggcWdpc0xheWVyTmFtZSA9PSAnT3ZlcnZpZXcnICkge1xuICAgICAgICBjb25maWcub3B0aW9ucy5oYXNPdmVydmlldyA9IHRydWU7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKCAhbGF5ZXJDb25maWcgKVxuICAgICAgICBjb250aW51ZTtcblxuICAgICAgaWYgKCBsYXllckNvbmZpZy5ncm91cEFzTGF5ZXIgPT0gJ1RydWUnIClcbiAgICAgICAgbGF5ZXJDb25maWcudHlwZSA9ICdsYXllcic7XG5cbiAgICAgIHZhciB3bXNTdHlsZXMgPSAkLm1hcChsYXllci5zdHlsZXMsIGZ1bmN0aW9uKCBzLCBpICl7XG4gICAgICAgICAgcmV0dXJuIHMubmFtZTtcbiAgICAgIH0pO1xuICAgICAgaWYgKCB3bXNTdHlsZXMubGVuZ3RoICE9IDAgKSB7XG4gICAgICAgICAgbGF5ZXJDb25maWcuc3R5bGVzID0gd21zU3R5bGVzO1xuICAgICAgfSBlbHNlIGlmICggJ3FnaXNTZXJ2ZXJWZXJzaW9uJyBpbiBjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy5xZ2lzU2VydmVyVmVyc2lvbi5zdGFydHNXaXRoKCczLicpICkge1xuICAgICAgICAgIGxheWVyQ29uZmlnLnN0eWxlcyA9IFsnJ107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxheWVyQ29uZmlnLnN0eWxlcyA9IFsnZGVmYXVsdCddO1xuICAgICAgfVxuICAgICAgLy8gaWYgdGhlIGxheWVyIGlzIG5vdCB0aGUgT3ZlcnZpZXcgYW5kIGhhZCBhIGNvbmZpZ1xuICAgICAgLy8gY3JlYXRpbmcgdGhlIHs8T3BlbkxheWVycy5MYXllci5XTVM+fSBhbmQgdGhlIHRyZWUgbm9kZVxuICAgICAgdmFyIG5vZGUgPSB7bmFtZTpsYXllck5hbWUsY29uZmlnOmxheWVyQ29uZmlnLHBhcmVudDpwTm9kZX07XG4gICAgICB2YXIgc3R5bGVzID0gKCdzdHlsZXMnIGluIGxheWVyQ29uZmlnKSA/IGxheWVyQ29uZmlnLnN0eWxlc1swXSA6ICdkZWZhdWx0JyA7XG4gICAgICBpZiggISggdHlwZW9mIGxpekxheWVyU3R5bGVzID09PSAndW5kZWZpbmVkJyApXG4gICAgICAgICYmIGxheWVyTmFtZSBpbiBsaXpMYXllclN0eWxlc1xuICAgICAgICAmJiBsaXpMYXllclN0eWxlc1sgbGF5ZXJOYW1lIF1cbiAgICAgICl7XG4gICAgICAgIHN0eWxlcyA9IGxpekxheWVyU3R5bGVzWyBsYXllck5hbWUgXTtcbiAgICAgIH1cbiAgICAgIHZhciBsYXllcldtc1BhcmFtcyA9IHtcbiAgICAgICAgICBsYXllcnM6bGF5ZXIubmFtZVxuICAgICAgICAgICxzdHlsZXM6IHN0eWxlc1xuICAgICAgICAgICx2ZXJzaW9uOicxLjMuMCdcbiAgICAgICAgICAsZXhjZXB0aW9uczonYXBwbGljYXRpb24vdm5kLm9nYy5zZV9pbmltYWdlJ1xuICAgICAgICAgICxmb3JtYXQ6KGxheWVyQ29uZmlnLmltYWdlRm9ybWF0KSA/IGxheWVyQ29uZmlnLmltYWdlRm9ybWF0IDogJ2ltYWdlL3BuZydcbiAgICAgICAgICAsZHBpOjk2XG4gICAgICB9O1xuICAgICAgaWYgKGxheWVyV21zUGFyYW1zLmZvcm1hdCAhPSAnaW1hZ2UvanBlZycpXG4gICAgICAgICAgbGF5ZXJXbXNQYXJhbXNbJ3RyYW5zcGFyZW50J10gPSB0cnVlO1xuXG4gICAgICAvL01hbmFnZSBhdHRyaWJ1dGlvblxuICAgICAgaWYgKHR5cGVvZiBsYXllci5hdHRyaWJ1dGlvbiA9PSBcIm9iamVjdFwiKSB7XG4gICAgICAgICAgLy8gVXBkYXRlIGhyZWYgaWYgbmVlZGVkXG4gICAgICAgICAgaWYgKCAnaHJlZicgaW4gbGF5ZXIuYXR0cmlidXRpb24gJiZcbiAgICAgICAgICAgICAgIGxheWVyLmF0dHJpYnV0aW9uLmhyZWYgIT0gJycgJiZcbiAgICAgICAgICAgICAgIGxheWVyLmF0dHJpYnV0aW9uLmhyZWYuaW5kZXhPZignOi8vJykgPT0gLTEpIHtcbiAgICAgICAgICAgIGxheWVyLmF0dHJpYnV0aW9uLmhyZWYgPSAnaHR0cDovLycrbGF5ZXIuYXR0cmlidXRpb24uaHJlZjtcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gVXBkYXRlIGF0dHJpYnV0aW9uXG4gICAgICAgICAgaWYgKCAhKCd0aXRsZScgaW4gbGF5ZXIuYXR0cmlidXRpb24pIHx8IGxheWVyLmF0dHJpYnV0aW9uLnRpdGxlID09ICcnICkge1xuICAgICAgICAgICAgICBsYXllci5hdHRyaWJ1dGlvbi50aXRsZSA9IGxheWVyLmF0dHJpYnV0aW9uLmhyZWYuc3BsaXQoJzovLycpWzFdO1xuICAgICAgICAgIH0gZWxzZVxuICAgICAgICAgIGlmICggISgnaHJlZicgaW4gbGF5ZXIuYXR0cmlidXRpb24pIHx8IGxheWVyLmF0dHJpYnV0aW9uLmhyZWYgPT0gJycgKSB7XG4gICAgICAgICAgICAgIGxheWVyLmF0dHJpYnV0aW9uID0gbGF5ZXIuYXR0cmlidXRpb24udGl0bGU7XG4gICAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICB2YXIgd210c0xheWVyID0gbnVsbDtcbiAgICAgIGlmICggbGF5ZXJDb25maWcuY2FjaGVkID09ICdUcnVlJyAmJiB3bXRzQ2FwYWJpbGl0aWVzICkge1xuICAgICAgICAgICQuZWFjaCh3bXRzQ2FwYWJpbGl0aWVzLmNvbnRlbnRzLmxheWVycywgZnVuY3Rpb24oaSwgbCkge1xuICAgICAgICAgICAgaWYgKCBsLmlkZW50aWZpZXIgIT0gbGF5ZXIubmFtZSlcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB2YXIgd210c09wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgbGF5ZXI6IGxheWVyLm5hbWUsXG4gICAgICAgICAgICAgICAgbWF0cml4U2V0OiBjb25maWcub3B0aW9ucy5wcm9qZWN0aW9uLnJlZixcbiAgICAgICAgICAgICAgICBuYW1lOiBsYXllck5hbWUsXG4gICAgICAgICAgICAgICAgcGFyYW1zOiBsYXllcldtc1BhcmFtcyxcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGlvbjpsYXllci5hdHRyaWJ1dGlvbixcbiAgICAgICAgICAgICAgICBpc0Jhc2VMYXllcjogKGxheWVyQ29uZmlnLmJhc2VMYXllciA9PSAnVHJ1ZScpLFxuICAgICAgICAgICAgICAgIGFsd2F5c0luUmFuZ2U6IGZhbHNlLFxuICAgICAgICAgICAgICAgIHVybDogc2VydmljZVVybFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICggJC5pbkFycmF5KCBjb25maWcub3B0aW9ucy5wcm9qZWN0aW9uLnJlZi50b1VwcGVyQ2FzZSgpLCBbJ0VQU0c6Mzg1NycsJ0VQU0c6OTAwOTEzJ10gKSAhPSAtMVxuICAgICAgICAgICAgICAmJiAoJ3Jlc29sdXRpb25zJyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgICAgICAgJiYgY29uZmlnLm9wdGlvbnMucmVzb2x1dGlvbnMubGVuZ3RoICE9IDAgKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc29sdXRpb25zID0gY29uZmlnLm9wdGlvbnMucmVzb2x1dGlvbnM7XG4gICAgICAgICAgICAgICAgdmFyIG1heFJlcyA9IHJlc29sdXRpb25zWzBdO1xuICAgICAgICAgICAgICAgIHZhciBudW1ab29tTGV2ZWxzID0gcmVzb2x1dGlvbnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciB6b29tT2Zmc2V0ID0gMDtcbiAgICAgICAgICAgICAgICB2YXIgcmVzID0gMTU2NTQzLjAzMzkwNjI1O1xuICAgICAgICAgICAgICAgIHdoaWxlICggcmVzID4gbWF4UmVzICkge1xuICAgICAgICAgICAgICAgICAgICB6b29tT2Zmc2V0ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIHJlcyA9IDE1NjU0My4wMzM5MDYyNSAvIE1hdGgucG93KDIsIHpvb21PZmZzZXQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3bXRzT3B0aW9uc1snem9vbU9mZnNldCddID0gem9vbU9mZnNldDtcbiAgICAgICAgICAgICAgICB3bXRzT3B0aW9uc1snbWF4UmVzb2x1dGlvbiddID0gbWF4UmVzO1xuICAgICAgICAgICAgICAgIHdtdHNPcHRpb25zWydudW1ab29tTGV2ZWxzJ10gPSBudW1ab29tTGV2ZWxzO1xuICAgICAgICAgICAgICAgIHdtdHNPcHRpb25zWydtaW5ab29tTGV2ZWwnXSA9IHpvb21PZmZzZXQ7XG4gICAgICAgICAgICAgICAgd210c09wdGlvbnNbJ3Jlc29sdXRpb25zJ10gPSByZXNvbHV0aW9ucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHdtdHNMYXllciA9IHdtdHNGb3JtYXQuY3JlYXRlTGF5ZXIod210c0NhcGFiaWxpdGllcywgd210c09wdGlvbnMpO1xuICAgICAgICAgICAgd210c0xheWVyLnl4ID0ge307XG4gICAgICAgICAgICB3bXRzTGF5ZXIucmV2ZXJzZUF4aXNPcmRlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHZhciBwcm9qQ29kZSA9IHRoaXMucHJvamVjdGlvbi5nZXRDb2RlKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoJzEuMy4wJykgPj0gMS4zICYmXG4gICAgICAgICAgICAgICAgICAgICEhKHRoaXMueXhbcHJvakNvZGVdIHx8IChPcGVuTGF5ZXJzLlByb2plY3Rpb24uZGVmYXVsdHNbcHJvakNvZGVdICYmXG4gICAgICAgICAgICAgICAgICAgIE9wZW5MYXllcnMuUHJvamVjdGlvbi5kZWZhdWx0c1twcm9qQ29kZV0ueXgpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIE92ZXJyaWRlIFdNUyB1cmwgaWYgZXh0ZXJuYWwgV01TIHNlcnZlclxuICAgICAgaWYgKCdleHRlcm5hbEFjY2VzcycgaW4gbGF5ZXJDb25maWcgJiYgbGF5ZXJDb25maWcuZXh0ZXJuYWxBY2Nlc3NcbiAgICAgICAmJiAnbGF5ZXJzJyBpbiBsYXllckNvbmZpZy5leHRlcm5hbEFjY2VzcyAmJiAndXJsJyBpbiBsYXllckNvbmZpZy5leHRlcm5hbEFjY2VzcyApIHtcbiAgICAgICAgICB2YXIgZXh0Q29uZmlnID0gbGF5ZXJDb25maWcuZXh0ZXJuYWxBY2Nlc3M7XG4gICAgICAgICAgZXh0Q29uZmlnLmxheWVycyA9IGRlY29kZVVSSShleHRDb25maWcubGF5ZXJzKTtcbiAgICAgICAgICBzZXJ2aWNlVXJsID0gZXh0Q29uZmlnLnVybDtcbiAgICAgICAgICBsYXllcldtc1BhcmFtcyA9IHtcbiAgICAgICAgICAgIGxheWVyczogZXh0Q29uZmlnLmxheWVyc1xuICAgICAgICAgICAgLHN0eWxlczooZXh0Q29uZmlnLnN0eWxlcykgPyBleHRDb25maWcuc3R5bGVzIDogJydcbiAgICAgICAgICAgICxjcnM6KGV4dENvbmZpZy5jcnMpID8gZXh0Q29uZmlnLmNycyA6ICdFUFNHOjM4NTcnXG4gICAgICAgICAgICAsZm9ybWF0OihleHRDb25maWcuZm9ybWF0KSA/IGV4dENvbmZpZy5mb3JtYXQgOiAnaW1hZ2UvcG5nJ1xuICAgICAgICAgICAgLHRyYW5zcGFyZW50OihleHRDb25maWcudHJhbnNwYXJlbnQpID8gZXh0Q29uZmlnLnRyYW5zcGFyZW50IDogJ3RydWUnXG4gICAgICAgICAgICAsZXhjZXB0aW9uczonYXBwbGljYXRpb24vdm5kLm9nYy5zZV9pbmltYWdlJ1xuICAgICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgICAvLyBBZGQgb3B0aW9ubmFsIGZpbHRlciBhdCBzdGFydFxuICAgICAgICBpZiggISggdHlwZW9mIGxpekxheWVyRmlsdGVyID09PSAndW5kZWZpbmVkJyApXG4gICAgICAgICAgJiYgcWdpc0xheWVyTmFtZSBpbiBsaXpMYXllckZpbHRlclxuICAgICAgICAgICYmIGxpekxheWVyRmlsdGVyWyBxZ2lzTGF5ZXJOYW1lIF1cbiAgICAgICAgKXtcbiAgICAgICAgICBsYXllcldtc1BhcmFtc1snRklMVEVSJ10gPSBxZ2lzTGF5ZXJOYW1lKyc6JytsaXpMYXllckZpbHRlclsgcWdpc0xheWVyTmFtZSBdO1xuICAgICAgICB9XG5cbiAgICAgIGlmIChsYXllckNvbmZpZy5iYXNlTGF5ZXIgPT0gJ1RydWUnICYmIHdtdHNMYXllciAhPSBudWxsKSB7XG4gICAgICAgICAgLy8gY3JlYXRpbmcgdGhlIGJhc2UgbGF5ZXJcbiAgICAgICAgICBiYXNlbGF5ZXJzLnB1c2goIHdtdHNMYXllciApO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAobGF5ZXJDb25maWcudHlwZSA9PSAnbGF5ZXInICYmIHdtdHNMYXllciAhPSBudWxsKSB7XG4gICAgICAgICAgd210c0xheWVyLm9wdGlvbnMubWluU2NhbGUgPSBsYXllckNvbmZpZy5tYXhTY2FsZTtcbiAgICAgICAgICB3bXRzTGF5ZXIub3B0aW9ucy5tYXhTY2FsZSA9KGxheWVyQ29uZmlnLm1pblNjYWxlICE9IG51bGwgJiYgbGF5ZXJDb25maWcubWluU2NhbGUgPCAxKSA/IDEgOiBsYXllckNvbmZpZy5taW5TY2FsZTtcbiAgICAgICAgICBpZiAoIGxheWVyLm5lc3RlZExheWVycy5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgICAgICAgdmFyIHNjYWxlcyA9IGdldExheWVyU2NhbGUobGF5ZXIsbnVsbCxudWxsKTtcbiAgICAgICAgICAgICAgd210c0xheWVyLm9wdGlvbnMubWluU2NhbGUgPSBzY2FsZXMubWF4U2NhbGU7XG4gICAgICAgICAgICAgIHdtdHNMYXllci5vcHRpb25zLm1heFNjYWxlID0gc2NhbGVzLm1pblNjYWxlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB3bXRzTGF5ZXIuaXNWaXNpYmxlID0gKGxheWVyQ29uZmlnLnRvZ2dsZWQ9PSdUcnVlJyk7XG4gICAgICAgICAgd210c0xheWVyLnZpc2liaWxpdHkgPSBmYWxzZTtcbiAgICAgICAgICB3bXRzTGF5ZXIudHJhbnNpdGlvbkVmZmVjdCA9IG51bGw7XG4gICAgICAgICAgd210c0xheWVyLnJlbW92ZUJhY2tCdWZmZXJEZWxheSA9IDI1MDtcbiAgICAgICAgICB3bXRzTGF5ZXIub3JkZXIgPSBnZXRMYXllck9yZGVyKGxheWVyKTtcbiAgICAgICAgICBsYXllcnMucHVzaCggd210c0xheWVyICk7XG4gICAgICB9XG4gICAgICBlbHNlIGlmIChsYXllckNvbmZpZy5iYXNlTGF5ZXIgPT0gJ1RydWUnKSB7XG4gICAgICAgIC8vIGNyZWF0aW5nIHRoZSBiYXNlIGxheWVyXG4gICAgICAgICAgYmFzZWxheWVycy5wdXNoKG5ldyBPcGVuTGF5ZXJzLkxheWVyLldNUyhsYXllck5hbWUsc2VydmljZVVybFxuICAgICAgICAgICAgICAsbGF5ZXJXbXNQYXJhbXNcbiAgICAgICAgICAgICAgLHtpc0Jhc2VMYXllcjp0cnVlXG4gICAgICAgICAgICAgICAsZ3V0dGVyOihsYXllckNvbmZpZy5jYWNoZWQgPT0gJ1RydWUnKSA/IDAgOiA1XG4gICAgICAgICAgICAgICAsYnVmZmVyOjBcbiAgICAgICAgICAgICAgICxzaW5nbGVUaWxlOihsYXllckNvbmZpZy5zaW5nbGVUaWxlID09ICdUcnVlJylcbiAgICAgICAgICAgICAgICxyYXRpbzoxXG4gICAgICAgICAgICAgICAsYXR0cmlidXRpb246bGF5ZXIuYXR0cmlidXRpb25cbiAgICAgICAgICAgICAgfSkpO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiAobGF5ZXJDb25maWcudHlwZSA9PSAnbGF5ZXInKSB7XG4gICAgICAgICAgdmFyIHdtc0xheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuV01TKGxheWVyTmFtZSxzZXJ2aWNlVXJsXG4gICAgICAgICAgICAgICxsYXllcldtc1BhcmFtc1xuICAgICAgICAgICAgICAse2lzQmFzZUxheWVyOmZhbHNlXG4gICAgICAgICAgICAgICAsbWluU2NhbGU6bGF5ZXJDb25maWcubWF4U2NhbGVcbiAgICAgICAgICAgICAgICxtYXhTY2FsZToobGF5ZXJDb25maWcubWluU2NhbGUgIT0gbnVsbCAmJiBsYXllckNvbmZpZy5taW5TY2FsZSA8IDEpID8gMSA6IGxheWVyQ29uZmlnLm1pblNjYWxlXG4gICAgICAgICAgICAgICAsaXNWaXNpYmxlOihsYXllckNvbmZpZy50b2dnbGVkPT0nVHJ1ZScpXG4gICAgICAgICAgICAgICAsdmlzaWJpbGl0eTpmYWxzZVxuICAgICAgICAgICAgICAgLGd1dHRlcjoobGF5ZXJDb25maWcuY2FjaGVkID09ICdUcnVlJykgPyAwIDogNVxuICAgICAgICAgICAgICAgLGJ1ZmZlcjowXG4gICAgICAgICAgICAgICAsdHJhbnNpdGlvbkVmZmVjdDoobGF5ZXJDb25maWcuc2luZ2xlVGlsZSA9PSAnVHJ1ZScpPydyZXNpemUnOm51bGxcbiAgICAgICAgICAgICAgICxyZW1vdmVCYWNrQnVmZmVyRGVsYXk6MjUwXG4gICAgICAgICAgICAgICAsc2luZ2xlVGlsZToobGF5ZXJDb25maWcuc2luZ2xlVGlsZSA9PSAnVHJ1ZScgfHwgKGxheWVyQ29uZmlnLmNhY2hlZCA9PSAnVHJ1ZScgJiYgIXdtdHNDYXBhYmlsaXRpZXMpKVxuICAgICAgICAgICAgICAgLHJhdGlvOjFcbiAgICAgICAgICAgICAgICxvcmRlcjpnZXRMYXllck9yZGVyKGxheWVyKVxuICAgICAgICAgICAgICAgLGF0dHJpYnV0aW9uOmxheWVyLmF0dHJpYnV0aW9uXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmICggbGF5ZXIubmVzdGVkTGF5ZXJzLmxlbmd0aCAhPSAwICkge1xuICAgICAgICAgICAgICB2YXIgc2NhbGVzID0gZ2V0TGF5ZXJTY2FsZShsYXllcixudWxsLG51bGwpO1xuICAgICAgICAgICAgICB3bXNMYXllci5taW5TY2FsZSA9IHNjYWxlcy5tYXhTY2FsZTtcbiAgICAgICAgICAgICAgd21zTGF5ZXIub3B0aW9ucy5taW5TY2FsZSA9IHNjYWxlcy5tYXhTY2FsZTtcbiAgICAgICAgICAgICAgd21zTGF5ZXIubWF4U2NhbGUgPSBzY2FsZXMubWluU2NhbGU7XG4gICAgICAgICAgICAgIHdtc0xheWVyLm9wdGlvbnMubWF4U2NhbGUgPSBzY2FsZXMubWluU2NhbGU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxheWVycy5wdXNoKCB3bXNMYXllciApO1xuICAgICAgfVxuICAgICAgLy8gY3JlYXRpbmcgdGhlIGxheWVyIHRyZWUgYmVjYXVzZSBpdCdzIGEgZ3JvdXAsIGhhcyBjaGlsZHJlbiBhbmQgaXMgbm90IGEgYmFzZSBsYXllclxuICAgICAgaWYgKGxheWVyQ29uZmlnLnR5cGUgPT0gJ2dyb3VwJyAmJiBsYXllci5uZXN0ZWRMYXllcnMubGVuZ3RoICE9IDAgJiYgbGF5ZXJDb25maWcuYmFzZUxheWVyID09ICdGYWxzZScpXG4gICAgICAgICAgZ2V0TGF5ZXJUcmVlKGxheWVyLG5vZGUpO1xuICAgICAgaWYgKGxheWVyQ29uZmlnLmJhc2VMYXllciAhPSAnVHJ1ZScpXG4gICAgICAgICAgcE5vZGUuY2hpbGRyZW4ucHVzaChub2RlKTtcblxuICAgICAgLy8gQWRkIGJib3ggZnJvbSBXTVMgZGF0YSBpbnRvIGxpem1hcCBjb25maWd1cmF0aW9uICh1c2VkIGJ5IHN3aXRjaGVyLWxheWVycy1hY3Rpb25zXG4gICAgICBsYXllckNvbmZpZy5iYm94ID0gbGF5ZXIuYmJveDtcblxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBhbmFseXNlTm9kZVxuICAgKiBhbmFseXNlIE5vZGUgQ29uZmlnXG4gICAqIGRlZmluZSBpZiB0aGUgbm9kZSBoYXMgdG8gYmUgYSBjaGlsZCBvZiBoaXMgcGFyZW50IG5vZGVcbiAgICpcbiAgICogUGFyYW1ldGVyczpcbiAgICogYU5vZGUgLSB7T2JqZWN0fSBhIG5vZGUgY29uZmlnXG4gICAqXG4gICAqIFJldHVybnM6XG4gICAqIHtCb29sZWFufSBtYWludGFpbnMgdGhlIG5vZGUgaW4gdGhlIHRyZWVcbiAgICovXG4gIGZ1bmN0aW9uIGFuYWx5c2VOb2RlKGFOb2RlKSB7XG4gICAgdmFyIG5vZGVDb25maWcgPSBhTm9kZS5jb25maWc7XG4gICAgaWYgKG5vZGVDb25maWcudHlwZSA9PSAnbGF5ZXInICYmIG5vZGVDb25maWcuYmFzZUxheWVyICE9ICdUcnVlJylcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIGVsc2UgaWYgKG5vZGVDb25maWcudHlwZSA9PSAnbGF5ZXInKVxuICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgaWYgKCEoJ2NoaWxkcmVuJyBpbiBhTm9kZSkpXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgdmFyIGNoaWxkcmVuID0gYU5vZGUuY2hpbGRyZW47XG4gICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xuICAgIHZhciByZW1vdmVJZHggPSBbXTtcbiAgICBmb3IgKHZhciBpPTAsIGxlbj1jaGlsZHJlbi5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgdmFyIGFuYWx5c2UgPSBhbmFseXNlTm9kZShjaGlsZCk7XG4gICAgICBpZiAoIWFuYWx5c2UpXG4gICAgICAgIHJlbW92ZUlkeC5wdXNoKGkpO1xuICAgICAgcmVzdWx0ID0gKHJlc3VsdCB8fCBhbmFseXNlKTtcbiAgICB9XG4gICAgcmVtb3ZlSWR4LnJldmVyc2UoKTtcbiAgICBmb3IgKHZhciBpPTAsIGxlbj1yZW1vdmVJZHgubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICBjaGlsZHJlbi5zcGxpY2UocmVtb3ZlSWR4W2ldLDEpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGdldFN3aXRjaGVyTGluZVxuICAgKiBnZXQgdGhlIGh0bWwgdGFibGUgbGluZSA8dHI+IG9mIGEgY29uZmlnIG5vZGUgZm9yIHRoZSBzd2l0Y2hlclxuICAgKlxuICAgKiBQYXJhbWV0ZXJzOlxuICAgKiBhTm9kZSAtIHtPYmplY3R9IGEgY29uZmlnIG5vZGVcbiAgICpcbiAgICogUmV0dXJuczpcbiAgICoge1N0cmluZ30gdGhlIDx0cj4gaHRtbCBjb3JyZXNwb25kaW5nIHRvIHRoZSBub2RlXG4gICAqL1xuICBmdW5jdGlvbiBnZXRTd2l0Y2hlckxpbmUoYU5vZGUsIGFQYXJlbnQpIHtcbiAgICB2YXIgaHRtbCA9ICcnO1xuICAgIHZhciBub2RlQ29uZmlnID0gYU5vZGUuY29uZmlnO1xuICAgIHZhciBwYXJlbnRDb25maWcgPSBudWxsO1xuXG4gICAgaWYoIGFQYXJlbnQgKXtcbiAgICAgIHBhcmVudENvbmZpZyA9IGFQYXJlbnQuY29uZmlnO1xuICAgIH1cblxuICAgIGlmKCAnZ2VvbWV0cnlUeXBlJyBpbiBub2RlQ29uZmlnICYmXG4gICAgICAgICggbm9kZUNvbmZpZy5nZW9tZXRyeVR5cGUgPT0gXCJub25lXCIgfHwgbm9kZUNvbmZpZy5nZW9tZXRyeVR5cGUgPT0gXCJ1bmtub3duXCIgfHwgbm9kZUNvbmZpZy5nZW9tZXRyeVR5cGUgPT0gXCJcIiApXG4gICAgKXtcbiAgICAgIG5vZGVDb25maWcuZGlzcGxheUluTGVnZW5kID0gJ0ZhbHNlJztcbiAgICB9XG5cbiAgICBodG1sICs9ICc8dHIgaWQ9XCInK25vZGVDb25maWcudHlwZSsnLScrYU5vZGUubmFtZSsnXCInO1xuICAgIGh0bWwgKz0gJyBjbGFzcz1cImxpei0nK25vZGVDb25maWcudHlwZTtcbiAgICBpZiAoYVBhcmVudCl7XG4gICAgICBodG1sICs9ICcgY2hpbGQtb2YtZ3JvdXAtJythUGFyZW50Lm5hbWU7XG4gICAgfVxuICAgIGlmICgoJ2NoaWxkcmVuJyBpbiBhTm9kZSkgJiYgYU5vZGVbJ2NoaWxkcmVuJ10ubGVuZ3RoIT0wKXtcbiAgICAgIGh0bWwgKz0gJyBleHBhbmRlZCBwYXJlbnQnO1xuICAgIH1cbiAgICBpZiAoKCdkaXNwbGF5SW5MZWdlbmQnIGluIG5vZGVDb25maWcgJiYgbm9kZUNvbmZpZy5kaXNwbGF5SW5MZWdlbmQgPT0gJ0ZhbHNlJykgfHxcbiAgICAgICAgKHBhcmVudENvbmZpZyAmJiAnZGlzcGxheUluTGVnZW5kJyBpbiBwYXJlbnRDb25maWcgJiYgcGFyZW50Q29uZmlnLmRpc3BsYXlJbkxlZ2VuZCA9PSAnRmFsc2UnKSl7XG4gICAgICBodG1sICs9ICcgbGl6LWhpZGRlbic7XG4gICAgfVxuICAgIGlmICggcGFyZW50Q29uZmlnICYmICdtdXR1YWxseUV4Y2x1c2l2ZScgaW4gcGFyZW50Q29uZmlnICYmIHBhcmVudENvbmZpZy5tdXR1YWxseUV4Y2x1c2l2ZSA9PSAnVHJ1ZScgKXtcbiAgICAgIGh0bWwgKz0gJyBtdXR1YWxseS1leGNsdXNpdmUnO1xuICAgIH1cblxuICAgIGh0bWwgKz0gJ1wiPic7XG5cbiAgICBmdW5jdGlvbiB0cnVuY2F0ZVdpdGhFbGxpcHNpcyhzdHIsbil7XG4gICAgICByZXR1cm4gKHN0ci5sZW5ndGggPiBuKSA/IHN0ci5zdWJzdHIoMCxuLTEpKycmaGVsbGlwOycgOiBzdHI7XG4gICAgfTtcblxuICAgIGh0bWwgKz0gJzx0ZD48YnV0dG9uIGNsYXNzPVwiYnRuIGNoZWNrYm94XCIgbmFtZT1cIicrbm9kZUNvbmZpZy50eXBlKydcIiB2YWx1ZT1cIicrYU5vZGUubmFtZSsnXCIgdGl0bGU9XCInK2xpekRpY3RbJ3RyZWUuYnV0dG9uLmNoZWNrYm94J10rJ1wiPjwvYnV0dG9uPic7XG4gICAgaHRtbCArPSAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiIHRpdGxlPVwiJyt0cnVuY2F0ZVdpdGhFbGxpcHNpcygkKCc8ZGl2Picrbm9kZUNvbmZpZy5hYnN0cmFjdCsnPC9kaXY+JykudGV4dCgpLDUwKSsnXCI+Jytub2RlQ29uZmlnLnRpdGxlKyc8L3NwYW4+JztcbiAgICBodG1sICs9ICc8L3RkPic7XG5cbiAgICBodG1sICs9ICc8dGQ+JztcbiAgICBpZiAobm9kZUNvbmZpZy50eXBlID09ICdsYXllcicpe1xuICAgICAgaHRtbCArPSAnPHNwYW4gY2xhc3M9XCJsb2FkaW5nXCI+Jm5ic3A7PC9zcGFuPic7XG4gICAgfVxuICAgIGh0bWwgKz0gJzwvdGQ+JztcblxuICAgIHZhciBsZWdlbmRMaW5rID0gJyc7XG4gICAgaWYgKG5vZGVDb25maWcubGluayl7XG4gICAgICBsZWdlbmRMaW5rID0gbm9kZUNvbmZpZy5saW5rO1xuICAgIH1cbiAgICBpZiAobGVnZW5kTGluayAhPSAnJyApe1xuICAgICAgaHRtbCArPSAnPHRkPjxidXR0b24gY2xhc3M9XCJidG4gbGlua1wiIG5hbWU9XCJsaW5rXCIgdGl0bGU9XCInK2xpekRpY3RbJ3RyZWUuYnV0dG9uLmxpbmsnXSsnXCIgdmFsdWU9XCInK2xlZ2VuZExpbmsrJ1wiLz48L3RkPic7XG4gICAgfVxuICAgIGVsc2V7XG4gICAgICBodG1sICs9ICc8dGQ+PC90ZD4nO1xuICAgIH1cblxuICAgIHZhciByZW1vdmVDYWNoZSA9ICcnO1xuICAgIGlmIChub2RlQ29uZmlnLmNhY2hlZCAmJiBub2RlQ29uZmlnLmNhY2hlZCA9PSAnVHJ1ZScgJiYgbm9kZUNvbmZpZy50eXBlID09ICdsYXllcicgJiYgKCdyZW1vdmVDYWNoZScgaW4gY29uZmlnLm9wdGlvbnMpKXtcbiAgICAgIGh0bWwgKz0gJzx0ZD48YnV0dG9uIGNsYXNzPVwiYnRuIHJlbW92ZUNhY2hlXCIgbmFtZT1cInJlbW92ZUNhY2hlXCIgdGl0bGU9XCInK2xpekRpY3RbJ3RyZWUuYnV0dG9uLnJlbW92ZUNhY2hlJ10rJ1wiIHZhbHVlPVwiJythTm9kZS5uYW1lKydcIi8+PC90ZD4nO1xuICAgIH1cbiAgICBlbHNle1xuICAgICAgaHRtbCArPSAnPHRkPjwvdGQ+JztcbiAgICB9XG5cbiAgICBodG1sICs9ICc8L3RyPic7XG5cbiAgICBpZiAobm9kZUNvbmZpZy50eXBlID09ICdsYXllcidcbiAgICAmJiAoIW5vZGVDb25maWcubm9MZWdlbmRJbWFnZSB8fCBub2RlQ29uZmlnLm5vTGVnZW5kSW1hZ2UgIT0gJ1RydWUnKVxuICAgICYmICgnZGlzcGxheUluTGVnZW5kJyBpbiBub2RlQ29uZmlnICYmIG5vZGVDb25maWcuZGlzcGxheUluTGVnZW5kID09ICdUcnVlJykpIHtcbiAgICAgIHZhciB1cmwgPSBnZXRMYXllckxlZ2VuZEdyYXBoaWNVcmwoYU5vZGUubmFtZSwgZmFsc2UpO1xuICAgICAgaWYgKCB1cmwgIT0gbnVsbCAmJiB1cmwgIT0gJycgKSB7XG4gICAgICAgIGh0bWwgKz0gJzx0ciBpZD1cImxlZ2VuZC0nK2FOb2RlLm5hbWUrJ1wiIGNsYXNzPVwiY2hpbGQtb2YtbGF5ZXItJythTm9kZS5uYW1lKycgbGVnZW5kR3JhcGhpY3NcIj4nO1xuICAgICAgICBodG1sICs9ICc8dGQgY29sc3Bhbj1cIjJcIj48ZGl2IGNsYXNzPVwibGVnZW5kR3JhcGhpY3NcIj4nO1xuICAgICAgICBodG1sICs9ICc8aW1nIGRhdGEtc3JjPVwiJyt1cmwrJ1wiIHNyYz1cIicrbGl6VXJscy5iYXNlcGF0aCArICdjc3MvaW1hZ2VzL2Rvd25sb2FkX2xheWVyLmdpZicgKyAnXCIvPic7XG4gICAgICAgIGh0bWwgKz0gJzwvZGl2PjwvdGQ+JztcbiAgICAgICAgaHRtbCArPSAnPC90cj4nO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBodG1sO1xuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IGdldFN3aXRjaGVyTm9kZVxuICAgKiBnZXQgdGhlIGh0bWwgb2YgYSBjb25maWcgbm9kZSBmb3IgdGhlIHN3aXRjaGVyXG4gICAqXG4gICAqIFBhcmFtZXRlcnM6XG4gICAqIGFOb2RlIC0ge09iamVjdH0gYSBjb25maWcgbm9kZVxuICAgKlxuICAgKiBSZXR1cm5zOlxuICAgKiB7U3RyaW5nfSB0aGUgaHRtbCBjb3JyZXNwb25kaW5nIHRvIHRoZSBub2RlXG4gICAqL1xuICBmdW5jdGlvbiBnZXRTd2l0Y2hlck5vZGUoYU5vZGUsYUxldmVsKSB7XG4gICAgdmFyIGh0bWwgPSAnJztcbiAgICBpZiAoYUxldmVsID09IDApIHtcbiAgICAgIGh0bWwgKz0gJzxkaXYgY2xhc3M9XCJ3aXRob3V0LWJsb2NrcyBuby1ncm91cFwiPic7XG4gICAgICBodG1sICs9ICc8dGFibGUgY2xhc3M9XCJ0cmVlXCI+JztcbiAgICB9XG5cbiAgICB2YXIgY2hpbGRyZW4gPSBhTm9kZS5jaGlsZHJlbjtcbiAgICBmb3IgKHZhciBpPTAsIGxlbj1jaGlsZHJlbi5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgIHZhciBjaGlsZCA9IGNoaWxkcmVuW2ldO1xuICAgICAgaWYgKGFMZXZlbCA9PSAwKVxuICAgICAgICBodG1sICs9IGdldFN3aXRjaGVyTGluZShjaGlsZCk7XG4gICAgICBlbHNlXG4gICAgICAgIGh0bWwgKz0gZ2V0U3dpdGNoZXJMaW5lKGNoaWxkLGFOb2RlKTtcblxuICAgICAgaWYgKCgnY2hpbGRyZW4nIGluIGNoaWxkKSAmJiBjaGlsZFsnY2hpbGRyZW4nXS5sZW5ndGghPTApXG4gICAgICAgIGh0bWwgKz0gZ2V0U3dpdGNoZXJOb2RlKGNoaWxkLCBhTGV2ZWwrMSk7XG4gICAgfVxuXG4gICAgaWYgKGFMZXZlbCA9PSAwKSB7XG4gICAgICBodG1sICs9ICc8L3RhYmxlPic7XG4gICAgICBodG1sICs9ICc8L2Rpdj4nO1xuICAgIH1cbiAgICByZXR1cm4gaHRtbDtcbiAgfVxuXG4gIGZ1bmN0aW9uIGluaXRQcm9qZWN0aW9ucyhmaXJzdExheWVyKSB7XG4gICAgLy8gSW5zZXJ0IG9yIHVwZGF0ZSBwcm9qZWN0aW9uIGxpc3RlXG4gICAgaWYgKCBsaXpQcm9qNCApIHtcbiAgICAgICAgZm9yKCB2YXIgcmVmIGluIGxpelByb2o0ICkge1xuICAgICAgICAgICAgaWYgKCAhKHJlZiBpbiBQcm9qNGpzLmRlZnMpICkge1xuICAgICAgICAgICAgICBQcm9qNGpzLmRlZnNbcmVmXT1saXpQcm9qNFtyZWZdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8vIGdldCBhbmQgZGVmaW5lIHByb2plY3Rpb25cbiAgICB2YXIgcHJvaiA9IGNvbmZpZy5vcHRpb25zLnByb2plY3Rpb247XG4gICAgaWYgKCAhKHByb2oucmVmIGluIFByb2o0anMuZGVmcykgKVxuICAgICAgUHJvajRqcy5kZWZzW3Byb2oucmVmXT1wcm9qLnByb2o0O1xuICAgIHZhciBwcm9qZWN0aW9uID0gbmV3IE9wZW5MYXllcnMuUHJvamVjdGlvbihwcm9qLnJlZik7XG5cbiAgICBpZiAoICEocHJvai5yZWYgaW4gT3BlbkxheWVycy5Qcm9qZWN0aW9uLmRlZmF1bHRzKSApIHtcbiAgICAgICAgT3BlbkxheWVycy5Qcm9qZWN0aW9uLmRlZmF1bHRzW3Byb2oucmVmXSA9IHByb2plY3Rpb247XG5cbiAgICAgICAgLy8gdGVzdCBleHRlbnQgZm9yIGludmVydGVkIGF4aXNcbiAgICAgICAgaWYgKCBwcm9qLnJlZiBpbiBmaXJzdExheWVyLmJib3ggKSB7XG4gICAgICAgICAgICB2YXIgd21zQmJveCA9IGZpcnN0TGF5ZXIuYmJveFtwcm9qLnJlZl0uYmJveDtcbiAgICAgICAgICAgIHZhciB3bXNCb3VuZHMgPSBPcGVuTGF5ZXJzLkJvdW5kcy5mcm9tQXJyYXkoIHdtc0Jib3ggKTtcbiAgICAgICAgICAgIHZhciBpbml0Qm91bmRzID0gT3BlbkxheWVycy5Cb3VuZHMuZnJvbUFycmF5KCBjb25maWcub3B0aW9ucy5pbml0aWFsRXh0ZW50ICk7XG4gICAgICAgICAgICBpZiAoICFpbml0Qm91bmRzLmludGVyc2VjdHNCb3VuZHMoIHdtc0JvdW5kcyApIClcbiAgICAgICAgICAgICAgICBPcGVuTGF5ZXJzLlByb2plY3Rpb24uZGVmYXVsdHNbcHJvai5yZWZdLnl4ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBjcmVhdGVNYXBcbiAgICogY3JlYXRpbmcgdGhlIG1hcCB7PE9wZW5MYXllcnMuTWFwPn1cbiAgICovXG4gIGZ1bmN0aW9uIGNyZWF0ZU1hcCgpIHtcbiAgICAvLyBnZXQgcHJvamVjdGlvblxuICAgIHZhciBwcm9qID0gY29uZmlnLm9wdGlvbnMucHJvamVjdGlvbjtcbiAgICB2YXIgcHJvamVjdGlvbiA9IG5ldyBPcGVuTGF5ZXJzLlByb2plY3Rpb24ocHJvai5yZWYpO1xuXG4gICAgLy8gZ2V0IGFuZCBkZWZpbmUgdGhlIG1heCBleHRlbnRcbiAgICB2YXIgYmJveCA9IGNvbmZpZy5vcHRpb25zLmJib3g7XG4gICAgdmFyIGV4dGVudCA9IG5ldyBPcGVuTGF5ZXJzLkJvdW5kcyhOdW1iZXIoYmJveFswXSksTnVtYmVyKGJib3hbMV0pLE51bWJlcihiYm94WzJdKSxOdW1iZXIoYmJveFszXSkpO1xuXG4gICAgdmFyIHJlc3RyaWN0ZWRFeHRlbnQgPSBleHRlbnQuc2NhbGUoMyk7XG4gICAgdmFyIGluaXRpYWxFeHRlbnQgPSBleHRlbnQuY2xvbmUoKTtcbiAgICBpZiAoICdpbml0aWFsRXh0ZW50JyBpbiBjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy5pbml0aWFsRXh0ZW50Lmxlbmd0aCA9PSA0ICkge1xuICAgICAgdmFyIGluaXRCYm94ID0gY29uZmlnLm9wdGlvbnMuaW5pdGlhbEV4dGVudDtcbiAgICAgIGluaXRpYWxFeHRlbnQgPSBuZXcgT3BlbkxheWVycy5Cb3VuZHMoTnVtYmVyKGluaXRCYm94WzBdKSxOdW1iZXIoaW5pdEJib3hbMV0pLE51bWJlcihpbml0QmJveFsyXSksTnVtYmVyKGluaXRCYm94WzNdKSk7XG4gICAgfVxuXG4gICAgLy8gY2FsY3VsYXRlIHRoZSBtYXAgaGVpZ2h0XG4gICAgdmFyIG1hcEhlaWdodCA9ICQoJ2JvZHknKS5wYXJlbnQoKVswXS5jbGllbnRIZWlnaHQ7XG4gICAgaWYoIW1hcEhlaWdodClcbiAgICAgICAgbWFwSGVpZ2h0ID0gJCgnd2luZG93JykuaW5uZXJIZWlnaHQoKTtcbiAgICBtYXBIZWlnaHQgPSBtYXBIZWlnaHQgLSAkKCcjaGVhZGVyJykuaGVpZ2h0KCk7XG4gICAgbWFwSGVpZ2h0ID0gbWFwSGVpZ2h0IC0gJCgnI2hlYWRlcm1lbnUnKS5oZWlnaHQoKTtcbiAgICAkKCcjbWFwJykuaGVpZ2h0KG1hcEhlaWdodCk7XG5cbiAgICAvLyBNYWtlIHN1cmUgaW50ZXJmYWNlIGRpdnMgc2l6ZSBhcmUgdXBkYXRlZCBiZWZvcmUgY3JlYXRpbmcgdGhlIG1hcFxuICAgIC8vIFRoaXMgYXZvaWQgdGhlIHJlcXVlc3Qgb2YgZWFjaCBzaW5nbGV0dGlsZSBsYXllciAyIHRpbWVzIG9uIHN0YXJ0dXBcbiAgICB1cGRhdGVDb250ZW50U2l6ZSgpO1xuXG4gICAgdmFyIHJlcyA9IGV4dGVudC5nZXRIZWlnaHQoKS8kKCcjbWFwJykuaGVpZ2h0KCk7XG5cbiAgICB2YXIgc2NhbGVzID0gW107XG4gICAgdmFyIHJlc29sdXRpb25zID0gW107XG4gICAgaWYgKCdyZXNvbHV0aW9ucycgaW4gY29uZmlnLm9wdGlvbnMpXG4gICAgICByZXNvbHV0aW9ucyA9IGNvbmZpZy5vcHRpb25zLnJlc29sdXRpb25zO1xuICAgIGVsc2UgaWYgKCdtYXBTY2FsZXMnIGluIGNvbmZpZy5vcHRpb25zKVxuICAgICAgc2NhbGVzID0gY29uZmlnLm9wdGlvbnMubWFwU2NhbGVzO1xuICAgIHNjYWxlcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHJldHVybiBOdW1iZXIoYikgLSBOdW1iZXIoYSk7XG4gICAgfSk7XG4gICAgLy8gcmVtb3ZlIGR1cGxpY2F0ZSBzY2FsZXNcbiAgICBuU2NhbGVzID0gW107XG4gICAgd2hpbGUgKHNjYWxlcy5sZW5ndGggIT0gMCl7XG4gICAgICB2YXIgc2NhbGUgPSBzY2FsZXMucG9wKDApO1xuICAgICAgaWYgKCQuaW5BcnJheSggc2NhbGUsIG5TY2FsZXMgKSA9PSAtMSApXG4gICAgICAgIG5TY2FsZXMucHVzaCggc2NhbGUgKTtcbiAgICB9XG4gICAgc2NhbGVzID0gblNjYWxlcztcblxuXG4gICAgLy8gY3JlYXRpbmcgdGhlIG1hcFxuICAgIE9wZW5MYXllcnMuVXRpbC5JTUFHRV9SRUxPQURfQVRURU1QVFMgPSAzOyAvLyBBdm9pZCBzb21lIGlzc3VlcyB3aXRoIHRpbGVzIG5vdCBkaXNwbGF5ZWRcbiAgICBPcGVuTGF5ZXJzLklNQUdFX1JFTE9BRF9BVFRFTVBUUyA9IDM7XG4gICAgT3BlbkxheWVycy5VdGlsLkRFRkFVTFRfUFJFQ0lTSU9OPTIwOyAvLyBkZWZhdWx0IGlzIDE0IDogY2hhbmdlIG5lZWRlZCB0byBhdm9pZCByb3VuZGluZyBwcm9ibGVtIHdpdGggY2FjaGVcblxuICAgIG1hcCA9IG5ldyBPcGVuTGF5ZXJzLk1hcCgnbWFwJ1xuICAgICAgLHtcbiAgICAgICAgY29udHJvbHM6W1xuICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTmF2aWdhdGlvbih7bW91c2VXaGVlbE9wdGlvbnM6IHtpbnRlcnZhbDogMTAwfX0pXG4gICAgICAgIF1cbiAgICAgICAgLHRpbGVNYW5hZ2VyOiBudWxsIC8vIHByZXZlbnQgYnVnIHdpdGggT0wgMi4xMyA6IHdoaXRlIHRpbGVzIG9uIHBhbm5pbmcgYmFja1xuICAgICAgICAsZXZlbnRMaXN0ZW5lcnM6e1xuICAgICAgICAgem9vbWVuZDogZnVuY3Rpb24oZXZ0KXtcbiAgLy8gcHJpdmF0ZSB0cmVlVGFibGVcbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgY2hpbGRQcmVmaXggOiBcImNoaWxkLW9mLVwiXG4gIH07XG5cbiAgZnVuY3Rpb24gY2hpbGRyZW5PZihub2RlKSB7XG4gICAgcmV0dXJuICQobm9kZSkuc2libGluZ3MoXCJ0ci5cIiArIG9wdGlvbnMuY2hpbGRQcmVmaXggKyBub2RlWzBdLmlkKTtcbiAgfTtcblxuICBmdW5jdGlvbiBkZXNjZW5kYW50c09mKG5vZGUpIHtcbiAgICB2YXIgZGVzY2VuZGFudHMgPSBbXTtcbiAgICB2YXIgY2hpbGRyZW4gPSBbXTtcbiAgICBpZiAobm9kZSAmJiBub2RlWzBdKVxuICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbk9mKG5vZGUpO1xuICAgIGZvciAodmFyIGk9MCwgbGVuPWNoaWxkcmVuLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgZGVzY2VuZGFudHMucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICBkZXNjZW5kYW50cyA9IGRlc2NlbmRhbnRzLmNvbmNhdChkZXNjZW5kYW50c09mKFtjaGlsZHJlbltpXV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc2NlbmRhbnRzO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHBhcmVudE9mKG5vZGUpIHtcbiAgICBpZiAobm9kZS5sZW5ndGggPT0gMCApXG4gICAgICByZXR1cm4gbnVsbDtcblxuICAgIHZhciBjbGFzc05hbWVzID0gbm9kZVswXS5jbGFzc05hbWUuc3BsaXQoJyAnKTtcblxuICAgIGZvcih2YXIga2V5PTA7IGtleTxjbGFzc05hbWVzLmxlbmd0aDsga2V5KyspIHtcbiAgICAgIGlmKGNsYXNzTmFtZXNba2V5XS5tYXRjaChvcHRpb25zLmNoaWxkUHJlZml4KSkge1xuICAgICAgICByZXR1cm4gJChub2RlKS5zaWJsaW5ncyhcIiNcIiArIGNsYXNzTmFtZXNba2V5XS5zdWJzdHJpbmcob3B0aW9ucy5jaGlsZFByZWZpeC5sZW5ndGgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBmdW5jdGlvbiBhbmNlc3RvcnNPZihub2RlKSB7XG4gICAgdmFyIGFuY2VzdG9ycyA9IFtdO1xuICAgIHdoaWxlKG5vZGUgPSBwYXJlbnRPZihub2RlKSkge1xuICAgICAgYW5jZXN0b3JzW2FuY2VzdG9ycy5sZW5ndGhdID0gbm9kZVswXTtcbiAgICB9XG4gICAgcmV0dXJuIGFuY2VzdG9ycztcbiAgfTtcbiAgICAgICAgICAgLy9sYXllciB2aXNpYmlsaXR5XG4gICAgICAgICAgIGZvciAodmFyIGk9MCxsZW49bGF5ZXJzLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgIHZhciBsYXllciA9IGxheWVyc1tpXTtcbiAgICAgICAgICAgICB2YXIgYiA9ICQoJyNzd2l0Y2hlciBidXR0b25bbmFtZT1cImxheWVyXCJdW3ZhbHVlPVwiJytsYXllci5uYW1lKydcIl0nKS5maXJzdCgpO1xuXG4gICAgICAgICAgICAgaWYgKGxheWVyLmluUmFuZ2UgJiYgYi5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgdmFyIHRyID0gYi5wYXJlbnRzKCd0cicpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICB0ci5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKS5maW5kKCdidXR0b24nKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgIHZhciBhbmNlc3RvcnMgPSBhbmNlc3RvcnNPZih0cik7XG4gICAgICAgICAgICAgICAkLmVhY2goYW5jZXN0b3JzLGZ1bmN0aW9uKGksYSkge1xuICAgICAgICAgICAgICAgICAkKGEpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpLmZpbmQoJ2J1dHRvbicpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICBpZiAodHIuZmluZCgnYnV0dG9uW25hbWU9XCJsYXllclwiXScpLmhhc0NsYXNzKCdjaGVja2VkJykpXG4gICAgICAgICAgICAgICAgIGxheWVyLnNldFZpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgICAgICAgfSBlbHNlIGlmICghbGF5ZXIuaW5SYW5nZSAmJiAhYi5oYXNDbGFzcygnZGlzYWJsZWQnKSkge1xuICAgICAgICAgICAgICAgdmFyIHRyID0gYi5wYXJlbnRzKCd0cicpLmZpcnN0KCk7XG4gICAgICAgICAgICAgICB0ci5hZGRDbGFzcygnZGlzYWJsZWQnKS5maW5kKCdidXR0b24nKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgIGlmICh0ci5oYXNDbGFzcygnbGl6LWxheWVyJykpXG4gICAgICAgICAgICAgICAgIHRyLmNvbGxhcHNlKCk7XG4gICAgICAgICAgICAgICB2YXIgYW5jZXN0b3JzID0gYW5jZXN0b3JzT2YodHIpO1xuICAgICAgICAgICAgICAgJC5lYWNoKGFuY2VzdG9ycyxmdW5jdGlvbihpLGEpIHtcbiAgICAgICAgICAgICAgICAgICAgYSA9ICQoYSk7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgIHZhciBjaGVja2VkID0gMDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGFEZXNjID0gY2hpbGRyZW5PZihhKTtcbiAgICAgICAgICAgICAgICAgICAgJC5lYWNoKGFEZXNjLGZ1bmN0aW9uKGosdHJkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgJCh0cmQpLmZpbmQoJ2J1dHRvbi5jaGVja2JveCcpLmVhY2goZnVuY3Rpb24oaSxiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICgkKGIpLmhhc0NsYXNzKCdkaXNhYmxlZCcpKVxuICAgICAgICAgICAgICAgICAgICAgICAgICBjaGVja2VkKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb3VudCsrO1xuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgaWYgKGNvdW50ID09IGNoZWNrZWQpXG4gICAgICAgICAgICAgICAgICAgYS5hZGRDbGFzcygnZGlzYWJsZWQnKS5maW5kKCdidXR0b24nKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgIGEucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJykuZmluZCgnYnV0dG9uJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICB9XG4gICAgICAgICAgIH1cblxuICAgICAgICAgICAvL3BhbiBidXR0b25cbiAgICAgICAgICAgJCgnI25hdmJhciBidXR0b24ucGFuJykuY2xpY2soKTtcbiAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgLG1heEV4dGVudDpleHRlbnRcbiAgICAgICAscmVzdHJpY3RlZEV4dGVudDogcmVzdHJpY3RlZEV4dGVudFxuICAgICAgICxpbml0aWFsRXh0ZW50OmluaXRpYWxFeHRlbnRcbiAgICAgICAsbWF4U2NhbGU6IHNjYWxlcy5sZW5ndGggPT0gMCA/IGNvbmZpZy5vcHRpb25zLm1pblNjYWxlIDogXCJhdXRvXCJcbiAgICAgICAsbWluU2NhbGU6IHNjYWxlcy5sZW5ndGggPT0gMCA/IGNvbmZpZy5vcHRpb25zLm1heFNjYWxlIDogXCJhdXRvXCJcbiAgICAgICAsbnVtWm9vbUxldmVsczogc2NhbGVzLmxlbmd0aCA9PSAwID8gY29uZmlnLm9wdGlvbnMuem9vbUxldmVsTnVtYmVyIDogc2NhbGVzLmxlbmd0aFxuICAgICAgICxzY2FsZXM6IHNjYWxlcy5sZW5ndGggPT0gMCA/IG51bGwgOiBzY2FsZXNcbiAgICAgICAscmVzb2x1dGlvbnM6IHJlc29sdXRpb25zLmxlbmd0aCA9PSAwID8gbnVsbCA6IHJlc29sdXRpb25zXG4gICAgICAgLHByb2plY3Rpb246cHJvamVjdGlvblxuICAgICAgICx1bml0czpwcm9qZWN0aW9uLnByb2oudW5pdHNcbiAgICAgICAsYWxsT3ZlcmxheXM6KGJhc2VsYXllcnMubGVuZ3RoID09IDApXG4gICAgfSk7XG4gICAgbWFwLmFkZENvbnRyb2wobmV3IE9wZW5MYXllcnMuQ29udHJvbC5BdHRyaWJ1dGlvbih7ZGl2OmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhdHRyaWJ1dGlvbicpfSkpO1xuXG4gICAgLy8gYWRkIGhhbmRsZXIgdG8gdXBkYXRlIHRoZSBtYXAgc2l6ZVxuICAgICQod2luZG93KS5yZXNpemUoZnVuY3Rpb24oKSB7XG4gICAgICB1cGRhdGVDb250ZW50U2l6ZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBmZWF0dXJlcyBmb3IgbG9jYXRlIGJ5IGxheWVyIHRvb2xcbiAgICovXG4gIGZ1bmN0aW9uIHVwZGF0ZUxvY2F0ZUZlYXR1cmVMaXN0KGFOYW1lLCBhSm9pbkZpZWxkLCBhSm9pblZhbHVlKSB7XG4gICAgdmFyIGxvY2F0ZSA9IGNvbmZpZy5sb2NhdGVCeUxheWVyW2FOYW1lXTtcbiAgICAvLyBjbG9uZSBmZWF0dXJlcyByZWZlcmVuY2VcbiAgICB2YXIgZmVhdHVyZXMgPSB7fTtcbiAgICBmb3IgKCB2YXIgZmlkIGluIGxvY2F0ZS5mZWF0dXJlcyApIHtcbiAgICAgICAgZmVhdHVyZXNbZmlkXSA9IGxvY2F0ZS5mZWF0dXJlc1tmaWRdO1xuICAgIH1cbiAgICAvLyBmaWx0ZXIgYnkgZmlsdGVyIGZpZWxkIG5hbWVcbiAgICBpZiAoJ2ZpbHRlckZpZWxkTmFtZScgaW4gbG9jYXRlKSB7XG4gICAgICAgIHZhciBmaWx0ZXJWYWx1ZSA9ICQoJyNsb2NhdGUtbGF5ZXItJytjbGVhbk5hbWUoYU5hbWUpKyctJytsb2NhdGUuZmlsdGVyRmllbGROYW1lKS52YWwoKTtcbiAgICAgICAgaWYgKCBmaWx0ZXJWYWx1ZSAhPSAnLTEnICkge1xuICAgICAgICAgIGZvciAodmFyIGZpZCBpbiBmZWF0dXJlcykge1xuICAgICAgICAgICAgdmFyIGZlYXQgPSBmZWF0dXJlc1tmaWRdO1xuICAgICAgICAgICAgaWYgKGZlYXQucHJvcGVydGllc1tsb2NhdGUuZmlsdGVyRmllbGROYW1lXSAhPSBmaWx0ZXJWYWx1ZSlcbiAgICAgICAgICAgICAgZGVsZXRlIGZlYXR1cmVzW2ZpZF07XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2VcbiAgICAgICAgICBmZWF0dXJlcyA9IHt9XG4gICAgfVxuICAgIC8vIGZpbHRlciBieSB2ZWN0b3Igam9pbnNcbiAgICBpZiAoICd2ZWN0b3Jqb2lucycgaW4gbG9jYXRlICYmIGxvY2F0ZS52ZWN0b3Jqb2lucy5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgdmFyIHZlY3RvcmpvaW5zID0gbG9jYXRlLnZlY3RvcmpvaW5zO1xuICAgICAgICBmb3IgKCBpPTAsIGxlbiA9dmVjdG9yam9pbnMubGVuZ3RoOyBpPCBsZW47IGkrKykge1xuICAgICAgICAgICAgdmVjdG9yam9pbiA9IHZlY3RvcmpvaW5zW2ldO1xuICAgICAgICAgICAgdmFyIGpOYW1lID0gdmVjdG9yam9pbi5qb2luTGF5ZXI7XG4gICAgICAgICAgICBpZiAoIGpOYW1lIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyICkge1xuICAgICAgICAgICAgICAgIHZhciBqTG9jYXRlID0gY29uZmlnLmxvY2F0ZUJ5TGF5ZXJbak5hbWVdO1xuICAgICAgICAgICAgICAgIHZhciBqVmFsID0gJCgnI2xvY2F0ZS1sYXllci0nK2NsZWFuTmFtZShqTmFtZSkpLnZhbCgpO1xuICAgICAgICAgICAgICAgIGlmICggalZhbCA9PSAnLTEnICkgY29udGludWU7XG4gICAgICAgICAgICAgICAgdmFyIGpGZWF0ID0gakxvY2F0ZS5mZWF0dXJlc1tqVmFsXTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciBmaWQgaW4gZmVhdHVyZXMpIHtcbiAgICAgICAgICAgICAgICAgIHZhciBmZWF0ID0gZmVhdHVyZXNbZmlkXTtcbiAgICAgICAgICAgICAgICAgIGlmICggZmVhdC5wcm9wZXJ0aWVzW3ZlY3RvcmpvaW4udGFyZ2V0RmllbGROYW1lXSAhPSBqRmVhdC5wcm9wZXJ0aWVzW3ZlY3RvcmpvaW4uam9pbkZpZWxkTmFtZV0gKVxuICAgICAgICAgICAgICAgICAgICBkZWxldGUgZmVhdHVyZXNbZmlkXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gY3JlYXRlIHRoZSBvcHRpb24gbGlzdFxuICAgIHZhciBvcHRpb25zID0gJzxvcHRpb24gdmFsdWU9XCItMVwiPjwvb3B0aW9uPic7XG4gICAgZm9yICh2YXIgZmlkIGluIGZlYXR1cmVzKSB7XG4gICAgICB2YXIgZmVhdCA9IGZlYXR1cmVzW2ZpZF07XG4gICAgICBvcHRpb25zICs9ICc8b3B0aW9uIHZhbHVlPVwiJytmZWF0LmlkKydcIj4nK2ZlYXQucHJvcGVydGllc1tsb2NhdGUuZmllbGROYW1lXSsnPC9vcHRpb24+JztcbiAgICB9XG4gICAgLy8gYWRkIG9wdGlvbiBsaXN0XG4gICAgJCgnI2xvY2F0ZS1sYXllci0nK2NsZWFuTmFtZShhTmFtZSkpLmh0bWwob3B0aW9ucyk7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBab29tIHRvIGxvY2F0ZSBmZWF0dXJlXG4gICAqL1xuICBmdW5jdGlvbiB6b29tVG9Mb2NhdGVGZWF0dXJlKGFOYW1lKSB7XG4gICAgLy8gY2xlYW4gbG9jYXRlIGxheWVyXG4gICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZSgnbG9jYXRlbGF5ZXInKTtcbiAgICBpZiAoIGxheWVyLmxlbmd0aCA9PSAwIClcbiAgICAgIHJldHVybjtcbiAgICBsYXllciA9IGxheWVyWzBdO1xuICAgIGxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuXG4gICAgLy8gZ2V0IGxvY2F0ZSBieSBsYXllciB2YWxcbiAgICB2YXIgbG9jYXRlID0gY29uZmlnLmxvY2F0ZUJ5TGF5ZXJbYU5hbWVdO1xuICAgIHZhciBsYXllck5hbWUgPSBjbGVhbk5hbWUoYU5hbWUpO1xuICAgIHZhciBwcm9qID0gbmV3IE9wZW5MYXllcnMuUHJvamVjdGlvbihsb2NhdGUuY3JzKTtcbiAgICB2YXIgdmFsID0gJCgnI2xvY2F0ZS1sYXllci0nK2xheWVyTmFtZSkudmFsKCk7XG4gICAgaWYgKHZhbCA9PSAnLTEnKSB7XG5cbiAgICAgIC8vIFRyaWdnZXIgZXZlbnRcbiAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KCdsaXptYXBsb2NhdGVmZWF0dXJlY2FuY2VsZWQnLFxuICAgICAgICB7XG4gICAgICAgICAgJ2ZlYXR1cmVUeXBlJzogYU5hbWVcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gem9vbSB0byB2YWxcbiAgICAgIHZhciBmZWF0ID0gbG9jYXRlLmZlYXR1cmVzW3ZhbF07XG4gICAgICB2YXIgZm9ybWF0ID0gbmV3IE9wZW5MYXllcnMuRm9ybWF0Lkdlb0pTT04oKTtcbiAgICAgIGZlYXQgPSBmb3JtYXQucmVhZChmZWF0KVswXTtcblxuICAgICAgaWYoIGZlYXQuZ2VvbWV0cnkgIT0gbnVsbCl7XG4gICAgICAgIGZlYXQuZ2VvbWV0cnkudHJhbnNmb3JtKHByb2osIG1hcC5nZXRQcm9qZWN0aW9uKCkpO1xuICAgICAgICAvLyBTaG93IGdlb21ldHJ5IGlmIGFza2VkXG4gICAgICAgIGlmIChsb2NhdGUuZGlzcGxheUdlb20gPT0gJ1RydWUnKSB7XG4gICAgICAgICAgICB2YXIgZ2V0RmVhdHVyZVVybERhdGEgPSBnZXRWZWN0b3JMYXllcldmc1VybCggYU5hbWUsIG51bGwsIG51bGwsIG51bGwgKTtcbiAgICAgICAgICAgIGdldEZlYXR1cmVVcmxEYXRhWydvcHRpb25zJ11bJ1BST1BFUlRZTkFNRSddID0gWydnZW9tZXRyeScsbG9jYXRlLmZpZWxkTmFtZV0uam9pbignLCcpO1xuICAgICAgICAgICAgZ2V0RmVhdHVyZVVybERhdGFbJ29wdGlvbnMnXVsnRkVBVFVSRUlEJ10gPSB2YWw7XG4gICAgICAgICAgICAvLyBHZXQgZGF0YVxuICAgICAgICAgICAgJC5wb3N0KCBnZXRGZWF0dXJlVXJsRGF0YVsndXJsJ10sIGdldEZlYXR1cmVVcmxEYXRhWydvcHRpb25zJ10sIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgICAgaWYgKCAhZGF0YS5mZWF0dXJlcyApXG4gICAgICAgICAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICAgICAgICAgIGlmKCBkYXRhLmZlYXR1cmVzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgZmVhdCA9IGZvcm1hdC5yZWFkKGRhdGEuZmVhdHVyZXNbMF0pWzBdO1xuICAgICAgICAgICAgICAgIGZlYXQuZ2VvbWV0cnkudHJhbnNmb3JtKHByb2osIG1hcC5nZXRQcm9qZWN0aW9uKCkpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGxheWVyLmFkZEZlYXR1cmVzKFtmZWF0XSk7XG4gICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIGxheWVyLmFkZEZlYXR1cmVzKFtmZWF0XSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvL3pvb20gdG8gZXh0ZW50XG4gICAgICAgIG1hcC56b29tVG9FeHRlbnQoZmVhdC5nZW9tZXRyeS5nZXRCb3VuZHMoKSk7XG5cbiAgICAgIH1cblxuICAgICAgdmFyIGZpZCA9IHZhbC5zcGxpdCgnLicpWzFdO1xuXG4gICAgICAvLyBUcmlnZ2VyIGV2ZW50XG4gICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudCgnbGl6bWFwbG9jYXRlZmVhdHVyZWNoYW5nZWQnLFxuICAgICAgICB7XG4gICAgICAgICAgJ2ZlYXR1cmVUeXBlJzogYU5hbWUsXG4gICAgICAgICAgJ2ZlYXR1cmVJZCc6IGZpZFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZmVhdHVyZXMgZm9yIGxvY2F0ZSBieSBsYXllciB0b29sXG4gICAqL1xuICBmdW5jdGlvbiBnZXRMb2NhdGVGZWF0dXJlKGFOYW1lKSB7XG4gICAgdmFyIGxvY2F0ZSA9IGNvbmZpZy5sb2NhdGVCeUxheWVyW2FOYW1lXTtcblxuICAgIC8vIGdldCBmaWVsZHMgdG8gcmV0cmlldmVcbiAgICB2YXIgZmllbGRzID0gWydnZW9tZXRyeScsbG9jYXRlLmZpZWxkTmFtZV07XG4gICAgLy8gaWYgYSBmaWx0ZXIgZmllbGQgaXMgZGVmaW5lZFxuICAgIGlmICgnZmlsdGVyRmllbGROYW1lJyBpbiBsb2NhdGUpXG4gICAgICBmaWVsZHMucHVzaCggbG9jYXRlLmZpbHRlckZpZWxkTmFtZSApO1xuICAgIC8vIGNoZWNrIGZvciBqb2luIGZpZWxkc1xuICAgIGlmICggJ2ZpbHRlcmpvaW5zJyBpbiBsb2NhdGUgKSB7XG4gICAgICB2YXIgZmlsdGVyam9pbnMgPSBsb2NhdGUuZmlsdGVyam9pbnM7XG4gICAgICBmb3IgKCB2YXIgaT0wLCBsZW49ZmlsdGVyam9pbnMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgdmFyIGZpbHRlcmpvaW4gPSBmaWx0ZXJqb2luc1tpXTtcbiAgICAgICAgICBmaWVsZHMucHVzaCggZmlsdGVyam9pbi50YXJnZXRGaWVsZE5hbWUgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCAndmVjdG9yam9pbnMnIGluIGxvY2F0ZSApIHtcbiAgICAgIHZhciB2ZWN0b3Jqb2lucyA9IGxvY2F0ZS52ZWN0b3Jqb2lucztcbiAgICAgIGZvciAoIHZhciBpPTAsIGxlbj12ZWN0b3Jqb2lucy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICB2YXIgdmVjdG9yam9pbiA9IHZlY3RvcmpvaW5zW2ldO1xuICAgICAgICAgIGZpZWxkcy5wdXNoKCB2ZWN0b3Jqb2luLnRhcmdldEZpZWxkTmFtZSApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEdldCBXRlMgdXJsIGFuZCBvcHRpb25zXG4gICAgdmFyIGdldEZlYXR1cmVVcmxEYXRhID0gZ2V0VmVjdG9yTGF5ZXJXZnNVcmwoIGFOYW1lLCBudWxsLCBudWxsLCAnZXh0ZW50JyApO1xuICAgIGdldEZlYXR1cmVVcmxEYXRhWydvcHRpb25zJ11bJ1BST1BFUlRZTkFNRSddID0gZmllbGRzLmpvaW4oJywnKTtcblxuICAgIHZhciBsYXllck5hbWUgPSBjbGVhbk5hbWUoYU5hbWUpO1xuXG4gICAgLy8gR2V0IGRhdGFcbiAgICAkLnBvc3QoIGdldEZlYXR1cmVVcmxEYXRhWyd1cmwnXSwgZ2V0RmVhdHVyZVVybERhdGFbJ29wdGlvbnMnXSwgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgdmFyIGxDb25maWcgPSBjb25maWcubGF5ZXJzW2FOYW1lXTtcbiAgICAgIGxvY2F0ZVsnZmVhdHVyZXMnXSA9IHt9O1xuICAgICAgaWYgKCAhZGF0YS5mZWF0dXJlcyApXG4gICAgICAgIGRhdGEgPSBKU09OLnBhcnNlKGRhdGEpO1xuICAgICAgdmFyIGZlYXR1cmVzID0gZGF0YS5mZWF0dXJlcztcbiAgICAgIGlmKCBsb2NhdGUuY3JzICE9ICdFUFNHOjQzMjYnICYmIGZlYXR1cmVzLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgLy8gbG9hZCBwcm9qZWN0aW9uIHRvIGJlIHN1cmUgdG8gaGF2ZSB0aGUgZGVmaW5pdGlvblxuICAgICAgICAgIGxvYWRQcm9qRGVmaW5pdGlvbiggbG9jYXRlLmNycywgZnVuY3Rpb24oIGFQcm9qICkge1xuICAgICAgICAgICAgICAvLyBpbiBRR0lTIHNlcnZlciA+IDIuMTQgR2VvSlNPTiBpcyBpbiBFUFNHOjQzMjZcbiAgICAgICAgICAgICAgaWYgKCAncWdpc1NlcnZlclZlcnNpb24nIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnFnaXNTZXJ2ZXJWZXJzaW9uICE9ICcyLjE0JyApXG4gICAgICAgICAgICAgICAgbG9jYXRlLmNycyA9ICdFUFNHOjQzMjYnO1xuICAgICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoJ2ZpbHRlckZpZWxkTmFtZScgaW4gbG9jYXRlKSB7XG4gICAgICAgIC8vIGNyZWF0ZSBmaWx0ZXIgY29tYm9ib3ggZm9yIHRoZSBsYXllclxuICAgICAgICBmZWF0dXJlcy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgICAgICAgIHZhciBhUHJvcGVydHkgPSBhLnByb3BlcnRpZXNbbG9jYXRlLmZpbHRlckZpZWxkTmFtZV07XG4gICAgICAgICAgICB2YXIgYlByb3BlcnR5ID0gYi5wcm9wZXJ0aWVzW2xvY2F0ZS5maWx0ZXJGaWVsZE5hbWVdO1xuICAgICAgICAgICAgaWYgKGlzTmFOKGFQcm9wZXJ0eSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4oYlByb3BlcnR5KSkgeyAgLy8gYSBhbmQgYiBhcmUgc3RyaW5nc1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYVByb3BlcnR5LmxvY2FsZUNvbXBhcmUoYlByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAgICAgICAgIC8vIGEgc3RyaW5nIGFuZCBiIG51bWJlclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTsgIC8vIGEgPiBiXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoaXNOYU4oYlByb3BlcnR5KSkgeyAgLy8gYSBudW1iZXIgYW5kIGIgc3RyaW5nXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAtMTsgIC8vIGEgPCBiXG4gICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgICAgICAvLyBhIGFuZCBiIGFyZSBudW1iZXJzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYXJzZUZsb2F0KGFQcm9wZXJ0eSkgLSBwYXJzZUZsb2F0KGJQcm9wZXJ0eSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdmFyIGZpbHRlclBsYWNlSG9sZGVyID0gJyc7XG4gICAgICAgIGlmICggJ2ZpbHRlckZpZWxkQWxpYXMnIGluIGxvY2F0ZSAmJiBsb2NhdGUuZmlsdGVyRmllbGRBbGlhcyE9JycpXG4gICAgICAgICAgZmlsdGVyUGxhY2VIb2xkZXIgKz0gbG9jYXRlLmZpbHRlckZpZWxkQWxpYXMrJyAnO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgZmlsdGVyUGxhY2VIb2xkZXIgKz0gbG9jYXRlLmZpbHRlckZpZWxkTmFtZTtcbiAgICAgICAgZmlsdGVyUGxhY2VIb2xkZXIgKz0nICgnKyBsQ29uZmlnLnRpdGxlICsgJyknO1xuICAgICAgICB2YXIgZk9wdGlvbnMgPSAnPG9wdGlvbiB2YWx1ZT1cIi0xXCI+PC9vcHRpb24+JztcbiAgICAgICAgdmFyIGZWYWx1ZSA9ICctMSc7XG4gICAgICAgIGZvciAodmFyIGk9MCwgbGVuPWZlYXR1cmVzLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgICAgIHZhciBmZWF0ID0gZmVhdHVyZXNbaV07XG4gICAgICAgICAgaWYgKCBmVmFsdWUgIT0gZmVhdC5wcm9wZXJ0aWVzW2xvY2F0ZS5maWx0ZXJGaWVsZE5hbWVdICkge1xuICAgICAgICAgICAgZlZhbHVlID0gZmVhdC5wcm9wZXJ0aWVzW2xvY2F0ZS5maWx0ZXJGaWVsZE5hbWVdO1xuICAgICAgICAgICAgZk9wdGlvbnMgKz0gJzxvcHRpb24gdmFsdWU9XCInK2ZWYWx1ZSsnXCI+JytmVmFsdWUrJzwvb3B0aW9uPic7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBhZGQgZmlsdGVyIHZhbHVlcyBsaXN0XG4gICAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytsYXllck5hbWUpLnBhcmVudCgpLmJlZm9yZSgnPGRpdiBjbGFzcz1cImxvY2F0ZS1sYXllclwiPjxzZWxlY3QgaWQ9XCJsb2NhdGUtbGF5ZXItJytsYXllck5hbWUrJy0nK2xvY2F0ZS5maWx0ZXJGaWVsZE5hbWUrJ1wiPicrZk9wdGlvbnMrJzwvc2VsZWN0PjwvZGl2Pjxici8+Jyk7XG4gICAgICAgIC8vIGxpc3RlbiB0byBmaWx0ZXIgc2VsZWN0IGNoYW5nZXNcbiAgICAgICAgJCgnI2xvY2F0ZS1sYXllci0nK2xheWVyTmFtZSsnLScrbG9jYXRlLmZpbHRlckZpZWxkTmFtZSkuY2hhbmdlKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgdmFyIGZpbHRlclZhbHVlID0gJCh0aGlzKS5jaGlsZHJlbignOnNlbGVjdGVkJykudmFsKCk7XG4gICAgICAgICAgdXBkYXRlTG9jYXRlRmVhdHVyZUxpc3QoIGFOYW1lICk7XG4gICAgICAgICAgaWYgKGZpbHRlclZhbHVlID09ICctMScpXG4gICAgICAgICAgICAkKCcjbG9jYXRlLWxheWVyLScrbGF5ZXJOYW1lKyctJytsb2NhdGUuZmlsdGVyRmllbGROYW1lKycgfiBzcGFuID4gaW5wdXQnKS52YWwoJycpO1xuICAgICAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytsYXllck5hbWUrJyB+IHNwYW4gPiBpbnB1dCcpLnZhbCgnJyk7XG4gICAgICAgICAgJCgnI2xvY2F0ZS1sYXllci0nK2xheWVyTmFtZSkudmFsKCctMScpO1xuICAgICAgICAgIHpvb21Ub0xvY2F0ZUZlYXR1cmUoYU5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgLy8gYWRkIGNvbWJvYm94IHRvIHRoZSBmaWx0ZXIgc2VsZWN0XG4gICAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytsYXllck5hbWUrJy0nK2xvY2F0ZS5maWx0ZXJGaWVsZE5hbWUpLmNvbWJvYm94KHtcbiAgICAgICAgICBwb3NpdGlvbjogeyBteSA6IFwicmlnaHQgdG9wXCIsIGF0OiBcInJpZ2h0IGJvdHRvbVwiIH0sXG4gICAgICAgICAgXCJzZWxlY3RlZFwiOiBmdW5jdGlvbihldnQsIHVpKXtcbiAgICAgICAgICAgIGlmICggdWkuaXRlbSApIHtcbiAgICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgICB2YXIgdWlJdGVtID0gJCh1aS5pdGVtKTtcbiAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBzZWxmLnZhbCh1aUl0ZW0udmFsKCkpLmNoYW5nZSgpO1xuICAgICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIGFkZCBwbGFjZSBob2xkZXIgdG8gdGhlIGZpbHRlciBjb21ib2JveCBpbnB1dFxuICAgICAgICAkKCcjbG9jYXRlLWxheWVyLScrbGF5ZXJOYW1lKyctJytsb2NhdGUuZmlsdGVyRmllbGROYW1lKycgfiBzcGFuID4gaW5wdXQnKS5hdHRyKCdwbGFjZWhvbGRlcicsIGZpbHRlclBsYWNlSG9sZGVyKS52YWwoJycpO1xuICAgICAgICAkKCcjbG9jYXRlLWxheWVyLScrbGF5ZXJOYW1lKyctJytsb2NhdGUuZmlsdGVyRmllbGROYW1lKycgfiBzcGFuID4gaW5wdXQnKS5hdXRvY29tcGxldGUoJ2Nsb3NlJyk7XG4gICAgICAgIHVwZGF0ZVN3aXRjaGVyU2l6ZSgpO1xuICAgICAgICB1cGRhdGVNaW5pRG9ja1NpemUoKTtcbiAgICAgIH1cblxuICAgICAgLy8gY3JlYXRlIGNvbWJvYm94IGZvciB0aGUgbGF5ZXJcbiAgICAgIGZlYXR1cmVzLnNvcnQoZnVuY3Rpb24oYSwgYikge1xuICAgICAgICAgICAgdmFyIGFQcm9wZXJ0eSA9IGEucHJvcGVydGllc1tsb2NhdGUuZmllbGROYW1lXTtcbiAgICAgICAgICAgIHZhciBiUHJvcGVydHkgPSBiLnByb3BlcnRpZXNbbG9jYXRlLmZpZWxkTmFtZV07XG4gICAgICAgICAgICBpZiAoaXNOYU4oYVByb3BlcnR5KSkge1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihiUHJvcGVydHkpKSB7ICAvLyBhIGFuZCBiIGFyZSBzdHJpbmdzXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBhUHJvcGVydHkubG9jYWxlQ29tcGFyZShiUHJvcGVydHkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgLy8gYSBzdHJpbmcgYW5kIGIgbnVtYmVyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAxOyAgLy8gYSA+IGJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChpc05hTihiUHJvcGVydHkpKSB7ICAvLyBhIG51bWJlciBhbmQgYiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIC0xOyAgLy8gYSA8IGJcbiAgICAgICAgICAgICAgICB9IGVsc2UgeyAgICAgICAgIC8vIGEgYW5kIGIgYXJlIG51bWJlcnNcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHBhcnNlRmxvYXQoYVByb3BlcnR5KSAtIHBhcnNlRmxvYXQoYlByb3BlcnR5KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIHZhciBwbGFjZUhvbGRlciA9ICcnO1xuICAgICAgaWYgKCAnZmllbGRBbGlhcycgaW4gbG9jYXRlICYmIGxvY2F0ZS5maWVsZEFsaWFzIT0nJyApXG4gICAgICAgIHBsYWNlSG9sZGVyICs9IGxvY2F0ZS5maWVsZEFsaWFzKycgJztcbiAgICAgIGVsc2VcbiAgICAgICAgcGxhY2VIb2xkZXIgKz0gbG9jYXRlLmZpZWxkTmFtZSsnICc7XG4gICAgICBwbGFjZUhvbGRlciArPSAnKCcrbENvbmZpZy50aXRsZSsnKSc7XG4gICAgICB2YXIgb3B0aW9ucyA9ICc8b3B0aW9uIHZhbHVlPVwiLTFcIj48L29wdGlvbj4nO1xuICAgICAgZm9yICh2YXIgaT0wLCBsZW49ZmVhdHVyZXMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgIHZhciBmZWF0ID0gZmVhdHVyZXNbaV07XG4gICAgICAgIGxvY2F0ZS5mZWF0dXJlc1tmZWF0LmlkLnRvU3RyaW5nKCldID0gZmVhdDtcbiAgICAgICAgaWYgKCAhKCdmaWx0ZXJGaWVsZE5hbWUnIGluIGxvY2F0ZSkgKVxuICAgICAgICAgIG9wdGlvbnMgKz0gJzxvcHRpb24gdmFsdWU9XCInK2ZlYXQuaWQrJ1wiPicrZmVhdC5wcm9wZXJ0aWVzW2xvY2F0ZS5maWVsZE5hbWVdKyc8L29wdGlvbj4nO1xuICAgICAgfVxuICAgICAgLy8gbGlzdGVuIHRvIHNlbGVjdCBjaGFuZ2VzXG4gICAgICAkKCcjbG9jYXRlLWxheWVyLScrbGF5ZXJOYW1lKS5odG1sKG9wdGlvbnMpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIHZhbCA9ICQodGhpcykuY2hpbGRyZW4oJzpzZWxlY3RlZCcpLnZhbCgpO1xuICAgICAgICBpZiAodmFsID09ICctMScpIHtcbiAgICAgICAgICAkKCcjbG9jYXRlLWxheWVyLScrbGF5ZXJOYW1lKycgfiBzcGFuID4gaW5wdXQnKS52YWwoJycpO1xuICAgICAgICAgIC8vIHVwZGF0ZSB0byBqb2luIGxheWVyXG4gICAgICAgICAgaWYgKCAnZmlsdGVyam9pbnMnIGluIGxvY2F0ZSAmJiBsb2NhdGUuZmlsdGVyam9pbnMubGVuZ3RoICE9IDAgKSB7XG4gICAgICAgICAgICAgIHZhciBmaWx0ZXJqb2lucyA9IGxvY2F0ZS5maWx0ZXJqb2lucztcbiAgICAgICAgICAgICAgZm9yICh2YXIgaT0wLCBsZW49ZmlsdGVyam9pbnMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICB2YXIgZmlsdGVyam9pbiA9IGZpbHRlcmpvaW5zW2ldO1xuICAgICAgICAgICAgICAgICAgdmFyIGpOYW1lID0gZmlsdGVyam9pbi5qb2luTGF5ZXI7XG4gICAgICAgICAgICAgICAgICBpZiAoIGpOYW1lIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyICkge1xuICAgICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBqb2luZWQgc2VsZWN0IG9wdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgb2xkVmFsID0gJCgnI2xvY2F0ZS1sYXllci0nK2NsZWFuTmFtZShqTmFtZSkpLnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUxvY2F0ZUZlYXR1cmVMaXN0KCBqTmFtZSApO1xuICAgICAgICAgICAgICAgICAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytjbGVhbk5hbWUoak5hbWUpKS52YWwoIG9sZFZhbCApO1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB6b29tIHRvIHBhcmVudCBzZWxlY3Rpb25cbiAgICAgICAgICBpZiAoICd2ZWN0b3Jqb2lucycgaW4gbG9jYXRlICYmIGxvY2F0ZS52ZWN0b3Jqb2lucy5sZW5ndGggPT0gMSApIHtcbiAgICAgICAgICAgICAgdmFyIGpOYW1lID0gbG9jYXRlLnZlY3RvcmpvaW5zWzBdLmpvaW5MYXllcjtcbiAgICAgICAgICAgICAgaWYgKCBqTmFtZSBpbiBjb25maWcubG9jYXRlQnlMYXllciApIHtcbiAgICAgICAgICAgICAgICB6b29tVG9Mb2NhdGVGZWF0dXJlKCBqTmFtZSApO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBjbGVhciB0aGUgbWFwXG4gICAgICAgICAgem9vbVRvTG9jYXRlRmVhdHVyZSggYU5hbWUgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB6b29tIHRvIHZhbFxuICAgICAgICAgIHpvb21Ub0xvY2F0ZUZlYXR1cmUoIGFOYW1lICk7XG4gICAgICAgICAgLy8gdXBkYXRlIGpvaW5lZCBsYXllclxuICAgICAgICAgIGlmICggJ2ZpbHRlcmpvaW5zJyBpbiBsb2NhdGUgJiYgbG9jYXRlLmZpbHRlcmpvaW5zLmxlbmd0aCAhPSAwICkge1xuICAgICAgICAgICAgICB2YXIgZmlsdGVyam9pbnMgPSBsb2NhdGUuZmlsdGVyam9pbnM7XG4gICAgICAgICAgICAgIGZvciAodmFyIGk9MCwgbGVuPWZpbHRlcmpvaW5zLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgICAgICAgICAgICAgdmFyIGZpbHRlcmpvaW4gPSBmaWx0ZXJqb2luc1tpXTtcbiAgICAgICAgICAgICAgICAgIHZhciBqTmFtZSA9IGZpbHRlcmpvaW4uam9pbkxheWVyO1xuICAgICAgICAgICAgICAgICAgaWYgKCBqTmFtZSBpbiBjb25maWcubG9jYXRlQnlMYXllciApIHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgam9pbmVkIHNlbGVjdCBvcHRpb25zXG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTG9jYXRlRmVhdHVyZUxpc3QoIGpOYW1lICk7XG4gICAgICAgICAgICAgICAgICAgICAgJCgnI2xvY2F0ZS1sYXllci0nK2NsZWFuTmFtZShqTmFtZSkpLnZhbCgnLTEnKTtcbiAgICAgICAgICAgICAgICAgICAgICAkKCcjbG9jYXRlLWxheWVyLScrY2xlYW5OYW1lKGpOYW1lKSsnIH4gc3BhbiA+IGlucHV0JykudmFsKCcnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAkKHRoaXMpLmJsdXIoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSk7XG4gICAgICAkKCcjbG9jYXRlLWxheWVyLScrbGF5ZXJOYW1lKS5jb21ib2JveCh7XG4gICAgXCJtaW5MZW5ndGhcIjogKCdtaW5MZW5ndGgnIGluIGxvY2F0ZSkgPyBsb2NhdGUubWluTGVuZ3RoIDogMCxcbiAgICAgICAgXCJwb3NpdGlvblwiOiB7IG15IDogXCJyaWdodCB0b3BcIiwgYXQ6IFwicmlnaHQgYm90dG9tXCIgfSxcbiAgICAgICAgXCJzZWxlY3RlZFwiOiBmdW5jdGlvbihldnQsIHVpKXtcbiAgICAgICAgICBpZiAoIHVpLml0ZW0gKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICB2YXIgdWlJdGVtID0gJCh1aS5pdGVtKTtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgIHNlbGYudmFsKHVpSXRlbS52YWwoKSkuY2hhbmdlKCk7XG4gICAgICAgICAgICB9LCAxKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgJCgnI2xvY2F0ZS1sYXllci0nK2xheWVyTmFtZSsnIH4gc3BhbiA+IGlucHV0JykuYXR0cigncGxhY2Vob2xkZXInLCBwbGFjZUhvbGRlcikudmFsKCcnKTtcbiAgICAgICQoJyNsb2NhdGUtbGF5ZXItJytsYXllck5hbWUrJyB+IHNwYW4gPiBpbnB1dCcpLmF1dG9jb21wbGV0ZSgnY2xvc2UnKTtcbiAgICAgIGlmICggKCdtaW5MZW5ndGgnIGluIGxvY2F0ZSkgJiYgbG9jYXRlLm1pbkxlbmd0aCA+IDAgKVxuICAgICAgICAkKCcjbG9jYXRlLWxheWVyLScrbGF5ZXJOYW1lKS5wYXJlbnQoKS5hZGRDbGFzcygnbm8tdG9nZ2xlJyk7XG4gICAgICBpZihtQ2hlY2tNb2JpbGUoKSl7XG4gICAgICAgIC8vIGF1dG9jb21wbGV0aW9uIGl0ZW1zIGZvciBsb2NhdGVieWxheWVyIGZlYXR1cmVcbiAgICAgICAgJCgnZGl2LmxvY2F0ZS1sYXllciBzZWxlY3QnKS5zaG93KCk7XG4gICAgICAgICQoJ3NwYW4uY3VzdG9tLWNvbWJvYm94JykuaGlkZSgpO1xuICAgICAgfVxuICAgIH0sJ2pzb24nKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjcmVhdGUgdGhlIGxheWVyIHN3aXRjaGVyXG4gICAqL1xuICBmdW5jdGlvbiBnZXRTd2l0Y2hlckxpKGFOb2RlLCBhTGV2ZWwpIHtcbiAgICB2YXIgbm9kZUNvbmZpZyA9IGFOb2RlLmNvbmZpZztcbiAgICB2YXIgaHRtbCA9ICc8bGkgaWQ9XCInK25vZGVDb25maWcudHlwZSsnLScrYU5vZGUubmFtZSsnXCI+JztcblxuICAgIC8vIGFkZCBjaGVja2JveCB0byBkaXNwbGF5IGNoaWxkcmVuIG9yIGxlZ2VuZCBpbWFnZVxuICAgIGh0bWwgKz0gJzxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD1cIm9wZW4nK25vZGVDb25maWcudHlwZSthTm9kZS5uYW1lKydcIiBuYW1lPVwib3Blbicrbm9kZUNvbmZpZy50eXBlK2FOb2RlLm5hbWUrJ1wiIGNoZWNrZWQ9XCJjaGVja2VkXCI+PC9pbnB1dD48bGFiZWwgZm9yPVwib3Blbicrbm9kZUNvbmZpZy50eXBlK2FOb2RlLm5hbWUrJ1wiPiZuYnNwOzwvbGFiZWw+JztcbiAgICAvLyBhZGQgYnV0dG9uIHRvIG1hbmFnZSB2aXNpYmlsaXR5XG4gICAgaHRtbCArPSAnPGJ1dHRvbiBjbGFzcz1cImNoZWNrYm94XCIgbmFtZT1cIicrbm9kZUNvbmZpZy50eXBlKyctJythTm9kZS5uYW1lKyctdmlzaWJpbGl0eVwiIHZhbHVlPVwiMFwiIHRpdGxlPVwiJytsaXpEaWN0Wyd0cmVlLmJ1dHRvbi5jaGVja2JveCddKydcIj48L2J1dHRvbj4nO1xuICAgIC8vIGFkZCBsYXllciB0aXRsZVxuICAgIGh0bWwgKz0gJzxzcGFuIGNsYXNzPVwibGFiZWxcIiB0aXRsZT1cIicrbm9kZUNvbmZpZy5hYnN0cmFjdCsnXCI+Jytub2RlQ29uZmlnLnRpdGxlKyc8L3NwYW4+JztcblxuICAgIGlmICgoJ2NoaWxkcmVuJyBpbiBhTm9kZSkgJiYgYU5vZGVbJ2NoaWxkcmVuJ10ubGVuZ3RoIT0wKSB7XG4gICAgICBodG1sICs9IGdldFN3aXRjaGVyVWwoYU5vZGUsIGFMZXZlbCsxKTtcbiAgICB9IGVsc2UgaWYgKG5vZGVDb25maWcudHlwZSA9PSAnbGF5ZXInXG4gICAgICAgICAgICYmICghbm9kZUNvbmZpZy5ub0xlZ2VuZEltYWdlIHx8IG5vZGVDb25maWcubm9MZWdlbmRJbWFnZSAhPSAnVHJ1ZScpKSB7XG4gICAgICB2YXIgdXJsID0gZ2V0TGF5ZXJMZWdlbmRHcmFwaGljVXJsKGFOb2RlLm5hbWUsIGZhbHNlKTtcbiAgICAgIGlmICggdXJsICE9IG51bGwgJiYgdXJsICE9ICcnICkge1xuICAgICAgICAgIGh0bWwgKz0gJzx1bCBpZD1cImxlZ2VuZC1sYXllci0nK2FOb2RlLm5hbWUrJ1wiPic7XG4gICAgICAgICAgaHRtbCArPSAnPGxpPjxkaXY+PGltZyBkYXRhLXNyYz1cIicrdXJsKydcIiBzcmM9XCInK2xpelVybHMuYmFzZXBhdGggKyAnY3NzL2ltYWdlcy9kb3dubG9hZF9sYXllci5naWYnICsgJ1wiLz48L2Rpdj48L2xpPic7XG4gICAgICAgICAgaHRtbCArPSAnPC91bD4nO1xuICAgICAgfVxuICAgIH1cbiAgICBodG1sICs9ICc8L2xpPic7XG4gICAgcmV0dXJuIGh0bWw7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRTd2l0Y2hlclVsKGFOb2RlLCBhTGV2ZWwpIHtcbiAgICB2YXIgaHRtbCA9ICc8dWwgY2xhc3M9XCJsZXZlbCcrYUxldmVsKydcIj4nO1xuICAgIHZhciBjaGlsZHJlbiA9IGFOb2RlLmNoaWxkcmVuO1xuICAgIGZvciAodmFyIGk9MCwgbGVuPWNoaWxkcmVuLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgdmFyIGNoaWxkID0gY2hpbGRyZW5baV07XG4gICAgICBodG1sICs9IGdldFN3aXRjaGVyTGkoY2hpbGQsYUxldmVsKTtcbiAgICB9XG4gICAgaHRtbCArPSAnPC91bD4nO1xuICAgIHJldHVybiBodG1sO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3dpdGNoZXJOZXcoKSB7XG4gICAgJCgnI3N3aXRjaGVyLWxheWVycycpLmh0bWwoZ2V0U3dpdGNoZXJVbCh0cmVlLDApKTtcblxuICAgIGxpek1hcC5ldmVudHMub24oe1xuICAgICAgICBkb2Nrb3BlbmVkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIHRhYi1jb250ZW50IG1heC1oZWlnaHRcbiAgICAgICAgICAgIGlmICggJCgnI2RvY2stdGFicycpLmlzKCc6dmlzaWJsZScpIClcbiAgICAgICAgICAgICAgICAkKCcjZG9jay1jb250ZW50JykuY3NzKCAnbWF4LWhlaWdodCcsICQoJyNkb2NrJykuaGVpZ2h0KCkgLSAkKCcjZG9jay10YWJzJykuaGVpZ2h0KCkgKTtcbiAgICAgICAgICAgIGlmICggZS5pZCA9PSAnc3dpdGNoZXInICkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVN3aXRjaGVyU2l6ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICB2YXIgcHJvamVjdGlvbiA9IG1hcC5wcm9qZWN0aW9uO1xuXG4gICAgLy8gZ2V0IHRoZSBiYXNlbGF5ZXIgc2VsZWN0IGNvbnRlbnRcbiAgICAvLyBhbmQgYWRkaW5nIGJhc2VsYXllcnMgdG8gdGhlIG1hcFxuICAgIHZhciBzZWxlY3QgPSBbXTtcbiAgICBiYXNlbGF5ZXJzLnJldmVyc2UoKTtcbiAgICBmb3IgKHZhciBpPTAsbGVuPWJhc2VsYXllcnMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICB2YXIgYmFzZWxheWVyID0gYmFzZWxheWVyc1tpXVxuICAgICAgYmFzZWxheWVyLnVuaXRzID0gcHJvamVjdGlvbi5wcm9qLnVuaXRzO1xuICAgICAgdHJ5eyAvLyBiZWNhdXNlIGdvb2dsZSBtYXBzIGxheWVyIGNhbiBiZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWRcbiAgICAgICAgICBtYXAuYWRkTGF5ZXIoYmFzZWxheWVyKTtcbiAgICAgICAgICB2YXIgcWdpc05hbWUgPSBiYXNlbGF5ZXIubmFtZTtcbiAgICAgICAgICBpZiAoIGJhc2VsYXllci5uYW1lIGluIGNsZWFuTmFtZU1hcCApXG4gICAgICAgICAgICAgIHFnaXNOYW1lID0gZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUoYmFzZWxheWVyLm5hbWUpO1xuICAgICAgICAgIHZhciBibENvbmZpZyA9IGNvbmZpZy5sYXllcnNbcWdpc05hbWVdO1xuICAgICAgICAgIGlmIChibENvbmZpZylcbiAgICAgICAgICAgIHNlbGVjdCArPSAnPG9wdGlvbiB2YWx1ZT1cIicrYmxDb25maWcubmFtZSsnXCI+JytibENvbmZpZy50aXRsZSsnPC9vcHRpb24+JztcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICBzZWxlY3QgKz0gJzxvcHRpb24gdmFsdWU9XCInK2Jhc2VsYXllci5uYW1lKydcIj4nK2Jhc2VsYXllci5uYW1lKyc8L29wdGlvbj4nO1xuXG4gICAgICB9IGNhdGNoKGUpIHtcbiAgICAgICAgICB2YXIgcWdpc05hbWUgPSBiYXNlbGF5ZXIubmFtZTtcbiAgICAgICAgICBpZiAoIGJhc2VsYXllci5uYW1lIGluIGNsZWFuTmFtZU1hcCApXG4gICAgICAgICAgICAgIHFnaXNOYW1lID0gZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUoYmFzZWxheWVyLm5hbWUpO1xuICAgICAgICAgIGNvbnNvbGUubG9nKHFnaXNOYW1lK1wiIGNhbid0IGJlIGFkZGVkIHRvIHRoZSBtYXAhXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChiYXNlbGF5ZXJzLmxlbmd0aCE9MCkge1xuICAgICAgLy8gYWN0aXZlIHRoZSBzZWxlY3QgZWxlbWVudCBmb3IgYmFzZWxheWVyc1xuICAgICAgJCgnI3N3aXRjaGVyLWJhc2VsYXllci1zZWxlY3QnKS5hcHBlbmQoc2VsZWN0KTtcbiAgICAgICQoJyNzd2l0Y2hlci1iYXNlbGF5ZXItc2VsZWN0JylcbiAgICAgICAgLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdmFsID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICB2YXIgYmxOYW1lID0gbWFwLmdldExheWVyc0J5TmFtZSh2YWwpWzBdO1xuICAgICAgICAgIG1hcC5zZXRCYXNlTGF5ZXIoIGJsTmFtZSApO1xuXG4gICAgICAgICAgLy8gVHJpZ2dlciBldmVudFxuICAgICAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KFwibGl6bWFwYmFzZWxheWVyY2hhbmdlZFwiLFxuICAgICAgICAgICAgeyAnbGF5ZXInOiBibE5hbWV9XG4gICAgICAgICAgKTtcblxuICAgICAgICAgICQodGhpcykuYmx1cigpO1xuICAgICAgICB9KTtcbiAgICAgIC8vIEhpZGUgc3dpdGNoZXItYmFzZWxheWVyIGlmIG9ubHkgb25lIGJhc2UgbGF5ZXIgaW5zaWRlXG4gICAgICBpZiAoYmFzZWxheWVycy5sZW5ndGg9PTEpXG4gICAgICAgICQoJyNzd2l0Y2hlci1iYXNlbGF5ZXInKS5oaWRlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGhpZGUgZWxlbWVudHMgZm9yIGJhc2VsYXllcnNcbiAgICAgICQoJyNzd2l0Y2hlci1iYXNlbGF5ZXInKS5oaWRlKCk7XG4gICAgICBtYXAuYWRkTGF5ZXIobmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKCdiYXNlbGF5ZXInLHtcbiAgICAgICAgbWF4RXh0ZW50Om1hcC5tYXhFeHRlbnRcbiAgICAgICAsbWF4U2NhbGU6IG1hcC5tYXhTY2FsZVxuICAgICAgICxtaW5TY2FsZTogbWFwLm1pblNjYWxlXG4gICAgICAgLG51bVpvb21MZXZlbHM6IG1hcC5udW1ab29tTGV2ZWxzXG4gICAgICAgLHNjYWxlczogbWFwLnNjYWxlc1xuICAgICAgICxwcm9qZWN0aW9uOiBtYXAucHJvamVjdGlvblxuICAgICAgICx1bml0czogbWFwLnByb2plY3Rpb24ucHJvai51bml0c1xuICAgICAgfSkpO1xuICAgIH1cblxuICAgIC8vIGFkZGluZyBsYXllcnMgdG8gdGhlIG1hcFxuICAgIGxheWVycy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIGlmIChhLm9yZGVyID09IGIub3JkZXIpXG4gICAgICAgIHJldHVybiAwO1xuICAgICAgcmV0dXJuIGEub3JkZXIgPiBiLm9yZGVyID8gMSA6IC0xO1xuICAgIH0pO1xuICAgIGxheWVycy5yZXZlcnNlKCk7XG4gICAgZm9yICh2YXIgaT0wLGxlbj1sYXllcnMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICB2YXIgbCA9IGxheWVyc1tpXTtcbiAgICAgIGwudW5pdHMgPSBwcm9qZWN0aW9uLnByb2oudW5pdHM7XG5cbiAgICAgIC8vIEFkZCBvbmx5IGxheWVycyB3aXRoIGdlb21ldHJ5XG4gICAgICB2YXIgcWdpc05hbWUgPSBudWxsO1xuICAgICAgaWYgKCBsLm5hbWUgaW4gY2xlYW5OYW1lTWFwIClcbiAgICAgICAgICBxZ2lzTmFtZSA9IGdldExheWVyTmFtZUJ5Q2xlYW5OYW1lKGwubmFtZSk7XG4gICAgICB2YXIgYUNvbmZpZyA9IG51bGw7XG4gICAgICBpZiAoIHFnaXNOYW1lIClcbiAgICAgICAgICBhQ29uZmlnID0gY29uZmlnLmxheWVyc1txZ2lzTmFtZV07XG4gICAgICBpZiAoICFhQ29uZmlnIClcbiAgICAgICAgICBhQ29uZmlnID0gY29uZmlnLmxheWVyc1tsLnBhcmFtc1snTEFZRVJTJ11dO1xuICAgICAgaWYgKCAhYUNvbmZpZyApXG4gICAgICAgICAgYUNvbmZpZyA9IGNvbmZpZy5sYXllcnNbbC5uYW1lXTtcbiAgICAgIGlmICggIWFDb25maWcgKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgaWYoICdnZW9tZXRyeVR5cGUnIGluIGFDb25maWcgJiZcbiAgICAgICAgKCBhQ29uZmlnLmdlb21ldHJ5VHlwZSA9PSBcIm5vbmVcIiB8fCBhQ29uZmlnLmdlb21ldHJ5VHlwZSA9PSBcInVua25vd25cIiB8fCBhQ29uZmlnLmdlb21ldHJ5VHlwZSA9PSBcIlwiIClcbiAgICAgICl7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgbWFwLmFkZExheWVyKGwpO1xuICAgIH1cblxuICAgIC8vIEFkZCBMb2NhdGUgYnkgbGF5ZXJcbiAgICBpZiAoJ2xvY2F0ZUJ5TGF5ZXInIGluIGNvbmZpZykge1xuICAgICAgdmFyIGxvY2F0ZUNvbnRlbnQgPSBbXTtcbiAgICAgIGZvciAodmFyIGxuYW1lIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyKSB7XG4gICAgICAgIHZhciBsQ29uZmlnID0gY29uZmlnLmxheWVyc1tsbmFtZV07XG4gICAgICAgIHZhciBodG1sID0gJzxkaXYgY2xhc3M9XCJsb2NhdGUtbGF5ZXJcIj4nO1xuICAgICAgICBodG1sICs9ICc8c2VsZWN0IGlkPVwibG9jYXRlLWxheWVyLScrY2xlYW5OYW1lKGxuYW1lKSsnXCIgY2xhc3M9XCJsYWJlbFwiPic7XG4gICAgICAgIGh0bWwgKz0gJzxvcHRpb24+JytsQ29uZmlnLnRpdGxlKycuLi48L29wdGlvbj4nO1xuICAgICAgICBodG1sICs9ICc8L3NlbGVjdD4nO1xuICAgICAgICBodG1sICs9ICc8L2Rpdj4nO1xuICAgICAgICAvL2NvbnN0cnVjdGluZyB0aGUgc2VsZWN0XG4gICAgICAgIGxvY2F0ZUNvbnRlbnQucHVzaChodG1sKTtcbiAgICAgIH1cbiAgICAgICQoJyNsb2NhdGUgLm1lbnUtY29udGVudCcpLmh0bWwobG9jYXRlQ29udGVudC5qb2luKCc8YnIvPicpKTtcbiAgICAgIG1hcC5hZGRMYXllcihuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoJ2xvY2F0ZWxheWVyJyx7XG4gICAgICAgIHN0eWxlTWFwOiBuZXcgT3BlbkxheWVycy5TdHlsZU1hcCh7XG4gICAgICAgICAgcG9pbnRSYWRpdXM6IDYsXG4gICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgc3Ryb2tlOiB0cnVlLFxuICAgICAgICAgIHN0cm9rZVdpZHRoOiAzLFxuICAgICAgICAgIHN0cm9rZUNvbG9yOiAneWVsbG93JyxcbiAgICAgICAgICBzdHJva2VPcGFjaXR5OiAwLjhcbiAgICAgICAgfSlcbiAgICAgIH0pKTtcblxuICAgICAgICAvLyBMaXptYXAgVVJMXG4gICAgICAgIHZhciBzZXJ2aWNlID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChsaXpVcmxzLndtc1xuICAgICAgICAgICAgICAgICxPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVyU3RyaW5nKGxpelVybHMucGFyYW1zKVxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBmZWF0dXJlVHlwZXMgPSBnZXRWZWN0b3JMYXllckZlYXR1cmVUeXBlcygpO1xuICAgICAgICBpZiAoZmVhdHVyZVR5cGVzLmxlbmd0aCA9PSAwICl7XG4gICAgICAgICAgY29uZmlnLmxvY2F0ZUJ5TGF5ZXIgPSB7fTtcbiAgICAgICAgICAkKCcjYnV0dG9uLWxvY2F0ZScpLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgICAgICQoJyNsb2NhdGUtbWVudScpLnJlbW92ZSgpO1xuICAgICAgICAgIHVwZGF0ZVN3aXRjaGVyU2l6ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZlYXR1cmVUeXBlcy5lYWNoKCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgdmFyIHR5cGVOYW1lID0gc2VsZi5maW5kKCdOYW1lJykudGV4dCgpO1xuICAgICAgICAgICAgdmFyIGxuYW1lID0gbGl6TWFwLmdldE5hbWVCeVR5cGVOYW1lKCB0eXBlTmFtZSApO1xuICAgICAgICAgICAgaWYgKCAhbG5hbWUgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVOYW1lIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyKVxuICAgICAgICAgICAgICAgICAgICBsbmFtZSA9IHR5cGVOYW1lXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoICh0eXBlTmFtZSBpbiBzaG9ydE5hbWVNYXApICYmIChzaG9ydE5hbWVNYXBbdHlwZU5hbWVdIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyKSlcbiAgICAgICAgICAgICAgICAgICAgbG5hbWUgPSBzaG9ydE5hbWVNYXBbdHlwZU5hbWVdO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxibCBpbiBjb25maWcubG9jYXRlQnlMYXllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxibC5zcGxpdCgnICcpLmpvaW4oJ18nKSA9PSB0eXBlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxuYW1lID0gbGJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoICEobG5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpIClcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBsb2NhdGUgPSBjb25maWcubG9jYXRlQnlMYXllcltsbmFtZV07XG4gICAgICAgICAgICBsb2NhdGVbJ2NycyddID0gc2VsZi5maW5kKCdTUlMnKS50ZXh0KCk7XG4gICAgICAgICAgICBsb2FkUHJvakRlZmluaXRpb24oIGxvY2F0ZS5jcnMsIGZ1bmN0aW9uKCBhUHJvaiApIHtcbiAgICAgICAgICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLlByb2plY3Rpb24obG9jYXRlLmNycyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHZhciBiYm94ID0gc2VsZi5maW5kKCdMYXRMb25nQm91bmRpbmdCb3gnKTtcbiAgICAgICAgICAgIGxvY2F0ZVsnYmJveCddID0gW1xuICAgICAgICAgICAgICAgIHBhcnNlRmxvYXQoYmJveC5hdHRyKCdtaW54JykpXG4gICAgICAgICAgICAgICAscGFyc2VGbG9hdChiYm94LmF0dHIoJ21pbnknKSlcbiAgICAgICAgICAgICAgICxwYXJzZUZsb2F0KGJib3guYXR0cignbWF4eCcpKVxuICAgICAgICAgICAgICAgLHBhcnNlRmxvYXQoYmJveC5hdHRyKCdtYXh5JykpXG4gICAgICAgICAgICBdO1xuICAgICAgICAgIH0gKTtcblxuICAgICAgICAgIC8vIGdldCBqb2luc1xuICAgICAgICAgIGZvciAodmFyIGxOYW1lIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyKSB7XG4gICAgICAgICAgICB2YXIgbG9jYXRlID0gY29uZmlnLmxvY2F0ZUJ5TGF5ZXJbbE5hbWVdO1xuICAgICAgICAgICAgaWYgKCd2ZWN0b3Jqb2lucycgaW4gbG9jYXRlKSB7XG4gICAgICAgICAgICAgIHZhciB2ZWN0b3Jqb2lucyA9IGxvY2F0ZVsndmVjdG9yam9pbnMnXTtcbiAgICAgICAgICAgICAgbG9jYXRlWydqb2luRmllbGROYW1lJ10gPSB2ZWN0b3Jqb2luc1sndGFyZ2V0RmllbGROYW1lJ107XG4gICAgICAgICAgICAgIGZvciAodmFyIGpOYW1lIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGpMb2NhdGUgPSBjb25maWcubG9jYXRlQnlMYXllcltqTmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKGpMb2NhdGUubGF5ZXJJZCA9PSB2ZWN0b3Jqb2lucy5qb2luTGF5ZXJJZCkge1xuICAgICAgICAgICAgICAgICAgbG9jYXRlWydqb2luTGF5ZXInXSA9IGpOYW1lO1xuICAgICAgICAgICAgICAgICAgakxvY2F0ZVsnam9pbkZpZWxkTmFtZSddID0gdmVjdG9yam9pbnNbJ2pvaW5GaWVsZE5hbWUnXTtcbiAgICAgICAgICAgICAgICAgIGpMb2NhdGVbJ2pvaW5MYXllciddID0gbE5hbWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZ2V0IGZlYXR1cmVzXG4gICAgICAgICAgZm9yICh2YXIgbG5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpIHtcbiAgICAgICAgICAgIGdldExvY2F0ZUZlYXR1cmUobG5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcuYnRuLWxvY2F0ZS1jbGVhcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZSgnbG9jYXRlbGF5ZXInKVswXTtcbiAgICAgICAgICAgIGxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICAgICAgJCgnI2xvY2F0ZSBzZWxlY3QnKS52YWwoJy0xJyk7XG4gICAgICAgICAgICAkKCdkaXYubG9jYXRlLWxheWVyIHNwYW4gPiBpbnB1dCcpLnZhbCgnJyk7XG5cbiAgICAgICAgICAgIGlmKCBsaXpNYXAubGl6bWFwTGF5ZXJGaWx0ZXJBY3RpdmUgKXtcbiAgICAgICAgICAgICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudCgnbGl6bWFwbG9jYXRlZmVhdHVyZWNhbmNlbGVkJyxcbiAgICAgICAgICAgICAgICAgIHsnZmVhdHVyZVR5cGUnOiBsaXpNYXAubGl6bWFwTGF5ZXJGaWx0ZXJBY3RpdmV9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgJCgnI2xvY2F0ZS1jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgJCgnLmJ0bi1sb2NhdGUtY2xlYXInKS5jbGljaygpOyAvLyBkZWFjdGl2YXRlIGxvY2F0ZSBmZWF0dXJlIGFuZCBmaWx0ZXJcbiAgICAgICAgICAgICQoJyNidXR0b24tbG9jYXRlJykuY2xpY2soKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoJyNzd2l0Y2hlciBzcGFuLmxhYmVsJykudG9vbHRpcCh7XG4gICAgICB2aWV3cG9ydDogJyNkb2NrJ1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gY3JlYXRlU3dpdGNoZXIoKSB7XG4gICAgLy8gc2V0IHRoZSBzd2l0Y2hlciBjb250ZW50XG4gICAgJCgnI3N3aXRjaGVyLWxheWVycycpLmh0bWwoZ2V0U3dpdGNoZXJOb2RlKHRyZWUsMCkpO1xuICAgICQoJyNzd2l0Y2hlciB0YWJsZS50cmVlJykudHJlZVRhYmxlKHtcbiAgICAgIHN0cmluZ0V4cGFuZDogbGl6RGljdFsndHJlZS5idXR0b24uZXhwYW5kJ10sXG4gICAgICBzdHJpbmdDb2xsYXBzZTogbGl6RGljdFsndHJlZS5idXR0b24uY29sbGFwc2UnXSxcbiAgICAgIG9uTm9kZVNob3c6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHNlbGYuYWRkQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAgICAgaWYgKHNlbGYuZmluZCgnZGl2LmxlZ2VuZEdyYXBoaWNzJykubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICB2YXIgbmFtZSA9IHNlbGYuYXR0cignaWQnKS5yZXBsYWNlKCdsZWdlbmQtJywnJyk7XG4gICAgICAgICAgdmFyIHVybCA9IGdldExheWVyTGVnZW5kR3JhcGhpY1VybChuYW1lLCB0cnVlKTtcbiAgICAgICAgICBpZiAoIHVybCAhPSBudWxsICYmIHVybCAhPSAnJyApIHtcbiAgICAgICAgICAgICAgdmFyIGxpbWcgPSBzZWxmLmZpbmQoJ2Rpdi5sZWdlbmRHcmFwaGljcyBpbWcnKTtcbiAgICAgICAgICAgICAgbGltZy5hdHRyKCdkYXRhLXNyYycsIHVybCApO1xuICAgICAgICAgICAgICBsaW1nLmF0dHIoJ3NyYycsIGxpbWcuYXR0cignZGF0YS1zcmMnKSApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uTm9kZUhpZGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICAkKFwiI3N3aXRjaGVyIHRhYmxlLnRyZWUgdGJvZHlcIikub24oXCJtb3VzZWRvd25cIiwgXCJ0ciB0ZCBzcGFuXCIsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAvLyBPbmx5IGFjdCBvbiBsZWZ0IGJ1dHRvbiBjbGlja1xuICAgICAgaWYoZXZlbnQud2hpY2ggPT09IDEpe1xuICAgICAgICB2YXIgd2FzU2VsZWN0ZWQgPSAkKHRoaXMpLnBhcmVudHMoJ3RyOmZpcnN0JykuaGFzQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgIHZhciBpc1NlbGVjdGVkID0gIXdhc1NlbGVjdGVkO1xuICAgICAgICAkKFwiI3N3aXRjaGVyIHRhYmxlLnRyZWUgdGJvZHkgdHJcIikucmVtb3ZlQ2xhc3MoJ3NlbGVjdGVkJyk7XG4gICAgICAgICQodGhpcykucGFyZW50cygndHI6Zmlyc3QnKS50b2dnbGVDbGFzcyhcInNlbGVjdGVkXCIsIGlzU2VsZWN0ZWQpO1xuICAgICAgICAkKCcjc3dpdGNoZXItbGF5ZXJzLWFjdGlvbnMnKS50b2dnbGVDbGFzcygnYWN0aXZlJywgaXNTZWxlY3RlZCk7XG5cbiAgICAgICAgLy8gVHJpZ2dlciBldmVudFxuICAgICAgICB2YXIgaWQgPSAkKHRoaXMpLnBhcmVudHMoJ3RyOmZpcnN0JykuYXR0cignaWQnKTtcbiAgICAgICAgdmFyIGl0ZW1UeXBlID0gaWQuc3BsaXQoJy0nKVswXTtcbiAgICAgICAgdmFyIGl0ZW1OYW1lID0gaWQuc3BsaXQoJy0nKVsxXTtcbiAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoXCJsaXptYXBzd2l0Y2hlcml0ZW1zZWxlY3RlZFwiLFxuICAgICAgICAgIHsgJ25hbWUnOiBpdGVtTmFtZSwgJ3R5cGUnOiBpdGVtVHlwZSwgJ3NlbGVjdGVkJzogaXNTZWxlY3RlZH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxpek1hcC5ldmVudHMub24oe1xuICAgICAgICBkb2Nrb3BlbmVkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICAvLyBTZXQgdGhlIHRhYi1jb250ZW50IG1heC1oZWlnaHRcbiAgICAgICAgICAgIGlmICggJCgnI2RvY2stdGFicycpLmlzKCc6dmlzaWJsZScpIClcbiAgICAgICAgICAgICAgICAkKCcjZG9jay1jb250ZW50JykuY3NzKCAnbWF4LWhlaWdodCcsICQoJyNkb2NrJykuaGVpZ2h0KCkgLSAkKCcjZG9jay10YWJzJykuaGVpZ2h0KCkgKTtcbiAgICAgICAgICAgIGlmICggZS5pZCA9PSAnc3dpdGNoZXInICkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVN3aXRjaGVyU2l6ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cblxuICAvLyA9PT0gUHJpdmF0ZSBmdW5jdGlvbnNcbiAgdmFyIG9wdGlvbnMgPSB7XG4gICAgY2hpbGRQcmVmaXggOiBcImNoaWxkLW9mLVwiXG4gIH07XG5cbiAgZnVuY3Rpb24gY2hpbGRyZW5PZihub2RlKSB7XG4gICAgcmV0dXJuICQobm9kZSkuc2libGluZ3MoXCJ0ci5cIiArIG9wdGlvbnMuY2hpbGRQcmVmaXggKyBub2RlWzBdLmlkKTtcbiAgfTtcblxuICBmdW5jdGlvbiBkZXNjZW5kYW50c09mKG5vZGUpIHtcbiAgICB2YXIgZGVzY2VuZGFudHMgPSBbXTtcbiAgICB2YXIgY2hpbGRyZW4gPSBbXTtcbiAgICBpZiAobm9kZSAmJiBub2RlWzBdKVxuICAgICAgY2hpbGRyZW4gPSBjaGlsZHJlbk9mKG5vZGUpO1xuICAgIGZvciAodmFyIGk9MCwgbGVuPWNoaWxkcmVuLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgZGVzY2VuZGFudHMucHVzaChjaGlsZHJlbltpXSk7XG4gICAgICBkZXNjZW5kYW50cyA9IGRlc2NlbmRhbnRzLmNvbmNhdChkZXNjZW5kYW50c09mKFtjaGlsZHJlbltpXV0pKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlc2NlbmRhbnRzO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHBhcmVudE9mKG5vZGUpIHtcbiAgICBpZiAobm9kZS5sZW5ndGggPT0gMCApXG4gICAgICByZXR1cm4gbnVsbDtcblxuICAgIHZhciBjbGFzc05hbWVzID0gbm9kZVswXS5jbGFzc05hbWUuc3BsaXQoJyAnKTtcblxuICAgIGZvcih2YXIga2V5PTA7IGtleTxjbGFzc05hbWVzLmxlbmd0aDsga2V5KyspIHtcbiAgICAgIGlmKGNsYXNzTmFtZXNba2V5XS5tYXRjaChvcHRpb25zLmNoaWxkUHJlZml4KSkge1xuICAgICAgICByZXR1cm4gJChub2RlKS5zaWJsaW5ncyhcIiNcIiArIGNsYXNzTmFtZXNba2V5XS5zdWJzdHJpbmcob3B0aW9ucy5jaGlsZFByZWZpeC5sZW5ndGgpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfTtcblxuICBmdW5jdGlvbiBhbmNlc3RvcnNPZihub2RlKSB7XG4gICAgdmFyIGFuY2VzdG9ycyA9IFtdO1xuICAgIHdoaWxlKG5vZGUgPSBwYXJlbnRPZihub2RlKSkge1xuICAgICAgYW5jZXN0b3JzW2FuY2VzdG9ycy5sZW5ndGhdID0gbm9kZVswXTtcbiAgICB9XG4gICAgcmV0dXJuIGFuY2VzdG9ycztcbiAgfTtcblxuICAgIC8vIGFjdGl2YXRlIGNoZWNrYm94IGJ1dHRvbnNcbiAgICAkKCcjc3dpdGNoZXIgYnV0dG9uLmNoZWNrYm94JylcbiAgICAuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgIGlmIChzZWxmLmhhc0NsYXNzKCdkaXNhYmxlZCcpKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAvLyBnZXQgdHIgb2YgdGhlIGJ1dHRvblxuICAgICAgdmFyIHNlbGZUciA9IHNlbGYucGFyZW50cygndHInKS5maXJzdCgpO1xuICAgICAgLy8gZ2V0IHRoZSBwYXJlbnQgb2YgdGhlIHRyIG9mIHRoZSBidXR0b25cbiAgICAgIHZhciBwYXJlbnRUciA9IHBhcmVudE9mKCBzZWxmVHIgKTtcbiAgICAgIC8vIGdldCB0aGUgc2libGluZ3Mgb2YgdGhlIHRyIG9mIHRoZSBidXR0b25cbiAgICAgIHZhciBzaWJsaW5nc1RyID0gW107XG4gICAgICBpZiAoIHBhcmVudFRyICYmIHBhcmVudFRyLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgIGZvciAodmFyIGM9MCwgY2hpbGRyZW5QYXJlbnRUcj1jaGlsZHJlbk9mKHBhcmVudFRyKTsgYzxjaGlsZHJlblBhcmVudFRyLmxlbmd0aDsgYysrKXtcbiAgICAgICAgICAgIHZhciBzaWJsaW5nVHIgPSAkKGNoaWxkcmVuUGFyZW50VHJbY10pO1xuICAgICAgICAgICAgaWYoIHNpYmxpbmdUci5hdHRyKCdpZCcpICE9IHNlbGZUci5hdHRyKCdpZCcpIClcbiAgICAgICAgICAgICAgc2libGluZ3NUci5wdXNoKCBzaWJsaW5nVHIgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdmFyIGFuY2VzdG9ycyA9IFtdO1xuICAgICAgaWYoIHNlbGZUci5oYXNDbGFzcygnbGl6LWxheWVyJykgKSB7XG4gICAgICAgICAgLy8gbWFuYWdlIHRoZSBidXR0b24gbGF5ZXJcbiAgICAgICAgICBpZiggIXNlbGYuaGFzQ2xhc3MoJ2NoZWNrZWQnKSApIHtcbiAgICAgICAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygncGFydGlhbCcpLmFkZENsYXNzKCdjaGVja2VkJyk7XG4gICAgICAgICAgICAgIHNlbGZUci5maW5kKCdidXR0b24uY2hlY2tib3hbbmFtZT1cImxheWVyXCJdJykuZWFjaChmdW5jdGlvbihpLGIpe1xuICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJChiKS52YWwoKTtcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKG5hbWUpWzBdO1xuICAgICAgICAgICAgICAgIGlmKCB0eXBlb2YgbGF5ZXIgIT09ICd1bmRlZmluZWQnIClcbiAgICAgICAgICAgICAgICAgIGxheWVyLnNldFZpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ3BhcnRpYWwnKS5yZW1vdmVDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgICAgICAgICBzZWxmVHIuZmluZCgnYnV0dG9uLmNoZWNrYm94W25hbWU9XCJsYXllclwiXScpLmVhY2goZnVuY3Rpb24oaSxiKXtcbiAgICAgICAgICAgICAgICB2YXIgbmFtZSA9ICQoYikudmFsKCk7XG4gICAgICAgICAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShuYW1lKVswXTtcbiAgICAgICAgICAgICAgICBpZiggdHlwZW9mIGxheWVyICE9PSAndW5kZWZpbmVkJyApXG4gICAgICAgICAgICAgICAgICBsYXllci5zZXRWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmKCBzZWxmVHIuaGFzQ2xhc3MoJ211dHVhbGx5LWV4Y2x1c2l2ZScpICl7XG4gICAgICAgICAgICAgIGlmKCBzZWxmLmhhc0NsYXNzKCdjaGVja2VkJykgKSB7XG4gICAgICAgICAgICAgICAgICBmb3IodmFyIHM9MCwgc2xlbj1zaWJsaW5nc1RyLmxlbmd0aDsgczxzbGVuOyBzKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgc2libGluZ1RyID0gJChzaWJsaW5nc1RyW3NdKTtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgc2libGluZ0J1dHQgPSBzaWJsaW5nVHIuZmluZCgnYnV0dG9uLmNoZWNrYm94Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYoIHNpYmxpbmdCdXR0Lmhhc0NsYXNzKCdjaGVja2VkJykgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpYmxpbmdCdXR0LnJlbW92ZUNsYXNzKCdwYXJ0aWFsJykucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBzaWJsaW5nQnV0dC5hdHRyKCduYW1lJykgPT0gJ2xheWVyJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJChzaWJsaW5nQnV0dCkudmFsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShuYW1lKVswXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiggdHlwZW9mIGxheWVyICE9PSAndW5kZWZpbmVkJyApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllci5zZXRWaXNpYmlsaXR5KGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoIHBhcmVudFRyICYmIHBhcmVudFRyLmxlbmd0aCAhPSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIHBhcmVudEJ1dHQgPSBwYXJlbnRUci5maW5kKCdidXR0b24uY2hlY2tib3gnKTtcbiAgICAgICAgICAgICAgICAgICAgICBwYXJlbnRCdXR0LnJlbW92ZUNsYXNzKCdwYXJ0aWFsJykuYWRkQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSBlbHNlIGlmICggcGFyZW50VHIgJiYgcGFyZW50VHIubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgICAgIHZhciBwYXJlbnRCdXR0ID0gcGFyZW50VHIuZmluZCgnYnV0dG9uLmNoZWNrYm94Jyk7XG4gICAgICAgICAgICAgICAgICBwYXJlbnRCdXR0LnJlbW92ZUNsYXNzKCdwYXJ0aWFsJykucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhbmNlc3RvcnMgPSBhbmNlc3RvcnNPZihwYXJlbnRUcik7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFuY2VzdG9ycyA9IGFuY2VzdG9yc09mKHNlbGZUcik7XG4gICAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBtYW5hZ2UgdGhlIGJ1dHRvbiBncm91cFxuICAgICAgICAgIHZhciBkZXNjZW5kYW50cyA9IGRlc2NlbmRhbnRzT2Yoc2VsZlRyKTtcbiAgICAgICAgICB2YXIgbXV0dWFsbHlFeGNsdXNpdmVHcm91cHMgPSBbXTtcbiAgICAgICAgICAkLmVhY2goZGVzY2VuZGFudHMsZnVuY3Rpb24oaSx0cikge1xuICAgICAgICAgICAgdHIgPSAkKHRyKTtcbiAgICAgICAgICAgIHZhciBidXR0ID0gdHIuZmluZCgnYnV0dG9uLmNoZWNrYm94Jyk7XG4gICAgICAgICAgICBpZiggIXNlbGYuaGFzQ2xhc3MoJ2NoZWNrZWQnKSApIHtcbiAgICAgICAgICAgICAgICBidXR0LnJlbW92ZUNsYXNzKCdwYXJ0aWFsJykuYWRkQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICBpZiggdHIuaGFzQ2xhc3MoJ2xpei1sYXllcicpICYmIGJ1dHQuYXR0cignbmFtZScpID09ICdsYXllcicpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYoIHRyLmhhc0NsYXNzKCdtdXR1YWxseS1leGNsdXNpdmUnKSApe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBUciA9IHBhcmVudE9mKHRyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBwSWQgPSBwVHIuYXR0cignaWQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBtdXR1YWxseUV4Y2x1c2l2ZUdyb3Vwcy5pbmRleE9mKHBJZCkgIT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYnV0dC5yZW1vdmVDbGFzcygncGFydGlhbCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgbXV0dWFsbHlFeGNsdXNpdmVHcm91cHMucHVzaChwSWQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHZhciBuYW1lID0gJChidXR0KS52YWwoKTtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShuYW1lKVswXTtcbiAgICAgICAgICAgICAgICAgICAgaWYoIHR5cGVvZiBsYXllciAhPT0gJ3VuZGVmaW5lZCcgKVxuICAgICAgICAgICAgICAgICAgICAgIGxheWVyLnNldFZpc2liaWxpdHkodHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidXR0LnJlbW92ZUNsYXNzKCdwYXJ0aWFsJykucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgICAgICBpZiggdHIuaGFzQ2xhc3MoJ2xpei1sYXllcicpICYmIGJ1dHQuYXR0cignbmFtZScpID09ICdsYXllcicpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5hbWUgPSAkKGJ1dHQpLnZhbCgpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGF5ZXIgPSBtYXAuZ2V0TGF5ZXJzQnlOYW1lKG5hbWUpWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiggdHlwZW9mIGxheWVyICE9PSAndW5kZWZpbmVkJyApXG4gICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuc2V0VmlzaWJpbGl0eShmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmKCAhc2VsZi5oYXNDbGFzcygnY2hlY2tlZCcpIClcbiAgICAgICAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygncGFydGlhbCcpLmFkZENsYXNzKCdjaGVja2VkJyk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICBzZWxmLnJlbW92ZUNsYXNzKCdwYXJ0aWFsJykucmVtb3ZlQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICAgICBhbmNlc3RvcnMgPSBhbmNlc3RvcnNPZihzZWxmVHIpO1xuICAgICAgfVxuICAgICAgLy8gbWFuYWdlIGFuY2VzdG9yc1xuICAgICAgJC5lYWNoKGFuY2VzdG9ycyxmdW5jdGlvbihpLHRyKSB7XG4gICAgICAgIHRyID0gJCh0cik7XG4gICAgICAgIHZhciBjb3VudCA9IDA7XG4gICAgICAgIHZhciBjaGVja2VkID0gMDtcbiAgICAgICAgdmFyIHBjaGVja2VkID0gMDtcbiAgICAgICAgdmFyIHRyRGVzYyA9IGNoaWxkcmVuT2YodHIpO1xuICAgICAgICAkLmVhY2godHJEZXNjLGZ1bmN0aW9uKGosdHJkKSB7XG4gICAgICAgICAgJCh0cmQpLmZpbmQoJ2J1dHRvbi5jaGVja2JveCcpLmVhY2goZnVuY3Rpb24oaSxiKXtcbiAgICAgICAgICAgIGIgPSAkKGIpO1xuICAgICAgICAgICAgaWYgKCBiLmhhc0NsYXNzKCdjaGVja2VkJykgKVxuICAgICAgICAgICAgICBjaGVja2VkKys7XG4gICAgICAgICAgICBlbHNlIGlmICggYi5oYXNDbGFzcygncGFydGlhbCcpJiYgYi5oYXNDbGFzcygnY2hlY2tlZCcpIClcbiAgICAgICAgICAgICAgcGNoZWNrZWQrKztcbiAgICAgICAgICAgIGNvdW50Kys7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB2YXIgdHJCdXR0ID0gdHIuZmluZCgnYnV0dG9uLmNoZWNrYm94Jyk7XG4gICAgICAgIGlmIChjb3VudD09Y2hlY2tlZClcbiAgICAgICAgICB0ckJ1dHQucmVtb3ZlQ2xhc3MoJ3BhcnRpYWwnKS5hZGRDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgICBlbHNlIGlmIChjaGVja2VkPT0wICYmIHBjaGVja2VkPT0wKVxuICAgICAgICAgIHRyQnV0dC5yZW1vdmVDbGFzcygncGFydGlhbCcpLnJlbW92ZUNsYXNzKCdjaGVja2VkJyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICB0ckJ1dHQuYWRkQ2xhc3MoJ3BhcnRpYWwnKS5hZGRDbGFzcygnY2hlY2tlZCcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvLyBhY3RpdmF0ZSBsaW5rIGJ1dHRvbnNcbiAgICAkKCcjc3dpdGNoZXIgYnV0dG9uLmxpbmsnKVxuICAgIC5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgaWYgKHNlbGYuaGFzQ2xhc3MoJ2Rpc2FibGVkJykpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIHZhciB3aW5kb3dMaW5rID0gc2VsZi52YWwoKTtcbiAgICAgIC8vIFRlc3QgaWYgdGhlIGxpbmsgaXMgaW50ZXJuYWxcbiAgICAgIHZhciBtZWRpYVJlZ2V4ID0gL14oXFwvKT9tZWRpYVxcLy87XG4gICAgICBpZihtZWRpYVJlZ2V4LnRlc3Qod2luZG93TGluaykpe1xuICAgICAgICB2YXIgbWVkaWFMaW5rID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChsaXpVcmxzLm1lZGlhXG4gICAgICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgICAgIClcbiAgICAgICAgd2luZG93TGluayA9IG1lZGlhTGluaysnJnBhdGg9Lycrd2luZG93TGluaztcbiAgICAgIH1cbiAgICAgIC8vIE9wZW4gbGluayBpbiBhIG5ldyB3aW5kb3dcbiAgICAgIHdpbmRvdy5vcGVuKHdpbmRvd0xpbmspO1xuICAgIH0pO1xuXG4gICAgLy8gQWN0aXZhdGUgcmVtb3ZlQ2FjaGUgYnV0dG9uXG4gICAgJCgnI3N3aXRjaGVyIGJ1dHRvbi5yZW1vdmVDYWNoZScpXG4gICAgLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICBpZiAoc2VsZi5oYXNDbGFzcygnZGlzYWJsZWQnKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgdmFyIHJlbW92ZUNhY2hlU2VydmVyVXJsID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChcbiAgICAgICAgIGxpelVybHMucmVtb3ZlQ2FjaGVcbiAgICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgICApO1xuICAgICAgdmFyIHdpbmRvd0xpbmsgPSByZW1vdmVDYWNoZVNlcnZlclVybCArICcmbGF5ZXI9JyArIHNlbGYudmFsKCk7XG4gICAgICAvLyBPcGVuIGxpbmsgaW4gYSBuZXcgd2luZG93XG4gICAgICBpZiAoY29uZmlybShsaXpEaWN0Wyd0cmVlLmJ1dHRvbi5yZW1vdmVDYWNoZSddICsgJyA/JykpXG4gICAgICAgIHdpbmRvdy5vcGVuKHdpbmRvd0xpbmspO1xuICAgIH0pO1xuXG4gICAgdmFyIHByb2plY3Rpb24gPSBtYXAucHJvamVjdGlvbjtcblxuICAgIC8vbWFuYWdlIFdNUyBtYXggd2lkdGggYW5kIGhlaWdodFxuICAgIHZhciB3bXNNYXhXaWR0aCA9IDMwMDA7XG4gICAgdmFyIHdtc01heEhlaWdodCA9IDMwMDA7XG4gICAgaWYoICgnd21zTWF4V2lkdGgnIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy53bXNNYXhXaWR0aCApXG4gICAgICAgIHdtc01heFdpZHRoID0gTnVtYmVyKGNvbmZpZy5vcHRpb25zLndtc01heFdpZHRoKTtcbiAgICBpZiggKCd3bXNNYXhIZWlnaHQnIGluIGNvbmZpZy5vcHRpb25zKSAmJiBjb25maWcub3B0aW9ucy53bXNNYXhIZWlnaHQgKVxuICAgICAgICB3bXNNYXhIZWlnaHQgPSBOdW1iZXIoY29uZmlnLm9wdGlvbnMud21zTWF4SGVpZ2h0KTtcbiAgICB2YXIgcmVtb3ZlU2luZ2xlVGlsZSA9IGZhbHNlO1xuICAgIHZhciBtYXBTaXplID0gbWFwLnNpemU7XG4gICAgdmFyIHJlcGxhY2VTaW5nbGVUaWxlU2l6ZSA9IG5ldyBPcGVuTGF5ZXJzLlNpemUod21zTWF4V2lkdGgsIHdtc01heEhlaWdodCk7XG4gICAgaWYoIG1hcFNpemUudyA+IHdtc01heFdpZHRoIHx8IG1hcFNpemUuaCA+IHdtc01heEhlaWdodCApe1xuICAgICAgICByZW1vdmVTaW5nbGVUaWxlID0gdHJ1ZTtcbiAgICAgICAgdmFyIHdtc01heE1heCA9IE1hdGgubWF4KHdtc01heFdpZHRoLCB3bXNNYXhIZWlnaHQpO1xuICAgICAgICB2YXIgd21zTWluTWF4ID0gTWF0aC5taW4od21zTWF4V2lkdGgsIHdtc01heEhlaWdodCk7XG4gICAgICAgIHZhciBtYXBNYXggPSBNYXRoLm1heChtYXBTaXplLncsIG1hcFNpemUuaCk7XG4gICAgICAgIHZhciBtYXBNaW4gPSBNYXRoLm1pbihtYXBTaXplLncsIG1hcFNpemUuaCk7XG4gICAgICAgIGlmKCBtYXBNYXgvMiA+IG1hcE1pbiApXG4gICAgICAgICAgcmVwbGFjZVNpbmdsZVRpbGVTaXplID0gbmV3IE9wZW5MYXllcnMuU2l6ZShNYXRoLnJvdW5kKG1hcE1heC8yKSwgTWF0aC5yb3VuZChtYXBNYXgvMikpO1xuICAgICAgICBlbHNlIGlmKCB3bXNNYXhNYXgvMiA+IG1hcE1pbiApXG4gICAgICAgICAgcmVwbGFjZVNpbmdsZVRpbGVTaXplID0gbmV3IE9wZW5MYXllcnMuU2l6ZShNYXRoLnJvdW5kKHdtc01heE1heC8yKSwgTWF0aC5yb3VuZCh3bXNNYXhNYXgvMikpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgcmVwbGFjZVNpbmdsZVRpbGVTaXplID0gbmV3IE9wZW5MYXllcnMuU2l6ZShNYXRoLnJvdW5kKHdtc01pbk1heC8yKSwgTWF0aC5yb3VuZCh3bXNNaW5NYXgvMikpO1xuICAgIH1cblxuICAgIC8vIGdldCB0aGUgYmFzZWxheWVyIHNlbGVjdCBjb250ZW50XG4gICAgLy8gYW5kIGFkZGluZyBiYXNlbGF5ZXJzIHRvIHRoZSBtYXBcbiAgICB2YXIgc2VsZWN0ID0gW107XG4gICAgYmFzZWxheWVycy5yZXZlcnNlKCk7XG4gICAgZm9yICh2YXIgaT0wLGxlbj1iYXNlbGF5ZXJzLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgdmFyIGJhc2VsYXllciA9IGJhc2VsYXllcnNbaV1cbiAgICAgIGJhc2VsYXllci51bml0cyA9IHByb2plY3Rpb24ucHJvai51bml0cztcbiAgICAgIC8vIFVwZGF0ZSBzaW5nbGVUaWxlIGxheWVyc1xuICAgICAgaWYoIHJlbW92ZVNpbmdsZVRpbGUgJiYgKGJhc2VsYXllciBpbnN0YW5jZW9mIE9wZW5MYXllcnMuTGF5ZXIuV01TKSAmJiBiYXNlbGF5ZXIuc2luZ2xlVGlsZSApIHtcbiAgICAgICAgICBiYXNlbGF5ZXIuYWRkT3B0aW9ucyh7c2luZ2xlVGlsZTpmYWxzZSwgdGlsZVNpemU6IHJlcGxhY2VTaW5nbGVUaWxlU2l6ZX0pO1xuICAgICAgfVxuICAgICAgdHJ5eyAvLyBiZWNhdXNlIGdvb2dsZSBtYXBzIGxheWVyIGNhbiBiZSBjcmVhdGVkIGJ1dCBub3QgYWRkZWRcbiAgICAgICAgICBtYXAuYWRkTGF5ZXIoYmFzZWxheWVyKTtcbiAgICAgICAgICB2YXIgcWdpc05hbWUgPSBiYXNlbGF5ZXIubmFtZTtcbiAgICAgICAgICBpZiAoIGJhc2VsYXllci5uYW1lIGluIGNsZWFuTmFtZU1hcCApXG4gICAgICAgICAgICAgIHFnaXNOYW1lID0gZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUoYmFzZWxheWVyLm5hbWUpO1xuICAgICAgICAgIHZhciBibENvbmZpZyA9IGNvbmZpZy5sYXllcnNbcWdpc05hbWVdO1xuICAgICAgICAgIGlmIChibENvbmZpZylcbiAgICAgICAgICAgIHNlbGVjdCArPSAnPG9wdGlvbiB2YWx1ZT1cIicrYmFzZWxheWVyLm5hbWUrJ1wiPicrYmxDb25maWcudGl0bGUrJzwvb3B0aW9uPic7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgc2VsZWN0ICs9ICc8b3B0aW9uIHZhbHVlPVwiJytiYXNlbGF5ZXIubmFtZSsnXCI+JytiYXNlbGF5ZXIubmFtZSsnPC9vcHRpb24+JztcblxuICAgICAgfSBjYXRjaChlKSB7XG4gICAgICAgICAgdmFyIHFnaXNOYW1lID0gYmFzZWxheWVyLm5hbWU7XG4gICAgICAgICAgaWYgKCBiYXNlbGF5ZXIubmFtZSBpbiBjbGVhbk5hbWVNYXAgKVxuICAgICAgICAgICAgICBxZ2lzTmFtZSA9IGdldExheWVyTmFtZUJ5Q2xlYW5OYW1lKGJhc2VsYXllci5uYW1lKTtcbiAgICAgICAgICBjb25zb2xlLmxvZyhxZ2lzTmFtZStcIiBjYW4ndCBiZSBhZGRlZCB0byB0aGUgbWFwIVwiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYmFzZWxheWVycy5sZW5ndGghPTApIHtcbiAgICAgIC8vIGFjdGl2ZSB0aGUgc2VsZWN0IGVsZW1lbnQgZm9yIGJhc2VsYXllcnNcbiAgICAgICQoJyNzd2l0Y2hlci1iYXNlbGF5ZXItc2VsZWN0JykuYXBwZW5kKHNlbGVjdCk7XG4gICAgICAkKCcjc3dpdGNoZXItYmFzZWxheWVyLXNlbGVjdCcpXG4gICAgICAgIC5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdmFyIHZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgdmFyIGJsTmFtZSA9IG1hcC5nZXRMYXllcnNCeU5hbWUodmFsKVswXTtcbiAgICAgICAgICBtYXAuc2V0QmFzZUxheWVyKCBibE5hbWUgKTtcblxuICAgICAgICAgIC8vIFRyaWdnZXIgZXZlbnRcbiAgICAgICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudChcImxpem1hcGJhc2VsYXllcmNoYW5nZWRcIixcbiAgICAgICAgICAgIHsgJ2xheWVyJzogYmxOYW1lfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICAkKHRoaXMpLmJsdXIoKTtcbiAgICAgICAgfSk7XG4gICAgICAvLyBIaWRlIHN3aXRjaGVyLWJhc2VsYXllciBpZiBvbmx5IG9uZSBiYXNlIGxheWVyIGluc2lkZVxuICAgICAgaWYgKGJhc2VsYXllcnMubGVuZ3RoPT0xKXtcbiAgICAgICAgJCgnI3N3aXRjaGVyLWJhc2VsYXllcicpLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgIGVsc2UgaWYgKCAnc3RhcnR1cEJhc2VsYXllcicgaW4gY29uZmlnLm9wdGlvbnMgKSB7XG4gICAgICAgICAgdmFyIHN0YXJ0dXBCYXNlbGF5ZXIgPSBjb25maWcub3B0aW9uc1snc3RhcnR1cEJhc2VsYXllciddO1xuICAgICAgICAgIGlmICggc3RhcnR1cEJhc2VsYXllciBpbiBzdGFydHVwQmFzZWxheWVyc1JlcGxhY2VtZW50IClcbiAgICAgICAgICAgIHN0YXJ0dXBCYXNlbGF5ZXIgPSBzdGFydHVwQmFzZWxheWVyc1JlcGxhY2VtZW50W3N0YXJ0dXBCYXNlbGF5ZXJdO1xuICAgICAgICAgIGVsc2UgaWYgKCBzdGFydHVwQmFzZWxheWVyIGluIGNvbmZpZy5sYXllcnMgKVxuICAgICAgICAgICAgc3RhcnR1cEJhc2VsYXllciA9IGNsZWFuTmFtZShzdGFydHVwQmFzZWxheWVyKTtcblxuICAgICAgICAgIGlmICggJCgnI3N3aXRjaGVyLWJhc2VsYXllci1zZWxlY3Qgb3B0aW9uW3ZhbHVlPVwiJytzdGFydHVwQmFzZWxheWVyKydcIl0nKS5sZW5ndGggIT0gMClcbiAgICAgICAgICAgICQoJyNzd2l0Y2hlci1iYXNlbGF5ZXItc2VsZWN0JykudmFsKHN0YXJ0dXBCYXNlbGF5ZXIpLmNoYW5nZSgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBoaWRlIGVsZW1lbnRzIGZvciBiYXNlbGF5ZXJzXG4gICAgICAkKCcjc3dpdGNoZXItYmFzZWxheWVyJykuaGlkZSgpO1xuICAgICAgbWFwLmFkZExheWVyKG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcignYmFzZWxheWVyJyx7XG4gICAgICAgIG1heEV4dGVudDptYXAubWF4RXh0ZW50XG4gICAgICAgLG1heFNjYWxlOiBtYXAubWF4U2NhbGVcbiAgICAgICAsbWluU2NhbGU6IG1hcC5taW5TY2FsZVxuICAgICAgICxudW1ab29tTGV2ZWxzOiBtYXAubnVtWm9vbUxldmVsc1xuICAgICAgICxzY2FsZXM6IG1hcC5zY2FsZXNcbiAgICAgICAscHJvamVjdGlvbjogbWFwLnByb2plY3Rpb25cbiAgICAgICAsdW5pdHM6IG1hcC5wcm9qZWN0aW9uLnByb2oudW5pdHNcbiAgICAgIH0pKTtcbiAgICB9XG5cbiAgICAvLyBhZGRpbmcgbGF5ZXJzIHRvIHRoZSBtYXBcbiAgICBsYXllcnMuc29ydChmdW5jdGlvbihhLCBiKSB7XG4gICAgICBpZiAoYS5vcmRlciA9PSBiLm9yZGVyKVxuICAgICAgICByZXR1cm4gMDtcbiAgICAgIHJldHVybiBhLm9yZGVyID4gYi5vcmRlciA/IDEgOiAtMTtcbiAgICB9KTtcbiAgICBsYXllcnMucmV2ZXJzZSgpO1xuICAgIGZvciAodmFyIGk9MCxsZW49bGF5ZXJzLmxlbmd0aDsgaTxsZW47IGkrKykge1xuICAgICAgdmFyIGwgPSBsYXllcnNbaV07XG4gICAgICBsLnVuaXRzID0gcHJvamVjdGlvbi5wcm9qLnVuaXRzO1xuICAgICAgbC5ldmVudHMub24oe1xuICAgICAgICBsb2Fkc3RhcnQ6IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgICQoJyNsYXllci0nK2V2dC5vYmplY3QubmFtZSsnIHNwYW4ubG9hZGluZycpLmFkZENsYXNzKCdsb2Fkc3RhcnQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgbG9hZGVuZDogZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgJCgnI2xheWVyLScrZXZ0Lm9iamVjdC5uYW1lKycgc3Bhbi5sb2FkaW5nJykucmVtb3ZlQ2xhc3MoJ2xvYWRzdGFydCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIEFkZCBvbmx5IGxheWVycyB3aXRoIGdlb21ldHJ5XG4gICAgICB2YXIgcWdpc05hbWUgPSBudWxsO1xuICAgICAgaWYgKCBsLm5hbWUgaW4gY2xlYW5OYW1lTWFwIClcbiAgICAgICAgICBxZ2lzTmFtZSA9IGdldExheWVyTmFtZUJ5Q2xlYW5OYW1lKGwubmFtZSk7XG4gICAgICB2YXIgYUNvbmZpZyA9IG51bGw7XG4gICAgICBpZiAoIHFnaXNOYW1lIClcbiAgICAgICAgICBhQ29uZmlnID0gY29uZmlnLmxheWVyc1txZ2lzTmFtZV07XG4gICAgICBpZiAoICFhQ29uZmlnIClcbiAgICAgICAgICBhQ29uZmlnID0gY29uZmlnLmxheWVyc1tsLnBhcmFtc1snTEFZRVJTJ11dO1xuICAgICAgaWYgKCAhYUNvbmZpZyApXG4gICAgICAgICAgYUNvbmZpZyA9IGNvbmZpZy5sYXllcnNbbC5uYW1lXTtcbiAgICAgIGlmICggIWFDb25maWcgKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgaWYoICdnZW9tZXRyeVR5cGUnIGluIGFDb25maWcgJiZcbiAgICAgICAgKCBhQ29uZmlnLmdlb21ldHJ5VHlwZSA9PSBcIm5vbmVcIiB8fCBhQ29uZmlnLmdlb21ldHJ5VHlwZSA9PSBcInVua25vd25cIiB8fCBhQ29uZmlnLmdlb21ldHJ5VHlwZSA9PSBcIlwiIClcbiAgICAgICl7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgLy8gVXBkYXRlIHNpbmdsZVRpbGUgbGF5ZXJzXG4gICAgICBpZiggcmVtb3ZlU2luZ2xlVGlsZSAmJiAobCBpbnN0YW5jZW9mIE9wZW5MYXllcnMuTGF5ZXIuV01TKSAmJiBsLnNpbmdsZVRpbGUgKSB7XG4gICAgICAgICAgbC5hZGRPcHRpb25zKHtzaW5nbGVUaWxlOmZhbHNlLCB0aWxlU2l6ZTogcmVwbGFjZVNpbmdsZVRpbGVTaXplfSk7XG4gICAgICB9XG4gICAgICBtYXAuYWRkTGF5ZXIobCk7XG5cbiAgICB9XG5cbiAgICAvLyBBZGQgTG9jYXRlIGJ5IGxheWVyXG4gICAgaWYgKCdsb2NhdGVCeUxheWVyJyBpbiBjb25maWcpIHtcbiAgICAgIHZhciBsb2NhdGVCeUxheWVyTGlzdCA9IFtdO1xuICAgICAgZm9yICh2YXIgbG5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpIHtcbiAgICAgICAgaWYgKCAnb3JkZXInIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyW2xuYW1lXSApXG4gICAgICAgICAgbG9jYXRlQnlMYXllckxpc3RbIGNvbmZpZy5sb2NhdGVCeUxheWVyW2xuYW1lXS5vcmRlciBdID0gbG5hbWU7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICBsb2NhdGVCeUxheWVyTGlzdC5wdXNoKCBsbmFtZSApO1xuICAgICAgfVxuICAgICAgdmFyIGxvY2F0ZUNvbnRlbnQgPSBbXTtcbiAgICAgIGZvciAodmFyIGwgaW4gbG9jYXRlQnlMYXllckxpc3QpIHtcbiAgICAgICAgdmFyIGxuYW1lID0gbG9jYXRlQnlMYXllckxpc3RbbF07XG4gICAgICAgIHZhciBsQ29uZmlnID0gY29uZmlnLmxheWVyc1tsbmFtZV07XG4gICAgICAgIHZhciBodG1sID0gJzxkaXYgY2xhc3M9XCJsb2NhdGUtbGF5ZXJcIj4nO1xuICAgICAgICBodG1sICs9ICc8c2VsZWN0IGlkPVwibG9jYXRlLWxheWVyLScrY2xlYW5OYW1lKGxuYW1lKSsnXCIgY2xhc3M9XCJsYWJlbFwiPic7XG4gICAgICAgIGh0bWwgKz0gJzxvcHRpb24+JytsQ29uZmlnLnRpdGxlKycuLi48L29wdGlvbj4nO1xuICAgICAgICBodG1sICs9ICc8L3NlbGVjdD4nO1xuICAgICAgICBodG1sICs9ICc8L2Rpdj4nO1xuICAgICAgICAvL2NvbnN0cnVjdGluZyB0aGUgc2VsZWN0XG4gICAgICAgIGxvY2F0ZUNvbnRlbnQucHVzaChodG1sKTtcbiAgICAgIH1cbiAgICAgICQoJyNsb2NhdGUgLm1lbnUtY29udGVudCcpLmh0bWwobG9jYXRlQ29udGVudC5qb2luKCc8aHIvPicpKTtcbiAgICAgIG1hcC5hZGRMYXllcihuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoJ2xvY2F0ZWxheWVyJyx7XG4gICAgICAgIHN0eWxlTWFwOiBuZXcgT3BlbkxheWVycy5TdHlsZU1hcCh7XG4gICAgICAgICAgcG9pbnRSYWRpdXM6IDYsXG4gICAgICAgICAgZmlsbDogZmFsc2UsXG4gICAgICAgICAgc3Ryb2tlOiB0cnVlLFxuICAgICAgICAgIHN0cm9rZVdpZHRoOiAzLFxuICAgICAgICAgIHN0cm9rZUNvbG9yOiAneWVsbG93JyxcbiAgICAgICAgICBzdHJva2VPcGFjaXR5OiAwLjhcbiAgICAgICAgfSlcbiAgICAgIH0pKTtcblxuICAgICAgICAvLyBMaXptYXAgVVJMXG4gICAgICAgIHZhciBzZXJ2aWNlID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChsaXpVcmxzLndtc1xuICAgICAgICAgICAgICAgICxPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVyU3RyaW5nKGxpelVybHMucGFyYW1zKVxuICAgICAgICApO1xuXG4gICAgICAgIHZhciBmZWF0dXJlVHlwZXMgPSBnZXRWZWN0b3JMYXllckZlYXR1cmVUeXBlcygpO1xuICAgICAgICBpZiAoZmVhdHVyZVR5cGVzLmxlbmd0aCA9PSAwICl7XG4gICAgICAgICAgY29uZmlnLmxvY2F0ZUJ5TGF5ZXIgPSB7fTtcbiAgICAgICAgICAkKCcjYnV0dG9uLWxvY2F0ZScpLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgICAgICQoJyNsb2NhdGUtbWVudScpLnJlbW92ZSgpO1xuICAgICAgICAgIHVwZGF0ZVN3aXRjaGVyU2l6ZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGZlYXR1cmVUeXBlcy5lYWNoKCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgdmFyIHR5cGVOYW1lID0gc2VsZi5maW5kKCdOYW1lJykudGV4dCgpO1xuICAgICAgICAgICAgdmFyIGxuYW1lID0gbGl6TWFwLmdldE5hbWVCeVR5cGVOYW1lKCB0eXBlTmFtZSApO1xuICAgICAgICAgICAgaWYgKCAhbG5hbWUgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVOYW1lIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyKVxuICAgICAgICAgICAgICAgICAgICBsbmFtZSA9IHR5cGVOYW1lXG4gICAgICAgICAgICAgICAgZWxzZSBpZiAoICh0eXBlTmFtZSBpbiBzaG9ydE5hbWVNYXApICYmIChzaG9ydE5hbWVNYXBbdHlwZU5hbWVdIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyKSlcbiAgICAgICAgICAgICAgICAgICAgbG5hbWUgPSBzaG9ydE5hbWVNYXBbdHlwZU5hbWVdO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxibCBpbiBjb25maWcubG9jYXRlQnlMYXllcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGxibC5zcGxpdCgnICcpLmpvaW4oJ18nKSA9PSB0eXBlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxuYW1lID0gbGJsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoICEobG5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpIClcbiAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgIHZhciBsb2NhdGUgPSBjb25maWcubG9jYXRlQnlMYXllcltsbmFtZV07XG4gICAgICAgICAgICBsb2NhdGVbJ2NycyddID0gc2VsZi5maW5kKCdTUlMnKS50ZXh0KCk7XG4gICAgICAgICAgICBsb2FkUHJvakRlZmluaXRpb24oIGxvY2F0ZS5jcnMsIGZ1bmN0aW9uKCBhUHJvaiApIHtcbiAgICAgICAgICAgICAgICBuZXcgT3BlbkxheWVycy5Qcm9qZWN0aW9uKGxvY2F0ZS5jcnMpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgYmJveCA9IHNlbGYuZmluZCgnTGF0TG9uZ0JvdW5kaW5nQm94Jyk7XG4gICAgICAgICAgICBsb2NhdGVbJ2Jib3gnXSA9IFtcbiAgICAgICAgICAgICAgICBwYXJzZUZsb2F0KGJib3guYXR0cignbWlueCcpKVxuICAgICAgICAgICAgICAgLHBhcnNlRmxvYXQoYmJveC5hdHRyKCdtaW55JykpXG4gICAgICAgICAgICAgICAscGFyc2VGbG9hdChiYm94LmF0dHIoJ21heHgnKSlcbiAgICAgICAgICAgICAgICxwYXJzZUZsb2F0KGJib3guYXR0cignbWF4eScpKVxuICAgICAgICAgICAgXTtcbiAgICAgICAgICB9ICk7XG5cbiAgICAgICAgICAvLyBnZXQgam9pbnNcbiAgICAgICAgICBmb3IgKHZhciBsTmFtZSBpbiBjb25maWcubG9jYXRlQnlMYXllcikge1xuICAgICAgICAgICAgdmFyIGxvY2F0ZSA9IGNvbmZpZy5sb2NhdGVCeUxheWVyW2xOYW1lXTtcbiAgICAgICAgICAgIGlmICgndmVjdG9yam9pbnMnIGluIGxvY2F0ZSAmJiBsb2NhdGVbJ3ZlY3RvcmpvaW5zJ10ubGVuZ3RoICE9IDApIHtcbiAgICAgICAgICAgICAgdmFyIHZlY3RvcmpvaW4gPSBsb2NhdGVbJ3ZlY3RvcmpvaW5zJ11bMF07XG4gICAgICAgICAgICAgIGxvY2F0ZVsnam9pbkZpZWxkTmFtZSddID0gdmVjdG9yam9pblsndGFyZ2V0RmllbGROYW1lJ107XG4gICAgICAgICAgICAgIGZvciAodmFyIGpOYW1lIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyKSB7XG4gICAgICAgICAgICAgICAgdmFyIGpMb2NhdGUgPSBjb25maWcubG9jYXRlQnlMYXllcltqTmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKGpMb2NhdGUubGF5ZXJJZCA9PSB2ZWN0b3Jqb2luLmpvaW5MYXllcklkKSB7XG4gICAgICAgICAgICAgICAgICB2ZWN0b3Jqb2luWydqb2luTGF5ZXInXSA9IGpOYW1lO1xuICAgICAgICAgICAgICAgICAgbG9jYXRlWydqb2luTGF5ZXInXSA9IGpOYW1lO1xuICAgICAgICAgICAgICAgICAgakxvY2F0ZVsnam9pbkZpZWxkTmFtZSddID0gdmVjdG9yam9pblsnam9pbkZpZWxkTmFtZSddO1xuICAgICAgICAgICAgICAgICAgakxvY2F0ZVsnam9pbkxheWVyJ10gPSBsTmFtZTtcbiAgICAgICAgICAgICAgICAgIGpMb2NhdGVbJ2ZpbHRlcmpvaW5zJ10gPSBbe1xuICAgICAgICAgICAgICAgICAgICAgICd0YXJnZXRGaWVsZE5hbWUnOiB2ZWN0b3Jqb2luWydqb2luRmllbGROYW1lJ10sXG4gICAgICAgICAgICAgICAgICAgICAgJ2pvaW5GaWVsZE5hbWUnOiB2ZWN0b3Jqb2luWyd0YXJnZXRGaWVsZE5hbWUnXSxcbiAgICAgICAgICAgICAgICAgICAgICAnam9pbkxheWVySWQnOiBsb2NhdGUubGF5ZXJJZCxcbiAgICAgICAgICAgICAgICAgICAgICAnam9pbkxheWVyJzogbE5hbWVcbiAgICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGdldCBsb2NhdGUgYnkgbGF5ZXJzIGZlYXR1cmVzXG4gICAgICAgICAgZm9yICh2YXIgbG5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpIHtcbiAgICAgICAgICAgIGdldExvY2F0ZUZlYXR1cmUobG5hbWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcuYnRuLWxvY2F0ZS1jbGVhcicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ0ZXN0IGxvY2F0ZSBjbGVhclwiKTtcbiAgICAgICAgICAgIHZhciBsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUoJ2xvY2F0ZWxheWVyJylbMF07XG4gICAgICAgICAgICBsYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgICAgICQoJyNsb2NhdGUgc2VsZWN0JykudmFsKCctMScpO1xuICAgICAgICAgICAgJCgnZGl2LmxvY2F0ZS1sYXllciBzcGFuID4gaW5wdXQnKS52YWwoJycpO1xuXG4gICAgICAgICAgICBpZiggbGl6TWFwLmxpem1hcExheWVyRmlsdGVyQWN0aXZlICl7XG4gICAgICAgICAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoJ2xpem1hcGxvY2F0ZWZlYXR1cmVjYW5jZWxlZCcsXG4gICAgICAgICAgICAgICAgICB7J2ZlYXR1cmVUeXBlJzogbGl6TWFwLmxpem1hcExheWVyRmlsdGVyQWN0aXZlfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICB9KTtcbiAgICAgICAgICAkKCcjbG9jYXRlLWNsb3NlJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAkKCcuYnRuLWxvY2F0ZS1jbGVhcicpLmNsaWNrKCk7IC8vIGRlYWN0aXZhdGUgbG9jYXRlIGFuZCBmaWx0ZXJcbiAgICAgICAgICAgICQoJyNidXR0b24tbG9jYXRlJykuY2xpY2soKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgICQoJyNzd2l0Y2hlciBzcGFuLmxhYmVsJykudG9vbHRpcCh7XG4gICAgICB2aWV3cG9ydDogJyNkb2NrJ1xuICAgIH0pO1xuXG4gIH1cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogY3JlYXRlT3ZlcnZpZXdcbiAgICogY3JlYXRlIHRoZSBvdmVydmlld1xuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlT3ZlcnZpZXcoKSB7XG4gICAgdmFyIHNlcnZpY2UgPSBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKGxpelVybHMud21zXG4gICAgICAgICxPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVyU3RyaW5nKGxpelVybHMucGFyYW1zKVxuICAgICk7XG4gICAgdmFyIG92TGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5XTVMoJ292ZXJ2aWV3J1xuICAgICAgICAsc2VydmljZVxuICAgICAgICAse1xuICAgICAgICAgIGxheWVyczonT3ZlcnZpZXcnXG4gICAgICAgICAsdmVyc2lvbjonMS4zLjAnXG4gICAgICAgICAsZXhjZXB0aW9uczonYXBwbGljYXRpb24vdm5kLm9nYy5zZV9pbmltYWdlJ1xuICAgICAgICAgLGZvcm1hdDonaW1hZ2UvcG5nJ1xuICAgICAgICAgLHRyYW5zcGFyZW50OnRydWVcbiAgICAgICAgICxkcGk6OTZcbiAgICAgICAgfSx7XG4gICAgICAgICAgaXNCYXNlTGF5ZXI6dHJ1ZVxuICAgICAgICAgLGd1dHRlcjo1XG4gICAgICAgICAsYnVmZmVyOjBcbiAgICAgICAgICxzaW5nbGVUaWxlOnRydWVcbiAgICAgICAgfSk7XG5cbiAgICBpZiAoY29uZmlnLm9wdGlvbnMuaGFzT3ZlcnZpZXcpIHtcbiAgICAgIC8vIGdldCBhbmQgZGVmaW5lIHRoZSBtYXggZXh0ZW50XG4gICAgICB2YXIgYmJveCA9IGNvbmZpZy5vcHRpb25zLmJib3g7XG4gICAgICB2YXIgZXh0ZW50ID0gbmV3IE9wZW5MYXllcnMuQm91bmRzKE51bWJlcihiYm94WzBdKSxOdW1iZXIoYmJveFsxXSksTnVtYmVyKGJib3hbMl0pLE51bWJlcihiYm94WzNdKSk7XG4gICAgICB2YXIgcmVzID0gZXh0ZW50LmdldEhlaWdodCgpLzkwO1xuICAgICAgdmFyIHJlc1cgPSBleHRlbnQuZ2V0V2lkdGgoKS8xODA7XG4gICAgICBpZiAocmVzIDw9IHJlc1cpXG4gICAgICAgIHJlcyA9IHJlc1c7XG5cbiAgICAgIG1hcC5hZGRDb250cm9sKG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuT3ZlcnZpZXdNYXAoXG4gICAgICAgIHtkaXY6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3ZlcnZpZXctbWFwXCIpLFxuICAgICAgICAgc2l6ZSA6IG5ldyBPcGVuTGF5ZXJzLlNpemUoMjIwLCAxMTApLFxuICAgICAgICAgbWFwT3B0aW9uczp7bWF4RXh0ZW50Om1hcC5tYXhFeHRlbnRcbiAgICAgICAgICAgICAgICAgICxtYXhSZXNvbHV0aW9uOlwiYXV0b1wiXG4gICAgICAgICAgICAgICAgICAsbWluUmVzb2x1dGlvbjpcImF1dG9cIlxuICAgICAgICAgICAgICAgICAgLHNjYWxlczogW09wZW5MYXllcnMuVXRpbC5nZXRTY2FsZUZyb21SZXNvbHV0aW9uKHJlcywgbWFwLnByb2plY3Rpb24ucHJvai51bml0cyldXG4gICAgICAgICAgICAgICAgICAscHJvamVjdGlvbjptYXAucHJvamVjdGlvblxuICAgICAgICAgICAgICAgICAgLHVuaXRzOm1hcC5wcm9qZWN0aW9uLnByb2oudW5pdHNcbiAgICAgICAgICAgICAgICAgICxsYXllcnM6W292TGF5ZXJdXG4gICAgICAgICAgICAgICAgICAsc2luZ2xlVGlsZTp0cnVlXG4gICAgICAgICAgICAgICAgICAscmF0aW86MVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnI292ZXJ2aWV3LW1hcCcpLmhpZGUoKTtcbiAgICAgICQoJyNvdmVydmlldy10b2dnbGUnKS5oaWRlKCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIH1cblxuICAgICQoJyNvdmVydmlldy10b2dnbGUnKVxuICAgIC5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgaWYgKCBzZWxmLmhhc0NsYXNzKCdhY3RpdmUnKSApXG4gICAgICAgIHNlbGYucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgZWxzZVxuICAgICAgICBzZWxmLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgICAgJCgnI292ZXJ2aWV3LW1hcCcpLnRvZ2dsZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgbWFwLmFkZENvbnRyb2wobmV3IE9wZW5MYXllcnMuQ29udHJvbC5TY2FsZShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2NhbGV0ZXh0JykpKTtcbiAgICBtYXAuYWRkQ29udHJvbChuZXcgT3BlbkxheWVycy5Db250cm9sLlNjYWxlTGluZSh7ZGl2OmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY2FsZWxpbmUnKX0pKTtcblxuICAgIHZhciBtcFVuaXRTZWxlY3QgPSAkKCcjbW91c2Vwb3NpdGlvbi1iYXIgPiBzZWxlY3QnKTtcbiAgICB2YXIgbWFwVW5pdHMgPSBtYXAucHJvamVjdGlvbi5nZXRVbml0cygpO1xuICAgIGlmICggbWFwVW5pdHMgPT0gJ2RlZ3JlZXMnICkge1xuICAgICAgbXBVbml0U2VsZWN0LmZpbmQoJ29wdGlvblt2YWx1ZT1cIm1cIl0nKS5yZW1vdmUoKTtcbiAgICAgIG1wVW5pdFNlbGVjdC5maW5kKCdvcHRpb25bdmFsdWU9XCJmXCJdJykucmVtb3ZlKCk7XG4gICAgfSBlbHNlIGlmICggbWFwVW5pdHMgPT0gJ20nICkge1xuICAgICAgbXBVbml0U2VsZWN0LmZpbmQoJ29wdGlvblt2YWx1ZT1cImZcIl0nKS5yZW1vdmUoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbXBVbml0U2VsZWN0LmZpbmQoJ29wdGlvblt2YWx1ZT1cIm1cIl0nKS5yZW1vdmUoKTtcbiAgICB9XG4gICAgdmFyIG1vdXNlUG9zaXRpb24gPSBuZXcgT3BlbkxheWVycy5Db250cm9sLmxpem1hcE1vdXNlUG9zaXRpb24oe1xuICAgICAgICBkaXNwbGF5VW5pdDptcFVuaXRTZWxlY3QudmFsKCksXG4gICAgICAgIG51bURpZ2l0czogMCxcbiAgICAgICAgcHJlZml4OiAnJyxcbiAgICAgICAgZW1wdHlTdHJpbmc6JCgnI21vdXNlcG9zaXRpb24nKS5hdHRyKCd0aXRsZScpLFxuICAgICAgICBkaXY6ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21vdXNlcG9zaXRpb24nKVxuICAgICAgICB9KTtcbiAgICBtYXAuYWRkQ29udHJvbCggbW91c2VQb3NpdGlvbiApO1xuICAgIG1wVW5pdFNlbGVjdC5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBtcFNlbGVjdFZhbCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIGlmIChtcFNlbGVjdFZhbCA9PSAnbScpXG4gICAgICAgICAgbW91c2VQb3NpdGlvbi5udW1EaWdpdHMgPSAwO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgbW91c2VQb3NpdGlvbi5udW1EaWdpdHMgPSA1O1xuICAgICAgICBtb3VzZVBvc2l0aW9uLmRpc3BsYXlVbml0ID0gbXBTZWxlY3RWYWw7XG4gICAgfSk7XG5cbiAgICBpZiAoY29uZmlnLm9wdGlvbnMuaGFzT3ZlcnZpZXcpXG4gICAgICBpZighbUNoZWNrTW9iaWxlKCkpIHtcbiAgICAgICAgJCgnI292ZXJ2aWV3LW1hcCcpLnNob3coKTtcbiAgICAgICAgJCgnI292ZXJ2aWV3LXRvZ2dsZScpLnNob3coKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9XG4gIH1cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogY3JlYXRlTmF2YmFyXG4gICAqIGNyZWF0ZSB0aGUgbmF2aWdhdGlvbiBiYXIgKHpvb20sIHNjYWxlcywgZXRjKVxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlTmF2YmFyKCkge1xuICAgICQoJyNuYXZiYXIgZGl2LnNsaWRlcicpLmhlaWdodChNYXRoLm1heCg1MCxtYXAubnVtWm9vbUxldmVscyo1KSkuc2xpZGVyKHtcbiAgICAgIG9yaWVudGF0aW9uOid2ZXJ0aWNhbCcsXG4gICAgICBtaW46IDAsXG4gICAgICBtYXg6IG1hcC5udW1ab29tTGV2ZWxzLTEsXG4gICAgICBjaGFuZ2U6IGZ1bmN0aW9uKGV2dCx1aSkge1xuICAgICAgICBpZiAodWkudmFsdWUgPiBtYXAuYmFzZUxheWVyLm51bVpvb21MZXZlbHMtMSkge1xuICAgICAgICAgICQoJyNuYXZiYXIgZGl2LnNsaWRlcicpLnNsaWRlcigndmFsdWUnLG1hcC5nZXRab29tKCkpXG4gICAgICAgICAgJCgnI3pvb20taW4tbWF4LW1zZycpLnNob3coJ3Nsb3cnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7JCgnI3pvb20taW4tbWF4LW1zZycpLmhpZGUoJ3Nsb3cnKX0sMTAwMClcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICggdWkudmFsdWUgIT0gbWFwLnpvb20gKVxuICAgICAgICAgIG1hcC56b29tVG8odWkudmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICQoJyNuYXZiYXIgYnV0dG9uLnBhbicpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICBpZiAoc2VsZi5oYXNDbGFzcygnYWN0aXZlJykpXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICQoJyNuYXZiYXIgYnV0dG9uLnpvb20nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICBzZWxmLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIHZhciBuYXZDdHJsID0gbWFwLmdldENvbnRyb2xzQnlDbGFzcygnT3BlbkxheWVycy5Db250cm9sLk5hdmlnYXRpb24nKVswXTtcbiAgICAgIG5hdkN0cmwuem9vbUJveC5rZXlNYXNrID0gbmF2Q3RybC56b29tQm94S2V5TWFzaztcbiAgICAgIG5hdkN0cmwuem9vbUJveC5oYW5kbGVyLmtleU1hc2sgPSBuYXZDdHJsLnpvb21Cb3hLZXlNYXNrO1xuICAgICAgbmF2Q3RybC56b29tQm94LmhhbmRsZXIuZHJhZ0hhbmRsZXIua2V5TWFzayA9IG5hdkN0cmwuem9vbUJveEtleU1hc2s7XG4gICAgICBuYXZDdHJsLmhhbmRsZXJzLndoZWVsLmFjdGl2YXRlKCk7XG4gICAgICBpZiAoICggISgnZWRpdGlvbicgaW4gY29udHJvbHMpIHx8ICFjb250cm9scy5lZGl0aW9uLmFjdGl2ZSApXG4gICAgICAgICAgICYmICgnZmVhdHVyZUluZm8nIGluIGNvbnRyb2xzKSAmJiBjb250cm9scy5mZWF0dXJlSW5mbyAhPT0gbnVsbCApXG4gICAgICAgICAgY29udHJvbHMuZmVhdHVyZUluZm8uYWN0aXZhdGUoKTtcbiAgICB9KTtcbiAgICAkKCcjbmF2YmFyIGJ1dHRvbi56b29tJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgIGlmIChzZWxmLmhhc0NsYXNzKCdhY3RpdmUnKSlcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgJCgnI25hdmJhciBidXR0b24ucGFuJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgc2VsZi5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICBpZiAoICgnZmVhdHVyZUluZm8nIGluIGNvbnRyb2xzKSAmJiBjb250cm9scy5mZWF0dXJlSW5mbyAhPT0gbnVsbCApXG4gICAgICAgICAgICBjb250cm9scy5mZWF0dXJlSW5mby5kZWFjdGl2YXRlKCk7XG4gICAgICB2YXIgbmF2Q3RybCA9IG1hcC5nZXRDb250cm9sc0J5Q2xhc3MoJ09wZW5MYXllcnMuQ29udHJvbC5OYXZpZ2F0aW9uJylbMF07XG4gICAgICBuYXZDdHJsLmhhbmRsZXJzLndoZWVsLmRlYWN0aXZhdGUoKTtcbiAgICAgIG5hdkN0cmwuem9vbUJveC5rZXlNYXNrID0gbnVsbDtcbiAgICAgIG5hdkN0cmwuem9vbUJveC5oYW5kbGVyLmtleU1hc2sgPSBudWxsO1xuICAgICAgbmF2Q3RybC56b29tQm94LmhhbmRsZXIuZHJhZ0hhbmRsZXIua2V5TWFzayA9IG51bGw7XG4gICAgfSk7XG4gICAgJCgnI25hdmJhciBidXR0b24uem9vbS1leHRlbnQnKVxuICAgIC5jbGljayhmdW5jdGlvbigpe1xuICAgICAgdmFyIHVybF9wYXJhbXMgPSBnZXRVcmxQYXJhbWV0ZXJzKCk7XG4gICAgICBpZiggJ2xheWVycycgaW4gdXJsX3BhcmFtcyApe1xuICAgICAgICBydW5QZXJtYWxpbmsoIHVybF9wYXJhbXMgKTtcbiAgICAgIH1cbiAgICAgIGVsc2V7XG4gICAgICAgIG1hcC56b29tVG9FeHRlbnQobWFwLmluaXRpYWxFeHRlbnQpO1xuICAgICAgfVxuICAgIH0pO1xuICAgICQoJyNuYXZiYXIgYnV0dG9uLnpvb20taW4nKVxuICAgIC5jbGljayhmdW5jdGlvbigpe1xuICAgICAgaWYgKG1hcC5nZXRab29tKCkgPT0gbWFwLmJhc2VMYXllci5udW1ab29tTGV2ZWxzLTEpXG4gICAgICAgICAgJCgnI3pvb20taW4tbWF4LW1zZycpLnNob3coJ3Nsb3cnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7JCgnI3pvb20taW4tbWF4LW1zZycpLmhpZGUoJ3Nsb3cnKX0sMTAwMClcbiAgICAgICAgICB9KTtcbiAgICAgIGVsc2VcbiAgICAgICAgbWFwLnpvb21JbigpO1xuICAgIH0pO1xuICAgICQoJyNuYXZiYXIgYnV0dG9uLnpvb20tb3V0JylcbiAgICAuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgIG1hcC56b29tT3V0KCk7XG4gICAgfSk7XG4gICAgaWYgKCAoJ3pvb21IaXN0b3J5JyBpbiBjb25maWcub3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnLm9wdGlvbnNbJ3pvb21IaXN0b3J5J10gPT0gXCJUcnVlXCIpIHtcbiAgICAgIHZhciBoQ3RybCA9ICBuZXcgT3BlbkxheWVycy5Db250cm9sLk5hdmlnYXRpb25IaXN0b3J5KCk7XG4gICAgICBtYXAuYWRkQ29udHJvbHMoW2hDdHJsXSk7XG4gICAgICAkKCcjbmF2YmFyIGJ1dHRvbi5wcmV2aW91cycpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBjdHJsID0gbWFwLmdldENvbnRyb2xzQnlDbGFzcygnT3BlbkxheWVycy5Db250cm9sLk5hdmlnYXRpb25IaXN0b3J5JylbMF07XG4gICAgICAgIGlmIChjdHJsICYmIGN0cmwucHJldmlvdXNTdGFjay5sZW5ndGggIT0gMClcbiAgICAgICAgICBjdHJsLnByZXZpb3VzVHJpZ2dlcigpO1xuICAgICAgICBpZiAoY3RybCAmJiBjdHJsLnByZXZpb3VzLmFjdGl2ZSlcbiAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICBlbHNlXG4gICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgaWYgKGN0cmwgJiYgY3RybC5uZXh0LmFjdGl2ZSlcbiAgICAgICAgICAkKCcjbmF2YmFyIGJ1dHRvbi5uZXh0JykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAkKCcjbmF2YmFyIGJ1dHRvbi5uZXh0JykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICB9KTtcbiAgICAgICQoJyNuYXZiYXIgYnV0dG9uLm5leHQnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgICB2YXIgY3RybCA9IG1hcC5nZXRDb250cm9sc0J5Q2xhc3MoJ09wZW5MYXllcnMuQ29udHJvbC5OYXZpZ2F0aW9uSGlzdG9yeScpWzBdO1xuICAgICAgICBpZiAoY3RybCAmJiBjdHJsLm5leHRTdGFjay5sZW5ndGggIT0gMClcbiAgICAgICAgICBjdHJsLm5leHRUcmlnZ2VyKCk7XG4gICAgICAgIGlmIChjdHJsICYmIGN0cmwubmV4dC5hY3RpdmUpXG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgZWxzZVxuICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIGlmIChjdHJsICYmIGN0cmwucHJldmlvdXMuYWN0aXZlKVxuICAgICAgICAgICQoJyNuYXZiYXIgYnV0dG9uLnByZXZpb3VzJykucmVtb3ZlQ2xhc3MoJ2Rpc2FibGVkJyk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAkKCcjbmF2YmFyIGJ1dHRvbi5wcmV2aW91cycpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgfSk7XG4gICAgICBtYXAuZXZlbnRzLm9uKHtcbiAgICAgICAgbW92ZWVuZCA6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHZhciBjdHJsID0gbWFwLmdldENvbnRyb2xzQnlDbGFzcygnT3BlbkxheWVycy5Db250cm9sLk5hdmlnYXRpb25IaXN0b3J5JylbMF07XG4gICAgICAgICAgaWYgKGN0cmwgJiYgY3RybC5wcmV2aW91c1N0YWNrLmxlbmd0aCAhPSAwKVxuICAgICAgICAgICAgJCgnI25hdmJhciBidXR0b24ucHJldmlvdXMnKS5yZW1vdmVDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAkKCcjbmF2YmFyIGJ1dHRvbi5wcmV2aW91cycpLmFkZENsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIGlmIChjdHJsICYmIGN0cmwubmV4dFN0YWNrLmxlbmd0aCAhPSAwKVxuICAgICAgICAgICAgJCgnI25hdmJhciBidXR0b24ubmV4dCcpLnJlbW92ZUNsYXNzKCdkaXNhYmxlZCcpO1xuICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICQoJyNuYXZiYXIgYnV0dG9uLm5leHQnKS5hZGRDbGFzcygnZGlzYWJsZWQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJyNuYXZiYXIgPiAuaGlzdG9yeScpLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBjcmVhdGVUb29sYmFyXG4gICAqIGNyZWF0ZSB0aGUgdG9vbCBiYXIgKGNvbGxhcHNlIG92ZXJ2aWV3IGFuZCBzd2l0Y2hlciwgZXRjKVxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlVG9vbGJhcigpIHtcbiAgICB2YXIgY29uZmlnT3B0aW9ucyA9IGNvbmZpZy5vcHRpb25zO1xuXG4gICAgdmFyIGluZm8gPSBhZGRGZWF0dXJlSW5mbygpO1xuICAgIGNvbnRyb2xzWydmZWF0dXJlSW5mbyddID0gaW5mbztcblxuICAgIGlmICggKCdwcmludCcgaW4gY29uZmlnT3B0aW9ucylcbiAgICAgICAgJiYgY29uZmlnT3B0aW9uc1sncHJpbnQnXSA9PSAnVHJ1ZScpXG4gICAgICBhZGRQcmludENvbnRyb2woKTtcbiAgICBlbHNlXG4gICAgICAkKCcjYnV0dG9uLXByaW50JykucGFyZW50KCkucmVtb3ZlKCk7XG5cbiAgICBpZiAoIGNvbmZpZ1sndG9vbHRpcExheWVycyddICYmIGNvbmZpZy50b29sdGlwTGF5ZXJzLmxlbmd0aCAhPSAwKVxuICAgICAgICBhZGRUb29sdGlwQ29udHJvbCgpO1xuICAgIGVsc2VcbiAgICAgICQoJyNidXR0b24tdG9vbHRpcC1sYXllcicpLnBhcmVudCgpLnJlbW92ZSgpO1xuXG4gICAgaWYgKCAoJ2dlb2xvY2F0aW9uJyBpbiBjb25maWdPcHRpb25zKVxuICAgICAgICAmJiBjb25maWdPcHRpb25zWydnZW9sb2NhdGlvbiddID09ICdUcnVlJylcbiAgICAgIGFkZEdlb2xvY2F0aW9uQ29udHJvbCgpO1xuICAgIGVsc2VcbiAgICAgICQoJyNidXR0b24tZ2VvbG9jYXRpb24nKS5wYXJlbnQoKS5yZW1vdmUoKTtcblxuICAgIGlmICggKCdtZWFzdXJlJyBpbiBjb25maWdPcHRpb25zKVxuICAgICAgICAmJiBjb25maWdPcHRpb25zWydtZWFzdXJlJ10gPT0gJ1RydWUnKVxuICAgICAgYWRkTWVhc3VyZUNvbnRyb2xzKCk7XG4gICAgZWxzZSB7XG4gICAgICAkKCcjbWVhc3VyZScpLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgJCgnI21lYXN1cmUtbGVuZ3RoLW1lbnUnKS5yZW1vdmUoKTtcbiAgICAgICQoJyNtZWFzdXJlLWFyZWEtbWVudScpLnJlbW92ZSgpO1xuICAgICAgJCgnI21lYXN1cmUtcGVyaW1ldGVyLW1lbnUnKS5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUFJJVkFURSBmdW5jdGlvbjogZGVhY3RpdmF0ZVRvb2xDb250cm9sc1xuICAgKiBEZWFjdGl2YXRlIE9wZW5sYXllcnMgY29udHJvbHNcbiAgICovXG4gIGZ1bmN0aW9uIGRlYWN0aXZhdGVUb29sQ29udHJvbHMoIGV2dCApIHtcbiAgICBmb3IgKHZhciBpZCBpbiBjb250cm9scykge1xuICAgICAgdmFyIGN0cmwgPSBjb250cm9sc1tpZF07XG4gICAgICBpZihjdHJsKXtcbiAgICAgICAgaWYgKGV2dCAmJiAoJ29iamVjdCcgaW4gZXZ0KSAmJiBjdHJsID09IGV2dC5vYmplY3Qpe1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChjdHJsLnR5cGUgPT0gT3BlbkxheWVycy5Db250cm9sLlRZUEVfVE9PTCl7XG4gICAgICAgICAgY3RybC5kZWFjdGl2YXRlKCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBjcmVhdGVQZXJtYWxpbmtcbiAgICogY3JlYXRlIHRoZSBwZXJtYWxpbmsgdG9vbFxuICAgKi9cbiAgZnVuY3Rpb24gY3JlYXRlUGVybWFsaW5rKCkge1xuICAgICAgaWYgKCAkKCcjcGVybWFsaW5rJykubGVuZ3RoID09IDAgKVxuICAgICAgICByZXR1cm47XG5cbiAgICB2YXIgY29uZmlnT3B0aW9ucyA9IGNvbmZpZy5vcHRpb25zO1xuXG4gICAgdmFyIHBMaW5rID0gbmV3IE9wZW5MYXllcnMuQ29udHJvbC5QZXJtYWxpbmsoXG4gICAgICAncGVybWFsaW5rJyxcbiAgICAgIG51bGwsXG4gICAgICB7XG4gICAgICAgIFwiY3JlYXRlUGFyYW1zXCI6IGNyZWF0ZVBlcm1hbGlua0FyZ3NcbiAgICAgIH1cbiAgICApO1xuICAgIG1hcC5hZGRDb250cm9sKCBwTGluayApO1xuXG4gICAgdmFyIGVMaW5rID0gbmV3IE9wZW5MYXllcnMuQ29udHJvbC5QZXJtYWxpbmsoXG4gICAgICAncGVybWFsaW5rLWVtYmVkJyxcbiAgICAgICQoJyNwZXJtYWxpbmstZW1iZWQnKS5hdHRyKCdocmVmJyksXG4gICAgICB7XG4gICAgICAgIFwiY3JlYXRlUGFyYW1zXCI6IGNyZWF0ZVBlcm1hbGlua0FyZ3NcbiAgICAgIH1cbiAgICApO1xuICAgIG1hcC5hZGRDb250cm9sKCBlTGluayApO1xuICAgIG1hcC5ldmVudHMub24oe1xuICAgICAgICBcImNoYW5nZWJhc2VsYXllclwiOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICQoJyNzd2l0Y2hlci1iYXNlbGF5ZXItc2VsZWN0JykudmFsKCBtYXAuYmFzZUxheWVyLm5hbWUgKS5jaGFuZ2UoKTtcbiAgICAgICAgfSxcbiAgICAgICAgJ21vdmVlbmQnOiB1cGRhdGVQZXJtYWxpbmtJbnB1dHMsXG4gICAgICAgICdjaGFuZ2VsYXllcic6IHVwZGF0ZVBlcm1hbGlua0lucHV0cyxcbiAgICAgICAgJ2NoYW5nZWJhc2VsYXllcic6IHVwZGF0ZVBlcm1hbGlua0lucHV0c1xuICAgIH0pO1xuICAgICQoJyNzZWxlY3QtZW1iZWQtcGVybWFsaW5rJykuY2hhbmdlKGZ1bmN0aW9uKCl7XG4gICAgICAgIGlmICggJCh0aGlzKS52YWwoKSA9PSAncCcpIHtcbiAgICAgICAgICAgICQoJyNzcGFuLWVtYmVkLXBlcnNvbmFsaXplZC1wZXJtYWxpbmsnKS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCcjc3Bhbi1lbWJlZC1wZXJzb25hbGl6ZWQtcGVybWFsaW5rJykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZVBlcm1hbGlua0lucHV0cygpO1xuICAgIH0pO1xuICAgICQoJyNzcGFuLWVtYmVkLXBlcnNvbmFsaXplZC1wZXJtYWxpbmsgaW5wdXQnKS5jaGFuZ2UodXBkYXRlUGVybWFsaW5rSW5wdXRzKTtcblxuICAgICQoJy5idG4tcGVybWFsaW5rLWNsZWFyJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICQoJyNidXR0b24tcGVybWFMaW5rJykuY2xpY2soKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIGJpbmRHZW9ib29rbWFya0V2ZW50cygpO1xuXG4gICAgJCgnI3Blcm1hbGluay1ib3ggdWwucGVybWFsaW5rLXRhYnMgYVtkYXRhLXRvZ2dsZT1cInRhYlwiXScpLm9uKCdzaG93bicsIGZ1bmN0aW9uKGUpe1xuICAgICAgICBpZigkKGUudGFyZ2V0KS5hdHRyKCdocmVmJykgPT0gJyN0YWItZW1iZWQtcGVybWFsaW5rJylcbiAgICAgICAgICAgIHVwZGF0ZU1pbmlEb2NrU2l6ZSgpO1xuICAgIH0pO1xuXG4gICAgJCgnI2dlb2Jvb2ttYXJrLWZvcm0nKS5zdWJtaXQoZnVuY3Rpb24oKXtcbiAgICAgIHZhciBibmFtZSA9ICQoJyNnZW9ib29rbWFyay1mb3JtIGlucHV0W25hbWU9XCJibmFtZVwiXScpLnZhbCgpO1xuICAgICAgaWYoIGJuYW1lID09ICcnICl7XG4gICAgICAgIG1BZGRNZXNzYWdlKGxpekRpY3RbJ2dlb2Jvb2ttYXJrLm5hbWUucmVxdWlyZWQnXSwnZXJyb3InLHRydWUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICB2YXIgZ2J1cmwgPSBsaXpVcmxzLmdlb2Jvb2ttYXJrO1xuICAgICAgdmFyIGdicGFyYW1zID0gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShwZXJtYWxpbmtBcmdzKSk7XG4gICAgICBnYnBhcmFtc1snbmFtZSddID0gYm5hbWU7XG4gICAgICBnYnBhcmFtc1sncSddID0gJ2FkZCc7XG4gICAgICBpZiggbGl6TWFwLmxpem1hcExheWVyRmlsdGVyQWN0aXZlICkge1xuICAgICAgICB2YXIgYWZpbHRlciA9IGxpek1hcC5saXptYXBMYXllckZpbHRlckFjdGl2ZSArICc6JyArIGNvbmZpZy5sYXllcnNbbGl6TWFwLmxpem1hcExheWVyRmlsdGVyQWN0aXZlXVsnZmlsdGVyZWRGZWF0dXJlcyddLmpvaW4oKTtcbiAgICAgICAgZ2JwYXJhbXNbJ2ZpbHRlciddID0gIGFmaWx0ZXI7XG4gICAgICB9XG4gICAgICAkLnBvc3QoZ2J1cmwsXG4gICAgICAgIGdicGFyYW1zLFxuICAgICAgICBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgICAgc2V0R2VvYm9va21hcmtDb250ZW50KGRhdGEpO1xuICAgICAgICB9XG4gICAgICAgICwndGV4dCdcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIGxpek1hcC5ldmVudHMub24oe1xuICAgICAgICBtaW5pZG9ja29wZW5lZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCBlLmlkID09ICdwZXJtYUxpbmsnICkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZVBlcm1hbGlua0lucHV0cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG5cbiAgZnVuY3Rpb24gY3JlYXRlUGVybWFsaW5rQXJncygpe1xuXG4gICAgdmFyIGFyZ3MgPSBPcGVuTGF5ZXJzLkNvbnRyb2wuUGVybWFsaW5rLnByb3RvdHlwZS5jcmVhdGVQYXJhbXMuYXBwbHkoXG4gICAgICAgIHRoaXMsIGFyZ3VtZW50c1xuICAgICk7XG5cbiAgICAvLyBSZXBsYWNlIHpvb20sIGxhdCwgbG9uIGJ5IGJib3hcbiAgICBkZWxldGUgYXJnc1snem9vbSddO1xuICAgIGRlbGV0ZSBhcmdzWydsYXQnXTtcbiAgICBkZWxldGUgYXJnc1snbG9uJ107XG4gICAgYXJnc1snYmJveCddID0gbWFwLmdldEV4dGVudCgpLnRvQkJPWCgpO1xuICAgIGFyZ3NbJ2NycyddID0gbWFwLnByb2plY3Rpb24ucHJvakNvZGU7XG5cbiAgICAvLyBBZGQgbGF5ZXIgZmlsdGVyIGFuZCBzdHlsZSBpZiBuZWVkZWRcbiAgICB2YXIgZmlsdGVyID0gW107XG4gICAgdmFyIHN0eWxlID0gW107XG4gICAgdmFyIG9wYWNpdHkgPSBbXTtcbiAgICBmb3IgKCB2YXIgIGxOYW1lIGluIGNvbmZpZy5sYXllcnMgKSB7XG5cbiAgICAgIHZhciBsQ29uZmlnID0gY29uZmlnLmxheWVyc1tsTmFtZV07XG4gICAgICBpZiAoICEoJ3JlcXVlc3RfcGFyYW1zJyBpbiBsQ29uZmlnKVxuICAgICAgICB8fCBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddID09IG51bGwgKVxuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgdmFyIHJlcXVlc3RQYXJhbXMgPSBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddO1xuICAgICAgaWYgKCAoJ2ZpbHRlcicgaW4gbENvbmZpZ1sncmVxdWVzdF9wYXJhbXMnXSlcbiAgICAgICAgJiYgbENvbmZpZ1sncmVxdWVzdF9wYXJhbXMnXVsnZmlsdGVyJ10gIT0gbnVsbFxuICAgICAgICAmJiBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddWydmaWx0ZXInXSAhPSBcIlwiICkge1xuICAgICAgICAgIGZpbHRlci5wdXNoKCBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddWydmaWx0ZXInXSApO1xuICAgICAgfVxuXG4gICAgfVxuICAgIGlmICggZmlsdGVyLmxlbmd0aCA+IDAgKVxuICAgICAgYXJnc1snZmlsdGVyJ10gPSBmaWx0ZXIuam9pbignOycpO1xuXG4gICAgLy8gTGF5ZXJzIHN0eWxlXG4gICAgZm9yICh2YXIgaT0wLGxlbj1sYXllcnMubGVuZ3RoOyBpPGxlbjsgaSsrKSB7XG4gICAgICB2YXIgbGF5ZXIgPSBsYXllcnNbaV07XG4gICAgICBpZiggbGF5ZXIuaXNWaXNpYmxlICYmXG4gICAgICAgICAobGF5ZXIucGFyYW1zWydTVFlMRVMnXSAhPSAnZGVmYXVsdCcgfHwgbGF5ZXIucGFyYW1zWydTVFlMRVMnXSAhPSAnJykgKXtcbiAgICAgICAgc3R5bGUucHVzaCggbGF5ZXIubmFtZSArICc6JyArIGxheWVyLnBhcmFtc1snU1RZTEVTJ10gKTtcbiAgICAgIH1cbiAgICAgIGlmKCBsYXllci5vcGFjaXR5ICYmIGxheWVyLm9wYWNpdHkgIT0gMSApe1xuICAgICAgICBvcGFjaXR5LnB1c2goIGxheWVyLm5hbWUgKyAnOicgKyBsYXllci5vcGFjaXR5ICk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICggc3R5bGUubGVuZ3RoID4gMCApXG4gICAgICBhcmdzWydsYXllclN0eWxlcyddID0gc3R5bGUuam9pbignOycpO1xuICAgIGlmICggb3BhY2l0eS5sZW5ndGggPiAwICkge1xuICAgICAgYXJnc1snbGF5ZXJPcGFjaXRpZXMnXSA9IG9wYWNpdHkuam9pbignOycpO1xuICAgIH1cblxuICAgIC8vIEFkZCBwZXJtYWxpbmsgYXJncyB0byBMaXptYXAgZ2xvYmFsIHZhcmlhYmxlXG4gICAgcGVybWFsaW5rQXJncyA9IGFyZ3M7XG5cbiAgICByZXR1cm4gYXJncztcblxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VXJsUGFyYW1ldGVycygpe1xuICAgIHZhciBvUGFyYW1ldHJlID0ge307XG5cbiAgICBpZiAod2luZG93LmxvY2F0aW9uLnNlYXJjaC5sZW5ndGggPiAxKSB7XG4gICAgICBmb3IgKHZhciBhSXRLZXksIG5LZXlJZCA9IDAsIGFDb3VwbGVzID0gd2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoXCImXCIpOyBuS2V5SWQgPCBhQ291cGxlcy5sZW5ndGg7IG5LZXlJZCsrKSB7XG4gICAgICAgIGFJdEtleSA9IGFDb3VwbGVzW25LZXlJZF0uc3BsaXQoXCI9XCIpO1xuICAgICAgICBvUGFyYW1ldHJlW3VuZXNjYXBlKGFJdEtleVswXSldID0gYUl0S2V5Lmxlbmd0aCA+IDEgPyB1bmVzY2FwZShhSXRLZXlbMV0pIDogXCJcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9QYXJhbWV0cmU7XG4gIH1cblxuICBmdW5jdGlvbiB1cGRhdGVQZXJtYWxpbmtJbnB1dHMoKSB7XG4gICAgaWYgKCAhJCgnI3Blcm1hTGluaycpLmhhc0NsYXNzKCdhY3RpdmUnKSApXG4gICAgICAgIHJldHVybjtcblxuICAgIHZhciBwSHJlZiA9ICQoJyNwZXJtYWxpbmsnKS5hdHRyKCdocmVmJyk7XG5cbiAgICAkKCcjaW5wdXQtc2hhcmUtcGVybWFsaW5rJykudmFsKHBIcmVmKTtcblxuICAgIHZhciBpZnJhbWVTaXplID0gJCgnI3NlbGVjdC1lbWJlZC1wZXJtYWxpbmsnKS52YWwoKTtcbiAgICBwSHJlZiA9ICQoJyNwZXJtYWxpbmstZW1iZWQnKS5hdHRyKCdocmVmJyk7XG4gICAgdmFyIHBJZnJhbWUgPSAnJztcbiAgICBpZiAoIGlmcmFtZVNpemUgPT0gJ3MnICkge1xuICAgICAgICBwSWZyYW1lID0gJzxpZnJhbWUgd2lkdGg9XCI0MDBcIiBoZWlnaHQ9XCIzMDBcIiBmcmFtZWJvcmRlcj1cIjBcIiBzdHlsZT1cImJvcmRlcjowXCIgc3JjPVwiJytwSHJlZisnXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPic7XG4gICAgfSBlbHNlIGlmICggaWZyYW1lU2l6ZSA9PSAnbScgKSB7XG4gICAgICAgIHBJZnJhbWUgPSAnPGlmcmFtZSB3aWR0aD1cIjYwMFwiIGhlaWdodD1cIjQ1MFwiIGZyYW1lYm9yZGVyPVwiMFwiIHN0eWxlPVwiYm9yZGVyOjBcIiBzcmM9XCInK3BIcmVmKydcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+JztcbiAgICB9ZWxzZSBpZiAoIGlmcmFtZVNpemUgPT0gJ2wnICkge1xuICAgICAgICBwSWZyYW1lID0gJzxpZnJhbWUgd2lkdGg9XCI4MDBcIiBoZWlnaHQ9XCI2MDBcIiBmcmFtZWJvcmRlcj1cIjBcIiBzdHlsZT1cImJvcmRlcjowXCIgc3JjPVwiJytwSHJlZisnXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPic7XG4gICAgfWVsc2UgaWYgKCBpZnJhbWVTaXplID09ICdwJyApIHtcbiAgICAgICAgdmFyIHcgPSAkKCcjaW5wdXQtZW1iZWQtd2lkdGgtcGVybWFsaW5rJykudmFsKCk7XG4gICAgICAgIHZhciBoID0gJCgnI2lucHV0LWVtYmVkLWhlaWdodC1wZXJtYWxpbmsnKS52YWwoKTtcbiAgICAgICAgcElmcmFtZSA9ICc8aWZyYW1lIHdpZHRoPVwiJyt3KydcIiBoZWlnaHQ9XCInK2grJ1wiIGZyYW1lYm9yZGVyPVwiMFwiIHN0eWxlPVwiYm9yZGVyOjBcIiBzcmM9XCInK3BIcmVmKydcIiBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+JztcbiAgICB9XG4gICAgJCgnI2lucHV0LWVtYmVkLXBlcm1hbGluaycpLnZhbChwSWZyYW1lKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGJpbmRHZW9ib29rbWFya0V2ZW50cygpe1xuXG4gICAgJCgnLmJ0bi1nZW9ib29rbWFyay1kZWwnKS5jbGljayhmdW5jdGlvbigpe1xuICAgICAgaWYgKGNvbmZpcm0obGl6RGljdFsnZ2VvYm9va21hcmsuY29uZmlybS5kZWxldGUnXSApKXtcbiAgICAgICAgdmFyIGdiaWQgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICByZW1vdmVHZW9Cb29rbWFyayhnYmlkKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKCcuYnRuLWdlb2Jvb2ttYXJrLXJ1bicpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICB2YXIgaWQgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgcnVuR2VvQm9va21hcmsoIGlkICk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEdlb2Jvb2ttYXJrQ29udGVudCggZ2JEYXRhICl7XG4gICAgLy8gc2V0IGNvbnRlbnRcbiAgICAkKCdkaXYjZ2VvYm9va21hcmstY29udGFpbmVyJykuaHRtbChnYkRhdGEpO1xuICAgIC8vIHVuYmluZCBwcmV2aW91cyBjbGljayBldmVudHNcbiAgICAkKCdkaXYjZ2VvYm9va21hcmstY29udGFpbmVyIGJ1dHRvbicpLnVuYmluZCgnY2xpY2snKTtcbiAgICAvLyBCaW5kIGV2ZW50c1xuICAgIGJpbmRHZW9ib29rbWFya0V2ZW50cygpO1xuICAgIC8vIFJlbW92ZSBibmFtZSB2YWxcbiAgICAkKCcjZ2VvYm9va21hcmstZm9ybSBpbnB1dFtuYW1lPVwiYm5hbWVcIl0nKS52YWwoJycpLmJsdXIoKTtcbiAgfVxuXG4gIC8vIFNldCB0aGUgbWFwIGFjY29yZGluZ2x5IHRvXG4gIGZ1bmN0aW9uIHJ1blBlcm1hbGluayggcHBhcmFtcyApe1xuXG4gICAgLy8gQWN0aXZhdGUgbGF5ZXJzXG4gICAgdmFyIHBsYXllcnMgPSBwcGFyYW1zLmxheWVycztcblxuICAgIC8vIEdldCBzdHlsZXMgYW5kIHRyYW5mb3JtIGludG8gb2JqXG4gICAgdmFyIHNsaXN0ID0ge307XG4gICAgaWYoICdsYXllclN0eWxlcycgaW4gcHBhcmFtcyAmJiBwcGFyYW1zLmxheWVyU3R5bGVzICE9ICcnKXtcbiAgICAgIHZhciBsc3R5bGVzID0gcHBhcmFtcy5sYXllclN0eWxlcy5zcGxpdCgnOycpO1xuICAgICAgZm9yKHZhciBpIGluIGxzdHlsZXMpe1xuICAgICAgICB2YXIgYSA9IGxzdHlsZXNbaV07XG4gICAgICAgIHZhciBiID0gYS5zcGxpdCgnOicpO1xuICAgICAgICBpZiggYi5sZW5ndGggPT0gMilcbiAgICAgICAgICBzbGlzdFtiWzBdXSA9IGJbMV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gR2V0IG9wYWNpdGllcyBhbmQgdHJhbmZvcm0gaW50byBvYmpcbiAgICB2YXIgb2xpc3QgPSB7fTtcbiAgICBpZiggJ2xheWVyT3BhY2l0aWVzJyBpbiBwcGFyYW1zICYmIHBwYXJhbXMubGF5ZXJPcGFjaXRpZXMgIT0gJycpe1xuICAgICAgdmFyIGxvcGFjaXRpZXMgPSBwcGFyYW1zLmxheWVyT3BhY2l0aWVzLnNwbGl0KCc7Jyk7XG4gICAgICBmb3IodmFyIGkgaW4gbG9wYWNpdGllcyl7XG4gICAgICAgIHZhciBhID0gbG9wYWNpdGllc1tpXTtcbiAgICAgICAgdmFyIGIgPSBhLnNwbGl0KCc6Jyk7XG4gICAgICAgIGlmKCBiLmxlbmd0aCA9PSAyKVxuICAgICAgICAgIG9saXN0W2JbMF1dID0gcGFyc2VGbG9hdChiWzFdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IoIHZhciBpPTA7IGkgPCBtYXAubGF5ZXJzLmxlbmd0aDsgaSsrKXtcblxuICAgICAgLy8gQWN0aXZhdGUgYW5kIGRlYWN0aXZhdGUgbGF5ZXJzXG4gICAgICB2YXIgbCA9IG1hcC5sYXllcnNbaV07XG4gICAgICB2YXIgbGJhc2UgPSBsLmlzQmFzZUxheWVyO1xuICAgICAgaWYoIGxiYXNlICl7XG4gICAgICAgIGlmKCBwbGF5ZXJzW2ldID09ICdCJyApXG4gICAgICAgICAgJCgnI3N3aXRjaGVyLWJhc2VsYXllci1zZWxlY3QnKS52YWwoIGwubmFtZSApLmNoYW5nZSgpO1xuICAgICAgfWVsc2V7XG4gICAgICAgIHZhciBidG4gPSAkKCcjc3dpdGNoZXIgYnV0dG9uLmNoZWNrYm94W25hbWU9XCJsYXllclwiXVt2YWx1ZT1cIicrbC5uYW1lKydcIl0nKTtcbiAgICAgICAgaWYgKCAoIChwbGF5ZXJzW2ldID09ICdUJykgIT0gYnRuLmhhc0NsYXNzKCdjaGVja2VkJykgKSApXG4gICAgICAgICAgJCgnI3N3aXRjaGVyIGJ1dHRvbi5jaGVja2JveFtuYW1lPVwibGF5ZXJcIl1bdmFsdWU9XCInK2wubmFtZSsnXCJdJykuY2xpY2soKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2V0IHN0eWxlXG4gICAgICBpZiggbC5uYW1lIGluIHNsaXN0ICl7XG4gICAgICAgIGwucGFyYW1zWydTVFlMRVMnXSA9IHNsaXN0W2wubmFtZV07XG4gICAgICAgIGwucmVkcmF3KCB0cnVlICk7XG4gICAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KFwibGF5ZXJzdHlsZWNoYW5nZWRcIixcbiAgICAgICAgICAgIHsgJ2ZlYXR1cmVUeXBlJzogbC5uYW1lfVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBTZXQgb3BhY2l0eVxuICAgICAgaWYoIGwubmFtZSBpbiBvbGlzdCApe1xuICAgICAgICBsLnNldE9wYWNpdHkob2xpc3RbbC5uYW1lXSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRmlsdGVyXG4gICAgaWYoICdmaWx0ZXInIGluIHBwYXJhbXMgJiYgcHBhcmFtcy5maWx0ZXIgIT0gJycgKXtcbiAgICAgICAgdmFyIHNwID0gcHBhcmFtcy5maWx0ZXIuc3BsaXQoJzonKTtcbiAgICAgICAgaWYoIHNwLmxlbmd0aCA9PSAyICl7XG4gICAgICAgICAgdmFyIGZsYXllciA9IHNwWzBdO1xuICAgICAgICAgIHZhciBmZmlkcyA9IHNwWzFdLnNwbGl0KCk7XG5cbiAgICAgICAgICAvLyBTZWxlY3QgZmVhdHVyZVxuICAgICAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KCdsYXllcmZlYXR1cmVzZWxlY3RlZCcsXG4gICAgICAgICAgICAgIHsnZmVhdHVyZVR5cGUnOiBmbGF5ZXIsICdmaWQnOiBmZmlkcywgJ3VwZGF0ZURyYXdpbmcnOiBmYWxzZX1cbiAgICAgICAgICApO1xuICAgICAgICAgIC8vIEZpbHRlciBzZWxlY3RlZCBmZWF0dXJlXG4gICAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoJ2xheWVyZmVhdHVyZWZpbHRlcnNlbGVjdGVkJyxcbiAgICAgICAgICAgICAgeydmZWF0dXJlVHlwZSc6IGZsYXllcn1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfWVsc2V7XG4gICAgICBpZiggbGl6TWFwLmxpem1hcExheWVyRmlsdGVyQWN0aXZlICl7XG4gICAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KCdsYXllcmZlYXR1cmVyZW1vdmVmaWx0ZXInLFxuICAgICAgICAgICAgeydmZWF0dXJlVHlwZSc6IGxpek1hcC5saXptYXBMYXllckZpbHRlckFjdGl2ZX1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBab29tIHRvIGJib3hcbiAgICB2YXIgYmJveCA9IE9wZW5MYXllcnMuQm91bmRzLmZyb21TdHJpbmcoIHBwYXJhbXMuYmJveCApO1xuICAgIG1hcC56b29tVG9FeHRlbnQoIGJib3gsIHRydWUgKTtcblxuICB9XG5cbiAgZnVuY3Rpb24gcnVuR2VvQm9va21hcmsoIGlkICl7XG4gICAgdmFyIGdidXJsID0gbGl6VXJscy5nZW9ib29rbWFyaztcbiAgICB2YXIgZ2JwYXJhbXMgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBxOiAnZ2V0J1xuICAgIH07XG4gICAgJC5nZXQoZ2J1cmwsXG4gICAgICBnYnBhcmFtcyxcbiAgICAgIGZ1bmN0aW9uKGdlb3BhcmFtcykge1xuICAgICAgICBydW5QZXJtYWxpbmsoZ2VvcGFyYW1zKTtcbiAgICAgIH1cbiAgICAgICwnanNvbidcbiAgICApO1xuICB9XG5cbiAgZnVuY3Rpb24gcmVtb3ZlR2VvQm9va21hcmsoIGlkICl7XG4gICAgdmFyIGdidXJsID0gbGl6VXJscy5nZW9ib29rbWFyaztcbiAgICB2YXIgZ2JwYXJhbXMgPSB7XG4gICAgICBpZDogaWQsXG4gICAgICBxOiAnZGVsJyxcbiAgICAgIHJlcG9zaXRvcnk6IGxpelVybHMucGFyYW1zLnJlcG9zaXRvcnksXG4gICAgICBwcm9qZWN0OiBsaXpVcmxzLnBhcmFtcy5wcm9qZWN0XG4gICAgfTtcbiAgICAkLmdldChnYnVybCxcbiAgICAgIGdicGFyYW1zLFxuICAgICAgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICBzZXRHZW9ib29rbWFya0NvbnRlbnQoZGF0YSk7XG4gICAgICB9XG4gICAgICAsJ3RleHQnXG4gICAgKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEdlb21ldHJ5RmVhdHVyZUluZm8oIHBvcHVwLCBjb250YWluZXJJZCApIHtcbiAgICAgIC8vIGNsZWFuIGxvY2F0ZSBsYXllclxuICAgICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZSgnbG9jYXRlbGF5ZXInKTtcbiAgICAgIGlmICggbGF5ZXIubGVuZ3RoID09IDAgKVxuICAgICAgICByZXR1cm47XG4gICAgICBsYXllciA9IGxheWVyWzBdO1xuICAgICAgbGF5ZXIuZGVzdHJveUZlYXR1cmVzKCk7XG4gICAgICAvLyBidWlsZCBzZWxlY3RvclxuICAgICAgdmFyIHNlbGVjdG9yID0gJ2Rpdi5saXptYXBQb3B1cENvbnRlbnQgPiBkaXYubGl6bWFwUG9wdXBEaXYgPiBpbnB1dC5saXptYXAtcG9wdXAtbGF5ZXItZmVhdHVyZS1nZW9tZXRyeSc7XG4gICAgICBpZiAoIGNvbnRhaW5lcklkIClcbiAgICAgICAgc2VsZWN0b3IgPSAnIycrIGNvbnRhaW5lcklkICsnICcrIHNlbGVjdG9yO1xuICAgICAgLy8gZ2V0IGdlb21ldHJpZXMgYW5kIGNyc1xuICAgICAgdmFyIGdlb21ldHJpZXMgPSBbXTtcbiAgICAgICQoc2VsZWN0b3IpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgdmFsID0gc2VsZi52YWwoKTtcbiAgICAgICAgaWYgKCB2YWwgPT0gJycgKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgY3JzID0gc2VsZi5wYXJlbnQoKS5maW5kKCdpbnB1dC5saXptYXAtcG9wdXAtbGF5ZXItZmVhdHVyZS1jcnMnKS52YWwoKTtcbiAgICAgICAgaWYgKCBjcnMgPT0gJycgKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB2YXIgZmlkID0gc2VsZi5wYXJlbnQoKS5maW5kKCdpbnB1dC5saXptYXAtcG9wdXAtbGF5ZXItZmVhdHVyZS1pZCcpLnZhbCgpO1xuICAgICAgICB2YXIgbWlueCA9IHNlbGYucGFyZW50KCkuZmluZCgnaW5wdXQubGl6bWFwLXBvcHVwLWxheWVyLWZlYXR1cmUtYmJveC1taW54JykudmFsKCk7XG4gICAgICAgIHZhciBtaW55ID0gc2VsZi5wYXJlbnQoKS5maW5kKCdpbnB1dC5saXptYXAtcG9wdXAtbGF5ZXItZmVhdHVyZS1iYm94LW1pbnknKS52YWwoKTtcbiAgICAgICAgdmFyIG1heHggPSBzZWxmLnBhcmVudCgpLmZpbmQoJ2lucHV0Lmxpem1hcC1wb3B1cC1sYXllci1mZWF0dXJlLWJib3gtbWF4eCcpLnZhbCgpO1xuICAgICAgICB2YXIgbWF4eSA9IHNlbGYucGFyZW50KCkuZmluZCgnaW5wdXQubGl6bWFwLXBvcHVwLWxheWVyLWZlYXR1cmUtYmJveC1tYXh5JykudmFsKCk7XG4gICAgICAgIGdlb21ldHJpZXMucHVzaCggeyBmaWQ6IGZpZCwgZ2VvbTogdmFsLCBjcnM6IGNycywgYmJveDpbbWlueCxtaW55LG1heHgsbWF4eV0gfSApO1xuICAgICAgfSk7XG4gICAgICAvLyBsb2FkIHByb2ogYW5kIGJ1aWxkIGZlYXR1cmVzIGZyb20gcG9wdXBcbiAgICAgIHZhciBwcm9qTG9hZGVkID0gW107XG4gICAgICBmb3IgKCB2YXIgaT0wLCBsZW49Z2VvbWV0cmllcy5sZW5ndGg7IGk8bGVuOyBpKysgKSB7XG4gICAgICAgICAgbG9hZFByb2pEZWZpbml0aW9uKGdlb21ldHJpZXNbaV0uY3JzLCBmdW5jdGlvbiggYVByb2ogKSB7XG4gICAgICAgICAgICAgIHByb2pMb2FkZWQucHVzaCggYVByb2ogKTtcbiAgICAgICAgICAgICAgaWYgKCBwcm9qTG9hZGVkLmxlbmd0aCA9PSBnZW9tZXRyaWVzLmxlbmd0aCApIHtcbiAgICAgICAgICAgICAgICAgIHZhciBmZWF0dXJlcyA9IFtdO1xuICAgICAgICAgICAgICAgICAgZm9yICggdmFyIGo9MCwgbGVuPWdlb21ldHJpZXMubGVuZ3RoOyBqPGxlbjsgaisrICkge1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBnZW9tSW5mbyA9IGdlb21ldHJpZXNbal07XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGdlb21ldHJ5ID0gT3BlbkxheWVycy5HZW9tZXRyeS5mcm9tV0tUKCBnZW9tSW5mby5nZW9tICk7XG4gICAgICAgICAgICAgICAgICAgICAgZ2VvbWV0cnkudHJhbnNmb3JtKGdlb21JbmZvLmNycywgbWFwLmdldFByb2plY3Rpb24oKSk7XG4gICAgICAgICAgICAgICAgICAgICAgZmVhdHVyZXMucHVzaCggbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IoIGdlb21ldHJ5ICkgKTtcblxuICAgICAgICAgICAgICAgICAgICAgIHZhciBmaWRJbnB1dCA9ICQoJ2Rpdi5saXptYXBQb3B1cENvbnRlbnQgaW5wdXQubGl6bWFwLXBvcHVwLWxheWVyLWZlYXR1cmUtaWRbdmFsdWU9XCInK2dlb21JbmZvLmZpZCsnXCJdJyk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCAhZmlkSW5wdXQgKVxuICAgICAgICAgICAgICAgICAgICAgICAgY29udGludWU7XG5cbiAgICAgICAgICAgICAgICAgICAgICB2YXIgYm91bmRzID0gT3BlbkxheWVycy5Cb3VuZHMuZnJvbUFycmF5KGdlb21JbmZvLmJib3gpO1xuICAgICAgICAgICAgICAgICAgICAgIGJvdW5kcy50cmFuc2Zvcm0oZ2VvbUluZm8uY3JzLCBtYXAuZ2V0UHJvamVjdGlvbigpKTtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgZUh0bWwgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgICBlSHRtbCs9ICc8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1taW5pIHBvcHVwLWxheWVyLWZlYXR1cmUtYmJveC16b29tXCIgdmFsdWU9XCInO1xuICAgICAgICAgICAgICAgICAgICAgIGVIdG1sKz0gYm91bmRzLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgICAgICAgZUh0bWwrPSAnXCIgdGl0bGU9XCInICsgbGl6RGljdFsnYXR0cmlidXRlTGF5ZXJzLmJ0bi56b29tLnRpdGxlJ10gKyAnXCI+PGkgY2xhc3M9XCJpY29uLXpvb20taW5cIj48L2k+Jm5ic3A7PC9idXR0b24+JztcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcG9wdXBCdXR0b25CYXIgPSBmaWRJbnB1dC5uZXh0KCdzcGFuLnBvcHVwQnV0dG9uQmFyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCBwb3B1cEJ1dHRvbkJhci5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBwb3B1cEJ1dHRvbkJhci5maW5kKCdidXR0b24ucG9wdXAtbGF5ZXItZmVhdHVyZS1iYm94LXpvb20nKS5sZW5ndGggPT0gMCApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3B1cEJ1dHRvbkJhci5hcHBlbmQoZUh0bWwpO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGVIdG1sID0gJzxzcGFuIGNsYXNzPVwicG9wdXBCdXR0b25CYXJcIj4nICsgZUh0bWwgKyAnPC9zcGFuPjwvYnI+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmlkSW5wdXQuYWZ0ZXIoZUh0bWwpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBmaWRJbnB1dC5maW5kKCdidXR0b24uYnRuJykudG9vbHRpcCgge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBwbGFjZW1lbnQ6ICdib3R0b20nXG4gICAgICAgICAgICAgICAgICAgICAgfSApO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICBsYXllci5hZGRGZWF0dXJlcyggZmVhdHVyZXMgKTtcblxuICAgICAgICAgICAgICAgICAgLy8gWm9vbVxuICAgICAgICAgICAgICAgICAgJCgnZGl2Lmxpem1hcFBvcHVwQ29udGVudCBidXR0b24ucG9wdXAtbGF5ZXItZmVhdHVyZS1iYm94LXpvb20nKVxuICAgICAgICAgICAgICAgICAgLnVuYmluZCgnY2xpY2snKVxuICAgICAgICAgICAgICAgICAgLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgICAgICAgdmFyIGJib3ggPSBPcGVuTGF5ZXJzLkJvdW5kcy5mcm9tU3RyaW5nKCQodGhpcykudmFsKCkpO1xuICAgICAgICAgICAgICAgICAgICAgIG1hcC56b29tVG9FeHRlbnQoYmJveCk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgIC5ob3ZlcihcbiAgICAgICAgICAgICAgICAgICAgICBmdW5jdGlvbigpeyAkKHRoaXMpLmFkZENsYXNzKCdidG4tcHJpbWFyeScpOyB9LFxuICAgICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uKCl7ICQodGhpcykucmVtb3ZlQ2xhc3MoJ2J0bi1wcmltYXJ5Jyk7IH1cbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9ICk7XG4gICAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDaGlsZHJlbkRhdGF2aXpGaWx0ZXJlZEJ5UG9wdXBGZWF0dXJlKHBvcHVwLCBjb250YWluZXJJZCkge1xuICAgICAgLy8gYnVpbGQgc2VsZWN0b3JcbiAgICAgIHZhciBzZWxlY3RvciA9ICdkaXYubGl6bWFwUG9wdXBDb250ZW50ID4gZGl2Lmxpem1hcFBvcHVwRGl2JztcbiAgICAgIGlmICggY29udGFpbmVySWQgKVxuICAgICAgICBzZWxlY3RvciA9ICcjJysgY29udGFpbmVySWQgKycgJysgc2VsZWN0b3I7XG5cbiAgICAgJChzZWxlY3RvcikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbXlkaXYgPSAkKHRoaXMpO1xuXG4gICAgICAgIC8vIERvIG5vdCBhZGQgcGxvdHMgaWYgYWxyZWFkeSBwcmVzZW50XG4gICAgICAgIGlmKCAkKHRoaXMpLmZpbmQoJ2Rpdi5saXpkYXRhdml6JykubGVuZ3RoID4gMCApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICB2YXIgZ2V0TGF5ZXJJZCA9ICQodGhpcykuZmluZCgnaW5wdXQubGl6bWFwLXBvcHVwLWxheWVyLWZlYXR1cmUtaWQ6Zmlyc3QnKS52YWwoKS5zcGxpdCgnLicpO1xuICAgICAgICB2YXIgcG9wdXBJZCA9IGdldExheWVySWRbMF0gKyAnXycgKyBnZXRMYXllcklkWzFdO1xuICAgICAgICB2YXIgbGF5ZXJJZCA9IGdldExheWVySWRbMF07XG4gICAgICAgIHZhciBmaWQgPSBnZXRMYXllcklkWzFdO1xuICAgICAgICB2YXIgbGF5ZXJOYW1lPWdldExheWVySWRbMF0uc3BsaXQoL1swLTldLylbMF07XG5cbiAgICAgICAgdmFyIGdldExheWVyQ29uZmlnID0gbGl6TWFwLmdldExheWVyQ29uZmlnQnlJZCggbGF5ZXJJZCApO1xuXG4gICAgICAgIC8vIHZlcmlmaXlpbmcgIHJlbGF0ZWQgY2hpbGRyZW4gb2JqZWN0c1xuICAgICAgICBpZiAoICFnZXRMYXllckNvbmZpZyApXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgdmFyIGxheWVyQ29uZmlnID0gZ2V0TGF5ZXJDb25maWdbMV07XG4gICAgICAgIHZhciBmZWF0dXJlVHlwZSA9IGdldExheWVyQ29uZmlnWzBdO1xuXG4gICAgICAgIC8vIFdlIGRvIG5vdCB3YW50IHRvIGRlYWN0aXZhdGUgdGhlIGRpc3BsYXkgb2YgZmlsdGVyZWQgY2hpbGRyZW4gZGF0YXZpelxuICAgICAgICAvLyB3aGVuIGNoaWxkcmVuIHBvcHVwIGFyZSBub3QgZGlzcGxheWVkIDogY29tbWVudCB0aGUgMiBmb2xsb3dpbmcgbGluZXNcbiAgICAgICAgaWYgKCAhKCdyZWxhdGlvbnMnIGluIGxpek1hcC5jb25maWcpIHx8ICEobGF5ZXJJZCBpbiBsaXpNYXAuY29uZmlnLnJlbGF0aW9ucykgKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgLy9JZiBkYXRhdml6IGV4aXN0cywgZ2V0IGNvbmZpZ1xuICAgICAgICBpZiggISgnZGF0YXZpekxheWVycycgaW4gbGl6TWFwLmNvbmZpZyApKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG5cbiAgICAgICAgbGl6TWFwLmdldExheWVyRmVhdHVyZShmZWF0dXJlVHlwZSwgZmlkLCBmdW5jdGlvbihmZWF0KSB7XG4gICAgICAgICAgICAvLyBXaGVyZSB0aGVyZSBpcyBhbGwgcGxvdHNcbiAgICAgICAgICAgIHZhciBwbG90TGF5ZXJzID0gbGl6TWFwLmNvbmZpZy5kYXRhdml6TGF5ZXJzLmxheWVycztcbiAgICAgICAgICAgIHZhciBscmVsYXRpb25zID0gbGl6TWFwLmNvbmZpZy5yZWxhdGlvbnNbbGF5ZXJJZF07XG4gICAgICAgICAgICBuYlBsb3RCeUxheWVyID0gMTtcbiAgICAgICAgICAgIGZvcih2YXIgeCBpbiBscmVsYXRpb25zKXtcbiAgICAgICAgICAgICAgICB2YXIgcmVsID0gbHJlbGF0aW9uc1t4XTtcbiAgICAgICAgICAgICAgICAvLyBJZCBvZiB0aGUgbGF5ZXIgd2hpY2ggaXMgdGhlIGNoaWxkIG9mIGxheWVySWRcbiAgICAgICAgICAgICAgICB2YXIgZ2V0Q2hpbGRyZW5JZCA9IHJlbC5yZWZlcmVuY2luZ0xheWVyO1xuXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIG9mIHRoZSBwbG90XG4gICAgICAgICAgICAgICAgdmFyIGZpbHRlciA9ICdcIicgKyByZWwucmVmZXJlbmNpbmdGaWVsZCArICdcIiBJTiAoXFwnJytmZWF0LnByb3BlcnRpZXNbcmVsLnJlZmVyZW5jZWRGaWVsZF0rJ1xcJyknO1xuICAgICAgICAgICAgICAgIGZvciAoIHZhciBpIGluIHBsb3RMYXllcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYocGxvdExheWVyc1tpXS5sYXllcl9pZD09Z2V0Q2hpbGRyZW5JZClcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgcGxvdF9jb25maWc9cGxvdExheWVyc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmKCdwb3B1cF9kaXNwbGF5X2NoaWxkX3Bsb3QnIGluIHBsb3RfY29uZmlnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICYmIHBsb3RfY29uZmlnLnBvcHVwX2Rpc3BsYXlfY2hpbGRfcGxvdCA9PSBcIlRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcGxvdF9pZD1wbG90TGF5ZXJzW2ldLnBsb3RfaWQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwSWQgPSBnZXRMYXllcklkWzBdICsgJ18nICsgZ2V0TGF5ZXJJZFsxXSArICdfJyArIFN0cmluZyhuYlBsb3RCeUxheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQmUgc3VyZSB0aGUgaWQgaXMgdW5pcXVlICggcG9wdXAgY2FuIGJlIGRpc3BsYXllZCBpbiBhdGxhcyB0b29sIHRvbylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBJZCs9ICdfJyArIG5ldyBEYXRlKCkudmFsdWVPZigpK2J0b2EoTWF0aC5yYW5kb20oKSkuc3Vic3RyaW5nKDAsMTIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgcGh0bWwgPSBsaXpEYXRhdml6LmJ1aWxkUGxvdENvbnRhaW5lckh0bWwoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbG90X2NvbmZpZy50aXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsb3RfY29uZmlnLmFic3RyYWN0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcG9wdXBJZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZhbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwgPSAnPGRpdiBjbGFzcz1cImxpem1hcFBvcHVwQ2hpbGRyZW4gbGl6ZGF0YXZpelwiPic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwrPSAnPGg0PicrIHBsb3RfY29uZmlnLnRpdGxlKyc8L2g0Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGh0bWwrPSBwaHRtbFxuICAgICAgICAgICAgICAgICAgICAgICAgICBodG1sKz0gJzwvZGl2Pic7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoYXNwYyA9ICQobXlkaXYpLmZpbmQoJ2Rpdi5saXptYXBQb3B1cENoaWxkcmVuOmZpcnN0Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmKCBoYXNwYy5sZW5ndGggPiAwIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoaGFzcGMpLmJlZm9yZShodG1sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChteWRpdikuYXBwZW5kKGh0bWwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsaXpEYXRhdml6LmdldFBsb3QocGxvdF9pZCwgZmlsdGVyLCBwb3B1cElkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbmJQbG90QnlMYXllcisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldENoaWxkcmVuRmVhdHVyZUluZm8oIHJDb25maWdMYXllciwgd21zT3B0aW9ucywgcGFyZW50RGl2LCBhQ2FsbGJhY2sgKSB7XG4gICAgICAgIGlmICggckNvbmZpZ0xheWVyLnBvcHVwICE9ICdUcnVlJyApXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIC8vIFF1ZXJ5IHRoZSBzZXJ2ZXJcbiAgICAgICAgdmFyIHNlcnZpY2UgPSBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKGxpelVybHMud21zXG4gICAgICAgICAgICAsT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICAgICAgKTtcbiAgICAgICAgJC5wb3N0KHNlcnZpY2UsIHdtc09wdGlvbnMsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICAgIHZhciBoYXNQb3B1cENvbnRlbnQgPSAoISghZGF0YSB8fCBkYXRhID09IG51bGwgfHwgZGF0YSA9PSAnJykpXG4gICAgICAgICAgICBpZiAoIGhhc1BvcHVwQ29udGVudCApIHtcbiAgICAgICAgICAgICAgICB2YXIgcG9wdXBSZWcgPSBuZXcgUmVnRXhwKCdsaXptYXBQb3B1cFRhYmxlJywgJ2cnKTtcbiAgICAgICAgICAgICAgICBkYXRhID0gZGF0YS5yZXBsYWNlKHBvcHVwUmVnLCAndGFibGUgdGFibGUtY29uZGVuc2VkIHRhYmxlLXN0cmlwZWQgbGl6bWFwUG9wdXBUYWJsZScpO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNsbmFtZSA9IHJDb25maWdMYXllci5jbGVhbm5hbWU7XG4gICAgICAgICAgICAgICAgaWYgKCBjbG5hbWUgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICAgICAgY2xuYW1lID0gY2xlYW5OYW1lKGNvbmZpZ0xheWVyLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICByQ29uZmlnTGF5ZXIuY2xlYW5uYW1lID0gY2xuYW1lO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB2YXIgY2hpbGRQb3B1cCA9ICQoJzxkaXYgY2xhc3M9XCJsaXptYXBQb3B1cENoaWxkcmVuICcrY2xuYW1lKydcIj4nK2RhdGErJzwvZGl2PicpO1xuXG4gICAgICAgICAgICAgICAgLy9NYW5hZ2UgaWYgdGhlIHVzZXIgY2hvb3NlIHRvIGNyZWF0ZSBhIHRhYmxlIGZvciBjaGlsZHJlblxuICAgICAgICAgICAgICAgIGlmKCByQ29uZmlnTGF5ZXIucG9wdXBTb3VyY2UgPT0gJ3FnaXMnICYmXG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUG9wdXAuZmluZCgnLmxpem1hcF9tZXJnZWQnKS5sZW5ndGggIT0gMCApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAvLyBzYXZlIGlucHV0c1xuICAgICAgICAgICAgICAgICAgICBjaGlsZFBvcHVwLmZpbmQoXCIubGl6bWFwUG9wdXBEaXZcIikuZWFjaChmdW5jdGlvbihpLGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBvcHVwRGl2ID0gJChlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcG9wdXBEaXYuZmluZChcIi5saXptYXBQb3B1cEhlYWRlclwiKS5wcm9wKFwidGFnTmFtZVwiKSA9PSAnVFInICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwRGl2LmZpbmQoXCIubGl6bWFwUG9wdXBIZWFkZXJcIikucHJlcGVuZChcIjx0aD48L3RoPlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3B1cERpdi5maW5kKFwiLmxpem1hcFBvcHVwSGVhZGVyXCIpLm5leHQoKS5wcmVwZW5kKFwiPHRkPjwvdGQ+XCIpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3B1cERpdi5maW5kKFwiLmxpem1hcFBvcHVwSGVhZGVyXCIpLm5leHQoKS5wcmVwZW5kKFwiPHNwYW4+PC9zcGFuPlwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwRGl2LmZpbmQoXCIubGl6bWFwUG9wdXBIZWFkZXJcIikubmV4dCgpLmNoaWxkcmVuKCkuZmlyc3QoKS5hcHBlbmQocG9wdXBEaXYuZmluZChcImlucHV0XCIpKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2hpbGRQb3B1cC5maW5kKFwiaDRcIikuZWFjaChmdW5jdGlvbihpLGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaSAhPSAwIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGUpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjaGlsZFBvcHVwLmZpbmQoXCIubGl6bWFwUG9wdXBIZWFkZXJcIikuZWFjaChmdW5jdGlvbihpLGUpe1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYoaSAhPSAwIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKGUpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBjaGlsZFBvcHVwLmZpbmQoXCIubGl6bWFwUG9wdXBEaXZcIikuY29udGVudHMoKS51bndyYXAoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRQb3B1cC5maW5kKFwiLmxpem1hcF9tZXJnZWRcIikuY29udGVudHMoKS51bndyYXAoKTtcbiAgICAgICAgICAgICAgICAgICAgY2hpbGRQb3B1cC5maW5kKFwiLmxpem1hcFBvcHVwRGl2XCIpLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZFBvcHVwLmZpbmQoXCIubGl6bWFwX21lcmdlZFwiKS5yZW1vdmUoKTtcblxuICAgICAgICAgICAgICAgICAgICBjaGlsZFBvcHVwLmZpbmQoXCIubGl6bWFwUG9wdXBIaWRkZW5cIikuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIHZhciB0Q2hpbGRQb3B1cCA9ICQoXCI8dGFibGUgY2xhc3M9J2xpem1hcF9tZXJnZWQnPjwvdGFibGU+XCIpO1xuICAgICAgICAgICAgICAgICAgICBjaGlsZFBvcHVwLmFwcGVuZCh0Q2hpbGRQb3B1cCk7XG4gICAgICAgICAgICAgICAgICAgIGNoaWxkUG9wdXAuZmluZCgndHInKS5hcHBlbmRUbyh0Q2hpbGRQb3B1cCk7XG5cbiAgICAgICAgICAgICAgICAgICAgY2hpbGRQb3B1cC5jaGlsZHJlbigndGJvZHknKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB2YXIgb2xkUG9wdXBDaGlsZCA9IHBhcmVudERpdi5maW5kKCdkaXYubGl6bWFwUG9wdXBDaGlsZHJlbi4nK2NsbmFtZSk7XG4gICAgICAgICAgICAgICAgaWYgKCBvbGRQb3B1cENoaWxkLmxlbmd0aCAhPSAwIClcbiAgICAgICAgICAgICAgICAgICAgb2xkUG9wdXBDaGlsZC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgICBwYXJlbnREaXYuYXBwZW5kKGNoaWxkUG9wdXApO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBhQ2FsbGJhY2sgKVxuICAgICAgICAgICAgICAgICAgICBhQ2FsbGJhY2soIGNoaWxkUG9wdXAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBhZGRDaGlsZHJlbkZlYXR1cmVJbmZvKCBwb3B1cCwgY29udGFpbmVySWQgKSB7XG4gICAgICB2YXIgc2VsZWN0b3IgPSAnZGl2Lmxpem1hcFBvcHVwQ29udGVudCBpbnB1dC5saXptYXAtcG9wdXAtbGF5ZXItZmVhdHVyZS1pZCc7XG4gICAgICBpZiAoIGNvbnRhaW5lcklkIClcbiAgICAgICAgc2VsZWN0b3IgPSAnIycrIGNvbnRhaW5lcklkICsnICcrIHNlbGVjdG9yO1xuICAgICAgJChzZWxlY3RvcikuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHZhciB2YWwgPSBzZWxmLnZhbCgpO1xuICAgICAgICB2YXIgZUh0bWwgPSAnJztcbiAgICAgICAgdmFyIGZpZCA9IHZhbC5zcGxpdCgnLicpLnBvcCgpO1xuICAgICAgICB2YXIgbGF5ZXJJZCA9IHZhbC5yZXBsYWNlKCAnLicgKyBmaWQsICcnICk7XG5cbiAgICAgICAgdmFyIGdldExheWVyQ29uZmlnID0gZ2V0TGF5ZXJDb25maWdCeUlkKCBsYXllcklkICk7XG5cbiAgICAgICAgLy8gdmVyaWZpeWluZyAgcmVsYXRlZCBjaGlsZHJlbiBvYmplY3RzXG4gICAgICAgIGlmICggIWdldExheWVyQ29uZmlnIClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB2YXIgbGF5ZXJDb25maWcgPSBnZXRMYXllckNvbmZpZ1sxXTtcbiAgICAgICAgdmFyIGZlYXR1cmVUeXBlID0gZ2V0TGF5ZXJDb25maWdbMF07XG4gICAgICAgIGlmICggISgncG9wdXBEaXNwbGF5Q2hpbGRyZW4nIGluIGxheWVyQ29uZmlnKSB8fCBsYXllckNvbmZpZy5wb3B1cERpc3BsYXlDaGlsZHJlbiAhPSAnVHJ1ZScpXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgaWYgKCAhKCdyZWxhdGlvbnMnIGluIGNvbmZpZykgfHwgIShsYXllcklkIGluIGNvbmZpZy5yZWxhdGlvbnMpIClcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuXG4gICAgICAgIC8vIERpc3BsYXkgcmVsYXRlZCBjaGlsZHJlbiBvYmplY3RzXG4gICAgICAgIHZhciByZWxhdGlvbnMgPSBjb25maWcucmVsYXRpb25zW2xheWVySWRdO1xuICAgICAgICB2YXIgZmVhdHVyZUlkID0gZmVhdHVyZVR5cGUgKyAnLicgKyBmaWQ7XG4gICAgICAgIHZhciBwb3B1cE1heEZlYXR1cmVzID0gMTA7XG4gICAgICAgIGlmICggJ3BvcHVwTWF4RmVhdHVyZXMnIGluIGxheWVyQ29uZmlnICYmICFpc05hTihwYXJzZUludChsYXllckNvbmZpZy5wb3B1cE1heEZlYXR1cmVzKSkgKVxuICAgICAgICAgICAgcG9wdXBNYXhGZWF0dXJlcyA9IHBhcnNlSW50KGxheWVyQ29uZmlnLnBvcHVwTWF4RmVhdHVyZXMpO1xuICAgICAgICBwb3B1cE1heEZlYXR1cmVzID09IDAgPyAxMCA6IHBvcHVwTWF4RmVhdHVyZXM7XG4gICAgICAgIGdldExheWVyRmVhdHVyZShmZWF0dXJlVHlwZSwgZmlkLCBmdW5jdGlvbihmZWF0KSB7XG4gICAgICAgICAgICBmb3IgKCB2YXIgaT0wLCBsZW49cmVsYXRpb25zLmxlbmd0aDsgaTxsZW47IGkrKyApe1xuICAgICAgICAgICAgICAgIHZhciByID0gcmVsYXRpb25zW2ldO1xuICAgICAgICAgICAgICAgIHZhciByTGF5ZXJJZCA9IHIucmVmZXJlbmNpbmdMYXllcjtcbiAgICAgICAgICAgICAgICB2YXIgckdldExheWVyQ29uZmlnID0gZ2V0TGF5ZXJDb25maWdCeUlkKCByTGF5ZXJJZCApO1xuICAgICAgICAgICAgICAgIGlmICggckdldExheWVyQ29uZmlnICkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgckNvbmZpZ0xheWVyID0gckdldExheWVyQ29uZmlnWzFdO1xuICAgICAgICAgICAgICAgICAgICB2YXIgY2xuYW1lID0gckNvbmZpZ0xheWVyLmNsZWFubmFtZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCBjbG5hbWUgPT09IHVuZGVmaW5lZCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsbmFtZSA9IGNsZWFuTmFtZShjb25maWdMYXllci5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJDb25maWdMYXllci5jbGVhbm5hbWUgPSBjbG5hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCByQ29uZmlnTGF5ZXIucG9wdXAgPT0gJ1RydWUnICYmIHNlbGYucGFyZW50KCkuZmluZCgnZGl2Lmxpem1hcFBvcHVwQ2hpbGRyZW4uJytjbG5hbWUpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgd21zT3B0aW9ucyA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ0xBWUVSUyc6IHJDb25maWdMYXllci5uYW1lXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLCdRVUVSWV9MQVlFUlMnOiByQ29uZmlnTGF5ZXIubmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwnU1RZTEVTJzogJydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsJ1NFUlZJQ0UnOiAnV01TJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwnVkVSU0lPTic6ICcxLjMuMCdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsJ0NSUyc6ICgoJ2NycycgaW4gckNvbmZpZ0xheWVyKSAmJiByQ29uZmlnTGF5ZXIuY3JzICE9ICcnKSA/IHJDb25maWdMYXllci5jcnMgOiAnRVBTRzo0MzI2J1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwnUkVRVUVTVCc6ICdHZXRGZWF0dXJlSW5mbydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsJ0VYQ0VQVElPTlMnOiAnYXBwbGljYXRpb24vdm5kLm9nYy5zZV9pbmltYWdlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICwnRkVBVFVSRV9DT1VOVCc6IHBvcHVwTWF4RmVhdHVyZXNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAsJ0lORk9fRk9STUFUJzogJ3RleHQvaHRtbCdcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggJ3BvcHVwTWF4RmVhdHVyZXMnIGluIHJDb25maWdMYXllciAmJiAhaXNOYU4ocGFyc2VJbnQockNvbmZpZ0xheWVyLnBvcHVwTWF4RmVhdHVyZXMpKSApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd21zT3B0aW9uc1snRkVBVFVSRV9DT1VOVCddID0gcGFyc2VJbnQockNvbmZpZ0xheWVyLnBvcHVwTWF4RmVhdHVyZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCB3bXNPcHRpb25zWydGRUFUVVJFX0NPVU5UJ10gPT0gMCApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd21zT3B0aW9uc1snRkVBVFVSRV9DT1VOVCddID0gcG9wdXBNYXhGZWF0dXJlcztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICggckNvbmZpZ0xheWVyLnJlcXVlc3RfcGFyYW1zICYmIHJDb25maWdMYXllci5yZXF1ZXN0X3BhcmFtcy5maWx0ZXIgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgckNvbmZpZ0xheWVyLnJlcXVlc3RfcGFyYW1zLmZpbHRlciAhPT0gJycgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdtc09wdGlvbnNbJ0ZJTFRFUiddID0gckNvbmZpZ0xheWVyLnJlcXVlc3RfcGFyYW1zLmZpbHRlcisnIEFORCBcIicrci5yZWZlcmVuY2luZ0ZpZWxkKydcIiA9IFxcJycrZmVhdC5wcm9wZXJ0aWVzW3IucmVmZXJlbmNlZEZpZWxkXSsnXFwnJztcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3bXNPcHRpb25zWydGSUxURVInXSA9IHJDb25maWdMYXllci5uYW1lKyc6XCInK3IucmVmZXJlbmNpbmdGaWVsZCsnXCIgPSBcXCcnK2ZlYXQucHJvcGVydGllc1tyLnJlZmVyZW5jZWRGaWVsZF0rJ1xcJyc7XG4gICAgICAgICAgICAgICAgICAgICAgICBnZXRDaGlsZHJlbkZlYXR1cmVJbmZvKCByQ29uZmlnTGF5ZXIsIHdtc09wdGlvbnMsIHNlbGYucGFyZW50KCksIGZ1bmN0aW9uKGNoaWxkUG9wdXApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICggcG9wdXAgJiYgdHlwZW9mIHBvcHVwLnZlcmlmeVNpemUgPT09IFwiZnVuY3Rpb25cIiApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwLnZlcmlmeVNpemUoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRyaWdnZXIgZXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJsaXptYXBwb3B1cGNoaWxkcmVuZGlzcGxheWVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHsnaHRtbCc6IGNoaWxkUG9wdXAuaHRtbCgpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZEZlYXR1cmVJbmZvKCkge1xuICAgICAgLy8gVmVyaWZ5aW5nIGxheWVyc1xuICAgICAgdmFyIHBvcHVwc0F2YWlsYWJsZSA9IGZhbHNlO1xuICAgICAgZm9yICggdmFyIGwgaW4gY29uZmlnLmxheWVycyApIHtcbiAgICAgICAgICB2YXIgY29uZmlnTGF5ZXIgPSBjb25maWcubGF5ZXJzW2xdO1xuICAgICAgICAgIHZhciBlZGl0aW9uTGF5ZXIgPSBudWxsO1xuICAgICAgICAgIGlmICggKCdlZGl0aW9uTGF5ZXJzJyBpbiBjb25maWcpICYmIChsIGluIGNvbmZpZy5lZGl0aW9uTGF5ZXJzKSApXG4gICAgICAgICAgICAgIGVkaXRpb25MYXllciA9IGNvbmZpZy5lZGl0aW9uTGF5ZXJzW2xdO1xuICAgICAgICAgIGlmKCAoY29uZmlnTGF5ZXIgJiYgY29uZmlnTGF5ZXIucG9wdXAgJiYgY29uZmlnTGF5ZXIucG9wdXAgPT0gJ1RydWUnKVxuICAgICAgICAgICB8fCAoZWRpdGlvbkxheWVyICYmICggZWRpdGlvbkxheWVyLmNhcGFiaWxpdGllcy5tb2RpZnlHZW9tZXRyeSA9PSAnVHJ1ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IGVkaXRpb25MYXllci5jYXBhYmlsaXRpZXMubW9kaWZ5QXR0cmlidXRlID09ICdUcnVlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfHwgZWRpdGlvbkxheWVyLmNhcGFiaWxpdGllcy5kZWxldGVGZWF0dXJlID09ICdUcnVlJykgKSApe1xuICAgICAgICAgICAgICBwb3B1cHNBdmFpbGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAoICFwb3B1cHNBdmFpbGFibGUgKVxuICAgICAgICByZXR1cm4gbnVsbDtcblxuICAgICAgLy8gQ3JlYXRlIHRoZSBkb2NrIGlmIG5lZWRlZFxuICAgICAgaWYoICdwb3B1cExvY2F0aW9uJyBpbiBjb25maWcub3B0aW9ucyAmJlxuICAgICAgICAgIGNvbmZpZy5vcHRpb25zLnBvcHVwTG9jYXRpb24gIT0gJ21hcCcgJiZcbiAgICAgICAgICAhJCgnI21hcG1lbnUgLm5hdi1saXN0ID4gbGkucG9wdXBjb250ZW50ID4gYScpLmxlbmd0aCApIHtcbiAgICAgICAgICAvLyBWZXJpZnlpbmcgdGhlIG1lc3NhZ2VcbiAgICAgICAgICBpZiAoICEoJ3BvcHVwLm1zZy5zdGFydCcgaW4gbGl6RGljdCkgKVxuICAgICAgICAgICAgbGl6RGljdFsncG9wdXAubXNnLnN0YXJ0J10gPSAnQ2xpY2sgdG8gdGhlIG1hcCB0byBnZXQgaW5mb3JtYXRpb25zLic7XG4gICAgICAgICAgLy8gSW5pdGlhbGl6ZSBkb2NrXG4gICAgICAgICAgdmFyIHBvcHVwQ29udGFpbmVySWQgPSAncG9wdXBjb250ZW50JztcbiAgICAgICAgICB2YXIgcGNvbnRlbnQgPSAnPGRpdiBjbGFzcz1cImxpem1hcFBvcHVwQ29udGVudFwiPjxoND4nK2xpekRpY3RbJ3BvcHVwLm1zZy5zdGFydCddKyc8L2g0PjwvZGl2Pic7XG4gICAgICAgICAgYWRkRG9jayhwb3B1cENvbnRhaW5lcklkLCAnUG9wdXAnLCBjb25maWcub3B0aW9ucy5wb3B1cExvY2F0aW9uLCBwY29udGVudCwgJ2ljb24tY29tbWVudCcpO1xuICAgICAgICAgICQoJyNidXR0b24tcG9wdXBjb250ZW50JykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgaWYoJCh0aGlzKS5wYXJlbnQoKS5oYXNDbGFzcygnYWN0aXZlJykpIHtcbiAgICAgICAgICAgICAgICAgIC8vIGNsZWFuIGxvY2F0ZSBsYXllclxuICAgICAgICAgICAgICAgICAgdmFyIGxvY2F0ZWxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZSgnbG9jYXRlbGF5ZXInKTtcbiAgICAgICAgICAgICAgICAgIGlmICggbG9jYXRlbGF5ZXIubGVuZ3RoID09IDAgKVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgIGxvY2F0ZWxheWVyID0gbG9jYXRlbGF5ZXJbMF07XG4gICAgICAgICAgICAgICAgICBsb2NhdGVsYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgICAgICAgICAgIC8vIHJlbW92ZSBpbmZvcm1hdGlvblxuICAgICAgICAgICAgICAgICAgJCgnI3BvcHVwY29udGVudCBkaXYubWVudS1jb250ZW50JykuaHRtbCgnPGRpdiBjbGFzcz1cImxpem1hcFBvcHVwQ29udGVudFwiPjxoND4nK2xpekRpY3RbJ3BvcHVwLm1zZy5zdGFydCddKyc8L2g0PjwvZGl2PicpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgdmFyIGZpdXJsID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChcbiAgICAgICAgbGl6VXJscy53bXMsXG4gICAgICAgIE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgICApXG4gICAgICB2YXIgbGFzdExvbkxhdEluZm8gPSBudWxsO1xuICAgICAgdmFyIGluZm8gPSBuZXcgT3BlbkxheWVycy5Db250cm9sLldNU0dldEZlYXR1cmVJbmZvKHtcbiAgICAgICAgICAgIHVybDogZml1cmwsXG4gICAgICAgICAgICB0aXRsZTogJ0lkZW50aWZ5IGZlYXR1cmVzIGJ5IGNsaWNraW5nJyxcbiAgICAgICAgICAgIHR5cGU6T3BlbkxheWVycy5Db250cm9sLlRZUEVfVE9HR0xFLFxuICAgICAgICAgICAgcXVlcnlWaXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgaW5mb0Zvcm1hdDogJ3RleHQvaHRtbCcsXG4gICAgICAgICAgICB2ZW5kb3JQYXJhbXM6IGdldEZlYXR1cmVJbmZvVG9sZXJhbmNlcygpLFxuICAgICAgICAgICAgZXZlbnRMaXN0ZW5lcnM6IHtcbiAgICAgICAgICAgICAgICBnZXRmZWF0dXJlaW5mbzogZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIGV2ZW50TG9uTGF0SW5mbyA9IG1hcC5nZXRMb25MYXRGcm9tUGl4ZWwoZXZlbnQueHkpO1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGV4dCA9IGV2ZW50LnRleHQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG1hcC5wb3B1cHMubGVuZ3RoICE9IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXAucmVtb3ZlUG9wdXAobWFwLnBvcHVwc1swXSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcHVwID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBvcHVwQ29udGFpbmVySWQgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICBpZiggJ3BvcHVwTG9jYXRpb24nIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnBvcHVwTG9jYXRpb24gIT0gJ21hcCcgKXtcbiAgICAgICAgICAgICAgICAgICAgICBwb3B1cENvbnRhaW5lcklkID0gJ3BvcHVwY29udGVudCc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgY29udGVudFxuICAgICAgICAgICAgICAgICAgICAgIHZhciBwb3B1cFJlZyA9IG5ldyBSZWdFeHAoJ2xpem1hcFBvcHVwVGFibGUnLCAnZycpO1xuICAgICAgICAgICAgICAgICAgICAgIHRleHQgPSB0ZXh0LnJlcGxhY2UoIHBvcHVwUmVnLCAndGFibGUgdGFibGUtY29uZGVuc2VkIHRhYmxlLXN0cmlwZWQgdGFibGUtYm9yZGVyZWQgbGl6bWFwUG9wdXBUYWJsZScpO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBwY29udGVudCA9ICc8ZGl2IGNsYXNzPVwibGl6bWFwUG9wdXBDb250ZW50XCI+Jyt0ZXh0Kyc8L2Rpdj4nO1xuICAgICAgICAgICAgICAgICAgICAgIHZhciBoYXNQb3B1cENvbnRlbnQgPSAoISghdGV4dCB8fCB0ZXh0ID09IG51bGwgfHwgdGV4dCA9PSAnJykpO1xuICAgICAgICAgICAgICAgICAgICAgICQoJyNwb3B1cGNvbnRlbnQgZGl2Lm1lbnUtY29udGVudCcpLmh0bWwocGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmICggISQoJyNtYXBtZW51IC5uYXYtbGlzdCA+IGxpLnBvcHVwY29udGVudCcpLmlzKCc6dmlzaWJsZScpIClcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNtYXBtZW51IC5uYXYtbGlzdCA+IGxpLnBvcHVwY29udGVudCcpLnNob3coKTtcblxuICAgICAgICAgICAgICAgICAgICAgIC8vIFdhcm4gdXNlciBubyBkYXRhIGhhcyBiZWVuIGZvdW5kXG4gICAgICAgICAgICAgICAgICAgICAgaWYoICFoYXNQb3B1cENvbnRlbnQgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHBjb250ZW50ID0gJzxkaXYgY2xhc3M9XCJsaXptYXBQb3B1cENvbnRlbnRcIj48aDQ+JytsaXpEaWN0Wydwb3B1cC5tc2cubm8ucmVzdWx0J10rJzwvaDQ+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNwb3B1cGNvbnRlbnQgZGl2Lm1lbnUtY29udGVudCcpLmh0bWwocGNvbnRlbnQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoICQoJyNtYXBtZW51IC5uYXYtbGlzdCA+IGxpLnBvcHVwY29udGVudCcpLmhhc0NsYXNzKCdhY3RpdmUnKSAmJiBjb25maWcub3B0aW9ucy5wb3B1cExvY2F0aW9uICE9ICdyaWdodC1kb2NrJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2J1dHRvbi1wb3B1cGNvbnRlbnQnKS5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSwyMDAwKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAvLyBEaXNwbGF5IGRvY2sgaWYgbmVlZGVkXG4gICAgICAgICAgICAgICAgICAgICAgaWYoXG4gICAgICAgICAgICAgICAgICAgICAgICAhJCgnI21hcG1lbnUgLm5hdi1saXN0ID4gbGkucG9wdXBjb250ZW50JykuaGFzQ2xhc3MoJ2FjdGl2ZScpXG4gICAgICAgICAgICAgICAgICAgICAgICAgJiYgKCFtQ2hlY2tNb2JpbGUoKSB8fCAoIG1DaGVja01vYmlsZSgpICYmIGhhc1BvcHVwQ29udGVudCApIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAmJiAobGFzdExvbkxhdEluZm8gPT0gbnVsbCB8fCBldmVudExvbkxhdEluZm8ubG9uICE9IGxhc3RMb25MYXRJbmZvLmxvbiB8fCBldmVudExvbkxhdEluZm8ubGF0ICE9IGxhc3RMb25MYXRJbmZvLmxhdClcbiAgICAgICAgICAgICAgICAgICAgICApe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjYnV0dG9uLXBvcHVwY29udGVudCcpLmNsaWNrKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYoXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS5wb3B1cGNvbnRlbnQnKS5oYXNDbGFzcygnYWN0aXZlJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAmJiAoIG1DaGVja01vYmlsZSgpICYmIGhhc1BvcHVwQ29udGVudCApXG4gICAgICAgICAgICAgICAgICAgICAgKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJCgnI2J1dHRvbi1wb3B1cGNvbnRlbnQnKS5jbGljaygpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAvLyBSZXNpemUgbWluaWRvY2sgaWYgZGlzcGxheWVkXG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCAkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS5wb3B1cGNvbnRlbnQnKS5oYXNDbGFzcygnYWN0aXZlJykgJiYgY29uZmlnLm9wdGlvbnMucG9wdXBMb2NhdGlvbiA9PSAnbWluaWRvY2snIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlTWluaURvY2tTaXplKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNle1xuICAgICAgICAgICAgICAgICAgICAgIGlmICghdGV4dCB8fCB0ZXh0ID09IG51bGwgfHwgdGV4dCA9PSAnJylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgIC8vIFVzZSBvcGVubGF5ZXJzIG1hcCBwb3B1cCBhbmNob3JlZFxuICAgICAgICAgICAgICAgICAgICAgIHBvcHVwQ29udGFpbmVySWQgPSBcImxpel9sYXllcl9wb3B1cFwiO1xuICAgICAgICAgICAgICAgICAgICAgIHBvcHVwID0gbmV3IE9wZW5MYXllcnMuUG9wdXAuTGl6bWFwQW5jaG9yZWQoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHBvcHVwQ29udGFpbmVySWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50TG9uTGF0SW5mbyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFwLnJlbW92ZVBvcHVwKHRoaXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmKG1DaGVja01vYmlsZSgpKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoJyNuYXZiYXInKS5zaG93KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjb3ZlcnZpZXctYm94Jykuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNsZWFuIGxvY2F0ZSBsYXllclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBsb2NhdGVsYXllciA9IG1hcC5nZXRMYXllcnNCeU5hbWUoJ2xvY2F0ZWxheWVyJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCBsb2NhdGVsYXllci5sZW5ndGggPT0gMCApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhdGVsYXllciA9IGxvY2F0ZWxheWVyWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxvY2F0ZWxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgcG9wdXAucGFuTWFwSWZPdXRPZlZpZXcgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgIG1hcC5hZGRQb3B1cChwb3B1cCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICBwb3B1cC52ZXJpZnlTaXplKCk7XG4gICAgICAgICAgICAgICAgICAgICAgLy8gSGlkZSBuYXZiYXIgYW5kIG92ZXJ2aWV3IGluIG1vYmlsZSBtb2RlXG4gICAgICAgICAgICAgICAgICAgICAgaWYobUNoZWNrTW9iaWxlKCkpe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjbmF2YmFyJykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcjb3ZlcnZpZXctYm94JykuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBsYXN0TG9uTGF0SW5mbyA9IGV2ZW50TG9uTGF0SW5mbztcblxuICAgICAgICAgICAgICAgICAgICAvLyBEaXNwbGF5IHJlbGF0ZWQgY2hpbGRyZW4gb2JqZWN0c1xuICAgICAgICAgICAgICAgICAgICBhZGRDaGlsZHJlbkZlYXR1cmVJbmZvKCBwb3B1cCwgcG9wdXBDb250YWluZXJJZCApO1xuICAgICAgICAgICAgICAgICAgICAvLyBEaXNwbGF5IGdlb21ldHJpZXNcbiAgICAgICAgICAgICAgICAgICAgYWRkR2VvbWV0cnlGZWF0dXJlSW5mbyggcG9wdXAsIHBvcHVwQ29udGFpbmVySWQgKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gRGlzcGxheSB0aGUgcGxvdHMgb2YgdGhlIGNoaWxkcmVuIGxheWVycyBmZWF0dXJlcyBmaWx0ZXJlZCBieSBwb3B1cCBpdGVtXG4gICAgICAgICAgICAgICAgICAgIGFkZENoaWxkcmVuRGF0YXZpekZpbHRlcmVkQnlQb3B1cEZlYXR1cmUoIHBvcHVwLCBwb3B1cENvbnRhaW5lcklkICk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVHJpZ2dlciBldmVudFxuICAgICAgICAgICAgICAgICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudChcImxpem1hcHBvcHVwZGlzcGxheWVkXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICB7J3BvcHVwJzogcG9wdXAsICdjb250YWluZXJJZCc6IHBvcHVwQ29udGFpbmVySWR9XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICB9KTtcbiAgICAgaWYgKGxpelVybHMucHVibGljVXJsTGlzdCAmJiBsaXpVcmxzLnB1YmxpY1VybExpc3QubGVuZ3RoICE9IDAgKSB7XG4gICAgICAgIHZhciBsYXllclVybHMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaj0wLCBqbGVuPWxpelVybHMucHVibGljVXJsTGlzdC5sZW5ndGg7IGo8amxlbjsgaisrKSB7XG4gICAgICAgICAgbGF5ZXJVcmxzLnB1c2goXG4gICAgICAgICAgICBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKFxuICAgICAgICAgICAgICBsaXpVcmxzLnB1YmxpY1VybExpc3Rbal0sXG4gICAgICAgICAgICAgIE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgICAgICAgICApXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpbmZvLmxheWVyVXJscyA9IGxheWVyVXJscztcbiAgICAgfVxuICAgICBpbmZvLmZpbmRMYXllcnMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNhbmRpZGF0ZXMgPSB0aGlzLmxheWVycyB8fCB0aGlzLm1hcC5sYXllcnM7XG4gICAgICAgIHZhciBsYXllcnMgPSBbXTtcbiAgICAgICAgdmFyIG1heEZlYXR1cmVzID0gMDtcbiAgICAgICAgdmFyIGxheWVyLCB1cmw7XG4gICAgICAgIGZvcih2YXIgaT0wLCBsZW49Y2FuZGlkYXRlcy5sZW5ndGg7IGk8bGVuOyArK2kpIHtcbiAgICAgICAgICAgIGxheWVyID0gY2FuZGlkYXRlc1tpXTtcbiAgICAgICAgICAgIGlmKCAobGF5ZXIgaW5zdGFuY2VvZiBPcGVuTGF5ZXJzLkxheWVyLldNUyB8fCBsYXllciBpbnN0YW5jZW9mIE9wZW5MYXllcnMuTGF5ZXIuV01UUylcbiAgICAgICAgICAgICAmJiAoIXRoaXMucXVlcnlWaXNpYmxlIHx8IChsYXllci5nZXRWaXNpYmlsaXR5KCkgJiYgbGF5ZXIuY2FsY3VsYXRlSW5SYW5nZSgpKSkgKSB7XG4gICAgICAgICAgICAgICAgdmFyIHFnaXNOYW1lID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoIGxheWVyLm5hbWUgaW4gY2xlYW5OYW1lTWFwIClcbiAgICAgICAgICAgICAgICAgICAgcWdpc05hbWUgPSBnZXRMYXllck5hbWVCeUNsZWFuTmFtZShsYXllci5uYW1lKTtcbiAgICAgICAgICAgICAgICB2YXIgY29uZmlnTGF5ZXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICggcWdpc05hbWUgKVxuICAgICAgICAgICAgICAgICAgICBjb25maWdMYXllciA9IGNvbmZpZy5sYXllcnNbcWdpc05hbWVdO1xuICAgICAgICAgICAgICAgIGlmICggIWNvbmZpZ0xheWVyIClcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnTGF5ZXIgPSBjb25maWcubGF5ZXJzW2xheWVyLnBhcmFtc1snTEFZRVJTJ11dO1xuICAgICAgICAgICAgICAgIGlmICggIWNvbmZpZ0xheWVyIClcbiAgICAgICAgICAgICAgICAgICAgY29uZmlnTGF5ZXIgPSBjb25maWcubGF5ZXJzW2xheWVyLm5hbWVdO1xuICAgICAgICAgICAgICAgICB2YXIgZWRpdGlvbkxheWVyID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgaWYoICdlZGl0aW9uTGF5ZXJzJyBpbiBjb25maWcgKSB7XG4gICAgICAgICAgICAgICAgICAgICBlZGl0aW9uTGF5ZXIgPSBjb25maWcuZWRpdGlvbkxheWVyc1txZ2lzTmFtZV07XG4gICAgICAgICAgICAgICAgICAgICBpZiAoICFlZGl0aW9uTGF5ZXIgKVxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGlvbkxheWVyID0gY29uZmlnLmVkaXRpb25MYXllcnNbbGF5ZXIucGFyYW1zWydMQVlFUlMnXV07XG4gICAgICAgICAgICAgICAgICAgICBpZiAoICFlZGl0aW9uTGF5ZXIgKVxuICAgICAgICAgICAgICAgICAgICAgICAgZWRpdGlvbkxheWVyID0gY29uZmlnLmVkaXRpb25MYXllcnNbbGF5ZXIubmFtZV07XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgaWYoIChjb25maWdMYXllciAmJiBjb25maWdMYXllci5wb3B1cCAmJiBjb25maWdMYXllci5wb3B1cCA9PSAnVHJ1ZScpXG4gICAgICAgICAgICAgICAgICB8fCAoZWRpdGlvbkxheWVyICYmICggZWRpdGlvbkxheWVyLmNhcGFiaWxpdGllcy5tb2RpZnlHZW9tZXRyeSA9PSAnVHJ1ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBlZGl0aW9uTGF5ZXIuY2FwYWJpbGl0aWVzLm1vZGlmeUF0dHJpYnV0ZSA9PSAnVHJ1ZSdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCBlZGl0aW9uTGF5ZXIuY2FwYWJpbGl0aWVzLmRlbGV0ZUZlYXR1cmUgPT0gJ1RydWUnKSApICl7XG4gICAgICAgICAgICAgICAgICAgIHVybCA9IE9wZW5MYXllcnMuVXRpbC5pc0FycmF5KGxheWVyLnVybCkgPyBsYXllci51cmxbMF0gOiBsYXllci51cmw7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIHRoZSBjb250cm9sIHdhcyBub3QgY29uZmlndXJlZCB3aXRoIGEgdXJsLCBzZXQgaXRcbiAgICAgICAgICAgICAgICAgICAgLy8gdG8gdGhlIGZpcnN0IGxheWVyIHVybFxuICAgICAgICAgICAgICAgICAgICBpZih0aGlzLmRyaWxsRG93biA9PT0gZmFsc2UgJiYgIXRoaXMudXJsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVybCA9IHVybDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGxheWVycy5wdXNoKGxheWVyKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAncG9wdXBNYXhGZWF0dXJlcycgaW4gY29uZmlnTGF5ZXIgJiYgIWlzTmFOKHBhcnNlSW50KGNvbmZpZ0xheWVyLnBvcHVwTWF4RmVhdHVyZXMpKSApXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXhGZWF0dXJlcyArPSBwYXJzZUludChjb25maWdMYXllci5wb3B1cE1heEZlYXR1cmVzKTtcbiAgICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgICAgbWF4RmVhdHVyZXMgKz0gMTA7XG4gICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1heEZlYXR1cmVzID0gbWF4RmVhdHVyZXMgPT0gMCA/IDEwIDogbWF4RmVhdHVyZXM7XG4gICAgICAgIHJldHVybiBsYXllcnM7XG4gICAgIH07XG4gICAgIGZ1bmN0aW9uIHJlZnJlc2hHZXRGZWF0dXJlSW5mbyggZXZ0ICkge1xuICAgICAgICAgaWYgKCAhZXZ0LnVwZGF0ZURyYXdpbmcgKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICBpZiAoIGxhc3RMb25MYXRJbmZvID09IG51bGwgKVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIHZhciBsYXN0UHggPSBtYXAuZ2V0UGl4ZWxGcm9tTG9uTGF0KGxhc3RMb25MYXRJbmZvKTtcbiAgICAgICAgaWYgKCAkKCcjbGl6X2xheWVyX3BvcHVwICBkaXYubGl6bWFwUG9wdXBDb250ZW50JykubGVuZ3RoIDwgMVxuICAgICAgICAgICYmICQoJyNwb3B1cGNvbnRlbnQgZGl2Lm1lbnUtY29udGVudCBkaXYubGl6bWFwUG9wdXBDb250ZW50JykubGVuZ3RoIDwgMSlcbiAgICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB2YXIgcG9wdXBDb250YWluZXJJZCA9IFwibGl6X2xheWVyX3BvcHVwXCI7XG4gICAgICAgIGlmICggJCgnIycrcG9wdXBDb250YWluZXJJZCsnIGRpdi5saXptYXBQb3B1cENvbnRlbnQgaW5wdXQubGl6bWFwLXBvcHVwLWxheWVyLWZlYXR1cmUtaWQnKS5sZW5ndGggPT0gMCApXG4gICAgICAgICAgICBwb3B1cENvbnRhaW5lcklkID0gJ3BvcHVwY29udGVudCc7XG5cbiAgICAgICAgLy8gUmVmcmVzaCBpZiBuZWVkZWRcbiAgICAgICAgdmFyIHJlZnJlc2hJbmZvID0gZmFsc2U7XG4gICAgICAgICQoJyMnK3BvcHVwQ29udGFpbmVySWQrJyBkaXYubGl6bWFwUG9wdXBDb250ZW50IGlucHV0Lmxpem1hcC1wb3B1cC1sYXllci1mZWF0dXJlLWlkJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgdmFyIHZhbCA9IHNlbGYudmFsKCk7XG4gICAgICAgICAgICB2YXIgZUh0bWwgPSAnJztcbiAgICAgICAgICAgIHZhciBmaWQgPSB2YWwuc3BsaXQoJy4nKS5wb3AoKTtcbiAgICAgICAgICAgIHZhciBsYXllcklkID0gdmFsLnJlcGxhY2UoICcuJyArIGZpZCwgJycgKTtcbiAgICAgICAgICAgIHZhciBhQ29uZmlnID0gbGl6TWFwLmdldExheWVyQ29uZmlnQnlJZCggbGF5ZXJJZCApO1xuICAgICAgICAgICAgaWYgKCBhQ29uZmlnICYmIGFDb25maWdbMF0gPT0gZXZ0LmZlYXR1cmVUeXBlICkge1xuICAgICAgICAgICAgICAgIHJlZnJlc2hJbmZvID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIHJlZnJlc2hJbmZvICApIHtcbiAgICAgICAgICAgIC8vbGFzdExvbkxhdEluZm8gPSBudWxsO1xuICAgICAgICAgICAgJCgnIycrcG9wdXBDb250YWluZXJJZCsnIGRpdi5saXptYXBQb3B1cENvbnRlbnQgaW5wdXQubGl6bWFwLXBvcHVwLWxheWVyLWZlYXR1cmUtaWRbdmFsdWU9XCInK2V2dC5sYXllcklkKycuJytldnQuZmVhdHVyZUlkKydcIl0nKS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIGluZm8ucmVxdWVzdCggbGFzdFB4LCB7fSApO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybjtcbiAgICAgfVxuICAgICBsaXpNYXAuZXZlbnRzLm9uKHtcbiAgICAgICAgXCJsYXllckZpbHRlclBhcmFtQ2hhbmdlZFwiOiBmdW5jdGlvbiggZXZ0ICkge1xuICAgICAgICAgICAgdmFyIGZpbHRlciA9IFtdO1xuICAgICAgICAgICAgZm9yICggdmFyICBsTmFtZSBpbiBjb25maWcubGF5ZXJzICkge1xuICAgICAgICAgICAgICAgIHZhciBsQ29uZmlnID0gY29uZmlnLmxheWVyc1tsTmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKCBsQ29uZmlnLnBvcHVwICE9ICdUcnVlJyApXG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIGlmICggISgncmVxdWVzdF9wYXJhbXMnIGluIGxDb25maWcpXG4gICAgICAgICAgICAgICAgICB8fCBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddID09IG51bGwgKVxuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB2YXIgcmVxdWVzdFBhcmFtcyA9IGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ107XG4gICAgICAgICAgICAgICAgaWYgKCAoJ2ZpbHRlcicgaW4gbENvbmZpZ1sncmVxdWVzdF9wYXJhbXMnXSlcbiAgICAgICAgICAgICAgICAgICYmIGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ11bJ2ZpbHRlciddICE9IG51bGxcbiAgICAgICAgICAgICAgICAgICYmIGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ11bJ2ZpbHRlciddICE9IFwiXCIgKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gR2V0IGZpbHRlciB0b2tlblxuICAgICAgICAgICAgICAgICAgICB2YXIgc3VybCA9IE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQobGl6VXJscy53bXNcbiAgICAgICAgICAgICAgICAgICAgICAgICxPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVyU3RyaW5nKGxpelVybHMucGFyYW1zKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB2YXIgc2RhdGEgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXJ2aWNlOiAnV01TJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlcXVlc3Q6ICdHRVRGSUxURVJUT0tFTicsXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlbmFtZTogbE5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXI6IGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ11bJ2ZpbHRlciddXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICQucG9zdChzdXJsLCBzZGF0YSwgZnVuY3Rpb24ocmVzdWx0KXtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlci5wdXNoKHJlc3VsdC50b2tlbik7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvLnZlbmRvclBhcmFtc1snZmlsdGVydG9rZW4nXSA9IGZpbHRlci5qb2luKCc7Jyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBpbmZvLnZlbmRvclBhcmFtc1snZmlsdGVyJ10gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaEdldEZlYXR1cmVJbmZvKGV2dCk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1lbHNle1xuICAgICAgICAgICAgICAgICAgICAgIGluZm8udmVuZG9yUGFyYW1zWydmaWx0ZXJ0b2tlbiddID0gcmVxdWVzdFBhcmFtc1snZmlsdGVydG9rZW4nXTtcbiAgICAgICAgICAgICAgICAgICAgICBpbmZvLnZlbmRvclBhcmFtc1snZmlsdGVyJ10gPSByZXF1ZXN0UGFyYW1zWydmaWx0ZXInXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIFwibGF5ZXJTZWxlY3Rpb25DaGFuZ2VkXCI6IGZ1bmN0aW9uKCBldnQgKSB7XG4gICAgICAgICAgICByZWZyZXNoR2V0RmVhdHVyZUluZm8oZXZ0KTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJsaXptYXBlZGl0aW9uZmVhdHVyZWRlbGV0ZWRcIjogZnVuY3Rpb24oIGV2dCApIHtcbiAgICAgICAgICAgIGlmICggJCgnZGl2Lmxpem1hcFBvcHVwQ29udGVudCBpbnB1dC5saXptYXAtcG9wdXAtbGF5ZXItZmVhdHVyZS1pZCcpLmxlbmd0aCA+IDEgKSB7XG4gICAgICAgICAgICAgICAgcmVmcmVzaEdldEZlYXR1cmVJbmZvKGV2dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChtYXAucG9wdXBzLmxlbmd0aCAhPSAwKVxuICAgICAgICAgICAgICAgICAgICBtYXAucmVtb3ZlUG9wdXAobWFwLnBvcHVwc1swXSk7XG5cbiAgICAgICAgICAgICAgICBpZiggJ3BvcHVwTG9jYXRpb24nIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnBvcHVwTG9jYXRpb24gIT0gJ21hcCcgKXtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHBjb250ZW50ID0gJzxkaXYgY2xhc3M9XCJsaXptYXBQb3B1cENvbnRlbnRcIj48aDQ+JytsaXpEaWN0Wydwb3B1cC5tc2cubm8ucmVzdWx0J10rJzwvaDQ+PC9kaXY+JztcbiAgICAgICAgICAgICAgICAgICAgJCgnI3BvcHVwY29udGVudCBkaXYubWVudS1jb250ZW50JykuaHRtbChwY29udGVudCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICggJCgnI21hcG1lbnUgLm5hdi1saXN0ID4gbGkucG9wdXBjb250ZW50JykuaGFzQ2xhc3MoJ2FjdGl2ZScpIClcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNidXR0b24tcG9wdXBjb250ZW50JykuY2xpY2soKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCAhJCgnI21hcG1lbnUgLm5hdi1saXN0ID4gbGkucG9wdXBjb250ZW50JykuaGFzQ2xhc3MoJ2FjdGl2ZScpIClcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJyNtYXBtZW51IC5uYXYtbGlzdCA+IGxpLnBvcHVwY29udGVudCcpLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgfSk7XG4gICAgIG1hcC5hZGRDb250cm9sKGluZm8pO1xuICAgICBpbmZvLmFjdGl2YXRlKCk7XG4gICAgIHJldHVybiBpbmZvO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0UHJpbnRTY2FsZSggYVNjYWxlcyApIHtcbiAgICAgIHZhciBuZXdTY2FsZXMgPSBbXTtcbiAgICAgIGZvciAoIHZhciBpPTAsIGxlbiA9IGFTY2FsZXMubGVuZ3RoOyBpPGxlbjsgaSsrICkge1xuICAgICAgICAgIG5ld1NjYWxlcy5wdXNoKCBwYXJzZUZsb2F0KGFTY2FsZXNbaV0pICk7XG4gICAgICB9XG4gICAgICBuZXdTY2FsZXMuc29ydChmdW5jdGlvbihhLGIpe3JldHVybiBiLWE7fSk7XG4gICAgdmFyIHNjYWxlID0gbWFwLmdldFNjYWxlKCk7XG4gIHZhciBzY2FsZUlkeCA9ICQuaW5BcnJheSggc2NhbGUsIG5ld1NjYWxlcyApO1xuICAgIGlmICggc2NhbGVJZHggPT0gLTEgKSB7XG4gICAgdmFyIHM9MCwgc2xlbj1uZXdTY2FsZXMubGVuZ3RoO1xuICAgIHdoaWxlICggc2NhbGVJZHggPT0gLTEgJiYgczxzbGVuICkge1xuICAgICAgaWYgKCBzY2FsZSA+IG5ld1NjYWxlc1tzXSApXG4gICAgICAgIHNjYWxlSWR4ID0gcztcbiAgICAgIGVsc2VcbiAgICAgICBzKys7XG4gICAgfVxuICAgIGlmKCBzID09IHNsZW4gKSB7XG4gICAgICBzY2FsZSA9IG5ld1NjYWxlc1tzbGVuLTFdO1xuICAgIH0gZWxzZSB7XG4gICAgICBzY2FsZSA9IG5ld1NjYWxlc1tzY2FsZUlkeF07XG4gICAgfVxuICAgIH1cbiAgICByZXR1cm4gc2NhbGU7XG4gIH1cblxuICBmdW5jdGlvbiBkcmF3UHJpbnRCb3goIGFMYXlvdXQsIGFMYXllciwgYVNjYWxlICkge1xuICAgIHZhciBzaXplID0gYUxheW91dC5zaXplO1xuICAgIHZhciB1bml0cyA9IG1hcC5nZXRVbml0cygpO1xuICAgIHZhciB1bml0c1JhdGlvID0gT3BlbkxheWVycy5JTkNIRVNfUEVSX1VOSVRbdW5pdHNdO1xuICAgIHZhciB3ID0gc2l6ZS53aWR0aCAvIDcyIC8gdW5pdHNSYXRpbyAqIGFTY2FsZSAvIDI7XG4gICAgdmFyIGggPSBzaXplLmhlaWdodCAvIDcyIC8gdW5pdHNSYXRpbyAqIGFTY2FsZSAvIDI7XG4gICAgaWYgKCBhTGF5ZXIuZmVhdHVyZXMubGVuZ3RoID09IDAgKSB7XG4gICAgICAgIHZhciBjZW50ZXIgPSBtYXAuZ2V0Q2VudGVyKCk7XG4gICAgICAgIHZhciBib3VuZHMgPSBuZXcgT3BlbkxheWVycy5Cb3VuZHMoY2VudGVyLmxvbiAtIHcsIGNlbnRlci5sYXQgLSBoLFxuICAgICAgICAgICAgY2VudGVyLmxvbiArIHcsIGNlbnRlci5sYXQgKyBoKTtcbiAgICAgICAgdmFyIGdlb20gPSBib3VuZHMudG9HZW9tZXRyeSgpO1xuICAgICAgICBhTGF5ZXIuYWRkRmVhdHVyZXMoW1xuICAgICAgICAgICAgbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IoIGdlb20gKVxuICAgICAgICBdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgZmVhdCA9IGFMYXllci5mZWF0dXJlc1swXTtcbiAgICAgICAgdmFyIGNlbnRlciA9IGZlYXQuZ2VvbWV0cnkuZ2V0Qm91bmRzKCkuZ2V0Q2VudGVyTG9uTGF0KCk7XG4gICAgICAgIHZhciBib3VuZHMgPSBuZXcgT3BlbkxheWVycy5Cb3VuZHMoY2VudGVyLmxvbiAtIHcsIGNlbnRlci5sYXQgLSBoLFxuICAgICAgICAgICAgY2VudGVyLmxvbiArIHcsIGNlbnRlci5sYXQgKyBoKTtcbiAgICAgICAgdmFyIGdlb20gPSBib3VuZHMudG9HZW9tZXRyeSgpO1xuICAgICAgICBnZW9tLmlkID0gZmVhdC5nZW9tZXRyeS5pZDtcbiAgICAgICAgZmVhdC5nZW9tZXRyeSA9IGdlb207XG4gICAgICAgIGFMYXllci5kcmF3RmVhdHVyZShmZWF0KTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRQcmludEdyaWRJbnRlcnZhbCggYUxheW91dCwgYVNjYWxlLCBhU2NhbGVzICkge1xuICAgIHZhciBzaXplID0gYUxheW91dC5zaXplO1xuICAgIHZhciB1bml0cyA9IG1hcC5nZXRVbml0cygpO1xuICAgIHZhciB1bml0c1JhdGlvID0gT3BlbkxheWVycy5JTkNIRVNfUEVSX1VOSVRbdW5pdHNdO1xuICAgIHZhciB3ID0gc2l6ZS53aWR0aCAvIDcyIC8gdW5pdHNSYXRpbyAqIGFTY2FsZTtcbiAgICB2YXIgaCA9IHNpemUuaGVpZ2h0IC8gNzIgLyB1bml0c1JhdGlvICogYVNjYWxlO1xuXG4gICAgICB2YXIgcmVmU2NhbGUgPSB3ID4gaCA/IHcgOiBoO1xuICAgICAgdmFyIG5ld1NjYWxlcyA9IFtdO1xuICAgICAgZm9yICggdmFyIGk9MCwgbGVuID0gYVNjYWxlcy5sZW5ndGg7IGk8bGVuOyBpKysgKSB7XG4gICAgICAgICAgbmV3U2NhbGVzLnB1c2goIHBhcnNlRmxvYXQoYVNjYWxlc1tpXSkgKTtcbiAgICAgIH1cbiAgICAgIG5ld1NjYWxlcy5zb3J0KGZ1bmN0aW9uKGEsYil7cmV0dXJuIGItYTt9KTtcbiAgICAgIHZhciB0aGVTY2FsZSA9IG5ld1NjYWxlc1swXTtcbiAgICAgIGZvciAoIHZhciBpPTAsIGxlbj1uZXdTY2FsZXMubGVuZ3RoOyBpPGxlbjsgaSsrICkge1xuICAgICAgICAgIHZhciBzID0gbmV3U2NhbGVzW2ldO1xuICAgICAgICAgIGlmICggcyA+IHJlZlNjYWxlIClcbiAgICAgICAgICAgIHRoZVNjYWxlID0gcztcbiAgICAgICAgICBpZiAoIHMgPCByZWZTY2FsZSApXG4gICAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGVTY2FsZS8xMDtcbiAgfVxuICBmdW5jdGlvbiBhZGRQcmludENvbnRyb2woKSB7XG4gICAgaWYgKCAhY29uZmlnWydwcmludFRlbXBsYXRlcyddIHx8IGNvbmZpZy5wcmludFRlbXBsYXRlcy5sZW5ndGggPT0gMCApIHtcbiAgICAgICQoJyNidXR0b24tcHJpbnQnKS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBGaWx0ZXJpbmcgcHJpbnQgdGVtcGxhdGVzIGJ5IHJlbW92aW5nIGF0bGFzIG9uZXNcbiAgICB2YXIgcFRlbXBsYXRlcyA9IFtdO1xuICAgIGZvciggdmFyIGk9MCwgbGVuPWNvbmZpZy5wcmludFRlbXBsYXRlcy5sZW5ndGg7IGk8bGVuOyBpKysgKXtcbiAgICAgICAgdmFyIHBUZW1wbGF0ZSA9IGNvbmZpZy5wcmludFRlbXBsYXRlc1tpXTtcbiAgICAgICAgaWYoJ2F0bGFzJyBpbiBwVGVtcGxhdGVcbiAgICAgICAgICAmJiAnZW5hYmxlZCcgaW4gcFRlbXBsYXRlLmF0bGFzXG4gICAgICAgICAgJiYgKHBUZW1wbGF0ZS5hdGxhcy5lbmFibGVkID09PSAnMScgfHwgcFRlbXBsYXRlLmF0bGFzLmVuYWJsZWQgPT09ICd0cnVlJykpXG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgcFRlbXBsYXRlcy5wdXNoKHBUZW1wbGF0ZSk7XG4gICAgfVxuICAgIC8vIHJlbW92ZSBwcmludCB0b29sIGlmIG9ubHkgYXRsYXMgcHJpbnQgY29uZmlndXJlZFxuICAgIGlmICggcFRlbXBsYXRlcy5sZW5ndGggPT0gMCApIHtcbiAgICAgICQoJyNidXR0b24tcHJpbnQnKS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgcHRUb21tID0gMC4zNTI3NzsgLy9jb252ZXJzaW9uIHB0IHRvIG1tXG5cbiAgICB2YXIgc2NhbGVzID0gbWFwLnNjYWxlcztcbiAgICBpZiAoIGNvbmZpZy5vcHRpb25zLm1hcFNjYWxlcy5sZW5ndGggPiAyIClcbiAgICAgIHNjYWxlcyA9IGNvbmZpZy5vcHRpb25zLm1hcFNjYWxlcztcbiAgICBpZiAoIHNjYWxlcyA9PSBudWxsICYmIG1hcC5yZXNvbHV0aW9ucyAhPSBudWxsICkge1xuICAgICAgc2NhbGVzID0gW107XG4gICAgICBmb3IoIHZhciBpPTAsIGxlbj1tYXAucmVzb2x1dGlvbnMubGVuZ3RoOyBpPGxlbjsgaSsrICl7XG4gICAgICAgIHZhciB1bml0cyA9IG1hcC5nZXRVbml0cygpO1xuICAgICAgICB2YXIgcmVzID0gbWFwLnJlc29sdXRpb25zW2ldO1xuICAgICAgICB2YXIgc2NhbGUgPSBPcGVuTGF5ZXJzLlV0aWwuZ2V0U2NhbGVGcm9tUmVzb2x1dGlvbihyZXMsIHVuaXRzKTtcbiAgICAgICAgc2NhbGVzLnB1c2goc2NhbGUpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoIHNjYWxlcyA9PSBudWxsICkge1xuICAgICAgJCgnI2J1dHRvbi1wcmludCcpLnBhcmVudCgpLnJlbW92ZSgpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoIHNjYWxlc1swXSA8IHNjYWxlc1tzY2FsZXMubGVuZ3RoLTFdIClcbiAgICAgIHNjYWxlcy5yZXZlcnNlKCk7XG5cbiAgICB2YXIgc2NhbGVPcHRpb25zID0gJyc7XG4gICAgZm9yKCB2YXIgaT0wLCBsZW49c2NhbGVzLmxlbmd0aDsgaTxsZW47IGkrKyApe1xuICAgICAgICB2YXIgc2NhbGUgPSBzY2FsZXNbaV07XG4gICAgICAgIHByaW50Q2FwYWJpbGl0aWVzLnNjYWxlcy5wdXNoKHNjYWxlKTtcbiAgICAgICAgdmFyIHNjYWxlVGV4dCA9IHNjYWxlO1xuICAgICAgICBpZiAoc2NhbGVUZXh0ID4gMTApXG4gICAgICAgICAgICBzY2FsZVRleHQgPSBNYXRoLnJvdW5kKHNjYWxlVGV4dClcbiAgICAgICAgZWxzZVxuICAgICAgICAgICAgc2NhbGVUZXh0ID0gTWF0aC5yb3VuZChzY2FsZVRleHQqMTAwKS8xMDBcbiAgICAgICAgc2NhbGVUZXh0ID0gc2NhbGVUZXh0LnRvTG9jYWxlU3RyaW5nKClcbiAgICAgICAgc2NhbGVPcHRpb25zICs9ICc8b3B0aW9uIHZhbHVlPVwiJytzY2FsZSsnXCI+JytzY2FsZVRleHQrJzwvb3B0aW9uPic7XG4gICAgfVxuICAgICQoJyNwcmludC1zY2FsZScpLmh0bWwoc2NhbGVPcHRpb25zKTtcblxuICAgIC8vIGNyZWF0aW5nIHByaW50Q2FwYWJpbGl0aWVzIGxheW91dHNcbiAgICBmb3IoIHZhciBpPTAsIGxlbj1wVGVtcGxhdGVzLmxlbmd0aDsgaTxsZW47IGkrKyApe1xuICAgICAgdmFyIHBUZW1wbGF0ZSA9IHBUZW1wbGF0ZXNbaV07XG4gICAgICB2YXIgcE1hcCA9IG51bGw7XG4gICAgICB2YXIgcE1hcElkeCA9IDA7XG4gICAgICB2YXIgcE92ZXJ2aWV3ID0gbnVsbDtcbiAgICAgIHdoaWxlKCBwTWFwID09IG51bGwgJiYgcE1hcElkeCA8IHBUZW1wbGF0ZS5tYXBzLmxlbmd0aCkge1xuICAgICAgICBwTWFwID0gcFRlbXBsYXRlLm1hcHNbcE1hcElkeF07XG4gICAgICAgIGlmKCBwTWFwWydvdmVydmlld01hcCddICkge1xuICAgICAgICAgIHBPdmVydmlldyA9IHBUZW1wbGF0ZS5tYXBzW3BNYXBJZHhdO1xuICAgICAgICAgIHBNYXAgPSBudWxsO1xuICAgICAgICAgIHBNYXBJZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCBwTWFwID09IG51bGwgKVxuICAgICAgICBjb250aW51ZTtcbiAgICAgIHZhciBtYXBXaWR0aCA9IE51bWJlcihwTWFwLndpZHRoKSAvIHB0VG9tbTtcbiAgICAgIHZhciBtYXBIZWlnaHQgPSBOdW1iZXIocE1hcC5oZWlnaHQpIC8gcHRUb21tO1xuICAgICAgLy9mb3Igc29tZSBzdHJhbmdlIHJlYXNvbiB3ZSBuZWVkIHRvIHByb3ZpZGUgYSBcIm1hcFwiIGFuZCBhIFwic2l6ZVwiIG9iamVjdCB3aXRoIGlkZW50aWNhbCBjb250ZW50XG4gICAgICBwcmludENhcGFiaWxpdGllcy5sYXlvdXRzLnB1c2goe1xuICAgICAgICBcIm5hbWVcIjogcFRlbXBsYXRlLnRpdGxlLFxuICAgICAgICBcIm1hcFwiOiB7XG4gICAgICAgICAgXCJ3aWR0aFwiOiBtYXBXaWR0aCxcbiAgICAgICAgICBcImhlaWdodFwiOiBtYXBIZWlnaHRcbiAgICAgICAgfSxcbiAgICAgICAgXCJzaXplXCI6IHtcbiAgICAgICAgICBcIndpZHRoXCI6IG1hcFdpZHRoLFxuICAgICAgICAgIFwiaGVpZ2h0XCI6IG1hcEhlaWdodFxuICAgICAgICB9LFxuICAgICAgICBcInJvdGF0aW9uXCI6IGZhbHNlLFxuICAgICAgICBcInRlbXBsYXRlXCI6IHBUZW1wbGF0ZSxcbiAgICAgICAgXCJtYXBJZFwiOiBwTWFwLmlkLFxuICAgICAgICBcIm92ZXJ2aWV3SWRcIjogcE92ZXJ2aWV3ICE9IG51bGwgPyBwT3ZlcnZpZXcuaWQgOiBudWxsLFxuICAgICAgICBcImdyaWRcIjogKCgnZ3JpZCcgaW4gcE1hcCkgJiYgcE1hcC5ncmlkID09IFwiVHJ1ZVwiKVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gaWYgbm8gcHJpbnRDYXBhYmlsaXRpZXMgbGF5b3V0cyByZW1vdmVkIHByaW50XG4gICAgaWYoIHByaW50Q2FwYWJpbGl0aWVzLmxheW91dHMubGVuZ3RoID09IDAgKSB7XG4gICAgICAkKCcjYnV0dG9uLXByaW50JykucGFyZW50KCkucmVtb3ZlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gY3JlYXRpbmcgdGhlIHByaW50IGxheWVyXG4gICAgdmFyIGxheWVyID0gbWFwLmdldExheWVyc0J5TmFtZSgnUHJpbnQnKTtcbiAgICBpZiAoIGxheWVyLmxlbmd0aCA9PSAwICkge1xuICAgICAgbGF5ZXIgPSBuZXcgT3BlbkxheWVycy5MYXllci5WZWN0b3IoJ1ByaW50Jyx7XG4gICAgICAgIHN0eWxlTWFwOiBuZXcgT3BlbkxheWVycy5TdHlsZU1hcCh7XG4gICAgICAgICAgXCJkZWZhdWx0XCI6IG5ldyBPcGVuTGF5ZXJzLlN0eWxlKHtcbiAgICAgICAgICAgIGZpbGxDb2xvcjogXCIjRDQzQjE5XCIsXG4gICAgICAgICAgICBmaWxsT3BhY2l0eTogMC4yLFxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiI0NFMUYyRFwiLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDFcbiAgICAgICAgICB9KVxuICAgICAgICB9KVxuICAgICAgfSk7XG4gICAgICBtYXAuYWRkTGF5ZXIobGF5ZXIpO1xuICAgICAgbGF5ZXIuc2V0VmlzaWJpbGl0eShmYWxzZSk7XG4gICAgfSBlbHNlXG4gICAgICBsYXllciA9IGxheWVyWzBdO1xuXG4gICAgLy8gY3JlYXRpbmcgcHJpbnQgbWVudVxuICAgIGZvciggdmFyIGk9MCwgbGVuPSBwcmludENhcGFiaWxpdGllcy5sYXlvdXRzLmxlbmd0aDsgaTxsZW47IGkrKyApe1xuICAgICAgdmFyIGxheW91dCA9IHByaW50Q2FwYWJpbGl0aWVzLmxheW91dHNbaV07XG4gICAgICAkKCcjcHJpbnQtdGVtcGxhdGUnKS5hcHBlbmQoJzxvcHRpb24gdmFsdWU9XCInK2krJ1wiPicrbGF5b3V0Lm5hbWUrJzwvb3B0aW9uPicpO1xuICAgIH1cblxuICAgIHZhciBkcmFnQ3RybCA9IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuRHJhZ0ZlYXR1cmUobGF5ZXIse1xuICAgICAgZ2VvbWV0cnlUeXBlczogWydPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvbHlnb24nXSxcbiAgICAgIHR5cGU6T3BlbkxheWVycy5Db250cm9sLlRZUEVfVE9PTCxcbiAgICAgIGxheW91dDogbnVsbCxcbiAgICAgIGV2ZW50TGlzdGVuZXJzOiB7XG4gICAgICAgIFwiYWN0aXZhdGVcIjogZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgaWYgKHRoaXMubGF5b3V0ID09IG51bGwpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgICBkZWFjdGl2YXRlVG9vbENvbnRyb2xzKGV2dCk7XG5cbiAgICAgICAgICB2YXIgbGF5b3V0ID0gdGhpcy5sYXlvdXQ7XG4gICAgICAgICAgLy8gZ2V0IHByaW50IHNjYWxlXG4gICAgICAgICAgdmFyIHNjYWxlID0gZ2V0UHJpbnRTY2FsZSggcHJpbnRDYXBhYmlsaXRpZXMuc2NhbGVzICk7XG4gICAgICAgICAgLy8gdXBkYXRlIHRoZSBzZWxlY3RcbiAgICAgICAgICAkKCcjcHJpbnQtc2NhbGUnKS52YWwoc2NhbGUpO1xuICAgICAgICAgIC8vIGRyYXcgcHJpbnQgYm94XG4gICAgICAgICAgZHJhd1ByaW50Qm94KCBsYXlvdXQsIGxheWVyLCBzY2FsZSApO1xuXG4gICAgICAgICAgbUFkZE1lc3NhZ2UobGl6RGljdFsncHJpbnQuYWN0aXZhdGUnXSwnaW5mbycsdHJ1ZSkuYWRkQ2xhc3MoJ3ByaW50Jyk7XG4gICAgICAgICAgbGF5ZXIuc2V0VmlzaWJpbGl0eSh0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgICAgXCJkZWFjdGl2YXRlXCI6IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAgIGxheWVyLnNldFZpc2liaWxpdHkoZmFsc2UpO1xuICAgICAgICAgICQoJyNtZXNzYWdlIC5wcmludCcpLnJlbW92ZSgpO1xuICAgICAgICAgIHRoaXMubGF5b3V0ID0gbnVsbDtcbiAgICAgICAgICBsYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIG1hcC5hZGRDb250cm9scyhbZHJhZ0N0cmxdKTtcbiAgICBjb250cm9sc1sncHJpbnREcmFnJ10gPSBkcmFnQ3RybDtcblxuICAgIC8vIHNldCBldmVudCBsaXN0ZW5lciB0byBidXR0b24tcHJpbnRcbiAgICAkKCcjcHJpbnQtdGVtcGxhdGUnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICB2YXIgbGF5b3V0ID0gcHJpbnRDYXBhYmlsaXRpZXMubGF5b3V0c1twYXJzZUludCggc2VsZi52YWwoKSApXTtcbiAgICAgIGlmICggbGF5b3V0LnRlbXBsYXRlLmxhYmVscy5sZW5ndGggIT0gMCApIHtcbiAgICAgICAgdmFyIGxhYmVscyA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpPTAsIGxlbj1sYXlvdXQudGVtcGxhdGUubGFiZWxzLmxlbmd0aDsgaTxsZW47IGkrKyl7XG4gICAgICAgICAgdmFyIHRMYWJlbCA9IGxheW91dC50ZW1wbGF0ZS5sYWJlbHNbaV07XG4gICAgICAgICAgdmFyIGxhYmVsID0gJyc7XG4gICAgICAgICAgaWYgKHRMYWJlbC5odG1sU3RhdGUgPT0gMCkge1xuICAgICAgICAgICAgbGFiZWwgPSAnPGlucHV0IHR5cGU9XCJ0ZXh0XCIgbmFtZT1cIicrdExhYmVsLmlkKydcIiBjbGFzcz1cInByaW50LWxhYmVsXCIgcGxhY2Vob2xkZXI9XCInK3RMYWJlbC50ZXh0KydcIiB2YWx1ZT1cIicrdExhYmVsLnRleHQrJ1wiPjxicj4nXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxhYmVsID0gJzx0ZXh0YXJlYSBuYW1lPVwiJyt0TGFiZWwuaWQrJ1wiIGNsYXNzPVwicHJpbnQtbGFiZWxcIiBwbGFjZWhvbGRlcj1cIicrdExhYmVsLnRleHQrJ1wiPicrdExhYmVsLnRleHQrJzwvdGV4dGFyZWE+PGJyPidcbiAgICAgICAgICB9XG4gICAgICAgICAgbGFiZWxzICs9IGxhYmVsO1xuICAgICAgICB9XG4gICAgICAgICQoJyNwcmludCAucHJpbnQtbGFiZWxzJykuaHRtbChsYWJlbHMpO1xuICAgICAgICAkKCcjcHJpbnQgLnByaW50LWxhYmVscycpLnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJyNwcmludCAucHJpbnQtbGFiZWxzJykuaHRtbCgnJyk7XG4gICAgICAgICQoJyNwcmludCAucHJpbnQtbGFiZWxzJykuaGlkZSgpO1xuICAgICAgfVxuICAgICAgdXBkYXRlTWluaURvY2tTaXplKCk7XG4gICAgICBpZiAoZHJhZ0N0cmwuYWN0aXZlKSB7XG4gICAgICAgIGRyYWdDdHJsLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgZHJhZ0N0cmwubGF5b3V0ID0gbGF5b3V0O1xuICAgICAgICBkcmFnQ3RybC5hY3RpdmF0ZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZHJhZ0N0cmwubGF5b3V0ID0gbGF5b3V0O1xuICAgICAgICBkcmFnQ3RybC5hY3RpdmF0ZSgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuXG4gICAgJCgnI3ByaW50IGJ1dHRvbi5idG4tcHJpbnQtY2xlYXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICQoJyNidXR0b24tcHJpbnQnKS5jbGljaygpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNwcmludC1zY2FsZScpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgIGlmICggZHJhZ0N0cmwuYWN0aXZlICYmIGxheWVyLmdldFZpc2liaWxpdHkoKSApIHtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgc2NhbGUgPSBwYXJzZUZsb2F0KHNlbGYudmFsKCkpO1xuICAgICAgICAvLyBkcmF3IHByaW50IGJveFxuICAgICAgICBkcmF3UHJpbnRCb3goIGRyYWdDdHJsLmxheW91dCwgbGF5ZXIsIHNjYWxlICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgJCgnI3ByaW50LWxhdW5jaCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHBUZW1wbGF0ZSA9IGRyYWdDdHJsLmxheW91dC50ZW1wbGF0ZTtcbiAgICAgIHZhciBwVGFibGVWZWN0b3JMYXllcnMgPSBbXTtcbiAgICAgIGlmKCAndGFibGVzJyBpbiBwVGVtcGxhdGUgKVxuICAgICAgICAgIHBUYWJsZVZlY3RvckxheWVycyA9ICQubWFwKCBwVGVtcGxhdGUudGFibGVzLCBmdW5jdGlvbiggdCApe1xuICAgICAgICAgICAgICBpZiggdC5jb21wb3Nlck1hcCA9PSAtMSB8fCAoJ21hcCcrdC5jb21wb3Nlck1hcCkgPT0gZHJhZ0N0cmwubGF5b3V0Lm1hcElkIClcbiAgICAgICAgICAgICAgICByZXR1cm4gdC52ZWN0b3JMYXllcjtcbiAgICAgICAgICB9KTtcbiAgICAgIC8vIFByaW50IEV4dGVudFxuICAgICAgdmFyIGV4dGVudCA9IGRyYWdDdHJsLmxheWVyLmZlYXR1cmVzWzBdLmdlb21ldHJ5LmdldEJvdW5kcygpO1xuXG4gICAgICAvLyBQcm9qZWN0aW9uIGNvZGUgYW5kIHJldmVyc2VBeGlzT3JkZXJcbiAgICAgIHZhciBwcm9qQ29kZSA9IG1hcC5wcm9qZWN0aW9uLmdldENvZGUoKTtcbiAgICAgIHZhciByZXZlcnNlQXhpc09yZGVyID0gKE9wZW5MYXllcnMuUHJvamVjdGlvbi5kZWZhdWx0c1twcm9qQ29kZV0gJiYgT3BlbkxheWVycy5Qcm9qZWN0aW9uLmRlZmF1bHRzW3Byb2pDb2RlXS55eCk7XG5cbiAgICAgIC8vIEJ1aWxkIFVSTFxuICAgICAgdmFyIHVybCA9IE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQobGl6VXJscy53bXNcbiAgICAgICAgICAsT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICAgICAgICApO1xuICAgICAgdXJsICs9ICcmU0VSVklDRT1XTVMnO1xuICAgICAgdXJsICs9ICcmVkVSU0lPTj0xLjMuMCZSRVFVRVNUPUdldFByaW50JztcbiAgICAgIHVybCArPSAnJkZPUk1BVD0nKyQoJyNwcmludC1mb3JtYXQnKS52YWwoKTtcbiAgICAgIHVybCArPSAnJkVYQ0VQVElPTlM9YXBwbGljYXRpb24vdm5kLm9nYy5zZV9pbmltYWdlJlRSQU5TUEFSRU5UPXRydWUnO1xuICAgICAgdXJsICs9ICcmU1JTPScrcHJvakNvZGU7XG4gICAgICB1cmwgKz0gJyZEUEk9JyskKCcjcHJpbnQtZHBpJykudmFsKCk7XG4gICAgICB1cmwgKz0gJyZURU1QTEFURT0nK3BUZW1wbGF0ZS50aXRsZTtcbiAgICAgIHVybCArPSAnJicrZHJhZ0N0cmwubGF5b3V0Lm1hcElkKyc6ZXh0ZW50PScrZXh0ZW50LnRvQkJPWChudWxsLCByZXZlcnNlQXhpc09yZGVyKTtcbiAgICAgIHZhciBzY2FsZSA9ICQoJyNwcmludC1zY2FsZScpLnZhbCgpO1xuICAgICAgdXJsICs9ICcmJytkcmFnQ3RybC5sYXlvdXQubWFwSWQrJzpzY2FsZT0nK3NjYWxlO1xuICAgICAgaWYgKCAnZ3JpZCcgaW4gZHJhZ0N0cmwubGF5b3V0ICYmIGRyYWdDdHJsLmxheW91dC5ncmlkICkge1xuICAgICAgICAgIHZhciBncmlkSW50ZXJ2YWwgPSBnZXRQcmludEdyaWRJbnRlcnZhbCggZHJhZ0N0cmwubGF5b3V0LCBwYXJzZUZsb2F0KHNjYWxlKSwgcHJpbnRDYXBhYmlsaXRpZXMuc2NhbGVzICk7XG4gICAgICAgICAgdXJsICs9ICcmJytkcmFnQ3RybC5sYXlvdXQubWFwSWQrJzpncmlkX2ludGVydmFsX3g9JytncmlkSW50ZXJ2YWw7XG4gICAgICAgICAgdXJsICs9ICcmJytkcmFnQ3RybC5sYXlvdXQubWFwSWQrJzpncmlkX2ludGVydmFsX3k9JytncmlkSW50ZXJ2YWw7XG4gICAgICB9XG4gICAgICB2YXIgcHJpbnRMYXllcnMgPSBbXTtcbiAgICAgIHZhciBzdHlsZUxheWVycyA9IFtdO1xuICAgICAgdmFyIG9wYWNpdHlMYXllcnMgPSBbXTtcbiAgICAgICQuZWFjaChtYXAubGF5ZXJzLCBmdW5jdGlvbihpLCBsKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIGwgaW5zdGFuY2VvZiBPcGVuTGF5ZXJzLkxheWVyLldNU1xuICAgICAgICAgICAgfHwgKCBsIGluc3RhbmNlb2YgT3BlbkxheWVycy5MYXllci5XTVRTICYmICEobC5uYW1lLmxhc3RJbmRleE9mKCdpZ24nLCAwKSA9PT0gMCApIClcbiAgICAgICAgKXtcbiAgICAgICAgICAgIGlmKCBsLmdldFZpc2liaWxpdHkoKSApIHtcbiAgICAgICAgICAgICAgLy8gQWRkIGxheWVyIHRvIHRoZSBsaXN0IG9mIHByaW50ZWQgbGF5ZXJzXG4gICAgICAgICAgICAgIHByaW50TGF5ZXJzLnB1c2gobC5wYXJhbXNbJ0xBWUVSUyddKTtcbiAgICAgICAgICAgICAgLy8gT3B0aW9ubmFseSBhZGQgbGF5ZXIgc3R5bGUgaWYgbmVlZGVkIChzYW1lIG9yZGVyIGFzIGxheWVycyApXG4gICAgICAgICAgICAgIHZhciBsc3QgPSAnZGVmYXVsdCc7XG4gICAgICAgICAgICAgIGlmICggJ3FnaXNTZXJ2ZXJWZXJzaW9uJyBpbiBjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy5xZ2lzU2VydmVyVmVyc2lvbi5zdGFydHNXaXRoKCczLicpICkge1xuICAgICAgICAgICAgICAgICAgbHN0ID0gJyc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYoICdTVFlMRVMnIGluIGwucGFyYW1zICYmIGwucGFyYW1zWydTVFlMRVMnXS5sZW5ndGggPiAwIClcbiAgICAgICAgICAgICAgICBsc3QgPSBsLnBhcmFtc1snU1RZTEVTJ107XG4gICAgICAgICAgICAgIHN0eWxlTGF5ZXJzLnB1c2goIGxzdCApO1xuICAgICAgICAgICAgICBvcGFjaXR5TGF5ZXJzLnB1c2gocGFyc2VJbnQoMjU1Kmwub3BhY2l0eSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgcHJpbnRMYXllcnMucmV2ZXJzZSgpO1xuICAgICAgc3R5bGVMYXllcnMucmV2ZXJzZSgpO1xuICAgICAgb3BhY2l0eUxheWVycy5yZXZlcnNlKCk7XG5cbiAgICAgIC8vIEdldCBhY3RpdmUgYmFzZWxheWVyLCBhbmQgYWRkIHRoZSBjb3JyZXNwb25kaW5nIFFHSVMgbGF5ZXIgaWYgbmVlZGVkXG4gICAgICB2YXIgYWN0aXZlQmFzZUxheWVyTmFtZSA9IG1hcC5iYXNlTGF5ZXIubmFtZTtcbiAgICAgIGlmICggYWN0aXZlQmFzZUxheWVyTmFtZSBpbiBleHRlcm5hbEJhc2VsYXllcnNSZXBsYWNlbWVudCApIHtcbiAgICAgICAgdmFyIGV4YmwgPSBleHRlcm5hbEJhc2VsYXllcnNSZXBsYWNlbWVudFthY3RpdmVCYXNlTGF5ZXJOYW1lXTtcbiAgICAgICAgaWYoIGV4YmwgaW4gY29uZmlnLmxheWVycyApIHtcbiAgICAgICAgICAgIHZhciBhY3RpdmVCYXNlTGF5ZXJDb25maWcgPSBjb25maWcubGF5ZXJzW2V4YmxdO1xuICAgICAgICAgICAgaWYgKCAnaWQnIGluIGFjdGl2ZUJhc2VMYXllckNvbmZpZyAmJiAndXNlTGF5ZXJJRHMnIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnVzZUxheWVySURzID09ICdUcnVlJyApe1xuICAgICAgICAgICAgICAgIHByaW50TGF5ZXJzLnB1c2goYWN0aXZlQmFzZUxheWVyQ29uZmlnLmlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2V7XG4gICAgICAgICAgICAgICAgcHJpbnRMYXllcnMucHVzaChleGJsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICggJ3FnaXNTZXJ2ZXJWZXJzaW9uJyBpbiBjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy5xZ2lzU2VydmVyVmVyc2lvbi5zdGFydHNXaXRoKCczLicpICkge1xuICAgICAgICAgICAgICAgIHN0eWxlTGF5ZXJzLnB1c2goJycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHlsZUxheWVycy5wdXNoKCdkZWZhdWx0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcGFjaXR5TGF5ZXJzLnB1c2goMjU1KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBBZGQgdGFibGUgdmVjdG9yIGxheWVyIHdpdGhvdXQgZ2VvbVxuICAgICAgaWYoIHBUYWJsZVZlY3RvckxheWVycy5sZW5ndGggPiAwICkge1xuICAgICAgICAgICQuZWFjaCggcFRhYmxlVmVjdG9yTGF5ZXJzLCBmdW5jdGlvbiggaSwgbGF5ZXJJZCApe1xuICAgICAgICAgICAgICB2YXIgYUNvbmZpZyA9IGdldExheWVyQ29uZmlnQnlJZCggbGF5ZXJJZCApO1xuICAgICAgICAgICAgICBpZiggYUNvbmZpZyApIHtcbiAgICAgICAgICAgICAgICAgIHZhciBsYXllck5hbWUgPSBhQ29uZmlnWzBdO1xuICAgICAgICAgICAgICAgICAgdmFyIGxheWVyQ29uZmlnID0gYUNvbmZpZ1sxXTtcbiAgICAgICAgICAgICAgICAgIGlmKCAoIGxheWVyQ29uZmlnLmdlb21ldHJ5VHlwZSA9PSBcIm5vbmVcIiB8fCBsYXllckNvbmZpZy5nZW9tZXRyeVR5cGUgPT0gXCJ1bmtub3duXCIgfHwgbGF5ZXJDb25maWcuZ2VvbWV0cnlUeXBlID09IFwiXCIgKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoICdzaG9ydG5hbWUnIGluIGxheWVyQ29uZmlnICYmIGxheWVyQ29uZmlnLnNob3J0bmFtZSAhPSAnJyApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByaW50TGF5ZXJzLnB1c2gobGF5ZXJDb25maWcuc2hvcnRuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHByaW50TGF5ZXJzLnB1c2gobGF5ZXJDb25maWcubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKCAncWdpc1NlcnZlclZlcnNpb24nIGluIGNvbmZpZy5vcHRpb25zICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICBjb25maWcub3B0aW9ucy5xZ2lzU2VydmVyVmVyc2lvbi5zdGFydHNXaXRoKCczLicpICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGVMYXllcnMucHVzaCgnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlTGF5ZXJzLnB1c2goJ2RlZmF1bHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eUxheWVycy5wdXNoKDI1NSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCAncWdpc1NlcnZlclZlcnNpb24nIGluIGNvbmZpZy5vcHRpb25zICYmIGNvbmZpZy5vcHRpb25zLnFnaXNTZXJ2ZXJWZXJzaW9uICE9ICcyLjE0JyApIHtcbiAgICAgICAgcHJpbnRMYXllcnMucmV2ZXJzZSgpO1xuICAgICAgICBzdHlsZUxheWVycy5yZXZlcnNlKCk7XG4gICAgICAgIG9wYWNpdHlMYXllcnMucmV2ZXJzZSgpO1xuICAgICAgfVxuXG4gICAgICB1cmwgKz0gJyYnK2RyYWdDdHJsLmxheW91dC5tYXBJZCsnOkxBWUVSUz0nK3ByaW50TGF5ZXJzLmpvaW4oJywnKTtcbiAgICAgIHVybCArPSAnJicrZHJhZ0N0cmwubGF5b3V0Lm1hcElkKyc6U1RZTEVTPScrc3R5bGVMYXllcnMuam9pbignLCcpO1xuXG4gICAgICBpZiAoIGRyYWdDdHJsLmxheW91dC5vdmVydmlld0lkICE9IG51bGxcbiAgICAgICAgICAmJiBjb25maWcub3B0aW9ucy5oYXNPdmVydmlldyApIHtcbiAgICAgICAgdmFyIGJib3ggPSBjb25maWcub3B0aW9ucy5iYm94O1xuICAgICAgICB2YXIgb0V4dGVudCA9IG5ldyBPcGVuTGF5ZXJzLkJvdW5kcyhOdW1iZXIoYmJveFswXSksTnVtYmVyKGJib3hbMV0pLE51bWJlcihiYm94WzJdKSxOdW1iZXIoYmJveFszXSkpO1xuICAgICAgICB1cmwgKz0gJyYnK2RyYWdDdHJsLmxheW91dC5vdmVydmlld0lkKyc6ZXh0ZW50PScrb0V4dGVudDtcbiAgICAgICAgdXJsICs9ICcmJytkcmFnQ3RybC5sYXlvdXQub3ZlcnZpZXdJZCsnOkxBWUVSUz1PdmVydmlldyc7XG4gICAgICAgIGlmICggJ3FnaXNTZXJ2ZXJWZXJzaW9uJyBpbiBjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy5xZ2lzU2VydmVyVmVyc2lvbiAhPSAnMi4xNCcgKSB7XG4gICAgICAgICAgICBwcmludExheWVycy5wdXNoKCdPdmVydmlldycpO1xuICAgICAgICAgICAgaWYgKCBjb25maWcub3B0aW9ucy5xZ2lzU2VydmVyVmVyc2lvbi5zdGFydHNXaXRoKCczLicpICkge1xuICAgICAgICAgICAgICAgIHN0eWxlTGF5ZXJzLnB1c2goJycpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdHlsZUxheWVycy5wdXNoKCdkZWZhdWx0Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBvcGFjaXR5TGF5ZXJzLnB1c2goMjU1KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHByaW50TGF5ZXJzLnVuc2hpZnQoJ092ZXJ2aWV3Jyk7XG4gICAgICAgICAgICBzdHlsZUxheWVycy51bnNoaWZ0KCdkZWZhdWx0Jyk7XG4gICAgICAgICAgICBvcGFjaXR5TGF5ZXJzLnVuc2hpZnQoMjU1KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdXJsICs9ICcmTEFZRVJTPScrcHJpbnRMYXllcnMuam9pbignLCcpO1xuICAgICAgdXJsICs9ICcmU1RZTEVTPScrc3R5bGVMYXllcnMuam9pbignLCcpO1xuICAgICAgdXJsICs9ICcmT1BBQ0lUSUVTPScrb3BhY2l0eUxheWVycy5qb2luKCcsJyk7XG4gICAgICB2YXIgbGFiZWxzID0gJCgnI3ByaW50IC5wcmludC1sYWJlbHMnKS5maW5kKCdpbnB1dC5wcmludC1sYWJlbCwgdGV4dGFyZWEucHJpbnQtbGFiZWwnKS5zZXJpYWxpemUoKTtcbiAgICAgIGlmICggbGFiZWxzICE9IFwiXCIgKVxuICAgICAgICB1cmwgKz0gJyYnK2xhYmVscztcbiAgICAgIHZhciBmaWx0ZXIgPSBbXTtcbiAgICAgIHZhciBzZWxlY3Rpb24gPSBbXTtcbiAgICAgIGZvciAoIHZhciAgbE5hbWUgaW4gY29uZmlnLmxheWVycyApIHtcbiAgICAgICAgICB2YXIgbENvbmZpZyA9IGNvbmZpZy5sYXllcnNbbE5hbWVdO1xuICAgICAgICAgIGlmICggISgncmVxdWVzdF9wYXJhbXMnIGluIGxDb25maWcpXG4gICAgICAgICAgICB8fCBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddID09IG51bGwgKVxuICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICB2YXIgcmVxdWVzdFBhcmFtcyA9IGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ107XG4gICAgICAgICAgICBpZiAoICgnZmlsdGVydG9rZW4nIGluIGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ10pXG4gICAgICAgICAgICAmJiBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddWydmaWx0ZXJ0b2tlbiddICE9IG51bGxcbiAgICAgICAgICAgICYmIGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ11bJ2ZpbHRlcnRva2VuJ10gIT0gXCJcIiApIHtcbiAgICAgICAgICAgICAgZmlsdGVyLnB1c2goIGxDb25maWdbJ3JlcXVlc3RfcGFyYW1zJ11bJ2ZpbHRlcnRva2VuJ10gKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCAoJ3NlbGVjdGlvbnRva2VuJyBpbiBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddKVxuICAgICAgICAgICAgJiYgbENvbmZpZ1sncmVxdWVzdF9wYXJhbXMnXVsnc2VsZWN0aW9udG9rZW4nXSAhPSBudWxsXG4gICAgICAgICAgICAmJiBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddWydzZWxlY3Rpb250b2tlbiddICE9IFwiXCIgKSB7XG4gICAgICAgICAgICAgIHNlbGVjdGlvbi5wdXNoKCBsQ29uZmlnWydyZXF1ZXN0X3BhcmFtcyddWydzZWxlY3Rpb250b2tlbiddICk7XG4gICAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKCBmaWx0ZXIubGVuZ3RoICE9MCApe1xuICAgICAgICB1cmwgKz0gJyZGSUxURVJUT0tFTj0nKyBmaWx0ZXIuam9pbignOycpO1xuICAgICAgfVxuICAgICAgaWYgKCBzZWxlY3Rpb24ubGVuZ3RoICE9MCApXG4gICAgICAgIHVybCArPSAnJlNFTEVDVElPTlRPS0VOPScrIHNlbGVjdGlvbi5qb2luKCc7Jyk7XG4gICAgICB3aW5kb3cub3Blbih1cmwpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIG1hcC5ldmVudHMub24oe1xuICAgICAgXCJ6b29tZW5kXCI6IGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoIGRyYWdDdHJsLmFjdGl2ZSAmJiBsYXllci5nZXRWaXNpYmlsaXR5KCkgKSB7XG4gICAgICAgICAgICAvLyBnZXQgc2NhbGVcbiAgICAgICAgICAgIHZhciBzY2FsZSA9IGdldFByaW50U2NhbGUoIHByaW50Q2FwYWJpbGl0aWVzLnNjYWxlcyApO1xuICAgICAgICAgICAgLy8gdXBkYXRlIHRoZSBzZWxlY3RcbiAgICAgICAgICAgICQoJyNwcmludC1zY2FsZScpLnZhbChzY2FsZSk7XG4gICAgICAgICAgICAvLyBkcmF3IHByaW50IGJveFxuICAgICAgICAgICAgZHJhd1ByaW50Qm94KCBkcmFnQ3RybC5sYXlvdXQsIGxheWVyLCBzY2FsZSApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgbGl6TWFwLmV2ZW50cy5vbih7XG4gICAgICAgIG1pbmlkb2Nrb3BlbmVkOiBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBpZiAoIGUuaWQgPT0gJ3ByaW50JyApIHtcbiAgICAgICAgICAgICAgICAkKCcjcHJpbnQtdGVtcGxhdGUnKS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWluaWRvY2tjbG9zZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICggZS5pZCA9PSAncHJpbnQnICkge1xuICAgICAgICAgICAgICAgIGRyYWdDdHJsLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkVG9vbHRpcENvbnRyb2woKSB7XG4gICAgaWYgKCAhY29uZmlnWyd0b29sdGlwTGF5ZXJzJ10gfHwgY29uZmlnLnRvb2x0aXBMYXllcnMubGVuZ3RoID09IDAgKSB7XG4gICAgICAkKCcjYnV0dG9uLXRvb2x0aXAtbGF5ZXInKS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBWZXJpZnlpbmcgV0ZTIGxheWVyc1xuICAgIHZhciBmZWF0dXJlVHlwZXMgPSBnZXRWZWN0b3JMYXllckZlYXR1cmVUeXBlcygpO1xuICAgIGlmIChmZWF0dXJlVHlwZXMubGVuZ3RoID09IDAgKSB7XG4gICAgICAkKCcjYnV0dG9uLXRvb2x0aXAtbGF5ZXInKS5wYXJlbnQoKS5yZW1vdmUoKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdmFyIHRvb2x0aXBMYXllcnNEaWMgPSB7fTtcbiAgICBmb3IgKHZhciBsbmFtZSBpbiBjb25maWcudG9vbHRpcExheWVycykge1xuICAgICAgICB0b29sdGlwTGF5ZXJzRGljW2xpek1hcC5jbGVhbk5hbWUobG5hbWUpXSA9IGxuYW1lO1xuICAgIH1cblxuICAgIHZhciB0b29sdGlwTGF5ZXJzU29ydGVkID0gW107XG5cbiAgICBmZWF0dXJlVHlwZXMuZWFjaCggZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICB2YXIgdHlwZU5hbWUgPSBzZWxmLmZpbmQoJ05hbWUnKS50ZXh0KCk7XG4gICAgICAgIHZhciBsbmFtZSA9IGxpek1hcC5nZXROYW1lQnlUeXBlTmFtZSggdHlwZU5hbWUgKTtcbiAgICAgICAgaWYgKCAhbG5hbWUgKSB7XG4gICAgICAgICAgICBpZiAodHlwZU5hbWUgaW4gY29uZmlnLmxvY2F0ZUJ5TGF5ZXIpXG4gICAgICAgICAgICAgICAgbG5hbWUgPSB0eXBlTmFtZVxuICAgICAgICAgICAgZWxzZSBpZiAoICh0eXBlTmFtZSBpbiBzaG9ydE5hbWVNYXApICYmIChzaG9ydE5hbWVNYXBbdHlwZU5hbWVdIGluIGNvbmZpZy5sb2NhdGVCeUxheWVyKSlcbiAgICAgICAgICAgICAgICBsbmFtZSA9IHNob3J0TmFtZU1hcFt0eXBlTmFtZV07XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBmb3IgKHR0bCBpbiBjb25maWcudG9vbHRpcExheWVycykge1xuICAgICAgICAgICAgICAgICAgICBpZiAodHRsLnNwbGl0KCcgJykuam9pbignXycpID09IHR5cGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsbmFtZSA9IHR0bDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAhKGxuYW1lIGluIGNvbmZpZy50b29sdGlwTGF5ZXJzKSApXG4gICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgaWYgKCAobG5hbWUgaW4gY29uZmlnLnRvb2x0aXBMYXllcnMpICYmIChsbmFtZSBpbiBjb25maWcubGF5ZXJzKSApIHtcbiAgICAgICAgICAgIHZhciBsQ29uZmlnID0gY29uZmlnLmxheWVyc1tsbmFtZV07XG4gICAgICAgICAgICB0b29sdGlwTGF5ZXJzU29ydGVkW2NvbmZpZy50b29sdGlwTGF5ZXJzW2xuYW1lXS5vcmRlcl0gPSAnPG9wdGlvbiB2YWx1ZT1cIicrbG5hbWUrJ1wiPicrbENvbmZpZy50aXRsZSsnPC9vcHRpb24+JztcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gRGlzcGxheSBsYXllcnMgb3JkZXIgYXMgZGVjbGFyZWQgaW4gcGx1Z2luXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0b29sdGlwTGF5ZXJzU29ydGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAkKCcjdG9vbHRpcC1sYXllci1saXN0JykuYXBwZW5kKHRvb2x0aXBMYXllcnNTb3J0ZWRbaV0pO1xuICAgIH1cblxuICAgIGlmICggJCgnI3Rvb2x0aXAtbGF5ZXItbGlzdCcpLmZpbmQoJ29wdGlvbicpLmxlbmd0aCA9PSAxICkge1xuICAgICAgJCgnI2J1dHRvbi10b29sdGlwLWxheWVyJykucGFyZW50KCkucmVtb3ZlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG5PcGVuTGF5ZXJzLkNvbnRyb2wuSGlnaGxpZ2h0RmVhdHVyZSA9IE9wZW5MYXllcnMuQ2xhc3MoT3BlbkxheWVycy5Db250cm9sLCB7XG4gICAgLyoqXG4gICAgICogQ29uc3RhbnQ6IEVWRU5UX1RZUEVTXG4gICAgICoge0FycmF5KFN0cmluZyl9IFN1cHBvcnRlZCBhcHBsaWNhdGlvbiBldmVudCB0eXBlcy4gIFJlZ2lzdGVyIGEgbGlzdGVuZXJcbiAgICAgKiAgICAgZm9yIGEgcGFydGljdWxhciBldmVudCB3aXRoIHRoZSBmb2xsb3dpbmcgc3ludGF4OlxuICAgICAqIChjb2RlKVxuICAgICAqIGNvbnRyb2wuZXZlbnRzLnJlZ2lzdGVyKHR5cGUsIG9iaiwgbGlzdGVuZXIpO1xuICAgICAqIChlbmQpXG4gICAgICpcbiAgICAgKiAgLSAqZmVhdHVyZXNldCogVHJpZ2dlcmVkIHdoZW4gdGhlIG1vdXNlIGlzIGhvdmVyIGEgbmV3IGZlYXR1cmUsXG4gICAgICogICAgICBpLmUuIG5vdCBhIHByZXZpb3VzbHkgaG92ZXIgZmVhdHVyZS5cbiAgICAgKiAgLSAqZmVhdHVyZXJlc2V0KiBUcmlnZ2VyZWQgd2hlbiB0aGUgbW91c2UgYmVjb21lcyBubyBsb25nZXIgaG92ZXJcbiAgICAgKiAgICAgIGEgZmVhdHVyZS5cbiAgICAgKi9cbiAgICBFVkVOVF9UWVBFUzogW1wiZmVhdHVyZXNldFwiLFwiZmVhdHVyZXJlc2V0XCJdLFxuXG4gICAgLyoqXG4gICAgICogUHJvcGVydHk6IGZlYXR1cmVcbiAgICAgKiB7T3BlbkxheWVycy5GZWF0dXJlfSBUaGUgY3VycmVudCBoaWdobGlnaHRlZCBmZWF0dXJlIHRoZSBtb3VzZS4gIFdpbGxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICBiZSBzZXQgdG8gbnVsbCBhcyBzb29uIGFzIHRoZSBtb3VzZSBpcyBub3QgaG92ZXJcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICBhIGZlYXR1cmUuXG4gICAgICovXG4gICAgZmVhdHVyZTogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnR5OiBzdHlsZVxuICAgICAqIHtPcGVuTGF5ZXJzLlN0eWxlfSAgIFRoZSBzdHlsZSBhcHBsaWVkIHRvIGFuIGhvdmVyIGZlYXR1cmVcbiAgICAgKi9cbiAgICBzdHlsZTogbnVsbCxcblxuICAgIC8qKlxuICAgICAqIFByb3BlcnR5OiBkaXNwbGF5UG9wdXBcbiAgICAgKiB7Ym9vbGVhbn0gIERpc3BsYXkgYSBwb3B1cCB3aXRoIGFsbCB0aGUgZmVhdHVyZSBhdHRyaWJ1dGVzIGlmIHRoaXNcbiAgICAgKiAgICAgICAgICAgIGlzIHNldCB0byB0cnVlLiAgRGVmYXVsdCB0cnVlLlxuICAgICAqL1xuICAgIGRpc3BsYXlQb3B1cDogdHJ1ZSxcblxuICAgIGRlZmF1bHRIYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAnZGVsYXknOiAwLFxuICAgICAgICAncGl4ZWxUb2xlcmFuY2UnOiBudWxsLFxuICAgICAgICAnc3RvcE1vdmUnOiBmYWxzZVxuICAgIH0sXG5cbiAgICBkZWZhdWx0U3R5bGU6IHtcbiAgICAgICAgJ3N0cm9rZUNvbG9yJyA6IFwicmVkXCIsXG4gICAgICAgICdzdHJva2VXaWR0aCcgOiA3XG4gICAgfSxcblxuICAgIHBvcHVwT2Zmc2V0OiB7XG4gICAgICAgICdsZWZ0JzogNDUsXG4gICAgICAgICdyaWdodCc6IDAsXG4gICAgICAgICd0b3AnOiA1XG4gICAgfSxcblxuICAgIHBvcHVwVGl0bGU6IG51bGwsXG5cbiAgICBwb3B1cFNpemU6IG51bGwsXG5cbiAgICBkZWZhdWx0UG9wdXBTaXplOiBuZXcgT3BlbkxheWVycy5TaXplKDIwMCwzMjUpLFxuXG4gICAgLyoqXG4gICAgICogQ29uc3RydWN0b3I6IE9wZW5MYXllcnMuQ29udHJvbC5IaWdobGlnaHRGZWF0dXJlXG4gICAgICogQ3JlYXRlIGEgbmV3IEhpZ2hsaWdodEZlYXR1cmUgZmVhdHVyZSBjb250cm9sLlxuICAgICAqXG4gICAgICogUGFyYW1ldGVyczpcbiAgICAgKiBsYXllciAtIHs8T3BlbkxheWVycy5MYXllci5WZWN0b3I+fSBMYXllciB0aGF0IGNvbnRhaW5zIGZlYXR1cmVzLlxuICAgICAqIG9wdGlvbnMgLSB7T2JqZWN0fSBPcHRpb25hbCBvYmplY3Qgd2hvc2UgcHJvcGVydGllcyB3aWxsIGJlIHNldCBvbiB0aGVcbiAgICAgKiAgICAgY29udHJvbC5cbiAgICAgKi9cbiAgICBpbml0aWFsaXplOiBmdW5jdGlvbihsYXllcnMsIG9wdGlvbnMpIHtcbiAgICAgICAgLy8gY29uY2F0ZW5hdGUgZXZlbnRzIHNwZWNpZmljIHRvIHRoaXMgY29udHJvbCB3aXRoIHRob3NlIGZyb20gdGhlIGJhc2VcbiAgICAgICAgdGhpcy5FVkVOVF9UWVBFUyA9XG4gICAgICAgICAgICBPcGVuTGF5ZXJzLkNvbnRyb2wuSGlnaGxpZ2h0RmVhdHVyZS5wcm90b3R5cGUuRVZFTlRfVFlQRVMuY29uY2F0KFxuICAgICAgICAgICAgT3BlbkxheWVycy5Db250cm9sLnByb3RvdHlwZS5FVkVOVF9UWVBFU1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmhhbmRsZXJPcHRpb25zID0gT3BlbkxheWVycy5VdGlsLmV4dGVuZChcbiAgICAgICAgICAgIHt9LCB0aGlzLmRlZmF1bHRIYW5kbGVyT3B0aW9uc1xuICAgICAgICApO1xuICAgICAgICB0aGlzLnN0eWxlID0gT3BlbkxheWVycy5VdGlsLmV4dGVuZCgge30sIHRoaXMuZGVmYXVsdFN0eWxlKTtcbiAgICAgICAgdGhpcy5wb3B1cFNpemUgPSBPcGVuTGF5ZXJzLlV0aWwuZXh0ZW5kKCB7fSwgdGhpcy5kZWZhdWx0UG9wdXBTaXplKTtcblxuICAgICAgICBPcGVuTGF5ZXJzLkNvbnRyb2wucHJvdG90eXBlLmluaXRpYWxpemUuYXBwbHkodGhpcywgW29wdGlvbnNdKTtcblxuICAgICAgICBpZih0aGlzLnNjb3BlID09PSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLnNjb3BlID0gdGhpcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRMYXllcihsYXllcnMpO1xuXG4gICAgICAgIHRoaXMuaGFuZGxlciA9IG5ldyBPcGVuTGF5ZXJzLkhhbmRsZXIuSG92ZXIoXG4gICAgICAgICAgICB0aGlzLCB7XG4gICAgICAgICAgICAgICAgJ21vdmUnOiB0aGlzLm9uTW92ZVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlck9wdGlvbnNcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIXRoaXMucG9wdXBPZmZzZXQpe1xuICAgICAgICAgICAgdGhpcy5wb3B1cE9mZnNldCA9IHtcbiAgICAgICAgICAgICAgICAnbGVmdCc6IDAsXG4gICAgICAgICAgICAgICAgJ3JpZ2h0JzogMCxcbiAgICAgICAgICAgICAgICAndG9wJzogMFxuICAgICAgICAgICAgfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5wb3B1cE9mZnNldC5sZWZ0KXtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVwT2Zmc2V0LmxlZnQgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCF0aGlzLnBvcHVwT2Zmc2V0LnJpZ2h0KXtcbiAgICAgICAgICAgICAgICB0aGlzLnBvcHVwT2Zmc2V0LnJpZ2h0ID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghdGhpcy5wb3B1cE9mZnNldC50b3Ape1xuICAgICAgICAgICAgICAgIHRoaXMucG9wdXBPZmZzZXQudG9wID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IHNldE1hcFxuICAgICAqIFNldCB0aGUgbWFwIHByb3BlcnR5IGZvciB0aGUgY29udHJvbC4gVGhpcyBpcyBkb25lIHRocm91Z2ggYW4gYWNjZXNzb3JcbiAgICAgKiBzbyB0aGF0IHN1YmNsYXNzZXMgY2FuIG92ZXJyaWRlIHRoaXMgYW5kIHRha2Ugc3BlY2lhbCBhY3Rpb24gb25jZVxuICAgICAqIHRoZXkgaGF2ZSB0aGVpciBtYXAgdmFyaWFibGUgc2V0LlxuICAgICAqXG4gICAgICogUGFyYW1ldGVyczpcbiAgICAgKiBtYXAgLSB7PE9wZW5MYXllcnMuTWFwPn1cbiAgICAgKi9cbiAgICBzZXRNYXA6IGZ1bmN0aW9uKG1hcCkge1xuICAgICAgICB0aGlzLm1hcCA9IG1hcDtcbiAgICAgICAgaWYgKHRoaXMuaGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5oYW5kbGVyLnNldE1hcChtYXApO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMubWFwLmV2ZW50cy5yZWdpc3RlcihcInpvb21lbmRcIiwgdGhpcywgdGhpcy5vblpvb20pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGluaXRMYXllclxuICAgICAqIEFzc2lnbiB0aGUgbGF5ZXIgcHJvcGVydHkuIElmIGxheWVycyBpcyBhbiBhcnJheSwgd2UgbmVlZCB0byB1c2VcbiAgICAgKiAgICAgYSBSb290Q29udGFpbmVyLlxuICAgICAqXG4gICAgICogUGFyYW1ldGVyczpcbiAgICAgKiBsYXllcnMgLSB7PE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yPn0sIG9yIGFuIGFycmF5IG9mIHZlY3RvciBsYXllcnMuXG4gICAgICovXG4gICAgaW5pdExheWVyOiBmdW5jdGlvbihsYXllcnMpIHtcbiAgICAgICAgaWYoT3BlbkxheWVycy5VdGlsLmlzQXJyYXkobGF5ZXJzKSkge1xuICAgICAgICAgICAgdGhpcy5sYXllcnMgPSBsYXllcnM7XG4gICAgICAgICAgICB0aGlzLmxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yLlJvb3RDb250YWluZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5pZCArIFwiX2NvbnRhaW5lclwiLCB7XG4gICAgICAgICAgICAgICAgICAgIGxheWVyczogbGF5ZXJzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubGF5ZXIgPSBsYXllcnM7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQVBJTWV0aG9kOiBzZXRMYXllclxuICAgICAqIEF0dGFjaCBhIG5ldyBsYXllciB0byB0aGUgY29udHJvbCwgb3ZlcnJpZGluZyBhbnkgZXhpc3RpbmcgbGF5ZXJzLlxuICAgICAqXG4gICAgICogUGFyYW1ldGVyczpcbiAgICAgKiBsYXllcnMgLSBBcnJheSBvZiB7PE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yPn0gb3IgYSBzaW5nbGVcbiAgICAgKiAgICAgezxPcGVuTGF5ZXJzLkxheWVyLlZlY3Rvcj59XG4gICAgICovXG4gICAgc2V0TGF5ZXI6IGZ1bmN0aW9uKGxheWVycykge1xuICAgICAgICB2YXIgaXNBY3RpdmUgPSB0aGlzLmFjdGl2ZTtcbiAgICAgICAgdGhpcy5kZWFjdGl2YXRlKCk7XG4gICAgICAgIGlmKHRoaXMubGF5ZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmxheWVyLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIHRoaXMubGF5ZXJzID0gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmluaXRMYXllcihsYXllcnMpO1xuICAgICAgICBpZiAoaXNBY3RpdmUpIHtcbiAgICAgICAgICAgIHRoaXMuYWN0aXZhdGUoKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIE1ldGhvZDogb25Nb3ZlXG4gICAgKiBXaGlsZSB0aGlzIGNvbnRyb2wgaXMgYWN0aXZlLCBvbiBtb3VzZSBtb3ZlLCBjaGVjayBpZiB0aGUgbW91c2UgaXNcbiAgICAqIG92ZXIgYSBmZWF0dXJlIG9yIHdhcyBvdmVyIGEgZmVhdHVyZSBhbmQgaXMgbm90IGFueW1vcmUuXG4gICAgKlxuICAgICogUGFyYW1ldGVyczpcbiAgICAqIGV2dFxuICAgICovXG4gICAgb25Nb3ZlOiBmdW5jdGlvbihldnQpe1xuICAgICAgICBpZiAoZXZ0LnR5cGUgIT0gXCJtb3VzZW1vdmVcIikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG9GZWF0dXJlID0gdGhpcy5sYXllci5nZXRGZWF0dXJlRnJvbUV2ZW50KGV2dCk7XG5cbiAgICAgICAgaWYgKHRoaXMuZmVhdHVyZSl7IC8vIGxhc3QgaG92ZXIgZmVhdHVyZSBleGlzdFxuICAgICAgICAgICAgaWYgKG9GZWF0dXJlKXsgLy8gbW91c2UgaXMgb3ZlciBhIGZlYXR1cmVcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5mZWF0dXJlLmZpZCAhPSBvRmVhdHVyZS5maWQpey8vYXJlIHRoZXkgZGlmZmVyZW50c1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0RmVhdHVyZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldEZlYXR1cmUob0ZlYXR1cmUsIGV2dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHsvLyBtb3VzZSBpcyBub3Qgb3ZlciBhIGZlYXR1cmUsIGJ1dCBsYXN0IGhvdmVyIGZlYXR1cmUgZXhpc3RcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2V0RmVhdHVyZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG9GZWF0dXJlKXsgLy8gbm8gbGFzdCBmZWF0dXJlIGFuZCBtb3VzZSBvdmVyIGEgZmVhdHVyZVxuICAgICAgICAgICAgdGhpcy5zZXRGZWF0dXJlKG9GZWF0dXJlLCBldnQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogTWV0aG9kOiBvblpvb21cbiAgICAqIElmIGEgZmVhdHVyZSB3YXMgaG92ZXIgdGhlIG1vdXNlIGJlZm9yZSBhIHpvb20gZXZlbnQsIHRoZSBzYW1lIGZlYXR1cmVcbiAgICAqIHNob3VsZCBiZSBzZXQgYXMgaG92ZXIuICBUaGUgbWFpbiBwdXJwb3NlIG9mIHRoaXMgZnVuY3Rpb24gaXMgdG8gbWFrZVxuICAgICogc3VyZSB0aGUgc3R5bGUgaXMgYXBwbGllZCBhZnRlciB0aGUgbGF5ZXIgaGFzIGxvYWRlZCBpdHMgZmVhdHVyZXMgYW5kXG4gICAgKiB0aGUgcG9wdXBzIGFuZCBldmVudHMgYXJlIGNvcnJlY3RseSBkaXNwbGF5ZWQvdHJpZ2dlcmVkLlxuICAgICpcbiAgICAqIFBhcmFtZXRlcnM6XG4gICAgKiBldnRcbiAgICAqL1xuICAgIG9uWm9vbTogZnVuY3Rpb24oZXZ0KXtcbiAgICAgICAgaWYodGhpcy5mZWF0dXJlKXtcbiAgICAgICAgICAgIHZhciBvRmVhdHVyZSA9IHRoaXMuZmVhdHVyZTtcbiAgICAgICAgICAgIHRoaXMucmVzZXRGZWF0dXJlKCk7XG4gICAgICAgICAgICAvLyBNYWtlIHN1cmUgdGhlIGhvdmVyIGZlYXR1cmUgaXMgc3RpbGwgYW1vbmcgdGhlIGxheWVyLmZlYXR1cmVzXG4gICAgICAgICAgICAvLyBiZWZvcmUgc2V0dGluZyBpdCBob3ZlciBhZ2FpblxuICAgICAgICAgICAgaWYgKE9wZW5MYXllcnMuVXRpbC5pbmRleE9mKHRoaXMubGF5ZXIuZmVhdHVyZXMsIG9GZWF0dXJlKSAhPSAtMSl7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRGZWF0dXJlKG9GZWF0dXJlLCBldnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICogTWV0aG9kOiBzZXRGZWF0dXJlXG4gICAgKiBDaGFuZ2UgdGhlIGNvbG9yIG9mIGN1cnJlbnQgZmVhdHVyZSBvdmVyIHRoZSBtb3VzZS4gIENhbiBkaXNwbGF5IGEgcG9wdXBcbiAgICAqIEF0IHRoZSBzYW1lIHRpbWUuICBUaGUgZmVhdHVyZSBiZWNvbWVzIHRoZSBjdXJyZW50IGZlYXR1cmUuXG4gICAgKlxuICAgICogUGFyYW1ldGVyczpcbiAgICAqIGV2dFxuICAgICovXG4gICAgc2V0RmVhdHVyZTogZnVuY3Rpb24oZmVhdHVyZSwgZXZ0KXtcbiAgICAgICAgdmFyIGxheWVyID0gZmVhdHVyZS5sYXllcjtcbiAgICAgICAgbGF5ZXIuZHJhd0ZlYXR1cmUoIGZlYXR1cmUsIHRoaXMuc3R5bGUgKTtcbiAgICAgICAgaWYodGhpcy5kaXNwbGF5UG9wdXApe1xuICAgICAgICAgICAgdGhpcy5hZGRJbmZvUG9wdXAoZmVhdHVyZSwgZXZ0KTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXZlbnQgPSB7ZmVhdHVyZTogZmVhdHVyZX07XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXJFdmVudChcImZlYXR1cmVzZXRcIiwgZXZlbnQpO1xuICAgICAgICB0aGlzLmZlYXR1cmUgPSBmZWF0dXJlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAqIE1ldGhvZDogcmVzZXRGZWF0dXJlXG4gICAgKiBEcmF3IHRoaXMuZmVhdHVyZSB0byBpdHMgb3JpZ2luYWwgY29sb3IuICBJZiB0aGVyZSB3YXMgYSBwb3B1cCwgaXQnc1xuICAgICogYWxzbyByZW1vdmVkLiAgdGhpcy5mZWF0dXJlIGJlY29tZXMgbnVsbC5cbiAgICAqXG4gICAgKi9cbiAgICByZXNldEZlYXR1cmU6IGZ1bmN0aW9uKCl7XG4gICAgICAgIHZhciBsYXllciA9IHRoaXMuZmVhdHVyZS5sYXllcjtcbiAgICAgICAgaWYgKE9wZW5MYXllcnMuVXRpbC5pbmRleE9mKGxheWVyLmZlYXR1cmVzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mZWF0dXJlKSAhPSAtMSl7XG4gICAgICAgICAgICBsYXllci5kcmF3RmVhdHVyZSh0aGlzLmZlYXR1cmUpO1xuICAgICAgICB9XG4gICAgICAgIGlmKHRoaXMuZGlzcGxheVBvcHVwKXtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlSW5mb1BvcHVwKHRoaXMuZmVhdHVyZSk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV2ZW50ID0ge2ZlYXR1cmU6IHRoaXMuZmVhdHVyZX07XG4gICAgICAgIHRoaXMuZXZlbnRzLnRyaWdnZXJFdmVudChcImZlYXR1cmVyZXNldFwiLCBldmVudCk7XG4gICAgICAgIHRoaXMuZmVhdHVyZSA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogYWRkSW5mb1BvcHVwXG4gICAgICogQ2FsbGVkIHdoZW4gYSB0aGUgbW91c2UgaXMgb3ZlciBhIGZlYXR1cmUgYnV0IG5vdCBzZWxlY3RlZC4gIEl0IGNyZWF0ZXNcbiAgICAgKiBhIHBvcHVwIHdpdGggYWxsIGZlYXR1cmUgYXR0cmlidXRlcyBhbmQgaXMgZGlzcGxheWVkIGF0IHRoZSBsZWZ0IG9yIHJpZ2h0XG4gICAgICogb2YgdGhlIG1hcCBkZXBlbmRpbmcgd2hlcmUgdGhlIG1vdXNlIGlzLiAgVGhhdCBpcyB3aHkgZXZ0IGlzIG5lZWRlZC5cbiAgICAgKlxuICAgICAqIFBhcmFtZXRlcnM6XG4gICAgICogZmVhdHVyZSAtIHtPcGVuTGF5ZXJzLkZlYXR1cmV9XG4gICAgICpcbiAgICAgKiBldnRcbiAgICAgKi9cbiAgICBhZGRJbmZvUG9wdXA6IGZ1bmN0aW9uKGZlYXR1cmUsIGV2dCkge1xuICAgICAgICB2YXIgc3pIVE1MLCBvUG9wdXBQb3MsIG9NYXBFeHRlbnQsIG5SZXNvLCBvUG9wdXAsIGJMZWZ0O1xuXG4gICAgICAgIC8vIGZlYXR1cmUgYXR0cmlidXRlcyBwYXJzaW5nIGluIGh0bWxcbiAgICAgICAgc3pIVE1MID0gXCI8ZGl2IHN0eWxlPSdmb250LXNpemU6LjhlbSc+PGgxPlwiK3RoaXMucG9wdXBUaXRsZStcIjwvaDE+XCI7XG4gICAgICAgIGlmICghZmVhdHVyZS5jbHVzdGVyKXtcbiAgICAgICAgICAgIGFzekF0dHJpYnV0ZXMgPSBmZWF0dXJlLmF0dHJpYnV0ZXM7XG4gICAgICAgICAgICBmb3IodmFyIGtleSBpbiBhc3pBdHRyaWJ1dGVzKXtcbiAgICAgICAgICAgICAgICBzekhUTUwgKz0ga2V5ICsgXCIgOiBcIiArIGFzekF0dHJpYnV0ZXNba2V5XSArIFwiPGJyIC8+XCI7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgc3pIVE1MICs9XCI8L2Rpdj5cIjtcblxuICAgICAgICBvTWFwRXh0ZW50ID0gdGhpcy5sYXllci5tYXAuZ2V0RXh0ZW50KCk7XG4gICAgICAgIG5SZXNvID0gdGhpcy5sYXllci5tYXAuZ2V0UmVzb2x1dGlvbigpO1xuXG4gICAgICAgIC8vIGNhbGN1bGF0ZSB3aGVyZSAobGVmdCBvciByaWdodCkgdGhlIHBvcHVwIHdpbGwgYXBwZWFyXG4gICAgICAgIGlmKGV2dC54eSl7IC8vIGlmIHdlIGtub3cgdGhlIG1vdXNlIHBvc2l0aW9uXG4gICAgICAgICAgICB2YXIgbk1hcFdpZHRoID0gdGhpcy5sYXllci5tYXAuZ2V0U2l6ZSgpLnc7XG4gICAgICAgICAgICB2YXIgbk1vdXNlWFBvcyA9IGV2dC54eS54O1xuICAgICAgICAgICAgYkxlZnQgPSBuTW91c2VYUG9zID49IChuTWFwV2lkdGgvMik7XG4gICAgICAgIH0gZWxzZSB7IC8vIHVzZSBmZWF0dXJlIGFuZCBtYXAgY2VudGVyIHBpeGVsIHRvIGNvbXBhcmVcbiAgICAgICAgICAgIHZhciBuTWFwWENlbnRlciA9IHRoaXMubWFwLmdldEV4dGVudCgpLmdldENlbnRlclBpeGVsKCkueDtcbiAgICAgICAgICAgIHZhciBuRmVhdHVyZVhQb3MgPSBmZWF0dXJlLmdlb21ldHJ5LmdldEJvdW5kcygpLmdldENlbnRlclBpeGVsKCkueDtcbiAgICAgICAgICAgIGJMZWZ0ID0gbkZlYXR1cmVYUG9zID49IG5NYXBYQ2VudGVyO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYoYkxlZnQpeyAvLyBwb3B1cCBhcHBlYXJzIHRvcC1sZWZ0IHBvc2l0aW9uXG4gICAgICAgICAgICBvUG9wdXBQb3MgPSBuZXcgT3BlbkxheWVycy5Mb25MYXQob01hcEV4dGVudC5sZWZ0LG9NYXBFeHRlbnQudG9wKTtcbiAgICAgICAgICAgIG9Qb3B1cFBvcy5sb24gKz0gdGhpcy5wb3B1cE9mZnNldC5sZWZ0ICogblJlc287XG4gICAgICAgIH0gZWxzZSB7IC8vIHBvcHVwIGFwcGVhcnMgdG9wLXJpZ2h0IHBvc2l0aW9uXG4gICAgICAgICAgICBvUG9wdXBQb3MgPSBuZXcgT3BlbkxheWVycy5Mb25MYXQob01hcEV4dGVudC5yaWdodCxvTWFwRXh0ZW50LnRvcCk7XG4gICAgICAgICAgICBvUG9wdXBQb3MubG9uIC09IHRoaXMucG9wdXBPZmZzZXQucmlnaHQgKiBuUmVzbztcbiAgICAgICAgfVxuICAgICAgICBvUG9wdXBQb3MubGF0IC09IHRoaXMucG9wdXBPZmZzZXQudG9wICogblJlc287XG5cbiAgICAgICAgb1BvcHVwID0gbmV3IE9wZW5MYXllcnMuUG9wdXAuQW5jaG9yZWQoXG4gICAgICAgICAgICBcImNoaWNrZW5cIixcbiAgICAgICAgICAgIG9Qb3B1cFBvcyxcbiAgICAgICAgICAgIHRoaXMucG9wdXBTaXplLFxuICAgICAgICAgICAgc3pIVE1MLFxuICAgICAgICAgICAgbnVsbCwgbnVsbCwgbnVsbCk7XG4gICAgICAgIGZlYXR1cmUucG9wdXAgPSBvUG9wdXA7XG4gICAgICAgIHRoaXMubWFwLmFkZFBvcHVwKG9Qb3B1cCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogcmVtb3ZlSW5mb1BvcHVwXG4gICAgICogUmVtb3ZlIHRoZSBwb3B1cCBvZiBmZWF0dXJlIHdoZW4gdGhlIG1vdXNlIGlzIG5vIGxvbmdlciBob3ZlciBpdC5cbiAgICAgKlxuICAgICAqIFBhcmFtZXRlcnM6XG4gICAgICogZmVhdHVyZSAtIHtPcGVuTGF5ZXJzLkZlYXR1cmV9XG4gICAgICovXG4gICAgcmVtb3ZlSW5mb1BvcHVwOiBmdW5jdGlvbihmZWF0dXJlKSB7XG4gICAgICAgIHRoaXMubWFwLnJlbW92ZVBvcHVwKGZlYXR1cmUucG9wdXApO1xuICAgICAgICBmZWF0dXJlLnBvcHVwLmRlc3Ryb3koKTtcbiAgICAgICAgZmVhdHVyZS5wb3B1cCA9IG51bGw7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogYWN0aXZhdGVcbiAgICAgKiBBY3RpdmF0ZXMgdGhlIGNvbnRyb2wuXG4gICAgICpcbiAgICAgKiBSZXR1cm5zOlxuICAgICAqIHtCb29sZWFufSBUaGUgY29udHJvbCB3YXMgZWZmZWN0aXZlbHkgYWN0aXZhdGVkLlxuICAgICAqL1xuICAgIGFjdGl2YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5hY3RpdmUpIHtcbiAgICAgICAgICAgIGlmKHRoaXMubGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXAuYWRkTGF5ZXIodGhpcy5sYXllcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIE9wZW5MYXllcnMuQ29udHJvbC5wcm90b3R5cGUuYWN0aXZhdGUuYXBwbHkoXG4gICAgICAgICAgICB0aGlzLCBhcmd1bWVudHNcbiAgICAgICAgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBkZWFjdGl2YXRlXG4gICAgICogRGVhY3RpdmF0ZXMgYSBjb250cm9sIGFuZCBpdCdzIGFzc29jaWF0ZWQgaGFuZGxlciBpZiBhbnkuICBUaGUgZXhhY3RcbiAgICAgKiBlZmZlY3Qgb2YgdGhpcyBkZXBlbmRzIG9uIHRoZSBjb250cm9sIGl0c2VsZi5cbiAgICAgKlxuICAgICAqIFJldHVybnM6XG4gICAgICoge0Jvb2xlYW59IFRydWUgaWYgdGhlIGNvbnRyb2wgd2FzIGVmZmVjdGl2ZWx5IGRlYWN0aXZhdGVkIG9yIGZhbHNlXG4gICAgICogICAgICAgICAgIGlmIHRoZSBjb250cm9sIHdhcyBhbHJlYWR5IGluYWN0aXZlLlxuICAgICAqL1xuICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuYWN0aXZlKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVyLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICBpZih0aGlzLmZlYXR1cmUpe1xuICAgICAgICAgICAgICAgIHRoaXMucmVzZXRGZWF0dXJlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmV2ZW50cy50cmlnZ2VyRXZlbnQoXCJkZWFjdGl2YXRlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgQ0xBU1NfTkFNRTogXCJPcGVuTGF5ZXJzLkNvbnRyb2wuSGlnaGxpZ2h0RmVhdHVyZVwiXG59KTtcblxuICAgIC8vIERlZmluZSB2ZWN0b3IgbGF5ZXIgZm9yIHRvb2x0aXBcbiAgICB2YXIgdG9vbHRpcFN0eWxlTWFwID0gbmV3IE9wZW5MYXllcnMuU3R5bGVNYXAoe1xuICAgICAgICAnZGVmYXVsdCc6IG5ldyBPcGVuTGF5ZXJzLlN0eWxlKHtcbiAgICAgICAgICAgIHBvaW50UmFkaXVzOiAxLFxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwiYmx1ZVwiLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDEwLFxuICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogMCxcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAwLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgfSksXG4gICAgICAgICdzZWxlY3RlZCc6IG5ldyBPcGVuTGF5ZXJzLlN0eWxlKHtcbiAgICAgICAgICAgIHBvaW50UmFkaXVzOiAxLFxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6IFwieWVsbG93XCIsXG4gICAgICAgICAgICBzdHJva2VXaWR0aDogMTAsXG4gICAgICAgICAgICBzdHJva2VPcGFjaXR5OiAwLFxuICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDAsXG4gICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJ1xuICAgICAgICB9KSxcbiAgICAgICAgJ3RlbXBvcmFyeSc6IG5ldyBPcGVuTGF5ZXJzLlN0eWxlKHtcbiAgICAgICAgICAgIHBvaW50UmFkaXVzOiAxLFxuICAgICAgICAgICAgc3Ryb2tlQ29sb3I6ICdyZWQnLFxuICAgICAgICAgICAgc3Ryb2tlV2lkdGg6IDEwLFxuICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogMCxcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAwLFxuICAgICAgICAgICAgY3Vyc29yOiAncG9pbnRlcidcbiAgICAgICAgfSlcbiAgICB9KTtcbiAgICB2YXIgdGxheWVyID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKCd0b29sdGlwTGF5ZXInLCB7XG4gICAgICAgIHN0eWxlTWFwOiB0b29sdGlwU3R5bGVNYXBcbiAgICB9KTtcbiAgICBsaXpNYXAubWFwLmFkZExheWVyKHRsYXllcik7XG4gICAgdGxheWVyLnNldFZpc2liaWxpdHkodHJ1ZSk7XG5cbiAgICB2YXIgdG9vbHRpcENvbnRyb2wgPSBuZXcgT3BlbkxheWVycy5Db250cm9sLkhpZ2hsaWdodEZlYXR1cmUoW3RsYXllcl0se1xuICAgICAgICBkaXNwbGF5UG9wdXA6IHRydWUsXG4gICAgICAgIHBvcHVwT2Zmc2V0OiB7XG4gICAgICAgICAgICAnbGVmdCc6IDQ1LFxuICAgICAgICAgICAgJ3JpZ2h0JzogMCxcbiAgICAgICAgICAgICd0b3AnOiA1XG4gICAgICAgIH0sXG4gICAgICAgIHBvcHVwVGl0bGU6IFwiU3RhdGUgaW5mb3JtYXRpb25cIixcbiAgICAgICAgcG9wdXBTaXplOiBuZXcgT3BlbkxheWVycy5TaXplKDIwMCwzNzUpLFxuICAgICAgICBzdHlsZTp7XG4gICAgICAgICAgICBwb2ludFJhZGl1czogNixcbiAgICAgICAgICAgIHN0cm9rZUNvbG9yOiBcImN5YW5cIixcbiAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAzLFxuICAgICAgICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcbiAgICAgICAgICAgIGZpbGxPcGFjaXR5OiAwLjIsXG4gICAgICAgICAgICBmaWxsQ29sb3I6IFwidHJhbnNwYXJlbnRcIlxuICAgICAgICB9XG4gICAgfSk7XG4gICAgdG9vbHRpcENvbnRyb2wuYWRkSW5mb1BvcHVwID0gZnVuY3Rpb24oZmVhdHVyZSwgZXZ0KSB7XG4gICAgICAgIHZhciBsbmFtZSA9ICQoJyN0b29sdGlwLWxheWVyLWxpc3QnKS52YWwoKTsvL2ZlYXR1cmUubGF5ZXIubmFtZS5zcGxpdChcIkBcIilbMV07XG4gICAgICAgIHZhciBsY29uZmlnID0gbGl6TWFwLmNvbmZpZy5sYXllcnNbbG5hbWVdO1xuICAgICAgICBpZiggIShsbmFtZSBpbiBsaXpNYXAuY29uZmlnLmxheWVycykgKVxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdmFyIHRjb25maWcgPSBsaXpNYXAuY29uZmlnLnRvb2x0aXBMYXllcnNbbG5hbWVdO1xuICAgICAgICB2YXIgdGYgPSB0Y29uZmlnWydmaWVsZHMnXS50cmltKCk7XG4gICAgICAgIHZhciB0b29sdGlwRmllbGRzID0gdGYuc3BsaXQoL1tcXHMsXSsvKTtcbiAgICAgICAgdmFyIGhpZGRlbkZpZWxkcyA9IFtdO1xuICAgICAgICBpZiAoICdhdHRyaWJ1dGVMYXllcnMnIGluIGxpek1hcC5jb25maWcgJiYgbG5hbWUgaW4gbGl6TWFwLmNvbmZpZy5hdHRyaWJ1dGVMYXllcnMgKSB7XG4gICAgICAgICAgICB2YXIgYXR0Y29uZmlnID0gbGl6TWFwLmNvbmZpZy5hdHRyaWJ1dGVMYXllcnNbbG5hbWVdO1xuICAgICAgICAgICAgdmFyIGhmID0gYXR0Y29uZmlnWydoaWRkZW5GaWVsZHMnXS50cmltKCk7XG4gICAgICAgICAgICB2YXIgaGlkZGVuRmllbGRzID0gaGYuc3BsaXQoL1tcXHMsXSsvKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgY0FsaWFzZXMgPSBsY29uZmlnWydhbGlhcyddO1xuICAgICAgICB2YXIgaHRtbCA9ICc8ZGl2IGlkPVwidG9vbHRpcFBvcHVwQ29udGVudFwiPic7XG4gICAgICAgIGh0bWwrPSAnPHRhYmxlIGNsYXNzPVwibGl6bWFwUG9wdXBUYWJsZVwiPic7XG4gICAgICAgIGZvciAoYSBpbiBmZWF0dXJlLmF0dHJpYnV0ZXMpe1xuICAgICAgICAgICAgLy8gRG8gbm8gc2hvdyBoaWRkZW5maWVsZHNcbiAgICAgICAgICAgIGlmKCAoJC5pbkFycmF5KGEsIGhpZGRlbkZpZWxkcykgPiAtMSkgKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgLy8gc2hvdyBvbmx5IHRvb3RsaXAgZmllbGRzIGlmIHNvbWUgZmllbGRzIGdpdmVuXG4gICAgICAgICAgICBpZiggdGYgIT0gJycgJiYgISgkLmluQXJyYXkoYSwgdG9vbHRpcEZpZWxkcykgPiAtMSkgKVxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgaHRtbCs9ICc8dHI+PHRoPicgKyBjQWxpYXNlc1thXSArICc8L3RoPjx0ZD4nICsgZmVhdHVyZS5hdHRyaWJ1dGVzW2FdICsgJzwvdGQ+PC90cj4nO1xuICAgICAgICB9XG4gICAgICAgIGh0bWwrPSAnPC90YWJsZT4nO1xuICAgICAgICBodG1sKz0gJzwvZGl2Pic7XG5cbiAgICAgICAgdmFyIG9NYXBFeHRlbnQgPSB0aGlzLmxheWVyLm1hcC5nZXRFeHRlbnQoKTtcbiAgICAgICAgdmFyIG5SZXNvID0gdGhpcy5sYXllci5tYXAuZ2V0UmVzb2x1dGlvbigpO1xuXG4gICAgICAgIHZhciBvUG9wdXBQb3MgPSBuZXcgT3BlbkxheWVycy5Mb25MYXQob01hcEV4dGVudC5sZWZ0LG9NYXBFeHRlbnQudG9wKTtcbiAgICAgICAgb1BvcHVwUG9zLmxvbiArPSAoICQoJyNkb2NrJykud2lkdGgoKSArIHRoaXMucG9wdXBPZmZzZXQubGVmdCApICogblJlc287XG4gICAgICAgIHZhciB0cG9wdXAgPSBuZXcgT3BlbkxheWVycy5Qb3B1cC5BbmNob3JlZCgndG9vbHRpcFBvcHVwJyxcbiAgICAgICAgICAgIG9Qb3B1cFBvcyxcbiAgICAgICAgICAgIG51bGwsLy9uZXcgT3BlbkxheWVycy5TaXplKDI1MCwzMDApLFxuICAgICAgICAgICAgaHRtbCxcbiAgICAgICAgICAgIHtzaXplOiB7dzogMTQsIGg6IDE0fSwgb2Zmc2V0OiB7eDogLTcsIHk6IC03fX0sXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICApO1xuICAgICAgICB0cG9wdXAuYXV0b1NpemUgPSB0cnVlO1xuICAgICAgICB0cG9wdXAuYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcblxuICAgICAgICBmZWF0dXJlLnBvcHVwID0gdHBvcHVwO1xuICAgICAgICBsaXpNYXAubWFwLmFkZFBvcHVwKCB0cG9wdXAgKTtcbiAgICB9O1xuXG4gICAgbGl6TWFwLm1hcC5hZGRDb250cm9sKHRvb2x0aXBDb250cm9sKTtcbiAgICBjb250cm9sc1sndG9vbHRpcC1sYXllciddID0gdG9vbHRpcENvbnRyb2w7XG5cbiAgICAkKCcjdG9vbHRpcC1sYXllciBidXR0b24uYnRuLXRvb2x0aXAtbGF5ZXItY2xlYXInKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCgnI2J1dHRvbi10b29sdGlwLWxheWVyJykuY2xpY2soKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyN0b29sdGlwLWNhbmNlbCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgJCgnI3Rvb2x0aXAtbGF5ZXItbGlzdCcpLnZhbCgnJykuY2hhbmdlKCk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSk7XG4gICAgJCgnI3Rvb2x0aXAtbGF5ZXItbGlzdCcpLmNoYW5nZSggZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhTmFtZSA9ICQodGhpcykudmFsKCk7XG4gICAgICAgIHRvb2x0aXBDb250cm9sLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgdGxheWVyLmRlc3Ryb3lGZWF0dXJlcygpO1xuICAgICAgICBpZiAoIGFOYW1lID09ICcnIClcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgJCgnI3Rvb2x0aXAtbGF5ZXItbGlzdCcpLmFkZENsYXNzKCdsb2FkaW5nJykuYXR0cignZGlzYWJsZWQnLCcnKTtcblxuICAgICAgICAvLyBHZXQgc2VsZWN0ZWQgZmVhdHVyZXNcbiAgICAgICAgdmFyIHNlbGVjdGlvbkxheWVyID0gZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUoIGFOYW1lICk7XG5cbiAgICAgICAgaWYoICFzZWxlY3Rpb25MYXllciApXG4gICAgICAgICAgICBzZWxlY3Rpb25MYXllciA9IGFOYW1lO1xuICAgICAgICB2YXIgZmVhdHVyZWlkID0gZ2V0VmVjdG9yTGF5ZXJTZWxlY3Rpb25GZWF0dXJlSWRzU3RyaW5nKCBzZWxlY3Rpb25MYXllciApO1xuXG4gICAgICAgIGdldEZlYXR1cmVEYXRhKCBhTmFtZSwgbnVsbCwgZmVhdHVyZWlkLCBudWxsLCBmYWxzZSwgbnVsbCwgbnVsbCxcbiAgICAgICAgICAgIGZ1bmN0aW9uKGZOYW1lLCBmRmlsdGVyLCBmRmVhdHVyZXMsIGZBbGlhc2VzICl7XG4gICAgICAgICAgICAgIC8vIGdldCBsYXllciBuYW1lIGZvciBjb25maWdcbiAgICAgICAgICAgICAgaWYgKCAhKGZOYW1lIGluIGNvbmZpZy5sYXllcnMpICkge1xuICAgICAgICAgICAgICAgICAgdmFyIHFnaXNOYW1lID0gbGl6TWFwLmdldE5hbWVCeUNsZWFuTmFtZShhTmFtZSk7XG4gICAgICAgICAgICAgICAgICBpZiAoIHFnaXNOYW1lICYmIChxZ2lzTmFtZSBpbiBjb25maWcubGF5ZXJzKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGZOYW1lID0gcWdpc05hbWU7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRGZWF0dXJlRGF0YTogXCInK2ZOYW1lKydcIiBhbmQgXCInK3FnaXNOYW1lKydcIiBub3QgZm91bmQgaW4gY29uZmlnJyk7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdmFyIGxDb25maWcgPSBjb25maWcubGF5ZXJzW2ZOYW1lXTtcbiAgICAgICAgICAgICAgdmFyIHRjb25maWcgPSBjb25maWcudG9vbHRpcExheWVyc1tmTmFtZV07XG5cbiAgICAgICAgICAgICAgdmFyIGdGb3JtYXQgPSBuZXcgT3BlbkxheWVycy5Gb3JtYXQuR2VvSlNPTih7XG4gICAgICAgICAgICAgICAgICBleHRlcm5hbFByb2plY3Rpb246IGxDb25maWdbJ2ZlYXR1cmVDcnMnXSxcbiAgICAgICAgICAgICAgICAgIGludGVybmFsUHJvamVjdGlvbjogbGl6TWFwLm1hcC5nZXRQcm9qZWN0aW9uKClcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHZhciB0ZmVhdHVyZXMgPSBnRm9ybWF0LnJlYWQoIHtcbiAgICAgICAgICAgICAgICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgICAgICAgICAgICAgICBmZWF0dXJlczogZkZlYXR1cmVzXG4gICAgICAgICAgICAgIH0gKTtcbiAgICAgICAgICAgICAgdGxheWVyLmFkZEZlYXR1cmVzKCB0ZmVhdHVyZXMgKTtcblxuICAgICAgICAgICAgICBpZiAoICgnZGlzcGxheUdlb20nIGluIHRjb25maWcpICYmIHRjb25maWcuZGlzcGxheUdlb20gPT0gJ1RydWUnIClcbiAgICAgICAgICAgICAgICAgIGlmICggKCdjb2xvckdlb20nIGluIHRjb25maWcpICYmIHRjb25maWcuY29sb3JHZW9tICE9ICcnIClcbiAgICAgICAgICAgICAgICAgICAgICB0b29sdGlwQ29udHJvbC5zdHlsZS5zdHJva2VDb2xvciA9IHRjb25maWcuY29sb3JHZW9tO1xuICAgICAgICAgICAgICAgICAgZWxzZVxuICAgICAgICAgICAgICAgICAgICAgIHRvb2x0aXBDb250cm9sLnN0eWxlLnN0cm9rZUNvbG9yID0gJ2N5YW4nO1xuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICB0b29sdGlwQ29udHJvbC5zdHlsZS5zdHJva2VDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gICAgICAgICAgICAgIGlmICggdGZlYXR1cmVzLmxlbmd0aCAhPSAwICYmIHRmZWF0dXJlc1swXS5nZW9tZXRyeS5pZC5zdGFydHNXaXRoKCdPcGVuTGF5ZXJzX0dlb21ldHJ5X0xpbmVTdHJpbmcnKSApXG4gICAgICAgICAgICAgICAgICB0b29sdGlwQ29udHJvbC5zdHlsZS5zdHJva2VXaWR0aCA9IDEwO1xuICAgICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgICB0b29sdGlwQ29udHJvbC5zdHlsZS5zdHJva2VXaWR0aCA9IDM7XG4gICAgICAgICAgICAgIHRvb2x0aXBDb250cm9sLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICAgICQoJyN0b29sdGlwLWxheWVyLWxpc3QnKS5yZW1vdmVDbGFzcygnbG9hZGluZycpLnJlbW92ZUF0dHIoJ2Rpc2FibGVkJyk7XG5cbiAgICAgICAgfSk7XG4gICAgfSk7XG4gICAgJCgnI3Rvb2x0aXAtbGF5ZXItbGlzdCcpLnJlbW92ZUNsYXNzKCdsb2FkaW5nJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcblxuICAgIGxpek1hcC5ldmVudHMub24oe1xuICAgICAgICBtaW5pZG9ja29wZW5lZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCBlLmlkID09ICd0b29sdGlwLWxheWVyJyApIHtcbiAgICAgICAgICAgICAgLy8gTG9hZCBmaXJzdCBsYXllciBhdXRvbWF0aWNhbGx5XG4gICAgICAgICAgICAgICAgJCgnI3Rvb2x0aXAtbGF5ZXItbGlzdCcpLnZhbCgkKFwiI3Rvb2x0aXAtbGF5ZXItbGlzdCBvcHRpb246bnRoLWNoaWxkKDIpXCIpLnZhbCgpKS5jaGFuZ2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWluaWRvY2tjbG9zZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICggZS5pZCA9PSAndG9vbHRpcC1sYXllcicgKSB7XG4gICAgICAgICAgICAgIC8vIGRlYWN0aXZhdGUgdG9vbHRpcCBvbiBjbG9zZVxuICAgICAgICAgICAgICAkKCcjdG9vbHRpcC1sYXllci1saXN0JykudmFsKCcnKS5jaGFuZ2UoKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGdldExheWVyQ29uZmlnQnlJZCggYUxheWVySWQsIGFDb25mT2JqZXQsIGFJZEF0dHJpYnV0ZSApIHtcbiAgICAvLyBTZXQgZnVuY3Rpb24gcGFyYW1ldGVycyBpZiBub3QgZ2l2ZW5cbiAgICBhQ29uZk9iamV0ID0gdHlwZW9mIGFDb25mT2JqZXQgIT09ICd1bmRlZmluZWQnID8gIGFDb25mT2JqZXQgOiBjb25maWcubGF5ZXJzO1xuICAgIGFJZEF0dHJpYnV0ZSA9IHR5cGVvZiBhSWRBdHRyaWJ1dGUgIT09ICd1bmRlZmluZWQnID8gIGFJZEF0dHJpYnV0ZSA6ICdpZCc7XG5cbiAgICAvLyBMb29wIHRocm91Z2ggbGF5ZXJzIHRvIGdldCB0aGUgb25lIGJ5IGlkXG4gICAgZm9yICggdmFyIGx4IGluIGFDb25mT2JqZXQgKSB7XG4gICAgICAgIGlmICggYUNvbmZPYmpldFtseF1bYUlkQXR0cmlidXRlXSA9PSBhTGF5ZXJJZCApXG4gICAgICAgICAgICByZXR1cm4gW2x4LCBhQ29uZk9iamV0W2x4XSBdO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gYWRkTWVhc3VyZUNvbnRyb2xzKCkge1xuICAgIC8vIHN0eWxlIHRoZSBza2V0Y2ggZmFuY3lcbiAgICB2YXIgc2tldGNoU3ltYm9saXplcnMgPSB7XG4gICAgICBcIlBvaW50XCI6IHtcbiAgICAgICAgcG9pbnRSYWRpdXM6IDQsXG4gICAgICAgIGdyYXBoaWNOYW1lOiBcInNxdWFyZVwiLFxuICAgICAgICBmaWxsQ29sb3I6IFwid2hpdGVcIixcbiAgICAgICAgZmlsbE9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICBzdHJva2VPcGFjaXR5OiAxLFxuICAgICAgICBzdHJva2VDb2xvcjogXCIjMzMzMzMzXCJcbiAgICAgIH0sXG4gICAgICBcIkxpbmVcIjoge1xuICAgICAgICBzdHJva2VXaWR0aDogMyxcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogMSxcbiAgICAgICAgc3Ryb2tlQ29sb3I6IFwiIzY2NjY2NlwiLFxuICAgICAgICBzdHJva2VEYXNoc3R5bGU6IFwiZGFzaFwiXG4gICAgICB9LFxuICAgICAgXCJQb2x5Z29uXCI6IHtcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IDEsXG4gICAgICAgIHN0cm9rZUNvbG9yOiBcIiM2NjY2NjZcIixcbiAgICAgICAgc3Ryb2tlRGFzaHN0eWxlOiBcImRhc2hcIixcbiAgICAgICAgZmlsbENvbG9yOiBcIndoaXRlXCIsXG4gICAgICAgIGZpbGxPcGFjaXR5OiAwLjNcbiAgICAgIH1cbiAgICB9O1xuICAgIHZhciBzdHlsZSA9IG5ldyBPcGVuTGF5ZXJzLlN0eWxlKCk7XG4gICAgc3R5bGUuYWRkUnVsZXMoW1xuICAgICAgICBuZXcgT3BlbkxheWVycy5SdWxlKHtzeW1ib2xpemVyOiBza2V0Y2hTeW1ib2xpemVyc30pXG4gICAgICAgIF0pO1xuICAgIHZhciBzdHlsZU1hcCA9IG5ldyBPcGVuTGF5ZXJzLlN0eWxlTWFwKHtcImRlZmF1bHRcIjogc3R5bGV9KTtcblxuICAgIHZhciBtZWFzdXJlQ29udHJvbHMgPSB7XG4gICAgICBsZW5ndGg6IG5ldyBPcGVuTGF5ZXJzLkNvbnRyb2wuTWVhc3VyZShcbiAgICAgICAgT3BlbkxheWVycy5IYW5kbGVyLlBhdGgsIHtcbiAgICAgICAgICBwZXJzaXN0OiB0cnVlLFxuICAgICAgICAgIGdlb2Rlc2ljOiB0cnVlLFxuICAgICAgICAgIGltbWVkaWF0ZTogdHJ1ZSxcbiAgICAgICAgICBoYW5kbGVyT3B0aW9uczoge1xuICAgICAgICAgICAgbGF5ZXJPcHRpb25zOiB7XG4gICAgICAgICAgICAgIHN0eWxlTWFwOiBzdHlsZU1hcFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sXG4gICAgICAgICAgdHlwZTpPcGVuTGF5ZXJzLkNvbnRyb2wuVFlQRV9UT09MXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgICBhcmVhOiBuZXcgT3BlbkxheWVycy5Db250cm9sLk1lYXN1cmUoXG4gICAgICAgIE9wZW5MYXllcnMuSGFuZGxlci5Qb2x5Z29uLCB7XG4gICAgICAgICAgcGVyc2lzdDogdHJ1ZSxcbiAgICAgICAgICBnZW9kZXNpYzogdHJ1ZSxcbiAgICAgICAgICBpbW1lZGlhdGU6IHRydWUsXG4gICAgICAgICAgaGFuZGxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgIGxheWVyT3B0aW9uczoge1xuICAgICAgICAgICAgICBzdHlsZU1hcDogc3R5bGVNYXBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHR5cGU6T3BlbkxheWVycy5Db250cm9sLlRZUEVfVE9PTFxuICAgICAgICB9XG4gICAgICApLFxuICAgICAgcGVyaW1ldGVyOiBuZXcgT3BlbkxheWVycy5Db250cm9sLk1lYXN1cmUoXG4gICAgICAgIE9wZW5MYXllcnMuSGFuZGxlci5Qb2x5Z29uLCB7XG4gICAgICAgICAgcGVyc2lzdDogdHJ1ZSxcbiAgICAgICAgICBnZW9kZXNpYzogdHJ1ZSxcbiAgICAgICAgICBpbW1lZGlhdGU6IHRydWUsXG4gICAgICAgICAgaGFuZGxlck9wdGlvbnM6IHtcbiAgICAgICAgICAgIGxheWVyT3B0aW9uczoge1xuICAgICAgICAgICAgICBzdHlsZU1hcDogc3R5bGVNYXBcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHR5cGU6T3BlbkxheWVycy5Db250cm9sLlRZUEVfVE9PTFxuICAgICAgICB9XG4gICAgICApXG4gICAgfTtcbiAgICBtZWFzdXJlQ29udHJvbHMubGVuZ3RoLmV2ZW50cy5vbih7XG4gICAgICBhY3RpdmF0ZTogZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIG1BZGRNZXNzYWdlKGxpekRpY3RbJ21lYXN1cmUuYWN0aXZhdGUubGVuZ3RoJ10sJ2luZm8nLHRydWUpLmF0dHIoJ2lkJywnbGl6bWFwLW1lYXN1cmUtbWVzc2FnZScpO1xuICAgICAgfSxcbiAgICAgIGRlYWN0aXZhdGU6IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICAkKCcjbGl6bWFwLW1lYXN1cmUtbWVzc2FnZScpLnJlbW92ZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIG1lYXN1cmVDb250cm9scy5hcmVhLmV2ZW50cy5vbih7XG4gICAgICBhY3RpdmF0ZTogZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIG1BZGRNZXNzYWdlKGxpekRpY3RbJ21lYXN1cmUuYWN0aXZhdGUuYXJlYSddLCdpbmZvJyx0cnVlKS5hdHRyKCdpZCcsJ2xpem1hcC1tZWFzdXJlLW1lc3NhZ2UnKTtcbiAgICAgIH0sXG4gICAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgJCgnI2xpem1hcC1tZWFzdXJlLW1lc3NhZ2UnKS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBtZWFzdXJlQ29udHJvbHMucGVyaW1ldGVyLm1lYXN1cmUgPSBmdW5jdGlvbihnZW9tZXRyeSwgZXZlbnRUeXBlKSB7XG4gICAgICAgIHZhciBzdGF0LCBvcmRlcjtcbiAgICAgICAgaWYoIE9wZW5MYXllcnMuVXRpbC5pbmRleE9mKCBnZW9tZXRyeS5DTEFTU19OQU1FLCAnTGluZVN0cmluZycgKSA+IC0xKSB7XG4gICAgICAgICAgICBzdGF0ID0gdGhpcy5nZXRCZXN0TGVuZ3RoKGdlb21ldHJ5KTtcbiAgICAgICAgICAgIG9yZGVyID0gMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN0YXQgPSB0aGlzLmdldEJlc3RMZW5ndGgoZ2VvbWV0cnkuY29tcG9uZW50c1swXSk7XG4gICAgICAgICAgICBvcmRlciA9IDE7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5ldmVudHMudHJpZ2dlckV2ZW50KGV2ZW50VHlwZSwge1xuICAgICAgICAgICAgbWVhc3VyZTogc3RhdFswXSxcbiAgICAgICAgICAgIHVuaXRzOiBzdGF0WzFdLFxuICAgICAgICAgICAgb3JkZXI6IG9yZGVyLFxuICAgICAgICAgICAgZ2VvbWV0cnk6IGdlb21ldHJ5XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgbWVhc3VyZUNvbnRyb2xzLnBlcmltZXRlci5ldmVudHMub24oe1xuICAgICAgYWN0aXZhdGU6IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICBtQWRkTWVzc2FnZShsaXpEaWN0WydtZWFzdXJlLmFjdGl2YXRlLnBlcmltZXRlciddLCdpbmZvJyx0cnVlKS5hdHRyKCdpZCcsJ2xpem1hcC1tZWFzdXJlLW1lc3NhZ2UnKTtcbiAgICAgIH0sXG4gICAgICBkZWFjdGl2YXRlOiBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgJCgnI2xpem1hcC1tZWFzdXJlLW1lc3NhZ2UnKS5yZW1vdmUoKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGhhbmRsZU1lYXN1cmVtZW50cyhldnQpIHtcbiAgICAgIHZhciBnZW9tZXRyeSA9IGV2dC5nZW9tZXRyeTtcbiAgICAgIHZhciB1bml0cyA9IGV2dC51bml0cztcbiAgICAgIHZhciBvcmRlciA9IGV2dC5vcmRlcjtcbiAgICAgIHZhciBtZWFzdXJlID0gZXZ0Lm1lYXN1cmU7XG4gICAgICB2YXIgb3V0ID0gXCJcIjtcbiAgICAgIGlmKG9yZGVyID09IDEpIHtcbiAgICAgICAgb3V0ICs9IGxpekRpY3RbJ21lYXN1cmUuaGFuZGxlJ10rXCIgXCIgKyBtZWFzdXJlLnRvRml4ZWQoMykgKyBcIiBcIiArIHVuaXRzO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3V0ICs9IGxpekRpY3RbJ21lYXN1cmUuaGFuZGxlJ10rXCIgXCIgKyBtZWFzdXJlLnRvRml4ZWQoMykgKyBcIiBcIiArIHVuaXRzICsgXCI8c3VwPjI8L1wiICsgXCJzdXA+XCI7XG4gICAgICB9XG4gICAgICB2YXIgZWxlbWVudCA9ICQoJyNsaXptYXAtbWVhc3VyZS1tZXNzYWdlJyk7XG4gICAgICBpZiAoIGVsZW1lbnQubGVuZ3RoID09IDAgKSB7XG4gICAgICAgIGVsZW1lbnQgPSBtQWRkTWVzc2FnZShvdXQpO1xuICAgICAgICBlbGVtZW50LmF0dHIoJ2lkJywnbGl6bWFwLW1lYXN1cmUtbWVzc2FnZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWxlbWVudC5odG1sKCc8cD4nK291dCsnPC9wPicpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IodmFyIGtleSBpbiBtZWFzdXJlQ29udHJvbHMpIHtcbiAgICAgIHZhciBjb250cm9sID0gbWVhc3VyZUNvbnRyb2xzW2tleV07XG4gICAgICBjb250cm9sLmV2ZW50cy5vbih7XG4gICAgICAgIFwibWVhc3VyZVwiOiBoYW5kbGVNZWFzdXJlbWVudHMsXG4gICAgICAgIFwibWVhc3VyZXBhcnRpYWxcIjogaGFuZGxlTWVhc3VyZW1lbnRzLFxuICAgICAgICBcImFjdGl2YXRlXCI6IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG1hcC5hZGRDb250cm9sKGNvbnRyb2wpO1xuICAgICAgY29udHJvbHNba2V5KydNZWFzdXJlJ10gPSBjb250cm9sO1xuICAgIH1cbiAgICAkKCcjbWVhc3VyZS10eXBlJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgIHNlbGYuZmluZCgnb3B0aW9uJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSAkKCB0aGlzICkuYXR0cigndmFsdWUnKTtcbiAgICAgICAgICAgIGlmICggdmFsIGluIG1lYXN1cmVDb250cm9scyAmJiBtZWFzdXJlQ29udHJvbHNbdmFsXS5hY3RpdmUgKVxuICAgICAgICAgICAgICBtZWFzdXJlQ29udHJvbHNbdmFsXS5kZWFjdGl2YXRlKCk7XG4gICAgICAgIH0pO1xuICAgICAgICBtZWFzdXJlQ29udHJvbHNbc2VsZi52YWwoKV0uYWN0aXZhdGUoKTtcbiAgICB9KTtcbiAgICBsaXpNYXAuZXZlbnRzLm9uKHtcbiAgICAgICAgbWluaWRvY2tvcGVuZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICggZS5pZCA9PSAnbWVhc3VyZScgKSB7XG4gICAgICAgICAgICAgICAgJCgnI21lYXN1cmUtdHlwZScpLmNoYW5nZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtaW5pZG9ja2Nsb3NlZDogZnVuY3Rpb24oZSkge1xuICAgICAgICAgICAgaWYgKCBlLmlkID09ICdtZWFzdXJlJyApIHtcbiAgICAgICAgICAgICAgICB2YXIgYWN0aXZlQ3RybCA9ICcnO1xuICAgICAgICAgICAgICAgICQoJyNtZWFzdXJlLXR5cGUgb3B0aW9uJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHZhbCA9ICQoIHRoaXMgKS5hdHRyKCd2YWx1ZScpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHZhbCBpbiBtZWFzdXJlQ29udHJvbHMgJiYgbWVhc3VyZUNvbnRyb2xzW3ZhbF0uYWN0aXZlIClcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZUN0cmwgPSB2YWw7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgaWYgKCBhY3RpdmVDdHJsICE9ICcnIClcbiAgICAgICAgICAgICAgICAgICAgbWVhc3VyZUNvbnRyb2xzW2FjdGl2ZUN0cmxdLmRlYWN0aXZhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pO1xuXG5cbiAgICAkKCcjbWVhc3VyZS1zdG9wJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgICQoJyNidXR0b24tbWVhc3VyZScpLmNsaWNrKCk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWVhc3VyZUNvbnRyb2xzO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkR2VvbG9jYXRpb25Db250cm9sKCkge1xuICAgIHZhciBzdHlsZSA9IHtcbiAgICAgIGZpbGxDb2xvcjogJyMwMzk1RDYnLFxuICAgICAgZmlsbE9wYWNpdHk6IDAuMSxcbiAgICAgIHN0cm9rZUNvbG9yOiAnIzAzOTVENicsXG4gICAgICBzdHJva2VXaWR0aDogMVxuICAgIH07XG4gICAgdmFyIHZlY3RvciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLlZlY3RvcignZ2VvbG9jYXRpb24nKTtcbiAgICBtYXAuYWRkTGF5ZXIodmVjdG9yKTtcbiAgICB2YXIgZ2VvbG9jYXRlID0gbmV3IE9wZW5MYXllcnMuQ29udHJvbC5HZW9sb2NhdGUoe1xuICAgICAgdHlwZTogT3BlbkxheWVycy5Db250cm9sLlRZUEVfVE9HR0xFLFxuICAgICAgYmluZDogZmFsc2UsXG4gICAgICB3YXRjaDogdHJ1ZSxcbiAgICAgIGxheWVyOiB2ZWN0b3IsXG4gICAgICBnZW9sb2NhdGlvbk9wdGlvbnM6IHtcbiAgICAgICAgZW5hYmxlSGlnaEFjY3VyYWN5OiB0cnVlLFxuICAgICAgICBtYXhpbXVtQWdlOiA1MDAwLFxuICAgICAgICB0aW1lb3V0OiAzMDAwMFxuICAgICAgfVxuICAgIH0pO1xuICAgIG1hcC5hZGRDb250cm9sKGdlb2xvY2F0ZSk7XG4gICAgdmFyIGZpcnN0R2VvbG9jYXRpb24gPSB0cnVlO1xuICAgIGdlb2xvY2F0ZS5ldmVudHMub24oe1xuICAgICAgXCJsb2NhdGlvbnVwZGF0ZWRcIjogZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgIGlmICggdGhpcy5sYXllci5mZWF0dXJlcy5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgICAgIHZhciBjaXJjbGUgPSBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvcihcbiAgICAgICAgICAgICAgT3BlbkxheWVycy5HZW9tZXRyeS5Qb2x5Z29uLmNyZWF0ZVJlZ3VsYXJQb2x5Z29uKFxuICAgICAgICAgICAgICAgIGV2dC5wb2ludC5jbG9uZSgpLFxuICAgICAgICAgICAgICAgIGV2dC5wb3NpdGlvbi5jb29yZHMuYWNjdXJhY3kvMixcbiAgICAgICAgICAgICAgICA0MCxcbiAgICAgICAgICAgICAgICAwXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIHt9LFxuICAgICAgICAgICAgICBzdHlsZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMubGF5ZXIuYWRkRmVhdHVyZXMoW1xuICAgICAgICAgICAgICBuZXcgT3BlbkxheWVycy5GZWF0dXJlLlZlY3RvcihcbiAgICAgICAgICAgICAgICBldnQucG9pbnQsXG4gICAgICAgICAgICAgICAge30sXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgZ3JhcGhpY05hbWU6ICdjaXJjbGUnLFxuICAgICAgICAgICAgICAgICAgc3Ryb2tlQ29sb3I6ICcjMDM5NUQ2JyxcbiAgICAgICAgICAgICAgICAgIHN0cm9rZVdpZHRoOiAxLFxuICAgICAgICAgICAgICAgICAgZmlsbE9wYWNpdHk6IDEsXG4gICAgICAgICAgICAgICAgICBmaWxsQ29sb3I6ICcjMDM5NUQ2JyxcbiAgICAgICAgICAgICAgICAgIHBvaW50UmFkaXVzOiAzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBjaXJjbGVcbiAgICAgICAgICAgIF0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIHBvaW50ID0gdGhpcy5sYXllci5mZWF0dXJlc1swXTtcbiAgICAgICAgICAgIHBvaW50Lmdlb21ldHJ5LnggPSBldnQucG9pbnQueDtcbiAgICAgICAgICAgIHBvaW50Lmdlb21ldHJ5LnkgPSBldnQucG9pbnQueTtcbiAgICAgICAgICAgIHBvaW50Lmdlb21ldHJ5LmNsZWFyQm91bmRzKCk7XG4gICAgICAgICAgICB0aGlzLmxheWVyLmRyYXdGZWF0dXJlKHBvaW50KTtcbiAgICAgICAgICAgIHZhciBjaXJjbGUgPSB0aGlzLmxheWVyLmZlYXR1cmVzWzFdO1xuICAgICAgICAgICAgdGhpcy5sYXllci5kZXN0cm95RmVhdHVyZXMoW2NpcmNsZV0pO1xuICAgICAgICAgICAgY2lyY2xlID0gbmV3IE9wZW5MYXllcnMuRmVhdHVyZS5WZWN0b3IoXG4gICAgICAgICAgICAgIE9wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbi5jcmVhdGVSZWd1bGFyUG9seWdvbihcbiAgICAgICAgICAgICAgICBldnQucG9pbnQuY2xvbmUoKSxcbiAgICAgICAgICAgICAgICBldnQucG9zaXRpb24uY29vcmRzLmFjY3VyYWN5LzIsXG4gICAgICAgICAgICAgICAgNDAsXG4gICAgICAgICAgICAgICAgMFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgc3R5bGVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLmxheWVyLmFkZEZlYXR1cmVzKFtjaXJjbGVdKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZmlyc3RHZW9sb2NhdGlvbikge1xuICAgICAgICAgIG1hcC56b29tVG9FeHRlbnQodmVjdG9yLmdldERhdGFFeHRlbnQoKSk7XG4gICAgICAgICAgZmlyc3RHZW9sb2NhdGlvbiA9IGZhbHNlO1xuICAgICAgICAgIGlmICggJCgnI2dlb2xvY2F0ZS1tZW51LWJpbmQnKS5oYXNDbGFzcygnYWN0aXZlJykgKVxuICAgICAgICAgICAgdGhpcy5iaW5kID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICAkKCcjZ2VvbG9jYXRpb24gLmJ1dHRvbi1iYXIgYnV0dG9uJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgIH0sXG4gICAgICBcImxvY2F0aW9uZmFpbGVkXCI6IGZ1bmN0aW9uKGV2dCkge1xuICAgICAgICBpZiAoIHRoaXMubGF5ZXIuZmVhdHVyZXMubGVuZ3RoID09IDAgJiYgJCgnI2dlb2xvY2F0aW9uLWxvY2F0aW9uZmFpbGVkJykubGVuZ3RoICE9IDApXG4gICAgICAgICAgbUFkZE1lc3NhZ2UoJzxzcGFuIGlkPVwiZ2VvbG9jYXRpb24tbG9jYXRpb25mYWlsZWRcIj4nK2xpekRpY3RbJ2dlb2xvY2F0aW9uLmZhaWxlZCddKyc8L3NwYW4+JywnZXJyb3InLHRydWUpO1xuICAgICAgfSxcbiAgICAgIFwiYWN0aXZhdGVcIjogZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgJCgnI2dlb2xvY2F0aW9uLXN0b3AnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpO1xuICAgICAgfSxcbiAgICAgIFwiZGVhY3RpdmF0ZVwiOiBmdW5jdGlvbihldnQpIHtcbiAgICAgICAgZmlyc3RHZW9sb2NhdGlvbiA9IHRydWU7XG4gICAgICAgIHRoaXMuYmluZCA9IGZhbHNlO1xuICAgICAgICAkKCcjZ2VvbG9jYXRpb24gLmJ1dHRvbi1iYXIgYnV0dG9uJykuYXR0cignZGlzYWJsZWQnLCdkaXNhYmxlZCcpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgdGhpcy5sYXllci5kZXN0cm95RmVhdHVyZXMoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb250cm9sc1snZ2VvbG9jYXRpb24nXSA9IGdlb2xvY2F0ZTtcbiAgICBsaXpNYXAuZXZlbnRzLm9uKHtcbiAgICAgICAgbWluaWRvY2tvcGVuZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICggZS5pZCA9PSAnZ2VvbG9jYXRpb24nICkge1xuICAgICAgICAgICAgICAgIGlmICghZ2VvbG9jYXRlLmFjdGl2ZSlcbiAgICAgICAgICAgICAgICAgICAgZ2VvbG9jYXRlLmFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG5cbiAgICAgICAgbWluaWRvY2tjbG9zZWQ6IGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGlmICggZS5pZCA9PSAnZ2VvbG9jYXRpb24nICkge1xuICAgICAgICAgICAgICAgIGlmIChnZW9sb2NhdGUuYWN0aXZlICYmIHZlY3Rvci5mZWF0dXJlcy5sZW5ndGggPT0gMCApXG4gICAgICAgICAgICAgICAgICAgIGdlb2xvY2F0ZS5kZWFjdGl2YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICAkKCcjZ2VvbG9jYXRpb24tY2VudGVyJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgIGlmICggIWdlb2xvY2F0ZS5hY3RpdmUgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG5cbiAgICAgIGlmICh2ZWN0b3IuZmVhdHVyZXMubGVuZ3RoICE9IDAgKVxuICAgICAgICBtYXAuc2V0Q2VudGVyKHZlY3Rvci5nZXREYXRhRXh0ZW50KCkuZ2V0Q2VudGVyTG9uTGF0KCkpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgICQoJyNnZW9sb2NhdGlvbi1iaW5kJykuY2xpY2soZnVuY3Rpb24oKXtcbiAgICAgIGlmICggIWdlb2xvY2F0ZS5hY3RpdmUgKVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICBpZiAoIHNlbGYuaGFzQ2xhc3MoJ2FjdGl2ZScpICkge1xuICAgICAgICAkKCcjZ2VvbG9jYXRpb24tY2VudGVyJykucmVtb3ZlQXR0cignZGlzYWJsZWQnKTtcbiAgICAgICAgc2VsZi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIGdlb2xvY2F0ZS5iaW5kID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWxmLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgJCgnI2dlb2xvY2F0aW9uLWNlbnRlcicpLmF0dHIoJ2Rpc2FibGVkJywnZGlzYWJsZWQnKTtcbiAgICAgICAgZ2VvbG9jYXRlLmJpbmQgPSB0cnVlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0pO1xuICAgIGZ1bmN0aW9uIHN0b3BHZW9sb2NhdGlvbigpe1xuICAgICAgaWYgKCBnZW9sb2NhdGUuYWN0aXZlIClcbiAgICAgICAgZ2VvbG9jYXRlLmRlYWN0aXZhdGUoKTtcbiAgICAgICQoJyNidXR0b24tZ2VvbG9jYXRpb24nKS5jbGljaygpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICAkKCcjZ2VvbG9jYXRpb24tc3RvcCcpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICBzdG9wR2VvbG9jYXRpb24oKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgICAkKCcjZ2VvbG9jYXRpb24gYnV0dG9uLmJ0bi1nZW9sb2NhdGlvbi1jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAkKCcjYnV0dG9uLWdlb2xvY2F0aW9uJykuY2xpY2soKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBwYXJzZURhdGFcbiAgICogcGFyc2luZyBjYXBhYmlsaXR5XG4gICAqXG4gICAqIFBhcmFtZXRlcnM6XG4gICAqIGFEYXRhIC0ge1N0cmluZ30gdGhlIFdNUyBjYXBhYmlsaXRpZXNcbiAgICpcbiAgICogUmV0dXJuczpcbiAgICoge0Jvb2xlYW59IHRoZSBjYXBhYmlsaXR5IGlzIE9LXG4gICAqL1xuICBmdW5jdGlvbiBwYXJzZURhdGEoYURhdGEpIHtcbiAgICB2YXIgZm9ybWF0ID0gIG5ldyBPcGVuTGF5ZXJzLkZvcm1hdC5XTVNDYXBhYmlsaXRpZXMoe3ZlcnNpb246JzEuMy4wJ30pO1xuICAgIHZhciBodG1sID0gXCJcIjtcbiAgICBjYXBhYmlsaXRpZXMgPSBmb3JtYXQucmVhZChhRGF0YSk7XG5cbiAgICB2YXIgZm9ybWF0ID0gbmV3IE9wZW5MYXllcnMuRm9ybWF0LlhNTCgpO1xuICAgIGNvbXBvc2VycyA9IGZvcm1hdC5yZWFkKGFEYXRhKS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnQ29tcG9zZXJUZW1wbGF0ZScpO1xuXG4gICAgdmFyIGNhcGFiaWxpdHkgPSBjYXBhYmlsaXRpZXMuY2FwYWJpbGl0eTtcbiAgICBpZiAoIWNhcGFiaWxpdHkpIHtcbiAgICAgICQoJyNtYXAnKS5odG1sKCdTRVJWSUNFIE5PTiBESVNQT05JQkxFIScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBsb2FkUHJvakRlZmluaXRpb25cbiAgICogbG9hZCBDUlMgZGVmaW5pdGlvbiBhbmQgYWN0aXZhdGUgaXRcbiAgICpcbiAgICogUGFyYW1ldGVyczpcbiAgICogYUNSUyAtIHtTdHJpbmd9XG4gICAqIGFDYWxsYmFsY2sgLSB7ZnVuY3Rpb24gKCBwcm9qICl9XG4gICAqXG4gICAqL1xuICBmdW5jdGlvbiBsb2FkUHJvakRlZmluaXRpb24oIGFDUlMsIGFDYWxsYmFjayApIHtcbiAgICB2YXIgcHJvaiA9IGFDUlMucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpOyAvLyB0cmltKCk7XG4gICAgaWYgKCBwcm9qIGluIFByb2o0anMuZGVmcyApIHtcbiAgICAgIGFDYWxsYmFjayggcHJvaiApO1xuICAgIH0gZWxzZSB7XG4gICAgICAkLmdldCggT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChcbiAgICAgICAgICBsaXpVcmxzLndtc1xuICAgICAgICAgICxPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVyU3RyaW5nKGxpelVybHMucGFyYW1zKVxuICAgICAgICApLCB7XG4gICAgICAgICAgJ1JFUVVFU1QnOidHZXRQcm9qNCdcbiAgICAgICAgICwnYXV0aGlkJzogcHJvalxuICAgICAgICB9LCBmdW5jdGlvbiAoIGFUZXh0ICkge1xuICAgICAgICAgIFByb2o0anMuZGVmc1twcm9qXSA9IGFUZXh0O1xuICAgICAgICAgIG5ldyBPcGVuTGF5ZXJzLlByb2plY3Rpb24ocHJvaik7XG4gICAgICAgICAgYUNhbGxiYWNrKCBwcm9qICk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFBSSVZBVEUgZnVuY3Rpb246IG1DaGVja01vYmlsZVxuICAgKiBDaGVjayB3ZXRoZXIgaW4gbW9iaWxlIGNvbnRleHQuXG4gICAqXG4gICAqXG4gICAqIFJldHVybnM6XG4gICAqIHtCb29sZWFufSBUcnVlIGlmIGluIG1vYmlsZSBjb250ZXh0LlxuICAgKi9cbiAgZnVuY3Rpb24gbUNoZWNrTW9iaWxlKCkge1xuICAgIHZhciBtaW5NYXBTaXplID0gNDUwO1xuICAgIHZhciB3ID0gJCgnYm9keScpLnBhcmVudCgpWzBdLm9mZnNldFdpZHRoO1xuICAgIHZhciBsZWZ0VyA9IHcgLSBtaW5NYXBTaXplO1xuICAgIGlmKGxlZnRXIDwgbWluTWFwU2l6ZSB8fCB3IDwgbWluTWFwU2l6ZSlcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBtQWRkTWVzc2FnZVxuICAgKiBXcml0ZSBtZXNzYWdlIHRvIHRoZSBVSVxuICAgKlxuICAgKlxuICAgKiBSZXR1cm5zOlxuICAgKiB7alF1ZXJ5IE9iamVjdH0gVGhlIG1lc3NhZ2UgYWRkZWQuXG4gICAqL1xuICBmdW5jdGlvbiBtQWRkTWVzc2FnZSggYU1lc3NhZ2UsIGFUeXBlLCBhQ2xvc2UgKSB7XG4gICAgdmFyIG1UeXBlID0gJ2luZm8nO1xuICAgIHZhciBtVHlwZUxpc3QgPSBbJ2luZm8nLCAnZXJyb3InLCAnc3VjY2VzcyddO1xuICAgIHZhciBtQ2xvc2UgPSBmYWxzZTtcblxuICAgIGlmICggJC5pbkFycmF5KGFUeXBlLCBtVHlwZUxpc3QpICE9IC0xIClcbiAgICAgIG1UeXBlID0gYVR5cGU7XG5cbiAgICBpZiAoIGFDbG9zZSApXG4gICAgICBtQ2xvc2UgPSB0cnVlO1xuXG4gICAgdmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cImFsZXJ0IGFsZXJ0LWJsb2NrIGFsZXJ0LScrbVR5cGUrJyBmYWRlIGluXCIgZGF0YS1hbGVydD1cImFsZXJ0XCI+JztcbiAgICBpZiAoIG1DbG9zZSApXG4gICAgICBodG1sICs9ICc8YSBjbGFzcz1cImNsb3NlXCIgZGF0YS1kaXNtaXNzPVwiYWxlcnRcIiBocmVmPVwiI1wiPsOXPC9hPic7XG4gICAgaHRtbCArPSAnPHA+JythTWVzc2FnZSsnPC9wPic7XG4gICAgaHRtbCArPSAnPC9kaXY+JztcblxuICAgIHZhciBlbHQgPSAkKGh0bWwpO1xuICAgICQoJyNtZXNzYWdlJykuYXBwZW5kKGVsdCk7XG4gICAgcmV0dXJuIGVsdDtcbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBleHBvcnRWZWN0b3JMYXllclxuICAgKiBXcml0ZSBtZXNzYWdlIHRvIHRoZSBVSVxuICAgKlxuICAgKlxuICAgKiBSZXR1cm5zOlxuICAgKiB7alF1ZXJ5IE9iamVjdH0gVGhlIG1lc3NhZ2UgYWRkZWQuXG4gICAqL1xuICBmdW5jdGlvbiBleHBvcnRWZWN0b3JMYXllciggYU5hbWUsIGVmb3JtYXQsIHJlc3RyaWN0VG9NYXBFeHRlbnQgKSB7XG5cbiAgICAgIHJlc3RyaWN0VG9NYXBFeHRlbnQgPSB0eXBlb2YgcmVzdHJpY3RUb01hcEV4dGVudCAhPT0gJ3VuZGVmaW5lZCcgPyAgcmVzdHJpY3RUb01hcEV4dGVudCA6IG51bGw7XG5cbiAgICAgIC8vIHJpZ2h0IG5vdCBzZXRcbiAgICAgIGlmICggISgnZXhwb3J0TGF5ZXJzJyBpbiBsaXpNYXAuY29uZmlnLm9wdGlvbnMpIHx8IGxpek1hcC5jb25maWcub3B0aW9ucy5leHBvcnRMYXllcnMgIT0gJ1RydWUnICkge1xuICAgICAgICBtQWRkTWVzc2FnZShsaXpEaWN0WydsYXllci5leHBvcnQucmlnaHQucmVxdWlyZWQnXSwnZXJyb3InLHRydWUpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIC8vIFNldCBmdW5jdGlvbiBwYXJhbWV0ZXJzIGlmIG5vdCBnaXZlblxuICAgICAgZWZvcm1hdCA9IHR5cGVvZiBlZm9ybWF0ICE9PSAndW5kZWZpbmVkJyA/ICBlZm9ybWF0IDogJ0dlb0pTT04nO1xuXG4gICAgICAvLyBHZXQgc2VsZWN0ZWQgZmVhdHVyZXNcbiAgICAgIHZhciBjbGVhbk5hbWUgPSBsaXpNYXAuY2xlYW5OYW1lKCBhTmFtZSApO1xuICAgICAgdmFyIHNlbGVjdGlvbkxheWVyID0gZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUoIGNsZWFuTmFtZSApO1xuXG4gICAgICBpZiggIXNlbGVjdGlvbkxheWVyIClcbiAgICAgICAgc2VsZWN0aW9uTGF5ZXIgPSBhTmFtZTtcblxuICAgICAgdmFyIGZlYXR1cmVpZCA9IGdldFZlY3RvckxheWVyU2VsZWN0aW9uRmVhdHVyZUlkc1N0cmluZyggc2VsZWN0aW9uTGF5ZXIgKTtcblxuICAgICAgLy8gR2V0IFdGUyB1cmwgYW5kIG9wdGlvbnNcbiAgICAgIHZhciBnZXRGZWF0dXJlVXJsRGF0YSA9IGdldFZlY3RvckxheWVyV2ZzVXJsKCBhTmFtZSwgbnVsbCwgZmVhdHVyZWlkLCBudWxsLCByZXN0cmljdFRvTWFwRXh0ZW50ICk7XG5cbiAgICAgIC8vIEZvcmNlIGRvd25sb2FkXG4gICAgICBnZXRGZWF0dXJlVXJsRGF0YVsnb3B0aW9ucyddWydkbCddID0gMTtcblxuICAgICAgLy8gU2V0IGV4cG9ydCBmb3JtYXRcbiAgICAgIGdldEZlYXR1cmVVcmxEYXRhWydvcHRpb25zJ11bJ09VVFBVVEZPUk1BVCddID0gZWZvcm1hdDtcblxuICAgICAgLy8gQnVpbGQgV0ZTIHVybFxuICAgICAgdmFyIGV4cG9ydFVybCA9IE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQoXG4gICAgICAgICAgZ2V0RmVhdHVyZVVybERhdGFbJ3VybCddLFxuICAgICAgICAgIE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcoIGdldEZlYXR1cmVVcmxEYXRhWydvcHRpb25zJ10gKVxuICAgICAgKTtcblxuICAgICAgLy8gT3BlbiBpbiBuZXcgd2luZG93XG4gICAgICB3aW5kb3cub3BlbiggZXhwb3J0VXJsICk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRWZWN0b3JMYXllclNlbGVjdGlvbkZlYXR1cmVJZHNTdHJpbmcoIGFOYW1lICkge1xuICAgICAgdmFyIGZlYXR1cmVpZFBhcmFtZXRlciA9ICcnO1xuICAgICAgaWYoIGFOYW1lIGluIGNvbmZpZy5sYXllcnMgJiYgY29uZmlnLmxheWVyc1thTmFtZV1bJ3NlbGVjdGVkRmVhdHVyZXMnXSApe1xuICAgICAgICAgIHZhciBmaWRzID0gW107XG5cbiAgICAgICAgICAvLyBHZXQgV0ZTIHR5cGVuYW1lXG4gICAgICAgICAgdmFyIGNvbmZpZ0xheWVyID0gY29uZmlnLmxheWVyc1thTmFtZV07XG4gICAgICAgICAgdmFyIHR5cGVOYW1lID0gYU5hbWUuc3BsaXQoJyAnKS5qb2luKCdfJyk7XG4gICAgICAgICAgaWYgKCAnc2hvcnRuYW1lJyBpbiBjb25maWdMYXllciAmJiBjb25maWdMYXllci5zaG9ydG5hbWUgIT0gJycgKVxuICAgICAgICAgICAgICB0eXBlTmFtZSA9IGNvbmZpZ0xheWVyLnNob3J0bmFtZTtcblxuICAgICAgICAgIGZvciggdmFyIGlkIGluIGNvbmZpZ0xheWVyWydzZWxlY3RlZEZlYXR1cmVzJ10gKSB7XG4gICAgICAgICAgICAgIGZpZHMucHVzaCggdHlwZU5hbWUgKyAnLicgKyBjb25maWdMYXllclsnc2VsZWN0ZWRGZWF0dXJlcyddW2lkXSApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiggZmlkcy5sZW5ndGggKVxuICAgICAgICAgICAgICBmZWF0dXJlaWRQYXJhbWV0ZXIgPSBmaWRzLmpvaW4oKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZlYXR1cmVpZFBhcmFtZXRlcjtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldFZlY3RvckxheWVyV2ZzVXJsKCBhTmFtZSwgYUZpbHRlciwgYUZlYXR1cmVJZCwgZ2VvbWV0cnlOYW1lLCByZXN0cmljdFRvTWFwRXh0ZW50LCBzdGFydEluZGV4LCBtYXhGZWF0dXJlcyApIHtcbiAgICAgIHZhciBnZXRGZWF0dXJlVXJsRGF0YSA9IHt9O1xuXG4gICAgICAvLyBTZXQgZnVuY3Rpb24gcGFyYW1ldGVycyBpZiBub3QgZ2l2ZW5cbiAgICAgIGFGaWx0ZXIgPSB0eXBlb2YgYUZpbHRlciAhPT0gJ3VuZGVmaW5lZCcgPyAgYUZpbHRlciA6IG51bGw7XG4gICAgICBhRmVhdHVyZUlkID0gdHlwZW9mIGFGZWF0dXJlSWQgIT09ICd1bmRlZmluZWQnID8gIGFGZWF0dXJlSWQgOiBudWxsO1xuICAgICAgZ2VvbWV0cnlOYW1lID0gdHlwZW9mIGdlb21ldHJ5TmFtZSAhPT0gJ3VuZGVmaW5lZCcgPyAgZ2VvbWV0cnlOYW1lIDogbnVsbDtcbiAgICAgIHJlc3RyaWN0VG9NYXBFeHRlbnQgPSB0eXBlb2YgcmVzdHJpY3RUb01hcEV4dGVudCAhPT0gJ3VuZGVmaW5lZCcgPyAgcmVzdHJpY3RUb01hcEV4dGVudCA6IGZhbHNlO1xuICAgICAgc3RhcnRJbmRleCA9IHR5cGVvZiBzdGFydEluZGV4ICE9PSAndW5kZWZpbmVkJyA/ICBzdGFydEluZGV4IDogbnVsbDtcbiAgICAgIG1heEZlYXR1cmVzID0gdHlwZW9mIG1heEZlYXR1cmVzICE9PSAndW5kZWZpbmVkJyA/ICBtYXhGZWF0dXJlcyA6IG51bGw7XG5cbiAgICAgIC8vIEJ1aWxkIFdGUyByZXF1ZXN0IHBhcmFtZXRlcnNcbiAgICAgIGlmICggIShhTmFtZSBpbiBjb25maWcubGF5ZXJzKSApIHtcbiAgICAgICAgICB2YXIgcWdpc05hbWUgPSBsaXpNYXAuZ2V0TmFtZUJ5Q2xlYW5OYW1lKGFOYW1lKTtcbiAgICAgICAgICBpZiAoICFxZ2lzTmFtZSB8fCAhKHFnaXNOYW1lIGluIGNvbmZpZy5sYXllcnMpKVxuICAgICAgICAgICAgcWdpc05hbWUgPSBsaXpNYXAuZ2V0TmFtZUJ5U2hvcnROYW1lKGFOYW1lKTtcbiAgICAgICAgICBpZiAoICFxZ2lzTmFtZSB8fCAhKHFnaXNOYW1lIGluIGNvbmZpZy5sYXllcnMpKVxuICAgICAgICAgICAgcWdpc05hbWUgPSBsaXpNYXAuZ2V0TmFtZUJ5VHlwZU5hbWUoYU5hbWUpO1xuICAgICAgICAgIGlmICggcWdpc05hbWUgJiYgKHFnaXNOYW1lIGluIGNvbmZpZy5sYXllcnMpKSB7XG4gICAgICAgICAgICAgIGFOYW1lID0gcWdpc05hbWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2dldFZlY3RvckxheWVyV2ZzVXJsOiBcIicrYU5hbWUrJ1wiIGFuZCBcIicrcWdpc05hbWUrJ1wiIG5vdCBmb3VuZCBpbiBjb25maWcnKTtcbiAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHZhciBjb25maWdMYXllciA9IGNvbmZpZy5sYXllcnNbYU5hbWVdO1xuICAgICAgdmFyIHR5cGVOYW1lID0gYU5hbWUuc3BsaXQoJyAnKS5qb2luKCdfJyk7XG4gICAgICBpZiAoICdzaG9ydG5hbWUnIGluIGNvbmZpZ0xheWVyICYmIGNvbmZpZ0xheWVyLnNob3J0bmFtZSAhPSAnJyApXG4gICAgICAgIHR5cGVOYW1lID0gY29uZmlnTGF5ZXIuc2hvcnRuYW1lO1xuICAgICAgZWxzZSBpZiAoICd0eXBlbmFtZScgaW4gY29uZmlnTGF5ZXIgJiYgY29uZmlnTGF5ZXIudHlwZW5hbWUgIT0gJycgKVxuICAgICAgICAgIHR5cGVOYW1lID0gY29uZmlnTGF5ZXIudHlwZW5hbWU7XG4gICAgICB2YXIgbGF5ZXJOYW1lID0gY2xlYW5OYW1lKGFOYW1lKTtcblxuICAgICAgdmFyIHdmc09wdGlvbnMgPSB7XG4gICAgICAgICAgJ1NFUlZJQ0UnOidXRlMnXG4gICAgICAgICAgLCdWRVJTSU9OJzonMS4wLjAnXG4gICAgICAgICAgLCdSRVFVRVNUJzonR2V0RmVhdHVyZSdcbiAgICAgICAgICAsJ1RZUEVOQU1FJzp0eXBlTmFtZVxuICAgICAgICAgICwnT1VUUFVURk9STUFUJzonR2VvSlNPTidcbiAgICAgIH07XG5cbiAgICAgIGlmKCBzdGFydEluZGV4IClcbiAgICAgICAgICB3ZnNPcHRpb25zWydTVEFSVElOREVYJ10gPSBzdGFydEluZGV4O1xuXG4gICAgICBpZiggbWF4RmVhdHVyZXMgKVxuICAgICAgICAgIHdmc09wdGlvbnNbJ01BWEZFQVRVUkVTJ10gPSBtYXhGZWF0dXJlcztcblxuICAgICAgdmFyIGZpbHRlclBhcmFtID0gW107XG5cbiAgICAgIGlmKCBhRmlsdGVyICl7XG4gICAgICAgICAgLy8gUmVtb3ZlIGxheWVyTmFtZSBmb2xsb3dlZCBieSA6XG4gICAgICAgICAgYUZpbHRlciA9IGFGaWx0ZXIucmVwbGFjZSggYU5hbWUgKyAnOicsICcnKTtcbiAgICAgICAgICBpZiAoIGFGaWx0ZXIgIT0gJycgKVxuICAgICAgICAgICAgZmlsdGVyUGFyYW0ucHVzaCggYUZpbHRlciApO1xuICAgICAgfWVsc2V7XG4gICAgICAgICAgLy8gSWYgbm90IGZpbHRlciBwYXNzZWQsIGNoZWNrIGlmIGEgZmlsdGVyIGRvZXMgbm90IGV4aXN0cyBmb3IgdGhlIGxheWVyXG4gICAgICAgICAgaWYoICdyZXF1ZXN0X3BhcmFtcycgaW4gY29uZmlnLmxheWVyc1thTmFtZV0gJiYgJ2ZpbHRlcicgaW4gY29uZmlnLmxheWVyc1thTmFtZV1bJ3JlcXVlc3RfcGFyYW1zJ10gKXtcbiAgICAgICAgICAgIHZhciBhRmlsdGVyID0gY29uZmlnLmxheWVyc1thTmFtZV1bJ3JlcXVlc3RfcGFyYW1zJ11bJ2ZpbHRlciddO1xuICAgICAgICAgICAgaWYoIGFGaWx0ZXIgKXtcbiAgICAgICAgICAgICAgICBhRmlsdGVyID0gYUZpbHRlci5yZXBsYWNlKCBhTmFtZSArICc6JywgJycpO1xuICAgICAgICAgICAgICAgIGZpbHRlclBhcmFtLnB1c2goIGFGaWx0ZXIgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIG9wdGlvbm5hbCBwYXJhbWV0ZXIgZmlsdGVyaWQgb3IgRVhQX0ZJTFRFUlxuICAgICAgaWYoIGFGZWF0dXJlSWQgKVxuICAgICAgICAgIHdmc09wdGlvbnNbJ0ZFQVRVUkVJRCddID0gYUZlYXR1cmVJZC5yZXBsYWNlKG5ldyBSZWdFeHAoYU5hbWUsICdnJyksIHR5cGVOYW1lKTtcbiAgICAgIGVsc2UgaWYoIGZpbHRlclBhcmFtLmxlbmd0aCApXG4gICAgICAgICAgd2ZzT3B0aW9uc1snRVhQX0ZJTFRFUiddID0gZmlsdGVyUGFyYW0uam9pbiggJyBBTkQgJyApO1xuXG5cbiAgICAgIC8vIENhbGN1bGF0ZSBiYm94IGZyb20gbWFwIGV4dGVudCBpZiBuZWVkZWRcbiAgICAgIGlmKCByZXN0cmljdFRvTWFwRXh0ZW50ICkge1xuICAgICAgICAgIHZhciBleHRlbnQgPSBtYXAuZ2V0RXh0ZW50KCkuY2xvbmUoKTtcbiAgICAgICAgICB2YXIgcHJvakZlYXQgPSBuZXcgT3BlbkxheWVycy5Qcm9qZWN0aW9uKGNvbmZpZy5sYXllcnNbYU5hbWVdLmNycyk7XG4gICAgICAgICAgZXh0ZW50ID0gZXh0ZW50LnRyYW5zZm9ybSggbWFwLmdldFByb2plY3Rpb24oKSwgcHJvakZlYXQgKTtcbiAgICAgICAgICB2YXIgYmJveCA9IGV4dGVudC50b0JCT1goKTtcbiAgICAgICAgICB3ZnNPcHRpb25zWydCQk9YJ10gPSBiYm94O1xuICAgICAgfVxuXG4gICAgICAvLyBPcHRpb25uYWwgcGFyYW1ldGVyIGdlb21ldHJ5bmFtZVxuICAgICAgaWYoIGdlb21ldHJ5TmFtZVxuICAgICAgICAmJiAkLmluQXJyYXkoIGdlb21ldHJ5TmFtZS50b0xvd2VyQ2FzZSgpLCBbJ25vbmUnLCAnZXh0ZW50JywgJ2NlbnRyb2lkJ10gKSAhPSAtMVxuICAgICAgKXtcbiAgICAgICAgICB3ZnNPcHRpb25zWydHRU9NRVRSWU5BTUUnXSA9IGdlb21ldHJ5TmFtZTtcbiAgICAgIH1cblxuICAgICAgZ2V0RmVhdHVyZVVybERhdGFbJ3VybCddID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChsaXpVcmxzLndtc1xuICAgICAgICAgICAgICAsT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICAgICk7XG4gICAgICBnZXRGZWF0dXJlVXJsRGF0YVsnb3B0aW9ucyddID0gd2ZzT3B0aW9ucztcblxuICAgICAgcmV0dXJuIGdldEZlYXR1cmVVcmxEYXRhO1xuICB9XG5cbiAgICAvKipcbiAgICAgKiBzdG9yYWdlIGZvciBjYWxsYmFja3MgZ2l2ZW4gdG8gZ2V0RmVhdHVyZURhdGFcbiAgICAgKlxuICAgICAqIHVzZWQgdG8gYXZvaWQgbXVsdGlwbGUgcmVxdWVzdCBmb3IgdGhlIHNhbWUgZmVhdHVyZVxuICAgICAqIEB0eXBlIHt7fX1cbiAgICAgKi9cbiAgdmFyIGZlYXR1cmVEYXRhUG9vbCA9IHt9O1xuXG4gIGZ1bmN0aW9uIGNhbGxGZWF0dXJlRGF0YUNhbGxCYWNrcyhwb29sSWQsIGZlYXR1cmVzKSB7XG4gICAgICB2YXIgY2FsbGJhY2tzRGF0YSA9IGZlYXR1cmVEYXRhUG9vbFtwb29sSWRdO1xuICAgICAgZGVsZXRlIGZlYXR1cmVEYXRhUG9vbFtwb29sSWRdO1xuICAgICAgY2FsbGJhY2tzRGF0YS5jYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgIGlmIChjYWxsYmFjaykge1xuICAgICAgICAgICAgICBjYWxsYmFjayhjYWxsYmFja3NEYXRhLmxheWVyTmFtZSwgY2FsbGJhY2tzRGF0YS5maWx0ZXIsIGZlYXR1cmVzLCBjYWxsYmFja3NEYXRhLmFsaWFzKTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldEZlYXR1cmVEYXRhKGFOYW1lLCBhRmlsdGVyLCBhRmVhdHVyZUlELCBhR2VvbWV0cnlOYW1lLCByZXN0cmljdFRvTWFwRXh0ZW50LCBzdGFydEluZGV4LCBtYXhGZWF0dXJlcywgYUNhbGxCYWNrKSB7XG4gICAgICAvLyBTZXQgZnVuY3Rpb24gcGFyYW1ldGVycyBpZiBub3QgZ2l2ZW5cbiAgICAgIGFGaWx0ZXIgPSB0eXBlb2YgYUZpbHRlciAhPT0gJ3VuZGVmaW5lZCcgPyAgYUZpbHRlciA6IG51bGw7XG4gICAgICBhRmVhdHVyZUlkID0gdHlwZW9mIGFGZWF0dXJlSWQgIT09ICd1bmRlZmluZWQnID8gIGFGZWF0dXJlSWQgOiBudWxsO1xuICAgICAgZ2VvbWV0cnlOYW1lID0gdHlwZW9mIGdlb21ldHJ5TmFtZSAhPT0gJ3VuZGVmaW5lZCcgPyAgZ2VvbWV0cnlOYW1lIDogbnVsbDtcbiAgICAgIHJlc3RyaWN0VG9NYXBFeHRlbnQgPSB0eXBlb2YgcmVzdHJpY3RUb01hcEV4dGVudCAhPT0gJ3VuZGVmaW5lZCcgPyAgcmVzdHJpY3RUb01hcEV4dGVudCA6IGZhbHNlO1xuICAgICAgc3RhcnRJbmRleCA9IHR5cGVvZiBzdGFydEluZGV4ICE9PSAndW5kZWZpbmVkJyA/ICBzdGFydEluZGV4IDogbnVsbDtcbiAgICAgIG1heEZlYXR1cmVzID0gdHlwZW9mIG1heEZlYXR1cmVzICE9PSAndW5kZWZpbmVkJyA/ICBtYXhGZWF0dXJlcyA6IG51bGw7XG5cbiAgICAgIC8vIGdldCBsYXllciBjb25maWdzXG4gICAgICBpZiAoICEoYU5hbWUgaW4gY29uZmlnLmxheWVycykgKSB7XG4gICAgICAgICAgdmFyIHFnaXNOYW1lID0gbGl6TWFwLmdldE5hbWVCeUNsZWFuTmFtZShhTmFtZSk7XG4gICAgICAgICAgaWYgKCAhcWdpc05hbWUgfHwgIShxZ2lzTmFtZSBpbiBjb25maWcubGF5ZXJzKSlcbiAgICAgICAgICAgIHFnaXNOYW1lID0gbGl6TWFwLmdldE5hbWVCeVNob3J0TmFtZShhTmFtZSk7XG4gICAgICAgICAgaWYgKCAhcWdpc05hbWUgfHwgIShxZ2lzTmFtZSBpbiBjb25maWcubGF5ZXJzKSlcbiAgICAgICAgICAgIHFnaXNOYW1lID0gbGl6TWFwLmdldE5hbWVCeVR5cGVOYW1lKGFOYW1lKTtcbiAgICAgICAgICBpZiAoIHFnaXNOYW1lICYmIChxZ2lzTmFtZSBpbiBjb25maWcubGF5ZXJzKSkge1xuICAgICAgICAgICAgICBhTmFtZSA9IHFnaXNOYW1lO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdnZXRGZWF0dXJlRGF0YTogXCInK2FOYW1lKydcIiBhbmQgXCInK3FnaXNOYW1lKydcIiBub3QgZm91bmQgaW4gY29uZmlnJyk7XG4gICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICB9XG4gICAgICB2YXIgYUNvbmZpZyA9IGNvbmZpZy5sYXllcnNbYU5hbWVdO1xuXG4gICAgICAkKCdib2R5JykuY3NzKCdjdXJzb3InLCAnd2FpdCcpO1xuXG4gICAgICB2YXIgZ2V0RmVhdHVyZVVybERhdGEgPSBsaXpNYXAuZ2V0VmVjdG9yTGF5ZXJXZnNVcmwoIGFOYW1lLCBhRmlsdGVyLCBhRmVhdHVyZUlELCBhR2VvbWV0cnlOYW1lLCByZXN0cmljdFRvTWFwRXh0ZW50LCBzdGFydEluZGV4LCBtYXhGZWF0dXJlcyApO1xuXG4gICAgICAvLyBzZWUgaWYgYSByZXF1ZXN0IGZvciB0aGUgc2FtZSBmZWF0dXJlIGlzIG5vdCBhbHJlYWR5IG1hZGVcbiAgICAgIHZhciBwb29sSWQgPSBnZXRGZWF0dXJlVXJsRGF0YVsndXJsJ10gKyBcInxcIiArIEpTT04uc3RyaW5naWZ5KGdldEZlYXR1cmVVcmxEYXRhWydvcHRpb25zJ10pO1xuICAgICAgaWYgKHBvb2xJZCBpbiBmZWF0dXJlRGF0YVBvb2wpIHtcbiAgICAgICAgICAvLyB0aGVyZSBpcyBhbHJlYWR5IGEgcmVxdWVzdCwgbGV0J3Mgc3RvcmUgb3VyIGNhbGxiYWNrIGFuZCB3YWl0Li4uXG4gICAgICAgICAgaWYgKGFDYWxsQmFjaykge1xuICAgICAgICAgICAgICBmZWF0dXJlRGF0YVBvb2xbcG9vbElkXS5jYWxsYmFja3MucHVzaChhQ2FsbEJhY2spO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICAvLyBubyByZXF1ZXN0IHlldCwgbGV0J3MgZG8gaXQgYW5kIHN0b3JlIHRoZSBjYWxsYmFjayBhbmQgaXRzIHBhcmFtZXRlcnNcbiAgICAgIGZlYXR1cmVEYXRhUG9vbFtwb29sSWRdID0ge1xuICAgICAgICAgIGNhbGxiYWNrczogWyBhQ2FsbEJhY2sgXSxcbiAgICAgICAgICBsYXllck5hbWU6IGFOYW1lLFxuICAgICAgICAgIGZpbHRlcjogYUZpbHRlcixcbiAgICAgICAgICBhbGlhczogYUNvbmZpZ1snYWxpYXMnXVxuICAgICAgfTtcblxuICAgICAgJC5wb3N0KCBnZXRGZWF0dXJlVXJsRGF0YVsndXJsJ10sIGdldEZlYXR1cmVVcmxEYXRhWydvcHRpb25zJ10sIGZ1bmN0aW9uKGRhdGEpIHtcblxuICAgICAgICAgIGlmKCAhKCdmZWF0dXJlQ3JzJyBpbiBhQ29uZmlnKSApXG4gICAgICAgICAgICAgIGFDb25maWdbJ2ZlYXR1cmVDcnMnXSA9IG51bGw7XG4gICAgICAgICAgaWYoIGFDb25maWcuY3JzID09ICdFUFNHOjQzMjYnIClcbiAgICAgICAgICAgICAgYUNvbmZpZ1snZmVhdHVyZUNycyddID0gJ0VQU0c6NDMyNic7XG5cbiAgICAgICAgICAvLyB2ZXJpZnlpbmcgdGhlIGZlYXR1cmUgQ1JTXG4gICAgICAgICAgaWYoICFhQ29uZmlnLmZlYXR1cmVDcnMgJiYgZGF0YS5mZWF0dXJlcy5sZW5ndGggIT0gMCkge1xuICAgICAgICAgICAgICAvLyBsb2FkIHByb2plY3Rpb24gdG8gYmUgc3VyZSB0byBoYXZlIHRoZSBkZWZpbml0aW9uXG4gICAgICAgICAgICAgIGxpek1hcC5sb2FkUHJvakRlZmluaXRpb24oIGFDb25maWcuY3JzLCBmdW5jdGlvbiggYVByb2ogKSB7XG4gICAgICAgICAgICAgICAgICAvLyBpbiBRR0lTIHNlcnZlciA+IDIuMTQgR2VvSlNPTiBpcyBpbiBFUFNHOjQzMjZcbiAgICAgICAgICAgICAgICAgIGlmICggJ3FnaXNTZXJ2ZXJWZXJzaW9uJyBpbiBjb25maWcub3B0aW9ucyAmJiBjb25maWcub3B0aW9ucy5xZ2lzU2VydmVyVmVyc2lvbiAhPSAnMi4xNCcgKVxuICAgICAgICAgICAgICAgICAgICAgIGFDb25maWdbJ2ZlYXR1cmVDcnMnXSA9ICdFUFNHOjQzMjYnO1xuICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoICFhQ29uZmlnLmZlYXR1cmVDcnMgKVxuICAgICAgICAgICAgICAgICAgICAgIGFDb25maWdbJ2ZlYXR1cmVDcnMnXSA9IGFDb25maWcuY3JzO1xuXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgnYWxpYXMnIGluIGFDb25maWcgJiYgYUNvbmZpZ1snYWxpYXMnXSkge1xuICAgICAgICAgICAgICBjYWxsRmVhdHVyZURhdGFDYWxsQmFja3MocG9vbElkLCBkYXRhLmZlYXR1cmVzKTtcbiAgICAgICAgICAgICAgJCgnYm9keScpLmNzcygnY3Vyc29yJywgJ2F1dG8nKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB2YXIgc2VydmljZSA9IE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQobGl6VXJscy53bXNcbiAgICAgICAgICAgICAgICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICQucG9zdChzZXJ2aWNlLCB7XG4gICAgICAgICAgICAgICAgICAnU0VSVklDRSc6J1dGUydcbiAgICAgICAgICAgICAgICAgLCdWRVJTSU9OJzonMS4wLjAnXG4gICAgICAgICAgICAgICAgICwnUkVRVUVTVCc6J0Rlc2NyaWJlRmVhdHVyZVR5cGUnXG4gICAgICAgICAgICAgICAgICwnVFlQRU5BTUUnOiAoJ3R5cGVuYW1lJyBpbiBhQ29uZmlnKSA/IGFDb25maWcudHlwZW5hbWUgOiBhTmFtZVxuICAgICAgICAgICAgICAgICAsJ09VVFBVVEZPUk1BVCc6J0pTT04nXG4gICAgICAgICAgICAgIH0sIGZ1bmN0aW9uKGRlc2NyaWJlKSB7XG5cbiAgICAgICAgICAgICAgICAgIGFDb25maWdbJ2FsaWFzJ10gPSBkZXNjcmliZS5hbGlhc2VzO1xuICAgICAgICAgICAgICAgICAgaWYgKCd0eXBlcycgaW4gZGVzY3JpYmUpXG4gICAgICAgICAgICAgICAgICAgICAgYUNvbmZpZ1sndHlwZXMnXSA9IGRlc2NyaWJlLnR5cGVzO1xuXG4gICAgICAgICAgICAgICAgICBjYWxsRmVhdHVyZURhdGFDYWxsQmFja3MocG9vbElkLCBkYXRhLmZlYXR1cmVzKTtcblxuICAgICAgICAgICAgICAgICAgJCgnYm9keScpLmNzcygnY3Vyc29yJywgJ2F1dG8nKTtcblxuICAgICAgICAgICAgICB9LCdqc29uJyk7XG4gICAgICAgICAgIH1cblxuICAgICAgfSwnanNvbicpO1xuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRyYW5zbGF0ZVdmc0ZpZWxkVmFsdWVzKGFOYW1lLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIHRyYW5zbGF0aW9uX2RpY3Qpe1xuICAgIHRyYW5zbGF0aW9uX2RpY3QgPSB0eXBlb2YgdHJhbnNsYXRpb25fZGljdCAhPT0gJ3VuZGVmaW5lZCcgPyAgdHJhbnNsYXRpb25fZGljdCA6IG51bGw7XG4gICAgcmV0dXJuIGZpZWxkVmFsdWU7XG4gIH1cblxuICBmdW5jdGlvbiB6b29tVG9PbEZlYXR1cmUoIGZlYXR1cmUsIHByb2osIHpvb21BY3Rpb24gKXtcbiAgICAgIHpvb21BY3Rpb24gPSB0eXBlb2Ygem9vbUFjdGlvbiAhPT0gJ3VuZGVmaW5lZCcgPyAgem9vbUFjdGlvbiA6ICd6b29tJztcbiAgICAgIHZhciBmb3JtYXQgPSBuZXcgT3BlbkxheWVycy5Gb3JtYXQuR2VvSlNPTigpO1xuICAgICAgdmFyIGZlYXQgPSBmb3JtYXQucmVhZChmZWF0dXJlKVswXTtcbiAgICAgIGlmKCBmZWF0ICYmICdnZW9tZXRyeScgaW4gZmVhdCApe1xuICAgICAgICAgIGZlYXQuZ2VvbWV0cnkudHJhbnNmb3JtKCBwcm9qLCBsaXpNYXAubWFwLmdldFByb2plY3Rpb24oKSApO1xuXG4gICAgICAgICAgLy8gWm9vbSBvciBjZW50ZXIgdG8gc2VsZWN0ZWQgZmVhdHVyZVxuICAgICAgICAgIGlmKCB6b29tQWN0aW9uID09ICd6b29tJyApXG4gICAgICAgICAgICAgIG1hcC56b29tVG9FeHRlbnQoZmVhdC5nZW9tZXRyeS5nZXRCb3VuZHMoKSk7XG4gICAgICAgICAgaWYoIHpvb21BY3Rpb24gPT0gJ2NlbnRlcicgKXtcbiAgICAgICAgICAgICAgdmFyIGxvbmxhdCA9IGZlYXQuZ2VvbWV0cnkuZ2V0Qm91bmRzKCkuZ2V0Q2VudGVyTG9uTGF0KClcbiAgICAgICAgICAgICAgbWFwLnNldENlbnRlcihsb25sYXQpO1xuICAgICAgICAgIH1cbiAgICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHpvb21Ub0ZlYXR1cmUoIGZlYXR1cmVUeXBlLCBmaWQsIHpvb21BY3Rpb24gKXtcbiAgICAgIHpvb21BY3Rpb24gPSB0eXBlb2Ygem9vbUFjdGlvbiAhPT0gJ3VuZGVmaW5lZCcgPyAgem9vbUFjdGlvbiA6ICd6b29tJztcblxuICAgICAgdmFyIGxheWVyQ29uZmlnID0gY29uZmlnLmxheWVyc1tmZWF0dXJlVHlwZV07XG4gICAgICB2YXIgZmVhdHVyZUlkID0gZmVhdHVyZVR5cGUgKyAnLicgKyBmaWQ7XG5cbiAgICAgIHZhciBwcm9qID0gbmV3IE9wZW5MYXllcnMuUHJvamVjdGlvbihjb25maWcubGF5ZXJzW2ZlYXR1cmVUeXBlXS5jcnMpO1xuICAgICAgaWYoIGNvbmZpZy5sYXllcnNbZmVhdHVyZVR5cGVdLmZlYXR1cmVDcnMgKVxuICAgICAgICAgIHByb2ogPSBuZXcgT3BlbkxheWVycy5Qcm9qZWN0aW9uKGNvbmZpZy5sYXllcnNbZmVhdHVyZVR5cGVdLmZlYXR1cmVDcnMpO1xuICAgICAgZ2V0TGF5ZXJGZWF0dXJlKGZlYXR1cmVUeXBlLCBmaWQsIGZ1bmN0aW9uKGZlYXQpIHtcbiAgICAgICAgICB6b29tVG9PbEZlYXR1cmUoIGZlYXQsIHByb2osIHpvb21BY3Rpb24gKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0TGF5ZXJGZWF0dXJlKCBmZWF0dXJlVHlwZSwgZmlkLCBhQ2FsbGJhY2ssIGFDYWxsYmFja05vdGZvdW5kLCBmb3JjZVRvTG9hZCApe1xuICAgICAgaWYgKCAhYUNhbGxiYWNrIClcbiAgICAgICAgICByZXR1cm47XG4gICAgICBpZiAoICEoZmVhdHVyZVR5cGUgaW4gY29uZmlnLmxheWVycykgKVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgdmFyIGxheWVyQ29uZmlnID0gY29uZmlnLmxheWVyc1tmZWF0dXJlVHlwZV07XG4gICAgICB2YXIgZmVhdHVyZUlkID0gZmVhdHVyZVR5cGUgKyAnLicgKyBmaWQ7XG5cbiAgICAgIC8vIFVzZSBhbHJlYWR5IHJldHJpZXZlZCBmZWF0dXJlXG4gICAgICBpZighZm9yY2VUb0xvYWQgJiYgbGF5ZXJDb25maWdbJ2ZlYXR1cmVzJ10gJiYgZmlkIGluIGxheWVyQ29uZmlnWydmZWF0dXJlcyddICl7XG4gICAgICAgICAgYUNhbGxiYWNrKGxheWVyQ29uZmlnWydmZWF0dXJlcyddW2ZpZF0pO1xuICAgICAgfVxuICAgICAgLy8gT3IgZ2V0IHRoZSBmZWF0dXJlIHZpYSBXRlMgaW4gbmVlZGVkXG4gICAgICBlbHNle1xuICAgICAgICAgIGdldEZlYXR1cmVEYXRhKGZlYXR1cmVUeXBlLCBudWxsLCBmZWF0dXJlSWQsICdleHRlbnQnLCBmYWxzZSwgbnVsbCwgbnVsbCxcbiAgICAgICAgICAgICAgZnVuY3Rpb24oIGFOYW1lLCBhRmlsdGVyLCBjRmVhdHVyZXMsIGNBbGlhc2VzICl7XG5cbiAgICAgICAgICAgICAgaWYgKGNGZWF0dXJlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgdmFyIGZlYXQgPSBjRmVhdHVyZXNbMF07XG4gICAgICAgICAgICAgICAgICBpZiggIWxheWVyQ29uZmlnWydmZWF0dXJlcyddICkge1xuICAgICAgICAgICAgICAgICAgICAgIGxheWVyQ29uZmlnWydmZWF0dXJlcyddID0ge307XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBsYXllckNvbmZpZ1snZmVhdHVyZXMnXVtmaWRdID0gZmVhdDtcbiAgICAgICAgICAgICAgICAgIGFDYWxsYmFjayhmZWF0KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBlbHNlIGlmKGFDYWxsYmFja05vdGZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICBhQ2FsbGJhY2tOb3Rmb3VuZChmZWF0dXJlVHlwZSwgZmlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0VmVjdG9yTGF5ZXJGZWF0dXJlVHlwZXMoKSB7XG4gICAgICBpZiAoIHdmc0NhcGFiaWxpdGllcyA9PSBudWxsIClcbiAgICAgICAgICByZXR1cm4gW107XG4gICAgICByZXR1cm4gd2ZzQ2FwYWJpbGl0aWVzLmZpbmQoJ0ZlYXR1cmVUeXBlJyk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRWZWN0b3JMYXllclJlc3VsdEZvcm1hdCgpIHtcbiAgICAgIGlmICggd2ZzQ2FwYWJpbGl0aWVzID09IG51bGwgKVxuICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgIHJldHVybiB3ZnNDYXBhYmlsaXRpZXMuZmluZCgnQ2FwYWJpbGl0eSA+IFJlcXVlc3QgPiBHZXRGZWF0dXJlID4gUmVzdWx0Rm9ybWF0ID4gKicpO1xuICB9XG5cblxuICBmdW5jdGlvbiBnZXRGZWF0dXJlUG9wdXBDb250ZW50KCBhTmFtZSwgZmVhdCwgYUNhbGxiYWNrKSB7XG4gICAgICAvLyBPbmx5IHVzZSB0aGlzIGZ1bmN0aW5vIHdpdGggY2FsbGJhY2tcbiAgICAgIGlmICggIWFDYWxsYmFjayApXG4gICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAvLyBPbmx5IHVzZSB3aGVuIGZlYXQgaXMgc2V0XG4gICAgICBpZiggIWZlYXQgKVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcblxuICAgICAgLy8gUmVtb3ZlIG1hcCBwb3B1cCB0byBhdm9pZCBjb25mdXNpb25cbiAgICAgIGlmIChsaXpNYXAubWFwLnBvcHVwcy5sZW5ndGggIT0gMClcbiAgICAgICAgICBsaXpNYXAubWFwLnJlbW92ZVBvcHVwKCBsaXpNYXAubWFwLnBvcHVwc1swXSApO1xuXG4gICAgICAvLyBHZXQgcG9wdXAgY29udGVudCBieSBGSUxURVIgYW5kIG5vdCB3aXRoIHZpcnR1YWwgY2xpY2sgb24gbWFwXG4gICAgICB2YXIgZmlsdGVyID0gJyc7XG4gICAgICB2YXIgcWdpc05hbWUgPSBhTmFtZTtcbiAgICAgIGlmKCBsaXpNYXAuZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUoYU5hbWUpICl7XG4gICAgICAgICAgcWdpc05hbWUgPSBsaXpNYXAuZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUoYU5hbWUpO1xuICAgICAgfVxuXG4gICAgICB2YXIgcGtleSA9IG51bGw7XG4gICAgICAvLyBHZXQgcHJpbWFyeSBrZXkgd2l0aCBhdHRyaWJ1dGVsYXllciBvcHRpb25zXG4gICAgICBpZiggKHFnaXNOYW1lIGluIGxpek1hcC5jb25maWcuYXR0cmlidXRlTGF5ZXJzKSApe1xuICAgICAgICAgIHBrZXkgPSBsaXpNYXAuY29uZmlnLmF0dHJpYnV0ZUxheWVyc1txZ2lzTmFtZV1bJ3ByaW1hcnlLZXknXTtcbiAgICAgIH1cblxuICAgICAgLy8gVGVzdCBpZiBwcmltYXJ5IGtleSBpcyBzZXQgaW4gdGhlIGF0bGFzIHRvb2xcbiAgICAgIGlmKCAhcGtleSAmJiAnYXRsYXNMYXllcicgaW4gbGl6TWFwLmNvbmZpZy5vcHRpb25zICYmICdhdGxhc1ByaW1hcnlLZXknIGluIGxpek1hcC5jb25maWcub3B0aW9ucyApe1xuICAgICAgICB2YXIgbGF5ZXJDb25maWcgPSBsaXpNYXAuY29uZmlnLmxheWVyc1txZ2lzTmFtZV07XG4gICAgICAgIGlmKCBsYXllckNvbmZpZy5pZCA9PSBsaXpNYXAuY29uZmlnLm9wdGlvbnNbJ2F0bGFzTGF5ZXInXSAmJiBsaXpNYXAuY29uZmlnLm9wdGlvbnNbJ2F0bGFzUHJpbWFyeUtleSddICE9ICcnICl7XG4gICAgICAgICAgcGtleSA9IGxpek1hcC5jb25maWcub3B0aW9uc1snYXRsYXNQcmltYXJ5S2V5J107XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmKCAhcGtleSApXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuXG4gICAgICB2YXIgcGtWYWwgPSBmZWF0LnByb3BlcnRpZXNbcGtleV07XG4gICAgICBmaWx0ZXIgPSBxZ2lzTmFtZSArICc6XCInICsgcGtleSArICdcIiA9ICcgKyBcIidcIiArIHBrVmFsICsgXCInXCIgO1xuXG4gICAgICB2YXIgY3JzID0gJ0VQU0c6NDMyNic7XG4gICAgICBpZigoJ2NycycgaW4gbGl6TWFwLmNvbmZpZy5sYXllcnNbcWdpc05hbWVdKSAmJiBsaXpNYXAuY29uZmlnLmxheWVyc1txZ2lzTmFtZV0uY3JzICE9ICcnKXtcbiAgICAgICAgICBjcnMgPSBsaXpNYXAuY29uZmlnLmxheWVyc1txZ2lzTmFtZV0uY3JzO1xuICAgICAgfVxuXG4gICAgICB2YXIgd21zT3B0aW9ucyA9IHtcbiAgICAgICAgICAgJ0xBWUVSUyc6IGFOYW1lXG4gICAgICAgICAgLCdRVUVSWV9MQVlFUlMnOiBhTmFtZVxuICAgICAgICAgICwnU1RZTEVTJzogJydcbiAgICAgICAgICAsJ1NFUlZJQ0UnOiAnV01TJ1xuICAgICAgICAgICwnVkVSU0lPTic6ICcxLjMuMCdcbiAgICAgICAgICAsJ0NSUyc6IGNyc1xuICAgICAgICAgICwnUkVRVUVTVCc6ICdHZXRGZWF0dXJlSW5mbydcbiAgICAgICAgICAsJ0VYQ0VQVElPTlMnOiAnYXBwbGljYXRpb24vdm5kLm9nYy5zZV9pbmltYWdlJ1xuICAgICAgICAgICwnSU5GT19GT1JNQVQnOiAndGV4dC9odG1sJ1xuICAgICAgICAgICwnRkVBVFVSRV9DT1VOVCc6IDFcbiAgICAgICAgICAsJ0ZJTFRFUic6IGZpbHRlclxuICAgICAgfTtcblxuICAgICAgLy8gUXVlcnkgdGhlIHNlcnZlclxuICAgICAgdmFyIHNlcnZpY2UgPSBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKGxpelVybHMud21zXG4gICAgICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgICApO1xuICAgICAgJC5wb3N0KHNlcnZpY2UsIHdtc09wdGlvbnMsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgICAgICAgICBhQ2FsbGJhY2soZGF0YSk7XG4gICAgICB9KTtcblxuICB9XG5cbiAgLy8gR2V0IHRoZSBwb3B1cCBjb250ZW50IGZvciBhIGxheWVyIGdpdmVuIGEgZmVhdHVyZVxuICBmdW5jdGlvbiBnZXRGZWF0dXJlUG9wdXBDb250ZW50QnlGZWF0dXJlSW50ZXJzZWN0aW9uKGFOYW1lLCBmZWF0LCBhQ2FsbGJhY2spIHtcblxuICAgIC8vIENhbGN1bGF0ZSBmYWtlIGJib3ggYXJvdW5kIHRoZSBmZWF0dXJlXG4gICAgdmFyIHVuaXRzID0gbGl6TWFwLm1hcC5nZXRVbml0cygpO1xuICAgIHZhciBsQ29uZmlnID0gbGl6TWFwLmNvbmZpZy5sYXllcnNbYU5hbWVdO1xuICAgIGlmKCBsaXpNYXAubWFwLm1heFNjYWxlID09ICdhdXRvJyApXG4gICAgICB2YXIgc2NhbGUgPSBsQ29uZmlnLm1pblNjYWxlO1xuICAgIGVsc2VcbiAgICAgIHZhciBzY2FsZSA9IE1hdGgubWF4KCBsaXpNYXAubWFwLm1heFNjYWxlLCBsQ29uZmlnLm1pblNjYWxlICk7XG4gICAgc2NhbGUgPSBzY2FsZSAqIDI7XG4gICAgdmFyIHJlcyA9IE9wZW5MYXllcnMuVXRpbC5nZXRSZXNvbHV0aW9uRnJvbVNjYWxlKHNjYWxlLCB1bml0cyk7XG5cbiAgICB2YXIgZ2VvbVR5cGUgPSBmZWF0Lmdlb21ldHJ5LkNMQVNTX05BTUU7XG4gICAgaWYgKFxuICAgICAgZ2VvbVR5cGUgPT0gJ09wZW5MYXllcnMuR2VvbWV0cnkuUG9seWdvbidcbiAgICAgIHx8IGdlb21UeXBlID09ICdPcGVuTGF5ZXJzLkdlb21ldHJ5Lk11bHRpUG9seWdvbidcbiAgICAgIHx8IGdlb21UeXBlID09ICdPcGVuTGF5ZXJzLkdlb21ldHJ5LlBvaW50J1xuICAgICkge1xuICAgICAgdmFyIGxvbmxhdCA9IGZlYXQuZ2VvbWV0cnkuZ2V0Qm91bmRzKCkuZ2V0Q2VudGVyTG9uTGF0KClcbiAgICB9XG4gICAgZWxzZSB7XG4gICAgICB2YXIgdmVydCA9IGZlYXQuZ2VvbWV0cnkuZ2V0VmVydGljZXMoKTtcbiAgICAgIHZhciBtaWRkbGVQb2ludCA9IHZlcnRbTWF0aC5mbG9vcih2ZXJ0Lmxlbmd0aC8yKV07XG4gICAgICB2YXIgbG9ubGF0ID0gbmV3IE9wZW5MYXllcnMuTG9uTGF0KG1pZGRsZVBvaW50LngsIG1pZGRsZVBvaW50LnkpO1xuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSBmYWtlIGJib3hcbiAgICB2YXIgYmJveCA9IG5ldyBPcGVuTGF5ZXJzLkJvdW5kcyhcbiAgICAgIGxvbmxhdC5sb24gLSA1ICogcmVzLFxuICAgICAgbG9ubGF0LmxhdCAtIDUgKiByZXMsXG4gICAgICBsb25sYXQubG9uICsgNSAqIHJlcyxcbiAgICAgIGxvbmxhdC5sYXQgKyA1ICogcmVzXG4gICAgKTtcblxuICAgIHZhciBnZmlDcnMgPSBsaXpNYXAubWFwLmdldFByb2plY3Rpb25PYmplY3QoKS50b1N0cmluZygpO1xuICAgIGlmICggZ2ZpQ3JzID09ICdFUFNHOjkwMDkxMycgKVxuICAgICAgZ2ZpQ3JzID0gJ0VQU0c6Mzg1Nyc7XG5cbiAgICB2YXIgd21zT3B0aW9ucyA9IHtcbiAgICAgICAnTEFZRVJTJzogYU5hbWVcbiAgICAgICwnUVVFUllfTEFZRVJTJzogYU5hbWVcbiAgICAgICwnU1RZTEVTJzogJydcbiAgICAgICwnU0VSVklDRSc6ICdXTVMnXG4gICAgICAsJ1ZFUlNJT04nOiAnMS4zLjAnXG4gICAgICAsJ1JFUVVFU1QnOiAnR2V0RmVhdHVyZUluZm8nXG4gICAgICAsJ0VYQ0VQVElPTlMnOiAnYXBwbGljYXRpb24vdm5kLm9nYy5zZV9pbmltYWdlJ1xuICAgICAgLCdCQk9YJzogYmJveC50b0JCT1goKVxuICAgICAgLCdGRUFUVVJFX0NPVU5UJzogMTBcbiAgICAgICwnSEVJR0hUJzogMTAwXG4gICAgICAsJ1dJRFRIJzogMTAwXG4gICAgICAsJ0lORk9fRk9STUFUJzogJ3RleHQvaHRtbCdcbiAgICAgICwnQ1JTJzogZ2ZpQ3JzXG4gICAgICAsJ0knOiA1MFxuICAgICAgLCdKJzogNTBcbiAgICB9O1xuXG4gICAgLy8gUXVlcnkgdGhlIHNlcnZlclxuICAgIHZhciBzZXJ2aWNlID0gT3BlbkxheWVycy5VdGlsLnVybEFwcGVuZChsaXpVcmxzLndtc1xuICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4gICAgKTtcbiAgICAkLnBvc3Qoc2VydmljZSwgd21zT3B0aW9ucywgZnVuY3Rpb24oZGF0YSkge1xuICAgICAgaWYoYUNhbGxiYWNrKXtcbiAgICAgICAgYUNhbGxiYWNrKHNlcnZpY2UsIHdtc09wdGlvbnMsIGRhdGEpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ3JlYXRlIG5ldyBkb2NrIG9yIG1pbmlkb2NrXG4gIC8vIEV4YW1wbGUgOiBsaXpNYXAuYWRkRG9jaygnbXlkb2NrJywgJ015IGRvY2sgdGl0bGUnLCAnZG9jaycsICdTb21lIGNvbnRlbnQnLCAnaWNvbi1wZW5jaWwnKTtcbiAgLy8gc2VlIGljb24gbGlzdCBoZXJlIDogaHR0cDovL2dldGJvb3RzdHJhcC5jb20vMi4zLjIvYmFzZS1jc3MuaHRtbCNpY29uc1xuICBmdW5jdGlvbiBhZGREb2NrKCBkbmFtZSwgZGxhYmVsLCBkdHlwZSwgZGNvbnRlbnQsIGRpY29uKXtcbiAgICAgIC8vIEZpcnN0IGNoZWNrIGlmIHRoaXMgZG5hbWUgYWxyZWFkeSBleGlzdHNcbiAgICAgIGlmKCAkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS4nK2RuYW1lKycgPiBhJykubGVuZ3RoICl7XG4gICAgICAgICAgY29uc29sZS5sb2coZG5hbWUgKyAnIG1lbnUgaXRlbSBhbHJlYWR5IGV4aXN0cycpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gQ3JlYXRlIG1lbnUgaWNvbiBmb3IgYWN0aXZhdGluZyBkb2NrXG4gICAgICB2YXIgZG9ja2xpID0gJyc7XG4gICAgICBkb2NrbGkrPSc8bGkgY2xhc3M9XCInK2RuYW1lKycgbmF2LScrZHR5cGUrJ1wiPic7XG4gICAgICBkb2NrbGkrPScgICA8YSBpZD1cImJ1dHRvbi0nK2RuYW1lKydcIiByZWw9XCJ0b29sdGlwXCIgZGF0YS1vcmlnaW5hbC10aXRsZT1cIicrZGxhYmVsKydcIiBkYXRhLXBsYWNlbWVudD1cInJpZ2h0XCIgaHJlZj1cIiMnK2RuYW1lKydcIiBkYXRhLWNvbnRhaW5lcj1cIiNjb250ZW50XCI+JztcbiAgICAgIGRvY2tsaSs9JyAgICAgICA8c3BhbiBjbGFzcz1cImljb25cIj48aSBjbGFzcz1cIicrZGljb24rJyBpY29uLXdoaXRlXCI+PC9pPjwvc3Bhbj4nO1xuICAgICAgZG9ja2xpKz0nICAgPC9hPic7XG4gICAgICBkb2NrbGkrPSc8L2xpPic7XG4gICAgICAkKCcjbWFwbWVudSBkaXYgdWwgbGkubmF2LScrZHR5cGUrJzpsYXN0JykuYWZ0ZXIoZG9ja2xpKTtcbiAgICAgIGlmICggJCgnI21hcG1lbnUgZGl2IHVsIGxpLm5hdi0nK2R0eXBlKycuJytkbmFtZSkubGVuZ3RoID09IDAgKVxuICAgICAgICAkKCcjbWFwbWVudSBkaXYgdWwgbGk6bGFzdCcpLmFmdGVyKGRvY2tsaSk7XG5cbiAgICAgIC8vICBSZW1vdmUgbmF0aXZlIGxpem1hcCBpY29uXG4gICAgICAkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS4nK2RuYW1lKycgPiBhIC5pY29uJykuY3NzKCdiYWNrZ3JvdW5kLWltYWdlJywnbm9uZScpO1xuICAgICAgJCgnI21hcG1lbnUgLm5hdi1saXN0ID4gbGkuJytkbmFtZSsnID4gYSAuaWNvbiA+aSAnKS5jc3MoJ21hcmdpbi1sZWZ0JywgJzRweCcpO1xuXG4gICAgICAvLyBBZGQgdG9vbHRpcFxuICAgICAgJCgnI21hcG1lbnUgLm5hdi1saXN0ID4gbGkuJytkbmFtZSsnID4gYScpLnRvb2x0aXAoKTtcblxuICAgICAgLy8gQ3JlYXRlIGRvY2sgdGFiIGNvbnRlbnRcbiAgICAgIHZhciBkb2NrdGFiID0gJyc7XG4gICAgICBkb2NrdGFiKz0nPGRpdiBjbGFzcz1cInRhYi1wYW5lXCIgaWQ9XCInK2RuYW1lKydcIj4nO1xuICAgICAgaWYoIGR0eXBlID09ICdtaW5pZG9jaycpe1xuICAgICAgICAgIGRvY2t0YWIrPSc8ZGl2IGNsYXNzPVwibWluaS1kb2NrLWNsb3NlXCIgdGl0bGU9XCJjbG9zZVwiIHN0eWxlPVwicGFkZGluZzo3cHg7ZmxvYXQ6cmlnaHQ7Y3Vyc29yOnBvaW50ZXI7XCI+PGkgY2xhc3M9XCJpY29uLXJlbW92ZSBpY29uLXdoaXRlXCI+PC9pPjwvZGl2Pic7XG4gICAgICAgICAgZG9ja3RhYis9JyAgICA8ZGl2IGNsYXNzPVwiJytkbmFtZSsnXCI+JztcbiAgICAgICAgICBkb2NrdGFiKz0nICAgICAgICA8aDM+JztcbiAgICAgICAgICBkb2NrdGFiKz0nICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0aXRsZVwiPic7XG4gICAgICAgICAgZG9ja3RhYis9JyAgICAgICAgICAgICAgPGkgY2xhc3M9XCInK2RpY29uKycgaWNvbi13aGl0ZVwiPjwvaT4nO1xuICAgICAgICAgIGRvY2t0YWIrPScgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwidGV4dFwiPiZuYnNwOycrZGxhYmVsKycmbmJzcDs8L3NwYW4+JztcbiAgICAgICAgICBkb2NrdGFiKz0nICAgICAgICAgICAgPC9zcGFuPic7XG4gICAgICAgICAgZG9ja3RhYis9JyAgICAgICAgPC9oMz4nO1xuICAgICAgfVxuICAgICAgZG9ja3RhYis9JyAgICAgICAgPGRpdiBjbGFzcz1cIm1lbnUtY29udGVudFwiPic7XG4gICAgICBkb2NrdGFiKz0gZGNvbnRlbnQ7XG4gICAgICBkb2NrdGFiKz0nICAgICAgICA8L2Rpdj4nO1xuICAgICAgZG9ja3RhYis9JyAgICA8L2Rpdj4nO1xuICAgICAgZG9ja3RhYis9JzwvZGl2Pic7XG4gICAgICBpZiggZHR5cGUgPT0gJ21pbmlkb2NrJyl7XG4gICAgICAgICAgJCgnI21pbmktZG9jay1jb250ZW50JykuYXBwZW5kKGRvY2t0YWIpO1xuICAgICAgICAgICQoJyMnK2RuYW1lKycgZGl2Lm1pbmktZG9jay1jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiggJCgnI21hcG1lbnUgLm5hdi1saXN0ID4gbGkuJytkbmFtZSkuaGFzQ2xhc3MoJ2FjdGl2ZScpICl7XG4gICAgICAgICAgICAgICAgJCgnI2J1dHRvbi0nK2RuYW1lKS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgZWxzZSBpZiggZHR5cGUgPT0gJ3JpZ2h0LWRvY2snIClcbiAgICAgICAgICAkKCcjcmlnaHQtZG9jay1jb250ZW50JykuYXBwZW5kKGRvY2t0YWIpO1xuICAgICAgZWxzZSBpZiggZHR5cGUgPT0gJ2RvY2snIClcbiAgICAgICAgICAkKCcjZG9jay1jb250ZW50JykuYXBwZW5kKGRvY2t0YWIpO1xuICAgICAgZWxzZSBpZiggZHR5cGUgPT0gJ2JvdHRvbWRvY2snIClcbiAgICAgICAgICAkKCcjYm90dG9tLWRvY2stY29udGVudCcpLmFwcGVuZChkb2NrdGFiKTtcblxuICAgICAgLy8gQ3JlYXRlIGRvY2sgdGFiIGxpXG4gICAgICB2YXIgZG9ja3RhYmxpID0gJyc7XG4gICAgICBkb2NrdGFibGkrPSAnPGxpIGlkPVwibmF2LXRhYi0nK2RuYW1lKydcIj48YSBocmVmPVwiIycrZG5hbWUrJ1wiIGRhdGEtdG9nZ2xlPVwidGFiXCI+JytkbGFiZWwrJzwvYT48L2xpPic7XG4gICAgICBpZiggZHR5cGUgPT0gJ21pbmlkb2NrJylcbiAgICAgICAgICAkKCcjbWluaS1kb2NrLXRhYnMnKS5hcHBlbmQoZG9ja3RhYmxpKTtcbiAgICAgIGVsc2UgaWYoIGR0eXBlID09ICdyaWdodC1kb2NrJyApXG4gICAgICAgICAgJCgnI3JpZ2h0LWRvY2stdGFicycpLmFwcGVuZChkb2NrdGFibGkpO1xuICAgICAgZWxzZSBpZiggZHR5cGUgPT0gJ2RvY2snIClcbiAgICAgICAgICAkKCcjZG9jay10YWJzJykuYXBwZW5kKGRvY2t0YWJsaSk7XG4gICAgICBlbHNlIGlmKCBkdHlwZSA9PSAnYm90dG9tZG9jaycgKVxuICAgICAgICAgICQoJyNib3R0b20tZG9jay10YWJzJykuYXBwZW5kKGRvY2t0YWJsaSk7XG5cbiAgfVxuXG4gIC8qKlxuICAgKiBQUklWQVRFIGZ1bmN0aW9uOiBnZXRGZWF0dXJlSW5mb1RvbGVyYW5jZXNcbiAgICogR2V0IHRvbGVyYW5jZXMgZm9yIHBvaW50LCBsaW5lIGFuZCBwb2x5Z29uXG4gICAqIGFzIGNvbmZpZ3VyZWQgd2l0aCBsaXptYXAgcGx1Z2luLCBvciBkZWZhdWx0XG4gICAqIGlmIG5vIGNvbmZpZ3VyYXRpb24gZm91bmQuXG4gICAqIFJldHVybnM6XG4gICAqIHtPYmplY3R9IFRoZSB0b2xlcmFuY2VzIGZvciBwb2ludCwgbGluZSBhbmQgcG9seWdvblxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0RmVhdHVyZUluZm9Ub2xlcmFuY2VzKCl7XG5cbiAgICB2YXIgdG9sZXJhbmNlcyA9IGRlZmF1bHRHZXRGZWF0dXJlSW5mb1RvbGVyYW5jZXM7XG4gICAgaWYoICdwb2ludFRvbGVyYW5jZScgaW4gY29uZmlnLm9wdGlvbnNcbiAgICAgICAgJiYgJ2xpbmVUb2xlcmFuY2UnIGluIGNvbmZpZy5vcHRpb25zXG4gICAgICAgICYmICdwb2x5Z29uVG9sZXJhbmNlJyBpbiBjb25maWcub3B0aW9uc1xuICAgICl7XG4gICAgICB0b2xlcmFuY2VzID0ge1xuICAgICAgICAnRklfUE9JTlRfVE9MRVJBTkNFJzogY29uZmlnLm9wdGlvbnMucG9pbnRUb2xlcmFuY2UsXG4gICAgICAgICdGSV9MSU5FX1RPTEVSQU5DRSc6IGNvbmZpZy5vcHRpb25zLmxpbmVUb2xlcmFuY2UsXG4gICAgICAgICdGSV9QT0xZR09OX1RPTEVSQU5DRSc6IGNvbmZpZy5vcHRpb25zLnBvbHlnb25Ub2xlcmFuY2VcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB0b2xlcmFuY2VzO1xuXG4gIH1cblxuICAvKiBQUklWQVRFIGZ1bmN0aW9uOiBpc0hpZ2hEZW5zaXR5XG4gICAqIFJldHVybiBUcnVlIHdoZW4gdGhlIHNjcmVlbiBpcyBvZiBoaWdoIGRlbnNpdHlcbiAgICogUmV0dXJuczpcbiAgICogQm9vbGVhblxuICAgKi9cbiAgZnVuY3Rpb24gaXNIaWdoRGVuc2l0eSgpe1xuICAgIHJldHVybiAoKHdpbmRvdy5tYXRjaE1lZGlhICYmICh3aW5kb3cubWF0Y2hNZWRpYSgnb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogMTI0ZHBpKSwgb25seSBzY3JlZW4gYW5kIChtaW4tcmVzb2x1dGlvbjogMS4zZHBweCksIG9ubHkgc2NyZWVuIGFuZCAobWluLXJlc29sdXRpb246IDQ4LjhkcGNtKScpLm1hdGNoZXMgfHwgd2luZG93Lm1hdGNoTWVkaWEoJ29ubHkgc2NyZWVuIGFuZCAoLXdlYmtpdC1taW4tZGV2aWNlLXBpeGVsLXJhdGlvOiAxLjMpLCBvbmx5IHNjcmVlbiBhbmQgKC1vLW1pbi1kZXZpY2UtcGl4ZWwtcmF0aW86IDIuNi8yKSwgb25seSBzY3JlZW4gYW5kIChtaW4tLW1vei1kZXZpY2UtcGl4ZWwtcmF0aW86IDEuMyksIG9ubHkgc2NyZWVuIGFuZCAobWluLWRldmljZS1waXhlbC1yYXRpbzogMS4zKScpLm1hdGNoZXMpKSB8fCAod2luZG93LmRldmljZVBpeGVsUmF0aW8gJiYgd2luZG93LmRldmljZVBpeGVsUmF0aW8gPiAxLjMpKTtcbiAgfVxuXG4gIC8vIGNyZWF0aW5nIHRoZSBsaXpNYXAgb2JqZWN0XG4gIHZhciBvYmogPSB7XG4gICAgLyoqXG4gICAgICogUHJvcGVydHk6IG1hcFxuICAgICAqIHs8T3BlbkxheWVycy5NYXA+fSBUaGUgbWFwXG4gICAgICovXG4gICAgbWFwOiBudWxsLFxuICAgIC8qKlxuICAgICAqIFByb3BlcnR5OiBsYXllcnNcbiAgICAgKiB7QXJyYXkoPE9wZW5MYXllcnMuTGF5ZXI+KX0gVGhlIGxheWVyc1xuICAgICAqL1xuICAgIGxheWVyczogbnVsbCxcbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0eTogYmFzZWxheWVyc1xuICAgICAqIHtBcnJheSg8T3BlbkxheWVycy5MYXllcj4pfSBUaGUgYmFzZSBsYXllcnNcbiAgICAgKi9cbiAgICBiYXNlbGF5ZXJzOiBudWxsLFxuICAgIC8qKlxuICAgICAqIFByb3BlcnR5OiBldmVudHNcbiAgICAgKiB7PE9wZW5MYXllcnMuRXZlbnRzPn0gQW4gZXZlbnRzIG9iamVjdCB0aGF0IGhhbmRsZXMgYWxsXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIGV2ZW50cyBvbiB0aGUgbGl6bWFwXG4gICAgICovXG4gICAgZXZlbnRzOiBudWxsLFxuICAgIC8qKlxuICAgICAqIFByb3BlcnR5OiBjb25maWdcbiAgICAgKiB7T2JqZWN0fSBUaGUgbWFwIGNvbmZpZ1xuICAgICAqL1xuICAgIGNvbmZpZzogbnVsbCxcbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0eTogZGljdGlvbm5hcnlcbiAgICAgKiB7T2JqZWN0fSBUaGUgbWFwIGRpY3Rpb25uYXJ5XG4gICAgICovXG4gICAgZGljdGlvbmFyeTogbnVsbCxcbiAgICAvKipcbiAgICAgKiBQcm9wZXJ0eTogdHJlZVxuICAgICAqIHtPYmplY3R9IFRoZSBtYXAgdHJlZVxuICAgICAqL1xuICAgIHRyZWU6IG51bGwsXG4gICAgLyoqXG4gICAgICogUHJvcGVydHk6IGxpem1hcExheWVyRmlsdGVyQWN0aXZlXG4gICAgICoge09iamVjdH0gQ29udGFpbnMgbWFpbiBmaWx0ZXJlZCBsYXllciBpZiBmaWx0ZXIgaXMgYWN0aXZlXG4gICAgICovXG4gICAgbGl6bWFwTGF5ZXJGaWx0ZXJBY3RpdmU6IG51bGwsXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGNoZWNrTW9iaWxlXG4gICAgICovXG4gICAgY2hlY2tNb2JpbGU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIG1DaGVja01vYmlsZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGNsZWFuTmFtZVxuICAgICAqL1xuICAgIGNsZWFuTmFtZTogZnVuY3Rpb24oIGFOYW1lICkge1xuICAgICAgcmV0dXJuIGNsZWFuTmFtZSggYU5hbWUgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBnZXROYW1lQnlDbGVhbk5hbWVcbiAgICAgKi9cbiAgICBnZXROYW1lQnlDbGVhbk5hbWU6IGZ1bmN0aW9uKCBjbGVhbk5hbWUgKSB7XG4gICAgICByZXR1cm4gZ2V0TmFtZUJ5Q2xlYW5OYW1lKCBjbGVhbk5hbWUgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBnZXROYW1lQnlTaG9ydE5hbWVcbiAgICAgKi9cbiAgICBnZXROYW1lQnlTaG9ydE5hbWU6IGZ1bmN0aW9uKCBzaG9ydE5hbWUgKSB7XG4gICAgICByZXR1cm4gZ2V0TmFtZUJ5U2hvcnROYW1lKCBzaG9ydE5hbWUgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBnZXROYW1lQnlUeXBlTmFtZVxuICAgICAqL1xuICAgIGdldE5hbWVCeVR5cGVOYW1lOiBmdW5jdGlvbiggdHlwZU5hbWUgKSB7XG4gICAgICByZXR1cm4gZ2V0TmFtZUJ5VHlwZU5hbWUoIHR5cGVOYW1lICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWVcbiAgICAgKi9cbiAgICBnZXRMYXllck5hbWVCeUNsZWFuTmFtZTogZnVuY3Rpb24oIGNsZWFuTmFtZSApIHtcbiAgICAgIHJldHVybiBnZXRMYXllck5hbWVCeUNsZWFuTmFtZSggY2xlYW5OYW1lICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogZ2V0RG9ja1JpZ2h0UG9zaXRpb25cbiAgICAgKi9cbiAgICBnZXREb2NrUmlnaHRQb3NpdGlvbjogZnVuY3Rpb24oICkge1xuICAgICAgcmV0dXJuIGdldERvY2tSaWdodFBvc2l0aW9uKCApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGFkZE1lc3NhZ2VcbiAgICAgKi9cbiAgICBhZGRNZXNzYWdlOiBmdW5jdGlvbiggYU1lc3NhZ2UsIGFUeXBlLCBhQ2xvc2UgKSB7XG4gICAgICByZXR1cm4gbUFkZE1lc3NhZ2UoIGFNZXNzYWdlLCBhVHlwZSwgYUNsb3NlICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogdXBkYXRlU3dpdGNoZXJTaXplXG4gICAgICovXG4gICAgdXBkYXRlU3dpdGNoZXJTaXplOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB1cGRhdGVTd2l0Y2hlclNpemUoKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiB1cGRhdGVNaW5pRG9ja1NpemVcbiAgICAgKi9cbiAgICB1cGRhdGVNaW5pRG9ja1NpemU6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHVwZGF0ZU1pbmlEb2NrU2l6ZSgpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IHRyYW5zZm9ybUJvdW5kc1xuICAgICAqL1xuICAgIGxvYWRQcm9qRGVmaW5pdGlvbjogZnVuY3Rpb24oIGFDUlMsIGFDYWxsYmFjayApIHtcbiAgICAgIHJldHVybiBsb2FkUHJvakRlZmluaXRpb24oIGFDUlMsIGFDYWxsYmFjayApO1xuICAgIH0sXG5cblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogdXBkYXRlQ29udGVudFNpemVcbiAgICAgKi9cbiAgICB1cGRhdGVDb250ZW50U2l6ZTogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gdXBkYXRlQ29udGVudFNpemUoKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGdldExheWVyRmVhdHVyZVxuICAgICAqL1xuICAgIGdldExheWVyRmVhdHVyZTogZnVuY3Rpb24oIGZlYXR1cmVUeXBlLCBmaWQsIGFDYWxsYmFjaywgYUNhbGxiYWNrTm90Zm91bmQsIGZvcmNlVG9Mb2FkICkge1xuICAgICAgZ2V0TGF5ZXJGZWF0dXJlKCBmZWF0dXJlVHlwZSwgZmlkLCBhQ2FsbGJhY2ssIGFDYWxsYmFja05vdGZvdW5kLCBmb3JjZVRvTG9hZCApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGdldEZlYXR1cmVEYXRhXG4gICAgICovXG4gICAgZ2V0RmVhdHVyZURhdGE6IGZ1bmN0aW9uKGFOYW1lLCBhRmlsdGVyLCBhRmVhdHVyZUlELCBhR2VvbWV0cnlOYW1lLCByZXN0cmljdFRvTWFwRXh0ZW50LCBzdGFydEluZGV4LCBtYXhGZWF0dXJlcywgYUNhbGxCYWNrKSB7XG4gICAgICBnZXRGZWF0dXJlRGF0YShhTmFtZSwgYUZpbHRlciwgYUZlYXR1cmVJRCwgYUdlb21ldHJ5TmFtZSwgcmVzdHJpY3RUb01hcEV4dGVudCwgc3RhcnRJbmRleCwgbWF4RmVhdHVyZXMsIGFDYWxsQmFjayk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogdHJhbnNsYXRlV2ZzRmllbGRWYWx1ZXNcbiAgICAgKi9cbiAgICB0cmFuc2xhdGVXZnNGaWVsZFZhbHVlczogZnVuY3Rpb24oYU5hbWUsIGZpZWxkTmFtZSwgZmllbGRWYWx1ZSwgdHJhbnNsYXRpb25fZGljdCkge1xuICAgICAgcmV0dXJuIHRyYW5zbGF0ZVdmc0ZpZWxkVmFsdWVzKGFOYW1lLCBmaWVsZE5hbWUsIGZpZWxkVmFsdWUsIHRyYW5zbGF0aW9uX2RpY3QpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IHpvb21Ub0ZlYXR1cmVcbiAgICAgKi9cbiAgICB6b29tVG9GZWF0dXJlOiBmdW5jdGlvbiggZmVhdHVyZVR5cGUsIGZpZCwgem9vbUFjdGlvbiApIHtcbiAgICAgIHpvb21Ub0ZlYXR1cmUoIGZlYXR1cmVUeXBlLCBmaWQsIHpvb21BY3Rpb24gKTtcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGdldFByaW50R3JpZEludGVydmFsXG4gICAgICovXG4gICAgZ2V0UHJpbnRHcmlkSW50ZXJ2YWw6IGZ1bmN0aW9uKGFMYXlvdXQsIGFTY2FsZSwgYVNjYWxlcykge1xuICAgICAgcmV0dXJuIGdldFByaW50R3JpZEludGVydmFsKGFMYXlvdXQsIGFTY2FsZSwgYVNjYWxlcyk7XG4gICAgfSxcblxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBnZXRQcmludENhcGFiaWxpdGllc1xuICAgICAqL1xuICAgIGdldFByaW50Q2FwYWJpbGl0aWVzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBwcmludENhcGFiaWxpdGllcztcbiAgICB9LFxuXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGdldEV4dGVybmFsQmFzZWxheWVyc1JlcGxhY2VtZW50XG4gICAgICovXG4gICAgZ2V0RXh0ZXJuYWxCYXNlbGF5ZXJzUmVwbGFjZW1lbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGV4dGVybmFsQmFzZWxheWVyc1JlcGxhY2VtZW50O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGxhdW5jaFRvb2x0aXBMYXllclxuICAgICAqL1xuICAgIGxhdW5jaFRvb2x0aXBMYXllcjogZnVuY3Rpb24oIGFMYXllck5hbWUgKSB7XG4gICAgICAgIHZhciB0bE9wdGlvbnMgPSAkKCcjdG9vbHRpcC1sYXllci1saXN0IG9wdGlvblt2YWx1ZT1cIicrYUxheWVyTmFtZSsnXCJdJyk7XG4gICAgICAgIGlmICggdGxPcHRpb25zLmxlbmd0aCA9PSAxICYmICQoJyN0b29sdGlwLWxheWVyLWxpc3QnKS52YWwoKSAhPSBhTGF5ZXJOYW1lKVxuICAgICAgICAgICAgJCgnI3Rvb2x0aXAtbGF5ZXItbGlzdCcpLnZhbCggYUxheWVyTmFtZSApLmNoYW5nZSgpO1xuICAgICAgICBlbHNlIGlmICggdGxPcHRpb25zLmxlbmd0aCAhPSAxICYmICQoJyN0b29sdGlwLWxheWVyLWxpc3QnKS52YWwoKSAhPSAnJyApXG4gICAgICAgICAgICAkKCcjdG9vbHRpcC1sYXllci1saXN0JykudmFsKCcnKS5jaGFuZ2UoKTtcbiAgICAgICAgcmV0dXJuICgkKCcjdG9vbHRpcC1sYXllci1saXN0JykudmFsKCkgPT0gYUxheWVyTmFtZSk7XG4gICAgfSxcblxuXG4gICAgbGF1bmNoRWRpdGlvbjogZnVuY3Rpb24oIGFMYXllcklkLCBhRmlkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgZGVsZXRlRWRpdGlvbkZlYXR1cmU6IGZ1bmN0aW9uKCBhTGF5ZXJJZCwgYUZpZCwgYU1lc3NhZ2UsIGFDYWxsYmFjayApe1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfSxcblxuICAgIGRlYWN0aXZhdGVUb29sQ29udHJvbHM6IGZ1bmN0aW9uKCBldnQgKSB7XG4gICAgICByZXR1cm4gZGVhY3RpdmF0ZVRvb2xDb250cm9scyggZXZ0ICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogZXhwb3J0VmVjdG9yTGF5ZXJcbiAgICAgKi9cbiAgICBleHBvcnRWZWN0b3JMYXllcjogZnVuY3Rpb24oIGFOYW1lLCBlZm9ybWF0LCByZXN0cmljdFRvTWFwRXh0ZW50ICkge1xuICAgICAgcmV0dXJuIGV4cG9ydFZlY3RvckxheWVyKCBhTmFtZSwgZWZvcm1hdCwgcmVzdHJpY3RUb01hcEV4dGVudCApO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGdldFZlY3RvckxheWVyV2ZzVXJsXG4gICAgICovXG4gICAgZ2V0VmVjdG9yTGF5ZXJXZnNVcmw6IGZ1bmN0aW9uKCBhTmFtZSwgYUZpbHRlciwgYUZlYXR1cmVJZCwgZ2VvbWV0cnlOYW1lLCByZXN0cmljdFRvTWFwRXh0ZW50ICkge1xuICAgICAgcmV0dXJuIGdldFZlY3RvckxheWVyV2ZzVXJsKCBhTmFtZSwgYUZpbHRlciwgYUZlYXR1cmVJZCwgZ2VvbWV0cnlOYW1lLCByZXN0cmljdFRvTWFwRXh0ZW50ICk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogZ2V0VmVjdG9yTGF5ZXJGZWF0dXJlVHlwZVxuICAgICAqL1xuICAgIGdldFZlY3RvckxheWVyRmVhdHVyZVR5cGVzOiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBnZXRWZWN0b3JMYXllckZlYXR1cmVUeXBlcygpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGdldFZlY3RvckxheWVyUmVzdWx0Rm9ybWF0XG4gICAgICovXG4gICAgZ2V0VmVjdG9yTGF5ZXJSZXN1bHRGb3JtYXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGdldFZlY3RvckxheWVyUmVzdWx0Rm9ybWF0KCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogZ2V0TGF5ZXJDb25maWdCeUlkXG4gICAgICovXG4gICAgZ2V0TGF5ZXJDb25maWdCeUlkOiBmdW5jdGlvbiggYUxheWVySWQsIGFDb25mT2JqZXQsIGFJZEF0dHJpYnV0ZSApIHtcbiAgICAgIHJldHVybiBnZXRMYXllckNvbmZpZ0J5SWQoIGFMYXllcklkLCBhQ29uZk9iamV0LCBhSWRBdHRyaWJ1dGUgKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBnZXRGZWF0dXJlUG9wdXBDb250ZW50XG4gICAgICovXG4gICAgZ2V0RmVhdHVyZVBvcHVwQ29udGVudDogZnVuY3Rpb24oIGFOYW1lLCBmZWF0LCBhQ2FsbGJhY2spIHtcbiAgICAgIHJldHVybiBnZXRGZWF0dXJlUG9wdXBDb250ZW50KGFOYW1lLCBmZWF0LCBhQ2FsbGJhY2spO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGdldEZlYXR1cmVQb3B1cENvbnRlbnRCeUZlYXR1cmVJbnRlcnNlY3Rpb25cbiAgICAgKi9cbiAgICBnZXRGZWF0dXJlUG9wdXBDb250ZW50QnlGZWF0dXJlSW50ZXJzZWN0aW9uOiBmdW5jdGlvbiggYU5hbWUsIGZlYXQsIGFDYWxsYmFjaykge1xuICAgICAgcmV0dXJuIGdldEZlYXR1cmVQb3B1cENvbnRlbnRCeUZlYXR1cmVJbnRlcnNlY3Rpb24oYU5hbWUsIGZlYXQsIGFDYWxsYmFjayk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogYWRkR2VvbWV0cnlGZWF0dXJlSW5mb1xuICAgICAqL1xuICAgIGFkZEdlb21ldHJ5RmVhdHVyZUluZm86IGZ1bmN0aW9uKHBvcHVwLCBjb250YWluZXJJZCl7XG4gICAgICByZXR1cm4gYWRkR2VvbWV0cnlGZWF0dXJlSW5mbyhwb3B1cCwgY29udGFpbmVySWQpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGFkZENoaWxkcmVuRmVhdHVyZUluZm9cbiAgICAgKi9cbiAgICBhZGRDaGlsZHJlbkZlYXR1cmVJbmZvOiBmdW5jdGlvbihwb3B1cCwgY29udGFpbmVySWQpe1xuICAgICAgcmV0dXJuIGFkZENoaWxkcmVuRmVhdHVyZUluZm8ocG9wdXAsIGNvbnRhaW5lcklkKTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogTWV0aG9kOiBhZGRDaGlsZHJlbkRhdGF2aXpGaWx0ZXJlZEJ5UG9wdXBGZWF0dXJlXG4gICAgICovXG4gICAgYWRkQ2hpbGRyZW5EYXRhdml6RmlsdGVyZWRCeVBvcHVwRmVhdHVyZTogZnVuY3Rpb24ocG9wdXAsIGNvbnRhaW5lcklkKXtcbiAgICAgIHJldHVybiBhZGRDaGlsZHJlbkRhdGF2aXpGaWx0ZXJlZEJ5UG9wdXBGZWF0dXJlKHBvcHVwLCBjb250YWluZXJJZCk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIE1ldGhvZDogYWRkRG9ja1xuICAgICAqL1xuICAgIGFkZERvY2s6IGZ1bmN0aW9uKCBkbmFtZSwgZGxhYmVsLCBkdHlwZSwgZGNvbnRlbnQsIGRpY29uKXtcbiAgICAgIHJldHVybiBhZGREb2NrKGRuYW1lLCBkbGFiZWwsIGR0eXBlLCBkY29udGVudCwgZGljb24pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBNZXRob2Q6IGluaXRcbiAgICAgKi9cbiAgICBpbml0OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgIC8vZ2V0IGNvbmZpZ1xuICAgICAgJC5nZXRKU09OKGxpelVybHMuY29uZmlnLGxpelVybHMucGFyYW1zLGZ1bmN0aW9uKGNmZ0RhdGEpIHtcbiAgICAgICAgY29uZmlnID0gY2ZnRGF0YTtcbiAgICAgICAgY29uZmlnLm9wdGlvbnMuaGFzT3ZlcnZpZXcgPSBmYWxzZTtcblxuICAgICAgICAvLyBzdG9yZSBsYXllcklEc1xuICAgICAgICBpZiAoICd1c2VMYXllcklEcycgaW4gY29uZmlnLm9wdGlvbnMgJiYgY29uZmlnLm9wdGlvbnMudXNlTGF5ZXJJRHMgPT0gJ1RydWUnICkge1xuICAgICAgICAgICAgZm9yICggdmFyIGxheWVyTmFtZSBpbiBjb25maWcubGF5ZXJzICkge1xuICAgICAgICAgICAgICAgIHZhciBjb25maWdMYXllciA9IGNvbmZpZy5sYXllcnNbbGF5ZXJOYW1lXTtcbiAgICAgICAgICAgICAgICBsYXllcklkTWFwW2NvbmZpZ0xheWVyLmlkXSA9IGxheWVyTmFtZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBzdG9yZSBzaG9ydG5hbWVzIGFuZCBzaG9ydG5hbWVzXG4gICAgICAgIGZvciAoIHZhciBsYXllck5hbWUgaW4gY29uZmlnLmxheWVycyApIHtcbiAgICAgICAgICAgIHZhciBjb25maWdMYXllciA9IGNvbmZpZy5sYXllcnNbbGF5ZXJOYW1lXTtcbiAgICAgICAgICAgIGlmICggJ3Nob3J0bmFtZScgaW4gY29uZmlnTGF5ZXIgJiYgY29uZmlnTGF5ZXIuc2hvcnRuYW1lICE9ICcnIClcbiAgICAgICAgICAgICAgICBzaG9ydE5hbWVNYXBbY29uZmlnTGF5ZXIuc2hvcnRuYW1lXSA9IGxheWVyTmFtZTtcbiAgICAgICAgICAgIGNvbmZpZ0xheWVyLmNsZWFubmFtZSA9IGNsZWFuTmFtZShsYXllck5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgIC8vZ2V0IGNhcGFiaWxpdGllc1xuICAgICAgICB2YXIgc2VydmljZSA9IE9wZW5MYXllcnMuVXRpbC51cmxBcHBlbmQobGl6VXJscy53bXNcbiAgICAgICAgICAsT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbiAgICAgICAgKTtcbiAgICAgICAgJC5nZXQoc2VydmljZVxuICAgICAgICAgICx7U0VSVklDRTonV01TJyxSRVFVRVNUOidHZXRDYXBhYmlsaXRpZXMnLFZFUlNJT046JzEuMy4wJ31cbiAgICAgICAgICAsZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAkLmdldChzZXJ2aWNlXG4gICAgICAgICAgLHtTRVJWSUNFOidXTVRTJyxSRVFVRVNUOidHZXRDYXBhYmlsaXRpZXMnLFZFUlNJT046JzEuMC4wJ31cbiAgICAgICAgICAsZnVuY3Rpb24od210c0NhcGFEYXRhKSB7XG4gICAgICAgICQuZ2V0KHNlcnZpY2VcbiAgICAgICAgICAse1NFUlZJQ0U6J1dGUycsUkVRVUVTVDonR2V0Q2FwYWJpbGl0aWVzJyxWRVJTSU9OOicxLjAuMCd9XG4gICAgICAgICAgLGZ1bmN0aW9uKHdmc0NhcGFEYXRhKSB7XG5cbiAgICAgICAgICAgIC8vcGFyc2UgY2FwYWJpbGl0aWVzXG4gICAgICAgICAgICBpZiAoIXBhcnNlRGF0YShkYXRhKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcblxuICAgICAgICAgICAgdmFyIHdtdHNGb3JtYXQgPSBuZXcgT3BlbkxheWVycy5Gb3JtYXQuV01UU0NhcGFiaWxpdGllcyh7fSk7XG4gICAgICAgICAgICB3bXRzQ2FwYWJpbGl0aWVzID0gd210c0Zvcm1hdC5yZWFkKCB3bXRzQ2FwYURhdGEgKTtcbiAgICAgICAgICAgIGlmICggJ2V4Y2VwdGlvblJlcG9ydCcgaW4gd210c0NhcGFiaWxpdGllcyApIHtcbiAgICAgICAgICAgICAgICB3bXRzRWxlbSA9ICQoJyNtZXRhZGF0YS13bXRzLWdldGNhcGFiaWxpdGllcy11cmwnKTtcbiAgICAgICAgICAgICAgICBpZiAoIHdtdHNFbGVtLmxlbmd0aCAhPSAwICkge1xuICAgICAgICAgICAgICAgICAgICB3bXRzRWxlbS5iZWZvcmUoJzxpIHRpdGxlPVwiJyt3bXRzQ2FwYWJpbGl0aWVzLmV4Y2VwdGlvblJlcG9ydC5leGNlcHRpb25zWzBdLnRleHRzWzBdKydcIiBjbGFzcz1cImljb24td2FybmluZy1zaWduXCI+PC9pPiZuYnNwOycpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB3bXRzQ2FwYWJpbGl0aWVzID0gbnVsbDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgd2ZzQ2FwYWJpbGl0aWVzID0gJCh3ZnNDYXBhRGF0YSk7XG4gICAgICAgICAgICB2YXIgZmVhdHVyZVR5cGVzID0gZ2V0VmVjdG9yTGF5ZXJGZWF0dXJlVHlwZXMoKTtcbiAgICAgICAgICAgIGZlYXR1cmVUeXBlcy5lYWNoKCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHZhciB0eXBlTmFtZSA9ICQodGhpcykuZmluZCgnTmFtZScpLnRleHQoKTtcbiAgICAgICAgICAgICAgICB2YXIgbGF5ZXJOYW1lID0gbGl6TWFwLmdldE5hbWVCeVR5cGVOYW1lKCB0eXBlTmFtZSApO1xuICAgICAgICAgICAgICAgIGlmICggIWxheWVyTmFtZSApIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVOYW1lIGluIGNvbmZpZy5sYXllcnMpXG4gICAgICAgICAgICAgICAgICAgICAgbGF5ZXJOYW1lID0gdHlwZU5hbWVcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoICh0eXBlTmFtZSBpbiBzaG9ydE5hbWVNYXApICYmIChzaG9ydE5hbWVNYXBbdHlwZU5hbWVdIGluIGNvbmZpZy5sYXllcnMpKVxuICAgICAgICAgICAgICAgICAgICAgIGxheWVyTmFtZSA9IHNob3J0TmFtZU1hcFt0eXBlTmFtZV07XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgIGZvciAobCBpbiBjb25maWcubGF5ZXJzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobC5zcGxpdCgnICcpLmpvaW4oJ18nKSA9PSB0eXBlTmFtZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBsYXllck5hbWUgPSBsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoICEobGF5ZXJOYW1lIGluIGNvbmZpZy5sYXllcnMpIClcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuXG4gICAgICAgICAgICAgICAgdmFyIGNvbmZpZ0xheWVyID0gY29uZmlnLmxheWVyc1tsYXllck5hbWVdO1xuICAgICAgICAgICAgICAgIGNvbmZpZ0xheWVyLnR5cGVuYW1lID0gdHlwZU5hbWU7XG4gICAgICAgICAgICAgICAgdHlwZU5hbWVNYXBbdHlwZU5hbWVdID0gbGF5ZXJOYW1lO1xuICAgICAgICAgICAgfSApO1xuXG4gICAgICAgICAgLy9zZXQgdGl0bGUgYW5kIGFic3RyYWN0IGNvbWluZyBmcm9tIGNhcGFiaWxpdGllc1xuICAgICAgICAgICQoJyNhYnN0cmFjdCcpLmh0bWwoY2FwYWJpbGl0aWVzLmFic3RyYWN0ID8gY2FwYWJpbGl0aWVzLmFic3RyYWN0IDogJycpO1xuXG4gICAgICAgICAgLy8gZ2V0IGFuZCBhbmFseXNlIHRyZWVcbiAgICAgICAgICB2YXIgY2FwYWJpbGl0eSA9IGNhcGFiaWxpdGllcy5jYXBhYmlsaXR5O1xuICAgICAgICAgIGJlZm9yZUxheWVyVHJlZUNyZWF0ZWQoKTtcbiAgICAgICAgICB2YXIgZmlyc3RMYXllciA9IGNhcGFiaWxpdHkubmVzdGVkTGF5ZXJzWzBdO1xuICAgICAgICAgIGdldExheWVyVHJlZShmaXJzdExheWVyLHRyZWUpO1xuICAgICAgICAgIGFuYWx5c2VOb2RlKHRyZWUpO1xuICAgICAgICAgIHNlbGYuY29uZmlnID0gY29uZmlnO1xuICAgICAgICAgIHNlbGYudHJlZSA9IHRyZWU7XG4gICAgICAgICAgc2VsZi5ldmVudHMudHJpZ2dlckV2ZW50KFwidHJlZWNyZWF0ZWRcIiwgc2VsZik7XG5cbiAgICAgICAgICAvLyBjcmVhdGUgdGhlIG1hcFxuICAgICAgICAgIGluaXRQcm9qZWN0aW9ucyhmaXJzdExheWVyKTtcbiAgICAgICAgICBjcmVhdGVNYXAoKTtcbiAgICAgICAgICBzZWxmLm1hcCA9IG1hcDtcbiAgICAgICAgICBzZWxmLmxheWVycyA9IGxheWVycztcbiAgICAgICAgICBzZWxmLmJhc2VsYXllcnMgPSBiYXNlbGF5ZXJzO1xuICAgICAgICAgIHNlbGYuY29udHJvbHMgPSBjb250cm9scztcbiAgICAgICAgICBzZWxmLmV2ZW50cy50cmlnZ2VyRXZlbnQoXCJtYXBjcmVhdGVkXCIsIHNlbGYpO1xuXG4gICAgICAgICAgLy8gY3JlYXRlIHRoZSBzd2l0Y2hlclxuICAgICAgICAgIGNyZWF0ZVN3aXRjaGVyKCk7XG4gICAgICAgICAgc2VsZi5ldmVudHMudHJpZ2dlckV2ZW50KFwibGF5ZXJzYWRkZWRcIiwgc2VsZik7XG5cblxuICAgICAgICAgIC8vIFZlcmlmeWluZyB6LWluZGV4XG4gICAgICAgICAgdmFyIGxhc3RMYXllclpJbmRleCA9IG1hcC5sYXllcnNbbWFwLmxheWVycy5sZW5ndGgtMV0uZ2V0WkluZGV4KCk7XG4gICAgICAgICAgaWYgKCBsYXN0TGF5ZXJaSW5kZXggPiBtYXAuWl9JTkRFWF9CQVNFWydGZWF0dXJlJ10gLSAxMDAgKSB7XG4gICAgICAgICAgICBtYXAuWl9JTkRFWF9CQVNFWydGZWF0dXJlJ10gPSBsYXN0TGF5ZXJaSW5kZXggKyAxMDA7XG4gICAgICAgICAgICBtYXAuWl9JTkRFWF9CQVNFWydQb3B1cCddID0gbWFwLlpfSU5ERVhfQkFTRVsnRmVhdHVyZSddICsgMjU7XG4gICAgICAgICAgICBpZiAoIG1hcC5aX0lOREVYX0JBU0VbJ1BvcHVwJ10gPiBtYXAuWl9JTkRFWF9CQVNFWydDb250cm9sJ10gLSAyNSApXG4gICAgICAgICAgICAgICAgbWFwLlpfSU5ERVhfQkFTRVsnQ29udHJvbCddID0gbWFwLlpfSU5ERVhfQkFTRVsnUG9wdXAnXSArIDI1O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGluaXRpYWxpemUgdGhlIG1hcFxuICAgICAgICAgIC8vIFNldCBtYXAgZXh0ZW50IGRlcGVuZGluZyBvbiBvcHRpb25zXG4gICAgICAgICAgdmFyIHZlcmlmeWluZ1Zpc2liaWxpdHkgPSB0cnVlO1xuICAgICAgICAgIHZhciBocmVmUGFyYW0gPSBPcGVuTGF5ZXJzLlV0aWwuZ2V0UGFyYW1ldGVycyh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgICAgaWYgKCFtYXAuZ2V0Q2VudGVyKCkpIHtcbiAgICAgICAgICAgIGlmICggaHJlZlBhcmFtLmJib3ggfHwgaHJlZlBhcmFtLkJCT1ggKSB7XG4gICAgICAgICAgICAgICAgdmFyIGhyZWZCYm94ID0gbnVsbDtcbiAgICAgICAgICAgICAgICBpZiAoIGhyZWZQYXJhbS5iYm94IClcbiAgICAgICAgICAgICAgICAgIGhyZWZCYm94ID0gT3BlbkxheWVycy5Cb3VuZHMuZnJvbUFycmF5KCBocmVmUGFyYW0uYmJveCApO1xuICAgICAgICAgICAgICAgIGlmICggaHJlZlBhcmFtLkJCT1ggKVxuICAgICAgICAgICAgICAgICAgaHJlZkJib3ggPSBPcGVuTGF5ZXJzLkJvdW5kcy5mcm9tQXJyYXkoIGhyZWZQYXJhbS5CQk9YICk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIGhyZWZQYXJhbS5jcnMgJiYgaHJlZlBhcmFtLmNycyAhPSBtYXAuZ2V0UHJvamVjdGlvbigpIClcbiAgICAgICAgICAgICAgICAgIGhyZWZCYm94LnRyYW5zZm9ybSggaHJlZlBhcmFtLmNycywgbWFwLmdldFByb2plY3Rpb24oKSApXG4gICAgICAgICAgICAgICAgaWYgKCBocmVmUGFyYW0uQ1JTICYmIGhyZWZQYXJhbS5DUlMgIT0gbWFwLmdldFByb2plY3Rpb24oKSApXG4gICAgICAgICAgICAgICAgICBocmVmQmJveC50cmFuc2Zvcm0oIGhyZWZQYXJhbS5DUlMsIG1hcC5nZXRQcm9qZWN0aW9uKCkgKVxuICAgICAgICAgICAgICAgIGlmKCBtYXAucmVzdHJpY3RlZEV4dGVudC5jb250YWluc0JvdW5kcyggaHJlZkJib3ggKSApXG4gICAgICAgICAgICAgICAgICBtYXAuem9vbVRvRXh0ZW50KCBocmVmQmJveCwgdHJ1ZSApO1xuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgdmFyIHByb2pCYm94ID0gJCgnI21ldGFkYXRhIC5iYm94JykudGV4dCgpO1xuICAgICAgICAgICAgICAgICAgcHJvakJib3ggPSBPcGVuTGF5ZXJzLkJvdW5kcy5mcm9tU3RyaW5nKHByb2pCYm94KTtcbiAgICAgICAgICAgICAgICAgIGlmKCBwcm9qQmJveC5jb250YWluc0JvdW5kcyggaHJlZkJib3ggKSApIHtcbiAgICAgICAgICAgICAgICAgICAgICB2YXIgcHJvalByb2ogPSAkKCcjbWV0YWRhdGEgLnByb2onKS50ZXh0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgbG9hZFByb2pEZWZpbml0aW9uKCBwcm9qUHJvaiwgZnVuY3Rpb24oIGFQcm9qICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmQmJveC50cmFuc2Zvcm0oIGFQcm9qLCBtYXAuZ2V0UHJvamVjdGlvbigpICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIG1hcC56b29tVG9FeHRlbnQoIGhyZWZCYm94LCB0cnVlICk7XG4gICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBtYXAuem9vbVRvRXh0ZW50KG1hcC5pbml0aWFsRXh0ZW50KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtYXAuem9vbVRvRXh0ZW50KG1hcC5pbml0aWFsRXh0ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZlcmlmeWluZ1Zpc2liaWxpdHkgPSBmYWxzZTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB1cGRhdGVDb250ZW50U2l6ZSgpO1xuICAgICAgICAgIG1hcC5ldmVudHMudHJpZ2dlckV2ZW50KFwiem9vbWVuZFwiLHtcInpvb21DaGFuZ2VkXCI6IHRydWV9KTtcblxuICAgICAgICAgIC8vIGNyZWF0ZSBvdmVydmlldyBpZiAnT3ZlcnZpZXcnIGxheWVyXG4gICAgICAgICAgY3JlYXRlT3ZlcnZpZXcoKTtcblxuICAgICAgICAgIC8vIGNyZWF0ZSBuYXZpZ2F0aW9uIGFuZCB0b29sYmFyXG4gICAgICAgICAgY3JlYXRlTmF2YmFyKCk7XG4gICAgICAgICAgY3JlYXRlVG9vbGJhcigpO1xuICAgICAgICAgIHNlbGYuZXZlbnRzLnRyaWdnZXJFdmVudChcInRvb2xiYXJjcmVhdGVkXCIsIHNlbGYpO1xuXG4gICAgICAgICAgLy8gY3JlYXRlIHBlcm1hbGlua1xuICAgICAgICAgIGNyZWF0ZVBlcm1hbGluaygpO1xuXG4gICAgICAgICAgLy8gVG9nZ2xlIE9wZW5MYXllcnMgdmlzaWJpbGl0eSB0byB0cnVlIGZvciBsZWdlbmQgY2hlY2tib3hlc1xuICAgICAgICAgIC8vIDEvIENoZWNrIHBlcm1hbGluayBpcyB1c2VkIG9yIG5vdFxuICAgICAgICAgIHZhciBsYXllcnNIYXZlQmVlbkFjdGl2YXRlZEJ5UGVybWFsaW5rID0gZmFsc2U7XG4gICAgICAgICAgdmFyIHVwYXJhbXMgPSBnZXRVcmxQYXJhbWV0ZXJzKCk7XG4gICAgICAgICAgaWYoICdsYXllcnMnIGluIHVwYXJhbXMgKSB7XG4gICAgICAgICAgICB2YXIgcGxheWVycyA9IHVwYXJhbXMubGF5ZXJzO1xuICAgICAgICAgICAgZm9yKCB2YXIgaT0wOyBpIDwgbWFwLmxheWVycy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICAgIHZhciBsID0gbWFwLmxheWVyc1tpXTtcbiAgICAgICAgICAgICAgdmFyIGxiYXNlID0gbC5pc0Jhc2VMYXllcjtcbiAgICAgICAgICAgICAgaWYoICFsYmFzZSApe1xuICAgICAgICAgICAgICAgIGlmICggcGxheWVyc1tpXSA9PSAnVCcgKXtcbiAgICAgICAgICAgICAgICAgIGxheWVyc0hhdmVCZWVuQWN0aXZhdGVkQnlQZXJtYWxpbmsgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgbC5zZXRWaXNpYmlsaXR5KHRydWUpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcnVuUGVybWFsaW5rKCB1cGFyYW1zICk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gMi8gVG9nZ2xlIGNoZWNrYm94ZXNcbiAgICAgICAgICAkKCcjc3dpdGNoZXIgYnV0dG9uLmNoZWNrYm94W25hbWU9XCJsYXllclwiXScpLmVhY2goZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBjYiA9ICQodGhpcyk7XG4gICAgICAgICAgICB2YXIgY2xlYW5OYW1lID0gY2IudmFsKCk7XG4gICAgICAgICAgICB2YXIgb0xheWVyID0gbWFwLmdldExheWVyc0J5TmFtZShjbGVhbk5hbWUpWzBdO1xuICAgICAgICAgICAgaWYoIG9MYXllciApe1xuICAgICAgICAgICAgICAvLyB0b2dnbGUgY2hlY2tlZCBjbGFzcyBmb3IgcGVybWFsaW5rIGxheWVyc1xuICAgICAgICAgICAgICAvLyBiZWNhdXNlIE9MIGhhcyBhbHJlYWR5IGRyYXduIHRoZW0gaW4gbWFwXG4gICAgICAgICAgICAgIGNiLnRvZ2dsZUNsYXNzKCdjaGVja2VkJywgb0xheWVyLnZpc2liaWxpdHkpO1xuXG4gICAgICAgICAgICAgIC8vIENoZWNrIGxheWVycyB3aWNoIGFyZSBub3QgeWV0IGNoZWNrZWQgYnV0IG5lZWQgdG8gKCBmb3Igbm9ybWFsIGJlaGF2aW91ciBvdXRzaWRlIHBlcm1hbGluayApXG4gICAgICAgICAgICAgIC8vIFRoaXMgd2lsbCB0cmlnZ2VyIGxheWVycyB0byBiZSBkcmF3blxuICAgICAgICAgICAgICBpZiggIWNiLmhhc0NsYXNzKCdjaGVja2VkJykgJiYgb0xheWVyLmlzVmlzaWJsZSAmJiAhbGF5ZXJzSGF2ZUJlZW5BY3RpdmF0ZWRCeVBlcm1hbGluayl7XG4gICAgICAgICAgICAgICAgY2IuY2xpY2soKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAvLyB2ZXJpZnlpbmcgdGhlIGxheWVyIHZpc2liaWxpdHkgZm9yIHBlcm1hbGlua1xuICAgICAgICAgIGlmICh2ZXJpZnlpbmdWaXNpYmlsaXR5KSB7XG4gICAgICAgICAgICBtYXAuZ2V0Q29udHJvbHNCeUNsYXNzKCdPcGVuTGF5ZXJzLkNvbnRyb2wuQXJnUGFyc2VyJylbMF0uY29uZmlndXJlTGF5ZXJzKCk7XG4gICAgICAgICAgICBmb3IgKHZhciBpPTAsbGVuPWxheWVycy5sZW5ndGg7IGk8bGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgdmFyIGwgPSBsYXllcnNbaV07XG4gICAgICAgICAgICAgIHZhciBidG4gPSAkKCcjc3dpdGNoZXIgYnV0dG9uLmNoZWNrYm94W25hbWU9XCJsYXllclwiXVt2YWx1ZT1cIicrbC5uYW1lKydcIl0nKTtcbiAgICAgICAgICAgICAgaWYgKCAoaHJlZlBhcmFtLmxheWVycyAmJiBsLmdldFZpc2liaWxpdHkoKSAhPSBidG4uaGFzQ2xhc3MoJ2NoZWNrZWQnKSApIClcbiAgICAgICAgICAgICAgICAkKCcjc3dpdGNoZXIgYnV0dG9uLmNoZWNrYm94W25hbWU9XCJsYXllclwiXVt2YWx1ZT1cIicrbC5uYW1lKydcIl0nKS5jbGljaygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIGNoZWNrZWQgYWxsIHRvZ2dsZWQgbGF5ZXJcbiAgICAgICAgICAkKCcjc3dpdGNoZXIgYnV0dG9uLmNoZWNrYm94LmRpc2FibGVkW25hbWU9XCJsYXllclwiXTpub3QoLmNoZWNrZWQpJykuZWFjaChmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIGNiID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBjbGVhbk5hbWUgPSBjYi52YWwoKTtcbiAgICAgICAgICAgIHZhciBuYW1lID0gY2xlYW5OYW1lO1xuICAgICAgICAgICAgaWYgKCBjbGVhbk5hbWUgaW4gY2xlYW5OYW1lTWFwIClcbiAgICAgICAgICAgICAgICBuYW1lID0gZ2V0TGF5ZXJOYW1lQnlDbGVhbk5hbWUoY2xlYW5OYW1lKTtcbiAgICAgICAgICAgIGlmICggbmFtZSBpbiBjb25maWcubGF5ZXJzICkge1xuICAgICAgICAgICAgICAgIHZhciBsYXllckNvbmZpZyA9IGNvbmZpZy5sYXllcnNbbmFtZV07XG4gICAgICAgICAgICAgICAgaWYgKCBsYXllckNvbmZpZy50b2dnbGVkID09IFwiVHJ1ZVwiIClcbiAgICAgICAgICAgICAgICAgICAgY2IuYWRkQ2xhc3MoJ2NoZWNrZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIGZpbmFsaXplIHNsaWRlclxuICAgICAgICAgICQoJyNuYXZiYXIgZGl2LnNsaWRlcicpLnNsaWRlcihcInZhbHVlXCIsbWFwLmdldFpvb20oKSk7XG4gICAgICAgICAgbWFwLmV2ZW50cy5vbih7XG4gICAgICAgICAgICB6b29tZW5kIDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIC8vIFVwZGF0ZSBsZWdlbmRzXG4gICAgICAgICAgICAgICQoJyNzd2l0Y2hlciB0YWJsZS50cmVlIHRyLmxlZ2VuZEdyYXBoaWNzLmluaXRpYWxpemVkJykuZWFjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9ICQodGhpcyk7XG4gICAgICAgICAgICAgICAgdmFyIG5hbWUgPSBzZWxmLmF0dHIoJ2lkJykucmVwbGFjZSgnbGVnZW5kLScsJycpO1xuICAgICAgICAgICAgICAgIHZhciB1cmwgPSBnZXRMYXllckxlZ2VuZEdyYXBoaWNVcmwobmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKCB1cmwgIT0gbnVsbCAmJiB1cmwgIT0gJycgKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIENoYW5nZSBpbWFnZSBhdHRyaWJ1dGUgZGF0YS1zcmNcbiAgICAgICAgICAgICAgICAgICAgc2VsZi5maW5kKCdkaXYubGVnZW5kR3JhcGhpY3MgaW1nJykuYXR0ciggJ2RhdGEtc3JjJywgdXJsICk7XG4gICAgICAgICAgICAgICAgICAgIC8vIE9ubHkgY2hhbmdlIGltYWdlIGF0dHJpYnV0ZSBzcmMgaWYgbGVnZW5kIGlzIGRpc3BsYXllZFxuICAgICAgICAgICAgICAgICAgICBpZiggc2VsZi5oYXNDbGFzcygndmlzaWJsZScpICl7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxmLmZpbmQoJ2Rpdi5sZWdlbmRHcmFwaGljcyBpbWcnKS5hdHRyKCAnc3JjJywgdXJsICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAvLyB1cGRhdGUgc2xpZGVyIHBvc2l0aW9uXG4gICAgICAgICAgICAgICQoJyNuYXZiYXIgZGl2LnNsaWRlcicpLnNsaWRlcihcInZhbHVlXCIsIHRoaXMuZ2V0Wm9vbSgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIENvbm5lY3Qgc2lnbmFsL3Nsb3Qgd2hlbiBsYXllciBzdHlsZSBpcyBjaGFuZ2VkXG4gICAgICAgICAgbGl6TWFwLmV2ZW50cy5vbih7XG4gICAgICAgICAgICAnbGF5ZXJzdHlsZWNoYW5nZWQnOiBmdW5jdGlvbihldnQpe1xuXG4gICAgICAgICAgICAgIC8vIENoYW5nZSBsZWdlbmQgZGF0YS1zcmMgYW5kIGxlZ2VuZCBzcmMgaWYgbGVnZW5kIGlzIHZpc2libGVcbiAgICAgICAgICAgICAgdmFyIG5hbWUgPSBldnQuZmVhdHVyZVR5cGU7XG4gICAgICAgICAgICAgIHZhciB1cmwgPSBnZXRMYXllckxlZ2VuZEdyYXBoaWNVcmwobmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgIGlmICggdXJsICE9IG51bGwgJiYgdXJsICE9ICcnICkge1xuICAgICAgICAgICAgICAgICAgdmFyIGxTZWwgPSAnI3N3aXRjaGVyIHRhYmxlLnRyZWUgdHIjbGVnZW5kLScgKyBuYW1lICsgJyBkaXYubGVnZW5kR3JhcGhpY3MgaW1nJyA7XG4gICAgICAgICAgICAgICAgICAkKGxTZWwpLmF0dHIoJ2RhdGEtc3JjJyx1cmwpO1xuICAgICAgICAgICAgICAgICAgaWYoICQoJyNzd2l0Y2hlciB0YWJsZS50cmVlIHRyI2xlZ2VuZC0nICsgbmFtZSkuaGFzQ2xhc3MoJ3Zpc2libGUnKSApXG4gICAgICAgICAgICAgICAgICAgICAgJChsU2VsKS5hdHRyKCdzcmMnLHVybCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFRvZ2dsZSBsb2NhdGVcbiAgICAgICAgICAkKCcjbWFwbWVudSB1bCcpLm9uKCdjbGljaycsICdsaS5uYXYtbWluaWRvY2sgPiBhJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciBzZWxmID0gJCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBwYXJlbnQgPSBzZWxmLnBhcmVudCgpO1xuICAgICAgICAgICAgdmFyIGlkID0gc2VsZi5hdHRyKCdocmVmJykuc3Vic3RyKDEpO1xuICAgICAgICAgICAgdmFyIHRhYiA9ICQoJyNuYXYtdGFiLScraWQpO1xuICAgICAgICAgICAgaWYgKCBwYXJlbnQuaGFzQ2xhc3MoJ2FjdGl2ZScpICkge1xuICAgICAgICAgICAgICAgICQoJyMnK2lkKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgdGFiLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGxpek1hcC5ldmVudHMudHJpZ2dlckV2ZW50KCBcIm1pbmlkb2NrY2xvc2VkXCIsIHsnaWQnOmlkfSApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkQWN0aXZlID0gJCgnI21hcG1lbnUgbGkubmF2LW1pbmlkb2NrLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGlmICggb2xkQWN0aXZlLmxlbmd0aCAhPSAwICkge1xuICAgICAgICAgICAgICAgICAgICBvbGRBY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudCggXCJtaW5pZG9ja2Nsb3NlZFwiLCB7J2lkJzogb2xkQWN0aXZlLmNoaWxkcmVuKCdhJykuZmlyc3QoKS5hdHRyKCdocmVmJykuc3Vic3RyKDEpIH0gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGFiLmNoaWxkcmVuKCdhJykuZmlyc3QoKS5jbGljaygpO1xuICAgICAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoIFwibWluaWRvY2tvcGVuZWRcIiwgeydpZCc6aWR9ICk7XG4gICAgICAgICAgICAgICAgdXBkYXRlTWluaURvY2tTaXplKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmJsdXIoKTtcblxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gU2hvdyBsb2NhdGUgYnkgbGF5ZXJcbiAgICAgICAgICBpZiAoICEoJ2xvY2F0ZUJ5TGF5ZXInIGluIGNvbmZpZykgKVxuICAgICAgICAgICAgJCgnI2J1dHRvbi1sb2NhdGUnKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgZWxzZVxuICAgICAgICAgICAgJCgnI2J1dHRvbi1sb2NhdGUnKS5jbGljaygpO1xuXG4gICAgICAgICAgLy8gaGlkZSBtaW5pLWRvY2sgaWYgbm8gdG9vbCBpcyBhY3RpdmVcbiAgICAgICAgICBpZiAoICQoJyNtYXBtZW51IHVsIGxpLm5hdi1taW5pZG9jay5hY3RpdmUnKS5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgICAgICAgJCgnI21pbmktZG9jay1jb250ZW50ID4gLnRhYi1wYW5lLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgJCgnI21pbmktZG9jay10YWJzIGxpLmFjdGl2ZScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkKCcjbWFwbWVudSB1bCcpLm9uKCdjbGljaycsICdsaS5uYXYtZG9jayA+IGEnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHNlbGYucGFyZW50KCk7XG4gICAgICAgICAgICB2YXIgaWQgPSBzZWxmLmF0dHIoJ2hyZWYnKS5zdWJzdHIoMSk7XG4gICAgICAgICAgICB2YXIgdGFiID0gJCgnI25hdi10YWItJytpZCk7XG4gICAgICAgICAgICB2YXIgbGl6bWFwRXZlbnQgPSAnJztcbiAgICAgICAgICAgIGlmICggcGFyZW50Lmhhc0NsYXNzKCdhY3RpdmUnKSApIHtcbiAgICAgICAgICAgICAgICAkKCcjJytpZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHRhYi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICBsaXptYXBFdmVudCA9ICdkb2NrY2xvc2VkJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZEFjdGl2ZSA9ICQoJyNtYXBtZW51IGxpLm5hdi1kb2NrLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGlmICggb2xkQWN0aXZlLmxlbmd0aCAhPSAwICkge1xuICAgICAgICAgICAgICAgICAgICBvbGRBY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudCggXCJkb2NrY2xvc2VkXCIsIHsnaWQnOiBvbGRBY3RpdmUuY2hpbGRyZW4oJ2EnKS5maXJzdCgpLmF0dHIoJ2hyZWYnKS5zdWJzdHIoMSkgfSApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0YWIuc2hvdygpO1xuICAgICAgICAgICAgICAgIHRhYi5jaGlsZHJlbignYScpLmZpcnN0KCkuY2xpY2soKTtcbiAgICAgICAgICAgICAgICBwYXJlbnQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGxpem1hcEV2ZW50ID0gJ2RvY2tvcGVuZWQnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2VsZi5ibHVyKCk7XG5cbiAgICAgICAgICAgIHZhciBkb2NrID0gJCgnI2RvY2snKTtcbiAgICAgICAgICAgIGlmICggJCgnI2RvY2stdGFicyAuYWN0aXZlJykubGVuZ3RoID09IDAgKVxuICAgICAgICAgICAgICBkb2NrLmhpZGUoKTtcbiAgICAgICAgICAgIGVsc2UgaWYgKCAhZG9jay5pcygnOnZpc2libGUnKSApXG4gICAgICAgICAgICAgIGRvY2suc2hvdygpO1xuXG4gICAgICAgICAgICAvLyB0cmlnZ2VyIGV2ZW50XG4gICAgICAgICAgICBpZiAoIGxpem1hcEV2ZW50ICE9ICcnIClcbiAgICAgICAgICAgICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudCggbGl6bWFwRXZlbnQsIHsnaWQnOmlkfSApO1xuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICAkKCcjbWFwbWVudSB1bCcpLm9uKCdjbGljaycsICdsaS5uYXYtcmlnaHQtZG9jayA+IGEnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgdmFyIHNlbGYgPSAkKHRoaXMpO1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHNlbGYucGFyZW50KCk7XG4gICAgICAgICAgICB2YXIgaWQgPSBzZWxmLmF0dHIoJ2hyZWYnKS5zdWJzdHIoMSk7XG4gICAgICAgICAgICB2YXIgdGFiID0gJCgnI25hdi10YWItJytpZCk7XG4gICAgICAgICAgICB2YXIgbGl6bWFwRXZlbnQgPSAnJztcbiAgICAgICAgICAgIGlmICggcGFyZW50Lmhhc0NsYXNzKCdhY3RpdmUnKSApIHtcbiAgICAgICAgICAgICAgICAkKCcjJytpZCkucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHRhYi5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgcGFyZW50LnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB2YXIgbGl6bWFwRXZlbnQgPSAncmlnaHRkb2NrY2xvc2VkJztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZEFjdGl2ZSA9ICQoJyNtYXBtZW51IGxpLm5hdi1yaWdodC1kb2NrLmFjdGl2ZScpO1xuICAgICAgICAgICAgICAgIGlmICggb2xkQWN0aXZlLmxlbmd0aCAhPSAwICkge1xuICAgICAgICAgICAgICAgICAgICBvbGRBY3RpdmUucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgICAgICBsaXpNYXAuZXZlbnRzLnRyaWdnZXJFdmVudCggXCJyaWdodGRvY2tjbG9zZWRcIiwgeydpZCc6IG9sZEFjdGl2ZS5jaGlsZHJlbignYScpLmZpcnN0KCkuYXR0cignaHJlZicpLnN1YnN0cigxKSB9ICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRhYi5zaG93KCk7XG4gICAgICAgICAgICAgICAgdGFiLmNoaWxkcmVuKCdhJykuZmlyc3QoKS5jbGljaygpO1xuICAgICAgICAgICAgICAgIHBhcmVudC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgdmFyIGxpem1hcEV2ZW50ID0gJ3JpZ2h0ZG9ja29wZW5lZCc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzZWxmLmJsdXIoKTtcblxuICAgICAgICAgICAgdmFyIGRvY2sgPSAkKCcjcmlnaHQtZG9jaycpO1xuICAgICAgICAgICAgaWYgKCAkKCcjcmlnaHQtZG9jay10YWJzIC5hY3RpdmUnKS5sZW5ndGggPT0gMCApIHtcbiAgICAgICAgICAgICAgZG9jay5oaWRlKCk7XG4gICAgICAgICAgICAgICQoJyNjb250ZW50JykucmVtb3ZlQ2xhc3MoJ3JpZ2h0LWRvY2stdmlzaWJsZScpO1xuICAgICAgICAgICAgICB1cGRhdGVDb250ZW50U2l6ZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggIWRvY2suaXMoJzp2aXNpYmxlJykgKSB7XG4gICAgICAgICAgICAgICQoJyNjb250ZW50JykuYWRkQ2xhc3MoJ3JpZ2h0LWRvY2stdmlzaWJsZScpO1xuICAgICAgICAgICAgICBkb2NrLnNob3coKTtcbiAgICAgICAgICAgICAgdXBkYXRlQ29udGVudFNpemUoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gdHJpZ2dlciBldmVudFxuICAgICAgICAgICAgaWYgKCBsaXptYXBFdmVudCAhPSAnJyApXG4gICAgICAgICAgICAgICAgbGl6TWFwLmV2ZW50cy50cmlnZ2VyRXZlbnQoIGxpem1hcEV2ZW50LCB7J2lkJzppZH0gKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICAvLyBTaG93IGxheWVyIHN3aXRjaGVyXG4gICAgICAgICAgJCgnI2J1dHRvbi1zd2l0Y2hlcicpLmNsaWNrKCk7XG4gICAgICAgICAgdXBkYXRlQ29udGVudFNpemUoKTtcblxuICAgICAgICAgICQoJyNoZWFkZXJtZW51IC5uYXZiYXItaW5uZXIgLm5hdiBhW3JlbD1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG4gICAgICAgICAgJCgnI21hcG1lbnUgLm5hdiBhW3JlbD1cInRvb2x0aXBcIl0nKS50b29sdGlwKCk7XG4gICAgICAgICAgc2VsZi5ldmVudHMudHJpZ2dlckV2ZW50KFwidWljcmVhdGVkXCIsIHNlbGYpO1xuXG4gICAgICAgICAgJCgnYm9keScpLmNzcygnY3Vyc29yJywgJ2F1dG8nKTtcbiAgICAgICAgICAkKCcjbG9hZGluZycpLmRpYWxvZygnY2xvc2UnKTtcbiAgICAgICAgfSwgXCJ0ZXh0XCIpO1xuICAgICAgICB9LCBcInRleHRcIik7XG4gICAgICAgIH0sIFwidGV4dFwiKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbiAgLy8gaW5pdGlhbGl6aW5nIHRoZSBsaXpNYXAgZXZlbnRzXG4gIC8vIDxUT0RPIExBVEVSXG4gIC8vIG9iai5ldmVudHMgPSBuZXcgT3BlbkxheWVycy5FdmVudHMoXG4gIC8vICAgICBvYmosIG51bGwsXG4gIC8vICAgICBbJ3RyZWVjcmVhdGVkJywnbWFwY3JlYXRlZCcsJ2xheWVyc2FkZGVkJywndWljcmVhdGVkJyxcbiAgLy8gICAgICAnZG9ja29wZW5lZCcsJ2RvY2tjbG9zZWQnXSxcbiAgLy8gICAgIHRydWUsXG4gIC8vICAgICB7aW5jbHVkZVhZOiB0cnVlfVxuICAvLyAgICk7XG4gIC8vIFRPRE8gTEFURVI+XG4gIHJldHVybiBvYmo7XG59KCk7XG4vKlxuICogaXQncyBwb3NzaWJsZSB0byBhZGQgZXZlbnQgbGlzdGVuZXJcbiAqIGJlZm9yZSB0aGUgZG9jdW1lbnQgaXMgcmVhZHlcbiAqIGJ1dCBhZnRlciB0aGlzIGZpbGVcbiAqL1xuIC8vIDxUT0RPIExBVEVSXG4vLyBsaXpNYXAuZXZlbnRzLm9uKHtcbi8vICAgICAndHJlZWNyZWF0ZWQnOmZ1bmN0aW9uKGV2dCl7XG4vLyAgICAgfVxuLy8gICAgICwnbWFwY3JlYXRlZCc6ZnVuY3Rpb24oZXZ0KXtcbi8vICAgICAgIC8vIEFkZCBlbXB0eSBiYXNlbGF5ZXIgdG8gdGhlIG1hcFxuLy8gICAgICAgaWYgKCAoJ2VtcHR5QmFzZWxheWVyJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpXG4vLyAgICAgICAgICAmJiBldnQuY29uZmlnLm9wdGlvbnMuZW1wdHlCYXNlbGF5ZXIgPT0gJ1RydWUnKSB7XG4vLyAgICAgICAgIC8vIGNyZWF0aW5nIHRoZSBlbXB0eSBiYXNlIGxheWVyXG4vLyAgICAgICAgIGxheWVyQ29uZmlnID0ge307XG4vLyAgICAgICAgIGxheWVyQ29uZmlnLnRpdGxlID0gbGl6RGljdFsnYmFzZWxheWVyLmVtcHR5LnRpdGxlJ107XG4vLyAgICAgICAgIGxheWVyQ29uZmlnLm5hbWUgPSAnZW1wdHlCYXNlbGF5ZXInO1xuLy8gICAgICAgICBldnQuY29uZmlnLmxheWVyc1snZW1wdHlCYXNlbGF5ZXInXSA9IGxheWVyQ29uZmlnO1xuXG4vLyAgICAgICAgIGV2dC5iYXNlbGF5ZXJzLnB1c2gobmV3IE9wZW5MYXllcnMuTGF5ZXIuVmVjdG9yKCdlbXB0eUJhc2VsYXllcicse1xuLy8gICAgICAgICAgIGlzQmFzZUxheWVyOiB0cnVlXG4vLyAgICAgICAgICAsbWF4RXh0ZW50OiBldnQubWFwLm1heEV4dGVudFxuLy8gICAgICAgICAgLG1heFNjYWxlOiBldnQubWFwLm1heFNjYWxlXG4vLyAgICAgICAgICAsbWluU2NhbGU6IGV2dC5tYXAubWluU2NhbGVcbi8vICAgICAgICAgICxudW1ab29tTGV2ZWxzOiBldnQubWFwLm51bVpvb21MZXZlbHNcbi8vICAgICAgICAgICxzY2FsZXM6IGV2dC5tYXAuc2NhbGVzXG4vLyAgICAgICAgICAscHJvamVjdGlvbjogZXZ0Lm1hcC5wcm9qZWN0aW9uXG4vLyAgICAgICAgICAsdW5pdHM6IGV2dC5tYXAucHJvamVjdGlvbi5wcm9qLnVuaXRzXG4vLyAgICAgICAgIH0pKTtcbi8vICAgICAgICAgZXZ0Lm1hcC5hbGxPdmVybGF5cyA9IGZhbHNlO1xuLy8gICAgICAgfVxuXG4vLyAgICAgICAvLyBBZGQgT3BlblN0cmVldE1hcCwgR29vZ2xlIE1hcHMsIEJpbmcgTWFwcywgSUdOIEdlb3BvcnRhaWxcbi8vICAgICAgIC8vIGJhc2VsYXllcnMgdG8gdGhlIG1hcFxuLy8gICAgICAgaWYgKFxuLy8gICAgICgoJ29zbU1hcG5paycgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKVxuLy8gICAgICYmIGV2dC5jb25maWcub3B0aW9ucy5vc21NYXBuaWsgPT0gJ1RydWUnKSB8fFxuLy8gICAgICgoJ29zbVN0YW1lblRvbmVyJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpXG4vLyAgICAgICYmIGV2dC5jb25maWcub3B0aW9ucy5vc21TdGFtZW5Ub25lciA9PSAnVHJ1ZScpIHx8XG4vLyAgICAgKCgnb3NtQ3ljbGVtYXAnIGluIGV2dC5jb25maWcub3B0aW9ucylcbi8vICAgICAgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLm9zbUN5Y2xlbWFwID09ICdUcnVlJ1xuLy8gICAgICAmJiAoJ09DTUtleScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSkgfHxcbi8vICAgICAoKCdnb29nbGVTdHJlZXRzJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpXG4vLyAgICAgICYmIGV2dC5jb25maWcub3B0aW9ucy5nb29nbGVTdHJlZXRzID09ICdUcnVlJykgfHxcbi8vICAgICAoKCdnb29nbGVTYXRlbGxpdGUnIGluIGV2dC5jb25maWcub3B0aW9ucylcbi8vICAgICAgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLmdvb2dsZVNhdGVsbGl0ZSA9PSAnVHJ1ZScpIHx8XG4vLyAgICAgKCgnZ29vZ2xlSHlicmlkJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpXG4vLyAgICAgICYmIGV2dC5jb25maWcub3B0aW9ucy5nb29nbGVIeWJyaWQgPT0gJ1RydWUnKSB8fFxuLy8gICAgICgoJ2dvb2dsZVRlcnJhaW4nIGluIGV2dC5jb25maWcub3B0aW9ucylcbi8vICAgICAgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLmdvb2dsZVRlcnJhaW4gPT0gJ1RydWUnKSB8fFxuLy8gICAgICgoJ2JpbmdTdHJlZXRzJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpXG4vLyAgICAgICYmIGV2dC5jb25maWcub3B0aW9ucy5iaW5nU3RyZWV0cyA9PSAnVHJ1ZSdcbi8vICAgICAgJiYgKCdiaW5nS2V5JyBpbiBldnQuY29uZmlnLm9wdGlvbnMpKSB8fFxuLy8gICAgICgoJ2JpbmdTYXRlbGxpdGUnIGluIGV2dC5jb25maWcub3B0aW9ucylcbi8vICAgICAgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLmJpbmdTYXRlbGxpdGUgPT0gJ1RydWUnXG4vLyAgICAgICYmICgnYmluZ0tleScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSkgfHxcbi8vICAgICAoKCdiaW5nSHlicmlkJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpXG4vLyAgICAgICYmIGV2dC5jb25maWcub3B0aW9ucy5iaW5nSHlicmlkID09ICdUcnVlJ1xuLy8gICAgICAmJiAoJ2JpbmdLZXknIGluIGV2dC5jb25maWcub3B0aW9ucykpIHx8XG4vLyAgICAgKCgnaWduVGVycmFpbicgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKVxuLy8gICAgICAmJiBldnQuY29uZmlnLm9wdGlvbnMuaWduVGVycmFpbiA9PSAnVHJ1ZSdcbi8vICAgICAgJiYgKCdpZ25LZXknIGluIGV2dC5jb25maWcub3B0aW9ucykpIHx8XG4vLyAgICAgKCgnaWduU3RyZWV0cycgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKVxuLy8gICAgICAmJiBldnQuY29uZmlnLm9wdGlvbnMuaWduU3RyZWV0cyA9PSAnVHJ1ZSdcbi8vICAgICAgJiYgKCdpZ25LZXknIGluIGV2dC5jb25maWcub3B0aW9ucykpIHx8XG4vLyAgICAgKCgnaWduU2F0ZWxsaXRlJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpXG4vLyAgICAgICYmIGV2dC5jb25maWcub3B0aW9ucy5pZ25TYXRlbGxpdGUgPT0gJ1RydWUnXG4vLyAgICAgICYmICgnaWduS2V5JyBpbiBldnQuY29uZmlnLm9wdGlvbnMpKSB8fFxuLy8gICAgICgoJ2lnbkNhZGFzdHJhbCcgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKVxuLy8gICAgICAmJiBldnQuY29uZmlnLm9wdGlvbnMuaWduQ2FkYXN0cmFsID09ICdUcnVlJ1xuLy8gICAgICAmJiAoJ2lnbktleScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSlcbi8vICAgICApIHtcbi8vICAgICAgIC8vYWRkaW5nIGJhc2VsYXllcnNcbi8vICAgICAgIHZhciBtYXhFeHRlbnQgPSBudWxsO1xuLy8gICAgICAgaWYgKCBPcGVuTGF5ZXJzLlByb2plY3Rpb24uZGVmYXVsdHNbJ0VQU0c6OTAwOTEzJ10ubWF4RXh0ZW50IClcbi8vICAgICAgICAgbWF4RXh0ZW50ID0gbmV3IE9wZW5MYXllcnMuQm91bmRzKE9wZW5MYXllcnMuUHJvamVjdGlvbi5kZWZhdWx0c1snRVBTRzo5MDA5MTMnXS5tYXhFeHRlbnQpO1xuLy8gICAgICAgZWxzZSBpZiAoIE9wZW5MYXllcnMuUHJvamVjdGlvbi5kZWZhdWx0c1snRVBTRzozODU3J10ubWF4RXh0ZW50IClcbi8vICAgICAgICAgbWF4RXh0ZW50ID0gbmV3IE9wZW5MYXllcnMuQm91bmRzKE9wZW5MYXllcnMuUHJvamVjdGlvbi5kZWZhdWx0c1snRVBTRzozODU3J10ubWF4RXh0ZW50KTtcblxuLy8gICAgICAgdmFyIGxPcHRpb25zID0ge3pvb21PZmZzZXQ6MCxtYXhSZXNvbHV0aW9uOjE1NjU0My4wMzM5MDYyNX07XG4vLyAgICAgICBpZiAoKCdyZXNvbHV0aW9ucycgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKVxuLy8gICAgICAgICAgICYmIGV2dC5jb25maWcub3B0aW9ucy5yZXNvbHV0aW9ucy5sZW5ndGggIT0gMCApe1xuLy8gICAgICAgICB2YXIgcmVzb2x1dGlvbnMgPSBldnQuY29uZmlnLm9wdGlvbnMucmVzb2x1dGlvbnM7XG4vLyAgICAgICAgIHZhciBtYXhSZXMgPSByZXNvbHV0aW9uc1swXTtcbi8vICAgICAgICAgdmFyIG51bVpvb21MZXZlbHMgPSByZXNvbHV0aW9ucy5sZW5ndGg7XG4vLyAgICAgICAgIHZhciB6b29tT2Zmc2V0ID0gMDtcbi8vICAgICAgICAgdmFyIHJlcyA9IDE1NjU0My4wMzM5MDYyNTtcbi8vICAgICAgICAgd2hpbGUgKCByZXMgPiBtYXhSZXMgKSB7XG4vLyAgICAgICAgICAgem9vbU9mZnNldCArPSAxO1xuLy8gICAgICAgICAgIHJlcyA9IDE1NjU0My4wMzM5MDYyNSAvIE1hdGgucG93KDIsIHpvb21PZmZzZXQpO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGxPcHRpb25zWyd6b29tT2Zmc2V0J10gPSB6b29tT2Zmc2V0O1xuLy8gICAgICAgICBsT3B0aW9uc1snbWF4UmVzb2x1dGlvbiddID0gbWF4UmVzO1xuLy8gICAgICAgICBsT3B0aW9uc1snbnVtWm9vbUxldmVscyddID0gbnVtWm9vbUxldmVscztcbi8vICAgICAgIH1cblxuLy8gICAgICAgaWYgKCgnb3NtTWFwbmlrJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5vc21NYXBuaWsgPT0gJ1RydWUnKSB7XG4vLyAgICAgICAgIGV2dC5tYXAuYWxsT3ZlcmxheXMgPSBmYWxzZTtcbi8vICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4vLyAgICAgICAgICAgem9vbU9mZnNldDogMCxcbi8vICAgICAgICAgICBtYXhSZXNvbHV0aW9uOjE1NjU0My4wMzM5MDYyNSxcbi8vICAgICAgICAgICBudW1ab29tTGV2ZWxzOjE5XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0ICE9IDApIHtcbi8vICAgICAgICAgICBvcHRpb25zLnpvb21PZmZzZXQgPSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgIG9wdGlvbnMubWF4UmVzb2x1dGlvbiA9IGxPcHRpb25zLm1heFJlc29sdXRpb247XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQrbE9wdGlvbnMubnVtWm9vbUxldmVscyA8PSBvcHRpb25zLm51bVpvb21MZXZlbHMpXG4vLyAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gbE9wdGlvbnMubnVtWm9vbUxldmVscztcbi8vICAgICAgICAgZWxzZVxuLy8gICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IG9wdGlvbnMubnVtWm9vbUxldmVscyAtIGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgIHZhciBvc20gPSBuZXcgT3BlbkxheWVycy5MYXllci5PU00oJ29zbScsXG4vLyAgICAgICAgICAgICBbXG4vLyAgICAgICAgICAgICBcImh0dHBzOi8vYS50aWxlLm9wZW5zdHJlZXRtYXAub3JnLyR7en0vJHt4fS8ke3l9LnBuZ1wiLFxuLy8gICAgICAgICAgICAgXCJodHRwczovL2IudGlsZS5vcGVuc3RyZWV0bWFwLm9yZy8ke3p9LyR7eH0vJHt5fS5wbmdcIixcbi8vICAgICAgICAgICAgIFwiaHR0cHM6Ly9jLnRpbGUub3BlbnN0cmVldG1hcC5vcmcvJHt6fS8ke3h9LyR7eX0ucG5nXCJcbi8vICAgICAgICAgICAgIF1cbi8vICAgICAgICAgICAgICxvcHRpb25zXG4vLyAgICAgICAgICAgICApO1xuLy8gICAgICAgICBvc20ubWF4RXh0ZW50ID0gbWF4RXh0ZW50O1xuLy8gICAgICAgICB2YXIgb3NtQ2ZnID0ge1xuLy8gICAgICAgICAgICAgIFwibmFtZVwiOlwib3NtXCJcbi8vICAgICAgICAgICAgICxcInRpdGxlXCI6XCJPcGVuU3RyZWV0TWFwXCJcbi8vICAgICAgICAgICAgICxcInR5cGVcIjpcImJhc2VsYXllclwiXG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIGV2dC5jb25maWcubGF5ZXJzWydvc20nXSA9IG9zbUNmZztcbi8vICAgICAgICAgZXZ0LmJhc2VsYXllcnMucHVzaChvc20pO1xuLy8gICAgICAgfVxuXG4vLyAgICAgICBpZiAoKCdvc21TdGFtZW5Ub25lcicgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSAmJiBldnQuY29uZmlnLm9wdGlvbnMub3NtU3RhbWVuVG9uZXIgPT0gJ1RydWUnKSB7XG4vLyAgICAgICAgIGV2dC5tYXAuYWxsT3ZlcmxheXMgPSBmYWxzZTtcbi8vICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4vLyAgICAgICAgICAgem9vbU9mZnNldDogMCxcbi8vICAgICAgICAgICBtYXhSZXNvbHV0aW9uOjE1NjU0My4wMzM5MDYyNSxcbi8vICAgICAgICAgICBudW1ab29tTGV2ZWxzOjE5XG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0ICE9IDApIHtcbi8vICAgICAgICAgICBvcHRpb25zLnpvb21PZmZzZXQgPSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgIG9wdGlvbnMubWF4UmVzb2x1dGlvbiA9IGxPcHRpb25zLm1heFJlc29sdXRpb247XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQrbE9wdGlvbnMubnVtWm9vbUxldmVscyA8PSBvcHRpb25zLm51bVpvb21MZXZlbHMpXG4vLyAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gbE9wdGlvbnMubnVtWm9vbUxldmVscztcbi8vICAgICAgICAgZWxzZVxuLy8gICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IG9wdGlvbnMubnVtWm9vbUxldmVscyAtIGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgIHZhciBzdGFtZW5Ub25lciA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLk9TTSgnb3NtLXRvbmVyJyxcbi8vICAgICAgICAgICAgIFtcImh0dHBzOi8vc3RhbWVuLXRpbGVzLWEuYS5zc2wuZmFzdGx5Lm5ldC90b25lci1saXRlLyR7en0vJHt4fS8ke3l9LnBuZ1wiLFxuLy8gICAgICAgICAgICAgXCJodHRwczovL3N0YW1lbi10aWxlcy1iLmEuc3NsLmZhc3RseS5uZXQvdG9uZXItbGl0ZS8ke3p9LyR7eH0vJHt5fS5wbmdcIixcbi8vICAgICAgICAgICAgIFwiaHR0cHM6Ly9zdGFtZW4tdGlsZXMtYy5hLnNzbC5mYXN0bHkubmV0L3RvbmVyLWxpdGUvJHt6fS8ke3h9LyR7eX0ucG5nXCIsXG4vLyAgICAgICAgICAgICBcImh0dHBzOi8vc3RhbWVuLXRpbGVzLWQuYS5zc2wuZmFzdGx5Lm5ldC90b25lci1saXRlLyR7en0vJHt4fS8ke3l9LnBuZ1wiXVxuLy8gICAgICAgICAgICAgLG9wdGlvbnNcbi8vICAgICAgICAgICAgICk7XG4vLyAgICAgICAgIHN0YW1lblRvbmVyLm1heEV4dGVudCA9IG1heEV4dGVudDtcbi8vICAgICAgICAgdmFyIHN0YW1lblRvbmVyQ2ZnID0ge1xuLy8gICAgICAgICAgIFwibmFtZVwiOlwib3NtLXRvbmVyXCJcbi8vICAgICAgICAgICAgICxcInRpdGxlXCI6XCJPU00gU3RhbWVuIFRvbmVyXCJcbi8vICAgICAgICAgICAgICxcInR5cGVcIjpcImJhc2VsYXllclwiXG4vLyAgICAgICAgIH07XG4vLyAgICAgICAgIGV2dC5jb25maWcubGF5ZXJzWydvc20tdG9uZXInXSA9IHN0YW1lblRvbmVyQ2ZnO1xuLy8gICAgICAgICBldnQuYmFzZWxheWVycy5wdXNoKHN0YW1lblRvbmVyKTtcbi8vICAgICAgIH1cblxuLy8gICAgICAgaWYgKCgnb3NtQ3ljbGVtYXAnIGluIGV2dC5jb25maWcub3B0aW9ucykgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLm9zbUN5Y2xlbWFwID09ICdUcnVlJyAmJiAoJ09DTUtleScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSkge1xuLy8gICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICAgIHpvb21PZmZzZXQ6IDAsXG4vLyAgICAgICAgICAgbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjUsXG4vLyAgICAgICAgICAgbnVtWm9vbUxldmVsczoxOVxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCAhPSAwKSB7XG4vLyAgICAgICAgICAgb3B0aW9ucy56b29tT2Zmc2V0ID0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICBvcHRpb25zLm1heFJlc29sdXRpb24gPSBsT3B0aW9ucy5tYXhSZXNvbHV0aW9uO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0K2xPcHRpb25zLm51bVpvb21MZXZlbHMgPD0gb3B0aW9ucy5udW1ab29tTGV2ZWxzKVxuLy8gICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IGxPcHRpb25zLm51bVpvb21MZXZlbHM7XG4vLyAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBvcHRpb25zLm51bVpvb21MZXZlbHMgLSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICB2YXIgY3ljbGVtYXAgPSBuZXcgT3BlbkxheWVycy5MYXllci5PU00oJ29zbS1jeWNsZW1hcCcsJ2h0dHBzOi8vdGlsZS50aHVuZGVyZm9yZXN0LmNvbS9jeWNsZS8ke3p9LyR7eH0vJHt5fS5wbmc/YXBpS2V5PScrZXZ0LmNvbmZpZy5vcHRpb25zLk9DTUtleSxvcHRpb25zKTtcbi8vICAgICAgICAgY3ljbGVtYXAubWF4RXh0ZW50ID0gbWF4RXh0ZW50O1xuLy8gICAgICAgICB2YXIgY3ljbGVtYXBDZmcgPSB7XG4vLyAgICAgICAgICAgICAgXCJuYW1lXCI6XCJvc20tY3ljbGVcIlxuLy8gICAgICAgICAgICAgLFwidGl0bGVcIjpcIk9TTSBDeWNsZU1hcFwiXG4vLyAgICAgICAgICAgICAsXCJ0eXBlXCI6XCJiYXNlbGF5ZXJcIlxuLy8gICAgICAgICB9O1xuLy8gICAgICAgICBldnQuY29uZmlnLmxheWVyc1snb3NtLWN5Y2xlJ10gPSBjeWNsZW1hcENmZztcbi8vICAgICAgICAgZXZ0LmJhc2VsYXllcnMucHVzaChjeWNsZW1hcCk7XG4vLyAgICAgICB9XG4vLyAgICAgICB0cnkge1xuLy8gICAgICAgICBpZiAoKCdnb29nbGVTYXRlbGxpdGUnIGluIGV2dC5jb25maWcub3B0aW9ucykgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLmdvb2dsZVNhdGVsbGl0ZSA9PSAnVHJ1ZScpIHtcbi8vICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbi8vICAgICAgICAgICAgIHpvb21PZmZzZXQ6IDAsXG4vLyAgICAgICAgICAgICBtYXhSZXNvbHV0aW9uOjE1NjU0My4wMzM5MDYyNSxcbi8vICAgICAgICAgICAgIG51bVpvb21MZXZlbHM6MjFcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0ICE9IDApIHtcbi8vICAgICAgICAgICAgIG9wdGlvbnMuem9vbU9mZnNldCA9IGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgICBvcHRpb25zLm1heFJlc29sdXRpb24gPSBsT3B0aW9ucy5tYXhSZXNvbHV0aW9uO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCtsT3B0aW9ucy5udW1ab29tTGV2ZWxzIDw9IG9wdGlvbnMubnVtWm9vbUxldmVscylcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IGxPcHRpb25zLm51bVpvb21MZXZlbHM7XG4vLyAgICAgICAgICAgZWxzZVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gb3B0aW9ucy5udW1ab29tTGV2ZWxzIC0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICB2YXIgZ3NhdCA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLkdvb2dsZShcbi8vICAgICAgICAgICAgICAgXCJnc2F0XCIsXG4vLyAgICAgICAgICAgICAgIHt0eXBlOiBnb29nbGUubWFwcy5NYXBUeXBlSWQuU0FURUxMSVRFXG4vLyAgICAgICAgICAgICAgICAgLCBudW1ab29tTGV2ZWxzOiBvcHRpb25zLm51bVpvb21MZXZlbHMsIG1heFJlc29sdXRpb246IG9wdGlvbnMubWF4UmVzb2x1dGlvbiwgbWluWm9vbUxldmVsOm9wdGlvbnMuem9vbU9mZnNldH1cbi8vICAgICAgICAgICAgICAgKTtcbi8vICAgICAgICAgICBnc2F0Lm1heEV4dGVudCA9IG1heEV4dGVudDtcbi8vICAgICAgICAgICB2YXIgZ3NhdENmZyA9IHtcbi8vICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiZ3NhdFwiXG4vLyAgICAgICAgICAgICAgICxcInRpdGxlXCI6XCJHb29nbGUgU2F0ZWxsaXRlXCJcbi8vICAgICAgICAgICAgICxcInR5cGVcIjpcImJhc2VsYXllclwiXG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBldnQuY29uZmlnLmxheWVyc1snZ3NhdCddID0gZ3NhdENmZztcbi8vICAgICAgICAgICBldnQuYmFzZWxheWVycy5wdXNoKGdzYXQpO1xuLy8gICAgICAgICAgIGV2dC5tYXAuYWxsT3ZlcmxheXMgPSBmYWxzZTtcbi8vICAgICAgICAgICBldnQubWFwLnpvb21EdXJhdGlvbiA9IDA7XG4vLyAgICAgICAgIH1cbi8vICAgICAgICAgaWYgKCgnZ29vZ2xlSHlicmlkJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5nb29nbGVIeWJyaWQgPT0gJ1RydWUnKSB7XG4vLyAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4vLyAgICAgICAgICAgICB6b29tT2Zmc2V0OiAwLFxuLy8gICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjUsXG4vLyAgICAgICAgICAgICBudW1ab29tTGV2ZWxzOjIwXG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCAhPSAwKSB7XG4vLyAgICAgICAgICAgICBvcHRpb25zLnpvb21PZmZzZXQgPSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgICAgb3B0aW9ucy5tYXhSZXNvbHV0aW9uID0gbE9wdGlvbnMubWF4UmVzb2x1dGlvbjtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQrbE9wdGlvbnMubnVtWm9vbUxldmVscyA8PSBvcHRpb25zLm51bVpvb21MZXZlbHMpXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBsT3B0aW9ucy5udW1ab29tTGV2ZWxzO1xuLy8gICAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IG9wdGlvbnMubnVtWm9vbUxldmVscyAtIGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgdmFyIGdoeWIgPSBuZXcgT3BlbkxheWVycy5MYXllci5Hb29nbGUoXG4vLyAgICAgICAgICAgICAgIFwiZ2h5YlwiLFxuLy8gICAgICAgICAgICAgICB7dHlwZTogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLkhZQlJJRFxuLy8gICAgICAgICAgICAgICAgICwgbnVtWm9vbUxldmVsczogb3B0aW9ucy5udW1ab29tTGV2ZWxzLCBtYXhSZXNvbHV0aW9uOiBvcHRpb25zLm1heFJlc29sdXRpb24sIG1pblpvb21MZXZlbDpvcHRpb25zLnpvb21PZmZzZXR9XG4vLyAgICAgICAgICAgICAgICk7XG4vLyAgICAgICAgICAgZ2h5Yi5tYXhFeHRlbnQgPSBtYXhFeHRlbnQ7XG4vLyAgICAgICAgICAgdmFyIGdoeWJDZmcgPSB7XG4vLyAgICAgICAgICAgICAgICBcIm5hbWVcIjpcImdoeWJcIlxuLy8gICAgICAgICAgICAgICAsXCJ0aXRsZVwiOlwiR29vZ2xlIEh5YnJpZFwiXG4vLyAgICAgICAgICAgICAsXCJ0eXBlXCI6XCJiYXNlbGF5ZXJcIlxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgZXZ0LmNvbmZpZy5sYXllcnNbJ2doeWInXSA9IGdoeWJDZmc7XG4vLyAgICAgICAgICAgZXZ0LmJhc2VsYXllcnMucHVzaChnaHliKTtcbi8vICAgICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgICAgZXZ0Lm1hcC56b29tRHVyYXRpb24gPSAwO1xuLy8gICAgICAgICB9XG4vLyAgICAgICAgIGlmICgoJ2dvb2dsZVRlcnJhaW4nIGluIGV2dC5jb25maWcub3B0aW9ucykgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLmdvb2dsZVRlcnJhaW4gPT0gJ1RydWUnKSB7XG4vLyAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4vLyAgICAgICAgICAgICB6b29tT2Zmc2V0OiAwLFxuLy8gICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjUsXG4vLyAgICAgICAgICAgICBudW1ab29tTGV2ZWxzOjE2XG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCAhPSAwKSB7XG4vLyAgICAgICAgICAgICBvcHRpb25zLnpvb21PZmZzZXQgPSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgICAgb3B0aW9ucy5tYXhSZXNvbHV0aW9uID0gbE9wdGlvbnMubWF4UmVzb2x1dGlvbjtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQrbE9wdGlvbnMubnVtWm9vbUxldmVscyA8PSBvcHRpb25zLm51bVpvb21MZXZlbHMpXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBsT3B0aW9ucy5udW1ab29tTGV2ZWxzO1xuLy8gICAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IG9wdGlvbnMubnVtWm9vbUxldmVscyAtIGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgdmFyIGdwaHkgPSBuZXcgT3BlbkxheWVycy5MYXllci5Hb29nbGUoXG4vLyAgICAgICAgICAgICAgIFwiZ3BoeVwiLFxuLy8gICAgICAgICAgICAgICB7dHlwZTogZ29vZ2xlLm1hcHMuTWFwVHlwZUlkLlRFUlJBSU5cbi8vICAgICAgICAgICAgICAgLCBudW1ab29tTGV2ZWxzOiBvcHRpb25zLm51bVpvb21MZXZlbHMsIG1heFJlc29sdXRpb246IG9wdGlvbnMubWF4UmVzb2x1dGlvbiwgbWluWm9vbUxldmVsOm9wdGlvbnMuem9vbU9mZnNldH1cbi8vICAgICAgICAgICAgICAgKTtcbi8vICAgICAgICAgICBncGh5Lm1heEV4dGVudCA9IG1heEV4dGVudDtcbi8vICAgICAgICAgICB2YXIgZ3BoeUNmZyA9IHtcbi8vICAgICAgICAgICAgICAgIFwibmFtZVwiOlwiZ3BoeVwiXG4vLyAgICAgICAgICAgICAgICxcInRpdGxlXCI6XCJHb29nbGUgVGVycmFpblwiXG4vLyAgICAgICAgICAgICAsXCJ0eXBlXCI6XCJiYXNlbGF5ZXJcIlxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgZXZ0LmNvbmZpZy5sYXllcnNbJ2dwaHknXSA9IGdwaHlDZmc7XG4vLyAgICAgICAgICAgZXZ0LmJhc2VsYXllcnMucHVzaChncGh5KTtcbi8vICAgICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgICAgZXZ0Lm1hcC56b29tRHVyYXRpb24gPSAwO1xuLy8gICAgICAgIH1cbi8vICAgICAgICBpZiAoKCdnb29nbGVTdHJlZXRzJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5nb29nbGVTdHJlZXRzID09ICdUcnVlJykge1xuLy8gICAgICAgICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICAgICAgem9vbU9mZnNldDogMCxcbi8vICAgICAgICAgICAgIG1heFJlc29sdXRpb246MTU2NTQzLjAzMzkwNjI1LFxuLy8gICAgICAgICAgICAgbnVtWm9vbUxldmVsczoyMFxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQgIT0gMCkge1xuLy8gICAgICAgICAgICAgb3B0aW9ucy56b29tT2Zmc2V0ID0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICAgIG9wdGlvbnMubWF4UmVzb2x1dGlvbiA9IGxPcHRpb25zLm1heFJlc29sdXRpb247XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0K2xPcHRpb25zLm51bVpvb21MZXZlbHMgPD0gb3B0aW9ucy5udW1ab29tTGV2ZWxzKVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gbE9wdGlvbnMubnVtWm9vbUxldmVscztcbi8vICAgICAgICAgICBlbHNlXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBvcHRpb25zLm51bVpvb21MZXZlbHMgLSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgdmFyIGdtYXAgPSBuZXcgT3BlbkxheWVycy5MYXllci5Hb29nbGUoXG4vLyAgICAgICAgICAgICAgXCJnbWFwXCIsIC8vIHRoZSBkZWZhdWx0XG4vLyAgICAgICAgICAgICAge251bVpvb21MZXZlbHM6IG9wdGlvbnMubnVtWm9vbUxldmVscywgbWF4UmVzb2x1dGlvbjogb3B0aW9ucy5tYXhSZXNvbHV0aW9uLCBtaW5ab29tTGV2ZWw6b3B0aW9ucy56b29tT2Zmc2V0fVxuLy8gICAgICAgICAgICAgICk7XG4vLyAgICAgICAgICBnbWFwLm1heEV4dGVudCA9IG1heEV4dGVudDtcbi8vICAgICAgICAgIHZhciBnbWFwQ2ZnID0ge1xuLy8gICAgICAgICAgICAgICBcIm5hbWVcIjpcImdtYXBcIlxuLy8gICAgICAgICAgICAgICxcInRpdGxlXCI6XCJHb29nbGUgU3RyZWV0c1wiXG4vLyAgICAgICAgICAgICAgLFwidHlwZVwiOlwiYmFzZWxheWVyXCJcbi8vICAgICAgICAgIH07XG4vLyAgICAgICAgICBldnQuY29uZmlnLmxheWVyc1snZ21hcCddID0gZ21hcENmZztcbi8vICAgICAgICAgIGV2dC5iYXNlbGF5ZXJzLnB1c2goZ21hcCk7XG4vLyAgICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgICBldnQubWFwLnpvb21EdXJhdGlvbiA9IDA7XG4vLyAgICAgICAgfVxuLy8gICAgICAgIGlmICgoJ2JpbmdTdHJlZXRzJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5iaW5nU3RyZWV0cyA9PSAnVHJ1ZScgJiYgKCdiaW5nS2V5JyBpbiBldnQuY29uZmlnLm9wdGlvbnMpKSAge1xuLy8gICAgICAgICAgIHZhciBvcHRpb25zID0ge1xuLy8gICAgICAgICAgICAgem9vbU9mZnNldDogMCxcbi8vICAgICAgICAgICAgIG1heFJlc29sdXRpb246MTU2NTQzLjAzMzkwNjI1LFxuLy8gICAgICAgICAgICAgbnVtWm9vbUxldmVsczoxOVxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQgIT0gMCkge1xuLy8gICAgICAgICAgICAgb3B0aW9ucy56b29tT2Zmc2V0ID0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICAgIG9wdGlvbnMubWF4UmVzb2x1dGlvbiA9IGxPcHRpb25zLm1heFJlc29sdXRpb247XG4vLyAgICAgICAgICAgfVxuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0K2xPcHRpb25zLm51bVpvb21MZXZlbHMgPD0gb3B0aW9ucy5udW1ab29tTGV2ZWxzKVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gbE9wdGlvbnMubnVtWm9vbUxldmVscztcbi8vICAgICAgICAgICBlbHNlXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBvcHRpb25zLm51bVpvb21MZXZlbHMgLSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgIHZhciBibWFwID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuQmluZyh7XG4vLyAgICAgICAgICAgICAga2V5OiBldnQuY29uZmlnLm9wdGlvbnMuYmluZ0tleSxcbi8vICAgICAgICAgICAgICB0eXBlOiBcIlJvYWRcIixcbi8vICAgICAgICAgICAgICBuYW1lOiBcIkJpbmcgUm9hZFwiLCAvLyB0aGUgZGVmYXVsdFxuLy8gICAgICAgICAgICAgIG51bVpvb21MZXZlbHM6IG9wdGlvbnMubnVtWm9vbUxldmVscywgbWF4UmVzb2x1dGlvbjogb3B0aW9ucy5tYXhSZXNvbHV0aW9uLCBtaW5ab29tTGV2ZWw6b3B0aW9ucy56b29tT2Zmc2V0XG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgYm1hcC5tYXhFeHRlbnQgPSBtYXhFeHRlbnQ7XG4vLyAgICAgICAgICAgdmFyIGJtYXBDZmcgPSB7XG4vLyAgICAgICAgICAgICAgXCJuYW1lXCI6XCJibWFwXCJcbi8vICAgICAgICAgICAgICxcInRpdGxlXCI6XCJCaW5nIFJvYWRcIlxuLy8gICAgICAgICAgICAgLFwidHlwZVwiOlwiYmFzZWxheWVyXCJcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICAgIGV2dC5jb25maWcubGF5ZXJzWydibWFwJ10gPSBibWFwQ2ZnO1xuLy8gICAgICAgICAgIGV2dC5iYXNlbGF5ZXJzLnB1c2goYm1hcCk7XG4vLyAgICAgICAgICAgZXZ0Lm1hcC5hbGxPdmVybGF5cyA9IGZhbHNlO1xuLy8gICAgICAgIH1cbi8vICAgICAgICBpZiAoKCdiaW5nU2F0ZWxsaXRlJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5iaW5nU2F0ZWxsaXRlID09ICdUcnVlJyAmJiAoJ2JpbmdLZXknIGluIGV2dC5jb25maWcub3B0aW9ucykpICB7XG4vLyAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4vLyAgICAgICAgICAgICB6b29tT2Zmc2V0OiAwLFxuLy8gICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjUsXG4vLyAgICAgICAgICAgICBudW1ab29tTGV2ZWxzOjE5XG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCAhPSAwKSB7XG4vLyAgICAgICAgICAgICBvcHRpb25zLnpvb21PZmZzZXQgPSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgICAgb3B0aW9ucy5tYXhSZXNvbHV0aW9uID0gbE9wdGlvbnMubWF4UmVzb2x1dGlvbjtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQrbE9wdGlvbnMubnVtWm9vbUxldmVscyA8PSBvcHRpb25zLm51bVpvb21MZXZlbHMpXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBsT3B0aW9ucy5udW1ab29tTGV2ZWxzO1xuLy8gICAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IG9wdGlvbnMubnVtWm9vbUxldmVscyAtIGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgdmFyIGJhZXJpYWwgPSBuZXcgT3BlbkxheWVycy5MYXllci5CaW5nKHtcbi8vICAgICAgICAgICAgICBrZXk6IGV2dC5jb25maWcub3B0aW9ucy5iaW5nS2V5LFxuLy8gICAgICAgICAgICAgIHR5cGU6IFwiQWVyaWFsXCIsXG4vLyAgICAgICAgICAgICAgbmFtZTogXCJCaW5nIEFlcmlhbFwiLCAvLyB0aGUgZGVmYXVsdFxuLy8gICAgICAgICAgICAgIG51bVpvb21MZXZlbHM6IG9wdGlvbnMubnVtWm9vbUxldmVscywgbWF4UmVzb2x1dGlvbjogb3B0aW9ucy5tYXhSZXNvbHV0aW9uLCBtaW5ab29tTGV2ZWw6b3B0aW9ucy56b29tT2Zmc2V0XG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgYmFlcmlhbC5tYXhFeHRlbnQgPSBtYXhFeHRlbnQ7XG4vLyAgICAgICAgICAgdmFyIGJhZXJpYWxDZmcgPSB7XG4vLyAgICAgICAgICAgICAgXCJuYW1lXCI6XCJiYWVyaWFsXCJcbi8vICAgICAgICAgICAgICxcInRpdGxlXCI6XCJCaW5nIEFlcmlhbFwiXG4vLyAgICAgICAgICAgICAsXCJ0eXBlXCI6XCJiYXNlbGF5ZXJcIlxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgZXZ0LmNvbmZpZy5sYXllcnNbJ2JhZXJpYWwnXSA9IGJhZXJpYWxDZmc7XG4vLyAgICAgICAgICAgZXZ0LmJhc2VsYXllcnMucHVzaChiYWVyaWFsKTtcbi8vICAgICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgfVxuLy8gICAgICAgIGlmICgoJ2JpbmdIeWJyaWQnIGluIGV2dC5jb25maWcub3B0aW9ucykgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLmJpbmdIeWJyaWQgPT0gJ1RydWUnICYmICgnYmluZ0tleScgaW4gZXZ0LmNvbmZpZy5vcHRpb25zKSkgIHtcbi8vICAgICAgICAgICB2YXIgb3B0aW9ucyA9IHtcbi8vICAgICAgICAgICAgIHpvb21PZmZzZXQ6IDAsXG4vLyAgICAgICAgICAgICBtYXhSZXNvbHV0aW9uOjE1NjU0My4wMzM5MDYyNSxcbi8vICAgICAgICAgICAgIG51bVpvb21MZXZlbHM6MTlcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICAgIGlmIChsT3B0aW9ucy56b29tT2Zmc2V0ICE9IDApIHtcbi8vICAgICAgICAgICAgIG9wdGlvbnMuem9vbU9mZnNldCA9IGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgICBvcHRpb25zLm1heFJlc29sdXRpb24gPSBsT3B0aW9ucy5tYXhSZXNvbHV0aW9uO1xuLy8gICAgICAgICAgIH1cbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCtsT3B0aW9ucy5udW1ab29tTGV2ZWxzIDw9IG9wdGlvbnMubnVtWm9vbUxldmVscylcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IGxPcHRpb25zLm51bVpvb21MZXZlbHM7XG4vLyAgICAgICAgICAgZWxzZVxuLy8gICAgICAgICAgICAgb3B0aW9ucy5udW1ab29tTGV2ZWxzID0gb3B0aW9ucy5udW1ab29tTGV2ZWxzIC0gbE9wdGlvbnMuem9vbU9mZnNldDtcbi8vICAgICAgICAgICB2YXIgYmh5YnJpZCA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLkJpbmcoe1xuLy8gICAgICAgICAgICAgIGtleTogZXZ0LmNvbmZpZy5vcHRpb25zLmJpbmdLZXksXG4vLyAgICAgICAgICAgICAgdHlwZTogXCJBZXJpYWxXaXRoTGFiZWxzXCIsXG4vLyAgICAgICAgICAgICAgbmFtZTogXCJCaW5nIEh5YnJpZFwiLCAvLyB0aGUgZGVmYXVsdFxuLy8gICAgICAgICAgICAgIG51bVpvb21MZXZlbHM6IG9wdGlvbnMubnVtWm9vbUxldmVscywgbWF4UmVzb2x1dGlvbjogb3B0aW9ucy5tYXhSZXNvbHV0aW9uLCBtaW5ab29tTGV2ZWw6b3B0aW9ucy56b29tT2Zmc2V0XG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgYmh5YnJpZC5tYXhFeHRlbnQgPSBtYXhFeHRlbnQ7XG4vLyAgICAgICAgICAgdmFyIGJoeWJyaWRDZmcgPSB7XG4vLyAgICAgICAgICAgICAgXCJuYW1lXCI6XCJiaHlicmlkXCJcbi8vICAgICAgICAgICAgICxcInRpdGxlXCI6XCJCaW5nIEh5YnJpZFwiXG4vLyAgICAgICAgICAgICAsXCJ0eXBlXCI6XCJiYXNlbGF5ZXJcIlxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgZXZ0LmNvbmZpZy5sYXllcnNbJ2JoeWJyaWQnXSA9IGJoeWJyaWRDZmc7XG4vLyAgICAgICAgICAgZXZ0LmJhc2VsYXllcnMucHVzaChiaHlicmlkKTtcbi8vICAgICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgfVxuLy8gICAgICAgIGlmICgoJ2lnblRlcnJhaW4nIGluIGV2dC5jb25maWcub3B0aW9ucykgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLmlnblRlcnJhaW4gPT0gJ1RydWUnICYmICgnaWduS2V5JyBpbiBldnQuY29uZmlnLm9wdGlvbnMpKSB7XG4vLyAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4vLyAgICAgICAgICAgICB6b29tT2Zmc2V0OiAwLFxuLy8gICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjUsXG4vLyAgICAgICAgICAgICBudW1ab29tTGV2ZWxzOjE4XG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCAhPSAwKSB7XG4vLyAgICAgICAgICAgICBvcHRpb25zLnpvb21PZmZzZXQgPSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgICAgb3B0aW9ucy5tYXhSZXNvbHV0aW9uID0gbE9wdGlvbnMubWF4UmVzb2x1dGlvbjtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQrbE9wdGlvbnMubnVtWm9vbUxldmVscyA8PSBvcHRpb25zLm51bVpvb21MZXZlbHMpXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBsT3B0aW9ucy5udW1ab29tTGV2ZWxzO1xuLy8gICAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IG9wdGlvbnMubnVtWm9vbUxldmVscyAtIGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgdmFyIGlnbm1hcCA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLldNVFMoe1xuLy8gICAgICAgICAgICAgbmFtZTogXCJpZ25tYXBcIixcbi8vICAgICAgICAgICAgIHVybDogXCJodHRwczovL3d4cy5pZ24uZnIvXCIrZXZ0LmNvbmZpZy5vcHRpb25zLmlnbktleStcIi93bXRzXCIsXG4vLyAgICAgICAgICAgICBsYXllcjogXCJHRU9HUkFQSElDQUxHUklEU1lTVEVNUy5NQVBTXCIsXG4vLyAgICAgICAgICAgICBtYXRyaXhTZXQ6IFwiUE1cIixcbi8vICAgICAgICAgICAgIHN0eWxlOiBcIm5vcm1hbFwiLFxuLy8gICAgICAgICAgICAgcHJvamVjdGlvbjogbmV3IE9wZW5MYXllcnMuUHJvamVjdGlvbihcIkVQU0c6Mzg1N1wiKSxcbi8vICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnRm9uZCZuYnNwOzogJmNvcHk7SUdOIDxhIGhyZWY9XCJodHRwOi8vd3d3Lmdlb3BvcnRhaWwuZnIvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGltZyBzcmM9XCJodHRwczovL2FwaS5pZ24uZnIvZ2VvcG9ydGFpbC9hcGkvanMvMi4wLjBiZXRhL3RoZW1lL2dlb3BvcnRhbC9pbWcvbG9nb19ncC5naWZcIj48L2E+IDxhIGhyZWY9XCJodHRwOi8vd3d3Lmdlb3BvcnRhaWwuZ291di5mci9kZXBvdC9hcGkvY2d1L2xpY0FQSV9DR1VGLnBkZlwiIGFsdD1cIlRPU1wiIHRpdGxlPVwiVE9TXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q29uZGl0aW9ucyBkXFwndXRpbGlzYXRpb248L2E+J1xuLy8gICAgICAgICAgICAgLCBudW1ab29tTGV2ZWxzOiBvcHRpb25zLm51bVpvb21MZXZlbHMsIG1heFJlc29sdXRpb246IG9wdGlvbnMubWF4UmVzb2x1dGlvbiwgbWluWm9vbUxldmVsOm9wdGlvbnMuem9vbU9mZnNldFxuLy8gICAgICAgICAgICAgLHpvb21PZmZzZXQ6IG9wdGlvbnMuem9vbU9mZnNldFxuXG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgaWdubWFwLm1heEV4dGVudCA9IG1heEV4dGVudDtcbi8vICAgICAgICAgICB2YXIgaWdubWFwQ2ZnID0ge1xuLy8gICAgICAgICAgICAgIFwibmFtZVwiOlwiaWdubWFwXCJcbi8vICAgICAgICAgICAgICxcInRpdGxlXCI6XCJJR04gU2NhblwiXG4vLyAgICAgICAgICAgICAsXCJ0eXBlXCI6XCJiYXNlbGF5ZXJcIlxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgZXZ0LmNvbmZpZy5sYXllcnNbJ2lnbm1hcCddID0gaWdubWFwQ2ZnO1xuLy8gICAgICAgICAgIGV2dC5iYXNlbGF5ZXJzLnB1c2goaWdubWFwKTtcbi8vICAgICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgfVxuLy8gICAgICAgIGlmICgoJ2lnblN0cmVldHMnIGluIGV2dC5jb25maWcub3B0aW9ucykgJiYgZXZ0LmNvbmZpZy5vcHRpb25zLmlnblN0cmVldHMgPT0gJ1RydWUnICYmICgnaWduS2V5JyBpbiBldnQuY29uZmlnLm9wdGlvbnMpKSB7XG4vLyAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4vLyAgICAgICAgICAgICB6b29tT2Zmc2V0OiAwLFxuLy8gICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjUsXG4vLyAgICAgICAgICAgICBudW1ab29tTGV2ZWxzOjE4XG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCAhPSAwKSB7XG4vLyAgICAgICAgICAgICBvcHRpb25zLnpvb21PZmZzZXQgPSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgICAgb3B0aW9ucy5tYXhSZXNvbHV0aW9uID0gbE9wdGlvbnMubWF4UmVzb2x1dGlvbjtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQrbE9wdGlvbnMubnVtWm9vbUxldmVscyA8PSBvcHRpb25zLm51bVpvb21MZXZlbHMpXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBsT3B0aW9ucy5udW1ab29tTGV2ZWxzO1xuLy8gICAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IG9wdGlvbnMubnVtWm9vbUxldmVscyAtIGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgdmFyIGlnbnBsYW4gPSBuZXcgT3BlbkxheWVycy5MYXllci5XTVRTKHtcbi8vICAgICAgICAgICAgIG5hbWU6IFwiaWducGxhblwiLFxuLy8gICAgICAgICAgICAgdXJsOiBcImh0dHBzOi8vd3hzLmlnbi5mci9cIitldnQuY29uZmlnLm9wdGlvbnMuaWduS2V5K1wiL3dtdHNcIixcbi8vICAgICAgICAgICAgIGxheWVyOiBcIkdFT0dSQVBISUNBTEdSSURTWVNURU1TLlBMQU5JR05cIixcbi8vICAgICAgICAgICAgIG1hdHJpeFNldDogXCJQTVwiLFxuLy8gICAgICAgICAgICAgc3R5bGU6IFwibm9ybWFsXCIsXG4vLyAgICAgICAgICAgICBwcm9qZWN0aW9uOiBuZXcgT3BlbkxheWVycy5Qcm9qZWN0aW9uKFwiRVBTRzozODU3XCIpLFxuLy8gICAgICAgICAgICAgYXR0cmlidXRpb246ICdGb25kJm5ic3A7OiAmY29weTtJR04gPGEgaHJlZj1cImh0dHA6Ly93d3cuZ2VvcG9ydGFpbC5mci9cIiB0YXJnZXQ9XCJfYmxhbmtcIj48aW1nIHNyYz1cImh0dHBzOi8vYXBpLmlnbi5mci9nZW9wb3J0YWlsL2FwaS9qcy8yLjAuMGJldGEvdGhlbWUvZ2VvcG9ydGFsL2ltZy9sb2dvX2dwLmdpZlwiPjwvYT4gPGEgaHJlZj1cImh0dHA6Ly93d3cuZ2VvcG9ydGFpbC5nb3V2LmZyL2RlcG90L2FwaS9jZ3UvbGljQVBJX0NHVUYucGRmXCIgYWx0PVwiVE9TXCIgdGl0bGU9XCJUT1NcIiB0YXJnZXQ9XCJfYmxhbmtcIj5Db25kaXRpb25zIGRcXCd1dGlsaXNhdGlvbjwvYT4nXG4vLyAgICAgICAgICAgICAsIG51bVpvb21MZXZlbHM6IG9wdGlvbnMubnVtWm9vbUxldmVscywgbWF4UmVzb2x1dGlvbjogb3B0aW9ucy5tYXhSZXNvbHV0aW9uLCBtaW5ab29tTGV2ZWw6b3B0aW9ucy56b29tT2Zmc2V0XG4vLyAgICAgICAgICAgICAsem9vbU9mZnNldDogb3B0aW9ucy56b29tT2Zmc2V0XG5cbi8vICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICBpZ25wbGFuLm1heEV4dGVudCA9IG1heEV4dGVudDtcbi8vICAgICAgICAgICB2YXIgaWducGxhbkNmZyA9IHtcbi8vICAgICAgICAgICAgICBcIm5hbWVcIjpcImlnbnBsYW5cIlxuLy8gICAgICAgICAgICAgLFwidGl0bGVcIjpcIklHTiBQbGFuXCJcbi8vICAgICAgICAgICAgICxcInR5cGVcIjpcImJhc2VsYXllclwiXG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBldnQuY29uZmlnLmxheWVyc1snaWducGxhbiddID0gaWducGxhbkNmZztcbi8vICAgICAgICAgICBldnQuYmFzZWxheWVycy5wdXNoKGlnbnBsYW4pO1xuLy8gICAgICAgICAgIGV2dC5tYXAuYWxsT3ZlcmxheXMgPSBmYWxzZTtcbi8vICAgICAgICB9XG4vLyAgICAgICAgaWYgKCgnaWduU2F0ZWxsaXRlJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5pZ25TYXRlbGxpdGUgPT0gJ1RydWUnICYmICgnaWduS2V5JyBpbiBldnQuY29uZmlnLm9wdGlvbnMpKSB7XG4vLyAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4vLyAgICAgICAgICAgICB6b29tT2Zmc2V0OiAwLFxuLy8gICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjUsXG4vLyAgICAgICAgICAgICBudW1ab29tTGV2ZWxzOjIyXG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCAhPSAwKSB7XG4vLyAgICAgICAgICAgICBvcHRpb25zLnpvb21PZmZzZXQgPSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgICAgb3B0aW9ucy5tYXhSZXNvbHV0aW9uID0gbE9wdGlvbnMubWF4UmVzb2x1dGlvbjtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQrbE9wdGlvbnMubnVtWm9vbUxldmVscyA8PSBvcHRpb25zLm51bVpvb21MZXZlbHMpXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBsT3B0aW9ucy5udW1ab29tTGV2ZWxzO1xuLy8gICAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IG9wdGlvbnMubnVtWm9vbUxldmVscyAtIGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgdmFyIGlnbnBob3RvID0gbmV3IE9wZW5MYXllcnMuTGF5ZXIuV01UUyh7XG4vLyAgICAgICAgICAgICBuYW1lOiBcImlnbnBob3RvXCIsXG4vLyAgICAgICAgICAgICB1cmw6IFwiaHR0cHM6Ly93eHMuaWduLmZyL1wiK2V2dC5jb25maWcub3B0aW9ucy5pZ25LZXkrXCIvd210c1wiLFxuLy8gICAgICAgICAgICAgbGF5ZXI6IFwiT1JUSE9JTUFHRVJZLk9SVEhPUEhPVE9TXCIsXG4vLyAgICAgICAgICAgICBtYXRyaXhTZXQ6IFwiUE1cIixcbi8vICAgICAgICAgICAgIHN0eWxlOiBcIm5vcm1hbFwiLFxuLy8gICAgICAgICAgICAgcHJvamVjdGlvbjogbmV3IE9wZW5MYXllcnMuUHJvamVjdGlvbihcIkVQU0c6Mzg1N1wiKSxcbi8vICAgICAgICAgICAgIGF0dHJpYnV0aW9uOiAnRm9uZCZuYnNwOzogJmNvcHk7SUdOIDxhIGhyZWY9XCJodHRwOi8vd3d3Lmdlb3BvcnRhaWwuZnIvXCIgdGFyZ2V0PVwiX2JsYW5rXCI+PGltZyBzcmM9XCJodHRwczovL2FwaS5pZ24uZnIvZ2VvcG9ydGFpbC9hcGkvanMvMi4wLjBiZXRhL3RoZW1lL2dlb3BvcnRhbC9pbWcvbG9nb19ncC5naWZcIj48L2E+IDxhIGhyZWY9XCJodHRwOi8vd3d3Lmdlb3BvcnRhaWwuZ291di5mci9kZXBvdC9hcGkvY2d1L2xpY0FQSV9DR1VGLnBkZlwiIGFsdD1cIlRPU1wiIHRpdGxlPVwiVE9TXCIgdGFyZ2V0PVwiX2JsYW5rXCI+Q29uZGl0aW9ucyBkXFwndXRpbGlzYXRpb248L2E+J1xuLy8gICAgICAgICAgICAgLCBudW1ab29tTGV2ZWxzOiBvcHRpb25zLm51bVpvb21MZXZlbHMsIG1heFJlc29sdXRpb246IG9wdGlvbnMubWF4UmVzb2x1dGlvbiwgbWluWm9vbUxldmVsOm9wdGlvbnMuem9vbU9mZnNldFxuLy8gICAgICAgICAgICAgLHpvb21PZmZzZXQ6IG9wdGlvbnMuem9vbU9mZnNldFxuXG4vLyAgICAgICAgICAgfSk7XG4vLyAgICAgICAgICAgaWducGhvdG8ubWF4RXh0ZW50ID0gbWF4RXh0ZW50O1xuLy8gICAgICAgICAgIHZhciBpZ25waG90b0NmZyA9IHtcbi8vICAgICAgICAgICAgICBcIm5hbWVcIjpcImlnbnBob3RvXCJcbi8vICAgICAgICAgICAgICxcInRpdGxlXCI6XCJJR04gUGhvdG9zXCJcbi8vICAgICAgICAgICAgICxcInR5cGVcIjpcImJhc2VsYXllclwiXG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBldnQuY29uZmlnLmxheWVyc1snaWducGhvdG8nXSA9IGlnbnBob3RvQ2ZnO1xuLy8gICAgICAgICAgIGV2dC5iYXNlbGF5ZXJzLnB1c2goaWducGhvdG8pO1xuLy8gICAgICAgICAgIGV2dC5tYXAuYWxsT3ZlcmxheXMgPSBmYWxzZTtcbi8vICAgICAgICB9XG4vLyAgICAgICAgaWYgKCgnaWduQ2FkYXN0cmFsJyBpbiBldnQuY29uZmlnLm9wdGlvbnMpICYmIGV2dC5jb25maWcub3B0aW9ucy5pZ25DYWRhc3RyYWwgPT0gJ1RydWUnICYmICgnaWduS2V5JyBpbiBldnQuY29uZmlnLm9wdGlvbnMpKSB7XG4vLyAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4vLyAgICAgICAgICAgICB6b29tT2Zmc2V0OiAwLFxuLy8gICAgICAgICAgICAgbWF4UmVzb2x1dGlvbjoxNTY1NDMuMDMzOTA2MjUsXG4vLyAgICAgICAgICAgICBudW1ab29tTGV2ZWxzOjIwXG4vLyAgICAgICAgICAgfTtcbi8vICAgICAgICAgICBpZiAobE9wdGlvbnMuem9vbU9mZnNldCAhPSAwKSB7XG4vLyAgICAgICAgICAgICBvcHRpb25zLnpvb21PZmZzZXQgPSBsT3B0aW9ucy56b29tT2Zmc2V0O1xuLy8gICAgICAgICAgICAgb3B0aW9ucy5tYXhSZXNvbHV0aW9uID0gbE9wdGlvbnMubWF4UmVzb2x1dGlvbjtcbi8vICAgICAgICAgICB9XG4vLyAgICAgICAgICAgaWYgKGxPcHRpb25zLnpvb21PZmZzZXQrbE9wdGlvbnMubnVtWm9vbUxldmVscyA8PSBvcHRpb25zLm51bVpvb21MZXZlbHMpXG4vLyAgICAgICAgICAgICBvcHRpb25zLm51bVpvb21MZXZlbHMgPSBsT3B0aW9ucy5udW1ab29tTGV2ZWxzO1xuLy8gICAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICAgIG9wdGlvbnMubnVtWm9vbUxldmVscyA9IG9wdGlvbnMubnVtWm9vbUxldmVscyAtIGxPcHRpb25zLnpvb21PZmZzZXQ7XG4vLyAgICAgICAgICAgdmFyIGlnbmNhZGFzdHJhbCA9IG5ldyBPcGVuTGF5ZXJzLkxheWVyLldNVFMoe1xuLy8gICAgICAgICAgICAgbmFtZTogXCJpZ25jYWRhc3RyYWxcIixcbi8vICAgICAgICAgICAgIHVybDogXCJodHRwczovL3d4cy5pZ24uZnIvXCIrZXZ0LmNvbmZpZy5vcHRpb25zLmlnbktleStcIi93bXRzXCIsXG4vLyAgICAgICAgICAgICBsYXllcjogXCJDQURBU1RSQUxQQVJDRUxTLlBBUkNFTFNcIixcbi8vICAgICAgICAgICAgIG1hdHJpeFNldDogXCJQTVwiLFxuLy8gICAgICAgICAgICAgc3R5bGU6IFwibm9ybWFsXCIsXG4vLyAgICAgICAgICAgICBmb3JtYXQ6IFwiaW1hZ2UvcG5nXCIsXG4vLyAgICAgICAgICAgICBwcm9qZWN0aW9uOiBuZXcgT3BlbkxheWVycy5Qcm9qZWN0aW9uKFwiRVBTRzozODU3XCIpLFxuLy8gICAgICAgICAgICAgYXR0cmlidXRpb246ICdGb25kJm5ic3A7OiAmY29weTtJR04gPGEgaHJlZj1cImh0dHA6Ly93d3cuZ2VvcG9ydGFpbC5mci9cIiB0YXJnZXQ9XCJfYmxhbmtcIj48aW1nIHNyYz1cImh0dHBzOi8vYXBpLmlnbi5mci9nZW9wb3J0YWlsL2FwaS9qcy8yLjAuMGJldGEvdGhlbWUvZ2VvcG9ydGFsL2ltZy9sb2dvX2dwLmdpZlwiPjwvYT4gPGEgaHJlZj1cImh0dHA6Ly93d3cuZ2VvcG9ydGFpbC5nb3V2LmZyL2RlcG90L2FwaS9jZ3UvbGljQVBJX0NHVUYucGRmXCIgYWx0PVwiVE9TXCIgdGl0bGU9XCJUT1NcIiB0YXJnZXQ9XCJfYmxhbmtcIj5Db25kaXRpb25zIGRcXCd1dGlsaXNhdGlvbjwvYT4nXG4vLyAgICAgICAgICAgICAsIG51bVpvb21MZXZlbHM6IG9wdGlvbnMubnVtWm9vbUxldmVscywgbWF4UmVzb2x1dGlvbjogb3B0aW9ucy5tYXhSZXNvbHV0aW9uLCBtaW5ab29tTGV2ZWw6b3B0aW9ucy56b29tT2Zmc2V0XG4vLyAgICAgICAgICAgICAsem9vbU9mZnNldDogb3B0aW9ucy56b29tT2Zmc2V0XG5cbi8vICAgICAgICAgICB9KTtcbi8vICAgICAgICAgICBpZ25jYWRhc3RyYWwubWF4RXh0ZW50ID0gbWF4RXh0ZW50O1xuLy8gICAgICAgICAgIHZhciBpZ25jYWRhc3RyYWxDZmcgPSB7XG4vLyAgICAgICAgICAgICAgXCJuYW1lXCI6XCJpZ25jYWRhc3RyYWxcIlxuLy8gICAgICAgICAgICAgLFwidGl0bGVcIjpcIklHTiBDYWRhc3RyZVwiXG4vLyAgICAgICAgICAgICAsXCJ0eXBlXCI6XCJiYXNlbGF5ZXJcIlxuLy8gICAgICAgICAgIH07XG4vLyAgICAgICAgICAgZXZ0LmNvbmZpZy5sYXllcnNbJ2lnbmNhZGFzdHJhbCddID0gaWduY2FkYXN0cmFsQ2ZnO1xuLy8gICAgICAgICAgIGV2dC5iYXNlbGF5ZXJzLnB1c2goaWduY2FkYXN0cmFsKTtcbi8vICAgICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG4vLyAgICAgICAgfVxuLy8gICAgICAgfSBjYXRjaChlKSB7XG4vLyAgICAgICAgICAvL3Byb2JsZW1zIHdpdGggZ29vZ2xlXG4vLyAgICAgICAgICB2YXIgbXlFcnJvciA9IGU7XG4vLyAgICAgICAgfVxuLy8gICAgICB9XG5cbi8vICAgICAgIGlmKCdsaXptYXBFeHRlcm5hbEJhc2VsYXllcnMnIGluIGV2dC5jb25maWcpe1xuXG4vLyAgICAgICAgIHZhciBleHRlcm5hbFNlcnZpY2UgPSBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKGxpelVybHMud21zXG4vLyAgICAgICAgICAgLE9wZW5MYXllcnMuVXRpbC5nZXRQYXJhbWV0ZXJTdHJpbmcobGl6VXJscy5wYXJhbXMpXG4vLyAgICAgICAgICk7XG4vLyAgICAgICAgIGlmIChsaXpVcmxzLnB1YmxpY1VybExpc3QgJiYgbGl6VXJscy5wdWJsaWNVcmxMaXN0Lmxlbmd0aCA+IDEgKSB7XG4vLyAgICAgICAgICAgICBleHRlcm5hbFNlcnZpY2UgPSBbXTtcbi8vICAgICAgICAgICAgIGZvciAodmFyIGo9MCwgamxlbj1saXpVcmxzLnB1YmxpY1VybExpc3QubGVuZ3RoOyBqPGpsZW47IGorKykge1xuLy8gICAgICAgICAgICAgICBleHRlcm5hbFNlcnZpY2UucHVzaChcbi8vICAgICAgICAgICAgICAgICBPcGVuTGF5ZXJzLlV0aWwudXJsQXBwZW5kKFxuLy8gICAgICAgICAgICAgICAgICAgbGl6VXJscy5wdWJsaWNVcmxMaXN0W2pdLFxuLy8gICAgICAgICAgICAgICAgICAgT3BlbkxheWVycy5VdGlsLmdldFBhcmFtZXRlclN0cmluZyhsaXpVcmxzLnBhcmFtcylcbi8vICAgICAgICAgICAgICAgICApXG4vLyAgICAgICAgICAgICAgICk7XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgICAvLyBBZGQgbGl6bWFwIGV4dGVybmFsIGJhc2VsYXllcnNcbi8vICAgICAgICAgZm9yIChpZCBpbiBldnQuY29uZmlnWydsaXptYXBFeHRlcm5hbEJhc2VsYXllcnMnXSkge1xuXG4vLyAgICAgICAgICAgdmFyIGxheWVyQ29uZmlnID0gZXZ0LmNvbmZpZ1snbGl6bWFwRXh0ZXJuYWxCYXNlbGF5ZXJzJ11baWRdO1xuXG4vLyAgICAgICAgICAgaWYgKCEoJ3JlcG9zaXRvcnknIGluIGxheWVyQ29uZmlnKSB8fCAhKCdwcm9qZWN0JyBpbiBsYXllckNvbmZpZykpXG4vLyAgICAgICAgICAgICBjb250aW51ZTtcblxuLy8gICAgICAgICAgIHZhciBsYXllck5hbWUgPSBldnQuY2xlYW5OYW1lKGxheWVyQ29uZmlnLmxheWVyTmFtZSk7XG5cbi8vICAgICAgICAgICB2YXIgbGF5ZXJXbXNQYXJhbXMgPSB7XG4vLyAgICAgICAgICAgICBsYXllcnM6bGF5ZXJDb25maWcubGF5ZXJOYW1lXG4vLyAgICAgICAgICAgICAsdmVyc2lvbjonMS4zLjAnXG4vLyAgICAgICAgICAgICAsZXhjZXB0aW9uczonYXBwbGljYXRpb24vdm5kLm9nYy5zZV9pbmltYWdlJ1xuLy8gICAgICAgICAgICAgLGZvcm1hdDoobGF5ZXJDb25maWcubGF5ZXJJbWFnZUZvcm1hdCkgPyAnaW1hZ2UvJytsYXllckNvbmZpZy5sYXllckltYWdlRm9ybWF0IDogJ2ltYWdlL3BuZydcbi8vICAgICAgICAgICAgICxkcGk6OTZcbi8vICAgICAgICAgICB9O1xuLy8gICAgICAgICAgIGlmIChsYXllcldtc1BhcmFtcy5mb3JtYXQgIT0gJ2ltYWdlL2pwZWcnKVxuLy8gICAgICAgICAgICAgbGF5ZXJXbXNQYXJhbXNbJ3RyYW5zcGFyZW50J10gPSB0cnVlO1xuXG4vLyAgICAgICAgICAgLy8gQ2hhbmdlIHJlcG9zaXRvcnkgYW5kIHByb2plY3QgaW4gc2VydmljZSBVUkxcbi8vICAgICAgICAgICB2YXIgcmVnID0gbmV3IFJlZ0V4cCgncmVwb3NpdG9yeVxcPSguKykmcHJvamVjdFxcPSguKyknLCAnZycpO1xuLy8gICAgICAgICAgIGlmICghIChleHRlcm5hbFNlcnZpY2UgaW5zdGFuY2VvZiBBcnJheSkgKVxuLy8gICAgICAgICAgICAgdmFyIHVybCA9IGV4dGVybmFsU2VydmljZS5yZXBsYWNlKHJlZywgJ3JlcG9zaXRvcnk9JytsYXllckNvbmZpZy5yZXBvc2l0b3J5KycmcHJvamVjdD0nK2xheWVyQ29uZmlnLnByb2plY3QpO1xuLy8gICAgICAgICAgIGVsc2Vcbi8vICAgICAgICAgICAgIHZhciB1cmwgPSBqUXVlcnkubWFwKGV4dGVybmFsU2VydmljZSwgZnVuY3Rpb24oZWxlbWVudCkgeyByZXR1cm4gZWxlbWVudC5yZXBsYWNlKHJlZywgJ3JlcG9zaXRvcnk9JytsYXllckNvbmZpZy5yZXBvc2l0b3J5KycmcHJvamVjdD0nK2xheWVyQ29uZmlnLnByb2plY3QpIH0pO1xuXG4vLyAgICAgICAgICAgLy8gY3JlYXRpbmcgdGhlIGJhc2UgbGF5ZXJcbi8vICAgICAgICAgICBsYXllckNvbmZpZy50aXRsZSA9IGxheWVyQ29uZmlnLmxheWVyVGl0bGVcbi8vICAgICAgICAgICBsYXllckNvbmZpZy5uYW1lID0gbGF5ZXJDb25maWcubGF5ZXJOYW1lXG4vLyAgICAgICAgICAgbGF5ZXJDb25maWcuYmFzZWxheWVyID0gdHJ1ZTtcbi8vICAgICAgICAgICBsYXllckNvbmZpZy5zaW5nbGVUaWxlID0gXCJGYWxzZVwiO1xuLy8gICAgICAgICAgIGV2dC5jb25maWcubGF5ZXJzW2xheWVyTmFtZV0gPSBsYXllckNvbmZpZztcbi8vICAgICAgICAgICBldnQuYmFzZWxheWVycy5wdXNoKG5ldyBPcGVuTGF5ZXJzLkxheWVyLldNUyhsYXllck5hbWUsdXJsXG4vLyAgICAgICAgICAgICAsbGF5ZXJXbXNQYXJhbXNcbi8vICAgICAgICAgICAgICx7aXNCYXNlTGF5ZXI6dHJ1ZVxuLy8gICAgICAgICAgICAgLGd1dHRlcjoobGF5ZXJDb25maWcuY2FjaGVkID09ICdUcnVlJykgPyAwIDogNVxuLy8gICAgICAgICAgICAgLGJ1ZmZlcjowXG4vLyAgICAgICAgICAgICAsc2luZ2xlVGlsZToobGF5ZXJDb25maWcuc2luZ2xlVGlsZSA9PSAnVHJ1ZScpXG4vLyAgICAgICAgICAgICAscmF0aW86MVxuLy8gICAgICAgICAgIH0pKTtcbi8vICAgICAgICAgICBldnQubWFwLmFsbE92ZXJsYXlzID0gZmFsc2U7XG5cbi8vICAgICAgICAgfVxuLy8gICAgICAgfVxuXG4vLyAgICAgfVxuLy8gICAgLFxuLy8gICAgJ3VpY3JlYXRlZCc6IGZ1bmN0aW9uKGV2dCl7XG4vLyAgICAgIHZhciBtYXAgPSBldnQubWFwO1xuLy8gICAgICBpZiAoIG1hcC5pZCBpbiBPcGVuTGF5ZXJzLkxheWVyLkdvb2dsZS5jYWNoZSApIHtcbi8vICAgICAgICAgZ29vZ2xlLm1hcHMuZXZlbnQuYWRkTGlzdGVuZXJPbmNlKE9wZW5MYXllcnMuTGF5ZXIuR29vZ2xlLmNhY2hlW21hcC5pZF0ubWFwT2JqZWN0LCAndGlsZXNsb2FkZWQnLCBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgICAgIHZhciBvbExheWVycyA9IG1hcC5sYXllcnM7XG4vLyAgICAgICAgICAgICB2YXIgZ1Zpc2liaWxpdHkgPSBmYWxzZTtcbi8vICAgICAgICAgICAgIGZvciAodmFyIGk9b2xMYXllcnMubGVuZ3RoLTE7IGk+PTA7IC0taSkge1xuLy8gICAgICAgICAgICAgICAgIHZhciBsYXllciA9IG9sTGF5ZXJzW2ldO1xuLy8gICAgICAgICAgICAgICAgIGlmIChsYXllciBpbnN0YW5jZW9mIE9wZW5MYXllcnMuTGF5ZXIuR29vZ2xlICYmXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIudmlzaWJpbGl0eSA9PT0gdHJ1ZSAmJiBsYXllci5pblJhbmdlID09PSB0cnVlKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIGxheWVyLnJlZHJhdyh0cnVlKTtcbi8vICAgICAgICAgICAgICAgICAgICAgZ1Zpc2liaWxpdHkgPSB0cnVlO1xuLy8gICAgICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICBpZiAoIWdWaXNpYmlsaXR5KSB7XG4vLyAgICAgICAgICAgICAgICAgZm9yICh2YXIgaT1vbExheWVycy5sZW5ndGgtMTsgaT49MDsgLS1pKSB7XG4vLyAgICAgICAgICAgICAgICAgICAgIHZhciBsYXllciA9IG9sTGF5ZXJzW2ldO1xuLy8gICAgICAgICAgICAgICAgICAgICBpZiAobGF5ZXIgaW5zdGFuY2VvZiBPcGVuTGF5ZXJzLkxheWVyLkdvb2dsZSkge1xuLy8gICAgICAgICAgICAgICAgICAgICAgICAgbGF5ZXIuZGlzcGxheShmYWxzZSk7XG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbi8vICAgICAgICAgICAgICAgICAgICAgfVxuLy8gICAgICAgICAgICAgICAgIH1cbi8vICAgICAgICAgICAgIH1cbi8vICAgICAgICAgfSk7XG4vLyAgICAgIH1cblxuLy8gICAgICAgLy8gTWFrZSBzdWJkb2NrIGFsd2F5cyBiZSBhdCB0aGUgbGVmdFxuLy8gICAgICAgJCgnI3N1Yi1kb2NrJykuaG92ZXIoZnVuY3Rpb24oKXtcbi8vICAgICAgICAgdmFyIHNMZWZ0ID0gbGl6TWFwLmdldERvY2tSaWdodFBvc2l0aW9uKCk7XG4vLyAgICAgICAgICQodGhpcykuY3NzKCAnbGVmdCcsIHNMZWZ0ICk7XG4vLyAgICAgICB9KTtcblxuLy8gICAgICAgLy8gVXBkYXRlIGxlZ2VuZCBpZiBtb2JpbGVcbi8vICAgICAgIGlmKCBsaXpNYXAuY2hlY2tNb2JpbGUoKSApe1xuLy8gICAgICAgICBpZiggJCgnI2J1dHRvbi1zd2l0Y2hlcicpLnBhcmVudCgpLmhhc0NsYXNzKCdhY3RpdmUnKSApXG4vLyAgICAgICAgICAgJCgnI2J1dHRvbi1zd2l0Y2hlcicpLmNsaWNrKCk7XG4vLyAgICAgICB9XG5cbi8vICAgICAgICAgdmFyIG92Q3RybCA9IGxpek1hcC5tYXAuZ2V0Q29udHJvbHNCeUNsYXNzKCdPcGVuTGF5ZXJzLkNvbnRyb2wuT3ZlcnZpZXdNYXAnKTtcbi8vICAgICAgICAgaWYgKCBvdkN0cmwubGVuZ3RoICE9IDAgKSB7XG4vLyAgICAgICAgICAgICBvdkN0cmwgPSBvdkN0cmxbMF07XG4vLyAgICAgICAgICAgICBpZiAoIG92Q3RybC5vdm1hcC5sYXllcnMubGVuZ3RoID4gMSApIHtcbi8vICAgICAgICAgICAgICAgICBmb3IgKCB2YXIgaT0wLCBsZW49b3ZDdHJsLm92bWFwLmxheWVycy5sZW5ndGg7IGk8bGVuOyBpKysgKXtcbi8vICAgICAgICAgICAgICAgICAgICAgdmFyIGwgPSBvdkN0cmwub3ZtYXAubGF5ZXJzW2ldO1xuLy8gICAgICAgICAgICAgICAgICAgICBpZiggbC5uYW1lLnRvTG93ZXJDYXNlKCkgIT0gJ292ZXJ2aWV3JyApXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICBsLmRlc3Ryb3koKTtcbi8vICAgICAgICAgICAgICAgICB9XG4vLyAgICAgICAgICAgICB9XG4vLyAgICAgICAgIH1cblxuLy8gICAgICAgLy8gQ29ubmVjdCBkb2NrIGNsb3NlIGJ1dHRvblxuLy8gICAgICAgJCgnI2RvY2stY2xvc2UnKS5jbGljayhmdW5jdGlvbigpeyAkKCcjbWFwbWVudSAubmF2LWxpc3QgPiBsaS5hY3RpdmUubmF2LWRvY2sgPiBhJykuY2xpY2soKTsgfSk7XG4vLyAgICAgICAkKCcjcmlnaHQtZG9jay1jbG9zZScpLmNsaWNrKGZ1bmN0aW9uKCl7ICQoJyNtYXBtZW51IC5uYXYtbGlzdCA+IGxpLmFjdGl2ZS5uYXYtcmlnaHQtZG9jayA+IGEnKS5jbGljaygpOyB9KTtcbi8vICAgIH1cblxuLy8gfSk7XG4vLyBUT0RPIExBVEVSPlxuXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbiAoKSB7XG4gIC8vIHN0YXJ0IHdhaXRpbmdcbiAgJCgnYm9keScpLmNzcygnY3Vyc29yJywgJ3dhaXQnKTtcbiAgJCgnI2xvYWRpbmcnKS5kaWFsb2coe1xuICAgIG1vZGFsOiB0cnVlXG4gICAgLCBkcmFnZ2FibGU6IGZhbHNlXG4gICAgLCByZXNpemFibGU6IGZhbHNlXG4gICAgLCBjbG9zZU9uRXNjYXBlOiBmYWxzZVxuICAgICwgZGlhbG9nQ2xhc3M6ICdsaXotZGlhbG9nLXdhaXQnXG4gICAgLCBtaW5IZWlnaHQ6IDEyOFxuICB9KVxuICAucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ3VpLWNvcm5lci1hbGwnKVxuICAuY2hpbGRyZW4oJy51aS1kaWFsb2ctdGl0bGViYXInKS5yZW1vdmVDbGFzcygndWktY29ybmVyLWFsbCcpO1xuICAvLyBpbml0aWFsaXplIExpek1hcFxuICBsaXpNYXAuaW5pdCgpO1xuICAkKCBcIiNsb2FkaW5nXCIgKS5jc3MoJ21pbi1oZWlnaHQnLCcxMjhweCcpO1xufSk7XG5cbi8qISBFUzYgU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoIHBvbHlmaWxsICovXG4vKiEgaHR0cHM6Ly9tdGhzLmJlL3N0YXJ0c3dpdGggdjAuMi4wIGJ5IEBtYXRoaWFzICovXG5pZiAoIVN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCkge1xuICAgIChmdW5jdGlvbigpIHtcbiAgICAgICAgJ3VzZSBzdHJpY3QnOyAvLyBuZWVkZWQgdG8gc3VwcG9ydCBgYXBwbHlgL2BjYWxsYCB3aXRoIGB1bmRlZmluZWRgL2BudWxsYFxuICAgICAgICB2YXIgZGVmaW5lUHJvcGVydHkgPSAoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBJRSA4IG9ubHkgc3VwcG9ydHMgYE9iamVjdC5kZWZpbmVQcm9wZXJ0eWAgb24gRE9NIGVsZW1lbnRzXG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciBvYmplY3QgPSB7fTtcbiAgICAgICAgICAgICAgICB2YXIgJGRlZmluZVByb3BlcnR5ID0gT2JqZWN0LmRlZmluZVByb3BlcnR5O1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSAkZGVmaW5lUHJvcGVydHkob2JqZWN0LCBvYmplY3QsIG9iamVjdCkgJiYgJGRlZmluZVByb3BlcnR5O1xuICAgICAgICAgICAgfSBjYXRjaChlcnJvcikge31cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0oKSk7XG4gICAgICAgIHZhciB0b1N0cmluZyA9IHt9LnRvU3RyaW5nO1xuICAgICAgICB2YXIgc3RhcnRzV2l0aCA9IGZ1bmN0aW9uKHNlYXJjaCkge1xuICAgICAgICAgICAgaWYgKHRoaXMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRocm93IFR5cGVFcnJvcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHN0cmluZyA9IFN0cmluZyh0aGlzKTtcbiAgICAgICAgICAgIGlmIChzZWFyY2ggJiYgdG9TdHJpbmcuY2FsbChzZWFyY2gpID09ICdbb2JqZWN0IFJlZ0V4cF0nKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc3RyaW5nTGVuZ3RoID0gc3RyaW5nLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBzZWFyY2hTdHJpbmcgPSBTdHJpbmcoc2VhcmNoKTtcbiAgICAgICAgICAgIHZhciBzZWFyY2hMZW5ndGggPSBzZWFyY2hTdHJpbmcubGVuZ3RoO1xuICAgICAgICAgICAgdmFyIHBvc2l0aW9uID0gYXJndW1lbnRzLmxlbmd0aCA+IDEgPyBhcmd1bWVudHNbMV0gOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICAvLyBgVG9JbnRlZ2VyYFxuICAgICAgICAgICAgdmFyIHBvcyA9IHBvc2l0aW9uID8gTnVtYmVyKHBvc2l0aW9uKSA6IDA7XG4gICAgICAgICAgICBpZiAocG9zICE9IHBvcykgeyAvLyBiZXR0ZXIgYGlzTmFOYFxuICAgICAgICAgICAgICAgIHBvcyA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSBNYXRoLm1pbihNYXRoLm1heChwb3MsIDApLCBzdHJpbmdMZW5ndGgpO1xuICAgICAgICAgICAgLy8gQXZvaWQgdGhlIGBpbmRleE9mYCBjYWxsIGlmIG5vIG1hdGNoIGlzIHBvc3NpYmxlXG4gICAgICAgICAgICBpZiAoc2VhcmNoTGVuZ3RoICsgc3RhcnQgPiBzdHJpbmdMZW5ndGgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgaW5kZXggPSAtMTtcbiAgICAgICAgICAgIHdoaWxlICgrK2luZGV4IDwgc2VhcmNoTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZy5jaGFyQ29kZUF0KHN0YXJ0ICsgaW5kZXgpICE9IHNlYXJjaFN0cmluZy5jaGFyQ29kZUF0KGluZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH07XG4gICAgICAgIGlmIChkZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICAgICAgZGVmaW5lUHJvcGVydHkoU3RyaW5nLnByb3RvdHlwZSwgJ3N0YXJ0c1dpdGgnLCB7XG4gICAgICAgICAgICAgICAgJ3ZhbHVlJzogc3RhcnRzV2l0aCxcbiAgICAgICAgICAgICAgICAnY29uZmlndXJhYmxlJzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAnd3JpdGFibGUnOiB0cnVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIFN0cmluZy5wcm90b3R5cGUuc3RhcnRzV2l0aCA9IHN0YXJ0c1dpdGg7XG4gICAgICAgIH1cbiAgICB9KCkpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==