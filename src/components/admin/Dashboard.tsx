import {AdminLayout} from "../../hoc/AdminLayout.tsx";

export const Dashboard = () => {
    return (
        <AdminLayout title={'Dashboard'}>
            <div className={'user_dashboard'}>
                <div>
                    This is your dashboard
                </div>
            </div>
        </AdminLayout>
    )
}