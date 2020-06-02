import GalleryActionTypes from '../gallery.types';
import { stokkApi as api, queryStringFromArray } from '../../../utils/api';

export const deletePostsStarted = () => ({
  type: GalleryActionTypes.DELETE_POSTS_START,
});

export const deletePostsSuccess = (ids) => ({
  type: GalleryActionTypes.DELETE_POST_SUCCESS,
  payload: ids,
});

export const deletePostsFailure = (error) => ({
  type: GalleryActionTypes.DELETE_POSTS_FALIURE,
  payload: error,
});

export const deletePostsAsync = (token, ids) => {
  return async (dispatch) => {
    dispatch(deletePostsStarted());
    try {
      const response = await api(`api/posts?ids=${queryStringFromArray(ids)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-type': 'application/json; charset=utf-8',
        },
      });
      if (response.data) dispatch(deletePostsSuccess(ids));
      else dispatch(deletePostsFailure(response));
    } catch (error) {
      dispatch(deletePostsFailure(error));
    }
  };
};
