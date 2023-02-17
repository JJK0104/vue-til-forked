<template>
  <!-- type="submit" 버튼 클릭하면 이벤트 버블링에 의해 form에 submit 이벤트가 걸린다 -->
  <form @submit.prevent="submitForm">
    <div>
      <label for="username">id: </label>
      <!-- v-model -->
      <input id="username" type="text" v-model="username" />
    </div>
    <div>
      <label for="password">pw: </label>
      <input id="password" type="text" v-model="password" />
    </div>
    <div>
      <label for="nickname">nickname: </label>
      <input id="nickname" type="text" v-model="nickname" />
    </div>
    <!-- type="submit" 버튼 클릭하면 이벤트 버블링에 의해 form에 submit 이벤트가 걸린다 -->
    <button type="submit">회원 가입</button>
    <p>{{ logMessage }}</p>
  </form>
</template>

<script>
// 여기서 바로 import axios from 'axios'; 해서
// axios.post()로 해도 되는데
// api 폴더를 만들어서 axios에 대한 공통 부분들을 구조화하고 그걸 가지고 편하게 import해서 쓰는 것이
// 훨씬 정갈한 코드다
import { registerUser } from '@/api/index';

export default {
  data() {
    return {
      // form values
      username: '',
      password: '',
      nickname: '',
      // log
      logMessage: '',
    };
  },
  methods: {
    async submitForm() {
      const userData = {
        // 키 이름은 api문서에 있는대로 써야된다
        username: this.username,
        password: this.password,
        nickname: this.nickname,
      };
      const { data } = await registerUser(userData);
      console.log(data.username);
      this.logMessage = `${data.username} 님이 가입되었습니다`;
      this.initForm();
    },
    initForm() {
      this.username = '';
      this.password = '';
      this.nickname = '';
    },
  },
};
</script>

<style></style>
