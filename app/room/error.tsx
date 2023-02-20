'use client'


export default function Error({ error, reset }) {
    return (
        <div>
            This ain't loading up: {error.message} <br />
            <button onClick={() => reset()}>Reset</button>
        </div>
    )
}
