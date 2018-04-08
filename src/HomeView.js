import React, {Component} from 'react';

import {
  Platform,
  StyleSheet,
  View,
  ActivityIndicator,
} from 'react-native';

import ArtistList from "./artistList";
import {getArtists} from "./api-client"

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

type Props = {};
export default class HomeView extends Component<Props> {

  state = {
    artists: null
  };

  componentDidMount() {
    getArtists()
      .then((data) => this.setState({artists: data}))
  }

  render() {
    const artists = this.state.artists;

    return (
      <View style={styles.container}>
        {artists && <ArtistList artists={artists}/>}
        {!artists && <ActivityIndicator size="large"/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: Platform.select({
      ios: 30,
      android: 10,
    }),
  },
});
