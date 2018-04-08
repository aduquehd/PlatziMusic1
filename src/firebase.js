import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyD96gpqf5RKI5DXWaxPOcgoHYOYpCgBDr4",
  authDomain: "platzimusic-9b8b1.firebaseapp.com",
  databaseURL: "https://platzimusic-9b8b1.firebaseio.com",
  projectId: "platzimusic-9b8b1",
  storageBucket: "platzimusic-9b8b1.appspot.com",
  messagingSenderId: "531332396059"
};

firebase.initializeApp(config);

export const firebaseAuth = firebase.auth();
export const firebaseDatabase = firebase.database();

export default firebase;