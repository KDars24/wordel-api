const express = require('express');
const routes = require('./routes');

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Mount routes
app.use(routes);

module.exports = app;