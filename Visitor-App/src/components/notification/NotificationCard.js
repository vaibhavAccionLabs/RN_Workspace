import React from "react";
import { Text, View } from "../common";

class NotificationCard extends React.PureComponent {
  render() {
    const { notification } = this.props;

    return (
      <View>
        <View className="m15 flex f-middle">
          {notification.item.readFlag ? (
            <Text className="large t-left">
              {notification.item.notification}
            </Text>
          ) : (
            <Text className="large primary bold t-left">
              {notification.item.notification}
            </Text>
          )}
        </View>
        <View className="divider-black" />
      </View>
    );
  }
}

export default NotificationCard;
