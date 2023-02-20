console.log('src/main.js 실행');
import Vue from 'vue';
console.log('main.js import App.vue 전');
import App from './App.vue';
console.log('main.js import App.vue 후');
// 밑에 store, router 순서 바꾸면 콘솔 순서도 바뀐다
import store from '@/store/index';
import router from '@/routes/index';
console.log('main.js router, store import후');

Vue.config.productionTip = false;

console.log("new Vue({render:h=>h(App),router,store}).$mount('#app')");
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');

console.log('src/main.js 마지막 줄');
