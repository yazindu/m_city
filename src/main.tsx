import ReactDOM from 'react-dom/client'
import './resources/css/app.css'
import AppRoutes from "./AppRoutes.tsx";

const App = () => {
    return (
        <AppRoutes/>
    )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <App/>
)
