const { EXCLUDE_SOURCE_MAPS, SRC_DIR} = require('./constants');
const webpack = require('webpack');
const { root, sortChunks } = require('./helpers.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const EVENT = process.env.npm_lifecycle_event || '';
const AOT = EVENT.includes('aot');


module.exports = {
    entry: {
        app: root(SRC_DIR + '/main.browser' + (AOT ? '.aot' : '')),
        polyfills: root(SRC_DIR + '/polyfills.browser' + (AOT ? '.aot' : '')),
        vendors: root(SRC_DIR + '/vendors')
    },

    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    cache: true,

    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: 'tslint-loader',
                enforce: 'pre',
                exclude: /(node_modules|output)/
            },
            {
                test: /\.js$/,
                loader: 'source-map-loader',
                exclude: [EXCLUDE_SOURCE_MAPS]
            },
            {test: /\.json$/, loader: 'json-loader'},
            {test: /\.html/, loader: 'raw-loader'},
            {test: /\.map$/, loader: 'raw-loader'},
            {test: /\.css$/, loader: 'raw-loader'},
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: `file-loader?context=src&hash=sha512&digest=hex&name=[path][name]-[hash].[ext]`
            }
        ]
    },

    plugins: [
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            root(SRC_DIR)
        ),
        new webpack.ProgressPlugin(),
        new NamedModulesPlugin(),
        new HtmlWebpackPlugin({
            title: 'index',
            filename: 'index.html',
            template: root(SRC_DIR + '/index.html'),
            chunks: ['app', 'polyfills', 'vendors'],
            chunksSortMode: sortChunks
        })
    ],

    node: {
        global: true,
        process: true,
        Buffer: false,
        crypto: true,
        module: false,
        clearImmediate: false,
        setImmediate: false,
        clearTimeout: true,
        setTimeout: true
    }
};