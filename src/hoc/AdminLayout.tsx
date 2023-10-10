import {AdminNav} from "../components/admin/nav/AdminNav.tsx";
import {ReactElement} from "react";

type AdminLayoutProps = {
    title: string
    children: ReactElement
}

export const AdminLayout = ({children, title}: AdminLayoutProps) => {
    return (
        <div className={'admin_container'}>
            <div className={'admin_left_nav'}>
                <AdminNav/>
            </div>
            <div className={'admin_right'}>
                <h2>{title}</h2>
                {children}
            </div>
        </div>
    )
}