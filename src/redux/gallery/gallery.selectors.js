import { createSelector } from 'reselect';
import { path } from 'ramda';

const selectGalleryReducer = (state) => state.gallery;

export const selectImages = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.images
);

export const selectErrorMessage = createSelector(
  [selectGalleryReducer],
  (gallery) => path[(['error', 'message'], gallery)]
);

export const selectIsCategoriesLoading = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.loading
);

export const selectQueryResponse = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.queryResponse
);

export const selectQueryParams = createSelector(
  [selectGalleryReducer],
  (gallery) => gallery.queryParams
);
