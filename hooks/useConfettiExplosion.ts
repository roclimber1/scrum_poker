
import { useEffect } from 'react'


import confetti from 'canvas-confetti'




import type { UseConfettiParameters } from './interfaces'



const AMOUNT = 7
const INTERVAL = 700


type ExplodeParameters = {
    interval: number,
    repeatTimes: number
}


const DEFAULT_PARAMETERS: ExplodeParameters = {
    repeatTimes: AMOUNT,
    interval: INTERVAL
}


function explode(parameters: ExplodeParameters = DEFAULT_PARAMETERS): void {

    const { repeatTimes, interval } = parameters

    let counter = 1


    const handler = setInterval(() => {

        if (counter >= repeatTimes) {

            clearInterval(handler)
        }

        confetti({
            particleCount: 73,
            angle: 60,
            spread: 55,
            origin: { x: 0 }
        })

        confetti({
            particleCount: 73,
            angle: 120,
            spread: 55,
            origin: { x: 1 }
        })

        counter++
    }, interval)
}



function useConfettiExplosion(parameters: UseConfettiParameters): void {

    const { trigger } = parameters


    useEffect(() => {

        trigger && explode()

    }, [trigger])
}



export default useConfettiExplosion
