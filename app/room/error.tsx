'use client'


interface ErrorProps {
    error: { message: string },
    reset: () => void
}


export default function Error({ error, reset }: ErrorProps) {
    return (
        <div>
            {'This ain\'t loading up:'} {error.message} <br />
            <button onClick={() => reset()}>Reset</button>
        </div>
    )
}
