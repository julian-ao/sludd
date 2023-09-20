// Convert date to readable format
export const convertDateToReadable = (date: string) => {
    const month = date.slice(5, 7);
    const day = parseInt(date.slice(8, 10), 10).toString(); // Remove leading zero
    const hour = date.slice(11, 13);
    const minute = date.slice(14, 16);

    return `${day}. ${months[
        Number(month) - 1
    ].toLocaleLowerCase()} ${hour}:${minute}`;
};

const months = [
    "Januar",
    "Februar",
    "Mars",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "Oktober",
    "November",
    "Desember",
];
