import mysql from 'mysql2/promise';

// Create a connection pool. This is better than creating a new connection for every request.
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

/**
 * Helper function to execute parameterized SQL queries.
 * Returns:
 * - An array of row objects for SELECT queries (e.g., [ { id: 1, ... } ])
 * - An OkPacket/ResultSetHeader object for INSERT/UPDATE/DELETE (with insertId, affectedRows)
 */
export async function executeQuery<T = any>(query: string, values: any[] = []): Promise<T> {
    try {
        const [results] = await pool.query(query, values);
        return results as T;
    } catch (error: any) {
        console.error('[DB Query Error]:', error.message);
        throw error;
    }
}

export default pool;