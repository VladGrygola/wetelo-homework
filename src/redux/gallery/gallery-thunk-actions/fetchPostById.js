import camelcaseKeys from 'camelcase-keys';
import GalleryActionTypes from '../gallery.types';
import { stokkApi as api } from '../../../utils/api';

export const fetchPostByIdStarted = () => ({
  type: GalleryActionTypes.FETCH_POSTS_BY_ID_START,
});

export const fetchPostByIdSuccess = (post) => ({
  type: GalleryActionTypes.FETCH_POSTS_BY_ID_SUCCESS,
  payload: post,
});

export const fetchPostByIdFailure = (error) => ({
  type: GalleryActionTypes.FETCH_NEXT_PAGE_POSTS_FALIURE,
  payload: error,
});

export const fetchPostByIdNotFound = (id) => ({
  type: GalleryActionTypes.FETCH_POSTS_BY_ID_NOT_FOUND,
  payload: id,
});

export const fetchPostByIdAsync = (token, id) => {
  return async (dispatch) => {
    dispatch(fetchPostByIdStarted());
    try {
      const response = await api(`api/posts/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.error) dispatch(fetchPostByIdFailure(response.error));
      else if (response.model === null) {
        dispatch(fetchPostByIdNotFound(id));
      } else if (response.model) {
        dispatch(fetchPostByIdSuccess(camelcaseKeys(response.model)));
      }
    } catch (error) {
      dispatch(fetchPostByIdFailure(error));
    }
  };
};
