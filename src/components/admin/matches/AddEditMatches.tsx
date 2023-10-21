import {
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl
} from "@mui/material/";
import {useEffect, useState} from "react";
import {useFormik} from "formik";
import * as Yup from 'yup'
import {AdminLayout} from "../../../hoc/AdminLayout.tsx";
import {
    selectErrorHelper,
    selectIsError, showToastError, showToastSuccess,
    teamDocumentFields,
    textErrorHelper
} from "../../utils/tools.tsx";
import {addDoc, FirestoreError, getDocs} from "firebase/firestore";
import {
    getDocById,
    matchesCollection,
    teamsCollection, updateDocById
} from "../../../config/firebase_config.ts";
import {useNavigate, useParams} from "react-router-dom";

const defaultValues = {
    awayThmb: '',
    date: '',
    local: '',
    resultLocal: '',
    away: '',
    resultAway: '',
    referee: '',
    stadium: '',
    result: '',
    final: '',
    localThmb: ''
}

export const AddEditMatches = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false);
    const [formType, setFormType] = useState('')
    const [values, setValues] = useState(defaultValues)
    const [teams, setTeams] = useState<teamDocumentFields[]>([])
    const {matchId} = useParams();

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: values,
        validationSchema: Yup.object({
            date: Yup.string()
                .required('This input is required'),
            local: Yup.string()
                .required('This input is required'),
            resultLocal: Yup.string()
                .required('This input is required')
                .min(0, 'The minimum is 0')
                .max(99, 'The maximum is 99'),
            away: Yup.string()
                .required('This input is required'),
            resultAway: Yup.number()
                .required('This input is required')
                .min(0, 'The minimum is 0')
                .max(99, 'The maximum is 99'),
            referee: Yup.string()
                .required('This input is required'),
            stadium: Yup.string()
                .required('This input is required'),
            result: Yup.mixed()
                .required('This input is required')
                .oneOf(['W', 'D', 'L', 'N/A']),
            final: Yup.mixed()
                .required('This input is required')
                .oneOf(['Yes', 'No']),
        }), onSubmit: (values) => {
            submitForm(values)
        }
    })

    const showTeams = () => (
        teams
            ? teams.map(item => (
                <MenuItem key={item.id} value={item.shortName}>{item.shortName}</MenuItem>
            ))
            : null
    )

    const submitForm = async (values: typeof defaultValues) => {
        let dataToSubmit = values
        teams.forEach(team => {
            if (team.shortName === dataToSubmit.local) {
                dataToSubmit['localThmb'] = team.thmb
            }
            if (team.shortName === dataToSubmit.away) {
                dataToSubmit['awayThmb'] = team.thmb
            }
        })
        setLoading(true)
        try {
            if (formType === 'add') {
                await addDoc(matchesCollection, dataToSubmit);
                formik.resetForm()
                showToastSuccess('Match added')
                navigate('/admin_matches')
            } else {
                const error = await updateDocById(matchesCollection, matchId, dataToSubmit)
                error
                    ? showToastError(error)
                    : showToastSuccess('Match updated')
            }
        } catch (error) {
            const e = error as FirestoreError
            showToastError(e.message)
        } finally {
            setLoading(false);
        }
    }

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
        }, [teams]
    )

    useEffect(() => {
        if (matchId) {
            const fetchMatch = async () => {
                const {error, snapshot} = await getDocById(matchesCollection, matchId)
                if (snapshot && snapshot.exists) {
                    setFormType('edit')
                    setValues(snapshot.data())
                } else {
                    showToastError('Sorry, nothing was found')
                }
                if (error) showToastError(error)
            }
            fetchMatch()
        } else {
            setFormType('add')
            setValues(defaultValues)
        }
    }, [matchId])

    return (
        <AdminLayout title={formType === 'add'
            ? 'Add match'
            : 'Edit match'
        }>
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
                                        {showTeams()}
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
                                    />
                                </FormControl>
                                <div>

                                </div>
                                <h4>Result away</h4>
                                <FormControl error={selectIsError({formik, values: 'away'})}>
                                    <Select
                                        id={'away'}
                                        variant={'outlined'}
                                        displayEmpty
                                        {...formik.getFieldProps('away')}
                                    ><MenuItem value={''} disabled>Select a team</MenuItem>
                                        {showTeams()}
                                    </Select>
                                    {selectErrorHelper({formik, values: 'away'})}
                                </FormControl>
                                <FormControl style={{marginLeft: '10px'}}>
                                    <TextField
                                        id={'resultAway'}
                                        type={'number'}
                                        variant={'outlined'}
                                        {...formik.getFieldProps('resultAway')}
                                        {...textErrorHelper({formik, values: 'resultAway'})}
                                    />
                                </FormControl>
                            </div>
                            <hr/>
                            <div>
                                <h4>Match info</h4>
                                <div className={'mb-5'}>
                                    <FormControl>
                                        <TextField
                                            id={'referee'}
                                            variant={'outlined'}
                                            placeholder={'Add the referee name'}
                                            {...formik.getFieldProps('referee')}
                                            {...textErrorHelper({formik, values: 'referee'})}
                                        ></TextField>
                                    </FormControl>
                                </div>
                                <div className={'mb-5'}>
                                    <FormControl>
                                        <TextField
                                            id={'stadium'}
                                            variant={'outlined'}
                                            placeholder={'Add the stadium name'}
                                            {...formik.getFieldProps('stadium')}
                                            {...textErrorHelper({formik, values: 'stadium'})}
                                        ></TextField>
                                    </FormControl>
                                </div>
                                <div className={'mb-5'}>
                                    <FormControl error={selectIsError({formik, values: 'result'})}>
                                        <Select
                                            id={'result'}
                                            variant={'outlined'}
                                            displayEmpty
                                            {...formik.getFieldProps('result')}
                                        ><MenuItem value={''} disabled>Select a result</MenuItem>
                                            <MenuItem value={'W'}>Win</MenuItem>
                                            <MenuItem value={'D'}>Draw</MenuItem>
                                            <MenuItem value={'L'}>Lose</MenuItem>
                                            <MenuItem value={'N/A'}>Not available</MenuItem>
                                        </Select>
                                        {selectErrorHelper({formik, values: 'result'})}
                                    </FormControl>
                                </div>
                                <div className={'mb-5'}>
                                    <FormControl error={selectIsError({formik, values: 'final'})}>
                                        <Select
                                            id={'final'}
                                            variant={'outlined'}
                                            displayEmpty
                                            {...formik.getFieldProps('final')}
                                        ><MenuItem value={''} disabled>Was the game played</MenuItem>
                                            <MenuItem value={'Yes'}>Yes</MenuItem>
                                            <MenuItem value={'No'}>No</MenuItem>
                                        </Select>
                                        {selectErrorHelper({formik, values: 'final'})}
                                    </FormControl>
                                </div>
                                <Button
                                    type={'submit'}
                                    variant={'contained'}
                                    color={'primary'}
                                    disabled={loading}
                                >{formType === 'add'
                                    ? 'Add match'
                                    : 'Edit Match'
                                }</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </AdminLayout>
    )
}