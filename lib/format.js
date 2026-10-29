/**
 * Formats a post's YYYY-MM-DD front matter date, e.g. "February 13, 2026".
 * Formatted in UTC so the day doesn't shift with the visitor's (or build server's) timezone.
 */
export function formatPostDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date)) return dateString;
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
}
