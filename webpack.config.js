module.exports = {
	output: {
		filename: 'micufy.js'
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