const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');
const { readFileSync } = require("fs");
const LICENCE = readFileSync(path.resolve(__dirname) + '/LICENCE');

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    publicPath: '/dist/',
    compress: true,
    port: 9000,
    hot: false,
    openPage: 'example/index.html',
    overlay: true
  },
  resolve: {
    extensions: [
      '.ts',
      '.js'
    ]
  },
  output: {
    filename: 'rr-tsdi-v1.0.2.js',
    library: 'RrTsdi',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    // new UglifyJsPlugin({
    //   sourceMap: true
    // }),
    new WrapperPlugin({
      header: '/*\n' + LICENCE + '*/\n\n'
    })
  ]
};
