import axios from 'axios';
import tr from './translate';

// Set up Base Axios instance
axios.defaults.headers.post['Content-Type'] = 'application/json';

const baseAxiosInstance = axios.create();
baseAxiosInstance.defaults.baseURL = '/';

const getError = (errors, status) => {
  const somethingWentWrong = tr('Something went wrong. Try again later.');

  if (status === 500 || !errors || typeof errors === 'string') {
    return {
      status,
      message: somethingWentWrong,
    };
  }

  if (errors.non_field_errors instanceof Array) {
    return {
      status,
      errors,
      message: errors.non_field_errors.join('. '),
    };
  }

  const message = errors.non_field_errors || errors.detail;

  return {
    status,
    errors,
    message: message || errors ? message : somethingWentWrong,
  };
};

baseAxiosInstance.interceptors.response.use(
  (response) => response.data,
  ({ response }) => {
    const { data, status } = response || {};
    const error = getError(data, status);

    return Promise.reject(error);
  },
);

export default function sendRequest({ method, path, data }) {
  const dataProperty = method === 'get' ? 'params' : 'data';
  const request = {
    method,
    url: path,
    [dataProperty]: data,
  };

  return baseAxiosInstance(request);
}
