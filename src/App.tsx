import AppRoutes from "./AppRoutes.tsx";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./config/firebase_config.ts";
import {useMCityStore} from "./store/store.ts";


export const App = () => {
    const user = useMCityStore(store => store.user)
    const {setUser} = useMCityStore()

        setUser('yasindu')
        console.log('zustand',user)
    // onAuthStateChanged(auth, (usr) => {
    //     console.log('onAuth',usr)
    // });
    // console.log('return',user)
    return (
        <AppRoutes user={null}/>
    )
}