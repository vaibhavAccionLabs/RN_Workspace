import React, { Component } from 'react';
import { StyleSheet,ImageBackground, StatusBar,Dimensions } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Text,
  Button,
  View,
  StyleProvider,
  Toast
} from 'native-base';
import { connect } from 'react-redux';
import DeviceInfo from 'react-native-device-info';
import IconFont from 'react-native-vector-icons/FontAwesome';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import CompanyInfo from './CompanyInfo';
import backgroundImage from '../assets/images/background_images/bgImage.png'

type Props = {};
class OTP extends Component<Props> {

  state = {
    otp: null
  };

  goToRegister= () => {
    this.props.navigation.navigate('Register')
  }  

  goToLogin= () => {
    this.props.navigation.navigate('Login')
  }  

  onSubmitHandler = () => {
    this.props.navigation.navigate('Dashboard')
  };

  render() {
    let { height, width } = Dimensions.get('window');
    const { otp } = this.state;
    let disable = true;
    if (otp) {
      disable = false;
    }
    return (
      <StyleProvider style={getTheme(material)}>
        <ImageBackground
          source={backgroundImage}
          style={{ width, height }}
        >
          <Container transparentBgColor>
            <StatusBar
              translucent
              backgroundColor="rgba(255,255,255,0.1)"
              animated
              barStyle="light-content"
            />
            <Content>
              <CompanyInfo title="OTP" />
              <Form style={{marginTop : 10}}>
                <Item shadow borderTopLeftRadius borderTopRightRadius>
                  <IconFont
                    name="mobile"
                    size={30}
                    color="#515c6f"
                    style={{ marginLeft: 10 }}
                  />
                  <Input
                    placeholder="Enter otp"
                    onChangeText={otp =>
                      this.setState({
                        otp
                      })
                    }
                  />
                </Item>
                <Button
                  light
                  rounded
                  block
                  style={styles.button}
                  onPress={this.onSubmitHandler}
                  disabled={disable}
                >
                  <View style={styles.center}>
                    <Text lgBlue fontSize16 marginRight10>
                      Verify
                    </Text>
                  </View>
                </Button>
              </Form>
              <View f_row space_between >
                <Text margin babyBlue fontSize12 onPress={this.goToLogin}>
                  Login
                </Text>
                <Text margin babyBlue fontSize12 onPress={this.goToRegister}>
                  Register
                </Text>
              </View>
            </Content>
          </Container>
        </ImageBackground>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  center: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  image: {
    height: 100,
    width: 100
  },
  button: {
    margin : 20,
    marginTop: 10,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#307BBA',
    shadowOpacity: 1
  }
});

export default OTP;
