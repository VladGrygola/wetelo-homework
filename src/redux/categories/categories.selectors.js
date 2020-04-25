import { createSelector } from 'reselect';
import { path } from 'ramda';

const selectCategoriesReducer = (state) => state.categories;

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categories) => categories.categories
);

export const selectErrorMessage = createSelector(
  [selectCategoriesReducer],
  (categories) => path[(['error', 'message'], categories)]
);

export const selectIsCategoriesLoading = createSelector(
  [selectCategoriesReducer],
  (categories) => categories.loading
);

export const selectQueryResponse = createSelector(
  [selectCategoriesReducer],
  (categories) => categories.queryResponse
);

export const selectQueryParams = createSelector(
  [selectCategoriesReducer],
  (categories) => categories.queryParams
);
