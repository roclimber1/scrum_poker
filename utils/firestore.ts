

import { getFirestore } from 'firebase/firestore'




import type { FirebaseApp } from 'firebase/app'
import type { Firestore } from 'firebase/firestore'




export class FireStore {

    public firestore: Firestore | null = null

    private static instance: FireStore | null = null
    private app: FirebaseApp | null = null


    private constructor(app: FirebaseApp) {

        this.app = app

        this.init()
    }


    private init() {

        if (this.app) {

            this.firestore = getFirestore(this.app)
        }
    }


    public static getInstance(app: FirebaseApp): FireStore {

        if (FireStore.instance == null) {

            FireStore.instance = new FireStore(app)
        }

        return FireStore.instance
    }
}
