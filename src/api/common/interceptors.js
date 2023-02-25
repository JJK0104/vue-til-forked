import store from '@/store/index';

// api/index.js에서
// const instance = axios.create({
//   baseURL: `${process.env.VUE_APP_API_URL}${url}`,
// });
// return setInterceptors(instance);

export function setInterceptors(instance) {
  // Add a request interceptor
  // instance는 axios.create({})
  instance.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      // console.log(config);
      config.headers.Authorization = store.state.token;
      return config;
    },
    function(error) {
      // Do something with request error
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  instance.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );
  return instance;
}
