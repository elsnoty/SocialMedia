// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBWT3BFjSpKyJFS3Nr83NJLL505DC0B7uk",
    authDomain: "react-project-dcc32.firebaseapp.com",
    projectId: "react-project-dcc32",
    storageBucket: "react-project-dcc32.appspot.com",
    messagingSenderId: "535083217797",
    appId: "1:535083217797:web:4c097a97066f92a04fcaec"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()