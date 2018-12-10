const webpack = require('webpack');
const path = require('path');
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: [/(node_modules)/],
        use: 'babel-loader'
      }
    ]
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  entry: {
    index: [
      '@babel/polyfill',
      '@babel/plugin-transform-regenerator',
      'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true',
      './'
    ]
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'public'),
    publicPath: '/assets',
    filename: '[name].bundle.js'
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  optimization: {
    noEmitOnErrors: true,
    splitChunks: {
      cacheGroups: {
        commons: {
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  devServer: { inline: true },
  devtool: 'source-map'
};
