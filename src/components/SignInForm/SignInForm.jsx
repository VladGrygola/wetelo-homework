/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Formik } from 'formik';
import * as yup from 'yup';

import { TextField, Grid, Typography, Button } from '@material-ui/core';
import useStyles from './SignInFrom.styles';

import { api } from '../../utils/api';

const SignIn = ({ setCurrentUser }) => {
  const [errorSubmitMessage, setErrorSubmitMessage] = useState('');
  const classes = useStyles();

  const onSubmit = async (
    { username, password, firstName, lastName, phone },
    actions
  ) => {
    actions.setSubmitting(true);
    const body = {
      username,
      password,
      first_name: firstName,
      last_name: lastName,
      phone,
    };

    let res = null;

    try {
      res = await api('api/auth/login', {
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
      const { errors } = res;
      setErrorSubmitMessage(`${errors.password}`);
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
          // eslint-disable-next-line react/prop-types
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
              />
              {props.errors.password && props.touched.password && (
                <Typography color='error'>{props.errors.password}</Typography>
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

SignIn.propTypes = {
  setCurrentUser: PropTypes.func.isRequired,
};

export default SignIn;
