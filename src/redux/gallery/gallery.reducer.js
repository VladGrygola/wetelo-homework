import { handleActions } from 'redux-actions';

import GalleryActionTypes from './gallery.types';

const defaultState = {
  posts: [],
  deletingMode: false,
  idsOfSelectedPosts: [],
  isLoadingPosts: true,
  isLoadingNextPagePosts: false,
  isLoadingPostById: false,
  fetchError: null,
  fetchByIdError: null,
  deleteError: null,
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
    ) => {
      const filteredList = [];

      // Removing old data that now can be edited
      state.posts.forEach((post) => {
        if (!payload.posts.some((some) => some.id === post.id)) {
          filteredList.push(post);
        }
      });

      return {
        ...state,
        isLoadingNextPagePosts: false,
        fetchError: null,
        posts: [...filteredList, ...payload.posts],
        queryResponse: payload.queryResponse,
        queryParams: { ...state.queryParams, page: state.queryParams.page + 1 },
      };
    },
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
    [GalleryActionTypes.APPEND_POST]: (state, { payload }) => {
      return {
        ...state,
        posts: [...state.posts, payload],
      };
    },
    [GalleryActionTypes.DELETE_POST_START]: (state) => ({
      ...state,
      isLoadingPostById: true,
    }),
    [GalleryActionTypes.DELETE_POST_FALIURE]: (state, { payload }) => ({
      ...state,
      isLoadingPostById: false,
      deleteError: payload,
    }),
    [GalleryActionTypes.DELETE_POST_SUCCESS]: (state, { payload }) => ({
      ...state,
      isLoadingPostById: false,
      deleteError: null,
      posts: state.posts.filter((p) => p.id !== payload),
    }),
    [GalleryActionTypes.SET_IDS_OF_SELECTED_POSTS]: (state, { payload }) => ({
      ...state,
      idsOfSelectedPosts: payload,
    }),
    [GalleryActionTypes.SET_DELETING_MODE]: (state, { payload }) => ({
      ...state,
      deletingMode: payload,
    }),
    [GalleryActionTypes.DELETE_POSTS_START]: (state) => ({
      ...state,
      isLoadingPosts: true,
    }),
    [GalleryActionTypes.DELETE_POSTS_SUCCESS]: (state, { payload }) => ({
      ...state,
      isLoadingPosts: false,
      deleteError: null,
      posts: state.posts.filter(
        (post) =>
          !payload.some((id) => parseInt(post.id, 10) === parseInt(id, 10))
      ),
    }),
    [GalleryActionTypes.DELETE_POSTS_FALIURE]: (state, { payload }) => ({
      ...state,
      isLoadingPosts: false,
      deleteError: payload,
    }),
  },
  defaultState
);

export default galleryReducer;
