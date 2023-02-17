<template>
  <header>
    <!-- router-link 태그는 최종적으로 화면에 a태그로 변환돼서 나타난다 <a href=""></a>  -->
    <!-- to = "이동할 url" -->
    <router-link to="/login">로그인</router-link> |
    <router-link to="/signup">회원가입</router-link>
  </header>
</template>

<script>
export default {};
</script>

<style></style>
