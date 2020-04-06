import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container, Grid, Paper, Link } from '@material-ui/core';
import useStyles from './SignUpPage.styles';

import SignUpForm from '../../components/SignUpForm/SignUpForm';

const SignUpPage = ({ setCurrentUser }) => {
  const classes = useStyles();
  return (
    <Container>
      <Grid container direction='row' justify='center' alignItems='flex-start'>
        <Paper elevation={3} className={classes.SignUpContainer}>
          <SignUpForm setCurrentUser={setCurrentUser} />
        </Paper>
        <Paper elevation={3} className={classes.SignInLinkContainer}>
          Already have an account?&nbsp;
          <Link component={RouterLink} to='/signin'>
            Sign in
          </Link>
        </Paper>
      </Grid>
    </Container>
  );
};

SignUpPage.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
};

export default SignUpPage;
