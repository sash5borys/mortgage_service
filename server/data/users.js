const { hashSync } = require('./../hash.js');

module.exports = [
  {
    id: 1,
    login: 'Admin',
    password: hashSync('Admin'),
    role: 'admin'
  }
];
