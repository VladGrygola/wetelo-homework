import { objectToFormData } from 'object-to-formdata';
import PostDialogActionTypes from '../postDialog.types';
import { stokkApi as api } from '../../../utils/api';

export const addPostStart = () => ({
  type: PostDialogActionTypes.ADD_POST_STRART,
});

export const addPostSuccess = (responde) => ({
  type: PostDialogActionTypes.ADD_POST_SUCCESS,
  payload: responde,
});

export const addPostFaliure = (error) => ({
  type: PostDialogActionTypes.ADD_POST_FALIURE,
  payload: error,
});

export const addPostAsync = (token, post) => {
  return async (dispatch) => {
    dispatch(addPostStart());
    const body = objectToFormData(post);
    try {
      const response = await api(`api/posts`, {
        method: 'POST',
        body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.model) dispatch(addPostSuccess(response.model));
      else dispatch(addPostFaliure(response));
    } catch (e) {
      dispatch(addPostFaliure(e));
    }
  };
};
