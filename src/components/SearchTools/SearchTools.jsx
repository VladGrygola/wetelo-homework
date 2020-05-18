import React from 'react';
import PropTypes from 'prop-types';

import {
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

import useStyles from './SearchTools.styles';

const SearchTools = ({ queryParams, setQueryParams, orderByMap, title }) => {
  const classes = useStyles();

  const { limit, orderBy, order, q } = queryParams;

  const handleChange = ({ target: { name, value } }) => {
    setQueryParams({ ...queryParams, [name]: value, page: 1 });
  };

  return (
    <div className={classes.toolbar}>
      <Typography variant='h5' className={classes.title}>
        {title}
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
            {orderByMap.map((menuItem) => (
              <MenuItem value={menuItem.value}>{menuItem.title}</MenuItem>
            ))}
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

SearchTools.propTypes = {
  queryParams: PropTypes.shape({
    limit: PropTypes.number,
    orderBy: PropTypes.string,
    order: PropTypes.string,
    q: PropTypes.string,
  }).isRequired,
  setQueryParams: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  orderByMap: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default SearchTools;
