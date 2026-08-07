import { NextRequest, NextResponse } from 'next/server';
import db from './db';

const ALLOWED_TABLES = ['Candles', 'Scents', 'Sizes', 'Customers', 'Employees', 'Sales', 'SalesItems'];

function isTableAllowed(tableName: string) {
    return ALLOWED_TABLES.includes(tableName);
}

/**
 * Handles PUT requests to dynamically update a record in a table.
 * URL: /api/[tableName]/[id]
 * e.g., PUT /api/Candles/5
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { tableName: string; id: string } }
) {
    const { tableName, id } = params;
    const data = await request.json();

    if (!isTableAllowed(tableName)) {
        return NextResponse.json({ message: `Table '${tableName}' is not allowed.` }, { status: 400 });
    }

    // The ID from the URL is the source of truth, not any ID in the body.
    delete data.id;

    // Using the 'SET ?' syntax from mysql2/promise is a secure way to build the update query.
    const sql = `UPDATE \`${tableName}\` SET ? WHERE id = ?`;

    try {
        await db.query(sql, [data, id]);
        return NextResponse.json({ message: 'Record updated successfully' }, { status: 200 });
    } catch (error) {
        console.error(`[API] Failed to UPDATE in ${tableName}:`, error);
        return NextResponse.json({ message: `Failed to update record in ${tableName}.`, error: (error as Error).message }, { status: 500 });
    }
}

/**
 * Handles DELETE requests to dynamically delete a record from a table.
 * URL: /api/[tableName]/[id]
 * e.g., DELETE /api/Candles/5
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { tableName: string; id: string } }
) {
    const { tableName, id } = params;

    if (!isTableAllowed(tableName)) {
        return NextResponse.json({ message: `Table '${tableName}' is not allowed.` }, { status: 400 });
    }

    const sql = `DELETE FROM \`${tableName}\` WHERE id = ?`;

    try {
        const [result] = await db.query(sql, [id]) as any[];
        if (result.affectedRows === 0) {
            // This is useful to let the client know if the item was already deleted.
            return NextResponse.json({ message: `Record with ID ${id} not found in ${tableName}.` }, { status: 404 });
        }
        // A 204 No Content response is standard for a successful DELETE.
        return new NextResponse(null, { status: 204 });
    } catch (error) {
        console.error(`[API] Failed to DELETE from ${tableName}:`, error);
        return NextResponse.json({ message: `Failed to delete record from ${tableName}.`, error: (error as Error).message }, { status: 500 });
    }
}