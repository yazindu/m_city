import {Enroll} from "./Enroll.tsx";
import {Animation} from "./Animation.tsx";

export const Promotion = () => {
    return (
        <div className={'promotion_wrapper'}>
            <div className={'container'}>
                <Animation/>
                <Enroll/>
            </div>
        </div>
    )
}