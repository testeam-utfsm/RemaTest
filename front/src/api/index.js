import axios from 'axios';

const api = axios.create();

api.defaults.baseURL = window.location.protocol + "//" + window.location.hostname + ":3000";


export default api;