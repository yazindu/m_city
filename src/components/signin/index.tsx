import * as Yup from 'yup'
import {useFormik} from "formik";
import {useState} from "react";
import {CircularProgress} from "@mui/material";

export const SignIn = () => {
    const [loading, setLoading] = useState(false)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('The email is required'),
            password: Yup.string()
                .required('The password is required')
        }),
        onSubmit: (values) => {
            //goto server with field values
            setLoading(true)
            console.log(values)
        }
    })
    return (
        <div className={'container'}>
            <div className={'signin_wrapper'} style={{margin: '100px'}}>
                <form onSubmit={formik.handleSubmit}>
                    <h2>Please log in</h2>
                    <input
                        name={'email'}
                        placeholder={'Email'}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email
                        ? <div className={'error_label'}> {formik.errors.email}</div>
                        : null
                    }
                    <input
                        name={'password'}
                        placeholder={'Password'}
                        type={"password"}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password
                        ? <div className={'error_label'}> {formik.errors.password}</div>
                        : null
                    }
                    {loading
                        ? <CircularProgress color={"secondary"} className={'progress'}/>
                        : <button type={'submit'}>Log in</button>
                    }
                </form>
            </div>
        </div>
    )
}