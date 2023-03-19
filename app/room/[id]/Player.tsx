
import { useSelector } from 'react-redux'



import type { PlayerBase } from '@/utils/game_room'
import type { RootState } from '@/redux/store'




interface PlayerProps {
    player: PlayerBase
    show: boolean
}


function Player(props: PlayerProps) {

    const { roomData } = useSelector((state: RootState) => state.auth)

    const { ignoreHost, hostId, currentPlayer } = roomData || {}

    const { player, show } = props
    const { id, name, move } = player


    const ignoreHostCondition: boolean = Boolean(ignoreHost && (hostId == id))
    const itsMeCondition: boolean = (id == currentPlayer?.id)


    return (
        <div className="flex flex-col justify-center items-center">

            <div
                className={`${itsMeCondition ? 'w-20 h-20' : 'w-16 h-16'} rounded-full bg-green-700 flex justify-center items-center m-2 p-2 bg-cover`}
                style={{
                    backgroundImage: `url(https://api.dicebear.com/5.x/thumbs/svg?seed=${name})`
                }}
            >
                {/*  */}
            </div>

            <div className="m-2 p-2 text-xs">
                {name || id} {itsMeCondition ? '(you)' : ''}
            </div>


            {ignoreHostCondition && <div className="rounded-lg bg-stone-800 w-12 h-16 flex justify-center items-center">

                <>👑</>
            </div>}


            {!ignoreHostCondition ? <div className="rounded-lg bg-orange-500 w-12 h-16 flex justify-center items-center">

                {show ? <>{move}</> : <>{(move) ? '🖤' : ''}</>}
            </div> : null}

        </div>
    )
}



export default Player
