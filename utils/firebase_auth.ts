
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth'



import type { FirebaseApp } from 'firebase/app'
import type { Auth, User } from 'firebase/auth'




interface AuthData {
    state: boolean,
    user: User | null
}




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


    public checkAuthState(): AuthData {

        let authState = false
        let user = null

        if (this.auth) {

            user = this.auth.currentUser
            authState = Boolean(user)
        }

        return { user, state: authState }
    }


    public setAuthStateWatcher(): Promise<AuthData> | null {

        const promise = new Promise<AuthData>((resolve, reject) => {

            this.auth && onAuthStateChanged(this.auth as Auth, (user) => {

                if (user) {

                    resolve({ user, state: true })

                } else {

                    reject({ user: null, state: false })
                }
            })
        })


        return promise
    }


    public signOut(): Promise<void> | null {

        return this.auth && signOut(this.auth)
    }


    public signIn(): Promise<User> {

        const promise = new Promise<User>((resolve, reject) => {

            (this.auth && this.provider) ? signInWithPopup(this.auth, this.provider)
                .then((result) => {

                    const user = result.user

                    resolve(user)

                }).catch((error) => {

                    const errorCode = error.code
                    const errorMessage = error.message


                    reject({
                        errorCode,
                        errorMessage
                    })

                }) : reject('Not initialized')
        })

        return promise
    }
}
