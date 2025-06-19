import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY ,
   authDomain: "onecart-9a577.firebaseapp.com",
  projectId: "onecart-9a577",
  storageBucket: "onecart-9a577.firebasestorage.app",
  messagingSenderId: "597687160461",
  appId: "1:597687160461:web:ec0af6626df2ca392f9cc4"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()


export {auth , provider}

