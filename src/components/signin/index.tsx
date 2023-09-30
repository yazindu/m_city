import * as Yup from 'yup'
import {useFormik} from "formik";
import {useState} from "react";
import {CircularProgress} from "@mui/material";
import {firebaseApp} from "../../config/firebase_config.ts";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {showToastError, showToastSuccess} from "../utils/tools.tsx";
import {useNavigate} from "react-router-dom";

export const SignIn = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const formik = useFormik({

        initialValues: {
            email: 'ynk.techlead@gmail.com',
            password: '123456'
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('The email is required'),
            password: Yup.string()
                .required('The password is required')
        }),
        onSubmit: (values) => {
            setLoading(true)
            submitForm(values)
            console.log(values)
        }
    })

    const submitForm = ({email, password}: { email: string, password: string }) => {
        const auth = getAuth(firebaseApp)
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                showToastSuccess("Welcome back!");
                navigate('/dashboard')
            })
            .catch(error => {
                setLoading(false)
                showToastError(error.message)
            })
    }
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
                        ?
                        <div className={'error_label'}> {formik.errors.email}</div>
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
                        ?
                        <div className={'error_label'}> {formik.errors.password}</div>
                        : null
                    }
                    {loading
                        ? <CircularProgress color={"secondary"} className={'progress'}/>
                        :
                        <button type={'submit'}>Log in</button>
                    }
                </form>
            </div>
        </div>
    )
}