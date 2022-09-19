import {useNavigation} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import Profile from '../components/Profile';
import {useUserContext} from '../contexts/UserContext';

const MyProfileScreen = () => {
  const {user} = useUserContext();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: user.displayName,
    });
  }, [navigation, user]);
  return <Profile userId={user.id} />;
};

export default MyProfileScreen;
