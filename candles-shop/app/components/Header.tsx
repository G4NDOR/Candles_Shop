'use client';

import Link from 'next/link';
import ResetButton from './ResetButton';

const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#333',
    color: 'white',
    borderBottom: '1px solid #444',
};

const logoStyles: React.CSSProperties = {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    textDecoration: 'none',
    color: 'white',
};

export default function Header() {
    return (
        <header style={headerStyles}>
            <nav>
                <Link href="/" style={logoStyles}>Candle Shop POS</Link>
            </nav>
            <ResetButton />
        </header>
    );
}