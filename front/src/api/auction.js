import api from './index.js';

export default {
  index() {
    return api({
      method: 'get',
      url: 'http://localhost:3000/api/auctions',
    });
  },
  show(id) {
    return api({
      method: 'get',
      url: `http://localhost:3000/api/auctions/${id}`,
    });
  },
  delete(id) {
    return api({
      method: 'delete',
      url: `http://localhost:3000/api/auctions/${id}`,
    });
  },
  update(id, name, base_price, start_date, end_date) {
    return api({
      method: 'put',
      url: `http://localhost:3000/api/auctions/${id}`,
      data: {
        name: name,
        base_price: base_price,
        start_date: start_date,
        end_date: end_date
      },
    });
  },
};