import { handleActions } from 'redux-actions';

import CategoriesActionTypes from './categories.types';

const defaultState = {
  categories: [],
  loading: true,
  fetchError: null,
  addError: null,
  updataError: null,
  deleteError: null,
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
      fetchError: null,
      categories: payload.categories,
      queryResponse: payload.queryResponse,
    }),
    [CategoriesActionTypes.FETCH_CATEGORIES_FALIURE]: (state, { payload }) => ({
      ...state,
      loading: false,
      fetchError: payload,
    }),
    [CategoriesActionTypes.ADD_CATEGORY_START]: (state) => ({
      ...state,
      loading: true,
    }),
    [CategoriesActionTypes.ADD_CATEGORY_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      addError: null,
      categories: [...state.categories, payload],
    }),
    [CategoriesActionTypes.ADD_CATEGORY_FALIURE]: (state, { payload }) => ({
      ...state,
      loading: false,
      addError: payload,
    }),
    [CategoriesActionTypes.DELETE_CATEGORY_START]: (state) => ({
      ...state,
      loading: true,
    }),
    [CategoriesActionTypes.DELETE_CATEGORY_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      deleteError: null,
      categories: [
        ...state.categories.filter(
          (c) => parseInt(c.id, 10) !== parseInt(payload, 10)
        ),
      ],
    }),
    [CategoriesActionTypes.DELETE_CATEGORY_FALIURE]: (state, { payload }) => ({
      ...state,
      loading: false,
      deleteError: payload,
    }),
    [CategoriesActionTypes.DELETE_CATEGORIES_START]: (state) => ({
      ...state,
      loading: true,
    }),
    [CategoriesActionTypes.DELETE_CATEGORIES_SUCCESS]: (
      state,
      { payload }
    ) => ({
      ...state,
      loading: false,
      deleteError: null,
      categories: [
        ...state.categories.filter(
          (c) => !payload.some((id) => parseInt(c.id, 10) === parseInt(id, 10))
        ),
      ],
    }),
    [CategoriesActionTypes.DELETE_CATEGORIES_FALIURE]: (
      state,
      { payload }
    ) => ({
      ...state,
      loading: false,
      deleteError: payload,
    }),
    [CategoriesActionTypes.UPDATE_CATEGORY_START]: (state) => ({
      ...state,
      loading: true,
    }),
    [CategoriesActionTypes.UPDATE_CATEGORY_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      updateError: null,
      categories: [
        ...state.categories.filter((category) => category.id !== payload.id),
        payload,
      ],
    }),
    [CategoriesActionTypes.UPDATE_CATEGORY_FALIURE]: (state, { payload }) => ({
      ...state,
      loading: false,
      updateError: payload,
    }),
  },
  defaultState
);

export default categoriesReducer;
