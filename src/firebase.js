import {initialize, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";
import {getAuth} from "firebase/auth";
import { getAllByAltText } from "@testing-library/react";


const firebaseConfig = {
    apiKey: "AIzaSyBUmLG6wwfZCp85ttxWN_Hir90-VNsNe_8",
    authDomain: "react-d2055.firebaseapp.com",
    projectId: "react-d2055",
    storageBucket: "react-d2055.appspot.com",
    messagingSenderId: "297685798838",
    appId: "1:297685798838:web:02914b2d3ad1eaaadcfb17",
    measurementId: "G-Y9VXNZZV6E"
  };
const app  = initializeApp(firebaseConfig);
const auth =  getAuth(app);
const  db = getFirestore(app);
const storage =  getStorage(app);

export {auth, db, storage};