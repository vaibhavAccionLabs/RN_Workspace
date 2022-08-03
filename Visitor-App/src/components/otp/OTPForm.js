import React from "react";
import { Field, reduxForm } from "redux-form";
import Toast from "react-native-root-toast";
import {
  View,
  Touchable,
  Text,
  FormInput,
  Spinner,
  LinearGradient
} from "../common";

class OTPForm extends React.PureComponent {
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
          name="otp"
          placeholder="OTP"
          component={FormInput}
          light
          type="phone-pad"
        />
        {this.props.submitError && (
          <View className="f-center">
            <Text className="error">{this.props.submitError}</Text>
          </View>
        )}
        {!this.props.error ? (
          <Touchable
            onPress={this.props.handleSubmit}
            className="btn-complementary rounded m15 expand"
          >
            {this.props.status === "REQUESTING" ? (
              <Spinner />
            ) : (
              <Text className="primary bold large">Verify</Text>
            )}
          </Touchable>
        ) : (
          <Touchable
            onPress={this.showErrorAlert}
            className="btn-complementary rounded m15 expand"
          >
            <Text className="primary bold large">Verify</Text>
          </Touchable>
        )}
      </View>
    );
  }
}

function validate(values) {
  const errors = {};
  if (!values.otp) {
    errors._error = errors._error || "Please enter OTP";
    errors.usernameOrEmail = "Please enter OTP";
  }
  return errors;
}

export default reduxForm({
  form: "OTPForm",
  validate
})(OTPForm);
