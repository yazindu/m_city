// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

import {getFirestore, collection, addDoc} from "firebase/firestore";
import {cityDb} from '../temp/m-city-export.ts'

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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);
export const auth = getAuth()

// cityDb.matches.forEach(async (item)=>{
//     try {
//         const docRef = await addDoc(collection(db, "matches"), item);
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })

// cityDb.players.forEach(async (item)=>{
//     try {
//         const docRef = await addDoc(collection(db, "players"), item);
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })

// cityDb.positions.forEach(async (item)=>{
//     try {
//         const docRef = await addDoc(collection(db, "positions"), item);
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })

// cityDb.promotions.forEach(async (item)=>{
//     try {
//         const docRef = await addDoc(collection(db, "promotions"), item);
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })

// cityDb.teams.forEach(async (item)=>{
//     try {
//         const docRef = await addDoc(collection(db, "teams"), item);
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })


