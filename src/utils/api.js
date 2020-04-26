import { apiUrl } from '../constants/api';

export const stokkApi = (url, params) =>
  fetch(`${apiUrl}${url}`, {
    ...params,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...params.headers,
    },
  }).then((data) => data.json());

export const queryString = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');

export const queryStringFromArray = (array) => `[${array.join(',')}]`;

export default stokkApi;
