import {
  createStackNavigator,
  createSwitchNavigator,
  createAppContainer
} from 'react-navigation';

import {
  Login,
  AuthLoading,
  Dashboard,
  VenderEntry,
  Visitor,
  WhomToMeet,
  VisitorList,
  QRCode,
  CameraScreen
} from './components';

const SigninNavigator = createStackNavigator({
  Login: {
    screen: Login,
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
    VenderEntry: {
      screen: VenderEntry,
      navigationOptions: {
        title: 'Vendor'
      }
    },
    CameraScreen: {
      screen: CameraScreen,
      navigationOptions: {
        title: 'camera'
      }
    },
    Visitor: {
      screen: CameraScreen,
      navigationOptions: {
        title: 'Visitor Registration'
      }
    },
    WhomToMeet: {
      screen: WhomToMeet,
      navigationOptions: {
        title: 'Whom To Meet'
      }
    },
    VisitorList: {
      screen: VisitorList,
      navigationOptions: {
        title: 'Visitor List'
      }
    },
    QRCode: {
      screen: QRCode,
      navigationOptions: {
        title: ' Scan QR Code'
      }
    }
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
        initialRouteName: 'AuthLoading'
      }
    )
  );
