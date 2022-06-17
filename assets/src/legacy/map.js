/**
* Class: lizMap
* @package   lizmap
* @subpackage view
* @author    3liz
* @copyright 2011 3liz
* @link      http://3liz.com
* @license    Mozilla Public License : http://www.mozilla.org/MPL/
*/


window.lizMap = function() {
  /**
   * PRIVATE Property: config
   * {object} The map config
   */
  var config = null;
  /**
 * PRIVATE Property: keyValueConfig
 * {object} Config to replace keys by values
 */
  var keyValueConfig = null;
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
   * {object} Additional QGIS Server parameter for click tolerance in pixels
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

  /**
   * Get the metadata written in the configuration file by the desktop Lizmap plugin.
   *
   * This method should be used EVERY TIME we need to add "if" conditions
   * to adapt the code for configuration parameters changes across versions.
   * This will ease in the future the review of the code to remove all the "if"
   * conditions: we will just need to search for "getLizmapDesktopPluginMetadata"
   * and not: "if 'someproperty' in someconfig".
   *
   * For very old configuration files, which have not the needed metadata, we
   * return fake versions for each property.
   *
   * Dependencies:
   * config
   */
  function getLizmapDesktopPluginMetadata()
  {
    // Default fake versions if the properties does not yet exist in configuration file
    var plugin_metadata = {
      lizmap_plugin_version_str: "3.1.8",
      lizmap_plugin_version: 30108,
      lizmap_web_client_target_version: 30200,
      project_valid: null,
      qgis_desktop_version: 30000
    };

    if (!('metadata' in config)) {
      return plugin_metadata;
    }
    if ('lizmap_plugin_version' in config['metadata']) {
      plugin_metadata['lizmap_plugin_version'] = config['metadata']['lizmap_plugin_version'];
    }
    if ('lizmap_web_client_target_version' in config['metadata']) {
      plugin_metadata['lizmap_web_client_target_version'] = config['metadata']['lizmap_web_client_target_version'];
    }
    if ('project_valid' in config['metadata']) {
      plugin_metadata['project_valid'] = config['metadata']['project_valid'];
    }
    if ('qgis_desktop_version' in config['metadata']) {
      plugin_metadata['qgis_desktop_version'] = config['metadata']['qgis_desktop_version'];
    }

    return plugin_metadata;

  }

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

    if ( aName == undefined ) {
        console.log( "An undefined name has been clean" );
        return '';
    }

    var theCleanName = performCleanName( aName );
    if ( (theCleanName in cleanNameMap) && cleanNameMap[theCleanName] != aName ){
        var i = 1;
        var nCleanName = theCleanName+i;
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

    if ( $('#right-dock-tabs').is(':visible') ){
      $('#right-dock-content').css( 'max-height', $('#right-dock').height() - $('#right-dock-tabs').height() );
    }

    if(map){
      updateMapSize();
    }
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

    updateMiniDockSize();
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
                  DPI: 96,
                  RULELABEL:"AUTO"
                };
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
        && config.options.ignTerrain == 'True') ||
       (('ignStreets' in config.options)
        && config.options.ignStreets == 'True') ||
       (('ignSatellite' in config.options)
        && config.options.ignSatellite == 'True') ||
       (('ignCadastral' in config.options)
        && config.options.ignCadastral == 'True')
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
             (('ignTerrain' in config.options) && config.options.ignTerrain == 'True') ||
             (('ignStreets' in config.options) && config.options.ignStreets == 'True')) {
           config.options.zoomLevelNumber = 23;
         }
         if ((('googleStreets' in config.options) && config.options.googleStreets == 'True') ||
             (('googleHybrid' in config.options) && config.options.googleHybrid == 'True') ||
             (('ignCadastral' in config.options) && config.options.ignCadastral == 'True')) {
           config.options.zoomLevelNumber = 20;
         }
         if ( 'googleSatellite' in config.options && config.options.googleSatellite == 'True'){
           config.options.zoomLevelNumber = 21;
         }
         if ( 'ignSatellite' in config.options && config.options.ignSatellite == 'True' ) {
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
      // The found name is not in config
      if (!(qgisLayerName in config.layers)) {
        continue;
      }
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

      var wmsStyles = $.map(layer.styles, function(s){
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
      var extConfig = null;
      if ('externalAccess' in layerConfig && layerConfig.externalAccess
       && 'layers' in layerConfig.externalAccess && 'url' in layerConfig.externalAccess ) {
          extConfig = layerConfig.externalAccess;
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

        // Add optional filter at start
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
          // External WMS layers - respect the image format of the WMS source layer
          // We do not want to respect the configuration layerConfig.imageFormat
          // to avoid requesting a format not compatible with the external WMS server
          // Fix the jpeg WMS layers requesting png
          if (extConfig && 'format' in layerWmsParams && 'params' in wmsLayer
              && wmsLayer.params['FORMAT'] != layerWmsParams.format) {
              wmsLayer.params['FORMAT'] = layerWmsParams.format;
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

    // Legend properties
    // Read the plugin metadata to get the legend options
    // depending on the configuration version
    let lizmap_plugin_metadata = getLizmapDesktopPluginMetadata();
    if (lizmap_plugin_metadata.lizmap_web_client_target_version >= 30600) {
      var legendOption = nodeConfig.legend_image_option;
    } else {
      var legendOption = 'hide_at_startup';
      if (nodeConfig.noLegendImage && nodeConfig.noLegendImage == 'True') {
        legendOption = 'disabled';
      }
    }

    // Expand layer legend at startup
    if (nodeConfig.type == 'layer' && legendOption == 'expand_at_startup') {
      html += ' expanded ';
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
    }

    html += '<td><button class="btn checkbox" name="'+nodeConfig.type+'" value="'+aNode.name+'" title="'+lizDict['tree.button.checkbox']+'"></button>';
    html += '<span class="label" title="'+truncateWithEllipsis($('<div>'+nodeConfig.abstract+'</div>').text(),50)+'">'+nodeConfig.title+'</span>';
    html += '</td>';

    html += '<td class="loading">';
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

    if (nodeConfig.cached && nodeConfig.cached == 'True' && nodeConfig.type == 'layer' && ('removeCache' in config.options)){
      html += '<td><button class="btn removeCache" name="removeCache" title="'+lizDict['tree.button.removeCache']+'" value="'+aNode.name+'"/></td>';
    }
    else{
      html += '<td></td>';
    }

    html += '</tr>';

    if (nodeConfig.type == 'layer'
    && (legendOption != 'disabled')
    && ('displayInLegend' in nodeConfig && nodeConfig.displayInLegend == 'True')) {
      var url = getLayerLegendGraphicUrl(aNode.name, false);
      if ( url != null && url != '' ) {
        html += '<tr id="legend-'+aNode.name+'" class="child-of-layer-'+aNode.name+' legendGraphics">';
        html += '<td colspan="2"><div class="legendGraphics">';
        html += '<img data-src="'+url+'" src="'+lizUrls.basepath + 'assets/css/images/download_layer.gif' + '"/>';
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
    // Insert or update projection list
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
    var nScales = [];
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
         zoomend: function(){
  // private treeTable
  var options = {
    childPrefix : "child-of-"
  };

  function childrenOf(node) {
    return $(node).siblings("tr." + options.childPrefix + node[0].id);
  }

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
  }

  function ancestorsOf(node) {
    var ancestors = [];
    while(node = parentOf(node)) {
      ancestors[ancestors.length] = node[0];
    }
    return ancestors;
  }
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
       ,units:projection.proj.units !== null ? projection.proj.units : "degrees"
       ,allOverlays:(baselayers.length == 0)
    });
    map.addControl(new OpenLayers.Control.Attribution({div:document.getElementById('attribution')}));

    // add handler to update the map size
    window.addEventListener('resize', updateContentSize);
  }

  /**
   * Get features for locate by layer tool
   */
  function updateLocateFeatureList(aName) {
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
        for ( var i=0, len =vectorjoins.length; i< len; i++) {
            var vectorjoin = vectorjoins[i];
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

    function clearDrawLayer(layer_name) {
      var layer = map.getLayersByName(layer_name);
      if (layer.length == 0) {
          return;
      }
      layer[0].destroyFeatures();
    }

  /**
   * Zoom to locate feature
   */
  function zoomToLocateFeature(aName) {
    // clean locate layer
    clearDrawLayer('locatelayer');

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
      var format = new OpenLayers.Format.GeoJSON({
          ignoreExtraDims: true
      });
      feat = format.read(feat)[0];

      if( feat.geometry != null){
        feat.geometry.transform(proj, map.getProjection());
        // Show geometry if asked
        if (locate.displayGeom == 'True') {
            var layer = map.getLayersByName('locatelayer')[0];
            if( typeof layer === 'undefined' )
              return;
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
          loadProjDefinition( locate.crs, function() {
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
      if ('filterFieldName' in locate) {
          if ( 'fieldAlias' in locate && locate.fieldAlias!='' )
              placeHolder += locate.fieldAlias+' ';
          else
              placeHolder += locate.fieldName+' ';
          placeHolder += '('+lConfig.title+')';
      } else {
          placeHolder = lConfig.title;
      }
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

    // Read the plugin metadata to get the legend options
    // depending on the configuration version
    let lizmap_plugin_metadata = getLizmapDesktopPluginMetadata();
    if (lizmap_plugin_metadata.lizmap_web_client_target_version >= 30600) {
      var legendOption = nodeConfig.legend_image_option;
    } else {
      var legendOption = 'hide_at_startup';
      if (nodeConfig.noLegendImage && nodeConfig.noLegendImage == 'True') {
        legendOption = 'disabled';
      }
    }

    if (('children' in aNode) && aNode['children'].length!=0) {
      html += getSwitcherUl(aNode, aLevel+1);
    } else if (nodeConfig.type == 'layer' && legendOption != 'disabled') {
      var url = getLayerLegendGraphicUrl(aNode.name, false);
      if ( url != null && url != '' ) {
          html += '<ul id="legend-layer-'+aNode.name+'">';
          html += '<li><div><img data-src="'+url+'" src="'+lizUrls.basepath + 'assets/css/images/download_layer.gif' + '"/></div></li>';
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

  // === Private functions
  var options = {
    childPrefix : "child-of-"
  };

  function childrenOf(node) {
    return $(node).siblings("tr." + options.childPrefix + node[0].id);
  }

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
  }

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
  }

  function ancestorsOf(node) {
    var ancestors = [];
    while(node = parentOf(node)) {
      ancestors[ancestors.length] = node[0];
    }
    return ancestors;
  }

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

        var featureTypes = getVectorLayerFeatureTypes();
        if (featureTypes.length == 0 ){
          config.locateByLayer = {};
          $('#button-locate').parent().remove();
          $('#locate-menu').remove();
        } else {
          for (const featureType of featureTypes) {
            var typeName = featureType.getElementsByTagName('Name')[0].textContent;
            var lname = lizMap.getNameByTypeName( typeName );
            if ( !lname ) {
                if (typeName in config.locateByLayer)
                    lname = typeName
                else if ( (typeName in shortNameMap) && (shortNameMap[typeName] in config.locateByLayer))
                    lname = shortNameMap[typeName];
                else {
                    for (var lbl in config.locateByLayer) {
                        if (lbl.split(' ').join('_') == typeName) {
                            lname = lbl;
                            break;
                        }
                    }
                }
            }

            if ( !(lname in config.locateByLayer) )
                continue;

            var locate = config.locateByLayer[lname];
            locate['crs'] = featureType.getElementsByTagName('SRS')[0].textContent;
            loadProjDefinition( locate.crs, function() {
                new OpenLayers.Projection(locate.crs);
            });
            var bbox = featureType.getElementsByTagName('LatLongBoundingBox')[0];
            locate['bbox'] = [
              parseFloat(bbox.getAttribute('minx'))
              , parseFloat(bbox.getAttribute('miny'))
              , parseFloat(bbox.getAttribute('maxx'))
              , parseFloat(bbox.getAttribute('maxy'))
            ];
          }

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
            clearDrawLayer('locatelayer');
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
   * create the tool bar (collapse switcher, etc)
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

    if (('geolocation' in configOptions)
      && configOptions['geolocation'] == 'True'){
      $('#geolocation button.btn-geolocation-close').click(function () {
        $('#button-geolocation').click();
        return false;
      });
    }

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
        'changelayer': onMapChangelayer,
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
        oParametre[decodeURIComponent(aItKey[0])] = aItKey.length > 1 ? decodeURIComponent(aItKey[1]) : "";
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

  function onMapChangelayer(event) {
    // Update permalink
    updatePermalinkInputs()

    // Trigger lizmap event
    if (event.property == 'visibility'){
      var lname = getLayerNameByCleanName(event.layer.name);
      var lconfig = config.layers[lname]
      lizMap.events.triggerEvent("lizmaplayerchangevisibility",
      {
        'name': lname,
        'config': lconfig,
        'visibility': event.layer.visibility
      });
    }
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
      clearDrawLayer('locatelayer');
      var layer = map.getLayersByName('locatelayer')[0];
      if( typeof layer === 'undefined' )
        return;

      // build selector
      var selector = 'div.lizmapPopupContent div.lizmapPopupDiv > input.lizmap-popup-layer-feature-geometry';
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
            for (const geomInfo of geometries) {
                var geometry = OpenLayers.Geometry.fromWKT( geomInfo.geom );
                geometry.transform(geomInfo.crs, map.getProjection());
                features.push( new OpenLayers.Feature.Vector( geometry ) );
            }
            layer.addFeatures( features );
          }
        });
      }
  }

  function addChildrenDatavizFilteredByPopupFeature(popup, containerId) {
    if ('datavizLayers' in lizMap.config) {
      // build selector
      var selector = 'div.lizmapPopupContent div.lizmapPopupDiv';
      if ( containerId )
        selector = '#'+ containerId +' '+ selector;
     $(selector).each(function(){
        var mydiv = $(this);

        // Do not add plots if already present
        if( $(this).find('div.lizdataviz').length > 0 )
            return true;

        if ($(this).find('input.lizmap-popup-layer-feature-id:first').val()) {
          var getLayerId = $(this).find('input.lizmap-popup-layer-feature-id:first').val().split('.');
          var popupId = getLayerId[0] + '_' + getLayerId[1];
          var layerId = getLayerId[0];
          var fid = getLayerId[1];

          var getLayerConfig = lizMap.getLayerConfigById( layerId );

          // verifiying  related children objects
          if ( !getLayerConfig )
              return true;
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
                var nbPlotByLayer = 1;

                for ( var i in plotLayers) {

                    for(var x in lrelations){
                      var rel = lrelations[x];
                      // Id of the layer which is the child of layerId
                      var getChildrenId = rel.referencingLayer;

                      // Filter of the plot
                      var filter = '"' + rel.referencingField + '" IN (\''+feat.properties[rel.referencedField]+'\')';


                        if(plotLayers[i].layer_id==getChildrenId)
                        {
                            var plot_config=plotLayers[i];
                            if('popup_display_child_plot' in plot_config
                              && plot_config.popup_display_child_plot == "True"
                            ){
                              var plot_id=plotLayers[i].plot_id;
                              popupId = getLayerId[0] + '_' + getLayerId[1] + '_' + String(nbPlotByLayer);
                              // Be sure the id is unique ( popup can be displayed in atlas tool too)
                              popupId+= '_' + new Date().valueOf()+btoa(Math.random()).substring(0,12);
                              var phtml = lizDataviz.buildPlotContainerHtml(
                                  plot_config.title,
                                  plot_config.abstract,
                                  popupId,
                                  false
                              );
                              var html = '<div class="lizmapPopupChildren lizdataviz">';
                              html+= '<h4>'+ plot_config.title+'</h4>';
                              html+= phtml
                              html+= '</div>';
                              var haspc = $(mydiv).find('div.lizmapPopupChildren:last');
                              if( haspc.length > 0 )
                                  $(haspc).after(html);
                              else
                                  $(mydiv).append(html);
                              lizDataviz.getPlot(plot_id, filter, popupId);
                              nbPlotByLayer++;
                            }
                        }
                    }
                }
          });
        }
      });
    }else{
      return false;
    }
  }

  function addChildrenFeatureInfo( popup, containerId ) {
      var selector = 'div.lizmapPopupContent input.lizmap-popup-layer-feature-id';
      if ( containerId )
        selector = '#'+ containerId +' '+ selector;
      $(selector).each(function(){
        var self = $(this);
        var val = self.val();
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
        var popupMaxFeatures = 10;
        if ( 'popupMaxFeatures' in layerConfig && !isNaN(parseInt(layerConfig.popupMaxFeatures)) )
            popupMaxFeatures = parseInt(layerConfig.popupMaxFeatures);
        popupMaxFeatures == 0 ? 10 : popupMaxFeatures;
        getLayerFeature(featureType, fid, function(feat) {

          // Array of Promise w/ fetch to request children popup content
          const popupChidrenRequests = [];
          const rConfigLayerAll = [];

          // Build POST query for every child based on QGIS relations
          for ( const relation of relations ){
              const rLayerId = relation.referencingLayer;
              const rGetLayerConfig = getLayerConfigById( rLayerId );
              if ( rGetLayerConfig ) {
                  const rConfigLayer = rGetLayerConfig[1];
                  let clname = rConfigLayer?.shortname || rConfigLayer.cleanname;
                  if ( clname === undefined ) {
                      clname = cleanName(configLayer.name);
                      rConfigLayer.cleanname = clname;
                  }
                  if ( rConfigLayer.popup == 'True' && self.parent().find('div.lizmapPopupChildren.'+clname).length == 0) {
                      const wmsOptions = {
                            'LAYERS': clname
                          ,'QUERY_LAYERS': clname
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
                          wmsOptions['FILTER'] = rConfigLayer.request_params.filter+' AND "'+relation.referencingField+'" = \''+feat.properties[relation.referencedField]+'\'';
                      else
                          wmsOptions['FILTER'] = clname+':"'+relation.referencingField+'" = \''+feat.properties[relation.referencedField]+'\'';

                    var parentDiv = self.parent();

                    // Fetch queries
                    var service = OpenLayers.Util.urlAppend(lizUrls.wms
                      , OpenLayers.Util.getParameterString(lizUrls.params)
                    );

                    // Keep `rConfigLayer` in array with same order that fetch queries
                    // for later user when Promise.allSettled resolves
                    rConfigLayerAll.push(rConfigLayer);
                    popupChidrenRequests.push(
                      fetch(service, {
                        "method": "POST",
                        "body": new URLSearchParams(wmsOptions)
                      }).then(function (response) {
                        return response.text();
                      })
                    );
                  }
              }
          }

          // Fetch GetFeatureInfo query for every children popups
          Promise.allSettled(popupChidrenRequests).then(popupChildrenData => {

            childPopupElements = [];

            for (let index = 0; index < popupChildrenData.length; index++) {
              let popupChildData = popupChildrenData[index].value;

              var hasPopupContent = (!(!popupChildData || popupChildData == null || popupChildData == ''))
              if (hasPopupContent) {
                var popupReg = new RegExp('lizmapPopupTable', 'g');
                popupChildData = popupChildData.replace(popupReg, 'table table-condensed table-striped lizmapPopupTable');

                const configLayer = rConfigLayerAll[index];

                var clname = configLayer.cleanname;
                if (clname === undefined) {
                  clname = cleanName(configLayer.name);
                  configLayer.cleanname = clname;
                }
                var childPopup = $('<div class="lizmapPopupChildren ' + clname + '" data-layername="' + clname + '" data-title="' + configLayer.title + '">' + popupChildData + '</div>');

                //Manage if the user choose to create a table for children
                if (['qgis', 'form'].indexOf(configLayer.popupSource) !== -1 &&
                  childPopup.find('.lizmap_merged').length != 0) {
                  // save inputs
                  childPopup.find(".lizmapPopupDiv").each(function (i, e) {
                    var popupDiv = $(e);
                    if (popupDiv.find(".lizmapPopupHeader").prop("tagName") == 'TR') {
                      popupDiv.find(".lizmapPopupHeader").prepend("<th></th>");
                      popupDiv.find(".lizmapPopupHeader").next().prepend("<td></td>");
                    } else {
                      popupDiv.find(".lizmapPopupHeader").next().prepend("<span></span>");
                    }
                    popupDiv.find(".lizmapPopupHeader").next().children().first().append(popupDiv.find("input"));
                  });

                  childPopup.find("h4").each(function (i, e) {
                    if (i != 0)
                      $(e).remove();
                  });

                  childPopup.find(".lizmapPopupHeader").each(function (i, e) {
                    if (i != 0)
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

                var oldPopupChild = parentDiv.find('div.lizmapPopupChildren.' + clname);
                if (oldPopupChild.length != 0){
                  oldPopupChild.remove();
                }

                parentDiv.append(childPopup);

                childPopupElements.push(childPopup);

                // Trigger event for single popup children
                lizMap.events.triggerEvent(
                  "lizmappopupchildrendisplayed",
                  { 'html': childPopup.html() }
                );
              }
            }
            // Trigger event for all popup children
            lizMap.events.triggerEvent(
              "lizmappopupallchildrendisplayed",
              {
                parentPopupElement: self.parents('.lizmapPopupSingleFeature'),
                childPopupElements: childPopupElements
              }
            );
          });
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
                  clearDrawLayer('locatelayer');
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
            handlerOptions: {
              click: {
                pixelTolerance: 10
              }
            },
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
                            clearDrawLayer('locatelayer');
                            return false;
                          }
                      );
                      popup.panMapIfOutOfView = true;
                      map.addPopup(popup);

                      // Activate Boostrap 2 tabs here as they are not
                      // automatically activated when created in popup anchored
                      $('#' + popupContainerId + ' a[data-toggle="tab"]').on( 'click',function (e) {
                        e.preventDefault();
                        $(this).tab('show');
                      });

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
    var printInProjectProjection = true;
    if ('printInProjectProjection' in lizMap.config.options && lizMap.config.options.printInProjectProjection != 'True') {
      printInProjectProjection = false;
    }
    if (printInProjectProjection
      && lizMap.config.options.qgisProjectProjection.ref != lizMap.config.options.projection.ref
    ) {
      // If we change the projection, we need to increase a little bit the size of the rectangle
      var qgis_dpi = 96;
      w = w * qgis_dpi / 72;
      h = h * qgis_dpi / 72;
    }
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
    var printInProjectProjection = true;
    if ('printInProjectProjection' in lizMap.config.options && lizMap.config.options.printInProjectProjection != 'True') {
      printInProjectProjection = false;
    }
    if (printInProjectProjection
      && lizMap.config.options.qgisProjectProjection.ref != lizMap.config.options.projection.ref
    ) {
      // If we change the projection, we need to increase a little bit the size of the rectangle
      var qgis_dpi = 96;
      w = w * qgis_dpi / 72;
      h = h * qgis_dpi / 72;
    }

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
        "deactivate": function() {
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
      // Clone it to fix transform
      var extent = new OpenLayers.Bounds(
          dragCtrl.layer.features[0].geometry.getBounds().toArray()
      );

      // Projection code and reverseAxisOrder
      var projCode = map.projection.getCode();
      var project_projection = null;
      // We print the map in the QGIS project projection, not in the web map projection
      // This allow to avoid error of wrong scales when using external baselayers in EPSG:3857
      // and the project in for example in Lambert 93
      // Caveat: the map printed does not exactly matches the drawn rectangle
      var printInProjectProjection = true;
      if ('printInProjectProjection' in lizMap.config.options && lizMap.config.options.printInProjectProjection != 'True') {
        printInProjectProjection = false;
      }
      if (printInProjectProjection
        && lizMap.config.options.qgisProjectProjection.ref != lizMap.config.options.projection.ref
      ) {
        // If we print in the QGIS project projection
        var project_proj = config.options.qgisProjectProjection;
        if (!(project_proj.ref in Proj4js.defs)) {
          Proj4js.defs[project_proj.ref]=project_proj.proj4;
        }
        project_projection = new OpenLayers.Projection(project_proj.ref);
        projCode = project_projection.getCode();

        // Reproject extent
        extent.transform(map.projection, project_projection);
      }

      var reverseAxisOrder = (OpenLayers.Projection.defaults[projCode] && OpenLayers.Projection.defaults[projCode].yx);

      // Build URL
      var url = OpenLayers.Util.urlAppend(lizUrls.wms
          ,OpenLayers.Util.getParameterString(lizUrls.params)
          );
      let printParams = {};
      printParams['SERVICE'] = 'WMS';
      printParams['VERSION'] = '1.3.0';
      printParams['REQUEST'] = 'GetPrint';
      printParams['FORMAT'] = document.querySelector('#print-format').value;
      printParams['EXCEPTIONS'] = 'application/vnd.ogc.se_inimage';
      printParams['TRANSPARENT'] = 'true';
      printParams['SRS'] = projCode;
      printParams['DPI'] = document.querySelector('#print-dpi').value;
      printParams['TEMPLATE'] = pTemplate.title;
      printParams[dragCtrl.layout.mapId + ':extent'] = extent.toBBOX(null, reverseAxisOrder);
      printParams[dragCtrl.layout.mapId + ':scale'] = document.querySelector('#print-scale').value;

      if ( 'grid' in dragCtrl.layout && dragCtrl.layout.grid ) {
        var gridInterval = getPrintGridInterval( dragCtrl.layout, parseFloat(scale), printCapabilities.scales );
        printParams[dragCtrl.layout.mapId + ':grid_interval_x='] = gridInterval;
        printParams[dragCtrl.layout.mapId + ':grid_interval_y='] = gridInterval;
      }

      var printLayers = [];
      var styleLayers = [];
      var opacityLayers = [];
      $.each(map.layers, function(i, l) {
        if ( (l instanceof OpenLayers.Layer.WMS) || (l instanceof OpenLayers.Layer.WMTS) ){
            if( l.getVisibility() && ('params' in l) && ('LAYERS' in l.params)) {
              // Get config
              var qgisName = null;
              if ( l.name in cleanNameMap )
                  qgisName = getLayerNameByCleanName(l.name);
              var configLayer = null;
              if ( qgisName )
                  configLayer = config.layers[qgisName];
              if ( !configLayer )
                  configLayer = config.layers[l.params['LAYERS']];
              if ( !configLayer )
                  configLayer = config.layers[l.name];

              // If the layer has no config it is not a QGIS layer
              if ( !configLayer )
                return;

              // If the layer has no id it is not a QGIS layer or group
              if (!('id' in configLayer))
                return;

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

              // Get qgis layer opacity
              if ( configLayer && ('opacity' in configLayer) )
                opacityLayers.push(parseInt(255*l.opacity*configLayer.opacity));
              else
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

      printParams[dragCtrl.layout.mapId + ':LAYERS'] = printLayers.join(',');
      printParams[dragCtrl.layout.mapId + ':STYLES'] = styleLayers.join(',');

      if ( dragCtrl.layout.overviewId != null
          && config.options.hasOverview ) {
        var bbox = config.options.bbox;
        var oExtent = new OpenLayers.Bounds(Number(bbox[0]),Number(bbox[1]),Number(bbox[2]),Number(bbox[3]));
        if (printInProjectProjection
          && lizMap.config.options.qgisProjectProjection.ref != lizMap.config.options.projection.ref
        ) {
          // If we print in the QGIS project projection
          oExtent.transform(map.projection, project_projection);
        }
        printParams[dragCtrl.layout.overviewId + ':extent'] = oExtent;
        printParams[dragCtrl.layout.overviewId + ':LAYERS'] = 'Overview';

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
      printParams['LAYERS'] = printLayers.join(',');
      printParams['STYLES'] = styleLayers.join(',');
      printParams['OPACITIES'] = opacityLayers.join(',');

      const customPrintLabels = document.querySelectorAll('#print .print-labels .print-label');
      if (customPrintLabels){
        for (const label of customPrintLabels) {
          printParams[label.name] = label.value;
        }
      }

      var filter = [];
      var selection = [];
      for ( var  lName in config.layers ) {
          var lConfig = config.layers[lName];
          var requestParams = lConfig['request_params'];
          if ( !('request_params' in lConfig)
            || requestParams == null )
              continue;
            if ( ('filtertoken' in requestParams)
            && requestParams['filtertoken'] != null
            && requestParams['filtertoken'] != "" ) {
              filter.push( requestParams['filtertoken'] );
          }
          if ( ('selectiontoken' in requestParams)
            && requestParams['selectiontoken'] != null
            && requestParams['selectiontoken'] != "" ) {
              selection.push( requestParams['selectiontoken'] );
          }
      }
      if ( filter.length !=0 ){
        printParams['FILTERTOKEN'] = filter.join(';');
      }
      if ( selection.length !=0 ){
        printParams['SELECTIONTOKEN'] = selection.join(';');
      }

      // if user has made a visible draw, print it with redlining
      const formatWKT = new OpenLayers.Format.WKT();
      const highlightGeom = [];
      const highlightSymbol = [];
      if (lizMap.mainLizmap.digitizing.featureDrawn && lizMap.mainLizmap.digitizing.featureDrawnVisibility){
        for (let index = 0; index < lizMap.mainLizmap.digitizing.featureDrawn.length; index++) {
          var draw_feature = lizMap.mainLizmap.digitizing.featureDrawn[index];
          if (printInProjectProjection
            && lizMap.config.options.qgisProjectProjection.ref != lizMap.config.options.projection.ref
          ) {
            // If we print in the QGIS project projection
            draw_feature.geometry.transform(map.projection, project_projection);
          }
          highlightGeom.push(formatWKT.write(draw_feature));
          highlightSymbol.push(lizMap.mainLizmap.digitizing.getFeatureDrawnSLD(index));

        }
      }

      if (highlightGeom.length > 0) {
        printParams[dragCtrl.layout.mapId+':HIGHLIGHT_GEOM'] = highlightGeom.join(';');
        printParams[dragCtrl.layout.mapId+':HIGHLIGHT_SYMBOL'] = highlightSymbol.join(';');
      }

      // Display spinner and message while waiting for print
      const printLaunch = document.getElementById('print-launch');
      printLaunch.disabled = true;
      printLaunch.classList.add('spinner');

      $("#message .print a").click();
      mAddMessage(lizDict['print.started'], 'info', true).addClass('print-in-progress');

      downloadFile(url, printParams, () => {
        const printLaunch = document.getElementById('print-launch');
        printLaunch.disabled = false;
        printLaunch.classList.remove('spinner');

        $("#message .print-in-progress a").click();
      });

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

    for (const featureType of featureTypes) {
      var typeName = featureType.getElementsByTagName('Name')[0].textContent;
      var lname = lizMap.getNameByTypeName( typeName );
        if ( !lname ) {
            if (typeName in config.locateByLayer)
                lname = typeName
            else if ( (typeName in shortNameMap) && (shortNameMap[typeName] in config.locateByLayer))
                lname = shortNameMap[typeName];
            else {
                for (var ttl in config.tooltipLayers) {
                    if (ttl.split(' ').join('_') == typeName) {
                        lname = ttl;
                        break;
                    }
                }
            }
        }

        if ( !(lname in config.tooltipLayers) )
            continue;

        if ( (lname in config.tooltipLayers) && (lname in config.layers) ) {
            var lConfig = config.layers[lname];
            tooltipLayersSorted[config.tooltipLayers[lname].order] = '<option value="'+lname+'">'+lConfig.title+'</option>';
        }
    }

    // Display layers order as declared in plugin
    for (var i = 0; i < tooltipLayersSorted.length; i++) {
      $('#tooltip-layer-list').append(tooltipLayersSorted[i]);
    }

    if ( $('#tooltip-layer-list').find('option').length == 1 ) {
      $('#button-tooltip-layer').parent().remove();
      return false;
    }

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
    tooltipControl.addInfoPopup = function(feature) {
        var lname = $('#tooltip-layer-list').val();//feature.layer.name.split("@")[1];
        var lconfig = lizMap.config.layers[lname];
        if( !(lname in lizMap.config.layers) )
          return;
        var tconfig = lizMap.config.tooltipLayers[lname];
        var tf = tconfig['fields'].trim();
        var tooltipFields = tf.split(/[\s,]+/);
        var hiddenFields = [];
        if ( 'attributeLayers' in lizMap.config
            && lname in lizMap.config.attributeLayers
            && 'hiddenFields' in lizMap.config.attributeLayers[lname]) {
            var hf = lizMap.config.attributeLayers[lname]['hiddenFields'].trim();
            hiddenFields = hf.split(/[\s,]+/);
        }
        var cAliases = lconfig['alias'];
        var html = '<div id="tooltipPopupContent">';
        html+= '<table class="lizmapPopupTable">';
        for (var a in feature.attributes){
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
                  ignoreExtraDims: true,
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
              if (tfeatures.length != 0 && tfeatures[0].geometry && tfeatures[0].geometry.id.startsWith('OpenLayers_Geometry_LineString') )
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
            // Load layer automatically when there is only one
            if (e.id == 'tooltip-layer' && $("#tooltip-layer-list option").length === 2) {
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
      ),
      angle: new OpenLayers.Control.Measure(
        OpenLayers.Handler.Path, {
        id: 'angleMeasure',
        persist: true,
        geodesic: true,
        immediate: true,
        handlerOptions: {
          maxVertices: 3,
          layerOptions: {
            styleMap: styleMap
          }
        },
        type: OpenLayers.Control.TYPE_TOOL
        }
      )
    };
    measureControls.length.events.on({
      activate: function() {
        mAddMessage(lizDict['measure.activate.length'],'info',true).attr('id','lizmap-measure-message');
      },
      deactivate: function() {
        $('#lizmap-measure-message').remove();
      }
    });
    measureControls.area.events.on({
      activate: function() {
        mAddMessage(lizDict['measure.activate.area'],'info',true).attr('id','lizmap-measure-message');
      },
      deactivate: function() {
        $('#lizmap-measure-message').remove();
      }
    });
    measureControls.perimeter.events.on({
      activate: function () {
        mAddMessage(lizDict['measure.activate.perimeter'], 'info', true).attr('id', 'lizmap-measure-message');
      },
      deactivate: function () {
        $('#lizmap-measure-message').remove();
      }
    });
    measureControls.angle.events.on({
      activate: function () {
        mAddMessage(lizDict['measure.activate.angle'], 'info', true).attr('id', 'lizmap-measure-message');
      },
      deactivate: function () {
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

    function handleMeasurements(evt) {
      var units = evt.units;
      var order = evt.order;
      var measure = evt.measure;
      var out = "";

      // Angle
      if (evt.object.id === "angleMeasure") {

        out = lizDict['measure.handle'] + " 0°";

        // Three points are needed to measure an angle
        if (evt.geometry.components.length === 3){
          // Invert first and second points and use a flag to make this change occurs once until next measurement
          if(evt.object.invert === undefined){
            const firstComponent = evt.geometry.components[0].clone();
            const secondComponent = evt.geometry.components[1].clone();
            evt.geometry.components[0].move(secondComponent.x - firstComponent.x, secondComponent.y - firstComponent.y);
            evt.geometry.components[1].move(firstComponent.x - secondComponent.x, firstComponent.y - secondComponent.y);

            evt.object.invert = true;
          } else if (evt.type === "measure"){
            evt.object.invert = undefined;
          }

          // Display angle ABC between three points. B is center
          const A = evt.geometry.components[0];
          const B = evt.geometry.components[1];
          const C = evt.geometry.components[2];

          const AB = Math.sqrt(Math.pow(B.x - A.x, 2) + Math.pow(B.y - A.y, 2));
          const BC = Math.sqrt(Math.pow(B.x - C.x, 2) + Math.pow(B.y - C.y, 2));
          const AC = Math.sqrt(Math.pow(C.x - A.x, 2) + Math.pow(C.y - A.y, 2));
          let angleInDegrees = (Math.acos((BC * BC + AB * AB - AC * AC) / (2 * BC * AB)) * 180) / Math.PI;

          if (isNaN(angleInDegrees)) {
            angleInDegrees = 0;
          }

          out = lizDict['measure.handle'] + " " + angleInDegrees.toFixed(2) + "°";
        }
        // Other measurement tools
      }else{
        if (order == 1) {
          out += lizDict['measure.handle'] + " " + measure.toFixed(3) + " " + units;
        } else {
          out += lizDict['measure.handle'] + " " + measure.toFixed(3) + " " + units + "<sup>2</" + "sup>";
        }
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
        "measurepartial": handleMeasurements
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
    capabilities = format.read(aData);

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
   * PRIVATE function: downloadFile
   * Send an ajax POST request to download a file
   *
   * @param {String} url
   * @param {Array} parameters
   * @param {Function} callback optionnal callback executed when download ends
   *
   */
   function downloadFile( url, parameters, callback ) {
      var xhr = new XMLHttpRequest();
      xhr.open('POST', url, true);
      xhr.responseType = 'arraybuffer';
      xhr.onload = function () {
          if (this.status === 200) {
              var filename = "";
              var disposition = xhr.getResponseHeader('Content-Disposition');
              if (disposition && disposition.indexOf('attachment') !== -1) {
                  var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
                  var matches = filenameRegex.exec(disposition);
                  if (matches != null && matches[1]) filename = matches[1].replace(/['"]/g, '');
              }

              let type = xhr.getResponseHeader('Content-Type');

              // Firefox >= 98 opens blob in its pdf viewer
              // This is a hack to force download as in Chrome
              if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1 && type == 'application/pdf'){
                type = 'application/octet-stream';
              }
              const blob = new File([this.response], filename, { type: type });
              const downloadUrl = URL.createObjectURL(blob);

              if (filename) {
                // use HTML5 a[download] attribute to specify filename
                const a = document.createElement('a');
                a.href = downloadUrl;
                a.download = filename;
                a.dispatchEvent(new MouseEvent('click'));
              } else {
                window.open(downloadUrl);
              }

              setTimeout(() => URL.revokeObjectURL(downloadUrl), 100); // cleanup
          }

          // Note 31/01/2022
          // REMOVE WHEN THE QGIS SERVER BUG HAS BEEN FIXED
          // Related PR for QGIS Master https://github.com/qgis/QGIS/pull/47051
          // It should be fixed for 3.24.1 and 3.22.5
          if (this.status == 400) {
            // Check for parenthesis inside the layer name
            // There is a bug to be fixed in QGIS Server WFS request for this context
            var typeName = parameters['TYPENAME'];
            const parenthesis_regex = /[\(\)]/g;
            const has_parenthesis = typeName.match(parenthesis_regex);
            if (has_parenthesis) {
              var error_message = 'The selected features cannot be exported due to a known bug in QGIS Server.';
              error_message += '<br/>Please ask the map editor to remove the parenthesis in the layer name.';
            } else {
              var error_message = lizDict['layer.export.unknown.export.error'];
            };

            mAddMessage(error_message, 'error', true);
            return false;
          }
          // Execute callback if any
          if (typeof callback === 'function'){
            callback();
          }
      };
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send($.param(parameters, true));
   }

  /**
   * PRIVATE function: exportVectorLayer
   *
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

      if (!selectionLayer) {
        selectionLayer = aName;
      }

      // Get the layer Lizmap configuration
      var config_layer = lizMap.config.layers[selectionLayer];

      // Check if the layer is spatial
      const is_spatial = (
        config_layer['geometryType'] && config_layer['geometryType'] != 'none' && config_layer != 'unknown'
      ) ? true : false;

      // Check if there is a selection token
      const has_selection_token = (
        'request_params' in config_layer && 'selectiontoken' in config_layer['request_params']
        && config_layer['request_params']['selectiontoken'] != null
        && config_layer['request_params']['selectiontoken'] != ''
      ) ? true : false;

      // Check for parenthesis inside the layer name
      // There is a bug to be fixed in QGIS Server WFS request for this context
      const parenthesis_regex = /[\(\)]/g;
      const has_parenthesis = selectionLayer.match(parenthesis_regex);

      // If there is a selection, use the selectiontoken,
      // not a list of features ids to avoid to have too big urls
      // There is some cases when we do not want to use the selection token
      // * Layers with no selection token
      // * Layers with parenthesis inside the layer name (Bug to be fixed in QGIS Server WFS request)
      // * Layers with no geometry, because there is no request_params (as it is only for Openlayers layers)
      if (is_spatial && has_selection_token && !has_parenthesis) {
        // Get the WFS URL with no filter
        var getFeatureUrlData = getVectorLayerWfsUrl( aName, null, null, null, restrictToMapExtent );
        // Add the SELECTIONTOKEN parameter
        var selection_token = config_layer['request_params']['selectiontoken'];
        getFeatureUrlData['options']['SELECTIONTOKEN'] = selection_token;
      } else {
        // Get the WFS feature ids
        var featureid = getVectorLayerSelectionFeatureIdsString( selectionLayer );
        // Restrict the WFS URL for these IDS
        var getFeatureUrlData = getVectorLayerWfsUrl( aName, null, featureid, null, restrictToMapExtent );
      }

      // Force download
      getFeatureUrlData['options']['dl'] = 1;

      // Set export format
      getFeatureUrlData['options']['OUTPUTFORMAT'] = eformat;

      // Download file
      downloadFile(getFeatureUrlData['url'], getFeatureUrlData['options']);

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
            callback(callbacksData.layerName, callbacksData.filter, features, callbacksData.alias, callbacksData.types);
          }
      });
  }

  function getFeatureData(aName, aFilter, aFeatureID, aGeometryName, restrictToMapExtent, startIndex, maxFeatures, aCallBack) {
      // Set function parameters if not given
      aFilter = typeof aFilter !== 'undefined' ?  aFilter : null;
      aFeatureID = typeof aFeatureID !== 'undefined' ? aFeatureID : null;
      aGeometryName = typeof aGeometryName !== 'undefined' ? aGeometryName : null;
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
          alias: aConfig['alias'],
          types: aConfig['types']
      };

      $.post( getFeatureUrlData['url'], getFeatureUrlData['options'], function(data) {

          aConfig['featureCrs'] = 'EPSG:4326';

          if (aConfig?.['alias'] && aConfig?.['types']) {
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
                  aConfig['types'] = describe.types;

                  callFeatureDataCallBacks(poolId, data.features);

                  $('body').css('cursor', 'auto');

              },'json');
           }

      },'json');

      return true;
  }

  function zoomToOlFeature( feature, proj, zoomAction ){
      zoomAction = typeof zoomAction !== 'undefined' ?  zoomAction : 'zoom';
      var format = new OpenLayers.Format.GeoJSON({
          ignoreExtraDims: true
      });
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
      if ( wfsCapabilities == null ){
        return [];
      }
      return wfsCapabilities.getElementsByTagName('FeatureType');
  }

  function getVectorLayerResultFormat() {
    let formats = [];
    if ( wfsCapabilities == null ){
      return formats;
    }else{
      for (const format of wfsCapabilities.getElementsByTagName('ResultFormat')[0].children) {
        formats.push(format.tagName);
      }
      return formats;
    }
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
      // Atlas config with one layer (legacy)
      if( !pkey && 'atlasLayer' in lizMap.config.options && 'atlasPrimaryKey' in lizMap.config.options ){
        var layerConfig = lizMap.config.layers[qgisName];
        if( layerConfig.id == lizMap.config.options['atlasLayer'] && lizMap.config.options['atlasPrimaryKey'] != '' ){
          pkey = lizMap.config.options['atlasPrimaryKey'];
        }
      }

      // Atlas config with several layers (LWC >= 3.4)
      if (!pkey && 'atlas' in lizMap.config && 'layers' in lizMap.config.atlas && Array.isArray(lizMap.config.atlas['layers']) && lizMap.config.atlas['layers'].length > 0) {
        const layerConfig = lizMap.config.layers[qgisName];
        for (let index = 0; index < lizMap.config.atlas.layers.length; index++) {
          const layer = lizMap.config.atlas.layers[index];
          if (layerConfig.id === layer.layer){
            pkey = layer.primaryKey;
            break;
          }
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


  function selectLayerFeaturesFromSelectionFeature(targetFeatureType, selectionFeature, geomOperator = 'intersects'){

      var lConfig = config.layers[targetFeatureType];
      lizMap.loadProjDefinition( lConfig.crs, function( aProj ) {

          var gml3 = new OpenLayers.Format.GML.v3(
              {
                  internalProjection: lizMap.map.getProjection(),
                  externalProjection: aProj,
                  srsName: aProj
              }
          );
          var gml = gml3.writeNode(
              'feature:_geometry',
              selectionFeature.geometry
          );
        var spatialFilter = geomOperator+"($geometry, geom_from_gml('" ;
          spatialFilter+= OpenLayers.Format.XML.prototype.write.apply(
              gml3,
              gml.children
          );
          spatialFilter+= "'))";

          if( 'request_params' in lConfig && 'filter' in lConfig['request_params'] ){
              var rFilter = lConfig['request_params']['filter'];
              if( rFilter ){
                  rFilter = rFilter.replace( targetFeatureType + ':', '');
                  spatialFilter = rFilter +' AND '+ spatialFilter;
              }
          }
          if( 'request_params' in lConfig && 'exp_filter' in lConfig['request_params'] ){
              // Add exp_filter, for example if set by another tool( filter module )
              // Often 'filter' is not set because filtertoken is set instead
              // But in this case, exp_filter must also been set and must be added
              var eFilter = lConfig['request_params']['exp_filter'];
              if( eFilter ){
                  spatialFilter = eFilter +' AND '+ spatialFilter;
              }
          }
          var limitDataToBbox = false;
          if ( 'limitDataToBbox' in config.options && config.options.limitDataToBbox == 'True'){
              limitDataToBbox = true;
          }
          var getFeatureUrlData = lizMap.getVectorLayerWfsUrl( targetFeatureType, spatialFilter, null, null, limitDataToBbox );

          // add BBox to restrict to geom bbox but not with some geometry operator
          if (geomOperator !== 'disjoint'){
            var geomBounds = selectionFeature.geometry.clone().transform(lizMap.map.getProjection(), aProj).getBounds();
            getFeatureUrlData['options']['BBOX'] = geomBounds.toBBOX();
          }

          // get features
          $.post( getFeatureUrlData['url'], getFeatureUrlData['options'], function(result) {
                  var gFormat = new OpenLayers.Format.GeoJSON({
                      ignoreExtraDims: true,
                      externalProjection: lConfig.crs,
                      internalProjection: lizMap.map.getProjection()
                  });
                  var tfeatures = gFormat.read( result );
                  var sfIds = $.map(tfeatures, function(feat){
                      return feat.fid.split('.')[1];
                  });

                  if (lizMap.mainLizmap.selectionTool.newAddRemoveSelected === 'add' ) {
                      sfIds = config.layers[targetFeatureType]['selectedFeatures'].concat(sfIds);
                      for(var i=0; i<sfIds.length; ++i) {
                          for(var j=i+1; j<sfIds.length; ++j) {
                              if(sfIds[i] === sfIds[j])
                                  sfIds.splice(j--, 1);
                          }
                      }
                  } else if (lizMap.mainLizmap.selectionTool.newAddRemoveSelected === 'remove' ) {
                      var asfIds = config.layers[targetFeatureType]['selectedFeatures'].concat([]);
                      for(var i=0; i<sfIds.length; ++i) {
                          var asfIdIdx = asfIds.indexOf( sfIds[i] );
                          if( asfIdIdx != -1 )
                              asfIds.splice(asfIdIdx, 1);
                      }
                      sfIds = asfIds;
                  }
                  config.layers[targetFeatureType]['selectedFeatures'] = sfIds;
                  lizMap.events.triggerEvent("layerSelectionChanged",
                      {
                          'featureType': targetFeatureType,
                          'featureIds': config.layers[targetFeatureType]['selectedFeatures'],
                          'updateDrawing': true
                      }
                  );
          });
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
      dockli += '       <span class="icon"><i class="' + dicon + ' icon-white"></i></span><span class="menu-title">' + dname +'</span>';
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
          docktab+='<div class="mini-dock-close" title="' + lizDict['toolbar.content.stop'] + '" style="padding:7px;float:right;cursor:pointer;"><i class="icon-remove icon-white"></i></div>';
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

  function deactivateMaplayerFilter (layername) {
    var layerN = layername;
    var layer = null;
    var layers = map.getLayersByName( cleanName(layername) );
    if( layers.length == 1) {
      layer = layers[0];
    }

    // Remove layer filter
    delete layer.params['FILTER'];
    delete layer.params['FILTERTOKEN'];
    delete layer.params['EXP_FILTER'];
    if( !('request_params' in config.layers[layername]) ){
      config.layers[layername]['request_params'] = {};
    }
    config.layers[layername]['request_params']['exp_filter'] = null;
    config.layers[layername]['request_params']['filtertoken'] = null;
    config.layers[layername]['request_params']['filter'] = null;
    layer.redraw();
  }

  function triggerLayerFilter (layername, filter) {
      // Get layer information
      var layerN = layername;
      var layer = null;
      var layers = map.getLayersByName( cleanName(layername) );
      if( layers.length == 1) {
        layer = layers[0];
      }
      if(!layer)
          return false;
      if( layer.params) {
        layerN = layer.params['LAYERS'];
      }

      // Add filter to the layer
      if( !filter || filter == ''){
        filter = null;
        var lfilter = null;

      }else{
        var lfilter = layerN + ':' + filter;
      }
      layer.params['FILTER'] = lfilter;
      if( !('request_params' in config.layers[layername]) ){
        config.layers[layername]['request_params'] = {};
      }

      // Add WFS exp_filter param
      config.layers[layername]['request_params']['exp_filter'] = filter;

      // Get WMS filter token ( used via GET in GetMap or GetPrint )
      var surl = OpenLayers.Util.urlAppend(lizUrls.wms
        ,OpenLayers.Util.getParameterString(lizUrls.params)
      );
      var sdata = {
        service: 'WMS',
        request: 'GETFILTERTOKEN',
        typename: layername,
        filter: lfilter
      };
      $.post(surl, sdata, function(result){
        var filtertoken = result.token;
        // Add OpenLayers layer parameter
        delete layer.params['FILTER'];
        layer.params['FILTERTOKEN'] = filtertoken
        config.layers[layername]['request_params']['filtertoken'] = filtertoken;

        // Redraw openlayers layer
        if( config.layers[layername]['geometryType']
          && config.layers[layername]['geometryType'] != 'none'
          && config.layers[layername]['geometryType'] != 'unknown'
        ){
            //layer.redraw(true);
          layer.redraw();
        }

        // Tell popup to be aware of the filter
        lizMap.events.triggerEvent("layerFilterParamChanged",
          {
            'featureType': layername,
            'filter': lfilter,
            'updateDrawing': false
          }
        );
      });

      return true;
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
     * Method: getLizmapDesktopPluginMetadata
     */
     getLizmapDesktopPluginMetadata: function() {
      return getLizmapDesktopPluginMetadata();
    },

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
     * Method: addMessage
     */
    addMessage: function( aMessage, aType, aClose ) {
      return mAddMessage( aMessage, aType, aClose );
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
     * Method: clearDrawLayer
     */
    clearDrawLayer: function(layerName) {
      return clearDrawLayer(layerName);
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


    launchEdition: function() {
        return false;
    },

    deleteEditionFeature: function(){
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
     * @returns {Array} Array of FeatureType Elements
     */
    getVectorLayerFeatureTypes: function() {
      return getVectorLayerFeatureTypes();
    },

    /**
     * Method: getVectorLayerResultFormat
     * @returns {string[]} Array of format for file export
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
     * Method: selectLayerFeaturesFromSelectionFeature
     */
    selectLayerFeaturesFromSelectionFeature: function (targetFeatureType, selectionFeature, geomOperator = 'intersects') {
      return selectLayerFeaturesFromSelectionFeature(targetFeatureType, selectionFeature, geomOperator);
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
     * Method: getHashParamFromUrl
     * Utility function to get searched key in URL's hash
     * @param {string} hash_key - searched key in hash
     * @return {string} value for searched key
     * @example
     * URL: https://liz.map/index.php/view/map/?repository=demo&project=cats#fid:v_cat20180426181713938.16,other_param:foo
     * console.log(getHashParamFromUrl('fid'))
     * returns 'v_cat20180426181713938.16'
     */
    getHashParamFromUrl: function (hash_key) {
      var ret_val = null;
      var hash = location.hash.replace('#', '');
      var hash_items = hash.split(',');
      for (var i in hash_items) {
        var item = hash_items[i];
        var param = item.split(':');
        if (param.length == 2) {
          var key = param[0];
          var val = param[1];
          if (key == hash_key) {
            return val;
          }
        }
      }
      return ret_val;
    },


    /**
     * Apply the global filter on a OpenLayer layer
     * Only used by filter.js and timemanager.js
     */
    triggerLayerFilter: function (layername, filter) {
      return triggerLayerFilter(layername, filter);
    },

    /**
     * Deactivate the global filter on a OpenLayer layer
     * Only used by filter.js and timemanager.js
     */
    deactivateMaplayerFilter: function (layername) {
      // Get layer information
      return deactivateMaplayerFilter(layername);
    },



    /**
     * Method: init
     */
    init: function() {
      var self = this;

      var service = OpenLayers.Util.urlAppend(lizUrls.wms
        , OpenLayers.Util.getParameterString(lizUrls.params)
      );

      // Get config
      const configRequest = fetch(OpenLayers.Util.urlAppend(lizUrls.config, OpenLayers.Util.getParameterString(lizUrls.params))).then(function (response) {
        return response.json()
      });

      // Get key/value config
      const keyValueConfigRequest = fetch(OpenLayers.Util.urlAppend(lizUrls.keyValueConfig, OpenLayers.Util.getParameterString(lizUrls.params))).then(function (response) {
        return response.json()
      });

      // Get WMS, WMTS, WFS capabilities
      const WMSRequest = fetch(OpenLayers.Util.urlAppend(service, OpenLayers.Util.getParameterString({ SERVICE: 'WMS', REQUEST: 'GetCapabilities', VERSION: '1.3.0' }))).then(function (response) {
        return response.text()
      });
      const WMTSRequest = fetch(OpenLayers.Util.urlAppend(service, OpenLayers.Util.getParameterString({ SERVICE: 'WMTS', REQUEST: 'GetCapabilities', VERSION: '1.0.0' }))).then(function (response) {
        return response.text()
      });
      const WFSRequest = fetch(OpenLayers.Util.urlAppend(service, OpenLayers.Util.getParameterString({ SERVICE: 'WFS', REQUEST: 'GetCapabilities', VERSION: '1.0.0' }))).then(function (response) {
        return response.text()
      });

      // Request config and capabilities in parallel
      Promise.all([configRequest, keyValueConfigRequest, WMSRequest, WMTSRequest, WFSRequest]).then(responses => {
        // config is defined globally
        config = responses[0];
        keyValueConfig = responses[1];

        const domparser = new DOMParser();

        const wmsCapaData = responses[2];
        const wmtsCapaData = responses[3];
        const wfsCapaData = responses[4];

        config.options.hasOverview = false;

        // store layerIDs
        if ('useLayerIDs' in config.options && config.options.useLayerIDs == 'True') {
          for (var layerName in config.layers) {
            var configLayer = config.layers[layerName];
            layerIdMap[configLayer.id] = layerName;
          }
        }
        // store shortnames and shortnames
        for (var layerName in config.layers) {
          var configLayer = config.layers[layerName];
          if ('shortname' in configLayer && configLayer.shortname != '')
            shortNameMap[configLayer.shortname] = layerName;
          configLayer.cleanname = cleanName(layerName);
        }

        //parse capabilities
        if (!parseData(wmsCapaData))
          return true;

        var wmtsFormat = new OpenLayers.Format.WMTSCapabilities({});
        wmtsCapabilities = wmtsFormat.read(wmtsCapaData);
        if ('exceptionReport' in wmtsCapabilities) {
          var wmtsElem = $('#metadata-wmts-getcapabilities-url');
          if (wmtsElem.length != 0) {
            wmtsElem.before('<i title="' + wmtsCapabilities.exceptionReport.exceptions[0].texts[0] + '" class="icon-warning-sign"></i>&nbsp;');
          }
          wmtsCapabilities = null;
        }

        wfsCapabilities = domparser.parseFromString(wfsCapaData, "application/xml");
        var featureTypes = getVectorLayerFeatureTypes();

        for (const featureType of featureTypes) {
          var typeName = featureType.getElementsByTagName('Name')[0].textContent;
          var layerName = lizMap.getNameByTypeName(typeName);
          if (!layerName) {
            if (typeName in config.layers)
              layerName = typeName
            else if ((typeName in shortNameMap) && (shortNameMap[typeName] in config.layers))
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

          if (!(layerName in config.layers))
            continue;

          var configLayer = config.layers[layerName];
          configLayer.typename = typeName;
          typeNameMap[typeName] = layerName;
        }

        //set title and abstract coming from capabilities
        $('#abstract').html(capabilities.abstract ? capabilities.abstract : '');

        // get and analyse tree
        var capability = capabilities.capability;

        // Copy QGIS project's projection
        config.options.qgisProjectProjection = Object.assign({}, config.options.projection);

        // Add the config in self here to be able
        // to let the JS external script modify some plugin cfg layers properties
        // before Lizmap will create the layer tree
        self.config = config;
        self.events.triggerEvent("beforetreecreated", self);
        beforeLayerTreeCreated();

        var firstLayer = capability.nestedLayers[0];
        getLayerTree(firstLayer, tree);
        analyseNode(tree);

        // Re-save the config in self
        self.config = config;
        self.keyValueConfig = keyValueConfig;
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
        var lastLayerZIndex = map.layers[map.layers.length - 1].getZIndex();
        if (lastLayerZIndex > map.Z_INDEX_BASE['Feature'] - 100) {
          map.Z_INDEX_BASE['Feature'] = lastLayerZIndex + 100;
          map.Z_INDEX_BASE['Popup'] = map.Z_INDEX_BASE['Feature'] + 25;
          if (map.Z_INDEX_BASE['Popup'] > map.Z_INDEX_BASE['Control'] - 25)
            map.Z_INDEX_BASE['Control'] = map.Z_INDEX_BASE['Popup'] + 25;
        }

        // initialize the map
        // Set map extent depending on options
        var verifyingVisibility = true;
        var hrefParam = OpenLayers.Util.getParameters(window.location.href);
        if (!map.getCenter()) {
          if (hrefParam.bbox || hrefParam.BBOX) {
            var hrefBbox = null;
            if (hrefParam.bbox)
              hrefBbox = OpenLayers.Bounds.fromArray(hrefParam.bbox);
            if (hrefParam.BBOX)
              hrefBbox = OpenLayers.Bounds.fromArray(hrefParam.BBOX);

            if (hrefParam.crs && hrefParam.crs != map.getProjection())
              hrefBbox.transform(hrefParam.crs, map.getProjection())
            if (hrefParam.CRS && hrefParam.CRS != map.getProjection())
              hrefBbox.transform(hrefParam.CRS, map.getProjection())
            if (map.restrictedExtent.containsBounds(hrefBbox))
              map.zoomToExtent(hrefBbox, true);
            else {
              var projBbox = $('#metadata .bbox').text();
              projBbox = OpenLayers.Bounds.fromString(projBbox);
              if (projBbox.containsBounds(hrefBbox)) {
                var projProj = $('#metadata .proj').text();
                loadProjDefinition(projProj, function (aProj) {
                  hrefBbox.transform(aProj, map.getProjection());
                  map.zoomToExtent(hrefBbox, true);
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
        map.events.triggerEvent("zoomend", { "zoomChanged": true });

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
        if ('layers' in uparams) {
          var players = uparams.layers;
          for (var i = 0; i < map.layers.length; i++) {
            var l = map.layers[i];
            var lbase = l.isBaseLayer;
            if (!lbase) {
              if (players[i] == 'T') {
                layersHaveBeenActivatedByPermalink = true;
                l.setVisibility(true);
              }
            }
          }
          runPermalink(uparams);
        }

        // 2/ Toggle checkboxes
        $('#switcher button.checkbox[name="layer"]').each(function () {
          var cb = $(this);
          var cleanName = cb.val();
          var oLayer = map.getLayersByName(cleanName)[0];
          if (oLayer) {
            // toggle checked class for permalink layers
            // because OL has already drawn them in map
            cb.toggleClass('checked', oLayer.visibility);

            // Check layers wich are not yet checked but need to ( for normal behaviour outside permalink )
            // This will trigger layers to be drawn
            if (!cb.hasClass('checked') && oLayer.isVisible && !layersHaveBeenActivatedByPermalink) {
              cb.click();
            }
          }

        });

        // verifying the layer visibility for permalink
        if (verifyingVisibility) {
          map.getControlsByClass('OpenLayers.Control.ArgParser')[0].configureLayers();
          for (var i = 0, len = layers.length; i < len; i++) {
            var l = layers[i];
            var btn = $('#switcher button.checkbox[name="layer"][value="' + l.name + '"]');
            if ((hrefParam.layers && l.getVisibility() != btn.hasClass('checked')))
              $('#switcher button.checkbox[name="layer"][value="' + l.name + '"]').click();
          }
        }

        // checked all toggled layer
        $('#switcher button.checkbox.disabled[name="layer"]:not(.checked)').each(function () {
          var cb = $(this);
          var cleanName = cb.val();
          var name = cleanName;
          if (cleanName in cleanNameMap)
            name = getLayerNameByCleanName(cleanName);
          if (name in config.layers) {
            var layerConfig = config.layers[name];
            if (layerConfig.toggled == "True")
              cb.addClass('checked');
          }
        });

        // finalize slider
        $('#navbar div.slider').slider("value", map.getZoom());
        map.events.on({
          zoomend: function () {
            // Update legends
            $('#switcher table.tree tr.legendGraphics.initialized').each(function () {
              var self = $(this);
              var name = self.attr('id').replace('legend-', '');
              var url = getLayerLegendGraphicUrl(name, true);
              if (url != null && url != '') {
                // Change image attribute data-src
                self.find('div.legendGraphics img').attr('data-src', url);
                // Only change image attribute src if legend is displayed
                if (self.hasClass('visible')) {
                  self.find('div.legendGraphics img').attr('src', url);
                }
              }
            });
            // update slider position
            $('#navbar div.slider').slider("value", this.getZoom());
          }
        });

        // Connect signal/slot when layer style is changed
        lizMap.events.on({
          'layerstylechanged': function (evt) {

            // Change legend data-src and legend src if legend is visible
            var name = evt.featureType;
            var url = getLayerLegendGraphicUrl(name, true);
            if (url != null && url != '') {
              var lSel = '#switcher table.tree tr#legend-' + name + ' div.legendGraphics img';
              $(lSel).attr('data-src', url);
              if ($('#switcher table.tree tr#legend-' + name).hasClass('visible'))
                $(lSel).attr('src', url);
            }
          }
        });

        // Toggle locate
        $('#mapmenu ul').on('click', 'li.nav-minidock > a', function () {
          var self = $(this);
          var parent = self.parent();
          var id = self.attr('href').substr(1);
          var tab = $('#nav-tab-' + id);
          if (parent.hasClass('active')) {
            $('#' + id).removeClass('active');
            tab.removeClass('active');
            parent.removeClass('active');
            lizMap.events.triggerEvent("minidockclosed", { 'id': id });
          } else {
            var oldActive = $('#mapmenu li.nav-minidock.active');
            if (oldActive.length != 0) {
              oldActive.removeClass('active');
              lizMap.events.triggerEvent("minidockclosed", { 'id': oldActive.children('a').first().attr('href').substr(1) });
            }
            tab.children('a').first().click();
            parent.addClass('active');
            lizMap.events.triggerEvent("minidockopened", { 'id': id });
            updateMiniDockSize();
          }
          self.blur();

          return false;
        });

        // Show locate by layer
        if (!('locateByLayer' in config))
          $('#button-locate').parent().hide();
        else
          $('#button-locate').click();

        // hide mini-dock if no tool is active
        if ($('#mapmenu ul li.nav-minidock.active').length == 0) {
          $('#mini-dock-content > .tab-pane.active').removeClass('active');
          $('#mini-dock-tabs li.active').removeClass('active');
        }

        $('#mapmenu ul').on('click', 'li.nav-dock > a', function () {
          var self = $(this);
          var parent = self.parent();
          var id = self.attr('href').substr(1);
          var tab = $('#nav-tab-' + id);
          var lizmapEvent = '';
          if (parent.hasClass('active')) {
            $('#' + id).removeClass('active');
            tab.removeClass('active');
            parent.removeClass('active');
            lizmapEvent = 'dockclosed';
          } else {
            var oldActive = $('#mapmenu li.nav-dock.active');
            if (oldActive.length != 0) {
              oldActive.removeClass('active');
              lizMap.events.triggerEvent("dockclosed", { 'id': oldActive.children('a').first().attr('href').substr(1) });
            }
            tab.show();
            tab.children('a').first().click();
            parent.addClass('active');
            lizmapEvent = 'dockopened';
          }
          self.blur();

          var dock = $('#dock');
          if ($('#dock-tabs .active').length == 0)
            dock.hide();
          else if (!dock.is(':visible'))
            dock.show();

          // trigger event
          if (lizmapEvent != '')
            lizMap.events.triggerEvent(lizmapEvent, { 'id': id });

          return false;
        });

        $('#mapmenu ul').on('click', 'li.nav-right-dock > a', function () {
          var self = $(this);
          var parent = self.parent();
          var id = self.attr('href').substr(1);
          var tab = $('#nav-tab-' + id);
          var lizmapEvent = '';
          if (parent.hasClass('active')) {
            $('#' + id).removeClass('active');
            tab.removeClass('active');
            parent.removeClass('active');
            var lizmapEvent = 'rightdockclosed';
          } else {
            var oldActive = $('#mapmenu li.nav-right-dock.active');
            if (oldActive.length != 0) {
              oldActive.removeClass('active');
              lizMap.events.triggerEvent("rightdockclosed", { 'id': oldActive.children('a').first().attr('href').substr(1) });
            }
            tab.show();
            tab.children('a').first().click();
            parent.addClass('active');
            var lizmapEvent = 'rightdockopened';
          }
          self.blur();

          var dock = $('#right-dock');
          if ($('#right-dock-tabs .active').length == 0) {
            dock.hide();
            $('#content').removeClass('right-dock-visible');
            updateContentSize();
          } else if (!dock.is(':visible')) {
            $('#content').addClass('right-dock-visible');
            dock.show();
            updateContentSize();
          }

          // trigger event
          if (lizmapEvent != '')
            lizMap.events.triggerEvent(lizmapEvent, { 'id': id });
          return false;
        });

        // Toggle menu visibility
        $('#menuToggle').click(function(){
          $(this).toggleClass('opened');
        });

        // Hide mapmenu when menu item is clicked in mobile context
        $('#menuToggle:visible ~ #mapmenu ul').on('click', 'li > a', function () {
          $('#menuToggle').removeClass('opened');
        });

        // Show layer switcher
        $('#button-switcher').click();
        updateContentSize();

        $('#headermenu .navbar-inner .nav a[rel="tooltip"]').tooltip();
        $('#mapmenu .nav a[rel="tooltip"]').tooltip();
        self.events.triggerEvent("uicreated", self);

        $('body').css('cursor', 'auto');
        $('#loading').dialog('close');
      });
    }
  };
  // initializing the lizMap events
  obj.events = new OpenLayers.Events(
      obj, null,
      ['treecreated','mapcreated','layersadded','uicreated',
       'dockopened','dockclosed'],
      true,
      {includeXY: true}
    );
  return obj;
}();
/*
 * it's possible to add event listener
 * before the document is ready
 * but after this file
 */
lizMap.events.on({
    'mapcreated':function(evt){
      // Add empty baselayer to the map
      if ( ('emptyBaselayer' in evt.config.options)
         && evt.config.options.emptyBaselayer == 'True') {
        // creating the empty base layer
        layerConfig = {};
        layerConfig.title = lizDict['baselayer.empty.title'];
        layerConfig.name = 'emptyBaselayer';
        evt.config.layers['emptyBaselayer'] = layerConfig;

        evt.baselayers.push(new OpenLayers.Layer.Vector('emptyBaselayer',{
          isBaseLayer: true
         ,maxExtent: evt.map.maxExtent
         ,maxScale: evt.map.maxScale
         ,minScale: evt.map.minScale
         ,numZoomLevels: evt.map.numZoomLevels
         ,scales: evt.map.scales
         ,projection: evt.map.projection
         ,units: evt.map.projection.proj.units
        }));
        evt.map.allOverlays = false;
      }

      // Add OpenStreetMap, Google Maps, Bing Maps, IGN Geoportail
      // baselayers to the map
      if (
    (('osmMapnik' in evt.config.options)
    && evt.config.options.osmMapnik == 'True') ||
    (('osmStamenToner' in evt.config.options)
     && evt.config.options.osmStamenToner == 'True') ||
    (('osmCyclemap' in evt.config.options)
     && evt.config.options.osmCyclemap == 'True'
     && ('OCMKey' in evt.config.options)) ||
    (('googleStreets' in evt.config.options)
     && evt.config.options.googleStreets == 'True') ||
    (('googleSatellite' in evt.config.options)
     && evt.config.options.googleSatellite == 'True') ||
    (('googleHybrid' in evt.config.options)
     && evt.config.options.googleHybrid == 'True') ||
    (('googleTerrain' in evt.config.options)
     && evt.config.options.googleTerrain == 'True') ||
    (('bingStreets' in evt.config.options)
     && evt.config.options.bingStreets == 'True'
     && ('bingKey' in evt.config.options)) ||
    (('bingSatellite' in evt.config.options)
     && evt.config.options.bingSatellite == 'True'
     && ('bingKey' in evt.config.options)) ||
    (('bingHybrid' in evt.config.options)
     && evt.config.options.bingHybrid == 'True'
     && ('bingKey' in evt.config.options)) ||
    (('ignTerrain' in evt.config.options)
     && evt.config.options.ignTerrain == 'True') ||
    (('ignStreets' in evt.config.options)
     && evt.config.options.ignStreets == 'True') ||
    (('ignSatellite' in evt.config.options)
     && evt.config.options.ignSatellite == 'True') ||
    (('ignCadastral' in evt.config.options)
     && evt.config.options.ignCadastral == 'True')
    ) {
      //adding baselayers
      var maxExtent = null;
      if ( OpenLayers.Projection.defaults['EPSG:900913'].maxExtent )
        maxExtent = new OpenLayers.Bounds(OpenLayers.Projection.defaults['EPSG:900913'].maxExtent);
      else if ( OpenLayers.Projection.defaults['EPSG:3857'].maxExtent )
        maxExtent = new OpenLayers.Bounds(OpenLayers.Projection.defaults['EPSG:3857'].maxExtent);

      var lOptions = {zoomOffset:0,maxResolution:156543.03390625};
      if (('resolutions' in evt.config.options)
          && evt.config.options.resolutions.length != 0 ){
        var resolutions = evt.config.options.resolutions;
        var maxRes = resolutions[0];
        var numZoomLevels = resolutions.length;
        var zoomOffset = 0;
        var res = 156543.03390625;
        while ( res > maxRes ) {
          zoomOffset += 1;
          res = 156543.03390625 / Math.pow(2, zoomOffset);
        }
        lOptions['zoomOffset'] = zoomOffset;
        lOptions['maxResolution'] = maxRes;
        lOptions['numZoomLevels'] = numZoomLevels;
      }

      if (('osmMapnik' in evt.config.options) && evt.config.options.osmMapnik == 'True') {
        evt.map.allOverlays = false;
        var options = {
          zoomOffset: 0,
          maxResolution:156543.03390625,
          numZoomLevels:23
        };
        if (lOptions.zoomOffset != 0) {
          options.zoomOffset = lOptions.zoomOffset;
          options.maxResolution = lOptions.maxResolution;
        }
        if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
          options.numZoomLevels = lOptions.numZoomLevels;
        else
          options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
        var osm = new OpenLayers.Layer.OSM('osm',
            [
            "https://a.tile.openstreetmap.org/${z}/${x}/${y}.png",
            "https://b.tile.openstreetmap.org/${z}/${x}/${y}.png",
            "https://c.tile.openstreetmap.org/${z}/${x}/${y}.png"
            ]
            ,options
            );
        osm.maxExtent = maxExtent;
        var osmCfg = {
             "name":"osm"
            ,"title":"OpenStreetMap"
            ,"type":"baselayer"
        };
        evt.config.layers['osm'] = osmCfg;
        evt.baselayers.push(osm);
      }

      if (('osmStamenToner' in evt.config.options) && evt.config.options.osmStamenToner == 'True') {
        evt.map.allOverlays = false;
        var options = {
          zoomOffset: 0,
          maxResolution:156543.03390625,
          numZoomLevels:23
        };
        if (lOptions.zoomOffset != 0) {
          options.zoomOffset = lOptions.zoomOffset;
          options.maxResolution = lOptions.maxResolution;
        }
        if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
          options.numZoomLevels = lOptions.numZoomLevels;
        else
          options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
        var stamenToner = new OpenLayers.Layer.OSM('osm-toner',
            ["https://stamen-tiles-a.a.ssl.fastly.net/toner-lite/${z}/${x}/${y}.png",
            "https://stamen-tiles-b.a.ssl.fastly.net/toner-lite/${z}/${x}/${y}.png",
            "https://stamen-tiles-c.a.ssl.fastly.net/toner-lite/${z}/${x}/${y}.png",
            "https://stamen-tiles-d.a.ssl.fastly.net/toner-lite/${z}/${x}/${y}.png"]
            ,options
            );
        stamenToner.maxExtent = maxExtent;
        var stamenTonerCfg = {
          "name":"osm-toner"
            ,"title":"OSM Stamen Toner"
            ,"type":"baselayer"
        };
        evt.config.layers['osm-toner'] = stamenTonerCfg;
        evt.baselayers.push(stamenToner);
      }

      if (('osmCyclemap' in evt.config.options) && evt.config.options.osmCyclemap == 'True' && ('OCMKey' in evt.config.options)) {
        evt.map.allOverlays = false;
        var options = {
          zoomOffset: 0,
          maxResolution:156543.03390625,
          numZoomLevels:23
        };
        if (lOptions.zoomOffset != 0) {
          options.zoomOffset = lOptions.zoomOffset;
          options.maxResolution = lOptions.maxResolution;
        }
        if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
          options.numZoomLevels = lOptions.numZoomLevels;
        else
          options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
        var cyclemap = new OpenLayers.Layer.OSM('osm-cyclemap','https://tile.thunderforest.com/cycle/${z}/${x}/${y}.png?apiKey='+evt.config.options.OCMKey,options);
        cyclemap.maxExtent = maxExtent;
        var cyclemapCfg = {
             "name":"osm-cycle"
            ,"title":"OSM CycleMap"
            ,"type":"baselayer"
        };
        evt.config.layers['osm-cycle'] = cyclemapCfg;
        evt.baselayers.push(cyclemap);
      }
      try {
        if (('googleSatellite' in evt.config.options) && evt.config.options.googleSatellite == 'True') {
          var options = {
            zoomOffset: 0,
            maxResolution:156543.03390625,
            numZoomLevels:21
          };
          if (lOptions.zoomOffset != 0) {
            options.zoomOffset = lOptions.zoomOffset;
            options.maxResolution = lOptions.maxResolution;
          }
          if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
            options.numZoomLevels = lOptions.numZoomLevels;
          else
            options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
          var gsat = new OpenLayers.Layer.Google(
              "gsat",
              {type: google.maps.MapTypeId.SATELLITE
                , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset}
              );
          gsat.maxExtent = maxExtent;
          var gsatCfg = {
               "name":"gsat"
              ,"title":"Google Satellite"
            ,"type":"baselayer"
          };
          evt.config.layers['gsat'] = gsatCfg;
          evt.baselayers.push(gsat);
          evt.map.allOverlays = false;
          evt.map.zoomDuration = 0;
        }
        if (('googleHybrid' in evt.config.options) && evt.config.options.googleHybrid == 'True') {
          var options = {
            zoomOffset: 0,
            maxResolution:156543.03390625,
            numZoomLevels:20
          };
          if (lOptions.zoomOffset != 0) {
            options.zoomOffset = lOptions.zoomOffset;
            options.maxResolution = lOptions.maxResolution;
          }
          if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
            options.numZoomLevels = lOptions.numZoomLevels;
          else
            options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
          var ghyb = new OpenLayers.Layer.Google(
              "ghyb",
              {type: google.maps.MapTypeId.HYBRID
                , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset}
              );
          ghyb.maxExtent = maxExtent;
          var ghybCfg = {
               "name":"ghyb"
              ,"title":"Google Hybrid"
            ,"type":"baselayer"
          };
          evt.config.layers['ghyb'] = ghybCfg;
          evt.baselayers.push(ghyb);
          evt.map.allOverlays = false;
          evt.map.zoomDuration = 0;
        }
        if (('googleTerrain' in evt.config.options) && evt.config.options.googleTerrain == 'True') {
          var options = {
            zoomOffset: 0,
            maxResolution:156543.03390625,
            numZoomLevels:16
          };
          if (lOptions.zoomOffset != 0) {
            options.zoomOffset = lOptions.zoomOffset;
            options.maxResolution = lOptions.maxResolution;
          }
          if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
            options.numZoomLevels = lOptions.numZoomLevels;
          else
            options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
          var gphy = new OpenLayers.Layer.Google(
              "gphy",
              {type: google.maps.MapTypeId.TERRAIN
              , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset}
              );
          gphy.maxExtent = maxExtent;
          var gphyCfg = {
               "name":"gphy"
              ,"title":"Google Terrain"
            ,"type":"baselayer"
          };
          evt.config.layers['gphy'] = gphyCfg;
          evt.baselayers.push(gphy);
          evt.map.allOverlays = false;
          evt.map.zoomDuration = 0;
       }
       if (('googleStreets' in evt.config.options) && evt.config.options.googleStreets == 'True') {
          var options = {
            zoomOffset: 0,
            maxResolution:156543.03390625,
            numZoomLevels:20
          };
          if (lOptions.zoomOffset != 0) {
            options.zoomOffset = lOptions.zoomOffset;
            options.maxResolution = lOptions.maxResolution;
          }
          if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
            options.numZoomLevels = lOptions.numZoomLevels;
          else
            options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
         var gmap = new OpenLayers.Layer.Google(
             "gmap", // the default
             {numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset}
             );
         gmap.maxExtent = maxExtent;
         var gmapCfg = {
              "name":"gmap"
             ,"title":"Google Streets"
             ,"type":"baselayer"
         };
         evt.config.layers['gmap'] = gmapCfg;
         evt.baselayers.push(gmap);
         evt.map.allOverlays = false;
         evt.map.zoomDuration = 0;
       }
       if (('bingStreets' in evt.config.options) && evt.config.options.bingStreets == 'True' && ('bingKey' in evt.config.options))  {
          var options = {
            zoomOffset: 0,
            maxResolution:156543.03390625,
            numZoomLevels:23
          };
          if (lOptions.zoomOffset != 0) {
            options.zoomOffset = lOptions.zoomOffset;
            options.maxResolution = lOptions.maxResolution;
          }
          if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
            options.numZoomLevels = lOptions.numZoomLevels;
          else
            options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
          var bmap = new OpenLayers.Layer.Bing({
             key: evt.config.options.bingKey,
             type: "Road",
             name: "Bing Road", // the default
             numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset
          });
          bmap.maxExtent = maxExtent;
          var bmapCfg = {
             "name":"bmap"
            ,"title":"Bing Road"
            ,"type":"baselayer"
          };
          evt.config.layers['bmap'] = bmapCfg;
          evt.baselayers.push(bmap);
          evt.map.allOverlays = false;
       }
       if (('bingSatellite' in evt.config.options) && evt.config.options.bingSatellite == 'True' && ('bingKey' in evt.config.options))  {
          var options = {
            zoomOffset: 0,
            maxResolution:156543.03390625,
            numZoomLevels:23
          };
          if (lOptions.zoomOffset != 0) {
            options.zoomOffset = lOptions.zoomOffset;
            options.maxResolution = lOptions.maxResolution;
          }
          if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
            options.numZoomLevels = lOptions.numZoomLevels;
          else
            options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
          var baerial = new OpenLayers.Layer.Bing({
             key: evt.config.options.bingKey,
             type: "Aerial",
             name: "Bing Aerial", // the default
             numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset
          });
          baerial.maxExtent = maxExtent;
          var baerialCfg = {
             "name":"baerial"
            ,"title":"Bing Aerial"
            ,"type":"baselayer"
          };
          evt.config.layers['baerial'] = baerialCfg;
          evt.baselayers.push(baerial);
          evt.map.allOverlays = false;
       }
       if (('bingHybrid' in evt.config.options) && evt.config.options.bingHybrid == 'True' && ('bingKey' in evt.config.options))  {
          var options = {
            zoomOffset: 0,
            maxResolution:156543.03390625,
            numZoomLevels:23
          };
          if (lOptions.zoomOffset != 0) {
            options.zoomOffset = lOptions.zoomOffset;
            options.maxResolution = lOptions.maxResolution;
          }
          if (lOptions.zoomOffset+lOptions.numZoomLevels <= options.numZoomLevels)
            options.numZoomLevels = lOptions.numZoomLevels;
          else
            options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
          var bhybrid = new OpenLayers.Layer.Bing({
             key: evt.config.options.bingKey,
             type: "AerialWithLabels",
             name: "Bing Hybrid", // the default
             numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel:options.zoomOffset
          });
          bhybrid.maxExtent = maxExtent;
          var bhybridCfg = {
             "name":"bhybrid"
            ,"title":"Bing Hybrid"
            ,"type":"baselayer"
          };
          evt.config.layers['bhybrid'] = bhybridCfg;
          evt.baselayers.push(bhybrid);
          evt.map.allOverlays = false;
       }

       var ignAttribution = '<a href="http://www.ign.fr" target="_blank"><img width="25" src="https://wxs.ign.fr/static/logos/IGN/IGN.gif" title="Institut national de l\'information géographique et forestière" alt="IGN"></a>';

       // IGN base layers
        if ('ignKey' in evt.config.options){
          var ignKey = evt.config.options.ignKey;

          if (('ignTerrain' in evt.config.options) && evt.config.options.ignTerrain == 'True') {
            var options = {
              zoomOffset: 0,
              maxResolution: 156543.03390625,
              numZoomLevels: 18
            };
            if (lOptions.zoomOffset != 0) {
              options.zoomOffset = lOptions.zoomOffset;
              options.maxResolution = lOptions.maxResolution;
            }
            if (lOptions.zoomOffset + lOptions.numZoomLevels <= options.numZoomLevels)
              options.numZoomLevels = lOptions.numZoomLevels;
            else
              options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
            var ignmap = new OpenLayers.Layer.WMTS({
              name: "ignmap",
              url: "https://wxs.ign.fr/" + ignKey + "/geoportail/wmts",
              layer: "GEOGRAPHICALGRIDSYSTEMS.MAPS",
              matrixSet: "PM",
              style: "normal",
              projection: new OpenLayers.Projection("EPSG:3857"),
              attribution: ignAttribution
              , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel: options.zoomOffset
              , zoomOffset: options.zoomOffset

            });
            ignmap.maxExtent = maxExtent;
            var ignmapCfg = {
              "name": "ignmap"
              , "title": "IGN Scan"
              , "type": "baselayer"
            };
            evt.config.layers['ignmap'] = ignmapCfg;
            evt.baselayers.push(ignmap);
            evt.map.allOverlays = false;
          }
        }
        if (('ignStreets' in evt.config.options) && evt.config.options.ignStreets == 'True') {
          var options = {
            zoomOffset: 0,
            maxResolution: 156543.03390625,
            numZoomLevels: 18
          };
          if (lOptions.zoomOffset != 0) {
            options.zoomOffset = lOptions.zoomOffset;
            options.maxResolution = lOptions.maxResolution;
          }
          if (lOptions.zoomOffset + lOptions.numZoomLevels <= options.numZoomLevels)
            options.numZoomLevels = lOptions.numZoomLevels;
          else
            options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
          var ignplan = new OpenLayers.Layer.WMTS({
            name: "ignplan",
            url: "https://wxs.ign.fr/cartes/geoportail/wmts",
            layer: "GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2",
            matrixSet: "PM",
            style: "normal",
            format: "image/png",
            projection: new OpenLayers.Projection("EPSG:3857"),
            attribution: ignAttribution
            , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel: options.zoomOffset
            , zoomOffset: options.zoomOffset

          });
          ignplan.maxExtent = maxExtent;
          var ignplanCfg = {
            "name": "ignplan"
            , "title": "IGN Plan"
            , "type": "baselayer"
          };
          evt.config.layers['ignplan'] = ignplanCfg;
          evt.baselayers.push(ignplan);
          evt.map.allOverlays = false;
        }
        if (('ignSatellite' in evt.config.options) && evt.config.options.ignSatellite == 'True') {
          var options = {
            zoomOffset: 0,
            maxResolution: 156543.03390625,
            numZoomLevels: 22
          };
          if (lOptions.zoomOffset != 0) {
            options.zoomOffset = lOptions.zoomOffset;
            options.maxResolution = lOptions.maxResolution;
          }
          if (lOptions.zoomOffset + lOptions.numZoomLevels <= options.numZoomLevels)
            options.numZoomLevels = lOptions.numZoomLevels;
          else
            options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
          var ignphoto = new OpenLayers.Layer.WMTS({
            name: "ignphoto",
            url: "https://wxs.ign.fr/ortho/geoportail/wmts",
            layer: "ORTHOIMAGERY.ORTHOPHOTOS",
            matrixSet: "PM",
            style: "normal",
            projection: new OpenLayers.Projection("EPSG:3857"),
            attribution: ignAttribution
            , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel: options.zoomOffset
            , zoomOffset: options.zoomOffset

          });
          ignphoto.maxExtent = maxExtent;
          var ignphotoCfg = {
            "name": "ignphoto"
            , "title": "IGN Photos"
            , "type": "baselayer"
          };
          evt.config.layers['ignphoto'] = ignphotoCfg;
          evt.baselayers.push(ignphoto);
          evt.map.allOverlays = false;
        }
        if (('ignCadastral' in evt.config.options) && evt.config.options.ignCadastral == 'True') {
          var options = {
            zoomOffset: 0,
            maxResolution: 156543.03390625,
            numZoomLevels: 20
          };
          if (lOptions.zoomOffset != 0) {
            options.zoomOffset = lOptions.zoomOffset;
            options.maxResolution = lOptions.maxResolution;
          }
          if (lOptions.zoomOffset + lOptions.numZoomLevels <= options.numZoomLevels)
            options.numZoomLevels = lOptions.numZoomLevels;
          else
            options.numZoomLevels = options.numZoomLevels - lOptions.zoomOffset;
          var igncadastral = new OpenLayers.Layer.WMTS({
            name: "igncadastral",
            url: "https://wxs.ign.fr/parcellaire/geoportail/wmts",
            layer: "CADASTRALPARCELS.PARCELLAIRE_EXPRESS",
            matrixSet: "PM",
            style: "normal",
            format: "image/png",
            projection: new OpenLayers.Projection("EPSG:3857"),
            attribution: ignAttribution
            , numZoomLevels: options.numZoomLevels, maxResolution: options.maxResolution, minZoomLevel: options.zoomOffset
            , zoomOffset: options.zoomOffset

          });
          igncadastral.maxExtent = maxExtent;
          var igncadastralCfg = {
            "name": "igncadastral"
            , "title": "IGN Cadastre"
            , "type": "baselayer"
          };
          evt.config.layers['igncadastral'] = igncadastralCfg;
          evt.baselayers.push(igncadastral);
          evt.map.allOverlays = false;
        }
      } catch(e) {
       }
     }

      if('lizmapExternalBaselayers' in evt.config){

        var externalService = OpenLayers.Util.urlAppend(lizUrls.wms
          ,OpenLayers.Util.getParameterString(lizUrls.params)
        );
        if (lizUrls.publicUrlList && lizUrls.publicUrlList.length > 1 ) {
            externalService = [];
            for (var j=0, jlen=lizUrls.publicUrlList.length; j<jlen; j++) {
              externalService.push(
                OpenLayers.Util.urlAppend(
                  lizUrls.publicUrlList[j],
                  OpenLayers.Util.getParameterString(lizUrls.params)
                )
              );
            }
        }

        // Add lizmap external baselayers
        for (var id in evt.config['lizmapExternalBaselayers']) {

          var layerConfig = evt.config['lizmapExternalBaselayers'][id];

          if (!('repository' in layerConfig) || !('project' in layerConfig))
            continue;

          var layerName = evt.cleanName(layerConfig.layerName);

          var layerWmsParams = {
            layers:layerConfig.layerName
            ,version:'1.3.0'
            ,exceptions:'application/vnd.ogc.se_inimage'
            ,format:(layerConfig.layerImageFormat) ? 'image/'+layerConfig.layerImageFormat : 'image/png'
            ,dpi:96
          };
          if (layerWmsParams.format != 'image/jpeg')
            layerWmsParams['transparent'] = true;

          // Change repository and project in service URL
          var reg = new RegExp('repository\=(.+)&project\=(.+)', 'g');
          if (! (externalService instanceof Array) )
            var url = externalService.replace(reg, 'repository='+layerConfig.repository+'&project='+layerConfig.project);
          else
            var url = jQuery.map(externalService, function(element) { return element.replace(reg, 'repository='+layerConfig.repository+'&project='+layerConfig.project) });

          // creating the base layer
          layerConfig.title = layerConfig.layerTitle
          layerConfig.name = layerConfig.layerName
          layerConfig.baselayer = true;
          layerConfig.singleTile = "False";
          evt.config.layers[layerName] = layerConfig;
          evt.baselayers.push(new OpenLayers.Layer.WMS(layerName,url
            ,layerWmsParams
            ,{isBaseLayer:true
            ,gutter:(layerConfig.cached == 'True') ? 0 : 5
            ,buffer:0
            ,singleTile:(layerConfig.singleTile == 'True')
            ,ratio:1
          }));
          evt.map.allOverlays = false;

        }
      }

    }
   ,
   'uicreated': function(evt){
     var map = evt.map;
     if ( map.id in OpenLayers.Layer.Google.cache ) {
        google.maps.event.addListenerOnce(OpenLayers.Layer.Google.cache[map.id].mapObject, 'tilesloaded', function() {
            var olLayers = map.layers;
            var gVisibility = false;
            for (var i=olLayers.length-1; i>=0; --i) {
                var layer = olLayers[i];
                if (layer instanceof OpenLayers.Layer.Google &&
                            layer.visibility === true && layer.inRange === true) {
                    layer.redraw(true);
                    gVisibility = true;
                    break;
                }
            }
            if (!gVisibility) {
                for (var i=olLayers.length-1; i>=0; --i) {
                    var layer = olLayers[i];
                    if (layer instanceof OpenLayers.Layer.Google) {
                        layer.display(false);
                        break;
                    }
                }
            }
        });
     }

      // Update legend if mobile
      if( lizMap.checkMobile() ){
        if( $('#button-switcher').parent().hasClass('active') )
          $('#button-switcher').click();
      }

      // Connect dock close button
      $('#dock-close').click(function(){ $('#mapmenu .nav-list > li.active.nav-dock > a').click(); });
      $('#right-dock-close').click(function(){ $('#mapmenu .nav-list > li.active.nav-right-dock > a').click(); });
   }

});

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
  // configurate OpenLayers
  OpenLayers.DOTS_PER_INCH = 96;
  // initialize LizMap
  lizMap.init();
  $( "#loading" ).css('min-height','128px');
});
