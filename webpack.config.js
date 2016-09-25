module.exports = {
	output: {
		filename: 'mucify.js'
	},
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	}
};