'use client';

import mockData from '../mockdata.json';
import Table, { ColumnDefinition } from '../components/Table';

export default function SizesPage() {
    const sizeColumns: ColumnDefinition[] = [
        { key: 'id', header: 'ID', type: 'int', width: '50px' },
        { key: 'name', header: 'Size Label', type: 'string' },
        { key: 'volume_oz', header: 'Volume (oz)', type: 'size_oz' },
    ];

    return (
        <main>
            <h1>Sizes</h1>
            <h2>Add Size (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                <input type="text" placeholder="Size Label" required />
                <input type="number" step="0.1" placeholder="Volume (oz)" required />
                <button type="submit">Add Size</button>
            </form>

            <h2>Sizes List (SELECT, UPDATE, DELETE)</h2>
            <Table
                columns={sizeColumns}
                data={mockData.sizes}
                // renderActions={(item) => (
                //     <><button>Edit</button> <button>Delete</button></>
                // )}
            />
        </main>
    );
}