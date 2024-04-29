/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import SecondWindow from './src/SecondWindow';

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent('SecondWindow', () => SecondWindow);
