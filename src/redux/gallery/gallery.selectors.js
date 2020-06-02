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

export const selectIsLoadingPostById = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.isLoadingPostById
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

export const selectNotFoundList = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.notFoundList
);

export const selectDeletingMode = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.deletingMode
);

export const selectIdsOfSelectedPosts = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.idsOfSelectedPosts
);

export const selectThereAreSelectedPosts = createSelector(
  [selectGalleryReducer],
  (gallery) => !!gallery.idsOfSelectedPosts.length
);
