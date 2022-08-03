import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from 'native-base';

import COMPANY_LOGO from '../assets/images/BriclayBold.png';

const CompanyInfo = ({ title }) => (
  <View style={styles.center}>
    <Image source={COMPANY_LOGO} style={styles.logo} />
    <Text style={styles.header}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  center : {
    justifyContent: 'center',
    alignItems : 'center',
  },
  logo: {
    height: 75,
    width: 75
  },
  header: {
    color: '#fff',
    fontSize: 30,
    fontWeight: '600'
  }
});

export default CompanyInfo;
