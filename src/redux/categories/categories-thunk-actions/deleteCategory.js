import CategoriesActionTypes from '../categories.types';
import { stokkApi as api } from '../../../utils/api';

export const deleteCategoryStarted = () => ({
  type: CategoriesActionTypes.DELETE_CATEGORY_START,
});

export const deleteCategorySuccess = (id) => ({
  type: CategoriesActionTypes.DELETE_CATEGORY_SUCCESS,
  payload: id,
});

export const deleteCategoryFailure = (error) => ({
  type: CategoriesActionTypes.DELETE_CATEGORY_FALIURE,
  payload: error,
});

export const deleteCategoryAsync = (token, id) => {
  return async (dispatch) => {
    dispatch(deleteCategoryStarted());
    const response = await api(`api/categories/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: 'Bearer ' + token,
        'Content-type': 'application/json; charset=utf-8',
      },
    });
    if (response.error) dispatch(deleteCategoryFailure(response.error));
    else dispatch(deleteCategorySuccess(id));
  };
};
