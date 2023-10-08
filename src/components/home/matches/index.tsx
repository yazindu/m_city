import {Tag} from "../../utils/tools.tsx";
import {Blocks} from "./Blocks.tsx";

export const Matches = () => {
    return (
        <div className={'home_matches_wrapper'}>
            <div className={'container'}>
                <Tag
                    bck={'#0e1731'}
                    fontSize={'50px'}
                    color={'#ffffff'}
                > Matches
                </Tag>
                <Blocks/>
                <Tag
                    fontSize={'22px'}
                    color={'#0e1731'}
                    link={'/the_team'}
                > Matches
                </Tag>
            </div>
        </div>
    )
}