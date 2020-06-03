import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchCategoriesAsync } from '../../redux/categories/categories-thunk-actions/fetchCategories';
import { selectCurrentUserToken } from '../../redux/user/user.selectors';

import CategoriesPage from './CategoriesPage';

const mapStateToProps = createStructuredSelector({
  userToken: selectCurrentUserToken,
});

const mapDispatchtoProps = (dispatch) => ({
  fetchCategories: (token) => dispatch(fetchCategoriesAsync(token)),
});

const CategoriesPageContainer = connect(
  mapStateToProps,
  mapDispatchtoProps
)(CategoriesPage);

export default CategoriesPageContainer;
