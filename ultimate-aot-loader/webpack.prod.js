'use strict';
var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var AotPlugin = require('@ultimate/aot-loader').AotPlugin;

const ENV = JSON.stringify(process.env.NODE_ENV);


module.exports = {
  entry: {
    'main': './app/main.ts',
    'polyfill': './app/polyfill.ts'
  },

  context: path.join(process.cwd(), 'src'),

  output: {
    path: path.join(process.cwd(), 'dist'),
    filename: '[name].bundle.js'
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: ['@ultimate/aot-loader']
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },

  plugins: [
    new webpack.ProgressPlugin(),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)@angular/,
      path.join(process.cwd(), 'src')
    ),
    new CopyWebpackPlugin([
      { from: 'index.html' }
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        'ENV': ENV
      }
    }),
    new AotPlugin({
      tsConfig: path.join(process.cwd(), 'tsconfig.json')
    }),
    new webpack.optimize.UglifyJsPlugin({ // https://github.com/angular/angular/issues/10618
      mangle: {
        keep_fnames: true
      }
    })
  ],

  resolve: {
    modules: [
      'node_modules',
      path.resolve(process.cwd(), 'src')
    ],
    extensions: ['.ts', '.js']
  },

  devServer: {
    contentBase: './src',
    port: 8000,
    inline: true,
    historyApiFallback: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500
    }
  },

  stats: 'errors-only',

  devtool: 'source-map'
};
