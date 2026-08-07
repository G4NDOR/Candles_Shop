// app/components/ResetButton.tsx
'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchAllData, resetDatabase } from '../../api';
import { setNotification, setLoading } from './uiSlice';
import { initializeData } from '../dataSlice';

export default function ResetButton() {
    const dispatch = useDispatch();

    const handleReset = async () => {
        if (!confirm('Are you sure you want to reset the entire database? All current data will be lost and replaced with the initial sample data.')) {
            return;
        }

        dispatch(setLoading(true));
        try {
            await resetDatabase();
            // After a successful reset, re-fetch all data from the server to update the UI.
            const allData = await fetchAllData();
            dispatch(initializeData(allData));
            dispatch(setNotification({ type: 'success', message: 'Database reset successfully!' }));
        } catch (error: any) {
            console.error("Failed to reset database:", error);
            dispatch(setNotification({ type: 'error', message: error.message || 'Failed to reset database.' }));
        } finally {
            dispatch(setLoading(false));
        }
    };

    return (
        <button onClick={handleReset} style={{ backgroundColor: '#dc3545', color: 'white', padding: '10px 15px', border: 'none', borderRadius: '5px', cursor: 'pointer', margin: '20px' }}>
            RESET DATABASE
        </button>
    );
}