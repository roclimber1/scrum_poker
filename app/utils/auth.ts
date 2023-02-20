
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, getAdditionalUserInfo } from 'firebase/auth'

import { firebaseApp } from './firebase'



import type { FirebaseApp } from 'firebase/app'
import type { Auth, UserCredential, User, OAuthCredential } from 'firebase/auth'




export class FirebaseAuth {

    public provider: GoogleAuthProvider | null = null
    public auth: Auth | null = null

    private static instance: FirebaseAuth | null = null
    private app: FirebaseApp | null = null


    private constructor(app: FirebaseApp) {

        this.app = app

        this.init()
    }


    private init() {

        if (this.app) {

            this.provider = new GoogleAuthProvider()
            this.auth = getAuth(this.app)
        }
    }

    public static getInstance(app: FirebaseApp): FirebaseAuth {

        if (FirebaseAuth.instance == null) {

            FirebaseAuth.instance = new FirebaseAuth(app)
        }

        return FirebaseAuth.instance
    }


    public signOut(): Promise<void> | null {

        return this.auth && signOut(this.auth)
    }


    public signIn(): Promise<User> {

        const promise = new Promise<User>((resolve, reject) => {

            (this.auth && this.provider) ? signInWithPopup(this.auth, this.provider)
                .then((result) => {

                    const credential: OAuthCredential | null = GoogleAuthProvider.credentialFromResult(result)
                    const token = credential?.accessToken

                    const user = result.user

                    const useData = getAdditionalUserInfo(result)

                    resolve(user)

                }).catch((error) => {

                    const errorCode = error.code
                    const errorMessage = error.message

                    const email = error.customData.email

                    const credential = GoogleAuthProvider.credentialFromError(error)

                    reject({
                        errorCode,
                        errorMessage
                    })

                }) : reject('Not initialized')
        })

        return promise
    }
}
