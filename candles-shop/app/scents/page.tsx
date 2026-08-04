'use client';

import { useState } from 'react';
import mockData from '../mockdata.json'; // Import mock data
import Table, { ColumnDefinition } from '../components/Table'; // Import ColumnDefinition type
// Row is no longer directly used here, as Table handles rendering rows

export default function ScentsPage() {
    // Define columns for the Table component
    const scentColumns: ColumnDefinition[] = [
        { key: 'id', header: 'ID', type: 'int', width: '50px' },
        { key: 'name', header: 'Scent Name', type: 'string' },
    ];

    // Function to handle adding a new scent (placeholder for now)
    const handleAddScent = (e: React.FormEvent) => {
        e.preventDefault();
    };
    return (
        <main>
            <h1>Scents</h1>
            <h2>Add Scent (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Scent Name" required style={{ marginRight: '8px' }}/>
                <button type="submit">Add Scent</button>
            </form>

            <h2>Scents List (SELECT, UPDATE, DELETE)</h2>
            <Table
                columns={scentColumns}
                data={mockData.scents}
                //renderActions={(item) => (
                //    <>
                //        <button onClick={() => alert(`Edit ${item.scentName}`)}>Edit</button>
                //        <button onClick={() => alert(`Delete ${item.scentName}`)}>Delete</button>
                //    </>
                //)}
            />
        </main>
    );
}