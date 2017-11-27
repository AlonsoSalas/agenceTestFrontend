const webpack = require('webpack');
const path = require('path');
const config = require('./webpack.config');
const ENV = process.env.NODE_ENV = process.env.ENV = 'production';
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


config.output = {
    filename: '[name].bundle.js',
    publicPath: '',
    path: path.resolve(__dirname, 'dist')
};

config.devtool = '#cheap-module-source-map';

config.plugins = config.plugins.concat([

    // Reduces bundles total size
    // new WebpackBundleSizeAnalyzerPlugin('./plain-report.txt'),
    new BundleAnalyzerPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
    //     comments: false,
    //     compress: {
    //         passes: 3,
    //         drop_console: true,
    //         drop_debugger: true,
    //         warnings: false,
    //         pure_getters: true,
    //         unsafe: true,
    //         unsafe_comps: true,
    //         screw_ie8: true
    //     },
    //     output: {
    //         comments: false,
    //     },
    //     mangle: {

            // You can specify all variables that should not be mangled.
            // For example if your vendor dependency doesn't use modules
            // and relies on global variables. Most of angular modules relies on
            // angular global variable, so we should keep it unchanged
        //     except: ['$super', '$', 'exports', 'require', 'angular']
        // }
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'ENV': JSON.stringify(ENV)
        }
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
]);

module.exports = config;
