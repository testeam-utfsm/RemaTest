import api from './index.js';

export default {
  index() {
    return api({
      method: 'get',
      url: 'http://localhost:3000/api/products',
    });
  },
};