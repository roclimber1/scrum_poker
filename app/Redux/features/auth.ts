'use client'

import { createSlice } from '@reduxjs/toolkit'



import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from 'firebase/auth'



export interface AuthState {
    authorized: boolean,
    user: User | null
}

const initialState: AuthState = {
    authorized: false,
    user: null
}

export const counterSlice = createSlice({

    name: 'auth',
    initialState,

    reducers: {
        setAuthorized: (state, action: PayloadAction<boolean>) => {

            state.authorized = action.payload
        },

        setUser: (state, action: PayloadAction<User | null>) => {

            state.user = action.payload
        }
    }
})


export const { setAuthorized, setUser } = counterSlice.actions

export default counterSlice
