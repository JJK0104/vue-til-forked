<template>
  <div class="app">
    <AppHeader></AppHeader>
    <!-- vue3에서 컴포넌트 호출인가 그건가? script setup 설명할때 했던거 다시 보기 -->
    <!-- <demo></demo> -->
    <div class="app-contents">
      <router-view></router-view>
    </div>
    <!-- <demo></demo> -->
  </div>
</template>

<script>
console.log('src/App.vue의 script');
console.log("import AppHeader from 'src/components/common/AppHeader.vue' 전");
import AppHeader from '@/components/common/AppHeader.vue';
// import Demo from './demo/basic/Demo.vue';

export default {
  components: {
    AppHeader,
    // Demo,
  },
  created() {
    console.log('App.vue created');
  },
  mounted() {
    console.log('App.vue mounted');
  },
};
console.log('App.vue의 script 마지막 줄');
</script>

<style>
@import './css/reset.css';
@import './css/common.css';
</style>
