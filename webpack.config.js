const webpack = require('webpack');
const path = require('path');

const config = {
  resolve: {
    modules: [
      path.resolve('./lib'),
      path.resolve('./node_modules'),
    ]
  },
  entry: {
    vendor: [
      'babel-polyfill',
      'react',
      'react-dom',
      'axios',
      'prop-types',
      'lodash.debounce',
      'lodash.pickBy'
    ],
    app: ['./lib/renderers/dom.js'],
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env', 'stage-2']
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ]
};

module.exports = config;