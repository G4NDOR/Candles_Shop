'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from './mockdata.json';
import { PRIMARY_KEYS } from './components/dataStructures';

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
            const normalizedData: DataState = {};
            for (const key in action.payload) {
                // Normalize incoming keys (e.g., 'Candles' -> 'candles') to match our app's convention
                const normalizedKey = key.toLowerCase().replace(/ /g, '-');
                if (normalizedKey in initialState) {
                    normalizedData[normalizedKey] = action.payload[key];
                }
            }
            // Ensure all state slices are present, even if not in the payload
            return { ...initialState, ...normalizedData };
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
            const pk = PRIMARY_KEYS[tableName];
            const tableData = state[tableName];
            const rowIndex = tableData.findIndex(item => item[pk] === id);
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
            const pk = PRIMARY_KEYS[tableName];
            console.log("dataslice deleteRow before", state[tableName])
            state[tableName] = state[tableName].filter(item => item[pk] !== id);
            console.log("dataslice deleteRow after" , state[tableName])
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