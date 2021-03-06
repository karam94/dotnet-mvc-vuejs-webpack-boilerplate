﻿var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

// creates an entry with keys/values for each file in root of ./src directory
function buildEntry() {
    const reducer = (entry, file) => { entry[file.split(".").shift()] = `./src/${file}`; return entry; };

    return fs.readdirSync(path.join(__dirname, "src"))
        .filter(file => file.endsWith(".js"))
        .reduce(reducer, {});
}

var WildcardsEntryWebpackPlugin = require('wildcards-entry-webpack-plugin');

module.exports = {
    entry: WildcardsEntryWebpackPlugin.entry('./Views/**/*.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: '[name].js'
    },
    module: {
        rules: [
          {
              test: /\.vue$/,
              loader: 'vue-loader',
              options: {
                  loaders: {
                      // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                      // the "scss" and "sass" values for the lang attribute to the right configs here.
                      // other preprocessors should work out of the box, no loader config like this necessary.
                      'scss': 'vue-style-loader!css-loader!sass-loader',
                      'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                  }
                  // other vue-loader options go here
              }
          },
          {
              test: /\.js$/,
              loader: 'babel-loader',
              exclude: /node_modules/
          },
          {
              test: /\.(png|jpg|gif|svg)$/,
              loader: 'file-loader',
              options: {
                  name: '[name].[ext]?[hash]'
              }
          }
        ]
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
          name: 'commons',
          filename: 'commons.js',
          minChunks: 2,
      })
    ],
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.common.js'
        }
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
    module.exports.plugins = (module.exports.plugins || []).concat([
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: '"production"'
          }
      }),
      new webpack.optimize.UglifyJsPlugin({
          sourceMap: true,
          compress: {
              warnings: false
          }
      }),
      new webpack.LoaderOptionsPlugin({
          minimize: true
      })
    ])
}
