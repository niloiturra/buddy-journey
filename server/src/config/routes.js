const express = require('express');
const auth = require('./auth');

module.exports = function (server) {
  const protectedApi = express.Router();
  server.use('/api', protectedApi);

  protectedApi.use(auth);

  const openApi = express.Router();
  server.use('/oapi', openApi);

  const AuthService = require('../services/AuthService');
  openApi.post('/login', AuthService.login);
  openApi.post('/signup', AuthService.signUp);
  openApi.post('/validateToken', AuthService.validateToken);
};
