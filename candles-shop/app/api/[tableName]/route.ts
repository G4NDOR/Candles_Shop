import { NextResponse } from 'next/server';
import { executeQuery } from '../../../db';
import { resolveTableInfo } from '../utils';

export const dynamic = 'force-dynamic';

// Map tables to stored procedure names
const SP_GET_MAP: Record<string, string> = {
    Candles: 'sp_GetCandles',
    Scents: 'sp_GetScents',
    Sizes: 'sp_GetSizes',
    Customers: 'sp_GetCustomers',
    Employees: 'sp_GetEmployees',
    Sales: 'sp_GetSales',
    SalesItems: 'sp_GetSalesItems',
};

const SP_INSERT_MAP: Record<string, string> = {
    Candles: 'sp_InsertCandle',
    Scents: 'sp_InsertScent',
    Sizes: 'sp_InsertSize',
    Customers: 'sp_InsertCustomer',
    Employees: 'sp_InsertEmployee',
    Sales: 'sp_InsertSale',
    SalesItems: 'sp_InsertSalesItem',
};

export async function GET(
    request: Request,
    { params }: { params: { tableName: string } }
) {
    const tableInfo = resolveTableInfo(params.tableName);
    if (!tableInfo) {
        return NextResponse.json({ message: `Table '${params.tableName}' not found.` }, { status: 404 });
    }

    try {
        const spName = SP_GET_MAP[tableInfo.dbTable];
        const [results]: any = await executeQuery(`CALL ${spName}();`);
        const rows = Array.isArray(results[0]) ? results[0] : results;
        return NextResponse.json(rows);
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
        const values = Object.values(body);
        const placeholders = values.map(() => '?').join(', ');
        const spName = SP_INSERT_MAP[tableInfo.dbTable];

        const [results]: any = await executeQuery(`CALL ${spName}(${placeholders});`, values);
        const newRow = results[0];

        return NextResponse.json(newRow, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}