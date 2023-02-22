// 로그인, 회원 가입, 회원 탈퇴 같은 사용자 계정 관련된 api들
import { instance } from './index';

// 회원가입 API
function registerUser(userData) {
  return instance.post('signup', userData);
}

// 로그인 API
function loginUser(userData) {
  return instance.post('login', userData);
}

export { registerUser, loginUser };
