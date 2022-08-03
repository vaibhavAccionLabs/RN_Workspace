// import 'react-native-gesture-handler';
// import React from 'react';

// import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

// import DrawerNavigator from './DrawerNavigator';

// const theme = {
//   ...DefaultTheme,
//   colors: {
//     ...DefaultTheme.colors,
//     border: 'transparent',
//   },
// };

// const App = () => {
//   return (
//     <NavigationContainer theme={theme}>
//       <DrawerNavigator />
//     </NavigationContainer>
//   );
// };

// export default () => {
//   return <App />;
// };

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';

// screens
import {Home, ItemDetail} from './screens/';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    border: 'transparent',
  },
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer theme={theme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={'Home'}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default () => {
  return <App />;
};
