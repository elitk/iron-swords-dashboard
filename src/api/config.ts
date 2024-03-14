import axios from 'axios';

const BASE_URL = "http://localhost:8000";

export const apiInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});
