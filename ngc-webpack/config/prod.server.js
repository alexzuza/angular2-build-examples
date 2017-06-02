"use strict";
var open = require('open');
const compression = require('compression');
const express = require('express');
const root = require('./helpers.js').root;
const BASE_OUTPUT_DIR = 'dist';
const app = express();

app.use(compression());
app.use(express.static(root(BASE_OUTPUT_DIR + '/prod')));

const renderIndex = function(req, res) {
    res.sendFile(root(BASE_OUTPUT_DIR + '/prod/index.html'));
};

app.get('/*', renderIndex);

const PORT = 5000;
app.listen(PORT, function() {
    console.log('Listening on: http://localhost:' + PORT);
});
open('http://localhost:' + PORT);