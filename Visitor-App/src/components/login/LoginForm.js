import React from "react";
import { Field, reduxForm } from "redux-form";
import Toast from "react-native-root-toast";
import {
  View,
  Image,
  Touchable,
  Text,
  FormInput,
  Spinner,
  Colors
} from "../common";

class LoginForm extends React.PureComponent {
  showErrorAlert = () => {
    Toast.show(this.props.error, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM
    });
  };

  render() {
    return (
      <View className="mh15">
        <View className=" f-row inputField j-start">
          <Field
            name="email"
            placeholder="Email"
            component={FormInput}
            type="email-address"
            cover
          />
        </View>
        <View className="f-row inputField j-start mt5">
          <Field
            name="password"
            placeholder="Password"
            component={FormInput}
            type="password"
            cover
          />
        </View>

        {this.props.submitError && (
          <View className="f-center">
            <Text className="error">{this.props.submitError}</Text>
          </View>
        )}
        {!this.props.error ? (
          <Touchable
            onPress={this.props.handleSubmit}
            className="btn-complementary"
          >
            {this.props.status === "REQUESTING" ? (
              <Spinner />
            ) : (
              <Image
                source={require("../images/icons/Sign-In-icon.png")}
                resizeMode="stretch"
                className="signIcon"
              />
            )}
          </Touchable>
        ) : (
          <Touchable
            onPress={this.showErrorAlert}
            className="btn-complementary"
          >
            <Image
              source={require("../images/icons/Sign-In-icon.png")}
              resizeMode="stretch"
              className="signIcon"
            />
          </Touchable>
        )}
      </View>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.email) {
    errors._error = errors._error || "Please enter your email / username";
    errors.email = "Please enter your email / username";
  }
  if (!values.password) {
    errors._error = errors._error || "Please enter your password";
    errors.password = "Please enter your password";
  }
  return errors;
}

export default reduxForm({
  form: "LoginForm",
  validate
})(LoginForm);
