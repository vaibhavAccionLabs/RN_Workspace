import React from 'react';
import { Text, View, Image } from 'react-native';

const Product = () => (
  <View
    style={{
      height: 130,
      width: 130,
      borderWidth: 0.5,
      borderColor: '#dddddd',
      marginLeft: 20,
      marginBottom: 20
    }}
  >
    <View style={{ flex: 2 }}>
      <Image
        source={require('../assets/home.jpg')}
        style={{
          height: null,
          width: null,
          resizeMode: 'cover',
          flex: 1
        }}
      />
    </View>
    <View style={{ flex: 1, paddingLeft: 10, paddingTop: 10 }}>
      <Text>Home</Text>
    </View>
  </View>
);

export default Product;
