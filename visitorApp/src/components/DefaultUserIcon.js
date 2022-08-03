import React from 'react';
import { StyleSheet, Image } from 'react-native';

const DefaultUserIcon = () => (
  <Image
    source={require('../assets/images/icons/User_Icon.png')}
    style={styles.image}
  />
);

const styles = StyleSheet.create({
  image: {
    height: 45,
    width: 45
  }
});

export default DefaultUserIcon;
