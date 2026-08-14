import { ColumnDefinition } from "./components/Table";

export interface TableConfig {
    /** Route/Redux state key used in frontend (e.g., 'sales-items') */
    feKey: string;
    /** Exact table name in MySQL (e.g., 'SalesItems') */
    dbTable: string;
    /** Human-readable display label for UI headers (e.g., 'Sales Items') */
    displayName: string;
    /** Primary key column name in DB/JSON (e.g., 'saleItemId') */
    path: string;            // path
    description: string;     // description
    pkColumn: string;
    /** Stored procedure names */
    spGet: string;
    /** Stored procedure names */
    spInsert: string;
    /** Stored procedure names */
    spDelete: string;
    /** Function returning table column definitions */
    getColumns: (allData?: any) => ColumnDefinition[];
}

// ==========================================
// 1. MASTER TABLE REGISTRY
// ==========================================
export const TABLE_REGISTRY: Record<string, TableConfig> = {
    scents: {
        feKey: 'scents',
        dbTable: 'Scents',
        displayName: 'Scents',
        pkColumn: 'scentId',
        path: '/scents',
        description: 'Manage candle scent descriptions and details.',
        spGet: 'sp_GetScents',
        spInsert: 'sp_InsertScent',
        spDelete: 'sp_DeleteScent',
        getColumns: () => [
            { key: 'scentId', header: 'ID' },
            { key: 'scentName', header: 'Scent Name', type: 'string' },
            { key: 'description', header: 'Description', type: 'string' },
        ],
    },
    sizes: {
        feKey: 'sizes',
        dbTable: 'Sizes',
        displayName: 'Sizes',
        pkColumn: 'sizeId',
        path: '/sizes',
        description: 'Manage candle size categories and fluid volume.',
        spGet: 'sp_GetSizes',
        spInsert: 'sp_InsertSize',
        spDelete: 'sp_DeleteSize',
        getColumns: () => [
            { key: 'sizeId', header: 'ID' },
            { key: 'sizeLabel', header: 'Size Label', type: 'string' },
            { key: 'volumeOz', header: 'Volume (oz)', type: 'size_oz' },
        ],
    },
    employees: {
        feKey: 'employees',
        dbTable: 'Employees',
        displayName: 'Employees',
        pkColumn: 'employeeId',
        path: '/employees',
        description: 'Manage shop staff profiles and employment status.',
        spGet: 'sp_GetEmployees',
        spInsert: 'sp_InsertEmployee',
        spDelete: 'sp_DeleteEmployee',
        getColumns: () => [
            { key: 'employeeId', header: 'ID' },
            { key: 'firstName', header: 'First Name', type: 'string' },
            { key: 'lastName', header: 'Last Name', type: 'string' },
            { key: 'hireDate', header: 'Hire Date', type: 'date' },
        ],
    },
    customers: {
        feKey: 'customers',
        dbTable: 'Customers',
        displayName: 'Customers',
        pkColumn: 'customerId',
        path: '/customers',
        description: 'View customer accounts and contact information.',
        spGet: 'sp_GetCustomers',
        spInsert: 'sp_InsertCustomer',
        spDelete: 'sp_DeleteCustomer',
        getColumns: () => [
            { key: 'customerId', header: 'ID' },
            { key: 'firstName', header: 'First Name', type: 'string' },
            { key: 'lastName', header: 'Last Name', type: 'string' },
            { key: 'email', header: 'Email', type: 'string' },
            { key: 'phone', header: 'Phone', type: 'string' },
            { key: 'createdDate', header: 'Created Date', type: 'date' },
            {
                key: 'isActive', header: 'Active Status', type: 'bool',
                options: [
                    { value: 1, label: 'Yes' },
                    { value: 0, label: 'No' },
                ],
            },
        ],
    },
    candles: {
        feKey: 'candles',
        dbTable: 'Candles',
        displayName: 'Candles',
        pkColumn: 'candleId',
        path: '/candles',
        description: 'Browse, create, update, and delete candle inventory.',
        spGet: 'sp_GetCandles',
        spInsert: 'sp_InsertCandle',
        spDelete: 'sp_DeleteCandle',
        getColumns: (allData = {}) => [
            { key: 'candleId', header: 'ID' },
            {
                key: 'scentId', header: 'Scent', type: 'dropdown',
                options: allData.scents?.map((s: any) => ({ value: s.scentId, label: s.scentName })) || [],
            },
            {
                key: 'sizeId', header: 'Size', type: 'dropdown',
                options: allData.sizes?.map((sz: any) => ({ value: sz.sizeId, label: `${sz.sizeLabel} (${sz.volumeOz} oz)` })) || [],
            },
            { key: 'price', header: 'Price', type: 'price' },
            { key: 'stockQty', header: 'Stock Qty', type: 'int' },
        ],
    },
    sales: {
        feKey: 'sales',
        dbTable: 'Sales',
        displayName: 'Sales',
        pkColumn: 'saleId',
        path: '/sales',
        description: 'Track sales orders, dates, customer links, and order totals.',
        spGet: 'sp_GetSales',
        spInsert: 'sp_InsertSale',
        spDelete: 'sp_DeleteSale',
        getColumns: (allData = {}) => [
            { key: 'saleId', header: 'Sale ID' },
            { key: 'saleTimestamp', header: 'Date & Time', type: 'date' },
            { key: 'totalAmount', header: 'Total Amount', type: 'price' },
            {
                key: 'employeeId', header: 'Employee', type: 'dropdown',
                options: allData.employees?.map((e: any) => ({ value: e.employeeId, label: `${e.firstName} ${e.lastName}` })) || [],
            },
            {
                key: 'customerId', header: 'Customer', type: 'dropdown',
                options: allData.customers?.map((c: any) => ({ value: c.customerId, label: `${c.firstName} ${c.lastName}` })) || [],
            },
        ],
    },
    'sales-items': {
        feKey: 'sales-items',
        dbTable: 'SalesItems',
        displayName: 'Sales Items',
        pkColumn: 'saleItemId',
        path: '/sales-items',
        description: 'Manage line items connecting sales transactions to candles.',
        spGet: 'sp_GetSalesItems',
        spInsert: 'sp_InsertSalesItem',
        spDelete: 'sp_DeleteSalesItem',
        getColumns: (allData = {}) => [
            { key: 'saleItemId', header: 'ID' },
            {
                key: 'saleId', header: 'Sale', type: 'dropdown',
                options: allData.sales?.map((s: any) => ({ value: s.saleId, label: `Sale #${s.saleId} ($${s.totalAmount})` })) || [],
            },
            {
                key: 'candleId', header: 'Candle', type: 'dropdown',
                options: allData.candles?.map((c: any) => ({ value: c.candleId, label: `Candle #${c.candleId} ($${c.price})` })) || [],
            },
            { key: 'quantity', header: 'Quantity', type: 'int' },
            { key: 'unitPrice', header: 'Unit Price', type: 'price' },
        ],
    },
};

// ==========================================
// 2. UNIVERSAL RESOLVER (Handles casing aliases)
// ==========================================
/**
 * Resolves table metadata regardless of how the key was formatted 
 * (e.g. 'sales-items', 'salesItems', 'SalesItems', or 'sales_items').
 */
export function resolveTableInfo(rawName: string): TableConfig | null {
    if (!rawName) return null;

    // Direct lookup
    if (TABLE_REGISTRY[rawName]) return TABLE_REGISTRY[rawName];

    // Normalize input to lowercase kebab-case (e.g. "SalesItems" -> "sales-items")
    const normalized = rawName
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()
        .replace(/[_ ]/g, '-');

    if (TABLE_REGISTRY[normalized]) return TABLE_REGISTRY[normalized];

    // Find by DB Table Name match
    const found = Object.values(TABLE_REGISTRY).find(
        (t) => t.dbTable.toLowerCase() === rawName.toLowerCase()
    );

    return found || null;
}

// ==========================================
// 3. HELPER FUNCTIONS FOR FRONTEND & BACKEND
// ==========================================

/** Returns column definitions for a given table name */
export function getTableColumns(tableName: string, allData: any): ColumnDefinition[] {
    const table = resolveTableInfo(tableName);
    return table ? table.getColumns(allData) : [];
}

/** Automatically maps primary key columns: { 'sales-items': 'saleItemId', 'candles': 'candleId', ... } */
export const PRIMARY_KEYS: Record<string, string> = Object.values(TABLE_REGISTRY).reduce(
    (acc, table) => {
        acc[table.feKey] = table.pkColumn;
        acc[table.dbTable] = table.pkColumn;
        return acc;
    },
    {} as Record<string, string>
);

/** Dynamic Stored Procedure Maps for API Route Handlers */
export const SP_GET_MAP = Object.values(TABLE_REGISTRY).reduce((acc, t) => {
    acc[t.dbTable] = t.spGet;
    acc[t.feKey] = t.spGet;
    return acc;
}, {} as Record<string, string>);

export const SP_INSERT_MAP = Object.values(TABLE_REGISTRY).reduce((acc, t) => {
    acc[t.dbTable] = t.spInsert;
    acc[t.feKey] = t.spInsert;
    return acc;
}, {} as Record<string, string>);

export const SP_DELETE_MAP = Object.values(TABLE_REGISTRY).reduce((acc, t) => {
    acc[t.dbTable] = t.spDelete;
    acc[t.feKey] = t.spDelete;
    return acc;
}, {} as Record<string, string>);

export const NAV_ITEMS = Object.values(TABLE_REGISTRY);

export enum DataType {
    String = 'string',
    Int = 'int',
    Float = 'float',
    Date = 'date',
    Dropdown = 'dropdown',
    Bool = 'bool'
}