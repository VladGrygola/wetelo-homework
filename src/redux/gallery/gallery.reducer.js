import { handleActions } from 'redux-actions';

import GalleryActionTypes from './gallery.types';

const defaultState = {
  posts: [],
  isLoadingPosts: true,
  isLoadingNextPagePosts: false,
  fetchError: null,
  queryResponse: null,
  queryParams: {
    page: 1,
    limit: 4,
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
      isLoadingPosts: true,
    }),
    [GalleryActionTypes.FETCH_POSTS_SUCCESS]: (state, { payload }) => ({
      ...state,
      isLoadingPosts: false,
      fetchError: null,
      posts: payload.posts,
      queryResponse: payload.queryResponse,
    }),
    [GalleryActionTypes.FETCH_POSTS_FALIURE]: (state, { payload }) => ({
      ...state,
      isLoadingPosts: false,
      fetchError: payload,
    }),
    [GalleryActionTypes.FETCH_NEXT_PAGE_POSTS_START]: (state) => ({
      ...state,
      isLoadingNextPagePosts: true,
    }),
    [GalleryActionTypes.FETCH_NEXT_PAGE_POSTS_SUCCESS]: (
      state,
      { payload }
    ) => ({
      ...state,
      isLoadingNextPagePosts: false,
      fetchError: null,
      posts: [...state.posts, ...payload.posts],
      queryResponse: payload.queryResponse,
      queryParams: { ...state.queryParams, page: state.queryParams.page + 1 },
    }),
    [GalleryActionTypes.FETCH_NEXT_PAGE_POSTS_FALIURE]: (
      state,
      { payload }
    ) => ({
      ...state,
      isLoadingNextPagePosts: false,
      fetchError: payload,
    }),
  },
  defaultState
);

export default galleryReducer;
