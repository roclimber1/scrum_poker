
'use client'



import { useSelector, useDispatch } from 'react-redux'


import { useEffect, useMemo, useState } from 'react'

import { RoomData, WebSocketIoClient } from '@/utils/WebSocketIoClient'

import ChatBlock from './ChatBlock'
import TableBlock from './TableBlock'

import RoomOwnerBlock from './RoomOwnerBlock'
import NameBlock from './NameBlock'

import { setRoomData } from '@/redux/features/auth'




import type { RootState } from '@/redux/store'







function RoomPage({ params }: any) {

    const { authorized, roomData } = useSelector((state: RootState) => state.auth)
    const { currentPlayer } = roomData || {}

    const dispatch = useDispatch()


    const id = params?.id


    const socketInstance = WebSocketIoClient.getInstance({
        callback: (data) => {

            console.debug('data', data)

            const { messages, players, currentPlayer } = data

            const newData = {
                ...data,
                messages: messages.map(item => {
                    return { ...item }
                }),
                players: players.map(item => {
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


            {currentPlayer?.name ? <>
                <TableBlock
                    socketInstance={socketInstance}
                />


                <ChatBlock
                    socketInstance={socketInstance}
                />
            </> : null}

        </div>
    )
}



export default RoomPage
