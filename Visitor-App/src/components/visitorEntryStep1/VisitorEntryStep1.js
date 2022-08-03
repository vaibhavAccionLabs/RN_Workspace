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
import VisitorEntryStep1Form from "./VisitorEntryStep1Form";
import { TextInput, StatusBar } from "react-native";

class VisitorEntryStep1 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: ""
    };
  }

  goToDashboard = () => {
    this.props.navigation.navigate("Dashboard");
  };

  visitor = initialValues => {
    console.log(initialValues, "step1");
    this.props.navigation.navigate("VisitorEntryStep2", {
      step1: initialValues
    });
  };

  render() {
    const { initialValues } = this.props;
    return (
      <KeyboardAvoidingView>
        <View className="screen bgWhite">
          <StatusBar
            translucent
            backgroundColor="rgba(255,255,255,0.1)"
            animated
            barStyle="dark-content"
          />
          <View className="f-row mt50">
            <Touchable onPress={this.goToDashboard}>
              <View>
                <Image
                  source={require("../images/icons/Back-tab.png")}
                  className="large_thumb"
                />
              </View>
            </Touchable>
            <View className="flex f-both mr20">
              <Image
                source={require("../images/icons/Payment.png")}
                className="medium_thumb"
              />
              <Text className="black large t-center">Visitor Registration</Text>
            </View>
          </View>
          <View className="flex f-center f-middle bg-transparent">
            <View className="expand mh15">
              <VisitorEntryStep1Form
                onSubmit={this.visitor}
                initialValues={initialValues}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default VisitorEntryStep1;

// function mapStateToProps(state) {
//   const { loginError, loginRequestStatus } = state.login;
//   return {
//     loginError,
//     loginRequestStatus,
//     //isAuthorizedUser: true
//     isAuthorizedUser: idx(state, _ => _.auth.isAuthorizedUser)
//   };
// }

// export default connect(mapStateToProps, { ...AuthActions })(VisitorEntry);
