import React from "react";
import { connect } from "react-redux";
import {
  View,
  BackgroundImage,
  Image,
  Touchable,
  Text,
  Spinner,
  Prompt,
  Colors,
  KeyboardAvoidingView,
  LinearGradient
} from "../common";
import { AuthActions } from "../../actions";
import idx from "idx";
import Toast from "react-native-root-toast";
import LoginForm from "./LoginForm";
import { TextInput, StatusBar } from "react-native";

class Login extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      emailPromptVisible: false,
      email: ""
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.loginError) {
      Toast.show(nextProps.loginError, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
    if (nextProps.loginRequestStatus === "SUCCESS") {
      this.props.navigation.dispatch({
        type: "Navigation/RESET",
        index: 0,
        actions: [{ type: "Navigation/NAVIGATE", routeName: "Dashboard" }]
      });
    }
    if (!this.props.isAuthorizedUser && nextProps.isAuthorizedUser) {
      this.props.navigation.dispatch({
        type: "Navigation/RESET",
        index: 0,
        actions: [{ type: "Navigation/NAVIGATE", routeName: "Dashboard" }]
      });
    }
  }

  goToDashboard = () => {
    this.props.navigation.navigate("Dashboard");
  };

  login = loginValues => {
    let ipSupp = {
      ipAddress: "203.192.251.76"
    };
    let body = Object.assign({}, loginValues, ipSupp);
    this.props.login(body);
    console.log("submit", body);
  };

  render() {
    const {
      initialValues,
      loginError,
      loginRequestStatus,
      forgotPasswordRequestStatus
    } = this.props;
    return (
      <KeyboardAvoidingView>
        <View className="screen bgWhite">
          <StatusBar
            translucent
            backgroundColor="rgba(255,255,255,0.1)"
            animated
            barStyle="dark-content"
          />
          <View className="flex f-center f-middle">
            <Image
              source={require("../images/BriclayBold.png")}
              className="logo"
            />
            <Text className="darkgrey xx_large t-center">Sign In</Text>
          </View>
          <View className="flex f-center bg-transparent">
            <View className="expand mh15">
              <LoginForm
                onSubmit={this.login}
                submitError={loginError}
                status={loginRequestStatus}
                initialValues={initialValues}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  const { loginError, loginRequestStatus } = state.login;
  return {
    loginError,
    loginRequestStatus,
    //isAuthorizedUser: true
    isAuthorizedUser: idx(state, _ => _.auth.isAuthorizedUser)
  };
}

export default connect(mapStateToProps, { ...AuthActions })(Login);
