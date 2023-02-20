<template>
  <div>
    <h1 class="page-header">회원 가입 페이지</h1>
    <SignupForm></SignupForm>
  </div>
</template>

<script>
console.log('src/views/SignupPage.vue script');
import SignupForm from '@/components/SignupForm.vue';

export default {
  components: {
    SignupForm,
  },
};
console.log('src/views/SignupPage.vue script 마지막 줄');
</script>

<style></style>
