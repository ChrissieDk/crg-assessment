import axios from 'axios';

const api = axios.create({
  baseURL: 'https://arthurfrost.qflo.co.za/php/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api; 