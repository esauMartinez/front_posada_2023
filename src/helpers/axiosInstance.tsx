import axios from 'axios';

export const instance = axios.create({
  baseURL: 'http://192.168.4.17:1117',
});
