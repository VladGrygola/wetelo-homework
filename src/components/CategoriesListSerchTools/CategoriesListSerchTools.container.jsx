import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setFetchParams } from '../../redux/categories/categories.actions';

import { selectQueryParams } from '../../redux/categories/categories.selectors';

import CategoriesListSerchTools from './CategoriesListSerchTools';

const mapStateToProps = createStructuredSelector({
  queryParams: selectQueryParams,
});

const mapDispatchToProps = (dispatch) => ({
  setQueryParams: (params) => dispatch(setFetchParams(params)),
});

const CategoriesListSerchToolsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesListSerchTools);

export default CategoriesListSerchToolsContainer;
