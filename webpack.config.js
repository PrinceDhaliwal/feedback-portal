var webpack = require('webpack');
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
require('./server.config');

var common = {
  cache: true,
  debug: true,
  entry: {
    index: './src/ui/js/index.jsx',
    redirect_handler: './src/ui/js/redirect_handler.jsx',
    home: './src/ui/js/home.jsx',
    results: './src/ui/js/results.jsx'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: './public/build/',
    filename: '[name].js'
  },
  devServer: {
    inline: true
  },
  devtool: 'source-map',
  module: {
    loaders: [{
      test: /\.jsx?/,
      loaders: ['babel'],
      exclude: /(node_modules|bower_components)/
    }, {
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
      test: /\.s[a|c]ss$/,
      loaders: ['style', 'css', 'postcss', 'sass']
    }, {
      test: /\.less$/,
      loaders: ['style', 'css', 'less']
    }, {
      test: /\.woff$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff&name=[path][name].[ext]"
    }, {
      test: /\.woff2$/,
      loader: "url-loader?limit=10000&mimetype=application/font-woff2&name=[path][name].[ext]"
    }, {
      test: /\.(eot|ttf|svg|gif|png)$/,
      loader: "file-loader?name=assets/img-[hash].[ext]"
    }]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery"
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'REDIRECT_URL': JSON.stringify(process.env.REDIRECT_URL),
        'AUTH_URL': JSON.stringify(process.env.AUTH_URL),
        'IDENTITY_URL': JSON.stringify(process.env.IDENTITY_URL),
        'FEEDBACK_URL': JSON.stringify(process.env.FEEDBACK_URL),
        'ACADEMIC_URL': JSON.stringify(process.env.ACADEMIC_URL)
      }
    })
  ],
  postcss: function() {
    return [autoprefixer({
      browsers: ['last 4 versions']
    })];
  }
};

if (process.env.NODE_ENV === 'production') {
  common.plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = common;