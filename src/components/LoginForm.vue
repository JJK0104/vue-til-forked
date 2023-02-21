<template>
  <div class="contents">
    <div class="form-wrapper form-wrapper-sm">
      <form @submit.prevent="submitForm" class="form">
        <div>
          <label for="username">id:</label>
          <input id="username" type="text" v-model="username" />
          <p class="validation-text">
            <span class="warning" v-if="!isUsernameValid && username">
              Please enter an email address
            </span>
          </p>
        </div>
        <div>
          <label for="password">pw:</label>
          <input id="password" type="text" v-model="password" />
        </div>
        <button
          :disabled="!isUsernameValid || !password"
          type="submit"
          class="btn"
        >
          로그인
        </button>
      </form>
      <p class="log">{{ logMessage }}</p>
    </div>
  </div>
</template>

<script>
console.log('LoginForm.vue의 script');
console.log("import { validateEmail } from 'src/utils/validation'");
console.log("import { loginUser } from 'src/api/index'");
// import validateEmail, loginUser 순서 바꾸면 콘솔 출력 순서 바뀜
import { validateEmail } from '@/utils/validation';
import { loginUser } from '@/api/index';
// 1) import { loginUser } from '@/api/index'로 인해 api/index.js 실행 --> 여기부터 틀렸다
// import { loginUser } from '@api/index'는 이전에 실행됨
// 그냥 콘솔창 순서 확인 ㄱㄱ
import { saveAuthToCookie, saveUserToCookie } from '@/utils/cookies';

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
  created() {
    console.log('LoginForm created');
  },
  mounted() {
    console.log('LoginForm mounted');
  },
  computed: {
    isUsernameValid() {
      return validateEmail(this.username);
    },
  },
  methods: {
    async submitForm() {
      try {
        // 비즈니스 로직
        const userData = {
          username: this.username,
          password: this.password,
        };
        // 로그인 API
        console.log(
          '로그인 버튼 클릭 -> src/api/index.js에서 export/import한 loginUser 함수 호출',
        );
        const { data } = await loginUser(userData);
        console.log(
          'await loginUser(userData) 바로 밑에 있는 문장... 비동기 처리가 끝났다는 걸 의미?',
        );
        // 로그인 성공하면 토큰값 받는다
        console.log(
          'await loginUser(userData) 후 = 로그인 api 성공 후 로그인 토큰 값',
          data.token,
        );
        // 이제 이 토큰값을 어딘가에 저장하고 api를 호출할 때마다 불러오면 된다
        console.log("this.$store.commit('setToken')으로 토큰값 state에 저장");
        this.$store.commit('setToken', data.token); // 이게 실행된 후에서야 store.state.token에 값들어감
        this.$store.commit('setUsername', data.user.username);
        // 단순히 자바스크립트 레벨에서 저장하는 게 아니라
        // 브라우저 저장소를 이용해서 토큰값을 저장해 놓으면 새로고침을 하더라도 브라우저 저장소에서 그 값을 꺼내와서 사용할 수 있다.
        // 따라서 이 부분에 src/utils/cookies.js 에 정의된 함수들을 사용하겠다.
        saveAuthToCookie(data.token);
        saveUserToCookie(data.user.username);
        // 이제 쿠키에다 토큰과 username을 다 저장한 상태가 된다
        // 이제 화면으로 돌아가서 쿠키 레벨을 확인해보자
        // 쿠키가 저장되는 걸 확인할 수 있는 방법은
        // 개발자 도구 - Application 패널 - Storage - Cookies - http://localhost:8080에 있다
        // 로그인 하고 til_auth와 til_user가 잘 저장되나 확인
        // 아직까지는 새로고침하면 여전히 문제가 있다
        // 왜냐면 지금은 쿠키에 저장된 값이 vue의 store에 연결되어 있지 않으니까
        // src/utils/cookies에 보면 쿠키에서 값을 가져올 때 get~FromCookie가 있다
        // 이 함수들을 이용해서 쿠키에 저장된 값을 store/index.js 에서 활용하면 된다.
        // src/store/index.js로 가보자
        console.log("this.$router.push('/main')으로 MainPage로 이동");
        this.$router.push('/main');
      } catch (error) {
        // 에러 핸들링할 코드
        console.log(error.response.data);
        this.logMessage = error.response.data;
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
console.log('LoginForm.vue의 script 마지막 줄');
</script>

<style>
.btn {
  color: white;
}
</style>
