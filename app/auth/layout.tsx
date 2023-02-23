'use client'


import React, { useMemo, useState } from 'react'

import { FirebaseAuth } from '@/app/utils/auth'
import { initFirebaseApp } from '@/app/utils/firebase'

import Provider from '@/app/Redux/provider'


import { useSelector, useDispatch } from 'react-redux'
import { setAuthorized, setUser } from '@/app/Redux/features/auth'



import type { User } from 'firebase/auth'
import type { FirebaseOptions, FirebaseApp } from 'firebase/app'

import type { ReactNode } from 'react'
import type { RootState } from '@/app/Redux/store'
import Loader from '../Components/Loader'



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

    const { authorized, user } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()


    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


    const authHandler = useMemo<FirebaseAuth>(() => {

        const firebaseApp = initFirebaseApp(firebaseConfig)

        return FirebaseAuth.getInstance(firebaseApp)
    }, [])


    const handleSignInClick = () => {

        authHandler.signIn()
            .then(user => {

                dispatch(setUser(user))
                dispatch(setAuthorized(true))

                setError('')
            })
            .catch(error => {

                dispatch(setUser(null))
                dispatch(setAuthorized(false))

                setError(error)
            })
    }


    const handleSignOutClick = () => {

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


    React.useEffect(() => {

        setLoading(true)

        authHandler && authHandler.setAuthStateWatcher()?.then(
            ({ state, user }) => {

                state && dispatch(setAuthorized(true))
                state && setUser(user)
            })
            .catch(({ state, user }) => {

                //
            })
            .finally(() => {

                setLoading(false)
            })

    }, [])


    return (
        <React.Fragment>

            {user && <h2>Hi there, <span className="text-yellow-600">{user?.displayName}</span>!</h2>}

            {!!error && <h2>{`Something went wrong: ${error}`}</h2>}


            {loading && <Loader />}


            {!loading && <>

                {!authorized && <button onClick={handleSignInClick} className="bg-sky-500 hover:bg-sky-700 rounded-md text-base p-3 my-3">Sigh In with Google 🚀</button>}


                {authorized && <button onClick={handleSignOutClick} className="bg-green-900 hover:bg-green-700 rounded-md text-base p-3 my-3">Sigh Out 🦖</button>}
            </>}
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
