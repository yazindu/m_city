import React from 'react'
import ReactDOM from 'react-dom/client'
import './resources/css/app.css'
import AppRoutes from './AppRoutes.tsx'
import {getAuth, onAuthStateChanged} from "firebase/auth";
import {User as FirebaseUser} from "firebase/auth";

const App = ({user}: { user: FirebaseUser | null }) => {
    return (
        <AppRoutes user={user}/>
    )
}

const auth = getAuth()
onAuthStateChanged(auth, (user) => {
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App user={user}/>
        </React.StrictMode>,
    )
    /*
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        // ...
    } else {
        // User is signed out
        // ...
    }
    */
});