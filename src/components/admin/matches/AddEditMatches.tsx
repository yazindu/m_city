import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button
} from "@mui/material/";
import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'

const defaultValues = {
    date: '',
    local: '',
    resultLocal: '',
    away: '',
    resultAway: '',
    referee: '',
    stadium: '',
    result: '',
    final: ''
}

export const AddEditMatches = () => {
    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState('')
    const [values, setValues] = useState(defaultValues)
    const [teams, setTeams] = useState(null)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            date: Yup.string()
                .required('This input is requried'),
            local: Yup.string()
                .required('This input is requried'),
            resultLocal: Yup.number()
                .required('This input is requried')
                .min(0, 'The minimum is 0')
                .max(99, 'The maximum is 99'),
            away: Yup.string()
                .required('This input is requried'),
            resultAway: Yup.number()
                .required('This input is requried')
                .min(0, 'The minimum is 0')
                .max(99, 'The maximum is 99'),
            referee: Yup.string()
                .required('This input is requried'),
            stadium: Yup.string()
                .required('This input is requried'),
            result: Yup.mixed()
                .required('This input is requried')
                .oneOf(['W', 'D', 'L', 'N/A']),
            final: Yup.mixed()
                .required('This input is requried')
                .oneOf(['Yes', 'No']),
        }), onSubmit: (values) => {
            //submit values
            console.log(values)
        }
    })


    return (
        <>
            <h1>Add Edit Matches</h1>
        </>
    )
}