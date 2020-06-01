import { handleActions } from 'redux-actions';

import GalleryActionTypes from './gallery.types';

const defaultState = {
  posts: [],
  isLoadingPosts: true,
  isLoadingNextPagePosts: false,
  isLoadingPostById: false,
  fetchError: null,
  fetchByIdError: null,
  notFoundList: [],
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
      queryParams: { ...state.queryParams, page: payload.queryResponse.page },
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
    [GalleryActionTypes.FETCH_POSTS_BY_ID_START]: (state) => ({
      ...state,
      isLoadingPostById: true,
    }),
    [GalleryActionTypes.FETCH_POSTS_BY_ID_SUCCESS]: (state, { payload }) => ({
      ...state,
      isLoadingPostById: false,
      fetchByIdError: null,
      posts: [...state.posts, payload],
    }),
    [GalleryActionTypes.FETCH_POSTS_BY_ID_FALIURE]: (state, { payload }) => ({
      ...state,
      isLoadingPostById: false,
      fetchByIdError: payload,
    }),
    [GalleryActionTypes.FETCH_POSTS_BY_ID_NOT_FOUND]: (state, { payload }) => ({
      ...state,
      notFoundList: [...state.notFoundList, payload],
      isLoadingPostById: false,
    }),
    [GalleryActionTypes.UPDATE_POST]: (state, { payload }) => {
      const posts = state.posts.filter((post) => post.id !== payload.id);
      return {
        ...state,
        posts: [...posts, payload],
      };
    },
  },
  defaultState
);

export default galleryReducer;
