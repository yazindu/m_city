// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAhPKAguhVKDHlMAhPczPnMFvZ5uSzP4Uc",
    authDomain: "mcity-yasindu.firebaseapp.com",
    projectId: "mcity-yasindu",
    storageBucket: "mcity-yasindu.appspot.com",
    messagingSenderId: "799763650367",
    appId: "1:799763650367:web:4f47357767ddbaab28258a",
    measurementId: "G-1330WMM1WN"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth()