import React, { Component } from 'react';
import { StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
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
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';

import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';

import { SignIn } from '../redux/actions/login';
import CompanyInfo from './CompanyInfo';

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

  onSubmitHandler = () => {
    const { emailOrPhone, password, ipAddress } = this.state;
    const { SignIn } = this.props;
    SignIn(emailOrPhone, password, ipAddress);
  };

  render() {
    const { emailOrPhone, password } = this.state;
    const {
      navigation: { navigate },
      authSelector
    } = this.props;
    let disable = true;
    if (emailOrPhone && password) {
      disable = false;
    }

    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <StatusBar
            translucent
            backgroundColor="rgba(255,255,255,0.1)"
            animated
            barStyle="dark-content"
          />
          <Content
            padder
            contentContainerStyle={{
              justifyContent: 'center'
            }}
          >
            <CompanyInfo title="Sign In" />
            <Form>
              <Item shadow>
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
              <Item shadow>
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
                contentCenter
                rounded
                style={styles.button}
                onPress={this.onSubmitHandler}
                disabled={disable}
              >
                <View style={styles.center}>
                  <Text grey fontSize18 marginRight10>
                    SIGN IN
                  </Text>
                  <View circle bgColorRed>
                    <IconFont name="chevron-right" size={15} color="#fff" />
                  </View>
                </View>
              </Button>
            </Form>
            {authSelector && authSelector.request && !authSelector.error && (
              <ActivityIndicator size="large" color="#0000ff" />
            )}
            {authSelector &&
              !authSelector.request &&
              authSelector.error &&
              Toast.show({
                text: authSelector.error,
                duration: 3000
              })}
            {authSelector &&
              !authSelector.request &&
              !authSelector.error &&
              authSelector.token &&
              navigate('Dashboard')}
          </Content>
        </Container>
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
    marginTop: 20,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#307BBA',
    shadowOpacity: 1
  }
});

const mapStateToProps = state => {
  return {
    authSelector: state.auth
  };
};

export default connect(
  mapStateToProps,
  { SignIn }
)(Login);
