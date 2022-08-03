import React from "react";
import Styles from "./Styles";
import LinearGradient from "react-native-linear-gradient";

export default props => {
  return (
    <LinearGradient
      colors={["#40ACBA", "#307BBA"]}
      start={{ x: 0.6, y: 0.0 }}
      end={{ x: 0.3, y: 0.2 }}
      style={{ flex: 1 }}
    >
      {props.children}
    </LinearGradient>
  );
};
