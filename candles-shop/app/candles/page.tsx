'use client';

import mockData from '../mockdata.json';
import Form from '../components/Form';
import Table, { ColumnDefinition } from '../components/Table';

export default function CandlesPage() {
    const candleColumns: ColumnDefinition[] = [
        { key: 'id', header: 'ID', type: 'int', width: '50px' },
        { key: 'name', header: 'Name', type: 'string' },
        {
            key: 'scent_id', header: 'Scent', type: 'dropdown',
            options: mockData.scents.map(s => ({ value: s.id, label: s.name }))
        },
        {
            key: 'size_id', header: 'Size', type: 'dropdown',
            options: mockData.sizes.map(s => ({ value: s.id, label: s.name }))
        },
        { key: 'price', header: 'Price', type: 'price' },
        { key: 'stock_quantity', header: 'Stock', type: 'int' },
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