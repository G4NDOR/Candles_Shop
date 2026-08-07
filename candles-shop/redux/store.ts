import { configureStore } from '@reduxjs/toolkit';
import scentsReducer from './hooks/scentsSlice';

export const store = configureStore({
    reducer: {
        scents: scentsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
