import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDF0W2keyt3TEKKhar-fl1FX-xtKuWOXTc",
    authDomain: "crwn-db-19f09.firebaseapp.com",
    databaseURL: "https://crwn-db-19f09.firebaseio.com",
    projectId: "crwn-db-19f09",
    storageBucket: "crwn-db-19f09.appspot.com",
    messagingSenderId: "799503709404",
    appId: "1:799503709404:web:f004a4d6431a8550913019",
    measurementId: "G-CN7CKRLT95"
  };

  export const createUserProfileDocument = async (userAuth, additionalData ) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`)

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user',error.message)
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({ prompt: 'select_account' })
  export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
  export default firebase;