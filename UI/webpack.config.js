var config = {
   entry: './main.js',
	
   output: {
      path: '/',
      filename: 'index.js',
	  publicPath: '/'
   },
	
   devServer: {
      inline: true,
	  //host: '10.194.125.56',  //use ipconfig to get port and this line will open port
	  //need admin priviliges to get past firewall
      port: 7777,
	  historyApiFallback:true,
   },
	
   module: {
      loaders: [ {
         test: /\.jsx?$/,
         exclude: /node_modules/,
         loader: 'babel-loader',
			
         query: {
            presets: ['es2015', 'react']
         }
      }]
   }
	
}

module.exports = config;