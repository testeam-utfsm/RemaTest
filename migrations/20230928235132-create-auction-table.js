'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
  return db.createTable('auctions', {
    id: {
      type: 'int',
      primaryKey: true
    },
    name: 'string',
    base_price: 'int',
    current_price: 'int',
    start_date: 'datetime',
    end_date: 'datetime'
  });
};

exports.down = function(db) {
  return db.dropTable('auctions');
};

exports._meta = {
  "version": 1
};
