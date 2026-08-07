'use client';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { setNotification } from './uiSlice';

const Notification: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const notification = useSelector((state: RootState) => state.ui.notification);

    useEffect(() => {
        console.log("component mounted")
        return () => {
            console.log("component unmounted")
        };
    }, []);


    useEffect(() => {
        if (notification) {
            console.log("[Notification.tsx] Notification state change in redux", notification)
            const timer = setTimeout(() => {
                dispatch(setNotification(null));
            }, 3000); // Auto-hide after 3 seconds

            return () => clearTimeout(timer);
        }
    }, [notification, notification?.message, notification?.type, dispatch]);

    if (!notification) return null;

    const backgroundColor = notification.type === 'success' ? '#4CAF50' : '#f44336';

    return (
        <div style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            padding: '15px 20px',
            backgroundColor,
            color: 'white',
            borderRadius: '5px',
            zIndex: 10000,
            boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
        }}>
            <span>{notification.message}</span>
            <button onClick={() => dispatch(setNotification(null))} style={{ background: 'none', border: 'none', color: 'white', fontSize: '16px', cursor: 'pointer' }}>&times;</button>
        </div>
    );
};

export default Notification;