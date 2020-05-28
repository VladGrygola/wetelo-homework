import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setFetchParams } from '../../redux/gallery/gallery.actions';

import { selectQueryParams } from '../../redux/gallery/gallery.selectors';

import PostListSearchTools from './PostListSearchTools';

const mapStateToProps = createStructuredSelector({
  queryParams: selectQueryParams,
});

const mapDispatchToProps = (dispatch) => ({
  setQueryParams: (params) => dispatch(setFetchParams(params)),
});

const PostListSearchToolsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListSearchTools);

export default PostListSearchToolsContainer;
