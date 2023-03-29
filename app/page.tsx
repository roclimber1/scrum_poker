'use client'


import Link from 'next/link'

import { Montserrat } from 'next/font/google'


const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin']
})



export default function Home() {


    return (
        <main className={`${montserrat.className} flex flex-col px-4`}>

            <h1>This is Scrum Poker application 🔥</h1>

            <Link href={'/auth'}>

                <button className="dark:bg-sky-900 dark:hover:bg-sky-700 bg-sky-600 hover:bg-sky-800 rounded-md text-base p-3 my-3">
                    {'Let\'s create your poker room 🤍'}
                </button>
            </Link>

            <Link href={'/room'}>

                <button className="rounded-md text-base p-3 my-3 dark:bg-orange-600 dark:hover:bg-orange-400 bg-orange-300 hover:bg-orange-600">
                    Or join to existing room 🐚
                </button>
            </Link>
        </main>
    )
}
