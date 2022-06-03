const nrwlConfig = require('@nrwl/react/plugins/webpack.js'); // require the main @nrwl/react/plugins/webpack configuration function.
const webpack = require('webpack');
module.exports = (config, context) => {
  nrwlConfig(config); // first call it so that it @nrwl/react plugin adds its configs,
  // then override your config.
  return {
    ...config,
    // resolve: { fallback: { stream: require.resolve('stream-browserify') } },
    resolve: { fallback: { stream: false } },
    node: { global: true, fs: 'empty' }, // Fix: "Uncaught ReferenceError: global is not defined", and "Can't resolve 'fs'".
  };
};
