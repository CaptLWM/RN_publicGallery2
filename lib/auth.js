import auth from '@react-native-firebase/auth';

export function signIn({email, password}) {
  // 로그인
  return auth().signInWithEmailAndPassword(email, password);
}

export function signUp({email, password}) {
  // 회원가입
  return auth().createUserWithEmailAndPassword(email, password);
}

export function subscribeAuth(callback) {
  // 앱을 가동할때 또는 로그인 상태가 변경될 때 현재 사용자의 정보를 파라미터로 받아오는 특정 콜백 함수 등록
  return auth().onAuthStateChanged(callback);
}

export function signOut() {
  // 로그아웃
  return auth().signOut();
}

// firebase 회원인증 공식 문서
// https://rnfirebase.io/auth/usage
