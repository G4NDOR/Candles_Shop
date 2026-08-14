'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const LoadingOverlay = () => {
    const isLoading = useSelector((state: RootState) => state.ui.isLoading);

    if (!isLoading) {
        return null;
    }

    const overlayStyle: React.CSSProperties = {
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
        color: 'white',
        fontSize: '1.5rem',
    };

    return (
        <div style={overlayStyle}>
            <div className="spinner">Loading...</div>
            <style jsx>{`
                .spinner {
                    /* Add a simple animation or use a spinner library */
                    animation: blink 1.5s linear infinite;
                }
                @keyframes blink { 50% { opacity: 0.5; } }
            `}</style>
        </div>
    );
};

export default LoadingOverlay;