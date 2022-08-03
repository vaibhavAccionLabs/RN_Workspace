import React from "react";
import { connect } from "react-redux";
import {
  View,
  BackgroundImage,
  Image,
  Touchable,
  Text,
  Spinner,
  Prompt,
  Colors,ScrollView,
  KeyboardAvoidingView,
  LinearGradient
} from "../common";
import { VisitorActions,UserActions } from "../../actions";
import idx from "idx";
import Toast from "react-native-root-toast";
import VisitorEntryStep3Form from "./VisitorEntryStep3Form";
import { TextInput, ListView, StatusBar ,AsyncStorage} from "react-native";
import Modal from "react-native-modal";

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class VisitorEntryStep3 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      flag: false,
      orgId : "",
      firstName: "",
      lastName : "",
      extension: "",
      block: "",
      apartment: "",
      vendorList: [],
      searchPosts : [],
      flag: false,
      searchedUsers: [],
      step2: this.props.navigation.state.params
        ? this.props.navigation.state.params.step2
        : null
    };
    AsyncStorage.getItem("authState").then((value) => {
      if(value){
        let data = JSON.parse(value);
        console.log(data.user._organisationId._id,'_organisationId')
        this.setState({orgId : data.user._organisationId._id})
        console.log(this.state.orgId,"_organisationId")
      }
    }).done();
  }

  searchPostsaa = searchedText => {
    let searchPosts = this.props.allUsers.filter(function(v) {
      return v.displayName.toLowerCase().indexOf(searchedText.toLowerCase()) > -1 
      || v.username.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
    });
    this.setState({ searchPosts: searchPosts });
  };

  renderAdress = (v, i) => {
    return (
      <View className="f-row p5 mr10 j-start ">
        <Touchable
          className="p5"
          key={i}
          onPress={this.selectUser.bind(this, v)}
        >
          <View>
            <Text>{v.displayName}</Text>
          </View>
        </Touchable>
      </View>
    );
  };


  selectUser = user => {
    this.setState({ flag: true });
    this.setState({
      firstName: user.name.first,
      lastName: user.name.last,
      extension: user.phone,
      block: user.block && user.block.name,
      apartment: user.apartment && user.apartment.name
    });
    console.log(user, "user");
  };

  componentWillMount() {
    this.props.userList();
    console.log(this.state.step2, "form2");
  }
  goToBack = () => {
    this.props.navigation.navigate("VisitorEntryStep2");
  };

  visitors = initialValues => {
    let length =
      this.props.allVisitors &&
      this.props.allVisitors.length >= 0 &&
      this.props.allVisitors.length;
    let visitorId = length + 1;
    let fullname = {
      "firstName": this.state.firstName,
      "lastName": this.state.lastName
    }
    let org = {
      _organisationId: this.state.orgId,
      type: "Visitor",
      status: "Check in",
      name : fullname,
      vId: visitorId
    };

    let whom = {
      whomToMeet: initialValues
    };
    const finalForm = Object.assign({}, this.state.step2, whom, org);
    console.log("finalForm", finalForm);
    this.props.visitorEntry(finalForm);
    // if(this.props.visitorEntryError){
    //   Toast.show(this.props.visitorEntryError, {
    //     duration: Toast.durations.LONG,
    //     position: Toast.positions.BOTTOM,
    //   });
    // }
    //else {
    Toast.show("Vistior Entry submitted", {
      duration: Toast.durations.LONG,
      position: Toast.positions.BOTTOM,
      backgroundColor: '#6783FF'
    });
    this.props.navigation.navigate("Dashboard");
    //}
  };

  render() {
    const {
      allVisitors,
      initialValues,
      visitorEntryError,
      visitorEntryRequestStatus,
      allUsers,
      userRequestStatus,
       userError
    } = this.props;

    return (
      <KeyboardAvoidingView>
        <View className="screen bgWhite">
          <StatusBar
            translucent
            backgroundColor="rgba(255,255,255,0.1)"
            animated
            barStyle="dark-content"
          />
           <View className="f-row mt50">
            <Touchable onPress={this.goToBack}>
              <View>
                <Image
                  source={require("../images/icons/Back-tab.png")}
                  className="large_thumb"
                />
              </View>
            </Touchable>
            <View className="flex f-both mr20">
              <Image
                source={require("../images/icons/Payment.png")}
                className="medium_thumb"
              />
              <Text className="black large t-center">Whom to meet</Text>
            </View>
          </View>
          <View >
            <View className="f-both">
              <View className="wh-9-9">
                <ScrollView>
                  <View className="f-row inputField j-start">
                    <Image
                      className="mini_thumb mt20 mr10"
                      source={require("../images/icons/search-icon.png")}
                    />
                    <TextInput
                      style={{ color: "black", fontSize: 16, width: "95%" }}
                      placeholder="Search by name"
                      placeholderTextColor="#808080"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={this.searchPostsaa}
                    />
                  </View>
                  {this.state.flag === false && (
                    <ListView
                      className="bg-primary"
                      dataSource={ds.cloneWithRows(this.state.searchPosts)}
                      renderRow={this.renderAdress}
                    />
                  )}
                  <View className="f-row inputFormField j-start mt10">
                    <TextInput
                      style={{ color: "black", fontSize: 16, width: "70%" }}
                      placeholder="First name"
                      value={this.state.firstName}
                      placeholderTextColor="#808080"
                      autoCapitalize="none"
                      editable={false}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <View className="f-row inputFormField j-start mt10">
                    <TextInput
                      style={{ color: "black", fontSize: 16, width: "70%" }}
                      placeholder="Last name"
                      value={this.state.lastName}
                      placeholderTextColor="#808080"
                      autoCapitalize="none"
                      editable={false}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <View className="f-row inputFormField j-start mt5">
                    <TextInput
                      style={{ color: "black", fontSize: 16, width: "70%" }}
                      value={`${this.state.extension}`}
                      placeholder="Mobile"
                      placeholderTextColor="#808080"
                      keyboardType="numeric"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <View className="f-row inputFormField j-start mt5">
                    <TextInput
                      style={{ color: "black", fontSize: 16, width: "70%" }}
                      value={this.state.block}
                      placeholder="Block"
                      placeholderTextColor="#808080"
                      keyboardType="numeric"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <View className="f-row inputFormField j-start mt5">
                    <TextInput
                      style={{ color: "black", fontSize: 16, width: "70%" }}
                      value={this.state.apartment}
                      placeholder="Apt #"
                      placeholderTextColor="#808080"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                    />
                  </View>
                </ScrollView>
                  <View
                    className="f-row f-both mt50"
                    style={{
                      height: 50,
                      width: 150,
                      borderWidth: 5,
                      borderColor: "#DCDCDC",
                      borderRadius: 10
                    }}
                  >
                  <Touchable onPress={this.visitors} className="btn-transparent">
                    <Image
                      source={require("../images/icons/Submit-tab.png")}
                      className="submitIcon"
                      resizeMode="stretch"
                    />
                  </Touchable>
                </View>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  const {
    allVisitors,
    visitorEntryError,
    visitorEntryRequestStatus
  } = state.visitor;
  const { allUsers , userRequestStatus, userError} = state.user;
  console.log(state.user, 'allUsers')
  return {
    allVisitors,
    visitorEntryError,
    visitorEntryRequestStatus,
    allUsers,
    userRequestStatus,
    userError
  };
}

export default connect(mapStateToProps, { ...VisitorActions, ...UserActions})(
  VisitorEntryStep3
);
