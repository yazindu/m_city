type PlayerCardProps = {
    number: string
    name: string
    lastname: string
    bck: string
}
export const PlayerCard = ({number, name, lastname, bck}: PlayerCardProps) => {
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
                    <span>{lastname}</span>
                </div>
            </div>
        </div>
    )
}