'use client'


import Link from 'next/link'



export default function Home() {


    return (
        <main className="px-4">
            <h1>This is Scrum Poker application 🔥</h1>

            <Link href={'/auth'}>
                <button className="bg-sky-900 hover:bg-sky-700 rounded-md text-base p-3 my-3">
                    Let's create your poker room 🤍
                </button>
            </Link>
        </main>
    )
}
