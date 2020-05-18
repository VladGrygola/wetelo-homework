import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setFetchParams } from '../../redux/categories/categories.actions';

import { selectQueryParams } from '../../redux/categories/categories.selectors';

import CategoriesListSearchTools from './CategoriesListSearchTools';

const mapStateToProps = createStructuredSelector({
  queryParams: selectQueryParams,
});

const mapDispatchToProps = (dispatch) => ({
  setQueryParams: (params) => dispatch(setFetchParams(params)),
});

const CategoriesListSearchToolsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesListSearchTools);

export default CategoriesListSearchToolsContainer;
