

import { collection, addDoc } from 'firebase/firestore'

import { Documents } from '@/app/utils/documents'
import { Decks } from '@/app/utils/decks'



import type { Firestore, DocumentData } from 'firebase/firestore'
import type { ScrumPokerUser } from '@/app/utils/user'



export interface Room {
    deck: string,
    name: string,
    owner_id: string,
    users: Array<string>
}

export const ROOMS = 'rooms'




export class Rooms extends Documents {


    private decksHelper: Decks


    constructor(
        firestore: Firestore
    ) {

        super(firestore, ROOMS)

        this.decksHelper = new Decks(firestore)
    }


    public async createNewRoom(roomData: Partial<Room>, user: ScrumPokerUser | null): Promise<string | null> {

        let defaultDeck: DocumentData | null = null

        try {
            defaultDeck = await this.decksHelper.getDefaultDeck()
        } catch (e) {
            console.error('Error getting default deck: ', e)
        }

        const { uid: userId } = user || {}

        if (!defaultDeck || !userId) {

            console.error('Either default deck hadn\'t been found: ', defaultDeck, 'or user id wasn\'t set', userId)

            return null
        }

        const { id: deckId } = defaultDeck || {}

        let docId = null

        try {
            const docRef = await addDoc(collection(this.firestore, ROOMS), {
                ...roomData,
                owner_id: userId,
                users: {
                    userId
                },
                deck: deckId
            })

            docId = docRef.id

            console.log('Document written with ID: ', docId)
        } catch (e) {
            console.error('Error adding document: ', e)
        }

        return docId
    }
}
