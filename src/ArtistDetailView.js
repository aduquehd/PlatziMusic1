import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons'

import {firebaseAuth, firebaseDatabase} from './firebase'
import ArtistBox from "./artistBox";
import CommentList from './CommentList'

export default class ArtistDetailView extends Component {
  state = {
    comments: []
  };

  handleSend = () => {
    const {text} = this.state;
    const artistCommentsRef = this.getArtistCommentsRef();
    const newCommentRef = artistCommentsRef.push();

    const {uid, photoURL} = firebaseAuth.currentUser;

    newCommentRef.set({
      text,
      userPhoto: photoURL,
      uid: uid,
    });

    this.getArtistRef().transaction(function (artist) {
      if (artist) {
        artist.commentsCount++
      }
      return artist || {
        likeCount: 0,
        commentsCount: 1,
      };
    });

    this.setState({text: ''})
  };

  getArtistCommentsRef = () => {
    const {id} = this.props.artist;
    return firebaseDatabase.ref(`comments/${id}`);
  };

  getArtistRef = () => {
    const {id} = this.props.artist;
    return firebaseDatabase.ref(`artist/${id}`)
  };

  handleChangeText = (text) => this.setState({text});

  componentDidMount() {
    this.getArtistCommentsRef().on('child_added', this.addComment)
  }

  addComment = (data) => {
    const comment = data.val();
    const newComments = this.state.comments.concat(comment);
    this.setState({
      comments: newComments
    });
  };

  componentWillUnmount() {
    this.getArtistCommentsRef().off('child_added', this.addComment)
  }

  render() {
    const artist = this.props.artist;
    const {comments} = this.state;

    return (
      <View style={styles.container}>
        <ArtistBox artist={artist}/>
        <CommentList comments={comments}/>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={this.state.text}
            placeholder="Opina sobre este artista"
            onChangeText={this.handleChangeText}
          />
          <TouchableOpacity onPress={this.handleSend}>
            <Icon name="ios-send-outline" size={30} color="gray"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgray',
    paddingTop: 10,
  },
  header: {
    fontSize: 20,
    paddingHorizontal: 15,
    marginVertical: 10
  },
  inputContainer: {
    height: 50,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    height: 50,
    flex: 1
  }
});