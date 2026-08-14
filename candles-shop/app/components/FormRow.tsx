'use client';

import React from 'react';
import { ColumnDefinition } from './Table';
import InputCell from './Input';
import { PRIMARY_KEYS } from '../schemaRegistry';
import mockData from '../mockdata.json';

interface FormRowProps {
    columns: ColumnDefinition[];
    rowData: any;
    tableName: keyof typeof mockData;
    onUpdate: (updatedData: any) => void;
    onConfirm: () => void;
    onCancel: () => void;
}

export default function FormRow({ columns, rowData, tableName, onUpdate, onConfirm, onCancel }: FormRowProps) {
    const primaryKey = PRIMARY_KEYS[tableName];

    const handleValueChange = (key: string, value: any) => {
        onUpdate({ ...rowData, [key]: value });
    };

    return (
        <tr>
            {columns.map(col => (
                <td key={col.key} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                    {col.key === primaryKey ? (
                        <span style={{ color: '#999', fontStyle: 'italic' }}>(auto)</span>
                    ) : (
                        <InputCell
                            value={rowData[col.key]}
                            type={col.type}
                            options={col.options}
                            onChange={(newValue) => handleValueChange(col.key, newValue)}
                        />
                    )}
                </td>
            ))}
            <td style={{
                padding: '8px',
                borderBottom: '1px solid #ddd',
                textAlign: 'right',
                verticalAlign: 'middle'
            }}>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                    <button onClick={onConfirm} title="Confirm Add">✓</button>
                    <button onClick={onCancel} title="Cancel">✗</button>
                </div>
            </td>
        </tr>
    );
}