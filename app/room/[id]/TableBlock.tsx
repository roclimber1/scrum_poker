

import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import Player from './Player'



import type { WebSocketIoClient } from '@/utils/WebSocketIoClient'
import type { RootState } from '@/redux/store'

import type { PlayerBase } from '@/utils/GameRoom'



interface TableBlockProps {
    socketInstance: WebSocketIoClient
}


function TableBlock(props: TableBlockProps) {

    const { roomData } = useSelector((state: RootState) => state.auth)

    const { socketInstance } = props


    const [playersBlock, setPlayersBlock] = useState(null)



    useEffect(() => {

        const { players, show } = roomData || {}


        setPlayersBlock(

            players?.map((player: PlayerBase) => (<Player
                key={`player-${player.id}`}
                player={player}
                show={show}
            />))
        )

    }, [roomData])


    return (
        <div className="flex flex-row justify-center items-center">

            {<>{playersBlock}</>}
        </div>
    )
}



export default TableBlock
