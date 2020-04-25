import { handleActions } from 'redux-actions';

import UserActionTypes from './user.types';

const defaultState = {
  currentUser: null,
};

const userReducer = handleActions(
  {
    [UserActionTypes.SET_CURRENT_USER]: (state, { payload }) => ({
      ...state,
      currentUser: payload,
    }),
    [UserActionTypes.REMOVE_CURRENT_USER]: (state) => ({
      ...defaultState,
    }),
  },
  defaultState
);

export default userReducer;
