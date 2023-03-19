
import { useSelector } from 'react-redux'



import type { RootState } from '@/redux/store'





function AverageBlock() {

    const { roomData } = useSelector((state: RootState) => state.auth)

    const { average, show } = roomData || {}



    return (
        <div className="flex flex-col rounded-lg bg-lime-700 justify-center items-center m-3 p-3">

            <div>Average:</div>
            {show ? <div>{average?.toFixed(1)}</div> : <div>👀</div>}
        </div>
    )
}



export default AverageBlock
