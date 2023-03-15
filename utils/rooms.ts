

import { collection, addDoc, Query } from 'firebase/firestore'

import { Documents } from '@/utils/Documents'
import { Decks } from '@/utils/Decks'

import { QueryBuilder } from '@/utils/QueryBuilder'



import type { Firestore, DocumentData } from 'firebase/firestore'
import type { IScrumPokerUser } from '@/utils/ScrumPokerUser'



export interface Room {
    deck: string,
    id?: string,
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


    public static getRoomLink(id: string): string {

        return `/room/${id}`
    }


    public async getRoomsByUserId(id: string): Promise<Array<DocumentData>> {

        const queryBuilder: QueryBuilder<string> = new QueryBuilder<string>(this.docsRef)

        const query: Query<DocumentData> = queryBuilder
            .setField('owner_id')
            .setOperator('==')
            .setValue(id)
            .build()

        const rooms: Array<DocumentData> = await this.getDocumentsByQuery(query)

        return rooms
    }


    private async getDefaultDeck(): Promise<DocumentData | null> {

        let defaultDeck: DocumentData | null = null

        try {
            defaultDeck = await this.decksHelper.getDefaultDeck()
        } catch (e) {
            console.error('Error getting default deck: ', e)
        }


        return defaultDeck
    }


    private async addNewRoom(room: Room): Promise<string | null> {

        let docId = null

        try {
            const docRef = await addDoc(collection(this.firestore, ROOMS), room)

            docId = docRef.id

            console.debug('Document written with ID: ', docId)
        } catch (e) {
            console.error('Error adding document: ', e)
        }

        return docId
    }


    public async createNewRoom(roomData: Partial<Room>, user: IScrumPokerUser | null): Promise<string | null> {

        const defaultDeck: DocumentData | null = this.getDefaultDeck()
        const { uid: userId } = user || {}


        if (!defaultDeck || !userId) {

            console.error('Either default deck hadn\'t been found: ', defaultDeck, 'or user id wasn\'t set', userId)

            return null
        }

        const { id: deckId } = defaultDeck || {}
        const { name } = roomData || {}


        const docId = this.addNewRoom({
            name: name || `room_${userId}`,
            owner_id: userId,
            users: [
                userId
            ],
            deck: deckId
        })


        return docId
    }
}
