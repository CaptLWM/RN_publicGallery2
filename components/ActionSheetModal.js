import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ActionSheetModal = ({visible, onClose, actions}) => {
  return (
    <Modal
      visible={visible}
      transparent={true} // 배경 투명
      animationType="fade" // slide(아래에서 위로), fade(서서히), none(기본값)
      onRequestClose={onClose} //안드로이드에서 뒤로가기 버튼 했을때 호출되는 함수
    >
      <Pressable style={styles.background} onPress={onClose}>
        <View style={styles.whiteBox}>
          {/* Todo: props로 받아온 actions 배열 사용 */}
          {actions.map(action => (
            <Pressable
              style={styles.actionButton}
              android_ripple={{color: '#eee'}}
              onPress={() => {
                action.onPress();
                onClose();
              }}
              key={action.text}>
              <Icon
                name={action.icon}
                color="#757575"
                size={24}
                style={styles.icon}
              />
              <Text style={styles.actionText}>{action.text}</Text>
            </Pressable>
          ))}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whiteBox: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 4,
    elevation: 2,
  },
  actionButton: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
  },
});

export default ActionSheetModal;
