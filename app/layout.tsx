
import './globals.css'
import { Montserrat } from '@next/font/google'


import type { ReactNode } from 'react'



const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin']
})


export default function RootLayout({
    children
}: {
    children: ReactNode
}) {
    return (
        <html lang="en">
            <head />

            <body className={`${montserrat.className}`}>

                <nav>
                    <ul className="flex-row flex p-2 m-2 gap-3">
                        <li className="hover:text-slate-400">
                            <a href="/">Home</a>
                        </li>
                        <li className="hover:text-slate-400">
                            <a href="/room">Room</a>
                        </li>
                        <li className="hover:text-slate-400">
                            <a href="/notes">Notes</a>
                        </li>
                    </ul>
                </nav>

                <>
                    {children}
                </>

            </body>
        </html>
    )
}
