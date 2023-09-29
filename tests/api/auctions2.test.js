const mysql = require('mysql2/promise');
const axios = require('axios');

let conn = async function () {
  return mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'root',
    database: 'testing',
    port: 3306
  })
};

describe('auctions', function () {
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
  test('get all auctions', async function () {
    const db = await conn()

    await db.query('INSERT INTO auctions (name, base_price, current_price, start_date, end_date) VALUES ("jest", 1000, 1000, "2020-01-01 12:12:12", "2020-01-01 12:12:12")');

    const response = await axios.get("http://localhost:3000/api/auctions");

    // console.log(response[0])

    expect(response.data[0]).toEqual({
      id: 1,
      name: 'jest',
      base_price: 1000,
      current_price: 1000,
      start_date: '2020-01-01T15:12:12.000Z',
      end_date: '2020-01-01T15:12:12.000Z',
    });

    await db.end();
  });
  test('get one auction', async function () {
    const db = await conn()

    await db.query('INSERT INTO auctions (name, base_price, current_price, start_date, end_date) VALUES ("jest", 1000, 1000, "2020-01-01 12:12:12", "2020-01-01 12:12:12")');
    await db.query('INSERT INTO users (email, administrator, password) VALUES ("jest@gmail.com", "1","asdasd")');
    await db.query('INSERT INTO bids (amount, user_id, auction_id) VALUES (99999999, 1, 1)');
    const response = await axios.get("http://localhost:3000/api/auctions/1");

    expect(response.data).toEqual({
      id: 1,
      name: 'jest',
      base_price: 1000,
      current_price: 1000,
      amount: 99999999,
      bids_id: 1,
      start_date: '2020-01-01T15:12:12.000Z',
      end_date: '2020-01-01T15:12:12.000Z',
    });

    await db.end();
  });
  test('post auction', async function () {
    const db = await conn()
    const response = await axios.post("http://localhost:3000/api/auctions", {
      name: 'jejest',
      base_price: 200,
      start_date: '2020-01-01 12:12:12',
      end_date: '2020-01-01 12:12:12',
    });

    const [[result], _] = await db.query('SELECT * FROM auctions WHERE id = 1;');

    expect(result.name).toEqual('jejest');
    expect(result.base_price).toEqual(200);
    expect(result.current_price).toEqual(200);

    await db.end();
  });
});