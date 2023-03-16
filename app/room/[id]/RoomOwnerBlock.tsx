
'use client'


import { useSelector } from 'react-redux'

import CopyRoomIdButton from './CopyRoomIdButton'



import type { BaseProps } from '@/utils/websocketIo_client'
import type { RootState } from '@/redux/store'



interface RoomOwnerBlockProps extends BaseProps {
    id: string
}




function RoomOwnerBlock(props: RoomOwnerBlockProps) {

    const { roomData } = useSelector((state: RootState) => state.auth)

    const { socketInstance, id } = props


    const { show: showResults = false } = roomData || {}





    const handleShowResults = () => {

        socketInstance.showHideResults(!showResults)
    }

    const handleClearResults = () => {

        socketInstance.clearResults()
    }



    return (
        <>

            <CopyRoomIdButton id={id} />

            <div className="flex flex-row">

                <div className="p-3">
                    <button
                        className="bg-orange-600 hover:bg-orange-400 rounded-md text-base p-3"
                        onClick={handleShowResults}
                    >
                        {showResults ? 'Hide results' : 'Show results'}
                    </button>
                </div>

                <div className="p-3">
                    <button
                        className="bg-slate-900 hover:bg-slate-800 rounded-md text-base p-3"
                        onClick={handleClearResults}
                    >
                        {'Clear results'}
                    </button>
                </div>

            </div>

        </>
    )
}



export default RoomOwnerBlock
