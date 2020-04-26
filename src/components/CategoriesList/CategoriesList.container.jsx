import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CategoriesList from './CategoriesList';
import WithPreloader from '../WithPreloader/WithPreloader';

import { fetchCategoriesAsync } from '../../redux/categories/categories-thunk-actions/fetchCategories';
import { addCategoryAsync } from '../../redux/categories/categories-thunk-actions/addCategory';
import { deleteCategoryAsync } from '../../redux/categories/categories-thunk-actions/deleteCategory';
import { deleteCategoriesAsync } from '../../redux/categories/categories-thunk-actions/deleteCategories';
import { updateCategoryAsync } from '../../redux/categories/categories-thunk-actions/updateCategory';
import { setFetchParams } from '../../redux/categories/categories.actions';

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
});

const mapDispatchToProps = (dispatch) => ({
  fetchCategoriesRedux: (token, params) =>
    dispatch(fetchCategoriesAsync(token, params)),
  setQueryParams: (params) => dispatch(setFetchParams(params)),
  addCategoryRedux: (token, title) => dispatch(addCategoryAsync(token, title)),
  deleteCategoryRedux: (token, id) => dispatch(deleteCategoryAsync(token, id)),
  deleteCategoriesRedux: (token, ids) =>
    dispatch(deleteCategoriesAsync(token, ids)),
  updateCategoryRedux: (token, category) =>
    dispatch(updateCategoryAsync(token, category)),
});

const CategoriesListContainer = compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithPreloader
)(CategoriesList);

export default CategoriesListContainer;
