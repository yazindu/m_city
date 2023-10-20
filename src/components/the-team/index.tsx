import {useEffect, useState} from "react";
import {FirestoreError, getDocs} from "firebase/firestore";
import {playersCollection, storage} from "../../config/firebase_config.ts";
import {playerDocumentFields, showToastError} from "../utils/tools.tsx";
import {getDownloadURL, ref} from "firebase/storage";
import {CircularProgress} from "@mui/material";
import {Slide} from "react-awesome-reveal";
import {PlayerCard} from "../utils/PlayerCard.tsx";

export const TheTeam = () => {
    const [loading, setLoading] = useState(true)
    const [players, setPlayers] = useState<playerDocumentFields[]>([])


    useEffect(() => {
            async function fetchPlayersCollectionSnapshot() {
                setLoading(true)
                try {
                    const playersCollectionSnapshot = await getDocs(playersCollection);
                    let players = [] as playerDocumentFields[]
                    if (playersCollectionSnapshot !== null) {
                        playersCollectionSnapshot.forEach(doc => {
                            players.push({id: doc.id, url: '', ...doc.data()} as playerDocumentFields)
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
                            .then(() => {
                                setPlayers(players)
                            })
                            .catch((e) => {
                                console.log('promise catch', e)
                            })
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

    const showPlayerByCategory = (category: string) => (
        players
            ? players.map((player) => {
                return player.position === category
                    ? <Slide direction={'left'} key={player.id} triggerOnce>
                        <div className={'item'}>
                            <PlayerCard number={player.number} name={player.name} lastname={player.lastname}
                                        bck={player.url}/>
                        </div>
                    </Slide>
                    : null
            })
            : null
    )


    return (
        <div className={'the_team_container'}>
            {
                loading
                    ? <div className={'progress'}><CircularProgress/></div>
                    : <div>
                        <div className={'team_category_wrapper'}>
                            <div className={'title'}>Keepers</div>
                            <div className={'team_cards'}>
                                {showPlayerByCategory('Keeper')}
                            </div>
                        </div>
                        <div className={'team_category_wrapper'}>
                            <div className={'title'}>Defence</div>
                            <div className={'team_cards'}>
                                {showPlayerByCategory('Defence')}
                            </div>
                        </div>
                        <div className={'team_category_wrapper'}>
                            <div className={'title'}>Midfield</div>
                            <div className={'team_cards'}>
                                {showPlayerByCategory('Midfield')}
                            </div>
                        </div>
                        <div className={'team_category_wrapper'}>
                            <div className={'title'}>Strikers</div>
                            <div className={'team_cards'}>
                                {showPlayerByCategory('Striker')}
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}