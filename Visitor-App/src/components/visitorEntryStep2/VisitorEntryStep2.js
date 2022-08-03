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
  Colors,
  KeyboardAvoidingView,
  LinearGradient
} from "../common";
import { AuthActions } from "../../actions";
import idx from "idx";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFetchBlob from "react-native-fetch-blob";
import axios from "axios";
import { TextInput, StatusBar,AsyncStorage } from "react-native";
import Toast from "react-native-root-toast";

class VisitorEntryStep2 extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      image: "",
      orgID: "",
      step1: this.props.navigation.state.params
        ? this.props.navigation.state.params.step1
        : null
    };

    AsyncStorage.getItem("authState").then((value) => {
      if(value){
        let data = JSON.parse(value);
        console.log(data.user._organisationId._id,'_organisationId')
        this.setState({orgID : data.user._organisationId._id})
        console.log(this.state.orgID,"_organisationId")
      }
    }).done();
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
            this.setState({ image: source.uri });
            this.uploadImage(source.uri);
          })
          .catch(err => {
            console.log(err);
          });
      }
    });
  };

  uploadImage = imgPath => {
    const body = new FormData();
    body.append("file", { uri: imgPath });
    const fileToUpload = imgPath;
    const fileName = fileToUpload.split("/").pop();
    let url = `https://api.briclay.com/file/sign-s3?file-name=${
      fileName
    }&file-type='image/jpeg'&_organisationId=${this.state.orgID}`;

    axios.get(url).then(response => {
      const { signedRequest, url } = response.data;
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
          console.log("iiiiiiiii");
        })
        .catch(err => {
          console.log(err, "err");
        });
    });
  };

  goToStep3 = () => {
    console.log(this.state.step1, "form1");
    let image = {
      imageUrls: { url: this.state.image, createdAt: new Date() }
    };
    const step2 = Object.assign({}, this.state.step1, image);
    console.log(step2, "step2");
    this.props.navigation.navigate("VisitorEntryStep3", {
      step2: step2
    });
  };

  goToBack = () => {
    this.props.navigation.navigate("VisitorEntryStep1");
  };

  render() {
    return (
      <KeyboardAvoidingView>
        <View className="screen bgWhite f-both">
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
              <Text className="black large t-center">Photo</Text>
            </View>
          </View>
          <View className="flex f-center f-middle ">
            <View className="mt50">
              <View className="p10">
                <Touchable className=" mb10" onPress={this.openPicker}>
                  {!this.state.image ? (
                    <BackgroundImage
                      className="avatar"
                      source={require("../images/icons/user.png")}
                      resizeMode="contain"
                    />
                  ) : (
                    <Image
                      className="avatar"
                      source={{ uri: this.state.image }}
                      resizeMode="stretch"
                    />
                  )}
                </Touchable>
              </View>
              <View
                className="f-row f-both"
                style={{
                  height: 50,
                  width: 150,
                  borderWidth: 5,
                  borderColor: "#DCDCDC",
                  borderRadius: 10
                }}
              >
                <Touchable
                  onPress={this.goToStep3}
                  className="btn-transparent rounded_8 m10 expand"
                >
                  <Image
                    className="submitIcon mt10"
                    source={require("../images/icons/Next-tab.png")}
                    resizeMode="stretch"
                  />
                </Touchable>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

export default VisitorEntryStep2;

// function mapStateToProps(state) {
//   const { loginError, loginRequestStatus } = state.login;
//   return {
//     loginError,
//     loginRequestStatus,
//     //isAuthorizedUser: true
//     isAuthorizedUser: idx(state, _ => _.auth.isAuthorizedUser)
//   };
// }

// export default connect(mapStateToProps, { ...AuthActions })(VisitorEntry);
