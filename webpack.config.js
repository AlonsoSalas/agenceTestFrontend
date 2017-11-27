var path    = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


module.exports = {
  devtool: 'source-map',
  entry: {},
  module: {
    // noParse: /source\/assets\/js\/sweetalert.js/,
    loaders: [
       { test: /\.js$/, exclude: [/app\/lib/, /node_modules/], loader: 'ng-annotate!babel' },
       { test: /\.html$/, loader: 'raw' },
       { test: /\.(scss|sass)$/, loader: 'style!css!sass' },
       { test: /\.png$/, loader: 'url-loader?limit=100000' },
       {
          test   : /\.woff/,
          loader : 'url?prefix=font/&limit=10000&mimetype=application/font-woff'
      }, {
          test   : /\.ttf/,
          loader : 'file?prefix=font/'
      }, {
          test   : /\.eot/,
          loader : 'file?prefix=font/'
      }, {
          test   : /\.svg/,
          loader : 'file?prefix=font/'
      },
      { test: /\.[ot]tf$/, loader: 'url?limit=65000&mimetype=application/octet-stream&name=/assets/fonts/[name].[ext]' },
       { test: /\.css$/, loader: 'style!css' },
       { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file-loader?name=/assets/img/[folder]/[name].[ext]'}
    ]
  },
  plugins: [
      new webpack.ProvidePlugin({
        'AngularClass': path.resolve(__dirname, 'source/app/common/generic/base/angular.class') ,
        '_': 'lodash',
        'jQuery': 'jquery',
        '$': 'jquery',
        'oBuilder': 'odata-query',
        'moment' : 'moment'
      }),
    // Injects bundles in your index.html instead of wiring all manually.
    // It also adds hash to all injected assets so we don't have problems
    // with cache purging during deployment.
    new HtmlWebpackPlugin({
      template: 'source/index.html',
      inject: 'body',
      hash: true
    }),

    // Automatically move all modules defined outside of application directory to vendor bundle.
    // If you are using more complicated project structure, consider to specify common chunks manually.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        return module.resource && module.resource.indexOf(path.resolve(__dirname, 'source')) === -1;
      }
    })
  ]
};
