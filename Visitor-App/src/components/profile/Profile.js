import React from "react";
import { connect } from "react-redux";
import idx from "idx";
import {
  View,
  Colors,
  Icon,
  Header,
  Image,
  ScrollView,
  FormInput,
  BackgroundImage,
  Text,
  Touchable,
  LinearGradient
} from "../common";
import { TextInput } from "react-native";
import Toast from "react-native-root-toast";
import { AuthActions } from "../../actions";
import { Field, reduxForm, formValueSelector } from "redux-form";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFetchBlob from "react-native-fetch-blob";
import axios from "axios";

class Profile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      phone: "",
      email: "",
      image: ""
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.updateUserError) {
      Toast.show(nextProps.updateUserError, {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
    if (nextProps.updateUserStatus === "SUCCESS") {
      Toast.show("User updated successfully", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
  }

  updateUser = () => {
    if (this.state.phone && this.state.phone !== "") {
      const phone = this.state.phone;
      const profileImageUrl = this.state.image;
      if (phone.match(/^\d{10}$/)) {
        this.props.updateUser({ phone, profileImageUrl });
      } else {
        Toast.show("Please provide 10 digits contact number", {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM
        });
      }
    } else {
      Toast.show("Please fill the contact number", {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM
      });
    }
  };

  componentDidMount() {
    this.setState({
      displayName: idx(this.props.user, _ => _.displayName) || "NA"
    });
    const phoneNo = idx(this.props.user, _ => _.phone) || "NA";
    const phoneNumber = phoneNo.toString();
    this.setState({ phone: phoneNumber });
    this.setState({ email: idx(this.props.user, _ => _.email) || "NA" });
  }

  openPicker = () => {
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        ImageResizer.createResizedImage(response.uri, 100, 100, "JPEG", 100, 0)
          .then(({ uri, path }) => {
            const source = { uri };
            this.uploadProfileImage(source.uri);
          })
          .catch(err => {
            console.log(err);
            return Alert.alert(
              "Unable to resize the photo",
              "Check the console for full the error message"
            );
          });
      }
    });
  };

  uploadProfileImage = imgPath => {
    const body = new FormData();
    body.append("file", { uri: imgPath });
    const fileToUpload = imgPath;
    const fileName = fileToUpload.split("/").pop();
    axios
      .get(
        `/sign-s3/?file-name=${
          fileName
        }&file-type='image/jpeg'&_organisationId=${this.props.organisationId}`
      )
      .then(response => {
        const { signedRequest, url } = response.data;
        console.log({ signedRequest, url, fileName });
        RNFetchBlob.fetch(
          "PUT",
          signedRequest,
          {
            "Content-Type": "image/jpeg"
          },
          RNFetchBlob.wrap(fileToUpload)
        )
          .then(response => {
            const fileToUpload = url;
            this.setState({ image: fileToUpload });
          })
          .catch(err => {
            // error handling ..
            console.log(err);
          });
      });
  };

  render() {
    const {
      organisationId,
      updateUserStatus,
      updateUserError,
      user
    } = this.props;
    const { profileImageUrl } = this.props.user;
    return (
      <View className="screen">
        <Header title="Profile" back navigation={this.props.navigation} />
        <ScrollView className="bg-transparent">
          <View className="flex f-both p20 bgWhite">
            <View className="drawer-avatar">
              {profileImageUrl && !this.state.image ? (
                <BackgroundImage
                  className="drawer-avatar"
                  source={require("../images/icons/user.png")}
                  resizeMode="contain"
                >
                  <Image
                    className="big_thumb"
                    source={{ uri: idx(user, _ => _.profileImageUrl) }}
                    resizeMode="stretch"
                  />
                </BackgroundImage>
              ) : (
                <Image
                  className="big_thumb"
                  source={{ uri: this.state.image }}
                  resizeMode="stretch"
                />
              )}
            </View>
            <Touchable className="captureImage mb10" onPress={this.openPicker}>
              <Icon name="camera" size={26} color={Colors.primary} />
            </Touchable>
            <Text className="mh10 primary t-center subtitle bold">
              {" "}
              {this.state.displayName}
            </Text>
          </View>
          <LinearGradient>
            <View className="flex m15">
              <View className="flex f-row mv10">
                <Text className="complementary bold w-1-3 mv15">Phone</Text>
                <TextInput
                  style={{ color: "white", fontWeight: "bold" }}
                  value={this.state.phone}
                  autoCapitalize="none"
                  onChangeText={phone => this.setState({ phone })}
                  underlineColorAndroid="transparent"
                  keyboardType="numeric"
                  maxLength={10}
                  selectionColor={"white"}
                />
              </View>
            </View>
            <View className="divider" />
            <View className="flex m15">
              <View className="flex f-row mv10">
                <Text className="complementary bold  w-1-3 mv15">Email</Text>
                <TextInput
                  style={{ color: "white", fontWeight: "bold" }}
                  value={this.state.email}
                  autoCapitalize="none"
                  underlineColorAndroid="transparent"
                  editable={false}
                />
              </View>
            </View>
            <View className="divider" />
            <View className="flex f-center f-middle">
              <Touchable
                onPress={this.updateUser}
                className="btn-complementary rounded m15 expand"
              >
                <Text className="primary bold">Save</Text>
              </Touchable>
            </View>
          </LinearGradient>
        </ScrollView>
      </View>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { user, updateUserStatus, updateUserError } = state.auth;
  const userId = state.auth.user._id;
  const organisationId = state.auth.user._organisationId;

  return {
    user,
    organisationId,
    updateUserStatus,
    updateUserError
  };
}

export default connect(mapStateToProps, { ...AuthActions })(Profile);
