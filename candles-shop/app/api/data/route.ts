// Path: app/api/data/route.ts
import { NextResponse } from 'next/server';
import db from '../../../db';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const [candles] = await db.query('SELECT * FROM Candles');
        const [scents] = await db.query('SELECT * FROM Scents');
        const [sizes] = await db.query('SELECT * FROM Sizes');
        const [customers] = await db.query('SELECT * FROM Customers');
        const [employees] = await db.query('SELECT * FROM Employees');
        const [sales] = await db.query('SELECT * FROM Sales');
        const [salesItems] = await db.query('SELECT * FROM SalesItems');

        return NextResponse.json({
            candles,
            scents,
            sizes,
            customers,
            employees,
            sales,
            'sales-items': salesItems,
        }, { status: 200 });
    } catch (error) {
        console.error('[API] Fetching data failed:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}