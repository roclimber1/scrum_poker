
import type { User } from 'firebase/auth'




export interface IScrumPokerUser {
    displayName: string | null,
    email: string | null,
    photoURL: string | null,
    uid: string | null
}



export class ScrumPokerUser {

    public displayName: string | null
    public email: string | null
    public photoURL: string | null
    public uid: string | null


    constructor(user: User | null) {

        const { displayName, email, photoURL, uid } = user || {}

        this.displayName = displayName || null
        this.email = email || null
        this.photoURL = photoURL || null
        this.uid = uid || null
    }


    public serialize() {

        return {
            displayName: this.displayName,
            email: this.email,
            photoURL: this.photoURL,
            uid: this.uid
        }
    }
}
