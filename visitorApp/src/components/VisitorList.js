import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import {
  Container,
  Content,
  Text,
  Body,
  List,
  ListItem,
  Left,
  Right,
  Thumbnail,
  StyleProvider
} from 'native-base';

import getTheme from '../../native-base-theme/components';
import material from '../../native-base-theme/variables/material';
import { fetchVisitors } from '../redux/reducers/visitorReducer';
import { resetCreatedVisitor } from '../redux/actions/visitor';
import { getVisitorListSelector } from '../redux/selectors';
import DefaultUserIcon from './DefaultUserIcon';
import BackButton from './BackButton';
type Props = {};

class VisitorList extends Component<Props> {
  state = {};

  static navigationOptions = {
    headerLeft: ({ onPress }) => <BackButton onPress={onPress} />
  };

  async componentDidMount() {
    try {
      const { fetchVisitors, resetCreatedVisitor } = this.props;
      await fetchVisitors();
      resetCreatedVisitor();
    } catch (err) {
      console.log(err);
    }
  }

  renderListItem = ({ item }) => {
    const {
      firstName,
      lastName,
      email,
      phone,
      photo,
      checkInAt,
      whomToMeet
    } = item;
    const dateObj = new Date(checkInAt);
    return (
      <List>
        <ListItem avatar>
          <Left>
            <DefaultUserIcon />
          </Left>
          <Body>
            <Text>{firstName}</Text>
            <Text note>{phone}</Text>
          </Body>
          <Body>
            <Text>Sathish K</Text>
            <Text note>D3-1005</Text>
          </Body>
          <Right>
            <Text>{`${dateObj.getDate()}-${dateObj.getMonth()}-${dateObj.getFullYear()}`}</Text>
            <Text
              note
            >{`${dateObj.getHours()}:${dateObj.getMinutes()} pm`}</Text>
          </Right>
        </ListItem>
      </List>
    );
  };

  render() {
    const { visitorData } = this.props;
    return (
      <StyleProvider style={getTheme(material)}>
        <Container style={{ marginTop: 100 }}>
          <StatusBar
            translucent
            backgroundColor="rgba(255,255,255,0.1)"
            animated
            barStyle="dark-content"
          />

          {visitorData && !visitorData.error && visitorData.request && (
            <ActivityIndicator size="large" color="#0000ff" />
          )}

          {visitorData &&
            !visitorData.error &&
            !visitorData.request &&
            visitorData.visitorList && (
              <Content
                padder
                contentContainerStyle={{
                  width: '100%',
                  flex: 1
                }}
              >
                <List>
                  <ListItem avatar>
                    <Left>
                      <Text style={styles.whiteColor}>profile</Text>
                    </Left>
                    <Body>
                      <Text>Visitor</Text>
                    </Body>
                    <Body>
                      <Text>Owner</Text>
                    </Body>
                    <Right>
                      <Text>Date</Text>
                    </Right>
                  </ListItem>
                </List>
                {(visitorData.visitorList &&
                  visitorData.visitorList.length > 0 && (
                    <FlatList
                      data={visitorData.visitorList}
                      renderItem={this.renderListItem}
                      keyExtractor={item => item._id}
                    />
                  )) || (
                  <List>
                    <Body>
                      <Text>No Visitors Available</Text>
                    </Body>
                  </List>
                )}
              </Content>
            )}
        </Container>
      </StyleProvider>
    );
  }
}

const styles = StyleSheet.create({
  whiteColor: {
    color: 'white'
  },
  f_row: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20
  },
  backImage: {
    justifyContent: 'flex-start'
  },
  image: {
    height: 55,
    width: 55
  },
  cardView: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  header: {
    fontSize: 22,
    fontWeight: '500',
    textAlign: 'center'
  }
});

const mapStateToProps = state => ({
  visitorData: getVisitorListSelector(state)
});

export default connect(
  mapStateToProps,
  { fetchVisitors, resetCreatedVisitor }
)(VisitorList);
