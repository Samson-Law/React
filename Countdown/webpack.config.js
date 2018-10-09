var path = require('path');

module.exports = {
    entry: './js/app.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js'
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['es2015', 'stage-0', 'react']
          }
        }
      ]
    }
};