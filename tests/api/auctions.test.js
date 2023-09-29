const axios = require('axios');

const db = require('../../database/index.js');

describe('Auction controller', () => {
  beforeEach(() => {
    db.query('DELETE FROM auctions');
    db.query('ALTER TABLE auctions AUTO_INCREMENT = 1')
    db.query('DELETE FROM bids');
    db.query('ALTER TABLE bids AUTO_INCREMENT = 1')
    db.query('DELETE FROM users');
    db.query('ALTER TABLE users AUTO_INCREMENT = 1')
  });
    it('controllers returns auction', async () => {
        db.execute('INSERT INTO auctions (name, base_price, current_price, start_date, end_date) VALUES ("jest", 1000, 1000, "2020-01-01 12:12:12", "2020-01-01 12:12:12")')


        
        const response = await axios.get("http://localhost:3000/api/auctions");
        expect(response.data).toEqual([
            {
              id: 1,
              name: 'jest',
              base_price: 1000,
              current_price: 1000,
              start_date: '2020-01-01T15:12:12.000Z',
              end_date: '2020-01-01T15:12:12.000Z'
            }
          ]);
    })
    it('return given auction', async () => {
        await db.execute('INSERT INTO auctions (name, base_price, current_price, start_date, end_date) VALUES ("jest", 1000, 1000, "2020-01-01 12:12:12", "2020-01-01 12:12:12")')
        await db.execute('INSERT INTO users (email, administrator, password) VALUES ("jest@gmail.com", "1","asdasd")')
        await db.execute('INSERT INTO bids (amount, user_id, auction_id) VALUES (9999999999, 1, 1)')
        
        const response = await axios.get("http://localhost:3000/api/auctions/1");
        expect(response.data).toEqual([
            {
              id: 1,
              name: 'jest',
              base_price: 1000,
              current_price: 1000,
              start_date: '2020-01-01T15:12:12.000Z',
              end_date: '2020-01-01T15:12:12.000Z'
            }
          ]);
    })
    //it('create auction', async () => {
    //  const response = await axios.post("http://localhost:3000/api/auctions", {
    //    name: 'jest',
    //    base_price: 1000,
    //    current_price: 1000,
    //    start_date: '2020-01-01T15:12:12.000Z',
    //    end_date: '2020-01-01T15:12:12.000Z'
    //  });
    //  expect(response.data).toEqual({
    //    id: 1,
    //    name: 'jest',
    //    base_price: 1000,
    //    current_price: 1000,
    //    start_date: '2020-01-01T15:12:12.000Z',
    //    end_date: '2020-01-01T15:12:12.000Z'
    //  });
    //})
});
