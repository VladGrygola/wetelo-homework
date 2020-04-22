import { apiUrl } from '../constants/api';

export const stokkApi = (url, params) =>
  fetch(`${apiUrl}${url}`, {
    ...params,
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
      ...params.headers,
    },
  }).then((data) => data.json());

export default stokkApi;
