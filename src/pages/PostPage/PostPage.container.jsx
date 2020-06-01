import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUserToken } from '../../redux/user/user.selectors';
import {
  selectPosts,
  selectIsLoadingPostById,
  selectNotFoundList,
} from '../../redux/gallery/gallery.selectors';

import { fetchPostByIdAsync } from '../../redux/gallery/gallery-thunk-actions/fetchPostById';

import PostPage from './PostPage';
import WithPreloader from '../../components/WithPreloader/WithPreloader';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoadingPostById,
  posts: selectPosts,
  userToken: selectCurrentUserToken,
  notFoundList: selectNotFoundList,
});

const mapDispatchtoProps = (dispatch) => ({
  fetchPostById: (token, id) => dispatch(fetchPostByIdAsync(token, id)),
});

const PostPageContainer = compose(
  connect(mapStateToProps, mapDispatchtoProps),
  WithPreloader
)(PostPage);

export default PostPageContainer;
