import { createModel } from '@rematch/core';
import { AxiosResponse } from 'axios';
import instance from '../api/api.setup';
import { RootModel } from '../store/models';

export type status = 'idle' | 'loading' | 'success' | 'error';
interface IHomeState {
  newsItems: News[];
  loading: status;
  page: number;
  limit: number;
}

const initState: IHomeState = {
  newsItems: [],
  loading: 'idle',
  page: 1,
  limit: 10,
};
export const home = createModel<RootModel>()({
  state: initState,
  reducers: {
    reset(state) {
      return { ...state, loading: 'idle' };
    },
    loading(state) {
      return { ...state, loading: 'loading' };
    },
    success(state, payload: AxiosResponse) {
      return { ...state, loading: 'success', newsItems: payload.data };
    },
    failed(state) {
      return { ...state, loading: 'error' };
    },
    incrementPage(state) {
      return { ...state, page: state.page + 1 };
    },
    decrementPage(state) {
      return state.page > 0 ? { ...state, page: state.page > 1 ? state.page - 1 : 1 } : state;
    },
  },
  effects: dispatch => ({
    async getNews(payload, state) {
      dispatch.home.loading();
      try {
        const response = await instance.get(
          `?page=${state.home.page}&limit=${state.home.limit}`,
        );
        dispatch.home.success(response);
      } catch (e: unknown) {
        dispatch.home.failed();
      }
    },
  }),
});
