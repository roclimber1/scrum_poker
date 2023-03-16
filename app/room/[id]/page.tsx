
'use client'



import { useSelector, useDispatch } from 'react-redux'


import { useEffect } from 'react'

import { Message, WebSocketIoClient } from '@/utils/WebSocketIoClient'


import ChatBlock from './ChatBlock'
import DeckBlock from './DeckBlock'
import NameBlock from './NameBlock'

import RoomOwnerBlock from './RoomOwnerBlock'
import TableBlock from './TableBlock'


import { setRoomData } from '@/redux/features/auth'




import type { RootState } from '@/redux/store'
import { PlayerBase } from '@/utils/GameRoom'



const SHOW_CHAT = false





function RoomPage({ params }: any) {

    const { authorized, roomData } = useSelector((state: RootState) => state.auth)
    const { currentPlayer, average } = roomData || {}

    const dispatch = useDispatch()


    const id = params?.id


    const socketInstance = WebSocketIoClient.getInstance({
        callback: (data) => {


            const { messages, players, currentPlayer } = data

            const newData = {
                ...data,
                messages: messages.map((item: Message) => {
                    return { ...item }
                }),
                players: players.map((item: PlayerBase) => {
                    return { ...item }
                }),
                currentPlayer: { ...currentPlayer }
            }

            dispatch(setRoomData(newData))
        },
        roomId: id
    })




    useEffect(() => {

        console.debug(' >> roomData', roomData)

    }, [roomData])



    return (
        <div className="fex flex-col">

            {authorized ? <RoomOwnerBlock
                id={id}
                socketInstance={socketInstance}
            /> : null}


            <NameBlock
                socketInstance={socketInstance}
            />


            <div className="flex flex-col rounded-lg bg-lime-700 justify-center items-center m-3 p-3">
                <div>Average:</div>
                <div>{average}</div>
            </div>


            {currentPlayer?.name ? <>

                <DeckBlock
                    socketInstance={socketInstance}
                />


                <TableBlock />


                {SHOW_CHAT ? <ChatBlock /> : null}
            </> : null}

        </div>
    )
}



export default RoomPage
