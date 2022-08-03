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
import { VisitorActions } from "../../actions";
import idx from "idx";
import Toast from "react-native-root-toast";
import { AsyncStorage, ListView, TextInput , StatusBar } from "react-native";
import Moment from "moment";
import _ from 'lodash';

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

class VisitorsList extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      email: "",
      searchPosts: []
    };
  }

  componentWillMount() {
    this.props.visitorList();
  }

  goToDashboard = () => {
    this.props.navigation.navigate("Dashboard");
  };

  searchPostsss = searchedText => {
    const {
      allVisitors,
      visitorsList,
      visitorListError,
      visitorListRequestStatus
    } = this.props;    
    const searchVisitor = [];
    if (visitorsList.length > 0) {
      visitorsList.forEach(v => {
        //v.fullName = v.name.firstName;
        if (v.name.firstName && v.name.firstName.toLowerCase().indexOf(searchedText) != -1 
          || v.phone && v.phone.toLowerCase().indexOf(searchedText) != -1 ) {
          searchVisitor.push(v);
        } 
      });
    }
    this.setState({ searchPosts : searchVisitor });
    console.log(this.state.searchPosts , '111111111')
  };

   // || v.whomToMeet && v.whomToMeet.name && v.whomToMeet.name.firstName.toLowerCase().indexOf(searchedText) != -1 
   //        || v.whomToMeet && v.whomToMeet.block && v.whomToMeet.block.toLowerCase().indexOf(searchedText) != -1
   //        || v.whomToMeet && v.whomToMeet.extension && v.whomToMeet.extension.toLowerCase().indexOf(searchedText) != -1 
         

  renderAdress = (searchPosts, i) => {
    const {
      allVisitors,
      visitorsList,
      visitorListError,
      visitorListRequestStatus
    } = this.props;    
    return (
      <ScrollView>
        {visitorListRequestStatus === "SUCCESS" &&
          this.state.searchPosts &&
          this.state.searchPosts.length > 0 &&
          this.state.searchPosts.map(value => (
            <View className="flex f-row mt20 space-around" key={i}>
              <View className="flex f-both">
                {value.imageUrls.url ? (
                  <View className="flex f-both f-column ">
                    <Image
                      className="profile-image "
                      source={{ uri: value.imageUrls.url }}
                      resizeMode="cover"
                    />
                    <Text className="black medium t-left">
                      {value.status}
                    </Text>
                  </View>
                ) : (
                  <View className="flex f-both f-column ">
                    <Image
                      className="profile-image"
                      source={require("../images/icons/Login_Black.png")}
                    />
                    <Text className="black medium t-left">
                      {value.status}
                    </Text>
                  </View>
                )}
              </View>
              <View className="flex f-both ">
                <View className="f-row ">
                  <Text className="black medium t-left">
                    {value.name.firstName}
                  </Text>
                  <Text className="black medium t-left">
                    {" "}
                    {value.name.lastName}
                  </Text>
                </View>
              </View>
              <View className="flex f-both f-column ">
                <Text className="black medium t-left">
                  {Moment(value.createdAt).format("d MMM YYYY")}
                </Text>
              </View>
              <View className="flex f-both f-column ">
                <View className="f-row">
                  <Text className="black medium t-left">
                    {value.whomToMeet && value.whomToMeet.name &&
                      value.whomToMeet.name.firstName}
                  </Text>
                  <Text className="black medium t-left">
                    {" "}
                    {value.whomToMeet && value.whomToMeet.name &&
                      value.whomToMeet.name.lastName}
                  </Text>
                </View>
                <View className="f-row">
                  <Text className="black medium t-left">
                    {value.whomToMeet && value.whomToMeet.block &&
                      value.whomToMeet.block.name}
                  </Text>
                  <Text className="black medium t-left">
                    {value.whomToMeet && value.whomToMeet.apartment &&
                      value.whomToMeet.apartment.name}
                  </Text>
                </View>
              </View>
            </View>
        ))}
      </ScrollView>
    );
  };

  render() {
    const {
      allVisitors,
      visitorsList,
      visitorListError,
      visitorListRequestStatus
    } = this.props;

    console.log(allVisitors, "allVisitors");

    return (
      <KeyboardAvoidingView>
        <View className="screen bgWhite mt10">
          <StatusBar
            translucent
            backgroundColor="rgba(255,255,255,0.1)"
            animated
            barStyle="dark-content"
          />
          <View className="f-row mt50">
            <Touchable onPress={this.goToDashboard}>
              <View>
                <Image
                  source={require("../images/icons/Back-tab.png")}
                  className="large_thumb"
                />
              </View>
            </Touchable>
            <View className="flex f-both mr20">
              <Image
                source={require("../images/icons/People.png")}
                className="medium_thumb"
              />
              <Text className="black large t-center">Visitor List</Text>
            </View>
          </View>

          <View className="w-1-1">
            <TextInput
              style={{ color: "black", fontSize: 16, width: "95%" }}
              placeholder="Search by name"
              placeholderTextColor="#808080"
              autoCapitalize="none"
              underlineColorAndroid="transparent"
              onChangeText={this.searchPostsss}
            />
          </View>

          <View className="flex mt20">
            <View className="f-column ">
              <View className="flex f-row  mt20 space-around">
                <View className="f-middle mr10">
                  <Text className="white medium t-left ">profileImage</Text>
                </View>
                <Text className="black mr10 medium t-left primaryBottomBorder">
                  Visitor Details
                </Text>
                <Text className="black mr10 medium t-left primaryBottomBorder">
                  Date and Time
                </Text>
                <Text className="black mr10 medium t-left primaryBottomBorder">
                  Owner Details
                </Text>
              </View>
              <View>
                <ListView
                  dataSource={ds.cloneWithRows(this.state.searchPosts)}
                  renderRow={this.renderAdress}
                />

              {this.state.searchPosts.length === 0 && (
                <ScrollView>
                  {visitorListRequestStatus === "SUCCESS" &&
                    visitorsList &&
                    visitorsList.length > 0 &&
                    visitorsList.map(value => (
                      <View className="flex f-row mt20 space-around">
                        <View className="flex j-start " style={{ width : "25%" , alignItems: "flex-start"}}>
                          {value.imageUrls.url ? (
                            <View className="flex f-both f-column ">
                              <Image
                                className="profile-image "
                                source={{ uri: value.imageUrls.url }}
                                resizeMode="cover"
                              />
                              <Text className="black medium t-left">
                                {value.status}
                              </Text>
                            </View>
                          ) : (
                            <View className="flex f-both f-column ">
                              <Image
                                className="profile-image"
                                source={require("../images/icons/Login_Black.png")}
                              />
                              <Text className="black medium t-left">
                                {value.status}
                              </Text>
                            </View>
                          )}
                        </View>
                        <View className="flex j-start " style={{ width : "25%"}}>
                          <View className="f-row ">
                            <Text className="black medium t-left">
                              {value.name.firstName}
                            </Text>
                            <Text className="black medium t-left">
                              {" "}
                              {value.name.lastName}
                            </Text>
                          </View>
                        </View>
                        <View className="flex j-start f-column " style={{ width : "25%"}}>
                          <Text className="black medium t-left">
                            {Moment(value.createdAt).format("d MMM YYYY")}
                          </Text>
                        </View>
                        <View className="flex j-start f-column " style={{ width : "25%"}}>
                          <View className="f-row">
                            <Text className="black medium t-left">
                              {value.whomToMeet && value.whomToMeet.name &&
                                value.whomToMeet.name.firstName}
                            </Text>
                            <Text className="black medium t-left">
                              {" "}
                              {value.whomToMeet && value.whomToMeet.name &&
                                value.whomToMeet.name.lastName}
                            </Text>
                          </View>
                          <View className="f-row">
                            <Text className="black medium t-left">
                               {value.whomToMeet && value.whomToMeet.block &&
                                value.whomToMeet.block.name}
                            </Text>
                            <Text className="black medium t-left">
                              {value.whomToMeet && value.whomToMeet.apartment &&
                                value.whomToMeet.apartment.name}
                            </Text>
                          </View>
                        </View>
                      </View>
                  ))}
                </ScrollView>
              )}
              </View>
              {visitorListRequestStatus === "REQUESTING" && (
                <View className="p15 mt30">
                  <Spinner large />
                </View>
              )}
              {visitorListRequestStatus === "SUCCESS" &&
                (visitorsList && visitorsList.length === 0) && (
                  <View className="flex f-both p10">
                    <Text className="darkGrey bold">
                      There are no visitors.
                    </Text>
                  </View>
              )}
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
    visitorListError,
    visitorListRequestStatus
  } = state.visitor;


    let visitorsList = [];
    allVisitors &&
      allVisitors.length > 0 &&
      allVisitors.forEach(v => {
        if (v.type === "Visitor") {
          visitorsList.push(v);
        }
      });
  return {
    allVisitors,
    visitorsList,
    visitorListError,
    visitorListRequestStatus
    //isAuthorizedUser: true
    //isAuthorizedUser: idx(state, _ => _.auth.isAuthorizedUser)
  };
}

export default connect(mapStateToProps, { ...VisitorActions })(VisitorsList);
