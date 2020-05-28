import CategoriesActionTypes from '../categories.types';
import { stokkApi as api } from '../../../utils/api';

export const addCategoryStarted = () => ({
  type: CategoriesActionTypes.ADD_CATEGORY_START,
});
export const addCategorySuccess = (newCategory) => ({
  type: CategoriesActionTypes.ADD_CATEGORY_SUCCESS,
  payload: newCategory,
});
export const addCategoryFailure = (error) => ({
  type: CategoriesActionTypes.ADD_CATEGORY_SUCCESS,
  payload: error,
});

export const addCategoryAsync = (token, title) => {
  return async (dispatch) => {
    dispatch(addCategoryStarted());
    const response = await api(`api/categories`, {
      method: 'POST',
      body: JSON.stringify({
        title,
      }),
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.error) dispatch(addCategoryFailure(response.error));
    else dispatch(addCategorySuccess(response.model));
  };
};
