console.log('src/store/index.js 실행');

import Vue from 'vue';
import Vuex from 'vuex';
// 쿠키에 저장된 값을 vue의 store에 연결 시키자
// src/utils/cookies에 보면 쿠키에서 값을 가져올 때 get~FromCookie가 있다
// 이 함수들을 이용해서 쿠키에 저장된 값을 store/index.js 에서 활용하면 된다.
import { getAuthFromCookie, getUserFromCookie } from '@/utils/cookies';

Vue.use(Vuex);

// main.js에서 import
// api/common/interceptors.js에서 import
// 보니까 js 파일들은 import해와서 store.state.token쓰고
// vue 파일들은 (this.)$store.state.token으로 접근
export default new Vuex.Store({
  state: {
    username: getUserFromCookie() || '', // 없으면 빈문자열
    token: getAuthFromCookie() || '', // 없으면 빈문자열
    // 이러면 매번 store를 생성할 때마다 쿠키에 있는 값을 꺼내와서 넣어보고 없으면 뒤쪽의 문자열로 초기화
  },
  getters: {
    isLogin(state) {
      return state.username !== '';
    },
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = '';
    },
    // 토큰값 설정
    setToken(state, token) {
      state.token = token;
    },
  },
});

console.log('src/store/index.js 마지막 줄');
