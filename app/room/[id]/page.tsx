
'use client'



import { useSelector, useDispatch } from 'react-redux'


import { useEffect } from 'react'

import { Message, WebSocketIoClient } from '@/utils/websocketIo_client'



import AverageBlock from './AverageBlock'
import ChatBlock from './ChatBlock'

import DeckBlock from './DeckBlock'
import NameBlock from './NameBlock'

import RoomOwnerBlock from './RoomOwnerBlock'
import TableBlock from './TableBlock'


import { setRoomData } from '@/redux/features/auth'





import type { RootState } from '@/redux/store'
import type { PlayerBase } from '@/utils/interfaces'





const SHOW_CHAT = false





function RoomPage({ params }: any) {

    const { authorized, roomData, userRoom, user } = useSelector((state: RootState) => state.auth)
    const { currentPlayer, show, ignoreHost, hostId } = roomData || {}

    const showOwnerPanel: boolean = ((userRoom?.owner_id == user?.uid) && authorized)
    const showDeckBlock: boolean = !(ignoreHost && (hostId == currentPlayer?.id))



    const dispatch = useDispatch()


    const id: string = params?.id


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

            {showOwnerPanel ? <RoomOwnerBlock
                id={id}
                socketInstance={socketInstance}
            /> : null}


            <NameBlock
                socketInstance={socketInstance}
            />


            {currentPlayer?.name ? <>

                <AverageBlock />


                {showDeckBlock ? <div className={`${show ? 'pointer-events-none' : ''} flex justify-center items-center`}>
                    <DeckBlock
                        socketInstance={socketInstance}
                    />
                </div> : null}


                <TableBlock />


                {SHOW_CHAT ? <ChatBlock /> : null}
            </> : null}

        </div>
    )
}



export default RoomPage
