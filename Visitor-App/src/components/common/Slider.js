import React from "react";
import { Slider as NativeSlider } from "react-native";
import Colors from "./colors";

class Slider extends React.PureComponent {
  render() {
    const { props } = this;
    const min = props.min || 1;
    return (
      <NativeSlider
        maximumTrackTintColor={Colors.primary}
        minimumTrackTintColor={Colors.primary}
        thumbTintColor={Colors.primary}
        minimumValue={min}
        step={props.step || min}
        value={props.value || min}
        maximumValue={props.max}
        onSlidingComplete={props.onChange}
      />
    );
  }
}

export default Slider;
