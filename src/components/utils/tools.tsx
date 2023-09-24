import mCityLogo from '../../resources/images/logos/manchester_city_logo.png'
import {Link} from "react-router-dom";

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