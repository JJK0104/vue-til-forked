// npm i vuex@3.6.2
// 3.6.2 버전이어야된다
import Vue from 'vue';
import Vuex from 'vuex';

// use는 vue의 플러그인이라는 기능이고, 이걸 쓰는 이유는 일반적으로
// vue를 사용할 때 전역으로, 그러니까 vue를 사용하는 모든 영역에 특정 기능을 추가하고 싶을때,
// global functionality를 추가하고 싶을 때 사용하는 부분
// 그래서 나중에 코드 쓸때
// LoginForm.vue라는 컴포넌트에서
// this.$store로 접근 가능
Vue.use(Vuex);

// vuex는 상태 관리 도구. 상태라는 것은 여러 컴포넌트간에 공유되는 data 속성

// new Vuex.Store()는 인스턴스다. 이걸 내보내야 되니까 변수에 담아준다 (store = new Vuex.Store({}))
// main.js에서 import
export default new Vuex.Store({
  // AppHeader.vue에서 $store.state.username
  state: {
    username: '',
  },
  // getters는 computed와 동일한 속성인데 다만 store에 있는 거
  // getters의 첫번째 인자는 state
  getters: {
    // $store.getters.isLogin
    isLogin(state) {
      return state.username !== '';
    },
  },
  // mutations란?
  // state의 값을 변경할 수 있는 유일한 방법이자 메서드
  // 뮤테이션은 commit()으로 동작시킨다. .commit()이 뮤테이션 발동시키는 명령어
  // 다른 컴포넌트에서(LoginForm.vue)는 this.$store.commit('mutation명',인자1(state이 아닌),..) 으로 뮤테이션 호출
  // 그러면 여기 뮤테이션이 실행됨
  mutations: {
    // mutation의 특징은 속성메서드에 항상 첫번째 인자로 state를 가져온다. 그래서 mutation에서 state를 조작할 수 있다.
    setUsername(state, username) {
      state.username = username;
    },
    clearUsername(state) {
      state.username = '';
    },
  },
});
