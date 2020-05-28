import { handleActions } from 'redux-actions';

import PostDialogActionTypes from './postDialog.types';

const defaultState = {
  categories: [],
  isLoadingCategoriesList: false,
  loadingCategoriesListError: null,

  isSubmitting: false,
  submittingError: null,
};

const postDialogReducer = handleActions(
  {
    [PostDialogActionTypes.FETCH_CATEGORIES_LIST_BY_QUERY_START]: (state) => ({
      ...state,
      isLoadingCategoriesList: true,
    }),
    [PostDialogActionTypes.FETCH_CATEGORIES_LIST_BY_QUERY_SUCCESS]: (
      state,
      { payload }
    ) => ({
      ...state,
      categories: payload,
      isLoadingCategoriesList: false,
      loadingCategoriesListError: null,
    }),
    [PostDialogActionTypes.FETCH_CATEGORIES_LIST_BY_QUERY_FALIURE]: (
      state,
      { payload }
    ) => ({
      ...state,
      isLoadingCategoriesList: false,
      loadingCategoriesListError: payload,
    }),
    [PostDialogActionTypes.ADD_POST_STRART]: (state) => ({
      ...state,
      isSubmitting: true,
    }),
    [PostDialogActionTypes.ADD_POST_SUCCESS]: (state) => ({
      isSubmitting: false,
      submittingError: null,
    }),
    [PostDialogActionTypes.ADD_POST_FALIURE]: (state, { payload }) => ({
      isSubmitting: false,
      submittingError: payload,
    }),
  },
  defaultState
);

export default postDialogReducer;
