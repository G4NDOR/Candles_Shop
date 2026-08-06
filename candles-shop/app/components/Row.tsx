'use client';

// app/components/Row.tsx
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Cell from './Cell'; // Import Cell component
import { ColumnDefinition } from './Table'; // Import ColumnDefinition type from Table component
import { RootState, AppDispatch } from '../store';
import { deleteRow, updateRowFields, updateCellValue } from '../dataSlice';
import { deleteItem, update } from '../../api';
import { setLoading, setNotification } from './uiSlice';
import mockData from '../mockdata.json';

interface RowProps {
    tableName: keyof typeof mockData; // The key for the data array in the Redux store
    columns: ColumnDefinition[];
    rowIndex: number; // The index of the row in the data array
}

export default function Row({ tableName, columns, rowIndex }: RowProps) {
    const item = useSelector((state: RootState) => state.data[tableName][rowIndex], shallowEqual);
    const dispatch: AppDispatch = useDispatch();

    const [isHovered, setIsHovered] = useState(false);
    const [isRowEditing, setIsRowEditing] = useState(false);
    const [activeCellEdit, setActiveCellEdit] = useState<string | null>(null);
    const [editedData, setEditedData] = useState(item);

    const isEditing = isRowEditing || activeCellEdit !== null;

    // If the data from Redux changes (e.g., from another user's edit), reset local state.
    useEffect(() => {
        setEditedData(item);
    }, [item]);

    if (!item) {
        return null; // Don't render if the item has been deleted or doesn't exist.
    }

    const { id } = item;

    const handleDelete = async () => {
        if (window.confirm(`Are you sure you want to delete this item?`)) {
            dispatch(setLoading(true));
            try {
                await deleteItem(tableName, id);
                dispatch(deleteRow({ tableName, id }));
                dispatch(setNotification({ type: 'success', message: 'Item deleted successfully!' }));
            } catch (error: any) {
                console.error("Failed to delete item:", error);
                dispatch(setNotification({ type: 'error', message: error.message || 'Failed to delete item.' }));
            } finally {
                dispatch(setLoading(false));
            }
        }
    };

    const handleRowEditStart = () => {
        setActiveCellEdit(null); // Exit any active cell edit
        setIsRowEditing(true);
        setEditedData(item); // Reset any partial edits
    };

    const handleRowEditCancel = () => {
        setIsRowEditing(false);
        setEditedData(item); // Revert changes
    };

    const handleRowEditSave = async () => {
        dispatch(setLoading(true));
        try {
            await update(tableName, id, editedData);
            dispatch(updateRowFields({ tableName, id, updatedFields: editedData }));
            setIsRowEditing(false);
            dispatch(setNotification({ type: 'success', message: 'Row updated successfully!' }));
        } catch (error: any) {
            console.error("Failed to save row:", error);
            dispatch(setNotification({ type: 'error', message: error.message || 'Failed to save changes.' }));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleCellSave = async (columnKey: string, value: any) => {
        dispatch(setLoading(true));
        try {
            await update(tableName, id, { [columnKey]: value });
            dispatch(updateCellValue({ tableName, rowIndex, columnKey, value, id }));
            setActiveCellEdit(null);
            dispatch(setNotification({ type: 'success', message: 'Cell updated successfully!' }));
        } catch (error: any) {
            console.error("Failed to save cell:", error);
            dispatch(setNotification({ type: 'error', message: error.message || 'Failed to save cell.' }));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const rowStyle = {
        backgroundColor: rowIndex % 2 === 0 ? '#f9f9f9' : 'white', // Alternating row color
        position: 'relative' as 'relative',
    };

    return ( // Destructure renderActions
        <tr style={rowStyle} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {columns.map((col, colIndex) => {
                if (col.key === 'actions') return null; // The actions column is handled separately
                return ( // Use colIndex for key
                    <td key={colIndex} style={{
                        width: col.width,
                        minWidth: '120px', // Ensure cells don't get too squished
                        padding: '8px',
                        borderBottom: '1px solid #ddd',
                    }}>
                        <Cell
                            value={isEditing ? editedData[col.key] : item[col.key]}
                            type={col.type}
                            options={col.options}
                            isRowEditing={isRowEditing}
                            isCellEditing={activeCellEdit === col.key}
                            isEditable={col.key !== 'id'}
                            onCellEditStart={() => {
                                if (!isRowEditing) setActiveCellEdit(col.key);
                            }}
                            onCellEditCancel={() => setActiveCellEdit(null)}
                            onCellEditSave={(newValue) => handleCellSave(col.key, newValue)}
                            onValueChange={(newValue) => setEditedData({ ...editedData, [col.key]: newValue })}
                        />
                    </td>
                );
            })}
            <td style={{
                padding: '8px',
                borderBottom: '1px solid #ddd',
                textAlign: 'right',
                verticalAlign: 'middle'
            }}>
                {isRowEditing ? (
                    <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                        <button onClick={handleRowEditSave} title="Save">✓</button>
                        <button onClick={handleRowEditCancel} title="Cancel">✗</button>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        gap: '4px',
                        justifyContent: 'flex-end',
                        visibility: isHovered && !activeCellEdit ? 'visible' : 'hidden'
                    }}>
                        <button onClick={handleRowEditStart} title="Edit Row">✏️</button>
                        <button onClick={handleDelete} title="Delete Row">🗑️</button>
                    </div>
                )}
            </td>
        </tr>
    );
}
