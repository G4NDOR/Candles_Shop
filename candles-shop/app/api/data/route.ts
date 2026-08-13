import { NextResponse } from 'next/server';
import db from '../../../db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
    try {
const [candlesRes]: any = await db.query('CALL sp_GetCandles();');
        const [scentsRes]: any = await db.query('CALL sp_GetScents();');
        const [sizesRes]: any = await db.query('CALL sp_GetSizes();');
        const [customersRes]: any = await db.query('CALL sp_GetCustomers();');
        const [employeesRes]: any = await db.query('CALL sp_GetEmployees();');
        const [salesRes]: any = await db.query('CALL sp_GetSales();');
        const [salesItemsRes]: any = await db.query('CALL sp_GetSalesItems();');
        
        return NextResponse.json({
            candles: candlesRes[0],
            scents: scentsRes[0],
            sizes: sizesRes[0],
            customers: customersRes[0],
            employees: employeesRes[0],
            sales: salesRes[0],
            'sales-items': salesItemsRes[0],
        }, { status: 200 });
    } catch (error: any) {
        console.error('[API] Fetching data failed:', error);
        return NextResponse.json({ error: error.message || 'Failed to fetch data' }, { status: 500 });
    }
}