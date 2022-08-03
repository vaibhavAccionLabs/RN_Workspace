import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { AsyncStorage } from "react-native";
import { Provider } from "react-redux";
import { View } from "./components/common";
import Splash from "./components/splash-screen/Splash";
import SplashScreen from "./components/splash-screen/SplashScreen";
import OTP from "./components/otp/OTP";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Profile from "./components/profile/Profile";
import Notifications from "./components/notification/Notification";
import Logout from "./components/logout/Logout";
import Vendor from "./components/vender/Vendor";
import VisitorEntryStep2 from "./components/visitorEntryStep2/VisitorEntryStep2";
import VisitorEntryStep1 from "./components/visitorEntryStep1/VisitorEntryStep1";
import VisitorEntryStep3 from "./components/visitorEntryStep3/VisitorEntryStep3";
import VisitorsList from "./components/visitorsList/VisitorsList";
import Examples from "./components/examples/Examples";
import configureStore from "./configure-store";

const AppNavigator = StackNavigator({
  // SplashScreen: {
  //   screen: SplashScreen,
  //   navigationOptions: () => ({
  //     header: null
  //   })
  // },
  Dashboard: {
    screen: Dashboard,
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
  Vendor: {
    screen: Vendor,
    navigationOptions: () => ({
      header: null
    })
  },
  VisitorsList: {
    screen: VisitorsList,
    navigationOptions: () => ({
      header: null
    })
  },
  VisitorEntryStep1: {
    screen: VisitorEntryStep1,
    navigationOptions: () => ({
      header: null
    })
  },
  VisitorEntryStep2: {
    screen: VisitorEntryStep2,
    navigationOptions: () => ({
      header: null
    })
  },
  VisitorEntryStep3: {
    screen: VisitorEntryStep3,
    navigationOptions: () => ({
      header: null
    })
  }
  // Register: {
  //   screen: Register,
  //   navigationOptions: () => ({
  //     header: null
  //   })
  // },
  // OTP: {
  //   screen: OTP,
  //   navigationOptions: () => ({
  //     header: null,
  //   }),
  // },

  // Profile: {
  //   screen: Profile,
  //   navigationOptions: () => ({
  //     header: null
  //   })
  // },
  // Notifications: {
  //   screen: Notifications,
  //   navigationOptions: () => ({
  //     header: null
  //   })
  // }
});

class App extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      store: null
    };
  }

  componentWillMount() {
    AsyncStorage.getItem("authState", (error, localState) => {
      let store = null;
      if (!error && localState) {
        const auth = JSON.parse(localState);
        const initialState = {};
        if (auth) {
          initialState.auth = auth;
        }
        store = configureStore(initialState);
      } else {
        store = configureStore();
      }
      this.setState({ store });
    });
  }

  render() {
    return (
      <View className="screen app-container">
       { this.state.store && <Provider store={this.state.store}>
          <AppNavigator onNavigationStateChange={null} />
        </Provider>}
        {/* {this.state.store ? (
          <Provider store={this.state.store}>
            <AppNavigator onNavigationStateChange={null} />
          </Provider>
        ) : (
          <View className="abs-cover f-both">
            <Splash />
          </View>
        )} */}
      </View>
    );
  }
}

export default App;
