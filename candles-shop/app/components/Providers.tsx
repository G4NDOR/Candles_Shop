// app/components/Providers.tsx
'use client';

import { Provider, useDispatch } from 'react-redux';
import { AppDispatch, store } from '../store';
import { ReactNode, useEffect } from 'react';
import { initializeData } from '../dataSlice';
import { fetchAllData } from '../../api';
import { setLoading, setNotification } from './uiSlice';

function AppInitializer({ children }: { children: ReactNode }) {
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            dispatch(setLoading(true));
            try {
                const allData = await fetchAllData();
                dispatch(initializeData(allData));
            } catch (error: any) {
                dispatch(setNotification({ type: 'error', message: `Failed to load initial data: ${error.message}` }));
            } finally {
                dispatch(setLoading(false));
            }
        };
        loadData();
    }, [dispatch]);

    return <>{children}</>;
}

export function Providers({ children }: { children: ReactNode }) {
    return <Provider store={store}><AppInitializer>{children}</AppInitializer></Provider>;
}