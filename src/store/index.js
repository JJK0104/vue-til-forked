console.log('src/store/index.js 실행');

import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

// main.js에서 import
// api/common/interceptors.js에서 import
// 보니까 js 파일들은 import해와서 store.state.token쓰고
// vue 파일들은 (this.)$store.state.token으로 접근
export default new Vuex.Store({
  state: {
    username: '',
    token: '',
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
