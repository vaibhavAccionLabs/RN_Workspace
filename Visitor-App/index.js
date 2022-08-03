/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './src/App';

if (process.env.NODE_ENV === `development`) {
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest : GLOBAL.XMLHttpRequest;
}

AppRegistry.registerComponent('rwaVisitorApp', () => App);
