import React from "react";
import { connect } from "react-redux";
import {
  View,
  BackgroundImage,
  Image,
  Touchable,
  Text,
  Prompt,
  Spinner,
  Colors,
  FormInput,
  KeyboardAvoidingView,
  LinearGradient
} from "../common";
import { OTPActions } from "../../actions";
import Toast from "react-native-root-toast";
import OTPForm from "./OTPForm";
import Modal from "react-native-modal";
import { Field, reduxForm } from "redux-form";
import { TextInput } from "react-native";

class OTP extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      emailPromptVisible: false,
      email: "",
      hgt: 400
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.resendOTPError) {
      Toast.show(nextProps.resendOTPError, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
    if (nextProps.resendOTPRequestStatus === "SUCCESS") {
      Toast.show("OTP Sent Successfully! Please check your email.", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
    if (!this.props.isOTPVerified && nextProps.isOTPVerified) {
      this.props.navigation.dispatch({
        type: "Navigation/RESET",
        index: 0,
        actions: [
          {
            type: "Navigation/NAVIGATE",
            routeName: "Update Password"
          }
        ]
      });
    }
  }

  verifyOTP = otp => {
    this.props.verifyOTP(otp);
  };

  toggleEmailPrompt = () =>
    this.setState({ emailPromptVisible: !this.state.emailPromptVisible });

  resendOTP = email => {
    this.props.resendOTP({ email });
    this.toggleEmailPrompt();
    this.setState({ email: "" });
  };

  showCancel = () => {
    this.setState({ hgt: 500 });
  };

  gotoLogin = () => this.props.navigation.navigate("Login");

  render() {
    const {
      verifyOTPError,
      verifyOTPRequestStatus,
      resendOTPRequestStatus
    } = this.props;
    const email = this.state.email;
    return (
      <KeyboardAvoidingView>
        <View className="screen">
          <View className="h-2-5">
            <BackgroundImage
              className="flex f-center f-middle"
              source={require("../images/background_images/login_background.png")}
            >
              <Image
                source={require("../images/icons/Car.png")}
                className="logo"
              />
            </BackgroundImage>
          </View>
          <LinearGradient>
            <View className="flex f-center f-middle bg-transparent">
              <View className="expand mh15">
                <OTPForm
                  onSubmit={this.verifyOTP}
                  submitError={verifyOTPError}
                  status={verifyOTPRequestStatus}
                />
                <Touchable
                  className="bg-transparent rounded"
                  onPress={this.toggleEmailPrompt}
                >
                  <View classname="flex f-both">
                    {resendOTPRequestStatus === "REQUESTING" ? (
                      <Spinner color={Colors.complementary} />
                    ) : (
                      <View classname="bg-white">
                        <Text className="small white t-center">Resend OTP</Text>
                        <Touchable
                          onPress={this.gotoLogin}
                          className="bg-transparent"
                        >
                          <Text className="small white t-center">
                            Have password
                          </Text>
                        </Touchable>
                      </View>
                    )}
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
                  <View style={{ flex: 0.3, padding: 10 }}>
                    <Text className="text t-center large black">
                      Resend OTP ?
                    </Text>
                    <Text className=" text t-center medium black mt10">
                      Enter your email address to request a resend otp.
                    </Text>
                    <View className="p5 flex">
                      <TextInput
                        placeholder="Enter your email address"
                        style={{ color: "grey", fontSize: 15 }}
                        value={this.state.email}
                        autoCapitalize="none"
                        onChangeText={text => this.setState({ email: text })}
                        onFocus={this.showCancel()}
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
                          onPress={email => this.resendOTP(this.state.email)}
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
          </LinearGradient>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  const {
    isOTPVerified,
    verifyOTPError,
    verifyOTPRequestStatus,
    resendOTPError,
    resendOTPRequestStatus
  } = state.otp;
  return {
    isOTPVerified,
    verifyOTPError,
    verifyOTPRequestStatus,
    resendOTPError,
    resendOTPRequestStatus
  };
}

export default connect(mapStateToProps, { ...OTPActions })(OTP);
