import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, StatusBar, ScrollView } from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Input,
  Label,
  Tab,
  Tabs,
  View,
  Toast,
  TabHeading,
  StyleProvider
} from 'native-base';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { vendorEntryData } from '../redux/actions/vendor';
import BackButton from './BackButton';

type Props = {};
class VenderEntry extends Component<Props> {
  state = {
    firstName: null,
    lastName: null,
    vendorName: null,
    phone: null,
    purpose: null,
    attenderName: null
  };

  onSubmit = () => {
    const validatePhNumber = /^[0-9]{0,10}$/;
    if (!this.state.phone.match(validatePhNumber)) {
      Toast.show({
        text: 'Invalid extension number!',
        duration: 3000,
        type: 'danger'
      });
    } else {
      const {
        firstName,
        lastName,
        phone,
        vendorName,
        attenderName,
        purpose
      } = this.state;
      const { vendorEntryData } = this.props;
      this.props.vendorEntryData(
        firstName,
        lastName,
        phone,
        vendorName,
        attenderName,
        purpose
      );
      this.props.navigation.navigate('Dashboard');
      Toast.show({
        text: 'Vendor entry submitted',
        duration: 3000,
        type: 'success'
      });
    }
  };

  static navigationOptions = {
    headerLeft: ({ onPress }) => <BackButton onPress={onPress} />
  };

  onFirstNameChangeHandler = firstName => {
    this.setState({
      firstName
    });
  };

  onLastNameChangeHandler = lastName => {
    this.setState({
      lastName
    });
  };

  onVendorNameChangeHandler = vendorName => {
    this.setState({
      vendorName
    });
  };

  onAttenderNameChangeHandler = attenderName => {
    this.setState({
      attenderName
    });
  };

  onPhoneChangeHandler = phone => {
    this.setState({
      phone
    });
  };

  onPurposeChangeHandler = purpose => {
    this.setState({
      purpose
    });
  };

  render() {
    const { firstName, lastName, phone, vendorName, purpose } = this.state;
    let disable = true;
    if (firstName && lastName && vendorName && phone && purpose) {
      disable = false;
    }

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
            <Tabs>
              <Tab
                heading={
                  <TabHeading>
                    <Text fontSize18>New</Text>
                  </TabHeading>
                }
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
                        placeholder="Vendor Name"
                        onChangeText={this.onVendorNameChangeHandler}
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
                        placeholder="First Name"
                        onChangeText={this.onFirstNameChangeHandler}
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
                        onChangeText={this.onLastNameChangeHandler}
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
                        onChangeText={this.onPhoneChangeHandler}
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
                        onChangeText={this.onPurposeChangeHandler}
                      />
                    </Item>
                    <Button
                      light
                      contentCenter
                      rounded
                      style={styles.button}
                      onPress={this.onSubmit}
                    >
                      <View style={styles.center}>
                        <Text grey fontSize18 marginRight10>
                          Submit
                        </Text>
                        <IconFont name="check" size={22} color="#FF0000" />
                      </View>
                    </Button>
                  </Form>
                </ScrollView>
              </Tab>
              <Tab
                heading={
                  <TabHeading>
                    <Text fontSize18>Existing</Text>
                  </TabHeading>
                }
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
                        placeholder="Vendor Name"
                        onChangeText={this.onVendorNameChangeHandler}
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
                        placeholder="Attender Name"
                        onChangeText={this.onAttenderNameChangeHandler}
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
                        onChangeText={this.onPhoneChangeHandler}
                      />
                    </Item>
                    <Item shadow>
                      <IconFont
                        name="file-text-o"
                        size={22}
                        color="#515c6f"
                        style={{ marginLeft: 10 }}
                      />
                      <Input
                        placeholder="Purpose"
                        onChangeText={this.onPurposeChangeHandler}
                      />
                    </Item>
                    <Button
                      light
                      contentCenter
                      rounded
                      style={styles.button}
                      onPress={this.onSubmit}
                    >
                      <View style={styles.center}>
                        <Text grey fontSize18 marginRight10>
                          {' '}
                          Submit
                        </Text>
                        <IconFont name="check" size={22} color="#FF0000" />
                      </View>
                    </Button>
                  </Form>
                </ScrollView>
              </Tab>
            </Tabs>
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
    height: 55,
    width: 55
  },
  button: {
    marginTop: 20,
    shadowOffset: { width: 10, height: 10 },
    shadowColor: '#307BBA',
    shadowOpacity: 1,
    elevation: 4
  }
});

const mapStateToProps = state => {
  return {
    vendor: state.vendor
  };
};

const mapDispatchToProps = dispatch => {
  return {
    vendorEntryData: (
      firstName,
      lastName,
      phone,
      email,
      attenderName,
      purpose
    ) => {
      dispatch(
        vendorEntryData(
          firstName,
          lastName,
          phone,
          email,
          attenderName,
          purpose
        )
      );
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VenderEntry);
