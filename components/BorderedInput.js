import React from 'react';
import {StyleSheet, TextInput} from 'react-native';

const BorderedInput = ({hasMarginBottom, ...rest}, ref) => {
  return (
    <TextInput
      style={[styles.input, hasMarginBottom && styles.margin]}
      ref={ref}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderColor: '#bdbdbd',
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    height: 48,
    backgroundColor: 'white',
  },
  margin: {
    marginBottom: 16,
  },
});

export default React.forwardRef(BorderedInput);
// ref 이용해 borderinput 안에 textinput으로 접근하게 해줌
// 컴포넌트를 선언하는 단계에서 사용 가능
