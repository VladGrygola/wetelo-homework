import React, { useState } from 'react';
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

import TextFieldWithError from '../TextFieldWithError/TextFieldWithError';
import AsyncAutocompleteCategoryContainer from '../AsyncAutocompleteCategoty/AsyncAutocompleteCategory.container';
import ImageUploadContainer from '../ImageUploadContainer/ImageUploadContainer';
import ImageUploadButton from '../ImageUploadButton/ImageUploadButton';

const PostFormDialog = ({
  isOpen,
  setIsOpen,
  post,
  //
  isSubmittingQuery,
  error,
  addPost,
  userToken,
}) => {
  const [isVisibleResult, setIsVisibleResult] = useState(false);
  const onSubmit = ({ title, category, image, description }, actions) => {
    const body = {
      title,
      category_id: category.id,
      image,
      description,
    };
    addPost(userToken, body);
    setIsVisibleResult(true);
    setTimeout(() => setIsVisibleResult(false), 2000);
  };
  const validationSchema = yup.object().shape({
    title: yup.string().required('This field is required!'),
    description: yup.string(),
    category: yup.mixed().required('This field is required!'),
    image: yup.mixed().required('Image is required!'),
  });
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle>{post ? 'Edit image' : 'Create image'}</DialogTitle>
      {isSubmittingQuery ? (
        <Grid container justify='center' style={{ height: '74px' }}>
          <Grid item>
            <CircularProgress />
          </Grid>
        </Grid>
      ) : (
        <Formik
          validationSchema={validationSchema}
          initialValues={{
            title: '',
            description: '',
            category: null,
            image: null,
          }}
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
              <DialogContent>
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
                      value={values.description}
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
export default PostFormDialog;
