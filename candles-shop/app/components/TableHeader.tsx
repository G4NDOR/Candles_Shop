import React from 'react';
import { ColumnDefinition } from './Table'; // Assuming TableHeader is in the same directory as Table
// Row is no longer used for the header as it renders <td> elements, which is semantically incorrect for <thead>.

interface TableHeaderProps {
    columns: ColumnDefinition[];
}

export default function TableHeader({ columns }: TableHeaderProps) {
    // To properly "show that it is a table header" and ensure correct HTML structure,
    // the header now directly renders <th> elements.
    // This corrects the previous approach of using the 'Row' component, which rendered <td> elements
    // inside <thead> and was semantically incorrect.

    return (
        <thead>
            <tr>
                {columns.map((col, index) => (
                    <th
                        key={index}
                        style={{
                            width: col.width,
                            backgroundColor: '#333', // Dark background for the header
                            color: 'white', // White text for contrast
                            padding: '10px', // Add some padding
                        }}
                    >
                        {col.header}
                    </th>
                ))}
            </tr>
        </thead>
    );
}