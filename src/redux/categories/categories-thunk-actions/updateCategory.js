import CategoriesActionTypes from '../categories.types';
import { stokkApi as api } from '../../../utils/api';

export const updateCategoryStarted = () => ({
  type: CategoriesActionTypes.UPDATE_CATEGORY_START,
});
export const updateCategorySuccess = (category) => ({
  type: CategoriesActionTypes.UPDATE_CATEGORY_SUCCESS,
  payload: category,
});
export const updateCategoryFailure = (error) => ({
  type: CategoriesActionTypes.UPDATE_CATEGORY_FALIURE,
  payload: error,
});

export const updateCategoryAsync = (token, { id, title }) => {
  return async (dispatch) => {
    dispatch(updateCategoryStarted());
    const response = await api(`api/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
      }),
      headers: {
        Authorization: 'Bearer ' + token,
      },
    });
    if (response.error) dispatch(updateCategoryFailure(response.error));
    else dispatch(updateCategorySuccess({ id, title }));
  };
};
