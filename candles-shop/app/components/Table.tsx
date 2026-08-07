// app/components/Table.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import Row from './Row'; // Import Row component
import TableHeader from './TableHeader'; // Import TableHeader component
import { RootState } from '../store';
import mockData from '../mockdata.json';
import { DataType } from '../types';

export type ColumnType = DataType | 'price' | 'size_oz';

// Define a type for column definitions
export interface ColumnDefinition {
    key: string; // The key to access the data from the item object (e.g., 'scentId')
    header: string; // The text to display in the table header (e.g., 'ID')
    type?: ColumnType; // Type for Cell to format/edit data
    width?: string; // Optional width for the column, e.g., '100px' or '20%'
    options?: { value: string | number, label: string }[]; // Optional for dropdown type
}

interface TableProps {
    tableName: keyof typeof mockData;
    columns: ColumnDefinition[];
}

export default function Table({ tableName, columns }: TableProps) {
    const dataLength = useSelector((state: RootState) => state.data[tableName]?.length ?? 0);
    const data = Array.from({ length: dataLength }, (_, i) => i); // Create an array of indices

    // Calculate default width for columns that don't have one specified
    // Add 1 for the actions column
    const numColumns = columns.length + 1;
    const defaultColWidth = numColumns > 0 ? `${100 / numColumns}%` : undefined;

    // Create a new array of columns with calculated widths if not already present
    const columnsWithCalculatedWidth: ColumnDefinition[] = columns.map(col => ({
        ...col,
        width: col.width || defaultColWidth
    }));

    columnsWithCalculatedWidth.push({ key: 'actions', header: '', width: '100px' });

    return (
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
            <TableHeader columns={columnsWithCalculatedWidth} />
            <tbody>
                {data.map(rowIndex => (
                    <Row key={rowIndex} tableName={tableName} columns={columns} rowIndex={rowIndex} />
                ))}
            </tbody>
        </table>
    );
}