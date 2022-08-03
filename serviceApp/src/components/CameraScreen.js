import React, { PureComponent } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
// import { API } from 'config';
// import { GET, POST, FILEUPLOAD } from 'core/services';
//AIzaSyDjymhh6ZtwDigeF39q3Yo5hsGrBc9NI6w
import BackButton from './BackButton';

class CameraScreen extends PureComponent {
  state = {
    imageUri: null
  };

  static navigationOptions = {
    headerLeft: ({ onPress }) => <BackButton onPress={onPress} />
  };

  takePicture = async () => {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      try {
        const { uri } = await this.camera.takePictureAsync(options);
        console.log(uri);
        this.setState({
          imageUri: uri
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  navigate = () => {
    // const { imageUri } = this.state;
    // const signatureURL = `${
    //   API.rwa.signature
    // }_associationId=5d07dd94e7179a4e4325a7ce&folder=ower&fileName=my_photo.jpg&fileType=image/jpg`;
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
    // this.props.navigation.navigate('WhomToMeet');
  };

  render() {
    console.log('PROPS::', this.props);
    const { imageUri } = this.state;

    console.log('MY URI::', imageUri);

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
            onPress={() => this.setState({ imageUri: null })}
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

export default CameraScreen;
