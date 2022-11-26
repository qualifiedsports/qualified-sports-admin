const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const IgnoreNotFoundExportPlugin = require('ignore-not-found-export-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        exclude: /node_modules/,
        use: {loader: 'babel-loader'},
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {loader: 'html-loader'},
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new HardSourceWebpackPlugin(),
    // required because of https://github.com/babel/babel/issues/7640
    new IgnoreNotFoundExportPlugin([
      'CallbackSideEffect',
      'ChoicesProps',
      'InputProps',
      'NotificationSideEffect',
      'OptionText',
      'OptionTextElement',
      'RedirectionSideEffect',
      'RefreshSideEffect',
      'AdminUIProps',
      'AdminContextProps',
      'AdminRouterProps',
      'ReferenceArrayProps',
      'ReferenceManyProps',
      'LinkToType',
      'FormContext',
      'UseReferenceProps',
      'SortProps',
      'PaginationProps',
    ]),
  ].concat(
    process.env.NODE_ENV === 'development'
      ? [new BundleAnalyzerPlugin()]
      : []
  ),
  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.json'],
    alias: {
      'ra-core': path.join(
        __dirname,
        'node_modules',
        'ra-core',
        'lib'
      ),
      'ra-ui-materialui': path.join(
        __dirname,
        'node_modules',
        'ra-ui-materialui',
        'lib'
      ),
      'react-admin': path.join(
        __dirname,
        'node_modules',
        'react-admin',
        'lib'
      ),
      'ra-data-fakerest': path.join(
        __dirname,
        'node_modules',
        'ra-data-fakerest',
        'lib'
      ),
      'ra-i18n-polyglot': path.join(
        __dirname,
        'node_modules',
        'ra-i18n-polyglot',
        'lib'
      ),
      'ra-input-rich-text': path.join(
        __dirname,
        'node_modules',
        'ra-input-rich-text',
        'lib'
      ),
    },
  },
  output: {
    path: path.resolve(__dirname, 'build'),
  },
  devServer: {
    stats: {
      children: true,
      chunks: true,
      modules: true,
    },
  },
};