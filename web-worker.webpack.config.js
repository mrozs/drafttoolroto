const path = require('path');
const source = path.resolve(__dirname, 'src');
const ProgressPlugin = require('./node_modules/webpack/lib/ProgressPlugin');
const { NoEmitOnErrorsPlugin } = require('./node_modules/webpack');
const { AngularCompilerPlugin } = require('./node_modules/@ngtools/webpack');

module.exports = {
  mode: 'production',
  devtool: "source-map",
  resolve: {
    extensions: [
      '.ts',
      '.js',
      '.jsx'
    ],
    modules: [
      './node_modules',
      './node_modules'
    ]
  },
  resolveLoader: {
    modules: [
      './node_modules'
    ]
  },
  entry: {
    'src/web-workers/web-worker.bundle': [
      './src/web-workers/web-worker.ts'
    ],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },

  watch: true,

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      { test: /\.json$/, loader: 'json-loader' },
      {
        test: /(?:\.ngfactory\.js|\.ngstyle\.js|\.ts)$/,
        loader: './node_modules/@ngtools/webpack'
      },
      { test: [/\.txt$/, /\.wasm$/], use: 'raw-loader' },
      {
        test: /\.css$/,
        include: source,
        loader: 'style-loader',
        loader: 'postcss-loader', options: { option: {} },
        exclude: [
          /\/node_modules\//
        ]
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        include: /images/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
              publicPath: 'images/'
            }
          }
        ]
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {},

      }
    ]
  },

  plugins: [
    new NoEmitOnErrorsPlugin(),
    new ProgressPlugin(),
    new AngularCompilerPlugin({
      tsConfigPath: 'src/tsconfig.app.json',
      entryModule: 'src/app/app.module',


    }),
  ],
  node: {
    // fs: empty,
    global: true
    // "crypto": "empty",
    /* "tls": "empty",
    "net": "empty",
    "process": true,
    "module": false,
    "clearImmediate": false,
    "setImmediate": false */
  }
};