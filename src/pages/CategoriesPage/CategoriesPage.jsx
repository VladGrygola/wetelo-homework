import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, Paper } from '@material-ui/core';

import CategoriesListContainer from '../../components/CategoriesList/CategoriesList.container';
import CategoriesListSearchToolsContainer from '../../components/CategoriesListSearchTools/CategoriesListSearchTools.container';

import useStyles from './CategoriesPage.styles';

const CategoriesPage = ({ userToken, fetchCategories }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchCategories(userToken);
  }, [fetchCategories, userToken]);

  return (
    <Container>
      <Paper className={classes.categoriesTable}>
        <CategoriesListSearchToolsContainer />
        <CategoriesListContainer userToken={userToken} />
      </Paper>
    </Container>
  );
};

CategoriesPage.propTypes = {
  userToken: PropTypes.string.isRequired,
  fetchCategories: PropTypes.func.isRequired,
};

export default CategoriesPage;
