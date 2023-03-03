'use client'

import { createSlice } from '@reduxjs/toolkit'



import type { PayloadAction } from '@reduxjs/toolkit'
import type { IScrumPokerUser } from '@/utils/user'



export interface AuthState {
    authorized: boolean,
    user: IScrumPokerUser | null
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

        setUser: (state, action: PayloadAction<IScrumPokerUser | null>) => {

            state.user = action.payload
        }
    }
})


export const { setAuthorized, setUser } = counterSlice.actions

export default counterSlice
