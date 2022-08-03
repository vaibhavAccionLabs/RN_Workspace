import React from "react";
import { connect } from "react-redux";
import Splash from "./Splash";
import {AsyncStorage} from "react-native";

class SplashScreen extends React.PureComponent {
  componentDidMount() {
    let token= "";
      AsyncStorage.getItem("authToken").then((value) => {
        if(value){
          token = JSON.parse(value);
        }
      }).done();
   let routeName;
    if (!this.props.isAuthorizedUser  || this.props.token === null || Object.keys(this.props.user).length == 0) {
      routeName = "Login";
    }
    else  {
      routeName = "Dashboard";
    }

    this.props.navigation.dispatch({
      type: "Navigation/RESET",
      index: 0,
      actions: [{ type: "Navigation/NAVIGATE", routeName }]
    });
  }

  render() {
    return <Splash />;
  }
}

function mapStateToProps(state) {
  console.log(state.auth,'6666666')
  let  {user, isAuthorizedUser, authToken} = state.auth;
  return {
    isAuthorizedUser,
    user,
    authToken
  };
}

export default connect(mapStateToProps, {})(SplashScreen);
