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

interface FormProps {
    tableName: keyof typeof mockData;
    columns: ColumnDefinition[];
}

const generateNewRow = (columns: ColumnDefinition[], nextId: number) => {
    const newRow: any = { id: nextId };
    columns.forEach(col => {
        if (col.key !== 'id') {
            // Initialize with default values based on type
            switch (col.type) {
                case 'int':
                case 'float':  // added float type to Column definition in Project/candles-shop/app/components/Table.tsx
                case 'price':
                case 'size_oz':
                    newRow[col.key] = 0;
                    break;
                case 'date':
                    newRow[col.key] = new Date().toISOString().split('T')[0];
                    break;
                case 'dropdown':
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

    const nextId = useMemo(() => {
        if (!existingData || existingData.length === 0) return 1;
        return Math.max(...existingData.map(item => item.id)) + 1;
    }, [existingData]);

    const [formRows, setFormRows] = useState([generateNewRow(columns, nextId)]);
    const [isHovered, setIsHovered] = useState(false);

    const handleAddRow = () => {
        const newId = nextId + formRows.length;
        setFormRows([...formRows, generateNewRow(columns, newId)]);
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
                id: nextId + i
            }));
            setFormRows(updatedRows);
        } else {
            // If it's the last row, just reset it
            setFormRows([generateNewRow(columns, nextId)]);
        }
    };

    const handleConfirmRow = async (index: number) => {
        const rowToInsert = formRows[index];
        dispatch(setLoading(true));
        try {
            await insert(tableName, rowToInsert);
            dispatch(insertRow({ tableName, row: rowToInsert }));
            handleRemoveRow(index); // Remove from form after successful insertion
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
                            key={rowData.id}
                            columns={formColumns}
                            rowData={rowData}
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