import { NextResponse } from 'next/server';
import { executeQuery } from '../../../../db';
import { resolveTableInfo } from '../../utils';

export const dynamic = 'force-dynamic';

const SP_DELETE_MAP: Record<string, string> = {
    Candles: 'sp_DeleteCandle',
    Scents: 'sp_DeleteScent',
    Sizes: 'sp_DeleteSize',
    Customers: 'sp_DeleteCustomer',
    Employees: 'sp_DeleteEmployee',
    Sales: 'sp_DeleteSale',
    SalesItems: 'sp_DeleteSalesItem',
};

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

        return new NextResponse(null, { status: 204 });
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
        const spName = SP_DELETE_MAP[tableInfo.dbTable];
        await executeQuery(`CALL ${spName}(?);`, [id]);
        
        return new NextResponse(null, { status: 204 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}