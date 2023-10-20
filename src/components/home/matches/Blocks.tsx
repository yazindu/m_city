import {useEffect, useState} from "react";
import {matchesCollection} from "../../../config/firebase_config.ts";
import {getDocs} from "firebase/firestore";
import {Slide} from "react-awesome-reveal";
import {matchDocumentFields} from "../../utils/tools.tsx";
import {MatchesBlock} from "../../utils/MatchesBlock.tsx";

export const Blocks = () => {
    const [matches, setMatches] = useState<matchDocumentFields[]>([])

    useEffect(() => {
            async function fetchMatchesCollectionSnapshot() {
                try {
                    const matchesCollectionSnapshot = await getDocs(matchesCollection);
                    if (matchesCollectionSnapshot !== null) {
                        matchesCollectionSnapshot.forEach(doc => {
                            setMatches(matches => [...matches, {id: doc.id, ...doc.data()} as matchDocumentFields])
                        })
                    }
                } catch (error) {
                    console.error(error);
                }
            }

            if (matches.length < 1) {
                fetchMatchesCollectionSnapshot().then(() => {
                    console.log('matches', matches)
                })
            }
        }, [matches]
    )

    const showMatches = () => (
        matches
            ? matches.map((match) => (
                <Slide direction={"down"} key={match.id} className={'item'} triggerOnce>
                    <div>
                        <div className={'wrapper'}>
                            <MatchesBlock match={match}></MatchesBlock>
                        </div>
                    </div>
                </Slide>
            ))
            : null
    )

    return (
        <div className={'home_matches'}>
            {showMatches()}
        </div>
    )
}