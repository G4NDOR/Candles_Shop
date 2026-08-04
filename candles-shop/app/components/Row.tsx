'use client';

// app/components/Row.tsx
import React from 'react';
import OutputCell from './OutputCell'; // Import OutputCell component
import { ColumnDefinition } from './Table'; // Import ColumnDefinition type from Table component

interface RowProps {
    item: any;
    columns: ColumnDefinition[]; // Use ColumnDefinition for columns
    rowIndex: number; // Add rowIndex to determine alternating colors
    renderActions?: (item: any) => React.ReactNode; // Optional prop for custom action buttons
}

export default function Row({ item, columns, rowIndex, renderActions }: RowProps) { // Destructure renderActions
    const rowStyle = {
        backgroundColor: rowIndex % 2 === 0 ? '#f9f9f9' : 'white', // Alternating row color
    };

    return (
        <tr style={rowStyle}>
            {columns.map((col, colIndex) => ( // Use colIndex for key
                <td key={colIndex} style={{
                    width: col.width,
                    padding: '8px',
                    borderBottom: '1px solid #ddd',
                }}> {/* Apply width and styles */}
                    <OutputCell data={item[col.key]} type={col.type} /> {/* Use OutputCell to display data */}
                </td>
            ))}
            {
            //renderActions && ( // Conditionally render the actions cell if renderActions is provided
            //    <td>
            //        {renderActions(item)}
            //    </td>
            //)
            }
        </tr>
    );
}
