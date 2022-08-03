import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Spinner } from 'native-base';
import { loadTokens } from 'redux/localStorage';
import { connect } from 'react-redux';
import { authSuccess } from 'redux/actions/login';

class AuthLoading extends Component {
  async componentWillMount() {
    await loadTokens()
      .then(async initialAuth => {
        const {
          navigation: { navigate },
          authSuccess
        } = this.props;
        await authSuccess(initialAuth);
        initialAuth ? navigate('App') : navigate('Signin');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <View style={styles.spinnerStyle}>
        <Spinner color="blue" />
      </View>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => {
  return {
    authSuccess: payload => {
      dispatch(authSuccess(payload));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoading);

const styles = StyleSheet.create({
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
