import React from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  Image,
  Touchable,
  Icon,
  BackgroundView,
  BackgroundImage,
  Colors
} from "../common";
import { AuthActions } from "../../actions";
import Toast from "react-native-root-toast";
import { StatusBar } from "react-native";
console.disableYellowBox = true;

class Dashboard extends React.PureComponent {
  constructor(props) {
    super(props);
  }
 
  gotoVisitorEntryStep1 = () => {
    this.props.navigation.navigate("VisitorEntryStep1");
  };

  gotoVisitorsList = () => {
    this.props.navigation.navigate("VisitorsList");
  };

  goToVendor = () => {
    this.props.navigation.navigate("Vendor");
  };

  render() {
    console.log(this.props, "Dashboard");
    return (
      <View className="screen bgWhite f-middle  ">
        <StatusBar
          translucent
          backgroundColor="rgba(255,255,255,0.1)"
          animated
          barStyle="dark-content"
        />
        <View className="f-center mt50">
          <Image
            source={require("../images/BriclayBold.png")}
            className="logo"
          />
          <Text className="black x_large t-center">Welcome</Text>
        </View>
        <View className="flex mt50">
          <View className="f-row space-around">
            <Touchable onPress={this.gotoVisitorsList}>
              <View className="f-both">
                <Image
                  className="logo"
                  source={require("../images/icons/Visitor_List.png")}
                />
              </View>
            </Touchable>
            <Touchable onPress={this.gotoVisitorEntryStep1}>
              <View className="f-both">
                <Image
                  className="logo"
                  source={require("../images/icons/New_Entry.png")}
                />
              </View>
            </Touchable>
            <Touchable onPress={this.goToVendor}>
              <View className="f-both">
                <Image
                  className="logo"
                  source={require("../images/icons/Vendor_New.png")}
                />
              </View>
            </Touchable>
          </View>
        </View>
      </View>
    );
  }
}


function mapStateToProps(state) {
  let flag = false
  let { authToken} = state;
  if(authToken == null || authToken == undefined || authToken == "") {
    flag = true
  }
  return {
    flag 
  };
}

export default connect(mapStateToProps, { ...AuthActions})(Dashboard);
