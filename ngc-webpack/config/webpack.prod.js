const { OUTPUT_DIR, AOT_OUTPUT_DIR, SRC_DIR } = require('./constants');
const { DefinePlugin, NoEmitOnErrorsPlugin } = require('webpack');
const webpack = require('webpack');

const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
const { root } = require('./helpers.js');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');


module.exports = webpackMerge(commonConfig, {

    devtool: 'source-map',

    output: {
        filename: '[name].[hash].js',
        chunkFilename: '[id].[hash].chunk.js',
        path: root(OUTPUT_DIR)
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    'awesome-typescript-loader?configFileName=' + root('tsconfig.aot.json'),
                    'angular2-template-loader',
                    'angular2-router-loader?loader=system&genDir=' + AOT_OUTPUT_DIR + '/app&aot=true'
                ],
                exclude: [/\.(spec|e2e|d)\.ts$/]
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendors', 'polyfills']
        }),
        new DefinePlugin({
            ENV: JSON.stringify('production')
        }),
        new NoEmitOnErrorsPlugin(),
        new UglifyJsPlugin({
            beautify: false,
            comments: false
        })
    ]
});