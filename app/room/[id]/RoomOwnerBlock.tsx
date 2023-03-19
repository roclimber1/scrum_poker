
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


    const { show: showResults = false, ready, ignoreHost } = roomData || {}





    const handleShowResults = () => {

        socketInstance.showHideResults(!showResults)
    }

    const handleClearResults = () => {

        socketInstance.clearResults()
    }

    const handleIgnoreFlag = () => {

        socketInstance.setIgnoreHostFlag(!ignoreHost)
    }



    return (
        <>

            <CopyRoomIdButton id={id} />

            <div className="flex flex-row">

                <div className="p-3">
                    <button
                        className={`${ready ? '' : 'pointer-events-none'} bg-orange-600 hover:bg-orange-400 rounded-md text-base p-3`}
                        onClick={handleShowResults}
                    >
                        {showResults ? 'Hide results' : 'Show results'}
                    </button>
                </div>


                <div className="p-3">
                    <button
                        className={`${showResults ? '' : 'pointer-events-none'} bg-slate-900 hover:bg-slate-800 rounded-md text-base p-3`}
                        onClick={handleClearResults}
                    >
                        {'Clear results'}
                    </button>
                </div>


                {ready ? <div className="p-3">
                    <div className="p-3">
                        {'Voting has done'}
                    </div>
                </div> : null}


                <div className="p-3">
                    <button
                        className="bg-lime-800 hover:bg-lime-700 rounded-md text-base p-3"
                        onClick={handleIgnoreFlag}
                    >
                        {'Ignore host'} {ignoreHost ? '💤' : '🖖'}
                    </button>
                </div>

            </div>

        </>
    )
}



export default RoomOwnerBlock
