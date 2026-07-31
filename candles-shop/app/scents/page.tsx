'use client';

export default function ScentsPage() {
    return (
        <main>
            <h1>Scents</h1>
            <h2>Add Scent (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Scent Name" required />
                <button type="submit">Add Scent</button>
            </form>

            <h2>Scents List (SELECT, UPDATE, DELETE)</h2>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Scent Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Lavender</td>
                        <td><button>Edit</button> <button>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}