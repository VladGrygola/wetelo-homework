import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectDeletingMode,
  selectIdsOfSelectedPosts,
} from '../../redux/gallery/gallery.selectors';
import { setIdsOfSelectedPosts as setIdsOfSelectedPostsAction } from '../../redux/gallery/gallery.actions';

import PostListItem from './PostListItem';

const mapStateToProps = createStructuredSelector({
  deletingMode: selectDeletingMode,
  idsOfSelectedPosts: selectIdsOfSelectedPosts,
});

const mapDispatchtoProps = (dispatch) => ({
  setIdsOfSelectedPosts: (list) => dispatch(setIdsOfSelectedPostsAction(list)),
});

const PostListItemContainer = connect(
  mapStateToProps,
  mapDispatchtoProps
)(PostListItem);

export default PostListItemContainer;
