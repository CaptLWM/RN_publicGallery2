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

export const PAGE_SIZE = 12;

// export async function getPosts(userId) {
//   // 포스트 목록 조회
//   let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
//   if (userId) {
//     query = query.where('user.id', '==', userId);
//   }

//   const snapshot = await query.get();
//   const posts = snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return posts;
// }

// export async function getOlderPosts(id, userId) {
//   const cursorDoc = await postsCollection.doc(id).get();
//   let query = postsCollection
//     .orderBy('createdAt', 'desc')
//     .startAfter(cursorDoc)
//     .limit(PAGE_SIZE);
//   if (userId) {
//     query = query.where('user.id', '==', userId);
//   }
//   const snapshot = await query.get();
//   const posts = snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//   }));

//   return posts;
// }

// export async function getNewerPosts(id) {
//   const cursorDoc = await postsCollection.doc(id).get();
//   let query = postsCollection
//     .orderBy('createdAt', 'desc')
//     .endBefore(cursorDoc) // 이전문서 조회
//     .limit(PAGE_SIZE);

//   if (userId) {
//     query = query.where('user.id', '==', userId);
//   }

//   const snapshot = await query.get();
//   const posts = snapshot.docs.map(doc => ({
//     id: doc.id,
//     ...doc.data(),
//   }));
//   return posts;
// }

// 리팩토링
export async function getPosts({userId, mode, id} = {}) {
  // 기본값 설정 안하면 구조분해 과정에서 오류 발생
  let query = postsCollection.orderBy('createdAt', 'desc').limit(PAGE_SIZE);
  if (userId) {
    query = query.where('user.id', '==', userId);
  }
  if (id) {
    const cursorDoc = await postsCollection.doc(id).get();
    query =
      mode === 'older'
        ? query.startAfter(cursorDoc)
        : query.endBefore(cursorDoc);
  }

  const snapshot = await query.get();

  const posts = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));

  return posts;
}

export async function getOlderPosts(id, userId) {
  return getPosts({
    id,
    mode: 'older',
    userId,
  });
}

export async function getNewerPosts(id, userId) {
  return getPosts({
    id,
    mode: 'newer',
    userId,
  });
}

export function removePost(id) {
  // 포스트 삭제
  return postsCollection.doc(id).delete();
}

export function updatePost({id, description}) {
  return postsCollection.doc(id).update({
    description,
  });
}
