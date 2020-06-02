import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, Container, Button, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';

import PostListSearchToolsContainer from '../../components/PostListSearchTools/PostListSearchTools.container';
import PostListContainer from '../../components/PostList/PostList.container';
import PostFormDialogContainer from '../../components/PostFormDialog/PostFormDialog.container';
import MultiDeleteDialogContainer from '../../components/MultiDeleteDialog/MultiDeleteDialog.container';

import useStyles from './HomePage.styles';

const HomePage = ({
  userToken,
  fetchPosts,
  deletingMode,
  setDeletingMode,
  setIdsOfSelectedPosts,
  selectedPosts,
}) => {
  const [inOpenNewPostDialog, setIsOperNewPostDialog] = useState(false);
  const [inOpenDeleteDialog, setIsOpenDeleteDialog] = useState(false);
  const [isVisibleDeleteAlert, setIsVisibleDeleteAlert] = useState(false);

  const classes = useStyles();
  useEffect(() => {
    fetchPosts(userToken);
  }, [fetchPosts, userToken]);

  const handleDeleteAlertClose = () => setIsVisibleDeleteAlert(false);

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
            direction='row'
            justify='space-around'
          >
            {deletingMode ? (
              <>
                <Button
                  onClick={() => {
                    setDeletingMode(false);
                    setIdsOfSelectedPosts([]);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  color='secondary'
                  onClick={() => {
                    if (selectedPosts) {
                      setIsOpenDeleteDialog(true);
                    } else {
                      setIsVisibleDeleteAlert(true);
                    }
                  }}
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button onClick={() => setIsOperNewPostDialog(true)}>
                  New post
                </Button>
                <Button onClick={() => setDeletingMode(true)}>
                  Select to delete
                </Button>
              </>
            )}
          </Grid>
        </Grid>
        <PostListContainer />
        <Snackbar
          open={isVisibleDeleteAlert}
          autoHideDuration={3000}
          onClose={handleDeleteAlertClose}
        >
          <MuiAlert
            onClose={handleDeleteAlertClose}
            severity='info'
            elevation={6}
            variant='filled'
          >
            There are no selected posts!
          </MuiAlert>
        </Snackbar>
      </Container>
      <PostFormDialogContainer
        isOpen={inOpenNewPostDialog}
        setIsOpen={setIsOperNewPostDialog}
      />
      <MultiDeleteDialogContainer
        isOpen={inOpenDeleteDialog}
        setIsOpen={setIsOpenDeleteDialog}
      />
    </>
  );
};

HomePage.propTypes = {
  userToken: PropTypes.string.isRequired,
  fetchPosts: PropTypes.func.isRequired,
};

export default HomePage;
