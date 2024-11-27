import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyA93qpOrqGuWnu3uwYyWmDTWiFKD6dybes",
    authDomain: "omee-3f15d.firebaseapp.com",
    projectId: "omee-3f15d",
    storageBucket: "omee-3f15d.appspot.com",
    messagingSenderId: "512707323360",
    appId: "1:512707323360:web:7dd7b8473ba6d57f84b785"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};

