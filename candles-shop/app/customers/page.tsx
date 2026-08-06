'use client';

import Form from '../components/Form';
import Table, { ColumnDefinition } from '../components/Table';

export default function CustomersPage() {
    const customerColumns: ColumnDefinition[] = [
        { key: 'id', header: 'ID', type: 'int', width: '50px' },
        { key: 'first_name', header: 'First Name', type: 'string' },
        { key: 'last_name', header: 'Last Name', type: 'string' },
        { key: 'email', header: 'Email', type: 'string' },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Customers</h1>
                <Form tableName="customers" columns={customerColumns} />
    
                <h2>Customers List (SELECT, UPDATE, DELETE)</h2>
                <Table
                    columns={customerColumns}
                    tableName="customers"
                />
            </main>
        </div>
    );
}