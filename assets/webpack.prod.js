const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		map: './src/map.js'
	},
	output: {
		filename: '../../lizmap/www/js/[name].js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	externals: {
		jquery: 'OpenLayers'
	}
};