import React from "react";
import { connect } from "react-redux";
import {
  ScrollView,
  View,
  Text,
  ChecklistItem,
  Icon,
  Slider,
  Spinner,
  Switch,
  Touchable
} from "../common";
import { AuthActions } from "../../actions";

class Examples extends React.PureComponent {
  goBack = () => this.props.navigation.goBack();

  logout = () => {
    this.props.logout();
    this.props.navigation.dispatch({
      type: "Navigation/RESET",
      index: 0,
      actions: [{ type: "Navigation/NAVIGATE", routeName: "SplashScreen" }]
    });
  };

  render() {
    return (
      <ScrollView className="screen">
        <Text className="heading m10">Examples Page!</Text>
        <View className="divider" />
        <ChecklistItem title="Example" checked />
        <View className="divider" />
        <View className="p10 f-row space-between">
          <Icon name="heart" />
          <Icon name="heart-outline" />
        </View>
        <View className="divider" />
        <View className="p10">
          <Slider min={0} max={10} value={5} />
        </View>
        <View className="divider" />
        <View className="p10">
          <Spinner />
        </View>
        <View className="divider" />
        <View className="p10">
          <Switch value />
        </View>
        <View className="divider" />
        <Touchable onPress={this.goBack}>
          <Text>Go Back</Text>
        </Touchable>
        <Touchable onPress={this.logout}>
          <Text>Logout</Text>
        </Touchable>
      </ScrollView>
    );
  }
}

export default connect(null, { ...AuthActions })(Examples);
