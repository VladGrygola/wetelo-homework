import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from './components/Header/Header';

import HomePageContainer from './pages/HomePage/HomePage.container';
import PostPageContainer from './pages/PostPage/PostPage.container';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
import NotAuthorizedPage from './pages/NotAuthorizedPage/NotAuthorizedPage';
import CategoriesPageContainer from './pages/CategoriesPage/CategoriesPage.container';

import { selectCurrentUser } from './redux/user/user.selectors';

const App = ({ currentUser }) => {
  return (
    <BrowserRouter>
      <Header />
      {currentUser ? (
        <Switch>
          <Route exact path='/' component={HomePageContainer} />
          <Route exact path='/gallery' component={HomePageContainer} />
          <Route exact path='/gallery/:id' component={PostPageContainer} />
          <Route path='/categories' component={CategoriesPageContainer} />
          <Route path='/signin' component={() => <Redirect to='/' />} />
          <Route path='/signup' component={() => <Redirect to='/' />} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path='/signin' component={SignInPage} />
          <Route exact path='/signup' component={SignUpPage} />
          <Route path='/' component={NotAuthorizedPage} />
        </Switch>
      )}
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
