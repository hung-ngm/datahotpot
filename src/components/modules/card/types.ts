export type TCard = {
    className: string;
    item: TC;
    text: string;
}

export type TC = {
    contract: string;
    contains: string;
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
