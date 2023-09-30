import {AppBar, Toolbar, Button} from '@mui/material/'
import {Link, useNavigate} from "react-router-dom";
import {CityLogo} from "../utils/tools.tsx";
import {User as FirebaseUser, signOut} from "@firebase/auth";
import {showToastError, showToastSuccess} from "../utils/tools.tsx";
import {auth} from "../../config/firebase_config.ts";

export const Header = ({user}: { user: FirebaseUser | null }) => {
    const navigate = useNavigate();


    const logOutHandler = () => {
        signOut(auth).then(() => {
            navigate('/')
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