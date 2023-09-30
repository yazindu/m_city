import {PropsWithChildren, useEffect} from "react";
import {User as FirebaseUser} from "@firebase/auth";
import {useNavigate} from "react-router-dom";

type AuthGuardProps = PropsWithChildren & { user: FirebaseUser | null };

export function AuthGuard(props: AuthGuardProps) {
    const navigate = useNavigate();

    useEffect(() => {
        if (!props.user) navigate('/sign_in')
    }, [navigate, props.user]);

    return !!props.user && props.children;
}