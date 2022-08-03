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

class VendorForm extends React.PureComponent {
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
        <View>
          <View className=" f-row inputField j-start">
            <Image
              className="mini_thumb mt20 mr10"
              source={require("../images/icons/Profile.png")}
            />
            <Field
              name="vendorName"
              placeholder="Vendor name(eg. provider name)"
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
              name="attender"
              placeholder="Attender name"
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
              name="phone"
              placeholder="Mobile"
              component={FormInput}
              type="email-address"
              cover
            />
          </View>
        </View>
        <View
          className="mt20 f-row f-both"
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
              className="btn-transparent"
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
              className="btn-transparent"
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
  const errors = {};
  if (!values.vendorName) {
    errors._error = errors._error || "Please enter your username";
    errors.vendorName = "Please enter your vendorName";
  }
  if (!values.attender) {
    errors._error = errors._error || "Please enter your attender";
    errors.attender = "Please enter your attender";
  }
  if (!values.phone) {
    errors._error = errors._error || "Please enter your phone";
    errors.phone = "Please enter your phone";
  }
  return errors;
}

export default reduxForm({
  form: "VendorForm",
  validate
})(VendorForm);
