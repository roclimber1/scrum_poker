

import { query, where } from 'firebase/firestore'



import type { CollectionReference, DocumentData, Query, WhereFilterOp } from 'firebase/firestore'





export class QueryBuilder<Value = any> {

    private query: Query | null = null

    private field: string
    private value: Value

    private operator: WhereFilterOp


    constructor(
        private collectionRef: CollectionReference<DocumentData>
    ) {}


    public setField(field: string) {

        this.field = field

        return this
    }

    public setOperator(operator: WhereFilterOp) {

        this.operator = operator

        return this
    }

    public setValue(value: Value) {

        this.value = value

        return this
    }

    public build() {

        this.query = query(this.collectionRef, where(this.field, this.operator, this.value))

        return this.query
    }

}
