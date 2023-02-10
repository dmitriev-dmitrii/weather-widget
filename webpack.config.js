const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {DefinePlugin} = require('webpack');
const { VueLoaderPlugin } = require("vue-loader");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const DotenvPlugin = require('dotenv');


module.exports = ({mode}) => {
    const dotenv = DotenvPlugin.config().parsed;

    const isDevMode = mode === 'development'
    const isProdMode = mode === 'production'

    return {
    entry: './index.js',
     mode: isProdMode ? 'production' : 'development',
  devServer: {
    historyApiFallback: true,
    compress: true,
    port: dotenv.PORT,
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProdMode ? '[contenthash:7].js' : '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [
            /\.vue$/
          ]
        }
      },
    ]
  },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src/'),
        },
        extensions: [
          '.js',
          '.vue',
          '.tsx',
          '.ts'
        ]
      },
  plugins: [

    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: isProdMode,
      hash: isProdMode,
      inject: 'body',
    }),
  ]
}}


