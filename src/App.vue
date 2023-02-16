<template>
  <div>
    <header>
      <!-- router-link 태그는 최종적으로 화면에 a태그로 변환돼서 나타난다 <a href=""></a>  -->
      <!-- to = "이동할 url" -->
      <router-link to="/login">로그인</router-link> |
      <router-link to="/signup">회원가입</router-link>
    </header>
    <!-- page url이 변경됐을 때 url에 따라 뿌려지는 영역을 
        <router-view>라는 라우터가 갖고 있는 태그로 정의할 수 있다.
        <router-view>라는 라우터가 갖고 있는 태그로 정의할 수 있다.
        <router-view>는 Vue 인스턴스에 Router 인스턴스(router)를 연결해야지만(router:router) 사용할 수 있다
    -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>

<style></style>
