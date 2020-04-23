import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Container,
  Hidden,
} from '@material-ui/core';

import useStyles from './Header.styles';

import { ReactComponent as Logo } from '../../logo.svg';

import { removeCurrentUser } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

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
                <div className={classes.navigation}>
                  <Button
                    color='inherit'
                    to='/categories'
                    component={RouterLink}
                  >
                    Categories
                  </Button>
                </div>
                <div className={classes.signOut}>
                  <Hidden xsDown>
                    <Typography variant='subtitle1' className={classes.title}>
                      Welcome,&nbsp;
                      {currentUser.firstName}
                    </Typography>
                  </Hidden>
                  <Button onClick={signOut} color='inherit'>
                    Sign Out
                  </Button>
                </div>
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

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

const mapDispatchToProps = {
  signOut: removeCurrentUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
