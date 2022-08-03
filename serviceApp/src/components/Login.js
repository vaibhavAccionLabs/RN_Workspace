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
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import CompanyInfo from './CompanyInfo';
import backgroundImage from '../assets/images/background_images/bgImage.png'

type Props = {};
class Login extends Component<Props> {
  state = {
    emailOrPhone: null,
    password: null,
    ipAddress: null
  };

  componentDidMount() {
    DeviceInfo.getIPAddress()
      .then(ipAddress =>
        this.setState({
          ipAddress
        })
      )
      .catch(err => console.log('DEVICE ID ERROR>>>', err));
  }

  goToForgotPassword =() => {
    this.props.navigation.navigate('ForgotPassword')
  }  

  goToOTP  =() => {
    this.props.navigation.navigate('OTP')
  }  

  goToRegister=() => {
    this.props.navigation.navigate('Register')
  }  

  onSubmitHandler = () => {
    this.props.navigation.navigate('Dashboard')
  };

  render() {
    let { height, width } = Dimensions.get('window');

    const { emailOrPhone, password, ipAddress} = this.state;
    let disable = true;
    if (emailOrPhone && password) {
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
              <CompanyInfo title="Sign In" />
              <Form style={{marginTop : 10}}>
                <Item shadow borderTopLeftRadius borderTopRightRadius>
                  <IconSimple
                    name="user"
                    size={22}
                    color="#515c6f"
                    style={{ marginLeft: 10 }}
                  />
                  <Input
                    placeholder="Email Or Phone"
                    onChangeText={emailOrPhone =>
                      this.setState({
                        emailOrPhone
                      })
                    }
                  />
                </Item>
                <Item shadow borderBottomLeftRadius borderBottomRightRadius>
                  <IconSimple
                    name="lock"
                    size={22}
                    color="#515c6f"
                    style={{ marginLeft: 10 }}
                  />
                  <Input
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={password =>
                      this.setState({
                        password
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
                      SIGN IN
                    </Text>
                  </View>
                </Button>
              </Form>
              <View f_row space_between>
                <Text babyBlue margin fontSize12 onPress={this.goToForgotPassword}>
                  Forgot Password
                </Text>
                <Text babyBlue margin fontSize12 onPress={this.goToOTP}>
                  OTP
                </Text>
              </View>
              <View alignItemsCenter marginTop>
                <Text white fontSize14  onPress={this.goToRegister}>
                  REGISTER
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

export default Login;
