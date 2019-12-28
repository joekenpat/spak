import firebase from 'firebase';
import 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyDMbpSmxfEzHosa7dB_YuxYX7hlS2p2D6Q',
  authDomain: 'spak-joekenpat.firebaseapp.com',
  databaseURL: 'https://spak-joekenpat.firebaseio.com',
  projectId: 'spak-joekenpat',
  storageBucket: 'spak-joekenpat.appspot.com',
  messagingSenderId: '257995473223',
  appId: '1:257995473223:web:bbcb0d47e30de5bfa84c62',
};

firebase.initializeApp(config);
const db = firebase.firestore();
const storage = firebase.storage();
const auth = firebase.auth();
const { currentUser } = auth;
const studentsData = db.collection('studentsData');
const projectData = db.collection('projectData');

export {
  db, storage, auth, currentUser, studentsData, projectData,
};
