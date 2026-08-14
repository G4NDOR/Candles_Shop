/**
 * Helper for handling fetch responses.
 * Gracefully handles 204 No Content and non-JSON error responses.
 */
async function handleResponse(response: Response) {
    console.log("[API] handleResponse status:", response.status);

    // 204 No Content has no body to parse
    if (response.status === 204) {
        return null;
    }

    if (!response.ok) {
        let errorMessage = `HTTP error! status: ${response.status}`;
        try {
            const error = await response.json();
            errorMessage = error.message || error.error || errorMessage;
        } catch (_) {
            // Fallback if the error response body isn't JSON
        }
        throw new Error(errorMessage);
    }

    return response.json();
}

/**
 * Fetches all data from all tables from the backend.
 */
export const fetchAllData = async () => {
    console.log(`[API] GET to /api/data to fetch all initial data.`);
    const response = await fetch('/api/data', { cache: 'no-store' });
    return handleResponse(response);
};

/**
 * Fetches rows for a single specific table (e.g., 'sales-items', 'candles').
 */
export const getTable = async (tableName: string) => {
    console.log(`[API] GET to /api/${tableName}`);
    const response = await fetch(`/api/${tableName}`, { cache: 'no-store' });
    return handleResponse(response);
};

/**
 * Inserts a new record into a table.
 */
export const insert = async (tableName: string, data: any): Promise<any> => {
    console.log(`[API] INSERT into ${tableName}:`, data);
    const response = await fetch(`/api/${tableName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        cache: 'no-store',
    });
    return handleResponse(response);
};

/**
 * Updates an existing record in a table by ID.
 */
export const update = async (tableName: string, id: string | number, data: any): Promise<void> => {
    console.log(`[API] UPDATE in ${tableName} where id=${id}:`, data);
    const response = await fetch(`/api/${tableName}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        cache: 'no-store',
    });
    return handleResponse(response);
};

/**
 * Deletes a record from a table by ID.
 */
export const deleteItem = async (tableName: string, id: string | number): Promise<void> => {
    console.log(`[API] DELETE from ${tableName} where id=${id}`);
    const response = await fetch(`/api/${tableName}/${id}`, {
        method: 'DELETE',
        cache: 'no-store',
    });
    await handleResponse(response);
    console.log("[API] DELETE response done");
};

/**
 * Resets the entire database by executing the `ResetDatabase` stored procedure.
 */
export const resetDatabase = async (): Promise<void> => {
    console.log(`[API] POST to /api/reset to execute ResetDatabase procedure.`);
    const response = await fetch('/api/reset', {
        method: 'POST',
        cache: 'no-store',
    });
    await handleResponse(response);
};