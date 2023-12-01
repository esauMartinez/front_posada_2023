import axios from 'axios';

export const url = 'http://192.168.4.17:1117';
export const url_prod =
  'https://apiposadatsmconnect-c6229f26956c.herokuapp.com';
export const dev = true;

export const instance = axios.create({
  baseURL: dev ? url : url_prod,
});
