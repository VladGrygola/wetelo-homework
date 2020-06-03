import React from 'react';
import PropTypes from 'prop-types';
import SearchTools from '../SearchTools/SearchTools';

const CategoriesListSearchTools = ({ queryParams, setQueryParams }) => {
  return (
    <SearchTools
      queryParams={queryParams}
      setQueryParams={setQueryParams}
      title='Categories'
      orderByMap={[
        { title: 'Id', value: 'id' },
        { title: 'Title', value: 'title' },
      ]}
    />
  );
};

CategoriesListSearchTools.propTypes = {
  queryParams: PropTypes.shape({
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    q: PropTypes.string.isRequired,
    limit: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
  }).isRequired,
  setQueryParams: PropTypes.func.isRequired,
};

export default CategoriesListSearchTools;
