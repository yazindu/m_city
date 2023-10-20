import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    Button
} from "@mui/material/";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {AdminLayout} from "../../../hoc/AdminLayout.tsx";
import {
    selectErrorHelper,
    selectIsError, showToastError,
    teamDocumentFields,
    textErrorHelper
} from "../../utils/tools.tsx";
import {FirestoreError, getDocs} from "firebase/firestore";
import {teamsCollection} from "../../../config/firebase_config.ts";

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
    const [teams, setTeams] = useState<teamDocumentFields[]>([])

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

    useEffect(() => {
            async function fetchTeamsCollectionSnapshot() {
                try {
                    const matchesCollectionSnapshot = await getDocs(teamsCollection);
                    if (matchesCollectionSnapshot !== null) {
                        matchesCollectionSnapshot.forEach(doc => {
                            setTeams(teams => [...teams, {id: doc.id, ...doc.data()} as teamDocumentFields])
                        })
                    }
                } catch (error) {
                    const e = error as FirestoreError
                    showToastError(e.message)
                }
            }

            if (teams.length < 1) {
                fetchTeamsCollectionSnapshot()
            }
            console.log('teams', teams)

        }, [teams]
    )

    return (
        <AdminLayout title={'undefined'}>
            <div className={'editmatch_dialog_wrapper'}>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <div>
                            <h4>Select date</h4>
                            <FormControl>
                                <TextField
                                    id={'date'}
                                    type={'date'}
                                    variant={'outlined'}
                                    {...formik.getFieldProps('date')}
                                    {...textErrorHelper({formik, values: 'date'})}
                                ></TextField>
                            </FormControl>
                            <hr/>
                            <div>
                                <h4>Result local</h4>
                                <FormControl error={selectIsError({formik, values: 'local'})}>
                                    <Select
                                        id={'local'}
                                        variant={'outlined'}
                                        displayEmpty
                                        {...formik.getFieldProps('local')}
                                    ><MenuItem value={''} disabled>Select a team</MenuItem>
                                    </Select>
                                    {selectErrorHelper({formik, values: 'local'})}
                                </FormControl>
                                <FormControl style={{marginLeft: '10px'}}>
                                    <TextField
                                        id={'resultLocal'}
                                        type={'number'}
                                        variant={'outlined'}
                                        {...formik.getFieldProps('resultLocal')}
                                        {...textErrorHelper({formik, values: 'resultLocal'})}
                                    ></TextField>

                                </FormControl>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}