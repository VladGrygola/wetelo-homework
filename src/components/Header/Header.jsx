import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
} from '@material-ui/core';

import useStyles from './Header.styles';

import { ReactComponent as Logo } from '../../logo.svg';

const Header = ({ currentUser, signOut }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Container>
          <Toolbar>
            <IconButton
              edge='start'
              className={classes.menuButton}
              color='inherit'
              aria-label='menu'
              to='/'
              component={RouterLink}
            >
              <Logo fill='white' width='40' height='40' />
            </IconButton>
            <Typography variant='h6' className={classes.title}>
              Stokk App
            </Typography>
            {currentUser ? (
              <>
                <Typography variant='h6' className={classes.title}>
                  Welcome,&nbsp;
                  {currentUser.firstName}
                </Typography>
                <Button onClick={signOut} color='inherit'>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button color='inherit' to='/signin' component={RouterLink}>
                  Sign In
                </Button>
                <Button color='inherit' to='/signup' component={RouterLink}>
                  Sign Up
                </Button>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

Header.propTypes = {
  currentUser: PropTypes.instanceOf(Object),
  signOut: PropTypes.func.isRequired,
};

Header.defaultProps = {
  currentUser: null,
};

export default Header;
