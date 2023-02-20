'use client'

import { createSlice } from '@reduxjs/toolkit'



import type { PayloadAction } from '@reduxjs/toolkit'



export interface AuthState {
    authorized: boolean
}

const initialState: AuthState = {
    authorized: false
}

export const counterSlice = createSlice({

    name: 'auth',
    initialState,

    reducers: {
        setAuthorized: (state, action: PayloadAction<boolean>) => {

            state.authorized = action.payload
        }
    }
})


export const { setAuthorized } = counterSlice.actions

export default counterSlice
