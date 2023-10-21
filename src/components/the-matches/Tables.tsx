import {
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material/";
import {useEffect, useState} from "react";
import {positionDocumentFields} from "../utils/tools.tsx";
import {fetchCollectionSnapshot} from "../../config/firebase_config.ts";

export const LeagueTable = () => {
    const [positions, setPositions] = useState<positionDocumentFields[]>([])

    useEffect(() => {
        if (positions.length < 1) {
            fetchCollectionSnapshot<positionDocumentFields>('positions').then((positions) => {
                setPositions(positions)
            })
        }
    }, [positions])

    const showTeamPositions = () => (
        positions
            ? positions.map((pos, i) => (
                <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{pos.team}</TableCell>
                    <TableCell>{pos.w}</TableCell>
                    <TableCell>{pos.d}</TableCell>
                    <TableCell>{pos.l}</TableCell>
                    <TableCell>{pos.pts}</TableCell>
                </TableRow>
            ))
            : null)

    
    return (
        <div className={'league_table_wrapper'}>
            <div className={'title'}>
                League Table
            </div>
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Pos</TableCell>
                            <TableCell>Team</TableCell>
                            <TableCell>W</TableCell>
                            <TableCell>L</TableCell>
                            <TableCell>D</TableCell>
                            <TableCell>Pts</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {showTeamPositions()}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}