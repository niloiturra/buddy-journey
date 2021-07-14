import axios from 'axios';
import config from './../config';

axios.defaults.baseURL = config.API_URL;

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

const setAuthorization = (token) => {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
};

class APIClient {
  get = (url, params) => {
    return axios.get(url, params);
  };

  create = (url, data) => {
    return axios.post(url, data);
  };

  update = (url, data) => {
    return axios.patch(url, data);
  };

  delete = (url) => {
    return axios.put(url);
  };
}

export { APIClient, setAuthorization };
