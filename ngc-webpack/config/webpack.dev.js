const { OUTPUT_DIR, DLL_OUTPUT_DIR } = require('./constants');
const { DefinePlugin, DllReferencePlugin, SourceMapDevToolPlugin } = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const { root } = require('./helpers.js');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common');


module.exports = webpackMerge(commonConfig, {

    output: {
        filename: '[name].js',
        sourceMapFilename: '[name].map',
        path: root(OUTPUT_DIR),
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
                    'angular2-router-loader'
                ]
            }
        ]
    },

    plugins: [
        // `CheckerPlugin` is optional. Use it if you want async error reporting.
        // We need this plugin to detect a `--watch` mode. It may be removed later
        // after https://github.com/webpack/webpack/issues/3460 will be resolved.
        new CheckerPlugin(),
        new DllReferencePlugin({
            context: '.',
            manifest: require(root(DLL_OUTPUT_DIR + `/polyfill-manifest.json`))
        }),
        new DllReferencePlugin({
            context: '.',
            manifest: require(root(DLL_OUTPUT_DIR + `/vendor-manifest.json`))
        }),
        new DefinePlugin({
            ENV: JSON.stringify('development')
        }),
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
            include: ['src'],
            exclude: ['polyfills'],
            columns: false
        }),
        new LoaderOptionsPlugin({
            debug: true,
            options: {}
        })
    ],

    devServer: {
        contentBase: root(OUTPUT_DIR),
        port: 8000,
        historyApiFallback: {
            disableDotRule: true,
        },

        watchOptions: {
            poll: undefined,
            aggregateTimeout: 300,
            ignored: /node_modules/
        }
    }
});
