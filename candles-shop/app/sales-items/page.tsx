'use client';

import mockData from '../mockdata.json';
import Table, { ColumnDefinition } from '../components/Table';

export default function SalesItemsPage() {
    const salesItemsColumns: ColumnDefinition[] = [
        { key: 'id', header: 'Item ID', type: 'int', width: '80px' },
        { key: 'sale_id', header: 'Sale ID', type: 'int', width: '80px' },
        { key: 'candle_id', header: 'Candle ID', type: 'int' },
        { key: 'quantity', header: 'Quantity', type: 'int' },
        { key: 'price_at_sale', header: 'Price at Sale', type: 'price' },
    ];

    return (
        <main>
            <h1>Sales Items</h1>
            <h2>Add Sales Item (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                <input type="number" placeholder="Sale ID" required />
                <input type="text" placeholder="Candle" required />
                <input type="number" placeholder="Quantity" required />
                <input type="number" step="0.01" placeholder="Unit Price" required />
                <button type="submit">Add Item</button>
            </form>

            <h2>Sales Items List (SELECT, UPDATE, DELETE)</h2>
            <Table
                columns={salesItemsColumns}
                data={mockData['sales-items']}
                // renderActions={(item) => (
                //     <><button>Edit</button> <button>Delete</button></>
                // )}
            />
        </main>
    );
}