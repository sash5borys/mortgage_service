'use strict';

const server = require('./http.js');
const db = require('./db.js');

const routing = {
  user: require('./api/user.js'),
  bank: db('banks'),
  payment: db('payments')
};

server(routing, 8000);
