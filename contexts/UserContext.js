import React, {createContext, useContext} from 'react';

const UserContext = createContext(null);

export function UserContextProvider({children}) {
  const [user, setUser] = React.useState(null);
  // setUser 호출시점
  // 1. 프로필이 등록된 계정으로 로그인했을 때
  // 2. Welcome 화면에서 프로필 정보를 등록했을 때
  // 3. 앱을 새로 켜서 로그인 상태가 유지됐을 때
  return <UserContext.Provider children={children} value={{user, setUser}} />;
}

// 사용자 정보 조회 context
export function useUserContext() {
  const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error('UserContext.provider is not found');
  }
  return userContext;
}
