import React from "react";
import View from "./View";
import TextInput from "./TextInput";
import Text from "./Text";
import Icon from "./Icon";

const FormInput = props => {
  const errorMsgClass =
    props.meta.dirty && props.meta.invalid ? "error" : "transparent";
  return (
    <View >
      <TextInput
        {...props}
        onChange={props.input.onChange}
        value={props.input.value}
      />
      <Text className={`${errorMsgClass}`} >
        {props.meta.error || props.placeholder || props.label}
      </Text>
    </View>
  );
};

export default FormInput;
