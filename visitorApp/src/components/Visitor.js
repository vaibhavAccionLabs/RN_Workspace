import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Card,
  Body,
  Form,
  Item,
  Input,
  Label,
  View,
  Left,
  Right,
  Thumbnail,
  Toast,
  StyleProvider
} from 'native-base';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import IconCons from 'react-native-vector-icons/Ionicons';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { collectVisitorData } from '../redux/actions/visitor';
import { VALIDATOR } from 'config';
import BackButton from './BackButton';

type Props = {};
class Visitor extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  static navigationOptions = {
    headerLeft: ({ onPress }) => <BackButton onPress={onPress} />
  };

  onSubmitHandler = () => {
    const {
      firstName,
      lastName,
      phone,
      email,
      regNumber,
      purpose
    } = this.state;
    const {
      collectVisitorData,
      navigation: { navigate }
    } = this.props;
    if (!firstName || !lastName || !phone || !email || !regNumber || !purpose) {
      Toast.show({
        text: 'All fields are required',
        duration: 3000,
        type: 'danger'
      });
    } else if (phone && !phone.match(VALIDATOR.phoneNumber)) {
      Toast.show({
        text: 'Please enter a valid phone number!',
        duration: 3000,
        type: 'danger'
      });
    } else if (email && !email.match(VALIDATOR.email)) {
      Toast.show({
        text: 'Please enter a valid email address',
        duration: 3000,
        type: 'danger'
      });
    } else {
      collectVisitorData(firstName, lastName, phone, email, regNumber, purpose);
      navigate('CameraScreen');
    }
  };

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={{ marginTop: 100 }}>
          <StatusBar
            translucent
            backgroundColor="rgba(255,255,255,0.1)"
            animated
            barStyle="dark-content"
          />
          <Content
            padder
            contentContainerStyle={{
              width: '100%',
              flex: 1
            }}
          >
            <ScrollView>
              <Form>
                <Item shadow>
                  <IconSimple
                    name="user"
                    size={22}
                    color="#515c6f"
                    style={{ marginLeft: 10 }}
                  />
                  <Input
                    placeholder="First Name"
                    onChangeText={firstName =>
                      this.setState({
                        firstName
                      })
                    }
                  />
                </Item>
                <Item shadow>
                  <IconSimple
                    name="user"
                    size={22}
                    color="#515c6f"
                    style={{ marginLeft: 10 }}
                  />
                  <Input
                    placeholder="Last Name"
                    onChangeText={lastName =>
                      this.setState({
                        lastName
                      })
                    }
                  />
                </Item>
                <Item shadow>
                  <IconSimple
                    name="phone"
                    size={22}
                    color="#515c6f"
                    style={{ marginLeft: 10 }}
                  />
                  <Input
                    placeholder="Phone"
                    onChangeText={phone =>
                      this.setState({
                        phone
                      })
                    }
                  />
                </Item>
                <Item shadow>
                  <IconMaterial
                    name="email-outline"
                    size={23}
                    color="#515c6f"
                    style={{ marginLeft: 10 }}
                  />
                  <Input
                    placeholder="Email"
                    onChangeText={email =>
                      this.setState({
                        email
                      })
                    }
                  />
                </Item>
                <Item shadow>
                  <IconCons
                    active
                    name="ios-car"
                    size={24}
                    color="#515c6f"
                    style={{ marginLeft: 10 }}
                  />
                  <Input
                    placeholder="Vehicle Number"
                    onChangeText={regNumber =>
                      this.setState({
                        regNumber
                      })
                    }
                  />
                </Item>
                <Item shadow>
                  <IconFont
                    active
                    name="file-text-o"
                    size={22}
                    color="#515c6f"
                    style={{ marginLeft: 10 }}
                  />
                  <Input
                    placeholder="Purpose"
                    onChangeText={purpose => this.setState({ purpose })}
                  />
                </Item>
                <TouchableOpacity
                  onPress={this.onSubmitHandler}
                  style={styles.button}
                >
                  <View style={styles.center}>
                    <Text grey fontSize18 marginRight10>
                      Next
                    </Text>
                    <View circle bgColorRed>
                      <IconFont name="chevron-right" size={15} color="#fff" />
                    </View>
                  </View>
                </TouchableOpacity>
              </Form>
            </ScrollView>
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
  button: {
    marginTop: 50,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#307BBA',
    shadowOpacity: 1,
    elevation: 4
  }
});

const mapStateToProps = state => ({
  visitor: state.visitor
});

export default connect(
  mapStateToProps,
  { collectVisitorData }
)(Visitor);
