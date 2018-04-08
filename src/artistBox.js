import React, {Component} from 'react';

import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import {firebaseDatabase, firebaseAuth} from "./firebase";

type Props = {};
export default class ArtistBox extends Component<Props> {

  state = {
    liked: false,
    likeCount: 0,
    commentsCount: 0,
  };

  componentDidMount() {
    const {uid} = firebaseAuth.currentUser;
    this.getArtistRef().on('value', snapshot => {
      const artist = snapshot.val();
      if (artist) {
        this.setState({
          likeCount: artist.likeCount,
          commentsCount: artist.commentsCount,
          liked: artist.likes && artist.likes[uid],
        })
      }
    });
  };


  handlePress = () => {
    this.toggleLike(!this.state.liked)
  };

  getArtistRef = () => {
    const {id} = this.props.artist;
    return firebaseDatabase.ref(`artist/${id}`)
  };

  toggleLike = (liked) => {
    const {uid} = firebaseAuth.currentUser;
    this.getArtistRef().transaction(function (artist) {
      if (artist) {
        if (artist.likes && artist.likes[uid]) {
          artist.likeCount--;
          artist.likes[uid] = null;
        } else {
          artist.likeCount++;
          if (!artist.likes) {
            artist.likes = {};
          }
          artist.likes[uid] = true;
        }
      }
      return artist || {
        likeCount: 1,
        commentsCount: 0,
        likes: {
          [uid]: true,
        }
      };
    });
  };


  render() {
    const {name, image} = this.props.artist;

    const {likeCount} = this.state;
    const {commentsCount} = this.state;

    const likeIcon = this.state.liked ?
      <Icon name="ios-heart" size={30} color="#e74c3c"/> :
      <Icon name="ios-heart-outline" size={30} color="gray"/>;

    return (
      <View style={styles.artistBox}>
        <Image style={styles.image} source={{uri: image}}/>
        <View style={styles.info}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.row}>

            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={this.handlePress}>
                {likeIcon}
              </TouchableOpacity>
              <Text style={styles.count}>{likeCount}</Text>
            </View>

            <View style={styles.iconContainer}>
              <Icon name="ios-chatbubbles-outline" size={30} color="gray"/>
              <Text style={styles.count}>{commentsCount}</Text>
            </View>

          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  artistBox: {
    margin: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOpacity: .2,
    shadowOffset: {
      heigth: 1,
      width: -2,
    },
    elevation: 2,

  },
  image: {
    width: 150,
    height: 150,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    marginTop: 10,
    color: '#333'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginTop: 15,
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  count: {
    color: 'gray'
  }
});
