import React from "react";
import { FormInput } from "react-native-elements";
import Colors from "./colors";
import View from "./View";

const Styles = {
  textInputStyle: {
    borderWidth: 1,
    borderBottomColor: Colors.white
  },
  inputStyle: {
    alignSelf: "stretch",
    width: "70%",
    height: 50,
    color: Colors.darkgrey
  },
  textInputLightStyle: {
    borderWidth: 1,
    borderBottomColor: Colors.white
  },
  inputLightStyle: {
    alignSelf: "stretch",
    width: "100%",
    color: Colors.darkgrey
  },
  coverTextInputLightStyle: {
    width: "95%",
    borderWidth: 2,
    borderColor: Colors.white,
    fontSize: 20
  },
  coverInputLightStyle: {
    alignSelf: "stretch",
    color: Colors.black,
  },

  coverBtmInputLightStyle: {
    alignSelf: "stretch",
    width: "100%",
    borderWidth: 2,
    borderColor: Colors.lgGrey,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    color: Colors.black,
    backgroundColor: Colors.white
  },
  containerStyle: {
    marginLeft: 0,
    marginRight: 0
  }
};

const TextInput = props => {
  const onChangeText = text => {
    if (!props.readOnly) {
      props.onChange(text);
    }
  };
  const keyboardType =
    !props.type || props.type === "password" ? "default" : props.type;
  let inputProps = {
    inputStyle: Styles.inputStyle,
    textInputStyle: Styles.textInputStyle,
    underlineColorAndroid: Colors.white,
    selectionColor: Colors.black
  };
  if (props.light) {
    inputProps = {
      inputStyle: Styles.inputLightStyle,
      textInputStyle: Styles.textInputLightStyle,
      underlineColorAndroid: Colors.white,
      selectionColor: Colors.darkgrey,
      placeholderTextColor: Colors.darkgrey
    };
  }
  if (props.cover) {
    inputProps = {
      inputStyle: Styles.coverInputLightStyle,
      textInputStyle: Styles.coverTextInputLightStyle,
      underlineColorAndroid: Colors.white,
      selectionColor: Colors.black,
      placeholderTextColor: Colors.darkgrey
    };
  }
  if (props.coverBtm) {
    inputProps = {
      inputStyle: Styles.coverBtmInputLightStyle,
      textInputStyle: Styles.coverTextInputLightStyle,
      underlineColorAndroid: Colors.white,
      selectionColor: Colors.primary,
      placeholderTextColor: Colors.primary
    };
  }
  return (
    <View className="flex">
      <FormInput
        containerStyle={Styles.containerStyle}
        inputStyle={inputProps.inputStyle}
        style={inputProps.textInputStyle}
        underlineColorAndroid={inputProps.underlineColorAndroid}
        selectionColor="#808080"
        placeholderTextColor={inputProps.placeholderTextColor}
        keyboardType={keyboardType}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        editable={props.editable}
        autoCapitalize={props.autoCapitalize || "none"}
        autoCorrect={false}
        secureTextEntry={props.type === "password"}
        onChangeText={onChangeText}
        value={props.value}
      />
    </View>
  );
};

export default TextInput;
