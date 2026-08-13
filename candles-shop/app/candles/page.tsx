'use client';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import Form from '../components/Form';
import Table from '../components/Table';
import { getTableColumns } from '../components/ColumnDefinitions';
import { useEffect } from 'react';
import { getTable } from '@/api';
import { setTableData } from '../dataSlice';

export default function CandlesPage() {
    const dispatch: AppDispatch = useDispatch();
    const allData = useSelector((state: RootState) => state.data);
    const tableName = 'candles';
    const candleColumns = getTableColumns(tableName, allData);

    useEffect(() => {
        async function loadCandles() {
            try {
                // 1. Fetch straight from API
                const data = await getTable('candles');
                
                // 2. Dispatch to Redux (Just like initializeData!)
                dispatch(setTableData({ tableName: 'candles', data }));
            } catch (error) {
                console.error("Failed to fetch candles:", error);
            }
        }

        loadCandles();
    }, [dispatch]);

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