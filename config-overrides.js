const fs = require('fs');
const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
const lessToJs = require('less-vars-to-js');
const {
  override,
  fixBabelImports,
  addLessLoader,
  addWebpackAlias,
  addWebpackPlugin,
} = require('customize-cra');

const themePath = './src/assets/styles/antd-custom-variables.less';
const themeFile = fs.readFileSync(path.join(__dirname, themePath), 'utf8');
const themeVariables = lessToJs(themeFile);

const multipleEntry = require('react-app-rewire-multiple-entry')([
  {
    entry: './silent_renew/index.js',
    template: './silent_renew/silent_renew.html',
    outPath: '/silent_renew.html',
  },
]);

module.exports = override(
  multipleEntry.addMultiEntry,
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: themeVariables,
  }),
  addWebpackAlias({
    '@': path.resolve(__dirname, 'src'),
  }),
  addWebpackPlugin(
    new HtmlWebpackPlugin({
      template: './silent_renew/silent_renew.html',
      chunks: ['silentRenew'],
      filename: 'silent_renew.html',
    }),
  ),
);
