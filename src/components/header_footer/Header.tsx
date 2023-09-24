import {AppBar, Toolbar, Button} from '@mui/material/'
import {Link} from "react-router-dom";
import {CityLogo} from "../utils/tools.tsx";

export const Header = () => {
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
                <Link to={'/dashboard'}>
                    <Button color={"inherit"}>Dashboard</Button>
                </Link>
            </Toolbar>
        </AppBar>
    )
}