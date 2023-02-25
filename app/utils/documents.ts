

import { collection, doc, getDoc, addDoc, getDocs, query, where } from 'firebase/firestore'



import type { Firestore, CollectionReference, DocumentData, QuerySnapshot } from 'firebase/firestore'





export class Documents {

    private decksRef: CollectionReference<DocumentData>

    constructor(
        public firestore: Firestore,
        private collectionName: string
    ) {

        this.decksRef = collection(this.firestore, this.collectionName)
    }


    public async getDocumentById(id: string): Promise<DocumentData | null> {

        const docRef = doc(this.firestore, this.collectionName, id)
        const docSnap = await getDoc(docRef)

        let data: DocumentData | null = null

        if (docSnap.exists()) {

            data = docSnap.data()
        }

        return data
    }


    public async getDocumentsList(): Promise<QuerySnapshot<DocumentData> | null> {

        const querySnapshot = await getDocs(this.decksRef)

        return querySnapshot
    }

}
