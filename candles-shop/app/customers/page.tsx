'use client';

import mockData from '../mockdata.json';
import Table, { ColumnDefinition } from '../components/Table';

export default function CustomersPage() {
    const customerColumns: ColumnDefinition[] = [
        { key: 'id', header: 'ID', type: 'int', width: '50px' },
        { key: 'first_name', header: 'First Name', type: 'string' },
        { key: 'last_name', header: 'Last Name', type: 'string' },
        { key: 'email', header: 'Email', type: 'string' },
    ];

    return (
        <main>
            <h1>Customers</h1>
            <h2>Add Customer (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="email" placeholder="Email" required />
                <button type="submit">Add Customer</button>
            </form>

            <h2>Customers List (SELECT, UPDATE, DELETE)</h2>
            <Table
                columns={customerColumns}
                data={mockData.customers}
                // renderActions={(item) => (
                //     <><button>Edit</button> <button>Delete</button></>
                // )}
            />
        </main>
    );
}