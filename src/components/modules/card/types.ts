export type TCard = {
    className: string;
    item: TC;
    text: string;
    onClick: () => void;
}

export type TC = {
    contract: string;
    price: string;
    tokenId: number;
    seller: string;
    owner: string;
    name: string;
    context: string;
    sources: string;
    tags: string[];
    itemId: number;
}
