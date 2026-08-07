import { ColumnDefinition } from "./Table";

export function getTableColumns(tableName: string, allData: any): ColumnDefinition[] {
    const baseColumns: { [key: string]: ColumnDefinition[] } = {
        scents: [
            { key: 'scentId', header: 'ID' },
            { key: 'scentName', header: 'Scent Name', type: 'string' },
            { key: 'description', header: 'Description', type: 'string' },
        ],
        sizes: [
            { key: 'sizeId', header: 'ID' },
            { key: 'sizeLabel', header: 'Size Label', type: 'string' },
            { key: 'volumeOz', header: 'Volume (oz)', type: 'size_oz' },
        ],
        employees: [
            { key: 'employeeId', header: 'ID' },
            { key: 'firstName', header: 'First Name', type: 'string' },
            { key: 'lastName', header: 'Last Name', type: 'string' },
            { key: 'hireDate', header: 'Hire Date', type: 'date' },
        ],
        customers: [
            { key: 'customerId', header: 'ID' },
            { key: 'firstName', header: 'First Name', type: 'string' },
            { key: 'lastName', header: 'Last Name', type: 'string' },
            { key: 'email', header: 'Email', type: 'string' },
            { key: 'phone', header: 'Phone', type: 'string' },
            { key: 'createdDate', header: 'Created Date', type: 'date' },
            { key: 'isActive', header: 'Active Status', type: 'int' },
        ],
        candles: [
            { key: 'candleId', header: 'ID' },
            {
                key: 'scentId', header: 'Scent', type: 'dropdown',
                options: allData.scents?.map((s: any) => ({ value: s.scentId, label: s.scentName })) || []
            },
            {
                key: 'sizeId', header: 'Size', type: 'dropdown',
                options: allData.sizes?.map((sz: any) => ({ value: sz.sizeId, label: `${sz.sizeLabel} (${sz.volumeOz} oz)` })) || []
            },
            { key: 'price', header: 'Price', type: 'price' },
            { key: 'stockQty', header: 'Stock Qty', type: 'int' },
        ],
        sales: [
            { key: 'saleId', header: 'Sale ID' },
            { key: 'saleTimestamp', header: 'Date & Time', type: 'date' },
            { key: 'totalAmount', header: 'Total Amount', type: 'price' },
            {
                key: 'employeeId', header: 'Employee', type: 'dropdown',
                options: allData.employees?.map((e: any) => ({ value: e.employeeId, label: `${e.firstName} ${e.lastName}` })) || []
            },
            {
                key: 'customerId', header: 'Customer', type: 'dropdown',
                options: allData.customers?.map((c: any) => ({ value: c.customerId, label: `${c.firstName} ${c.lastName}` })) || []
            },
        ],
        'sales-items': [
            { key: 'saleItemId', header: 'ID' },
            {
                key: 'saleId', header: 'Sale', type: 'dropdown',
                options: allData.sales?.map((s: any) => ({ value: s.saleId, label: `Sale #${s.saleId} ($${s.totalAmount})` })) || []
            },
            {
                key: 'candleId', header: 'Candle', type: 'dropdown',
                options: allData.candles?.map((c: any) => ({ value: c.candleId, label: `Candle #${c.candleId} ($${c.price})` })) || []
            },
            { key: 'quantity', header: 'Quantity', type: 'int' },
            { key: 'unitPrice', header: 'Unit Price', type: 'price' },
        ],
    };

    // Alias for sales-items
    baseColumns.salesItems = baseColumns['sales-items'];

    return baseColumns[tableName] || [];
}
