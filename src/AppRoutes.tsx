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
import {AdminMatches} from "./components/admin/matches";
import {AddEditMatches} from "./components/admin/matches/AddEditMatches.tsx";
import {TheTeam} from "./components/the-team";
import {TheMatches} from "./components/the-matches";


const AppRoutes = ({user}: { user: FirebaseUser | null }) => {
    return (
        <BrowserRouter>
            <Header user={user}/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/the_team'} element={<TheTeam/>}/>
                <Route path={'/the_matches'} element={<TheMatches/>}/>
                <Route path={'/sign_in'} element={<SignIn user={user}/>}/>
                <Route path={'/dashboard'} element={<AuthGuard user={user}><Dashboard/></AuthGuard>}/>
                <Route path={'/admin_players'} element={<AuthGuard user={user}><AdminPlayers/></AuthGuard>}/>
                <Route path={'/admin_players/add_player'} element={<AuthGuard user={user}><AddEditPlayers/></AuthGuard>}/>
                <Route path={'/admin_players/edit_player/:playerId'} element={<AuthGuard user={user}><AddEditPlayers/></AuthGuard>}/>
                <Route path={'/admin_matches'} element={<AuthGuard user={user}><AdminMatches/></AuthGuard>}/>
                <Route path={'/admin_matches/add_match'} element={<AuthGuard user={user}><AddEditMatches/></AuthGuard>}/>
                <Route path={'/admin_matches/edit_match/:matchId'} element={<AuthGuard user={user}><AddEditMatches/></AuthGuard>}/>
            </Routes>
            <ToastContainer/>
            <Footer/>
        </BrowserRouter>
    )
}

export default AppRoutes
