import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';

export interface Scent {
    scentId: number;
    scentName: string;
}

interface ScentsState {
    scents: Scent[];
}

const initialState: ScentsState = {
    scents: [
        { scentId: 1, scentName: 'Lavender Fields' },
        { scentId: 2, scentName: 'Teakwood & Amber' },
    ],
};

const scentsSlice = createSlice({
    name: 'scents',
    initialState,
    reducers: {
        addScent: (state, action: PayloadAction<Scent>) => {
            state.scents.push(action.payload);
        },
    },
});

export const { addScent } = scentsSlice.actions;

export const selectScents = (state: { scents: ScentsState }) => state.scents.scents;

export default scentsSlice.reducer;
