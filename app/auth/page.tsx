
'use client'


import { useSelector, useDispatch } from 'react-redux'
import { setAuthorized } from '@/app/Redux/features/auth'



import type { RootState } from '@/app/Redux/store'




export function CreateRoomBlock() {

    return <>
        <div className="text-gray-500 pt-3">Enter your poker room name:</div>
        <div className="flex flex-row gap-3">
            <input
                className="bg-sky-900 hover:bg-sky-700 rounded-md text-base p-3 my-3"
                type="text"
            />

            <button className="bg-orange-600 hover:bg-orange-400 rounded-md text-base p-3 my-3">
                Create 🥑
            </button>
        </div>
    </>
}




export default function Home() {

    const { authorized } = useSelector((state: RootState) => state.auth)


    return (
        <main className="px-4">

            <h1>Here you could create your poker room ➕</h1>

            {!authorized && <h2>To continue you need to sign in 🚪</h2>}

            {authorized && <CreateRoomBlock />}
        </main>
    )
}
