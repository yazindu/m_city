// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

import {getFirestore, collection} from "firebase/firestore";
// import {cityDb} from '../temp/m-city-export.ts'

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

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(firebaseApp);
export const auth = getAuth()

export const matchesCollection = collection(db, "matches");
export const playersCollection = collection(db, "players");
export const positionsCollection = collection(db, "positions");
export const promotionsCollection = collection(db, "promotions");
export const teamsCollection = collection(db, "teams");

// cityDb.matches.forEach(async (item)=>{
//     try {
//         const docRef = await addDoc(matchesCollection, item);
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })

// cityDb.players.forEach(async (item)=>{
//     try {
//         const docRef = await addDoc(playersCollection, item);
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })

// cityDb.positions.forEach(async (item)=>{
//     try {
//         const docRef = await addDoc(positionsCollection, item);
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })

// cityDb.promotions.forEach(async (item)=>{
//     try {
//         const docRef = await addDoc(promotionsCollection, item);
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })

// cityDb.teams.forEach(async (item)=>{
//     try {
//         const docRef = await addDoc(teamsCollection, item);
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// })

//const array = matchesCollectionSnapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}))
//console.log(array);
// matchesCollectionSnapshot.forEach((doc) => {
//     // console.log(`${doc.id} => ${doc.data()}`);
//     console.log(`${JSON.stringify({id: doc.id, ...doc.data()})}`);
//
// });
