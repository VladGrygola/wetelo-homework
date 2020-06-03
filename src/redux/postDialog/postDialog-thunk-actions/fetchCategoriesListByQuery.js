import PostDialogActionTypes from '../postDialog.types';
import { stokkApi as api, queryString } from '../../../utils/api';

export const fetchCategoriesListByQueryStarted = () => ({
  type: PostDialogActionTypes.FETCH_CATEGORIES_LIST_BY_QUERY_START,
});

export const fetchCategoriesListByQuerySuccess = (categoriesList) => ({
  type: PostDialogActionTypes.FETCH_CATEGORIES_LIST_BY_QUERY_SUCCESS,
  payload: categoriesList,
});

export const fetchCategoriesListByQueryFaliure = (error) => ({
  type: PostDialogActionTypes.FETCH_CATEGORIES_LIST_BY_QUERY_FALIURE,
  payload: error,
});

export const fetchCategoriesListByQueryAsync = (
  token,
  queryText,
  limit = 5
) => {
  return async (dispatch) => {
    dispatch(fetchCategoriesListByQueryStarted());
    const queryParams = queryString({
      page: 1,
      limit,
      orderBy: 'title',
      order: 'asc',
      q: queryText,
    });
    const response = await api(`api/categories?${queryParams}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.error) {
      dispatch(fetchCategoriesListByQueryFaliure(response.error));
    } else if (response.total) {
      const list = response.data.map((row) => ({
        name: row.title,
        id: row.id,
      }));
      dispatch(fetchCategoriesListByQuerySuccess(list));
    } else {
      dispatch(fetchCategoriesListByQuerySuccess([]));
    }
  };
};
