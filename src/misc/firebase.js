import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

const config = {
  apiKey: 'AIzaSyCmtg_lfTV7dHDuUCcsLEoCigQ1AI8gYu8',
  authDomain: 'chat-web-app-68ec2.firebaseapp.com',
  projectId: 'chat-web-app-68ec2',
  storageBucket: 'chat-web-app-68ec2.appspot.com',
  messagingSenderId: '979997548470',
  appId: '1:979997548470:web:54a6f87c323d36dfefab17',
};

const app = firebase.initializeApp(config);
export const auth = app.auth();
export const database = app.database();
