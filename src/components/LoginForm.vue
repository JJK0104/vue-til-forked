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
        const { data } = await loginUser(userData);
        console.log(data.user.username);
        // npm i vuex@3.6.2
        // 참고로 package.json에서 dependencies와 devDependencies의 차이점은
        // dependencies에 있는 애들은 npm run build라고 하면 자원이 압축,변환이 돼서 나가는 애들이다
        // 반면에 devDependencies에 있는 애들은 npm run build 결과물에 포함되지 않는다

        // mutation 호출하는 api는 commit
        // this.$store.commit('mutation명',인자1(state이 아닌),..) 으로 뮤테이션 호출
        // mutation의 특징은 속성메서드에 항상 첫번째 인자로 state를 가져온다.
        // 그래서 인자1(data.user.username)은 2번째 인자로 넘어간다
        this.$store.commit('setUsername', data.user.username);
        // vue router Programmatic Navigation(공식문서 : https://router.vuejs.org/guide/essentials/navigation.html#programmatic-navigation)
        // 원래는 <router-link to=""> 태그를 이용해서 클릭해서 url을 변경했었다. 이건 HTML쪽 기능이다
        // 자바스크립트 레벨에서 이용하는 건 this.$router.push()
        this.$router.push('/main');
        // this.logMessage = `${data.user.username} 님 환영합니다`;
        // this.initForm();
      } catch (error) {
        // 에러 핸들링할 코드
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

<style>
.btn {
  color: white;
}
</style>
