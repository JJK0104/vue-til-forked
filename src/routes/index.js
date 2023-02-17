import Vue from 'vue';
import VueRouter from 'vue-router';
// 코드 스플리팅으로 할 거라서 필요 없다
// import LoginPage from '@/views/LoginPage';
// import SignupPage from '@/views/SignupPage';

// VueRouter는 라우터에 대한 정보들을 관리하는 객체라고 보면 된다
// use는 vue의 플러그인이라는 기능이고, 이걸 쓰는 이유는 일반적으로
// vue를 사용할 때 전역으로, 그러니까 vue를 사용하는 모든 영역에 특정 기능을 추가하고 싶을때,
// global functionality를 추가하고 싶을 때 사용하는 부분
Vue.use(VueRouter);

// main.js에서 import
// vue router 인스턴스 생성하고 export
export default new VueRouter({
  // mode : history 안 쓰면 http://localhost:8080/#/login 처럼 # 가 붙는다
  // mode : 'history' 쓰면 # 없어짐
  // url에 #이 붙어 있는 이유는
  // #을 이용해서 서버는 이 페이지가 새로운 페이지라는 걸 알지 못한다
  // 예를 들어 로그인을 눌렀을 때 url을 이동하더라도
  // 서버 입장에서는 http://localhost:8080/index.html#/login
  // index.html이라고 하는 index.html 하나의 파일에서의 이동으로만 간주하지
  // 서버는 #이 붙건 붙지 않건 상관하지 않는다
  // 서버 입장에서는 이게 login.html인지 signup.html인지 이것만 상관한다
  // 그래서 만약 #을 떼어버리면
  // http://localhost:8080/index.html/login 이거는 서버 입장에서 새로운 파일로 간주하기 때문에
  mode: 'history',
  // routes 속성은 vueRouter에 의해서 제어되는 페이지의 정보를 담는 배열
  // route 정보들 넣기
  routes: [
    {
      path: '/',
      // redirect : vue router에서 기본적으로 제공되는 속성
      // 이제 / 로 가면 바로 /news로 간다
      redirect: '/login',
    },
    {
      path: '/login',
      // npm run serve 하고
      // 개발자 도구 - Network - All 선택하면 app.js 있다
      // 웹팩에서 빌드해준 결과물이다
      // 이 app.js에 모든 페이지 정보가 들어있다
      // 만약 페이지 개수가 많다면 처음에 30페이지를 한번에 다 로딩 해오는 것은 시간이 많이 걸린다
      // 그래서 처음 페이지가 로그인이면 로그인 페이지만 먼저 들고 오고
      // 나머지 29개의 페이지는 해당 url로 이동했을 때만 들고 오게 하는게 코드 스플리팅의 역할
      component: () => import('@/views/LoginPage.vue'),

      // 코드 스필리팅 사용 안 할 때는
      // component : LoginPage (컴포넌트 명)
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupPage.vue'),
      // '/login', '/signup' url로 이동할 때마다 필요한 자바스크립트 파일을 그때그때 들고 오는 게 코드 스플리팅
      // 코드 스플리팅은 기본적으로 웹팩의 다이나믹 import 구문이라든지 이런 걸 활용해서 vue에서 좀 더 쉽게 갖다 쓸 수 있게끔
      // 웹팩 만든 사람과 vue 코어 팀이 협업해서 만든 기능
      // 다른 프레임워크는 다이나믹 import 기능이 좀 더 어렵게 되어 있다
    },
    // router의 fallback 기능
    // routes 속성에 없는 url에 대해 반응하는 라우터
    {
      path: '*', // 위에 정해진 url을 제외한 모든 url
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
});
