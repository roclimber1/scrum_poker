'use client'

import usePoofOfConfetti from '@/hooks/usePoofOfConfetti'


interface ErrorProps {
    error: { message: string },
    reset: () => void
}


export default function Error({ error, reset }: ErrorProps) {


    usePoofOfConfetti({ trigger: Boolean(error.message) })


    return (
        <div>
            {'This ain\'t loading up:'} {error.message} <br />
            <button onClick={() => reset()}>Reset</button>
        </div>
    )
}
