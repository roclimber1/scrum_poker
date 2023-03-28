
import { useEffect } from 'react'


import confetti from 'canvas-confetti'




interface UsePoofOfConfettiParameters {
    trigger: boolean
}



function usePoofOfConfetti(parameters: UsePoofOfConfettiParameters): void {

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
