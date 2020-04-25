import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import categoriesReducer from './categories/categories.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

export default persistReducer(persistConfig, rootReducer);
