import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Header} from "./components/header-footer/Header.tsx";
import {Home} from "./components/home";
import {Footer} from "./components/header-footer/Footer.tsx";
import {SignIn} from "./components/signin";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./config/firebase_config.ts";
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
import {NotFound} from "./components/not-found/NotFound.tsx";
import {useMCityStore} from "./store/store.ts";
import {useEffect} from "react";


const AppRoutes = () => {
    const {setUser} = useMCityStore();

    useEffect(() =>
            onAuthStateChanged(auth, user => {
                setUser(user)
            }),
        []
    );

    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/the_team'} element={<TheTeam/>}/>
                <Route path={'/the_matches'} element={<TheMatches/>}/>
                <Route path={'/sign_in'} element={<SignIn/>}/>
                <Route path={'/dashboard'} element={<AuthGuard><Dashboard/></AuthGuard>}/>
                <Route path={'/admin_players'} element={<AuthGuard><AdminPlayers/></AuthGuard>}/>
                <Route path={'/admin_players/add_player'}
                       element={<AuthGuard><AddEditPlayers/></AuthGuard>}/>
                <Route path={'/admin_players/edit_player/:playerId'}
                       element={<AuthGuard><AddEditPlayers/></AuthGuard>}/>
                <Route path={'/admin_matches'} element={<AuthGuard><AdminMatches/></AuthGuard>}/>
                <Route path={'/admin_matches/add_match'}
                       element={<AuthGuard><AddEditMatches/></AuthGuard>}/>
                <Route path={'/admin_matches/edit_match/:matchId'}
                       element={<AuthGuard><AddEditMatches/></AuthGuard>}/>
                <Route path={'*'} element={<NotFound/>}/>
            </Routes>
            <ToastContainer/>
            <Footer/>
        </BrowserRouter>
    )
}

export default AppRoutes
