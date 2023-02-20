'use client'


import React, { useMemo, useState } from 'react'

import { FirebaseAuth } from '@/app/utils/auth'
import { initFirebaseApp } from '@/app/utils/firebase'

import Provider from '@/app/Redux/provider'


import { useSelector, useDispatch } from 'react-redux'
import { setAuthorized } from '@/app/Redux/features/auth'



import type { User } from 'firebase/auth'
import type { FirebaseOptions, FirebaseApp } from 'firebase/app'

import type { ReactNode } from 'react'
import type { RootState } from '@/app/Redux/store'



const firebaseConfig: FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
    databaseURL: process.env.NEXT_PUBLIC_DATABASE_URL
}






interface LayoutProps {
    children: ReactNode
}




export function AuthBlock() {

    // TODO: check whether user is authorized

    const { authorized } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()


    const [user, setUser] = useState<User | null>(null)

    const [error, setError] = useState<string>('')


    const firebaseApp = useMemo<FirebaseApp>(() => {

        console.debug('user', user)

        return initFirebaseApp(firebaseConfig)
    }, [])


    const handleSignInClick = () => {

        const authHandler: FirebaseAuth = FirebaseAuth.getInstance(firebaseApp)

        authHandler.signIn()
            .then(user => {

                console.debug('user', user)

                setUser(user)
                dispatch(setAuthorized(true))

                setError('')
            })
            .catch(error => {

                setUser(null)
                dispatch(setAuthorized(false))

                setError(error)
            })
    }


    const handleSignOutClick = () => {

        const authHandler: FirebaseAuth = FirebaseAuth.getInstance(firebaseApp)

        authHandler.signOut()
            ?.then(() => {

                setUser(null)
                dispatch(setAuthorized(false))

                setError('')
            })
            ?.catch(error => {

                setError(error)
            })
    }


    return (
        <React.Fragment>

            {user && <h2>Hi there, <span className="text-yellow-600">{user?.displayName}</span>!</h2>}

            {!!error && <h2>{`Something went wrong: ${error}`}</h2>}

            {!authorized && <button onClick={handleSignInClick} className="bg-sky-500 hover:bg-sky-700 rounded-md text-base p-3 my-3">Sigh In with Google 🚀</button>}


            {authorized && <button onClick={handleSignOutClick} className="bg-green-900 hover:bg-green-700 rounded-md text-base p-3 my-3">Sigh Out 🦖</button>}
        </React.Fragment>
    )
}


export default function Layout({ children }: LayoutProps) {

    return (
        <section>

            <Provider>
                {children}

                <div className="px-4">
                    <AuthBlock />
                </div>
            </Provider>
        </section>
    )
}
