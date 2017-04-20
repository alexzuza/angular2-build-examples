"use strict";
const path = require('path');

const _root = path.resolve(__dirname, '..');

function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

const highPriorityChunks = ['polyfills', 'common'];// later, higher
function sortChunks (prev, next) {
    const prevName = prev.names[0];
    const nextName = next.names[0];

    return highPriorityChunks.indexOf(prevName) < highPriorityChunks.indexOf(nextName);
}

exports.root = root;
exports.sortChunks = sortChunks;
