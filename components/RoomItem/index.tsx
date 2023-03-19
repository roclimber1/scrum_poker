
'use client'


import { useDispatch } from 'react-redux'
import { useRouter } from 'next/navigation'

import { Room, Rooms } from '@/utils/rooms'
import { setUserRoom } from '@/redux/features/auth'




import type { MouseEventHandler } from 'react'




interface RoomProps {
    handleRemove: MouseEventHandler<HTMLDivElement>,
    room: Room
}



function RoomItem(props: RoomProps) {

    const { room, handleRemove } = props
    const { name, id } = room

    const dispatch = useDispatch()
    const router = useRouter()


    const handleClickRemove: MouseEventHandler<HTMLDivElement> = (event) => {

        event.stopPropagation()
        event.preventDefault()

        handleRemove(event)
    }


    const handleRoomClick = () => {

        dispatch(setUserRoom(room))

        router.push(Rooms.getRoomLink(id as string))
    }


    return (<>

        <button
            className="bg-yellow-600 hover:bg-yellow-400 rounded-md text-base p-3 my-3 flex flex-row cursor-pointer"
            onClick={handleRoomClick}
        >

            <div className="flex-grow"><h1>{name}</h1></div>

            <div
                title="Remove this room"
                className="hover:bg-yellow-800 rounded-md"
                onClick={handleClickRemove}
            >
                ☠️
            </div>

        </button>
    </>)
}



export default RoomItem
