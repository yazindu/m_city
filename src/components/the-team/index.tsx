import {useEffect, useState} from "react";
import {FirestoreError, getDocs} from "firebase/firestore";
import {playersCollection, storage} from "../../config/firebase_config.ts";
import {playerDocumentFields, playerDocumentFieldsWithURL, showToastError} from "../utils/tools.tsx";
import {getDownloadURL, ref} from "firebase/storage";

export const TheTeam = () => {
    const [loading, setLoading] = useState(true)
    const [players, setPlayers] = useState<playerDocumentFields[]>([])


    useEffect(() => {
            async function fetchPlayersCollectionSnapshot() {
                setLoading(true)
                try {
                    const playersCollectionSnapshot = await getDocs(playersCollection);
                    let players = [] as playerDocumentFieldsWithURL[]
                    if (playersCollectionSnapshot !== null) {
                        playersCollectionSnapshot.forEach(doc => {
                            players.push({id: doc.id, url: '', ...doc.data()} as playerDocumentFieldsWithURL)
                            // setPlayers(players => [...players, {id: doc.id, ...doc.data()} as playerDocumentFields])
                        })

                        let promises: Promise<string>[] = [];
                        players.forEach((player, index) => {
                            promises.push(
                                new Promise((resolve, reject) => {
                                    const playersRef = ref(storage, `players/${player.image}`);
                                    getDownloadURL(playersRef).then((downloadURL) => {
                                        players[index].url = downloadURL
                                        resolve('1')
                                    }).catch(() => {
                                        // const e = error as FirestoreError
                                        reject(player.name)
                                    })
                                })
                            )
                        })
                        Promise.all(promises)
                            .then(()=>{setPlayers(players)})
                            .catch((e)=>{
                                console.log('promise catch',e)})
                        console.log('promise players', players)
                    }
                } catch (error) {
                    const e = error as FirestoreError
                    showToastError(e.message);
                } finally {
                    setLoading(false)
                }
            }

            if (players.length < 1) {
                fetchPlayersCollectionSnapshot().then(() => {
                    // console.log('players', players)
                })
            }
        }, [players]
    )

    return (
        <>
            <br/><br/><br/><br/><h1>noob</h1>
        </>
    )
}