/**
 * This file contains placeholder functions for interacting with a backend API.
 * They can be imported and used by any component that needs to perform
 * Create, Read, Update, or Delete (CRUD) operations.
 * 
 * NOTE: These functions are modified to simulate network delay and potential errors.
 */

// This function is no longer needed as we are making real API calls.
// const simulateApiCall = (shouldSucceed: boolean = true): Promise<void> => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             if (shouldSucceed) {
//                 resolve();
//             } else {
//                 reject(new Error("A simulated network error occurred. Please try again."));
//             }
//         }, 1000); // Reduced delay for real-world feel
//     });
// };

// We will create API routes for each of these operations.
// For now, let's focus on the 'resetDatabase' function.

// Helper for handling fetch responses
async function handleResponse(response: Response) {
    console.log("[API] handleResponse response", response)

    if (response.status === 204) {
        return null;
    }
    if (!response.ok) {
        // For 204 No Content, we don't expect a JSON body.
        if (response.status === 204) {
            return null;
        }
        const error = await response.json();
        throw new Error(error.message || `HTTP error! status: ${response.status}`);
    }
    
    return response.json();
}

/**
 * Fetches all data from all tables from the backend.
 * @returns A promise that resolves with all the application data.
 */
export const fetchAllData = async () => {
    console.log(`[API] GET to /api/data to fetch all initial data.`);
    const response = await fetch('/api/data', { cache: 'no-store' });
    return handleResponse(response);
};

/**
 * A placeholder function to simulate inserting a new record into the database.
 * @param tableName - The name of the table/entity (e.g., 'scents', 'candles').
 * @param data - The new data object to be inserted.
 * @returns A promise that resolves on success or rejects on failure.
 */
export const insert = async (tableName: string, data: any): Promise<any> => {
    console.log(`[API] INSERT into ${tableName}:`, data);
    const response = await fetch(`/api/${tableName}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    return handleResponse(response);
};

/**
 * A placeholder function to simulate updating an existing record in the database.
 * @param tableName - The name of the table/entity.
 * @param id - The ID of the record to update.
 * @param data - The data object with the fields to be updated.
 * @returns A promise that resolves on success or rejects on failure.
 */
export const update = async (tableName: string, id: string | number, data: any): Promise<void> => {
    console.log(`[API] UPDATE in ${tableName} where id=${id}:`, data);
    const response = await fetch(`/api/${tableName}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    await handleResponse(response);
};

/**
 * A placeholder function to simulate deleting a record from the database.
 * @param tableName - The name of the table/entity.
 * @param id - The ID of the record to delete.
 * @returns A promise that resolves on success or rejects on failure.
 */
export const deleteItem = async (tableName: string, id: string | number): Promise<void> => {
    console.log(`[API] DELETE from ${tableName} where id=${id}`);
    const response = await fetch(`/api/${tableName}/${id}`, {
        method: 'DELETE',
    });
    await handleResponse(response);
    console.log("[API] DELETE response done", response)
};

/**
 * A placeholder function to simulate resetting the entire database.
 * This would call a specific backend endpoint that executes the `ResetDatabase` stored procedure.
 * @returns A promise that resolves on success or rejects on failure.
 */
export const resetDatabase = async (): Promise<void> => {
    console.log(`[API] POST to /api/reset to execute ResetDatabase procedure.`);
    // This now makes a real network request to your backend route.
    const response = await fetch('/api/reset', {
        method: 'POST',
    });
    await handleResponse(response);
};