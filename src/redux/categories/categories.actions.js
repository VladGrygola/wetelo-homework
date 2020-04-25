import camelcaseKeys from 'camelcase-keys';
import CategoriesActionTypes from './categories.types';
import { stokkApi as api, queryString } from '../../utils/api';

export const setFetchParams = (params) => ({
  type: CategoriesActionTypes.SET_FETCH_PARAMS,
  payload: params,
});

export const fetchCategoriesStarted = () => ({
  type: CategoriesActionTypes.FETCH_CATEGORIES_START,
});

export const fetchCategoriesSuccess = (categories, queryResponse) => ({
  type: CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: { categories, queryResponse },
});

export const fetchCategoriesFailure = (error) => ({
  type: CategoriesActionTypes.FETCH_CATEGORIES_FALIURE,
  payload: error,
});

const defaultParams = {
  page: 1,
  limit: 5,
  orderBy: 'title',
  order: 'asc',
  q: '',
};
export const fetchCategoriesAsync = (token, params = defaultParams) => {
  return async (dispatch) => {
    dispatch(fetchCategoriesStarted());
    const queryParams = queryString(params);
    const response = await api(`api/categories?${queryParams}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.error) dispatch(fetchCategoriesFailure(response.error));
    else {
      const { data, ...queryResponse } = response;
      dispatch(fetchCategoriesSuccess(camelcaseKeys(data), queryResponse));
    }
  };
};
