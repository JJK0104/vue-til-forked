import Vue from 'vue';
import App from './App.vue';
import router from '@/routes/index';
import store from '@/store/index';
// filter 함수 가져오기
import { formatDate } from '@/utils/filters';

// 전역 filter로 설정
// PostListItem.vue ㄱㄱ
Vue.filter('formatDate', formatDate);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app');
