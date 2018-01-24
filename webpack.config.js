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
    filename: 'rr-tsdi-v1.0.1.js',
    library: 'RrTsdi',
    path: path.resolve(__dirname, 'dist')
  }
};
