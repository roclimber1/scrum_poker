
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
    description: 'This is the amazing Scrum Pokerooom',
    icons: {
        icon: [
            { url: '/favicon.svg', sizes: 'any', type: 'image/svg+xml' },
            { url: '/favicon.png', type: 'image/png' }
        ],
        shortcut: ['/favicon.png'],
        apple: [
            { url: '/favicon.png', type: 'image/png' },
            { url: '/favicon.png', sizes: '192x192', type: 'image/png' }
        ]
    }
}



export default function RootLayout({ children }: RootLayoutProps) {

    return (
        <html lang="en">
            <head />

            <body className={`${montserrat.className} flex flex-col h-screen justify-center`}>

                <Provider>

                    <nav className="flex flex-row justify-center items-center">


                        <ul className="flex-row flex sm:p-2 sm:m-2 sm:gap-3 p-1 m-1 gap-2">

                            <li className="dark:hover:text-slate-400 hover:text-slate-600">
                                <a href="/">Home</a>
                            </li>

                            <li className="dark:hover:text-slate-400 hover:text-slate-600">
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
