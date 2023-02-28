
'use client'



import DataInputBlock from '@/app/Components/DataInputBlock'



import { MouseEventHandler, useRef } from 'react'




export default function Room() {

    const inputRef = useRef<HTMLInputElement>(null)


    const handleButtonClick: MouseEventHandler<HTMLButtonElement> = (event) => {

        console.debug('Room -> handleButtonClick')

        const { value } = inputRef?.current || {}


        if (!value) {

            console.error('You should enter room\'s ID')
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
