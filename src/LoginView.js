import React, {Component} from 'react';

import {
  StyleSheet,
  View,
  Text,
  Button,
  ImageBackground,
  Image
} from 'react-native';


import FBSDK, {
  LoginButton,
  AccessToken
} from 'react-native-fbsdk';

import {Actions} from 'react-native-router-flux';
import ArtistList from "./artistList";
import {getArtists} from "./api-client"


import firebase, {
  firebaseAuth
} from './firebase';

const {FacebookAuthProvider} = firebase.auth;

type Props = {};
export default class LoginView extends Component<Props> {

  state = {
    credentials: null,
  };

  authenticateUser = () => {
    AccessToken.getCurrentAccessToken().then((data) => {
      const {accessToken} = data;
      const credential = FacebookAuthProvider.credential(accessToken);
      firebaseAuth.signInWithCredential(credential).then((credentials) => {
        this.setState({credentials});
        Actions.home()
      }, (error) => {
        console.log("Sign in error", error)
      })
    })
  };

  componentWillMount() {
    this.authenticateUser()
  }

  handleLoginFinished = (error, result) => {
    if (error) {
      console.error("login has error: " + error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      this.authenticateUser()
    }
  };

  handleButtonPress = () => {
    Actions.home()
  };

  render() {
    return (
      <ImageBackground source={require('./background.jpg')} style={styles.container}>
        <Image source={require('./logo_c5b7cfc9-4bd1-4c40-82da-d65774c4cc3f.png')} style={styles.logo}/>
        <Text style={styles.welcome}>Bienvenidos a PlatziMusic</Text>
        <LoginButton
          readPermissions={['public_profile', 'email']}
          onLoginFinished={this.handleLoginFinished}
          onLogoutFinished={() => alert("logout.")}/>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 15,
  },
  welcome: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    backgroundColor: 'transparent',
    color: 'white',
  },
});
