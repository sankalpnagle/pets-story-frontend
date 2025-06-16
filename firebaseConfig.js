// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth ,GoogleAuthProvider,OAuthProvider,FacebookAuthProvider} from "firebase/auth";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// Your Firebase configuration object from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCnWEcHYlTynF6EGEXvz51a7pxpFjoHVGg",
  authDomain: "storyofpets-178bc.firebaseapp.com",
  projectId: "storyofpets-178bc",
  storageBucket: "storyofpets-178bc.firebasestorage.app",
  messagingSenderId: "1080624052763",
  appId: "1:1080624052763:web:162dd963d442a2c2bdd6be",
  measurementId: "G-WTZBKY0DN5"
};

// Initialize Firebase App
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

// Export Firebase services
const auth = getAuth(firebaseApp);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
// const appleProvider = new OAuthProvider('apple.com');
// appleProvider.addScope('email');
// appleProvider.addScope('name');

export { firebaseApp, auth ,messaging, googleProvider,facebookProvider};
