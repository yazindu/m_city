import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {Header} from "./components/header_footer/Header.tsx";
import {Home} from "./components/home";
import {Footer} from "./components/header_footer/Footer.tsx";
import {SignIn} from "./components/signin";

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/sign_in'} element={<SignIn/>}/>
                <Route path={'/'} element={<Home/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
