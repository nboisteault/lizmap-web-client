const path = require('path');

module.exports = {
	mode: 'production',
	entry: {
		map: './src/index.js'
	},
	output: {
		filename: '../../lizmap/www/js/[name].js',
		chunkFilename: '[name].bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};