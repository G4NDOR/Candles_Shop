'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from './mockdata.json';

type TableName = keyof typeof mockData;

interface DataState {
    [key: string]: any[];
}

const initialState: DataState = {
    candles: [],
    customers: [],
    employees: [],
    sales: [],
    'sales-items': [],
    sizes: [],
    scents: [],
};

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        /**
         * Replaces the entire data state. Used for initializing or resetting data.
         */
        initializeData: (state, action: PayloadAction<DataState>) => {
            return action.payload;
        },

        /**
         * Inserts a new row into a specified table.
         */
        insertRow: (state, action: PayloadAction<{ tableName: TableName; row: any }>) => {
            const { tableName, row } = action.payload;
            state[tableName].push(row);
        },

        /**
         * Updates an entire row in a table based on its ID.
         */
        updateRowFields: (state, action: PayloadAction<{ tableName: TableName; id: number | string; updatedFields: any }>) => {
            const { tableName, id, updatedFields } = action.payload;
            const tableData = state[tableName];
            const rowIndex = tableData.findIndex(item => item.id === id);
            if (rowIndex !== -1) {
                tableData[rowIndex] = { ...tableData[rowIndex], ...updatedFields };
            }
        },

        /**
         * Updates a single cell value in a table using the row's index.
         * This is an alternative to updateRowFields for single-field edits.
         */
        updateCellValue: (state, action: PayloadAction<{ tableName: TableName; rowIndex: number; columnKey: string; value: any }>) => {
            const { tableName, rowIndex, columnKey, value } = action.payload;
            if (state[tableName][rowIndex]) {
                state[tableName][rowIndex][columnKey] = value;
            }
        },

        /**
         * Deletes a row from a table based on its ID.
         */
        deleteRow: (state, action: PayloadAction<{ tableName: TableName; id: number | string }>) => {
            const { tableName, id } = action.payload;
            state[tableName] = state[tableName].filter(item => item.id !== id);
        },
    },
});

export const {
    initializeData,
    insertRow,
    updateRowFields,
    updateCellValue,
    deleteRow,
} = dataSlice.actions;

export default dataSlice.reducer;