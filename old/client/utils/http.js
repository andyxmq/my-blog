import axios from 'axios';

const baseUrl = process.env.API_BASE || '';

const parseUrl = (url, params) => {
  params = params || {};
  const str = Object.keys(params).reduce((result, key) => {
    result += `${key}=${params[key]}&`;
    return result;
  }, '');
  return `${baseUrl}/api/${url}?${str.substr(0, str.length - 1)}`;
};

export const get = (url, params) => new Promise((resolve, reject) => {
  axios.get(parseUrl(url, params))
    .then((res) => {
      const { data } = res;
      if (data && data.success === true) {
        resolve(data);
      } else {
        reject(data);
      }
    }).catch(reject);
});

export const post = (url, params, postData) => new Promise((resolve, reject) => {
  axios.post(parseUrl(url, params), postData)
    .then((res) => {
      const { data } = res;
      if (data && data.success === true) {
        resolve(data);
      } else {
        reject(data);
      }
    }).catch(reject);
});


export default get;
