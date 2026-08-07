'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Form from '../components/Form';
import Table from '../components/Table';
import { getTableColumns } from '../components/ColumnDefinitions';

export default function CandlesPage() {
    const allData = useSelector((state: RootState) => state.data);
    const tableName = 'candles';
    const candleColumns = getTableColumns(tableName, allData);

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Candles</h1>
                <Form tableName={tableName} columns={candleColumns} />
    
                <h2>Candles List (SELECT, UPDATE, DELETE)</h2>
                <Table
                    columns={candleColumns}
                    tableName={tableName}
                />
            </main>
        </div>
    );
}