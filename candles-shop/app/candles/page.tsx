'use client';

export default function CandlesPage() {
    return (
        <main>
            <h1>Candles</h1>

            <h2>Add Candle (INSERT)</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <input type="text" placeholder="Candle Name" required />
                <select required><option value="">Select Scent</option><option value="1">Lavender</option></select>
                <select required><option value="">Select Size</option><option value="1">8 oz</option></select>
                <input type="number" step="0.01" placeholder="Price" required />
                <input type="number" placeholder="Stock Quantity" required />
                <button type="submit">Add Candle</button>
            </form>

            <h2>Candles List (SELECT, UPDATE, DELETE)</h2>
            <table style={{ border: '1px solid black', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Scent</th>
                        <th>Size</th>
                        <th>Price</th>
                        <th>Stock</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Lavender Breeze</td>
                        <td>Lavender</td>
                        <td>8 oz</td>
                        <td>$14.99</td>
                        <td>25</td>
                        <td><button>Edit</button> <button>Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}