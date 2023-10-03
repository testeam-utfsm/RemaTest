import api from './index.js';

export default {
    createAuction(data)
     {
      return api({
        method: 'post',
        url: 'http://localhost:3000/api/register',
        data: data,
      });
    },
  };