import axios from 'axios';

// axios.create이라는 axios api 이용
// 이 create 안에 AxiosRequestConfig가 들어가게 된다
// 요청할 때 공통 설정들을 넣을 수 있다
const instance = axios.create({
  // http://localhost:3000/ : nodejs를 실행한 서버 주소, api 엔드포인트라고도 얘기한다
  // 대부분의 백엔드 api는 하나의 엔드포인트를 바라본다
  // http://localhost:3000/ 은 프로토타이핑할 때 서버일 수도 있고 혹은 배포했을 때의 서버일 수도 있다
  // 지금은 프로토타이핑할 때의 서버이기 때문에 url을 공통화 하고
  // 환경변수 파일에 저장

  // 프로젝트 루트 폴더에 .env 파일을 만든다
  // .env파일은 키=값 형태로 정의할 수 있는 환경 변수 파일
  // vue cli 2 버전까지는 env파일을 에플리케이션 소스코드에서 들고오기 위해서
  // 웹팩의 DefinePlugin 같은 걸 써줬다
  // 근데 vue cli 3부터는 "VUE_APP_" 접두가가 붙은 변수는 자동 로드
  // process.env.VUE_APP_API_URL로 들고 올수 있다

  // 환경 변수 파일들은 개발용과 배포용을 따로따로 관리해야된다
  // 지금 우리는 프로토타이핑 단계를 development라고 vue cli에서 내부적으로 정의하고 있다
  // vue cli에서 제공하는 괜찮은 방법이 .env.development를 이용하게 되면
  // 우선순위가 작용한다
  // development에서 실행했을 때 .env.development url을 갖고 온다
  // 만약 .env.development에 VUE_APP_API_URL이 없으면 .env 파일에서 갖고 온다

  // npm run build했을 때 production 모드 -> .env.production의 VUE_APP_API_URL을 들고 옴
  // development는 현재 로컬 서버를 띄웠을 때

  // .env 파일은 혹시나 .env.development 나 .env.production에 없을 때 공통으로 들어가야되는 부분
  // .env.development 나 .env.production 파일이 없으면 .env 파일이 우선순위를 가진다

  // baseURL은 작명한 거 아니다 미리 정해져 있는 속성
  baseURL: process.env.VUE_APP_API_URL,
  // 원래는 axios.post('http://localhost:3000/signup',userData)
  // 이제는 instance.post('signup',userData)
});

// 서버 열고 (git clone 받은 거 npm run dev)
// localhost:3000/api/docs/에서 가서 api 문서 보기

// function registerUser(userData) {
//   const url = 'http://localhost:3000/signup' // http://localhost:3000/ : nodejs를 실행한 서버 주소, api 엔드포인트라고도 얘기한다
//   return axios.post(url, userData); // 프로미스 반환
// }

// 회원가입 버튼 누르면
// 개발자 도구 Network 보면 이 페이지에서 일어나는 모든 네트워크 요청 볼 수 있다
// 기본적으로 All이 있고 네트워크 통신 객체를 이용해서 필터링을 할 수 있다
// XHR이 있는데 이건 XMLHttpRequest. 네트워크 요청에 대해서만 필터링
// signup 요청이 간 걸 볼 수 있다(OPTIONS, POST가 있는데 이건 CORS와 관계 있음... 나중에 설명)
// POST쪽을 보면 Headers에 General, Response Headers, Request Headers, Request Payload 있다
// Request Payload 보면 request parameter인 username, password, nickname 볼 수 있다
// 만약 통신 실패하면 우리가 잘 보냈는지 먼저 확인하자... username, password, nickname은 api문서에 있는대로 작명.임의 아님

function registerUser(userData) {
  return instance.post('signup', userData);
}

export { registerUser };
