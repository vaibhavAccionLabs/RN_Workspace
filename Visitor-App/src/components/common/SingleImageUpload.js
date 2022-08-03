import React from "react";
import { Alert, Modal } from "react-native";
import ip from "icepick";
import ImagePicker from "react-native-image-picker";
import ImageResizer from "react-native-image-resizer";
import RNFetchBlob from "react-native-fetch-blob";
import axios from "axios";
import {
  View,
  Touchable,
  Image,
  ScrollView,
  Colors,
  Icon,
  Text,
  Spinner
} from "./";

class SingleImageUpload extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      modalVisible: false,
      selectedImageUrl: "",
      images: []
    };
  }

  componentDidMount() {
    if (this.props.input.value) {
      this.initializeUploader(this.props.input.value);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      !this.props.input.value &&
      nextProps.input.value &&
      Array.isArray(nextProps)
    ) {
      this.initializeUploader(nextProps.input.value);
    }
  }

  initializeUploader = images => {
    images = images.map(image => ({ file: {}, uri: image.url }));
    this.setState({ images: ip.freeze(images) });
  };

  updateInputField = () => {
    const pending = this.state.images.find(
      image => image.status === "UPLOADING"
    );
    if (!pending) {
      const urls = this.state.images
        .filter(image => image.status === "COMPLETED")
        .map(file => ({ url: file.uri, type: "FIX" }));
      this.props.input.onChange(urls);
    }
  };

  uploadFile = index => {
    this.setState(
      { images: ip.setIn(this.state.images, [index, "status"], "UPLOADING") },
      () => {
        const fileToUpload = this.state.images[index];
        axios
          .get(
            `/sign-s3/?file-name=${
              fileToUpload.path
            }&file-type='image/jpeg'&_organisationId=${
              this.props.organisationId
            }`
          )
          .then(response => {
            const { signedRequest, url } = response.data;
            console.log({ signedRequest, url, fileToUpload });
            RNFetchBlob.fetch(
              "PUT",
              signedRequest,
              {
                "Content-Type": "image/jpeg"
              },
              RNFetchBlob.wrap(fileToUpload.uri)
            )
              .then(() => {
                this.setState(
                  {
                    images: ip.setIn(this.state.images, [index], {
                      ...fileToUpload,
                      uri: url,
                      status: "COMPLETED"
                    })
                  },
                  this.updateInputField
                );
              })
              .catch(err => {
                // error handling ..
                console.log(err);
              });
          });
      }
    );
  };

  openPicker = () => {
    if (
      this.props.input.value &&
      this.props.input.value.length > this.props.numberOfFiles
    ) {
      Alert.alert("Cannot upload anymore photos");
    }
    ImagePicker.showImagePicker(response => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else {
        ImageResizer.createResizedImage(response.uri, 800, 600, "JPEG", 80)
          .then(({ uri, path }) => {
            this.setState(
              {
                images: [
                  ...this.state.images,
                  ip.freeze({ status: "PENDING", uri, path })
                ]
              },
              () => {
                this.uploadFile(this.state.images.length - 1);
              }
            );
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
    const { numOfFiles } = this.props;
    const { selectedImageUrl } = this.state;
    let { images } = this.state;
    for (let i = images.length; i < numOfFiles; i += 1) {
      images = [...images, null];
    }
    console.log({ images, selectedImageUrl });
    return (
      <View className="f-both f-middle m5">
        {!this.props.readOnly && (
          <View className="m10">
            <Touchable
              className="btn-complementary multiImage f-center"
              onPress={this.openPicker}
            >
              <Icon name="camera" size={28} color={Colors.primary} />
            </Touchable>
          </View>
        )}
        <ScrollView horizontal>
          {images.map(
            (i, index) =>
              i ? (
                <Touchable
                  className="mr10"
                  onPress={() =>
                    this.setState({
                      modalVisible: true,
                      selectedImageUrl: i.uri
                    })
                  }
                  key={String(index)}
                >
                  <View>
                    <Image
                      key={String(index)}
                      source={{ uri: i.uri }}
                      className="ImageView"
                      resizeMode="cover"
                    />
                    {i.status === "UPLOADING" && <Spinner />}
                  </View>
                </Touchable>
              ) : (
                <Touchable
                  key={String(index)}
                  className="mv25 ImageView mr10"
                  onPress={() => {}}
                >
                  <Text />
                </Touchable>
              )
          )}
          <Modal
            animationType="slide"
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {
              console.log("Modal has been closed.");
            }}
          >
            <View>
              <Image
                source={{ uri: selectedImageUrl }}
                className="wh-1-1"
                resizeMode="contain"
              />
              <Touchable
                className="topRight"
                onPress={() => {
                  this.setState({ modalVisible: false });
                }}
              >
                <Icon name="close" size={30} color="black" />
              </Touchable>
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

export default SingleImageUpload;
