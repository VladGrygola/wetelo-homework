import GalleryActionTypes from './gallery.types';

export const setFetchParams = (params) => ({
  type: GalleryActionTypes.SET_POSTS_FETCH_PARAMS,
  payload: params,
});

export const updatePost = (post) => ({
  type: GalleryActionTypes.UPDATE_POST,
  payload: post,
});
