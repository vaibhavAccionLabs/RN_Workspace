import React from "react";
import { Field, reduxForm } from "redux-form";
import Toast from "react-native-root-toast";
import { View, Touchable, Text, FormInput, Spinner } from "../common";

class RegisterForm extends React.PureComponent {
  showErrorAlert = () => {
    Toast.show(this.props.error, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM
    });
  };

  render() {
    return (
      <View className="mh15">
        <Field
          name="emailOrPhone"
          placeholder="Email"
          component={FormInput}
          type="email-address"
          light
        />
        <Field
          name="username"
          placeholder="username"
          component={FormInput}
          type="email-address"
          light
        />
        <Field
          name="password"
          placeholder="Password"
          component={FormInput}
          type="password"
          light
        />
        {this.props.submitError && (
          <View className="f-center">
            <Text className="error">{this.props.submitError}</Text>
          </View>
        )}
        {!this.props.error ? (
          <Touchable
            onPress={this.props.handleSubmit}
            className="btn-complementary rounded_15 m15 expand"
          >
            {this.props.status === "REQUESTING" ? (
              <Spinner />
            ) : (
              <Text className="primary large bold">Register</Text>
            )}
          </Touchable>
        ) : (
          <Touchable
            onPress={this.showErrorAlert}
            className="btn-complementary rounded_15 m15 expand"
          >
            <Text className="primary large bold">Register</Text>
          </Touchable>
        )}
      </View>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.emailOrPhone) {
    errors._error = errors._error || "Please enter your email / phone";
    errors.usernameOrEmail = "Please enter your email / phone";
  }
  if (!values.password) {
    errors._error = errors._error || "Please enter your password";
    errors.password = "Please enter your password";
  }
  return errors;
}

export default reduxForm({
  form: "RegisterForm",
  validate
})(RegisterForm);
