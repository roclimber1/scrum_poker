
import './globals.css'
import { Montserrat } from 'next/font/google'


import Provider from '@/redux/provider'

import AuthBlock from '@/components/AuthBlock'



import type { ReactNode } from 'react'



const montserrat = Montserrat({
    weight: ['400', '700'],
    subsets: ['latin']
})


interface RootLayoutProps {
    children: ReactNode
}



export const metadata = {
    title: 'Scrum Pokerooom',
    description: 'This is the amazing Scrum Pokerooom'
}



export default function RootLayout({ children }: RootLayoutProps) {

    return (
        <html lang="en">
            <head />

            <body className={`${montserrat.className} flex flex-col h-screen justify-center`}>

                <Provider>

                    <nav className="flex flex-row justify-center items-center">


                        <ul className="flex-row flex p-2 m-2 gap-3">

                            <li className="hover:text-slate-400">
                                <a href="/">Home</a>
                            </li>

                            <li className="hover:text-slate-400">
                                <a href="/room">Room</a>
                            </li>
                        </ul>

                        <div className="px-4">
                            <AuthBlock />
                        </div>
                    </nav>


                    <div className="flex justify-center h-2/3">

                        {children}

                    </div>

                </Provider>
            </body>
        </html>
    )
}
