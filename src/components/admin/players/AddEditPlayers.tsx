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
    selectErrorHelper,
    showToastError,
    showToastSuccess,
    textErrorHelper
} from "../../utils/tools.tsx";
import {addDoc, FirestoreError} from "firebase/firestore";
import {getDocById, playersCollection, updateDocById} from "../../../config/firebase_config.ts";
import {useNavigate} from "react-router-dom";
import {FileUploader} from "../../utils/FileUploader.tsx";

const defaultValues = {
    name: '',
    lastname: '',
    number: '',
    position: ''
}

export const AddEditPlayers = () => {
    const navigate = useNavigate();
    const {playerId} = useParams();
    const [loading, setLoading] = useState(false);
    const [values, setValues] = useState(defaultValues)
    const [formType, setFormType] = useState('')
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
            submitForm(values)

        }
    })

    const submitForm = async (dataToSubmit: typeof defaultValues) => {
        setLoading(true)
        try {
            if (formType === 'add') {
                await addDoc(playersCollection, {
                    name: dataToSubmit.name,
                    number: dataToSubmit.number,
                    position: dataToSubmit.position,
                    lastname: dataToSubmit.lastname
                });
                formik.resetForm()
                showToastSuccess('Player added')
                navigate('/admin_players')
            } else {
                const error = await updateDocById(playersCollection, playerId, dataToSubmit)
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
        if (playerId) {
            setFormType('edit')
            setValues({name: '', lastname: '', number: '', position: ''})
            const fetchPlayer = async () => {
                const {error, snapshot} = await getDocById(playersCollection, playerId)
                if (snapshot && snapshot.exists) {
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
    }, [playerId])

    return (
        <AdminLayout title={formType === 'add' ? 'Add player' : 'Edit player'}>
            <div className={'editmatch_dialog_wrapper'}>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <FormControl>
                            <FileUploader dir={'players'}/>
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
                            <FormControl>
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
                            ? 'Add player'
                            : 'Edit player'}
                        </Button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}