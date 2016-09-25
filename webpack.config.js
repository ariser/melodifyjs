module.exports = {
	entry:  [
		'babel-polyfill',
		'./src/assets/scripts/index'
	],
	output: {
		filename: 'mucify.js'
	},
	module: {
		loaders: [
			{
				test:   /\.jsx?$/,
				loader: 'babel-loader',
				query:  {
					presets: ['es2015', 'stage-0']
				}
			}
		]
	}
};