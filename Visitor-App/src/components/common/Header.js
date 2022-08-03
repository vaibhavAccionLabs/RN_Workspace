import React from "react";
import { connect } from "react-redux";
import { View, Colors, Touchable, Icon, Text, Image, LinearGradient } from "./";
import { StatusBar } from "react-native";
import { NotificationActions } from "../../actions";

class Header extends React.PureComponent {
  componentDidMount() {
    //this.props.getNotifications();
  }
  // goBack = () => {
  //   this.props.navigation.goBack();
  // };
  openDrawer = () => {
    //this.props.drawerNavigation.navigate('DrawerToggle');
  };
  openNotification = () => {
    //this.props.drawerNavigation.navigate('Notifications');
  };
  render() {
    console.log("Header props", this.props);
    const { props } = this;
    //const { notifications, notificationRequestStatus } = this.props;

    return (
      <View>
        
      </View>
    );
  }
}

export default Header;

// function mapStateToProps(state) {
//   const { notifications, notificationRequestStatus } = state.notification;
//   const isUnread = notifications && notifications.find(n => n.newFlag);
//   return {
//     isUnread,
//     notifications,
//     notificationRequestStatus,
//   };
// }

// export default connect(mapStateToProps, { ...NotificationActions })(Header);
