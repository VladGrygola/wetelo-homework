import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik } from 'formik';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  CircularProgress,
  Typography,
} from '@material-ui/core';

import MuiAlert from '@material-ui/lab/Alert';

import { apiUrl } from '../../constants/api';

import TextFieldWithError from '../TextFieldWithError/TextFieldWithError';
import AsyncAutocompleteCategoryContainer from '../AsyncAutocompleteCategoty/AsyncAutocompleteCategory.container';
import ImageUploadContainer from '../ImageUploadContainer/ImageUploadContainer';
import ImageUploadButton from '../ImageUploadButton/ImageUploadButton';

import useStyles from './PostFormDialog.styles';

const PostFormDialog = ({
  isOpen,
  setIsOpen,
  post,
  //
  isSubmittingQuery,
  error,
  addPost,
  editPost,
  userToken,
}) => {
  const [isVisibleResult, setIsVisibleResult] = useState(false);
  const [isDownloadingPostImage, setIsDownloadingPostImage] = useState(false);
  const [initialValues, setInitialValues] = useState({
    title: post ? post.title : '',
    description: post && post.description ? post.description : '',
    category: post ? { name: post.category.title, id: post.category.id } : '',
    image: undefined,
  });

  const classes = useStyles();

  useEffect(() => {
    if (post)
      (async () => {
        setIsDownloadingPostImage(true);
        const image = await fetch(`${apiUrl}uploads/${post.img.filename}`)
          .then((i) => i.blob())
          .then(
            (b) =>
              new File([b], post.img.filename, {
                lastModified: post.img.updatedAt,
                type: post.img.type,
              })
          );
        const initialValuesWithImage = { ...initialValues, image };
        setInitialValues(initialValuesWithImage);
        setIsDownloadingPostImage(false);
      })();
    // eslint-disable-next-line
  }, [post]);

  const onSubmit = ({ title, category, image, description }, actions) => {
    const body = {
      title,
      category_id: category.id,
      image,
      description,
    };

    if (post) editPost(userToken, body, post.id);
    else addPost(userToken, body);

    setIsVisibleResult(true);
    setTimeout(() => {
      setIsVisibleResult(false);
      setIsOpen(false);
    }, 2000);
  };
  const validationSchema = yup.object().shape({
    title: yup.string().required('This field is required!'),
    description: yup.string(),
    category: yup.mixed().required('This field is required!'),
    image: yup.mixed().required('Image is required!'),
  });
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle className={classes.title}>
        {post ? 'Edit image' : 'Create image'}
      </DialogTitle>
      {isSubmittingQuery || isDownloadingPostImage ? (
        <Grid container justify='center' style={{ height: '74px' }}>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <Formik
          validationSchema={validationSchema}
          initialValues={initialValues}
          onSubmit={onSubmit}
        >
          {({
            errors,
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            setFieldValue,
            touched,
            isSubmitting,
          }) => (
            <form onSubmit={handleSubmit}>
              <DialogContent className={classes.content}>
                <Grid item>
                  <ImageUploadContainer file={values.image} />
                </Grid>
                <Grid item>
                  <ImageUploadButton
                    name='image'
                    errorMessage={
                      errors.image && touched.image ? errors.image : undefined
                    }
                    onChange={(event) => {
                      setFieldValue('image', event.currentTarget.files[0]);
                    }}
                    disabled={isSubmitting}
                  />
                </Grid>
                <Grid container direction='column'>
                  <Grid item>
                    <TextFieldWithError
                      fullWidth
                      name='title'
                      isVisibleError={errors.title && touched.title}
                      errorMessage={errors.title}
                      label='title'
                      value={values.title}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item>
                    <AsyncAutocompleteCategoryContainer
                      isVisibleError={errors.category && touched.category}
                      errorMessage={errors.category}
                      label='categories'
                      value={values.category}
                      onChange={(e, v) => setFieldValue('category', v)}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                    />
                  </Grid>
                  <Grid item>
                    <TextFieldWithError
                      fullWidth
                      name='description'
                      isVisibleError={errors.description && touched.description}
                      errorMessage={errors.description}
                      label='description'
                      value={values.description ? values.description : ''}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={isSubmitting}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Grid container justify='space-between'>
                  <Grid item>
                    <Button
                      variant='contained'
                      onClick={() => setIsOpen(false)}
                      color='default'
                    >
                      Back
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant='contained' type='submit' color='secondary'>
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </DialogActions>
            </form>
          )}
        </Formik>
      )}
      {error && <Typography color='error'>{JSON.stringify(error)}</Typography>}
      {isVisibleResult && error === null && (
        <MuiAlert elevation={6} variant='filled' severity='success'>
          Post added!
        </MuiAlert>
      )}
      {isVisibleResult && error && (
        <MuiAlert elevation={6} variant='filled' severity='error'>
          {JSON.stringify(error)}
        </MuiAlert>
      )}
    </Dialog>
  );
};

PostFormDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func.isRequired,
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
    }),
  }),
  isSubmittingQuery: PropTypes.bool.isRequired,
  error: PropTypes.instanceOf(Object),
  addPost: PropTypes.func.isRequired,
  userToken: PropTypes.string.isRequired,
};

PostFormDialog.defaultProps = {
  post: undefined,
  error: undefined,
};

export default PostFormDialog;
