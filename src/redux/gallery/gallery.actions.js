import GalleryActionTypes from './gallery.types';

export const setFetchParams = (params) => ({
  type: GalleryActionTypes.SET_POSTS_FETCH_PARAMS,
  payload: params,
});

export const updatePost = (post) => ({
  type: GalleryActionTypes.UPDATE_POST,
  payload: post,
});

export const appendPost = (post) => ({
  type: GalleryActionTypes.APPEND_POST,
  payload: post,
});

export const setIdsOfSelectedPosts = (list) => ({
  type: GalleryActionTypes.SET_IDS_OF_SELECTED_POSTS,
  payload: list,
});

export const setDeletingMode = (value) => ({
  type: GalleryActionTypes.SET_DELETING_MODE,
  payload: value,
});
