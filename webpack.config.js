const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WrapperPlugin = require('wrapper-webpack-plugin');
const { readFileSync } = require('fs');
const LICENCE = readFileSync(path.resolve(__dirname) + '/LICENCE');
let config;

// TODO read version from code and name from package.json

function getConfig() {
  return {
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
      extensions: ['.ts','.js']
    },
    output: {
      filename: '[name].js',
      library: 'RrTsdi',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist')
    },
    plugins: [
      new WrapperPlugin({
        header: '/*\n' + LICENCE + '*/\n\n'
      })
    ]
  };
}

function fillDev(config) {
  config.entry = {
    'rr-tsdi-v1.0.3': './src/index.ts'
  };

  config.devtool = 'inline-source-map';

  config.devServer = {
    contentBase: path.resolve(__dirname),
    publicPath: '/dist/',
    compress: true,
    port: 8000,
    hot: false,
    openPage: 'example/index.html',
    overlay: {
      warnings: true,
      errors: true
    }
  };
}

function fillProd(config) {
  config.entry = {
    'rr-tsdi-v1.0.3': './src/index.ts',
    'rr-tsdi-v1.0.3.min': './src/index.ts',
  };

  config.devtool = 'source-map';

  config.plugins.unshift(
    new UglifyJsPlugin({
      include: /\.min\.js$/,
      sourceMap: true
    })
  );
}

config = getConfig();
fillDev(config);
// fillProd(config);

module.exports = config;
