import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import {
  Login,
  Register,
  OTP,
  ForgotPassword,
  AuthLoading,
  Dashboard,
  QRCode,
  CameraScreen
} from './components';

const SigninNavigator = createStackNavigator({
  OTP: {
    screen: OTP,
    navigationOptions: () => ({
      header: null
    })
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      header: null
    })
  },
  Register: {
    screen: Register,
    navigationOptions: () => ({
      header: null
    })
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: () => ({
      header: null
    })
  }
});

const AppNavigator = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
      navigationOptions: {
        header: null
      }
    },
    // CameraScreen: {
    //   screen: CameraScreen,
    //   navigationOptions: {
    //     title: 'camera'
    //   }
    // },
    // QRCode: {
    //   screen: QRCode,
    //   navigationOptions: {
    //     title: ' Scan QR Code'
    //   }
    // }
  },
  {
    initialRouteName: 'Dashboard',
    defaultNavigationOptions: {
      headerTransparent: true,
      headerStyle: {
        paddingTop: 50
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        textAlign: 'center',
        flex: 1,
        fontWeight: 'bold'
      }
    }
  }
);

export const createRootNavigator = () =>
  createAppContainer(
    createSwitchNavigator(
      {
        AuthLoading: AuthLoading,
        Signin: SigninNavigator,
        App: AppNavigator
      },
      {
        initialRouteName: 'Signin'
      }
    )
  );
