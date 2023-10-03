import {Animate} from "react-move";
import {easePolyOut} from "d3-ease"

export const Text = () => {
    const animateNumber = () => (
        <Animate
            show={true}
            start={{
                opacity: 0,
                rotate: 0
            }}
            enter={{
                opacity: [1],
                rotate: [360],
                timing: {
                    duration: 1000, ease: easePolyOut
                }
            }}
        >
            {({opacity, rotate}) => (
                <div className={'featured_number'}
                     style={{
                         opacity,
                         transform: `translate(260px, 170px) rotateY(${rotate}deg)`
                     }}
                ></div>
            )}
        </Animate>
    )

    return (
        <div className={'featured_text'}>
            {animateNumber()}
        </div>
    )
}