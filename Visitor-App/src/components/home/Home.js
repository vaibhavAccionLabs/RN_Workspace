import React from "react";
import { Text, View, Touchable } from "../common";

class Home extends React.PureComponent {
  gotoExamples = () => this.props.navigation.navigate("Examples");

  render() {
    return (
      <View className="screen f-center f-middle">
        <Text className="heading">Home</Text>
        <Touchable className="mv15" onPress={this.gotoExamples}>
          <Text>Examples</Text>
        </Touchable>
      </View>
    );
  }
}

export default Home;
