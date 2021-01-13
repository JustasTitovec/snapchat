import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyCVnOHVgWUIMNQFXQRejn-cheCN27oeYdk',
  authDomain: 'snapchat-234a5.firebaseapp.com',
  projectId: 'snapchat-234a5',
  storageBucket: 'snapchat-234a5.appspot.com',
  messagingSenderId: '127351999869',
  appId: '1:127351999869:web:827a1e9b50083fb26b1014',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider, storage };
