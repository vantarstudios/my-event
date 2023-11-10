const getUserLanguage = () => {
    return 'en-US';
};

export function thousandsCommaFormat(value: number): string {
    return value.toLocaleString(getUserLanguage(), {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
    });
}
