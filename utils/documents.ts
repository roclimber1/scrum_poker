

import { collection, doc, getDoc, getDocs, deleteDoc } from 'firebase/firestore'



import type { Firestore, CollectionReference, DocumentData, QuerySnapshot, Query } from 'firebase/firestore'





export class Documents {

    public docsRef: CollectionReference<DocumentData>

    public firestore: Firestore
    private collectionName: string


    constructor(
        firestore: Firestore,
        collectionName: string
    ) {
        this.firestore = firestore
        this.collectionName = collectionName

        this.docsRef = collection(this.firestore, this.collectionName)
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


    public async deleteDocumentById(id: string): Promise<void> {

        const docRef = doc(this.firestore, this.collectionName, id)

        await deleteDoc(docRef)
    }


    private convertSnapshotToDocumentsList(querySnapshot: QuerySnapshot<DocumentData>): Array<DocumentData> {

        const documents: Array<DocumentData> = []

        querySnapshot?.forEach((doc) => {

            documents.push({
                ...doc.data(),
                id: doc.id
            })
        })

        return documents
    }


    public async getDocumentsByQuery(query: Query) {

        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(query)

        return this.convertSnapshotToDocumentsList(querySnapshot)
    }


    public async getDocumentsList(): Promise<Array<DocumentData> | null> {

        const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(this.docsRef)

        return this.convertSnapshotToDocumentsList(querySnapshot)
    }

}
