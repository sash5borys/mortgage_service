'use strict';

module.exports = (tableName) => {
  const table = require(`./data/${tableName}`);

  return {
    read(id) {
      return table.find(record => record.id == id) || table;
    },

    async create({ ...record }) {
      const newRecord = { ...record };
      table.push(newRecord);
      return newRecord;
    },

    async update(id, { ...record }) {
      const recordKey = table.findIndex(record => record.id == id);
      return table[recordKey] = { ...table[recordKey], ...record };
    },

    delete(id) {
      const recordKey = table.findIndex(record => record.id == id);
      return table.splice(recordKey, 1);
    }
  }
};
