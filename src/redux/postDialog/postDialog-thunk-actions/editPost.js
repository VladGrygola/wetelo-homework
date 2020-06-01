import camelcaseKeys from 'camelcase-keys';
import { objectToFormData } from 'object-to-formdata';
import PostDialogActionTypes from '../postDialog.types';
import { updatePost } from '../../gallery/gallery.actions';

import { stokkApi as api } from '../../../utils/api';

export const editPostStart = () => ({
  type: PostDialogActionTypes.EDIT_POST_START,
});

export const editPostSuccess = (responde) => ({
  type: PostDialogActionTypes.EDIT_POST_SUCCESS,
  payload: responde,
});

export const editPostFaliure = (error) => ({
  type: PostDialogActionTypes.EDIT_POST_FALIURE,
  payload: error,
});

export const editPostAsync = (token, post, id) => {
  return async (dispatch) => {
    dispatch(editPostStart());
    const body = objectToFormData(post);
    try {
      const response = await api(`api/posts/${id}`, {
        method: 'PUT',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.model) {
        dispatch(editPostSuccess(camelcaseKeys(response.model)));
        dispatch(updatePost(camelcaseKeys(response.model)));
      } else dispatch(editPostFaliure(response));
    } catch (e) {
      dispatch(editPostFaliure(e));
    }
  };
};
