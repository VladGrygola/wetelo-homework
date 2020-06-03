import camelcaseKeys from 'camelcase-keys';
import GalleryActionTypes from '../gallery.types';
import { stokkApi as api, queryString } from '../../../utils/api';

export const fetchNextPagePostsStarted = () => ({
  type: GalleryActionTypes.FETCH_NEXT_PAGE_POSTS_START,
});

export const fetchNextPagePostsSuccess = (posts, queryResponse) => ({
  type: GalleryActionTypes.FETCH_NEXT_PAGE_POSTS_SUCCESS,
  payload: { posts, queryResponse },
});

export const fetchNextPagePostsFailure = (error) => ({
  type: GalleryActionTypes.FETCH_NEXT_PAGE_POSTS_SUCCESS,
  payload: error,
});

export const fetchNextPagePostsAsync = (token, params) => {
  return async (dispatch) => {
    dispatch(fetchNextPagePostsStarted());
    try {
      const queryParams = queryString({ ...params, page: params.page + 1 });
      const response = await api(`api/posts?${queryParams}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.error) dispatch(fetchNextPagePostsFailure(response.error));
      else {
        const { data, ...queryResponse } = response;
        dispatch(fetchNextPagePostsSuccess(camelcaseKeys(data), queryResponse));
      }
    } catch (error) {
      dispatch(fetchNextPagePostsFailure(error));
    }
  };
};
