'use client';

import mockData from '../mockdata.json';
import Table, { ColumnDefinition } from '../components/Table';

export default function CandlesPage() {
    const candleColumns: ColumnDefinition[] = [
        { key: 'id', header: 'ID', type: 'int', width: '50px' },
        { key: 'name', header: 'Name', type: 'string' },
        // In a real app, we would join to get scent and size names. For mock data, we'll show IDs.
        { key: 'scent_id', header: 'Scent ID', type: 'int' },
        { key: 'size_id', header: 'Size ID', type: 'int' },
        { key: 'price', header: 'Price', type: 'price' },
        { key: 'stock_quantity', header: 'Stock', type: 'int' },
    ];

    return (
        <main>
            <h1>Candles</h1>
            <h2>Add Candle (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                {/* This form would have dropdowns for scentId and sizeId in a real implementation */}
                <input type="text" placeholder="Scent Name" required />
                <input type="text" placeholder="Size Label" required />
                <input type="number" placeholder="Price" required />
                <input type="number" placeholder="Stock Quantity" required />
                <button type="submit">Add Candle</button>
            </form>

            <h2>Candles List (SELECT, UPDATE, DELETE)</h2>
            <Table
                columns={candleColumns}
                data={mockData.candles}
                // renderActions={(item) => (
                //     <><button>Edit</button> <button>Delete</button></>
                // )}
            />
        </main>
    );
}