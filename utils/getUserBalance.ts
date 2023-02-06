export const getUserBalance = (balance: number | undefined): string => {
    if (balance) {
        const divided = balance / 10 ** 18;
        return divided.toFixed(3);
    }
    return "0";
}