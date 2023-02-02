import { TNFTItem } from "../../../../types/NFTItem";

export type TCard = {
    className: string;
    item: TNFTItem;
    text: string;
    isBuy: boolean; // true if buy card, false if sell card
}

