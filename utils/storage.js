/**
 * Safe localStorage wrapper with error handling
 * Handles cases where localStorage is unavailable (private browsing, etc.)
 */

/**
 * Safely gets an item from localStorage
 * @param {string} key - The storage key
 * @param {*} defaultValue - Default value if key doesn't exist or on error
 * @returns {*} - The stored value or default
 */
export function getStorageItem(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        if (item === null) return defaultValue;
        return item;
    } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error.message);
        return defaultValue;
    }
}

/**
 * Safely sets an item in localStorage
 * @param {string} key - The storage key
 * @param {string} value - The value to store
 * @returns {boolean} - True if successful
 */
export function setStorageItem(key, value) {
    try {
        localStorage.setItem(key, value);
        return true;
    } catch (error) {
        console.warn(`Error writing localStorage key "${key}":`, error.message);
        return false;
    }
}

/**
 * Safely gets a JSON object from localStorage
 * @param {string} key - The storage key
 * @param {*} defaultValue - Default value if key doesn't exist or on parse error
 * @returns {*} - The parsed object or default
 */
export function getStorageJSON(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        if (item === null) return defaultValue;
        return JSON.parse(item);
    } catch (error) {
        console.warn(`Error parsing localStorage key "${key}":`, error.message);
        return defaultValue;
    }
}

/**
 * Safely sets a JSON object in localStorage
 * @param {string} key - The storage key
 * @param {*} value - The value to store (will be JSON stringified)
 * @returns {boolean} - True if successful
 */
export function setStorageJSON(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    } catch (error) {
        console.warn(`Error storing localStorage key "${key}":`, error.message);
        return false;
    }
}

/**
 * Safely removes an item from localStorage
 * @param {string} key - The storage key
 * @returns {boolean} - True if successful
 */
export function removeStorageItem(key) {
    try {
        localStorage.removeItem(key);
        return true;
    } catch (error) {
        console.warn(`Error removing localStorage key "${key}":`, error.message);
        return false;
    }
}

/**
 * Checks if localStorage is available
 * @returns {boolean} - True if localStorage is available
 */
export function isStorageAvailable() {
    try {
        const testKey = '__storage_test__';
        localStorage.setItem(testKey, testKey);
        localStorage.removeItem(testKey);
        return true;
    } catch (error) {
        return false;
    }
}
