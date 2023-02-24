

import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'




import type { FirebaseApp } from 'firebase/app'
import type { Database } from 'firebase/database'




export class FireDatabase {

    public database: Database | null = null

    private static instance: FireDatabase | null = null
    private app: FirebaseApp | null = null


    private constructor(app: FirebaseApp) {

        this.app = app

        this.init()
    }


    private init() {

        if (this.app) {

            this.database = getDatabase(this.app)
        }
    }


    public static getInstance(app: FirebaseApp): FireDatabase {

        if (FireDatabase.instance == null) {

            FireDatabase.instance = new FireDatabase(app)
        }

        return FireDatabase.instance
    }
}
