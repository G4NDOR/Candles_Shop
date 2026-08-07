import { NextResponse } from 'next/server';
import { executeQuery } from '../../../db';
import { resolveTableInfo } from '../utils';

export async function GET(
    request: Request,
    { params }: { params: { tableName: string } }
) {
    const tableInfo = resolveTableInfo(params.tableName);

    if (!tableInfo) {
        return NextResponse.json({ message: `Table '${params.tableName}' not found.` }, { status: 404 });
    }

    try {
        const results = await executeQuery(`SELECT * FROM ${tableInfo.dbTable}`);
        return NextResponse.json(results);
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function POST(
    request: Request,
    { params }: { params: { tableName: string } }
) {
    const tableInfo = resolveTableInfo(params.tableName);

    if (!tableInfo) {
        return NextResponse.json({ message: `Table '${params.tableName}' not found.` }, { status: 404 });
    }

    try {
        const body = await request.json();
        const columns = Object.keys(body).join(', ');
        const values = Object.values(body);
        const placeholders = values.map(() => '?').join(', ');

        const query = `INSERT INTO ${tableInfo.dbTable} (${columns}) VALUES (${placeholders})`;
        const result: any = await executeQuery(query, values);

        if (result.insertId) {
            const [newRow] = await executeQuery(`SELECT * FROM ${tableInfo.dbTable} WHERE ${tableInfo.pkColumn} = ?`, [result.insertId]);
            return NextResponse.json(newRow, { status: 201 });
        } else {
            return NextResponse.json({ message: "Insert failed, no ID returned." }, { status: 500 });
        }
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}