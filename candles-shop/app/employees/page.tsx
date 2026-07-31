'use client';

export default function EmployeesPage() {
    return (
        <main>
            <h1>Employees</h1>
            <h2>Add Employee (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <button type="submit">Add Employee</button>
            </form>

            <h2>Employees List (SELECT, UPDATE, DELETE)</h2>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>John</td>
                        <td>Smith</td>
                        <td><button>Edit</button> <button>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}