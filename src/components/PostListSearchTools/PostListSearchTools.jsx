import React from 'react';
import PropTypes from 'prop-types';
import SearchTools from '../SearchTools/SearchTools';

const CategoriesListSearchTools = ({ queryParams, setQueryParams }) => {
  return (
    <SearchTools
      queryParams={queryParams}
      setQueryParams={setQueryParams}
      title='Posts'
      orderByMap={[
        { title: 'Id', value: 'id' },
        { title: 'Title', value: 'title' },
        { title: 'Created at', value: 'created_at' },
      ]}
      limitValues={[4, 8, 16]}
    />
  );
};

CategoriesListSearchTools.propTypes = {
  queryParams: PropTypes.shape({
    page: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    q: PropTypes.string.isRequired,
  }).isRequired,
  setQueryParams: PropTypes.func.isRequired,
};

export default CategoriesListSearchTools;
