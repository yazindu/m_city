import {useEffect, useState} from "react";
import {fetchCollectionSnapshot} from "../../../config/firebase_config.ts";
import {Slide} from "react-awesome-reveal";
import {matchDocumentFields} from "../../utils/tools.tsx";
import {MatchesBlock} from "../../utils/MatchesBlock.tsx";

export const Blocks = () => {
    const [matches, setMatches] = useState<matchDocumentFields[]>([])

    useEffect(() => {
            if (matches.length < 1) {
                fetchCollectionSnapshot<matchDocumentFields>('matches').then((matches) => {
                    setMatches(matches)
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