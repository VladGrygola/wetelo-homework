import { createSelector } from 'reselect';
import { path } from 'ramda';

const selectPostDialogReducer = (state) => state.postDialog;

export const selectCategoriesList = createSelector(
  [selectPostDialogReducer],
  (postDialog) => postDialog.categories
);

export const selectIsCategoriesListLoading = createSelector(
  [selectPostDialogReducer],
  (postDialog) => postDialog.isLoadingCategoriesList
);

export const selectIsSubmitting = createSelector(
  [selectPostDialogReducer],
  (postDialog) => postDialog.isSubmitting
);

export const selectErrorMessage = createSelector(
  [selectPostDialogReducer],
  (postDialog) => path[(['loadingCategoriesListError', 'message'], postDialog)]
);

export const selectSubmittingError = createSelector(
  [selectPostDialogReducer],
  (postDialog) => postDialog.submittingError
);
