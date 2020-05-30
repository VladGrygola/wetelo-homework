import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, Button } from '@material-ui/core';

import PostListSearchToolsContainer from '../../components/PostListSearchTools/PostListSearchTools.container';
import PostListContainer from '../../components/PostList/PostList.container';

import PostFormDialogContainer from '../../components/PostFormDialog/PostFormDialog.container';

import useStyles from './HomePage.styles';

const HomePage = ({ userToken, fetchPosts }) => {
  const [inOpenNewPostDialog, setIsOperNewPostDialog] = useState(false);

  const classes = useStyles();
  useEffect(() => {
    fetchPosts(userToken);
  }, [fetchPosts, userToken]);

  return (
    <>
      <Container className={classes.container}>
        <Grid container>
          <Grid item sm={12} md={6}>
            <PostListSearchToolsContainer />
          </Grid>
          <Grid
            container
            item
            sm={12}
            md={6}
            direction='row-reverse'
            justify='center'
          >
            <Button onClick={() => setIsOperNewPostDialog(true)}>
              New post
            </Button>
          </Grid>
        </Grid>
        <PostListContainer />
      </Container>
      <PostFormDialogContainer
        isOpen={inOpenNewPostDialog}
        setIsOpen={setIsOperNewPostDialog}
      />
    </>
  );
};

HomePage.propTypes = {
  userToken: PropTypes.string.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

export default HomePage;
