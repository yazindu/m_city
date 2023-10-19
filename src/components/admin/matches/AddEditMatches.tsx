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
import {
    selectErrorHelper, selectIsError,
    showToastError,
    showToastSuccess,
    textErrorHelper
} from "../../utils/tools.tsx";
import {addDoc, FirestoreError} from "firebase/firestore";
import {getDocById, matchesCollection, storage, updateDocById} from "../../../config/firebase_config.ts";
import {useNavigate} from "react-router-dom";
import {FileUploader} from "../../utils/FileUploader.tsx";
import {getDownloadURL, ref} from "firebase/storage";

const defaultValues = {
    name: '',
    lastname: '',
    number: '',
    position: '',
    image: ''
}

export const AddEditMatches = () => {
    const navigate = useNavigate();
    const {matchId} = useParams();
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState(defaultValues)
    const [formType, setFormType] = useState('')
    const [defaultImg, setDefaultImg] = useState('')
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
            image: Yup.string()
                .required('This input is required'),
        }), onSubmit: (values) => {
            submitForm(values)

        }
    })

    const submitForm = async (dataToSubmit: typeof defaultValues) => {
        setLoading(true)
        try {
            if (formType === 'add') {
                await addDoc(matchesCollection, {
                    image: dataToSubmit.image,
                    lastname: dataToSubmit.lastname,
                    name: dataToSubmit.name,
                    number: dataToSubmit.number,
                    position: dataToSubmit.position,
                });
                formik.resetForm()
                showToastSuccess('Player added')
                navigate('/admin_matches')
            } else {
                const error = await updateDocById(matchesCollection, matchId, dataToSubmit)
                error
                    ? showToastError(error)
                    : showToastSuccess('Player updated')
            }
        } catch (error) {
            const e = error as FirestoreError
            showToastError(e.message)
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (matchId) {
            setFormType('edit')
            setValues(defaultValues)
            const fetchPlayer = async () => {
                const {error, snapshot} = await getDocById(matchesCollection, matchId)
                if (snapshot && snapshot.exists) {
                    try {
                        const matchesRef = ref(storage, `matches/${snapshot.data().image}`);
                        const downloadURL = await getDownloadURL(matchesRef)
                        updateImageName(snapshot.data().image)
                        setDefaultImg(downloadURL)
                    } catch (e) {
                        const error = e as FirestoreError
                        showToastError(error.message);
                    }
                    setFormType('edit')
                    setValues(snapshot.data())
                } else {
                    showToastError('Sorry, nothing was found')
                }
                if (error) showToastError(error)
            }
            fetchPlayer()

        } else {
            setValues(defaultValues)
            setFormType('add')
        }
    }, [matchId])

    const updateImageName = (filename: string) => {
        formik.setFieldValue('image', filename)
    }

    const resetImage = () => {
        formik.setFieldValue('image', '')
        setDefaultImg('')
    }

    return (
        <AdminLayout title={formType === 'add' ? 'Add match' : 'Edit match'}>
            <div className={'editmatch_dialog_wrapper'}>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl error={selectIsError({formik, values: 'image'})}>
                            <FileUploader
                                defaultImg={defaultImg} //image url
                                defaultImgName={formik.values.image} //name of file
                                dir={'matches'}
                                filename={filename => updateImageName(filename)}
                                resetImage={() => resetImage()}
                            />
                            {selectErrorHelper({formik, values: 'image'})}
                        </FormControl>
                        <hr/>
                        <h4>Player info</h4>
                        <div className={'mb-5'}>
                            <FormControl>
                                <TextField
                                    id={'name'}
                                    // name={'name'}
                                    variant={'outlined'}
                                    placeholder={'Add firstname'}
                                    {...formik.getFieldProps('name')}
                                    {...textErrorHelper({formik, values: 'name'})}
                                />
                            </FormControl>
                        </div>
                        <div className={'mb-5'}>
                            <FormControl>
                                <TextField
                                    id={'lastname'}
                                    // name={'lastname'}
                                    variant={'outlined'}
                                    placeholder={'Add lastname'}
                                    {...formik.getFieldProps('lastname')}
                                    {...textErrorHelper({formik, values: 'lastname'})}
                                />
                            </FormControl>
                        </div>
                        <div className={'mb-5'}>
                            <FormControl>
                                <TextField
                                    id={'number'}
                                    type={'number'}
                                    // name={'number'}
                                    variant={'outlined'}
                                    placeholder={'Add number'}
                                    {...formik.getFieldProps('number')}
                                    {...textErrorHelper({formik, values: 'number'})}
                                />
                            </FormControl>
                        </div>
                        <div className={'mb-5'}>
                            <FormControl error={selectIsError({formik, values: 'position'})}>
                                <Select
                                    id={'position'}
                                    // name={'position'}
                                    variant={'outlined'}
                                    displayEmpty
                                    {...formik.getFieldProps('position')}>
                                    <MenuItem value={''} disabled>Select a position</MenuItem>
                                    <MenuItem value={'Keeper'}>Keeper</MenuItem>
                                    <MenuItem value={'Defence'}>Defence</MenuItem>
                                    <MenuItem value={'Midfield'}>Midfield</MenuItem>
                                    <MenuItem value={'Striker'}>Defence</MenuItem>
                                </Select>
                                {selectErrorHelper({formik, values: 'position'})}
                            </FormControl>
                        </div>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            disabled={loading}
                        > {formType == 'add'
                            ? 'Add match'
                            : 'Edit match'}
                        </Button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}