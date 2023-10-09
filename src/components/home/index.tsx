import {Featured} from "./featured";
import {Matches} from "./matches";
import {MeetPlayers} from "./meet-players";
import {Promotion} from "./promotion";

export const Home = () => {
    return (
        <div className={'bck_blue'}>
            <Featured/>
            <Matches/>
            <MeetPlayers/>
            <Promotion/>
        </div>
    )
}