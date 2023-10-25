import {PropsWithChildren, useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {useMCityStore} from "../store/store.ts";

export function AuthGuard({children}: PropsWithChildren) {
    const navigate = useNavigate();
    const user = useMCityStore(store => store.user)

    useEffect(() => {
        if (!user) navigate('/sign_in')
    }, [navigate, user]);

    return !!user && children;
}