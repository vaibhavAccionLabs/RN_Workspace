import React from "react";
import { Field, reduxForm } from "redux-form";
import Toast from "react-native-root-toast";
import {
  View,
  Touchable,
  SelectInput,
  Icon,
  BackgroundImage,
  Image,
  Text,
  MultiImageUpload,
  ScrollView,
  FormInput,
  Spinner
} from "../common";

class VisitorEntryStep3Form extends React.PureComponent {
  showErrorAlert = () => {
    Toast.show(this.props.error, {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: '#6783FF'
    });
  };

  render() {
    return (
      <View>
        <ScrollView>
        <View className="mt20">
          <View className=" f-row inputField j-start mt5">
            <Image
              className="mini_thumb mt20 mr10"
              source={require("../images/icons/Profile.png")}
            />
            <Field
              name="name.firstName"
              placeholder="First name"
              component={FormInput}
              type="email-address"
              cover
            />
          </View>
          <View className=" f-row inputField j-start mt5">
            <Image
              className="mini_thumb mt20 mr10"
              source={require("../images/icons/Profile.png")}
            />
            <Field
              name="name.lastName"
              placeholder="Last name"
              component={FormInput}
              type="email-address"
              cover
            />
          </View>
          <View className=" f-row inputField j-start mt5">
            <Image
              className="mini_thumb mt20 mr10"
              source={require("../images/icons/Phone.png")}
            />
            <Field
              name="extension"
              placeholder="Extension"
              component={FormInput}
              type="numeric"
              cover
            />
          </View>
          <View className=" f-row inputField j-start mt5">
            <Image
              className="mini_thumb mt20 mr10"
              source={require("../images/icons/Profile.png")}
            />
            <Field
              name="block.name"
              placeholder="Block"
              component={FormInput}
              type="email-address"
              cover
            />
          </View>
          <View className=" f-row inputField j-start mt5">
            <Image
              className="mini_thumb mt20 mr10"
              source={require("../images/icons/Profile.png")}
            />
            <Field
              name="apartment.name"
              placeholder="Apt #"
              component={FormInput}
              type="email-address"
              cover
            />
          </View>
          <View className=" f-row inputField j-start mt5">
            <Image
              className="mini_thumb mt20 mr10"
              source={require("../images/icons/Profile.png")}
            />
            <Field
              name="purpose"
              placeholder="Purpose"
              component={FormInput}
              type="email-address"
              cover
            />
          </View>
        </View>
        <View
          className="f-row f-both"
          style={{
            height: 50,
            width: 150,
            borderWidth: 5,
            borderColor: "#DCDCDC",
            borderRadius: 10
          }}
        >
        {!this.props.error ? (
          <Touchable
            onPress={this.props.handleSubmit}
            className="btn-transparent rounded_8 m10 expand"
          >
            {this.props.status === "REQUESTING" ? (
              <Spinner />
            ) : (
              <Image
                source={require("../images/icons/Submit-tab.png")}
                resizeMode="stretch"
                className="submitIcon"
              />
            )}
          </Touchable>
        ) : (
          <Touchable
            onPress={this.showErrorAlert}
            className="btn-transparent rounded_8 m10 expand"
          >
            <Image
              source={require("../images/icons/Submit-tab.png")}
              resizeMode="stretch"
              className="submitIcon"
            />
          </Touchable>
        )}
        </View>
        </ScrollView> 
      </View>
    );
  }
}

function validate(values) {
  const number = /^[0-9]{0,10}$/;
  const errors = {};
  if (!values.name) {
    errors._error = errors._error || "Please enter your firstName and lastName";
    errors.name = "Please enter your firstName and lastName";
  }
  if (!values.extension ) {
    errors._error = errors._error || "Please enter your extension number";
    errors.extension = "Please enter your extension number";
  }
  if(values && values.extension ){
    if( number.test(values.extension)){
      errors._error = errors._error || "Invalid extension number, must be 10 digits";
      errors.extension = "Invalid extension number, must be 10 digits";
    }
  }
  if (!values.block) {
    errors._error = errors._error || "Please enter your block number";
    errors.email = "Please enter block numberl";
  }
  if (!values.apartment) {
    errors._error = errors._error || "Please enter apartment";
    errors.vehicle = "Please enter apartment";
  }
  return errors;
}

export default reduxForm({
  form: "VisitorEntryStep3Form",
  validate
})(VisitorEntryStep3Form);
