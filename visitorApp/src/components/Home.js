import React, { Component } from 'react';
import { StyleSheet, StatusBar, Image } from 'react-native';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
  Button,
  Icon
} from 'native-base';
import { connect } from 'react-redux';

import { login } from '../redux/actions/login';

type Props = {};
class App extends Component<Props> {
  state = {
    data: null
  };
  onSubmitHandler = () => {
    debugger;
    console.log('Submitted');
    this.props.login(this.state.data);
  };

  onChangeHandler = value => {
    debugger;
    this.setState({
      data: value
    });
  };

  render() {
    return (
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
            justifyContent: 'center',
            flex: 1
          }}
        >
          <Image
            source={require('../assets/images/BriclayBold.png')}
            className="logo"
            style={styles.image}
          />
          <Text className="darkgrey xx_large t-center">Sign In</Text>
          <Form>
            <Item floatingLabel>
              <Label>Email</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input secureTextEntry={true} />
            </Item>
            <Button primary block iconRight rounded style={styles.button}>
              <Text> SIGN IN </Text>
              <Icon name="arrow-forward" />
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100
  },
  button: {
    marginTop: 20,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#307BBA',
    shadowOpacity: 1,
    elevation: 8,
    backgroundColor: '#307BBA'
  }
});

const mapStateToProps = state => {
  return {
    auth: state.auth.auth
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: name => {
      dispatch(login(name));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
