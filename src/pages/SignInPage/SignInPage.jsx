import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Container, Grid, Paper, Link } from '@material-ui/core';
import useStyles from './SignInPage.styles';

import SignInForm from '../../components/SignInForm/SignInForm';

const SignInPage = ({ setCurrentUser }) => {
  const classes = useStyles();
  return (
    <Container>
      <Grid container direction='row' justify='center' alignItems='flex-start'>
        <Paper elevation={3} className={classes.SignUpContainer}>
          <SignInForm setCurrentUser={setCurrentUser} />
        </Paper>
        <Paper elevation={3} className={classes.SignInLinkContainer}>
          Don&apos;t have an account?&nbsp;
          <Link component={RouterLink} to='/signup'>
            Sign up
          </Link>
        </Paper>
      </Grid>
    </Container>
  );
};

SignInPage.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
};

export default SignInPage;
