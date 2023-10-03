import ReactDOM from 'react-dom/client'
import './resources/css/app.css'
import AppRoutes from './AppRoutes.tsx'
import {onAuthStateChanged} from "firebase/auth";
import {User as FirebaseUser} from "firebase/auth";
import {auth} from "./config/firebase_config.ts";

const App = ({user}: { user: FirebaseUser | null }) => {
    return (
        <AppRoutes user={user}/>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root')!)
onAuthStateChanged(auth, (user) => {
    root.render(
        <App user={user}/>
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