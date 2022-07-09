import axios, {AxiosRequestConfig} from 'axios';

const instance = axios.create({
  baseURL: 'https://5e4bfc87a641ed0014b02740.mockapi.io/api/clane/news',
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
});

instance.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    return request;
  },
  (error: unknown) => Promise.reject(error),
);

export default instance;
