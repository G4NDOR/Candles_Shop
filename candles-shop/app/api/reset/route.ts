import { NextResponse } from 'next/server';
import db from '../../../db';

export const dynamic = 'force-dynamic';

export async function POST() {
    try {
        await db.query('CALL ResetDatabase();');
        console.log('[API] Reset successful: Executed ResetDatabase() procedure.');
        return NextResponse.json({ message: 'Database reset successfully!' }, { status: 200 });
    } catch (error: any) {
        console.error('[API] Reset failed:', error);
        return NextResponse.json({ error: error.message || 'Failed to reset database' }, { status: 500 });
    }
}