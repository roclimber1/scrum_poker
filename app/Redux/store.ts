'use client'


import { configureStore } from '@reduxjs/toolkit'
import authSlice from '@/app/Redux/features/auth'


export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer
    }
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
