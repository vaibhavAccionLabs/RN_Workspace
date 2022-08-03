import React from "react";
import { Image as NativeImage, StyleSheet } from "react-native";
import Styles from "./Styles";
import Colors from "./colors";

const imageStyles = StyleSheet.create({
  logo: {
    width: 100,
    height: 150
  },
  thumb: {
    height: 40,
    width: 40
  },
  x_mini_thumb: {
    height: 10,
    width: 10
  },
  larger_thumb: {
    height: 200,
    width: 200
  },
  mini_m_thumb: {
    height: 20,
    width: 20
  },
  mini_thumb: {
    height: 25,
    width: 25
  },
  normal_thumb: {
    height: 35,
    width: 35
  },
  medium_thumb: {
    height: 45,
    width: 45
  },
  mini1_thumb: {
    height: 30,
    width: 30
  },
  med_thumb: {
    height: 50,
    width: 50,
    borderRadius: 45 / 2,
    borderWidth: 1,
    borderColor: Colors.blue,
    padding: 20,
    alignSelf: "center",
    backgroundColor: "white"
  },
  med_thumb_view: {
    height: 65,
    width: 65,
    borderRadius: 65 / 2,
    borderWidth: 3,
    borderColor: "red",
    backgroundColor: "white"
  },
  big_thumb: {
    height: 100,
    width: 100,
    borderRadius: 70,
    borderWidth: 1,
    borderColor: Colors.transparent
  },
  muiltiImageThumb: {
    height: 40,
    width: 40,
    borderRadius: 20,
    borderColor: Colors.lightGrey,
    borderWidth: 1
  },
  large_thumb: {
    height: 55,
    width: 55
  },
  xx_l: {
    height: 200,
    width: 150
  },
  submitIcon: {
    height: 80,
    width: 150
  },
  signIcon: {
    height: 60,
    width: 270
  },
  div_Main: {
    height: 220,
    width: 130,
    borderColor: Colors.lightGrey,
    borderRadius: 20,
    borderWidth: 1
  },
  div_Outer: {
    height: 200,
    width: 130
  },
  div_Inner: {
    height: 50
  }
});

export default props => {
  const style = [];
  if (props.className) {
    const classNames = props.className.split(" ");
    classNames.forEach(className => {
      style.push(Styles[className]);
      style.push(imageStyles[className]);
    });
  }
  return (
    <NativeImage
      style={style}
      source={props.source}
      resizeMode={props.resizeMode || "contain"}
    >
      {props.children}
    </NativeImage>
  );
};
