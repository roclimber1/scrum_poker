
'use client'


import { useSelector } from 'react-redux'

import CopyRoomIdButton from './CopyRoomIdButton'



import usePoofOfConfetti from '@/hooks/usePoofOfConfetti'




import type { BaseProps } from '@/utils/websocketIo_client'
import type { RootState } from '@/redux/store'



interface RoomOwnerBlockProps extends BaseProps {
    id: string
}




function RoomOwnerBlock(props: RoomOwnerBlockProps) {

    const { roomData } = useSelector((state: RootState) => state.auth)

    const { socketInstance, id } = props


    const { show: showResults = false, ready, ignoreHost } = roomData || {}



    usePoofOfConfetti({ trigger: showResults })



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

            <div className="flex flex-row justify-between">

                <div className="sm:p-3 p-1">
                    <button
                        className={`${ready ? '' : 'pointer-events-none'} dark:bg-orange-600 dark:hover:bg-orange-400 bg-orange-400 hover:bg-orange-600 rounded-md sm:text-base text-sm sm:p-3 p-2`}
                        onClick={handleShowResults}
                    >
                        {showResults ? 'Hide results' : 'Show results'}
                    </button>
                </div>


                <div className="sm:p-3 p-1">
                    <button
                        className={`${showResults ? '' : 'pointer-events-none'} dark:bg-slate-900 dark:hover:bg-slate-800 bg-slate-500 hover:bg-slate-600 rounded-md sm:text-base text-sm sm:p-3 p-2`}
                        onClick={handleClearResults}
                    >
                        {'Clear results'}
                    </button>
                </div>


                <div className="sm:p-3 p-1">
                    <button
                        className="dark:bg-lime-800 dark:hover:bg-lime-700 bg-lime-600 hover:bg-lime-700 rounded-md sm:text-base text-sm sm:p-3 p-2"
                        onClick={handleIgnoreFlag}
                    >
                        {'Ignore host'} {ignoreHost ? '💤' : '🖖'}
                    </button>
                </div>

            </div>


            <div className="flex flex-row justify-center items-center">

                {ready ? <div className="sm:p-3 p-1">
                    <div className="sm:p-3 p-2 dark:text-slate-300 text-green-900 font-bold">
                        {'Voting has done'}
                    </div>
                </div> : null}

            </div>

        </>
    )
}



export default RoomOwnerBlock
