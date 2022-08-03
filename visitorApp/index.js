/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import bgMessaging from './src/bgMessaging';
import { name as appName } from './app.json';

if (process.env.NODE_ENV === `development`) {
  XMLHttpRequest = GLOBAL.originalXMLHttpRequest
    ? GLOBAL.originalXMLHttpRequest
    : GLOBAL.XMLHttpRequest;
}

AppRegistry.registerComponent(appName, () => App);

// New task registration
AppRegistry.registerHeadlessTask(
  'RNFirebaseBackgroundMessage',
  () => bgMessaging
);
