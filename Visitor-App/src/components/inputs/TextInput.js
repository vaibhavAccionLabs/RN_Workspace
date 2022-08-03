import React from "react";
import { TextInput } from "react-native";

const FormInput = props => {
  const keyboardType =
    !props.type || props.type === "password" ? "default" : props.type;
  return (
    <TextInput
      placeholder={props.placeholder}
      secureTextEntry={props.type === "password"}
      onChangeText={text => {
        props.input.onChange(text);
      }}
      keyboardType={keyboardType}
      autoCapitalize={props.autoCapitalize || "none"}
      autoCorrect={false}
    />
  );
};

export default FormInput;
