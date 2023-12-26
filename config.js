import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: "AIzaSyDg-kjoxvjZ26DoayuAd24ehP3Jwg5LYjs",

    authDomain: "auth-f763b.firebaseapp.com",
  
    projectId: "auth-f763b",
  
    storageBucket: "auth-f763b.appspot.com",
  
    messagingSenderId: "570251176307",
  
    appId: "1:570251176307:web:f58315bd68b8f80ff67d06"
  
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
};