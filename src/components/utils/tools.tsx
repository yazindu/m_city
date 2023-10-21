import mCityLogo from '../../resources/images/logos/manchester_city_logo.png'
import {Link} from "react-router-dom";
import {toast} from 'react-toastify';
import {signOut} from "@firebase/auth";
import {auth} from "../../config/firebase_config.ts";
import {ReactNode} from "react";
import {FormHelperText} from "@mui/material/";
import {FormikValues} from "formik";

export type positionDocumentFields = {
    id: string,
    d: string,
    l: string,
    p: string,
    pts: string,
    team: string,
    w : string
}

export type teamDocumentFields = {
    id: string,
    name: string,
    shortName: string,
    thmb: string
}

export type playerDocumentFields = {
    id: string,
    image: string,
    lastname: string,
    name: string,
    number: string,
    position: string,
    url: string
}

export type matchDocumentFields = {
    id: string,
    away: string,
    awayThmb: string,
    date: string,
    final: string,
    local: string,
    localThmb: string,
    referee: string,
    result: string,
    resultAway: string,
    resultLocal: string,
    stadium: string
}

export type MatchesBlockProps = {
    match: matchDocumentFields
}

type CityLogoProps = {
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
export const CityLogo = ({linkTo, link, width, height}: CityLogoProps) => {
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

type TagProps = {
    link?: string
    bck?: string
    fontSize?: string
    color?: string
    add?: Record<string, string>
    children: ReactNode
}
export const Tag = ({link, bck, fontSize, color, children, add}: TagProps) => {
    const template = <div style={{
        background: bck ? bck : '#ffffff',
        fontSize: fontSize ? fontSize : '15px',
        color: color ? color : '#000000',
        padding: '5px 10px',
        display: 'inline-block',
        fontFamily: 'Righteous',
        ...add
    }}
    >{children}</div>

    if (link) {
        return (
            <Link to={link}>{template}</Link>
        )
    } else return template
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

type ErrorHelperProps = {
    formik: FormikValues,
    values: string
}

export const textErrorHelper = ({formik, values}: ErrorHelperProps) => ({
    error: !!formik.errors[values] && formik.touched[values],
    helperText: formik.errors[values] && formik.touched[values] ? formik.errors[values] : null
})

export const selectErrorHelper = ({formik, values}: ErrorHelperProps) => {
    if (!!formik.errors[values] && formik.touched[values]) {
        return (<FormHelperText error={true}>{formik.errors[values]}</FormHelperText>)
    }
    return false;
}

export const selectIsError = ({formik, values}: ErrorHelperProps) => {
    return formik.errors[values] && formik.touched[values];
}