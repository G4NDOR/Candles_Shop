'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { ColumnDefinition } from './Table';
import TableHeader from './TableHeader';
import { insertRow } from '../dataSlice';
import { insert } from '../../api';
import mockData from '../mockdata.json';
import FormRow from './FormRow';
import { setLoading, setNotification } from './uiSlice';
import { DataType, PRIMARY_KEYS } from '../schemaRegistry';

interface FormProps {
    tableName: keyof typeof mockData;
    columns: ColumnDefinition[];
}

const generateNewRow = (columns: ColumnDefinition[], tableName: string, candles: any[] = []) => {
    const newRow: any = {};
    const primaryKey = PRIMARY_KEYS[tableName];

    columns.forEach(col => {
        if (col.key !== primaryKey) {
            switch (col.type) {
                case DataType.Int:
                    newRow[col.key] = col.key === 'quantity' ? 1 : 0;
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

    // Automatically initialize unitPrice to selected candle's price for sales-items
    if ((tableName === 'sales-items' || tableName === 'salesItems') && newRow.candleId) {
        const selectedCandle = candles.find((c: any) => Number(c.candleId) === Number(newRow.candleId));
        if (selectedCandle) {
            newRow.unitPrice = Number(selectedCandle.price);
        }
    }

    return newRow;
};

export default function Form({ tableName, columns }: FormProps) {
    const dispatch: AppDispatch = useDispatch();
    const allData = useSelector((state: RootState) => state.data);
    const existingData = useSelector((state: RootState) => state.data[tableName]);
    const primaryKey = PRIMARY_KEYS[tableName];

    const candles = useMemo(() => allData.candles || [], [allData.candles]);

    const nextId = useMemo(() => {
        if (!existingData || existingData.length === 0) return 1;
        return Math.max(...existingData.map((item: any) => item[primaryKey])) + 1;
    }, [existingData, primaryKey]);

    const [formRows, setFormRows] = useState(() => [generateNewRow(columns, tableName, candles)]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        setFormRows([generateNewRow(columns, tableName, candles)]);
    }, [columns, tableName, candles]);

    const handleAddRow = () => {
        setFormRows([...formRows, generateNewRow(columns, tableName, candles)]);
    };

    const handleUpdateRow = (index: number, updatedData: any) => {
        const previousRow = formRows[index];

        // When candleId selection changes on sales-items, auto-update unitPrice
        if (
            tableName === 'sales-items' &&
            updatedData.candleId !== previousRow?.candleId
        ) {
            const selectedCandle = candles.find(
                (c: any) => Number(c.candleId) === Number(updatedData.candleId)
            );
            if (selectedCandle) {
                updatedData.unitPrice = Number(selectedCandle.price);
            }
        }

        const newFormRows = [...formRows];
        newFormRows[index] = updatedData;
        setFormRows(newFormRows);
    };

    const handleRemoveRow = (index: number) => {
        if (formRows.length > 1) {
            const newFormRows = formRows.filter((_, i) => i !== index);
            const updatedRows = newFormRows.map((row, i) => ({
                ...row,
                [primaryKey]: nextId + i,
            }));
            setFormRows(updatedRows);
        } else {
            setFormRows([generateNewRow(columns, tableName, candles)]);
        }
    };

    const handleConfirmRow = async (index: number) => {
        const rowToInsert = formRows[index];
        const { [primaryKey]: _, createdDate, saleTimestamp, ...dataToInsert } = rowToInsert;

        dispatch(setLoading(true));
        try {
            const newRowFromDb = await insert(tableName, dataToInsert);
            dispatch(insertRow({ tableName, row: newRowFromDb }));
            handleRemoveRow(index);
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
                            tableName={tableName}
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