import React from "react";
import { Field, reduxForm } from "redux-form";
import Toast from "react-native-root-toast";
import {
  View,
  Touchable,
  SelectInput,
  Icon,
  BackgroundImage,
  Image,KeyboardAvoidingView,
  Text,
  MultiImageUpload,
  ScrollView,
  FormInput,
  Spinner
} from "../common";

class VisitorEntryStep1Form extends React.PureComponent {
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
            <View className=" f-row inputField j-start mt5">
              <Field
                name="name.firstName"
                placeholder="First name"
                component={FormInput}
                type="email-address"
                cover
              />
            </View>
            <View className=" f-row inputField j-start mt5">
              <Field
                name="name.lastName"
                placeholder="Last name"
                component={FormInput}
                type="email-address"
                cover
              />
            </View>
            <View className=" f-row inputField j-start mt5">
              <Field
                name="phone"
                placeholder="Phone"
                component={FormInput}
                type="numeric"
                cover
              />
            </View>
            <View className=" f-row inputField j-start mt5">
              <Field
                name="email"
                placeholder="Email"
                component={FormInput}
                type="email-address"
                cover
              />
            </View>
            <View className=" f-row inputField j-start mt5">
              <Field
                name="vehicle"
                placeholder="Vehicle No"
                component={FormInput}
                type="email-address"
                cover
              />
            </View>
            <View className=" f-row inputField j-start mt5">
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
                    source={require("../images/icons/Next-tab.png")}
                    resizeMode="stretch"
                    className="submitIcon mt10"
                  />
                )}
              </Touchable>
            ) : (
              <Touchable
                onPress={this.showErrorAlert}
                className="btn-transparent rounded_8 m10 expand"
              ><View>
                <Image
                  source={require("../images/icons/Next-tab.png")}
                  resizeMode="stretch"
                  className="submitIcon mt10"
                />
                </View>
              </Touchable>
            )}
          </View>
        </ScrollView>  
      </View>  
    );
  }
}

function validate(values) {
  const number = /^[0-9]{10,}$/;
  const validateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,10}\.[0-9]{1,10}\.[0-9]{1,10}\.[0-9]{1,10}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,15}))$/;
  const emailV = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
  const errors = {};
  if (!values.name) {
    errors._error = errors._error || "Please enter your firstName and lastName";
    errors.name = "Please enter your firstName and lastName";
  }
  if (!values.phone ) {
    errors._error = errors._error || "Please enter your phone number";
    errors.phone = "Please enter your phone number";
  }
  if(values && values.phone ){
    if(!number.test(values.phone)){
      errors._error = errors._error || "Invalid phone number, must be 10 digits";
      errors.phone = "Invalid phone number, must be 10 digits";
    }
  }
  if (!values.email) {
    errors._error = errors._error || "Please enter your email";
    errors.email = "Please enter your email";
  }
  if(values && values.email ){
    if(!emailV.test(values.email)){
      errors._error = errors._error || "Invalid email";
      errors.email = "Invalid email";
    }
  }
  return errors;
}

export default reduxForm({
  form: "VisitorEntryStep1Form",
  validate
})(VisitorEntryStep1Form);
