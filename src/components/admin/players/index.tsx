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
import {playersCollection} from "../../../config/firebase_config.ts";
import {playerDocumentFields, showToastError} from "../../utils/tools.tsx";
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

export const AdminPlayers = () => {
    const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData, DocumentData> | undefined>(undefined)
    const [players, setPlayers] = useState<playerDocumentFields[]>([])
    const [loading, setLoading] = useState(false)

    async function fetchPlayersCollectionSnapshot(q: Query<DocumentData, DocumentData>) {
        setLoading(true)
        try {
            const playersCollectionSnapshot = await getDocs(q);
            if (playersCollectionSnapshot !== null) {
                playersCollectionSnapshot.forEach(doc => {
                    setPlayers(players => [...players, {id: doc.id, ...doc.data()} as playerDocumentFields])
                })
                const lastVisible = playersCollectionSnapshot.docs[playersCollectionSnapshot.docs.length - 1];
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
            if (players.length < 1) {
                const q = query(playersCollection, limit(2))
                fetchPlayersCollectionSnapshot(q)
            }
        }, [players]
    )

    const loadMorePlayers = async () => {
        if (lastVisible) {
            const q = query(playersCollection, startAfter(lastVisible), limit(2));
            fetchPlayersCollectionSnapshot(q)
        } else showToastError('Nothing to load')
    }
    return (
        <AdminLayout title={'The players'}>
            <>
                <div className={'mb-5'}>
                    <Button
                        disableElevation
                        variant={'outlined'}
                        component={Link}
                        to={'/admin_players/add_player'}
                    >
                        Add player
                    </Button>
                </div>
                <Paper className={'mb-5'}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>First name</TableCell>
                                <TableCell>Last name</TableCell>
                                <TableCell>Number</TableCell>
                                <TableCell>Position</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {players
                                ? players.map(player => (
                                    <TableRow key={player.id}>
                                        <TableCell>
                                            <Link to={`/admin_players/edit_player/${player.id}`}>{player.name}</Link>
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                to={`/admin_players/edit_player/${player.id}`}>{player.lastname}</Link>
                                        </TableCell>
                                        <TableCell>
                                            {player.number}
                                        </TableCell>
                                        <TableCell>
                                            {player.position}
                                        </TableCell>
                                    </TableRow>
                                ))
                                : null}
                        </TableBody>
                    </Table>
                </Paper>
                <Button
                    onClick={() => loadMorePlayers()}
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