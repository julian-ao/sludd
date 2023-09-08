export const convertDateToReadable = (date: string) => {
    const month = date.slice(5, 7);
    const day = parseInt(date.slice(8, 10), 10).toString(); // Remove leading zero
    const hour = date.slice(11, 13);
    const minute = date.slice(14, 16);

    const daySuffix = getDaySuffix(Number(day)); // Get the day suffix

    return `${day}${daySuffix} ${months[Number(month) - 1].toLocaleLowerCase()} ${hour}:${minute}`;
};

const getDaySuffix = (day: number) => {
    if (day >= 11 && day <= 13) {
        return 'th';
    }
    const lastDigit = day % 10;
    switch (lastDigit) {
        case 1:
            return 'st';
        case 2:
            return 'nd';
        case 3:
            return 'rd';
        default:
            return 'th';
    }
};

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November','December'];