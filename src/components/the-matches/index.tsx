import {useEffect, useState} from "react";
import {matchDocumentFields} from "../utils/tools.tsx";
import {fetchCollectionSnapshot} from "../../config/firebase_config.ts";
import {CircularProgress} from "@mui/material";
import {LeagueTable} from "./Tables.tsx";

export const TheMatches = () => {
    const [matches, setMatches] = useState<matchDocumentFields[]>([])

    useEffect(() => {
            if (matches.length < 1) {
                fetchCollectionSnapshot<matchDocumentFields>('matches').then((matches) => {
                    setMatches(matches)
                })
            }
        }, [matches]
    )

    return (
        <>
            {matches
                ? <div className={'the_matches_container'}>
                    <div className={'the_matches_wrapper'}>
                        <div className={'left'}>
                            list
                        </div>
                        <div className={'right'}>
                            <LeagueTable/>
                        </div>
                    </div>
                </div>
                : <div className={'progress'}>
                    <CircularProgress/>
                </div>}
        </>
    )
}