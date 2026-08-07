'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { getTableColumns } from '../components/ColumnDefinitions';
import Form from '../components/Form';
import Table from '../components/Table';

export default function SizesPage() {
    const allData = useSelector((state: RootState) => state.data);
    const tableName = 'sizes';
    const sizesColumns = getTableColumns(tableName, allData);

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Sizes</h1>
                <Form tableName={tableName} columns={sizesColumns} />
                <h2>Sizes List (SELECT, UPDATE, DELETE)</h2>
                <Table columns={sizesColumns} tableName={tableName} />
            </main>
        </div>
    );
}