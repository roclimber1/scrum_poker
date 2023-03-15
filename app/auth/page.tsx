
'use client'


import { useSelector } from 'react-redux'

import CreateRoomBlock from '@/components/CreateRoomBlock'



import type { RootState } from '@/redux/store'




export default function Home() {

    const { authorized } = useSelector((state: RootState) => state.auth)


    return (
        <main className="px-4">

            {!authorized && <h2>To continue you need to sign in 🚪</h2>}

            {authorized ? <CreateRoomBlock /> : null}
        </main>
    )
}
