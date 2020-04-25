import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { setFetchParams } from '../../redux/categories/categories.actions';

import { selectCurrentUser } from '../../redux/user/user.selectors';

import { selectQueryParams } from '../../redux/categories/categories.selectors';

import CategoriesListSerchTools from './CategoriesListSerchTools';

const mapStateToProps = createStructuredSelector({
  queryParams: selectQueryParams,
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setQueryParams: (params) => dispatch(setFetchParams(params)),
});

const CategoriesListSerchToolsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CategoriesListSerchTools);

export default CategoriesListSerchToolsContainer;
