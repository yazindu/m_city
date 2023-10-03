import {AdminLayout} from "./AdminLayout.tsx";

export const Dashboard = () => {
    return (
        <AdminLayout>
            <div className={'user_dashboard'}>
                <div>
                    This is your dashboard
                </div>
            </div>
        </AdminLayout>
    )
}