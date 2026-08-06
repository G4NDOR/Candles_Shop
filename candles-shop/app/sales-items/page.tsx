'use client';

import mockData from '../mockdata.json';
import Form from '../components/Form';
import Table, { ColumnDefinition } from '../components/Table';

export default function SalesItemsPage() {
    const salesItemsColumns: ColumnDefinition[] = [
        { key: 'id', header: 'Item ID', type: 'int', width: '80px' },
        {
            key: 'sale_id', header: 'Sale ID', type: 'dropdown', width: '80px',
            options: mockData.sales.map(s => ({ value: s.id, label: `Sale #${s.id}` }))
        },
        {
            key: 'candle_id', header: 'Candle', type: 'dropdown',
            options: mockData.candles.map(c => ({ value: c.id, label: c.name }))
        },
        { key: 'quantity', header: 'Quantity', type: 'int' },
        { key: 'price_at_sale', header: 'Price at Sale', type: 'price' },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Sales Items</h1>
                <Form tableName="sales-items" columns={salesItemsColumns} />
    
                <h2>Sales Items List (SELECT, UPDATE, DELETE)</h2>
                <Table
                    columns={salesItemsColumns}
                    tableName="sales-items"
                />
            </main>
        </div>
    );
}