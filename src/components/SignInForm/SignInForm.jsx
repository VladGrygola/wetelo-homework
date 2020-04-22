import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import * as yup from 'yup';

import camelcaseKeys from 'camelcase-keys';

import { Grid, Typography, Button } from '@material-ui/core';
import useStyles from './SignInFrom.styles';

import TextFieldWithError from '../TextFieldWithError/TextFieldWithError';

import { stokkApi as api } from '../../utils/api';

import { setCurrentUser as setCurrentUserAction } from '../../redux/user/user.actions';

const SignInForm = ({ setCurrentUser }) => {
  const [errorSubmitMessage, setErrorSubmitMessage] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = async (formData, actions) => {
    actions.setSubmitting(true);

    try {
      const response = await api('api/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData), // formData is already in snake-case
        headers: { Accept: 'application/json' },
      });

      if (response.errors) {
        let errors = '';
        Object.entries(response.errors).forEach(([key, value]) => {
          errors += `${key}: ${value} `;
        });
        setErrorSubmitMessage(`${errors}`);
      } else {
        const user = camelcaseKeys(response.user);
        setCurrentUser({ ...user, token: response.token });
        history.push('/');
      }
    } catch (error) {
      console.error('Sign in request error:', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const initialValues = {
    username: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('This field is required!'),
    password: yup
      .string()
      .min(6, 'The password is too short')
      .max(30, 'The password is too long')
      .required('This field is required!'),
  });

  return (
    <>
      <Typography variant='h6'>Sign in</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
          /* eslint-disable react/prop-types */
          <form onSubmit={props.handleSubmit}>
            <Grid
              container
              direction='column'
              justify='center'
              alignItems='flex-start'
            >
              <TextFieldWithError
                className={classes.TextFieldWithError}
                type='text'
                label='Username'
                onChange={(e) => {
                  setErrorSubmitMessage('');
                  return props.handleChange(e);
                }}
                onBlur={props.handleBlur}
                value={props.values.username}
                name='username'
                disabled={props.isSubmitting}
                isVisibleError={props.errors.username && props.touched.username}
                errorMessage={props.errors.username}
              />

              <TextFieldWithError
                className={classes.TextFieldWithError}
                type='password'
                label='Password'
                onChange={(e) => {
                  setErrorSubmitMessage('');
                  return props.handleChange(e);
                }}
                onBlur={props.handleBlur}
                value={props.values.password}
                name='password'
                disabled={props.isSubmitting}
                isVisibleError={props.errors.password && props.touched.password}
                errorMessage={props.errors.password}
              />
              {errorSubmitMessage ? (
                <Typography color='error'>{errorSubmitMessage}</Typography>
              ) : null}
              <Button
                className={classes.button}
                variant='contained'
                color='primary'
                type='submit'
                disabled={props.isSubmitting}
              >
                Submmit
              </Button>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
};

SignInForm.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUserAction(user)),
});

export default connect(null, mapDispatchToProps)(SignInForm);
