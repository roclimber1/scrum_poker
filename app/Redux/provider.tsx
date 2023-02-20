'use client'

import { store } from '@/app/Redux/store'
import { Provider as BaseProvider } from 'react-redux'


import type { ReactNode } from 'react'


interface ProviderProps {
    children: ReactNode
}


function Provider(props: ProviderProps): JSX.Element {

    const { children } = props


    return (
        <BaseProvider store={store}>
            {children}
        </BaseProvider>
    )
}

export default Provider
