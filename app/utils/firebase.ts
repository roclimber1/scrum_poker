

import { initializeApp } from 'firebase/app'

import type { FirebaseOptions } from 'firebase/app'



export const initFirebaseApp = (firebaseConfig: FirebaseOptions) => {

    return initializeApp(firebaseConfig)
}
