import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Header} from "./components/header-footer/Header.tsx";
import {Home} from "./components/home";
import {Footer} from "./components/header-footer/Footer.tsx";
import {SignIn} from "./components/signin";
import {User as FirebaseUser} from "firebase/auth";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthGuard} from "./hoc/AuthGuard.tsx";

import {Dashboard} from "./components/admin/Dashboard.tsx";
import {AdminPlayers} from "./components/admin/players";
import {AddEditPlayers} from "./components/admin/players/AddEditPlayers.tsx";


const AppRoutes = ({user}: { user: FirebaseUser | null }) => {
    return (
        <BrowserRouter>
            <Header user={user}/>
            <Routes>
                <Route path={'/sign_in'} element={<SignIn user={user}/>}/>
                <Route path={'/dashboard'} element={<AuthGuard user={user}><Dashboard/></AuthGuard>}/>
                <Route path={'/admin_players'} element={<AuthGuard user={user}><AdminPlayers/></AuthGuard>}/>
                <Route path={'/admin_players/add_player'} element={<AuthGuard user={user}><AddEditPlayers/></AuthGuard>}/>
                <Route path={'/admin_players/edit_player/:playerId'} element={<AuthGuard user={user}><AddEditPlayers/></AuthGuard>}/>
                <Route path={'/'} element={<Home/>}/>
            </Routes>
            <ToastContainer/>
            <Footer/>
        </BrowserRouter>
    )
}

export default AppRoutes
