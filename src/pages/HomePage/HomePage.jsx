import React from 'react';
import PropTypes from 'prop-types';

import Container from '@material-ui/core/Container';

const HomePage = ({ currentUser }) => {
  return (
    <Container>
      {currentUser ? (
        <h2>Homapage</h2>
      ) : (
        <h2>You need to sign in or sign up</h2>
      )}
    </Container>
  );
};

HomePage.propTypes = {
  currentUser: PropTypes.instanceOf(Object),
};

HomePage.defaultProps = {
  currentUser: null,
};

export default HomePage;
