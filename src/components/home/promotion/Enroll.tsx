import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {Fade} from "react-awesome-reveal";
import {CircularProgress} from "@mui/material";

export const Enroll = () => {
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {email: ''},
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email')
                .required('Email is required'),
        }),
        onSubmit: (values) => {
            setLoading(true);
            //submit form
        }
    })
    return (
        <Fade>
            <div className={'enroll_wrapper'}>
                <form onSubmit={formik.handleSubmit}>
                    <div className={'enroll_title'}>
                        Enter your email
                    </div>
                    <div className={'enroll_input'}>
                        <input
                            name={'email'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            placeholder={'enter your email'}
                        />
                        {formik.touched.email && formik.errors.email
                            ? <div className={'error_label'}>
                                {formik.errors.email}
                            </div>
                            : null
                        }
                        {
                            loading
                                ? <CircularProgress color={'secondary'} className={'progress'}/>
                                : <button type={'submit'}>Enroll</button>
                        }
                        <div className={'enroll_discl'}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam accumsan malesuada luctus.
                            Nullam in condimentum augue. Aliquam erat volutpat. Nullam vitae elementum odio, sed laoreet
                            arcu.
                        </div>
                    </div>
                </form>
            </div>
        </Fade>
    )
}