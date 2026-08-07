'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Form from '../components/Form';
import Table from '../components/Table';
import { getTableColumns } from '../components/ColumnDefinitions';

export default function SalesPage() {
    const allData = useSelector((state: RootState) => state.data);
    const tableName = 'sales';
    const salesColumns = getTableColumns(tableName, allData);

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Sales</h1>
                <Form tableName={tableName} columns={salesColumns} />
                <h2>Sales List (SELECT, UPDATE, DELETE)</h2>
                <Table columns={salesColumns} tableName={tableName} />
            </main>
        </div>
    );
}