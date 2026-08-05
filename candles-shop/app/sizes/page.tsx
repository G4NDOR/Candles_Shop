'use client';

import Form from '../components/Form';
import Table, { ColumnDefinition } from '../components/Table';

export default function SizesPage() {
    const sizeColumns: ColumnDefinition[] = [
        { key: 'id', header: 'ID', type: 'int', width: '50px' },
        { key: 'name', header: 'Size Label', type: 'string' },
        { key: 'volume_oz', header: 'Volume (oz)', type: 'size_oz' },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Sizes</h1>
                <Form tableName="sizes" columns={sizeColumns} />
    
                <h2>Sizes List (SELECT, UPDATE, DELETE)</h2>
                <Table
                    columns={sizeColumns}
                    tableName="sizes"
                />
            </main>
        </div>
    );
}