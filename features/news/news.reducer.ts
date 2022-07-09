import { createModel } from '@rematch/core';
import { AxiosError, AxiosResponse } from 'axios';
import instance from '../api/api.setup';
import { status } from '../home/home.reducer';
import { RootModel } from '../store/models';

interface IInitState {
  id: string;
  thisNews: News;
  loading: status;
  imageLoading: status;
  images: any[];
  comments: any[];
  commentLoading: status;
  showAddComment: boolean;
  addCommentStatus: status;
  showAddNews: boolean;
  addNewsStatus: status,
  showAddImage: boolean;
  addImageStatus: status;
  showEditNews: boolean;
  editNewsStatus: status;
}

const initState: IInitState = {
  loading: 'idle',
  imageLoading: 'idle',
  thisNews: {
    author: 'Author',
    body: 'Body',
    createdAt: 'Date',
    id: '',
    title: 'Title',
    url: '/nourl',
  },
  images: [],
  id: '',
  comments: [],
  commentLoading: 'idle',
  showAddComment: false,
  addCommentStatus: 'idle',
  showAddNews: false,
  addNewsStatus: 'idle',
  showAddImage: false,
  addImageStatus: 'idle',
  showEditNews: false,
  editNewsStatus: 'idle',
};

export const news = createModel<RootModel>()({
  state: initState,
  reducers: {
    reset(state) {
      return { ...state, loading: 'idle', imageLoading: 'idle', commentLoading: 'idle', showAddComment: false, comments: [], images: [] };
    },
    loading(state) {
      return { ...state, loading: 'loading' };
    },
    success(state, payload: AxiosResponse) {
      return { ...state, loading: 'success', thisNews: payload.data };
    },
    failed(state) {
      return { ...state, loading: 'error' };
    },
    imageLoading(state) {
      return { ...state, imageLoading: 'loading' };
    },
    imageSuccess(state, payload: AxiosResponse) {
      return { ...state, imageLoading: 'success', images: payload.data };
    },
    imageFailed(state) {
      return { ...state, imageLoading: 'error' };
    },
    commentLoading(state) {
      return { ...state, commentLoading: 'loading' };
    },
    commentSuccess(state, payload: AxiosResponse) {
      return { ...state, commentLoading: 'success', comment: payload.data };
    },
    commentFailed(state) {
      return { ...state, commentLoading: 'error' };
    },
    addCommentLoading(state) {
      return { ...state, addCommentStatus: 'loading' };
    },
    addCommentSuccess(state) {
      return { ...state, addCommentStatus: 'success' };
    },
    addCommentFailed(state) {
      return { ...state, commentLoading: 'error' };
    },
    resetAddComment(state) {
      return { ...state, addCommentStatus: 'idle' };
    },
    addNewsLoading(state) {
      return { ...state, addNewsStatus: 'loading' };
    },
    addNewsSuccess(state) {
      return { ...state, addNewsStatus: 'success' };
    },
    addNewsFailed(state) {
      return { ...state, commentLoading: 'error' };
    },
    resetAddNews(state) {
      return { ...state, addNewsStatus: 'idle' };
    },
    changeId(state, payload) {
      return { ...state, id: payload.id };
    },
    showAddCommentFn(state, payload) {
      return { ...state, showAddComment: payload };
    },
    showAddNewsFn(state, payload) {
      return { ...state, showAddNews: payload };
    },
    addImageLoading(state) {
      return { ...state, addImageStatus: 'loading' };
    },
    addImageSuccess(state) {
      return { ...state, addImageStatus: 'success' };
    },
    addImageFailed(state) {
      return { ...state, addimageLoading: 'error' };
    },
    showAddImage(state, payload) {
      return { ...state, showAddImage: payload };
    },
    showAddImageFn(state, payload) {
      return { ...state, showAddImage: payload };
    },
    resetAddImage(state) {
      return { ...state, addImageStatus: 'idle' };
    },
    editNewsLoading(state) {
      return { ...state, editNewsStatus: 'loading' };
    },
    editNewsSuccess(state) {
      return { ...state, editNewsStatus: 'success' };
    },
    editNewsFailed(state) {
      return { ...state, editNewsLoading: 'error' };
    },
    showEditNews(state, payload) {
      return { ...state, showEditNews: payload };
    },
    showEditNewsFn(state, payload) {
      return { ...state, showEditNews: payload };
    },
    resetEditNews(state) {
      return { ...state, editNewsStatus: 'idle' };
    },
  },
  effects: dispatch => ({
    async getNewsById(payload, state) {
      const newsItem = dispatch.news;
      newsItem.loading();
      try {
        const response = await instance.get(`/${state.news.id}`);
        newsItem.success(response);
      } catch (e: unknown) {
        newsItem.failed();
      }
    },
    async getImageById(payload, state) {
      const newsItem = dispatch.news;
      newsItem.imageLoading();
      try {
        const response = await instance.get(`/${state.news.id}/images`);
        newsItem.imageSuccess(response);
      } catch (e: unknown) {
        newsItem.imageFailed();
      }
    },
    async getCommentsById(payload, state) {
      const newsItem = dispatch.news;
      newsItem.commentLoading();
      try {
        const response = await instance.get(`/${state.news.id}/comments`);
        newsItem.commentSuccess(response);
      } catch (e: unknown) {
        newsItem.commentFailed();
      }
    },
    async createtComment(payload, state) {
      const newsItem = dispatch.news;
      newsItem.addCommentLoading();
      try {
        await instance.post(`/${state.news.id}/comments`, { ...payload, newsId: state.news.id });
        newsItem.showAddCommentFn(false);
        newsItem.addCommentSuccess();
        newsItem.getNewsById({});
      } catch (e: unknown) {
        newsItem.addCommentFailed();
      } finally {
        newsItem.resetAddComment();
      }
    },
    async createNews(payload, state) {
      const newsItem = dispatch.news;
      newsItem.addNewsLoading();
      try {
        await instance.post(``, { ...payload });
        newsItem.showAddNewsFn(false);
        newsItem.addNewsSuccess();
      } catch (e: unknown) {
        newsItem.addNewsFailed();
      } finally {
        newsItem.resetAddNews();
      }
    },
    async addImage(payload, state) {
      const newsItem = dispatch.news;
      newsItem.addImageLoading();
      try {
        await instance.post(`/${state.news.id}/images`, { ...payload, newsId: state.news.id });
        newsItem.showAddImageFn(false);
        newsItem.getNewsById({});
        newsItem.addImageSuccess()
      } catch (e: unknown) {
        newsItem.addImageFailed();
      } finally {
        newsItem.resetAddImage();
      }
    },
    async editNews(payload, state) {
      const newsItem = dispatch.news;
      newsItem.editNewsLoading();
      try {
        await instance.put(`/${state.news.id}`, { ...payload });
        newsItem.showEditNewsFn(false);
        newsItem.getNewsById({});
        newsItem.editNewsSuccess();
      } catch (e: unknown) {
        newsItem.editNewsFailed();
      } finally {
        newsItem.resetEditNews();
      }
    },
    replaceId(payload) {
      const newsItem = dispatch.news;
      newsItem.changeId(payload);
    },
  }),
});
