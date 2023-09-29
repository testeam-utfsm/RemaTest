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

exports.up = function(db) {
  return db.createTable('bids',{
    id: {
      type: 'int',
      primaryKey: true
    },
    auction_id: {
      type: 'int',
      foreignKey: {
        name: 'auction_id_fk',
        table: 'auctions',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    user_id: {
      type: 'int',
      foreignKey: {
        name: 'user_id_fk',
        table: 'users',
        rules: {
          onDelete: 'CASCADE',
          onUpdate: 'RESTRICT'
        },
        mapping: 'id'
      }
    },
    date: 'datetime',
    amount: 'int'
  })
};

exports.down = function(db) {
  return db.dropTable('bids')
};

exports._meta = {
  "version": 1
};
