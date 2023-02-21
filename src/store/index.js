import Vue from 'vue';
import Vuex from 'vuex';
import {
  getAuthFromCookie,
  getUserFromCookie,
  saveAuthToCookie,
  saveUserToCookie,
} from '@/utils/cookies';
import { loginUser } from '@/api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    username: getUserFromCookie() || '',
    token: getAuthFromCookie() || '',
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
    setToken(state, token) {
      state.token = token;
    },
  },
  // 현재 vuex 구조상 Backend API에서 불러온 data를 actions에서 호출하고
  // 그 data를 꺼내서 바로 state에 넣을 수 없다
  // 현재 vuex 구조는 비동기 호출은 전부다 actions에서 하게 되어 있고 거기서 받아온 data를
  // mutations를 통해서 state에 넣어주게끔 그런 상태관리 구조가 되어있다. 이건 vuex를 만든 사람이 그렇게 만들어서 정확한 이유는 모름
  // 즉, vuex 공식 사이트에 있는 그림대로 다시 말하면
  // Vue Components ---(Dispatch)---> Actions ---(Commit)---> Mutations ---(Mutate)---> State ---(Render)---> Vue Components
  //     this.$store.dispatch('action 명',인자)  context.commit('mutation명',인자...)

  // actions는 첫번째 인자가 state가 아니라 context다
  // context를 통해 actions에서 mutation에 접근할 수 있다. actions에서 mutation으로 접근하기 위한 경로
  // context.commit('mutation명',인자...)하면 뮤테이션 사용할 때 쓰던 commit과 동일한 역할
  // 다른 컴포넌트에서 this.$store.dispatch('action 명') 으로 호출
  // 즉, this.$store.dispatch('action명',인자) -> store의 action내 context.commit('mutation명',인자...) 실행
  // -> store의 mutation 실행
  actions: {
    // LoginForm.vue 기존 코드에 너무 많이 있어서 코드 정리
    async LOGIN({ commit }, userData) {
      const { data } = await loginUser(userData);
      console.log(data.token);
      commit('setToken', data.token);
      commit('setUsername', data.user.username);
      saveAuthToCookie(data.token);
      saveUserToCookie(data.user.username);
      // async는 무조건 프로미스가 리턴된다
      return data;
    },
  },
});
