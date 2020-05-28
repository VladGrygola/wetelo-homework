import { apiUrl } from '../constants/api';

export const stokkApi = (url, params) =>
  fetch(`${apiUrl}${url}`, {
    ...params,
    headers: {
      Accept: 'application/json',
      ...params.headers,
    },
  }).then((data) => data.json());

export const queryString = (params) =>
  Object.keys(params)
    .map((key) => key + '=' + params[key])
    .join('&');

export const queryStringFromArray = (array) => `[${array.join(',')}]`;

export default stokkApi;
