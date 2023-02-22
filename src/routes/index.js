import Vue from 'vue';
import VueRouter from 'vue-router';
// import LoginPage from '@/views/LoginPage.vue';
// import SignupPage from '@/views/SignupPage.vue';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
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
    {
      path: '/main',
      component: () => import('@/views/MainPage.vue'),
    },
    {
      path: '/add',
      component: () => import('@/views/PostAddPage.vue'),
    },
    // PostListItem.vue의 this.$router.push(`/post/${id}`);
    // url 주소 : localhost:8080/post/3e88 형식
    // 화면은 PostEditPage
    // this.$route.params는 { id : '3e88' }
    {
      path: '/post/:id',
      component: () => import('@/views/PostEditPage.vue'),
    },
    {
      path: '*',
      component: () => import('@/views/NotFoundPage.vue'),
    },
  ],
});
