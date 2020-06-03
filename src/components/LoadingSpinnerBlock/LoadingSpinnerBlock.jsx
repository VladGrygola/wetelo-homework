import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';

const LoadingSpinnerBlock = () => {
  return (
    <Grid
      container
      justify='center'
      alignItems='center'
      style={{ height: '100px' }}
    >
      <CircularProgress />
    </Grid>
  );
};

export default LoadingSpinnerBlock;
