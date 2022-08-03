import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Platform,
  StatusBar,
  ScrollView,
  Animated
} from 'react-native';

import Product from '../components/Product';

import Ionicons from 'react-native-vector-icons/Ionicons';

class Explore extends React.Component {
  componentWillMount() {
    this.scrollY = new Animated.Value(0);
    this.startHeaderHeight = 80;
    this.endHeaderHeight = 50;
    if (Platform.OS === 'android') {
      this.startHeaderHeight = 100 + StatusBar.currentHeight;
      this.endHeaderHeight = 70 + StatusBar.currentHeight;
    }
    this.animatedHeaderHeight = this.scrollY.interpolate({
      inputRange: [0, 50],
      outputRange: [this.startHeaderHeight, this.endHeaderHeight],
      extrapolate: 'clamp'
    });
    this.animatedOpacity = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    this.animatedTop = this.animatedHeaderHeight.interpolate({
      inputRange: [this.endHeaderHeight, this.startHeaderHeight],
      outputRange: [-30, 10],
      extrapolate: 'clamp'
    });
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <Animated.View
            style={{
              height: this.animatedHeaderHeight,
              backgroundColor: 'white',
              borderBottomWidth: 1,
              borderBottomColor: 'grey'
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: 'white',
                marginHorizontal: 20,
                shadowOffset: { width: 0, height: 0 },
                shadowColor: 'black',
                shadowOpacity: 0.2,
                elevation: 1,
                marginTop: Platform.OS === 'android' ? 30 : null
              }}
            >
              <Ionicons name="ios-search" size={20} />
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Try Bangalore"
                placeholderTextColor="grey"
                style={{ flex: 1, fontWeight: '700', backgroundColor: 'white' }}
              />
            </View>
            <Animated.View
              style={{
                flexDirection: 'row',
                marginHorizontal: 20,
                position: 'relative',
                top: this.animatedTop,
                opacity: this.animatedOpacity
              }}
            >
              <View
                style={{
                  minHeight: 20,
                  minWidth: 40,
                  backgroundColor: 'white',
                  padding: 5,
                  borderColor: '#ddd',
                  borderWidth: 1,
                  borderRadius: 2,
                  marginRight: 5
                }}
              >
                <Text style={{ fontWeight: '700', fontSize: 10 }}>Guests</Text>
              </View>
              <View
                style={{
                  minHeight: 20,
                  minWidth: 40,
                  backgroundColor: 'white',
                  padding: 5,
                  borderColor: '#ddd',
                  borderWidth: 1,
                  borderRadius: 2
                }}
              >
                <Text style={{ fontWeight: '700', fontSize: 10 }}>Guests</Text>
              </View>
            </Animated.View>
          </Animated.View>
          <ScrollView
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            onScroll={Animated.event([
              { nativeEvent: { contentOffset: { y: this.scrollY } } }
            ])}
          >
            <View style={{ flex: 1, backgroundColor: 'white', paddingTop: 20 }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '700',
                  paddingHorizontal: 20
                }}
              >
                What can we help you find?
              </Text>
              <View style={{ height: 130, marginTop: 20 }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                >
                  <Product />
                  <Product />
                  <Product />
                  <Product />
                  <Product />
                  <Product />
                  <Product />
                  <Product />
                  <Product />
                </ScrollView>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-around',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  marginTop: 30,
                  borderTopWidth: 1,
                  borderTopColor: '#ddd',
                  paddingTop: 20
                }}
              >
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
                <Product />
              </View>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}

export default Explore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
});
