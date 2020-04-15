import React from 'react';
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

export default TextFieldWithError;
