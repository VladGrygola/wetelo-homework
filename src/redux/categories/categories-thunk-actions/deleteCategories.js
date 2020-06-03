import CategoriesActionTypes from '../categories.types';
import { stokkApi as api, queryStringFromArray } from '../../../utils/api';

export const deleteCategoriesStarted = () => ({
  type: CategoriesActionTypes.DELETE_CATEGORIES_START,
});

export const deleteCategoriesSuccess = (ids) => ({
  type: CategoriesActionTypes.DELETE_CATEGORIES_SUCCESS,
  payload: ids,
});

export const deleteCategoriesFailure = (error) => ({
  type: CategoriesActionTypes.DELETE_CATEGORIES_FALIURE,
  payload: error,
});

export const deleteCategoriesAsync = (token, ids) => {
  return async (dispatch) => {
    dispatch(deleteCategoriesStarted());
    const response = await api(
      `api/categories?ids=${queryStringFromArray(ids)}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-type': 'application/json; charset=utf-8',
        },
      }
    );
    if (response.error) dispatch(deleteCategoriesFailure(response.error));
    else dispatch(deleteCategoriesSuccess(ids));
  };
};
