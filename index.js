/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-get-random-values'; // 파일 업로드 고유 아이디 생성

AppRegistry.registerComponent(appName, () => App);
