'use client';

// app/components/Cell.tsx
import React, { useState, useEffect } from 'react';
import InputCell from './Input';

interface CellProps {
    value: any;
    type?: 'string' | 'int' | 'price' | 'date' | 'size_oz' | 'dropdown';
    options?: { value: string | number, label: string }[]; // For dropdown type
    isRowEditing: boolean;
    isCellEditing: boolean;
    isEditable: boolean;
    onCellEditStart: () => void;
    onCellEditCancel: () => void;
    onCellEditSave: (newValue: any) => void;
    onValueChange: (newValue: any) => void;
}

export default function Cell({ value, type = 'string', options, isRowEditing, isCellEditing, isEditable, onCellEditStart, onCellEditCancel, onCellEditSave, onValueChange }: CellProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [cellValue, setCellValue] = useState(value);

    useEffect(() => {
        setCellValue(value);
    }, [value]);

    // Map 'price' and 'size_oz' to a more generic 'float' for the InputCell
    const inputType = (t: typeof type) => {
        if (t === 'price' || t === 'size_oz') return 'float';
        return t;
    };

    const handleSave = () => {
        onCellEditSave(cellValue);
    };

    if (isRowEditing && isEditable) {
        return (
            <InputCell
                value={value}
                onChange={onValueChange}
                type={inputType(type)}
                options={options}
            />
        );
    }

    let displayValue: React.ReactNode = value;

    if (isCellEditing) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'space-between', width: '100%' }}>
                <InputCell
                    value={cellValue}
                    onChange={setCellValue}
                    type={inputType(type)}
                    options={options}
                />
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <button onClick={handleSave} style={{ padding: '2px 4px', lineHeight: '1' }}>✓</button>
                    <button onClick={onCellEditCancel} style={{ padding: '2px 4px', lineHeight: '1' }}>✗</button>
                </div>
            </div>
        );
    }

    switch (type) {
        case 'price':
            displayValue = value !== null && value !== undefined ? `$${parseFloat(value).toFixed(2)}` : '';
            break;
        case 'date':
            // Assuming data is a valid date string or Date object
            try {
                displayValue = new Date(value).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric'
                });
            } catch (e) {
                displayValue = value; // Fallback if date is invalid
            }
            break;
        case 'size_oz':
            displayValue = `${value} oz`;
            break;
        case 'dropdown':
            // For dropdowns, find the label corresponding to the current value (the ID)
            const selectedOption = options?.find(opt => opt.value == value);
            displayValue = selectedOption ? selectedOption.label : value;
            break;

        // 'string' and 'int' types display data as is, which is the default.
    }

    return (
        <div
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                textAlign: 'center',
                padding: '4px 32px 4px 4px', // Increased right padding for edit button
                position: 'relative',
                minHeight: '38px', // Match height of input for consistency
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            {displayValue}
            {isHovered && isEditable && !isRowEditing && !isCellEditing && (
                <button
                    onClick={onCellEditStart}
                    style={{
                        position: 'absolute',
                        right: '5px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        border: 'none',
                        background: 'rgba(200, 200, 200, 0.7)',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0',
                        lineHeight: '1',
                    }}
                    title="Edit Cell"
                >✏️</button>
            )}
        </div>
    );
}
