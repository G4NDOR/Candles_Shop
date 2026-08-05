'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';

interface InputCellProps {
    value: any;
    onChange: (newValue: any) => void;
    type?: 'string' | 'int' | 'float' | 'date' | 'dropdown';
    options?: { value: string | number, label: string }[]; // For dropdown type
    placeholder?: string;
    min?: number;
    max?: number;
    required?: boolean;
    style?: React.CSSProperties; // Allows parent to pass custom styles
}

export default function InputCell({
    value,
    onChange,
    type = 'string',
    options,
    placeholder,
    min,
    max,
    required = false,
    style,
}: InputCellProps) {
    const [inputValue, setInputValue] = useState<any>(value);
    const [isValid, setIsValid] = useState<boolean>(true);

    // Update internal state when external value prop changes
    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        let newValue: any = e.target.value;
        let currentIsValid = true;

        switch (type) {
            case 'int':
                const intValue = parseInt(newValue, 10);
                if (isNaN(intValue) && newValue !== '') { // Allow empty string for clearing
                    currentIsValid = false;
                } else {
                    newValue = isNaN(intValue) ? '' : intValue;
                    if (min !== undefined && newValue < min) currentIsValid = false;
                    if (max !== undefined && newValue > max) currentIsValid = false;
                }
                break;
            case 'float':
                const floatValue = parseFloat(newValue);
                if (isNaN(floatValue) && newValue !== '') { // Allow empty string for clearing
                    currentIsValid = false;
                } else {
                    newValue = isNaN(floatValue) ? '' : parseFloat(floatValue.toFixed(2)); // Store as number, format on display if needed
                    if (min !== undefined && newValue < min) currentIsValid = false;
                    if (max !== undefined && newValue > max) currentIsValid = false;
                }
                break;
            case 'date':
                // HTML input type="date" handles basic validation.
                // We just ensure it's a valid date string or empty.
                if (newValue && !isNaN(new Date(newValue).getTime())) {
                    // Ensure it's in YYYY-MM-DD format for consistency
                    newValue = new Date(newValue).toISOString().split('T')[0];
                } else if (newValue !== '') {
                    currentIsValid = false;
                }
                break;
            case 'string':
            case 'dropdown':
            default:
                // No specific validation for string or dropdown value beyond required
                break;
        }

        if (required && newValue === '') {
            currentIsValid = false;
        }

        setInputValue(newValue);
        setIsValid(currentIsValid);
        if (currentIsValid) {
            onChange(newValue);
        }
    };

    const baseStyle: React.CSSProperties = {
        width: '100%',
        padding: '8px',
        border: isValid ? '1px solid #ccc' : '1px solid red',
        borderRadius: '4px',
        boxSizing: 'border-box', // Ensure padding and border are included in the element's total width and height
        ...style, // Merge with any custom styles passed in props
    };

    switch (type) {
        case 'dropdown':
            if (!options) {
                console.warn("InputCell: 'options' prop is required for type 'dropdown'.");
                return <span style={{ color: 'red' }}>Error: Dropdown options missing.</span>;
            }
            return (
                <select
                    value={inputValue}
                    onChange={handleChange}
                    style={baseStyle}
                    required={required}
                >
                    {placeholder && <option value="" disabled={required}>{placeholder}</option>}
                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            );
        case 'date':
            // Format date value to YYYY-MM-DD for input type="date"
            const formattedDateValue = inputValue instanceof Date
                ? inputValue.toISOString().split('T')[0]
                : (typeof inputValue === 'string' && !isNaN(new Date(inputValue).getTime())
                    ? new Date(inputValue).toISOString().split('T')[0]
                    : '');
            return (
                <input
                    type="date"
                    value={formattedDateValue}
                    onChange={handleChange}
                    style={baseStyle}
                    required={required}
                />
            );
        case 'int':
            return (
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    style={baseStyle}
                    step="1"
                    min={min}
                    max={max}
                    required={required}
                />
            );
        case 'float':
            return (
                <input
                    type="number"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    style={baseStyle}
                    step="0.01"
                    min={min}
                    max={max}
                    required={required}
                />
            );
        case 'string':
        default:
            return (
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleChange}
                    placeholder={placeholder}
                    style={baseStyle}
                    required={required}
                />
            );
    }
}