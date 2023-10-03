import mCityLogo from '../../resources/images/logos/manchester_city_logo.png'
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import {signOut} from "@firebase/auth";
import {auth} from "../../config/firebase_config.ts";

type cityLogoProps = {
    link: boolean
    linkTo: string
    width: string
    height: string
}

export const logOutHandler = () => {
    signOut(auth).then(() => {
        showToastSuccess('Good bye!')
    }).catch((error) => {
        showToastError(error.message)
    });
}
export const CityLogo = ({linkTo, link, width, height}: cityLogoProps) => {
    const template = <div
        className={'img_cover'}
        style={{
            width: width,
            height: height,
            background: `url(${mCityLogo}) no-repeat`
        }}
    ></div>

    if (link) return (
        <Link to={linkTo} className={'link_logo'}>{template}</Link>
    )
    else return template
}

export const showToastError = (msg: string) => {
    toast.error(msg, {
        position: toast.POSITION.TOP_LEFT
    })
}
export const showToastSuccess = (msg: string) => {
    toast.success(msg, {
        position: toast.POSITION.TOP_LEFT
    })
}