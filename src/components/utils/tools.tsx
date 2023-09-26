import mCityLogo from '../../resources/images/logos/manchester_city_logo.png'
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';

type cityLogoProps = {
    link: boolean
    linkTo: string
    width: string
    height: string
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

export const showToastError = (msg) => {
    toast.error(msg, {
        position: toast.POSITION.TOP_LEFT
    })
}
export const showToastSuccess = (msg) => {
    toast.success(msg, {
        position: toast.POSITION.TOP_LEFT
    })
}