import React from 'react';
import PropTypes from 'prop-types';
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
        accept='image/jpeg'
        style={{ display: 'none' }}
      />
    </Button>
    {errorMessage && <Typography color='error'>{errorMessage}</Typography>}
  </>
);

ImageUploadButton.propTypes = {
  name: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  variant: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

ImageUploadButton.defaultProps = {
  errorMessage: undefined,
  variant: undefined,
};

export default ImageUploadButton;
