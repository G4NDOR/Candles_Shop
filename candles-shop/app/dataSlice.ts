'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import mockData from './mockdata.json';
import { PRIMARY_KEYS, resolveTableInfo } from './schemaRegistry';

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
        // Replaces the whole store (Initial Load / Reset)
        initializeData: (state, action: PayloadAction<DataState>) => {
            const normalizedData: DataState = {};
            for (const key in action.payload) {
                const normalizedKey = key.toLowerCase().replace(/ /g, '-');
                if (normalizedKey in initialState) {
                    normalizedData[normalizedKey] = action.payload[key];
                }
            }
            return { ...initialState, ...normalizedData };
        },

        // ✅ NEW: Replaces a SINGLE table's data (Just like initializeData!)
        setTableData: (state, action: PayloadAction<{ tableName: string; data: any[] }>) => {
            const { tableName, data } = action.payload;
            const tableInfo = resolveTableInfo(tableName);
            const targetKey = tableInfo?.feKey || tableName;

            if (targetKey in state) {
                state[targetKey] = data;
            }
        },

        insertRow: (state, action: PayloadAction<{ tableName: TableName; row: any }>) => {
            const { tableName, row } = action.payload;
            if (state[tableName]) {
                state[tableName].push(row);
            }
        },

        updateRowFields: (state, action: PayloadAction<{ tableName: TableName; id: number | string; updatedFields: any }>) => {
            const { tableName, id, updatedFields } = action.payload;
            const pk = PRIMARY_KEYS[tableName] || resolveTableInfo(tableName)?.pkColumn;
            const tableData = state[tableName];
            if (tableData) {
                const rowIndex = tableData.findIndex(item => item[pk] === id);
                if (rowIndex !== -1) {
                    tableData[rowIndex] = { ...tableData[rowIndex], ...updatedFields };
                }
            }
        },

        updateCellValue: (state, action: PayloadAction<{ tableName: TableName; rowIndex: number; columnKey: string; value: any }>) => {
            const { tableName, rowIndex, columnKey, value } = action.payload;
            if (state[tableName] && state[tableName][rowIndex]) {
                state[tableName][rowIndex][columnKey] = value;
            }
        },

        deleteRow: (state, action: PayloadAction<{ tableName: TableName; id: number | string }>) => {
            const { tableName, id } = action.payload;
            const pk = PRIMARY_KEYS[tableName] || resolveTableInfo(tableName)?.pkColumn;
            if (state[tableName]) {
                state[tableName] = state[tableName].filter(item => item[pk] !== id);
            }
        },
    },
});

export const {
    initializeData,
    setTableData, // 👈 Export it here
    insertRow,
    updateRowFields,
    updateCellValue,
    deleteRow,
} = dataSlice.actions;

export default dataSlice.reducer;