'use client';

import React from 'react';
import { ColumnDefinition } from './Table';
import InputCell from './Input';

interface FormRowProps {
    columns: ColumnDefinition[];
    rowData: any;
    onUpdate: (updatedData: any) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function FormRow({ columns, rowData, onUpdate, onConfirm, onCancel }: FormRowProps) {
    const handleValueChange = (key: string, value: any) => {
        onUpdate({ ...rowData, [key]: value });
    };

    return (
        <tr style={{ backgroundColor: '#f0f7ff' }}>
            {columns.map(col => (
                <td key={col.key} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                    {col.key === 'id' ? (
                        <div style={{ textAlign: 'center', padding: '8px', color: '#888' }}>
                            {rowData.id} (auto)
                        </div>
                    ) : (
                        <InputCell
                            value={rowData[col.key]}
                            onChange={(newValue) => handleValueChange(col.key, newValue)}
                            type={col.type === 'price' || col.type === 'size_oz' ? 'float' : col.type}
                            options={col.options}
                        />
                    )}
                </td>
            ))}
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                    <button onClick={onConfirm} title="Confirm Insert">✓</button>
                    <button onClick={onCancel} title="Cancel">✗</button>
                </div>
            </td>
        </tr>
    );
}