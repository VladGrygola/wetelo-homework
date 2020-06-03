import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectIsSubmitting,
  selectSubmittingError,
} from '../../redux/postDialog/postDialog.selectors';

import { selectCurrentUserToken } from '../../redux/user/user.selectors';

import { addPostAsync } from '../../redux/postDialog/postDialog-thunk-actions/addPost';
import { editPostAsync } from '../../redux/postDialog/postDialog-thunk-actions/editPost';

import PostFormDialog from './PostFormDialog';

const mapStateToProps = createStructuredSelector({
  isSubmittingQuery: selectIsSubmitting,
  error: selectSubmittingError,
  userToken: selectCurrentUserToken,
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (token, post) => dispatch(addPostAsync(token, post)),
  editPost: (userToken, body, id) =>
    dispatch(editPostAsync(userToken, body, id)),
});

const PostFormDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFormDialog);

export default PostFormDialogContainer;
