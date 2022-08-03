import React from "react";
import { View, Text, Touchable, Checkbox } from "./";

class ChecklistItem extends React.PureComponent {
  toggle = () => {
    this.props.toggle(this.props.item);
  };

  render() {
    const { props } = this;
    return (
      <Touchable onPress={this.toggle}>
        <View className="w-1-1">
          <View className="flex f-row f-center mh15">
            <Checkbox value={props.checked} />
            <Text>{props.title}</Text>
          </View>
        </View>
      </Touchable>
    );
  }
}

export default ChecklistItem;
