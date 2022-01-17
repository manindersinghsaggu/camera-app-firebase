/**
 * @format
 */

import {firebase} from '@react-native-firebase/database';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

var config = {
  databaseURL: 'https://reactass-7118f-default-rtdb.firebaseio.com',
  projectId: 'reactass-7118f',
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
// firebase.initializeApp(config);

AppRegistry.registerComponent(appName, () => App);
