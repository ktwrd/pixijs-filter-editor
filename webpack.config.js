const path = require('path');
function loadAceEditor() {
    return import(/* webpackChunkName: "ace" */ 'ace-builds/src-noconflict/ace').then(() => {
        return import(/* webpackChunkName: "ace" */ 'ace-builds/webpack-resolver.js')
    })
}
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
		filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
	devServer: {
		static: {
			directory: path.join(__dirname, 'dist')
		},
		compress: true,
		port: 9000
	}
};