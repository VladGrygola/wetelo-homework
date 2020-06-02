import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUserToken } from '../../redux/user/user.selectors';
import { selectIdsOfSelectedPosts } from '../../redux/gallery/gallery.selectors';
import { setDeletingMode as setDeletingModeAction } from '../../redux/gallery/gallery.actions';
import { deletePostsAsync } from '../../redux/gallery/gallery-thunk-actions/deletePosts';

import MultiDeleteDialog from './MultiDeleteDialog';

const mapStateToProps = createStructuredSelector({
  userToken: selectCurrentUserToken,
  idsOfSelectedPosts: selectIdsOfSelectedPosts,
});

const mapDispatchtoProps = (dispatch) => ({
  deletePosts: (token, ids) => dispatch(deletePostsAsync(token, ids)),
  setDeletingMode: (value) => dispatch(setDeletingModeAction(value)),
});

const MultiDeleteDialogContainer = connect(
  mapStateToProps,
  mapDispatchtoProps
)(MultiDeleteDialog);

export default MultiDeleteDialogContainer;
