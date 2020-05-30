import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

const AsyncAutocompleteCategory = ({
  onChange,
  onBlur,
  value,
  errorMessage,
  isVisibleError,
  variant,
  disabled,
  // Redux:
  isLoading,
  categories,
  fetchingErrorMessage,
  userToken,
  fetchCategoriesListByQuery,
}) => {
  const [open, setOpen] = React.useState(false);
  const [fieldValue, setFieldValue] = React.useState('');
  React.useEffect(() => {
    (async () => {
      fetchCategoriesListByQuery(userToken, fieldValue, 5);
    })();
  }, [fieldValue, userToken, fetchCategoriesListByQuery]);

  return (
    <>
      <Autocomplete
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        getOptionSelected={(option, value) => option.name === value.name}
        getOptionLabel={(option) => option.name}
        options={categories}
        loading={isLoading}
        disabled={disabled}
        renderInput={(params) => (
          <TextField
            {...params}
            label='categories'
            variant={variant}
            value={fieldValue}
            onChange={(e) => setFieldValue(e.target.value)}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {isLoading ? (
                    <CircularProgress color='inherit' size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
      {isVisibleError && <Typography color='error'>{errorMessage}</Typography>}
      {fetchingErrorMessage && (
        <Typography color='error'>{fetchingErrorMessage}</Typography>
      )}
    </>
  );
};

AsyncAutocompleteCategory.propTypes = {
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }),
  errorMessage: PropTypes.string,
  isVisibleError: PropTypes.bool,
  variant: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  // Redux:
  isLoading: PropTypes.bool,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })
  ),
  fetchingErrorMessage: PropTypes.string,
  userToken: PropTypes.string.isRequired,
  fetchCategoriesListByQuery: PropTypes.func.isRequired,
};

AsyncAutocompleteCategory.defaultProps = {
  value: null,
  errorMessage: '',
  isVisibleError: false,
  isLoading: false,
  variant: undefined,
  categories: [],
  fetchingErrorMessage: '',
};

export default AsyncAutocompleteCategory;
