import {Animate} from "react-move";
import {useState} from "react";
import {easePolyOut} from "d3-ease"

export const Test = () => {
    const [show, setShow] = useState(true)
    const [bck, setBck] = useState('#ffffff')
    return (
        <>
            <Animate
                show={show}
                start={{
                    backgroundColor: bck,
                    width: 500,
                    height: 500,
                    opacity: 1
                }}
                enter={{
                    backgroundColor: bck,
                    width: [100],
                    height: [100],
                    opacity: 1,
                    timing: {
                        duration: 1000,
                        delay: 1000,
                        ease:easePolyOut
                    }
                }}
            >{
                ({width, height, opacity, backgroundColor}) => (
                    <div style={{
                        backgroundColor,
                        width,
                        height,
                        opacity
                    }}
                    > hello</div>
                )}
            </Animate>
        </>
    )
}