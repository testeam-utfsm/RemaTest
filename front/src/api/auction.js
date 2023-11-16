import api from './index.js';

export default {
  index() {
    return api({
      method: 'get',
      url: '/api/auctions',
    });
  },
  show(id) {
    return api({
      method: 'get',
      url: `/api/auctions/${id}`,
    });
  },
  delete(id) {
    return api({
      method: 'delete',
      url: `/api/auctions/${id}`,
    });
  },
  update(id, data) {
    return api({
      method: 'put',
      url: `/api/auctions/${id}`,
      data,
    });
  },
};