// import fireStore from '@react-native-firebase/firestore';

// export const usersCollection = fireStore().collection('users');
// // 특정값을 조회, 등록, 삭제

// export function createUser({id, displayName, photoURL}) {
//   // 주어진 파라미터를 고유 ID로 가지고 있는 문서에 주어진 정보들을 설정해 저장
//   return usersCollection.doc(id).set({
//     id,
//     displayName,
//     photoURL,
//   });
// }

// export async function getUser(id) {
//   // 주어진 파라미터를 고유 ID로 가지고 있는 문서를 조회
//   const doc = await usersCollection.doc(id).get();
//   return doc.data();
// }

import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('users');

export function createUser({id, displayName, photoURL}) {
  return usersCollection.doc(id).set({
    id,
    displayName,
    photoURL,
  });
}

export async function getUser(id) {
  const doc = await usersCollection.doc(id).get();

  return doc.data();
}
