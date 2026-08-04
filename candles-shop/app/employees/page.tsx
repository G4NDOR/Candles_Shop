'use client';

import mockData from '../mockdata.json';
import Table, { ColumnDefinition } from '../components/Table';

export default function EmployeesPage() {
    const employeeColumns: ColumnDefinition[] = [
        { key: 'id', header: 'ID', type: 'int', width: '50px' },
        { key: 'first_name', header: 'First Name', type: 'string' },
        { key: 'last_name', header: 'Last Name', type: 'string' },
        { key: 'hire_date', header: 'Hire Date', type: 'date' },
    ];

    return (
        <main>
            <h1>Employees</h1>
            <h2>Add Employee (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '16px' }}>
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="date" placeholder="Hire Date" required />
                <button type="submit">Add Employee</button>
            </form>

            <h2>Employees List (SELECT, UPDATE, DELETE)</h2>
            <Table
                columns={employeeColumns}
                data={mockData.employees}
                // renderActions={(item) => (
                //     <><button>Edit</button> <button>Delete</button></>
                // )}
            />
        </main>
    );
}