import {useNavigation, useNavigationState} from '@react-navigation/native';
import React, {useMemo} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useUserContext} from '../contexts/UserContext';
import usePostActions from '../hooks/usePostAction';
import ActionSheetModal from './ActionSheetModal';
import Avatar from './Avatar';

const PostCard = ({user, photoURL, description, createdAt, id}) => {
  const routeNames = useNavigationState(state => state.routeNames);
  // 현재 네비게이션 상태 조회해 조거에 따라 MyProfile로 이동하도록 수정

  const date = useMemo(
    () => (createdAt ? new Date(createdAt._seconds * 1000) : new Date()),
    [createdAt],
  );
  const navigation = useNavigation();
  const {user: me} = useUserContext();
  const {isSelecting, onPressMore, onClose, actions} = usePostActions({
    id,
    description,
  });
  const isMyPost = me.id === user.id;

  const onOpenProfile = () => {
    // MyProfile이 존재하는지 확인
    if (routeNames.find(routeName => routeName === 'MyProfile')) {
      navigation.navigate('MyProfile');
    } else {
      navigation.navigate('Profile', {
        userId: user.id,
        displayName: user.displayName,
      });
    }
  };

  return (
    <>
      <View style={styles.block}>
        <View style={[styles.head, styles.paddingBlock]}>
          <Pressable style={styles.profile} onPress={onOpenProfile}>
            <Avatar source={user.photoURL && {uri: user.photoURL}} />
            <Text style={styles.displayName}>{user.displayName}</Text>
          </Pressable>
          {isMyPost && (
            <Pressable hitSlop={8} onPress={onPressMore}>
              {/* hitSlop:터치영역 확장, 객체도 가능(사각형)*/}
              <Icon name="more-vert" size={20} />
            </Pressable>
          )}
        </View>
        <Image
          source={{uri: photoURL}}
          style={styles.image}
          resizeMethod="resize"
          resizeMode="cover"
        />
        <View style={styles.paddingBlock}>
          <Text style={styles.description}>{description}</Text>
          <Text date={date} style={styles.date}>
            {date.toLocaleString()}
          </Text>
        </View>
      </View>
      <ActionSheetModal
        visible={isSelecting}
        actions={actions}
        onClose={onClose}
      />
    </>
  );
};

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 16,
  },
  paddingBlock: {
    paddingHorizontal: 16,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    lineHeight: 16,
    fontSize: 16,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '100%',
    aspectRatio: 1, // 자식요소 비율
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default PostCard;
