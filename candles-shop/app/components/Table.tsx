// app/components/Table.tsx
import React from 'react';
import Row from './Row'; // Import Row component
import TableHeader from './TableHeader'; // Import TableHeader component
import OutputCell from './OutputCell'; // Import OutputCell as per instruction, though it's primarily used by Row.tsx

// Define a type for column definitions to include type and width information
export interface ColumnDefinition {
    key: string; // The key to access the data from the item object (e.g., 'scentId')
    header: string; // The text to display in the table header (e.g., 'ID')
    type?: 'string' | 'int' | 'price' | 'date' | 'size_oz'; // Type for OutputCell to format data
    width?: string; // Optional width for the column, e.g., '100px' or '20%'
}

interface TableProps { // Modified TableProps
    // headers: string[]; // Old prop, replaced by 'columns'
    columns: ColumnDefinition[]; // New prop to define table columns with types and widths
    data: any[]; // New prop: the array of data items to display
    renderActions?: (item: any) => React.ReactNode; // Optional prop for custom action buttons per row
}

export default function Table({ columns, data, renderActions }: TableProps) { // Destructure 'columns', 'data', and 'renderActions'
    // Calculate default width for columns that don't have one specified
    const numColumns = columns.length;
    const defaultColWidth = numColumns > 0 ? `${100 / numColumns}%` : undefined;

    // Create a new array of columns with calculated widths if not already present
    const columnsWithCalculatedWidth = columns.map(col => ({
        ...col,
        width: col.width || defaultColWidth
    }));

    return (
        <table style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}>
            <TableHeader columns={columnsWithCalculatedWidth} />
            <tbody>
                {data.map((item, rowIndex) => (
                    <Row key={rowIndex} item={item} columns={columnsWithCalculatedWidth} rowIndex={rowIndex}
                    renderActions={renderActions} />
                ))}
            </tbody>
        </table>
    );
}