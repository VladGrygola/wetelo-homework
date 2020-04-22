import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './components/Header/Header';

import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import NotAuthorizedPage from './pages/NotAuthorizedPage/NotAuthorizedPage';

import { selectCurrentUser } from './redux/user/user.selectors';

const App = ({ currentUser }) => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        {currentUser ? (
          <Route exact path='/' component={HomePage} />
        ) : (
          <Route exact path='/' component={NotAuthorizedPage} />
        )}
        <Route path='/signin' component={SignInPage} />
        <Route path='/signup' component={SignUpPage} />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  currentUser: PropTypes.instanceOf(Object),
};

App.defaultProps = {
  currentUser: null,
};

const mapStateToProps = (state) => ({
  currentUser: selectCurrentUser(state),
});

export default connect(mapStateToProps)(App);
