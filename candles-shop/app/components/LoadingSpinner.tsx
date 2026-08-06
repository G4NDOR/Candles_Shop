'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const LoadingSpinner: React.FC = () => {
    const isLoading = useSelector((state: RootState) => state.ui.isLoading);

    if (!isLoading) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
        }}>
            <div style={{
                border: '8px solid #f3f3f3',
                borderTop: '8px solid #3498db',
                borderRadius: '50%',
                width: '60px',
                height: '60px',
                animation: 'spin 1s linear infinite',
            }}></div>
            <style>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </div>
    );
};

export default LoadingSpinner;