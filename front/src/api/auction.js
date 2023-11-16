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
  update(id, data) {
    return api({
      method: 'put',
      url: `http://localhost:3000/api/auctions/${id}`,
      data,
    });
  },
};