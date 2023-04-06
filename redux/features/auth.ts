'use client'

import { createSlice } from '@reduxjs/toolkit'



import type { PayloadAction } from '@reduxjs/toolkit'
import type { IScrumPokerUser } from '@/utils/scrum_poker_user'

import type { RoomData } from '@/utils/websocketIo_client'
import type { DocumentData } from 'firebase/firestore'



export interface AuthState {
    authorized: boolean,
    roomData: RoomData | null,
    user: IScrumPokerUser | null,
    userRoom: DocumentData | null,
}

const initialState: AuthState = {
    authorized: false,
    roomData: null,
    user: null,
    userRoom: null
}

export const authSlice = createSlice({

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
        },

        setUserRoom: (state, action: PayloadAction<DocumentData>) => {

            state.userRoom = action.payload
        }
    }
})


export const { setAuthorized, setUser, setRoomData, setUserRoom } = authSlice.actions

export default authSlice
