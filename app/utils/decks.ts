

import { Documents } from '@/app/utils/documents'



import type { DocumentData, Firestore } from 'firebase/firestore'




export interface Deck {
    cards: Array<string>,
    name: string
}

export const DECKS = 'decks'




export class Decks extends Documents {

    constructor(
        firestore: Firestore
    ) {

        super(firestore, DECKS)
    }



    public async getDefaultDeck(): Promise<DocumentData | null> {

        const decks = await this.getDocumentsList()

        const deck = decks?.empty ? null : (decks?.docs[0] || null)

        return deck
    }
}
