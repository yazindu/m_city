import {Featured} from "./featured";
import {Matches} from "./matches";

export const Home = () => {
    return (
        <div className={'bck_blue'}>
            <Featured/>
            <Matches/>
        </div>
    )
}