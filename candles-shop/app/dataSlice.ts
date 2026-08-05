import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from './mockdata.json';

interface UpdateCellPayload {
    tableName: keyof typeof mockData;
    rowIndex: number;
    columnKey: string;
    id: string | number; // Added id to potentially find by id if rowIndex is unreliable
    value: any;
}

interface InsertRowPayload {
    tableName: keyof typeof mockData;
    row: any;
}

interface DeleteRowPayload {
    tableName: keyof typeof mockData;
    id: string | number;
}

interface UpdateRowFieldsPayload extends DeleteRowPayload {
    updatedFields: Partial<any>;
}

const initialState: typeof mockData = mockData;

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        updateCellValue: (state, action: PayloadAction<UpdateCellPayload>) => {
            const { tableName, rowIndex, columnKey, value } = action.payload;
            // Ensure the table and row exist before attempting to update
            if (state[tableName] && state[tableName][rowIndex]) {
                (state[tableName][rowIndex] as any)[columnKey] = value;
            }
        },
        insertRow: (state, action: PayloadAction<InsertRowPayload>) => {
            const { tableName, row } = action.payload;
            if (state[tableName]) {
                (state[tableName] as any[]).push(row);
            }
        },
        deleteRow: (state, action: PayloadAction<DeleteRowPayload>) => {
            const { tableName, id } = action.payload;
            if (state[tableName]) {
                (state[tableName] as any[]) = (state[tableName] as any[]).filter(item => item.id !== id);
            }
        },
        updateRowFields: (state, action: PayloadAction<UpdateRowFieldsPayload>) => {
            const { tableName, id, updatedFields } = action.payload;
            if (state[tableName]) {
                const index = (state[tableName] as any[]).findIndex(item => item.id === id);
                if (index !== -1) {
                    (state[tableName] as any[])[index] = { ...state[tableName][index], ...updatedFields };
                }
            }
        },
    },
});

export const { updateCellValue, insertRow, deleteRow, updateRowFields } = dataSlice.actions;
export default dataSlice.reducer;