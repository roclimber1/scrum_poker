
import { v4 as uuidv4 } from 'uuid'
import { useSelector } from 'react-redux'



import type { RootState } from '@/redux/store'
import type { BaseProps } from '@/utils/websocketIo_client'



const DEFAULT_DECK: Array<number> = [1,2,3,5,8,13]




function DeckBlock(props: BaseProps) {

    const { roomData } = useSelector((state: RootState) => state.auth)


    const { socketInstance } = props
    const { move } = roomData?.currentPlayer || {}


    const handleCardClick = (value: number) => () => {

        socketInstance.makeMove(value)
    }


    return (
        <>
            {DEFAULT_DECK.map(card => (<button
                key={`card-${uuidv4()}`}
                className={`rounded-lg w-12 h-16 p-3 m-3 ${(move == card) ? 'bg-amber-800' : 'bg-amber-400 hover:bg-amber-700'}`}
                onClick={handleCardClick(card)}
            >
                {card}
            </button>))}
        </>
    )
}



export default DeckBlock
