'use client'


import React, { useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FirebaseAuth } from '@/utils/auth'


import Provider from '@/redux/provider'
import { setAuthorized, setUser } from '@/redux/features/auth'

import { useFireAppInstance } from '@/hooks/useFireAppInstance'

import Loader from '@/components/Loader'


import { ScrumPokerUser } from '@/utils/user'




import type { ReactNode } from 'react'
import type { RootState } from '@/redux/store'








interface LayoutProps {
    children: ReactNode
}




export function AuthBlock() {

    const { authorized, user } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()


    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


    const { fireApp } = useFireAppInstance()

    const authHandler = useMemo<FirebaseAuth | null>(() => {

        return fireApp?.app ? FirebaseAuth.getInstance(fireApp.app) : null
    }, [])


    const handleSignInClick = () => {

        authHandler && authHandler.signIn()
            .then(user => {

                const newUser = new ScrumPokerUser(user)

                dispatch(setUser(newUser.serialize()))
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

        authHandler && authHandler.signOut()
            ?.then(() => {

                dispatch(setUser(null))
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

                const newUser = new ScrumPokerUser(user)

                state && dispatch(setAuthorized(true))
                state && dispatch(setUser(newUser.serialize()))
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

                <div className="px-4">
                    <AuthBlock />
                </div>

                {children}

            </Provider>
        </section>
    )
}
