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
import {playerDocumentFields} from "../../utils/tools.tsx";
import {Button} from "@mui/material/";

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
            console.error(e.message);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
            if (players.length < 1) {
                console.log('players.length', players.length)
                const q = query(playersCollection, limit(2))
                fetchPlayersCollectionSnapshot(q)
            }
            console.log('players', players)
            console.log('lastVisible', lastVisible)
        }, [players]
    )

    const loadMorePlayers = async () => {
        if (lastVisible) {
            const q = query(playersCollection, startAfter(lastVisible), limit(2));
            fetchPlayersCollectionSnapshot(q)
        } else console.log('Nothing to load')
    }
    return (
        <AdminLayout title={'The players'}>
            <Button onClick={() => loadMorePlayers()}>Load more</Button>
        </AdminLayout>
    )
}