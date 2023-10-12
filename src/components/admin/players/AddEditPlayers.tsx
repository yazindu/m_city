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
import {selectErrorHelper, textErrorHelper} from "../../utils/tools.tsx";

const defaultValues = {
    name: '',
    lastname: '',
    number: '',
    position: ''
}
export const AddEditPlayers = () => {
    const {playerId} = useParams();
    const [loading, setLoading] = useState(false);
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
            setValues({name: '', lastname: '', number: '', position: ''})
        } else {
            setValues(defaultValues)
            seFormType('add')
        }
    }, [playerId])
    console.log('formType', formType, 'values', values)

    return (
        <AdminLayout title={formType === 'add' ? 'Add player' : 'Edit player'}>
            <div className={'editmatch_dialog_wrapper'}>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        image
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
                                    <MenuItem value={'Defense'}>Defense</MenuItem>
                                    <MenuItem value={'Midfield'}>Midfield</MenuItem>
                                    <MenuItem value={'Striker'}>Defense</MenuItem>
                                </Select>
                                {selectErrorHelper({formik, values: 'position'})}
                            </FormControl>
                        </div>
                        <Button
                            type={'submit'}
                            variant={'contained'}
                            color={'primary'}
                            disabled={loading}
                        >
                            {formType == 'add'
                                ? 'Add player'
                                : 'Edit player'}
                        </Button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}