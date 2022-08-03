import React from "react";
import { Field, reduxForm } from "redux-form";
import Toast from "react-native-root-toast";
import {
  View,
  Touchable,
  SelectInput,
  Icon,
  BackgroundImage,
  Image,
  Text,
  MultiImageUpload,
  ScrollView,
  FormInput,
  Spinner
} from "../common";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFetchBlob from "react-native-fetch-blob";

class VisitorEntryStep2Form extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      image: ""
    };
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

  render() {
    const { loginRequestStatus, loginError } = this.props;
    return (
      <View>
        <View className="flex f-both p20">
          <View className="drawer-avatar ">
            <Touchable className="captureImage mb10" onPress={this.openPicker}>
              {!this.state.image ? (
                <BackgroundImage
                  className="drawer-avatar"
                  source={require("../images/icons/user.png")}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  className="drawer-avatar"
                  source={{ uri: this.state.image }}
                  resizeMode="stretch"
                />
              )}
            </Touchable>
          </View>
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
            onPress={() => {}}
            className="btn-transparent rounded_8 m10 expand"
          >
            <Text className="darkgrey large bold ">Next</Text>
          </Touchable>
          <Image
            className="mini_thumb mt10"
            source={require("../images/icons/red-arrow.png")}
            resizeMode="stretch"
          />
        </View>
      </View>
    );
  }
}

export default reduxForm({
  form: "VisitorEntryStep2Form"
})(VisitorEntryStep2Form);
