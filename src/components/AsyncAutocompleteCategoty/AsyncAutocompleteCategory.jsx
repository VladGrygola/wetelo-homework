// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Typography } from '@material-ui/core';

export default function AsyncAutocompleteCategory({
  name,
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
}) {
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
        name={name}
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
}
