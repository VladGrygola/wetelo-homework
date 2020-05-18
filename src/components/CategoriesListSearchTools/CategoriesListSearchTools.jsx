import React from 'react';

import SearchTools from '../SearchTools/SearchTools';

const CategoriesListSearchTools = ({ queryParams, setQueryParams }) => {
  return (
    <SearchTools
      queryParams={queryParams}
      setQueryParams={setQueryParams}
      title='Categories'
      orderByMap={[
        { title: 'Id', value: 'id' },
        { title: 'Name', value: 'name' },
      ]}
    />
  );
};

export default CategoriesListSearchTools;
