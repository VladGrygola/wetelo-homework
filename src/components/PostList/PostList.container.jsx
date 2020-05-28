import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import PostList from './PostList';

const mapStateToProps = null;

const mapDispatchToProps = null;

const PostListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);

export default PostListContainer;
