'use client';

export default function SalesItemsPage() {
    return (
        <main>
            <h1>Sales Items</h1>
            <h2>Add Sales Item (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <select required><option value="">Select Sale ID</option><option value="1">Sale #1</option></select>
                <select required><option value="">Select Candle</option><option value="1">Lavender Breeze</option></select>
                <input type="number" placeholder="Quantity" required />
                <input type="number" step="0.01" placeholder="Unit Price" required />
                <button type="submit">Add Line Item</button>
            </form>

            <h2>Sales Items List (SELECT, UPDATE, DELETE)</h2>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Sale ID</th>
                        <th>Candle</th>
                        <th>Quantity</th>
                        <th>Unit Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>1</td>
                        <td>Lavender Breeze</td>
                        <td>2</td>
                        <td>$14.99</td>
                        <td><button>Edit</button> <button>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}