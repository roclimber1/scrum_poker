
import { useSelector } from 'react-redux'



import type { RootState } from '@/redux/store'





function AverageBlock() {

    const { roomData } = useSelector((state: RootState) => state.auth)

    const { average, show } = roomData || {}



    return (
        <div className="flex flex-col rounded-lg dark:bg-lime-700 bg-lime-600 justify-center items-center sm:m-3 sm:p-3 m-1 p-1">

            <div className="sm:text-base text-sm">Average:</div>
            {show ? <div>{average?.toFixed(1)}</div> : <div>👀</div>}
        </div>
    )
}



export default AverageBlock
