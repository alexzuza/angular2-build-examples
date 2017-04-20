import {
    DEV_PORT, HOST, USE_DEV_SERVER_PROXY, DEV_SERVER_PROXY_CONFIG, DEV_SERVER_WATCH_OPTIONS,
    DEV_SOURCE_MAPS, OUTPUT_DIR, DLL_OUTPUT_DIR, AOT_OUTPUT_DIR, SRC_DIR
} from './constants';
const {DefinePlugin, DllReferencePlugin, SourceMapDevToolPlugin} = require('webpack');
const {CheckerPlugin} = require('awesome-typescript-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const {hasProcessFlag, root, testDll} = require('./helpers.js');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');

const EVENT = process.env.npm_lifecycle_event || '';
const CONSTANTS = {
    AOT: EVENT.includes('aot'),
    ENV: JSON.stringify('development'),
    HMR: hasProcessFlag('hot'),
    HOST: HOST,
    PORT: DEV_PORT,
    REST_ENDPOINT_BASE: '\'' + process.env['npm_config_rest_endpoint'] + '\'',
    IFRAME_BASE: '\'' + process.env['npm_config_iframe_base'] + '\'',
};

testDll();
console.log(`Starting dev server on: http://${HOST}:${CONSTANTS.PORT}`);

module.exports = webpackMerge(commonConfig, {

    // See https://github.com/webpack/webpack/issues/2145
    // Using SourceMapDevToolPlugin instead of devtool.
    // devtool: DEV_SOURCE_MAPS,

    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        path: root(OUTPUT_DIR),
        publicPath: 'http://' + CONSTANTS.HOST + ':' + CONSTANTS.PORT + '/',
    },

    performance: {
        hints: false
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    '@angularclass/hmr-loader?pretty=true&prod=false',
                    'awesome-typescript-loader',
                    'angular2-template-loader',
                    'angular2-router-loader?loader=system&genDir=' + AOT_OUTPUT_DIR + '/src/app&aot=' + CONSTANTS.AOT
                ],
                exclude: [/\.(spec|e2e|d)\.ts$/]
            }
        ]
    },

    plugins: [
        // `CheckerPlugin` is optional. Use it if you want async error reporting.
        // We need this plugin to detect a `--watch` mode. It may be removed later
        // after https://github.com/webpack/webpack/issues/3460 will be resolved.
        new CheckerPlugin(),
        new DefinePlugin(CONSTANTS),
        new DllReferencePlugin({
            context: '.',
            manifest: require(root(DLL_OUTPUT_DIR + `/polyfill-manifest.json`))
        }),
        new DllReferencePlugin({
            context: '.',
            manifest: require(root(DLL_OUTPUT_DIR + `/vendor-manifest.json`))
        }),
        new CopyWebpackPlugin([{from: root(DLL_OUTPUT_DIR)}]),
        new BellOnBundlerErrorPlugin(),
        new AddAssetHtmlPlugin({
            includeSourcemap: false,
            hash: true,
            filepath: require.resolve(root(DLL_OUTPUT_DIR + '/polyfill.dll.js'))
        }),
        new AddAssetHtmlPlugin({
            includeSourcemap: false,
            hash: true,
            filepath: require.resolve(root(DLL_OUTPUT_DIR + '/vendor.dll.js'))
        }),
        new SourceMapDevToolPlugin({
            filename: '[file].map',
            include: ['app'],
            exclude: ['vendor', 'polyfills'],
            columns: false
        }),
        new LoaderOptionsPlugin({
            debug: true,
            options: {}
        })
    ],

    devServer: {
        contentBase: CONSTANTS.AOT ? root(AOT_OUTPUT_DIR) : root(OUTPUT_DIR),
        port: CONSTANTS.PORT,
        historyApiFallback: {
            disableDotRule: true,
        },
        host: CONSTANTS.HOST,
        watchOptions: DEV_SERVER_WATCH_OPTIONS,
        proxy: USE_DEV_SERVER_PROXY ? DEV_SERVER_PROXY_CONFIG : {}
    }
});
