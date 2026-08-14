import { NextResponse } from 'next/server';

const TABLE_MAP: Record<string, { dbTable: string; pkColumn: string }> = {
    candles: { dbTable: 'Candles', pkColumn: 'candleId' },
    scents: { dbTable: 'Scents', pkColumn: 'scentId' },
    sizes: { dbTable: 'Sizes', pkColumn: 'sizeId' },
    customers: { dbTable: 'Customers', pkColumn: 'customerId' },
    employees: { dbTable: 'Employees', pkColumn: 'employeeId' },
    sales: { dbTable: 'Sales', pkColumn: 'saleId' },
    'sales-items': { dbTable: 'SalesItems', pkColumn: 'saleItemId' },
    salesitems: { dbTable: 'SalesItems', pkColumn: 'saleItemId' },
};

/**
 * Resolves a URL-friendly table name to the actual database table name and its primary key.
 * Handles various casings and hyphenation.
 * @param tableName The table name from the URL.
 * @returns An object with dbTable and pkColumn, or null if not found.
 */
export function resolveTableInfo(tableName: string | undefined) {
    if (!tableName) {
        return null;
    }
    // Normalize to lowercase and handle different variations.
    const normalized = tableName.toLowerCase().replace(/\s+/g, '-');
    return TABLE_MAP[normalized] || null;
}