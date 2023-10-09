type PlayerCardProps = {
    number: string
    name: string
    lastName: string
    bck: string
}
export const PlayerCard = ({number, name, lastName, bck}: PlayerCardProps) => {
    return (
        <div className={'player_card_wrapper'}>
            <div
                className={'player_card_thmb'}
                style={{background: `#f2f9ff url(${bck})`}}
            ></div>
            <div className={'player_card_nfo'}>
                <div className={'player_card_number'}>{number}</div>
                <div className={'player_card_name'}>
                    <span>{name}</span>
                    <span>{lastName}</span>
                </div>
            </div>
        </div>
    )
}