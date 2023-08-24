export function getCurrentFormattedDate() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
};
