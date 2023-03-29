
'use client'


import { useEffect, useMemo, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { FirebaseAuth } from '@/utils/firebase_auth'



import { setAuthorized, setUser } from '@/redux/features/auth'

import { useFireAppInstance } from '@/hooks/useFireAppInstance'

import Loader from '@/components/Loader'


import { ScrumPokerUser } from '@/utils/scrum_poker_user'





import type { RootState } from '@/redux/store'





function AuthBlock() {

    const { authorized, user } = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()


    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


    const { fireApp } = useFireAppInstance()


    const authHandler = useMemo<FirebaseAuth | null>(() => {

        return fireApp?.app ? FirebaseAuth.getInstance(fireApp.app) : null

    }, [fireApp?.app])



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

                console.debug(error)

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

                console.debug(error)

                setError(error)
            })
    }


    useEffect(() => {

        setLoading(true)

        authHandler && authHandler.setAuthStateWatcher()?.then(
            ({ state, user }) => {

                const newUser = new ScrumPokerUser(user)

                state && dispatch(setAuthorized(true))
                state && dispatch(setUser(newUser.serialize()))
            })
            .catch(() => {

                //
            })
            .finally(() => {

                setLoading(false)
            })

    }, [])


    return (
        <div className="flex flex-row items-center">

            {user && <h2 className="sm:m-2 sm:p-2 m-1 p-1">Hi there, <span className="text-yellow-600">{user?.displayName}</span>!</h2>}

            {!!error && <h2>{`Something went wrong: ${error}`}</h2>}


            {loading && <Loader />}


            {!loading && <>

                {!authorized && <button onClick={handleSignInClick} className="bg-sky-500 hover:bg-sky-700 rounded-md sm:text-base text-sm sm:p-3 sm:my-3 p-2 my-1">Sigh In with Google 🚀</button>}


                {authorized && <button onClick={handleSignOutClick} className="bg-green-900 hover:bg-green-700 rounded-md sm:text-base text-sm sm:p-3 sm:my-3 p-2 my-1">Sigh Out 🦖</button>}
            </>}
        </div>
    )
}



export default AuthBlock
