import CategoriesActionTypes from '../categories.types';
import { stokkApi as api } from '../../../utils/api';

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
    const response = await api(`api/categories`, {
      method: 'DELETE',
      body: JSON.stringify({
        ids,
      }),
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.error) dispatch(deleteCategoriesFailure(response.error));
    else dispatch(deleteCategoriesSuccess(ids));
  };
};
