import React, { useEffect, useState } from 'react';

import { Grid, Container, Button } from '@material-ui/core';

import PostListSearchToolsContainer from '../../components/PostListSearchTools/PostListSearchTools.container';
import PostList from '../../components/PostList/PostList';

import PostFormDialogContainer from '../../components/PostFormDialog/PostFormDialog.container';

import useStyles from './HomePage.styles';

const HomePage = ({ user, fetchPosts }) => {
  const [inOpenNewPostDialog, setIsOperNewPostDialog] = useState(true);

  const classes = useStyles();
  useEffect(() => {
    fetchPosts(user.token);
  }, [fetchPosts, user]);

  return (
    <>
      <Container className={classes.container}>
        <Grid container>
          <Grid item sm={12} md={6}>
            <PostListSearchToolsContainer />
          </Grid>
          <Grid container item sm={12} md={6} direction='row-reverse'>
            <Button onClick={() => setIsOperNewPostDialog(true)}>
              New post
            </Button>
          </Grid>
        </Grid>
        <PostList />
      </Container>
      <PostFormDialogContainer
        isOpen={inOpenNewPostDialog}
        setIsOpen={setIsOperNewPostDialog}
      />
    </>
  );
};

export default HomePage;
