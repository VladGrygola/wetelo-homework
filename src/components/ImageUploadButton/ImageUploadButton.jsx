import React from 'react';
import { Typography, Button } from '@material-ui/core';

const ImageUploadButton = ({
  name,
  errorMessage,
  variant,
  disabled,
  ...otherProps
}) => (
  <>
    <Button variant={variant} component='label' disabled={disabled}>
      Upload Image
      <input
        name={name}
        id={name}
        {...otherProps}
        type='file'
        accept='image/*'
        style={{ display: 'none' }}
      />
    </Button>
    {errorMessage && <Typography color='error'>{errorMessage}</Typography>}
  </>
);

export default ImageUploadButton;
