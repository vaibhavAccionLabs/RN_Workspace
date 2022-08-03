import React from 'react';
import { StyleSheet, StatusBar, Image, TouchableOpacity } from 'react-native';
import { Container, Content, Card, View, Text } from 'native-base';
import IconFont from 'react-native-vector-icons/FontAwesome';
import IconSimple from 'react-native-vector-icons/SimpleLineIcons';
import IconEntypo from 'react-native-vector-icons/Entypo';
import IconAnt from 'react-native-vector-icons/AntDesign';
// import { DashboardData } from 'config';
import CompanyInfo from './CompanyInfo';

const Dashboard = ({ navigation: { navigate } }) => (
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
        flex: 1,
        alignItems: 'center'
      }}
    >
      {
        // <Card transparent style={{flexDirection: 'row'}}>
        //   <View style={styles.center}>
        //     <TouchableOpacity
        //       onPress={() => navigate('QRCode')}
        //       style={styles.imageView}
        //     >
        //       <IconAnt name='qrcode' size={27} color="#000" />
        //       <Text style={styles.title}>QR Code</Text>
        //     </TouchableOpacity>
        //   </View>
        // </Card>
      }
    </Content>
  </Container>
);

const styles = StyleSheet.create({
  center: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    color: '#078CD6',
    fontSize: 14
  },
  imageView: {
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
    height: 90,
    width: 95,
    borderWidth: 1,
    borderLeftColor: 'red',
    borderBottomColor: '#078CD6',
    borderTopColor: 'red',
    borderRightColor: '#078CD6',
    borderRadius: 10,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    shadowColor: '#078CD6',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 0
  },
  image: {
    height: 30,
    width: 30
  },
  cardView: {
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
});

export default Dashboard;
