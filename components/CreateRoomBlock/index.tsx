
'use client'


import { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'


import { useRouter } from 'next/navigation'


import { FireStore } from '@/utils/firestore'
import { Room, Rooms } from '@/utils/rooms'


import { useFireAppInstance } from '@/hooks/useFireAppInstance'


import Loader from '@/components/Loader'
import DataInputBlock from '@/components/DataInputBlock'

import RoomItem from '@/components/RoomItem'




import type { RootState } from '@/redux/store'
import type { DocumentData } from 'firebase/firestore'






function CreateRoomBlock() {

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

    } ,[fireApp?.app])



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

                        router.push(Rooms.getRoomLink(docId))
                    } else {

                        setError('Something went wrong. Your room hadn\'t been created')
                    }
                })
                .finally(() => setLoading(false))
        }
    }


    const handleRemove = (id: string) => () => {

        setError('')
        setLoading(true)

        roomsHelper && roomsHelper.deleteDocumentById(id)
            .then(
                () => {
                    setRooms((previous: Array<DocumentData>) => {

                        return previous.filter(item => item?.id != id)
                    })
                }
            )
            .catch(
                (error) => {

                    setError(error)
                }
            )
            .finally(() => setLoading(false))
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

    }, [roomsHelper, user])




    return (<Fragment>

        {error ? <div className="text-red-400 pt-3">{error}</div> : null}

        {loading ? <Loader /> : null}


        {!loading ? (<Fragment>

            {!rooms?.length ? (<DataInputBlock
                buttonTitle={'Create 🥑'}
                handleButtonClick={handleCreateRoomClick}
                header={'Here you could create your poker room ➕'}
                ref={roomNameRef}
                title={'Enter your poker room name:'}
            />) : null}


            {rooms?.length ? (<Fragment>

                <h1>You could use a room that was created earlier:</h1>

                {rooms.map((room: DocumentData) => {

                    const { id: roomId } = room || {}

                    return <RoomItem
                        key={roomId}
                        room={room as Room}
                        handleRemove={handleRemove(roomId)}
                    />
                })}
            </Fragment>) : null}

        </Fragment>) : null}

    </Fragment>)
}





export default CreateRoomBlock
