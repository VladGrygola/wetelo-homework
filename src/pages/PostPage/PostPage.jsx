import React, { useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';

import PostPageContent from './PostPage.content';

import useStyles from './PostPage.styles';

const PostPage = ({
  location: { pathname },
  posts,
  userToken,
  fetchPostById,
  notFoundList,
}) => {
  const id = parseInt(pathname.split('/')[2], 10);
  const post = posts.find((row) => row.id === id);

  const classes = useStyles();

  useEffect(() => {
    if (!post && !notFoundList.includes(id)) {
      fetchPostById(userToken, id);
    }
  }, [fetchPostById, id, posts, userToken, notFoundList, post]);

  return (
    <Container className={classes.container}>
      {!post ? (
        <Typography color='error'>Not found</Typography>
      ) : (
        <PostPageContent post={post} />
      )}
    </Container>
  );
};

export default PostPage;
