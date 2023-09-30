import {AppBar, Button, Toolbar} from '@mui/material/'
import {Link} from "react-router-dom";
import {CityLogo, showToastError, showToastSuccess} from "../utils/tools.tsx";
import {signOut, User as FirebaseUser} from "@firebase/auth";
import {auth} from "../../config/firebase_config.ts";

export const Header = ({user}: { user: FirebaseUser | null }) => {
    const logOutHandler = () => {
        signOut(auth).then(() => {
            showToastSuccess('Good bye!')
        }).catch((error) => {
            showToastError(error.message)
        });
    }

    return (
        <AppBar
            position={'fixed'}
            style={{
                backgroundColor: '#98c5e9',
                boxShadow: 'none',
                padding: '10px 0',
                borderBottom: '2px solid #00285e'
            }}
        >
            <Toolbar style={{display: 'flex'}}>
                <div style={{flexGrow: 1}}>
                    <div>
                        <CityLogo
                            link={true} linkTo={'/'} height={'70px'} width={'70px'}
                        />
                    </div>
                </div>

                <Link to={'/sign_in'}>
                    <Button color={"inherit"}>DEV_SIGN_IN</Button>
                </Link>
                <Link to={'/the_team'}>
                    <Button color={"inherit"}>The team</Button>
                </Link>
                <Link to={'/the_matches'}>
                    <Button color={"inherit"}>Matches</Button>
                </Link>
                {user
                    ? <>
                        <Button color={"inherit"} onClick={() => logOutHandler()}>Log out</Button>
                    </>
                    : null
                }
            </Toolbar>
        </AppBar>
    )
}