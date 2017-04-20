const { root } = require('./helpers.js');
const EVENT = process.env.npm_lifecycle_event || '';
const PROD = EVENT.includes('prod');

const BASE_OUTPUT_DIR = './dist';

module.exports = {
  SRC_DIR: 'src',
  OUTPUT_DIR: BASE_OUTPUT_DIR + '/' + (PROD ? 'prod' : 'dev'),
  AOT_OUTPUT_DIR: BASE_OUTPUT_DIR + '/aot',
  DLL_OUTPUT_DIR: BASE_OUTPUT_DIR + '/dll'
};
