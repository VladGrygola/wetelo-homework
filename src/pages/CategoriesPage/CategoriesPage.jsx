import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Container, Paper } from '@material-ui/core';

import useStyles from './CategoriesPage.styles';

import { fetchCategoriesAsync } from '../../redux/categories/categories-thunk-actions/fetchCategories';
import { selectCurrentUser } from '../../redux/user/user.selectors';
import {
  selectCategories,
  selectErrorMessage,
} from '../../redux/categories/categories.selectors';

import CategoriesListContainer from '../../components/CategoriesList/CategoriesList.container';
import CategoriesListSerchToolsContainer from '../../components/CategoriesListSerchTools/CategoriesListSerchTools.container';

const CategoriesPage = ({ user, fetchCategoriesRedux }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchCategoriesRedux(user.token);
  }, [fetchCategoriesRedux, user]);

  return (
    <Container>
      <Paper className={classes.categoriesTable}>
        <CategoriesListSerchToolsContainer />
        <CategoriesListContainer userToken={user.token} />
      </Paper>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  user: selectCurrentUser(state),
  categoriesRedux: selectCategories(state),
  errorMessage: selectErrorMessage(state),
});

const mapDispatchtoProps = (dispatch) => ({
  fetchCategoriesRedux: (token) => dispatch(fetchCategoriesAsync(token)),
});

export default connect(mapStateToProps, mapDispatchtoProps)(CategoriesPage);
