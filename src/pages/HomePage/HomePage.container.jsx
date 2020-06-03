import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUserToken } from '../../redux/user/user.selectors';
import {
  selectDeletingMode,
  selectThereAreSelectedPosts,
} from '../../redux/gallery/gallery.selectors';
import { fetchPostsAsync } from '../../redux/gallery/gallery-thunk-actions/fetchPosts';
import {
  setDeletingMode as setDeletingModeAction,
  setIdsOfSelectedPosts as setIdsOfSelectedPostsAction,
} from '../../redux/gallery/gallery.actions';

import HomePage from './HomePage';

const mapStateToProps = createStructuredSelector({
  userToken: selectCurrentUserToken,
  deletingMode: selectDeletingMode,
  selectedPosts: selectThereAreSelectedPosts,
});

const mapDispatchtoProps = (dispatch) => ({
  fetchPosts: (token) => dispatch(fetchPostsAsync(token)),
  setDeletingMode: (value) => dispatch(setDeletingModeAction(value)),
  setIdsOfSelectedPosts: (list) => dispatch(setIdsOfSelectedPostsAction(list)),
});

const HomePageContainer = connect(
  mapStateToProps,
  mapDispatchtoProps
)(HomePage);

export default HomePageContainer;
