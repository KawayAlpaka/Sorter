const CracoLessPlugin = require('craco-less');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#00b464' },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: {
        overrideWebpackConfig:({ webpackConfig, cracoConfig, pluginOptions, context: { env, paths } }) => {
          // console.log(webpackConfig.mode);
          // console.log(webpackConfig.devtool);
          // delete webpackConfig.devtool;
          webpackConfig.plugins = [
            ...webpackConfig.plugins,
            new MonacoWebpackPlugin()
          ];
          return webpackConfig; 
        }
      },
    }
  ],
};
