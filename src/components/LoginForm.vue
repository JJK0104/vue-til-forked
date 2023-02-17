<template>
  <form @submit.prevent="submitForm">
    <div>
      <!-- 회원가입한 아이디, pw 입력 -->
      <label for="username">id:</label>
      <input
        id="username"
        type="text"
        placeholder="이메일 형식을 입력해주세요"
        v-model="username"
      />
    </div>
    <div>
      <label for="password">pw:</label>
      <input id="password" type="text" v-model="password" />
    </div>
    <button :disabled="!isUsernameValid || !password" type="submit">
      로그인
    </button>
    <p>{{ logMessage }}</p>
  </form>
</template>

<script>
import { loginUser } from '@/api/index';
import { validateEmail } from '@/utils/validation';

export default {
  data() {
    return {
      // form values
      username: '',
      password: '',
      // log
      logMessage: '',
    };
  },
  // computed 속성은 데이터 변화에 따라서, props가 됐건 data가 됐건 store가 됐건
  // 자동으로 계산해준다
  computed: {
    isUsernameValid() {
      // this.username이 한 글자 한글자 바뀔 때마다 validateEmail(this.username)이 실행된다
      // true or false 반환
      return validateEmail(this.username);
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직, 필요한 로직
        const userData = {
          username: this.username,
          password: this.password,
        };
        const { data } = await loginUser(userData);
        console.log(data.user.username);
        this.logMessage = `${data.user.username} 님 환영합니다`;
        // this.initForm();
      } catch (error) {
        // 에러 핸들링할 코드
        // Failed to load resource: the server responded with a status of 401 (Unauthorized)
        // axios에 대한 post 요청에 대한 에러이기 때문에 에러 안에 response가 있다는 걸 알 수 있다
        console.log(error.response.data);
        this.logMessage = error.response.data;
        // this.initForm();
      } finally {
        this.initForm();
      }
    },
    initForm() {
      this.username = '';
      this.password = '';
    },
  },
};
</script>

<style></style>
