'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
    message: string;
    type: 'success' | 'error';
}

interface UiState {
    isLoading: boolean;
    notification: Notification | null;
}

const initialState: UiState = {
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
            state.notification = action.payload;
        },
    },
});

export const { setLoading, setNotification } = uiSlice.actions;
export default uiSlice.reducer;