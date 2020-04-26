import CategoriesActionTypes from './categories.types';

export const setFetchParams = (params) => ({
  type: CategoriesActionTypes.SET_FETCH_PARAMS,
  payload: params,
});
