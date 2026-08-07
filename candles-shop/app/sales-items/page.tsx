'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Form from '../components/Form';
import Table from '../components/Table';
import { getTableColumns } from '../components/ColumnDefinitions';

export default function SalesItemsPage() {
    const allData = useSelector((state: RootState) => state.data);
    const tableName = 'sales-items';
    const salesItemsColumns = getTableColumns(tableName, allData);

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Sales Items</h1>
                <Form tableName={tableName} columns={salesItemsColumns} />
    
                <h2>Sales Items List (SELECT, UPDATE, DELETE)</h2>
                <Table
                    columns={salesItemsColumns}
                    tableName={tableName}
                />
            </main>
        </div>
    );
}