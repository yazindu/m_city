import {AdminLayout} from "../../../hoc/AdminLayout.tsx";
import {useEffect, useState} from "react";
import {
    DocumentData,
    FirestoreError,
    getDocs,
    limit,
    query,
    Query,
    QueryDocumentSnapshot,
    startAfter
} from "firebase/firestore";
import {matchesCollection} from "../../../config/firebase_config.ts";
import {matchDocumentFields, showToastError} from "../../utils/tools.tsx";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,


} from "@mui/material/";
import {Link} from 'react-router-dom'
import {CircularProgress} from "@mui/material";

export const AdminMatches = () => {
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | undefined>(undefined)
    const [matches, setMatches] = useState<matchDocumentFields[]>([])
    const [loading, setLoading] = useState(false)

    async function fetchMatchesCollectionSnapshot(q: Query<DocumentData, DocumentData>) {
        setLoading(true)
        try {
            const matchesCollectionSnapshot = await getDocs(q);
            if (matchesCollectionSnapshot !== null) {
                matchesCollectionSnapshot.forEach(doc => {
                    setMatches(matches => [...matches, {id: doc.id, ...doc.data()} as matchDocumentFields])
                })
                const lastVisible = matchesCollectionSnapshot.docs[matchesCollectionSnapshot.docs.length - 1];
                if (lastVisible) setLastVisible(lastVisible)
                else setLastVisible(undefined)
            }
        } catch (error) {
            const e = error as FirestoreError
            showToastError(e.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
            if (matches.length < 1) {
                const q = query(matchesCollection, limit(2))
                fetchMatchesCollectionSnapshot(q)
            }
        }, [matches]
    )

    const loadMoreMatches = async () => {
        if (lastVisible) {
            const q = query(matchesCollection, startAfter(lastVisible), limit(2));
            fetchMatchesCollectionSnapshot(q)
        } else showToastError('Nothing to load')
    }
    return (
        <AdminLayout title={'The matches'}>
            <>
                <div className={'mb-5'}>
                    <Button
                        disableElevation
                        variant={'outlined'}
                        component={Link}
                        to={'/admin_matches/add_match'}
                    > Add match
                    </Button>
                </div>
                <Paper className={'mb-5'}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Match</TableCell>
                                <TableCell>Result</TableCell>
                                <TableCell>Final</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {matches
                                ? matches.map(match => (
                                    <TableRow key={match.id}>
                                        <TableCell>
                                            {match.date}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                to={`/admin_matches/edit_match/${match.id}`}></Link>
                                            {match.away} <strong>-</strong> {match.local}
                                        </TableCell>
                                        <TableCell>
                                            {match.resultAway} <strong>-</strong> {match.resultLocal}
                                        </TableCell>
                                        <TableCell>
                                            {match.final === 'Yes'
                                                ? <span className={'matches_tag_red'}>Final</span>
                                                : <span className={'matches_tag_green'}>Not played yet</span>
                                            }
                                        </TableCell>
                                    </TableRow>
                                ))
                                : null}
                        </TableBody>
                    </Table>
                </Paper>
                <Button
                    onClick={() => loadMoreMatches()}
                    variant={'contained'}
                    color={'primary'}
                    disabled={loading}
                >Load more</Button>
                <div className={'admin_progress'}>
                    {loading
                        ? <CircularProgress thickness={7} style={{color: '#98c5e9'}}/>
                        : null
                    }
                </div>
            </>
        </AdminLayout>
    )
}