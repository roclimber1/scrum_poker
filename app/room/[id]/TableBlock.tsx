

import { useSelector } from 'react-redux'

import Player from './Player'




import type { RootState } from '@/redux/store'
import type { PlayerBase } from '@/utils/GameRoom'





function TableBlock() {

    const { roomData } = useSelector((state: RootState) => state.auth)

    const { players, show } = roomData || {}




    const playersBlock = players?.map((player: PlayerBase) => (<Player
        key={`player-${player.id}`}
        player={player}
        show={show as boolean}
    />))



    return (
        <div className="flex flex-row justify-center items-center">

            {<>{playersBlock}</>}
        </div>
    )
}



export default TableBlock
