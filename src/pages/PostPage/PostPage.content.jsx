import React, { useState, useEffect } from 'react';

import { Grid, Typography, Button } from '@material-ui/core';

import ZoomInIcon from '@material-ui/icons/ZoomIn';
import ZoomOutIcon from '@material-ui/icons/ZoomOut';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import { apiUrl } from '../../constants/api';

import PostFormDialogContainer from '../../components/PostFormDialog/PostFormDialog.container';

import useStyles from './PostPage.styles';

const PostPageContent = ({ post }) => {
  const classes = useStyles();
  const { id, title, description, updatedAt, createdAt, category, img } = post;

  const ZOOM_VALUES = {
    FIT_IN: 'FIT_IN',
    MID_WIDTH: 'MID_WIDTH',
    MAX_WIDTH: 'MAX_WIDTH',
  };
  const [zoomValue, setZoomValue] = useState(ZOOM_VALUES.FIT_IN);
  const [imageStyle, setImageStyle] = useState(undefined);
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);

  useEffect(() => {
    switch (zoomValue) {
      case ZOOM_VALUES.FIT_IN: {
        setImageStyle({ maxHeight: '82vh', maxWidth: '90vw' });
        break;
      }
      case ZOOM_VALUES.MID_WIDTH: {
        setImageStyle({ width: '100%' });
        break;
      }
      case ZOOM_VALUES.MAX_WIDTH: {
        setImageStyle({ width: '98vw' });
        break;
      }
      default: {
        setImageStyle({ maxHeight: '82vh', maxWidth: '90vw' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomValue]);

  const handleZoomIn = () => {
    switch (zoomValue) {
      case ZOOM_VALUES.FIT_IN: {
        setZoomValue(ZOOM_VALUES.MID_WIDTH);
        break;
      }
      case ZOOM_VALUES.MID_WIDTH: {
        setZoomValue(ZOOM_VALUES.MAX_WIDTH);
        break;
      }
      case ZOOM_VALUES.MAX_WIDTH: {
        break;
      }
      default: {
        break;
      }
    }
  };

  const handleZoomOut = () => {
    switch (zoomValue) {
      case ZOOM_VALUES.FIT_IN: {
        break;
      }
      case ZOOM_VALUES.MID_WIDTH: {
        setZoomValue(ZOOM_VALUES.FIT_IN);
        break;
      }
      case ZOOM_VALUES.MAX_WIDTH: {
        setZoomValue(ZOOM_VALUES.MID_WIDTH);
        break;
      }
      default: {
        break;
      }
    }
  };

  const imageUrl = `${apiUrl}uploads/${img.filename}`;
  return (
    <Grid container direction='column' className={classes.content}>
      <Grid container direction='row' justify='space-between'>
        <Grid item>
          <Typography variant='h4'>{title}</Typography>
        </Grid>
        <Grid item>
          <Button onClick={handleZoomIn}>
            <ZoomInIcon />
          </Button>
          <Button>
            <ZoomOutIcon onClick={handleZoomOut} />
          </Button>
          <Button onClick={() => setIsOpenDeleteDialog(true)}>
            <EditIcon />
          </Button>
          <Button>
            <DeleteIcon />
          </Button>
        </Grid>
        <Grid item>
          <Grid item>
            <Typography color='textSecondary' align='right'>
              Created at:
              {createdAt}
            </Typography>
          </Grid>
          <Grid item>
            <Typography color='textSecondary' align='right'>
              Updated at:
              {updatedAt}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Typography color='textSecondary'>
        №{id} #{category.title}
      </Typography>
      {description && <Typography>{description}</Typography>}
      <Grid
        container
        justify='center'
        alignItems='center'
        style={{ flexGrow: 1 }}
      >
        <Grid item>
          <img src={imageUrl} style={imageStyle} alt='Post' />
        </Grid>
      </Grid>
      <PostFormDialogContainer
        post={post}
        isOpen={isOpenDeleteDialog}
        setIsOpen={setIsOpenDeleteDialog}
      />
    </Grid>
  );
};

export default PostPageContent;
