import React from 'react';
import PropTypes from 'prop-types';
import { TextField, Typography } from '@material-ui/core';

const TextFieldWithError = ({
  isVisibleError,
  errorMessage,
  ...textFieldProps
}) => (
  <>
    <TextField {...textFieldProps} />
    {isVisibleError ? (
      <Typography color='error'>{errorMessage}</Typography>
    ) : null}
  </>
);

TextFieldWithError.propTypes = {
  isVisibleError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
};

TextFieldWithError.defaultProps = {
  errorMessage: '',
};

export default TextFieldWithError;
