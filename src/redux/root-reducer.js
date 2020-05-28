import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import userReducer from './user/user.reducer';
import categoriesReducer from './categories/categories.reducer';
import galleryReducer from './gallery/gallery.reducer';
import postDialogReducer from './postDialog/postDialog.reducer';

const rootReducer = combineReducers({
  user: userReducer,
  categories: categoriesReducer,
  gallery: galleryReducer,
  postDialog: postDialogReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

export default persistReducer(persistConfig, rootReducer);
