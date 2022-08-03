import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Linking } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  StyleProvider
} from 'native-base';
import QRCodeScanner from 'react-native-qrcode-scanner';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import BackButton from './BackButton';

class QRCode extends Component {
  static navigationOptions = {
    headerLeft: ({ onPress }) => <BackButton onPress={onPress} />
  };

  onPhoneNoChangeHandler = phone => {
    this.setState({
      phone
    });
  };

  onSuccess = e => {
    console.log('QR DATA REVEIVED=>>', e);
    // Navigating to website
    // Linking.openURL(e.data).catch(err =>
    //   console.error('An error occured', err)
    // );
  };

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={{ marginTop: 60 }}>
          <Content
            padder
            contentContainerStyle={{
              flex: 1,
              justifyContent: 'center'
            }}
          >
            <Form style={{ marginBottom: 50 }}>
              <Item shadow>
                <IconSimple
                  name="phone"
                  size={22}
                  color="#515c6f"
                  style={{ marginLeft: 10 }}
                />
                <Input
                  placeholder="Mobile"
                  onChangeText={phoneNo => console.log(phoneNo)}
                />
              </Item>
            </Form>
            <QRCodeScanner
              onRead={this.onSuccess}
              cameraStyle={{
                height: '50%',
                marginTop: 50,
                width: '92%',
                alignSelf: 'center',
                justifyContent: 'center'
              }}
            />
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default QRCode;
