import { NextResponse } from 'next/server';
import { executeQuery } from '../../../../db';
import { resolveTableInfo } from '../../utils';

export async function PUT(
    request: Request,
    { params }: { params: { tableName: string; id: string } }
) {
    const tableInfo = resolveTableInfo(params.tableName);
    const { id } = params;

    if (!tableInfo) {
        return NextResponse.json({ message: `Table '${params.tableName}' not found.` }, { status: 404 });
    }

    try {
        let body = await request.json();
        
        // Strip out the primary key and 'id' from the body to prevent updating them
        const { [tableInfo.pkColumn]: pkValue, id: genericId, ...updateData } = body;
        body = updateData;

        const columnsToUpdate = Object.keys(body);

        if (columnsToUpdate.length === 0) {
            return NextResponse.json({ message: 'No valid fields provided for update.' }, { status: 400 });
        }

        const setClauses = columnsToUpdate.map(key => `${key} = ?`).join(', ');
        const values = [...Object.values(body), id];

        const query = `UPDATE ${tableInfo.dbTable} SET ${setClauses} WHERE ${tableInfo.pkColumn} = ?`;
        await executeQuery(query, values);

        return new NextResponse(null, { status: 204 }); // No Content
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: { tableName: string; id: string } }
) {
    const tableInfo = resolveTableInfo(params.tableName);
    const { id } = params;

    if (!tableInfo) {
        return NextResponse.json({ message: `Table '${params.tableName}' not found.` }, { status: 404 });
    }

    try {
        const query = `DELETE FROM ${tableInfo.dbTable} WHERE ${tableInfo.pkColumn} = ?`;
        const result: any = await executeQuery(query, [id]);

        if (result.affectedRows === 0) {
            return NextResponse.json({ message: `Item with ID ${id} not found.` }, { status: 404 });
        }
        return new NextResponse(null, { status: 204 }); // No Content
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}