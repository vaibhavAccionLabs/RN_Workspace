import React from "react";
import { connect } from "react-redux";
import { View, Header, FlatList, Spinner, Text } from "../common";
import { NotificationActions } from "../../actions";
import NotificationCard from "./NotificationCard";

class Notification extends React.PureComponent {
  componentWillMount() {
    //this.props.getNotifications();
  }
  // Remove When API to read Individual Notification
  componentDidMount() {
    //this.props.readNotification();
  }
  onRefresh = () => {
    //this.props.getNotifications();
  };
  //keyExtractor = notification => notification._id;
  //renderItem = item => <NotificationCard notification={item} />;
  render() {
    //const { notifications, notificationRequestStatus } = this.props;
    return (
      <View className="screen">
        <Header
          title="Notifications"
          drawerNavigation={this.props.navigation}
        />
        <View className="flex f-both p10">
          <Text>There are no notifications for you.</Text>
        </View>
        {/* {notificationRequestStatus === 'REQUESTING' &&
          !notifications && <Spinner />}
        {notificationRequestStatus === 'SUCCESS' &&
          !notifications && (
            <View className="flex f-both p10">
              <Text>There are no notifications for you.</Text>
            </View>
          )}
        {notifications && (
          <FlatList
            className="bgWhite"
            data={notifications}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
            onRefresh={this.onRefresh}
            refreshing={notificationRequestStatus === 'REQUESTING'}
          />
        )} */}
      </View>
    );
  }
}

export default Notification;

// function mapStateToProps(state) {
//   const userId = state.auth.user._id;
//   const { notifications, notificationRequestStatus } = state.notification;
//   return {
//     userId,
//     notifications,
//     notificationRequestStatus,
//   };
// }
// export default connect(mapStateToProps, { ...NotificationActions })(Notification);
