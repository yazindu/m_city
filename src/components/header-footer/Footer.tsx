import {CityLogo} from "../utils/tools.tsx";

export const Footer = () => {
    return (
        <footer className={'bck_blue'}>
            <div>
                <CityLogo link={true} linkTo={'/'} width={'70px'} height={'70px'}/>
            </div>
            <div className={'footer_discl'}>
                Manchester city 2021. All rights reserved.
            </div>
        </footer>
    )
}