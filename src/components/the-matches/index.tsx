import {useEffect, useReducer, useState} from "react";
import {matchDocumentFields} from "../utils/tools.tsx";
import {fetchCollectionSnapshot} from "../../config/firebase_config.ts";
import {CircularProgress} from "@mui/material";
import {LeagueTable} from "./Tables.tsx";

export const TheMatches = () => {
    const [matches, setMatches] = useState<matchDocumentFields[]>([])
    const [state, dispatch] = useReducer((prevState, nextState) => {
        return {...prevState, ...nextState}
    }, {
        filterMatches: null,
        playedFilter: 'All',
        resultFilter: 'All'
    })

    useEffect(() => {
            if (matches.length < 1) {
                fetchCollectionSnapshot<matchDocumentFields>('matches').then((matches) => {
                    setMatches(matches)
                    dispatch({...state, filterMatches: matches})
                })
            }
        }, [matches, state]
    )

    const showPlayed = (played: 'Yes' | 'No' | 'All') => {
        //all, yes, no
        const list = matches.filter((match) => {
            return match.final === played
        })

        dispatch({
            ...state,
            filterMatches: played === "All" ? matches : list,
            playedFilter: played,
            resultFilter: 'All'
        })
    }
    console.log(state.filterMatches)

    const showResult = (result: 'W' | 'L' | 'D' | 'All') => {
        const list = matches.filter((match) => {
            return match.result === result
        })
        dispatch({
            ...state,
            filterMatches: result === "All" ? matches : list,
            playedFilter: 'All',
            resultFilter: result
        })

    }

    return (
        <>
            {matches
                ? <div className={'the_matches_container'}>
                    <div className={'the_matches_wrapper'}>
                        <div className={'left'}>
                            <div className={'match_filters'}>
                                <div className={'match_filters_box'}>
                                    <div className={'tag'}>
                                        Show Matches
                                    </div>
                                    <div className={'cont'}>
                                        <div
                                            className={`option ${state.playedFilter === 'All' ? 'active' : ''}`}
                                            onClick={() => showPlayed("All")}
                                        > All
                                        </div>
                                        <div
                                            className={`option ${state.playedFilter === 'Yes' ? 'active' : ''}`}
                                            onClick={() => showPlayed("Yes")}
                                        > Played
                                        </div>
                                        <div
                                            className={`option ${state.playedFilter === 'No' ? 'active' : ''}`}
                                            onClick={() => showPlayed("No")}
                                        > Not Played
                                        </div>
                                    </div>
                                </div>
                                <div className={'match_filters_box'}>
                                    <div className={'tag'}>
                                        Result games
                                    </div>
                                    <div className={'cont'}>
                                        <div
                                            className={`option ${state.resultFilter === 'All' ? 'active' : ''}`}
                                            onClick={() => showResult('All')}
                                        > All
                                        </div>
                                        <div
                                            className={`option ${state.resultFilter === 'W' ? 'active' : ''}`}
                                            onClick={() => showResult('W')}
                                        > W
                                        </div>
                                        <div
                                            className={`option ${state.resultFilter === 'L' ? 'active' : ''}`}
                                            onClick={() => showResult('L')}
                                        >L
                                        </div>
                                        <div
                                            className={`option ${state.resultFilter === 'D' ? 'active' : ''}`}
                                            onClick={() => showResult('D')}
                                        >D
                                        </div>
                                    </div>
                                </div>
                            </div>
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