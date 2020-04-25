import { createSelector } from 'reselect';

const selectUserReducer = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUserReducer],
  (user) => user.currentUser
);

export const selectCurrentUserToken = createSelector(
  [selectCurrentUser],
  (currentUser) => currentUser.token
);
