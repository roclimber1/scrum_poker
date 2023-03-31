
import { useSelector } from 'react-redux'



import type { PlayerBase } from '@/utils/interfaces'
import type { RootState } from '@/redux/store'




interface PlayerProps {
    player: PlayerBase
    show: boolean
}

const SMILES_LIST: Array<string> = ['👻','🐺','🐱','🦁','🐯','🦒','🦊','🦝','🐭','🐹','🐰','🐻','🐻‍❄️','🐨','🐼','🐸','🦄','🐲','🦥','🦘','🦙','🐫','🐐','🐪','🦨','🐘','🦣','🐁','🐀','🦔','🐿️','🐇','🦫','🦎','🐊','🐢','🐍','🐉','🦕','🦖','🦦','🦈','🐬','🦭','🐳','🐋','🐟','🐠','🐡','🦐','🦑','🐙','🦞','🦀','🦆','🐓','🦃','🦅','🦜','🦩','🦚','🦉','🦤','🐦','🐧','🐥','🦇','🦋','🐌','🐛','🦟','🪰','🪱','🦗','🐜','🪳','🐝','🪲','🐞','🦂','🕷️','🦠','🎃','🧸','🪅','🗿','☃️','⛄','👾']


function Player(props: PlayerProps) {

    const { roomData } = useSelector((state: RootState) => state.auth)

    const { ignoreHost, hostId, currentPlayer } = roomData || {}

    const { player, show } = props
    const { id, name, move } = player


    const ignoreHostCondition: boolean = Boolean(ignoreHost && (hostId == id))
    const itsMeCondition: boolean = (id == currentPlayer?.id)



    const getRandomEmoji = (): string => {

        const smilesAmount: number = SMILES_LIST.length
        const randomIndex: number = Math.floor(Math.random() * smilesAmount)

        return SMILES_LIST[randomIndex]
    }



    return (
        <div className="flex flex-col justify-center items-center whitespace-normal">

            <div
                className={`${itsMeCondition ? 'sm:w-20 sm:h-20 w-10 h-10' : 'sm:w-16 sm:h-16 w-8 h-8'} rounded-full bg-green-700 flex justify-center items-center sm:m-2 sm:p-2 m-1 p-1 bg-cover`}
                style={{
                    backgroundImage: `url(https://api.dicebear.com/5.x/thumbs/svg?seed=${name})`
                }}
            >
                {/*  */}
            </div>

            <div className="sm:m-2 sm:p-2 m-1 p-1 text-xs">
                {name || getRandomEmoji()} {itsMeCondition ? '(you)' : ''}
            </div>


            {ignoreHostCondition && <div className="rounded-lg bg-stone-800 sm:w-12 sm:h-16 w-10 h-14 flex justify-center items-center">

                <>👑</>
            </div>}


            {!ignoreHostCondition ? <div className="rounded-lg bg-orange-500 sm:w-12 sm:h-16 w-10 h-14 flex justify-center items-center">

                {show ? <>{move}</> : <>{(move) ? '🖤' : ''}</>}
            </div> : null}

        </div>
    )
}



export default Player
