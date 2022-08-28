import React, {useRef} from 'react';
import BorderedInput from './BorderedInput';
const SignInForm = ({isSignUp, onSubmit, form, createChangeTextHandler}) => {
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  return (
    <>
      <BorderedInput
        hasMarginBottom
        placeholder="이메일"
        value={form.email}
        onChangeText={createChangeTextHandler('email')}
        autoCapitalize="none" // 첫번째 문자 자동대문자 비활성화
        autoCorrect={false} // 자동수정 비활성화
        autoCompleteType="email" // 이메일 자동완성 활성화
        keyboardType="email-address" // 이메일 전용 키보드 활성화
        returnKeyType="next" // enter키 입력하면 다음으로
        onSubmitEditing={() => passwordRef.current.focus()}
      />
      <BorderedInput
        placeholder="비밀번호"
        hasMarginBottom={isSignUp}
        value={form.password}
        onChangeText={createChangeTextHandler('password')}
        secureTextEntry // 비밀번호 비공개
        ref={passwordRef}
        returnKeyType={isSignUp ? 'next' : 'done'}
        onSubmitEditing={() => {
          if (isSignUp) {
            confirmPasswordRef.current.focus();
          } else {
            onSubmit();
          }
        }}
      />
      {isSignUp && (
        <BorderedInput
          placeholder="비밀번호 확인"
          value={form.confirmPassword}
          onChangeText={createChangeTextHandler('confirmPassword')}
          secureTextEntry
          ref={confirmPasswordRef}
          returnKeyType="done"
          onSubmitEditing={onSubmit}
        />
      )}
    </>
  );
};

export default SignInForm;
