import firestore from '@react-native-firebase/firestore';

const postsCollection = firestore().collection('posts');

export function createPost({user, photoURL, description}) {
  return postsCollection.add({
    user, // userContext에 담긴 사용자 정보 객체
    photoURL, // 업로드할 이미지 주소
    description, // 이미지 설명
    createdAt: firestore.FieldValue.serverTimestamp(),
    // firestore 데이터 등록 시 서버측에서 등록 시간 정하도록
  });
}
