
'use client'


import Link from 'next/link'

import { Room, Rooms } from '@/utils/roo_ms'




import type { MouseEventHandler } from 'react'




interface RoomProps {
    handleRemove: MouseEventHandler<HTMLDivElement>,
    room: Room
}



function RoomItem(props: RoomProps) {

    const { room, handleRemove } = props
    const { name, id } = room


    const handleClickRemove: MouseEventHandler<HTMLDivElement> = (event) => {

        event.stopPropagation()
        event.preventDefault()

        handleRemove(event)
    }


    return (<Link href={Rooms.getRoomLink(id as string)}>

        <div className="bg-yellow-600 hover:bg-yellow-400 rounded-md text-base p-3 my-3 flex flex-row">

            <div className="flex-grow"><h1>{name}</h1></div>

            <div
                title="Remove this room"
                className="hover:bg-yellow-800 rounded-md"
                onClick={handleClickRemove}
            >
                ☠️
            </div>

        </div>
    </Link>)
}



export default RoomItem
