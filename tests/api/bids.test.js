const mysql = require('mysql2/promise');
const axios = require('axios');

let conn = async function () {
  return mysql.createConnection({
    host: '0.0.0.0',
    user: 'root',
    password: 'root',
    database: 'testing',
    port: 3306
  })
};

describe('Bids', function () {
  beforeEach(async () => {
    const db = await conn()

    await db.query('DELETE FROM auctions');
    await db.query('ALTER TABLE auctions AUTO_INCREMENT = 1');
    await db.query('DELETE FROM bids');
    await db.query('ALTER TABLE bids AUTO_INCREMENT = 1');
    await db.query('DELETE FROM users');
    await db.query('ALTER TABLE users AUTO_INCREMENT = 1');

    await db.end();
  });
  test('get all bids', async function () {
    const db = await conn()

    await db.query('INSERT INTO users (email, administrator, password) VALUES ("jest@gmail.com", "1","asdasd")');
    await db.query('INSERT INTO auctions (name, base_price, current_price, start_date, end_date) VALUES ("jest", 1000, 1000, "2020-01-01 12:12:12", "2020-01-01 12:12:12")')
    await db.query('INSERT INTO bids (amount, user_id, auction_id) VALUES (99999999, 1, 1)');

    const response = await axios.get("http://localhost:3000/api/bids");

    expect(response.data).toEqual([{
      id: 1,
      auction_id: 1,
      user_id: 1,
      date: null,
      amount: 99999999,
    }]);

    await db.end();
  });
  test('get one bid', async function () {
    const db = await conn()

    await db.query('INSERT INTO auctions (name, base_price, current_price, start_date, end_date) VALUES ("jest", 1000, 1000, "2020-01-01 12:12:12", "2020-01-01 12:12:12")');
    await db.query('INSERT INTO users (email, administrator, password) VALUES ("jest@gmail.com", "1","asdasd")');
    await db.query('INSERT INTO bids (amount, user_id, auction_id) VALUES (99999999, 1, 1)');

    const response = await axios.get("http://localhost:3000/api/bids/1");

    expect(response.data).toEqual({
      id: 1,
      auction_id: 1,
      user_id: 1,
      date: null,
      amount: 99999999,
    });

    await db.end();
  });
  test('create bid', async function () {
    const db = await conn()

    await db.query('INSERT INTO auctions (name, base_price, current_price, start_date, end_date) VALUES ("jest", 1000, 1000, "2020-01-01 12:12:12", "2020-01-01 12:12:12")');
    await db.query('INSERT INTO users (email, administrator, password) VALUES ("jest@gmail.com", "1","asdasd")');

    const response = await axios.post("http://localhost:3000/api/bids", {
      amount: 99999999,
      user_id: 1,
      auction_id: 1
    });

    await db.end();
  });
});