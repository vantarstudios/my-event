const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
] as const;

export function monthNumToString(monthNum: number, short: boolean = false): string {
    if (monthNum < 0 || monthNum > 11) {
        throw new Error('Invalid month number');
    }

    const monthString = months[monthNum]!;

    if (short) {
        return monthString.slice(0, 3);
    }

    return monthString;
}
