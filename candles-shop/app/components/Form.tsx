'use client';

import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { ColumnDefinition } from './Table';
import TableHeader from './TableHeader'; // Make sure this import is correct
import { insertRow } from '../dataSlice';
import { insert } from '../../api';
import mockData from '../mockdata.json';
import FormRow from './FormRow';
import { setLoading, setNotification } from './uiSlice';
import { DataType } from '../types';
import { PRIMARY_KEYS } from './dataStructures';

interface FormProps {
    tableName: keyof typeof mockData;
    columns: ColumnDefinition[];
}

const generateNewRow = (columns: ColumnDefinition[], tableName: keyof typeof mockData) => {
    const newRow: any = {};
    const primaryKey = PRIMARY_KEYS[tableName];
    columns.forEach(col => {
        // We don't set a value for the primary key column in the form
        if (col.key !== primaryKey) {
            // Initialize with default values based on type
            switch (col.type) {
                case DataType.Int:
                    newRow[col.key] = 0;
                    break;
                case DataType.Float:
                case 'price':
                case 'size_oz':
                    newRow[col.key] = 0;
                    break;
                case DataType.Date:
                    newRow[col.key] = new Date().toISOString().split('T')[0];
                    break;
                case DataType.Dropdown:
                    newRow[col.key] = col.options?.[0]?.value ?? '';
                    break;
                case DataType.Bool:
                    newRow[col.key] = col.options?.[0]?.value ?? '';
                    break;
                default:
                    newRow[col.key] = '';
            }
        }
    });
    return newRow;
};

export default function Form({ tableName, columns }: FormProps) {
    const dispatch: AppDispatch = useDispatch();
    const existingData = useSelector((state: RootState) => state.data[tableName]);
    const primaryKey = PRIMARY_KEYS[tableName];

    const nextId = useMemo(() => {
        if (!existingData || existingData.length === 0) return 1;
        return Math.max(...existingData.map(item => item[primaryKey])) + 1;
    }, [existingData]);

    const [formRows, setFormRows] = useState([generateNewRow(columns, tableName)]);
    const [isHovered, setIsHovered] = useState(false);

    const handleAddRow = () => {
        const newId = nextId + formRows.length;
        setFormRows([...formRows, generateNewRow(columns, tableName)]);
    };

    const handleUpdateRow = (index: number, updatedData: any) => {
        const newFormRows = [...formRows];
        newFormRows[index] = updatedData;
        setFormRows(newFormRows);
    };

    const handleRemoveRow = (index: number) => {
        if (formRows.length > 1) {
            const newFormRows = formRows.filter((_, i) => i !== index);
            // After removing, recalculate the IDs for the remaining rows to keep them sequential
            const updatedRows = newFormRows.map((row, i) => ({
                ...row,
                [primaryKey]: nextId + i
            }));
            setFormRows(updatedRows);
        } else {
            // If it's the last row, just reset it
            setFormRows([generateNewRow(columns, tableName)]);
        }
    };

    const handleConfirmRow = async (index: number) => {
        const rowToInsert = formRows[index];
        // The database will generate the primary key, so we don't need the client-side guess.
        const { [primaryKey]: _, ...dataToInsert } = rowToInsert;

        dispatch(setLoading(true));
        try {
            // The `insert` function now returns the complete row from the database, including the real ID.
            const newRowFromDb = await insert(tableName, dataToInsert);
            dispatch(insertRow({ tableName, row: newRowFromDb }));
            handleRemoveRow(index); // Remove the row from the form after it's successfully saved.
            dispatch(setNotification({ type: 'success', message: 'Item added successfully!' }));
        } catch (error: any) {
            console.error("Failed to insert row:", error);
            dispatch(setNotification({ type: 'error', message: error.message || 'Failed to add item.' }));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const formColumns = columns.filter(c => c.key !== 'actions');

    return (
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} style={{ position: 'relative', paddingBottom: '30px' }}>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
                <TableHeader columns={[...formColumns, { key: 'actions', header: 'Actions', width: '100px' }]} />
                <tbody>
                    {formRows.map((rowData, index) => (
                        <FormRow
                            key={rowData[primaryKey] || index}
                            columns={formColumns}
                            rowData={rowData}
                            tableName = {tableName}
                            onUpdate={(updatedData) => handleUpdateRow(index, updatedData)}
                            onConfirm={() => handleConfirmRow(index)}
                            onCancel={() => handleRemoveRow(index)}
                        />
                    ))}
                </tbody>
            </table>
            {isHovered && (
                <button
                    onClick={handleAddRow}
                    title="Add another row"
                    style={{
                        position: 'absolute',
                        bottom: '0px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        cursor: 'pointer',
                        borderRadius: '50%',
                        width: '28px',
                        height: '28px'
                    }}
                >+</button>
            )}
        </div>
    );
}