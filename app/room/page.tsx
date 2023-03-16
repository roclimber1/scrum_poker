
'use client'



import DataInputBlock from '@/components/DataInputBlock'
import { useRouter } from 'next/navigation'

import { Rooms } from '@/utils/rooms'



import { MouseEventHandler, useRef } from 'react'




export default function Room() {

    const inputRef = useRef<HTMLInputElement>(null)

    const router = useRouter()


    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = () => {

        console.debug('Room -> handleButtonClick')

        const { value } = inputRef?.current || {}


        if (!value) {

            console.error('You should enter room\'s ID')

        } else {

            router.push(Rooms.getRoomLink(value))
        }
    }


    return (
        <div>
            <h1 className="text-lg py-2 m-4">Room page 🍄</h1>

            <DataInputBlock
                buttonTitle={'Visit the room 🗝️'}
                handleButtonClick={handleButtonClick}
                header={''}
                ref={inputRef}
                title={'Enter a known room ID or use the room\'s owner\'s shared link:'}
            />
        </div>
    )
}
