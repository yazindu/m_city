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
                >5</div>
            )}
        </Animate>
    )

    const animateFirstText = () => (
        <Animate
            show={true}
            start={{
                opacity:0,
                x:503,
                y:450
            }}
            enter={{
                opacity:[1],
                x:[273],
                y:[450],
                timing: {
                    duration: 500, ease: easePolyOut
                }
            }}
        >

            {({opacity, x, y}) => (
                <div className={'featured_first'}
                style={{
                    opacity,
                    transform:`translate(${x}px,${y}px)`
                }}
                >league</div>
            )}
        </Animate>
    )

    return (
        <div className={'featured_text'}>
            {animateNumber()}
            {animateFirstText()}
        </div>
    )
}