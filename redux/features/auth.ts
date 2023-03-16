'use client'

import { createSlice } from '@reduxjs/toolkit'



import type { PayloadAction } from '@reduxjs/toolkit'
import type { IScrumPokerUser } from '@/utils/scrum_poker_user'

import type { RoomData } from '@/utils/websocketIo_client'



export interface AuthState {
    authorized: boolean,
    roomData: RoomData | null,
    user: IScrumPokerUser | null
}

const initialState: AuthState = {
    authorized: false,
    user: null,
    roomData: null
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
        },

        setRoomData: (state, action: PayloadAction<RoomData | null>) => {

            state.roomData = action.payload
        }
    }
})


export const { setAuthorized, setUser, setRoomData } = counterSlice.actions

export default counterSlice
