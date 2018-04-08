/**
 * Sample React Native PlatziMusic
 * https://github.com/facebook/react-native
 * @flow
 */

import {
  StyleSheet,
  Platform
} from 'react-native';
import React, {Component} from 'react';
import {Scene, Router, Stack} from 'react-native-router-flux'
import HomeView from "./HomeView";
import ArtistDetailView from "./ArtistDetailView";
import LoginView from "./LoginView";


type Props = {};
export default class PlatziMusic extends Component<Props> {

  render() {
    return (
      <Router>
        <Stack key="root">
          <Scene key="login" component={LoginView} hideNavBar/>
          <Scene key="home" component={HomeView} hideNavBar/>
          <Scene key="artistDetail" component={ArtistDetailView} title="Comentarios" hideNavBar={false}/>
          {/*<Scene key="artistDetail" component={ArtistDetailView} hideNavBar={Platform.OS === 'android'}/>*/}
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 50,
  },

});


// var config = {
//     apiKey: "AIzaSyD96gpqf5RKI5DXWaxPOcgoHYOYpCgBDr4",
//     authDomain: "platzimusic-9b8b1.firebaseapp.com",
//     databaseURL: "https://platzimusic-9b8b1.firebaseio.com",
//     projectId: "platzimusic-9b8b1",
//     storageBucket: "platzimusic-9b8b1.appspot.com",
//     messagingSenderId: "531332396059"
//   };
//   firebase.initializeApp(config);