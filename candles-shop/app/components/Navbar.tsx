'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { resolveTableInfo } from '../schemaRegistry';
import { setCurrentTable } from '../dataSlice';

const navLinks = [
    { href: '/scents', label: 'Scents' },
    { href: '/sizes', label: 'Sizes' },
    { href: '/candles', label: 'Candles' },
    { href: '/customers', label: 'Customers' },
    { href: '/employees', label: 'Employees' },
    { href: '/sales', label: 'Sales' },
    { href: '/sales-items', label: 'Sales Items' },
];

const Navbar = () => {
    const pathname = usePathname();
    const dispatch = useDispatch();

    // Automatically sync Redux `currentTable` whenever the route/URL changes!
    useEffect(() => {
        const cleanPath = pathname.replace('/', '');
        const tableInfo = resolveTableInfo(cleanPath);
        if (tableInfo) {
            dispatch(setCurrentTable(tableInfo.feKey));
        }
    }, [pathname, dispatch]);
    const navStyle: React.CSSProperties = {
        backgroundColor: '#ffffff',
        padding: '0 2rem',
        display: 'flex',
        justifyContent: 'center',
        gap: '2rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        height: '60px',
        alignItems: 'center',
    };

    const linkStyle: React.CSSProperties = {
        color: '#333',
        textDecoration: 'none',
        fontSize: '1rem',
        fontWeight: 600,
        padding: '0.5rem 1rem',
        borderRadius: '6px',
        transition: 'background-color 0.2s ease-in-out',
    };

    return (
        <nav style={navStyle}>
            {navLinks.map(link => <Link key={link.href} href={link.href} style={linkStyle}>{link.label}</Link>)}
        </nav>
    );
};

export default Navbar;