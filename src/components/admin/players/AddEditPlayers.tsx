import {AdminLayout} from "../../../hoc/AdminLayout.tsx";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button
} from "@mui/material/";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

const defaultValues = {
    name: '',
    lastname: '',
    number: '',
    position: ''
}
export const AddEditPlayers = () => {
    const {playerId} = useParams();
    const [values, setValues] = useState(defaultValues)
    const [formType, seFormType] = useState('')
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            name: Yup.string()
                .required('This input is required'),
            lastname: Yup.string()
                .required('This input is required'),
            number: Yup.number()
                .required('This input is required')
                .min(0, 'The minimum is zero')
                .max(100, 'The max is 100'),
            position: Yup.string()
                .required('This input is required'),
        }), onSubmit: (values) => {
            console.log(values)
        }
    })

    useEffect(() => {
        if (playerId) {
            seFormType('edit')
            setValues({name: 'test', lastname: 'test', number: '0', position: 'test'})
        } else {
            setValues(defaultValues)
            seFormType('add')
        }
    }, [playerId])
    console.log('formType', formType, 'values', values)

    return (
        <AdminLayout title={'test'}>
            <h1>content</h1>
        </AdminLayout>
    )
}