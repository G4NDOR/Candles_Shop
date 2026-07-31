'use client';

export default function CustomersPage() {
    return (
        <main>
            <h1>Customers</h1>
            <h2>Add Customer (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
                <input type="email" placeholder="Email" required />
                <button type="submit">Add Customer</button>
            </form>

            <h2>Customers List (SELECT, UPDATE, DELETE)</h2>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Jane</td>
                        <td>Doe</td>
                        <td>jane@example.com</td>
                        <td><button>Edit</button> <button>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}