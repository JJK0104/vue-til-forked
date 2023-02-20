console.log('src/api/index.js 실행');
import axios from 'axios';
// import store from '../store';
import { setInterceptors } from './common/interceptors';

// 액시오스 초기화 함수
// 4) createInstance 함수 실행
function createInstance() {
  console.log('api/index.js 내 createInstance함수 실행');
  // axios.create이라는 axios api 이용
  // 이 create 안에 AxiosRequestConfig가 들어가게 된다
  // 요청할 때 공통 설정들을 넣을 수 있다
  // 그러면 instance로 데이터 요청(GET,POST,PUT,PATCH,DELETE)을 할 때마다 이 공통 설정들이 정의된 상태로 수행된다
  const instance = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    /*
    // 토큰값 API에 넘기기
    // headers와 Authorization은 임의로 작명한 게 아니라
    // 기본적으로 HTTP 헤더의 스펙이라고 보면 된다
    headers: {
      // Authorization: 'test1234'
      // 이렇게 하고 로그인 하고 Network - XHR에 가보면 login의 Headers - Request Headers를 보면
      // Authorization: test1234가 있다
      // 이게 무슨 말이냐면 api 요청할 때 instance쪽에 정의한 headers의 Authorization 값이 실렸다는 의미다
      // 토큰이라는 것은 항상 headers의 Authorization속성에 실어주면 된다.
      // 그게 바로 토큰으로 api의 권한을 인증하는 방식

      // 그래서
      Authorization: store.state.token, // 이렇게 하고 headers에 가보니까 토큰값이 ''로 있다
      // 변경된 토큰값이 설정된 게 아니라 초기값인 ''이 설정되었다
      // 파일 기준으로 동작 순서를 살펴 보자
      // LoginForm.vue에서 loginUser(userData)를 호출했다. 이 호출 시점을 생각해보면
      // 이미 이 시점에는 axios.create이 이미 실행된 후다
      // 무슨 말이냐면 이 api/index.js파일을 자바스크립트 레벨에서 생성하자마자 빈값을 연결해 버린 거다.
      // vue는 데이터가 바뀌었을 때 화면을 갱신해주는데 자바스크립트는 바뀐값에 대해서 반응 없다.
      // 그래서 이렇게 연결하는 것은 잘못된 방법이다
      // 기본적인 해결책은 interceptors라는 api 이용
    },
    */
  });
  // 5) setInterceptors(instance)함수 호출
  // 6) setInterceptors(instance)함수 실행
  // 9) config.headers.Authorization = store.state.token된 instance 반환
  console.log('api/index.js 내 createInstance 함수내에서 setInterceptors호출');
  return setInterceptors(instance);
}

// 1) 가장 먼저 LoginPage가 렌더링 -> LoginForm.vue 렌더링
// 2) LoginForm.vue에서 import { loginUser } from '@/api/index'로 인해 api/index.js 실행
// 3) createInstance함수 호출
console.log('api/index.js 내 createInstance()로 호출');
const newInstance = createInstance();
// 10) config.headers.Authorization = store.state.token된 instance를
//    newInstance에 할당
// 아직까지는 store.state.token은 ''

// 회원가입 API
function registerUser(userData) {
  return newInstance.post('signup', userData);
}

// 로그인 API
// 11) LoginForm.vue에서 loginUser호출
function loginUser(userData) {
  console.log("로그인 api 호출 : newInstance.post('login', userData)");
  return newInstance.post('login', userData);
}

// 학습 노트 데이터를 조회하는 API
function fetchPosts() {
  console.log("학습 노트 데이터를 조회하는 api호출 : newInstance.get('posts')");
  // localhost:3000/api/docs로 가면 swagger 나오는데 거기서
  // GET /posts의 Try it out 클릭 -> execute 버튼 클릭하면
  // curl이 잘 날라갔고 Request URL 역시 http://localhost:3000/posts 로 잘 날라갔다
  // 근데 아래 응답을 봤더니 401에러(권한 없을 때의 에러)가 떴다
  // 밑에 Description 보면 인증 토근이 유효하지 않아 게시물을 받아올 수 없습니다라고 써져있다
  // swagger의 맨 위에 Authorize라는 버튼이 있다
  // 이 버튼을 누르고 로그인한 사용자의 토큰을 이용해서 GET post api를 요청해야지만 api가 제대로 수행된다
  // 그래서 /login api 클릭하고 Try it out으로 아이디/비번 입력하고 execute 클릭 그러면 Response body에
  // "token" : "~~~~~" 있다. 사용자가 인증되었을 때만 발급되는 토큰
  // 다시 Authorize 버튼을 누르고 이 토큰 값을 복붙하고 Authorize 버튼을 누르면 Authorized라는 문구가 뜰 거다
  // 이제부터는 로그인된 사용자라고 생각하고 api를 날릴 수 있다
  // 이제 다시 GET /posts Try it out 클릭
  return newInstance.get('posts');
}

export { registerUser, loginUser, fetchPosts };

console.log('src/api/index.js 마지막 줄');
