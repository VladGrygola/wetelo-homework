import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './WithPreloader.styles';

const WithPreloader = (WrappedComponent) => {
  const Preloader = ({ isLoading, ...otherProps }) => {
    const classes = useStyles();
    return isLoading ? (
      <div className={classes.root}>
        <CircularProgress />
      </div>
    ) : (
      <WrappedComponent {...otherProps} />
    );
  };
  return Preloader;
};

export default WithPreloader;
