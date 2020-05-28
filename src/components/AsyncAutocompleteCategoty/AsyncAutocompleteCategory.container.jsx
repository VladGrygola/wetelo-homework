import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  selectCategoriesList,
  selectErrorMessage,
  selectIsCategoriesListLoading,
} from '../../redux/postDialog/postDialog.selectors';

import { selectCurrentUserToken } from '../../redux/user/user.selectors';

import { fetchCategoriesListByQueryAsync } from '../../redux/postDialog/postDialog-thunk-actions/fetchCategoriesListByQuery';

import AsyncAutocompleteCategory from './AsyncAutocompleteCategory';

const mapStateToProps = createStructuredSelector({
  categories: selectCategoriesList,
  fetchingErrorMessage: selectErrorMessage,
  isLoading: selectIsCategoriesListLoading,
  userToken: selectCurrentUserToken,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoriesListByQuery: (...args) =>
    dispatch(fetchCategoriesListByQueryAsync(...args)),
});

const AsyncAutocompleteCategoryContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AsyncAutocompleteCategory);

export default AsyncAutocompleteCategoryContainer;
