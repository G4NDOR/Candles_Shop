/**
 * This file contains placeholder functions for interacting with a backend API.
 * They can be imported and used by any component that needs to perform
 * Create, Read, Update, or Delete (CRUD) operations.
 * 
 * NOTE: These functions are modified to simulate network delay and potential errors.
 */

const simulateApiCall = (shouldSucceed: boolean = true): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldSucceed) {
                resolve();
            } else {
                reject(new Error("A simulated network error occurred. Please try again."));
            }
        }, 3000);
    });
};

/**
 * A placeholder function to simulate inserting a new record into the database.
 * @param tableName - The name of the table/entity (e.g., 'scents', 'candles').
 * @param data - The new data object to be inserted.
 * @returns A promise that resolves on success or rejects on failure.
 */
export const insert = async (tableName: string, data: any): Promise<void> => {    
    console.log(`[API_PLACEHOLDER] INSERT into ${tableName}:`, data);
    // Simulate API call. In a real app, this would be a fetch() call.
    return simulateApiCall();
};

/**
 * A placeholder function to simulate updating an existing record in the database.
 * @param tableName - The name of the table/entity.
 * @param id - The ID of the record to update.
 * @param data - The data object with the fields to be updated.
 * @returns A promise that resolves on success or rejects on failure.
 */
export const update = async (tableName: string, id: string | number, data: any): Promise<void> => {
    console.log(`[API_PLACEHOLDER] UPDATE in ${tableName} where id=${id}:`, data);
    // Simulate API call.
    return simulateApiCall();
};

/**
 * A placeholder function to simulate deleting a record from the database.
 * @param tableName - The name of the table/entity.
 * @param id - The ID of the record to delete.
 * @returns A promise that resolves on success or rejects on failure.
 */
export const deleteItem = async (tableName: string, id: string | number): Promise<void> => {
    console.log(`[API_PLACEHOLDER] DELETE from ${tableName} where id=${id}`);
    // To test failure, you can change this to `simulateApiCall(false)`
    return simulateApiCall();
};