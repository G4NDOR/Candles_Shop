'use client';

export default function SalesPage() {
    return (
        <main>
            <h1>Sales</h1>
            <h2>Add Sale (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <select required>
                    <option value="">Select Customer</option>
                    <option value="1">Jane Doe</option>
                </select>
                <select required>
                    <option value="">Select Employee</option>
                    <option value="1">John Smith</option>
                </select>
                <input type="date" required />
                <input type="number" step="0.01" placeholder="Total Amount" required />
                <button type="submit">Add Sale</button>
            </form>

            <h2>Sales List (SELECT, UPDATE, DELETE)</h2>
            <table border={1} cellPadding="6">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Employee</th>
                        <th>Date</th>
                        <th>Total</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Jane Doe</td>
                        <td>John Smith</td>
                        <td>2026-07-30</td>
                        <td>$29.98</td>
                        <td><button>Edit</button> <button>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}