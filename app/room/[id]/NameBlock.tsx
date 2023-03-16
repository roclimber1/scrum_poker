

import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'

import DataInputBlock from '@/components/DataInputBlock'




import type { BaseProps } from '@/utils/websocketIo_client'
import type { RootState } from '@/redux/store'






function NameBlock(props: BaseProps) {

    const { roomData, user } = useSelector((state: RootState) => state.auth)

    const inputRef = useRef<HTMLInputElement>(null)

    const { socketInstance } = props
    const { currentPlayer } = roomData || {}


    const handleButtonClick = () => {


        const { value } = inputRef?.current || {}


        if (!value) {

            console.error('You should enter your name')

        } else {

            socketInstance.setName(value)
        }
    }


    useEffect(() => {

        if (user?.displayName) {

            socketInstance.setName(user?.displayName)
        }
    }, [user, socketInstance])


    return (
        <>
            {!currentPlayer?.name ? (<DataInputBlock
                buttonTitle={'Set name ✔️'}
                handleButtonClick={handleButtonClick}
                header={''}
                ref={inputRef}
                title={'Set your name:'}
            />) : null}
        </>
    )
}



export default NameBlock
