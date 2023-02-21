console.log('src/utils/cookies.js');

// 쿠키를 보통 셋업하는 방법은 document.cookie를 통해서 문자열을 넣어주면된다
// 우리는 til_auth와 til_user 라는 걸 이용해서 간단하게 쿠키에 값을 저장하고 꺼내오는 걸 해보겠습니다
// 정규식 같은 건 한번 확인해서 추가해주면 된다
function saveAuthToCookie(value) {
  document.cookie = `til_auth=${value}`;
}

function saveUserToCookie(value) {
  document.cookie = `til_user=${value}`;
}

function getAuthFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)til_auth\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function getUserFromCookie() {
  return document.cookie.replace(
    /(?:(?:^|.*;\s*)til_user\s*=\s*([^;]*).*$)|^.*$/,
    '$1',
  );
}

function deleteCookie(value) {
  document.cookie = `${value}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export {
  saveAuthToCookie,
  saveUserToCookie,
  getAuthFromCookie,
  getUserFromCookie,
  deleteCookie,
};

console.log('src/utils/cookies.js 마지막 줄');
