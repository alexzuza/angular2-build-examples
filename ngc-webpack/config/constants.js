const { root } = require('./helpers.js');

const BASE_OUTPUT_DIR = './dist';

module.exports = {
  SRC_DIR: 'src',
  DLL_OUTPUT_DIR: BASE_OUTPUT_DIR + '/dll',
  EXCLUDE_SOURCE_MAPS:  [
    // these packages have problems with their sourcemaps
    root('node_modules/@angular'),
    root('node_modules/rxjs')
  ]
};
