import {Link} from "react-router-dom";
import {ListItemButton} from "@mui/material";
import {logOutHandler} from "../../utils/tools.tsx";

export const AdminNav = () => {
    const links = [
        {
            title: 'Matches',
            linkTo: '/admin_matches'
        },
        {
            title: 'Players',
            linkTo: '/admin_players'
        }
    ]

    const renderItems = () => (
        links.map(link => (
            <Link to={link.linkTo} key={link.linkTo}>
                <ListItemButton className={'admin_nav_link'}>
                    {link.title}
                </ListItemButton>
            </Link>
        ))
    )

    return (
        <div>
            {renderItems()}
            <ListItemButton onClick={() => logOutHandler()} className={'admin_nav_link'}>
                Log out
            </ListItemButton>
        </div>
    )
}