import GalleryActionTypes from '../gallery.types';
import { stokkApi as api } from '../../../utils/api';

export const deletePostStarted = () => ({
  type: GalleryActionTypes.DELETE_POST_START,
});

export const deletePostSuccess = (id) => ({
  type: GalleryActionTypes.DELETE_POST_SUCCESS,
  payload: id,
});

export const deletePostFailure = (error) => ({
  type: GalleryActionTypes.DELETE_POST_FALIURE,
  payload: error,
});

export const deletePostAsync = (token, id) => {
  return async (dispatch) => {
    dispatch(deletePostStarted());
    try {
      const response = await api(`api/posts/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.model) dispatch(deletePostSuccess(response.model.id));
      else dispatch(deletePostFailure(response));
    } catch (error) {
      console.log(error);
      dispatch(deletePostFailure(error));
    }
  };
};
