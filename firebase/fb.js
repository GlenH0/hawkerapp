import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyCa319hDCxYOz6ZHZxh2dR0hgcXWiZQRjs",
    authDomain: "hawkerapp-6c26a.firebaseapp.com",
    databaseURL: "https://hawkerapp-6c26a-default-rtdb.firebaseio.com",
    projectId: "hawkerapp-6c26a",
    storageBucket: "hawkerapp-6c26a.appspot.com",
    messagingSenderId: "188233289575",
    appId: "1:188233289575:web:4f4c88a0e5f7a336d129c2"
  };
  
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else {
  firebase.app(); // if already initialized, use that one
}

// firebase.initializeApp(firebaseConfig);

export default firebase