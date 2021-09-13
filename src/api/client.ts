import axios from 'axios';

const BASE_URL = 'https://api.binance.com/api/v3/';

const client = axios.create({
  baseURL: BASE_URL,
  headers: {
    post: {
      'X-MBX-APIKEY': process.env.REACT_APP_BINANCEKEY,
      'Access-Control-Allow-Headers': 'X-MBX-APIKEY',
    },
  },
});

export default client;
