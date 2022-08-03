import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
  Toast
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import { API } from 'config';
import { GET, POST } from 'core/services';
import { getAssociationIdSelector } from 'redux/selectors';
//AIzaSyDjymhh6ZtwDigeF39q3Yo5hsGrBc9NI6w
import BackButton from './BackButton';

class CameraScreen extends PureComponent {
  state = {};

  static navigationOptions = {
    headerLeft: ({ onPress }) => <BackButton onPress={onPress} />
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      try {
        const { base64, uri } = await this.camera.takePictureAsync(options);
        this.setState({
          imageUri: uri,
          imageBase64: base64
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  navigate = () => {
    const {
      navigation: { navigate },
      _associationId
    } = this.props;
    const { imageBase64 } = this.state;
    const imageName = Math.round(new Date().getTime() / 1000);
    const signatureURL = `${
      API.rwa.visitor_image
    }_associationId=${_associationId}&folder=visitor&fileName=${imageName}.jpg&fileType=image/jpeg`;

    let bodyData = {
      photoBase64: imageBase64
    };

    if (imageBase64) {
      try {
        POST(signatureURL, bodyData)
          .then(res => {
            console.log('DATA UPLOAD::', res);
          })
          .catch(err => {
            console.log('DATA ERROR::', err);
            if (err) {
              return Toast.show({
                text: 'Failed to Upload Visitor image',
                duration: 3000,
                type: 'danger'
              });
            }
          });
      } catch (err) {
        console.log(err);
      }
      navigate('WhomToMeet');
    }
    // GET(signatureURL)
    //   .then(res => {
    //     console.log('getting SIGNATURE URL::', res);
    //     if (res.signedRequest) {
    //       /// post
    //       const formData = new FormData();
    //       formData.append('File', imageData);
    //       console.log('FORM DATA::', {
    //         uri: imageData,
    //         name: 'my_photo.jpg',
    //         type: 'image/jpg'
    //       });

    //       POST(res.signedRequest, formData)
    //         .then(res => console.log('DATA UPLOAD::', res))
    //         .catch(err => console.log('DATA ERROR::', err));
    //     }
    //   })
    //   .catch(err => console.log('ERR:: Received::', err));
  };

  render() {
    const { imageUri } = this.state;
    let disable = true;
    if (imageUri) {
      disable = false;
    }
    return (
      <View style={styles.container}>
        {imageUri ? (
          <ImageBackground source={{ uri: imageUri }} style={styles.preview} />
        ) : (
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            // useCamera2Api
            style={styles.preview}
            autoFocus={RNCamera.Constants.AutoFocus.on}
            // autoFocusPointOfInterest={{ x: 0.5, y: 0.5 }}
            //focusDepth={0.5}
            type={RNCamera.Constants.Type.front}
            flashMode={RNCamera.Constants.FlashMode.off}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel'
            }}
            // androidRecordAudioPermissionOptions={{
            //   title: 'Permission to use audio recording',
            //   message: 'We need your permission to use your audio',
            //   buttonPositive: 'Ok',
            //   buttonNegative: 'Cancel'
            // }}
            // onGoogleVisionBarcodesDetected={({ barcodes }) => {
            //   console.log(barcodes);
            // }}
          />
        )}
        <View
          style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ imageUri: null, imageBase64: null })}
            style={styles.capture}
          >
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#078CD6' }}>
              RETAKE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}
          >
            <IconSimple name="camera" size={25} color="#078CD6" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.navigate.bind(this)}
            style={styles.capture}
            disabled={disable}
          >
            <Text style={{ fontSize: 15, fontWeight: '600', color: '#078CD6' }}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
});

const mapStateToProps = state => ({
  _associationId: getAssociationIdSelector(state)
});

export default connect(
  mapStateToProps,
  {}
)(CameraScreen);
