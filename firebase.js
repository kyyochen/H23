import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {

    apiKey: "AIzaSyAOPELVPZCV67Ajup7IWHLaRynpIKFJY3k",
  
    authDomain: "hackharvard23.firebaseapp.com",
  
    projectId: "hackharvard23",
  
    storageBucket: "hackharvard23.appspot.com",
  
    messagingSenderId: "655088179934",
  
    appId: "1:655088179934:web:04afe5bcffec8d96bfc04f"
  
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const userRef = collection(db, "users")

export {
    auth,
    db,
    userRef,
    storage
}