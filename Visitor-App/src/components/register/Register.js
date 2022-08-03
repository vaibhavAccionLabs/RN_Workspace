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
import RegisterForm from "./RegisterForm";
import { TextInput } from "react-native";
import Modal from "react-native-modal";

class Register extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      emailPromptVisible: false
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.forgotPasswordError) {
      Toast.show(nextProps.forgotPasswordError, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
    if (nextProps.forgotPasswordRequestStatus === "SUCCESS") {
      // Toast.show("OTP Sent Successfully! Please check your email.", {
      //   duration: Toast.durations.LONG,
      //   position: Toast.positions.BOTTOM
      // });
      this.props.navigation.dispatch({
        type: "Navigation/RESET",
        index: 0,
        actions: [{ type: "Navigation/NAVIGATE", routeName: "SplashScreen" }]
      });
    }
    if (!this.props.isAuthorizedUser && nextProps.isAuthorizedUser) {
      this.props.navigation.dispatch({
        type: "Navigation/RESET",
        index: 0,
        actions: [{ type: "Navigation/NAVIGATE", routeName: "Main" }]
      });
    }
  }

  toggleEmailPrompt = () =>
    this.setState({ emailPromptVisible: !this.state.emailPromptVisible });

  goToLogin = () => this.props.navigation.navigate("Login");

  register = registerValues => {
    this.props.register(registerValues);
  };

  render() {
    const { initialValues, registerError, registerRequestStatus } = this.props;
    return (
      <KeyboardAvoidingView>
        <View className="screen bg-blue">
          <View className="flex f-center f-middle">
            <Image
              source={require("../images/BriclayBold.png")}
              className="logo"
            />
            <Text className="white xx_large t-center">Register</Text>
          </View>
          <View className="flex f-center f-middle bg-transparent">
            <View className="expand mh15">
              <RegisterForm
                onSubmit={this.register}
                submitError={registerError}
                status={registerRequestStatus}
                initialValues={initialValues}
              />
              <Touchable
                className="f-both bg-transparent rounded"
                onPress={this.goToLogin}
              >
                <View className="flex f-both">
                  <Text className="complementary small t-center">Login</Text>
                </View>
              </Touchable>
              <Modal
                isVisible={this.state.emailPromptVisible}
                style={{
                  flex: 0.3,
                  padding: 20,
                  backgroundColor: "#ededed",
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: "transparent"
                }}
              >
                <View style={{ flex: 1, margin: 10 }}>
                  <Text className="text t-center large black">
                    Forgot Password ?
                  </Text>
                  <Text className=" text t-center medium black mt10">
                    Enter your email address to request a password reset.
                  </Text>
                  <View className="p5 flex">
                    <TextInput
                      placeholder="Enter your email address"
                      style={{ color: "grey", fontSize: 15 }}
                      value={this.state.email}
                      autoCapitalize="none"
                      onChangeText={text => this.setState({ email: text })}
                      underlineColorAndroid="grey"
                    />
                  </View>

                  <View className="f-row">
                    <View>
                      <Touchable
                        onPress={this.toggleEmailPrompt}
                        style={{
                          backgroundColor: "transparent",
                          height: 40,
                          width: 140,
                          borderWidth: 1,
                          borderColor: "grey"
                        }}
                      >
                        <Text className="text bold medium primary t-center">
                          Cancel
                        </Text>
                      </Touchable>
                    </View>
                    <View>
                      <Touchable
                        onPress={email => this.forgotPassword(this.state.email)}
                        style={{
                          backgroundColor: "transparent",
                          height: 40,
                          width: 140,
                          borderWidth: 1,
                          borderColor: "grey"
                        }}
                      >
                        <Text className="text bold medium primary t-center">
                          Request
                        </Text>
                      </Touchable>
                    </View>
                  </View>
                </View>
              </Modal>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  const { registerError, registerRequestStatus } = state.register;
  return {
    registerError,
    registerRequestStatus,
    isAuthorizedUser: idx(state, _ => _.auth.isAuthorizedUser)
  };
}

export default connect(mapStateToProps, { ...AuthActions })(Register);
