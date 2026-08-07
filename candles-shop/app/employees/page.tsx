'use client';

import Form from '../components/Form';
import Table, { ColumnDefinition } from '../components/Table';
import { DataType } from '../types';

export default function EmployeesPage() {
    const employeeColumns: ColumnDefinition[] = [
        { key: 'id', header: 'ID', type: DataType.Int, width: '50px' },
        { key: 'first_name', header: 'First Name', type: DataType.String },
        { key: 'last_name', header: 'Last Name', type: DataType.String },
        { key: 'hire_date', header: 'Hire Date', type: DataType.Date },
    ];

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Employees</h1>
                <Form tableName="employees" columns={employeeColumns} />
    
                <h2>Employees List (SELECT, UPDATE, DELETE)</h2>
                <Table
                    columns={employeeColumns}
                    tableName="employees"
                />
            </main>
        </div>
    );
}