import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography } from '@material-ui/core';

import PostListItemContainer from '../PostListItem/PostListItem.container';
import ShowMoreButton from '../ShowMoreButton/ShowMoreButton';
import LoadingSpinnerBlock from '../LoadingSpinnerBlock/LoadingSpinnerBlock';

const PostList = ({
  posts,
  fetchPosts,
  userToken,
  queryParams: { page, limit, order, orderBy, q },
  queryResponse,
  fetchNextPagePosts,
  isLoadingNextPagePosts,
}) => {
  const didMountRef = useRef(false);
  const isVisibleShowMoreButton =
    !!queryResponse.total &&
    queryResponse.page !== queryResponse.lastPage &&
    !isLoadingNextPagePosts;

  useEffect(() => {
    if (didMountRef.current && page === 1) {
      fetchPosts(userToken, { page, limit, order, orderBy, q });
    } else didMountRef.current = true;
  }, [page, limit, order, orderBy, q, userToken, fetchPosts]);
  return (
    <>
      <Typography>
        Total:
        {queryResponse.total}
      </Typography>
      <Grid container spacing={3}>
        {!!queryResponse.total &&
          posts.map((post) => (
            <Grid item xs={12} sm={6} key={post.id}>
              <PostListItemContainer post={post} key={post.id} />
            </Grid>
          ))}
      </Grid>
      {isVisibleShowMoreButton && (
        <ShowMoreButton
          onClick={() =>
            fetchNextPagePosts(userToken, { page, limit, order, orderBy, q })
          }
        />
      )}
      {!queryResponse.total && (
        <Grid container justify='center'>
          <Typography color='textSecondary'>Nothing to display</Typography>
        </Grid>
      )}
      {isLoadingNextPagePosts && <LoadingSpinnerBlock />}
    </>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
      category: PropTypes.shape({
        title: PropTypes.string.isRequired,
      }),
      img: PropTypes.shape({
        filename: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  fetchPosts: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
  queryParams: PropTypes.shape({
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    q: PropTypes.string.isRequired,
  }).isRequired,
  queryResponse: PropTypes.shape({
    total: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  }).isRequired,
  fetchNextPagePosts: PropTypes.func.isRequired,
  isLoadingNextPagePosts: PropTypes.bool.isRequired,
};

export default PostList;
