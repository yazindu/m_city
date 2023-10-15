// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";

import {
    getFirestore,
    collection,
    DocumentData,
    QueryDocumentSnapshot,
    doc,
    CollectionReference,
    getDoc,
    FirestoreError,
    updateDoc
} from "firebase/firestore";
import {getStorage} from "firebase/storage";
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

export const storage = getStorage(firebaseApp)

// Firestore data converter
const matchesConverter = {
    toFirestore: (match: DocumentData) => {
        return {
            name: match.name,
            state: match.state,
            country: match.country
        };
    },
    fromFirestore: (snapshot: QueryDocumentSnapshot) => {
        //const data = snapshot.data();
        return {id: snapshot.id, ...snapshot.data()};
    }
};
export const matchesCollectionConverted = collection(db, "matches").withConverter(matchesConverter);
export const matchesCollection = collection(db, "matches");
export const playersCollection = collection(db, "players");
export const positionsCollection = collection(db, "positions");
export const promotionsCollection = collection(db, "promotions");
export const teamsCollection = collection(db, "teams");

export const getDocById = async (collection: CollectionReference, id: string) => {
    const docRef = doc(db, collection.path, id);
    let error: string | null = null
    let snapshot: DocumentData | null = null
    try {
        snapshot = await getDoc(docRef);
    } catch (e) {
        error = (e as FirestoreError).message
    }
    return {error, snapshot}
}

export const updateDocById = async (collection: CollectionReference, id: string | undefined, data: {
    [key: string]: string
}) => {
    let error: string | null = null
    if (id) {
        const docRef = doc(db, collection.path, id);
        try {
            await updateDoc(docRef, data);
        } catch (e) {
            error = (e as FirestoreError).message
        }
    }
    return error
}

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
