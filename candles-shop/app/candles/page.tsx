'use client';

import mockData from '../mockdata.json';
import Form from '../components/Form';
import Table, { ColumnDefinition } from '../components/Table';
import { DataType } from '../types';

export default function CandlesPage() {
    const candleColumns: ColumnDefinition[] = [
        { key: 'id', header: 'ID', type: DataType.Int, width: '50px' },
        { key: 'name', header: 'Name', type: DataType.String },
        {
            key: 'scent_id', header: 'Scent', type: DataType.Dropdown,
            options: mockData.scents.map(s => ({ value: s.id, label: s.name }))
        },
        {
            key: 'size_id', header: 'Size', type: DataType.Dropdown,
            options: mockData.sizes.map(s => ({ value: s.id, label: s.name }))
        },
        { key: 'price', header: 'Price', type: 'price' },
        { key: 'stock_quantity', header: 'Stock', type: DataType.Int },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Candles</h1>
                <Form tableName="candles" columns={candleColumns} />
    
                <h2>Candles List (SELECT, UPDATE, DELETE)</h2>
                <Table
                    columns={candleColumns}
                    tableName="candles"
                />
            </main>
        </div>
    );
}