
const { SRC_DIR, DLL_OUTPUT_DIR } = require('./constants');
const BellOnBundlerErrorPlugin = require('bell-on-bundler-error-plugin');
const { root } = require('./helpers.js');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');

const { ContextReplacementPlugin, DllPlugin, ProgressPlugin } = require('webpack');

const DLL_VENDORS = [
    '@angular/common',
    '@angular/compiler',
    '@angular/core',
    '@angular/platform-browser',
    '@angular/platform-browser-dynamic',
    'rxjs'
];

module.exports = {

    entry: {
        polyfill: [
            './' + SRC_DIR + '/polyfills.ts',
            'sockjs-client',
            '@angularclass/hmr',
            'webpack-dev-server/client/index.js',
            'webpack-dev-server/client/socket.js',
            'webpack/hot/emitter.js',
            'webpack/hot/log-apply-result.js'
        ],
        vendor: [
          '@angular/common',
          '@angular/compiler',
          '@angular/core',
          '@angular/platform-browser',
          '@angular/platform-browser-dynamic',
          'rxjs'
        ]
    },

    
    output: {
        path: root(DLL_OUTPUT_DIR),
        filename: '[name].dll.js',
        library: '[name]'
    },

    
    resolve: {
        extensions: ['.ts', '.js', '.json']
    },

    
    performance: {
        hints: false
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader'],
                exclude: [/\.(spec|e2e)\.ts$/]
            },
            {test: /\.json$/, loader: 'json-loader'},
        ]
    },

    plugins: [
        new ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)@angular/,
            root('./' + SRC_DIR)
        ),
        new ProgressPlugin(),
        new NamedModulesPlugin(),
        new BellOnBundlerErrorPlugin(),
        new DllPlugin({
            name: '[name]',
            path: root(DLL_OUTPUT_DIR + '/[name]-manifest.json'),
        })
    ]

};

