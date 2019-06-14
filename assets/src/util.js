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

export default Util;