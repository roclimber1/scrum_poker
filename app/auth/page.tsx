
'use client'


import { useCallback, useMemo, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { useRouter } from 'next/navigation'


import { FireStore } from '@/app/utils/firestore'
import { Rooms } from '@/app/utils/rooms'


import { useFireAppInstance } from '@/app/Hooks/useFireAppInstance'


import Loader from '@/app/Components/Loader'




import type { RootState } from '@/app/Redux/store'
import type { ScrumPokerUser } from '@/app/utils/user'




interface CreateRoomBlockProps {
    user: ScrumPokerUser | null
}


export function CreateRoomBlock(props: CreateRoomBlockProps) {

    const { user } = props


    const { fireApp } = useFireAppInstance()
    const roomNameRef = useRef<HTMLInputElement>(null)


    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)


    const router = useRouter()


    const roomsHelper = useMemo<Rooms | null>(() => {

        const fireStoreInstance = fireApp?.app ? FireStore.getInstance(fireApp?.app) : null

        return fireStoreInstance?.firestore ? new Rooms(fireStoreInstance?.firestore) : null
    } ,[])



    const handleCreateRoomClick = useCallback(() => {

        const { value } = roomNameRef.current || {}

        if (!value) {

            setError('Please, enter the name for your room')
        } else {

            setError('')
            setLoading(true)

            roomsHelper && roomsHelper.createNewRoom({
                name: value
            }, user)
                .then((docId) => {

                    if (docId) {

                        router.push(`/room/${docId}`)
                    } else {

                        setError('Something went wrong. Your room hadn\'t been created')
                    }
                })
                .finally(() => setLoading(false))
        }
    }, [user])



    return <>
        <div className="text-gray-500 pt-3">Enter your poker room name:</div>

        {Boolean(error) && <div className="text-red-400 pt-3">{error}</div>}

        {loading && <Loader />}

        <div className="flex flex-row gap-3">
            <input
                className="bg-sky-900 hover:bg-sky-700 rounded-md text-base p-3 my-3"
                type="text"
                ref={roomNameRef}
            />

            <button
                className="bg-orange-600 hover:bg-orange-400 rounded-md text-base p-3 my-3"
                onClick={handleCreateRoomClick}
            >
                Create 🥑
            </button>
        </div>
    </>
}




export default function Home() {

    const { authorized, user } = useSelector((state: RootState) => state.auth)


    return (
        <main className="px-4">

            <h1>Here you could create your poker room ➕</h1>

            {!authorized && <h2>To continue you need to sign in 🚪</h2>}

            {authorized && <CreateRoomBlock user={user} />}
        </main>
    )
}
