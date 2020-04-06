/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import * as yup from 'yup';

import { TextField, Grid, Typography, Button } from '@material-ui/core';
import useStyles from './SignUpForm.styles';

import { api } from '../../utils/api';

const SignUp = ({ setCurrentUser }) => {
  const [errorSubmitMessage, setErrorSubmitMessage] = useState('');
  const classes = useStyles();

  const onSubmit = async (
    { username, password, firstName, lastName, phone },
    actions
  ) => {
    actions.setSubmitting(true);
    let res = null;
    const body = {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      phone,
    };
    try {
      res = await api('api/auth/register', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { Accept: 'application/json' },
      });
      const resUser = {
        id: res.user.id,
        username: res.user.username,
        password: res.user.password,
        firstName: res.user.first_name,
        lastName: res.user.last_name,
        phone: res.user.phone,
        createdAt: res.user.created_at,
        updatedAt: res.user.updated_at,
      };
      setCurrentUser(resUser, res.token);
    } catch (e) {
      res.forEach((error) => setErrorSubmitMessage(error.message));
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
              <TextField
                className={classes.textField}
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
              />
              {props.errors.username && props.touched.username && (
                <Typography color='error'>{props.errors.username}</Typography>
              )}
              <TextField
                className={classes.textField}
                type='text'
                label='First name'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.firstName}
                name='firstName'
                disabled={props.isSubmitting}
              />
              {props.errors.firstName && props.touched.firstName && (
                <Typography color='error'>{props.errors.firstName}</Typography>
              )}
              <TextField
                className={classes.textField}
                type='text'
                label='Last name'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.lastName}
                name='lastName'
                disabled={props.isSubmitting}
              />
              {props.errors.lastName && props.touched.lastName && (
                <Typography color='error'>{props.errors.lastName}</Typography>
              )}
              <TextField
                className={classes.textField}
                type='text'
                label='Phone'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.phone}
                name='phone'
                disabled={props.isSubmitting}
              />
              {props.errors.phone && props.touched.phone && (
                <Typography color='error'>{props.errors.phone}</Typography>
              )}
              <TextField
                className={classes.textField}
                type='password'
                label='Password'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.password}
                name='password'
                disabled={props.isSubmitting}
              />
              {props.errors.password && props.touched.password && (
                <Typography color='error'>{props.errors.password}</Typography>
              )}
              <TextField
                className={classes.textField}
                type='password'
                label='Confirm password'
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.confirmPassword}
                name='confirmPassword'
                disabled={props.isSubmitting}
              />
              {props.errors.confirmPassword &&
                props.touched.confirmPassword && (
                  <Typography color='error'>
                    {props.errors.confirmPassword}
                  </Typography>
                )}
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

SignUp.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
};

export default SignUp;
