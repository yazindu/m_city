import {ReactElement} from "react";

export const AuthGuard = ({component}: { component: ReactElement }) => {
    console.log(component)
    return (
        <h1>
            AuthGuard
        </h1>
    )
}