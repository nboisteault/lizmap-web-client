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

	static performCleanName(aName) {
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

	static cleanName(aName){
	  if ( aName in cleanNameMap )
	      return aName;

	  var theCleanName = performCleanName( aName );
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

	static getNameByCleanName( cleanName ){
	  var name = null;
	  if( cleanName in cleanNameMap )
	    name = cleanNameMap[cleanName];
	  return name;
	}

	static getNameByShortName( shortName ){
	  var name = null;
	  if( shortName in shortNameMap )
	    name = shortNameMap[shortName];
	  return name;
	}

	static getNameByTypeName( typeName ){
	  var name = null;
	  if( typeName in typeNameMap )
	    name = typeNameMap[typeName];
	  return name;
	}

	static getLayerNameByCleanName( cleanName ){
	  var layerName = null;
	  if( cleanName in layerCleanNames )
	    layerName = layerCleanNames[cleanName];
	  if ( layerName == null && cleanName in cleanNameMap ) {
	    layerName = cleanNameMap[cleanName];
	    layerCleanNames[cleanName] = layerName;
	  }
	  return layerName;
	}
}

export default Util;