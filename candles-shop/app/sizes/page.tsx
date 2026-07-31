'use client';

export default function SizesPage() {
    return (
        <main>
            <h1>Sizes</h1>
            <h2>Add Size (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Size Name (e.g., 8 oz)" required />
                <button type="submit">Add Size</button>
            </form>

            <h2>Sizes List (SELECT, UPDATE, DELETE)</h2>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Size Name</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>8 oz</td>
                        <td><button>Edit</button> <button>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}