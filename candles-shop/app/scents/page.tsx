'use client';

import Table, { ColumnDefinition } from '../components/Table'; // Import ColumnDefinition type
import Form from '../components/Form';
export default function ScentsPage() {
    // Define columns for the Table component
    const scentColumns: ColumnDefinition[] = [
        { key: 'id', header: 'ID', type: 'int', width: '50px' },
        { key: 'name', header: 'Scent Name', type: 'string' },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Scents</h1>
                <Form tableName="scents" columns={scentColumns} />
    
                <h2>Scents List (SELECT, UPDATE, DELETE)</h2>
                <Table
                    columns={scentColumns}
                    tableName="scents"
                />
            </main>
        </div>
    );
}