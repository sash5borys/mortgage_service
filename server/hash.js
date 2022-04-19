'use strict';

const crypto = require('crypto');

const hashSync = (password) => {
  const salt = crypto.randomBytes(16).toString('base64');
  return crypto.scryptSync(password, salt, 64).toString('hex');
};

const hashAsync = (password) => Promise.resolve(hashSync((password)));

module.exports = { hashSync, hashAsync };
