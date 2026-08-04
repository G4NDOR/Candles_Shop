'use client';

import mockData from '../mockdata.json';
import Table, { ColumnDefinition } from '../components/Table';

export default function SalesPage() {
    const saleColumns: ColumnDefinition[] = [
        { key: 'id', header: 'Sale ID', type: 'int', width: '80px' },
        { key: 'sale_date', header: 'Timestamp', type: 'date' },
        { key: 'customer_id', header: 'Customer ID', type: 'int' },
        { key: 'employee_id', header: 'Employee ID', type: 'int' },
        { key: 'total_amount', header: 'Total', type: 'price' },
    ];

    return (
        <main>
            <h1>Sales</h1>
            <h2>Add Sale (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                {/* In a real app, these would be dropdowns populated from the database */}
                <input type="text" placeholder="Customer Name" required />
                <input type="text" placeholder="Employee Name" required />
                <input type="number" step="0.01" placeholder="Total Amount" required />
                <button type="submit">Add Sale</button>
            </form>

            <h2>Sales List (SELECT, UPDATE, DELETE)</h2>
            <Table
                columns={saleColumns}
                data={mockData.sales}
                // renderActions={(item) => (
                //     <><button>Edit</button> <button>Delete</button></>
                // )}
            />
        </main>
    );
}