import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CategoriesList from './CategoriesList';
import WithPreloader from '../WithPreloader/WithPreloader';

import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  fetchCategoriesAsync,
  setFetchParams,
} from '../../redux/categories/categories.actions';

import {
  selectIsCategoriesLoading,
  selectCategories,
  selectErrorMessage,
  selectQueryResponse,
  selectQueryParams,
} from '../../redux/categories/categories.selectors';

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsCategoriesLoading,
  errorMessage: selectErrorMessage,
  categories: selectCategories,
  queryResponse: selectQueryResponse,
  queryParams: selectQueryParams,
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoriesRedux: (token, params) =>
    dispatch(fetchCategoriesAsync(token, params)),
  setQueryParams: (params) => dispatch(setFetchParams(params)),
});

const CategoriesListContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithPreloader
)(CategoriesList);

export default CategoriesListContainer;
