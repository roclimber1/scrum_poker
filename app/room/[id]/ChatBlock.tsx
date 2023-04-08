
import { useRef } from 'react'

import DataInputBlock from '@/components/DataInputBlock'






function ChatBlock() {


    const inputRef = useRef<HTMLInputElement>(null)


    const handleButtonClick = () => {


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
