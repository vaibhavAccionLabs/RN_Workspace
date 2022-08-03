import React from "react";
import { connect } from "react-redux";
import {
  View,
  BackgroundImage,
  Image,
  Touchable,
  Text,
  Spinner,
  Prompt,ScrollView,
  Colors,
  KeyboardAvoidingView,
  LinearGradient
} from "../common";
import { VisitorActions } from "../../actions";
import idx from "idx";
import Toast from "react-native-root-toast";
import VendorForm from "./VendorForm";
import { TextInput, ListView, StatusBar,AsyncStorage } from "react-native";
import Modal from "react-native-modal";

var ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class Vendor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      searchPosts: [],
      activeFlag: "new",
      activeFlagBorderColor: "#3CCDFD",
      activeFlagTextColor: "white",
      attender: "",
      phone: "",
      purpose : "",
      vendorName: "",
      vendorType: "",
      vendorList: [],
      flag: false,
      orgId : ""
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
    let searchPosts = this.state.vendorList.filter(function(v) {
      return v.attender.toLowerCase().indexOf(searchedText.toLowerCase()) > -1;
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
            <Text>{v.attender}</Text>
          </View>
        </Touchable>
      </View>
    );
  };

  selectUser = user => {
    this.setState({ flag: true });
    this.setState({
      attender: user.attender,
      phone: user.phone,
      vendorName: user.vendorName,
      vendorType: user.vendorType,
      purpose : this.state.purpose
    });
    console.log(user, "user");
  };

  componentWillMount() {
    this.props.visitorList();
  }

  goToBack = () => {
    this.props.navigation.navigate("Dashboard");
  };

  visitor = () => {
    const validatePassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{6,}/;
    const validateText = /^[a-zA-Z]\D{2,20}$/;
    const validatePhNumber = /^[0-9]{0,10}$/;
    const validateEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(this.state.vendorName === "" || this.state.vendorType === "" 
      || this.state.attender === "" || this.state.phone === ""){
      Toast.show("Fields is not allowed to be empty", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      backgroundColor: '#6783FF'
      });
    } 
    else if (!validateText.test(this.state.vendorName)) {
      Toast.show('Please provide vendorName', {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
      backgroundColor: '#6783FF'
      });
    }
    else if (!validateText.test(this.state.vendorType)) {
      Toast.show('Please provide vendorType', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
      backgroundColor: '#6783FF'
        },
      );
    }
    else if (!validateText.test(this.state.attender)) {
      Toast.show('Please provide attender name', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
      backgroundColor: '#6783FF'
        },
      );
    }
    else if (!validatePhNumber.test(this.state.phone)) {
      Toast.show('Please provide valid phone number', {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
      backgroundColor: '#6783FF'
        },
      );
    }
    else {
      let length =
      this.props.allVisitors &&
      this.props.allVisitors.length >= 0 &&
      this.props.allVisitors.length;
      let vendorId = length + 1;
      let org = {
        _organisationId: this.state.orgId,
        type: "Vendor",
        status: "Check in",
        vId: vendorId,
        vendorType: "others",
        createdAt: new Date()
      };
      let initialValues = {
        vendorName: this.state.vendorName,
        vendorType: this.state.vendorType,
        attender: this.state.attender,
        phone: this.state.phone
      };
      const finalForm = Object.assign({}, initialValues, org);
      console.log("finalForm", finalForm);
      this.props.visitorEntry(finalForm);
      console.log(
        this.props.visitorEntryRequestStatus,
        "this.props.visitorEntryRequestStatus"
      );
      if (this.props.visitorEntryError) {
        Toast.show(this.props.visitorEntryError, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
          backgroundColor: '#6783FF'
        });
      }
      //else{
      this.props.navigation.navigate("Dashboard");
      Toast.show("Vendor entry submitted", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
         backgroundColor: '#6783FF'
      });
    //}
    }
  };

  renderTab = () => {
    const {
      allVisitors,
      initialValues,
      visitorEntryError,
      visitorEntryRequestStatus
    } = this.props;
    if (this.state.activeFlag === "exiting") {
      return (
        <View className="mb20 ">
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
                      placeholder="Search by attender name"
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
                      placeholder="Attender name"
                      value={this.state.attender}
                      placeholderTextColor="#808080"
                      autoCapitalize="none"
                      editable={false}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <View className="f-row inputFormField j-start mt5">
                    <TextInput
                      style={{ color: "black", fontSize: 16, width: "70%" }}
                      value={this.state.phone}
                      placeholder="Mobile"
                      placeholderTextColor="#808080"
                      keyboardType="numeric"
                      autoCapitalize="none"
                      editable={false}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <View className="f-row inputFormField j-start mt5">
                    <TextInput
                      style={{ color: "black", fontSize: 16, width: "70%" }}
                      value={this.state.vendorName}
                      placeholder="Vendor Name"
                      placeholderTextColor="#808080"
                      keyboardType="numeric"
                      autoCapitalize="none"
                      editable={false}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <View className="f-row inputFormField j-start mt5">
                    <TextInput
                      style={{ color: "black", fontSize: 16, width: "70%" }}
                      value={this.state.vendorType}
                      placeholder="Vendor Type"
                      placeholderTextColor="#808080"
                      autoCapitalize="none"
                      editable={false}
                      underlineColorAndroid="transparent"
                    />
                  </View>
                  <View className="f-row inputFormField j-start mt5">
                    <TextInput
                      style={{ color: "black", fontSize: 16, width: "70%" }}
                      value={this.state.purpose}
                      placeholder="Purpose"
                      placeholderTextColor="#808080"
                      autoCapitalize="none"
                      underlineColorAndroid="transparent"
                      onChangeText={purpose => this.setState({ purpose })}
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
                <Touchable onPress={this.visitor} className="btn-transparent">
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
      );
    } else if (this.state.activeFlag === "new") {
      return (
        <View className="mb20 ">
          <View className="f-both">
            <View className="wh-9-9">
              <ScrollView>
                <View className="f-row inputFormField j-start mt10">
                  <TextInput
                    style={{ color: "black", fontSize: 16, width: "95%" }}
                    placeholder="Vendor name(eg. your provider name)"
                    value={this.state.vendorName}
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                    onChangeText={vendorName => this.setState({ vendorName })}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View className="f-row inputFormField j-start mt5">
                  <TextInput
                    style={{ color: "black", fontSize: 16, width: "95%" }}
                    value={this.state.vendorType}
                    placeholder="Vendor Type(eg. electricians..)"
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={vendorType => this.setState({ vendorType })}
                  />
                </View>
                <View className="f-row inputFormField j-start mt5">
                  <TextInput
                    style={{ color: "black", fontSize: 16, width: "95%" }}
                    value={this.state.phone}
                    placeholder="Mobile"
                    placeholderTextColor="#808080"
                    keyboardType="numeric"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={phone => this.setState({ phone })}
                  />
                </View>
                <View className="f-row inputFormField j-start mt5">
                  <TextInput
                    style={{ color: "black", fontSize: 16, width: "95%" }}
                    value={this.state.attender}
                    placeholder="Attender"
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={attender => this.setState({ attender })}
                  />
                </View>
                <View className="f-row inputFormField j-start mt5">
                  <TextInput
                    style={{ color: "black", fontSize: 16, width: "70%" }}
                    value={this.state.purpose}
                    placeholder="Purpose"
                    placeholderTextColor="#808080"
                    autoCapitalize="none"
                    underlineColorAndroid="transparent"
                    onChangeText={purpose => this.setState({ purpose })}
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
                <Touchable onPress={this.visitor} className="btn-transparent">
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
      );
    }
  };

  render() {
    const {
      allVisitors,
      initialValues,
      visitorEntryError,
      visitorEntryRequestStatus
    } = this.props;

    allVisitors &&
      allVisitors.length > 0 &&
      allVisitors.forEach(v => {
        if (v.type === "Vendor") {
          this.state.vendorList.push(v);
        }
      });
    console.log(this.state.vendorList, "this.state.vendorList");
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
                source={require("../images/icons/Vendor.png")}
                className="medium_thumb"
              />
              <Text className="black large t-center">Vendor</Text>
            </View>
          </View>

          <View className="f-row p5 flex mt20">
            <View className="f-row  w-1-1 space-around">
              <View className="mh10 p5 mt5 ">
                <Touchable
                  style={{
                    backgroundColor: "transparent",
                    borderBottomWidth: 3,
                    borderBottomColor:
                      this.state.activeFlag === "new"
                        ? this.state.activeFlagBorderColor
                        : "transparent"
                  }}
                  onPress={() => {
                    this.setState({
                      activeFlag: "new",
                      attender: "",
                      phone: "",
                      vendorName: "",
                      vendorType: ""
                    });
                  }}
                >
                  <View className="f-both">
                    <Text className="darkGrey large">New</Text>
                  </View>
                </Touchable>
              </View>
              <View className="mh10 p5 mt5 ">
                <Touchable
                  style={{
                    backgroundColor: "transparent",
                    borderBottomWidth: 3,
                    borderBottomColor:
                      this.state.activeFlag === "exiting"
                        ? this.state.activeFlagBorderColor
                        : "transparent"
                  }}
                  onPress={() => {
                    this.setState({
                      activeFlag: "exiting",
                      attender: "",
                      phone: "",
                      vendorName: "",
                      vendorType: ""
                    });
                  }}
                >
                  <View className="f-both">
                    <Text className="darkGrey large">Exiting</Text>
                  </View>
                </Touchable>
              </View>
            </View>
          </View>
          <View>{this.renderTab()}</View>
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
  return {
    allVisitors,
    visitorEntryError,
    visitorEntryRequestStatus,
    isAuthorizedUser: idx(state, _ => _.auth.isAuthorizedUser)
  };
}

export default connect(mapStateToProps, { ...VisitorActions })(Vendor);
