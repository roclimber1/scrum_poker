
import { useEffect } from 'react'


import confetti from 'canvas-confetti'




import type { UseConfettiParameters } from './interfaces'






function usePoofOfConfetti(parameters: UseConfettiParameters): void {

    const { trigger } = parameters


    useEffect(() => {

        if (trigger) {

            confetti({
                particleCount: 100,
                startVelocity: 30,
                spread: 360,
                origin: {
                    x: Math.random(),
                    y: Math.random() - 0.2
                }
            })
        }

    }, [trigger])
}



export default usePoofOfConfetti
