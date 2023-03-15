
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import DataInputBlock from '@/components/DataInputBlock'



import type { Message, WebSocketIoClient } from '@/utils/WebSocketIoClient'
import type { RootState } from '@/redux/store'




interface ChatBlockProps {
    socketInstance: WebSocketIoClient
}




function ChatBlock(props: ChatBlockProps) {

    const { socketInstance } = props
    const { roomData } = useSelector((state: RootState) => state.auth)



    const inputRef = useRef<HTMLInputElement>(null)

    const [messages, setMessages] = useState<Array<Message>>([])



    const handleButtonClick = () => {

        console.debug('Message -> handleButtonClick')

        const { value } = inputRef?.current || {}


        if (!value) {

            console.error('You should enter your message')

        } else {

            //
        }
    }



    return (<div className="fex flex-col">

        <div className="fex flex-col h-16 overflow-auto">

            {/*  */}
        </div>

        <DataInputBlock
            buttonTitle={'Send a message 📫'}
            handleButtonClick={handleButtonClick}
            header={''}
            ref={inputRef}
            title={'Enter your message:'}
        />
    </div>)
}



export default ChatBlock
