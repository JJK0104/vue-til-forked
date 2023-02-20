console.log('src/api/common/interceptors.js 실행');

import store from '@/store/index';

// 6) setInterceptors(instance)함수 실행

// interceptors
// You can intercept requests or responses before they are handled by `then` or `catch`
// 서버로 요청을 보내는 것과 서버에서 받은 응답을 화면단에서, 컴포넌트 단에서 처리하기 전에 추가 로직을 넣을 수 있는 거.
export function setInterceptors(instance) {
  console.log('api/common/interceptors.js내 setInterceptors 실행');
  console.log('아직 instance.interceptors.request.use 실행 안 됐다');
  // Add a request interceptor
  // 요청을 보내기 전의 특정 코드
  // 원래는 axios.interceptors.request.use()인데
  // 지금 우리는 api 요청할때 instance = axios.create() 사용하고 있으니까
  // instance.interceptors.request.use로 사용
  instance.interceptors.request.use(
    function(config) {
      // Do something before request is sent
      console.log(
        '라이프 사이클 훅(동기) 끝나고 실행? 즉, request is sent after 라이프사이클(동기)',
      );
      console.log(
        'instance.interceptors.request.use 첫번째 콜백함수 실행... do something before request is sent',
      );
      console.log('config :', config);
      // 7) config.headers.Authorization = store.state.token;
      // 매 api때마다 토큰값을 실어서 보내주기
      config.headers.Authorization = store.state.token;
      // LoginForm.vue의 this.$store.commit('setToken', data.token)이 실행된 후에
      // store.state.token에 값 들어감. 그전까지는 ''.
      console.log(
        'config.headers.Authorization = store.state.token 후 config.headers.Authorization:',
        config.headers.Authorization,
      );
      console.log(
        `instance.interceptors.request.use 첫번째 콜백함수 return문 바로 위, 즉 이제 종료된다`,
      );
      return config;
    },
    function(error) {
      // Do something with request error
      // 만약 에러 발생시, 에러가 화면단, 컴포넌트단으로 오기 전에 처리
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  // 서버에 요청을 보내고 응답을 받을 때 받기 전 처리
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
  // 8) config.headers.Authorization = store.state.token된 instance 반환
  return instance;
}

console.log('src/api/common/interceptors.js 마지막 줄');
