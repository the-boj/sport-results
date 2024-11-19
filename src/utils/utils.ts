export function formatDateToString(date: Date): string {
    const year = date.getFullYear(); // Get the full year (YYYY)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Get the month (MM), adding 1 since getMonth() is zero-based
    const day = String(date.getDate()).padStart(2, '0'); // Get the day (DD)

    return `${year}${month}${day}`; // Concatenate to form YYYYMMDD
}