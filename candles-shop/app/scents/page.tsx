'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Table from '../components/Table';
import Form from '../components/Form';
import { getTableColumns } from '../components/ColumnDefinitions';

export default function ScentsPage() {
    const allData = useSelector((state: RootState) => state.data);
    const tableName = 'scents';
    const scentsColumns = getTableColumns(tableName, allData);

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Scents</h1>
                <Form tableName={tableName} columns={scentsColumns} />
                <h2>Scents List (SELECT, UPDATE, DELETE)</h2>
                <Table columns={scentsColumns} tableName={tableName} />
            </main>
        </div>
    );
}