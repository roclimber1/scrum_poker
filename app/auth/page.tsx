
'use client'


import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import Link from 'next/link'

import { useRouter } from 'next/navigation'


import { FireStore } from '@/app/utils/firestore'
import { Room, Rooms } from '@/app/utils/rooms'


import { useFireAppInstance } from '@/app/Hooks/useFireAppInstance'


import Loader from '@/app/Components/Loader'




import type { RootState } from '@/app/Redux/store'
import type { DocumentData } from 'firebase/firestore'



/**
 * Returns link to the room
 * @param id - room's id
 * @returns
 */
function getRoomLink(id: string): string {

    return `/room/${id}`
}



interface RoomProps {
    room: Room
}



export function RoomItem(props: RoomProps) {

    const { room } = props
    const { name, id } = room


    return (<Link href={getRoomLink(id as string)}>

        <div className="bg-yellow-600 hover:bg-yellow-400 rounded-md text-base p-3 my-3">

            <h1>{name}</h1>

        </div>
    </Link>)
}






export function CreateRoomBlock() {

    const { user } = useSelector((state: RootState) => state.auth)


    const { fireApp } = useFireAppInstance()
    const roomNameRef = useRef<HTMLInputElement>(null)


    const [error, setError] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false)

    const [rooms, setRooms] = useState<Array<DocumentData>>([])


    const router = useRouter()


    const roomsHelper = useMemo<Rooms | null>(() => {

        const fireStoreInstance = fireApp?.app ? FireStore.getInstance(fireApp?.app) : null

        const roomsHelper = fireStoreInstance?.firestore ? new Rooms(fireStoreInstance?.firestore) : null

        return roomsHelper
    } ,[])



    const handleCreateRoomClick = () => {

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

                        router.push(getRoomLink(docId))
                    } else {

                        setError('Something went wrong. Your room hadn\'t been created')
                    }
                })
                .finally(() => setLoading(false))
        }
    }



    useEffect(() => {

        if (user) {

            const { uid: userId } = user

            setLoading(true)

            roomsHelper && roomsHelper.getRoomsByUserId(userId as string)
                .then((rooms) => {

                    setRooms(rooms)
                })
                .finally(() => setLoading(false))
        }

    }, [])




    return (<>

        {error ? <div className="text-red-400 pt-3">{error}</div> : null}

        {loading ? <Loader /> : null}


        {!loading ? (<>

            {!rooms?.length ? (<>

                <h1>Here you could create your poker room ➕</h1>

                <div className="text-gray-500 pt-3">Enter your poker room name:</div>


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
            </>) : null}


            {rooms?.length ? (<>

                <h1>You could use a room that was created earlier:</h1>

                {rooms.map((room: DocumentData) => {

                    return <RoomItem key={room?.id} room={room as Room} />
                })}
            </>) : null}

        </>) : null}

    </>)
}




export default function Home() {

    const { authorized } = useSelector((state: RootState) => state.auth)


    return (
        <main className="px-4">

            {!authorized && <h2>To continue you need to sign in 🚪</h2>}

            {authorized ? <CreateRoomBlock /> : null}
        </main>
    )
}
