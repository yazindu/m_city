import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {Header} from "./components/header_footer/Header.tsx";
import {Home} from "./components/home";
import {Footer} from "./components/header_footer/Footer.tsx";
import {SignIn} from "./components/signin";
import {User as FirebaseUser} from "firebase/auth";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {AuthGuard} from "./hoc/AuthGuard.tsx";
import {Dashboard} from "./components/admin/Dashboard.tsx";

const AppRoutes = ({user}: { user: FirebaseUser | null }) => {
    console.log(user)
    return (
        <BrowserRouter>
            <Header user={user}/>
            <Routes>
                <Route path={'/sign_in'} element={<SignIn user={user}/>}/>
                <Route path={'/dashboard'} element={<AuthGuard user={user}><Dashboard/></AuthGuard>}/>
                <Route path={'/'} element={<Home/>}/>
            </Routes>
            <ToastContainer/>
            <Footer/>
        </BrowserRouter>
    )
}

export default AppRoutes
