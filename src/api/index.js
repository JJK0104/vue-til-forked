import axios from 'axios';
import { setInterceptors } from './common/interceptors';

// 단순하게 baseURL만 생성해준다
function createInstance() {
  return axios.create({
    baseURL: process.env.VUE_APP_API_URL,
  });
}
// 이전까지는 interceptor로 authorization에 토큰값이 실려가는 instance로 registerUser, loginUser도 같이 사용했었다
// 그래서 만약에 좀 더 엄격한 백엔드 api였으면 에러가 났을 확률이 있다. 따라서 이런 부분은 분리해서 생각해야 된다
// authorization 토큰이 필요한 api는 로그인 이후의 api가 되겠고
// 로그인 전의 api 같은 경우는 authorization 속성이 없어야 된다.

// 액시오스 초기화 함수
function createInstanceWithAuth(url) {
  const instance = axios.create({
    baseURL: `${process.env.VUE_APP_API_URL}${url}`,
  });
  return setInterceptors(instance);
}

// src/api/auth.js에서 import
export const instance = createInstance();
// 특정 데이터 'posts'
// posts라는 변수는 기본 URL이 항상 posts가 된 변수
// src/api/posts.js에서 import
export const posts = createInstanceWithAuth('posts');

// 보통의 rest api 패턴
// GET - posts
// POST - posts
// PUT - posts {id}
// DELETE - posts {id}
