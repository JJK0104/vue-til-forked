<template>
  <div>
    <AppHeader></AppHeader>
    <!-- page url이 변경됐을 때 url에 따라 뿌려지는 영역을 
        <router-view>라는 라우터가 갖고 있는 태그로 정의할 수 있다.
        <router-view>는 Vue 인스턴스에 Router 인스턴스(router)를 연결해야지만(router:router) 사용할 수 있다
    -->
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from '@/components/common/AppHeader.vue';

export default {
  components: {
    AppHeader,
  },
};
</script>

<style></style>
