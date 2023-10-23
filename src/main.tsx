import ReactDOM from 'react-dom/client'
import './resources/css/app.css'
import {App} from "./App.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App/>
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