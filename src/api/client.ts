import axios from "axios";
import React from "react";

const BASE_URL = 'https://api.binance.com/api/v3/';

const client = axios.create({
  baseURL: BASE_URL
});

export default client;