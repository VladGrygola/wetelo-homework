import React from 'react';
import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import useStyles from './CategoriesListSerchTools.styles';

const CategoriesListSerchTools = ({ queryParams, setQueryParams }) => {
  const classes = useStyles();

  const { limit, orderBy, order, q } = queryParams;

  const handleChange = ({ target: { name, value } }) => {
    setQueryParams({ ...queryParams, [name]: value, page: 1 });
  };

  return (
    <div className={classes.toolbar}>
      <Typography variant='h5' className={classes.title}>
        Categories
      </Typography>
      <div className={classes.toolbarTools}>
        <TextField label='Query' name='q' value={q} onChange={handleChange} />
        <FormControl className={classes.limit}>
          <InputLabel>Limit</InputLabel>
          <Select name='limit' value={limit} onChange={handleChange}>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.orderBy}>
          <InputLabel>Order by</InputLabel>
          <Select name='orderBy' value={orderBy} onChange={handleChange}>
            <MenuItem value='id'>Id</MenuItem>
            <MenuItem value='title'>Title</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.order}>
          <InputLabel>Order</InputLabel>
          <Select name='order' value={order} onChange={handleChange}>
            <MenuItem value='asc'>Ascending</MenuItem>
            <MenuItem value='desc'>Descending</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default CategoriesListSerchTools;
