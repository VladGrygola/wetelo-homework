import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import {
  selectIsLoadingPosts,
  selectisLoadingNextPagePosts,
  selectPosts,
  selectQueryParams,
  selectQueryResponse,
} from '../../redux/gallery/gallery.selectors';
import { selectCurrentUserToken } from '../../redux/user/user.selectors';
import { fetchPostsAsync } from '../../redux/gallery/gallery-thunk-actions/fetchPosts';
import { fetchNextPagePostsAsync } from '../../redux/gallery/gallery-thunk-actions/fetchNextPagePosts';

import PostList from './PostList';
import WithPreloader from '../WithPreloader/WithPreloader';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoadingPosts,
  isLoadingNextPagePosts: selectisLoadingNextPagePosts,
  posts: selectPosts,
  queryParams: selectQueryParams,
  userToken: selectCurrentUserToken,
  queryResponse: selectQueryResponse,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPosts: (userToken, params) =>
    dispatch(fetchPostsAsync(userToken, params)),
  fetchNextPagePosts: (token, currentQueryParams) =>
    dispatch(fetchNextPagePostsAsync(token, currentQueryParams)),
});

const PostListContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithPreloader
)(PostList);

export default PostListContainer;
