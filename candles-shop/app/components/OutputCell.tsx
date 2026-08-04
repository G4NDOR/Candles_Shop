'use client';

// app/components/OutputCell.tsx
import React from 'react';

interface OutputCellProps {
    data: any;
    type?: 'string' | 'int' | 'price' | 'date' | 'size_oz';
}

export default function OutputCell({ data, type = 'string' }: OutputCellProps) {
    let displayData: React.ReactNode = data;

    switch (type) {
        case 'price':
            displayData = `$${parseFloat(data).toFixed(2)}`;
            break;
        case 'date':
            // Assuming data is a valid date string or Date object
            try {
                displayData = new Date(data).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                });
            } catch (e) {
                displayData = data; // Fallback if date is invalid
            }
            break;
        case 'size_oz':
            displayData = `${data} oz`;
            break;
        // 'string' and 'int' types display data as is, which is the default.
    }

    // The component should only return the formatted data, not the table cell element.
    // To center the information, wrap it in a div with text-align: center
    return <div style={{ textAlign: 'center', padding: '4px' }}>{displayData}</div>;
}
