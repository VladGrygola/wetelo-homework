import { handleActions } from 'redux-actions';

import GalleryActionTypes from './gallery.types';

const defaultState = {
  posts: [],
  loading: true,
  fetchError: null,
  addError: null,
  updateError: null,
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

const galleryReducer = handleActions(
  {
    [GalleryActionTypes.SET_POSTS_FETCH_PARAMS]: (state, { payload }) => ({
      ...state,
      queryParams: payload,
    }),
    [GalleryActionTypes.FETCH_POSTS_START]: (state) => ({
      ...state,
      loading: true,
    }),
    [GalleryActionTypes.FETCH_POSTS_SUCCESS]: (state, { payload }) => ({
      ...state,
      loading: false,
      fetchError: null,
      posts: payload.posts,
      queryResponse: payload.queryResponse,
    }),
    [GalleryActionTypes.FETCH_POSTS_FALIURE]: (state, { payload }) => ({
      ...state,
      loading: false,
      fetchError: payload,
    }),
  },
  defaultState
);

export default galleryReducer;
