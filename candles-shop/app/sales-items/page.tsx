'use client';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import Form from '../components/Form';
import Table from '../components/Table';
import { getTableColumns } from '../components/ColumnDefinitions';
import { useEffect } from 'react';
import { getTable } from '@/api';
import { setTableData } from '../dataSlice';

export default function SalesItemsPage() {
    const dispatch: AppDispatch = useDispatch();
    const allData = useSelector((state: RootState) => state.data);
    const tableName = 'sales-items';
    const salesItemsColumns = getTableColumns(tableName, allData);

    useEffect(() => {
        async function loadCandles() {
            try {
                // 1. Fetch straight from API
                const data = await getTable('sales-items');
                
                // 2. Dispatch to Redux (Just like initializeData!)
                dispatch(setTableData({ tableName: 'sales-items', data }));
            } catch (error) {
                console.error("Failed to fetch candles:", error);
            }
        }

        loadCandles();
    }, [dispatch]);

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