import api from './index.js';

export default {
    createAuction(data)
     {
      return api({
        method: 'post',
        url: '/api/register',
        data: data,
      });
    },
  };