import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Card, Typography, Grid } from '@material-ui/core';

import { apiUrl } from '../../constants/api';

import useStyles from './PostListItem.styles';

const PostListItem = ({ post: { id, category, title, img, created_at } }) => {
  const classes = useStyles();
  const imageUrl = `${apiUrl}uploads/${img.filename}`;
  const date = created_at.split(' ')[0];
  const time = created_at.split(' ')[1];
  return (
    <Card key={id} className={classes.card}>
      <div
        className={classes.image}
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.5) 0%, rgba(0, 0, 0, 0) 20%), url(${imageUrl})`,
        }}
      >
        <Grid container justify='space-between' wrap='nowrap'>
          <Typography
            className={classes.title}
            component={Link}
            to={`/gallery/${id}`}
          >
            {title}
          </Typography>
          <Grid
            container
            direction='column'
            alignItems='flex-end'
            className={classes.info}
          >
            <Grid item>
              <Typography>#{category.title}</Typography>
            </Grid>
            <Grid item>{time}</Grid>
            <Grid item>{date}</Grid>
          </Grid>
        </Grid>
      </div>
    </Card>
  );
};

PostListItem.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
    img: PropTypes.shape({
      filename: PropTypes.string.isRequired,
    }),
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default PostListItem;
