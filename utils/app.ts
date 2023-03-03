
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'


import type { FirebaseOptions, FirebaseApp } from 'firebase/app'
import type { Analytics } from 'firebase/analytics'





export class FireApp {

    private static instance: FireApp | null = null
    private config: FirebaseOptions

    public app: FirebaseApp | null = null
    public analytics: Analytics | null = null


    private constructor(config: FirebaseOptions) {

        this.config = config

        this.init()
    }


    private init() {

        if (this.config) {

            this.app = initializeApp(this.config)
            this.analytics = getAnalytics(this.app)
        }
    }


    public static getInstance(config: FirebaseOptions): FireApp {

        if (FireApp.instance == null) {

            FireApp.instance = new FireApp(config)
        }

        return FireApp.instance
    }
}
