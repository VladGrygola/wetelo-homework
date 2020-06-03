import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './WithPreloader.styles';

const WithPreloader = (WrappedComponent) => {
  const Preloader = ({ isLoading, ...otherProps }) => {
    Preloader.propTypes = {
      isLoading: PropTypes.bool.isRequired,
    };
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
