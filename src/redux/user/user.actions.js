import { createAction } from 'redux-actions';

import UserActionTypes from './user.types';

export const setCurrentUser = createAction(
  UserActionTypes.SET_CURRENT_USER,
  (user) => user
);

export const removeCurrentUser = createAction(
  UserActionTypes.REMOVE_CURRENT_USER
);
