'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Notification {
    type: 'success' | 'error';
    message: string;
}

interface UIState {
    isLoading: boolean;
    notification: Notification | null;
}

const initialState: UIState = {
    isLoading: false,
    notification: null,
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        setNotification: (state, action: PayloadAction<Notification | null>) => {
            console.log("[uiSlice.ts] setNotification payload", action.payload)
            state.notification = action.payload;
        },
    },
});

export const { setLoading, setNotification } = uiSlice.actions;
export default uiSlice.reducer;