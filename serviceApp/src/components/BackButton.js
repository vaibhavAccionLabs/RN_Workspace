import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome';

const BackButton = ({ onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.imageView}>
    <IconFont name="angle-left" size={22} color="#FF0000" />
  </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    imageView : {
      marginLeft : 10,
      margin :5,
      alignItems : 'center',
      justifyContent: 'center',
      height: 40,
      width: 40,
      borderWidth: 0.5,
      borderRadius: 50,
      borderColor: '#078CD6',
      borderBottomWidth: 2,
      borderRightWidth: 2,
      shadowColor: '#078CD6',
      shadowOffset: { width: 2, height: 2 },
      shadowOpacity: 0.5,
      shadowRadius: 1,
      elevation: 0,
    },
  });

export default BackButton;
