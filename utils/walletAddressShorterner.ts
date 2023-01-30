export const walletAddressShorterner = (address: string | null | undefined) : string => {
    if (!address) return "";
    if (address.length <= 9) return address;
    return address.slice(0, 5) + "..." + address.slice(address.length - 4);
}