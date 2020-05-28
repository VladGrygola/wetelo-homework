import React from 'react';

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
      ]}
    />
  );
};

export default CategoriesListSearchTools;
