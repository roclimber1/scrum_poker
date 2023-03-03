
import { useMemo } from 'react'

import { FireApp } from '@/utils/app'




import type { FirebaseOptions } from 'firebase/app'




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




interface UseFireAppInstanceResults {
    fireApp: FireApp | null
}



export function useFireAppInstance(): UseFireAppInstanceResults {

    const fireApp = useMemo<FireApp | null>(() => {

        return FireApp.getInstance(firebaseConfig)
    }, [])


    return { fireApp }
}
