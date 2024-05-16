import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-hJx_1O4baf0cZv-0-kvkRyzWdWTedJA",
  authDomain: "webttb01.firebaseapp.com",
  projectId: "webttb01",
  storageBucket: "webttb01.appspot.com",
  messagingSenderId: "838404496275",
  appId: "1:838404496275:web:fe40f275441382e05ce666",
  measurementId: "G-9QG96EL9GB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);