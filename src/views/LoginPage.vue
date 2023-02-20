<template>
  <div>
    <h1 class="page-header">로그인 페이지</h1>
    <LoginForm></LoginForm>
  </div>
</template>

<script>
console.log('src/views/LoginPage.vue의 script');
console.log("import LoginForm from 'src/components/LoginForm.vue' 전");
import LoginForm from '@/components/LoginForm.vue';

export default {
  components: {
    LoginForm,
  },
  created() {
    console.log('LoginPage created');
  },
  mounted() {
    console.log('LoginPage mounted');
  },
};
console.log('src/views/LoginPage.vue의 script 마지막 줄');
</script>

<style></style>
