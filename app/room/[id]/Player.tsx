
import type { PlayerBase } from '@/utils/game_room'



interface PlayerProps {
    player: PlayerBase
    show: boolean
}


function Player(props: PlayerProps) {

    const { player, show } = props
    const { id, name, move } = player


    return (
        <div className="flex flex-col justify-center items-center">

            <div className="rounded-full bg-green-700 w-16 h-16 flex justify-center items-center m-2 p-2">
                {/*  */}
            </div>

            <div className="m-2 p-2 text-xs">
                {name || id}
            </div>

            <div className="rounded-lg bg-orange-500 w-12 h-16 flex justify-center items-center">
                {show ? <>{move}</> : null}
            </div>
        </div>
    )
}



export default Player
