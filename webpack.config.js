const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin    = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SOURCE_ROOT = __dirname + '/src/main/webpack';

const config = {
  entry: SOURCE_ROOT + '/site/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  mode: 'development',
  devtool: 'inline-source-map',
  performance: { hints: 'warning' },
  module: {
    rules: [
        {
            test: /\.scss$/,
            use: [
              MiniCssExtractPlugin.loader,
              {
                  loader: 'css-loader',
                  options: {
                      url: false
                  }
              },
              {
                  loader: 'postcss-loader',
                  options: {
                      plugins() {
                          return [
                              require('autoprefixer')
                          ];
                      }
                  }
              },
              {
                  loader: 'sass-loader',
                  options: {
                      url: false
                  }
              },
              'glob-import-loader'             
            ]
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, SOURCE_ROOT + '/static/index.html')
    }),
    new CopyWebpackPlugin([
      { from: path.resolve(__dirname, SOURCE_ROOT + '/static/assets'), to: 'assets' },
    ])
  ]
};

module.exports = config;