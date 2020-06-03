import React from 'react';

import { Container } from '@material-ui/core';

const NotAuthorizedPage = () => {
  return (
    <Container>
      <h2>You are not authorized</h2>
      <p>You need to sign in or sign up to continue</p>
    </Container>
  );
};

export default NotAuthorizedPage;
