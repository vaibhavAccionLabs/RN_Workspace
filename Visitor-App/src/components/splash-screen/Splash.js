import React from "react";
import { Text, View, BackgroundImage, Spinner } from "../common";

class Splash extends React.PureComponent {
  render() {
    return (
      <View className="screen bgWhite">
        <View className="w-1-1 h-1-1 f-both">
          <Text className="heading primary">RWA Visitors Welcome</Text>
          <View className="p15">
            <Spinner large />
          </View>
        </View>
      </View>
    );
  }
}

export default Splash;
