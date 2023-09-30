// import {ComponentType} from "react";
//
// export const AuthGuard = ({Component}: { Component: ComponentType }) => {
//     console.log(Component)
//     return <Component/>
//
// }

import React from "react";

interface VisibilityProps {
    isVisible?: boolean
}

export function AuthGuard<P>(WrappedComponent: React.ComponentType<P>) {
    return (props: P & VisibilityProps) => {
        if (props.isVisible === false) {
            return null
        }

        return <WrappedComponent {...props} />
    }
}