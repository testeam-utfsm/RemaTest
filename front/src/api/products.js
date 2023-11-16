import api from './index.js';

export default {
  index() {
    return api({
      method: 'get',
      url: '/api/products',
    });
  },
};