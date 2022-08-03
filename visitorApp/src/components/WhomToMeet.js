import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import {
  Toast,
  Container,
  Content,
  Text,
  Button,
  Form,
  Item,
  Input,
  Label,
  View,
  StyleProvider,
  Picker
} from 'native-base';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import IconFontAw5 from 'react-native-vector-icons/FontAwesome5';
import { API } from 'config';
import { GET, GETNEW } from 'core/services';
import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { postVisitor } from '../redux/reducers/createVisitorReducer';
import { createVisitorSelector } from '../redux/selectors';
import BackButton from './BackButton';

type Props = {};
class WhomToMeet extends Component<Props> {
  state = {
    block: null,
    apartment: null,
    ownerDetails: null,
    _apartmentId: null
  };

  static navigationOptions = {
    headerLeft: ({ onPress }) => <BackButton onPress={onPress} />
  };

  onSubmit = () => {
    const { _apartmentId, selectedName } = this.state;
    const { postVisitor } = this.props;
    postVisitor(_apartmentId, selectedName);
  };

  getOwnerDetails = () => {
    const { block, apartment } = this.state;
    const endpoint = `${
      API.rwa.apartments
    }?filter[block]=${block}&filter[flatNo]=${apartment}&with[owners]=userType,name`;
    GETNEW(endpoint)
      .then(res => {
        if (res && res.apartments && res.apartments.length > 0) {
          this.setState({
            ownerDetails: res.apartments[0].owners,
            _apartmentId: res.apartments[0]._id
          });
        }
      })
      .catch(err => console.log(err));
  };

  manageActivity() {
    const {
      visitorSelector,
      navigation: { navigate }
    } = this.props;

    if (visitorSelector) {
      if (visitorSelector.request && !visitorSelector.error) {
        return <ActivityIndicator size="large" color="#0000ff" />;
      }
      if (
        !visitorSelector.request &&
        visitorSelector.error &&
        visitorSelector.message
      ) {
        Toast.show({
          text: visitorSelector.message,
          duration: 3000
        });
        return;
      }
      if (
        !visitorSelector.request &&
        !visitorSelector.error &&
        visitorSelector.visitor
      ) {
        navigate('VisitorList');
      }
    }
  }

  render() {
    const { ownerDetails, _apartmentId, selectedName } = this.state;
    let disable = true;
    if (selectedName && _apartmentId) {
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
            <ScrollView>
              <Form>
                <View f_row around_between>
                  <View w_1_2>
                    <Item shadow f_row>
                      <IconFontAw5
                        name="building"
                        size={22}
                        color="#121644"
                        style={{ marginLeft: 10 }}
                      />
                      <Input
                        placeholder="Block"
                        onChangeText={block =>
                          this.setState({
                            block
                          })
                        }
                      />
                    </Item>
                  </View>
                  <View w_1_2>
                    <Item shadow f_row>
                      <Input
                        placeholder="Apt #"
                        onChangeText={apartment =>
                          this.setState({
                            apartment
                          })
                        }
                      />
                    </Item>
                  </View>
                  <TouchableOpacity
                    onPress={this.getOwnerDetails}
                    style={styles.checkBtn}
                  >
                    <IconFont name="check" size={22} color="green" />
                  </TouchableOpacity>
                </View>
                <Item shadow>
                  <IconSimple
                    name="user"
                    size={22}
                    color="#515c6f"
                    style={{ marginLeft: 10 }}
                  />
                  <Picker
                    mode="dropdown"
                    placeholder="Name"
                    selectedValue={selectedName || undefined}
                    onValueChange={selectedName =>
                      this.setState({
                        selectedName
                      })
                    }
                  >
                    {ownerDetails &&
                      ownerDetails.length > 0 &&
                      ownerDetails.map(
                        ({ name: { title, first, last }, _id }) => (
                          <Picker.Item
                            key={_id}
                            label={`${title} ${first} ${last}`}
                            value={`${first} ${last}`}
                          />
                        )
                      )}
                  </Picker>
                </Item>
                <Button
                  light
                  contentCenter
                  rounded
                  style={styles.button}
                  onPress={this.onSubmit}
                  disabled={disable}
                >
                  <View style={styles.center}>
                    <Text grey fontSize18 marginRight10>
                      Submit
                    </Text>
                    <IconFont name="check" size={22} color="#FF0000" />
                  </View>
                </Button>
              </Form>
              {this.manageActivity()}
            </ScrollView>
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  checkBtn: {
    marginTop: 25,
    height: 30,
    marginLeft: 5,
    width: 30,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'grey',
    borderWidth: 0.5,
    padding: 5
  },
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
    elevation: 8
  }
});

const mapStateToProps = state => ({
  visitorSelector: createVisitorSelector(state)
});

export default connect(
  mapStateToProps,
  { postVisitor }
)(WhomToMeet);
