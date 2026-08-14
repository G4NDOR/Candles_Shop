'use client';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import Form from '../components/Form';
import Table from '../components/Table';
import { getTableColumns } from '../schemaRegistry';
import { useEffect } from 'react';
import { setLoading } from '../components/uiSlice';
import { getTable } from '@/api';
import { setTableData } from '../dataSlice';

export default function SalesPage() {
    const dispatch: AppDispatch = useDispatch();
    const allData = useSelector((state: RootState) => state.data);
    const tableName = 'sales';
    const salesColumns = getTableColumns(tableName, allData);

    // Get current active table & loading state from Redux
    const currentTable = useSelector((state: RootState) => state.data.currentTable);

    useEffect(() => {
        // Guard clause: Ensure currentTable is ready
        if (!currentTable) return;

        async function loadTableData() {
            dispatch(setLoading(true));
            try {
                // Fetch dynamically using currentTable
                const data = await getTable(currentTable);
                dispatch(setTableData({ tableName: currentTable, data }));
            } catch (error) {
                console.error(`Failed to fetch ${currentTable}:`, error);
            } finally {
                dispatch(setLoading(false));
            }
        }

        loadTableData();
    }, [currentTable, dispatch]);

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