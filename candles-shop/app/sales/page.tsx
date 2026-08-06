'use client';

import mockData from '../mockdata.json';
import Form from '../components/Form';
import Table, { ColumnDefinition } from '../components/Table';

export default function SalesPage() {
    const saleColumns: ColumnDefinition[] = [
        { key: 'id', header: 'Sale ID', type: 'int', width: '80px' },
        { key: 'sale_date', header: 'Timestamp', type: 'date' },
        {
            key: 'customer_id', header: 'Customer', type: 'dropdown',
            options: mockData.customers.map(c => ({
                value: c.id, label: `${c.first_name} ${c.last_name}`
            }))
        },
        {
            key: 'employee_id', header: 'Employee', type: 'dropdown',
            options: mockData.employees.map(e => ({
                value: e.id, label: `${e.first_name} ${e.last_name}`
            }))
        },
        { key: 'total_amount', header: 'Total', type: 'price' },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Sales</h1>
                <Form tableName="sales" columns={saleColumns} />
    
                <h2>Sales List (SELECT, UPDATE, DELETE)</h2>
                <Table
                    columns={saleColumns}
                    tableName="sales"
                />
            </main>
        </div>
    );
}