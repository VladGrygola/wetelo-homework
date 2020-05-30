import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import * as yup from 'yup';

import snakeCaseKeys from 'snakecase-keys';
import camelcaseKeys from 'camelcase-keys';

import { Grid, Typography, Button } from '@material-ui/core';
import useStyles from './SignUpForm.styles';

import TextFieldWithError from '../TextFieldWithError/TextFieldWithError';

import { setCurrentUser as setCurrentUserAction } from '../../redux/user/user.actions';

import { stokkApi as api } from '../../utils/api';

const SignUpForm = ({ setCurrentUser }) => {
  const [errorSubmitMessage, setErrorSubmitMessage] = useState('');
  const classes = useStyles();
  const history = useHistory();

  const onSubmit = async (formData, actions) => {
    actions.setSubmitting(true);

    const body = {
      ...snakeCaseKeys(formData),
    };

    delete body.confirm_password; // Not required by backend api

    try {
      const response = await api('api/auth/register', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json; charset=utf-8',
        },
      });

      if (!response.user) {
        let errors = '';
        response.forEach((error) => {
          errors += error.message;
        });
        setErrorSubmitMessage(`${errors}`);
      } else {
        const user = camelcaseKeys(response.user);
        setCurrentUser({ ...user, token: response.token.token });
        history.push('/');
      }
    } catch (error) {
      console.error('Sign up request error:', error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  const initialValues = {
    username: '',
    firstName: '',
    lastName: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = yup.object().shape({
    username: yup.string().required('This field is required!'),
    firstName: yup.string().required('This field is required!'),
    lastName: yup.string().required('This field is required!'),
    phone: yup.string().required('This field is required!'),
    password: yup
      .string()
      .min(6, 'The password is too short')
      .max(30, 'The password is too long')
      .required('This field is required!'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('This field is required!'),
  });
  /* eslint-disable react/prop-types */
  return (
    <>
      <Typography variant='h6'>Sign up</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {(props) => (
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
                type='text'
                label='First name'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.firstName}
                name='firstName'
                disabled={props.isSubmitting}
                isVisibleError={
                  props.errors.firstName && props.touched.firstName
                }
                errorMessage={props.errors.firstName}
              />
              <TextFieldWithError
                className={classes.TextFieldWithError}
                type='text'
                label='Last name'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.lastName}
                name='lastName'
                disabled={props.isSubmitting}
                isVisibleError={props.errors.lastName && props.touched.lastName}
                errorMessage={props.errors.lastName}
              />
              <TextFieldWithError
                className={classes.TextFieldWithError}
                type='text'
                label='Phone'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.phone}
                name='phone'
                disabled={props.isSubmitting}
                isVisibleError={props.errors.phone && props.touched.phone}
                errorMessage={props.errors.phone}
              />
              <TextFieldWithError
                className={classes.TextFieldWithError}
                type='password'
                label='Password'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name='password'
                disabled={props.isSubmitting}
                isVisibleError={props.errors.password && props.touched.password}
                errorMessage={props.errors.password}
              />
              <TextFieldWithError
                className={classes.TextFieldWithError}
                type='password'
                label='Confirm password'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.confirmPassword}
                name='confirmPassword'
                disabled={props.isSubmitting}
                isVisibleError={
                  props.errors.confirmPassword && props.touched.confirmPassword
                }
                errorMessage={props.errors.confirmPassword}
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
SignUpForm.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: (user) => dispatch(setCurrentUserAction(user)),
});

export default connect(null, mapDispatchToProps)(SignUpForm);
