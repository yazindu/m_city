import {useState} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {Fade} from "react-awesome-reveal";
import {CircularProgress} from "@mui/material";
import {promotionsCollection} from "../../../config/firebase_config.ts";
import {addDoc, getDocs, FirestoreError, query, where} from "firebase/firestore";
import {showToastError, showToastSuccess} from "../../utils/tools.tsx";

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
            submitForm(values)
        }
    })

    const submitForm = async ({email}: { email: string }) => {
        const q = query(promotionsCollection, where("email", "==", email));
        try {
            const querySnapshot = await getDocs(q);
            if (querySnapshot.size >= 1) {
                showToastError('Sorry you are already in the list :(')
                setLoading(false);
                return false;
            } else {
                await addDoc(promotionsCollection, {email: email});
                formik.resetForm()
                showToastSuccess('Congratulations! :)')
                setLoading(false);
            }
        } catch (error) {
            const e = error as FirestoreError
            setLoading(false);
            showToastError(e.message)
        }
    }

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