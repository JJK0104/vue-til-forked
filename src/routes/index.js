import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
// import LoginPage from '@/views/LoginPage.vue';
// import SignupPage from '@/views/SignupPage.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  // mode는 해쉬값 관련된 설정
  mode: 'history',
  // 페이지 컴포넌트 속성
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage.vue'),
    },
    {
      path: '/signup',
      component: () => import('@/views/SignupPage.vue'),
    },
    // 특정 페이지에 권한을 부여할 수 있는 방법
    // 지금 권한을 처리해야되는 페이지는
    // login, signup은 사용자가 로그인하지 않아도 들어갈 수 있다
    // 나머지는 사용자가 로그인하지 않은 상태이면 들어갈 수 없게 해야한다
    // meta라는 속성 정의
    // 이 meta 속성이 정의된 페이지로 이동하면 beforeEach가 다 동작한다
    // 그리고 그 안에 auth가 true인 경우,
    // 그러니까 meta가 일단 있고 auth가 true인 경우에는 로그인 했는지 체크하고
    // 로그인 하지 않았으면 login 페이지로 넘어가게 하기
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
      // auth는 임의로 정의한 속성 이름
      meta: { auth: true },
    },
    {
      path: '/add',
      component: () => import('@/views/PostAddPage.vue'),
      meta: { auth: true },
    },
    {
      path: '/post/:id',
      component: () => import('@/views/PostEditPage.vue'),
      meta: { auth: true },
    },
    {
      path: '*',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
});

// 라우터 네비게이션 가드는
// 로그인 하지 않은 사용자가 특정 url(ex : /main으로 MainPage에 접근)을 이용해서
// 특정 페이지로 이동했을 때 로그인 하지 않았는데 MainPage로 접근하니까 401 Authorization 에러가 발생한다
// 이런 것들을 구분할 수 있는 라우터의 속성들을 추가하자

// 네비게이션 가드라고 하는 것은 데이터 호출 패턴
// 특정 라우터에 진입하기 전에 예를들어 beforeEnter와 같은 라우터 네비게이션 가드를 이용해서
// 데이터를 먼저 호출하고 받아왔을 때만 로딩하게 할 수 있다
// 이렇게 데이터 호출과 관련된 패턴을 라우터 네비게이션 가드로 구현할 수 있다

// 지금 같은 경우에는 특정 URL에 들어가는 걸 막는 걸 구현할 수 있다
// new VueRouter()인스턴스가 담긴 router에 beforeEach 사용
// beforeEach에 콜백이 들어가는데
// to는 이동하려는 페이지, from은 현재 페이지, next는 페이지 이동할 때 호출하는 api
router.beforeEach((to, from, next) => {
  console.log('to :', to);
  // 특정 페이지에 권한을 부여할 수 있는 방법
  // 지금 권한을 처리해야되는 페이지는
  // login, signup은 사용자가 로그인하지 않아도 들어갈 수 있다
  // 나머지는 사용자가 로그인하지 않은 상태이면 들어갈 수 없게 해야한다
  // meta라는 속성 정의
  // 이 meta 속성이 정의된 페이지로 이동하면 beforeEach가 다 동작한다
  // 그리고 그 안에 auth가 true인 경우,
  // 그러니까 meta가 일단 있고 auth가 true인 경우에는 로그인 했는지 체크하고
  // 로그인 하지 않았으면 login 페이지로 넘어가게 하기

  // to.meta.auth -> '이동하려는 페이지'의 meta.auth가 true이면 로그인 상태여야 '이동하려는 페이지'로 갈 수 있다
  // store.getters.isLogin 이 truthy 값이면 현재 사용자가 로그인 상태다
  if (to.meta.auth && !store.getters.isLogin) {
    // 인증이 필요한 페이지 + 사용자가 로그인한 상태가 아니면 실행
    console.log('인증이 필요합니다');
    // 로그인 페이지로 보낸다
    next('/login');
    return; // return으로 밑에 next() 실행 않게 하기
  }
  next();
});

// main.js에서 import
export default router;
