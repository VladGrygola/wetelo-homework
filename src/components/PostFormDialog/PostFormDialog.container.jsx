import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectIsSubmitting,
  selectSubmittingError,
} from '../../redux/postDialog/postDialog.selectors';

import { selectCurrentUserToken } from '../../redux/user/user.selectors';

import { addPostAsync } from '../../redux/postDialog/postDialog-thunk-actions/addPost';

import PostFormDialog from './PostFormDialog';

const mapStateToProps = createStructuredSelector({
  isSubmittingQuery: selectIsSubmitting,
  error: selectSubmittingError,
  userToken: selectCurrentUserToken,
});

const mapDispatchToProps = (dispatch) => ({
  addPost: (token, post) => dispatch(addPostAsync(token, post)),
});

const PostFormDialogContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFormDialog);

export default PostFormDialogContainer;
