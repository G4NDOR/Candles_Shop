'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Form from '../components/Form';
import Table from '../components/Table';
import { getTableColumns } from '../components/ColumnDefinitions';

export default function CustomersPage() {
    const allData = useSelector((state: RootState) => state.data);
    const tableName = 'customers';
    const customerColumns = getTableColumns(tableName, allData);

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Customers</h1>
                <Form tableName={tableName} columns={customerColumns} />
                <h2>Customers List (SELECT, UPDATE, DELETE)</h2>
                <Table columns={customerColumns} tableName={tableName} />
            </main>
        </div>
    );
}