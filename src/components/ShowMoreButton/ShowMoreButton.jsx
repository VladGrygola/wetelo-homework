import React from 'react';

import { Grid, Button } from '@material-ui/core';

import useStyles from './ShowMoreButton.styles';

const ShowMoreButton = ({ ...props }) => {
  const classes = useStyles();
  return (
    <Grid container justify='center' className={classes.container}>
      <Button variant='contained' color='primary' {...props}>
        Show more
      </Button>
    </Grid>
  );
};

export default ShowMoreButton;
