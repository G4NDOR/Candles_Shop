'use client';

import React from 'react';
import { ColumnDefinition } from './Table';
import { DataType } from '../types';
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
            {columns.map((col, index) => {
                const isPrimaryKey = col.key === 'id' || index === 0;

                return (
                    <td key={col.key} style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
                        {isPrimaryKey ? (
                            <div style={{ textAlign: 'center', padding: '8px', color: '#888' }}>
                                {rowData[col.key] ?? rowData.id} (auto)
                            </div>
                        ) : (
                            <InputCell
                                value={rowData[col.key] ?? ''}
                                onChange={(newValue) => handleValueChange(col.key, newValue)}
                                type={col.type === 'price' || col.type === 'size_oz' ? DataType.Float : (col.type as DataType)}
                                options={col.options}
                            />
                        )}
                    </td>
                );
            })}
            <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textAlign: 'right' }}>
                <div style={{ display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                    <button onClick={onConfirm} title="Confirm Insert">✓</button>
                    <button onClick={onCancel} title="Cancel">✗</button>
                </div>
            </td>
        </tr>
    );
}