import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from './components/Header/Header';

import HomePage from './pages/HomePage/HomePage';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: null,
    };
  }

  setCurrentUser = (user, token) => {
    const { history } = this.props;
    this.setState({ currentUser: user });
    localStorage.setItem('authToken', JSON.stringify(token));
    history.push('/');
  };

  signOut = () => {
    const { history } = this.props;
    this.setState({ currentUser: null });
    localStorage.removeItem('authToken');
    history.push('/signin');
  };

  render() {
    const { currentUser } = this.state;
    return (
      <>
        <Header currentUser={currentUser} signOut={this.signOut} />
        <Switch>
          <Route
            exact
            path='/'
            component={() => <HomePage currentUser={currentUser} />}
          />
          <Route
            path='/signin'
            component={() => (
              <SignInPage setCurrentUser={this.setCurrentUser} />
            )}
          />
          <Route
            path='/signup'
            component={() => (
              <SignUpPage setCurrentUser={this.setCurrentUser} />
            )}
          />
        </Switch>
      </>
    );
  }
}

App.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default App;
