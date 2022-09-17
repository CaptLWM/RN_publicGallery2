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

export const PAGE_SIZE = 3;

export async function getPosts() {
  // 포스트 목록 조회
  const snapshot = await postsCollection
    .orderBy('createdAt', 'desc')
    .limit(PAGE_SIZE)
    .get();
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
}

export async function getOlderPosts(id) {
  const cursorDoc = await postsCollection.doc(id).get();
  const snapshot = await postsCollection
    .orderBy('createdAt', 'desc')
    .startAfter(cursorDoc)
    .limit(PAGE_SIZE)
    .get();
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

export async function getNewerPosts(id) {
  const cursorDoc = await postsCollection.doc(id).get();
  const snapshot = await postsCollection
    .orderBy('createdAt', 'desc')
    .endBefore(cursorDoc) // 이전문서 조회
    .limit(PAGE_SIZE)
    .get();
  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  return posts;
}
