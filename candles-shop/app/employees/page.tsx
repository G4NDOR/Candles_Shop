'use client';

import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Form from '../components/Form';
import Table from '../components/Table';
import { getTableColumns } from '../components/ColumnDefinitions';

export default function EmployeesPage() {
    const allData = useSelector((state: RootState) => state.data);
    const tableName = 'employees';
    const employeeColumns = getTableColumns(tableName, allData);

    return (
        <div style={{ padding: '2rem' }}>
            <main>
                <h1>Employees</h1>
                <Form tableName={tableName} columns={employeeColumns} />
                <h2>Employees List (SELECT, UPDATE, DELETE)</h2>
                <Table columns={employeeColumns} tableName={tableName} />
            </main>
        </div>
    );
}