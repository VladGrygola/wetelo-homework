import { handleActions } from 'redux-actions';

import CategoriesActionTypes from './categories.types';

const defaultState = {
  categories: [],
  loading: true,
  error: null,
  queryResponse: null,
  queryParams: {
    page: 1,
    limit: 5,
    orderBy: 'title',
    order: 'asc',
    q: '',
  },
};

const categoriesReducer = handleActions(
  {
    [CategoriesActionTypes.SET_FETCH_PARAMS]: (state, { payload }) => ({
      ...state,
      queryParams: payload,
    }),
    [CategoriesActionTypes.FETCH_CATEGORIES_START]: (state) => ({
      ...state,
      loading: true,
    }),
    [CategoriesActionTypes.FETCH_CATEGORIES_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: null,
      categories: payload.categories,
      queryResponse: payload.queryResponse,
    }),
    [CategoriesActionTypes.FETCH_CATEGORIES_FALIURE]: (state, { payload }) => ({
      ...state,
      loading: false,
      error: payload,
    }),
  },
  defaultState
);

export default categoriesReducer;
