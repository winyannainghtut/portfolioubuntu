/**
 * Security utility functions for the portfolio
 */

/**
 * Sanitizes a string to prevent XSS attacks
 * Converts special HTML characters to their entity equivalents
 * @param {string} str - The string to sanitize
 * @returns {string} - The sanitized string
 */
export function sanitizeHTML(str) {
    if (!str) return '';
    
    const entityMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    
    return String(str).replace(/[&<>"'`=\/]/g, char => entityMap[char]);
}

/**
 * Validates a URL for safe usage
 * @param {string} url - The URL to validate
 * @returns {boolean} - True if the URL is valid and safe
 */
export function isValidUrl(url) {
    if (!url || typeof url !== 'string') return false;
    
    try {
        const parsed = new URL(url);
        // Only allow http and https protocols
        return ['http:', 'https:'].includes(parsed.protocol);
    } catch {
        return false;
    }
}

/**
 * Opens an external URL safely with proper security attributes
 * @param {string} url - The URL to open
 */
export function openExternalUrl(url) {
    if (!isValidUrl(url)) {
        console.warn('Invalid URL provided:', url);
        return;
    }
    
    // Open with security attributes to prevent reverse tabnabbing
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) {
        newWindow.opener = null;
    }
}

/**
 * Creates a safe innerHTML setter that sanitizes content by default
 * Use sparingly - prefer React's JSX when possible
 * @param {HTMLElement} element - The DOM element
 * @param {string} content - The HTML content
 * @param {boolean} trusted - If true, content is inserted as-is (use with caution)
 */
export function setInnerHTML(element, content, trusted = false) {
    if (!element) return;
    
    if (trusted) {
        // Only use for known-safe content like static HTML from the app
        element.innerHTML = content;
    } else {
        // Default: sanitize the content
        element.textContent = content;
    }
}
