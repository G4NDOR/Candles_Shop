'use client';

import Form from '../components/Form';
import Table, { ColumnDefinition } from '../components/Table';
import { DataType } from '../types';

export default function CustomersPage() {
    const customerColumns: ColumnDefinition[] = [
        { key: 'customerId', header: 'ID', type: DataType.Int, width: '50px' },
        { key: 'firstName', header: 'First Name', type: DataType.String },
        { key: 'lastName', header: 'Last Name', type: DataType.String },
        { key: 'email', header: 'Email', type: DataType.String },
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