const path = require('path');

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
  resolve: {
    extensions: [ '.ts', 'js' ]
  },
  output: {
    filename: 'rr-tsdi-v1.0.2.js',
    library: 'RrTsdi',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  }
};
