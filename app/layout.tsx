
import './globals.css'
import { Montserrat } from '@next/font/google'


import type { ReactNode } from 'react'



const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin']
})


interface RootLayoutProps {
    children: ReactNode
}



export default function RootLayout({ children }: RootLayoutProps) {

    return (
        <html lang="en">
            <head />

            <body className={`${montserrat.className} flex flex-col h-screen justify-center`}>

                <nav className="flex justify-center">


                    <ul className="flex-row flex p-2 m-2 gap-3">

                        <li className="hover:text-slate-400">
                            <a href="/">Home</a>
                        </li>

                        <li className="hover:text-slate-400">
                            <a href="/room">Room</a>
                        </li>

                    </ul>
                </nav>


                <div className="flex justify-center h-2/3">
                    {children}
                </div>

            </body>
        </html>
    )
}
