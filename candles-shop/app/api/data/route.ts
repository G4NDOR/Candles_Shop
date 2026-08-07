// app/api/data/route.ts

import { NextRequest, NextResponse } from 'next/server';
import db from '@/db';

// Exact casing matching your MySQL database on classmysql.engr.oregonstate.edu
const ALLOWED_TABLES = [
  'Candles',
  'Scents',
  'Sizes',
  'Customers',
  'Employees',
  'Sales',
  'SalesItems'
];

function getMatchingTable(requestedTable: string): string | null {
  if (!requestedTable) return null;

  // Strips hyphens/underscores/spaces for matching (e.g. "sales-items" -> "salesitems")
  const normalizedRequested = requestedTable.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  return (
    ALLOWED_TABLES.find(
      (t) => t.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() === normalizedRequested
    ) || null
  );
}

/**
 * READ (SELECT) Handler
 * URL: GET /api/data?table=Candles
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawTable = searchParams.get('table');

  if (!rawTable) {
    return NextResponse.json({ message: 'Query parameter "table" is required.' }, { status: 400 });
  }

  const tableName = getMatchingTable(rawTable);
  if (!tableName) {
    return NextResponse.json({ message: `Table '${rawTable}' is not allowed.` }, { status: 400 });
  }

  try {
    const [rows] = await db.query(`SELECT * FROM \`${tableName}\`;`);
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error(`[API] Failed to SELECT from ${tableName}:`, error);
    return NextResponse.json(
      { message: `Failed to fetch records from ${tableName}.`, error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * CREATE & RESET Handler
 * URL: POST /api/data
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 1. Reset Database Action
    if (body.action === 'RESET') {
      await db.query('CALL ResetDatabase();');
      return NextResponse.json({ message: 'Database reset successfully' }, { status: 200 });
    }

    // 2. Insert Record Action
    const { table: rawTable, data } = body;
    const tableName = getMatchingTable(rawTable);

    if (!tableName || !data) {
      return NextResponse.json({ message: 'Valid "table" and "data" object required.' }, { status: 400 });
    }

    const keys = Object.keys(data);
    const fields = keys.map((key) => `\`${key}\``).join(', ');
    const placeholders = keys.map(() => '?').join(', ');
    const values = Object.values(data);

    const sql = `INSERT INTO \`${tableName}\` (${fields}) VALUES (${placeholders});`;
    const [result] = await db.query(sql, values);

    return NextResponse.json({ message: 'Record created successfully', result }, { status: 201 });
  } catch (error) {
    console.error('[API] POST failed:', error);
    return NextResponse.json(
      { message: 'Failed to process POST request.', error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * UPDATE Handler
 * URL: PUT /api/data
 * Body: { "table": "Candles", "idColumn": "candle_id", "idValue": 5, "data": { ... } }
 */
export async function PUT(request: NextRequest) {
  try {
    const { table: rawTable, idColumn, idValue, data } = await request.json();
    const tableName = getMatchingTable(rawTable);

    if (!tableName || !idColumn || !idValue || !data) {
      return NextResponse.json(
        { message: 'table, idColumn, idValue, and data payload are required.' },
        { status: 400 }
      );
    }

    const setClause = Object.keys(data)
      .map((key) => `\`${key}\` = ?`)
      .join(', ');
    const values = [...Object.values(data), idValue];

    const sql = `UPDATE \`${tableName}\` SET ${setClause} WHERE \`${idColumn}\` = ?;`;
    await db.query(sql, values);

    return NextResponse.json({ message: 'Record updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('[API] PUT failed:', error);
    return NextResponse.json(
      { message: 'Failed to update record.', error: (error as Error).message },
      { status: 500 }
    );
  }
}

/**
 * DELETE Handler
 * URL: DELETE /api/data?table=Candles&idColumn=candle_id&idValue=5
 */
export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const rawTable = searchParams.get('table');
  const idColumn = searchParams.get('idColumn') || 'id';
  const idValue = searchParams.get('idValue') || searchParams.get('id');

  const tableName = getMatchingTable(rawTable || '');

  if (!tableName || !idValue) {
    return NextResponse.json(
      { message: 'Query parameters "table" and "idValue" (or "id") are required.' },
      { status: 400 }
    );
  }

  const sql = `DELETE FROM \`${tableName}\` WHERE \`${idColumn}\` = ?;`;

  try {
    const [result] = (await db.query(sql, [idValue])) as any[];
    if (result.affectedRows === 0) {
      return NextResponse.json({ message: `Record with ID ${idValue} not found in ${tableName}.` }, { status: 404 });
    }
    return NextResponse.json({ message: 'Record deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error(`[API] Failed to DELETE from ${tableName}:`, error);
    return NextResponse.json(
      { message: 'Failed to delete record.', error: (error as Error).message },
      { status: 500 }
    );
  }
}