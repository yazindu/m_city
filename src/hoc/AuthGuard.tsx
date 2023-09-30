import {PropsWithChildren} from "react";
import {User as FirebaseUser} from "@firebase/auth";
import {Navigate} from "react-router-dom";

type AuthGuardProps = PropsWithChildren & { user: FirebaseUser | null };

export function AuthGuard(props: AuthGuardProps) {
    if (props.user) return props.children;
    return <Navigate to={'/sign_in'}/>
}