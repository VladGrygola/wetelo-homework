import { createSelector } from 'reselect';
import { path } from 'ramda';

const selectGalleryReducer = (state) => state.gallery;

export const selectPosts = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.posts
);

export const selectIsLoadingPosts = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.isLoadingPosts
);

export const selectisLoadingNextPagePosts = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.isLoadingNextPagePosts
);

export const selectErrorMessage = createSelector(
  [selectGalleryReducer],
  (gallery) => path[(['error', 'message'], gallery)]
);

export const selectQueryResponse = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.queryResponse
);

export const selectQueryParams = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.queryParams
);
