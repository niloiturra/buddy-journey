import axios from 'axios';
import { getUserAccessToken } from '../helpers/authUtils';

const configureClient = () => {
  axios.defaults.headers.common = {
    Authorization: 'Bearer ' + getUserAccessToken(),
  };

  axios.defaults.headers.post['Content-Type'] = 'application/json';

  axios.interceptors.response.use(
    (res) => {
      return res.data ? res.data : res;
    },
    (err) => {
      const { response } = err;

      let message;
      switch (response.status) {
        case 500:
          message = 'Internal Server Error';
          break;
        case 400:
          message = response.data.errors ? response.data.errors : 'Error';
          break;
        case 401:
          message = 'Invalid credentials';
          break;
        case 404:
          message = 'Sorry! the data you are looking for could not be found';
          break;
        default:
          message = err.message || err;
      }
      return Promise.reject(message);
    }
  );
};
class APIClient {
  constructor() {
    configureClient();
  }

  get = (url, params) => {
    return axios.get(url, params);
  };

  create = (url, data) => {
    return axios.post(url, data);
  };

  put = (url, data) => {
    return axios.put(url, data);
  };

  delete = (url) => {
    return axios.delete(url);
  };
}

export { APIClient };
