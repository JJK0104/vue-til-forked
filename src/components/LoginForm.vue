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
