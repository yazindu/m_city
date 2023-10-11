import Otamendi from '../../../resources/images/players/Otamendi.png'
import Sterling from '../../../resources/images/players/Raheem_Sterling.png'
import Kompany from '../../../resources/images/players/Vincent_Kompany.png'
import {Animate} from "react-move";
import {easePolyOut} from "d3-ease";
import {PlayerCard} from "../../utils/PlayerCard.tsx";

let card = [
    {
        bottom: 90,
        left: 300,
        player: Kompany
    },
    {
        bottom: 60,
        left: 200,
        player: Sterling
    },
    {
        bottom: 30,
        left: 100,
        player: Otamendi
    },
    {
        bottom: 0,
        left: 0,
        player: Kompany
    }
]

export const HomeCards = ({show}: { show: boolean }) => {
    const showAnimateCards = () => (
        card.map((card, index) => (
            <Animate
                key={index}
                show={show}
                start={{
                    left: 0,
                    bottom: 0
                }}
                enter={{
                    left: [card.left],
                    bottom: [card.bottom],
                    timing: {delay: 500, duration: 500, ease: easePolyOut}
                }}
            >
                {({left, bottom}) => (
                    <div
                        style={{
                            position: 'absolute',
                            left,
                            bottom
                        }}
                    >
                        <PlayerCard
                            number={'30'}
                            name={'Nicolas'}
                            lastname={'Otamendi'}
                            bck={card.player}
                        />
                    </div>
                )}
            </Animate>
        ))
    )
    return (
        <div>
            {showAnimateCards()}
        </div>
    )
}