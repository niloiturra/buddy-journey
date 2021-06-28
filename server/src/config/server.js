const port = 3003;

const express = require('express');
const server = express();
const allowCors = require('./cors');
const queryParser = require('express-query-int');

server.use(express.urlencoded({ extended: true }));
server.use(express.json());
server.use(allowCors);
server.use(queryParser());

server.use(function (req, res, next) {
  res.status(404).send('Not Found');
});

server.listen(port, function () {
  console.log(`BACKEND is running on port ${port}.`);
});

module.exports = server;
