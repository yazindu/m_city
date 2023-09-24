import {Routes, Route, BrowserRouter} from 'react-router-dom'
import {Header} from "./components/header_footer/Header.tsx";
import {Home} from "./components/home";
import {Footer} from "./components/header_footer/Footer.tsx";

const App = () => {
    return (
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
            </Routes>
            <Footer/>
        </BrowserRouter>
    )
}

export default App
