

const EVENT = process.env.npm_lifecycle_event || '';
const DEV = EVENT.includes('dev');
const DLL = EVENT.includes('dll');
const PROD = EVENT.includes('prod');

if (DLL) {
  module.exports = require('./config/webpack.dll');
} else if (DEV) {
  module.exports = require('./config/webpack.dev');
} else {
  throw "Unknown webpack configuration.";
}