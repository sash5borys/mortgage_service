'use strict';

const db = require('../db.js');
const { hashAsync } = require('../hash.js');

const users = db('users');

module.exports = {
  async create({ login, password }) {
    const passwordHash = await hashAsync(password);
    return users.create({ login, password: passwordHash });
  },

  async update(id, { login, password }) {
    const passwordHash = await hashAsync(password);
    return users.update(id, { login, password: passwordHash });
  },
};
